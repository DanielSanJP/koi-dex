# GENR.7100 Part C: Project Report

**Topic:** Koi-dex, a reference website about real koi
**Student name:** Daniel Medcalf
**Student number:** 30084125
**Client / sponsor:** Toi Ohomai (Francisco Roldao)
**Live site:** https://koi-dex.vercel.app
**Repository:** github.com/DanielSanJP/koi-dex (private; assessor access on request)

---

## Executive Summary

Koi-dex is a free, ad-free reference website about real koi for people new to the hobby. It has four sections: a koi-dex of 56 varieties, each drawn live in the browser from my own layered artwork; a breeding guide built around a family tree, documented crosses and a pairing explorer; a care guide in which every figure was checked against two independent sources; and a pond plants section of 20 species with their legal status in New Zealand.

The problem it addresses is that koi information online is scattered, commercial and inconsistent, and rarely shows the varieties clearly side by side. The solution is one trustworthy site where every claim links its sources and every uncertainty is flagged rather than smoothed over.

The project ran over the 15-week course as planned. All five milestones were delivered: scope and proposal (M0), a working site (M1), both guides at depth (M2), a Neon Postgres database with Prisma serving the whole site plus search and a JSON API (M3), and a polished, accessible site deployed on Vercel (M4). The final report and presentation are M5. The dex itself grew from the 22 varieties of the proposal to 56 as more artwork was drawn, each new variety researched and sourced the same way. In response to proposal feedback that a static site was a modest challenge at Level 7, the database phase was deepened: a relational schema with foreign keys and validated seeding, lineage computed with recursive SQL, full-text search in Postgres behind a read-only API, static generation with on-demand revalidation, automated tests and continuous integration, and a content-module fallback so the site builds with no secrets. The site was then tested with a task-based form built into it; only one real session came in, so the round was filled out with four simulated sessions, and the fixes it led to are live.

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

**Completed:** all six routes plus 56 koi pages and 20 plant pages (94 prerendered routes); the canvas koi renderer with 20-frame hover animation; sourced notes for all 56 varieties; the breeding guide (family tree, pairing explorer, sprite cross cards, spawn funnel, timeline, an honest section on varieties the site has no artwork for); each koi's page as the hub for its care, its breeding in both directions and its whole lineage; the care guide with twelve sections, a 30-figure two-source audit table, a 37-item new-pond checklist, feeding bands and a pond calculator; the plants section with photos, licences and New Zealand status; a Neon Postgres database with four migrations, a validated seed, full-text search, a JSON API and on-demand revalidation; an accessibility pass; tests and CI; the deployment; and a user test that runs on the site itself, with its results logged and its fixes shipped.

**Completed with a limitation:** the user testing of week 13. The plan was three to five people new to koi. One real session came in (a laptop user, all six tasks finished), which is not enough to rank problems by how many people hit them. With my tutor's agreement the set was filled out to five with four simulated sessions: scripted walk-throughs of the same tasks at phone, tablet and laptop sizes, labelled as simulated everywhere, with no times, scores or quotes, and with every fix required to stand on the real session or on a measurement of the live page. Everything else in the proposal's scope was delivered, and nothing was removed.

### Problems encountered and solutions

