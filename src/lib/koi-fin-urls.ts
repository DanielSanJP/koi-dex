/* Adapted from koi-web/src/lib/koi-fin-urls.ts: same KoiTint shape, but
   resolved from the local data snapshot instead of Supabase. Fins render
   from the shared white-base sheets (public/assets/fins/white/*) tinted at
   draw time; per-fin hexes fall back to `dominant`. */

export type KoiTint = {
  dominant?: string | null;
  tail?: string | null;
  dorsal?: string | null;
  backFin?: string | null;
  sideFin?: string | null;
  body?: string | null;
};

type EncyclopediaRow = {
  dominant_color_hex?: string | null;
  tail_fin_color_hex?: string | null;
  dorsal_fin_color_hex?: string | null;
  back_fin_color_hex?: string | null;
  side_fin_color_hex?: string | null;
  body_color_hex?: string | null;
} | null;

/** Build a KoiTint from a koi.json row's nested `encyclopedia` object. */
export function koiTintFromEncyclopedia(enc: EncyclopediaRow): KoiTint {
  return {
    dominant: enc?.dominant_color_hex ?? null,
    tail: enc?.tail_fin_color_hex ?? null,
    dorsal: enc?.dorsal_fin_color_hex ?? null,
    backFin: enc?.back_fin_color_hex ?? null,
    sideFin: enc?.side_fin_color_hex ?? null,
    body: enc?.body_color_hex ?? null,
  };
}
