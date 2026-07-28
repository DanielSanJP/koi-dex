import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import KoiChip from "@/components/koi-chip";
import KoiComposite from "@/components/koi-composite";
import { getVarietyInfo, VARIETY_INFO } from "@/content/varieties";
import { getOrigin } from "@/content/timeline";
import { parentOf, producedBy, refinements, resolveParty } from "@/lib/breeding";
import {
  formatDexNumber,
  getAllKoi,
  getKoi,
  getKoiNeighbours,
} from "@/lib/data";
import type { BreedingCross } from "@/lib/types";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllKoi().map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const koi = getKoi(slug);
  if (!koi) return {};
  return {
    title: koi.name,
    description: `${koi.name}: pattern, history, care and breeding of this koi variety.`,
  };
}

function CrossLine({ cross }: { cross: BreedingCross }) {
  return (
    <div className="flex flex-col gap-1 border-t border-black/5 pt-3 first:border-0 first:pt-0">
      <div className="flex flex-wrap items-center gap-2">
        <KoiChip party={resolveParty(cross.parents[0])} size="sm" />
        <span className="font-bold text-black/30">×</span>
        <KoiChip party={resolveParty(cross.parents[1])} size="sm" />
        <span className="font-bold text-black/30">→</span>
        <KoiChip party={resolveParty(cross.produces)} size="sm" />
      </div>
      <p className="text-xs text-black/50">
        {cross.note}{" "}
        <a
          href={cross.source}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap text-black/35 underline hover:text-black/60"
        >
          Source
        </a>
      </p>
    </div>
  );
}

export default async function KoiDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const koi = getKoi(slug);
  if (!koi) notFound();

  const info = getVarietyInfo(slug);
  const origin = getOrigin(slug);
  const { prev, next } = getKoiNeighbours(slug);

  const from = producedBy(koi.name);
  const into = parentOf(koi.name);
  const refined = refinements(koi.name);

  const family = info?.family
    ? getAllKoi().filter(
        (k) => k.slug !== slug && VARIETY_INFO[k.slug]?.family === info.family,
      )
    : [];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
      <div className="mb-8 flex items-center justify-between gap-4 text-sm font-bold">
        <Link
          href={`/koi/${prev.slug}`}
          className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/60 transition-colors hover:text-black"
        >
          ← {prev.name}
        </Link>
        <Link
          href={`/koi/${next.slug}`}
          className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/60 transition-colors hover:text-black"
        >
          {next.name} →
        </Link>
      </div>

      <div className="flex flex-col gap-10 md:flex-row md:gap-14">
        <div className="w-full max-w-xl flex-1">
          <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
            <KoiComposite koi={koi} className="w-full" bufferWidth={688} />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <h1 className="font-pally text-3xl font-bold">{koi.name}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/50">
              {formatDexNumber(koi.number)}
            </span>
            {info?.family && (
              <span className="rounded-full border border-[#49ad6d] bg-[#66dd93]/20 px-3 py-1 text-[#49ad6d]">
                {info.family}
              </span>
            )}
            {origin && (
              <span
                className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/50"
                title={
                  origin.confidence === "documented"
                    ? "Well documented"
                    : origin.confidence === "disputed"
                      ? "Sources disagree on the date"
                      : "Approximate date"
                }
              >
                {origin.label}
                {origin.confidence !== "documented" && " *"}
              </span>
            )}
          </div>
          {info?.nameMeaning && (
            <p className="text-sm text-black/50">
              The name means {info.nameMeaning}.
            </p>
          )}
          {info?.pattern && <p className="text-black/70">{info.pattern}</p>}
          {info?.origin && <p className="text-black/70">{info.origin}</p>}
          {info?.notes && <p className="text-black/70">{info.notes}</p>}
          {info && info.sources.length > 0 && (
            <p className="mt-1 text-xs text-black/40">
              Sources:{" "}
              {info.sources.map((s, i) => (
                <a
                  key={s}
                  href={s}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black/70"
                >
                  [{i + 1}]{" "}
                </a>
              ))}
            </p>
          )}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <h2 className="font-pally text-lg font-bold">
            Caring for a {koi.name}
          </h2>
          <p className="text-sm text-black/50">
            Koi husbandry is the same for every variety: clean water, room to
            grow, and feeding by temperature.
          </p>
          <Link
            href="/care"
            className="self-start rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-bold text-[#49ad6d] transition-colors hover:border-[#49ad6d]"
          >
            Full care guide →
          </Link>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <h2 className="font-pally text-lg font-bold">Breeding</h2>

          {from.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-wide text-black/40 uppercase">
                Came from
              </h3>
              {from.map((c, i) => (
                <CrossLine key={i} cross={c} />
              ))}
            </div>
          )}

          {refined.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-wide text-black/40 uppercase">
                Later refined by
              </h3>
              {refined.map((c, i) => (
                <CrossLine key={i} cross={c} />
              ))}
            </div>
          )}

          {into.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-wide text-black/40 uppercase">
                Parent of
              </h3>
              {into.map((c, i) => (
                <CrossLine key={i} cross={c} />
              ))}
            </div>
          )}

          {from.length === 0 && into.length === 0 && refined.length === 0 && (
            <p className="text-sm text-black/50">
              No documented crossing records this variety as a parent or an
              outcome. Older lines were fixed by selecting colour mutations
              rather than by a recorded pairing.
            </p>
          )}

          <Link
            href="/breeding"
            className="self-start rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-bold text-[#49ad6d] transition-colors hover:border-[#49ad6d]"
          >
            See the family tree →
          </Link>
        </section>
      </div>

      {family.length > 0 && (
        <section className="mt-6 rounded-2xl border border-black/10 bg-white p-5 pb-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <h2 className="font-pally text-lg font-bold">
            Others in {info?.family}
          </h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {family.map((k) => (
              <KoiChip key={k.slug} party={{ kind: "koi", koi: k }} size="sm" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
