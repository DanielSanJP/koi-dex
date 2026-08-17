"use client";

import { useSyncExternalStore } from "react";

/* The URL query string as React state. Reads go through
   useSyncExternalStore with a server snapshot of "" so prerendered HTML
   matches on hydration; writes use history.replaceState, which Next.js keeps
   in sync with its router. Used by the dex and plants filters so a filtered
   view is a shareable link and the back button works. */

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

export function useUrlSearch() {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const params = new URLSearchParams(search);

  /** Set (string) or clear (null/"") several keys at once. */
  const update = (next: Record<string, string | null | undefined>) => {
    const p = new URLSearchParams(window.location.search);
    for (const [k, v] of Object.entries(next)) {
      if (v === undefined) continue;
      if (v) p.set(k, v);
      else p.delete(k);
    }
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    listeners.forEach((l) => l());
  };

  return { params, update };
}
