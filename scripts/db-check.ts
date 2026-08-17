/* Smoke-test the seeded database through the app's client (pooled URL):
   `npx tsx scripts/db-check.ts`. Also previews the recursive lineage query. */
import "dotenv/config";
import { prisma } from "../src/lib/db";

async function main() {
  const showa = await prisma.variety.findUnique({
    where: { slug: "showa" },
    include: { family: true, producedBy: { include: { parentA: true, parentB: true } }, sources: true },
  });
  console.log("showa:", showa?.name, "|", showa?.family?.name, "| dex", showa?.dexNumber,
    "| producedBy", showa?.producedBy.map((o) => `${o.parentA.name} x ${o.parentB?.name ?? "(line)"}`),
    "| sources", showa?.sources.length);
  // Every ancestor of a variety, walking up both parents; the depth cap and
  // the self-cross guard keep refinement rows (Showa x Kohaku -> Showa) from
  // looping. This is the query the week-10 lineage feature is built on.
  const lineage = await prisma.$queryRaw<{ slug: string; depth: number }[]>`
    WITH RECURSIVE up AS (
      SELECT p.slug, 1 AS depth
      FROM breeding_outcomes b, LATERAL (VALUES (b.parent_a_slug), (b.parent_b_slug)) AS p(slug)
      WHERE b.offspring_slug = 'showa' AND p.slug IS NOT NULL AND p.slug <> b.offspring_slug
      UNION
      SELECT p.slug, up.depth + 1
      FROM up
      JOIN breeding_outcomes b ON b.offspring_slug = up.slug,
      LATERAL (VALUES (b.parent_a_slug), (b.parent_b_slug)) AS p(slug)
      WHERE p.slug IS NOT NULL AND p.slug <> b.offspring_slug AND up.depth < 8
    )
    SELECT slug, MIN(depth)::int AS depth FROM up WHERE slug <> 'showa' GROUP BY slug ORDER BY depth, slug`;
  console.log("ancestors of showa:", lineage);
  console.log("line-bred rows (null parent B):", await prisma.breedingOutcome.count({ where: { parentBSlug: null } }));
  console.log("pest plants:", (await prisma.plant.findMany({ where: { nzStatus: "PEST" }, select: { name: true } })).map((p) => p.name));
  await prisma.$disconnect();
}
main().catch((e) => { console.error(e); process.exit(1); });
