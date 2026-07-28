import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import KoiComposite from "@/components/koi-composite";
import { DOCUMENTED_CROSSES } from "@/content/breeding";
import { getVarietyInfo } from "@/content/varieties";
import {
  findKoiByName,
  formatDexNumber,
  getAllKoi,
  getKoi,
  getKoiNeighbours,
} from "@/lib/data";

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
    description: `${koi.name}: pattern, history, and breeding of this koi variety.`,
  };
}

function VarietyName({ name }: { name: string }) {
  const match = findKoiByName(name);
  if (!match)
    return <span className="font-bold text-black/70">{name}</span>;
  return (
    <Link
      href={`/koi/${match.slug}`}
      className="font-bold text-[#49ad6d] underline-offset-2 hover:underline"
    >
      {name}
    </Link>
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
  const { prev, next } = getKoiNeighbours(slug);
  const crosses = DOCUMENTED_CROSSES.filter(
    (c) =>
      c.produces.toLowerCase() === koi.name.toLowerCase() ||
      c.parents.some((p) => p.toLowerCase() === koi.name.toLowerCase()),
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8">
      <div className="mb-8 flex items-center justify-between gap-4 text-sm font-bold">
        <Link
          href={`/koi/${prev.slug}`}
          className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/60 transition-colors hover:text-black"
        >
          ← {formatDexNumber(prev.number)} {prev.name}
        </Link>
        <Link
          href={`/koi/${next.slug}`}
          className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/60 transition-colors hover:text-black"
        >
          {next.name} {formatDexNumber(next.number)} →
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
            <p className="mt-2 text-xs text-black/40">
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

      {crosses.length > 0 && (
        <section className="mt-12 pb-16">
          <h2 className="font-pally text-xl font-bold">Breeding</h2>
          <div className="mt-4 flex flex-col gap-3">
            {crosses.map((c, i) => (
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
          <p className="mt-3 text-sm text-black/40">
            Real spawns are variable: these are documented lineages, not
            guaranteed outcomes. See the{" "}
            <Link href="/breeding" className="underline hover:text-black">
              breeding guide
            </Link>
            .
          </p>
        </section>
      )}
    </div>
  );
}
