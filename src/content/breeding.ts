import type { BreedingCross } from "@/lib/types";

/* Breeding guide content, researched and source-checked (2026-07-28).
   Where breeder histories conflict, the note says so rather than picking a
   winner. Crosses are documented lineages, never guaranteed outcomes. */

export const FUNDAMENTALS: string[] = [
  "Koi spawn once a year, in late spring or early summer, triggered by warming water and longer days. Spawning generally starts between 18 and 25 °C, and breeders put spawning ropes in at around 24 °C.",
  "A single spawn is enormous. A small breedable female of 20 to 25 cm lays roughly 5,000 to 10,000 eggs; a large female can release close to half a million. Eggs hatch in about three to seven days depending on temperature.",
  "Fry are culled in several rounds, not one. The first pass at four to six weeks removes deformities and stunted fish. Colour and pattern are not readable for six to eight weeks, so later rounds, roughly every eight weeks up to about six months, select on pattern, colour and body shape.",
  "Survival is low by design. Ninety per cent or more of a spawn is culled or lost, and a professional breeder may keep only 100 to 200 fry out of many thousands. Hobby breeders typically retain 5 to 10 per cent.",
  "Siblings from one spawn look strikingly different. Colour in koi is polygenic: research on Cyprinus carpio found at least three genes involved in controlling red, with interactions between and within loci, so patterns do not segregate in tidy ratios.",
  "A variety is a named appearance standard, not a genotype. Some classes are explicitly about pattern rather than lineage; the ZNA describes Tancho as a category defined by its pattern, not a specific variety. This is why one pair can throw fish that get classified as several different varieties.",
  "Breeders work by line-breeding, pairing repeatedly within an established bloodline to fix traits such as the deep red of a Kohaku line, balanced against outcrossing to add a trait or restore vigour. Almost every modern variety began as a deliberate outcross that was then line-bred for decades.",
  "Because outcomes are probabilistic, no cross reliably produces a variety. A cross shifts the odds of certain traits appearing in a spawn; the named variety is what breeders then select for, cull toward and stabilise over generations.",
];

