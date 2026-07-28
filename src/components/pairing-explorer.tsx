"use client";

import { useState } from "react";
import KoiComposite from "@/components/koi-composite";
import type { BreedingCross, Koi } from "@/lib/types";

type Props = {
  koi: Koi[];
  crosses: BreedingCross[];
};

const sameName = (a: string, b: string) =>
  a.trim().toLowerCase() === b.trim().toLowerCase();

/** Pick two parents, see whether the pairing is documented. Never invents one. */
export default function PairingExplorer({ koi, crosses }: Props) {
  const [aSlug, setASlug] = useState("kohaku");
  const [bSlug, setBSlug] = useState("ki_utsuri");

  const a = koi.find((k) => k.slug === aSlug) ?? koi[0];
  const b = koi.find((k) => k.slug === bSlug) ?? koi[1];

  const match = crosses.find(
    (c) =>
      (sameName(c.parents[0], a.name) && sameName(c.parents[1], b.name)) ||
      (sameName(c.parents[0], b.name) && sameName(c.parents[1], a.name)),
  );
  const offspring = match
    ? koi.find((k) => sameName(k.name, match.produces))
    : undefined;

  const picker = (
    value: string,
    onChange: (v: string) => void,
    label: string,
  ) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="h-9 rounded-xl border border-black/10 bg-white px-3 text-sm font-bold outline-none focus:border-[#49ad6d]"
    >
      {koi.map((k) => (
        <option key={k.slug} value={k.slug}>
          {k.name}
        </option>
      ))}
    </select>
  );

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex w-28 flex-col items-center gap-2">
          <KoiComposite koi={a} bufferWidth={258} className="w-full" />
          {picker(aSlug, setASlug, "First parent")}
        </div>
        <span className="text-2xl font-bold text-black/25">×</span>
        <div className="flex w-28 flex-col items-center gap-2">
          <KoiComposite koi={b} bufferWidth={258} className="w-full" />
          {picker(bSlug, setBSlug, "Second parent")}
        </div>
        <span className="text-2xl font-bold text-black/25">→</span>
        <div className="flex w-28 flex-col items-center gap-2">
          {offspring ? (
            <>
              <KoiComposite
                koi={offspring}
                bufferWidth={258}
                className="w-full"
              />
              <span className="text-sm font-bold">{offspring.name}</span>
            </>
          ) : (
            <div className="flex aspect-[688/464] w-full items-center justify-center rounded-xl border border-dashed border-black/20 text-center text-xs font-bold text-black/35">
              {match ? match.produces : "?"}
            </div>
          )}
        </div>
      </div>

      {match ? (
        <p className="text-sm text-black/60">
          <span className="font-bold text-[#49ad6d]">Documented.</span>{" "}
          {match.note}{" "}
          <a
            href={match.source}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-black/40 underline hover:text-black/70"
          >
            Source
          </a>
        </p>
      ) : (
        <p className="text-sm text-black/60">
          <span className="font-bold text-black/70">
            No documented pairing.
          </span>{" "}
          That does not mean these two cannot spawn together, only that this
          cross is not part of the recorded history of the varieties. Real
          spawns are variable: a pairing shifts the odds of certain traits, and
          breeders then select over generations for what they want.
        </p>
      )}
    </div>
  );
}
