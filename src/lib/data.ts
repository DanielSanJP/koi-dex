import koiJson from "../../data/koi.json";
import type { Koi } from "./types";

const koi = koiJson as unknown as Koi[];

export function getAllKoi(): Koi[] {
  return koi;
}

export function getKoi(slug: string): Koi | undefined {
  return koi.find((k) => k.slug === slug);
}

/** Prev/next neighbours in dex order, wrapping around the ends. */
export function getKoiNeighbours(slug: string): { prev: Koi; next: Koi } {
  const i = koi.findIndex((k) => k.slug === slug);
  const n = koi.length;
  return { prev: koi[(i - 1 + n) % n], next: koi[(i + 1) % n] };
}

/** Look up a koi by display name (used to link breeding-cross mentions). */
export function findKoiByName(name: string): Koi | undefined {
  const needle = name.trim().toLowerCase();
  return koi.find((k) => k.name.toLowerCase() === needle);
}

export function formatDexNumber(n: number): string {
  return `#${String(n).padStart(3, "0")}`;
}
