import type { Koi } from "@/lib/types";

/* The shapes the pages consume, independent of where they come from. Two
   sources produce them: the database (src/lib/db-source.ts, the normal path)
   and the in-repo content modules (src/lib/content-source.ts, used when no
   DATABASE_URL is set so a fresh clone still builds, and as the parity check
   in tests). */

export type VarietyKind = "KOI" | "ANCESTOR" | "RELATIVE";
export type Confidence = "DOCUMENTED" | "APPROXIMATE" | "DISPUTED";

/** One party in a cross: a drawable koi (`koi` set) or an art-free variety. */
export type Party = {
  slug: string;
  name: string;
  kind: VarietyKind;
  koi: Koi | null;
};

/** A documented breeding relationship. `parentB` null = selection within a
    line rather than a pairing of two named varieties. */
export type Outcome = {
  id: number;
  parentA: Party;
  parentB: Party | null;
  offspring: Party;
  note: string;
  sourceUrl: string;
  sortOrder: number;
};

export type KoiSummary = {
  slug: string;
  name: string;
  dexNumber: number;
  koi: Koi;
  family: { slug: string; name: string } | null;
  originYear: number | null;
  originLabel: string | null;
  originConfidence: Confidence | null;
};

export type SourceRef = { kind: string; url: string; label: string | null };

export type LineageNode = { slug: string; name: string; kind: VarietyKind; depth: number; koi: Koi | null };

export type Lineage = {
  ancestors: LineageNode[];
  descendants: LineageNode[];
};

export type KoiDetail = KoiSummary & {
  nameMeaning: string | null;
  pattern: string | null;
  origin: string | null;
  notes: string | null;
  care: string[];
  sources: SourceRef[];
  /** Crosses that produced this variety (it is the offspring, not a parent). */
  producedBy: Outcome[];
  /** Crosses where it is a parent of a different variety. */
  parentOf: Outcome[];
  /** Crosses where it is both a parent and the offspring (a refinement). */
  refinements: Outcome[];
  lineage: Lineage;
};

export type Relative = {
  slug: string;
  name: string;
  kind: VarietyKind;
  definition: string | null;
  role: string | null;
  sources: SourceRef[];
};

export type Family = { slug: string; name: string; description: string };

/** Build the drawable koi from a variety row's sprite/tint columns. */
export function toKoi(v: {
  slug: string;
  name: string;
  dexNumber: number | null;
  bodyPath: string | null;
  finDominant: string | null;
  finTail: string | null;
  finDorsal: string | null;
  finBack: string | null;
  finSide: string | null;
}): Koi | null {
  if (v.dexNumber == null || !v.bodyPath) return null;
  return {
    slug: v.slug,
    name: v.name,
    number: v.dexNumber,
    body: v.bodyPath,
    fins: {
      dominant: v.finDominant,
      tail: v.finTail,
      dorsal: v.finDorsal,
      back: v.finBack,
      side: v.finSide,
    },
  };
}

/** Walk outcomes in JS: every ancestor (up) or descendant (down) of a slug
    with the shortest depth. Refinement rows (a variety bred back to itself)
    are skipped so the walk cannot loop. Same semantics as the recursive SQL. */
export function walkLineage(
  outcomes: Outcome[],
  start: string,
  direction: "up" | "down",
  maxDepth = 8,
): Map<string, { party: Party; depth: number }> {
  const seen = new Map<string, { party: Party; depth: number }>();
  let frontier = [start];
  for (let depth = 1; depth <= maxDepth && frontier.length; depth++) {
    const next: string[] = [];
    for (const slug of frontier) {
      for (const o of outcomes) {
        if (direction === "up") {
          if (o.offspring.slug !== slug) continue;
          for (const p of [o.parentA, o.parentB]) {
            if (!p || p.slug === o.offspring.slug || p.slug === start || seen.has(p.slug)) continue;
            seen.set(p.slug, { party: p, depth });
            next.push(p.slug);
          }
        } else {
          const isParent = o.parentA.slug === slug || o.parentB?.slug === slug;
          if (!isParent || o.offspring.slug === slug) continue;
          const c = o.offspring;
          if (c.slug === start || seen.has(c.slug)) continue;
          seen.set(c.slug, { party: c, depth });
          next.push(c.slug);
        }
      }
    }
    frontier = next;
  }
  return seen;
}

// ---- Plants ---------------------------------------------------------------

export type PlantType = "FLOATING" | "SUBMERGED" | "MARGINAL";
export type Difficulty = "EASY" | "MODERATE" | "HARD";
export type NzStatus = "NATIVE" | "NATURALISED" | "CULTIVATED" | "PEST" | "UNKNOWN";

export type PlantSummary = {
  slug: string;
  name: string;
  latinName: string;
  type: PlantType;
  difficulty: Difficulty;
  koiSafe: boolean;
  nzStatus: NzStatus;
  imagePath: string | null;
  imageAlt: string | null;
};

export type PlantRecord = PlantSummary & {
  light: string;
  koiNotes: string;
  hardiness: string;
  planting: string;
  benefits: string;
  description: string;
  nzNote: string;
  nzUrl: string | null;
  imageAuthor: string | null;
  imageLicense: string | null;
  imageUrl: string | null;
  sources: { id: number; kind: string; url: string; label: string | null; order: number }[];
};

export type SearchHit = {
  kind: "koi" | "variety" | "plant";
  slug: string;
  name: string;
  subtitle: string | null;
  snippet: string;
  rank: number;
};

/** The read interface both sources implement. */
export interface DataSource {
  families(): Promise<Family[]>;
  koiSummaries(): Promise<KoiSummary[]>;
  koiDetail(slug: string): Promise<KoiDetail | null>;
  relatives(): Promise<Relative[]>; // ANCESTOR + RELATIVE rows
  outcomes(): Promise<Outcome[]>;
  plantSummaries(): Promise<PlantSummary[]>;
  plant(slug: string): Promise<PlantRecord | null>;
  search(q: string, limit: number): Promise<SearchHit[]>;
}