export const DOCUMENTED_CROSSES: BreedingCross[] = [
  {
    parents: ["Kohaku", "Ki Utsuri"],
    produces: "Showa",
    note: "Jukichi Hoshino produced the first Showa around 1926 to 1927. Early fish had greyish white and dull black; decades of selection reached the modern look.",
    source: "https://en.wikipedia.org/wiki/Showa_(fish)",
  },
  {
    parents: ["Kohaku", "Showa"],
    produces: "Showa",
    note: "In 1964 Tomiji Kobayashi crossed a male Yagozen Kohaku with a female Showa, giving large crimson markings and a brighter white ground. Most modern Showa descend from this refinement.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Kohaku", "Koromo"],
    produces: "Sanke",
    note: "Sanke was fixed in the Taisho era by putting black onto Kohaku bloodlines. Ray Jordan's history records Eizaburo Hoshino crossing a male Kohaku with a female Ai Goromo carrying a little black netting in 1917; other accounts credit an earlier 1914 exhibition fish. The founding fish is disputed.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Kohaku", "Asagi"],
    produces: "Koromo",
    note: "Koromo emerged in the 1950s; the blue or black netting that overlays the red comes from the Asagi side, and Koromo lines must retain Asagi ancestry to keep it.",
    source: "https://pondinformer.com/goromo-koi-guide/",
  },
  {
    parents: ["Kohaku", "Asagi"],
    produces: "Goshiki",
    note: "Kodama dates the first Goshiki to 1918 from Asagi crossed with Kohaku; the ZNA and Kloubec name Taisho Sanke as the second parent instead, so the founding cross is uncertain. The bright modern type came from later selection.",
    source: "https://www.kodamakoifarm.com/variety/goshiki/",
  },
  {
    parents: ["Asagi", "German mirror carp"],
    produces: "Shusui",
    note: "German carp reached Japan in 1904 and Akiyama crossed them with Asagi from about 1910. The ZNA notes good specimens only appeared around 1928. Shusui was the first doitsu-scaled koi.",
    source: "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/shusui/",
  },
  {
    parents: ["Ki Bekko", "Magoi"],
    produces: "Ki Utsuri",
    note: "Eizaburo Hoshino crossed Ki Bekko with the wild black Magoi around 1921 to establish Ki Utsuri, the first fixed Utsuri variety and an ancestor of Showa.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Chagoi", "Soragoi"],
    produces: "Ochiba",
    note: "Established as a distinct variety in the mid-1990s by selectively breeding Chagoi with the grey Soragoi, giving a grey-blue ground with brown fallen-leaf patterning. No single originating breeder is documented.",
    source: "https://www.kloubeckoi.com/blog/Ochiba-Koi-The-Fallen-Leaf-Variety",
  },
  {
    parents: ["Karasugoi", "Shusui"],
    produces: "Kumonryu",
    note: "Kumonryu's black comes from the Karasugoi line on doitsu stock, but the founding cross is poorly documented: accounts variously cite Shusui with Matsukawa Bakke, or a Karasugoi among doitsu Nezu Ogon offspring. Treat the exact parentage as uncertain.",
    source: "https://www.kodamakoifarm.com/variety/kumonryu/",
  },
  {
    parents: ["Kumonryu", "Kohaku"],
    produces: "Beni Kumonryu",
    note: "Ray Jordan's history records Megumi Yoshida crossing a male Kumonryu with a female Doitsu Kohaku in 1980 to add red to the Kumonryu pattern.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Shusui", "Hariwake"],
    produces: "Kujaku",
    note: "First produced in Ojiya in 1960 by Toshio Hirasawa, from Shusui crossed with Kin Matsuba and Hariwake stock. The often-repeated Goshiki × Ogon claim is not what breeder-sourced histories record.",
    source: "https://www.kloubeckoi.com/kujaku-koi-for-sale/",
  },
  {
    parents: ["Kohaku", "Platinum"],
    produces: "Hariwake",
    note: "The original Hariwake were selectively bred from a Kohaku and Platinum Ogon cross, giving a metallic platinum ground with yellow or orange patterning. Breeders now work Hariwake to Hariwake instead.",
    source: "https://www.pondtrademag.com/language-of-koi-hariwake/",
  },
  {
    parents: ["Magoi", "line-bred metallic offspring"],
    produces: "Gold Ogon",
    note: "Sawata Aoki bought a black Magoi with gold at the dorsal fin base in 1921 and line-bred its descendants for 25 years, crossing his most metallic offspring with a white female in 1946 to establish the Ogon. These lines underpin every later metallic variety.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Kigoi", "Nezu Ogon"],
    produces: "Platinum",
    note: "Tadao Yoshioka of Uozu obtained the silvery Platinum Ogon in 1963 by crossing the yellow Kigoi with the grey metallic Nezu Ogon.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Kigoi", "Gold Ogon"],
    produces: "Gold Ogon",
    note: "The lemon-gold Yamabuki form of the Ogon followed in the mid-1950s by crossing Aoki's Ogon lines with the yellow Kigoi. Breeders treat it as a refinement within the Ogon rather than a separate variety.",
    source: "https://www.kloubeckoi.com/yamabuki-koi-for-sale/",
  },
  {
    parents: ["Kumonryu", "Kikusui"],
    produces: "Kikokuryu",
    note: "Ray Jordan's history records Kataoka and Aoki crossing a Kumonryu with a Doitsu Kikusui in 1993, giving the first koi with sumi on a metallic platinum body. Kodama's account names Platinum as the second parent instead.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Sanke", "Gold Ogon"],
    produces: "Yamato Nishiki",
    note: "Ray Jordan's history lists Seikichi Hoshino's Yamato Nishiki of 1965 with Sanke and Ogon as its parents, laying the metallic lustre over the Sanke pattern. Other accounts call its development poorly documented.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Ki Utsuri", "Gold Ogon"],
    produces: "Kin Ki Utsuri",
    note: "The ZNA defines the Hikari Utsuri class as the Utsuri family with a metallic body, the sheen tracing back to Aoki's Ogon lines. Unlike Kujaku or Platinum, no specific founding cross, breeder or date is documented.",
    source:
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-utsurimono/",
  },
  {
    parents: ["Kohaku", "Kohaku"],
    produces: "Tancho",
    note: "Tancho cannot be bred to order. The single round head marking turns up at random within Kohaku-type bloodlines, spawns give inconsistent results, and Tancho parents do not reliably produce Tancho offspring.",
    source: "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/tancho/",
  },
];

export const SPAWN_NOTES: string[] = [
  "A Kohaku pairing produces tens of thousands of fry, and the overwhelming majority are culls. Most revert toward plain or muddy colouring, or carry unusable patterns: red running off the tail, no white step, red over the eyes or fins, scattered specks.",
  "Nothing can be judged straight away. Deformed and stunted fry go first at four to six weeks, but pattern needs six to eight weeks to appear before pattern-based culling means anything. Selection then continues in rounds until about six months, when the promising young fish, the tategoi, are picked out.",
  "Of the fish that survive selection, most are simply pond quality: sound, healthy koi with an acceptable but unremarkable pattern. Show-quality fish are a small fraction of that small remainder, and a genuinely outstanding fish may be a handful of individuals, or none at all.",
  "In Sanke and especially Showa lines, judging young fish is harder because the black develops late. Young Showa often show only shadowy blue-grey that darkens and spreads with maturity, frequently not settling until around three years old. A fish that looks like a Sanke as a yearling can reveal itself as a Showa as an adult.",
];

export const BREEDING_SOURCES: string[] = [
  "https://www.kodamakoifarm.com/how-to-breed-koi/",
  "https://www.akakoi.com.au/breeding-and-culling",
  "https://expert.koi-life.com/breeding/culling-and-selection/",
  "https://mpks.org/koi-history-by-ray-jordan/",
  "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/tancho/",
];
