import { cacheLife, cacheTag } from "next/cache";
import { contentSource } from "@/lib/content-source";
import type { DataSource } from "@/lib/shapes";

/* Site-facing reads. Every function is a "use cache" scope tagged by
   subject, so pages prerender at build time and stay static and free to
   host; POST /api/revalidate with the shared secret refreshes a tag on
   demand (after a re-seed, for example). Search is NOT cached: it is per
   query and served by its route handler.

   Source selection: Neon via Prisma when DATABASE_URL is set (the normal
   path, including on Vercel), otherwise the in-repo content modules, so a
   clone with no secrets still builds the whole site. */

export const TAGS = { plants: "plants", koi: "koi", breeding: "breeding" } as const;

export const usingDatabase = () => Boolean(process.env.DATABASE_URL);

async function source(): Promise<DataSource> {
  if (!usingDatabase()) return contentSource;
  const { dbSource } = await import("@/lib/db-source");
  return dbSource;
}

// ---- Koi -----------------------------------------------------------------

export async function getFamilies() {
  "use cache";
  cacheTag(TAGS.koi);
  cacheLife("days");
  return (await source()).families();
}

export async function getKoiSummaries() {
  "use cache";
  cacheTag(TAGS.koi);
  cacheLife("days");
  return (await source()).koiSummaries();
}

export async function getKoiDetail(slug: string) {
  "use cache";
  cacheTag(TAGS.koi);
  cacheTag(TAGS.breeding);
  cacheLife("days");
  return (await source()).koiDetail(slug);
}

// ---- Breeding ------------------------------------------------------------

export async function getOutcomes() {
  "use cache";
  cacheTag(TAGS.breeding);
  cacheLife("days");
  return (await source()).outcomes();
}

export async function getRelatives() {
  "use cache";
  cacheTag(TAGS.breeding);
  cacheLife("days");
  return (await source()).relatives();
}

// ---- Plants --------------------------------------------------------------

export async function getPlantSummaries() {
  "use cache";
  cacheTag(TAGS.plants);
  cacheLife("days");
  return (await source()).plantSummaries();
}

export async function getPlantSlugs(): Promise<string[]> {
  "use cache";
  cacheTag(TAGS.plants);
  cacheLife("days");
  return (await getPlantSummaries()).map((p) => p.slug);
}

export async function getPlantBySlug(slug: string) {
  "use cache";
  cacheTag(TAGS.plants);
  cacheLife("days");
  return (await source()).plant(slug);
}

/** Prev/next in grid order (type, then name), wrapping. */
export async function getPlantNeighbours(slug: string) {
  "use cache";
  cacheTag(TAGS.plants);
  cacheLife("days");
  const all = await getPlantSummaries();
  const i = all.findIndex((p) => p.slug === slug);
  const n = all.length;
  if (i < 0 || n === 0) return null;
  return { prev: all[(i - 1 + n) % n], next: all[(i + 1) % n] };
}

// ---- Search (uncached) -----------------------------------------------------

export async function searchAll(input: string, limit = 12) {
  return (await source()).search(input, limit);
}

export type { PlantSummary, SearchHit } from "@/lib/shapes";
