/* Care guide content, researched and source-checked (2026-07-28).
   Numbers come from veterinary and koi-organisation sources; where a claim is
   folklore (Hanako's age) the text says so. */

export type QuickFact = { label: string; value: string };
export type CareSection = { title: string; paragraphs: string[] };
export type SeasonCare = { season: string; points: string[] };

export const QUICK_FACTS: QuickFact[] = [
  { label: "Temperature", value: "18–25 °C comfortable" },
  { label: "pH", value: "7.0–8.5, stable" },
  { label: "Ammonia & nitrite", value: "0 mg/L, always" },
  { label: "Pond volume", value: "3,800 L+, then ~950 L per koi" },
  { label: "Depth", value: "0.9 m minimum, 1.2 m in cold winters" },
  { label: "Stop feeding below", value: "10 °C" },
  { label: "Adult size", value: "50–60 cm in 3–5 years" },
  { label: "Lifespan", value: "25–35 years, well kept" },
];

export const CARE_SECTIONS: CareSection[] = [
  {
    title: "Water quality comes first",
    paragraphs: [
      "Most koi disease is a water problem before it is a pathogen problem. Ammonia and nitrite should read zero at all times: a cycled biological filter is what holds them there, and anything above about 0.25 mg/L of ammonia calls for an immediate water change. Nitrate is best kept below 10 to 20 mg/L through routine partial water changes.",
      "Aim for a pH of 7.0 to 8.5, but stability matters more than the exact figure. What prevents sudden, potentially lethal pH swings is carbonate buffering, so keep alkalinity around 100 to 250 mg/L as calcium carbonate. Koi adapt to most hardness levels as long as changes are not extreme.",
      "Dissolved oxygen should sit at 6 to 7 mg/L or better. Warm water holds less oxygen while the fish demand more, which is why summer is when ponds crash: cloudy weather, an algae die-off, overfeeding and overstocking are the usual culprits.",
    ],
  },
  {
    title: "Temperature",
    paragraphs: [
      "Koi are comfortable between 18 and 25 °C, and grow best between about 15 and 25 °C. Above roughly 28 °C there is no benefit to more warmth, because oxygen becomes the limiting factor; they survive to around 30 °C with heavy aeration and reduced feeding. Below 5 °C they are dormant, and around 2 °C for any length of time they are close to death.",
      "The number that matters most for health is 12 °C: below it, a koi's immune system is largely shut down. That is why autumn is the time for health checks and treatments, and why quarantine should be run warm.",
      "Change temperature slowly. Keep daily swings under about 3 °C, and never move fish between waters differing by more than three or four degrees.",
    ],
  },
  {
    title: "Pond size and stocking",
    paragraphs: [
      "A practical minimum for a koi pond is about 3,800 litres, then roughly 950 litres per koi, with more space preferred for adults reaching 50 to 70 cm. Depth should be at least 0.9 metres, and 1.2 metres or more where winters are hard, so the fish have a stable cool layer in summer and an unfrozen refuge at the bottom in winter.",
      "The aquarium rule of one inch of fish per ten gallons does not transfer to koi: they produce far more waste per unit of length and they keep growing. Stock for adult size rather than the size at purchase, and only to what your filtration and aeration can genuinely carry. Overstocking drives ammonia and nitrite up and oxygen down, and leads to stunting and chronic disease.",
      "Circulate and filter the whole pond volume once every one to two hours, run mechanical pre-filtration so solids are removed before they break down, and keep aeration running continuously, increasing it in summer.",
    ],
  },
  {
    title: "Feeding",
    paragraphs: [
      "Feed by water temperature, not by habit. Above about 19 °C, a growth food of 35 to 40 per cent protein suits; below about 16 °C, switch to a wheat-germ food at roughly 28 to 32 per cent protein, which koi can still digest in cool water. Below 10 °C, stop feeding altogether.",
      "Frequency scales with temperature: once or twice a week at 5 to 10 °C, three or four times a week around 13 to 15 °C, once or twice a day at 19 to 21 °C, and two to four times a day in the 22 to 24 °C growth window, easing off again above 27 °C.",
      "Overfeeding is the single most common cause of poor water quality in koi ponds. Feed only what is eaten in three to five minutes, remove anything uneaten within twenty minutes, and err on the conservative side.",
    ],
  },
  {
    title: "Health and prevention",
    paragraphs: [
      "The usual problems are white spot (ich), ulcer disease caused by Aeromonas bacteria, gill and skin flukes, and assorted external parasites such as Costia, anchor worm and fish lice. Most are opportunists that appear once water quality or a temperature swing has stressed the fish. Aeromonas outbreaks peak in spring and autumn, when water sits between about 18 and 29 °C.",
      "Koi herpesvirus is the one to take seriously: highly contagious, with reported mortality of 80 to 100 per cent, clinical disease appearing between roughly 16 and 25 °C, and no treatment or antiviral. Survivors can become latent carriers that reactivate under stress, which is how it has spread through the trade. It is a notifiable disease.",
      "Quarantine every new fish. Hobby guidance is two to four weeks; veterinary sources recommend longer, with koi specifically held a minimum of 30 days at around 24 °C, because a cold quarantine can let a herpesvirus carrier pass through undetected. Use dedicated nets per pond or disinfect between them, and never tip a dealer's bag water into your pond.",
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
      "White, yellow, platinum and metallic koi are most at risk, because their skin lacks the protective pigment darker fish have. Sunburn shows as pink or red patches on the back and head, can progress to lesions, and strips the slime coat, which opens the way to parasites and bacteria. Depth is the main defence, since light drops off markedly past a metre, along with floating plants or a shelter. Aim for shade over roughly half to two thirds of the surface, so the pond still gets light.",
      "Scaleless koi, meaning Shusui, Kumonryu, Beni Kumonryu and any doitsu fish, need the same care for the same reason: no scales means more exposure to sun, parasites and injury, and a lost scale is a large open wound. Handle them with a soft net. Their constitution is not weak, though; those lines are often described as robust because they were outcrossed rather than narrowly inbred.",
    ],
  },
  {
    title: "How long they live, how big they get",
    paragraphs: [
      "Most koi reach 50 to 60 cm within three to five years, growing fastest in the first year and slowing markedly after that. Jumbo koi exceed 75 cm and can approach 90 cm in ideal conditions. Final size depends on genetics, pond volume, water quality and feeding, not on age alone.",
      "A well-kept koi commonly lives 25 to 35 years, and many pond koi pass twenty. Poorly kept koi frequently die far younger, so longevity is mostly a measure of the water they were given.",
      "You will read that a scarlet koi named Hanako lived to 226 years, based on growth rings read from one of her scales in 1974. Treat it as folklore: there is no peer-reviewed study of the analysis, and scales are the least accurate way to age a carp.",
    ],
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
      "This is the growth season: feed a high-protein diet two to four times a day in the 22 to 24 °C band, then back off as the water passes about 27 °C.",
      "Watch for algae die-offs and heavy feeding loads, both classic causes of overnight oxygen crashes. Provide shade and keep up partial water changes.",
    ],
  },
  {
    season: "Autumn",
    points: [
      "Step feeding down as the temperature falls, switching back to wheat germ below about 16 °C and stopping at around 10 °C.",
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
  "https://pondinformer.com/koi-feeding-guide/",
  "https://www.merckvetmanual.com/all-other-pets/fish/routine-health-care-of-fish",
  "https://www.woah.org/fileadmin/Home/eng/Health_standards/aahm/current/2.3.06_KHV.pdf",
  "https://pondinformer.com/how-many-koi-in-a-pond/",
  "https://www.kloubeckoi.com/blog/from-fingerling-to-giant-understanding-koi-fish-growth",
  "https://dainichi.com/koi-color-food/",
  "https://pondinformer.com/koi-sunburn-treatment/",
  "https://pondinformer.com/doitsu-koi-guide/",
];
