import { prisma } from "@/lib/db";
import type {
  DataSource,
  KoiDetail,
  KoiSummary,
  LineageNode,
  Outcome,
  Party,
  PlantRecord,
  SearchHit,
  VarietyKind,
} from "@/lib/shapes";
import { toKoi } from "@/lib/shapes";
import { toTsQuery } from "@/lib/search-query";

/* Neon Postgres via Prisma as a DataSource. Lineage is computed in the
   database with a recursive CTE (both directions), which is what the family
   tree, the pairing explorer and each koi page use. */

type VarietyRow = {
  slug: string;
  name: string;
  kind: VarietyKind;
  dexNumber: number | null;
  bodyPath: string | null;
  finDominant: string | null;
  finTail: string | null;
  finDorsal: string | null;
  finBack: string | null;
  finSide: string | null;
};

const partySelect = {
  slug: true, name: true, kind: true, dexNumber: true, bodyPath: true,
  finDominant: true, finTail: true, finDorsal: true, finBack: true, finSide: true,
} as const;

const toParty = (v: VarietyRow): Party => ({ slug: v.slug, name: v.name, kind: v.kind, koi: toKoi(v) });

type OutcomeRow = {
  id: number; note: string; sourceUrl: string; sortOrder: number;
  parentA: VarietyRow; parentB: VarietyRow | null; offspring: VarietyRow;
};
const toOutcome = (o: OutcomeRow): Outcome => ({
  id: o.id,
  parentA: toParty(o.parentA),
  parentB: o.parentB ? toParty(o.parentB) : null,
  offspring: toParty(o.offspring),
  note: o.note,
  sourceUrl: o.sourceUrl,
  sortOrder: o.sortOrder,
});

/** Every ancestor (up) or descendant (down) of `slug` with shortest depth.
    One recursive term walks both parents through LATERAL VALUES; refinement
    rows (offspring == a parent) are skipped so the walk cannot loop. */
async function lineage(slug: string, direction: "up" | "down"): Promise<LineageNode[]> {
  const rows =
    direction === "up"
      ? await prisma.$queryRaw<{ slug: string; depth: number }[]>`
        WITH RECURSIVE walk AS (
          SELECT p.slug, 1 AS depth
          FROM breeding_outcomes b, LATERAL (VALUES (b.parent_a_slug), (b.parent_b_slug)) AS p(slug)
          WHERE b.offspring_slug = ${slug} AND p.slug IS NOT NULL AND p.slug <> b.offspring_slug
          UNION
          SELECT p.slug, walk.depth + 1
          FROM walk
          JOIN breeding_outcomes b ON b.offspring_slug = walk.slug,
          LATERAL (VALUES (b.parent_a_slug), (b.parent_b_slug)) AS p(slug)
          WHERE p.slug IS NOT NULL AND p.slug <> b.offspring_slug AND walk.depth < 8
        )
        SELECT slug, MIN(depth)::int AS depth FROM walk WHERE slug <> ${slug} GROUP BY slug`
      : await prisma.$queryRaw<{ slug: string; depth: number }[]>`
        WITH RECURSIVE walk AS (
          SELECT b.offspring_slug AS slug, 1 AS depth
          FROM breeding_outcomes b
          WHERE (b.parent_a_slug = ${slug} OR b.parent_b_slug = ${slug}) AND b.offspring_slug <> ${slug}
          UNION
          SELECT b.offspring_slug, walk.depth + 1
          FROM walk
          JOIN breeding_outcomes b ON (b.parent_a_slug = walk.slug OR b.parent_b_slug = walk.slug)
          WHERE b.offspring_slug <> walk.slug AND walk.depth < 8
        )
        SELECT slug, MIN(depth)::int AS depth FROM walk WHERE slug <> ${slug} GROUP BY slug`;
  if (rows.length === 0) return [];
  const varieties = await prisma.variety.findMany({
    where: { slug: { in: rows.map((r) => r.slug) } },
    select: partySelect,
  });
  const bySlug = new Map(varieties.map((v) => [v.slug, v]));
  return rows
    .flatMap((r) => {
      const v = bySlug.get(r.slug);
      return v ? [{ ...toParty(v), depth: r.depth }] : [];
    })
    .sort((a, b) => a.depth - b.depth || a.name.localeCompare(b.name));
}

const outcomeInclude = {
  parentA: { select: partySelect },
  parentB: { select: partySelect },
  offspring: { select: partySelect },
} as const;

