"use client";

import { useEffect, useRef } from "react";

export type PreviewLayer = {
  url: string;
  tint?: string | null;
  /** 'recolor' → flat color-replace (srcATop / canvas source-in; recolors a
   *  black outline); anything else → multiply (shading-preserving, default). */
  blend?: string | null;
};
export type PreviewCrop = { x: number; y: number; w: number; h: number };

type Props = {
  /** Resolved render_layers: white masters + optional per-layer tint. */
  layers: PreviewLayer[];
  /** Normalized {x,y,w,h} in 0..1 of the ROTATED composite. Null = full frame. */
  crop?: PreviewCrop | null;
  /** Degrees, applied BEFORE crop (straighten the art, then frame it). */
  rotation?: number | null;
  alt: string;
  className?: string;
  /** Canvas buffer width in CSS px (height derived from the cropped+rotated bbox). */
  bufferWidth?: number;
};

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

/**
 * Static shop-card preview DERIVED from a render_layers stack, so a tintable
 * accessory/decoration needs no baked per-color preview file. Pipeline:
 * composite the white masters with their tints → ROTATE by `rotation` (so the
 * art sits straight) → CROP to `crop` (a sub-rect of the rotated frame). Crop
 * is therefore expressed in rotated-frame coords.
 *
 * Crop + rotation are family-level stored metadata, so the render only uses
 * drawImage with a transform + a source rect — it never reads pixels back, so
 * it works on CORS-tainted R2 canvases. Mirrors the in-app derive and the
 * KoiFirstFrameImage composite pattern.
 */
export function LayeredPreviewImage({
  layers,
  crop,
  rotation,
  alt,
  className,
  bufferWidth = 320,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layersKey = JSON.stringify(layers);

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
      const imgs = await Promise.all(layers.map((l) => loadImage(l.url)));
      if (cancelled) return;
      const base = imgs.find((i): i is HTMLImageElement => !!i);
      if (!base) return;
      const W = base.naturalWidth || base.width;
      const H = base.naturalHeight || base.height;

      // 1) Composite masters. A tinted layer is either multiplied by its tint
      //    (default, shading-preserving) or flat-recolored (blend='recolor':
      //    source-in masks the fill to the layer alpha — recolors a black
      //    outline, mirroring the app's BlendMode.srcATop). Untinted = as-is.
      const comp = document.createElement("canvas");
      comp.width = W;
      comp.height = H;
      const cc = comp.getContext("2d");
      if (!cc) return;
      layers.forEach((l, i) => {
        const im = imgs[i];
        if (!im) return;
        if (l.tint) {
          const tmp = document.createElement("canvas");
          tmp.width = W;
          tmp.height = H;
          const tctx = tmp.getContext("2d");
          if (!tctx) return;
          tctx.drawImage(im, 0, 0, W, H);
          if (l.blend === "recolor") {
            // Flat recolor: keep the layer's alpha, replace its color.
            tctx.globalCompositeOperation = "source-in";
            tctx.fillStyle = l.tint;
            tctx.fillRect(0, 0, W, H);
          } else {
            tctx.globalCompositeOperation = "multiply";
            tctx.fillStyle = l.tint;
            tctx.fillRect(0, 0, W, H);
            tctx.globalCompositeOperation = "destination-in";
            tctx.drawImage(im, 0, 0, W, H);
          }
          cc.drawImage(tmp, 0, 0);
        } else {
          cc.drawImage(im, 0, 0, W, H);
        }
      });

      // 2) Rotate the whole composite into its bounding box. The art is now
      //    straight; crop coords below are in THIS rotated frame.
      const rad = ((rotation ?? 0) * Math.PI) / 180;
      const cos = Math.abs(Math.cos(rad));
      const sin = Math.abs(Math.sin(rad));
      const rotW = Math.max(1, Math.round(W * cos + H * sin));
      const rotH = Math.max(1, Math.round(W * sin + H * cos));
      const rotCanvas = document.createElement("canvas");
      rotCanvas.width = rotW;
      rotCanvas.height = rotH;
      const rctx = rotCanvas.getContext("2d");
      if (!rctx) return;
      rctx.imageSmoothingEnabled = true;
      rctx.imageSmoothingQuality = "high";
      rctx.translate(rotW / 2, rotH / 2);
      rctx.rotate(rad);
      rctx.drawImage(comp, -W / 2, -H / 2);
      rctx.setTransform(1, 0, 0, 1, 0, 0);

      // 3) Crop rect in rotated-frame px (default full frame).
      const cx = crop ? clamp01(crop.x) * rotW : 0;
      const cy = crop ? clamp01(crop.y) * rotH : 0;
      const cw = crop ? Math.max(1, clamp01(crop.w) * rotW) : rotW;
      const ch = crop ? Math.max(1, clamp01(crop.h) * rotH) : rotH;

      // 4) Blit the cropped region to the output, scaled to bufferWidth.
      const dpr =
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const scale = bufferWidth / cw;
      const finalW = bufferWidth;
      const finalH = Math.max(1, Math.round(ch * scale));

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = Math.round(finalW * dpr);
      canvas.height = Math.round(finalH * dpr);
      canvas.style.aspectRatio = `${cw} / ${ch}`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, finalW, finalH);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(rotCanvas, cx, cy, cw, ch, 0, 0, finalW, finalH);
    })();

    return () => {
      cancelled = true;
    };
    // layersKey captures url/tint changes; the raw array isn't a dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layersKey, crop?.x, crop?.y, crop?.w, crop?.h, rotation, bufferWidth]);

  return (
    <canvas ref={canvasRef} role="img" aria-label={alt} className={className} />
  );
}
