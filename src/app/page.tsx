import Link from "next/link";
import Button from "@/components/button";
import KoiComposite from "@/components/koi-composite";
import { getAllKoi, getKoi } from "@/lib/data";
import { r2PublicUrl } from "@/lib/r2";

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

export default function Home() {
  const featured = getKoi("kohaku") ?? getAllKoi()[0];
  return (
    <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
      <section className="flex flex-col items-center gap-10 pb-16 pt-14 md:flex-row md:gap-16">
        <div className="flex flex-1 flex-col items-start gap-5">
          <h1 className="font-pally text-4xl font-bold text-balance sm:text-5xl">
            Every koi in the pond, in one encyclopedia.
          </h1>
          <p className="max-w-prose text-black/60">
            The {getAllKoi().length} real koi varieties: what they look like,
            where they came from, how to care for them, and what their pairings
            produce.
          </p>
          <Button text="Browse the koi-dex" href="/koi" />
        </div>
        <div className="w-full max-w-md flex-1 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <KoiComposite koi={featured} className="w-full" bufferWidth={640} />
          <p className="mt-2 text-center text-sm text-black/50">
            {featured.name}, the classic
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
        {SECTIONS.map((s) => {
          const art = s.art ? getKoi(s.art) : undefined;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-0.5"
            >
              {art ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r2PublicUrl(art.preview ?? art.body)!}
                  alt=""
                  className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-20 w-full items-center justify-center rounded-xl bg-[#8ed874]/20 text-sm font-bold text-[#49ad6d]">
                  Coming soon
                </div>
              )}
              <span className="font-pally text-lg font-bold">{s.title}</span>
              <span className="text-center text-sm text-black/50">
                {s.blurb}
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
