# GENR.7100 Part C: Project Report

**Topic:** Koi-dex, a reference website about real koi
**Student name:** Daniel Medcalf
**Student number:** 30084125
**Client / sponsor:** Toi Ohomai (Francisco Roldao)
**Live site:** https://koi-dex.vercel.app
**Repository:** github.com/DanielSanJP/koi-dex (private; assessor access on request)

---

## Executive Summary

Koi-dex is a free, ad-free reference website about real koi for people new to the hobby. It has four sections: a koi-dex of 22 varieties, each drawn live in the browser from my own layered artwork; a breeding guide built around a family tree, documented crosses and a pairing explorer; a care guide in which every figure was checked against two independent sources; and a pond plants section of 20 species with their legal status in New Zealand.

The problem it addresses is that koi information online is scattered, commercial and inconsistent, and rarely shows the varieties clearly side by side. The solution is one trustworthy site where every claim links its sources and every uncertainty is flagged rather than smoothed over.

The project ran over the 15-week course as planned. All five milestones were delivered: scope and proposal (M0), a working site (M1), both guides at depth (M2), a Neon Postgres database with Prisma serving the whole site plus search and a JSON API (M3), and a polished, accessible site deployed on Vercel (M4). The final report and presentation are M5. In response to proposal feedback that a static site was a modest challenge at Level 7, the database phase was deepened: a relational schema with foreign keys and validated seeding, lineage computed with recursive SQL, full-text search in Postgres behind a read-only API, static generation with on-demand revalidation, automated tests and continuous integration, and a content-module fallback so the site builds with no secrets.

The project cost nothing in cash (all tools and hosting on free tiers) and about 150 hours of my time. Against a conservative market value for a comparable build, the cost-benefit ratio is about 1.3 before counting the learning, the portfolio value or the public benefit, which is where most of the value actually sits.

## Introduction

### What the project is and who it is for

