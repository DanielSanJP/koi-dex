/* Care guide content, researched and source-checked (2026-07-28), then every
   figure re-checked against two independent sources and expanded with four
   new sections and the new-pond checklist (2026-08-18, week 5).

   Numbers come from veterinary and koi-organisation sources; where a claim is
   folklore (Hanako's age) the text says so. NUMBERS_CHECK below records the
   two sources behind each figure and what changed after checking. */

export type QuickFact = { label: string; value: string };
export type CareSection = { title: string; paragraphs: string[] };
export type SeasonCare = { season: string; points: string[] };
export type Source = { name: string; url: string };
export type NumberCheck = {
  figure: string;
  value: string;
  a: Source;
  b: Source;
  verdict: "agree" | "roughly" | "changed";
  note?: string;
};
export type ChecklistGroup = { title: string; items: string[] };
export type FeedingBand = {
  temp: string;
  food: string;
  frequency: string;
  tone: "cold" | "cool" | "warm" | "peak" | "hot";
};

export const QUICK_FACTS: QuickFact[] = [
  { label: "Temperature", value: "15–25 °C comfortable, 18–25 °C ideal" },
  { label: "pH", value: "7.0–8.5, stable" },
  { label: "KH (alkalinity)", value: "100–200 mg/L, never below ~75" },
  { label: "Ammonia & nitrite", value: "0 mg/L, always" },
  { label: "Nitrate", value: "under 20 mg/L" },
  { label: "Oxygen", value: "6 mg/L minimum, aim for 7–8" },
  { label: "Pond volume", value: "3,800 L+, then ~950 L per koi" },
  { label: "Depth", value: "0.9 m minimum, 1.2 m in cold winters" },
  { label: "Turnover", value: "whole pond through the filter every hour" },
  { label: "Water change", value: "10–20 % a week, dechlorinated" },
  { label: "Stop feeding below", value: "10 °C" },
  { label: "Quarantine", value: "at least 4 weeks, ideally warm" },
  { label: "Adult size", value: "50–60 cm in 3–5 years" },
  { label: "Lifespan", value: "25–35 years, well kept; 50+ possible" },
];

/** New Zealand-specific: koi carp are a legally controlled pest here. Shown
    on the care page before anything else, because it changes whether a reader
    in NZ can keep koi at all. */
export const NZ_NOTE = {
  title: "Keeping koi in New Zealand",
  paragraphs: [
    "This site is written from New Zealand, and in New Zealand koi carp are not an ordinary pet fish. They are classed as an Unwanted Organism under the Biosecurity Act 1993 and as a noxious fish under the Freshwater Fisheries Regulations 1983, because escaped koi have spread through North Island waterways where they muddy the water and damage native habitat.",
    "The practical consequence: possessing, rearing, hatching or moving noxious fish without approval is an offence (a $5,000 fine under the fisheries regulations), and selling, breeding or distributing an Unwanted Organism carries penalties of up to $100,000 and five years' imprisonment under the Biosecurity Act. The Department of Conservation says approval to possess koi must be sought from DOC, and that as an Unwanted Organism koi may also need approval from the Ministry for Primary Industries. Goldfish and ordinary aquarium species need no approval; koi do.",
    "Everything else in this guide is general koi husbandry, and it applies wherever koi are legally kept. If you are in New Zealand, start with DOC before you start with a pond.",
  ],
  sources: [
    {
      name: "DOC: Koi carp (freshwater pests)",
      url: "https://www.doc.govt.nz/nature/pests-and-threats/freshwater-pests/koi-carp/",
    },
    {
      name: "DOC: Possessing freshwater species",
      url: "https://www.doc.govt.nz/get-involved/apply-for-permits/interacting-with-freshwater-species/possessing-freshwater-species/",
    },
    {
      name: "University of Waikato: pest fish factsheet",
      url: "https://researchcommons.waikato.ac.nz/bitstream/10289/9719/7/New%20Zealand%20pest%20fish%20species%20koi%20carp%20and%20gambusia%20-%20fact%20sheet.pdf",
    },
  ],
};

