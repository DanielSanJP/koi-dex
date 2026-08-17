import Image from "next/image";
import Link from "next/link";
import Button from "@/components/button";
import KoiComposite from "@/components/koi-composite";
import { getPlant } from "@/content/plants";
import { getKoiSummaries } from "@/lib/queries";

const SECTIONS = [
  {
    href: "/koi",
    title: "Koi-dex",
    blurb: "Every variety, drawn and explained.",
    art: "kohaku",
  },
  {
    href: "/breeding",
    title: "Breeding",
    blurb: "Lineage, pairings, and outcomes.",
    art: "showa",
  },
  {
    href: "/care",
    title: "Care",
    blurb: "Water, feeding, seasons, health.",
    art: "chagoi",
  },
  {
    href: "/plants",
    title: "Plants",
    blurb: "Pond plants and how to keep them.",
    art: null,
  },
];

export default async function Home() {
  const summaries = await getKoiSummaries();
  const bySlug = (slug: string) => summaries.find((s) => s.slug === slug)?.koi;
  const featured = bySlug("kohaku") ?? summaries[0].koi;
  const plantArt = getPlant("water-lily");
  return (
    <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
      <section className="flex flex-col items-center gap-10 pb-16 pt-14 md:flex-row md:gap-16">
        <div className="flex flex-1 flex-col items-start gap-5">
          <h1 className="font-pally text-4xl font-bold text-balance sm:text-5xl">
            Every koi in the pond, in one encyclopedia.
          </h1>
          <p className="max-w-prose text-black/60">
            {summaries.length} real koi varieties: what they look like, where
            they came from, how to care for them, and what their pairings
            produce. Plus a care guide checked against two sources, and the
            pond plants that go with them.
          </p>
          <Button text="Browse the koi-dex" href="/koi" />
        </div>
        <div className="w-full max-w-md flex-1 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <KoiComposite koi={featured} className="w-full" bufferWidth={640} />
          <p className="mt-2 text-center text-sm text-black/60">
            {featured.name}, the classic
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
        {SECTIONS.map((s) => {
          const art = s.art ? bySlug(s.art) : undefined;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-0.5"
            >
              {art ? (
                <KoiComposite
                  koi={art}
                  className="w-full transition-transform group-hover:scale-105"
                  bufferWidth={344}
                />
              ) : plantArt?.image ? (
                <Image
                  src={`/assets/${plantArt.image.path}`}
                  alt={plantArt.image.alt}
                  width={688}
                  height={464}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[688/464] w-full rounded-xl object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex aspect-[688/464] w-full items-center justify-center rounded-xl bg-[#8ed874]/20 text-sm font-bold text-[#49ad6d]">
                  Coming soon
                </div>
              )}
              <span className="font-pally text-lg font-bold">{s.title}</span>
              <span className="text-center text-sm text-black/60">
                {s.blurb}
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
