import type { VarietyInfo } from "@/lib/types";

/* Real-world variety reference, researched and source-checked (2026-07-28).
   Claims are kept conservative; where breeder accounts differ (e.g. the exact
   Kujaku cross) the entry says so instead of picking one. */

export const FAMILIES: Record<string, string> = {
  Gosanke:
    "The Big Three of the show world: Kohaku, Taisho Sanke and Showa. Non-metallic koi built from red, white and black.",
  Utsurimono:
    "Non-metallic black-based koi whose white, red or yellow markings wrap the body in an alternating balance: Shiro, Hi and Ki Utsuri.",
  Bekko:
    "Non-metallic koi with a solid white, red or yellow base carrying simple black spots along the back. Genetically close to Sanke.",
  "Asagi & Shusui":
    "The blue koi: Asagi with its fully scaled, net-patterned blue back and red flanks, and Shusui, its scaleless doitsu counterpart.",
  Koromo:
    "Robed koi: a Kohaku-style red pattern overlaid with blue or black scale edging, originally from Kohaku and Asagi crosses.",
  Kawarimono:
    "The catch-all class for non-metallic varieties that fit no other group, including Chagoi, Benigoi, Karasugoi, Ochiba and Kumonryu.",
  Hikarimuji:
    "Single-coloured metallic koi, the Ogon group: Platinum Ogon, Yamabuki Ogon and kin, judged on lustre and clean colour.",
  Hikarimoyo:
    "Metallic koi with a pattern of two or more colours outside the Utsuri line, such as Hariwake and Kujaku.",
  "Hikari Utsuri":
    "Metallic versions of the Utsuri and Showa group, such as Kin Ki Utsuri, combining wrapping black with Ogon lustre.",
  Tancho:
    "Koi whose only red is a single round spot on the head. Judged as its own show class even though the fish are usually Kohaku (or Sanke/Showa) genetically.",
};

