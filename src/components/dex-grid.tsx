"use client";

import { useSyncExternalStore } from "react";
import KoiCard from "@/components/koi-card";
import type { Koi } from "@/lib/types";

type Entry = Koi & { family: string | null };

type Props = {
  koi: Entry[];
  families: string[];
};

/* The URL is the single source of truth for the filters (`?q=` and
   `?family=`), so a filtered view is shareable and the back button works.
   It is read through useSyncExternalStore: the server snapshot is "no
   filters", which matches the prerendered HTML, and the real query string
   takes over after hydration. Writes go through history.replaceState, which
   Next.js keeps in sync with its router. */

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("popstate", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("popstate", cb);
  };
}

const getSnapshot = () => window.location.search;
const getServerSnapshot = () => "";

function writeSearch(params: URLSearchParams) {
  const qs = params.toString();
  window.history.replaceState(
    null,
    "",
    qs ? `?${qs}` : window.location.pathname,
  );
  listeners.forEach((l) => l());
}

export default function DexGrid({ koi, families }: Props) {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const params = new URLSearchParams(search);
  const query = params.get("q") ?? "";
  const rawFamily = params.get("family");
  const family = rawFamily && families.includes(rawFamily) ? rawFamily : null;

  const update = (next: { q?: string; family?: string | null }) => {
    const p = new URLSearchParams(window.location.search);
    if (next.q !== undefined) {
      if (next.q) p.set("q", next.q);
      else p.delete("q");
    }
    if (next.family !== undefined) {
      if (next.family) p.set("family", next.family);
      else p.delete("family");
    }
    writeSearch(p);
  };

  const visible = koi.filter((k) => {
    if (family && k.family !== family) return false;
    if (query && !k.name.toLowerCase().includes(query.trim().toLowerCase()))
      return false;
    return true;
  });

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-sm font-bold transition-colors ${
        active
          ? "border-[#49ad6d] bg-[#66dd93]/20 text-[#49ad6d]"
          : "border-black/10 bg-white text-black/50 hover:text-black"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => update({ q: e.target.value })}
          placeholder="Search varieties…"
          aria-label="Search varieties"
          className="h-10 min-w-48 flex-1 rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#49ad6d]"
        />
        {chip("all", family === null, () => update({ family: null }))}
        {families.map((f) =>
          chip(f, family === f, () =>
            update({ family: family === f ? null : f }),
          ),
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((k) => (
          <KoiCard key={k.slug} koi={k} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="py-12 text-center text-black/50">
          No varieties match. Try a different search.
        </p>
      )}
    </div>
  );
}
