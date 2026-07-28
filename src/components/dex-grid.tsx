"use client";

import { useEffect, useState } from "react";
import KoiCard from "@/components/koi-card";
import type { Koi } from "@/lib/types";

type Entry = Koi & { family: string | null };

type Props = {
  koi: Entry[];
  families: string[];
};

export default function DexGrid({ koi, families }: Props) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<string | null>(null);

  // Shareable filters: read once from the URL, write back as it changes.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get("family");
    if (f && families.includes(f)) setFamily(f);
    const q = params.get("q");
    if (q) setQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (family) params.set("family", family);
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `?${qs}` : window.location.pathname,
    );
  }, [query, family]);

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
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search varieties…"
          className="h-10 min-w-48 flex-1 rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#49ad6d]"
        />
        {chip("all", family === null, () => setFamily(null))}
        {families.map((f) =>
          chip(f, family === f, () => setFamily(family === f ? null : f)),
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((k) => (
          <KoiCard key={k.slug} koi={k} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="py-12 text-center text-black/50">
          No varieties match — try a different search.
        </p>
      )}
    </div>
  );
}
