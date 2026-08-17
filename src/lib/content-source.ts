import koiJson from "../../data/koi.json";
import { ANCESTORS, RELATIVES } from "@/content/ancestors";
import { DOCUMENTED_CROSSES } from "@/content/breeding";
import { PLANTS } from "@/content/plants";
import { ORIGINS } from "@/content/timeline";
import { FAMILIES, VARIETY_INFO } from "@/content/varieties";
import type {
  DataSource,
  Family,
  KoiSummary,
  Outcome,
  Party,
  PlantRecord,
  PlantSummary,
  Relative,
  SearchHit,
} from "@/lib/shapes";
import { walkLineage } from "@/lib/shapes";
import type { Koi } from "@/lib/types";

/* The content modules as a DataSource: the same data the seed loads into
   Neon, served straight from the repo. Used when DATABASE_URL is not set
   (a fresh clone, CI without secrets) and by the parity tests. It is the
   fallback the proposal promised: the site never depends on the database
   being reachable to build. */

const koi = koiJson as unknown as Koi[];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const CONF = { documented: "DOCUMENTED", approximate: "APPROXIMATE", disputed: "DISPUTED" } as const;

const families: Family[] = Object.entries(FAMILIES).map(([name, description]) => ({
  slug: slugify(name),
  name,
  description,
}));

const parties = new Map<string, Party>();
for (const k of koi) parties.set(k.slug, { slug: k.slug, name: k.name, kind: "KOI", koi: k });
for (const a of ANCESTORS) parties.set(slugify(a.name), { slug: slugify(a.name), name: a.name, kind: "ANCESTOR", koi: null });
for (const r of RELATIVES) parties.set(slugify(r.name), { slug: slugify(r.name), name: r.name, kind: "RELATIVE", koi: null });
const byName = new Map([...parties.values()].map((p) => [p.name.toLowerCase(), p]));

const LINE_BRED = new Set(["line-bred metallic offspring"]);
function party(name: string): Party | null {
  const key = name.trim().toLowerCase();
  if (LINE_BRED.has(key)) return null;
  const p = byName.get(key);
  if (!p) throw new Error(`Cross names an unknown variety: "${name}"`);
  return p;
}

const outcomes: Outcome[] = DOCUMENTED_CROSSES.map((c, i) => ({
  id: i + 1,
  parentA: party(c.parents[0])!,
  parentB: party(c.parents[1]),
  offspring: party(c.produces)!,
  note: c.note,
  sourceUrl: c.source,
  sortOrder: i,
}));

function summary(k: Koi): KoiSummary {
  const info = VARIETY_INFO[k.slug];
  const o = ORIGINS[k.slug];
  const fam = info ? families.find((f) => f.name === info.family) ?? null : null;
  return {
    slug: k.slug,
    name: k.name,
    dexNumber: k.number,
    koi: k,
    family: fam ? { slug: fam.slug, name: fam.name } : null,
    originYear: o?.year ?? null,
    originLabel: o?.label ?? null,
    originConfidence: o ? CONF[o.confidence] : null,
  };
}

const plantRecords: PlantRecord[] = PLANTS.map((p, i) => ({
  slug: p.slug,
  name: p.name,
  latinName: p.latinName,
  type: p.type.toUpperCase() as PlantRecord["type"],
  difficulty: p.difficulty.toUpperCase() as PlantRecord["difficulty"],
  koiSafe: p.koiSafe,
  nzStatus: p.nz.status.toUpperCase() as PlantRecord["nzStatus"],
  imagePath: p.image?.path ?? null,
  imageAlt: p.image?.alt ?? null,
  light: p.light,
  koiNotes: p.koiNotes,
  hardiness: p.hardiness,
  planting: p.planting,
  benefits: p.benefits,
  description: p.description,
  nzNote: p.nz.note,
  nzUrl: p.nz.url ?? null,
  imageAuthor: p.image?.author ?? null,
  imageLicense: p.image?.license ?? null,
  imageUrl: p.image?.url ?? null,
  sources: [
    ...p.sources.map((s, order) => ({ id: i * 100 + order, kind: "PLANT", url: s.url, label: s.name, order })),
    ...(p.nz.url ? [{ id: i * 100 + 99, kind: "PLANT_NZ", url: p.nz.url, label: "New Zealand status", order: 0 }] : []),
  ],
}));

const TYPE_ORDER = { FLOATING: 0, SUBMERGED: 1, MARGINAL: 2 } as const;
const sortedPlants = [...plantRecords].sort(
  (a, b) => TYPE_ORDER[a.type] - TYPE_ORDER[b.type] || a.name.localeCompare(b.name),
);

