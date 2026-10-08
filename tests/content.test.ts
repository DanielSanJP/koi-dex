import { describe, expect, it } from "vitest";
import { contentSource } from "@/lib/content-source";
import { walkLineage } from "@/lib/shapes";

/* The content modules are the seed source and the no-database fallback, so
   these tests hold both the data and the lineage walk to account. The
   database is checked against the same expectations by scripts/parity-check.ts. */

describe("content: koi", () => {
  it("has 33 varieties, all with a family and drawable sprites", async () => {
    const koi = await contentSource.koiSummaries();
    expect(koi).toHaveLength(33);
    expect(koi.every((k) => k.family && k.koi.body.startsWith("koi/bodies/"))).toBe(true);
    expect(new Set(koi.map((k) => k.dexNumber)).size).toBe(33);
  });
  it("classifies breeding rows without overlap", async () => {
    for (const k of await contentSource.koiSummaries()) {
      const d = (await contentSource.koiDetail(k.slug))!;
      const ids = [...d.producedBy, ...d.parentOf, ...d.refinements].map((o) => o.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(d.lineage.ancestors.some((n) => n.slug === k.slug)).toBe(false);
      expect(d.lineage.descendants.some((n) => n.slug === k.slug)).toBe(false);
    }
  });
});

describe("content: breeding outcomes", () => {
  it("resolve every party, with exactly one line-bred selection", async () => {
    const outcomes = await contentSource.outcomes();
    expect(outcomes).toHaveLength(19);
    expect(outcomes.filter((o) => o.parentB === null)).toHaveLength(1);
    expect(outcomes.find((o) => o.parentB === null)?.offspring.slug).toBe("gold_ogon");
  });
  it("walks Showa's ancestry two generations deep", async () => {
    const outcomes = await contentSource.outcomes();
    const up = walkLineage(outcomes, "showa", "up");
    expect([...up.entries()].map(([slug, v]) => [slug, v.depth]).sort()).toEqual([
      ["ki_bekko", 2],
      ["ki_utsuri", 1],
      ["kohaku", 1],
      ["magoi", 2],
    ]);
  });
  it("walks Kohaku's descendants without looping on refinements", async () => {
    const outcomes = await contentSource.outcomes();
    const down = walkLineage(outcomes, "kohaku", "down");
    expect(down.has("showa")).toBe(true);
    expect(down.has("kohaku")).toBe(false);
    expect(down.get("beni_kumonryu")?.depth).toBe(1);
  });
});

describe("content: plants", () => {
  it("has 20 species with sources, an image and an NZ status each", async () => {
    const plants = await contentSource.plantSummaries();
    expect(plants).toHaveLength(20);
    for (const p of plants) {
      const rec = (await contentSource.plant(p.slug))!;
      expect(rec.sources.filter((s) => s.kind === "PLANT").length).toBeGreaterThanOrEqual(2);
      expect(rec.imagePath).toMatch(/^plants\/[a-z0-9-]+\.webp$/);
      expect(rec.imageLicense).toMatch(/CC|Public domain/);
    }
    expect(plants.filter((p) => p.nzStatus === "PEST")).toHaveLength(5);
  });
});

describe("content: search fallback", () => {
  it("finds koi, art-free varieties and plants", async () => {
    const hits = await contentSource.search("metallic", 20);
    expect(hits.some((h) => h.kind === "koi")).toBe(true);
    expect(hits.some((h) => h.kind === "variety")).toBe(true);
    const iris = await contentSource.search("iris", 5);
    expect(iris[0]?.slug).toBe("water-iris");
  });
});
