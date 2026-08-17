import type { Metadata } from "next";
import FeedingBands from "@/components/feeding-bands";
import NumbersTable from "@/components/numbers-table";
import PondChecklist from "@/components/pond-checklist";
import {
  CARE_SECTIONS,
  CARE_SOURCES,
  FEEDING_BANDS,
  NEW_POND_CHECKLIST,
  NUMBERS_CHECK,
  NZ_NOTE,
  QUICK_FACTS,
  SEASONS,
} from "@/content/care";

export const metadata: Metadata = {
  title: "Care guide",
  description:
    "Practical koi husbandry: water quality, filtration, feeding, handling, seasonal care, health, and a checklist for a first pond.",
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const JUMP_LINKS = [
  { href: "#new-zealand", label: "Koi in New Zealand" },
  ...CARE_SECTIONS.map((s) => ({
    href: `#${slugify(s.title)}`,
    label: s.title,
  })),
  { href: "#feeding-by-temperature", label: "Feeding by temperature" },
  { href: "#new-pond-checklist", label: "New pond checklist" },
  { href: "#through-the-year", label: "Through the year" },
  { href: "#numbers", label: "Every number, checked twice" },
];

export default function CarePage() {
  const feedingIndex = CARE_SECTIONS.findIndex((s) => s.title === "Feeding");

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-8">
      <h1 className="font-pally text-3xl font-bold">Care guide</h1>
      <p className="mt-2 max-w-prose text-black/60">
        Koi live for decades when the water is right. The essentials, then the
        detail, then a checklist for building a first pond. Every number here
        was checked against two independent sources; the table at the bottom
        shows which.
      </p>

      <nav
        aria-label="On this page"
        className="mt-6 flex flex-wrap gap-2 text-sm font-bold"
      >
        {JUMP_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/50 transition-colors hover:border-[#49ad6d] hover:text-[#49ad6d]"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <section
        id="new-zealand"
        className="mt-10 scroll-mt-24 rounded-2xl border border-[#93d9f0] bg-[#93d9f0]/20 p-5 sm:p-6"
      >
        <h2 className="font-pally text-xl font-bold">{NZ_NOTE.title}</h2>
        <div className="mt-3 flex max-w-prose flex-col gap-3 text-black/70">
          {NZ_NOTE.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mt-3 text-xs text-black/50">
          Sources:{" "}
          {NZ_NOTE.sources.map((s, i) => (
            <span key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-black/80"
              >
                {s.name}
              </a>
              {i < NZ_NOTE.sources.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      <div className="mt-10 flex flex-col gap-10 md:flex-row">
        <div className="flex flex-1 flex-col gap-10">
          {CARE_SECTIONS.map((s, i) => (
            <section
              key={s.title}
              id={slugify(s.title)}
              className="scroll-mt-24"
            >
              <h2 className="font-pally text-xl font-bold">{s.title}</h2>
              <div className="mt-3 flex flex-col gap-3 text-black/70">
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
              {i === feedingIndex && (
                <div
                  id="feeding-by-temperature"
                  className="mt-5 scroll-mt-24 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                >
                  <h3 className="font-pally font-bold">
                    Feeding by water temperature
                  </h3>
                  <div className="mt-3">
                    <FeedingBands bands={FEEDING_BANDS} />
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {QUICK_FACTS.length > 0 && (
          <aside className="h-fit w-full shrink-0 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] md:sticky md:top-20 md:w-64">
            <h2 className="font-pally font-bold">Quick facts</h2>
            <dl className="mt-3 flex flex-col gap-2">
              {QUICK_FACTS.map((f) => (
                <div key={f.label} className="flex flex-col">
                  <dt className="text-xs font-bold tracking-wide text-black/40 uppercase">
                    {f.label}
                  </dt>
                  <dd className="text-sm font-bold text-black/70">{f.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#numbers"
              className="mt-4 inline-block text-xs font-bold text-[#49ad6d] underline-offset-2 hover:underline"
            >
              How these were checked →
            </a>
          </aside>
        )}
      </div>

      <section id="new-pond-checklist" className="mt-14 scroll-mt-24">
        <h2 className="font-pally text-xl font-bold">
          Building a first pond: the checklist
        </h2>
        <p className="mt-2 mb-5 max-w-prose text-sm text-black/50">
          In the order it happens. The single most common mistake is buying
          fish before the filter has cycled, so the cycling group is the one
          not to skip.
        </p>
        <PondChecklist groups={NEW_POND_CHECKLIST} />
      </section>

      {SEASONS.length > 0 && (
        <section id="through-the-year" className="mt-14 scroll-mt-24">
          <h2 className="font-pally text-xl font-bold">Through the year</h2>
          <div className="mt-4 flex flex-col gap-3">
            {SEASONS.map((s) => (
              <details
                key={s.season}
                className="group rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
              >
                <summary className="cursor-pointer list-none font-pally font-bold select-none">
                  <span className="mr-2 inline-block transition-transform group-open:rotate-90">
                    ▸
                  </span>
                  {s.season}
                </summary>
                <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-black/70">
                  {s.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>
      )}

      <section id="numbers" className="mt-14 scroll-mt-24">
        <h2 className="font-pally text-xl font-bold">
          Every number, checked twice
        </h2>
        <p className="mt-2 mb-5 max-w-prose text-sm text-black/50">
          Each figure in this guide was checked against two independent
          sources. Where they disagreed with the guide, the guide changed, and
          the row says so.
        </p>
        <NumbersTable rows={NUMBERS_CHECK} />
      </section>

      <section className="mt-12 border-t border-black/10 pt-6 pb-8">
        <h2 className="text-xs font-bold tracking-wide text-black/40 uppercase">
          Sources
        </h2>
        <ul className="mt-2 flex flex-col gap-1">
          {CARE_SOURCES.map((s) => (
            <li key={s}>
              <a
                href={s}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm break-all text-black/40 underline hover:text-black/70"
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
