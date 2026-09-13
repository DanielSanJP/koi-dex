/* When each variety appeared, for the breeding timeline and the family tree's
   era tiers. Researched and source-checked (2026-07-28). `year` sorts, `label`
   is what the reader sees, `confidence` is honest about how firm the date is. */

export type Origin = {
  year: number | null;
  label: string;
  confidence: "documented" | "approximate" | "disputed";
  source?: string;
};

export const ORIGINS: Record<string, Origin> = {
  kohaku: {
    year: 1889,
    label: "fixed 1888–89",
    confidence: "disputed",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  asagi_koi: {
    year: 1810,
    label: "early 1800s",
    confidence: "approximate",
    source: "https://pondinformer.com/asagi-koi-guide/",
  },
  bekko: {
    year: 1850,
    label: "mid-1800s",
    confidence: "approximate",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  benigoi: {
    year: null,
    label: "old solid-red line, undated",
    confidence: "approximate",
    source:
      "https://www.pondtrademag.com/language-of-koi-monochrome-muji-is-pure-perfection/",
  },
  karasugoi: {
    year: null,
    label: "old solid-black line, undated",
    confidence: "approximate",
    source:
      "https://www.pondtrademag.com/language-of-koi-monochrome-muji-is-pure-perfection/",
  },
  chagoi: {
    year: 1900,
    label: "early 1900s",
    confidence: "approximate",
    source: "https://www.champkoi.com/pages/koi-variety/chagoi",
  },
  shusui: {
    year: 1910,
    label: "1910",
    confidence: "disputed",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  sanke: {
    year: 1917,
    label: "1915–17",
    confidence: "disputed",
    source: "https://en.wikipedia.org/wiki/Koi",
  },
  ki_utsuri: {
    year: 1921,
    label: "1921",
    confidence: "documented",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  hi_utsuri: {
    year: 1924,
    label: "about 1924",
    confidence: "approximate",
    source: "https://pondinformer.com/utsurimono-koi-guide/",
  },
  shiro_utsuri: {
    year: 1925,
    label: "1925",
    confidence: "documented",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  showa: {
    year: 1927,
    label: "1927, refined 1964",
    confidence: "documented",
    source: "https://en.wikipedia.org/wiki/Koi",
  },
  gold_ogon: {
    year: 1946,
    label: "1946",
    confidence: "documented",
    source: "https://en.wikipedia.org/wiki/Koi",
  },
  hariwake: {
    year: 1950,
    label: "late 1940s–50s",
    confidence: "approximate",
    source: "https://www.kloubeckoi.com/hariwake-koi-for-sale/",
  },
  koromo: {
    year: 1951,
    label: "early 1950s",
    confidence: "approximate",
    source: "https://pondinformer.com/goromo-koi-guide/",
  },
  kujaku: {
    year: 1960,
    label: "1960",
    confidence: "documented",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  kin_ki_utsuri: {
    year: 1960,
    label: "about the 1960s",
    confidence: "approximate",
    source:
      "https://www.aquariumdomain.com/SpeciesProfiles/Koi/KinKiUtsuriKoi.shtml",
  },
  platinum: {
    year: 1963,
    label: "1963",
    confidence: "disputed",
    source: "https://www.kodamakoifarm.com/variety/platinum/",
  },
  beni_kumonryu: {
    year: 1980,
    label: "1980",
    confidence: "documented",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  kumonryu: {
    year: 1980,
    label: "early 1980s, recognised 1994",
    confidence: "approximate",
    source:
      "https://www.kloubeckoi.com/blog/kumonryu-koi-dragon-scale-pattern-mesmerizes-collectors-worldwide/",
  },
  ochiba: {
    year: 1995,
    label: "mid-1990s",
    confidence: "approximate",
    source: "https://www.kloubeckoi.com/blog/Ochiba-Koi-The-Fallen-Leaf-Variety",
  },
  tancho: {
    year: null,
    label: "not a dated variety: a chance head spot that cannot be bred true",
    confidence: "documented",
    source: "https://pondinformer.com/tancho-koi-guide/",
  },
  aka_bekko: {
    year: 1850,
    label: "mid-1800s, with the other Bekko",
    confidence: "approximate",
    source: "https://pondinformer.com/bekko-koi-guide/",
  },
  ki_bekko: {
    year: 1850,
    label: "mid-1800s",
    confidence: "approximate",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  orenji_ogon: {
    year: null,
    label: "Ogon colour form, undated",
    confidence: "approximate",
    source: "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-mujimono/",
  },
  soragoi: {
    year: null,
    label: "old solid-grey line, undated",
    confidence: "approximate",
    source: "https://www.champkoi.com/pages/koi-variety/soragoi",
  },
  goshiki: {
    year: 1918,
    label: "1918, undated or later in other accounts",
    confidence: "disputed",
    source: "https://www.kodamakoifarm.com/variety/goshiki/",
  },
  kikusui: {
    year: null,
    label: "undated; a breeding parent by 1993",
    confidence: "disputed",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  kigoi: {
    year: null,
    label: "old solid-yellow line, undated",
    confidence: "approximate",
    source: "https://www.kloubeckoi.com/kigoi-koi-for-sale/",
  },
  nezu_ogon: {
    year: null,
    label: "early Ogon line, a parent by 1963",
    confidence: "approximate",
    source: "https://www.pondtrademag.com/basic-beauty-the-striking-simplicity-of-hikari-muji/",
  },
};

/** Era bands for the family tree, oldest first. */
export const ERAS: { label: string; from: number; to: number }[] = [
  { label: "1800s", from: 1800, to: 1899 },
  { label: "1900s–20s", from: 1900, to: 1929 },
  { label: "1940s–50s", from: 1930, to: 1959 },
  { label: "1960s–70s", from: 1960, to: 1979 },
  { label: "1980s on", from: 1980, to: 2100 },
];

export function getOrigin(slug: string): Origin | undefined {
  return ORIGINS[slug];
}

/** Varieties in one era band, dex order within the band. */
export function koiInEra(
  slugs: string[],
  era: { from: number; to: number },
): string[] {
  return slugs.filter((s) => {
    const y = ORIGINS[s]?.year;
    return y != null && y >= era.from && y <= era.to;
  });
}

/** Varieties with no usable date, shown apart from the dated tiers. */
export function undatedKoi(slugs: string[]): string[] {
  return slugs.filter((s) => ORIGINS[s]?.year == null);
}
