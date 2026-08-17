/* Seed the koi-dex database from the content modules.

   Every module is validated with Zod before a single row is written, so a
   typo in the content (a bad hex, a cross that names a variety that does not
   exist, a plant with no sources) fails loudly here rather than turning into
   a broken page. Inserts are upserts, so the seed is safe to re-run after
   content edits: `npx prisma db seed`. */

import "dotenv/config";
import { z } from "zod";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient, type Prisma } from "../src/generated/prisma/client";
import koiJson from "../data/koi.json";
import { FAMILIES, VARIETY_INFO } from "../src/content/varieties";
import { ANCESTORS, RELATIVES } from "../src/content/ancestors";
import { ORIGINS } from "../src/content/timeline";
import { DOCUMENTED_CROSSES } from "../src/content/breeding";
import { PLANTS } from "../src/content/plants";

// ---------- validation ------------------------------------------------------

const hex = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/)
  .nullable();
const url = z.string().url();

const KoiRow = z.object({
  slug: z.string().regex(/^[a-z0-9_]+$/),
  name: z.string().min(1),
  number: z.number().int().positive(),
  body: z.string().regex(/^koi\/bodies\/[a-z0-9_]+\.webp$/),
  fins: z.object({
    dominant: hex,
    tail: hex,
    dorsal: hex,
    back: hex,
    side: hex,
  }),
});

const VarietyInfoSchema = z.object({
  nameMeaning: z.string(),
  family: z.string().min(1),
  pattern: z.string().min(1),
  origin: z.string().min(1),
  notes: z.string().optional(),
  sources: z.array(url).min(1),
  care: z.array(z.string().min(1)).optional(),
  careSources: z.array(url).optional(),
});

const AncestorSchema = z.object({
  name: z.string().min(1),
  definition: z.string().min(1),
  role: z.string().min(1),
  sources: z.array(url).min(1),
});

const OriginSchema = z.object({
  year: z.number().int().nullable(),
  label: z.string().min(1),
  confidence: z.enum(["documented", "approximate", "disputed"]),
  source: url.optional(),
});

const CrossSchema = z.object({
  parents: z.tuple([z.string().min(1), z.string().min(1)]),
  produces: z.string().min(1),
  note: z.string().min(1),
  source: url,
});

const PlantSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  latinName: z.string().min(1),
  type: z.enum(["floating", "submerged", "marginal"]),
  light: z.string().min(1),
  difficulty: z.enum(["easy", "moderate", "hard"]),
  koiSafe: z.boolean(),
  koiNotes: z.string().min(1),
  hardiness: z.string().min(1),
  planting: z.string().min(1),
  benefits: z.string().min(1),
  description: z.string().min(1),
  nz: z.object({
    status: z.enum(["native", "naturalised", "cultivated", "pest", "unknown"]),
    note: z.string().min(1),
    url: url.optional(),
  }),
  sources: z.array(z.object({ name: z.string().min(1), url })).min(2),
  image: z
    .object({
      path: z.string().regex(/^plants\/[a-z0-9-]+\.webp$/),
      alt: z.string().min(1),
      author: z.string().min(1),
      license: z.string().min(1),
      url,
    })
    .optional(),
});

const koi = z.array(KoiRow).min(1).parse(koiJson);
const info = z.record(z.string(), VarietyInfoSchema).parse(VARIETY_INFO);
const ancestors = z.array(AncestorSchema).parse(ANCESTORS);
const relatives = z.array(AncestorSchema).parse(RELATIVES);
const origins = z.record(z.string(), OriginSchema).parse(ORIGINS);
const crosses = z.array(CrossSchema).parse(DOCUMENTED_CROSSES);
const plants = z.array(PlantSchema).min(1).parse(PLANTS);

// Cross-module checks Zod cannot express on its own.
for (const k of koi) {
  if (!info[k.slug]) throw new Error(`No VARIETY_INFO for ${k.slug}`);
  if (!origins[k.slug]) throw new Error(`No ORIGINS entry for ${k.slug}`);
  if (!(info[k.slug].family in FAMILIES))
    throw new Error(`${k.slug}: unknown family ${info[k.slug].family}`);
}

// ---------- name resolution -------------------------------------------------

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const nameToSlug = new Map<string, string>();
for (const k of koi) nameToSlug.set(k.name.toLowerCase(), k.slug);
for (const a of [...ancestors, ...relatives])
  nameToSlug.set(a.name.toLowerCase(), slugify(a.name));

/** "line-bred metallic offspring" is a description, not a variety: it becomes
    a null second parent, meaning selection within a line. */
const LINE_BRED = new Set(["line-bred metallic offspring"]);

function resolveParty(name: string): string | null {
  const key = name.trim().toLowerCase();
  if (LINE_BRED.has(key)) return null;
  const slug = nameToSlug.get(key);
  if (!slug) throw new Error(`Cross names an unknown variety: "${name}"`);
  return slug;
}

const confidence = {
  documented: "DOCUMENTED",
  approximate: "APPROXIMATE",
  disputed: "DISPUTED",
} as const;

// ---------- write -----------------------------------------------------------

