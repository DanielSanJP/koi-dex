import type { Metadata } from "next";
import CrossCard from "@/components/cross-card";
import FamilyTree from "@/components/family-tree";
import PairingExplorer from "@/components/pairing-explorer";
import SpawnFunnel from "@/components/spawn-funnel";
import { RELATIVES } from "@/content/ancestors";
import {
  BREEDING_SOURCES,
  DOCUMENTED_CROSSES,
  FUNDAMENTALS,
  SPAWN_NOTES,
} from "@/content/breeding";
import { ORIGINS } from "@/content/timeline";
import { getAllKoi, getKoi } from "@/lib/data";

export const metadata: Metadata = {
  title: "Breeding guide",
  description:
    "How real koi breeding works: the family tree of varieties, documented pairings, and what a spawn actually produces.",
};

export default function BreedingPage() {
  const koi = getAllKoi();
  const dated = Object.entries(ORIGINS)
    .filter(([, o]) => o.year != null)
    .sort((a, b) => a[1].year! - b[1].year!);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-8">
      <h1 className="font-pally text-3xl font-bold">Breeding guide</h1>
      <p className="mt-2 max-w-prose text-black/60">
        Every koi variety came from somewhere, and almost all of them came from
        somewhere recent. Here is the family tree, the pairings behind it, and
        what a spawn really produces.
      </p>

      <section className="mt-12">
        <h2 className="font-pally text-xl font-bold">The family tree</h2>
        <p className="mt-2 mb-5 max-w-prose text-sm text-black/50">
          Two centuries of selective breeding, from a wild black carp in a
          Niigata rice paddy to the varieties in the dex. Pick any fish to read
          its story.
        </p>
        <FamilyTree />
      </section>

      <section className="mt-14">
        <h2 className="font-pally text-xl font-bold">What do these two make?</h2>
        <p className="mt-2 mb-5 max-w-prose text-sm text-black/50">
          Choose two parents. If the pairing is part of the recorded history of
          the varieties, you get the fish it produced and who bred it.
        </p>
        <PairingExplorer koi={koi} crosses={DOCUMENTED_CROSSES} />
      </section>

      <section className="mt-14">
        <h2 className="font-pally text-xl font-bold">Documented pairings</h2>
        <p className="mt-2 mb-5 max-w-prose text-sm text-black/50">
          The crossings the varieties actually came from. Spawns are variable: a
          pairing produces a range of fry, of which only some show the target
          variety, and the named variety is what breeders then selected for over
          generations.
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {DOCUMENTED_CROSSES.map((c, i) => (
            <CrossCard key={i} cross={c} size="sm" />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-pally text-xl font-bold">
          What a spawn really gives you
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          <SpawnFunnel />
          <ul className="flex list-disc flex-col gap-3 pl-5 text-sm text-black/70">
            {SPAWN_NOTES.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-pally text-xl font-bold">Two centuries, in order</h2>
        <div className="mt-5 overflow-x-auto">
          <div className="flex min-w-max items-end gap-1 border-b-2 border-black/10 pb-2">
            {dated.map(([slug, o]) => {
              const k = getKoi(slug);
              return (
                <div key={slug} className="flex w-20 flex-col items-center gap-1">
                  <span className="text-center text-[0.6rem] leading-tight text-black/50">
                    {k?.name}
                  </span>
                  <span className="text-xs font-bold tabular-nums">
                    {o.year}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#49ad6d]" />
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-3 text-sm text-black/40">
          Dates marked as approximate or disputed on a variety&apos;s own page
          are placed at the best-supported year.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-pally text-xl font-bold">How breeding works</h2>
        <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-black/70">
          {FUNDAMENTALS.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-pally text-xl font-bold">
          Varieties this site does not cover
        </h2>
        <p className="mt-2 mb-5 max-w-prose text-sm text-black/50">
          Koi classification runs much wider than the 22 varieties in the dex.
          These appear in the lineage above or alongside it, and have no
          artwork here.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {RELATIVES.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border border-dashed border-black/20 bg-white/60 p-4"
            >
              <h3 className="font-pally font-bold">{r.name}</h3>
              <p className="mt-1 text-sm text-black/60">{r.definition}</p>
              <p className="mt-2 text-sm text-black/50">{r.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-black/10 pt-6 pb-8">
        <h2 className="text-xs font-bold tracking-wide text-black/40 uppercase">
          Sources
        </h2>
        <ul className="mt-2 flex flex-col gap-1">
          {BREEDING_SOURCES.map((s) => (
            <li key={s}>
              <a
                href={s}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm break-all text-black/40 underline hover:text-black/70"
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