export const CARE_SECTIONS: CareSection[] = [
  {
    title: "Water quality comes first",
    paragraphs: [
      "Most koi disease is a water problem before it is a pathogen problem. Ammonia and nitrite should read zero at all times: a cycled biological filter is what holds them there, and a total-ammonia reading above about 0.25 mg/L is the point to act with a water change (how toxic ammonia actually is depends on pH and temperature, so treat that as a warning level rather than a safe one). Nitrate is best kept under 20 mg/L through routine partial water changes.",
      "Aim for a pH of 7.0 to 8.5, but stability matters more than the exact figure: a drift of about 0.2 over a day is as much as you want to see. What prevents sudden, potentially lethal pH swings is carbonate buffering, so keep alkalinity (KH) around 100 to 200 mg/L as calcium carbonate and never let it fall below about 75. Koi adapt to most hardness levels as long as changes are not extreme.",
      "Dissolved oxygen should never drop below 6 mg/L, and 7 to 8 is the target for a stocked koi pond. Warm water holds less oxygen while the fish demand more, which is why summer is when ponds crash: cloudy weather, an algae die-off, overfeeding and overstocking are the usual culprits.",
    ],
  },
  {
    title: "Filtration and the nitrogen cycle",
    paragraphs: [
      "Everything a koi excretes, and everything left to rot in the pond, becomes ammonia. In a working filter, one group of bacteria (Nitrosomonas) turns ammonia into nitrite, which is also toxic, and a second group (Nitrobacter and Nitrospira) turns nitrite into nitrate, which is far less harmful and is removed by water changes and plants. All of them need oxygen, so a filter has to be aerated as well as fed.",
      "That population takes time to grow. A new biological filter needs roughly four to eight weeks to cycle, longer in cool water, and next to no time passes below about 10 °C because the bacteria all but stop. Cycling without fish, by dosing plain household ammonia to about 5 to 8 mg/L and testing until both ammonia and nitrite fall to zero, is kinder than cycling with a few fish, which puts them through the spikes.",
      "A koi filter has two jobs. Mechanical filtration pulls solids out (leaves, faeces, uneaten food) before they break down; biological filtration houses the bacteria. Solids that reach the biological stage clog it and cut its efficiency, so pre-filter first. A bottom drain pulls settled waste off the floor and a skimmer takes floating debris before it sinks; both are standard on a purpose-built koi pond. A UV clarifier at about 8 to 10 W per 4,000 litres clumps the single-celled algae that turn water green so the filter can catch them; it does nothing for ammonia, and it takes a much stronger steriliser dose and slower flow to kill parasites.",
      "Rinse filter media in a bucket of pond water, never under the tap: chlorine and chloramine kill the bacteria you spent two months growing. Clean one section at a time and leave the rest working; the brown film is the filter.",
    ],
  },
  {
    title: "Temperature",
    paragraphs: [
      "Koi are comfortable between about 15 and 25 °C, and most sources call 18 to 25 °C the ideal band. Above roughly 28 °C there is no benefit to more warmth, because oxygen becomes the limiting factor; they survive to around 30 °C with heavy aeration and reduced feeding. Below about 10 °C they slow sharply, below 5 °C they are dormant, and around 2 °C for any length of time they are close to death.",
      "The number that matters most for health is 12 °C: below it, a koi's immune system is largely shut down. That is why autumn is the time for health checks and treatments, and why quarantine should be run warm.",
      "Change temperature slowly. Keep daily swings to a few degrees at most, and never move fish between waters differing by more than three or four degrees.",
    ],
  },
  {
    title: "Pond size and stocking",
    paragraphs: [
      "A practical minimum for a koi pond is about 3,800 litres, then roughly 950 litres per koi, with more space preferred for adults reaching 50 to 70 cm. Depth should be at least 0.9 metres, and 1.2 metres or more where winters are hard, so the fish have a stable cool layer in summer and an unfrozen refuge at the bottom in winter.",
      "The aquarium rule of one inch of fish per ten gallons does not transfer to koi: they produce far more waste per unit of length and they keep growing. Stock for adult size rather than the size at purchase, and only to what your filtration and aeration can genuinely carry. Overstocking drives ammonia and nitrite up and oxygen down, and leads to stunting and chronic disease.",
      "Turn the whole pond volume through the filter at least once an hour (once every two hours is only enough for a lightly stocked pond), run mechanical pre-filtration so solids are removed before they break down, and keep aeration running continuously, increasing it in summer.",
    ],
  },
  {
    title: "Water changes and topping up",
    paragraphs: [
      "Change 10 to 20 per cent of the water every week, more for a heavily stocked pond, and never much more than a quarter at once. Some keepers let test results rather than the calendar set the schedule, which is fine as long as the tests are actually being done. Topping up after evaporation is not a water change: evaporation takes only the water and leaves nitrate, minerals and any salt behind, so a pond that is only ever topped up slowly concentrates everything you wanted to dilute.",
      "Tap water carries chlorine or chloramine, and fish tolerate no amount of either. Chlorine gasses off in a day or two if water is left standing and aerated; chloramine, which is chlorine bonded to ammonia, does not, so standing water does nothing for it. Use a conditioner that breaks chloramine and neutralises the ammonia it releases, dosed for the volume you are adding.",
      "Match the temperature. Add new water slowly, keep the pond within a degree or two of where it was, and be especially careful with large changes; a change of more than about 3 °C over a day is where fish start to suffer, and small fish are the least tolerant.",
      "Salt is a treatment, not a routine. At 0.1 to 0.3 per cent (1 to 3 grams per litre, raised over about three days) it blocks nitrite uptake at the gills and eases some parasites, but it does not evaporate or filter out, so it stays until removed by water changes, and most pond plants die at 0.3 per cent. Use it deliberately, measure it, and do not treat it as a substitute for changing water.",
    ],
  },
  {
    title: "Feeding",
    paragraphs: [
      "Feed by water temperature, not by habit. Above about 18 °C, a growth food of 35 to 40 per cent protein suits; below about 16 to 18 °C, switch to a wheat-germ food at roughly 28 to 32 per cent protein, which koi can still digest in cool water. Below 10 °C, stop feeding altogether (some veterinary sources draw the line at 12 or 13 °C, and erring warm costs nothing).",
      "Frequency scales with temperature, from a light feed a few times a week in the low teens up to two to four small feeds a day in the 22 to 24 °C growth window, easing off again above about 25 °C and dropping to small feeds every other day past 27 °C. Across a day a koi eats roughly 1 to 4 per cent of its body weight, about 2 per cent being typical.",
      "Overfeeding is the single most common cause of poor water quality in koi ponds. Feed only what is eaten in three to five minutes, remove anything uneaten within twenty minutes, and err on the conservative side.",
    ],
  },
  {
    title: "Handling, netting and transport",
    paragraphs: [
      "Koi are not lifted out of the water in a net. Use a shallow pan net to guide the fish, slowly, into a floating bowl or tub, and a sock net (a soft tube open at both ends) to move it, held horizontal so the spine is never bent. Quick, jerky netting alarms the whole pond and sends fish darting into walls; slow, deliberate movement, once, is safer for the fins and the slime coat than three hurried attempts. Wet your hands before touching a fish and keep any time out of water to seconds.",
      "For transport, a bag needs only enough water to cover the gills and dorsal fin, with the rest of the space filled with oxygen; kept dark and cool, a properly packed bag lasts many hours, though two hours is the sensible planning figure for a hobby move. On arrival, float the sealed bag for ten to thirty minutes to equalise temperature, add pond water in a few steps, then net the fish across. Never tip the bag water into the pond.",
      "New fish often hide and refuse food for a few days. That is normal; feed lightly, keep testing, and give them time.",
    ],
  },
  {
    title: "Health and prevention",
    paragraphs: [
      "The usual problems are white spot (ich), ulcer disease caused by Aeromonas bacteria, gill and skin flukes, and assorted external parasites such as Costia, anchor worm and fish lice. Most are opportunists that appear once water quality or a temperature swing has stressed the fish. Ulcer outbreaks cluster in the cool transitional water of spring and autumn, roughly 5 to 17 °C, when the bacteria are active but the koi's immune system is running at half speed or less; keepers call that band Aeromonas alley.",
      "Koi herpesvirus is the one to take seriously: highly contagious, with reported mortality of 80 to 100 per cent, clinical disease appearing between roughly 16 and 28 °C and worst around 22 to 26 °C, and no treatment or antiviral. Survivors can become latent carriers that reactivate under stress, which is how it has spread through the trade. It is a notifiable disease.",
      "Quarantine every new fish for at least four weeks (four to six is typical), and veterinary sources recommend holding koi a minimum of 30 days at around 24 °C, because a cold quarantine can let a herpesvirus carrier pass through undetected. Use dedicated nets per pond or disinfect between them, and never tip a dealer's bag water into your pond.",
    ],
  },
  {
    title: "Predators, and keeping the fish in the pond",
    paragraphs: [
      "The heron is the predator that matters. It hunts from the edge or standing in shallow water, and it has to be able to reach the fish with its beak, which is the whole basis of the defence: depth (0.9 metres is the usual minimum, not a guarantee), steep sides with no shallow wading margin, and deep water where the fish like to sit. Cats and, depending on where you live, raccoons, mink and large birds take fish the same way, from the margin.",
      "Properly fitted netting is the one dependable defence and the only one that also stops fish leaving. Beyond that: caves, tunnels or an overhanging ledge to hide under, floating plants to break the sightline, and a motion-activated sprinkler. Decoys work until the heron realises the plastic one never moves.",
      "Koi jump. New fish do it most, and otherwise it usually means something is wrong: ammonia, nitrite or a pH or KH problem irritating the gills, low oxygen, parasites, heat, or a spawning chase. Net a new pond for the first weeks, keep the water level a little down, and if an established fish starts jumping, test the water that day.",
    ],
  },
  {
    title: "Colour, diet and the white ground",
    paragraphs: [
      "Colour-enhancing foods built on spirulina, krill or astaxanthin do strengthen red, but there is a documented cost on any koi carrying white. A koi has no colour cells in its white to put carotenoid pigment into, so the white blows out with pink, yellow or beige, usually showing on the head and cheeks first. It fades again once the food is stopped or reduced.",
      "That trade-off is why Kohaku, Sanke, Showa, Shiro Utsuri, Bekko, Koromo, Tancho and the platinum-based metallics are usually fed a plain staple. Solid red or brown varieties with no white have nothing to lose and are commonly fed for colour. If you show fish, the standard advice is to keep colour-fed Kohaku in a separate pond from Bekko and Shiro Utsuri; for an ordinary garden pond, there is no need to separate anything.",
      "Keepers also report that hard, alkaline water favours darker black while soft water lifts red, and that hard water brings out small black freckles on white grounds. This is long-standing hobby consensus rather than proven science, and worth treating as such.",
    ],
  },
  {
    title: "Sun, shade and light-coloured koi",
    paragraphs: [
      "Sunlight is needed rather than merely tolerated: colour foods cannot do their work without it. The problem is excess. Too much sun in very warm water gives fish a brassy cast, and an unshaded shallow pond causes outright sunburn.",
      "White, yellow, platinum and metallic koi are most at risk, because their skin lacks the protective pigment darker fish have. Sunburn shows as pink or red patches on the back and head, can progress to lesions, and strips the slime coat, which opens the way to parasites and bacteria. Depth is the main defence, since far less light reaches the bottom of a deep pond, along with floating plants or a shelter. Aim for shade over roughly half to two thirds of the surface, so the pond still gets light.",
      "Scaleless koi, meaning Shusui, Kumonryu, Beni Kumonryu and any doitsu fish, need the same care for the same reason: no scales means more exposure to sun, parasites and injury, and a lost scale is a large open wound. Handle them with a soft net. Their constitution is not weak, though; those lines are often described as robust because they were outcrossed rather than narrowly inbred.",
    ],
  },
  {
    title: "How long they live, how big they get",
    paragraphs: [
      "Most koi reach 50 to 60 cm within three to five years, growing fastest in the first year and slowing markedly after that. Jumbo koi exceed 75 cm and can approach 90 cm in ideal conditions. Final size depends on genetics, pond volume, water quality and feeding, not on age alone.",
      "A well-kept koi commonly lives 25 to 35 years, many pond koi pass twenty, and with exceptional care fifty is possible. Poorly kept koi frequently die far younger, so longevity is mostly a measure of the water they were given.",
      "You will read that a scarlet koi named Hanako lived to 226 years, based on growth rings read from one of her scales in 1974. Treat it as folklore: there is no peer-reviewed study of the analysis, and scales are the least accurate way to age a carp.",
    ],
  },
];