- **Drawing the koi.** There is no finished picture of a koi in my artwork; each fish is a body plus four fins tinted per variety. My first canvas version erased lower layers when tinting a fin. Fix: tint each fin on its own offscreen canvas, then stack; and cache the large shared fin sheets so a page full of koi decodes each once. Later, the same offscreen canvas is reused across the 20 animation frames.
- **How many koi.** Started at 25, found three were colourways I had invented, cut to 22 before building pages for them. The dex then grew to 56 as new artwork was drawn; a variety is only added once it has artwork and sources.
- **Recruiting testers.** A moderated test needs the tester and me free at the same time, five times over, so I built the test into the site as an unattended form. That solved the scheduling and still produced only one real session. I filled the gap with simulated sessions, said so in every table, and measured the live pages so the findings did not depend on them.
- **My own numbers were wrong.** The two-source check found the ulcer-disease temperature band inverted and a quarantine figure no source supported. Both fixed, and the check published as a table.
- **The law in New Zealand.** Koi are an Unwanted Organism and a noxious fish; five of the twenty plants are banned pest plants. Verified on DOC, NZPCN and Weedbusters, and put at the top of the care guide and on every plant page.
- **A migration that went wrong.** Prisma's migration tool cannot describe generated columns, so when I added a small column it also generated statements that dropped my hand-written search columns' indexes, failed part-way, and left the indexes gone. I rewrote the migration by hand to be idempotent, marked the failed one rolled back, re-applied it, and taught the schema about the columns so that a diff against the live database is now empty. Lesson: read every generated migration before applying it.
- **Tooling surprises.** Headless Chrome will not render narrower than 500 px (phone screenshots use a 390 px iframe); the React Compiler lint rule rejected state-in-effect patterns (rewritten with `useSyncExternalStore`, which also removed a load flicker); a hyphen-only token could reach the search query (caught by a unit test, fixed).

## Methodology

### How the proposal's methodology was used

The proposal committed to an iterative and incremental (Agile-based) approach with a personal Kanban board and six milestones as delivery cycles. That is how it ran:

- **Kanban:** an MS Planner board, one card per major task, To do / Doing / Done. Every card is done; "final report" closes with this document.
- **Milestones as delivery cycles:** every milestone ended with something that worked and could be shown. Reviewing M1 triggered the breeding-guide redesign; reviewing M2's numbers triggered the audit table; the proposal feedback reshaped M3.
- **Weekly reflection:** a dated `PROJECT_LOG.md` records what actually happened, and each weekly update, the mid-point review and this report were drafted from it.
- **Version control:** each week's work is a commit on the private GitHub repository, so the history is evidence of progress; from week 11 every push runs the CI pipeline.
- **Research method:** content is written from sources, every page links its sources, disputed histories are flagged, and from week 5 every number needs two independent sources with a published verdict per row.

### Where I am in the process

At the end of the final iteration: the build-out and polish loops are done, the site is live, the testing loop has run once and its fixes are deployed, and what remains is the close: this report and the presentation.

### How effective the methodology was

Effective. Small iterations found problems while they were cheap (the koi count, the flat breeding page, the wrong care numbers, the migration incident, the search bug, and in the last loop the long pages that testing exposed); the written scope rules held (no accounts, no e-commerce, no CMS, no game concepts, no invented koi); and the log made every written deliverable fast and honest. Its limitation was that early foundation work with AI-assisted tooling landed very quickly, which risked documentation lagging code. The log was the fix, and the plan then spread real work across every week rather than front-loading it.

### Processes I am currently engaged in

Finishing this report and the presentation from the log, and a final tidy of the repository and documentation. The user test and its fix pass are done and written up in `docs/FEEDBACK_LOG.md`.

## Results and findings

### Research undertaken and what it fed

- **Technical:** how my layered artwork is structured and how the original renderer composited it, so the site draws every koi from a 56-row JSON file and 60 sprite files exactly as intended; current documentation for Next.js 16 (Cache Components), Prisma 7 (driver adapters, `prisma.config.ts`, seeding) and Neon (pooled vs direct connections) so the database phase used current APIs rather than remembered ones.
- **Content:** the 56 varieties (name meanings, families, patterns, origins), 35 documented crosses with breeders and dates, origin years, ancestor varieties, per-variety care notes; 30 care figures each checked against two sources; 20 plants with two general sources and a New Zealand status source each; and the legal status of koi and pond plants in New Zealand.
- **User research:** a six-task test run by the site itself at `/feedback` (find a fish, follow its lineage, check a pairing, find a number and say how far you trust it, check whether a plant is legal in New Zealand, a free browse), with consent, per-task timing and the tester's own typed answer for each task. Five sessions: one real (Mario, laptop) and four simulated walk-throughs (two on a phone, one tablet, one laptop), agreed with my tutor when no more real sessions came in and labelled as simulated throughout. The real session finished all six tasks, four alone and two "the hard way", and scored the site 4 for ease, 4 for trust and 5 for looking finished, out of 5. Across all five, finding a fish went cleanly every time and the banned-plant answer was right every time; following a lineage was the hard way in three sessions, and the pairing and the trusted number in two each. Measuring the live pages on a phone explained why: a koi's breeding card started 1.8 screens down, the breeding guide ran to 19 screens with its pairing explorer 4.9 screens down, and the care guide's quick facts sat 13 screens down with the audit table at 18. Five fixes shipped: jump links on every koi page, a contents row on the breeding guide, quick facts first on a phone with a "checked against two sources" link beside the numbers, a hint on the lineage panel, and a stale variety count. The full record is `docs/FEEDBACK_LOG.md`.

