import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlantCard from "@/components/plant-card";
import {
  CHIP_GOOD,
  CHIP_NEUTRAL,
  CHIP_WARN,
  DIFFICULTY_LABEL,
  NZ_CHIP,
  NZ_LABEL,
  TYPE_BLURB,
  TYPE_LABEL,
} from "@/lib/plant-labels";
import {
  getPlantBySlug,
  getPlantNeighbours,
  getPlantSlugs,
  getPlantSummaries,
} from "@/lib/queries";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getPlantSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plant = await getPlantBySlug(slug);
  if (!plant) return {};
  return {
    title: plant.name,
    description: `${plant.name} (${plant.latinName}): a ${TYPE_LABEL[plant.type].toLowerCase()} pond plant. Light, difficulty, whether koi leave it alone, and its status in New Zealand.`,
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <h2 className="font-pally text-lg font-bold">{title}</h2>
      <div className="text-sm text-black/70">{children}</div>
    </section>
  );
}

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const plant = await getPlantBySlug(slug);
  if (!plant) notFound();

  const [neighbours, all] = await Promise.all([
    getPlantNeighbours(slug),
    getPlantSummaries(),
  ]);
  const sameType = all.filter((p) => p.type === plant.type && p.slug !== slug);
  const general = plant.sources.filter((s) => s.kind === "PLANT");
  const nzSource = plant.sources.find((s) => s.kind === "PLANT_NZ");

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
      {neighbours && (
        <div className="mb-8 flex items-center justify-between gap-4 text-sm font-bold">
          <Link
            href={`/plants/${neighbours.prev.slug}`}
            className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/60 transition-colors hover:text-black"
          >
            ← {neighbours.prev.name}
          </Link>
          <Link
            href="/plants"
            className="text-black/40 transition-colors hover:text-black"
          >
            All plants
          </Link>
          <Link
            href={`/plants/${neighbours.next.slug}`}
            className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/60 transition-colors hover:text-black"
          >
            {neighbours.next.name} →
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-10 md:flex-row md:gap-14">
        <div className="w-full max-w-xl flex-1">
          <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
            {plant.imagePath ? (
              <Image
                src={`/assets/${plant.imagePath}`}
                alt={plant.imageAlt ?? plant.name}
                width={1200}
                height={800}
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[3/2] w-full rounded-xl object-cover"
              />
            ) : (
              <div className="aspect-[3/2] w-full rounded-xl bg-[#8ed874]/20" />
            )}
            {plant.imageAuthor && (
              <p className="mt-2 text-center text-xs text-black/40">
                Photo: {plant.imageAuthor}, {plant.imageLicense}
                {plant.imageUrl && (
                  <>
                    ,{" "}
                    <a
                      href={plant.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-black/70"
                    >
                      via Wikimedia Commons
                    </a>
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div>
            <h1 className="font-pally text-3xl font-bold">{plant.name}</h1>
            <p className="text-black/50 italic">{plant.latinName}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
            <span className={`rounded-full border px-3 py-1 ${CHIP_NEUTRAL}`}>
              {TYPE_LABEL[plant.type]}
            </span>
            <span className={`rounded-full border px-3 py-1 ${CHIP_NEUTRAL}`}>
              {DIFFICULTY_LABEL[plant.difficulty]}
            </span>
            <span
              className={`rounded-full border px-3 py-1 ${plant.koiSafe ? CHIP_GOOD : CHIP_WARN}`}
            >
              {plant.koiSafe ? "Koi leave it alone" : "Koi eat or uproot it"}
            </span>
            <span className={`rounded-full border px-3 py-1 ${NZ_CHIP[plant.nzStatus]}`}>
              {NZ_LABEL[plant.nzStatus]}
            </span>
          </div>
          <p className="text-black/70">{plant.description}</p>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold tracking-wide text-black/40 uppercase">Light</dt>
              <dd className="text-sm text-black/70">{plant.light}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold tracking-wide text-black/40 uppercase">Where it grows</dt>
              <dd className="text-sm text-black/70">{TYPE_BLURB[plant.type]}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        className={`mt-10 rounded-2xl border p-5 ${
          plant.nzStatus === "PEST"
            ? "border-[#dd6666] bg-[#dd6666]/10"
            : plant.nzStatus === "NATIVE"
              ? "border-[#49ad6d] bg-[#66dd93]/15"
              : "border-[#93d9f0] bg-[#93d9f0]/20"
        }`}
      >
        <h2 className="font-pally text-lg font-bold">
          In New Zealand: {NZ_LABEL[plant.nzStatus]}
        </h2>
        <p className="mt-2 max-w-prose text-sm text-black/70">{plant.nzNote}</p>
        {nzSource && (
          <a
            href={nzSource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs text-black/50 underline hover:text-black/80"
          >
            {nzSource.label ?? "Source"}: {new URL(nzSource.url).hostname}
          </a>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Section title="Koi and this plant">{plant.koiNotes}</Section>
        <Section title="Planting">{plant.planting}</Section>
        <Section title="Hardiness">{plant.hardiness}</Section>
        <Section title="What it does for the pond">{plant.benefits}</Section>
      </div>

      {general.length > 0 && (
        <p className="mt-6 text-xs text-black/40">
          Sources:{" "}
          {general.map((s, i) => (
            <span key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-black/70"
              >
                {s.label ?? `[${i + 1}]`}
              </a>
              {i < general.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      )}

      {sameType.length > 0 && (
        <section className="mt-10">
          <h2 className="font-pally text-lg font-bold">
            Other {TYPE_LABEL[plant.type].toLowerCase()} plants
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {sameType.slice(0, 5).map((p) => (
              <PlantCard key={p.slug} plant={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