/** Feeding by water temperature, coldest first. Same figures as the Feeding
    section; sources: Pond Informer feeding guide, Hikari, K.O.I. nutrition. */
export const FEEDING_BANDS: FeedingBand[] = [
  {
    temp: "Below 10 °C",
    food: "Nothing",
    frequency: "Digestion has stopped. Uneaten food only fouls the water.",
    tone: "cold",
  },
  {
    temp: "10–15 °C",
    food: "Wheat germ, 28–32 % protein",
    frequency:
      "One or two light feeds a week in the low teens, three or four by 15 °C, and only if the fish are looking for food.",
    tone: "cool",
  },
  {
    temp: "16–18 °C",
    food: "Wheat germ, moving to growth food",
    frequency: "Once a day. Switch to the higher-protein food as it steadies at 18 °C.",
    tone: "warm",
  },
  {
    temp: "19–21 °C",
    food: "Growth food, 35–40 % protein",
    frequency: "Once or twice a day.",
    tone: "warm",
  },
  {
    temp: "22–24 °C",
    food: "Growth food",
    frequency: "Two to four small feeds a day. The growth window.",
    tone: "peak",
  },
  {
    temp: "25 °C and up",
    food: "Growth food, less of it",
    frequency:
      "Once or twice a day, easing to small feeds every other day past 27 °C as oxygen becomes the limit.",
    tone: "hot",
  },
];

