# Koi-dex project log

A factual running log of what happened and when. Each weekly progress update
gets drafted from this log, so it stays honest and the mid-point review and
final report write themselves. Add an entry whenever work happens.

## 2026-10-12: User test results, the fixes, and the final documents

- Read the week-13 sessions out of Neon with `npm run feedback:report`. One
  session: Mario, laptop, 21 September, all six tasks finished (four
  alone, two the hard way), scores 4 / 4 / 5 for ease, trust and looking
  finished.
- One session cannot rank problems by how many people hit them, and a laptop
  session cannot show what a phone visitor meets.
- Measured the live pages with headless Chrome at 390 x 844, 820 x 1180 and
  1280 x 800 to check what Mario reported. On a phone: Showa's
  Breeding card 1.8 screens down and its Whole lineage panel 2.8; the
  breeding guide 19.1 screens long with the pairing explorer 4.9 screens
  down; the care guide 24 screens long with the quick facts 13.3 screens
  down and the audit table 17.8.
- Five fixes, each standing on Mario's answers or a measurement: jump links
  on every koi page; an "on this page" row and section anchors on the
  breeding guide; quick facts first on a phone, with a "checked against two
  sources" link under the heading and on the feeding strip; a sentence on the
  lineage panel saying to open a fish for its own parents; and the breeding
  guide's "22 varieties" line now counts from the data (56).
- Re-measured after the fixes: koi page jump row 555 px down on a phone,
  quick facts 2.0 screens down instead of 13.3, every jump link resolves, no
  sideways scroll at 390 px. Lint, types, 31 tests and the 94-page production
  build pass.
- Found a flaw in the test itself: task 3 asks about the cross task 2 has
  just shown, and the pairing explorer opens on exactly that pair. Left as it
  is so the sessions stay comparable; logged with a replacement pair for a
  second round.
- `docs/FEEDBACK_LOG.md` filled in (sessions, measurements, ranked problems,
  changes, limits). Week 13 update finished.
- Final report brought up to the site as it stands and checked against the
  database, the test run and the build: 56 varieties, 35 crosses, 379 source
  rows, 59 variety rows, four migrations, 31 tests, 94 prerendered routes,
  five per-fin tints. User-testing blocks written; recommendations now lead
  with a second, real test round on phones and photographs of real koi (the
  one thing Mario asked for twice). The Part C Word file and the Part D
  slides carry the same text and numbers.

- Second pass on the report and slides the same day, after the fixes went
  live (commit bda80de). Every screenshot recaptured from the live site at
  1280 and 390 px wide; the progress and architecture diagrams redrawn with
  the current numbers. Lighthouse (mobile profile) run again on six live
  pages: home 98/96/100/100, /koi 96/96/100/100, /koi/showa 98/96/100/100,
  /care 99/97/100/100, /plants 98/96/100/100, /breeding 85/96/100/100
  (performance / accessibility / best practices / SEO); colour contrast is
  still the only accessibility failure.
- The Part C file had been generated landscape, unlike the template and
  Parts A and B, and five of its figures were taller than the page. Set it
  back to portrait A4 with the template's margins, resized the tables to the
  text width, added page numbers, and rebuilt the figures section: sixteen
  figures sized to fit, kept in `docs/screenshots/report/`, including the
  user test form and the three pages changed by testing at phone width.
- Report gained what the rubric asks for by name: the problem and the gap,
  the four project questions, a "User testing results" section with a task
  table and a before-and-after table, and each question answered in the
  conclusions. Slides: pictures replaced, a 17th slide on what testing
  changed, Lighthouse line updated.

## 2026-10-09: Six more varieties (dex 51–56)

- Artwork arrived for Kage Showa, Ginsui, Kinsui, Sakura Ogon, Beni
  Kikokuryu and Doitsu Sanke, so each got a full entry (site numbers 51–56,
  appended, nothing renumbered). None of them had been an ancestor or
  relative node.
- Each entry researched and source-checked as before, with the American Koi
  Judges Association glossary added for the class definitions. Kinsui,
  Ginsui and Sakura Ogon are shown in Hikarimoyo, Kage Showa and Beni
  Kikokuryu with the Kawarimono, and Doitsu Sanke with the Gosanke as Doitsu
  Kohaku was. Where accounts disagree (Beni Kikokuryu's parents, whether
  Sakura Ogon is the same fish as Platinum Kohaku, Kinsui's class at the
  JNPA) the entry says so.
- Five crosses added: Beni Kumonryu × Kikusui for Beni Kikokuryu (1995), a
  class-level doitsu cross for Doitsu Sanke, class-level metallic crosses
  from Shusui for Kinsui and Ginsui, and a lineage note for Kage Showa; 35
  documented outcomes now.
- Content tests updated for 56 varieties and 35 outcomes, and the tint test
  for the Ginsui and Kinsui dorsal fin overrides.
- Database reseeded and parity re-checked.

## 2026-10-09: Twelve more varieties (dex 39–50)