Koi-dex (https://koi-dex.vercel.app) is a beginner-friendly encyclopedia of real koi. Its audience is someone thinking about, or just starting, keeping koi: what each variety looks like, where it came from, how varieties are bred, how to keep the fish alive and well, and which pond plants suit a koi pond. It is written from New Zealand, and that turned out to matter: koi are a legally controlled pest here and several classic pond plants are banned, so the site says so plainly instead of recommending things a New Zealand reader cannot legally do.

It is a solo student project for GENR.7100 with Toi Ohomai as client. It is built with Next.js 16, TypeScript and Tailwind CSS v4, uses Neon Postgres with Prisma 7, and reuses two things I already had from earlier personal work: hand-drawn, layered koi artwork (a body plus four fin layers per variety) and a small design system (the Pally typeface, a colour palette, reusable components).

### Where I am on the timeline

At the end of the course, with every planned milestone delivered:

| Milestone | Planned | Delivered |
|---|---|---|
| M0 Kickoff: scope, wireframes, repository, proposal | Week 2 | Week 2 |
| M1 Working site: design system, data, koi renderer, six pages | Week 3 | Week 3 |
| M2 Guides complete: breeding depth, care checked twice, per-koi notes | Week 5 | Week 5 |
| M3 Database and plants: Neon + Prisma, seeded tables, plants pages, breeding data | Week 10 | Week 10 (with search, API and lineage added) |
| M4 Polished and live: accessibility pass, 404, deploy to Vercel | Week 12 | Week 12 |
| M5 Final delivery: user testing, report, demo | Week 15 | Week 15 |

The content weeks (5 to 7) were completed early, which added a second buffer to the engineering weeks. The buffer week (14) was used for the two stretch features, a pond calculator and animated koi, both shipped.

### What is completed and not completed, and why

**Completed:** all six routes plus 22 koi pages and 20 plant pages (58 prerendered routes); the canvas koi renderer with 20-frame hover animation; sourced notes for all 22 varieties; the breeding guide (family tree, pairing explorer, sprite cross cards, spawn funnel, timeline, an honest section on varieties the site has no artwork for); each koi's page as the hub for its care, its breeding in both directions and its whole lineage; the care guide with twelve sections, a 30-figure two-source audit table, a 37-item new-pond checklist, feeding bands and a pond calculator; the plants section with photos, licences and New Zealand status; a Neon Postgres database with three migrations, a validated seed, full-text search, a JSON API and on-demand revalidation; an accessibility pass; tests and CI; and the deployment.

**Not completed at the time of writing:** the user-testing sessions of week 13. The protocol, tasks and feedback log are written and the site is live for it; the sessions need people and a few days. [TODO week 13: replace with the session count and outcome once done.] Everything else in the proposal's scope was delivered, and nothing was removed.

### Problems encountered and solutions

- **Drawing the koi.** There is no finished picture of a koi in my artwork; each fish is a body plus four fins tinted per variety. My first canvas version erased lower layers when tinting a fin. Fix: tint each fin on its own offscreen canvas, then stack; and cache the large shared fin sheets so a page of 22 koi decodes each once. Later, the same offscreen canvas is reused across the 20 animation frames.
- **How many koi.** Started at 25, found three were colourways I had invented, cut to 22 before building pages for them.
- **My own numbers were wrong.** The two-source check found the ulcer-disease temperature band inverted and a quarantine figure no source supported. Both fixed, and the check published as a table.
- **The law in New Zealand.** Koi are an Unwanted Organism and a noxious fish; five of the twenty plants are banned pest plants. Verified on DOC, NZPCN and Weedbusters, and put at the top of the care guide and on every plant page.
- **A migration that went wrong.** Prisma's migration tool cannot describe generated columns, so when I added a small column it also generated statements that dropped my hand-written search columns' indexes, failed part-way, and left the indexes gone. I rewrote the migration by hand to be idempotent, marked the failed one rolled back, re-applied it, and taught the schema about the columns so that a diff against the live database is now empty. Lesson: read every generated migration before applying it.
- **Tooling surprises.** Headless Chrome will not render narrower than 500 px (phone screenshots use a 390 px iframe); the React Compiler lint rule rejected state-in-effect patterns (rewritten with `useSyncExternalStore`, which also removed a load flicker); a hyphen-only token could reach the search query (caught by a unit test, fixed).

## Methodology

### How the proposal's methodology was used

The proposal committed to an iterative and incremental (Agile-based) approach with a personal Kanban board and six milestones as delivery cycles. That is how it ran:

- **Kanban:** an MS Planner board, one card per major task, To do / Doing / Done. All cards but "user testing" and "final report" are done.
- **Milestones as delivery cycles:** every milestone ended with something that worked and could be shown. Reviewing M1 triggered the breeding-guide redesign; reviewing M2's numbers triggered the audit table; the proposal feedback reshaped M3.
- **Weekly reflection:** a dated `PROJECT_LOG.md` records what actually happened, and each weekly update, the mid-point review and this report were drafted from it.
- **Version control:** each week's work is a commit on the private GitHub repository, so the history is evidence of progress; from week 11 every push runs the CI pipeline.
- **Research method:** content is written from sources, every page links its sources, disputed histories are flagged, and from week 5 every number needs two independent sources with a published verdict per row.

### Where I am in the process

At the end of the final iteration: the build-out and polish loops are done, the site is live, and the remaining loop is testing with people, then closing with the report and presentation.

### How effective the methodology was

Effective. Small iterations found problems while they were cheap (the koi count, the flat breeding page, the wrong care numbers, the migration incident, the search bug); the written scope rules held (no accounts, no e-commerce, no CMS, no game concepts, no invented koi); and the log made every written deliverable fast and honest. Its limitation was that early foundation work with AI-assisted tooling landed very quickly, which risked documentation lagging code. The log was the fix, and the plan then spread real work across every week rather than front-loading it.

### Processes I am currently engaged in

Running the user-testing protocol on the live site and fixing what it finds; drafting this report and the presentation from the log; a final tidy of the repository and documentation.

## Results and findings

### Research undertaken and what it fed

- **Technical:** how my layered artwork is structured and how the original renderer composited it, so the site draws every koi from a 22-row JSON file and 26 sprite files exactly as intended; current documentation for Next.js 16 (Cache Components), Prisma 7 (driver adapters, `prisma.config.ts`, seeding) and Neon (pooled vs direct connections) so the database phase used current APIs rather than remembered ones.
- **Content:** the 22 varieties (name meanings, families, patterns, origins), 15 documented crosses with breeders and dates, origin years, ancestor varieties, per-variety care notes; 30 care figures each checked against two sources; 20 plants with two general sources and a New Zealand status source each; and the legal status of koi and pond plants in New Zealand.
- **User research:** [TODO week 13: number of sessions, devices, task completion, scores, top problems and fixes.]

Everything is on the site or seeded into the database, and every page links its sources.

### Key achievements and measurable results

1. **A working, deployed, database-backed site.** 58 prerendered routes at https://koi-dex.vercel.app; production build 39 s; every route returns 200 (koi pages ~0.9 s, plant pages ~0.6 s cold from New Zealand); the 404 works.
2. **The rendering recipe is exact.** One untinted body plus four fin layers in the order back fin, tail, body, dorsal, side fin, each fin multiplied by a hex tint; only Asagi and Shusui use a per-fin override. Reproduced on canvas, with the 20 hand-drawn frames animating on hover.
3. **A relational database doing real work.** Tables for varieties (22 koi + 6 ancestors + 7 relatives), families, breeding outcomes with foreign keys on both parents and the offspring (a null second parent meaning "selection within a line"), plants and sources (177 rows); three migrations; a Zod-validated seed that refuses to run if any cross names an unknown variety or any plant lacks sources or a licensed image.
4. **Lineage computed in SQL.** A recursive query walks up through both parents and down through offspring; each koi page shows its whole ancestry and descendants by generation. A parity check proves the SQL and an independent JavaScript walk agree for all 22 koi.
5. **Search and API.** Weighted `tsvector` columns with GIN indexes; prefix matching; a read-only JSON API (`/api/koi`, `/api/plants`, `/api/search`) with CDN caching; a site-wide search box. An SQL-injection string returns zero hits, and that is a unit test.
6. **Free to run.** Pages are prerendered from Neon with tagged caches, revalidated daily or on demand through a secret-protected endpoint, so the database sees a handful of queries per build rather than per visitor. Vercel Hobby and Neon Free carry it at $0.
7. **Trust made visible.** 30 figures, 16 agreed outright, 6 close, 8 changed after checking; every change recorded on the page. Koi legality and plant bans in New Zealand stated with DOC/NZPCN sources.
8. **Quality measured.** Lighthouse (mobile) on the live site: best practices 100 and SEO 100 on every page tested; accessibility 96 to 97; performance 96 to 98 on the content pages, 80 to 82 on the home page and photo grid under the throttled profile. WCAG 2.2 AA pass with one documented, deliberate exception (brand-green button and chip contrast). 14 unit tests; CI on every push builds the site with no secrets to prove the fallback.
9. **Resilience.** A clone with no database credentials builds the entire site from the in-repo content modules; the CI pipeline exercises exactly that path.

### Industry context

Three trends shaped the technical choices. First, static generation with on-demand revalidation on free serverless tiers (Vercel, Neon) has made it practical to run a database-backed site at zero cost, which is what lets a student project stay live after the course. Second, the shift toward sourced, verifiable content: search engines and AI answer engines increasingly favour pages that cite their sources, and a reference site's value now rests on provenance, which the audit table and per-claim links provide. Third, accessibility and Core Web Vitals are measured, not assumed, and are part of what "finished" means; hence the Lighthouse and WCAG pass rather than a visual sign-off.

### Things that did not work, and changes made

- **Tried and dropped:** flat pre-rendered preview images on the dex grid (swapped for the real layered koi); a text-only breeding guide (redesigned); a feeding table copied from one source (rebuilt from two); five first-choice plant photos (rejected on inspection); state-in-effect patterns (rewritten); a Prisma-generated migration (rewritten by hand); alphabetical family ordering in the database (added a sort order to keep the conventional show-class order the filters use).
- **Changed outcomes:** the koi page became the per-variety hub; New Zealand legal status was added to the care guide and plants; the numbers audit became a visible feature; the database phase was deepened after proposal feedback; a content-module fallback was added so the site never depends on the database being reachable to build.

## Financial summary and cost-benefit analysis

The project had a cash budget of $0 and stayed there. The real cost is time. Figures below are estimates and are labelled as such.

### Costs

| Item | Basis | Cost (NZ$) |
|---|---|---|
| Development time | ~150 hours over 15 weeks (research, build, test, document) at a nominal junior developer rate of $30/h | 4,500 |
| Hosting: Vercel Hobby | free tier | 0 |
| Database: Neon Free | free tier | 0 |
| GitHub (private repo, Actions) | free tier | 0 |
| Software (Node, VS Code, Chrome) | free | 0 |
| Fonts, artwork, design system | own earlier work, already owned | 0 |
| Plant photographs | Wikimedia Commons, CC-licensed with attribution | 0 |
| Domain (optional, not taken) | ~$25/year if a custom domain were wanted | 0 |
| **Total** | | **4,500 (all time), 0 cash** |

Ongoing cost: $0 per year on the free tiers. If traffic ever outgrew them, Vercel Pro (US$20/month) and Neon Launch (US$19/month) would be about NZ$800 per year; the static-first design makes that unlikely for a reference site.

### Benefits

| Benefit | Basis | Value (NZ$) |
|---|---|---|
| A finished portfolio piece | conservative market quote for a comparable six-section, database-backed content site with search and API, built to order: $6,000 to $10,000; the lower figure is used | 6,000 |
| Skills gained | Next.js 16 caching model, Prisma 7 with a serverless database, recursive SQL, full-text search, accessibility auditing, CI; not priced | intangible |
| Public benefit | a free, ad-free, sourced reference; New Zealand biosecurity information (koi legality, banned plants) presented where a beginner will actually read it; not priced | intangible |
| Course credit | GENR.7100 completion; not priced | intangible |

### Cost-benefit

Using only the priced items: benefit $6,000 against cost $4,500 gives a net benefit of $1,500 and a benefit-cost ratio of 1.33. Payback is immediate in cash terms because there is no cash outlay; in time terms the portfolio value exceeds the time cost from the first week the site is live. The unpriced benefits (skills, public value, course credit) all point the same way, so the ratio is a floor. Sensitivity: at a $45/h time value the cost is $6,750 and the priced ratio falls to 0.89, which is why the decision to do the project rests on the learning and the qualification rather than the priced return; at the higher end of the market range ($10,000) the ratio is 2.2. The conclusion holds across that range: for a student, a zero-cash, portfolio-grade build is worth doing.

## Recommendations and conclusions

### Conclusions

- Reusing my own artwork and design system was the right call: the time went into accuracy and engineering, and the site looks finished rather than like a prototype.
- The value of a reference site is trust. The two-source rule, the audit table, the flagged disputes and the New Zealand legal notes are what separate Koi-dex from the dealer sites it was meant to improve on.
- The database phase earned its place. Foreign keys, validated seeding, recursive lineage, search and an API turned "content in a table" into a small system with measurable behaviour, and the fallback means the database is a strength, not a dependency.
- Small iterations, a written log and a CI pipeline kept a solo project honest, on schedule and cheap to change.

### Recommendations

1. **Run and act on the user testing** [TODO week 13: fold in the actual findings], then repeat it once a term while the site is maintained.
2. **Widen the dex** with the varieties the site currently names but cannot draw (Goshiki, Kikusui, Matsuba, Yamato Nishiki and the Ginrin and Doitsu overlays) as artwork becomes available; the schema already holds them as art-free rows.
3. **Add a New Zealand-specific plants and koi-legality page** with regional council contacts, since that turned out to be the most locally useful finding.
4. **Fix the two brand-colour contrast failures** if the design system is ever revised (ink-coloured button text, a darker green for chip text); recorded in `docs/ACCESSIBILITY.md`.
5. **Keep the content pipeline as it is:** edit the content modules, run the validated seed, hit the revalidate endpoint. It is the cheapest safe way to keep the site current.
6. **Consider a custom domain** (about $25 a year) if the site is to be shared beyond the course.

### Is more research required, does the scope need to change, is the project on target?

More research is optional rather than required: the content is sourced and audited, and further work would be additive (more varieties, regional detail). The scope did not need to change; it was met and, in the database phase, exceeded within the written exclusions. The project finished on target: every milestone on its planned week, the buffer week spent on stretch features rather than catch-up.

## Additional information

- Figure 1: progress against the week-by-week plan (`docs/screenshots/diagram-progress-final.png`).
- Figure 2: architecture as deployed (`docs/screenshots/diagram-architecture-final.png`).
- Figures 3–9: the live site, desktop and phone (`docs/screenshots/*`).
- Tables: milestones (above); costs and benefits (above); the 30-figure care audit is on the live care page.
- Repository documents: `docs/PLAN.md`, `docs/REDESIGN.md`, `docs/wireframes*.html`, `docs/ACCESSIBILITY.md`, `docs/DEPLOY.md`, `docs/USER_TESTING.md`, `docs/FEEDBACK_LOG.md`, `docs/Weekly_Reflection/PROJECT_LOG.md`, the weekly updates and the mid-point review; `prisma/schema.prisma` and `prisma/migrations/`; `tests/`; `.github/workflows/ci.yml`.
