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
  Goshiki:
    "Five-colour koi: a Kohaku red pattern laid over Asagi net-scaling. Long shown with Koromo or in Kawarimono, now a class of its own in the ZNA scheme.",
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
    care: [
      "Among the fastest-growing and largest koi, commonly reaching 70 to 90 cm and dominating jumbo classes. Sources suggest around 19,000 litres as a floor, and 30,000 to 38,000 for a fish to reach its full size.",
      "A very strong feeding response drives that growth but also loads the filter, so filtration and feeding discipline matter more here than with a slower variety.",
      "The friendliest koi in the pond: quick to hand-feed, and its calm tends to settle nervous fish and bring shy ones up to feed. Hardy and forgiving of beginner mistakes.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/blogchagoi-koi-friendly-large-koi-variety-gentle-giants-of-the-pond/",
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
    care: [
      "A Shiro Bekko has a white ground, so heavy colour-enhancing food tints the white yellow. If you intend to show, keep colour-fed Kohaku in a separate pond from Bekko and Shiro Utsuri; in an ordinary garden pond, mixing is fine.",
      "Aka and Ki Bekko carry no white, so that restriction does not apply to them.",
    ],
    careSources: [
      "https://www.kodamakoigarden.com/faqs/important-keep-bekko-separately-kohaku/",
      "https://dainichi.com/koi-color-food/",
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
    care: [
      "A strong-bodied, fast-growing variety often compared to Chagoi, and can pass 75 cm in a properly sized pond, so plan the volume for the adult fish.",
      "Eager to hand-feed and considered resilient, which makes it a reasonable variety for a beginner.",
      "With no white ground, the usual trade-off around colour-enhancing food does not apply: carotenoid-rich feed is the normal approach for solid red koi.",
    ],
    careSources: [
      "https://fitzfishponds.com/shop-all-fish/benigoi/",
      "https://dainichi.com/koi-color-food/",
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
    care: [],
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
    care: [
      "Too much colour-enhancing food causes off-colour spotting in the red rather than simply deepening it.",
      "The black fills in slowly. A young Hi Utsuri often shows dull, shadowy grey and a flat orange that only deepens toward lacquer black and true red over several years, so judging a young fish on its current colour is misleading.",
    ],
    careSources: [
      "https://pondinformer.com/utsurimono-koi-guide/",
      "https://www.kloubeckoi.com/utsuri-koi/",
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
    care: [
      "Yellow is the one ground that heavy carotenoid feeding tends to spoil rather than improve: keepers report the yellow pushed toward orange, or orange speckling appearing in it, with the true colour returning within a couple of months once colour food stops. This is widely reported keeper experience rather than a formal study.",
      "As with the other Utsuri, the black takes years to fill in, so a young fish's grey, shadowy markings are normal.",
    ],
    careSources: [
      "https://dainichi.com/koi-color-food/",
      "https://pondinformer.com/utsurimono-koi-guide/",
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
    care: [
      "Lustre is what the metallic class is judged on: it should run evenly from nose to tail and through the fins. That sheen also keeps the fish visible in water that is less than perfectly clear.",
      "The platinum-white ground is one of those documented to blow out with pink, yellow or beige tones under heavy colour-enhancing food, so heavy pigment feeds are usually avoided.",
    ],
    careSources: [
      "https://www.pondtrademag.com/language-koi-the-shiny-hikari-muji-varieties-2/",
      "https://dainichi.com/koi-color-food/",
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
    care: [
      "The clearest case against colour-enhancing food. A black-and-white koi has no chromatophores in the white to deposit carotenoid into, so the white blows out with pink, yellow or beige, usually showing first on the face and cheeks, until the pigment fades again.",
      "If you show, keep colour-fed Kohaku in a separate pond from Shiro Utsuri and Bekko. For a garden pond, mixing varieties is fine.",
      "Faint black on a yearling can become bold glossy sumi by two years, so weak black on a young fish is not a fault to correct.",
    ],
    careSources: [
      "https://dainichi.com/koi-color-food/",
      "https://www.kodamakoigarden.com/faqs/important-keep-bekko-separately-kohaku/",
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
    care: [
      "Bred from Chagoi and Soragoi, so it inherits both the docile, hand-feeding temperament and the growth rate: roughly 15 cm at one year, 38 cm at two, and about 66 cm by five.",
      "Give it at least a metre of depth and around 19,000 litres to grow out properly.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/blog/Ochiba-Koi-The-Fallen-Leaf-Variety",
      "https://hanoverkoifarms.com/about-koi/guide-koi-breeds-ochibashigure-ochiba/",
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
    care: [
      "It genuinely changes pattern with water temperature: mostly black through the cold months, white returning in spring and summer, and blue-grey where an area is mid-change. This is normal for the variety, not illness, and it means the fish will not look the same all year.",
      "Being scaleless, it is more prone to sunburn, parasites and skin injury than a scaled koi, so it wants a shaded area of pond and gentle handling with a soft net.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/blog/kumonryu-koi-dragon-scale-pattern-mesmerizes-collectors-worldwide/",
      "https://pondinformer.com/doitsu-koi-guide/",
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
    care: [
      "Shifts with temperature like Kumonryu but across three colours: close to entirely black in cold water, with white and red re-emerging as the pond warms. Expect it to look different season to season.",
      "Scaleless, so the usual precautions apply: more sensitive to sunburn, parasites and skin damage, wants shade and careful handling.",
      "Because its appearance tracks temperature, a deeper pond with a stable temperature gives a more consistent pattern.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/beni-kumonryu-koi-for-sale",
      "https://pondinformer.com/doitsu-koi-guide/",
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
    care: [
      "Metallic on a platinum base, and even lustre over the whole body is the defining quality. The sheen makes it easy to pick out in water that is not crystal clear.",
      "That platinum ground puts it in the group where heavy colour-enhancing food risks casting yellow or beige into the white, even though the same food would strengthen the pattern. A genuine trade-off rather than a rule.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/blog/kujaku-koi-a-guide-to-this-stunning-koi-variety/",
      "https://dainichi.com/koi-color-food/",
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
    care: [
      "Descends closely from wild Magoi, and is described as having a tough constitution and robust immune system, part of why it was used as foundation stock.",
      "The red spreads upward from the belly with age, so a young fish with red only low on the flanks will normally show much more as an adult. That is why low red is judged favourably in young Asagi.",
      "Harder water with higher carbonate hardness is commonly reported to give darker, inkier blue scales while very soft water lifts the red. Treat this as hobby consensus rather than settled science.",
    ],
    careSources: [
      "https://pondinformer.com/asagi-koi-guide/",
      "https://www.koi-bito.com/forum/forum/koi-hobbyists/main-forum/8470-sumi-development-vs-general-hardness-myth",
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
    care: [
      "The scaleless form of Asagi, and explicitly more prone to parasites and sunburn than scaled koi. It wants a shaded area of pond and soft-net handling: a single lost scale on a doitsu fish is a large open wound.",
      "The red rises up the body with age and, unlike Asagi, it is desirable for it to reach above the lateral line, so a young Shusui with modest red is expected to develop.",
      "Hard water with high alkalinity is reported to bring out random black flecking on the blue skin, which is generally not wanted here.",
    ],
    careSources: [
      "https://pondinformer.com/shusui-koi-guide/",
      "https://pondinformer.com/doitsu-koi-guide/",
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
    care: [
      "The robing is slow to arrive: faint on a young fish, taking years to come out fully, and it keeps darkening with age. When buying, pick a young fish with light reticulation, because heavy edging early tends to go too dark later.",
      "It sits on a Kohaku-style white ground, so the same caution about colour-enhancing food applies.",
    ],
    careSources: [
      "https://pondinformer.com/goromo-koi-guide/",
      "http://www.nkc.org.uk/koromo.html",
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
    care: [
      "Hardy, disease-resistant and repeatedly recommended for beginners. It tames quickly, and the metallic sheen keeps it visible even in cloudy water, which helps a new keeper actually see their fish.",
      "Colour-enhancing food should be avoided: there is nowhere useful for the pigment to go, so the white simply takes on a pink, yellow or beige cast.",
      "As a solid white fish it lacks protective melanin and sits in the group most at risk from strong sun, so real depth and roughly half to two thirds shade are worth having.",
      "Hearty appetite and can reach 60 to 90 cm, so size the pond for the adult fish.",
    ],
    careSources: [
      "https://www.kodamakoifarm.com/variety/ogon/",
      "https://dainichi.com/koi-color-food/",
      "https://pondinformer.com/koi-sunburn-treatment/",
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
    care: [
      "In the metallic Utsuri group, lustre and dark pigment tend to cancel each other out, so a strongly metallic fish usually shows softer, greyer black. One with both brilliant shine and firm sumi is genuinely rare: an expectation to set rather than a fault to fix.",
      "Its yellow ground is the colour most likely to be spoiled rather than improved by heavy carotenoid feeding, with keepers reporting a shift toward orange that recovers once colour food is withdrawn.",
    ],
    careSources: [
      "https://koigarden.com/koi-varieties-hikari-utsuri/",
      "https://dainichi.com/koi-color-food/",
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
    care: [
      "Almost entirely white ground with a single red crown, so colour-enhancing food is a poor trade: it does very little for one spot while tinting the whole body yellow.",
      "Fading or partial loss of the crown is worth treating as a health signal rather than cosmetics, since it is described as a sign of stress or declining condition.",
    ],
    careSources: [
      "https://pondinformer.com/tancho-koi-guide/",
      "https://www.kloubeckoi.com/blog/beginners-guide-to-tancho-koi-care/",
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
    care: [
      "The black is a long-term project. The fish starts life largely black-skinned, and juveniles show dull grey or shadowy markings that only harden into glossy sumi over several years, often not before age three. Worrying about a young Showa's black is premature.",
      "It carries a white ground, so a diet high in spirulina and carotene will tint the white yellow. Colour enhancers matter mainly for show fish.",
      "Cooler water is commonly reported to give darker red and warmer water a more orange cast, though the sources reporting it note it lacks firm scientific backing.",
    ],
    careSources: [
      "https://pondinformer.com/showa-koi-guide/",
      "https://dainichi.com/koi-color-food/",
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
    care: [
      "The black arrives late: a young Sanke can look almost like a Kohaku, with sumi taking several years to come through. Patience is part of keeping the variety.",
      "Over-feeding colour enhancers does three unwanted things at once: yellows the white, spots the red, and can leave the black looking blue.",
      "Like other white-ground koi it visibly reports your water quality, which makes it a useful early warning that parameters have drifted.",
    ],
    careSources: [
      "https://pondinformer.com/sanke-koi-guide/",
      "https://dainichi.com/koi-color-food/",
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
    care: [
      "The centre of the colour-food trade-off: spirulina and krill-based enhancers strengthen the red, but too much yellows the white and spots the red. Heavy pigment foods should be used sparingly, or not at all, on any koi with significant white.",
      "If you keep show-quality white-ground koi, house colour-fed Kohaku separately from Bekko and Shiro Utsuri. For a mixed garden pond there is no need to separate anything.",
      "Water that is very hard or high in pH is commonly reported to bring out small black freckles on the white, while softer water lifts the red. Long-standing hobby consensus rather than proven science.",
      "A Kohaku shows water problems visibly and early, which makes it a useful indicator fish.",
    ],
    careSources: [
      "https://pondinformer.com/kohaku-koi-guide/",
      "https://dainichi.com/koi-color-food/",
      "https://www.hikari.info/koi/k_15.html",
    ],
  },
  gold_ogon: {
    nameMeaning:
      'Ogon means "gold"; the name now covers the whole group of single-coloured metallic koi',
    family: "Hikarimuji",
    pattern:
      "A one-colour metallic koi in solid gold from nose to tail, lustre carried into the fins, with a clear unblemished head. Even colour and strong sheen define quality.",
    origin:
      "Sawata Aoki presented the first stable metallic gold Ogon in 1946 after some 25 years of line-breeding from a wild carp with a metallic shine. Ray Jordan describes those first Ogon as dark, gold-scaled fish; the brighter Yamabuki form, the Yellow Ogon, was refined from them later.",
    notes:
      "The original metallic koi: its debut founded every later Hikari class. Ogon are hardy, fast growing and notably tame.",
    sources: [
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://en.wikipedia.org/wiki/Koi",
    ],
    care: [
      "Among the hardiest and most disease-resistant koi and widely recommended as a first fish. It tames quickly and hand-feeds readily.",
      "Hearty appetite, grows fast, and can reach 60 to 90 cm, so size the pond for the adult fish.",
      "The metallic sheen keeps it visible even in water of less-than-ideal clarity, a practical advantage in a planted or algae-tinted pond.",
      "Keepers of solid-yellow koi commonly report heavy carotenoid food pushing the yellow toward orange rather than improving it, so a plain staple diet is the usual choice.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/ogon-koi-for-sale/",
      "https://www.kodamakoifarm.com/variety/ogon/",
    ],
  },
  aka_bekko: {
    nameMeaning: '"red tortoise shell"; aka is red, Bekko the spotted shell pattern',
    family: "Bekko",
    pattern:
      "A solid non-metallic red ground with black sumi spots stepping along the back and kept off the head. The pectoral fins and tail are often partly or wholly white, and the red should run even from nose to tail.",
    origin:
      "A by-product of Sanke breeding rather than a planned cross: Bekko and Sanke come from the same stock, which Kodama describes as brothers and sisters. Pond Informer places the first Bekko in the mid-1800s and ranks the red form as the second rarest of the three colours.",
    notes:
      "The field mark against Hi Utsuri: an Aka Bekko is a red fish with black spots, a Hi Utsuri is a black fish with wrapping red markings.",
    sources: [
      "https://pondinformer.com/bekko-koi-guide/",
      "https://www.kodamakoifarm.com/variety/bekko/",
    ],
    care: [
      "With no white ground there is no penalty for colour-enhancing food: carotenoid-rich feed deepens the red, the opposite of the advice for Shiro Bekko.",
      "Pond Informer reports cooler water giving a darker red and warmer water a brighter one across the usual 10 to 26 °C range, and warns that spirulina-heavy diets can leave orange spotting on the red.",
      "The coloured-ground Bekko show a water-quality slip in their colour quickly, so they reward stable parameters.",
    ],
    careSources: [
      "https://pondinformer.com/bekko-koi-guide/",
      "https://dainichi.com/koi-color-food/",
    ],
  },
  ki_bekko: {
    nameMeaning: '"yellow tortoise shell"; ki is yellow',
    family: "Bekko",
    pattern:
      "A lemon-yellow ground carrying black sumi spots along the back with the head left clear, the fins often partly white. Even yellow under crisp, well-placed sumi is what judges look for.",
    origin:
      "Ray Jordan's history lists Ki Bekko as a spontaneous appearance from Magoi stock in the mid-1800s, well before the Sanke line behind the white and red Bekko. Around 1921 Hoshino crossed it back to Magoi to fix Ki Utsuri.",
    notes:
      "The rarest of the three Bekko colours and historically the weightiest: through Ki Utsuri it stands behind the whole black-based Utsuri and Showa branch.",
    sources: [
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://pondinformer.com/bekko-koi-guide/",
      "https://giobelkoicenter.com/ki-utsuri-koi/",
    ],
    care: [
      "Pond Informer treats the yellow ground like the red one: carotenoid-rich feed intensifies it, unlike on Shiro Bekko where it stains the white. Keepers of solid-yellow koi do report heavy colour food drifting the yellow toward orange, so add it gradually.",
      "Cooler water is reported to darken the yellow and warmer water to brighten it, and the colour shows water-quality problems early.",
    ],
    careSources: [
      "https://pondinformer.com/bekko-koi-guide/",
      "https://www.kloubeckoi.com/ogon-koi-for-sale/",
    ],
  },
  orenji_ogon: {
    nameMeaning:
      'orenji is the Japanese rendering of "orange"; Ogon means gold and names the metallic class',
    family: "Hikarimuji",
    pattern:
      "A one-colour metallic koi in deep orange from nose to tail, the lustre carried into the fins, with a clean unmarked head. Uniform colour is everything, and any scar shows against the sheen.",
    origin:
      "One of the colour forms that followed Sawata Aoki's original Ogon, recognised as a variety in 1947 after some 25 years of line-breeding. The ZNA lists orange-gold beside yellow-gold and platinum as the standard Hikarimuji colours; no founding cross or date for the orange form is well documented.",
    notes:
      "Often described as a goldfish grown large: it can pass 90 cm and is one of the most visible fish in any pond.",
    sources: [
      "https://www.koi-fish.com/koi-classification/orenji-ogon.html",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-mujimono/",
    ],
    care: [
      "Hardy, disease resistant and quick to tame: Ogon hand-feed readily and are routinely recommended as a first koi.",
      "A big appetite and fast growth, typically reaching 60 to 90 cm, so size the pond for the adult fish; Kloubec suggests around 3,800 litres as a floor.",
      "The metallic orange stays visible in green or cloudy water where darker koi disappear.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/ogon-koi-for-sale/",
      "https://www.kodamakoifarm.com/variety/ogon/",
    ],
  },
  soragoi: {
    nameMeaning: '"sky carp", from sora (sky), for its blue-grey colour',
    family: "Kawarimono",
    pattern:
      "A single-coloured non-metallic koi in even blue-grey to silver-grey with no pattern at all. Pale scale edges give a subtle fukurin net, and the head should be as clear and even as the body.",
    origin:
      "Its origins are not well documented; Champ Koi treats it as one of the older plain-coloured lines close to the wild carp. Its own place in history is as the grey parent crossed with Chagoi in the mid-1990s to create Ochiba Shigure.",
    notes:
      "A gentle giant in the Chagoi mould: usually first up to hand-feed, and a calming influence on shy pond-mates.",
    sources: [
      "https://www.champkoi.com/pages/koi-variety/soragoi",
      "https://www.kloubeckoi.com/soragoi-koi-for-sale/",
    ],
    care: [
      "Among the friendliest koi: quick to hand-feed and known for coaxing timid fish up to the surface.",
      "Grows fast and large, often past 75 cm, so plan pond volume for the adult fish.",
      "Hardy and undemanding; the grey is stable once set and only deepens or lightens slightly with age.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/soragoi-koi-for-sale/",
      "https://www.kloubeckoi.com/blog/Ochiba-Koi-The-Fallen-Leaf-Variety",
    ],
  },
  goshiki: {
    nameMeaning: '"five colours"; go is five, shiki colour',
    family: "Goshiki",
    pattern:
      "A Kohaku-style red pattern laid over a white ground that carries blue and black Asagi netting in every scale, giving white, red, black, blue and grey. Judges want a bright, clean red plate and even reticulation with no large black blotches.",
    origin:
      "Kodama dates the first Goshiki to 1918 from Asagi crossed with Kohaku; the ZNA and Kloubec name Taisho Sanke as the second parent instead, so the founding cross is uncertain. Early fish were dark and muddy, and the bright modern type is the product of later selection.",
    notes:
      "Long shown with Koromo or in Kawarimono, it is now a class of its own in the ZNA scheme. Goromo is its mirror image: shaded red on plain white, where Goshiki is solid red on a shaded body.",
    sources: [
      "https://www.kodamakoifarm.com/variety/goshiki/",
      "https://www.champkoi.com/pages/koi-variety/goshiki",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/goshiki/",
    ],
    care: [
      "Kodama recommends water close to a breeder's mud pond and a balanced diet with adequate carotene to keep the red plate strong.",
      "Kloubec advises shade from strong sun and particularly clean water to hold the netting crisp; a well-kept fish runs to 60 to 75 cm and 25 to 35 years.",
    ],
    careSources: [
      "https://www.kodamakoifarm.com/variety/goshiki/",
      "https://www.kloubeckoi.com/goshiki-koi-for-sale/",
    ],
  },
  kikusui: {
    nameMeaning: '"chrysanthemum water"; kiku is chrysanthemum, sui water',
    family: "Hikarimoyo",
    pattern:
      "A scaleless doitsu koi with a metallic platinum-white body carrying sharp orange or yellow markings, in effect a Doitsu Hariwake or a metallic Doitsu Kohaku. Judges look at the depth of the sheen, the edge and balance of the pattern, and the smooth unscaled skin.",
    origin:
      "Developed from Hariwake lines on doitsu stock, so it descends from both the 1947 Ogon and the 1904 German carp import. Accounts of when it appeared conflict: Champ Koi calls its origins undocumented, while Ray Jordan's history already lists a Doitsu Kikusui as a breeding parent in 1993.",
    notes:
      "That 1993 pairing with Kumonryu, by Kataoka and Aoki, gave Kikokuryu, the first koi with sumi on a metallic platinum body.",
    sources: [
      "https://www.champkoi.com/pages/koi-variety/kikusui",
      "https://www.kodamakoifarm.com/variety/kikusui/",
      "https://mpks.org/koi-history-by-ray-jordan/",
    ],
    care: [
      "Scaleless skin is more prone to sunburn, parasites and injury than a scaled koi, so give it shade and handle it with a soft net.",
      "Bright doitsu colour shows water-quality slips early, and a diet heavy in colour enhancers such as spirulina will tint the platinum white yellow.",
    ],
    careSources: [
      "https://pondinformer.com/doitsu-koi-guide/",
      "https://www.kloubeckoi.com/blog/doitsu-koi-guide",
    ],
  },
  kigoi: {
    nameMeaning: '"yellow carp", from ki (yellow); sometimes sold as the lemon koi',
    family: "Kawarimono",
    pattern:
      "A single-coloured non-metallic koi in even, buttery lemon yellow from nose to tail, with no pattern and no sheen. It comes scaled or doitsu, and the red-eyed Akame Kigoi is the form collectors prize.",
    origin:
      "One of the old plain-coloured lines with no documented founding date; Kloubec describes it as selected out of Benigoi stock. It is the yellow parent behind Platinum Ogon, from Yoshioka's 1963 cross with Nezu Ogon, and behind the Yamabuki (Yellow) Ogon.",
    notes:
      "As calm and friendly as Chagoi and easy to hand-feed. Uncommon on dealers' lists, since even yellow without a blemish is hard to raise.",
    sources: [
      "https://www.kloubeckoi.com/kigoi-koi-for-sale/",
      "https://www.koi-fish.com/koi-classification/kigoi.html",
      "https://www.pondtrademag.com/basic-beauty-the-striking-simplicity-of-hikari-muji/",
    ],
    care: [
      "Sociable and quick to tame, often the first to greet a keeper, and a fast grower that can pass 75 cm.",
      "Colour food is a judgement call on solid yellow: Kloubec suggests a balanced diet with colour enhancers plus shade from strong UV, while keepers of yellow Ogon report heavy carotenoids drifting the yellow toward orange.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/kigoi-koi-for-sale/",
      "https://www.kloubeckoi.com/ogon-koi-for-sale/",
    ],
  },
  nezu_ogon: {
    nameMeaning:
      'nezu, from nezumi ("mouse"), for its grey; Ogon means gold and names the metallic class',
    family: "Hikarimuji",
    pattern:
      "A single-coloured metallic koi in dull silver-grey, the colour meant to run even from head to tail. Many carry a darker patch on the crown that keepers call the helmet head; it should be soft-edged rather than a crisp spot.",
    origin:
      "An old type of Ogon from the early years of Aoki's metallic line, and the grey parent that Tadao Yoshioka crossed with an Akame Kigoi in 1963 to produce Platinum Ogon.",
    notes:
      "Rarely bred on purpose today, since Platinum took its place, yet through Platinum it stands behind Hariwake, Kikusui and much of the metallic patterned class.",
    sources: [
      "https://www.koi-fish.com/koi-classification/nezu-ogon.html",
      "https://www.pondtrademag.com/basic-beauty-the-striking-simplicity-of-hikari-muji/",
      "https://mpks.org/koi-history-by-ray-jordan/",
    ],
    care: [
      "Keeps the Ogon virtues: hardy, disease resistant, tame enough to hand-feed, and a fast grower that can reach 60 to 90 cm.",
      "Even colour is the whole point, so scars and dropped scales cost it more than they would a patterned fish.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/ogon-koi-for-sale/",
      "https://www.koi-fish.com/koi-classification/nezu-ogon.html",
    ],
  },
  kikokuryu: {
    nameMeaning: '"shining black dragon"; ki is radiance, koku black and ryu dragon',
    family: "Kawarimono",
    pattern:
      "A metallic doitsu koi: in effect a Kumonryu with shining platinum skin, its deep black running through the body and fins. Like the Kumonryu it has no fixed pattern standard, because the black moves.",
    origin:
      "Ray Jordan's history credits Kataoka and Aoki with the first Kikokuryu in 1993, from a Kumonryu and a Doitsu Kikusui. Kodama Koi Farm names Platinum as the second parent instead.",
    notes:
      "The black can spread, fade and even show hints of blue with lighting and water temperature. Although it is metallic, it is shown in the Kawarimono class rather than with the other metallic koi.",
    sources: [
      "https://www.kodamakoifarm.com/variety/kikokuryu/",
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-moyomono/",
      "https://www.champkoi.com/pages/koi-variety/kikokuryu",
    ],
    care: [
      "Scaleless skin is more prone to sunburn, parasites and injury than a scaled koi, so give it shade and handle it with a soft net.",
      "Bright doitsu colour shows water-quality slips early, and a diet heavy in colour enhancers such as spirulina will tint the platinum white yellow.",
    ],
    careSources: [
      "https://pondinformer.com/doitsu-koi-guide/",
      "https://www.kloubeckoi.com/blog/doitsu-koi-guide",
    ],
  },
  yamato_nishiki: {
    nameMeaning: '"Yamato brocade"; Yamato is an old name for Japan and nishiki a woven brocade',
    family: "Hikarimoyo",
    pattern:
      "The metallic version of Taisho Sanke: a lustrous white base carrying red (hi) and black (sumi) markings. Judges look at the depth of the sheen, the clarity of the red and black, and the balance of the pattern.",
    origin:
      "Ray Jordan's history credits Seikichi Hoshino with Yamato Nishiki in 1965, from Sanke and Ogon parents. Other accounts call its development poorly documented.",
    notes:
      "The ZNA shows it in the Hikari Moyomono class, beside the other patterned metallic koi such as Kujaku and Kikusui.",
    sources: [
      "https://www.champkoi.com/pages/koi-variety/yamato-nishiki",
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-moyomono/",
    ],
    care: [
      "Over-feeding colour enhancers does three unwanted things at once: yellows the white, spots the red, and can leave the black looking blue.",
      "Like other white-ground koi it visibly reports your water quality, which makes it a useful early warning that parameters have drifted.",
    ],
    careSources: [
      "https://pondinformer.com/sanke-koi-guide/",
      "https://dainichi.com/koi-color-food/",
    ],
  },
  magoi: {
    nameMeaning: '"true carp"; ma means true or genuine and goi is carp',
    family: "Kawarimono",
    pattern:
      "The wild-type common carp: one plain dark colour, black to dark bronze, with no pattern at all. Not a show variety in its own right; as a non-metallic koi that fits no other group it sits with Kawarimono.",
    origin:
      "Common carp have been raised for food for thousands of years. Farmers around Yamakoshi and Ojiya in Niigata kept black Magoi as food fish, and the coloured offspring they selected from them became the first nishikigoi.",
    notes:
      "Breeders kept returning to it as a parent: Ki Bekko crossed with Magoi produced the first Ki Utsuri, the start of the Utsuri family.",
    sources: [
      "https://www.kodamakoifarm.com/what-is-nishikigoi-history-meaning/",
      "https://mpks.org/koi-history-by-ray-jordan/",
    ],
    care: [],
  },
  kin_kikokuryu: {
    nameMeaning: '"gold shining black dragon"; kin (gold) added to Kikokuryu',
    family: "Kawarimono",
    pattern:
      "A metallic doitsu koi: a Kikokuryu that also carries gold to orange markings, with black reaching over the body, head and fins. Kodama treats that all-over black as the mark that separates it from a Kujaku, which it can otherwise resemble.",
    origin:
      "Created by the breeder Seiki Igarashi. Kodama dates it to 1998, from Kin Showa crossed with Kumonryu, while its longer profile of Igarashi says he uses Kikokuryu as the male parent. His Kin Kikokuryu caused a sensation when it was shown at the 2000 Nogyosai.",
    notes:
      "Igarashi's spawns throw several distinct types, from plain Kikokuryu to fish close to Kujaku, plus a form without the shine that he named Momiji. The JNPA lists Kin Kikokuryu among its Kawarigoi; the ZNA class pages name only Kikokuryu and Beni Kikokuryu in Kawarimono and do not mention the gold form.",
    sources: [
      "https://www.kodamakoifarm.com/variety/kin-kikokuryu/",
      "https://www.kodamakoifarm.com/sensational-variety-kin-kikokuryu/",
      "https://jnpa.info/en/nishikigoi/varieties/type/kawarigoi/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/kawarimono/",
      "https://en.wikipedia.org/wiki/Koi",
    ],
    care: [
      "Scaleless skin is more prone to sunburn and parasites than a scaled koi, so give it shaded areas of the pond.",
      "Kodama notes that its pattern can change often, even within a season, so the fish you buy will not necessarily look the same a year later.",
    ],
    careSources: [
      "https://pondinformer.com/doitsu-koi-guide/",
      "https://www.kloubeckoi.com/blog/doitsu-koi-guide",
      "https://www.kodamakoifarm.com/variety/kin-kikokuryu/",
    ],
  },
  gin_shiro: {
    nameMeaning:
      'short for Gin Shiro Utsuri; gin means silver and marks the metallic sheen added to Shiro Utsuri',
    family: "Hikari Utsuri",
    pattern:
      "The metallic version of Shiro Utsuri: a black koi with white markings, the whole body shining. The black wraps the body in the Utsuri way, and the white carries a platinum sheen.",
    origin:
      "No breeder or date is recorded. The JNPA describes the Hikari Utsuri as bred from an Utsuri-pattern koi such as Shiro Utsuri and a single-coloured metallic koi, and Ray Jordan's history traces every metallic type back to Sawata Aoki's Ogon.",
    notes:
      "Judged in the Hikari Utsuri class with Kin Showa and Kin Ki Utsuri. Sheen is weighed first, and since strong lustre and strong black rarely appear on the same fish, one with both is prized.",
    sources: [
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-utsurimono/",
      "https://jnpa.info/en/nishikigoi/varieties/type/hikari-utsuri/",
      "https://www.pondtrademag.com/language-of-koi-hikari-utsuri/",
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://www.pondexperts.ca/fish-ponds/japanese-koi-terminology/",
    ],
    care: [
      "As with Shiro Utsuri, colour-enhancing food does it no good: a black-and-white koi has no cells to take up the extra pigment, so the white turns pink, yellow or beige until it fades.",
      "In the metallic Utsuri, lustre and black tend to cancel each other out, so a very shiny fish usually has softer black. That is an expectation to set, not a fault to fix.",
    ],
    careSources: [
      "https://dainichi.com/koi-color-food/",
      "https://koigarden.com/koi-varieties-hikari-utsuri/",
    ],
  },
  kin_showa: {
    nameMeaning: '"gold Showa"; kin (gold) marks the metallic sheen added to Showa',
    family: "Hikari Utsuri",
    pattern:
      "The metallic version of Showa: a black-based koi with red and white markings, the whole body shining. Judges want a balanced three-colour pattern with crisp edges and an even sheen over every colour.",
    origin:
      "Made by bringing metallic blood into Showa lines. Champ Koi says the exact origin is hard to pin down and places it in the late 20th century; the JNPA describes the Hikari Utsuri as bred from Showa or Shiro Utsuri and single-coloured metallic koi.",
    notes:
      "In Hikari Utsuri the sheen is judged first, and among Kin Showa the redder fish are valued above the more orange ones. Kodama names Kin Showa as one parent of Kin Kikokuryu in 1998.",
    sources: [
      "https://www.champkoi.com/pages/koi-variety/kin-showa",
      "https://jnpa.info/en/nishikigoi/varieties/type/hikari-utsuri/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-utsurimono/",
      "https://www.pondtrademag.com/language-of-koi-hikari-utsuri/",
      "https://www.kodamakoifarm.com/variety/kin-kikokuryu/",
    ],
    care: [
      "In the metallic Utsuri, lustre and black tend to cancel each other out, so a strongly metallic Kin Showa usually shows softer black. A fish with both brilliant sheen and firm sumi is rare: an expectation to set rather than a fault to fix.",
      "The face and pectoral fins show a fish's true sheen most clearly, so look there when choosing one.",
    ],
    careSources: [
      "https://koigarden.com/koi-varieties-hikari-utsuri/",
      "https://www.pondtrademag.com/language-of-koi-hikari-utsuri/",
    ],
  },
  midorigoi: {
    nameMeaning: '"green carp"; midori means green and goi carp',
    family: "Kawarimono",
    pattern:
      "A green koi with no pattern, the colour running from yellow-green and olive to a brighter grass green. Most are doitsu, with a line of dark mirror scales along the back; the JNPA describes the scaled form as a yellow body with an olive-green back.",
    origin:
      "Ray Jordan's history and an earlier one by Chuck Jones both credit Tacho Yoshioka with the first Midorigoi in 1963, which Jones says took about 20 years of effort. Jordan lists a male Yamabuki Ogon and a female Shusui as the parents.",
    notes:
      "Few are produced. Accounts of its colour over time disagree: Jones wrote that most turn black as adults, while Kloubec says a well-kept fish can stay green for life. The JNPA and Kloubec both list it with the Kawarigoi, outside the main classes.",
    sources: [
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://www.oocities.org/koifla/History.htm",
      "https://jnpa.info/en/nishikigoi/varieties/type/kawarigoi/",
      "https://www.kloubeckoi.com/midorigoi-koi-for-sale/",
      "https://www.kloubeckoi.com/kawarigoi/",
    ],
    care: [
      "Kloubec ties the green to water hardness and recommends soft water, a GH of 100 to 150, to hold the colour.",
      "Most are doitsu, so the usual scaleless cautions apply: shade against sunburn and a closer watch for parasites.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/midorigoi-koi-for-sale/",
      "https://pondinformer.com/doitsu-koi-guide/",
      "https://www.kloubeckoi.com/blog/doitsu-koi-guide",
    ],
  },
  yellow_ogon: {
    nameMeaning:
      'Yamabuki Ogon in Japanese; yamabuki ("mountain rose") is a bright golden yellow named after a Japanese flower, and Ogon means gold',
    family: "Hikarimuji",
    pattern:
      "A one-colour metallic koi in bright yellow gold from nose to tail, with no markings at all. Judges want even colour, a strong sheen across every scale, a clear head and a thick body.",
    origin:
      "Ray Jordan's history records Sawata Aoki fixing the Yamabuki Ogon in 1957 by crossing a Kigoi with a light-coloured Ogon, and Chuck Jones's history gives the same year and cross. Accounts differ on the date: Jordan's own list of key dates puts the first Yamabuki in 1946, and Kloubec says the 1940s.",
    notes:
      "The ZNA and JNPA list yellow gold as one of the standard Hikarimuji colours, beside platinum and orange. Crossed with Shusui, a Yamabuki Ogon gave the first Midorigoi in 1963.",
    sources: [
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://www.oocities.org/koifla/History.htm",
      "https://jnpa.info/en/nishikigoi/varieties/type/hikari-muji/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-mujimono/",
      "https://www.champkoi.com/pages/koi-variety/yamabuki-ogon",
      "https://www.kloubeckoi.com/yamabuki-koi-for-sale/",
    ],
    care: [
      "Hardy and among the friendliest koi, quick to hand-feed like the other Ogon.",
      "A hefty appetite tends to make it grow very large, so plan the pond for the adult fish; Kloubec suggests at least three feet (about a metre) of depth.",
      "Kloubec reports the yellow deepening as the fish matures.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/yamabuki-koi-for-sale/",
      "https://www.kloubeckoi.com/ogon-koi-for-sale/",
      "https://www.kodamakoifarm.com/variety/ogon/",
    ],
  },  karashigoi: {
    nameMeaning: '"mustard carp"; karashi is mustard, for its colour',
    family: "Kawarimono",
    pattern:
      "A single-coloured non-metallic koi in mustard yellow, from a pale cream to a deep mustard, with no pattern and no sheen. A quality fish carries the yellow all the way to the tips of the pectoral fins.",
    origin:
      "Taro Kodama writes that Karashi was originally developed by crossing Kigoi with Chagoi, which is why it shares the Chagoi's appetite and growth. Champ Koi calls it a relatively new variety whose breeder and date are not recorded.",
    notes:
      "Hard to tell from Kigoi by eye: Kodama found only a few people in Niigata who could. It grows very large, the JNPA noting Karashigoi of more than a metre, and it has started winning the jumbo prizes long dominated by Chagoi. The ZNA lists it both in Kawarimono and in its Mujimono class for plain non-metallic koi.",
    sources: [
      "https://www.pondtrademag.com/language-of-koi-monochrome-muji-is-pure-perfection/",
      "https://www.champkoi.com/pages/koi-variety/karashigoi",
      "https://jnpa.info/en/nishikigoi/varieties/type/muji/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/kawarimono/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/mujimono/",
    ],
    care: [
      "Like the Chagoi it comes from, it eats well, grows fast and is friendly, so plan the pond for a very large adult.",
      "Red-brown edges on the tail fin are most likely inherited from the Chagoi side rather than a sign of stress.",
    ],
    careSources: [
      "https://www.pondtrademag.com/language-of-koi-monochrome-muji-is-pure-perfection/",
      "https://jnpa.info/en/nishikigoi/varieties/type/muji/",
    ],
  },
  hajiro: {
    nameMeaning: '"white wings", for the white-tipped pectoral fins',
    family: "Kawarimono",
    pattern:
      "A jet-black koi whose pectoral fins are white or white-tipped; some also show white on the edge of the tail. The JNPA notes that part of the pectoral fin can turn black in some fish.",
    origin:
      "Taro Kodama describes Hajiro as a variation of Karasu with white edges on the pectoral and tail fins, and the JNPA notes that some Karasugoi have white pectoral fin tips. No breeder or date is recorded.",
    notes:
      "The ZNA groups it in the Karasugoi family of its Kawarimono class, alongside Hageshiro and Kumonryu. As with other plain koi, a single stray spot of colour costs it more than it would a patterned fish.",
    sources: [
      "https://www.pondtrademag.com/language-of-koi-monochrome-muji-is-pure-perfection/",
      "https://jnpa.info/en/nishikigoi/varieties/type/kawarigoi/",
      "https://jnpa.info/en/nishikigoi/varieties/type/muji/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/kawarimono/",
      "https://www.oocities.org/koifla/History.htm",
    ],
    care: [
      "Hardy and easy to keep; Fitz's Fish Ponds reports the black deepening as the fish matures in clean, stable water.",
    ],
    careSources: ["https://fitzfishponds.com/shop-all-fish/hajiro/"],
  },
  hageshiro: {
    nameMeaning: "shiro means white; the name points to the white head on an otherwise black koi",
    family: "Kawarimono",
    pattern:
      "A black koi with a white head and white or white-tipped pectoral fins, the rest of the body solid black.",
    origin:
      "No breeder or date is recorded. The ZNA groups it in the Karasugoi family, and Joop van Tol of Koitoday calls Karasugoi the progenitor of that family; Ray Jordan's history places Hageshiro, with Karasu, among the dark koi that came down from the darker Asagi.",
    notes:
      "Descriptions differ in detail: Ray Jordan gives it only as black with white fins, while Koitoday and Fitz's Fish Ponds make the white head its defining mark.",
    sources: [
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/kawarimono/",
      "https://vijverleven.nl/en/blogs/kennisbank/karasugoi-familie",
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://fitzfishponds.com/shop-all-fish/hageshiro/",
    ],
    care: [
      "Fitz's Fish Ponds reports adults of 26 to 32 inches (about 65 to 80 cm), so plan for a large fish.",
    ],
    careSources: ["https://fitzfishponds.com/shop-all-fish/hageshiro/"],
  },
  kage_utsuri: {
    nameMeaning:
      "kage means shadow; on this site the name stands for Kage Shiro Utsuri, the black-and-white form drawn here",
    family: "Kawarimono",
    pattern:
      "A Shiro Utsuri, black with wrapping white markings, whose white areas carry a smoky grey net of shadow sumi. The same shadow on red gives Kage Hi Utsuri, and on Showa gives Kage Showa.",
    origin:
      "Fitz's Fish Ponds credits Otsuka Koi Farm with developing it by bringing Asagi blood into Shiro Utsuri lines, the Asagi netting giving the shadow over the white. No date is recorded.",
    notes:
      "Although it is an Utsuri in pattern, the ZNA shows the non-metallic Kage Utsuri in Kawarimono (it writes Shiro Kage Utsuri) and the JNPA lists Kage Shiro Utsuri among its Kawarigoi. Only the metallic Kage Gin Shiro Utsuri sits in the JNPA's Hikari Utsuri.",
    sources: [
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/kawarimono/",
      "https://jnpa.info/en/nishikigoi/varieties/type/kawarigoi/",
      "https://jnpa.info/en/nishikigoi/varieties/type/hikari-utsuri/",
      "https://fitzfishponds.com/shop-all-fish/kage-shiro-utsuri/",
      "https://www.cotswoldkoi.co.uk/knowledge-centre/what-is-a-kage-hi-utsuri-koi/",
    ],
    care: [
      "As with Shiro Utsuri, colour-enhancing food does a black-and-white koi no good: there are no cells in the white to take up the pigment, so the white turns pink, yellow or beige until it fades.",
      "The ZNA notes that Utsuri sumi does not settle until four or five years old, and Fitz's Fish Ponds says the shadow keeps developing as the fish matures, so a young fish is not the finished pattern.",
    ],
    careSources: [
      "https://dainichi.com/koi-color-food/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/utsuri-mono/",
      "https://fitzfishponds.com/shop-all-fish/kage-shiro-utsuri/",
    ],
  },
  ki_matsuba: {
    nameMeaning:
      '"yellow pine needle"; ki is yellow, and matsuba names the pinecone look of the dark-centred scales',
    family: "Kawarimono",
    pattern:
      "A non-metallic yellow koi with a dark centre in each scale across the back, the yellow showing at the scale edges for a pinecone look. Koisale says it is most often seen in doitsu form.",
    origin:
      "One of the Matsuba that came down from the Asagi line: Ray Jordan's history derives Aka and Ki Matsuba from the darker Asagi, and Chuck Jones's from the Asagi Magoi. No breeder or date is recorded.",
    notes:
      "The dark scale centres count as part of the colour rather than a pattern, so plain Matsuba are grouped with single-coloured koi: the JNPA lists Ki Matsuba under Muji, and the ZNA under Mujimono as well as on its Kawarimono page. Koisale notes that a Doitsu Ki Matsuba can be mistaken for a Midorigoi.",
    sources: [
      "https://jnpa.info/en/nishikigoi/varieties/type/muji/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/mujimono/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/kawarimono/",
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://www.oocities.org/koifla/History.htm",
      "https://koisale.com/pages/koi-varieties/matsuba.html",
      "https://vijverleven.nl/en/blogs/kennisbank/matsuba",
    ],
    care: [],
  },
  aka_matsuba: {
    nameMeaning: '"red pinecone"; aka is red, and matsuba names the dark-centred scales',
    family: "Kawarimono",
    pattern:
      "A non-metallic red koi with a black centre in each scale across the back, the pinecone pattern even from head to tail. The head should be red rather than white, and any blue patches would make it an Asagi.",
    origin:
      "Cotswold Koi dates it to the late 1950s, from a high-red Kohaku crossed with a Hi Asagi, with a few solely red fry refined into the variety; Kloubec names the same parents. Like Ki Matsuba it belongs to the Asagi-descended Matsuba line.",
    notes:
      "The JNPA lists it under Muji, and the ZNA under Mujimono as well as on its Kawarimono page, since the dark scale centres are not counted as a pattern.",
    sources: [
      "https://www.cotswoldkoi.co.uk/knowledge-centre/what-is-a-aka-matsuba-koi/",
      "https://www.kloubeckoi.com/matsuba-koi-for-sale/",
      "https://jnpa.info/en/nishikigoi/varieties/type/muji/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/mujimono/",
      "https://www.champkoi.com/pages/koi-variety/aka-matsuba",
      "https://koisale.com/pages/koi-varieties/matsuba.html",
    ],
    care: [
      "A large-growing variety: Koisale notes Aka Matsuba being entered in jumbo classes, so plan the pond for the adult fish.",
    ],
    careSources: ["https://koisale.com/pages/koi-varieties/matsuba.html"],
  },
  doitsu_kohaku: {
    nameMeaning:
      '"German Kohaku"; doitsu is the Japanese rendering of Deutsch, for the German carp behind its scalelessness',
    family: "Gosanke",
    pattern:
      "A Kohaku on near-scaleless skin: a white body with red markings, scaled only along the back and sides. The JNPA notes that doitsu colours read brighter and more vivid, and a good one has a clean edge (kiwa) between red and white.",
    origin:
      "Doitsu koi come from crossing Japanese koi with near-scaleless German food carp, first imported in 1904. No breeder or date is recorded for the first Doitsu Kohaku, but Ray Jordan's history already lists a female Doitsu Kohaku as a parent of the first Beni Kumonryu in 1980.",
    notes:
      "Where it is shown depends on the organisation: the JNPA's All Japan Koi Show judges doitsu koi in a Doitsu class of their own, while the ZNA's class pages place doitsu forms with their own varieties, for example doitsu Muji in Mujimono.",
    sources: [
      "https://jnpa.info/en/nishikigoi/varieties/type/doitsugoi/",
      "https://www.kodamakoifarm.com/variety/doitsu/",
      "https://www.kodamakoifarm.com/variety/doitsu-kohaku/",
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://www.pondtrademag.com/understanding-koi-shows/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/mujimono/",
    ],
    care: [
      "Scaleless skin is more prone to sunburn and parasites than a scaled koi, so give it shaded areas of the pond.",
      "It has a Kohaku's white ground, so heavy colour-enhancing food yellows the white and can spot the red.",
    ],
    careSources: [
      "https://pondinformer.com/doitsu-koi-guide/",
      "https://www.kloubeckoi.com/blog/doitsu-koi-guide",
      "https://pondinformer.com/kohaku-koi-guide/",
    ],
  },
  kin_matsuba: {
    nameMeaning: '"golden pine needles"; kin (metallic gold) added to Matsuba',
    family: "Hikarimuji",
    pattern:
      "A metallic gold koi with a dark centre in each scale across the back, so the scales stand out like a pinecone. The JNPA describes its shine as turmeric or dark gold.",
    origin:
      "The gold member of the metallic Matsuba: Koitoday describes metallic versions of the white, red and yellow Matsuba, with kin used for the gold-sheened ones. No breeder or date is recorded.",
    notes:
      "Although every scale carries a dark centre, it is judged as a single-coloured metallic koi in Hikarimuji, since the centres are not counted as a pattern. Names vary: the JNPA lists it as Ki Matsuba Ogon, and Koitoday notes that Kin Matsuba can mean either a red or a yellow metallic Matsuba.",
    sources: [
      "https://jnpa.info/en/nishikigoi/varieties/type/hikari-muji/",
      "https://www.oocities.org/koifla/History.htm",
      "https://www.pondtrademag.com/language-koi-the-shiny-hikari-muji-varieties-2/",
      "https://vijverleven.nl/en/blogs/kennisbank/matsuba",
      "https://www.kloubeckoi.com/matsuba-koi-for-sale/",
    ],
    care: [
      "Like the Ogon, it settles quickly and soon learns to take food from the hand.",
      "Sheen is what it is judged on, and the head and pectoral fins show it most clearly, so look there when choosing one.",
    ],
    careSources: [
      "https://www.pondtrademag.com/language-koi-the-shiny-hikari-muji-varieties-2/",
      "https://www.pondtrademag.com/basic-beauty-the-striking-simplicity-of-hikari-muji/",
    ],
  },
  gin_matsuba: {
    nameMeaning: '"silver pine needles"; gin (metallic silver) added to Matsuba',
    family: "Hikarimuji",
    pattern:
      "A metallic koi in silvery platinum white with a dark centre in each scale across the back, the pinecone net standing out against the shine.",
    origin:
      "The silver member of the metallic Matsuba, which Koitoday describes as the metallic version of the white Shiro Matsuba. No breeder or date is recorded. Taro Kodama counts Gin Matsuba, with the Ogon and Platinum, among the metallic koi crossed with patterned varieties to make Hariwake, Yamato Nishiki, Gin Shiro Utsuri and Kin Ki Utsuri.",
    notes:
      "Judged with the single-coloured metallic koi in Hikarimuji, where the JNPA lists it, since the dark scale centres are not counted as a pattern.",
    sources: [
      "https://jnpa.info/en/nishikigoi/varieties/type/hikari-muji/",
      "https://www.oocities.org/koifla/History.htm",
      "https://www.pondtrademag.com/basic-beauty-the-striking-simplicity-of-hikari-muji/",
      "https://www.pondtrademag.com/language-koi-the-shiny-hikari-muji-varieties-2/",
      "https://vijverleven.nl/en/blogs/kennisbank/matsuba",
      "https://www.kodamakoifarm.com/variety/gin-matsuba/",
    ],
    care: [
      "Like the Ogon, it settles quickly and soon learns to take food from the hand.",
      "Sheen is what it is judged on, and the head and pectoral fins show it most clearly, so look there when choosing one.",
    ],
    careSources: [
      "https://www.pondtrademag.com/language-koi-the-shiny-hikari-muji-varieties-2/",
      "https://www.pondtrademag.com/basic-beauty-the-striking-simplicity-of-hikari-muji/",
    ],
  },
  orenji_matsuba: {
    nameMeaning:
      '"orange pine needles"; orenji is the Japanese rendering of "orange"',
    family: "Hikarimuji",
    pattern:
      "A metallic Matsuba in orange gold: a dark centre in each scale across the back of an orange metallic body. The ZNA lists orange gold among the Hikarimuji colours.",
    origin:
      "One of the metallic Matsuba colour forms that Koitoday describes, where kin covers the gold-sheened orange, yellow and red fish. No breeder or date is recorded.",
    notes:
      "Naming is loose for the warm-coloured metallic Matsuba: the JNPA lists a red-to-vermilion form as Aka Matsuba Ogon, and Koitoday notes that red and yellow metallic Matsuba are often both just called Kin Matsuba.",
    sources: [
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-mujimono/",
      "https://jnpa.info/en/nishikigoi/varieties/type/hikari-muji/",
      "https://vijverleven.nl/en/blogs/kennisbank/matsuba",
      "https://www.cotswoldkoi.co.uk/knowledge-centre/what-is-a-matsuba-koi/",
      "https://www.pondexperts.ca/fish-ponds/japanese-koi-terminology/",
    ],
    care: [
      "Like the Ogon, it settles quickly and soon learns to take food from the hand.",
      "Sheen is what it is judged on, and the head and pectoral fins show it most clearly, so look there when choosing one.",
    ],
    careSources: [
      "https://www.pondtrademag.com/language-koi-the-shiny-hikari-muji-varieties-2/",
      "https://www.pondtrademag.com/basic-beauty-the-striking-simplicity-of-hikari-muji/",
    ],
  },
  kanoko_kohaku: {
    nameMeaning: "kanoko means fawn, for the dappled red that recalls a fawn's spotted back",
    family: "Kawarimono",
    pattern:
      "A white koi whose red appears as dapples, single scales or small groups of scales dyed red, rather than as solid plates. Some also carry ordinary solid red markings.",
    origin:
      "No breeder or date is recorded. It is a Kohaku in colour, but the ZNA and JNPA both class kanoko koi apart from Kohaku, with Kanoko Sanke and Kanoko Showa, in Kawarimono and Kawarigoi.",
    notes:
      "The dapple is not reliably permanent: Fitz's Fish Ponds warns that it can soften, fade or merge into solid patches as the fish ages.",
    sources: [
      "https://jnpa.info/en/nishikigoi/varieties/type/kawarigoi/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/kawarimono/",
      "https://fitzfishponds.com/shop-all-fish/kohaku/kanoko-kohaku/",
      "https://www.cotswoldkoi.co.uk/knowledge-centre/what-is-a-kanoko-kohaku-koi/",
    ],
    care: [
      "Keep conditions stable, especially through winter: Fitz's Fish Ponds says stress can trigger the pigment change that loses the dapple.",
      "Colour food is a trade-off, as with Kohaku: Fitz recommends carotenoid pellets for the red, while Pond Informer warns that too much yellows the white.",
    ],
    careSources: [
      "https://fitzfishponds.com/shop-all-fish/kohaku/kanoko-kohaku/",
      "https://pondinformer.com/kohaku-koi-guide/",
    ],
  },
  budo_goromo: {
    nameMeaning: '"grape robe"; budo means grape, for the clustered markings',
    family: "Koromo",
    pattern:
      "A white koi whose red markings are overlaid with darker, purplish scale edging gathered into clusters like bunches of grapes. Where Ai Goromo has fine blue edging on each red scale, Budo Goromo's overlay is heavy enough to darken the red, and it should stay off the head.",
    origin:
      "Champ Koi calls its origin poorly documented and places it in the mid-20th century, developed within the Koromo family that came from Asagi and Kohaku crosses; Cotswold Koi credits the breeder Sakazume. Pond Informer treats it as a sub-variety of Ai Goromo.",
    notes:
      "Shown in the Koromo class at both the ZNA and the JNPA, and the less common of the Koromo forms.",
    sources: [
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/koromo/",
      "https://jnpa.info/en/nishikigoi/varieties/type/koromo/",
      "https://www.champkoi.com/pages/koi-variety/budo-goromo",
      "https://pondinformer.com/goromo-koi-guide/",
      "https://en.wikipedia.org/wiki/Koi",
      "https://www.cotswoldkoi.co.uk/knowledge-centre/what-is-a-budo-goromo-koi/",
    ],
    care: [
      "The overlay darkens with age, so a young fish with lighter clusters is the safer choice; one that is already dark tends to go too dark.",
      "Too much colour-enhancing food yellows the white and can leave orange spots in the red.",
    ],
    careSources: ["https://pondinformer.com/goromo-koi-guide/"],
  },
  kage_showa: {
    nameMeaning: "kage means shadow, for the smoky net laid over the white of a Showa",
    family: "Kawarimono",
    pattern:
      "A Showa, black-based with red and white markings, whose white areas carry a blurred, reticulated net of shadowy sumi that lets the individual scales show through. The JNPA describes the same thin mesh over the red as well.",
    origin:
      "Selected from within Showa lines rather than bred from a separate cross. Koisale explains that emerging Showa sumi often shows first as a shadowy, reticulated grey, and fish that keep it into adulthood are called Kage Showa; Fitz's Fish Ponds likewise describes breeders selecting Showa that naturally showed the netting. No breeder or date is recorded.",
    notes:
      "Shown in Kawarimono with the other kage koi at the ZNA, and among the JNPA's Kawarigoi, rather than with Showa. A young fish with shadowy sumi is not a safe Kage Showa: Koisale notes that for every true example, many more develop full lacquer-black sumi as they mature.",
    sources: [
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/kawarimono/",
      "https://jnpa.info/en/nishikigoi/varieties/type/kawarigoi/",
      "https://akjajudges.com/glossary/",
      "https://koisale.com/pages/koi-varieties/showa.html",
      "https://fitzfishponds.com/shop-all-fish/kage-showa/",
    ],
    care: [
      "Hardy and adaptable like other Showa; Fitz's Fish Ponds notes that the shadow net does not change how it is kept.",
      "As on any Showa, the black can take several years to ripen, so judge a young fish's pattern with patience.",
    ],
    careSources: [
      "https://fitzfishponds.com/shop-all-fish/kage-showa/",
      "https://pondinformer.com/showa-koi-guide/",
    ],
  },
  ginsui: {
    nameMeaning: "gin means metallic silver; Ginsui is the silver-lustred metallic Shusui",
    family: "Hikarimoyo",
    pattern:
      "A metallic Shusui with a silver lustre: the doitsu Shusui's blue back, mirror-scale rows and red along the flanks, all under a silvery sheen.",
    origin:
      "No breeder or date is recorded. The ZNA defines Kinsui and Ginsui together as metallic Shusui, and Taro Kodama describes the patterned metallic koi as made by crossing Ogon, Platinum and the metallic Matsuba with patterned varieties.",
    notes:
      "The ZNA and the American Koi Judges Association both place it in Hikari Moyomono. It is the silver counterpart of Kinsui, which carries a gold lustre and usually more red.",
    sources: [
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-moyomono/",
      "https://akjajudges.com/glossary/",
      "https://koisale.com/koi-glossary/",
      "https://russellwatergardens.com/pages/koi-glossary-of-terms",
      "https://www.pondtrademag.com/basic-beauty-the-striking-simplicity-of-hikari-muji/",
    ],
    care: [
      "Scaleless skin is more prone to sunburn and parasites than a scaled koi, so give it shaded areas of the pond.",
      "Its few scales should line up neatly: Taro Kodama notes that on a doitsu koi one misplaced scale can spoil an otherwise perfect fish.",
    ],
    careSources: [
      "https://pondinformer.com/doitsu-koi-guide/",
      "https://www.kloubeckoi.com/blog/doitsu-koi-guide",
      "https://www.pondtrademag.com/doitsu-koi-delivers-beauty-different-scale/",
    ],
  },
  kinsui: {
    nameMeaning: "kin means metallic gold; Kinsui is the gold-lustred metallic Shusui",
    family: "Hikarimoyo",
    pattern:
      "A metallic Shusui with a gold lustre: the doitsu Shusui pattern of blue back, mirror-scale rows and red flanks under a golden sheen, usually carrying more red than Ginsui.",
    origin:
      "No breeder or date is recorded. The ZNA defines Kinsui and Ginsui together as metallic Shusui, and Chuck Jones's late-1990s history already described Kinsui as a shiny Shusui with lots of hi that was rarely seen.",
    notes:
      "Classes differ: the ZNA, the American Koi Judges Association and Kloubec put Kinsui in Hikari Moyomono, while the JNPA lists it among its Kawarigoi as a shining doitsu fish with the look of Shusui.",
    sources: [
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-moyomono/",
      "https://jnpa.info/en/nishikigoi/varieties/type/kawarigoi/",
      "https://akjajudges.com/glossary/",
      "https://www.kloubeckoi.com/hikari-moyo-koi/",
      "https://www.oocities.org/koifla/History.htm",
      "https://russellwatergardens.com/pages/koi-glossary-of-terms",
    ],
    care: [
      "Scaleless skin is more prone to sunburn and parasites than a scaled koi, so give it shaded areas of the pond.",
      "Its few scales should line up neatly: Taro Kodama notes that on a doitsu koi one misplaced scale can spoil an otherwise perfect fish.",
    ],
    careSources: [
      "https://pondinformer.com/doitsu-koi-guide/",
      "https://www.kloubeckoi.com/blog/doitsu-koi-guide",
      "https://www.pondtrademag.com/doitsu-koi-delivers-beauty-different-scale/",
    ],
  },
  sakura_ogon: {
    nameMeaning:
      "sakura is the cherry blossom, as in Gotenzakura, the cherry-blossom Kohaku; Ogon names the metallic class",
    family: "Hikarimoyo",
    pattern:
      "A metallic koi with a platinum-white body and red markings. The ZNA and the American Koi Judges Association define it as a metallic Kanoko Kohaku, its red dappled scale by scale rather than laid in solid plates.",
    origin:
      "No breeder or date is recorded. Taro Kodama describes the patterned metallic koi as made by crossing Ogon, Platinum and the metallic Matsuba with patterned varieties.",
    notes:
      "Definitions differ: the ZNA and AKJA call it a metallic Kanoko Kohaku and list Platinum Kohaku, a metallic Kohaku, separately, while the JNPA describes Sakura Ogon as a shining Kohaku and says it is also called Platinum Kohaku. All three place it in the metallic patterned class.",
    sources: [
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-moyomono/",
      "https://jnpa.info/en/nishikigoi/varieties/type/hikari-moyo/",
      "https://akjajudges.com/glossary/",
      "https://www.pondtrademag.com/basic-beauty-the-striking-simplicity-of-hikari-muji/",
    ],
    care: [],
  },
  beni_kikokuryu: {
    nameMeaning: '"red shining black dragon"; beni (deep red) added to Kikokuryu',
    family: "Kawarimono",
    pattern:
      "A metallic doitsu Kikokuryu that also carries red or orange markings on its platinum-white body, with black that shifts while the red stays put.",
    origin:
      "Ray Jordan's history credits Kataoka and Aoki with Beni Kikokuryu in 1995, from a Beni Kumonryu crossed with a Doitsu Kikusui, two years after their Kikokuryu. Other accounts differ: Kloubec gives Haruo Aoki's male Kumonryu and female Kikusui as the parents, and Champ Koi describes it as bred from Kikokuryu and Kohaku or other red-patterned koi.",
    notes:
      "Like Kikokuryu it is metallic but shown in Kawarimono: the ZNA says so on its Hikari Moyomono page, and the JNPA lists it among its Kawarigoi as one of the stable, named cultivars popular at shows.",
    sources: [
      "https://mpks.org/koi-history-by-ray-jordan/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/hikari-moyomono/",
      "https://jnpa.info/en/nishikigoi/varieties/type/kawarigoi/",
      "https://www.kloubeckoi.com/beni-kikokuryu-koi-for-sale",
      "https://www.champkoi.com/pages/koi-variety/beni-kikokuryu",
      "https://fitzfishponds.com/shop-all-fish/beni-kikokuryu/",
      "https://akjajudges.com/glossary/",
    ],
    care: [
      "Its black moves with water temperature and the seasons while the red stays put. Kloubec advises a stable 15 to 25 °C for a more consistent pattern and says the biggest changes come in the first two or three years.",
      "Scaleless skin is more prone to sunburn and parasites than a scaled koi, so give it shaded areas of the pond.",
    ],
    careSources: [
      "https://www.kloubeckoi.com/beni-kikokuryu-koi-for-sale",
      "https://pondinformer.com/doitsu-koi-guide/",
      "https://www.kloubeckoi.com/blog/doitsu-koi-guide",
    ],
  },
  doitsu_sanke: {
    nameMeaning:
      '"German Sanke"; doitsu is the Japanese rendering of Deutsch, for the German carp behind its scalelessness',
    family: "Gosanke",
    pattern:
      "A Taisho Sanke on near-scaleless skin: a white body with red and black markings, scaled only in a row along the back and sometimes the sides. Without scales the red and black stand out more sharply.",
    origin:
      "Doitsu koi come from crossing Japanese koi with near-scaleless German food carp, first imported in 1904, and Taro Kodama counts Doitsu Sanke among the many doitsu forms bred since. No breeder or date is recorded for the first one.",
    notes:
      "Judging starts with the scales, whose few rows must line up cleanly, before the fish is assessed as an ordinary Sanke. Where it is shown depends on the organisation: the JNPA's All Japan Koi Show has a separate Doitsu class, while the ZNA's class pages place doitsu forms with their own varieties. It is not a Sanke Shusui, which the AKJA describes as a doitsu Sanke with the blue Shusui back beneath the pattern.",
    sources: [
      "https://jnpa.info/en/nishikigoi/varieties/type/doitsugoi/",
      "https://www.kodamakoifarm.com/variety/doitsu-sanke/",
      "https://www.pondtrademag.com/doitsu-koi-delivers-beauty-different-scale/",
      "https://www.pondtrademag.com/understanding-koi-shows/",
      "https://zna.jp/en/keep-nishikigoi/varieties-of-nishikigoi/mujimono/",
      "https://pondinformer.com/sanke-koi-guide/",
      "https://fitzfishponds.com/shop-all-fish/doitsu-sanke/",
      "https://akjajudges.com/glossary/",
    ],
    care: [
      "Scaleless skin is more prone to sunburn and parasites than a scaled koi, so give it shaded areas of the pond.",
      "Too much colour-enhancing food yellows the white, spots the red and can leave the black looking blue.",
    ],
    careSources: [
      "https://pondinformer.com/doitsu-koi-guide/",
      "https://www.kloubeckoi.com/blog/doitsu-koi-guide",
      "https://pondinformer.com/sanke-koi-guide/",
    ],
  },
};

export function getVarietyInfo(slug: string): VarietyInfo | undefined {
  return VARIETY_INFO[slug];
}
