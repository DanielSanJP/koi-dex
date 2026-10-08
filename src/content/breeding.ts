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
    parents: ["Kohaku", "Asagi"],
    produces: "Aka Matsuba",
    note: "Cotswold Koi records breeders crossing a high-red Kohaku with a Hi Asagi, a redder Asagi, in the late 1950s; a few solely red fry from that spawn were refined into Aka Matsuba. Kloubec names the same parents.",
    source: "https://www.cotswoldkoi.co.uk/knowledge-centre/what-is-a-aka-matsuba-koi/",
  },
  {
    parents: ["Koromo", "Koromo"],
    produces: "Budo Goromo",
    note: "A form selected within the Koromo family rather than a recorded cross: Champ Koi describes Budo Goromo as a later refinement of the Goromo, which came from Asagi and Kohaku crosses, and Pond Informer treats it as a sub-variety of Ai Goromo. The founding fish is not documented.",
    source: "https://www.champkoi.com/pages/koi-variety/budo-goromo",
  },
  {
    parents: ["Asagi", "German mirror carp"],
    produces: "Shusui",
    note: "German carp reached Japan in 1904 and Akiyama crossed them with Asagi from about 1910. The ZNA notes good specimens only appeared around 1928. Shusui was the first doitsu-scaled koi.",
    source: "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/shusui/",
  },
  {
    parents: ["Kohaku", "German mirror carp"],
    produces: "Doitsu Kohaku",
    note: "The JNPA describes doitsu koi as bred by crossing Japanese koi with near-scaleless food carp from Germany and Eastern Europe, and Wikipedia says the doitsu forms came from crossing many established varieties with German carp. No specific founding cross, breeder or date is recorded for Doitsu Kohaku.",
    source: "https://jnpa.info/en/nishikigoi/varieties/type/doitsugoi/",
  },
  {
    parents: ["Ki Bekko", "Magoi"],
    produces: "Ki Utsuri",
    note: "Eizaburo Hoshino crossed Ki Bekko with the wild black Magoi around 1921 to establish Ki Utsuri, the first fixed Utsuri variety and an ancestor of Showa.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Shiro Utsuri", "Asagi"],
    produces: "Kage Utsuri",
    note: "Fitz's Fish Ponds credits Otsuka Koi Farm with developing Kage Shiro Utsuri by blending Shiro Utsuri lines with Asagi blood, the Asagi netting giving the shadow over the white. It is a single dealer's account and gives no date.",
    source: "https://fitzfishponds.com/shop-all-fish/kage-shiro-utsuri/",
  },
  {
    parents: ["Chagoi", "Soragoi"],
    produces: "Ochiba",
    note: "Established as a distinct variety in the mid-1990s by selectively breeding Chagoi with the grey Soragoi, giving a grey-blue ground with brown fallen-leaf patterning. No single originating breeder is documented.",
    source: "https://www.kloubeckoi.com/blog/Ochiba-Koi-The-Fallen-Leaf-Variety",
  },
  {
    parents: ["Kigoi", "Chagoi"],
    produces: "Karashigoi",
    note: "Taro Kodama writes that Karashi was originally developed by crossing Kigoi with Chagoi, which is why it eats and grows like a Chagoi and may carry red-brown edges on its tail fin. No breeder or date is recorded.",
    source: "https://www.pondtrademag.com/language-of-koi-monochrome-muji-is-pure-perfection/",
  },
  {
    parents: ["Karasugoi", "Karasugoi"],
    produces: "Hajiro",
    note: "A variation within the Karasugoi line rather than a recorded cross: Taro Kodama describes Hajiro as Karasu with white-edged fins, and the JNPA notes that some Karasugoi show white pectoral fin tips.",
    source: "https://www.pondtrademag.com/language-of-koi-monochrome-muji-is-pure-perfection/",
  },
  {
    parents: ["Karasugoi", "Karasugoi"],
    produces: "Hageshiro",
    note: "A member of the Karasugoi family rather than a recorded cross: the ZNA groups it with Karasugoi, and Koitoday calls Karasugoi the progenitor of the family. No breeder or date is recorded.",
    source: "https://vijverleven.nl/en/blogs/kennisbank/karasugoi-familie",
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
    produces: "Yellow Ogon",
    note: "Ray Jordan's history records Sawata Aoki crossing a Kigoi with a light-coloured Ogon in 1957 to give the bright yellow Yamabuki Ogon, and Chuck Jones's history describes the same cross. Jordan's own list of key dates puts the first Yamabuki in 1946 instead, so the date is uncertain.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Yellow Ogon", "Shusui"],
    produces: "Midorigoi",
    note: "Ray Jordan's history lists Tacho Yoshioka's Midorigoi of 1963 with a male Yamabuki Ogon and a female Shusui as its parents. Chuck Jones's history gives the same year and adds that the green is recessive, so few are produced.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Kumonryu", "Kikusui"],
    produces: "Kikokuryu",
    note: "Ray Jordan's history records Kataoka and Aoki crossing a Kumonryu with a Doitsu Kikusui in 1993, giving the first koi with sumi on a metallic platinum body. Kodama's account names Platinum as the second parent instead.",
    source: "https://mpks.org/koi-history-by-ray-jordan/",
  },
  {
    parents: ["Kin Showa", "Kumonryu"],
    produces: "Kin Kikokuryu",
    note: "Kodama records Seiki Igarashi creating Kin Kikokuryu in 1998 by crossing Kin Showa with Kumonryu. Kodama's longer profile of his fish says he uses Kikokuryu as the male parent, which is why plain Kikokuryu still turn up in his spawns.",
    source: "https://www.kodamakoifarm.com/variety/kin-kikokuryu/",
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
    parents: ["Showa", "Gold Ogon"],
    produces: "Kin Showa",
    note: "The JNPA describes the Hikari Utsuri as bred from Showa or Shiro Utsuri and the single-coloured metallic koi, and Ray Jordan's history names Kin Showa among the varieties built on the Ogon. No specific founding cross, breeder or date is documented.",
    source: "https://jnpa.info/en/nishikigoi/varieties/type/hikari-utsuri/",
  },
  {
    parents: ["Shiro Utsuri", "Gold Ogon"],
    produces: "Gin Shiro",
    note: "The JNPA describes the Hikari Utsuri as bred from Shiro Utsuri or Showa and the single-coloured metallic koi; it names the metallic class rather than a particular Ogon. No specific founding cross, breeder or date is documented for Gin Shiro.",
    source: "https://jnpa.info/en/nishikigoi/varieties/type/hikari-utsuri/",
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
