# Koi-dex project log

A factual running log of what happened and when. Each weekly progress update
gets drafted from this log, so it stays honest and the mid-point review and
final report write themselves. Add an entry whenever work happens.

## 2026-08-18 — Week 11: polish pass, accessibility, tests and CI

- Accessibility audit against WCAG 2.2 AA (`docs/ACCESSIBILITY.md`):
  secondary text alphas raised from 35–50 % to 55–60 % (2.6–4.0:1 was
  failing; now ≥4.7:1); global focus-visible ring; skip link; nav landmark
  with aria-current (and an underline) on the current section; aria-pressed
  on filter chips; reduced-motion media query and Lenis skipped under it;
  branded 404; loading skeletons for the two dynamic detail routes;
  sitemap.xml and robots.txt; metadataBase. Two brand-colour contrast
  failures (white on the green button, green chip text) are recorded as
  conscious deviations rather than silently changed.
- Responsive check at 390 px of the new pages (plants grid, koi detail with
  lineage, 404) via the iframe screenshot trick: no overflow, header fits.
- Tests: Vitest with 14 tests over the pure logic (tint resolution against
  the real koi.json, the tsquery builder incl. an injection string, and the
  content source: 22 koi with families, 15 outcomes with one line-bred row,
  Showa's two-generation ancestry, Kohaku's descendants without loops, 20
  plants with sources/images/5 pest, search fallback). Tint and search-query
  logic extracted into `src/lib/tint.ts` and `src/lib/search-query.ts` so
  the canvas component and the DB source share tested code. Found and fixed
  a real bug: a hyphen-only token ("--") survived into the tsquery.
- CI: `.github/workflows/ci.yml` runs lint, typecheck, tests, content
  validation and a full production build on every push and PR, with NO
  database secrets so the build exercises the content-module fallback.
  `npm run check` does the same locally.
- `scripts/plant-images.py` makes the plant photo pipeline reproducible
  (Commons file page → 1600 px rendition → 3:2 crop → 1200×800 WebP).

## 2026-08-18 — Week 10: breeding and koi pages from the database, lineage (milestone M3)

- One typed data shape for everything the pages read (`src/lib/shapes.ts`:
  Party, Outcome with nullable parent B, KoiSummary/KoiDetail with lineage,
  Relative, PlantSummary/PlantRecord, SearchHit) behind a `DataSource`
  interface with two implementations: `db-source.ts` (Neon via Prisma) and
  `content-source.ts` (the in-repo modules). `queries.ts` picks the
  database when DATABASE_URL is set and the content modules otherwise, so a
  fresh clone builds the whole site with no secrets, which is the fallback
  the proposal promised. Verified: `npm run build` passes with `.env`
  hidden.
- Lineage computed in Postgres: `WITH RECURSIVE` in both directions (all
  ancestors, all descendants, shortest depth), one recursive term walking
  both parents via LATERAL VALUES, self-cross guard so the Showa refinement
  row cannot loop. The content source walks the same graph in JS.
- `scripts/parity-check.ts` diffs every read (22 koi details incl. lineage,
  outcomes, relatives, plants, families) between the two sources: PARITY OK.
  Needed one schema addition, `families.sort_order`, so the database keeps
  the conventional show-class order (Gosanke first) the dex filter uses.
- Koi index, koi detail, breeding page, family tree, pairing explorer, cross
  cards and koi chips all moved to the database shapes (slug-keyed, no more
  name matching); `src/lib/breeding.ts` deleted. New "Whole lineage" panel
  on each koi page groups ancestors and descendants by generation. A null
  parent B renders as a dotted "line-bred selection" chip.
- Migration incident, recorded honestly: Prisma's diff cannot represent the
  generated tsvector columns or GIN indexes, so the `family_sort_order`
  migration it generated also tried to DROP the search defaults and indexes,
  failed part-way, and left the indexes dropped. Fixed by hand-writing an
  idempotent migration (ADD COLUMN IF NOT EXISTS + CREATE INDEX IF NOT
  EXISTS), `migrate resolve --rolled-back`, `migrate deploy`; then the
  schema was taught about the columns (`@default(dbgenerated())`,
  `@@index([search], type: Gin)`) and `migrate diff` against the live
  database is now empty, so future migrations are clean.
- Milestone M3 (database and plants) complete: three migrations, seeded,
  plants pages, koi pages, breeding page and API all served from Neon.