export const dbSource: DataSource = {
  async families() {
    const rows = await prisma.family.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.map(({ slug, name, description }) => ({ slug, name, description }));
  },
  async koiSummaries() {
    const rows = await prisma.variety.findMany({
      where: { kind: "KOI" },
      orderBy: { dexNumber: "asc" },
      select: { ...partySelect, family: { select: { slug: true, name: true } }, originYear: true, originLabel: true, originConfidence: true },
    });
    return rows.flatMap((v): KoiSummary[] => {
      const koi = toKoi(v);
      return koi
        ? [{ slug: v.slug, name: v.name, dexNumber: v.dexNumber!, koi, family: v.family, originYear: v.originYear, originLabel: v.originLabel, originConfidence: v.originConfidence }]
        : [];
    });
  },
  async koiDetail(slug) {
    const v = await prisma.variety.findFirst({
      where: { slug, kind: "KOI" },
      include: {
        family: true,
        sources: { orderBy: [{ kind: "asc" }, { order: "asc" }] },
        producedBy: { orderBy: { sortOrder: "asc" }, include: outcomeInclude },
        parentAOf: { orderBy: { sortOrder: "asc" }, include: outcomeInclude },
        parentBOf: { orderBy: { sortOrder: "asc" }, include: outcomeInclude },
      },
    });
    if (!v) return null;
    const koi = toKoi(v);
    if (!koi) return null;
    const all = new Map<number, Outcome>();
    for (const o of [...v.producedBy, ...v.parentAOf, ...v.parentBOf]) all.set(o.id, toOutcome(o));
    const outcomes = [...all.values()].sort((a, b) => a.sortOrder - b.sortOrder);
    const isMe = (p: Party | null) => p?.slug === slug;
    const [ancestors, descendants] = await Promise.all([lineage(slug, "up"), lineage(slug, "down")]);
    const detail: KoiDetail = {
      slug: v.slug,
      name: v.name,
      dexNumber: v.dexNumber!,
      koi,
      family: v.family ? { slug: v.family.slug, name: v.family.name } : null,
      originYear: v.originYear,
      originLabel: v.originLabel,
      originConfidence: v.originConfidence,
      nameMeaning: v.nameMeaning,
      pattern: v.pattern,
      origin: v.origin,
      notes: v.notes,
      care: v.care,
      sources: v.sources.map((s) => ({ kind: s.kind, url: s.url, label: s.label })),
      producedBy: outcomes.filter((o) => isMe(o.offspring) && !isMe(o.parentA) && !isMe(o.parentB)),
      parentOf: outcomes.filter((o) => (isMe(o.parentA) || isMe(o.parentB)) && !isMe(o.offspring)),
      refinements: outcomes.filter((o) => isMe(o.offspring) && (isMe(o.parentA) || isMe(o.parentB))),
      lineage: { ancestors, descendants },
    };
    return detail;
  },
  async relatives() {
    const rows = await prisma.variety.findMany({
      where: { kind: { in: ["ANCESTOR", "RELATIVE"] } },
      orderBy: [{ kind: "asc" }, { name: "asc" }],
      include: { sources: { orderBy: { order: "asc" } } },
    });
    return rows.map((r) => ({
      slug: r.slug, name: r.name, kind: r.kind, definition: r.definition, role: r.role,
      sources: r.sources.map((s) => ({ kind: s.kind, url: s.url, label: s.label })),
    }));
  },
  async outcomes() {
    const rows = await prisma.breedingOutcome.findMany({ orderBy: { sortOrder: "asc" }, include: outcomeInclude });
    return rows.map(toOutcome);
  },
  async plantSummaries() {
    return prisma.plant.findMany({
      orderBy: [{ type: "asc" }, { name: "asc" }],
      select: { slug: true, name: true, latinName: true, type: true, difficulty: true, koiSafe: true, nzStatus: true, imagePath: true, imageAlt: true },
    });
  },
  async plant(slug) {
    const p = await prisma.plant.findUnique({
      where: { slug },
      include: { sources: { orderBy: [{ kind: "asc" }, { order: "asc" }] } },
    });
    if (!p) return null;
    const rec: PlantRecord = { ...p, sources: p.sources.map((s) => ({ id: s.id, kind: s.kind, url: s.url, label: s.label, order: s.order })) };
    return rec;
  },
  async search(input, limit) {
    const q = toTsQuery(input);
    if (!q) return [];
    return prisma.$queryRaw<SearchHit[]>`
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
  },
};
