"use client";

import { useUrlSearch } from "@/hooks/use-url-search";
import KoiCard from "@/components/koi-card";
import type { Koi } from "@/lib/types";

type Entry = Koi & { family: string | null };

type Props = {
  koi: Entry[];
  families: string[];
};

export default function DexGrid({ koi, families }: Props) {
  // The URL (?q=&family=) is the single source of truth for the filters.
  const { params, update } = useUrlSearch();
  const query = params.get("q") ?? "";
  const rawFamily = params.get("family");
  const family = rawFamily && families.includes(rawFamily) ? rawFamily : null;

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
          : "border-black/10 bg-white text-black/60 hover:text-black"
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
        <p className="py-12 text-center text-black/60">
          No varieties match. Try a different search.
        </p>
      )}
    </div>
  );
}