async function main() {
  const summary = {
    koi: koi.length,
    families: Object.keys(FAMILIES).length,
    ancestors: ancestors.length,
    relatives: relatives.length,
    crosses: crosses.length,
    plants: plants.length,
    plantsWithImage: plants.filter((p) => p.image).length,
  };
  // Resolving every cross party proves the lineage data is closed.
  for (const c of crosses) [...c.parents, c.produces].forEach(resolveParty);
  if (process.argv.includes("--validate-only")) {
    console.log("Content modules valid:", summary);
    return;
  }

  const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!connectionString)
    throw new Error("Set DIRECT_URL (or DATABASE_URL) in .env before seeding.");
  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
  });

  try {
    // Families
    for (const [sortOrder, [name, description]] of Object.entries(FAMILIES).entries()) {
      await prisma.family.upsert({
        where: { slug: slugify(name) },
        create: { slug: slugify(name), name, description, sortOrder },
        update: { name, description, sortOrder },
      });
    }

    // Varieties: koi
    for (const k of koi) {
      const i = info[k.slug];
      const o = origins[k.slug];
      const data: Prisma.VarietyUncheckedCreateInput = {
        slug: k.slug,
        name: k.name,
        kind: "KOI",
        dexNumber: k.number,
        bodyPath: k.body,
        finDominant: k.fins.dominant,
        finTail: k.fins.tail,
        finDorsal: k.fins.dorsal,
        finBack: k.fins.back,
        finSide: k.fins.side,
        familySlug: slugify(i.family),
        nameMeaning: i.nameMeaning,
        pattern: i.pattern,
        origin: i.origin,
        notes: i.notes ?? null,
        care: i.care ?? [],
        originYear: o.year,
        originLabel: o.label,
        originConfidence: confidence[o.confidence],
        originSource: o.source ?? null,
      };
      await prisma.variety.upsert({
        where: { slug: k.slug },
        create: data,
        update: data,
      });
      await prisma.source.deleteMany({ where: { varietySlug: k.slug } });
      await prisma.source.createMany({
        data: [
          ...i.sources.map((u, order) => ({
            kind: "VARIETY" as const,
            url: u,
            order,
            varietySlug: k.slug,
          })),
          ...(i.careSources ?? []).map((u, order) => ({
            kind: "CARE" as const,
            url: u,
            order,
            varietySlug: k.slug,
          })),
        ],
      });
    }

    // Varieties: ancestors and relatives (no artwork)
    for (const [list, kind] of [
      [ancestors, "ANCESTOR"],
      [relatives, "RELATIVE"],
    ] as const) {
      for (const a of list) {
        const slug = slugify(a.name);
        const data: Prisma.VarietyUncheckedCreateInput = {
          slug,
          name: a.name,
          kind,
          definition: a.definition,
          role: a.role,
        };
        await prisma.variety.upsert({
          where: { slug },
          create: data,
          update: data,
        });
        await prisma.source.deleteMany({ where: { varietySlug: slug } });
        await prisma.source.createMany({
          data: a.sources.map((u, order) => ({
            kind: "VARIETY" as const,
            url: u,
            order,
            varietySlug: slug,
          })),
        });
      }
    }

    // Breeding outcomes: rebuilt wholesale, they are small and ordered
    await prisma.breedingOutcome.deleteMany();
    await prisma.breedingOutcome.createMany({
      data: crosses.map((c, sortOrder) => ({
        parentASlug: resolveParty(c.parents[0])!,
        parentBSlug: resolveParty(c.parents[1]),
        offspringSlug: resolveParty(c.produces)!,
        note: c.note,
        sourceUrl: c.source,
        sortOrder,
      })),
    });

    // Plants
    for (const p of plants) {
      const data: Prisma.PlantUncheckedCreateInput = {
        slug: p.slug,
        name: p.name,
        latinName: p.latinName,
        type: p.type.toUpperCase() as "FLOATING" | "SUBMERGED" | "MARGINAL",
        light: p.light,
        difficulty: p.difficulty.toUpperCase() as "EASY" | "MODERATE" | "HARD",
        koiSafe: p.koiSafe,
        koiNotes: p.koiNotes,
        hardiness: p.hardiness,
        planting: p.planting,
        benefits: p.benefits,
        description: p.description,
        nzStatus: p.nz.status.toUpperCase() as
          | "NATIVE"
          | "NATURALISED"
          | "CULTIVATED"
          | "PEST"
          | "UNKNOWN",
        nzNote: p.nz.note,
        nzUrl: p.nz.url ?? null,
        imagePath: p.image?.path ?? null,
        imageAlt: p.image?.alt ?? null,
        imageAuthor: p.image?.author ?? null,
        imageLicense: p.image?.license ?? null,
        imageUrl: p.image?.url ?? null,
      };
      await prisma.plant.upsert({
        where: { slug: p.slug },
        create: data,
        update: data,
      });
      await prisma.source.deleteMany({ where: { plantSlug: p.slug } });
      await prisma.source.createMany({
        data: [
          ...p.sources.map((s, order) => ({
            kind: "PLANT" as const,
            url: s.url,
            label: s.name,
            order,
            plantSlug: p.slug,
          })),
          ...(p.nz.url
            ? [
                {
                  kind: "PLANT_NZ" as const,
                  url: p.nz.url,
                  label: "New Zealand status",
                  order: 0,
                  plantSlug: p.slug,
                },
              ]
            : []),
        ],
      });
    }

    const counts = {
      families: await prisma.family.count(),
      varieties: await prisma.variety.count(),
      koi: await prisma.variety.count({ where: { kind: "KOI" } }),
      breedingOutcomes: await prisma.breedingOutcome.count(),
      plants: await prisma.plant.count(),
      sources: await prisma.source.count(),
    };
    console.log("Seeded:", counts);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