/** The new-pond checklist, in build order. Numbers are the ones checked in
    NUMBERS_CHECK; the rest is standard practice from the sources listed. */
export const NEW_POND_CHECKLIST: ChecklistGroup[] = [
  {
    title: "Before you dig",
    items: [
      "Check the rules where you live. In New Zealand koi are a controlled pest: talk to DOC (and MPI) before anything else.",
      "Pick a spot in part shade. Full sun all day drives algae; no sun at all and nothing grows.",
      "Stay clear of overhanging trees. A season of leaves on the bottom is a season of ammonia.",
      "Confirm the ground is level enough and that a hose and mains power can reach it.",
      "Decide the size now, and go bigger than you think: 3,800 litres minimum, and every extra litre makes the water easier to keep stable.",
      "Sketch where the filter, pump and any UV will live, and how you will get to them to clean them.",
    ],
  },
  {
    title: "Building",
    items: [
      "Dig to at least 0.9 metres, and 1.2 metres or more if your winters freeze.",
      "Make the sides steep with no shallow wading shelf, so a heron cannot stand in the water.",
      "Choose a flexible liner (EPDM) or a preformed shell; a liner scales better to depth and size.",
      "Fit a bottom drain and a surface skimmer, and shape the floor so water flows toward them.",
      "Run every electrical item through an RCD (GFCI), outdoor-rated, installed by an electrician.",
      "Leave room at the edge for planting and for netting to attach to.",
    ],
  },
  {
    title: "Equipment",
    items: [
      "A pump sized to push the whole pond volume through the filter at least once an hour.",
      "A mechanical pre-filter and a separate biological filter, both easy to open and clean.",
      "An air pump with air stones or a diffuser, running all the time.",
      "A UV clarifier if you want clear water: about 8 to 10 W per 4,000 litres. Optional.",
      "A thermometer and a test kit that covers ammonia, nitrite, nitrate, pH and KH.",
      "A pan net, a sock net, a floating bowl, and a dechlorinator that also handles chloramine.",
      "Netting to cover the pond, at least for the first weeks.",
    ],
  },
  {
    title: "Cycling the filter",
    items: [
      "Fill the pond and dechlorinate the whole volume.",
      "Run the pump, filter and air continuously from day one.",
      "Cycle without fish: dose plain ammonia to about 5 to 8 mg/L and test every few days.",
      "Expect four to eight weeks, longer if the water is cold; there is no shortcut.",
      "Add fish only when ammonia and nitrite both read zero and nitrate has started to rise.",
    ],
  },
  {
    title: "First fish",
    items: [
      "Buy a few small fish, not many large ones. Stock for the adults they will become.",
      "Quarantine new fish for at least four weeks, warm if you can manage it.",
      "Float the sealed bag for ten to thirty minutes, add pond water in steps, then net the fish across.",
      "Never tip the bag water into your pond.",
      "Do not feed on the first day, and feed lightly for the first weeks; new fish load a young filter.",
      "Test ammonia and nitrite every few days for a fortnight after each new fish.",
      "Keep the net on: new koi are the ones that jump.",
    ],
  },
  {
    title: "The first season",
    items: [
      "Change 10 to 20 per cent of the water every week, dechlorinated and within a degree or two of the pond.",
      "Top up evaporation, but do not count top-ups as water changes.",
      "Rinse filter media only in pond water, one section at a time.",
      "Watch for jumping, flashing against the sides, or gasping at the surface, and test the water the same day.",
      "Give shade and cover: floating plants over half to two thirds of the surface, and somewhere to hide.",
      "Keep a log of temperature, test results, feeding and anything you changed. It is the first thing you will want when something goes wrong.",
    ],
  },
];