Everything is on the site or seeded into the database, and every page links its sources.

### Key achievements and measurable results

1. **A working, deployed, database-backed site.** 94 prerendered routes at https://koi-dex.vercel.app (58 when it went live in week 12, built in 39 s); checked from outside at that deploy, every route returned 200 (koi pages ~0.9 s, plant pages ~0.6 s cold from New Zealand); the 404 works.
2. **The rendering recipe is exact.** One untinted body plus four fin layers in the order back fin, tail, body, dorsal, side fin, each fin multiplied by a hex tint; only five varieties (Asagi, Shusui, Midorigoi, Ginsui and Kinsui) use a per-fin override. Reproduced on canvas, with the 20 hand-drawn frames animating on hover.
3. **A relational database doing real work.** Tables for varieties (56 koi, plus one ancestor and two scale types the site names but does not draw), families, breeding outcomes with foreign keys on both parents and the offspring (a null second parent meaning "selection within a line"), plants and sources (379 rows); four migrations; a Zod-validated seed that refuses to run if any cross names an unknown variety or any plant lacks sources or a licensed image.
4. **Lineage computed in SQL.** A recursive query walks up through both parents and down through offspring; each koi page shows its whole ancestry and descendants by generation. A parity check proves the SQL and an independent JavaScript walk agree for all 56 koi.
5. **Search and API.** Weighted `tsvector` columns with GIN indexes; prefix matching; a read-only JSON API (`/api/koi`, `/api/plants`, `/api/search`) with CDN caching; a site-wide search box. An SQL-injection string returns zero hits, and that is a unit test.
6. **Free to run.** Pages are prerendered from Neon with tagged caches, revalidated daily or on demand through a secret-protected endpoint, so the database sees a handful of queries per build rather than per visitor. Vercel Hobby and Neon Free carry it at $0.
7. **Trust made visible.** 30 figures, 16 agreed outright, 6 close, 8 changed after checking; every change recorded on the page. Koi legality and plant bans in New Zealand stated with DOC/NZPCN sources.
8. **Quality measured.** Lighthouse (mobile) on the live site: best practices 100 and SEO 100 on every page tested; accessibility 96 to 97; performance 96 to 98 on the content pages, 80 to 82 on the home page and photo grid under the throttled profile. WCAG 2.2 AA pass with one documented, deliberate exception (brand-green button and chip contrast). 31 unit tests, 17 of them on the one endpoint a visitor can write to; CI on every push builds the site with no secrets to prove the fallback.
9. **Resilience.** A clone with no database credentials builds the entire site from the in-repo content modules; the CI pipeline exercises exactly that path.
10. **Tested, and changed by the test.** The site carries its own user test, the only place a visitor can write to the database, validated and idempotent. Its findings were measured on the live pages and five fixes shipped from them. On a phone the care guide's quick facts moved from 13 screens down to 2, and a koi's breeding card went from 1.8 screens of scrolling to one tap.

### Industry context

Three trends shaped the technical choices. First, static generation with on-demand revalidation on free serverless tiers (Vercel, Neon) has made it practical to run a database-backed site at zero cost, which is what lets a student project stay live after the course. Second, the shift toward sourced, verifiable content: search engines and AI answer engines increasingly favour pages that cite their sources, and a reference site's value now rests on provenance, which the audit table and per-claim links provide. Third, accessibility and Core Web Vitals are measured, not assumed, and are part of what "finished" means; hence the Lighthouse and WCAG pass rather than a visual sign-off.

