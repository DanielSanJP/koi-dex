# Koi-dex project log

A factual running log of what happened and when. Each weekly progress update
gets drafted from this log, so it stays honest and the mid-point review and
final report write themselves. Add an entry whenever work happens.

## 2026-08-18 — Week 7: mid-point polish, screenshots, review

- Polish: home page Plants tile now shows a real plant photo instead of
  "Coming soon"; hero and dex copy no longer say "the 22 real koi
  varieties" (overclaim flagged in REDESIGN.md); the dex grid's filters now
  use the URL as their single source of truth via useSyncExternalStore
  (shareable, back-button friendly, no setState-in-effect); the shadcn
  use-mobile hook rewritten the same way. ESLint is now clean apart from
  one <img> warning in an unused admin reference component.
- Screenshots: `scripts/screenshots.sh` captures every route at 1280 px and
  at 390 px (the phone width is rendered inside an iframe because headless
  Chrome will not open narrower than 500 px). Output in `docs/screenshots/`.
- Two supplementary diagrams drawn for the review: progress against the
  week plan, and the system architecture (phase 1 and phase 2).
- Mid-point review written from this log against the Part B template and
  marking criteria: `docs/Weekly_Reflection/MidPoint_Review.md`, and a
  Word version built from the official template with the figures embedded:
  `SchoolAssignments/PartBMidPoint/GENR.7100 Part B - Midpoint Review -
  Daniel Medcalf.docx`.
- Tutor feedback on the proposal (static site is modest at Level 7; the
  database phase must carry technical weight) folded into the review's
  conclusions as a reshaped phase 2: relational schema with FKs and
  migrations, lineage via recursive SQL, Postgres full-text search behind a
  read-only JSON API and a site-wide search box, static generation with
  on-demand revalidation, automated tests plus a GitHub Actions pipeline,
  and calculators in the care guide. Recorded in WEEKLY_PLAN.md as the
  proposed shape of weeks 8–14.
- Note on dates: the week 5, 6 and 7 work was all delivered on 2026-08-18
  (calendar week 5), so weeks 6 and 7 are ahead of the plan; the weekly
  updates are filed by plan week, this log by real date.

## 2026-08-18 — Week 6: pond plants research

- Chose the species list: 20 plants across the three types a koi keeper
  shops for (6 floating, 4 submerged, 10 marginal), deliberately including
  the classic pond plants that turn out to be banned in New Zealand.
- Two research passes (floating + submerged, marginals), each plant with
  two general sources (RHS, NC State Extension, Missouri Botanical Garden,
  Texas A&M AquaPlant, Pond Informer, Kodama) and an NZ status source
  (NZPCN, Weedbusters, DOC, an NZ nursery). Recorded per plant: type,
  light, difficulty, koi-safe plus how to protect it, hardiness, planting
  depth and size, benefits, a plain description, and NZ status.
- NZ findings: water hyacinth, water lettuce, hornwort, Egeria densa and
  Vallisneria are all on the National Pest Plant Accord (cannot be sold or
  moved); yellow flag iris and Typha latifolia are banned lookalikes of the
  water irises and raupō; duckweed here is the native Lemna disperma;
  raupō is native and Not Threatened; taro, watercress, marsh marigold and
  creeping Jenny are naturalised. Several have no NZ statement at all and
  are marked "not listed, check first" rather than guessed.
- Written up as `src/content/plants.ts` (the seed source for the plants
  table; the PLAN.md schema sketch was updated to match the researched
  fields).
- Image approach decided: one Wikimedia Commons photograph per plant,
  licences restricted to CC0 / public domain / CC BY / CC BY-SA and checked
  against the Commons API, vendored as 1200×800 WebP (2.9 MB for all 20)
  with author, licence and file page recorded for a credit line. Five first
  picks were rejected on inspection (a microscope shot of duckweed, dark
  frogbit and Egeria, a muddy taro pond, a meadow for water mint) and
  replaced.
- Plants placeholder page now lists all 20 species by type with a
  thumbnail and NZ status chip; the full pages come with the database.

## 2026-08-18 — Week 5: care guide depth (milestone M2)

- Re-checked every number in the care guide against two independent sources
  each (30 figures: temperature bands, pH/KH, ammonia/nitrite/nitrate,
  oxygen, volume, depth, turnover, feeding thresholds and frequencies, size,
  lifespan, KHV, quarantine, spawning, shade). Recorded all of it in a
  `NUMBERS_CHECK` table that renders on the page with both sources and an
  honest verdict per row.
