"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import KoiComposite from "@/components/koi-composite";
import type { SearchHit } from "@/lib/queries";
import type { Koi } from "@/lib/types";

type Hit = SearchHit & { koi?: Koi | null };

/* Site-wide search. A button in the header opens a panel with one input;
   as you type, /api/search (Postgres full-text search) is queried with a
   short debounce and the hits are listed: koi drawn from their sprite,
   plants and art-free varieties as text. "/" opens it, Escape closes it. */
export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA");
      if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const term = q.trim();
    if (term.length < 2) return; // shown list is derived empty below
    const ctrl = new AbortController();
    const t = window.setTimeout(async () => {
      setBusy(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`, {
          signal: ctrl.signal,
        });
        if (res.ok) {
          const data = (await res.json()) as { hits: Hit[] };
          setHits(data.hits);
        }
      } catch {
        /* aborted or offline: keep the last list */
      } finally {
        if (!ctrl.signal.aborted) setBusy(false);
      }
    }, 180);
    return () => {
      ctrl.abort();
      window.clearTimeout(t);
    };
  }, [q, open]);

  const shown = q.trim().length >= 2 ? hits : [];
  const close = () => {
    setOpen(false);
    setQ("");
    setHits([]);
  };

  const hrefFor = (h: Hit) =>
    h.kind === "plant"
      ? `/plants/${h.slug}`
      : h.kind === "koi"
        ? `/koi/${h.slug}`
        : `/breeding#not-covered`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site (press /)"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/70 transition-colors hover:bg-white hover:text-black"
      >
        <Search size={16} strokeWidth={2.5} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/20"
          onClick={close}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-16 w-[min(40rem,calc(100%-2rem))] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-center gap-2 border-b border-black/10 px-4">
              <Search size={16} className="text-black/40" />
              <input
                ref={inputRef}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search koi, plants, varieties…"
                aria-controls={listId}
                aria-label="Search koi, plants and varieties"
                className="h-12 flex-1 bg-transparent text-base outline-none"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="rounded-full p-1 text-black/40 hover:text-black"
              >
                <X size={16} />
              </button>
            </div>
            <ul id={listId} className="max-h-[60vh] overflow-y-auto" data-lenis-prevent>
              {shown.map((h) => (
                <li key={`${h.kind}:${h.slug}`} className="border-b border-black/5 last:border-0">
                  <Link
                    href={hrefFor(h)}
                    onClick={close}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#66dd93]/10"
                  >
                    {h.kind === "koi" && h.koi ? (
                      <KoiComposite koi={h.koi} bufferWidth={120} className="w-14 shrink-0" />
                    ) : (
                      <span
                        className={`inline-flex w-14 shrink-0 justify-center rounded-lg border px-1 py-1 text-[0.6rem] font-bold uppercase ${
                          h.kind === "plant"
                            ? "border-[#49ad6d] bg-[#66dd93]/20 text-[#49ad6d]"
                            : "border-dashed border-black/25 text-black/45"
                        }`}
                      >
                        {h.kind === "plant" ? "plant" : "no art"}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="font-pally font-bold">{h.name}</span>
                        {h.subtitle && (
                          <span className="truncate text-xs text-black/45">{h.subtitle}</span>
                        )}
                      </span>
                      <span
                        className="line-clamp-2 text-xs text-black/55 [&_b]:font-bold [&_b]:text-black/80"
                        dangerouslySetInnerHTML={{ __html: h.snippet }}
                      />
                    </span>
                  </Link>
                </li>
              ))}
              {q.trim().length >= 2 && !busy && shown.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-black/50">
                  Nothing matches “{q.trim()}”.
                </li>
              )}
              {q.trim().length < 2 && (
                <li className="px-4 py-4 text-xs text-black/40">
                  Try a variety (“showa”), a colour (“metallic”), a plant (“iris”) or a topic (“shade”).
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
