/* Varieties that appear in koi lineage but have no sprite on this site, so
   they render as named nodes rather than fish. Researched and source-checked
   (2026-07-28). */

export type Ancestor = {
  name: string;
  definition: string;
  role: string;
  sources: string[];
};

export const ANCESTORS: Ancestor[] = [
  {
    name: "Magoi",
    definition:
      "The wild black or dark-bronze common carp raised as a food fish in Niigata's rice-paddy ponds, from which every ornamental koi descends.",
    role: "The root stock. Colour mutations spotted among food-carp fry between 1804 and 1830 were set aside and bred on, producing Asagi and the first red-and-white lines. Magoi was also brought back deliberately as a parent, crossed with Ki Bekko to found the Utsuri family, and it remains the source of koi body size and vigour.",
    sources: [
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://www.kodamakoifarm.com/what-is-nishikigoi-history-meaning/",
    ],
  },
  {
    name: "Kigoi",
    definition:
      "A solid, non-metallic lemon-to-pale-yellow koi, sometimes called the lemon koi.",
    role: "One of the old single-colour lines and the yellow donor in several metallic crosses. Crossed with the grey metallic Nezu Ogon it produced Platinum Ogon; the red-eyed Akame Kigoi is the parent named in that account.",
    sources: [
      "https://nextdaykoi.com/koi-fish/koi/kawarimono/kigoi/",
      "https://www.pondtrademag.com/basic-beauty-the-striking-simplicity-of-hikari-muji/",
    ],
  },
  {
    name: "Soragoi",
    definition:
      "A solid non-metallic grey to blue-grey koi, often with faint net-like reticulation. The name means sky carp.",
    role: "Supplies the cool grey ground in the cross with the brown Chagoi that created Ochiba Shigure in the mid-1990s, the Chagoi brown sitting over it as the fallen leaves. Like Chagoi it carries the docile temperament and fast growth breeders value.",
    sources: [
      "https://www.kodamakoifarm.com/variety/ochibashigure/",
      "https://www.kloubeckoi.com/blog/Ochiba-Koi-The-Fallen-Leaf-Variety",
    ],
  },
  {
    name: "Nezu Ogon",
    definition:
      "A single-coloured metallic koi in a dull grey to silver tone (nezu means mouse), one of the earliest metallics from Sawata Aoki's Ogon line.",
    role: "Contributed the lustre and silver-grey tone that, crossed with the yellow Kigoi, produced the Platinum Ogon shown in 1963. Through Platinum it stands behind Hariwake, Kikusui, Yamato Nishiki and much of the modern metallic patterned class.",
    sources: [
      "https://www.koi-fish.com/koi-classification/nezu-ogon.html",
      "https://www.kodamakoifarm.com/variety/platinum/",
    ],
  },
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
  {
    name: "Ki Bekko",
    definition:
      "A yellow-bodied Bekko: a lemon-yellow koi carrying black tortoiseshell markings, now the rarest of the three Bekko colours.",
    role: "Recorded as appearing spontaneously from Magoi in the mid-1800s, and the parent Hoshino crossed back with Magoi in 1921 to fix Ki Utsuri. Because Ki Utsuri led to Hi and Shiro Utsuri and fed into Showa, Ki Bekko sits behind the whole black-based branch of modern koi.",
    sources: [
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://giobelkoicenter.com/ki-utsuri-koi/",
    ],
  },
];

/** Well-known real varieties this site has no artwork for, acknowledged so the
    dex does not pretend 22 is the whole of koi. */
export const RELATIVES: Ancestor[] = [
  {
    name: "Goshiki",
    definition:
      "A five-colour koi: a Kohaku-style red pattern over white, overlaid with blue-black Asagi netting, giving white, red, black, blue and grey.",
    role: "The bridge between the Asagi and Kohaku lines, made by crossing the two so Asagi net-scaling sits over a Gosanke pattern. Dates conflict: several sources place its creation in 1918, others describe a 1980s debut, which likely refers to the brighter modern type rather than the original dark fish.",
    sources: [
      "https://www.kodamakoifarm.com/variety/goshiki/",
      "https://koisale.com/pages/koi-varieties/goshiki.html",
    ],
  },
  {
    name: "Matsuba",
    definition:
      "A single-coloured koi whose scales each carry a dark centre, making a pinecone reticulation down the back. Kin Matsuba is the metallic gold version.",
    role: "The mechanism by which Asagi net-scaling was carried into single-colour and metallic koi. Kin Matsuba was created in the 1950s from Yamabuki Ogon and Shiro Matsuba. Matsuba scaling also underlies Kujaku, which is essentially a metallic Matsuba carrying a Kohaku pattern.",
    sources: [
      "https://www.kloubeckoi.com/matsuba-koi-for-sale/",
      "https://koisale.com/pages/koi-varieties/matsuba.html",
    ],
  },
  {
    name: "Kikusui",
    definition:
      "A doitsu metallic koi with a platinum-white body carrying metallic orange or red. The name means chrysanthemum water.",
    role: "Effectively a scaleless metallic Kohaku, downstream of both the 1946 Ogon line and the 1904 German carp import. Historically important because a female Kikusui crossed with a male Kumonryu in 1993 created Kikokuryu.",
    sources: [
      "https://www.champkoi.com/pages/koi-variety/kikusui",
      "https://www.kodamakoifarm.com/variety/kikokuryu/",
    ],
  },
  {
    name: "Kikokuryu",
    definition:
      "A metallic doitsu koi with platinum skin and shifting black. Beni Kikokuryu is the same fish with red or orange added.",
    role: "Created by Haruo Aoki in 1993 from a male Kumonryu and a female Kikusui, the first koi to show sumi on a metallic platinum body. Offspring without red became Kikokuryu, those inheriting the Kikusui red became Beni Kikokuryu.",
    sources: [
      "https://www.kodamakoifarm.com/variety/kikokuryu/",
      "https://mpks.org/koi-history-by-ray-jordan/",
    ],
  },
  {
    name: "Yamato Nishiki",
    definition:
      "The metallic version of Taisho Sanke: a lustrous white body carrying red and black Sanke markings.",
    role: "Made by crossing Sanke stock with Platinum Ogon, showing how the metallic line was layered back over the established Gosanke patterns. Ray Jordan credits Seikichi Hoshino with it in 1965.",
    sources: [
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://nextdaykoi.com/koi-fish/koi/hikarimoyo/yamato-nishiki/",
    ],
  },
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
