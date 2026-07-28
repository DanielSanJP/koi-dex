"use client";

import { useRef, useEffect, useCallback } from "react";
import { R2_CDN_BASE } from "@/lib/r2";

/**
 * Animated koi preview — renders body (static, per-koi artwork) + 4 fin
 * spritesheets (shared white-base, tinted at draw time).
 *
 * Mirrors the Flutter renderer's runtime tinting model:
 *   - `dominantTint` → applied to every fin without an override
 *   - `dorsalTint`   → overrides the dorsal fin only
 *   - `bodyTint`     → applied to the body (null for every current koi)
 *
 * Layer order (bottom to top):
 *   backFin → tail → body → dorsal → sideFin
 *
 * Tinting: each layer is composited in an offscreen canvas so the
 * destination-in cleanup step is scoped to that layer's offscreen and
 * doesn't wipe out the previously-drawn layers on the main canvas
 * (which is what a naive canvas-wide destination-in would do, since
 * koi fins overlap each other substantially).
 */

const FRAME_COLS = 5;
const FRAME_ROWS = 4;
const TOTAL_FRAMES = FRAME_COLS * FRAME_ROWS; // 20
const FRAME_W = 688;
const FRAME_H = 464;

// Shared white-base fin sheets in R2 (same files the Flutter app bundles).
// Hard-coded so the preview doesn't have to round-trip a fin_sets lookup.
const WHITE_TAIL = `${R2_CDN_BASE}/fins/white/tail.webp`;
const WHITE_DORSAL = `${R2_CDN_BASE}/fins/white/dorsal.webp`;
const WHITE_BACK = `${R2_CDN_BASE}/fins/white/back_fin.webp`;
const WHITE_SIDE = `${R2_CDN_BASE}/fins/white/side_fin.webp`;

type Props = {
  /** URL or object URL for the static body sprite */
  bodyUrl: string | null;
  /** Hex color (#rrggbb or #rrggbbaa) — applied to every fin without an override. */
  dominantTint?: string | null;
  /** Optional per-fin overrides. Each falls back to dominantTint when null. */
  tailTint?: string | null;
  dorsalTint?: string | null;
  backFinTint?: string | null;
  sideFinTint?: string | null;
  /** Hex color — applied to the body. Null for every current koi. */
  bodyTint?: string | null;
  /** Optional accessory overlay (single sprite, legacy / non-layered items). */
  accessoryUrl?: string | null;
  /** render_layers stack: each {url, tint} drawn in order (bottom→top) at the
   *  accessory slot, tint multiplied into the white master. Takes precedence
   *  over accessoryUrl when non-empty — this is how a tintable accessory
   *  renders its true colors in the preview. */
  accessoryLayers?: { url: string; tint?: string | null }[] | null;
  /** Which slot the accessory occupies */
  accessorySlot?: "hat" | "neck" | "face";
  /** Canvas display width in CSS pixels (default 344) */
  width?: number;
  /** Canvas display height in CSS pixels (default 232) */
  height?: number;
  /** Background color behind the koi (default transparent) */
  bgColor?: string;
};

