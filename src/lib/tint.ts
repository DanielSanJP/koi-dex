import type { KoiFins } from "@/lib/types";

/* Fin tint resolution, exactly as the app does it: each fin layer takes its
   own hex if set, otherwise the dominant hex, otherwise no tint; the app's
   data uses #000000 to mean "no tint", so that reads as null too. */

export function usableTint(hex: string | null | undefined): string | null {
  if (!hex) return null;
  const clean = hex.replace("#", "").toLowerCase();
  if (clean === "000000" || clean === "00000000") return null;
  return hex;
}

export type FinPart = "back" | "tail" | "dorsal" | "side";

export function tintFor(fins: KoiFins, part: FinPart): string | null {
  return usableTint(fins[part]) ?? usableTint(fins.dominant);
}
