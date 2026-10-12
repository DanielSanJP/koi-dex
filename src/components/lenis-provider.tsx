"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

type LenisProviderProps = {
  children: ReactNode;
};

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // Respect the OS reduced-motion setting: native scrolling, no smoothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      // lerp only: a `duration` here takes over and lerp is ignored.
      lerp: 0.3,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}
