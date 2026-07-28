import type { VarietyInfo } from "@/lib/types";

/* Real-world variety reference, researched and source-checked.
   Filled from the research pass; keep claims conservative. */

export const FAMILIES: Record<string, string> = {};

export const VARIETY_INFO: Record<string, VarietyInfo> = {};

export function getVarietyInfo(slug: string): VarietyInfo | undefined {
  return VARIETY_INFO[slug];
}