/** Every figure in the guide, with the two sources it was checked against and
    an honest verdict. Where the check changed the guide, the row says so. */
export const NUMBERS_CHECK: NumberCheck[] = [
  {
    figure: "Comfortable temperature",
    value: "15–25 °C, ideally 18–25 °C",
    a: {
      name: "Koi Organisation International",
      url: "https://koiorganisationinternational.org/koi-articles/water-temperature-and-koi",
    },
    b: {
      name: "Kloubec Koi Farm",
      url: "https://www.kloubeckoi.com/blog/from-fingerling-to-giant-understanding-koi-fish-growth",
    },
    verdict: "changed",
    note: "Was 18–25 °C. Both sources give 15–25 °C as the band; 18–25 kept as the ideal.",
  },
  {
    figure: "Immune system slows below",
    value: "12 °C",
    a: {
      name: "Koi Organisation International",
      url: "https://koiorganisationinternational.org/koi-articles/water-temperature-and-koi",
    },
    b: {
      name: "POND Trade Magazine",
      url: "https://www.pondtrademag.com/what-is-aeromonas-alley/",
    },
    verdict: "agree",
  },
  {
    figure: "pH",
    value: "7.0–8.5, stable (about 0.2 drift a day)",
    a: {
      name: "Kodama Koi Farm",
      url: "https://www.kodamakoifarm.com/how-long-do-koi-fish-live/",
    },
    b: {
      name: "Aquatic Veterinary Services (Dr Sanders)",
      url: "https://cafishvet.com/wp-content/uploads/2013/10/stress-free-water-quality-for-koi-owners.pdf",
    },
    verdict: "agree",
    note: "Merck's reference range is wider (6.5–9.0); the daily-drift figure was added.",
  },
  {
    figure: "KH (alkalinity)",
    value: "100–200 mg/L, never below ~75",
    a: {
      name: "Pond Informer",
      url: "https://pondinformer.com/koi-pond-alkalinity-kh-guide/",
    },
    b: {
      name: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/multimedia/table/normal-reference-ranges-for-routine-water-quality-analysis",
    },
    verdict: "changed",
    note: "Was 100–250. Sources cluster at 75–200 and above 100.",
  },
  {
    figure: "Ammonia and nitrite",
    value: "0 mg/L; act at 0.25 mg/L total ammonia",
    a: {
      name: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/multimedia/table/normal-reference-ranges-for-routine-water-quality-analysis",
    },
    b: {
      name: "Central California Koi Society",
      url: "https://cencalkoi.com/koi-pond-water-quality/",
    },
    verdict: "agree",
    note: "Now says 0.25 is a warning level; toxicity depends on pH and temperature.",
  },
  {
    figure: "Nitrate",
    value: "under 20 mg/L",
    a: {
      name: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/multimedia/table/normal-reference-ranges-for-routine-water-quality-analysis",
    },
    b: {
      name: "Aquatic Veterinary Services (Dr Sanders)",
      url: "https://cafishvet.com/wp-content/uploads/2013/10/stress-free-water-quality-for-koi-owners.pdf",
    },
    verdict: "changed",
    note: "Was 10–20. Both say under 20; the 10 had no source.",
  },
  {
    figure: "Dissolved oxygen",
    value: "6 mg/L minimum, aim for 7–8",
    a: {
      name: "Pond Informer",
      url: "https://pondinformer.com/pond-water-oxygen-guide/",
    },
    b: {
      name: "Koi Organisation International",
      url: "https://koiorganisationinternational.org/koi-articles/elements-water-quality",
    },
    verdict: "roughly",
    note: "Vet floor is 5–6; koi-specific sources push 8. Reworded as minimum plus target.",
  },
  {
    figure: "Pond volume",
    value: "3,800 L minimum, ~950 L per koi",
    a: {
      name: "Kodama Koi Farm",
      url: "https://www.kodamakoifarm.com/how-long-do-koi-fish-live/",
    },
    b: {
      name: "Koi Kompanion",
      url: "https://koikompanion.com/how-big-should-a-koi-pond-be-size-depth-guide/",
    },
    verdict: "agree",
  },
  {
    figure: "Depth",
    value: "0.9 m minimum, 1.2 m in cold winters",
    a: {
      name: "PetMD",
      url: "https://www.petmd.com/fish/koi-fish-care-sheet",
    },
    b: {
      name: "Pond Haven",
      url: "https://pondhaven.com/blogs/guides/why-pond-depth-matters",
    },
    verdict: "agree",
  },
  {
    figure: "Filter turnover",
    value: "whole volume at least once an hour",
    a: {
      name: "Koi Organisation International",
      url: "https://koiorganisationinternational.org/blog-entry/pump-performance-and-turnover",
    },
    b: {
      name: "Kodama Koi Supply",
      url: "https://www.kodamakoisupply.com/pond-filtration-mistakes-how-to-fix/",
    },
    verdict: "changed",
    note: "Was 1–2 hours. K.O.I. treats once an hour as the minimum; two hours only for light stocking.",
  },
  {
    figure: "Filter cycling time",
    value: "4–8 weeks",
    a: {
      name: "Koi Life Expert",
      url: "https://expert.koi-life.com/water-chemistry/the-nitrogen-cycle/",
    },
    b: {
      name: "Kodama Koi Supply",
      url: "https://www.kodamakoisupply.com/pond-filtration-mistakes-how-to-fix/",
    },
    verdict: "agree",
  },
  {
    figure: "Weekly water change",
    value: "10–20 %",
    a: {
      name: "Kloubec Koi Farm",
      url: "https://www.kloubeckoi.com/blog/simple-guide-to-koi-pond-water-changes/",
    },
    b: {
      name: "Koi Life Expert",
      url: "https://expert.koi-life.com/water-chemistry/water-changes/",
    },
    verdict: "agree",
    note: "New this week; the guide had no water-change figure before.",
  },
  {
    figure: "Chlorine and chloramine",
    value: "0; chloramine does not gas off",
    a: {
      name: "Pond Informer",
      url: "https://pondinformer.com/how-to-dechlorinate-pond-water/",
    },
    b: {
      name: "VIN / WSAVA (water quality in koi practice)",
      url: "https://www.vin.com/apputil/project/DefaultAdv1.aspx?pId=24437&SAId=-1&id=9382754",
    },
    verdict: "agree",
    note: "New this week.",
  },
  {
    figure: "Salt as a treatment",
    value: "0.1–0.3 %, short term",
    a: {
      name: "Kodama Koi Farm",
      url: "https://www.kodamakoifarm.com/benefits-salt-koi-pond-why-should-use-it/",
    },
    b: {
      name: "Koi Club of San Diego",
      url: "https://koiclubofsandiego.org/Salt-The-Bottom-Line-on-Salt-Use-in-Ponds",
    },
    verdict: "agree",
    note: "New this week. VIN confirms 0.1–0.3 % blocks nitrite uptake.",
  },
  {
    figure: "Growth food protein",
    value: "35–40 %, above ~18 °C",
    a: {
      name: "Koi Organisation International",
      url: "https://koiorganisationinternational.org/koi-articles/nutrition",
    },
    b: {
      name: "POND Trade Magazine",
      url: "https://www.pondtrademag.com/koi-nutrition/",
    },
    verdict: "roughly",
    note: "Switch point varies 16–18 °C between sources; the guide now says so.",
  },
  {
    figure: "Wheat-germ food",
    value: "28–32 % protein, below ~16–18 °C",
    a: {
      name: "Hikari",
      url: "https://www.hikariusa.com/koi_pond_folder/wheat_germ.html",
    },
    b: {
      name: "Kloubec Koi Farm",
      url: "https://www.kloubeckoi.com/blog/my-koi-are-hungry-feeding-koi-food-after-a-long-winter/",
    },
    verdict: "agree",
  },
  {
    figure: "Stop feeding below",
    value: "10 °C",
    a: {
      name: "Pond Informer",
      url: "https://pondinformer.com/koi-feeding-guide/",
    },
    b: {
      name: "Koi Organisation International",
      url: "https://koiorganisationinternational.org/koi-articles/nutrition",
    },
    verdict: "roughly",
    note: "One vet source says 13 °C. The old feeding table listed feeds at 5–10 °C, which contradicted this; the table was rebuilt.",
  },
  {
    figure: "Feeding frequency by temperature",
    value: "see the bands above",
    a: {
      name: "Pond Informer",
      url: "https://pondinformer.com/koi-feeding-guide/",
    },
    b: {
      name: "Hikari",
      url: "https://www.hikariusa.com/koi_pond_folder/wheat_germ.html",
    },
    verdict: "changed",
  },
  {
    figure: "How much per day",
    value: "1–4 % of body weight, ~2 % typical",
    a: {
      name: "Koi Organisation International",
      url: "https://koiorganisationinternational.org/koi-articles/nutrition",
    },
    b: {
      name: "Pond Informer",
      url: "https://pondinformer.com/koi-feeding-guide/",
    },
    verdict: "agree",
    note: "New this week.",
  },
  {
    figure: "Eat within",
    value: "3–5 minutes",
    a: {
      name: "Pond Informer",
      url: "https://pondinformer.com/koi-feeding-guide/",
    },
    b: {
      name: "Hikari",
      url: "https://www.hikariusa.com/koi_pond_folder/wheat_germ.html",
    },
    verdict: "agree",
  },
  {
    figure: "Adult size",
    value: "50–60 cm in 3–5 years; jumbo 75–90 cm",
    a: {
      name: "Kloubec Koi Farm",
      url: "https://www.kloubeckoi.com/blog/from-fingerling-to-giant-understanding-koi-fish-growth",
    },
    b: {
      name: "Kodama Koi Farm",
      url: "https://www.kodamakoifarm.com/how-long-do-koi-fish-live/",
    },
    verdict: "agree",
  },
  {
    figure: "Lifespan",
    value: "25–35 years, 50+ possible",
    a: {
      name: "Kodama Koi Farm",
      url: "https://www.kodamakoifarm.com/how-long-do-koi-fish-live/",
    },
    b: {
      name: "PetMD",
      url: "https://www.petmd.com/fish/koi-fish-care-sheet",
    },
    verdict: "agree",
    note: "Added that 50+ is possible with exceptional care.",
  },
  {
    figure: "Koi herpesvirus mortality",
    value: "80–100 %",
    a: {
      name: "WOAH Aquatic Manual, ch. 2.3.7",
      url: "https://www.woah.org/fileadmin/Home/eng/Health_standards/aahm/current/chapitre_koi_herpesvirus.pdf",
    },
    b: {
      name: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/exotic-and-laboratory-animals/aquarium-fish/viral-diseases-of-fish",
    },
    verdict: "agree",
  },
  {
    figure: "Koi herpesvirus temperature",
    value: "16–28 °C, worst 22–26 °C",
    a: {
      name: "WOAH Aquatic Manual, ch. 2.3.7",
      url: "https://www.woah.org/fileadmin/Home/eng/Health_standards/aahm/current/chapitre_koi_herpesvirus.pdf",
    },
    b: {
      name: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/exotic-and-laboratory-animals/aquarium-fish/viral-diseases-of-fish",
    },
    verdict: "changed",
    note: "Was 16–25. WOAH says 16–25 (to 28 experimentally); Merck says 22–27. Widened and given a peak.",
  },
  {
    figure: "Quarantine",
    value: "at least 4 weeks; vet minimum 30 days at ~24 °C",
    a: {
      name: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/exotic-and-laboratory-animals/aquarium-fish/viral-diseases-of-fish",
    },
    b: {
      name: "Aquatic Veterinary Services (KHV FAQ)",
      url: "https://cafishvet.com/fish-health-disease/koi-herpes-virus-faqs/",
    },
    verdict: "changed",
    note: "Was \"hobby 2–4 weeks\". No fetched source endorsed two weeks.",
  },
  {
    figure: "Moving fish between waters",
    value: "no more than 3–4 °C apart",
    a: {
      name: "Koi Organisation International",
      url: "https://koiorganisationinternational.org/koi-articles/water-temperature-and-koi",
    },
    b: {
      name: "Pond Informer",
      url: "https://pondinformer.com/pond-water-temperature-guide/",
    },
    verdict: "roughly",
    note: "The old \"under 3 °C a day\" swing figure had no firm source and was softened to \"a few degrees\".",
  },
  {
    figure: "Ulcer (Aeromonas) risk band",
    value: "~5–17 °C, spring and autumn",
    a: {
      name: "POND Trade Magazine",
      url: "https://www.pondtrademag.com/what-is-aeromonas-alley/",
    },
    b: {
      name: "Koi Health",
      url: "https://www.koihealth.info/aeromonas.html",
    },
    verdict: "changed",
    note: "Was 18–29 °C, which was wrong: both sources put the danger in cool transitional water.",
  },
  {
    figure: "Shade over the surface",
    value: "half to two thirds",
    a: {
      name: "Laguna Koi Ponds",
      url: "https://lagunakoi.com/general-algae-control/",
    },
    b: {
      name: "Gardening Know How",
      url: "https://www.gardeningknowhow.com/ornamental/water-plants/wgen/algae-removal.htm",
    },
    verdict: "roughly",
    note: "Sources say 50–70 %. The old claim that light drops off past 1 m had no source and was removed.",
  },
  {
    figure: "Spawning temperature",
    value: "18–25 °C; eggs hatch in 3–7 days",
    a: {
      name: "Kodama Koi Supply",
      url: "https://www.kodamakoisupply.com/koi-breeding-techniques-styles/",
    },
    b: {
      name: "Hydrosphere Water Gardens",
      url: "https://www.pondexperts.ca/pond-advice-tips/koi-spawning-behaviour/",
    },
    verdict: "roughly",
    note: "In the breeding guide. Was 18–24 and 4–7 days; widened to match both sources.",
  },
];

