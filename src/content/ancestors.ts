/* Varieties that appear in koi lineage but have no sprite on this site, so
   they render as named nodes rather than fish. Researched and source-checked
   (2026-07-28). Kigoi, Soragoi, Nezu Ogon and Ki Bekko started here and moved
   into the dex proper once they had artwork (2026-09-14), and Magoi followed
   (2026-10-09). */

export type Ancestor = {
  name: string;
  definition: string;
  role: string;
  sources: string[];
};

export const ANCESTORS: Ancestor[] = [
  {
    name: "German mirror carp",
    definition:
      "European scale-reduced food carp, known in Japan as Doitsugoi: mirror carp with a row of large scales, and leather carp that are effectively bare.",
    role: "Imported from Munich in 1904 to improve the edible fish supply, and the sole source of doitsu scaling in koi. Crossed onto Asagi it produced Shusui, and every scaleless variety since, including Kumonryu and Kikusui, traces its scale pattern to this stock.",
    sources: [
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://www.kloubeckoi.com/blog/doitsu-koi-guide",
    ],
  },
];

/** Well-known real varieties this site has no artwork for, acknowledged so the
    dex does not pretend its list is the whole of koi. Goshiki and Kikusui
    graduated from here to full entries (2026-09-14), then Kikokuryu and
    Yamato Nishiki (2026-10-09), and Matsuba left the same day once five of
    its colour forms (Ki, Aka, Kin, Gin and Orenji) were drawn. */
export const RELATIVES: Ancestor[] = [
  {
    name: "Ginrin",
    definition:
      "Not a variety but a scale characteristic: individual scales that sparkle gold or silver, which can appear on almost any koi.",
    role: "Judged as a modifier over an existing variety, so a Ginrin Kohaku is a Kohaku with the sparkle noted. Eizaburo Hoshino first found the sparkling scales in 1929; shows require two or more clear lines of them along each side of the spine.",
    sources: [
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/kinginrin-1/",
      "https://www.kodamakoifarm.com/variety/ginrin/",
    ],
  },
  {
    name: "Doitsu",
    definition:
      "Not a variety but a scalation type: koi that are scaleless apart from a line of large mirror scales along the back, inherited from imported German carp.",
    role: "An overlay applied across the classes, so one speaks of Doitsu Kohaku or Doitsu Hariwake, each judged against its own variety standard. The trait entered koi entirely through the 1904 import, first crossed onto Asagi to give Shusui.",
    sources: [
      "https://nextdaykoi.com/koi-fish-facts/doitsu-variety-the-scaleless-koi/",
      "https://www.kodamakoifarm.com/variety/doitsu/",
    ],
  },
];

export function getAncestor(name: string): Ancestor | undefined {
  const needle = name.trim().toLowerCase();
  return [...ANCESTORS, ...RELATIVES].find(
    (a) => a.name.toLowerCase() === needle,
  );
}
