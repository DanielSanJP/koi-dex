import type { Difficulty, NzStatus, PlantType } from "@/generated/prisma/enums";

/* Display labels and chip styling for the plants enums. Kept in one place so
   the grid, the detail page and the search results agree. */

export const TYPE_LABEL: Record<PlantType, string> = {
  FLOATING: "Floating",
  SUBMERGED: "Submerged",
  MARGINAL: "Marginal",
};

export const TYPE_BLURB: Record<PlantType, string> = {
  FLOATING:
    "Lives on the surface, free-floating or rooted with leaves that float. Shade and nutrient uptake.",
  SUBMERGED: "Grows under the water. The oxygenators, and where fry hide.",
  MARGINAL:
    "Stands in the shallows at the edge with its roots in a few centimetres of water. Cover, flowers, filtration.",
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  EASY: "Easy",
  MODERATE: "Moderate",
  HARD: "Hard",
};

export const NZ_LABEL: Record<NzStatus, string> = {
  NATIVE: "NZ native",
  NATURALISED: "Naturalised in NZ",
  CULTIVATED: "Sold in NZ",
  PEST: "Banned in NZ",
  UNKNOWN: "Not listed, check first",
};

export const NZ_CHIP: Record<NzStatus, string> = {
  NATIVE: "border-[#49ad6d] bg-[#66dd93]/20 text-[#49ad6d]",
  NATURALISED: "border-black/10 bg-white text-black/50",
  CULTIVATED: "border-black/10 bg-white text-black/50",
  PEST: "border-[#dd6666] bg-[#dd6666]/10 text-[#ad4949]",
  UNKNOWN: "border-[#f8a634] bg-[#f8a634]/15 text-[#a86a0f]",
};

export const CHIP_NEUTRAL = "border-black/10 bg-white text-black/50";
export const CHIP_GOOD = "border-[#49ad6d] bg-[#66dd93]/20 text-[#49ad6d]";
export const CHIP_WARN = "border-[#f8a634] bg-[#f8a634]/15 text-[#a86a0f]";