export const SEASONS: SeasonCare[] = [
  {
    season: "Spring",
    points: [
      "Restart feeding only once the water is consistently above 10 °C, beginning with wheat-germ food a few times a week and building slowly as it warms.",
      "Test the water often for the first few weeks. The biological filter is still recolonising after winter and cannot yet handle a full feeding load, so ammonia and nitrite can spike.",
      "This is the highest-risk window for disease: immunity is still suppressed after the cold while pathogens are waking up. Inspect fish for ulcers and parasites as they become active.",
    ],
  },
  {
    season: "Summer",
    points: [
      "Oxygen is the limiting factor. Run aeration continuously and add surface agitation from a waterfall, fountain or diffuser.",
      "This is the growth season: feed a high-protein diet two to four times a day in the 22 to 24 °C band, then back off as the water passes about 25 °C.",
      "Watch for algae die-offs and heavy feeding loads, both classic causes of overnight oxygen crashes. Provide shade and keep up partial water changes.",
    ],
  },
  {
    season: "Autumn",
    points: [
      "Step feeding down as the temperature falls, switching back to wheat germ below about 16 to 18 °C and stopping at around 10 °C.",
      "Clear leaves and debris before they sink, and net the pond if it sits under deciduous trees. Decomposing leaves consume oxygen and release ammonia all winter.",
      "Do health checks, treatments and pond cleaning now, while the fish still have working immune systems. Below about 12 °C their immune response is largely dormant.",
    ],
  },
  {
    season: "Winter",
    points: [
      "Stop feeding entirely below about 10 °C. Koi are dormant, digestion effectively halts, and uneaten food fouls the pond.",
      "Keep an opening in the ice so oxygen can enter and carbon dioxide escape. Use a floating de-icer or aerator, and never smash the ice: the shockwave can injure or kill dormant fish. Pour warm water to reopen a frozen hole.",
      "Do not disturb the warm bottom layer where the koi overwinter. Move air diffusers up to mid-depth, and in hard-freeze climates consider stopping waterfalls that would supercool the whole pond.",
    ],
  },
];

