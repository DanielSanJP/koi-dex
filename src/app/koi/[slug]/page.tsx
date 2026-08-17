import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import KoiChip from "@/components/koi-chip";
import KoiComposite from "@/components/koi-composite";
import { formatDexNumber } from "@/lib/data";
import { getKoiDetail, getKoiSummaries } from "@/lib/queries";
import type { LineageNode, Outcome } from "@/lib/shapes";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getKoiSummaries()).map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const koi = await getKoiDetail(slug);
  if (!koi) return {};
  return {
    title: koi.name,
    description: `${koi.name}: pattern, history, care and breeding of this koi variety.`,
  };
}

const CONFIDENCE_TITLE = {
  DOCUMENTED: "Well documented",
  APPROXIMATE: "Approximate date",
  DISPUTED: "Sources disagree on the date",
} as const;

function CrossLine({ outcome }: { outcome: Outcome }) {
  return (
    <div className="flex flex-col gap-1 border-t border-black/5 pt-3 first:border-0 first:pt-0">
      <div className="flex flex-wrap items-center gap-2">
        <KoiChip party={outcome.parentA} size="sm" />
        <span className="font-bold text-black/30">×</span>
        <KoiChip party={outcome.parentB} size="sm" />
        <span className="font-bold text-black/30">→</span>
        <KoiChip party={outcome.offspring} size="sm" />
      </div>
      <p className="text-xs text-black/50">
        {outcome.note}{" "}
        <a
          href={outcome.sourceUrl}
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

/** Ancestors or descendants grouped by generation, from the recursive query. */
function LineageRow({ label, nodes }: { label: string; nodes: LineageNode[] }) {
  if (nodes.length === 0) return null;
  const depths = [...new Set(nodes.map((n) => n.depth))].sort((a, b) => a - b);
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-bold tracking-wide text-black/40 uppercase">{label}</h3>
      <div className="flex flex-col gap-2">
        {depths.map((d) => (
          <div key={d} className="flex flex-wrap items-center gap-2">
            <span className="w-24 shrink-0 text-[0.65rem] font-bold text-black/35">
              {d === 1 ? "one step" : `${d} steps`}
            </span>
            {nodes
              .filter((n) => n.depth === d)
              .map((n) => (
                <KoiChip key={n.slug} party={n} size="sm" />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SourceLinks({ sources }: { sources: { url: string }[] }) {
  if (sources.length === 0) return null;
  return (
    <p className="text-xs text-black/40">
      Sources:{" "}
      {sources.map((s, i) => (
        <a
          key={s.url}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black/70"
        >
          [{i + 1}]{" "}
        </a>
      ))}
    </p>
  );
}

export default async function KoiDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [koi, all] = await Promise.all([getKoiDetail(slug), getKoiSummaries()]);
  if (!koi) notFound();

  const i = all.findIndex((k) => k.slug === slug);
  const n = all.length;
  const prev = all[(i - 1 + n) % n];
  const next = all[(i + 1) % n];
  const family = koi.family
    ? all.filter((k) => k.slug !== slug && k.family?.slug === koi.family?.slug)
    : [];
  const varietySources = koi.sources.filter((s) => s.kind === "VARIETY");
  const careSources = koi.sources.filter((s) => s.kind === "CARE");
  const hasLineage = koi.lineage.ancestors.length > 0 || koi.lineage.descendants.length > 0;

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
            <KoiComposite koi={koi.koi} className="w-full" bufferWidth={688} />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <h1 className="font-pally text-3xl font-bold">{koi.name}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/50">
              {formatDexNumber(koi.dexNumber)}
            </span>
            {koi.family && (
              <Link
                href={`/koi?family=${encodeURIComponent(koi.family.name)}`}
                className="rounded-full border border-[#49ad6d] bg-[#66dd93]/20 px-3 py-1 text-[#49ad6d]"
              >
                {koi.family.name}
              </Link>
            )}
            {koi.originLabel && (
              <span
                className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/50"
                title={koi.originConfidence ? CONFIDENCE_TITLE[koi.originConfidence] : undefined}
              >
                {koi.originLabel}
                {koi.originConfidence && koi.originConfidence !== "DOCUMENTED" && " *"}
              </span>
            )}
          </div>
          {koi.nameMeaning && (
            <p className="text-sm text-black/50">The name means {koi.nameMeaning}.</p>
          )}
          {koi.pattern && <p className="text-black/70">{koi.pattern}</p>}
          {koi.origin && <p className="text-black/70">{koi.origin}</p>}
          {koi.notes && <p className="text-black/70">{koi.notes}</p>}
          <SourceLinks sources={varietySources} />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <h2 className="font-pally text-lg font-bold">Caring for a {koi.name}</h2>
          {koi.care.length > 0 ? (
            <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-black/70">
              {koi.care.map((c, j) => (
                <li key={j}>{c}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-black/50">
              Nothing about this variety needs different care from koi in
              general: clean water, room to grow, and feeding by temperature.
            </p>
          )}
          <SourceLinks sources={careSources} />
          <Link
            href="/care"
            className="self-start rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-bold text-[#49ad6d] transition-colors hover:border-[#49ad6d]"
          >
            Full care guide →
          </Link>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <h2 className="font-pally text-lg font-bold">Breeding</h2>

          {koi.producedBy.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-wide text-black/40 uppercase">Came from</h3>
              {koi.producedBy.map((o) => (
                <CrossLine key={o.id} outcome={o} />
              ))}
            </div>
          )}

          {koi.refinements.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-wide text-black/40 uppercase">Later refined by</h3>
              {koi.refinements.map((o) => (
                <CrossLine key={o.id} outcome={o} />
              ))}
            </div>
          )}

          {koi.parentOf.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-wide text-black/40 uppercase">Parent of</h3>
              {koi.parentOf.map((o) => (
                <CrossLine key={o.id} outcome={o} />
              ))}
            </div>
          )}

          {koi.producedBy.length === 0 && koi.parentOf.length === 0 && koi.refinements.length === 0 && (
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

      {hasLineage && (
        <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <div>
            <h2 className="font-pally text-lg font-bold">Whole lineage</h2>
            <p className="mt-1 text-xs text-black/45">
              Every recorded ancestor and descendant, however many steps away,
              followed through the documented crosses.
            </p>
          </div>
          <LineageRow label="Ancestors" nodes={koi.lineage.ancestors} />
          <LineageRow label="Descendants" nodes={koi.lineage.descendants} />
        </section>
      )}

      {family.length > 0 && (
        <section className="mt-6 rounded-2xl border border-black/10 bg-white p-5 pb-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <h2 className="font-pally text-lg font-bold">Others in {koi.family?.name}</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {family.map((k) => (
              <KoiChip key={k.slug} party={{ slug: k.slug, name: k.name, kind: "KOI", koi: k.koi }} size="sm" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