- Corrections that came out of the check: the Aeromonas ulcer band was wrong
  (guide said 18–29 °C; sources put the danger in cool transitional water,
  ~5–17 °C); "hobby quarantine 2–4 weeks" had no support (now at least four
  weeks); KH tightened to 100–200 mg/L, nitrate to under 20, filter turnover
  to at least once an hour; KHV temperature widened to 16–28 °C with a peak
  at 22–26; comfortable temperature widened to 15–25 °C with 18–25 ideal;
  the old feeding table listed feeds at 5–10 °C while the text said stop
  below 10 °C, so the table was rebuilt as six temperature bands; the
  unsourced "light drops off past 1 m" and "under 3 °C daily swing" claims
  were removed or softened; breeding guide spawning figures widened to
  18–25 °C and 3–7 days to hatch.
- Added four new care sections with sources: filtration and the nitrogen
  cycle (cycling 4–8 weeks, fishless cycling, mechanical vs biological, UV,
  bottom drain and skimmer, rinsing media in pond water); water changes and
  topping up (10–20 % weekly, chlorine vs chloramine, temperature matching,
  salt as a treatment); handling, netting and transport (pan and sock nets,
  bagging, acclimatising, never tipping bag water in); predators and
  jumping (herons, depth and steep sides, netting, why koi jump).
- New-pond checklist: 37 items in six groups (before you dig, building,
  equipment, cycling, first fish, first season), with tick boxes that
  persist in the browser and a progress bar.
- Feeding-by-temperature strip: six flat colour bands, coldest to hottest,
  matching the corrected numbers.
- Found while researching: in New Zealand koi carp are an Unwanted Organism
  (Biosecurity Act 1993) and a noxious fish (Freshwater Fisheries
  Regulations 1983); possessing them without DOC approval is an offence.
  Verified on two DOC pages and added as a callout at the top of the care
  guide and as the first item of the checklist.
- Care page now has an "on this page" jump-link row and anchors on every
  section. Build green; lint back to its two pre-existing errors (dex-grid,
  use-mobile) which are logged for the week 11 polish pass.
- Started the pond-plants research early (it is slow): species list of 20
  chosen and two research passes run, ready to write up in week 6.

## 2026-07-28 — Project kickoff

- Decided scope: a real-koi reference site (22 genuine varieties, care guide,
  breeding guide with documented outcomes, pond plants), using Koi app sprites
  as illustrations. No game concepts.
- Explored the Koi app's database and renderer to understand the data:
  found the app draws every koi as one body sprite + four shared white fin
  sheets tinted by a hex colour, which the website reimplements on canvas.
- Exported the snapshot: `data/koi.json` (22 varieties + fin tints) and
  ~2.8 MB of sprites into `public/assets/`.
- Scaffolded Next.js 16 + TypeScript + Tailwind v4; carried the Koi brand
  over from koi-web (Pally font, design tokens, Lenis smooth scroll, chunky
  button and UI components).
- Made wireframes for all six screens (docs/wireframes.html), three
  revisions as scope tightened.
- Researched variety facts with sources (name meanings, families, patterns,
  origins) and wrote them into the site content.
- Researched breeding and care facts against veterinary, ZNA and koi-farm
  sources: spawning and culling reality, 15 documented historical crosses,
  water chemistry, feeding by temperature, seasonal care, disease and
  quarantine. Every page links its sources; disputed histories (Kumonryu's
  parentage, Sanke's founding fish) are flagged as uncertain rather than
  simplified, and the Hanako 226-year claim is presented as folklore.
- Built all six routes: home, dex grid with search + family filters, 22
  detail pages with canvas composite renders, breeding and care article
  layouts, plants placeholder. `npm run build` green; pushed to GitHub
  (private repo DanielSanJP/koi-dex).

- Reviewed the first build and found the breeding guide too plain and the
  care/breeding content stranded on their own pages. Replanned both
  (docs/REDESIGN.md + docs/wireframes-redesign.html) and rebuilt: breeding
  is now a family tree, a pairing explorer, sprite cross cards, a culling
  funnel and a timeline; the koi detail page became the hub, carrying that
  variety's care notes and its breeding in both directions.
- Switched every koi image on the site to the real sprite composite
  (body plus tinted fin sheets) and deleted the flat preview images.
- Two more research passes: per-variety care notes, and origin years plus
  the ancestor varieties (Magoi, Kigoi, Soragoi, Nezu Ogon, German mirror
  carp, Ki Bekko) that the lineage needed. Added an honest section naming
  the real varieties the site has no artwork for.

<!-- Add new dated entries above this line as work happens. -->
