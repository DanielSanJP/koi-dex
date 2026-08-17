import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/button";
import {
  NZ_STATUS_LABEL,
  PLANT_TYPE_BLURB,
  PLANT_TYPE_LABEL,
  PLANTS,
  plantsOfType,
  type PlantType,
} from "@/content/plants";

export const metadata: Metadata = {
  title: "Pond plants",
  description: "An encyclopedia of pond plants for koi ponds.",
};

const TYPES: PlantType[] = ["floating", "submerged", "marginal"];

export default function PlantsPage() {
  const banned = PLANTS.filter((p) => p.nz.status === "pest").length;
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-8">
      <h1 className="font-pally text-3xl font-bold">Pond plants</h1>
      <p className="mt-2 max-w-prose text-black/60">
        Floating, submerged, and marginal plants for a healthy koi pond.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-black/20 bg-white/60 px-6 py-12 text-center">
        <p className="font-pally text-lg font-bold">
          The plant pages are on their way.
        </p>
        <p className="max-w-prose text-sm text-black/50">
          The research is done: {PLANTS.length} species, each with its type,
          light needs, difficulty, whether the koi will leave it alone, and its
          legal status in New Zealand ({banned} of them are banned pest plants
          here). Plants get their own database table, and once it lands every
          plant below gets a page.
        </p>
        <Button text="Browse the koi-dex" href="/koi" compact />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TYPES.map((t) => (
          <section
            key={t}
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          >
            <h2 className="font-pally text-lg font-bold">
              {PLANT_TYPE_LABEL[t]}
            </h2>
            <p className="mt-1 text-sm text-black/50">{PLANT_TYPE_BLURB[t]}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {plantsOfType(t).map((p) => (
                <li
                  key={p.slug}
                  className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-black/5 pt-2 first:border-0 first:pt-0"
                >
                  <span className="flex items-center gap-2">
                    {p.image && (
                      <Image
                        src={`/assets/${p.image.path}`}
                        alt=""
                        width={48}
                        height={32}
                        className="h-8 w-12 shrink-0 rounded-md object-cover"
                      />
                    )}
                    <span className="text-sm font-bold text-black/80">
                      {p.name}
                    </span>
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[0.65rem] font-bold whitespace-nowrap ${
                      p.nz.status === "pest"
                        ? "border-[#dd6666] bg-[#dd6666]/10 text-[#ad4949]"
                        : p.nz.status === "native"
                          ? "border-[#49ad6d] bg-[#66dd93]/20 text-[#49ad6d]"
                          : "border-black/10 bg-white text-black/45"
                    }`}
                  >
                    {NZ_STATUS_LABEL[p.nz.status]}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