export const VARIETY_INFO: Record<string, VarietyInfo> = {
  chagoi: {
    nameMeaning: '"tea carp", from ocha (tea), for its brown tea colouring',
    family: "Kawarimono",
    pattern:
      "A single-coloured, non-metallic koi in solid brown, bronze, copper or olive green, ideally with a subtle net effect (fukurin) from the pale scale edges. No pattern markings at all.",
    origin:
      "An old plain-coloured koi descended from the wild black Magoi, fixed by early Niigata selection of brown offspring in food-carp lines rather than any single documented cross.",
    notes:
      "Famous as the friendliest and tamest of all koi: a fast-growing gentle giant that hand-feeds readily and teaches the rest of the pond to do the same.",
    sources: [
      "https://www.pondtrademag.com/friendly-chagoi-bring-charm-to-the-koi-pond/",
      "https://hanoverkoifarms.com/about-koi/guide-koi-breeds-chagoi/",
    ],
  },
  bekko: {
    nameMeaning: '"tortoise shell", after its spotted two-tone look',
    family: "Bekko",
    pattern:
      "A solid non-metallic base of white (Shiro Bekko), red (Aka Bekko) or yellow (Ki Bekko) with black sumi spots stepping along the back. The head is ideally clear of black.",
    origin:
      "Emerged alongside Taisho Sanke in the early 20th century; it is essentially a Sanke without the second colour, and Bekko still turn up routinely in Sanke spawnings.",
    notes:
      "Often confused with Shiro Utsuri. The field mark: a Shiro Bekko is a white fish with black spots, a Shiro Utsuri is a black fish with wrapping white markings.",
    sources: [
      "https://pondinformer.com/bekko-koi-guide/",
      "https://www.kloubeckoi.com/blogshiro-bekko-vs-shiro-utsuri-5-key-differences-between-these-koi-varieties/",
    ],
  },
  benigoi: {
    nameMeaning: '"crimson carp"; beni is deep red',
    family: "Kawarimono",
    pattern:
      "A solid, non-metallic deep red koi from nose to tail with no other markings. Fins may be red, or white-tipped (that form has its own name, Aka Hajiro).",
    origin:
      "Descends from the early solid-red colour mutations of the Magoi line that predate the patterned varieties, fixed by selection rather than a documented cross.",
    notes:
      "A robust, fast-growing variety that reaches a large size. Effectively the red counterpart of the yellow Kigoi.",
    sources: [
      "https://www.pondexperts.ca/fish-ponds/japanese-koi-terminology/",
      "https://nextdaykoi.com/koi-fish-facts/kawarimono-different-class/",
    ],
  },
  karasugoi: {
    nameMeaning: '"crow carp"; karasu is the crow, for its crow-black colour',
    family: "Kawarimono",
    pattern:
      "A solid matte-black koi, sometimes with a bluish cast. Its distinguishing feature hides underneath: the belly is typically white or orange-red.",
    origin:
      "An old black variety of the Asagi Magoi line, fixed by selection in Niigata. It is parent stock for later black-and-white varieties, including (through Shusui crosses) the Kumonryu line.",
    notes:
      "Pond folklore holds black koi to be protective guardian fish. At shows it groups with the other Kawarimono.",
    sources: [
      "https://www.champkoi.com/pages/koi-variety/karasugoi",
      "https://www.pondexperts.ca/fish-ponds/japanese-koi-terminology/",
    ],
  },
  hi_utsuri: {
    nameMeaning: '"red reflection"; hi is fire-red, utsuri from utsurimono, the reflecting ones',
    family: "Utsurimono",
    pattern:
      "A non-metallic jet-black koi with red-orange markings that wrap around the body in an alternating, checkerboard-like balance. Pectoral fins carry black striping or motoguro at the base.",
    origin:
      "The Utsuri line traces to the 1890s, when Magoi and Ki Bekko crosses produced black koi with yellow markings. Hi Utsuri is the red development of that line, and modern examples commonly come out of Showa spawnings as a Showa without white.",
    notes:
      "Young Hi Utsuri often show orange that deepens to red with age; clean black and a tidy wrap decide quality.",
    sources: [
      "https://www.completekoi.com/blogs/news/utsurimono-koi-varieties-everything-you-need-to-know",
      "https://koisale.com/pages/koi-varieties/utsuri.html",
    ],
  },
  ki_utsuri: {
    nameMeaning: '"yellow reflection"; ki is yellow',
    family: "Utsurimono",
    pattern:
      "A non-metallic black-based koi with yellow markings alternating with the black along the body.",
    origin:
      "The oldest Utsuri: first produced in the 1890s from Magoi and Ki Bekko breeding, originally named Kuro Ki Han and renamed Ki Utsuri by Eizaburo Hoshino in the 1920s.",
    notes:
      "Although it came first, it is now the rarest of the three Utsuri; many breeders moved to Hi and Shiro Utsuri because good yellow examples are hard to produce.",
    sources: [
      "https://www.aquariumdomain.com/SpeciesProfiles/Koi/KiUtsuriKoi.shtml",
      "https://www.completekoi.com/blogs/news/utsurimono-koi-varieties-everything-you-need-to-know",
    ],
  },
  hariwake: {
    nameMeaning:
      'usually explained as "divided" colouring, for the clean split between its two metallic colours',
    family: "Hikarimoyo",
    pattern:
      "A two-coloured, fully metallic koi: a shimmering platinum-white base with metallic yellow-gold (Yamabuki Hariwake) or orange (Orenji Hariwake) markings, in scaled and doitsu forms.",
    origin:
      "Developed once the metallic Ogon lines were established, by crossing Platinum Ogon stock with yellow and orange varieties. One of the foundation varieties of the Hikarimoyo class.",
    notes:
      "The high-lustre platinum base makes it one of the most visible koi in any pond, and a hardy, popular choice.",
    sources: [
      "https://nextdaykoi.com/koi-fish-facts/hikarimoyo-koi-fish/",
      "https://www.aquascapeinc.com/water-gardening/pond-fish/common-doesnt-mean-boring-hariwake-koi",
    ],
  },
  shiro_utsuri: {
    nameMeaning: '"white reflection"; shiro is white',
    family: "Utsurimono",
    pattern:
      "A non-metallic black-based koi with wrapping white markings. The black rises from below the lateral line, ideally divides the head, and shows as motoguro at the pectoral fin bases.",
    origin:
      "Credited to Kazuo Minemura, who established the variety in 1925 in Yamakoshi, Niigata, from Magoi lineage. Modern Shiro Utsuri are closely tied to Showa bloodlines.",
    notes:
      "Judged on the balance of ink black and snow white. The black keeps developing for years, so a top fish often finishes its pattern late in life.",
    sources: [
      "https://www.kodamakoifarm.com/variety/shiro-utsuri/",
      "https://koiofindonesia.com/2021/10/10/black-and-white-shiro-utsuri-part-1/",
    ],
  },
  ochiba: {
    nameMeaning:
      'short for Ochiba Shigure, roughly "fallen leaves on water"',
    family: "Kawarimono",
    pattern:
      "A two-coloured non-metallic koi: the grey-silver of Soragoi as the base with the brown-bronze of Chagoi patterned over it, like autumn leaves drifting on grey water.",
    origin:
      "Produced by crossing Chagoi with Soragoi; it emerged as a deliberately bred, distinct variety in the mid-1990s.",
    notes:
      "Inherits the Chagoi and Soragoi temperament: very tame, quick to hand-feed, fast growing, and often the first fish to greet its keeper.",
    sources: [
      "https://nextdaykoi.com/koi-fish/koi/kawarimono/ochiba-shigure/",
      "https://www.kloubeckoi.com/blog/Ochiba-Koi-The-Fallen-Leaf-Variety",
    ],
  },
  kumonryu: {
    nameMeaning:
      '"nine-crested dragon", after a tattooed dragon hero of legend; the shifting pattern evokes a dragon moving through clouds',
    family: "Kawarimono",
    pattern:
      "A doitsu (scaleless) koi with billowing black over a white base in cloud-like shapes. There is no fixed pattern standard, because the black migrates.",
    origin:
      "Emerged in Japan in the early 1980s from the Shusui and Karasugoi doitsu lineage; it gained formal recognition at the All Japan show in 1994.",
    notes:
      "Renowned for redrawing its pattern across seasons and years with water temperature and environment. The same fish can be nearly white one year and heavily black the next.",
    sources: [
      "https://jnpa.info/en/nishikigoi/varieties/type/kumonryu/",
      "https://nextdaykoi.com/koi-fish/koi/kawarimono/kumonryu/",
    ],
  },
  beni_kumonryu: {
    nameMeaning: '"red nine-crested dragon"; beni (red) added to Kumonryu',
    family: "Kawarimono",
    pattern:
      "A doitsu koi carrying stable red markings plus shifting black on a white base. Effectively a Kumonryu with a third colour.",
    origin:
      "A recent offshoot of Kumonryu, produced by crossing Kumonryu with Doitsu Kohaku to add the red.",
    notes:
      "The red is stable while the black changes through life: typically more black in cold water, more white and red in the warm months.",
    sources: [
      "https://www.kodamakoifarm.com/variety/beni-kumonryu/",
      "https://www.kloubeckoi.com/beni-kumonryu-koi-for-sale",
    ],
  },
  kujaku: {
    nameMeaning:
      '"peacock" (full name Kujaku Ogon); the netted shimmer suggests peacock plumage',
    family: "Hikarimoyo",
    pattern:
      "A metallic platinum-white koi with red, orange or gold pattern and dark pine-needle (matsuba) reticulation in every scale across the back, all under a metallic lustre.",
    origin:
      "Developed around 1960 by Toshio Hirasawa in Ojiya, Niigata. Accounts of the exact cross differ (a Shusui female with Kin Matsuba and Hariwake males is most often cited), but all agree it fuses Asagi-line netting with Ogon metallics.",
    notes:
      "A frequent show winner; quality hinges on crisp, even reticulation over unbroken lustre.",
    sources: [
      "https://jnpa.info/en/nishikigoi/varieties/type/kujaku/",
      "https://www.champkoi.com/pages/koi-variety/kujaku",
    ],
  },
  asagi_koi: {
    nameMeaning: '"light indigo blue", for its pale blue-grey colour',
    family: "Asagi & Shusui",
    pattern:
      "A fully scaled blue-grey koi whose scales carry pale edges, forming a neat net over the back, with rust-red on the cheeks, on the flanks below the lateral line, and at the fin bases.",
    origin:
      "One of the oldest varieties, descending directly from the blue-black Asagi Magoi mutation of wild carp selected in Niigata roughly two centuries ago. Foundation stock for Shusui, Koromo, Goshiki and Kujaku.",
    notes:
      "The red tends to climb higher up the flanks with age, so young fish with modest red are often preferred. A clear, unblemished head is prized.",
    sources: [
      "https://koisale.com/koi-history/",
      "https://mpks.org/koi-history-by-ray-jordan/",
    ],
  },
  shusui: {
    nameMeaning: '"autumn water", evoking blue water under autumn skies',
    family: "Asagi & Shusui",
    pattern:
      "The doitsu counterpart of Asagi: a sky-blue back with a single line of large mirror scales along each side of the dorsal ridge, and red along the flanks below the lateral line.",
    origin:
      "Created in 1910 by Yoshigoro Akiyama by crossing an Asagi with a German mirror carp, making it the first doitsu koi variety.",
    notes:
      "With Asagi, one of only two truly blue koi. Quality rests on an even, unstained blue back and neat, uninterrupted dorsal scale rows.",
    sources: [
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/shusui/",
      "https://pondinformer.com/shusui-koi-guide/",
    ],
  },
  koromo: {
    nameMeaning: '"robed"; the dark scale edging seems to robe the red pattern',
    family: "Koromo",
    pattern:
      "Essentially a Kohaku whose red scales carry blue or black edging, giving a netted overlay. Sub-types are Ai Goromo (blue edging), Budo Goromo (grape-purple clusters) and Sumi Goromo (black).",
    origin:
      "First arose in the 1950s from crossing a Kohaku with an Asagi; the first recorded example came from a male Kohaku with a female Narumi Asagi.",
    notes:
      "The robing typically darkens and strengthens with age, so a young fish with light edging often improves with time.",
    sources: [
      "https://koisale.com/pages/koi-varieties/goromo.html",
      "https://krazykoimeds.com/pages/koromo",
    ],
  },
  platinum: {
    nameMeaning:
      'purachina, the Japanese rendering of "platinum"; Ogon means gold and names the metallic class',
    family: "Hikarimuji",
    pattern:
      "A one-colour metallic koi in gleaming platinum white from head to tail, the lustre carrying into the fins. An unblemished bright head is essential.",
    origin:
      "Bred by the family of Sawata Aoki, founders of the Ogon lines, by crossing a Kigoi with a grey metallic Nezu Ogon. It first appeared at shows in 1963.",
    notes:
      "Its mirror-bright body stays visible even in murky water. Like the other Ogon it is hardy, fast growing and beginner friendly.",
    sources: [
      "https://koisale.com/pages/koi-varieties/platinum-ogon.html",
      "https://www.kodamakoifarm.com/variety/platinum/",
    ],
  },
  kin_ki_utsuri: {
    nameMeaning: '"gold yellow reflection"; kin (metallic gold) added to Ki Utsuri',
    family: "Hikari Utsuri",
    pattern:
      "The metallic version of Ki Utsuri: a black-based koi with golden-yellow wrapping markings, the whole fish overlaid with a metallic sheen so the black shows through the gold as a burnished pattern.",
    origin:
      "Created by bringing metallic Ogon blood into the Utsuri lines, whose lineage traces to the 1890s Magoi and Ki Bekko crosses.",
    notes:
      "At shows it is judged in the Hikari Utsuri class, with the other metallic Utsuri and Showa, rather than with the non-metallic Utsurimono.",
    sources: [
      "https://www.aquariumdomain.com/SpeciesProfiles/Koi/KinKiUtsuriKoi.shtml",
      "https://www.kodamakoifarm.com/koi-varieties/",
    ],
  },
  tancho: {
    nameMeaning:
      '"red crown", after the red-crowned crane, which carries a single red patch on its head',
    family: "Tancho",
    pattern:
      "A single round red marking on the head as the only red on the fish: classically a pure white koi with one circular crown spot (Tancho Kohaku). Tancho Sanke and Tancho Showa add their variety's black.",
    origin:
      "Not a bred lineage: a Tancho is genetically a Kohaku (or Sanke/Showa) whose red happens to land only on the head. The spot cannot be reliably produced by pairing Tancho parents, which keeps good ones scarce.",
    notes:
      "Judged as its own show class despite its Gosanke genetics. Beloved in Japan partly because a round red sun on white evokes the national flag.",
    sources: [
      "https://pondinformer.com/tancho-koi-guide/",
      "https://nextdaykoi.com/koi-fish-facts/tancho-kohaku-koi/",
    ],
  },
  showa: {
    nameMeaning:
      'short for Showa Sanshoku, "three colours of the Showa era", the era in which it appeared',
    family: "Gosanke",
    pattern:
      "A black-based koi with red and white markings. The black wraps the body rising from below the lateral line, appears on the head, and shows as motoguro at the pectoral fin bases: the key distinctions from Sanke.",
    origin:
      "First produced in 1927 by Jukichi Hoshino by crossing a Kohaku with a Ki Utsuri. The modern type was perfected in the 1960s when Tomiji Kobayashi bred in intensely red Kohaku blood.",
    notes:
      "Modern Kindai Showa carry far more white than the traditional heavy-black type. The black keeps developing for years, so a Showa's final pattern is a long game.",
    sources: [
      "https://pondinformer.com/showa-koi-guide/",
      "https://en.wikipedia.org/wiki/Showa_(fish)",
    ],
  },
  sanke: {
    nameMeaning:
      'short for Taisho Sanshoku, "three colours of the Taisho era", when the variety was fixed',
    family: "Gosanke",
    pattern:
      "A white-based koi with a Kohaku-style red pattern plus small black accents confined above the lateral line. Ideally no black on the head, and clean white or finely striped fins.",
    origin:
      "First recorded around 1915 in Niigata during the Taisho era; Eizaburo Hoshino is credited with refining the modern type around 1917 from Kohaku lines carrying stray black.",
    notes:
      "The easy field mark versus Showa: Sanke black sits in small patches above the lateral line and stays off the head, while Showa black wraps the body and crosses the face.",
    sources: [
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://www.pondexperts.ca/fish-ponds/koi-varieties-guide/taisho-sanke-koi/",
    ],
  },
  kohaku: {
    nameMeaning:
      '"red and white", Japan\'s celebratory colour pairing',
    family: "Gosanke",
    pattern:
      "A snow-white koi with a crisp crimson pattern in balanced steps along the back. Sharp pattern edges, a white nose and tail tip, and unstained white are the ideals.",
    origin:
      "The oldest patterned variety: red-on-white mutations of the black Magoi appeared among Niigata's rice-farming villages in the early-to-mid 1800s and were fixed by the 1880s into the bloodlines every modern Kohaku descends from.",
    notes:
      'The most prestigious variety and the perennial Grand Champion class. The hobby\'s proverb: koi keeping "begins and ends with Kohaku".',
    sources: [
      "https://koisale.com/koi-history/",
      "https://www.kodamakoifarm.com/gosanke-koi-fish/",
    ],
  },
  gold_ogon: {
    nameMeaning:
      'Ogon means "gold"; Yamabuki is the kerria rose, a bright yellow flower',
    family: "Hikarimuji",
    pattern:
      "A one-colour metallic koi in solid lemon-gold from nose to tail, lustre carried into the fins, with a clear unblemished head. Even colour and strong sheen define quality.",
    origin:
      "Sawata Aoki presented the first stable metallic gold Ogon in 1946 after some 25 years of line-breeding from a wild carp with a metallic shine. The lemon-gold Yamabuki form followed in the mid-1950s by crossing Ogon lines with the yellow Kigoi.",
    notes:
      "The original metallic koi: its debut founded every later Hikari class. Ogon are hardy, fast growing and notably tame.",
    sources: [
      "https://www.kloubeckoi.com/yamabuki-koi-for-sale/",
      "https://nextdaykoi.com/koi-fish-facts/ogon-koi-fish/",
    ],
  },
};

export function getVarietyInfo(slug: string): VarietyInfo | undefined {
  return VARIETY_INFO[slug];
}