export const CARE_SOURCES: string[] = [
  "https://www.vin.com/apputil/project/DefaultAdv1.aspx?pId=24437&SAId=-1&id=9382754",
  "https://koiorganisationinternational.org/koi-articles/water-temperature-and-koi",
  "https://koiorganisationinternational.org/koi-articles/elements-water-quality",
  "https://koiorganisationinternational.org/koi-articles/nutrition",
  "https://koiorganisationinternational.org/blog-entry/pump-performance-and-turnover",
  "https://www.merckvetmanual.com/multimedia/table/normal-reference-ranges-for-routine-water-quality-analysis",
  "https://www.merckvetmanual.com/exotic-and-laboratory-animals/aquarium-fish/viral-diseases-of-fish",
  "https://www.merckvetmanual.com/all-other-pets/fish/routine-health-care-of-fish",
  "https://www.woah.org/fileadmin/Home/eng/Health_standards/aahm/current/chapitre_koi_herpesvirus.pdf",
  "https://cafishvet.com/wp-content/uploads/2013/10/stress-free-water-quality-for-koi-owners.pdf",
  "https://cafishvet.com/fish-health-disease/koi-herpes-virus-faqs/",
  "https://pondinformer.com/koi-feeding-guide/",
  "https://pondinformer.com/how-many-koi-in-a-pond/",
  "https://pondinformer.com/koi-pond-alkalinity-kh-guide/",
  "https://pondinformer.com/pond-water-oxygen-guide/",
  "https://pondinformer.com/how-to-dechlorinate-pond-water/",
  "https://pondinformer.com/koi-sunburn-treatment/",
  "https://pondinformer.com/doitsu-koi-guide/",
  "https://expert.koi-life.com/water-chemistry/the-nitrogen-cycle/",
  "https://expert.koi-life.com/water-chemistry/water-changes/",
  "https://expert.koi-life.com/filtration/filter-maintenance/",
  "https://expert.koi-life.com/filtration/uv-clarifiers/",
  "https://www.kodamakoisupply.com/pond-filtration-mistakes-how-to-fix/",
  "https://www.kodamakoifarm.com/how-long-do-koi-fish-live/",
  "https://www.kodamakoifarm.com/benefits-salt-koi-pond-why-should-use-it/",
  "https://www.kodamakoifarm.com/how-can-i-safely-transport-koi-fish/",
  "https://www.kloubeckoi.com/blog/from-fingerling-to-giant-understanding-koi-fish-growth",
  "https://www.kloubeckoi.com/blog/simple-guide-to-koi-pond-water-changes/",
  "https://www.pondtrademag.com/what-is-aeromonas-alley/",
  "https://www.pondtrademag.com/netting-and-handling-koi-the-right-way/",
  "https://www.pondtrademag.com/koi-nutrition/",
  "https://www.hikariusa.com/koi_pond_folder/wheat_germ.html",
  "https://www.thepondguy.com/learning-center/how-to-acclimate-koi-and-goldfish-to-your-pond/",
  "https://www.thepondguy.com/learning-center/using-pond-salt-in-koi-ponds/",
  "https://washingtonkoi.org/articles/new-koi/",
  "https://pondacademy.com/how-to-protect-pond-fish-from-predators",
  "https://www.livingwateraeration.com/blogs/news/how-to-protect-pond-from-herons-best-heron-deterrents",
  "https://www.livingwateraeration.com/blogs/news/complete-koi-pond-guide",
  "https://koifishusa.com/blogs/koi-fish/why-do-koi-fish-jump",
  "https://fitzfishponds.com/blog/why-do-koi-fish-jump-out-of-the-pond-how-to-prevent-it/",
  "https://www.koi-fish.com/koi-care/fishless-filter-cycling.html",
  "https://dainichi.com/koi-color-food/",
  "https://www.doc.govt.nz/nature/pests-and-threats/freshwater-pests/koi-carp/",
  "https://www.doc.govt.nz/get-involved/apply-for-permits/interacting-with-freshwater-species/possessing-freshwater-species/",
];
