/* Pond plants: koi-dex's own content, nothing here comes from the app.
   Researched and source-checked 2026-08-18 (week 6): each plant has two
   general sources and, where one exists, a New Zealand status source
   (NZPCN, Weedbusters, DOC, regional council). The shape mirrors the
   planned `plants` table so the database phase can seed from this file. */

export type PlantType = "floating" | "submerged" | "marginal";
export type Difficulty = "easy" | "moderate" | "hard";
export type NzStatusKind =
  | "native"
  | "naturalised"
  | "cultivated"
  | "pest"
  | "unknown";

export type PlantImage = {
  /** Path under /assets/plants/ */
  path: string;
  alt: string;
  /** Author as Wikimedia Commons credits them */
  author: string;
  license: string;
  /** Commons file page, so the attribution links back */
  url: string;
};

export type Plant = {
  slug: string;
  name: string;
  latinName: string;
  type: PlantType;
  /** Plain-language light need, e.g. "Full sun, six hours or more". */
  light: string;
  difficulty: Difficulty;
  /** True when established plants survive koi without protection. */
  koiSafe: boolean;
  koiNotes: string;
  hardiness: string;
  planting: string;
  benefits: string;
  description: string;
  nz: { status: NzStatusKind; note: string; url?: string };
  sources: { name: string; url: string }[];
  image?: PlantImage;
};

export const PLANT_TYPE_LABEL: Record<PlantType, string> = {
  floating: "Floating",
  submerged: "Submerged",
  marginal: "Marginal",
};

export const PLANT_TYPE_BLURB: Record<PlantType, string> = {
  floating:
    "Lives on the surface, either free-floating or rooted with leaves that float. Shade and nutrient uptake.",
  submerged:
    "Grows under the water. The oxygenators, and where fry hide.",
  marginal:
    "Stands in the shallows at the edge with its roots in a few centimetres of water. Cover, flowers, filtration.",
};

export const NZ_STATUS_LABEL: Record<NzStatusKind, string> = {
  native: "NZ native",
  naturalised: "Naturalised in NZ",
  cultivated: "Sold in NZ",
  pest: "Banned in NZ",
  unknown: "Not listed, check first",
};

