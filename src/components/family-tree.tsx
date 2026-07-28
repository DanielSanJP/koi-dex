import Link from "next/link";
import KoiComposite from "@/components/koi-composite";
import { ANCESTORS } from "@/content/ancestors";
import { ERAS, getOrigin, koiInEra, undatedKoi } from "@/content/timeline";
import { getAllKoi, getKoi } from "@/lib/data";

/** Varieties in era tiers, from the wild carp down to the 1990s. */
export default function FamilyTree() {
  const slugs = getAllKoi().map((k) => k.slug);
  const undated = undatedKoi(slugs);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-24 shrink-0 text-xs font-bold tracking-wide text-black/40 uppercase">
          wild stock
        </span>
        <span
          className="rounded-xl border border-dashed border-black/25 px-3 py-2 text-sm font-bold text-black/45"
          title={ANCESTORS[0]?.definition}
        >
          Magoi
        </span>
        <span className="text-sm text-black/40">
          the wild carp everything descends from
        </span>
      </div>

      {ERAS.map((era) => {
        const inEra = koiInEra(slugs, era);
        if (inEra.length === 0) return null;
        return (
          <div key={era.label} className="flex flex-wrap items-start gap-3">
            <span className="w-24 shrink-0 pt-6 text-xs font-bold tracking-wide text-black/40 uppercase">
              {era.label}
            </span>
            <div className="flex flex-1 flex-wrap gap-3">
              {inEra.map((slug) => {
                const koi = getKoi(slug)!;
                const origin = getOrigin(slug);
                return (
                  <Link
                    key={slug}
                    href={`/koi/${slug}`}
                    className="group flex w-24 flex-col items-center gap-1 rounded-xl border border-black/10 bg-white p-2 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-0.5"
                  >
                    <KoiComposite
                      koi={koi}
                      bufferWidth={172}
                      className="w-full transition-transform group-hover:scale-105"
                    />
                    <span className="text-center text-xs font-bold">
                      {koi.name}
                    </span>
                    {origin && (
                      <span className="text-center text-[0.6rem] text-black/40">
                        {origin.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      {undated.length > 0 && (
        <div className="flex flex-wrap items-start gap-3 border-t border-black/10 pt-4">
          <span className="w-24 shrink-0 pt-6 text-xs font-bold tracking-wide text-black/40 uppercase">
            undated
          </span>
          <div className="flex flex-1 flex-wrap gap-3">
            {undated.map((slug) => {
              const koi = getKoi(slug)!;
              return (
                <Link
                  key={slug}
                  href={`/koi/${slug}`}
                  className="group flex w-24 flex-col items-center gap-1 rounded-xl border border-black/10 bg-white p-2 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-0.5"
                >
                  <KoiComposite
                    koi={koi}
                    bufferWidth={172}
                    className="w-full transition-transform group-hover:scale-105"
                  />
                  <span className="text-center text-xs font-bold">
                    {koi.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <p className="text-sm text-black/40">
        Old lines whose exact date nobody recorded sit apart rather than being
        given a year they do not have.
      </p>
    </div>
  );
}
