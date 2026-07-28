"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

type LenisProviderProps = {
  children: ReactNode;
};

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
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
