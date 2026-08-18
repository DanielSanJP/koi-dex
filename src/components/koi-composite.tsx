"use client";

import { useEffect, useRef } from "react";
import { r2PublicUrl } from "@/lib/r2";
import { tintFor } from "@/lib/tint";
import type { Koi } from "@/lib/types";

/* Draws a koi the way the app draws it: an untinted body sprite plus the four
   shared white fin sheets, each multiplied by the variety's tint. Layer order
   is back fin → tail → body → dorsal → side fin, every layer filling the same
   rect (fin placement is baked into the artwork).

   The fin sheets are large (3440×1856) and shared by every koi, so images are
   cached at module level: a page full of cards decodes each sheet once. */

const FRAME_W = 688;
const FRAME_H = 464;

const WHITE_BACK = "fins/white/back_fin.webp";
const WHITE_TAIL = "fins/white/tail.webp";
const WHITE_DORSAL = "fins/white/dorsal.webp";
const WHITE_SIDE = "fins/white/side_fin.webp";

const FRAMES = 20; // 5 x 4 grid of poses per fin sheet
const COLS = 5;
const CYCLE_MS = 2000; // the app plays the 20 frames over 2 s

const imageCache = new Map<string, Promise<HTMLImageElement | null>>();

function loadImage(path: string): Promise<HTMLImageElement | null> {
  const url = r2PublicUrl(path)!;
  const cached = imageCache.get(url);
  if (cached) return cached;
  const pending = new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
  imageCache.set(url, pending);
  return pending;
}

type Props = {
  koi: Koi;
  className?: string;
  /** Canvas buffer width in CSS pixels; height follows the 688:464 frame. */
  bufferWidth?: number;
  /** Cycle the 20 fin frames while hovered/focused (2 s loop). Off under
      prefers-reduced-motion. */
  animateOnHover?: boolean;
};

export default function KoiComposite({
  koi,
  className,
  bufferWidth = 344,
  animateOnHover = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawFrameRef = useRef<((frame: number) => void) | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    (async () => {
      const [body, backFin, tail, dorsal, sideFin] = await Promise.all([
        loadImage(koi.body),
        loadImage(WHITE_BACK),
        loadImage(WHITE_TAIL),
        loadImage(WHITE_DORSAL),
        loadImage(WHITE_SIDE),
      ]);
      if (cancelled) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = bufferWidth;
      const h = Math.round(w * (FRAME_H / FRAME_W));
      canvas.width = Math.ceil(w * dpr);
      canvas.height = Math.ceil(h * dpr);

      // Each layer is tinted in its own offscreen canvas: a canvas-wide
      // destination-in would knock out the layers already drawn wherever
      // this layer is transparent. The offscreen canvas is reused across
      // frames.
      const off = document.createElement("canvas");
      off.width = canvas.width;
      off.height = canvas.height;
      const oc = off.getContext("2d");
      if (!oc) return;

      const drawTinted = (
        img: HTMLImageElement,
        sx: number,
        sy: number,
        srcW: number,
        srcH: number,
        tint: string | null,
      ) => {
        if (!tint) {
          ctx.drawImage(img, sx, sy, srcW, srcH, 0, 0, w, h);
          return;
        }
        oc.setTransform(1, 0, 0, 1, 0, 0);
        oc.globalCompositeOperation = "source-over";
        oc.clearRect(0, 0, off.width, off.height);
        oc.scale(dpr, dpr);
        oc.drawImage(img, sx, sy, srcW, srcH, 0, 0, w, h);
        oc.globalCompositeOperation = "multiply";
        oc.fillStyle = tint;
        oc.fillRect(0, 0, w, h);
        oc.globalCompositeOperation = "destination-in";
        oc.drawImage(img, sx, sy, srcW, srcH, 0, 0, w, h);
        ctx.drawImage(off, 0, 0, off.width, off.height, 0, 0, w, h);
      };

      // Fin sheets are a 5×4 grid of frames; the rest pose is frame 0.
      const drawFin = (img: HTMLImageElement | null, frame: number, tint: string | null) => {
        if (!img) return;
        const sx = (frame % COLS) * FRAME_W;
        const sy = Math.floor(frame / COLS) * FRAME_H;
        drawTinted(img, sx, sy, FRAME_W, FRAME_H, tint);
      };

      const drawFrame = (frame: number) => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        drawFin(backFin, frame, tintFor(koi.fins, "back"));
        drawFin(tail, frame, tintFor(koi.fins, "tail"));
        if (body) drawTinted(body, 0, 0, body.width, body.height, null);
        drawFin(dorsal, frame, tintFor(koi.fins, "dorsal"));
        drawFin(sideFin, frame, tintFor(koi.fins, "side"));
      };

      drawFrameRef.current = drawFrame;
      drawFrame(0);
    })();

    return () => {
      cancelled = true;
      drawFrameRef.current = null;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [koi, bufferWidth]);

  const start = () => {
    if (!animateOnHover || rafRef.current != null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t0 = performance.now();
    let last = -1;
    const tick = (t: number) => {
      const frame = Math.floor(((t - t0) % CYCLE_MS) / (CYCLE_MS / FRAMES));
      if (frame !== last) {
        last = frame;
        drawFrameRef.current?.(frame);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    drawFrameRef.current?.(0);
  };

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={`${koi.name} koi`}
      className={className}
      style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
      onPointerEnter={animateOnHover ? start : undefined}
      onPointerLeave={animateOnHover ? stop : undefined}
      onFocus={animateOnHover ? start : undefined}
      onBlur={animateOnHover ? stop : undefined}
    />
  );
}