function highlight(text: string, words: string[]): string {
  const esc = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${words.map(esc).join("|")})`, "gi");
  const idx = text.search(re);
  const start = Math.max(0, idx - 60);
  const slice = (start > 0 ? "…" : "") + text.slice(start, start + 160) + (start + 160 < text.length ? "…" : "");
  return slice.replace(re, "<b>$1</b>");
}

export const contentSource: DataSource = {
  async families() {
    return families;
  },
  async koiSummaries() {
    return koi.map(summary);
  },
  async koiDetail(slug) {
    const k = koi.find((x) => x.slug === slug);
    if (!k) return null;
    const info = VARIETY_INFO[slug];
    const s = summary(k);
    const isMe = (p: Party | null) => p?.slug === slug;
    return {
      ...s,
      nameMeaning: info?.nameMeaning ?? null,
      pattern: info?.pattern ?? null,
      origin: info?.origin ?? null,
      notes: info?.notes ?? null,
      care: info?.care ?? [],
      sources: [
        ...(info?.sources ?? []).map((url) => ({ kind: "VARIETY", url, label: null })),
        ...(info?.careSources ?? []).map((url) => ({ kind: "CARE", url, label: null })),
      ],
      producedBy: outcomes.filter((o) => isMe(o.offspring) && !isMe(o.parentA) && !isMe(o.parentB)),
      parentOf: outcomes.filter((o) => (isMe(o.parentA) || isMe(o.parentB)) && !isMe(o.offspring)),
      refinements: outcomes.filter((o) => isMe(o.offspring) && (isMe(o.parentA) || isMe(o.parentB))),
      lineage: {
        ancestors: [...walkLineage(outcomes, slug, "up").values()]
          .map(({ party, depth }) => ({ ...party, depth }))
          .sort((a, b) => a.depth - b.depth || a.name.localeCompare(b.name)),
        descendants: [...walkLineage(outcomes, slug, "down").values()]
          .map(({ party, depth }) => ({ ...party, depth }))
          .sort((a, b) => a.depth - b.depth || a.name.localeCompare(b.name)),
      },
    };
  },
  async relatives() {
    const rel: Relative[] = [];
    for (const [list, kind] of [[ANCESTORS, "ANCESTOR"], [RELATIVES, "RELATIVE"]] as const) {
      for (const a of list) {
        rel.push({
          slug: slugify(a.name),
          name: a.name,
          kind,
          definition: a.definition,
          role: a.role,
          sources: a.sources.map((url) => ({ kind: "VARIETY", url, label: null })),
        });
      }
    }
    return rel.sort((a, b) => a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name));
  },
  async outcomes() {
    return outcomes;
  },
  async plantSummaries() {
    return sortedPlants.map((p): PlantSummary => ({
      slug: p.slug, name: p.name, latinName: p.latinName, type: p.type, difficulty: p.difficulty,
      koiSafe: p.koiSafe, nzStatus: p.nzStatus, imagePath: p.imagePath, imageAlt: p.imageAlt,
    }));
  },
  async plant(slug) {
    return sortedPlants.find((p) => p.slug === slug) ?? null;
  },
  async search(q, limit) {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    const hits: SearchHit[] = [];
    for (const p of parties.values()) {
      const info = p.kind === "KOI" ? VARIETY_INFO[p.slug] : undefined;
      const anc = p.kind !== "KOI" ? [...ANCESTORS, ...RELATIVES].find((a) => a.name === p.name) : undefined;
      const body = info ? `${info.pattern} ${info.origin} ${info.notes ?? ""}` : `${anc?.definition ?? ""} ${anc?.role ?? ""}`;
      const hay = `${p.name} ${body}`.toLowerCase();
      if (!words.every((w) => hay.includes(w))) continue;
      const nameHit = words.some((w) => p.name.toLowerCase().includes(w));
      hits.push({
        kind: p.kind === "KOI" ? "koi" : "variety",
        slug: p.slug,
        name: p.name,
        subtitle: p.kind === "KOI" ? (info ? info.family : null) : "not in the dex",
        snippet: highlight(info?.pattern ?? anc?.definition ?? "", words),
        rank: nameHit ? 1 : 0.5,
      });
    }
    for (const p of sortedPlants) {
      const hay = `${p.name} ${p.latinName} ${p.description} ${p.koiNotes} ${p.benefits}`.toLowerCase();
      if (!words.every((w) => hay.includes(w))) continue;
      const nameHit = words.some((w) => `${p.name} ${p.latinName}`.toLowerCase().includes(w));
      hits.push({ kind: "plant", slug: p.slug, name: p.name, subtitle: p.latinName, snippet: highlight(p.description, words), rank: nameHit ? 1 : 0.5 });
    }
    return hits.sort((a, b) => b.rank - a.rank || a.name.localeCompare(b.name)).slice(0, limit);
  },
};
