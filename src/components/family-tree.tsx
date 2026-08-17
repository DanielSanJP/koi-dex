import Link from "next/link";
import KoiComposite from "@/components/koi-composite";
import { ERAS } from "@/content/timeline";
import type { KoiSummary, Relative } from "@/lib/shapes";

type Props = {
  koi: KoiSummary[];
  /** The ANCESTOR / RELATIVE rows, for the Magoi root node's definition. */
  relatives: Relative[];
};

/** Varieties in era tiers, from the wild carp down to the 1990s. Years come
    from the database (varieties.origin_year); the era bands are fixed. */
export default function FamilyTree({ koi, relatives }: Props) {
  const magoi = relatives.find((r) => r.slug === "magoi");
  const undated = koi.filter((k) => k.originYear == null);

  const tile = (k: KoiSummary) => (
    <Link
      key={k.slug}
      href={`/koi/${k.slug}`}
      className="group flex w-24 flex-col items-center gap-1 rounded-xl border border-black/10 bg-white p-2 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-0.5"
    >
      <KoiComposite
        koi={k.koi}
        bufferWidth={172}
        className="w-full transition-transform group-hover:scale-105"
      />
      <span className="text-center text-xs font-bold">{k.name}</span>
      {k.originLabel && k.originYear != null && (
        <span className="text-center text-[0.6rem] text-black/40">
          {k.originLabel}
        </span>
      )}
    </Link>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-24 shrink-0 text-xs font-bold tracking-wide text-black/40 uppercase">
          wild stock
        </span>
        <span
          className="rounded-xl border border-dashed border-black/25 px-3 py-2 text-sm font-bold text-black/45"
          title={magoi?.definition ?? undefined}
        >
          {magoi?.name ?? "Magoi"}
        </span>
        <span className="text-sm text-black/40">
          the wild carp everything descends from
        </span>
      </div>

      {ERAS.map((era) => {
        const inEra = koi.filter(
          (k) => k.originYear != null && k.originYear >= era.from && k.originYear <= era.to,
        );
        if (inEra.length === 0) return null;
        return (
          <div key={era.label} className="flex flex-wrap items-start gap-3">
            <span className="w-24 shrink-0 pt-6 text-xs font-bold tracking-wide text-black/40 uppercase">
              {era.label}
            </span>
            <div className="flex flex-1 flex-wrap gap-3">{inEra.map(tile)}</div>
          </div>
        );
      })}

      {undated.length > 0 && (
        <div className="flex flex-wrap items-start gap-3 border-t border-black/10 pt-4">
          <span className="w-24 shrink-0 pt-6 text-xs font-bold tracking-wide text-black/40 uppercase">
            undated
          </span>
          <div className="flex flex-1 flex-wrap gap-3">{undated.map(tile)}</div>
        </div>
      )}
      <p className="text-sm text-black/40">
        Old lines whose exact date nobody recorded sit apart rather than being
        given a year they do not have.
      </p>
    </div>
  );
}
