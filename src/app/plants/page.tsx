import type { Metadata } from "next";
import Link from "next/link";
import PlantsGrid from "@/components/plants-grid";
import { NZ_NOTE } from "@/content/care";
import { getPlantSummaries } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Pond plants",
  description:
    "Pond plants for koi ponds: floating, submerged and marginal species, whether koi leave them alone, and their legal status in New Zealand.",
};

export default async function PlantsPage() {
  const plants = await getPlantSummaries();
  const banned = plants.filter((p) => p.nzStatus === "PEST").length;
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8">
      <h1 className="font-pally text-3xl font-bold">Pond plants</h1>
      <p className="mt-2 mb-8 max-w-prose text-black/60">
        {plants.length} plants for a koi pond, by where they grow. Each one
        says how much light it wants, how hard it is, whether the koi will
        leave it alone, and its legal status in New Zealand: {banned} of them
        are banned pest plants here, which matters before you buy.{" "}
        <Link href="/care" className="underline hover:text-black">
          {NZ_NOTE.title}
        </Link>{" "}
        covers the fish themselves.
      </p>
      <PlantsGrid plants={plants} />
    </div>
  );
}