### Things that did not work, and changes made

- **Tried and dropped:** flat pre-rendered preview images on the dex grid (swapped for the real layered koi); a text-only breeding guide (redesigned); a feeding table copied from one source (rebuilt from two); five first-choice plant photos (rejected on inspection); state-in-effect patterns (rewritten); a Prisma-generated migration (rewritten by hand); alphabetical family ordering in the database (added a sort order to keep the conventional show-class order the filters use); recruiting three to five testers (one real session; filled out with labelled simulated sessions); task 3 of the user test, which asked about the same cross task 2 had just shown and so never tested the pairing pickers (logged, with a replacement for a second round).
- **Changed outcomes:** the koi page became the per-variety hub; New Zealand legal status was added to the care guide and plants; the numbers audit became a visible feature; the database phase was deepened after proposal feedback; a content-module fallback was added so the site never depends on the database being reachable to build; the dex grew from 22 to 56 varieties; long pages gained jump links and the care guide's quick facts moved to the top on a phone after testing.

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
- The user test was the weakest part of the project and still paid for itself. One real person and four measured walk-throughs found that my longest pages hid their best content on a phone, and that one of my own test questions was flawed. The honest reading is that the site works for a first-time visitor on a laptop and has not yet been watched on a real phone.

### Recommendations

1. **Run a second round of user testing with real people, on phones.** The form, the report script and the log are already in place, so it costs only recruiting. Replace task 3 with a pairing that is not the explorer's default (Sanke and Gold Ogon, for example), and repeat the round once a term while the site is maintained.
2. **Add a photograph of a real koi beside each drawing.** The one real tester asked for this twice. It needs 56 correctly licensed photographs, credited the way the plant photos are.
3. **Keep widening the dex** as artwork becomes available. It has already grown from 22 to 56 varieties this way; the Ginrin and Doitsu scale types are still named without artwork, and the schema holds them as art-free rows.
4. **Add a New Zealand-specific plants and koi-legality page** with regional council contacts, since that turned out to be the most locally useful finding.
5. **Fix the two brand-colour contrast failures** if the design system is ever revised (ink-coloured button text, a darker green for chip text); recorded in `docs/ACCESSIBILITY.md`.
6. **Keep the content pipeline as it is:** edit the content modules, run the validated seed, hit the revalidate endpoint. It is the cheapest safe way to keep the site current.
7. **Consider a custom domain** (about $25 a year) if the site is to be shared beyond the course.

### Is more research required, does the scope need to change, is the project on target?

On the content, more research is optional rather than required: it is sourced and audited, and further work would be additive (more varieties, regional detail). On the users, more is needed: one real session is a start, and a second round with real people on phones is the first recommendation above. The scope did not need to change; it was met and, in the database phase, exceeded within the written exclusions. The project finished on target: every milestone on its planned week, the buffer week spent on stretch features rather than catch-up.

## Additional information

- Figure 1: progress against the week-by-week plan (`docs/screenshots/diagram-progress-final.png`).
- Figure 2: architecture as deployed (`docs/screenshots/diagram-architecture-final.png`).
- Figures 3–9: the live site, desktop and phone (`docs/screenshots/*`).
- Tables: milestones (above); costs and benefits (above); the 30-figure care audit is on the live care page.
- Repository documents: `docs/PLAN.md`, `docs/REDESIGN.md`, `docs/wireframes*.html`, `docs/ACCESSIBILITY.md`, `docs/DEPLOY.md`, `docs/USER_TESTING.md`, `docs/FEEDBACK_LOG.md`, `docs/Weekly_Reflection/PROJECT_LOG.md`, the weekly updates and the mid-point review; `prisma/schema.prisma` and `prisma/migrations/`; `tests/`; `.github/workflows/ci.yml`.
