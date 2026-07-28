"use client";

import { useEffect, useRef } from "react";
import { R2_CDN_BASE } from "@/lib/r2";

const FRAME_W = 688;
const FRAME_H = 464;

// Shared white-base fin sheets in R2 — same files the Flutter app bundles.
// Hard-coded so the thumbnail render is one fewer DB lookup.
const WHITE_TAIL = `${R2_CDN_BASE}/fins/white/tail.webp`;
const WHITE_DORSAL = `${R2_CDN_BASE}/fins/white/dorsal.webp`;
const WHITE_BACK = `${R2_CDN_BASE}/fins/white/back_fin.webp`;
const WHITE_SIDE = `${R2_CDN_BASE}/fins/white/side_fin.webp`;

type Props = {
  bodyUrl: string;
  /** Hex `#rrggbb`. Applied to every fin without an override. Null = pure white. */
  dominantTint?: string | null;
  /** Per-fin overrides. Each falls back to dominantTint when null. */
  tailTint?: string | null;
  dorsalTint?: string | null;
  backFinTint?: string | null;
  sideFinTint?: string | null;
  /** Hex `#rrggbb`. Optional body tint. Null on every current koi. */
  bodyTint?: string | null;
  alt: string;
  className?: string;
  /** Canvas buffer width in CSS pixels (height derived from 688:464). */
  bufferWidth?: number;
};

/**
 * Static composite of a koi's rest-pose first frame. Mirrors the Flutter
 * KoiFirstFrameComposer used by the app's card displays: body sprite + frame
 * [0,0] of the shared white-base fin sheets, tinted via the offscreen-canvas
 * modulate pattern (see [[koi-preview-canvas]] for the inline animated
 * version with the same compositing approach).
 *
 * Layer order: backFin → tail → body → dorsal → sideFin.
 *
 * Renders to a tainted <canvas> on purpose: R2 dev URLs are inconsistent about
 * CORS headers, so we never read pixels back.
 */
export function KoiFirstFrameImage({
  bodyUrl,
  dominantTint,
  tailTint,
  dorsalTint,
  backFinTint,
  sideFinTint,
  bodyTint,
  alt,
  className,
  bufferWidth = 320,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const loadImage = (url: string): Promise<HTMLImageElement | null> =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = url;
      });

    (async () => {
      const [body, tail, dorsal, backFin, sideFin] = await Promise.all([
        loadImage(bodyUrl),
        loadImage(WHITE_TAIL),
        loadImage(WHITE_DORSAL),
        loadImage(WHITE_BACK),
        loadImage(WHITE_SIDE),
      ]);
      if (cancelled) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const w = bufferWidth;
      const h = Math.round(w * (FRAME_H / FRAME_W));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const fallback = dominantTint ?? null;
      const tailEff = tailTint ?? fallback;
      const dorsalEff = dorsalTint ?? fallback;
      const backFinEff = backFinTint ?? fallback;
      const sideFinEff = sideFinTint ?? fallback;

      // Offscreen-canvas tint per layer. A naive canvas-wide
      // destination-in would knock out the previously-drawn layers
      // wherever the current layer is transparent; isolating each
      // layer's tint to its own offscreen avoids that.
      const compositeTinted = (
        img: HTMLImageElement,
        srcX: number,
        srcY: number,
        srcW: number,
        srcH: number,
        tint: string,
      ) => {
        const off = document.createElement("canvas");
        off.width = Math.max(1, Math.ceil(w * dpr));
        off.height = Math.max(1, Math.ceil(h * dpr));
        const oc = off.getContext("2d");
        if (!oc) return;
        oc.scale(dpr, dpr);
        oc.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, w, h);
        oc.globalCompositeOperation = "multiply";
        oc.fillStyle = tint;
        oc.fillRect(0, 0, w, h);
        oc.globalCompositeOperation = "destination-in";
        oc.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, w, h);
        ctx.drawImage(off, 0, 0, off.width, off.height, 0, 0, w, h);
      };

      const drawFrame0 = (img: HTMLImageElement | null, tint?: string | null) => {
        if (!img) return;
        if (!tint) {
          ctx.drawImage(img, 0, 0, FRAME_W, FRAME_H, 0, 0, w, h);
          return;
        }
        compositeTinted(img, 0, 0, FRAME_W, FRAME_H, tint);
      };
      const drawBody = (img: HTMLImageElement | null, tint?: string | null) => {
        if (!img) return;
        if (!tint) {
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
          return;
        }
        compositeTinted(img, 0, 0, img.width, img.height, tint);
      };

      drawFrame0(backFin, backFinEff);
      drawFrame0(tail, tailEff);
      drawBody(body, bodyTint ?? null);
      drawFrame0(dorsal, dorsalEff);
      drawFrame0(sideFin, sideFinEff);
    })();

    return () => {
      cancelled = true;
    };
  }, [
    bodyUrl,
    dominantTint,
    tailTint,
    dorsalTint,
    backFinTint,
    sideFinTint,
    bodyTint,
    bufferWidth,
  ]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={className}
      style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
    />
  );
}
