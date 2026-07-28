import { DOCUMENTED_CROSSES } from "@/content/breeding";
import { findKoiByName } from "@/lib/data";
import type { BreedingCross, Koi } from "@/lib/types";

/** A name in a cross is either a koi we can draw, or an ancestor we can't. */
export type CrossParty =
  | { kind: "koi"; koi: Koi }
  | { kind: "ancestor"; name: string };

export function resolveParty(name: string): CrossParty {
  const koi = findKoiByName(name);
  return koi ? { kind: "koi", koi } : { kind: "ancestor", name };
}

const sameName = (a: string, b: string) =>
  a.trim().toLowerCase() === b.trim().toLowerCase();

/** Crosses that produced this variety (walking up the lineage). */
export function producedBy(koiName: string): BreedingCross[] {
  return DOCUMENTED_CROSSES.filter(
    (c) => sameName(c.produces, koiName) && !c.parents.some((p) => sameName(p, koiName)),
  );
}

/** Crosses where this variety is a parent (walking down the lineage). */
export function parentOf(koiName: string): BreedingCross[] {
  return DOCUMENTED_CROSSES.filter(
    (c) => c.parents.some((p) => sameName(p, koiName)) && !sameName(c.produces, koiName),
  );
}

/** Refinements: this variety appears on both sides (e.g. Showa x Kohaku -> Showa). */
export function refinements(koiName: string): BreedingCross[] {
  return DOCUMENTED_CROSSES.filter(
    (c) => sameName(c.produces, koiName) && c.parents.some((p) => sameName(p, koiName)),
  );
}

/** The documented outcome of pairing two varieties, if there is one. */
export function findCross(a: string, b: string): BreedingCross | undefined {
  return DOCUMENTED_CROSSES.find(
    (c) =>
      (sameName(c.parents[0], a) && sameName(c.parents[1], b)) ||
      (sameName(c.parents[0], b) && sameName(c.parents[1], a)),
  );
}
