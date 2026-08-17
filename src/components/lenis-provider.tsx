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
      duration: 0.8,
      lerp: 0.15,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}
