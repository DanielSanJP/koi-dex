import type { Metadata } from "next";
import DexGrid from "@/components/dex-grid";
import { getFamilies, getKoiSummaries } from "@/lib/queries";

export const metadata: Metadata = {
  title: "All varieties",
  description: "All the real koi varieties in one browsable encyclopedia.",
};

export default async function KoiIndexPage() {
  const [summaries, families] = await Promise.all([getKoiSummaries(), getFamilies()]);
  const koi = summaries.map((s) => ({ ...s.koi, family: s.family?.name ?? null }));
  const familyNames = families
    .map((f) => f.name)
    .filter((name) => koi.some((k) => k.family === name));
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8">
      <h1 className="font-pally text-3xl font-bold">Koi-dex</h1>
      <p className="mt-2 mb-8 max-w-prose text-black/60">
        {koi.length} koi varieties, drawn the way the Koi app draws them. Pick
        one to see its pattern, its history, how to care for it, and what it
        produces in breeding. Real koi classification runs wider than this;
        the breeding guide names the varieties there is no artwork for.
      </p>
      <DexGrid koi={koi} families={familyNames} />
    </div>
  );
}