export function KoiPreviewCanvas({
  bodyUrl,
  dominantTint,
  tailTint,
  dorsalTint,
  backFinTint,
  sideFinTint,
  bodyTint,
  accessoryUrl,
  accessoryLayers,
  accessorySlot = "hat",
  width = 344,
  height = 232,
  bgColor,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<{
    body: HTMLImageElement | null;
    tail: HTMLImageElement | null;
    dorsal: HTMLImageElement | null;
    backFin: HTMLImageElement | null;
    sideFin: HTMLImageElement | null;
    accessoryLayers: { img: HTMLImageElement; tint: string | null }[];
  }>({
    body: null,
    tail: null,
    dorsal: null,
    backFin: null,
    sideFin: null,
    accessoryLayers: [],
  });
  const frameRef = useRef(0);
  const elapsedRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);

  const loadImage = useCallback(
    (url: string | null): Promise<HTMLImageElement | null> => {
      if (!url) return Promise.resolve(null);
      return new Promise((resolve) => {
        const img = new Image();
        // No crossOrigin: R2 dev URLs sometimes cache responses without
        // CORS headers, which trips an anonymous request. We only draw
        // these to the canvas and never read pixels back, so a tainted
        // canvas is fine.
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = url;
      });
    },
    [],
  );

  // Load all images — body is per-koi; fins are the shared white-base set; the
  // accessory is a render_layers stack (each tinted) or one untinted sprite.
  // Serialize the layer list so a fresh array ref from the parent doesn't loop.
  const accessoryLayersKey = JSON.stringify(accessoryLayers ?? null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [body, tail, dorsal, backFin, sideFin] = await Promise.all([
        loadImage(bodyUrl),
        loadImage(WHITE_TAIL),
        loadImage(WHITE_DORSAL),
        loadImage(WHITE_BACK),
        loadImage(WHITE_SIDE),
      ]);
      const defs =
        accessoryLayers && accessoryLayers.length > 0
          ? accessoryLayers
          : accessoryUrl
            ? [{ url: accessoryUrl, tint: null }]
            : [];
      const loaded = (
        await Promise.all(
          defs.map(async (l) => {
            const img = await loadImage(l.url);
            return img ? { img, tint: l.tint ?? null } : null;
          }),
        )
      ).filter(
        (x): x is { img: HTMLImageElement; tint: string | null } => x !== null,
      );
      if (!cancelled) {
        imagesRef.current = {
          body,
          tail,
          dorsal,
          backFin,
          sideFin,
          accessoryLayers: loaded,
        };
      }
    })();
    return () => {
      cancelled = true;
    };
    // accessoryLayersKey captures layer/tint changes; the raw array isn't a dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyUrl, accessoryUrl, accessoryLayersKey, loadImage]);

  // Animation loop.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const stepTime = 0.1; // ~10 FPS for a gentle idle swim

    // Composite a single sprite frame with an optional modulate tint onto
    // the main canvas at `(dx, dy)` × `(dw, dh)`. When `tint` is set, the
    // sprite is drawn into an offscreen canvas, multiplied by the tint
    // colour, masked back to the sprite's alpha, then drawn to the main
    // canvas with default source-over. Offscreen scoping is what keeps
    // earlier layers from being knocked out by the destination-in mask.
    const drawFrame = (
      img: HTMLImageElement | null,
      frame: number,
      dx: number,
      dy: number,
      dw: number,
      dh: number,
      tint?: string | null,
    ) => {
      if (!img) return;
      const col = frame % FRAME_COLS;
      const row = Math.floor(frame / FRAME_COLS);
      const srcX = col * FRAME_W;
      const srcY = row * FRAME_H;
      if (!tint) {
        ctx.drawImage(img, srcX, srcY, FRAME_W, FRAME_H, dx, dy, dw, dh);
        return;
      }
      compositeTintedSprite(img, srcX, srcY, FRAME_W, FRAME_H, dx, dy, dw, dh, tint);
    };

    const drawWhole = (
      img: HTMLImageElement | null,
      dx: number,
      dy: number,
      dw: number,
      dh: number,
      tint?: string | null,
    ) => {
      if (!img) return;
      if (!tint) {
        ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, dw, dh);
        return;
      }
      compositeTintedSprite(img, 0, 0, img.width, img.height, dx, dy, dw, dh, tint);
    };

    // Offscreen-canvas tinting. Tint pipeline per layer:
    //   1. drawImage the sprite slice to an offscreen.
    //   2. globalCompositeOperation='multiply' + fillRect with the tint colour:
    //      multiplies the tint into the offscreen's pixels (white-base * tint =
    //      colored result; black outline * tint stays dark).
    //   3. globalCompositeOperation='destination-in' + drawImage the sprite
    //      again: keeps only the offscreen pixels where the sprite has alpha,
    //      cleaning up the rect's bleed outside the sprite silhouette.
    //   4. ctx.drawImage(off, …) onto the main canvas in source-over.
    const compositeTintedSprite = (
      img: HTMLImageElement,
      srcX: number,
      srcY: number,
      srcW: number,
      srcH: number,
      dx: number,
      dy: number,
      dw: number,
      dh: number,
      tint: string,
    ) => {
      const off = document.createElement("canvas");
      // Match physical resolution of the destination so retina previews
      // stay sharp (main ctx is dpr-scaled, so dw/dh are CSS pixels).
      off.width = Math.max(1, Math.ceil(dw * dpr));
      off.height = Math.max(1, Math.ceil(dh * dpr));
      const oc = off.getContext("2d");
      if (!oc) return;
      oc.scale(dpr, dpr);
      oc.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, dw, dh);
      oc.globalCompositeOperation = "multiply";
      oc.fillStyle = tint;
      oc.fillRect(0, 0, dw, dh);
      oc.globalCompositeOperation = "destination-in";
      oc.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, dw, dh);
      ctx.drawImage(off, 0, 0, off.width, off.height, dx, dy, dw, dh);
    };

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      elapsedRef.current += dt;
      if (elapsedRef.current >= stepTime) {
        elapsedRef.current -= stepTime;
        frameRef.current = (frameRef.current + 1) % TOTAL_FRAMES;
      }

      ctx.clearRect(0, 0, width, height);
      if (bgColor) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
      }

      const f = frameRef.current;
      const imgs = imagesRef.current;

      // Center the koi in the canvas.
      const renderW = width * 0.85;
      const renderH = renderW * (FRAME_H / FRAME_W);
      const dx = (width - renderW) / 2;
      const dy = (height - renderH) / 2;

      const fallback = dominantTint ?? null;
      const tailEff = tailTint ?? fallback;
      const dorsalEff = dorsalTint ?? fallback;
      const backFinEff = backFinTint ?? fallback;
      const sideFinEff = sideFinTint ?? fallback;

      // Layer order: backFin → tail → body → [face] → [neck] → dorsal → sideFin → [hat]
      drawFrame(imgs.backFin, f, dx, dy, renderW, renderH, backFinEff);
      drawFrame(imgs.tail, f, dx, dy, renderW, renderH, tailEff);
      drawWhole(imgs.body, dx, dy, renderW, renderH, bodyTint ?? null);

      // Draw the accessory render-layer stack (bottom→top, each tinted).
      const drawAccessory = () => {
        for (const layer of imgs.accessoryLayers) {
          drawWhole(layer.img, dx, dy, renderW, renderH, layer.tint);
        }
      };

      if (accessorySlot === "face") drawAccessory();
      if (accessorySlot === "neck") drawAccessory();

      drawFrame(imgs.dorsal, f, dx, dy, renderW, renderH, dorsalEff);
      drawFrame(imgs.sideFin, f, dx, dy, renderW, renderH, sideFinEff);

      if (accessorySlot === "hat") drawAccessory();

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [
    width,
    height,
    bgColor,
    accessorySlot,
    dominantTint,
    tailTint,
    dorsalTint,
    backFinTint,
    sideFinTint,
    bodyTint,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height, borderRadius: 12 }}
    />
  );
}