- Artwork arrived for Karashigoi, Hajiro, Hageshiro, Kage Utsuri, Ki Matsuba,
  Aka Matsuba, Doitsu Kohaku, Kin Matsuba, Gin Matsuba, Orenji Matsuba,
  Kanoko Kohaku and Budo Goromo, so each got a full entry (site numbers
  39–50, appended, nothing renumbered). Kage Utsuri is drawn as the black and
  white Kage Shiro Utsuri, and the entry says so.
- Each entry researched and source-checked as before: the ZNA and JNPA class
  pages, Champion Nishikigoi, Kloubec, Taro Kodama's Pond Trade articles and
  Ray Jordan's history, with dealer pages (Fitz's Fish Ponds, Cotswold Koi,
  Koitoday) where nothing better covered a point. Hajiro, Hageshiro,
  Karashigoi, Kage Utsuri, Kanoko Kohaku and the plain Ki and Aka Matsuba
  are shown with the Kawarimono, the metallic Kin, Gin and Orenji Matsuba
  in Hikarimuji, Budo Goromo in Koromo and Doitsu Kohaku with the Gosanke.
  Where the organisations differ (the ZNA's newer Mujimono class, the JNPA's
  separate Doitsu class) the entry says so.
- Matsuba left the relatives list now that five of its colour forms are
  drawn; the search test now finds Ginrin by its own word instead.
- Seven crosses added: Kigoi × Chagoi for Karashigoi, Kohaku × Hi Asagi for
  Aka Matsuba (late 1950s), Shiro Utsuri × Asagi for Kage Utsuri, a
  class-level doitsu cross for Doitsu Kohaku, and lineage notes for Hajiro,
  Hageshiro and Budo Goromo; 30 documented outcomes now.
- Content tests updated for 50 varieties and 30 outcomes.
- Database reseeded and parity re-checked.

## 2026-10-09: Five more varieties (dex 34–38)

- Artwork arrived for Kin Kikokuryu, Gin Shiro, Kin Showa, Midorigoi and
  Yellow Ogon, so each got a full entry (site numbers 34–38, appended,
  nothing renumbered). None of them had been an ancestor or relative node.
- Each entry researched and source-checked as before, with the JNPA
  variety pages added to Kodama, Champion Nishikigoi, Kloubec, the ZNA class
  pages and Ray Jordan's history. Kin Showa and Gin Shiro are shown in
  Hikari Utsuri, Kin Kikokuryu and Midorigoi with the Kawarimono, and Yellow
  Ogon in Hikarimuji. Where accounts disagree (Kin Kikokuryu's parents, the
  date of the first Yamabuki Ogon, whether Midorigoi stay green as adults)
  the entry says so.
- Yellow Ogon is the Yamabuki Ogon, which the site had treated as a
  refinement within Gold Ogon. The Kigoi × Gold Ogon cross now produces
  Yellow Ogon and cites Ray Jordan's 1957 record, and Gold Ogon's entry now
  describes the original Ogon.
- Four crosses added: Yamabuki Ogon × Shusui for Midorigoi (1963), Kin Showa
  × Kumonryu for Kin Kikokuryu (1998), and class-level Ogon crosses for Kin
  Showa and Gin Shiro; 23 documented outcomes now.
- Content tests updated for 38 varieties and 23 outcomes, and the tint test
  for Midorigoi's dorsal fin override. The search test now finds an
  art-free variety by its own words, since "metallic" alone had become
  crowded with metallic koi. Gold Ogon lost a source page that no longer
  opens. Database reseeded and parity re-checked.

## 2026-10-09: Three more varieties (dex 31–33)

- Artwork arrived for Kikokuryu, Yamato Nishiki and Magoi, which the site
  had only named as relatives or as the root of the lineage, so each got a
  full entry (site numbers 31–33, appended, nothing renumbered).
- Each entry researched and source-checked as before: Kodama, Champion
  Nishikigoi, the ZNA class pages and Ray Jordan's history. Kikokuryu is
  shown in Kawarimono, Yamato Nishiki in Hikari Moyomono. Where accounts
  disagree (Kikokuryu's second parent, how well Yamato Nishiki's origin is
  recorded) the entry says so.
- Added the Sanke × Ogon cross for Yamato Nishiki (1965, Seikichi Hoshino);
  19 documented outcomes now.
- Magoi left the ancestor list, so the family tree's wild-stock row now
  shows it as a drawn koi linking to its page instead of a text label.
- Content tests updated for 33 varieties and 19 outcomes; database reseeded
  and parity re-checked.

## 2026-09-14 — Eight more varieties (dex 23–30)

- Artwork became available for eight real varieties that the site had only
  been naming in prose or as lineage nodes, so each got a full entry:
  Aka Bekko, Ki Bekko, Orange Ogon, Soragoi, Goshiki, Kikusui, Kigoi and
  Nezu Ogon (site numbers 23–30, appended, nothing renumbered).