export const PLANTS: Plant[] = [
  // ---- Floating -----------------------------------------------------------
  {
    slug: "water-lily",
    image: {
      path: "plants/water-lily.webp",
      alt: "Hardy water lily 'Marliacea Chromatella' pads and pale yellow flowers on a pond",
      author: "Krzysztof Ziarnek, Kenraiz",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Nymphaea_%27Marliacea_Chromatella%27_kz01.jpg",
    },
    name: "Hardy water lily",
    latinName: "Nymphaea hybrids",
    type: "floating",
    light: "Full sun, at least six hours a day, in still water away from fountains and waterfalls",
    difficulty: "easy",
    koiSafe: false,
    koiNotes:
      "Koi hide under the pads and spawn on the undersides of the leaves, but they also graze leaves and roots and dig the tuber out of its pot. Plant in heavy loam topped with pea gravel or large stones, use a mesh-sided basket or a lily cage, and feed the fish so the lily is not the easiest meal.",
    hardiness:
      "Hardy hybrids need no winter protection; the foliage dies back in autumn and regrows as the water warms. Keep the crown below the ice line.",
    planting:
      "Start shallow (15 to 25 cm over the crown) and lower gradually to the final depth: 30 to 45 cm for dwarf varieties, 45 to 75 cm for medium, 75 to 120 cm for large. A 5 to 10 litre basket of aquatic loam, crown just below the surface. Spread from 60 cm to well over two metres depending on the variety. Divide every four or five years.",
    benefits:
      "Shades and cools the water, which suppresses algae; shelter and a spawning surface for koi. Little oxygenation, since the leaves float.",
    description:
      "The classic pond plant. A tuber sits in a pot on the pond floor and sends round pads and flowers up to float on the surface. It shades and cools the water and gives the koi cover. Koi will graze it and dig up its pot unless the soil is gravelled over or the plant is caged.",
    nz: {
      status: "cultivated",
      note: "Ordinary hardy hybrids are sold and grown throughout New Zealand. The yellow Mexican water lily (Nymphaea mexicana) and its hybrids are on the National Pest Plant Accord and cannot be sold; make sure a yellow lily is not one of those.",
      url: "https://www.nzpcn.org.nz/flora/species/nymphaea-mexicana/",
    },
    sources: [
      { name: "RHS: growing water lilies", url: "https://www.rhs.org.uk/plants/waterlilies/growing-guide" },
      { name: "Pond Informer: plants for koi ponds", url: "https://pondinformer.com/best-plants-for-koi-ponds/" },
    ],
  },
  {
    slug: "lotus",
    image: {
      path: "plants/lotus.webp",
      alt: "Sacred lotus leaves and pink flowers covering a pond",
      author: "Basile Morin",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Sacred_lotus_leaves_and_flowers_covering_a_pond_in_Don_Det_Laos.jpg",
    },
    name: "Sacred lotus",
    latinName: "Nelumbo nucifera",
    type: "floating",
    light: "Full sun, six hours a day; it sulks in a cool summer",
    difficulty: "moderate",
    koiSafe: true,
    koiNotes:
      "Koi do not find lotus palatable and mostly leave it alone, turning to the leaves, seeds or roots only when other food is scarce. Keep the tuber in a large, deep pot capped with gravel so it cannot be dug out.",
    hardiness:
      "USDA zones 4 to 10. The tuber overwinters dormant below the ice; move the pot to the deepest part of the pond for winter. Needs warm water, 23 to 27 °C, to grow well.",
    planting:
      "Tuber 10 to 15 cm deep in heavy clay soil in a wide, round, deep container so the running rhizome cannot escape, with the top of the pot 15 to 45 cm below the surface. Leaf stalks reach two metres, leaves 60 to 80 cm across, flowers up to 30 cm. It needs a large pond.",
    benefits:
      "Heavy summer shade, cools the water and suppresses algae; big scented flowers for pollinators. Little oxygenation.",
    description:
      "A big, dramatic pond plant with plate-sized leaves held above the water and huge scented flowers, grown from a banana-shaped tuber in a wide pot in shallow water. Koi mostly ignore it, but it wants a warm summer and plenty of room.",
    nz: {
      status: "unknown",
      note: "No New Zealand pest listing was found. Check with your regional council before buying, and keep it in a container.",
    },
    sources: [
      { name: "Pond Informer: water lotus", url: "https://pondinformer.com/water-lotus-nelumbo/" },
      { name: "Pond Informer: plants for koi ponds", url: "https://pondinformer.com/best-plants-for-koi-ponds/" },
    ],
  },
  {
    slug: "water-hyacinth",
    image: {
      path: "plants/water-hyacinth.webp",
      alt: "Water hyacinth with a lilac flower spike among glossy leaves",
      author: "Rjcastillo",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Jacinto_de_agua_(Eichhornia_crassipes).jpg",
    },
    name: "Water hyacinth",
    latinName: "Pontederia crassipes (Eichhornia crassipes)",
    type: "floating",
    light: "Full sun to part sun",
    difficulty: "moderate",
    koiSafe: false,
    koiNotes:
      "Koi nibble the dangling roots, which does help control it. Most keepers float it inside a ring of tubing or a floating basket so the roots are out of reach and the plants stay off the skimmer. Not toxic to fish, though the raw sap can irritate skin.",
    hardiness:
      "USDA zones 9 to 11; best at 21 to 27 °C, tolerates 12 to 35 °C. Frost kills it, so in cool climates it is treated as an annual.",
    planting:
      "No planting: it floats on still water. Rosettes with balloon-like leaf stalks up to 15 cm, up to a metre tall in flower, roots about 15 cm. It can quadruple in a month and needs weekly thinning.",
    benefits:
      "Very fast nutrient stripping and algae control, surface shade, root cover for fry, lilac flowers.",
    description:
      "A floating rosette with balloon-like leaf stalks and lilac flowers that drifts on the surface and sucks nutrients out of the water. It grows explosively in warm weather. Koi pick at its roots, so it is usually floated inside a ring.",
    nz: {
      status: "pest",
      note: "On the National Pest Plant Accord and under a national eradication programme: it cannot be sold, propagated or distributed. Do not try to remove a wild plant yourself; report it to Biosecurity New Zealand on 0800 80 99 66.",
      url: "https://www.weedbusters.org.nz/what-are-weeds/weed-list/water-hyacinth/",
    },
    sources: [
      { name: "Pond Informer: water hyacinth", url: "https://pondinformer.com/water-hyacinth-eichhornia-crassipes/" },
      { name: "Pond Informer: plants for koi ponds", url: "https://pondinformer.com/best-plants-for-koi-ponds/" },
      { name: "NZPCN: Eichhornia crassipes", url: "https://www.nzpcn.org.nz/flora/species/eichhornia-crassipes/" },
    ],
  },
  {
    slug: "water-lettuce",
    image: {
      path: "plants/water-lettuce.webp",
      alt: "A raft of water lettuce rosettes on the surface",
      author: "Mike Peel",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:At_La_Orotava_2023_130.jpg",
    },
    name: "Water lettuce",
    latinName: "Pistia stratiotes",
    type: "floating",
    light: "Full sun to part shade; give it midday shade in a hot climate",
    difficulty: "easy",
    koiSafe: false,
    koiNotes:
      "Koi and goldfish can kill it by eating the roots. Corral it in a floating hoop or basket. Contains calcium oxalate, an irritant if a pet or child eats it; not reported toxic to fish.",
    hardiness:
      "USDA zones 8 to 10; needs at least 15 °C and is happiest at 22 to 30 °C. Not frost hardy; replace each spring or overwinter indoors.",
    planting:
      "No planting: it floats on still water. Rosettes about 30 cm across and 10 cm tall, roots up to a metre; one plant can spread over a metre by runners.",
    benefits:
      "Shade, strong nutrient uptake and algae suppression, long roots that shelter fry.",
    description:
      "A floating lettuce head of velvety pale-green leaves with a curtain of feathery roots underneath. It multiplies fast by runners and cleans the water. Koi love the roots, so most people corral it in a floating ring.",
    nz: {
      status: "pest",
      note: "On the National Pest Plant Accord. Recorded as nationally eradicated (it was previously known from Tauranga and Hokianga); notify the Ministry for Primary Industries if you find it.",
      url: "https://www.nzpcn.org.nz/flora/species/pistia-stratiotes/",
    },
    sources: [
      { name: "Pond Informer: water lettuce", url: "https://pondinformer.com/water-lettuce-pistia-stratiotes/" },
      { name: "Pond Informer: plants for koi ponds", url: "https://pondinformer.com/best-plants-for-koi-ponds/" },
    ],
  },
  {
    slug: "duckweed",
    image: {
      path: "plants/duckweed.webp",
      alt: "A marsh surface carpeted in duckweed",
      author: "Gilles Ayotte",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Lemna_minor_15-p.bot-lemna.minor-3.jpg",
    },
    name: "Duckweed",
    latinName: "Lemna minor (in NZ, Lemna disperma)",
    type: "floating",
    light: "Full sun to part shade, in still water",
    difficulty: "easy",
    koiSafe: false,
    koiNotes:
      "Koi eat it readily; it is a decent protein source and a stocked pond usually grazes it clean, so it rarely survives long enough to be a problem. If you want a supply, keep a nursery tub. Not toxic.",
    hardiness:
      "Very hardy: it overwinters as dormant fronds on the bottom and regrows in spring.",
    planting:
      "None. Fronds two to eight millimetres across with a single root, forming dense colonies in still water. Full cover blocks light to submerged plants and can cause an oxygen crash, which is why it is treated as a weed in unstocked ponds.",
    benefits:
      "Shade and nutrient stripping, algae suppression, fry cover, fish food.",
    description:
      "The tiniest floating plant: pinhead-sized green discs that multiply into a carpet across still water. It cleans the water and koi eat it. In a small pond it can smother the surface, so it is a snack or a weed rather than a feature.",
    nz: {
      status: "native",
      note: "New Zealand's common duckweed is the native Lemna disperma, listed as Not Threatened. Plants here were long misidentified as Lemna minor, which may not occur in New Zealand at all.",
      url: "https://www.nzpcn.org.nz/flora/species/lemna-disperma/",
    },
    sources: [
      { name: "Pond Informer: duckweed", url: "https://pondinformer.com/duckweed-good-or-bad/" },
      { name: "Texas A&M AquaPlant: common duckweed", url: "https://aquaplant.tamu.edu/plant-identification/alphabetical-index/duckweed/common-duckweed/" },
    ],
  },
  {
    slug: "frogbit",
    image: {
      path: "plants/frogbit.webp",
      alt: "Frogbit rosettes floating on water with a single white flower",
      author: "Krzysztof Ziarnek, Kenraiz",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Hydrocharis_morsus-ranae_kz11.jpg",
    },
    name: "Frogbit",
    latinName: "Hydrocharis morsus-ranae; Amazon frogbit is Limnobium laevigatum",
    type: "floating",
    light: "Full sun; Amazon frogbit takes part shade",
    difficulty: "easy",
    koiSafe: false,
    koiNotes:
      "Carp graze it, and dense root mats up to 50 cm deep can crowd the fish. Corral it in a floating ring or grow it in a shallow tub. Not toxic to fish.",
    hardiness:
      "European frogbit survives hard frost by sinking dormant buds to the bottom. Amazon frogbit prefers 15 to 28 °C, struggles in cool water and is overwintered indoors in cold regions.",
    planting:
      "None: it floats. Rosettes of small heart-shaped leaves spreading by runners, easily 1.5 metres in a season. Thin it often.",
    benefits:
      "Shade, nitrate uptake, algae suppression, cover for fry; small white flowers.",
    description:
      "A miniature water-lily lookalike with coin-sized leaves and dangling roots that spreads by runners. It shades and cleans the water and needs no planting. Both species can smother a pond quickly, so thin them often.",
    nz: {
      status: "unknown",
      note: "No pest listing was found for either species. NIWA has listed frogbit among high-risk aquarium and pond plants, so treat it with caution and never let it reach a waterway.",
    },
    sources: [
      { name: "Pond Informer: frogbit", url: "https://pondinformer.com/frogbit-hydrocharis-morsus-ranae/" },
      { name: "Pond Informer: Amazon frogbit", url: "https://pondinformer.com/smooth-frogbit-limnobium-laevigatum/" },
    ],
  },

  // ---- Submerged ---------------------------------------------------------
  {
    slug: "hornwort",
    image: {
      path: "plants/hornwort.webp",
      alt: "Hornwort stems under water",
      author: "Javier martin",
      license: "Public domain",
      url: "https://commons.wikimedia.org/wiki/File:Ceratophyllum_demersum_2010-8-14_RioMontoro_SierraMadrona.jpg",
    },
    name: "Hornwort",
    latinName: "Ceratophyllum demersum",
    type: "submerged",
    light: "Full sun to full shade; limit direct sun to about eight hours to stop it yellowing",
    difficulty: "easy",
    koiSafe: true,
    koiNotes:
      "Koi and goldfish eat it, but it tolerates nibbling better than most submerged plants and grows around 13 cm a week, which usually outpaces the grazing. Weight bunches down or keep some in a mesh cage. Not toxic.",
    hardiness:
      "USDA zones 5 to 11; prefers 15 to 30 °C. It sinks and overwinters as buds on the bottom.",
    planting:
      "No roots: drop it in or weight it down in 30 cm to nearly three metres of water. Stems 30 to 150 cm, brittle, and every fragment regrows.",
    benefits:
      "One of the best oxygenators, strong nutrient uptake, and it releases compounds that suppress algae. Spawning medium and fry refuge.",
    description:
      "A rootless underwater plant with bristly whorls of needle-like leaves that drifts or sits weighted on the bottom. It oxygenates, soaks up nutrients and gives fry somewhere to hide. Koi graze it, but it grows faster than they eat.",
    nz: {
      status: "pest",
      note: "On the National Pest Plant Accord and classed as an environmental weed: it cannot be sold or moved. Thought to be eradicated from the South Island; report any South Island sighting to MPI on 0800 80 99 66.",
      url: "https://www.weedbusters.org.nz/what-are-weeds/weed-list/hornwort/",
    },
    sources: [
      { name: "Pond Informer: hornwort", url: "https://pondinformer.com/hornwort-ceratophyllum-demersum/" },
      { name: "Texas A&M AquaPlant: coontail", url: "https://aquaplant.tamu.edu/plant-identification/alphabetical-index/coontail/" },
      { name: "NZPCN: Ceratophyllum demersum", url: "https://www.nzpcn.org.nz/flora/species/ceratophyllum-demersum/" },
    ],
  },
  {
    slug: "egeria",
    image: {
      path: "plants/egeria.webp",
      alt: "Close-up of a whorled Egeria densa shoot",
      author: "Krzysztof Ziarnek, Kenraiz",
      license: "CC BY 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Elodea_densa_kz01.jpg",
    },
    name: "Anacharis (Brazilian waterweed)",
    latinName: "Egeria densa",
    type: "submerged",
    light: "Part sun to part shade, moderate light",
    difficulty: "easy",
    koiSafe: false,
    koiNotes:
      "Goldfish love it and koi graze it hard and uproot loose bunches. Keep it in gravel-topped pots or a mesh cage, or grow a nursery tub and feed sprigs to the fish. Not toxic.",
    hardiness:
      "USDA zones 5 to 13; grows at 15 to 30 °C, tolerates surface ice but not prolonged freezing. Overwinter cuttings indoors in a cold climate.",
    planting:
      "Strip the bottom few centimetres of leaves and tuck stems into the substrate a few centimetres apart, or float bunches. Depth to about four metres; stems to three metres.",
    benefits:
      "Oxygenator, nutrient uptake, algae control, spawning medium, food and cover.",
    description:
      "A leafy underwater stem plant sold in bunches as an oxygenating weed. It is easy and fast, gives koi something green to nibble and helps keep the water clear. It breaks into fragments that regrow, which is exactly why it is a serious weed in New Zealand waterways.",
    nz: {
      status: "pest",
      note: "On the National Pest Plant Accord as an Unwanted Organism: it cannot be sold, propagated or distributed. Widespread in the North Island and Marlborough.",
      url: "https://www.weedbusters.org.nz/what-are-weeds/weed-list/egeria/",
    },
    sources: [
      { name: "Pond Informer: anacharis", url: "https://pondinformer.com/anacharis-elodea-densa/" },
      { name: "Pond Informer: plants for koi ponds", url: "https://pondinformer.com/best-plants-for-koi-ponds/" },
      { name: "NZPCN: Egeria densa", url: "https://www.nzpcn.org.nz/flora/species/egeria-densa/" },
    ],
  },
  {
    slug: "eelgrass",
    image: {
      path: "plants/eelgrass.webp",
      alt: "Eelgrass ribbons streaming in a river current",
      author: "Lamiot",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Vallisn%C3%A9rie_Vallisneria_spiralis_Brant%C3%B4me-Dronne_2014_4.JPG",
    },
    name: "Eelgrass (tape grass)",
    latinName: "Vallisneria spp.",
    type: "submerged",
    light: "Full sun to part shade, at least five hours of sun",
    difficulty: "easy",
    koiSafe: true,
    koiNotes:
      "One of the few submerged plants koi and other large fish typically neither rip up nor browse: the leaves are tough and growth outpaces grazing. Plant the crown in gravel or sand without burying it, or use baskets to contain the runners. Not toxic.",
    hardiness:
      "USDA zones 4 to 10. Dies back to tubers in winter and resprouts in spring.",
    planting:
      "At least 30 cm of water, ideally 30 to 120 cm. Ribbon leaves to 90 cm; it spreads by runners and roots within a couple of weeks, forming a lawn.",
    benefits:
      "A top oxygenator, filters the water, roots stabilise sediment, cover for fry and spawning.",
    description:
      "An underwater grass with long green ribbons that sway in the current from a rooted crown. It is one of the few submerged plants koi leave alone, and a good oxygenator for deep ponds. It spreads by runners into a lawn.",
    nz: {
      status: "pest",
      note: "Vallisneria australis (also sold as V. spiralis or V. gigantea) is on the National Pest Plant Accord and classed as an environmental weed, naturalised in the North Island and Marlborough. It cannot be sold or distributed.",
      url: "https://www.nzpcn.org.nz/flora/species/vallisneria-australis/",
    },
    sources: [
      { name: "Pond Informer: Vallisneria", url: "https://pondinformer.com/vallisneria-americana/" },
      { name: "Pond Informer: plants for koi ponds", url: "https://pondinformer.com/best-plants-for-koi-ponds/" },
    ],
  },
  {
    slug: "anubias",
    image: {
      path: "plants/anubias.webp",
      alt: "Anubias barteri var. nana leaves growing over gravel",
      author: "Krzysztof Ziarnek, Kenraiz",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Anubias_barteri_var._nana_kz01.jpg",
    },
    name: "Anubias",
    latinName: "Anubias barteri",
    type: "submerged",
    light: "Shade to part shade; strong sun grows algae on the leaves",
    difficulty: "moderate",
    koiSafe: true,
    koiNotes:
      "The thick, leathery leaves are highly resistant to grazing and koi ignore them, though they may knock a loose plant about. Tie the rhizome to a rock or piece of wood with fishing line and never bury it, or it rots. Not toxic.",
    hardiness:
      "A tropical aquarium plant: it wants 20 °C or warmer and the leaves yellow and die back below that. Outdoors year-round only in frost-free climates; elsewhere it is a summer guest that comes into an indoor tank for winter.",
    planting:
      "Attach the rhizome to rock or wood at about 30 cm depth or at the waterline. 20 to 45 cm tall, slow (a new leaf every two or three months); grows faster with its leaves above the surface.",
    benefits:
      "Shelter for small fish and some nutrient uptake. Little oxygenation or shade; mostly ornamental.",
    description:
      "A tough, dark-green aquarium plant that grows from a creeping rhizome tied to rocks or wood rather than in soil. Koi ignore its leathery leaves. It only works outdoors in a warm climate or as a summer guest that comes indoors for winter.",
    nz: {
      status: "unknown",
      note: "Sold in the aquarium trade; no pest listing was found. It is unlikely to survive a New Zealand winter outdoors.",
    },
    sources: [
      { name: "Pond Informer: goldfish pond plants", url: "https://pondinformer.com/best-goldfish-pond-plants/" },
      { name: "Fitz's Fish Ponds: Anubias barteri", url: "https://fitzfishponds.com/anubias-barteri/" },
    ],
  },

  // ---- Marginal ----------------------------------------------------------
  {
    slug: "pickerel-rush",
    image: {
      path: "plants/pickerel-rush.webp",
      alt: "A stand of pickerel rush with blue-violet flower spikes",
      author: "gailhampshire",
      license: "CC BY 2.0",
      url: "https://commons.wikimedia.org/wiki/File:Pontederia_cordata._Pickerelweed_(25224634868).jpg",
    },
    name: "Pickerel rush",
    latinName: "Pontederia cordata",
    type: "marginal",
    light: "Full sun, six hours or more; tolerates part shade but flowers less",
    difficulty: "easy",
    koiSafe: true,
    koiNotes:
      "Koi are unlikely to eat the rhizomes, stems or leaves (they may take fallen seeds); koi farms list it among the plants koi rarely nibble. Keep it in a basket to stop the rhizome spreading. Not toxic; the seeds and young leaves are edible.",
    hardiness:
      "USDA zones 3 to 10. Dies back at frost; cut it back and keep the crown under about 10 cm of water over winter.",
    planting:
      "7 to 13 cm of water over the crown, up to 30 cm. 60 to 120 cm tall, about 45 to 60 cm across, and it colonises quickly by thick rhizomes, so use aquatic baskets in a small pond.",
    benefits:
      "Nutrient uptake and filtration, vertical cover for fish at the edge, and blue-violet flower spikes from late spring to autumn for bees, butterflies and dragonflies.",
    description:
      "A tall, glossy heart-leaved marginal that sends up spikes of lavender-blue flowers all summer. It sits happily with its roots under a hand-span of water and slowly forms a clump. One of the toughest, most fish-proof shelf plants.",
    nz: {
      status: "unknown",
      note: "Not on the National Pest Plant Accord and no New Zealand pest listing was found. Check with your regional council before buying.",
    },
    sources: [
      { name: "Pond Informer: pickerelweed", url: "https://pondinformer.com/pickerelweed-pontederia-cordata/" },
      { name: "NC State Extension: Pontederia cordata", url: "https://plants.ces.ncsu.edu/plants/pontederia-cordata/" },
      { name: "Kodama Koi Farm: plants for koi ponds", url: "https://www.kodamakoifarm.com/plants-for-koi-ponds/" },
    ],
  },
  {
    slug: "water-iris",
    image: {
      path: "plants/water-iris.webp",
      alt: "A blue Iris laevigata flower among upright leaves",
      author: "Asturio Cantabrio",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Chiryu_Yatsuhashi_Muryojuji_Iris_laevigata_ac_(7).JPG",
    },
    name: "Japanese water iris",
    latinName: "Iris laevigata (and Iris ensata)",
    type: "marginal",
    light: "Full sun",
    difficulty: "easy",
    koiSafe: true,
    koiNotes:
      "The dense root system protects the plant once it is established. Plant in an aquatic basket of soil topped with gravel.",
    hardiness:
      "Fully hardy. Foliage dies back by late autumn; cut it to ground level.",
    planting:
      "Iris laevigata is the true marginal: 5 to 20 cm of water over the crown all year, about 75 cm tall, forming a controlled colony. Iris ensata wants damp, rich, acid soil at the edge and must not be submerged. Divide every three or four years.",
    benefits:
      "Showy early-summer flowers, a root mass that filters water and stabilises the edge, and vertical cover.",
    description:
      "Two Japanese irises with large flat flowers in blues, purples and whites. Iris laevigata is the one for the pond shelf; Iris ensata wants damp but not flooded soil at the pond edge. Both are hardy, calm growers when kept in a basket.",
    nz: {
      status: "unknown",
      note: "No pest listing was found for these two. Do not confuse them with yellow flag iris (Iris pseudacorus), which is on the National Pest Plant Accord: it cannot be sold, its rhizome mats displace native plants, and its seeds are poisonous to birds.",
      url: "https://www.weedbusters.org.nz/what-are-weeds/weed-list/yellow-flag-iris/",
    },
    sources: [
      { name: "RHS: irises for wet soil", url: "https://www.rhs.org.uk/plants/iris/wet-soil/growing-guide" },
      { name: "Pond Informer: aquatic flowering plants", url: "https://pondinformer.com/aquatic-flowering-plants/" },
      { name: "NZPCN: Iris pseudacorus", url: "https://www.nzpcn.org.nz/flora/species/iris-pseudacorus/" },
    ],
  },
  {
    slug: "marsh-marigold",
    image: {
      path: "plants/marsh-marigold.webp",
      alt: "Marsh marigold in flower at a wetland edge",
      author: "GT1976",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:2019-04-25_(147)_Caltha_palustris_(marsh-marigold)_at_J%C3%A4gerlacke,_Texingtal,_Austria.jpg",
    },
    name: "Marsh marigold",
    latinName: "Caltha palustris",
    type: "marginal",
    light: "Full sun, at least six hours",
    difficulty: "easy",
    koiSafe: true,
    koiNotes:
      "Koi do not graze it, which is as well: the leaves contain protoanemonin, an irritant, and fish should not eat the foliage. Wear gloves when handling it and wash your hands afterwards. Keep it up on the shelf or bog edge in a basket.",
    hardiness:
      "USDA zones 3 to 7, hardy well below minus 20 °C. Dies down to the roots at frost, regrows in spring, and may go dormant in a hot dry summer.",
    planting:
      "Crown at water level to a few centimetres deep, in rich boggy soil. 20 to 50 cm tall and about as wide, clump-forming. Cut back after flowering.",
    benefits:
      "Very early spring yellow flowers for bees and hoverflies, and soft cover at the edge.",
    description:
      "A buttercup relative with glossy round leaves and bright yellow cups in early spring, one of the first pond plants to flower. It likes rich boggy soil right at the water's edge. Handle with gloves; the sap is an irritant.",
    nz: {
      status: "naturalised",
      note: "An uncommon garden escape in lowland ponds, slow streams and muddy ground at scattered sites in Waikato, Wellington and Canterbury. Not a listed pest; keep it out of waterways.",
      url: "https://www.nzpcn.org.nz/flora/species/caltha-palustris/",
    },
    sources: [
      { name: "Pond Informer: marsh marigold", url: "https://pondinformer.com/marsh-marigold-caltha-palustris/" },
      { name: "RHS: Caltha palustris", url: "https://www.rhs.org.uk/plants/2803/caltha-palustris/details" },
    ],
  },
  {
    slug: "sweet-flag",
    image: {
      path: "plants/sweet-flag.webp",
      alt: "Sweet flag leaves",
      author: "Krzysztof Ziarnek, Kenraiz",
      license: "CC BY-SA 3.0",
      url: "https://commons.wikimedia.org/wiki/File:Acorus_calamus_kz1.JPG",
    },
    name: "Sweet flag",
    latinName: "Acorus calamus (dwarf: Acorus gramineus)",
    type: "marginal",
    light: "Full sun to part shade",
    difficulty: "easy",
    koiSafe: true,
    koiNotes:
      "Fish may nibble young roots, but established plants are not eaten even by large koi; koi farms list it among the plants koi rarely touch. Baskets recommended once mature. Not a food plant for people (large doses of its oil cause nausea) but not a hazard to fish in a pond.",
    hardiness:
      "USDA zones 4 to 11, hardy to about minus 25 °C. Foliage dies back in frost; the rhizome overwinters.",
    planting:
      "No more than about 22 cm of water over the crown. 60 to 100 cm tall and about as wide, a slow spreader; divide every three or four years. Acorus gramineus is the dwarf, often variegated, form for small ponds.",
    benefits:
      "Filtration, dense aromatic grassy cover for amphibians and insects, edge cover for fish.",
    description:
      "A grassy, iris-like marginal whose leaves smell sweet when crushed. It sits in shallow water or wet mud, forms a tidy clump and is one of the most koi-proof plants you can buy. Slow, hardy and undemanding.",
    nz: {
      status: "unknown",
      note: "No New Zealand pest listing was found and it is not on the National Pest Plant Accord. Check with your regional council before buying.",
    },
    sources: [
      { name: "Pond Informer: sweet flag", url: "https://pondinformer.com/variegated-sweet-flag-acorus-calamus/" },
      { name: "RHS: Acorus calamus", url: "https://www.rhs.org.uk/plants/396/acorus-calamus/details" },
      { name: "Kodama Koi Farm: plants for koi ponds", url: "https://www.kodamakoifarm.com/plants-for-koi-ponds/" },
    ],
  },
  {
    slug: "umbrella-sedge",
    image: {
      path: "plants/umbrella-sedge.webp",
      alt: "Umbrella sedge growing in a koi pond",
      author: "Forest and Kim Starr",
      license: "CC BY 3.0 US",
      url: "https://commons.wikimedia.org/wiki/File:Starr-110307-2006-Cyperus_involucratus-habit_in_koi_pond-Kula_Botanical_Garden-Maui_(24450544823).jpg",
    },
    name: "Umbrella sedge",
    latinName: "Cyperus involucratus (C. alternifolius)",
    type: "marginal",
    light: "Full sun to part shade",
    difficulty: "moderate",
    koiSafe: true,
    koiNotes:
      "Koi rarely disturb the tall stems; fish may peck at submerged parts without harm. Not toxic. Grow it in a pot so the roots stay put.",
    hardiness:
      "USDA zones 9 to 12: tender. It may take brief cold to about 10 °C but frost browns it, so in cold areas overwinter the pot indoors standing in a few centimetres of water.",
    planting:
      "Up to 15 cm of water over the crown, or constantly wet soil. About 90 cm tall (to 150 cm), 60 to 90 cm across. Highly invasive planted in the ground; pot only. Papyrus (Cyperus papyrus) is the much taller tender relative and follows the same rules.",
    benefits:
      "Fast nutrient uptake (it will even absorb heavy metals), tall vertical cover and shade for fish, and an architectural look.",
    description:
      "Stiff green stems topped with a spoke-like whorl of leaves, like little umbrellas. It grows fast in wet soil or shallow water and looks tropical. Keep it in a pot and give it frost protection.",
    nz: {
      status: "unknown",
      note: "No pest listing was found. There is a native alternative: the giant umbrella sedge or upokotangata (Cyperus ustulatus), endemic, Not Threatened, 0.6 to 2 metres tall on wetland margins, easily raised from seed. Its leaf edges are very sharp.",
      url: "https://www.nzpcn.org.nz/flora/species/cyperus-ustulatus/",
    },
    sources: [
      { name: "Pond Informer: umbrella palm", url: "https://pondinformer.com/umbrella-palm-cyperus-alternifolius/" },
      { name: "Kodama Koi Farm: plants for koi ponds", url: "https://www.kodamakoifarm.com/plants-for-koi-ponds/" },
    ],
  },
  {
    slug: "taro",
    image: {
      path: "plants/taro.webp",
      alt: "Dense taro leaves growing beside a creek",
      author: "John Robert McPherson",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Colocasia_esculenta_in_Downfall_Creek_Heinrich_Gerns_Park_Wavell_Heights_P1420624.jpg",
    },
    name: "Taro (elephant ear)",
    latinName: "Colocasia esculenta",
    type: "marginal",
    light: "Full sun (six hours or more) or part shade",
    difficulty: "moderate",
    koiSafe: true,
    koiNotes:
      "Recommended for koi ponds for its big leaves; the sources consulted note no grazing damage. Grow it in a large buried container. Every part is toxic raw, to people and pets, because of calcium oxalate crystals; the corm and leaves are edible only after thorough cooking.",
    hardiness:
      "USDA zones 8 to 11; likes 21 to 28 °C and tolerates down to about 10 °C. Frost kills it: dig the corms before the first frost and store them cool and dry.",
    planting:
      "Corm 5 to 7 cm below the soil in shallow water or constantly moist rich soil. One to nearly two metres tall and as wide; suckers spread, so use a big container.",
    benefits:
      "Big shade leaves for the fish, nutrient uptake, and an edible corm when cooked.",
    description:
      "A lush plant with huge heart-shaped elephant-ear leaves that loves warm, wet feet. It gives a koi pond instant tropical shade but hates frost. Never eat any part raw.",
    nz: {
      status: "naturalised",
      note: "Naturalised since 1867 and widely cultivated; taro is a Māori and Pacific food crop. It seldom flowers or fruits in New Zealand and spreads only by fragments. Not a listed pest.",
      url: "https://www.nzpcn.org.nz/flora/species/colocasia-esculenta/",
    },
    sources: [
      { name: "Pond Informer: taro", url: "https://pondinformer.com/taro-colocasia-esculenta/" },
      { name: "NC State Extension: Colocasia esculenta", url: "https://plants.ces.ncsu.edu/plants/colocasia-esculenta/" },
      { name: "Kodama Koi Farm: plants for koi ponds", url: "https://www.kodamakoifarm.com/plants-for-koi-ponds/" },
    ],
  },
  {
    slug: "watercress",
    image: {
      path: "plants/watercress.webp",
      alt: "Watercress in flower in a shallow stream",
      author: "Zeynel Cebeci",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Nasturtium_officinale_-_Su_teresi.jpg",
    },
    name: "Watercress",
    latinName: "Nasturtium officinale",
    type: "marginal",
    light: "Full sun or part shade; part shade in a hot climate, and full shade kills it",
    difficulty: "easy",
    koiSafe: false,
    koiNotes:
      "Koi dig up and nibble the fleshy roots. Cover the roots thickly with gravel or rocks and it regrows quickly. Edible for people, but wild or pond-grown cress can carry liver fluke and pollutants, so eat only from a clean source.",
    hardiness:
      "USDA zones 3 to 11. Loses its foliage in autumn, overwinters as a basal rosette and resprouts in spring; tolerates light frost.",
    planting:
      "Shallow, ideally cool moving water on the shelf or in a basket. 10 to 50 cm tall and it roots at every node into a metre-wide mat, so it needs holding back.",
    benefits:
      "Rapid nutrient uptake, an edible salad green rich in vitamin C, small white flowers for insects, and surface cover.",
    description:
      "The salad cress: a sprawling, rooting green that grows in cool shallow water and can be picked all season. In a koi pond it needs gravel over its roots or the fish will pull it apart. Fast, useful, and prone to escaping.",
    nz: {
      status: "naturalised",
      note: "Introduced in 1852 as a culinary herb and now common throughout New Zealand; kōwhitiwhiti in Māori. Not a listed pest, but do not let it into streams.",
      url: "https://www.nzpcn.org.nz/flora/species/nasturtium-officinale/",
    },
    sources: [
      { name: "Pond Informer: watercress", url: "https://pondinformer.com/watercress-nasturtium-officinale/" },
      { name: "Minnesota Wildflowers: watercress", url: "https://www.minnesotawildflowers.info/flower/watercress" },
    ],
  },
  {
    slug: "water-mint",
    image: {
      path: "plants/water-mint.webp",
      alt: "A lilac water mint flower head with foliage",
      author: "Andreas Eichler",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:2014.07.31.-08-Vogelstangsee_Mannheim--Wasserminze.jpg",
    },
    name: "Water mint",
    latinName: "Mentha aquatica",
    type: "marginal",
    light: "Full sun to part shade; full sun for the best flowering",
    difficulty: "easy",
    koiSafe: true,
    koiNotes:
      "Fish are unlikely to eat it because of the strong menthol taste. Plant it on a shallow shelf in a basket. Edible in normal amounts; it contains pulegone, which is toxic in large quantities, so do not let masses of it rot in the pond.",
    hardiness:
      "USDA zones 3 to 10, hardy to about minus 20 °C. Dies back at frost and resprouts in spring.",
    planting:
      "5 to 25 cm of water over the crown, in a basket. 30 to 90 cm tall, spreading half a metre or more a year by rhizomes; the RHS warns it becomes a nuisance if not managed.",
    benefits:
      "An excellent pollinator plant with lilac flower balls in summer, filters pollutants, edge cover, and edible leaves.",
    description:
      "A true mint that lives with its feet in water, with fragrant leaves and lilac flower balls that bees love. It spreads fast, so keep it in a basket on the shelf. Koi ignore its minty taste.",
    nz: {
      status: "cultivated",
      note: "Sold by New Zealand nurseries as a pond-edge and bog plant; no pest listing was found.",
      url: "https://www.wairere.nz/Water-plants/All/Mentha-Aquatica",
    },
    sources: [
      { name: "Pond Informer: water mint", url: "https://pondinformer.com/water-mint-mentha-aquatica/" },
      { name: "RHS: Mentha aquatica", url: "https://www.rhs.org.uk/plants/75995/mentha-aquatica/details" },
    ],
  },
  {
    slug: "raupo",
    image: {
      path: "plants/raupo.webp",
      alt: "Raupō seed heads",
      author: "John Tann",
      license: "CC BY 2.0",
      url: "https://commons.wikimedia.org/wiki/File:Broadleaf_Cumbungi_(Typha_orientalis).jpg",
    },
    name: "Raupō (bulrush)",
    latinName: "Typha orientalis",
    type: "marginal",
    light: "Full sun to part shade",
    difficulty: "moderate",
    koiSafe: true,
    koiNotes:
      "No grazing problem noted. The risk is the plant: its sharp new shoot tips can puncture a pond liner, so never plant it in gravel pockets and keep it in a heavy solid tub. Young shoots, pollen and rhizomes are edible.",
    hardiness:
      "A hardy New Zealand native from coastal to lowland wetlands; herbaceous, dying down in winter.",
    planting:
      "Crown at or just below the surface in a big tub, or on the margin of a large natural pond. Grows to three metres and spreads rapidly by rhizome, more so with nutrient-rich water. Easily raised from fresh seed or division.",
    benefits:
      "Strong nutrient uptake and filtration, nesting and cover for birds, dense edge cover for fish. Raupō was used by Māori for building and its pollen for food.",
    description:
      "The classic tall reed with brown sausage-shaped seed heads. Raupō is the New Zealand native cattail and belongs on the edges of big natural ponds; it will overrun a small lined pond and pierce the liner. Use it in a tub or on a wetland margin only.",
    nz: {
      status: "native",
      note: "Typha orientalis is indigenous and Not Threatened. The Northern Hemisphere great reedmace (Typha latifolia) is on the National Pest Plant Accord and cannot be sold; it has broader, flatter, greyish leaves and very dark spikes. Only plant raupō.",
      url: "https://www.nzpcn.org.nz/flora/species/typha-orientalis/",
    },
    sources: [
      { name: "NC State Extension: Typha latifolia", url: "https://plants.ces.ncsu.edu/plants/typha-latifolia/" },
      { name: "POND Trade Magazine: pond plants and their personalities", url: "https://www.pondtrademag.com/water-garden-pond-plants-and-their-personalities/" },
      { name: "NZPCN: Typha latifolia", url: "https://www.nzpcn.org.nz/flora/species/typha-latifolia/" },
    ],
  },
  {
    slug: "creeping-jenny",
    image: {
      path: "plants/creeping-jenny.webp",
      alt: "Creeping Jenny leaves and yellow flowers",
      author: "Kenraiz",
      license: "CC BY-SA 3.0",
      url: "https://commons.wikimedia.org/wiki/File:Lysimachia_nummularia_kz.jpg",
    },
    name: "Creeping Jenny",
    latinName: "Lysimachia nummularia",
    type: "marginal",
    light: "Full sun to part shade; best leaf colour in sun",
    difficulty: "easy",
    koiSafe: true,
    koiNotes:
      "The low mat sits at the waterline where koi do not uproot it, and it shelters fry and amphibians. Not toxic to fish or pets. Baskets recommended to limit its spread.",
    hardiness:
      "USDA zones 3 to 9. Semi-evergreen; the shoots die back in extended cold and the roots survive.",
    planting:
      "Up to 5 cm of soil or water over the crown. 5 to 15 cm tall, spreading 30 to 60 cm and onward, rooting at every node; it is aggressive, so contain it and keep it away from lawns and borders.",
    benefits:
      "Softens hard edges and cascades over rocks, yellow summer flowers, cover for fry, nutrient uptake along the margin.",
    description:
      "A low creeping mat of round coin-like leaves (golden in the variety 'Aurea') with small yellow flowers. It trails over the pond edge and into the shallows, hiding liner and stone. Easy and pretty, but it wanders everywhere.",
    nz: {
      status: "naturalised",
      note: "Naturalised since 1907 in damp places in Waikato, Bay of Plenty and Westland, spreading by stem fragments. Not controlled or listed as a pest.",
      url: "https://www.nzpcn.org.nz/flora/species/lysimachia-nummularia/",
    },
    sources: [
      { name: "Pond Informer: creeping Jenny", url: "https://pondinformer.com/creeping-jenny-lysimachia-nummularia/" },
      { name: "NC State Extension: Lysimachia nummularia", url: "https://plants.ces.ncsu.edu/plants/lysimachia-nummularia/" },
    ],
  },
];

export function getPlant(slug: string): Plant | undefined {
  return PLANTS.find((p) => p.slug === slug);
}

export function plantsOfType(type: PlantType): Plant[] {
  return PLANTS.filter((p) => p.type === type);
}
