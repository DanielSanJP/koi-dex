import type { Metadata } from "next";
import Button from "@/components/button";

export const metadata: Metadata = {
  title: "Pond plants",
  description: "An encyclopedia of pond plants for koi ponds.",
};

export default function PlantsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-8">
      <h1 className="font-pally text-3xl font-bold">Pond plants</h1>
      <p className="mt-2 max-w-prose text-black/60">
        Floating, submerged, and marginal plants for a healthy koi pond.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-black/20 bg-white/60 px-6 py-16 text-center">
        <p className="font-pally text-lg font-bold">
          The plant encyclopedia is on its way.
        </p>
        <p className="max-w-prose text-sm text-black/50">
          Plants get their own database table, filled in species by species.
          Once it lands, every plant appears here with its type, light needs,
          care difficulty, and whether the koi will leave it alone.
        </p>
        <Button text="Browse the koi-dex" href="/koi" compact />
      </div>
    </div>
  );
}