- Kigoi, Soragoi, Nezu Ogon and Ki Bekko left the ancestor list and Goshiki
  and Kikusui the relatives list; the breeding crosses that named them now
  resolve to illustrated koi. The Ki Utsuri cross now names Ki Bekko as its
  parent, which is what the history actually records.
- Each entry researched and source-checked the same way as the first 22
  (pattern, origin, notes, care, origin year with a confidence level).
- Seed gained a prune step so a variety that changes slug when it moves
  from the ancestor list into the dex cannot collide with its stale row;
  content tests updated for 30 varieties; database reseeded and parity
  re-checked.

## 2026-08-18 — Week 15 (drafted early): final report and presentation

- Live screenshots recaptured from koi-dex.vercel.app; final progress and
  architecture diagrams drawn (`docs/screenshots/*-final.png`).
- Part C report drafted from this log against the template and rubric
  (`docs/Weekly_Reflection/Final_Report.md`; Word version built from the
  official template with 9 figures in `SchoolAssignments/PartCReport/`):
  executive summary, introduction, methodology, results and findings (key
  achievements with numbers, industry context, what did not work), a
  financial summary with a cost-benefit analysis (≈150 h at a nominal
  $30/h = $4,500 time cost, $0 cash; conservative portfolio value $6,000;
  BCR 1.33 with sensitivity), recommendations and conclusions. Week 13
  user-testing results are marked [TODO] until the sessions run.
- Part D presentation drafted (`SchoolAssignments/PartDPresentation/*.pptx`,
  16 slides, speaker notes, brand colours, live screenshots): purpose,
  research questions, scope, method, timeline, architecture, results per
  research question, engineering numbers, user testing [TODO], discussion,
  conclusion, demo route.

## 2026-08-18 — Week 12: deployed to Vercel (milestone M4)

- Daniel re-ran `vercel login` and linked the repo to a `koi-dex` project
  (team daniels-projects, GitHub-connected: two production deployments had
  already built from pushes, running on the content-module fallback because
  no env vars were set yet). Added DATABASE_URL, DIRECT_URL and
  REVALIDATE_SECRET for production and preview, NEXT_PUBLIC_SITE_URL for
  production, then `vercel --prod`: 39 s build, prisma generate on install,
  58 routes prerendered from Neon.
- Live at https://koi-dex.vercel.app. Smoke test from outside: every route
  200 (home 2.5 s cold, koi pages ~0.9 s, plant page 0.6 s), /nope 404,
  /api/koi count 22, /api/search?q=metallic ranked from Postgres,
  /api/plants/lotus, "Whole lineage" present in the Showa HTML, plants grid
  shows the 5 banned chips, sitemap.xml lists 47 URLs with the production
  origin, robots.txt served, /api/revalidate 401 without the secret and 200
  with it (plants tag refreshed).
- Lighthouse (mobile profile) on the live site: home 80/96/100/100, /koi
  97/96/100/100, /koi/showa 96/96/100/100, /care 98/97/100/100, /plants
  82/96/100/100 (performance / accessibility / best practices / SEO). The
  only accessibility failure is colour contrast on the brand-green button
  and chips, already recorded in docs/ACCESSIBILITY.md as a kept trade-off.
  Home and plants LCP are the throttled-4G simulation of a heavier first
  paint (hero canvases + Lenis; photo grid); the content pages are fast.
- Real-phone check on Daniel's own devices still to do (browser-only
  checks were at 390 px). Milestone M4 reached.

## 2026-08-18 — Weeks 12–14: deploy prep, testing plan, stretch features

- Week 12 (deployment): pushed `main` to GitHub; the CI workflow ran green
  on GitHub in 1m21s (lint, typecheck, 14 tests, content validation, and a
  full build with no secrets). Vercel deploy is blocked on an interactive
  `vercel login` (the stored CLI token had expired), so the runbook was
  written instead: `docs/DEPLOY.md` (project link, the four environment
  variables, `npm run deploy`, the re-seed → revalidate loop, schema-change
  cautions, a go-live checklist).
- Week 13 (testing): automated tests and CI are in place from week 11; the
  user-testing protocol (`docs/USER_TESTING.md`: 3–5 people, six tasks
  covering dex, lineage, pairing explorer, a checked number, NZ plant
  status, free browse; post-task questions; scoring; fix loop) and the
  `docs/FEEDBACK_LOG.md` template are ready. Sessions need the live URL and
  real people, so they wait on the deploy.
- Week 14 (stretch, done early while the deploy waits): pond calculator on
  the care page (volume from measurements, stocking capacity at 3,800 L +
  950 L per koi, pump L/h, weekly change 10–20 %, daily feed estimate from
  a length-based weight and the temperature band, all from the guide's own
  figures) and animated koi: the 20 hand-drawn fin frames cycle over 2 s
  while a card or hero is hovered or focused, off under reduced motion; the
  offscreen tint canvas is reused per frame.

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
