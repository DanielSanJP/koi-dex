import type { Metadata } from "next";
import {
  CARE_SECTIONS,
  CARE_SOURCES,
  QUICK_FACTS,
  SEASONS,
} from "@/content/care";

export const metadata: Metadata = {
  title: "Care guide",
  description:
    "Practical koi husbandry: water quality, feeding, seasonal care, and health.",
};

export default function CarePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-8">
      <h1 className="font-pally text-3xl font-bold">Care guide</h1>
      <p className="mt-2 max-w-prose text-black/60">
        Koi live for decades when the water is right. The essentials, then the
        detail.
      </p>

      <div className="mt-10 flex flex-col gap-10 md:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          {CARE_SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="font-pally text-xl font-bold">{s.title}</h2>
              <div className="mt-3 flex flex-col gap-3 text-black/70">
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
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
          </aside>
        )}
      </div>

      {SEASONS.length > 0 && (
        <section className="mt-12 pb-8">
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

      <section className="mt-10 border-t border-black/10 pt-6 pb-8">
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
