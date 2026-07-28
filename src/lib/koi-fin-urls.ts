/* Adapted from koi-web/src/lib/koi-fin-urls.ts: same KoiTint shape (the
   copied render components depend on it), resolved from data/koi.json's
   `fins` block instead of Supabase. Fins render from the shared white-base
   sheets (public/assets/fins/white/*) tinted at draw time; per-fin hexes
   fall back to `dominant`. */

export type KoiTint = {
  dominant?: string | null;
  tail?: string | null;
  dorsal?: string | null;
  backFin?: string | null;
  sideFin?: string | null;
  body?: string | null;
};

/** The `fins` object on a data/koi.json row. */
export type KoiFins = {
  dominant: string | null;
  tail: string | null;
  dorsal: string | null;
  back: string | null;
  side: string | null;
};

/** Build a KoiTint from a koi.json row's `fins` block. */
export function koiTintFromFins(fins: KoiFins): KoiTint {
  return {
    dominant: fins.dominant,
    tail: fins.tail,
    dorsal: fins.dorsal,
    backFin: fins.back,
    sideFin: fins.side,
    body: null,
  };
}