## 2026-08-18 — Week 9: plants from the database, full-text search, API

- Full-text search in Postgres: a hand-written migration adds a stored,
  GENERATED tsvector column to `plants` and `varieties` (name weighted A,
  body text B–D) with GIN indexes; the schema declares them as
  `Unsupported("tsvector")` so Prisma never writes or drops them. First
  attempt failed (`array_to_string` on the care text[] is not IMMUTABLE), so
  care lines are left out of the vector. `to_tsquery` with a prefix on the
  last word gives type-ahead; user input is stripped to word characters and
  passed as a bound parameter, so an injection attempt returns zero hits.
- Next.js Cache Components turned on (`cacheComponents: true`): every DB
  read in `src/lib/queries.ts` is a `"use cache"` scope with `cacheTag`
  (plants / koi / breeding) and `cacheLife("days")`, so the plants pages
  prerender from Neon at build and revalidate daily or on demand.
  `POST /api/revalidate` (bearer secret) calls `revalidateTag(tag, "max")`.
- Plants pages built from the database: `/plants` grid with URL-backed type
  and koi-safe filters (shared `useUrlSearch` hook, also used by the dex
  grid now) and `/plants/[slug]` (photo with Commons credit, chips, NZ
  status callout coloured by status, koi/planting/hardiness/benefits cards,
  sources, prev/next, others of the same type). 20 detail pages
  prerendered.
- Read-only JSON API: `/api/koi`, `/api/koi/:slug`, `/api/plants`,
  `/api/plants/:slug`, `/api/search?q=`, plus `/api/revalidate`; CDN cache
  headers, 404 JSON, CORS open for reads.
- Site-wide search box in the header ("/" opens it): debounced fetch to
  `/api/search`, koi hits drawn from their sprite, plants and art-free
  varieties as text with highlighted snippets.
- Verified end to end on the production build: search ranking, injection
  string, 404s, revalidate 401 without secret and 200 with, page routes.

## 2026-08-18 — Week 8: Neon database, Prisma 7, schema, seed

- Read the current Prisma 7 and Neon docs first: Prisma 7 needs a driver
  adapter (`@prisma/adapter-neon`), keeps the connection URL in
  `prisma.config.ts` rather than the schema, generates the client into the
  project (`src/generated/prisma`, git-ignored, regenerated on install), and
  configures seeding in the config file. Neon wants the pooled URL for the
  app and the direct URL for the CLI.
- Schema (`prisma/schema.prisma`): `families`, `varieties` (one table for
  the 22 drawn koi, the 6 art-free ancestors and the 7 relatives, with a
  `kind`), `breeding_outcomes` with foreign keys on both parents and the
  offspring (parent B nullable = selection within a line, used once, for
  Gold Ogon), `plants`, and `sources` as rows linked to a variety or plant.
  Enums for kind, confidence, plant type, difficulty and NZ status.
- `prisma.config.ts` reads `process.env` directly instead of the `env()`
  helper, because `env()` throws at load and would break `prisma generate`
  wherever no database URL is set (CI, a static build).
- Seed (`prisma/seed.ts`): validates every content module with Zod plus
  cross-module checks (every koi has info and an origin, every family
  exists, every cross party resolves to a variety, every plant has two
  sources and a licensed image) before writing; upserts so it is
  re-runnable. `npm run db:validate` runs only the checks (no DB) for CI.
- Neon project created by Daniel (ap-southeast-2). Credentials moved from
  `.env.example` (never committed: `.env*` was ignored) into `.env`;
  `.env.example` restored to placeholders and un-ignored.
  `npm run db:migrate -- --name init` created `prisma/migrations/
  20260817221154_init`; `npm run db:seed` loaded 10 families, 35 varieties
  (22 koi), 15 breeding outcomes, 20 plants, 177 sources.
- `scripts/db-check.ts` smoke-tests the pooled client and previews the
  recursive lineage query for week 10 (`WITH RECURSIVE` over both parents via
  LATERAL VALUES, with a self-cross guard for the Showa refinement row):
  ancestors of Showa = Kohaku, Ki Utsuri (depth 1), Bekko, Magoi (depth 2).
  First attempt failed with Postgres error 42P19 (recursive reference in the
  non-recursive term); restructured to a single recursive term.
- Tutor's technical-weight feedback: proceeding with the reshaped weeks
  8–14 in WEEKLY_PLAN.md as the working plan.

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
