export type KoiFins = {
  dominant: string | null;
  tail: string | null;
  dorsal: string | null;
  back: string | null;
  side: string | null;
};

/** One row of data/koi.json — the only data the app contributes. */
export type Koi = {
  slug: string;
  name: string;
  number: number;
  body: string;
  preview: string | null;
  blurhash: string | null;
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
};

/** A documented real-world breeding relationship. */
export type BreedingCross = {
  parents: [string, string];
  produces: string;
  note: string;
};
