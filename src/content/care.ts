/* Care guide content, researched and source-checked. */

export type QuickFact = { label: string; value: string };
export type CareSection = { title: string; paragraphs: string[] };
export type SeasonCare = { season: string; points: string[] };

export const QUICK_FACTS: QuickFact[] = [];

export const CARE_SECTIONS: CareSection[] = [];

export const SEASONS: SeasonCare[] = [];
