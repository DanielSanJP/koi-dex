export type KoiFins = {
  dominant: string | null;
  tail: string | null;
  dorsal: string | null;
  back: string | null;
  side: string | null;
};

/** One row of data/koi.json — the only data the app contributes.
    Koi are always drawn from the body sprite + tinted fin sheets; the app's
    flat preview images are not used. */
export type Koi = {
  slug: string;
  name: string;
  number: number;
  body: string;
  fins: KoiFins;
};

/** Authored, researched real-world info per variety. */
export type VarietyInfo = {
  nameMeaning: string;
  family: string;
  pattern: string;
  origin: string;
  notes?: string;
  sources: string[];
  /** What is genuinely different about keeping THIS variety. Empty when
      nothing distinctive is documented — padding would be worse. */
  care?: string[];
  careSources?: string[];
};

/** A documented real-world breeding relationship. */
export type BreedingCross = {
  parents: [string, string];
  produces: string;
  note: string;
  source: string;
};
