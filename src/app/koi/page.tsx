import type { Metadata } from "next";
import DexGrid from "@/components/dex-grid";
import { VARIETY_INFO, FAMILIES } from "@/content/varieties";
import { getAllKoi } from "@/lib/data";

export const metadata: Metadata = {
  title: "All varieties",
  description: "All the real koi varieties in one browsable encyclopedia.",
};

export default function KoiIndexPage() {
  const koi = getAllKoi().map((k) => ({
    ...k,
    family: VARIETY_INFO[k.slug]?.family ?? null,
  }));
  const families = Object.keys(FAMILIES).filter((f) =>
    koi.some((k) => k.family === f),
  );
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8">
      <h1 className="font-pally text-3xl font-bold">Koi-dex</h1>
      <p className="mt-2 mb-8 max-w-prose text-black/60">
        The {koi.length} real koi varieties, rendered the way the Koi app draws
        them. Pick one to see its pattern, its history, and what it produces in
        breeding.
      </p>
      <DexGrid koi={koi} families={families} />
    </div>
  );
}
