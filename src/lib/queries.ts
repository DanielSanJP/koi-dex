import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/db";
import type { PlantType } from "@/generated/prisma/enums";

/* Database reads for the site. Every function is a "use cache" scope tagged
   by subject, so pages prerender at build time from Neon and stay static and
   free to host; POST /api/revalidate with the shared secret refreshes a tag
   on demand (after a re-seed, for example). Search is deliberately NOT
   cached: it is per-query and served by the route handler. */

export const TAGS = {
  plants: "plants",
  koi: "koi",
  breeding: "breeding",
} as const;

// ---- Plants ---------------------------------------------------------------

export type PlantSummary = {
  slug: string;
  name: string;
  latinName: string;
  type: PlantType;
  difficulty: "EASY" | "MODERATE" | "HARD";
  koiSafe: boolean;
  nzStatus: "NATIVE" | "NATURALISED" | "CULTIVATED" | "PEST" | "UNKNOWN";
  imagePath: string | null;
  imageAlt: string | null;
};

export async function getPlantSummaries(): Promise<PlantSummary[]> {
  "use cache";
  cacheTag(TAGS.plants);
  cacheLife("days");
  return prisma.plant.findMany({
    orderBy: [{ type: "asc" }, { name: "asc" }],
    select: {
      slug: true,
      name: true,
      latinName: true,
      type: true,
      difficulty: true,
      koiSafe: true,
      nzStatus: true,
      imagePath: true,
      imageAlt: true,
    },
  });
}

export async function getPlantSlugs(): Promise<string[]> {
  "use cache";
  cacheTag(TAGS.plants);
  cacheLife("days");
  const rows = await prisma.plant.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}

export async function getPlantBySlug(slug: string) {
  "use cache";
  cacheTag(TAGS.plants);
  cacheLife("days");
  return prisma.plant.findUnique({
    where: { slug },
    include: { sources: { orderBy: [{ kind: "asc" }, { order: "asc" }] } },
  });
}

/** Prev/next in the same order as the grid (type, then name), wrapping. */
export async function getPlantNeighbours(slug: string) {
  "use cache";
  cacheTag(TAGS.plants);
  cacheLife("days");
  const all = await prisma.plant.findMany({
    orderBy: [{ type: "asc" }, { name: "asc" }],
    select: { slug: true, name: true },
  });
  const i = all.findIndex((p) => p.slug === slug);
  const n = all.length;
  if (i < 0 || n === 0) return null;
  return { prev: all[(i - 1 + n) % n], next: all[(i + 1) % n] };
}

// ---- Koi (varieties of kind KOI) -------------------------------------------

export async function getKoiSummaries() {
  "use cache";
  cacheTag(TAGS.koi);
  cacheLife("days");
  return prisma.variety.findMany({
    where: { kind: "KOI" },
    orderBy: { dexNumber: "asc" },
    select: {
      slug: true,
      name: true,
      dexNumber: true,
      bodyPath: true,
      finDominant: true,
      finTail: true,
      finDorsal: true,
      finBack: true,
      finSide: true,
      family: { select: { slug: true, name: true } },
      originYear: true,
      originLabel: true,
    },
  });
}

export async function getKoiDetail(slug: string) {
  "use cache";
  cacheTag(TAGS.koi);
  cacheTag(TAGS.breeding);
  cacheLife("days");
  return prisma.variety.findFirst({
    where: { slug, kind: "KOI" },
    include: {
      family: true,
      sources: { orderBy: [{ kind: "asc" }, { order: "asc" }] },
      producedBy: {
        orderBy: { sortOrder: "asc" },
        include: { parentA: true, parentB: true, offspring: true },
      },
      parentAOf: {
        orderBy: { sortOrder: "asc" },
        include: { parentA: true, parentB: true, offspring: true },
      },
      parentBOf: {
        orderBy: { sortOrder: "asc" },
        include: { parentA: true, parentB: true, offspring: true },
      },
    },
  });
}

// ---- Search (uncached, per query) ------------------------------------------

export type SearchHit = {
  kind: "koi" | "variety" | "plant";
  slug: string;
  name: string;
  subtitle: string | null;
  snippet: string;
  rank: number;
};

/** Turn free text into a prefix-matching tsquery: "kohaku bre" ->
    'kohaku' & 'bre':*  Non-word characters are stripped so user input can
    never break the query. */
export function toTsQuery(input: string): string | null {
  const words = input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6);
  if (words.length === 0) return null;
  return words.map((w, i) => (i === words.length - 1 ? `${w}:*` : w)).join(" & ");
}

export async function searchAll(input: string, limit = 12): Promise<SearchHit[]> {
  const q = toTsQuery(input);
  if (!q) return [];
  const rows = await prisma.$queryRaw<SearchHit[]>`
    WITH q AS (SELECT to_tsquery('english', ${q}) AS query)
    SELECT * FROM (
      SELECT
        CASE WHEN v.kind = 'KOI' THEN 'koi' ELSE 'variety' END AS kind,
        v.slug, v.name,
        CASE WHEN v.kind = 'KOI' THEN f.name ELSE 'not in the dex' END AS subtitle,
        ts_headline('english', coalesce(v.pattern, v.definition, ''), q.query,
          'MaxFragments=1, MaxWords=18, MinWords=8, StartSel=<b>, StopSel=</b>') AS snippet,
        ts_rank(v.search, q.query)::float AS rank
      FROM varieties v
      LEFT JOIN families f ON f.slug = v.family_slug, q
      WHERE v.search @@ q.query
      UNION ALL
      SELECT
        'plant' AS kind, p.slug, p.name, p.latin_name AS subtitle,
        ts_headline('english', p.description, q.query,
          'MaxFragments=1, MaxWords=18, MinWords=8, StartSel=<b>, StopSel=</b>') AS snippet,
        ts_rank(p.search, q.query)::float AS rank
      FROM plants p, q
      WHERE p.search @@ q.query
    ) hits
    ORDER BY rank DESC, name ASC
    LIMIT ${limit}`;
  return rows;
}
