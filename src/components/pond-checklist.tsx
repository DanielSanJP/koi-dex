"use client";

import { useMemo, useSyncExternalStore } from "react";
import Button from "@/components/button";
import type { ChecklistGroup } from "@/content/care";

/* The new-pond checklist. Ticks persist in localStorage so a reader can come
   back to it over the weeks a pond build actually takes. localStorage is
   exposed as a tiny external store: the server snapshot is always "nothing
   ticked", so the HTML matches on hydration and the ticks fill in client-side. */

const STORAGE_KEY = "koi-dex:new-pond-checklist";
const EMPTY = "[]";
const listeners = new Set<() => void>();

function readRaw(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeRaw(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* storage may be unavailable; listeners still get the in-memory value */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => readRaw();
const getServerSnapshot = () => EMPTY;

function parse(raw: string): Set<string> {
  try {
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? (arr as string[]) : []);
  } catch {
    return new Set();
  }
}

type Props = { groups: ChecklistGroup[] };

export default function PondChecklist({ groups }: Props) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const done = useMemo(() => parse(raw), [raw]);

  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const count = done.size;

  const toggle = (id: string) => {
    const next = new Set(done);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    writeRaw([...next]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-black/60">
          <span className="font-bold text-black/80">
            {count} of {total}
          </span>{" "}
          ticked off. Your ticks are saved in this browser.
        </p>
        {count > 0 && (
          <Button
            text="Reset"
            variant="outline"
            compact
            onPressed={() => writeRaw([])}
          />
        )}
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-black/5"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={count}
        aria-label="Checklist progress"
      >
        <div
          className="h-full rounded-full bg-[#66dd93] transition-[width] duration-300"
          style={{ width: `${total ? (count / total) * 100 : 0}%` }}
        />
      </div>
      <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {groups.map((g, gi) => {
          const groupDone = g.items.filter((_, ii) =>
            done.has(`${gi}:${ii}`),
          ).length;
          return (
            <li
              key={g.title}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-pally font-bold">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#66dd93]/20 text-xs text-[#49ad6d]">
                    {gi + 1}
                  </span>
                  {g.title}
                </h3>
                <span className="text-xs font-bold text-black/55 tabular-nums">
                  {groupDone}/{g.items.length}
                </span>
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {g.items.map((item, ii) => {
                  const id = `${gi}:${ii}`;
                  const checked = done.has(id);
                  return (
                    <li key={id}>
                      <label className="flex cursor-pointer items-start gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(id)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[#49ad6d]"
                        />
                        <span
                          className={
                            checked
                              ? "text-black/55 line-through"
                              : "text-black/70"
                          }
                        >
                          {item}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
