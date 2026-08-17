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
};

export default function KoiComposite({
  koi,
  className,
  bufferWidth = 344,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);


      // Each layer is tinted in its own offscreen canvas: a canvas-wide
      // destination-in would knock out the layers already drawn wherever
      // this layer is transparent.
      const drawTinted = (
        img: HTMLImageElement,
        srcW: number,
        srcH: number,
        tint: string | null,
      ) => {
        if (!tint) {
          ctx.drawImage(img, 0, 0, srcW, srcH, 0, 0, w, h);
          return;
        }
        const off = document.createElement("canvas");
        off.width = canvas.width;
        off.height = canvas.height;
        const oc = off.getContext("2d");
        if (!oc) return;
        oc.scale(dpr, dpr);
        oc.drawImage(img, 0, 0, srcW, srcH, 0, 0, w, h);
        oc.globalCompositeOperation = "multiply";
        oc.fillStyle = tint;
        oc.fillRect(0, 0, w, h);
        oc.globalCompositeOperation = "destination-in";
        oc.drawImage(img, 0, 0, srcW, srcH, 0, 0, w, h);
        ctx.drawImage(off, 0, 0, off.width, off.height, 0, 0, w, h);
      };

      // Fin sheets are a 5×4 grid of frames; the rest pose is frame 0.
      const drawFin = (img: HTMLImageElement | null, tint: string | null) => {
        if (img) drawTinted(img, FRAME_W, FRAME_H, tint);
      };

      drawFin(backFin, tintFor(koi.fins, "back"));
      drawFin(tail, tintFor(koi.fins, "tail"));
      if (body) drawTinted(body, body.width, body.height, null);
      drawFin(dorsal, tintFor(koi.fins, "dorsal"));
      drawFin(sideFin, tintFor(koi.fins, "side"));
    })();

    return () => {
      cancelled = true;
    };
  }, [koi, bufferWidth]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={`${koi.name} koi`}
      className={className}
      style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
    />
  );
}
