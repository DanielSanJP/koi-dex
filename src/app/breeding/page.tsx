import type { Metadata } from "next";
import Link from "next/link";
import {
  DOCUMENTED_CROSSES,
  FUNDAMENTALS,
  SPAWN_NOTES,
} from "@/content/breeding";
import { findKoiByName } from "@/lib/data";

export const metadata: Metadata = {
  title: "Breeding guide",
  description:
    "How real koi breeding works: lineage, documented pairings, and what a spawn actually produces.",
};

function VarietyName({ name }: { name: string }) {
  const match = findKoiByName(name);
  if (!match) return <span className="font-bold text-black/70">{name}</span>;
  return (
    <Link
      href={`/koi/${match.slug}`}
      className="font-bold text-[#49ad6d] underline-offset-2 hover:underline"
    >
      {name}
    </Link>
  );
}

export default function BreedingPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-8">
      <h1 className="font-pally text-3xl font-bold">Breeding guide</h1>
      <p className="mt-2 max-w-prose text-black/60">
        Every koi variety came from somewhere. This guide covers how breeding
        actually works, and the documented pairings behind the varieties in the
        dex.
      </p>

      {FUNDAMENTALS.length > 0 && (
        <section className="mt-10">
          <h2 className="font-pally text-xl font-bold">How it works</h2>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-black/70">
            {FUNDAMENTALS.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      )}

      {DOCUMENTED_CROSSES.length > 0 && (
        <section className="mt-10">
          <h2 className="font-pally text-xl font-bold">
            Documented pairings and outcomes
          </h2>
          <p className="mt-2 text-sm text-black/50">
            The crossings behind the varieties, as recorded by breeders. Spawns
            are variable: a pairing produces a range of fry, of which only some
            show the target variety.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {DOCUMENTED_CROSSES.map((c, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
              >
                <VarietyName name={c.parents[0]} />
                <span className="text-black/40">×</span>
                <VarietyName name={c.parents[1]} />
                <span className="text-black/40">→</span>
                <VarietyName name={c.produces} />
                <span className="basis-full text-sm text-black/50 sm:basis-auto sm:pl-2">
                  {c.note}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {SPAWN_NOTES.length > 0 && (
        <section className="mt-10 pb-8">
          <h2 className="font-pally text-xl font-bold">
            What a spawn actually looks like
          </h2>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-black/70">
            {SPAWN_NOTES.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
