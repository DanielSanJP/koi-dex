# GENR.7100 Part B: Mid-Point Review

**Topic:** Koi-dex, a reference website about real koi
**Student name:** Daniel Medcalf
**Student number:** 30084125
**Client / sponsor:** Toi Ohomai (Francisco Roldao)
**Repository:** github.com/DanielSanJP/koi-dex (private; assessor access on request)

---

## 1. Introduction

### What the project is and who it is for

Koi-dex is a beginner-friendly reference website about real koi. Information about koi online is scattered across forums and dealer sites, is often written to sell fish, and mixes Japanese terms without explaining them. Koi-dex puts the essentials in one clean, ad-free place: a koi-dex of 22 real varieties, each drawn as a layered illustration; a breeding guide showing which varieties came from which; a care guide; and a pond plants section. It is aimed at someone new to koi, and it is written from New Zealand, which turned out to matter (see Findings). It is a solo project for GENR.7100 with Toi Ohomai as the client, built with Next.js 16, TypeScript and Tailwind CSS v4, reusing my own hand-drawn layered koi artwork and my own design system from earlier personal projects.

### Where I am on the timeline

At the mid-point (end of week 7) the first three milestones are complete and the fourth is about to start:

| Milestone | Planned | Status |
|---|---|---|
| M0 Kickoff: scope, wireframes, repo, proposal | Week 2 | Done |
| M1 Working site: design system, data, koi renderer, six pages | Week 3 | Done |
| M2 Guides complete: breeding depth, care checked against two sources, per-koi notes | Week 5 | Done |
| Weeks 6–7: plants research, mid-point polish and review | Weeks 6–7 | Done |
| M3 Database and plants: Neon + Prisma, seeded tables, plants pages, breeding outcomes | Week 10 | Next |
| M4 Polished and live: responsive/accessibility pass, 404, deploy to Vercel | Week 12 | Later |
| M5 Final delivery: user testing, report, demo | Week 15 | Later |

The site builds green with 30 prerendered routes (home, dex, 22 variety pages, breeding, care, plants) and every commit in the repository maps to a week of the plan.

### What is completed and not completed, and why

**Completed:** all six routes with the full Koi design language; the canvas koi renderer that draws each fish from its layers (one body sprite plus four shared white fin sheets, each tinted by multiplying with the variety's colour); sourced variety notes for all 22 koi; the breeding guide rebuilt as a family tree, pairing explorer, sprite cross cards, spawn funnel and timeline; each koi's page acting as the hub for its own care and breeding information; the care guide expanded to twelve sections with every figure checked against two sources and a new-pond checklist; and the pond plants research (20 species, sources, licensed photos, New Zealand legal status) written up as a data module ready to seed the database.

**Not completed, by design:** the database phase, the plants pages, deployment, the accessibility pass and user testing. The plan deliberately put content research (weeks 3–6) before the database (weeks 8–10) so that the schema is designed from real, finished data rather than guessed at. Everything not yet started is scheduled, and nothing planned for weeks 2–7 has slipped.

### Problems encountered and solutions

- **Drawing the koi.** There is no finished picture of each koi; my artwork is layered, a body plus fins that are tinted per variety, so every fish has to be assembled in the browser. My first canvas version wiped out lower layers when tinting a fin, because the transparent parts of the fin erased what was underneath. Fix: tint each fin on its own offscreen canvas, then stack. The shared fin sheets are large (3440×1856), so I cache decoded images at module level and a page of 22 koi decodes each sheet once.
- **How many koi.** I started at 25 and found three were app-original colourways, not real varieties. Cutting to 22 early avoided building pages for fish that do not exist.
- **The breeding guide was boring.** The first version was accurate but text-only. I redesigned it before touching code (new wireframes) and rebuilt it around the fish themselves.
- **Ancestors with no artwork.** Many varieties descend from fish I have no artwork for (Magoi, Kigoi, Soragoi, Nezu Ogon, German mirror carp). They now appear as named, dashed nodes in the tree, and a section on the breeding page names the real varieties the site has no art for.
- **My own numbers were wrong.** The two-source check in week 5 found the ulcer-disease temperature band inverted (I had warm water; the sources say cool transitional water) and a quarantine figure no source supported. Both were fixed, and the check is now published as a table on the page.
- **Legal reality in New Zealand.** Koi carp are an Unwanted Organism and a noxious fish here, and five of the twenty pond plants I researched are banned pest plants. The site now says so plainly rather than recommending things a New Zealand reader cannot legally do.
- **Tooling.** Headless Chrome will not render narrower than 500 px, which made phone screenshots look broken; I render pages inside a 390 px frame instead. The React Compiler's lint rule rejected setting state inside effects for the checklist and the dex filters; both were rewritten with `useSyncExternalStore`, treating browser storage and the URL as external stores, which is the idiomatic pattern and also removes a load flicker.

## 2. Methodology

### How the methodology from the proposal has been used

The proposal committed to an iterative and incremental (Agile-based) approach with a personal Kanban board and six milestones as short delivery cycles. That is how the work has actually run:

- **Kanban:** an MS Planner board with To do / Doing / Done, one card per major task. Six cards are done at the mid-point; "Set up the Neon database" is next.
- **Milestones as delivery cycles:** each milestone ended with something viewable. M1 was a full working site in week 3; M2 was both guides at their intended depth. Reviewing M1 is what triggered the breeding-guide redesign, which is the point of iterating.
- **Weekly reflection:** a dated `PROJECT_LOG.md` records what actually happened, and each weekly progress update is drafted from it, so the log and the updates stay honest and this review largely wrote itself from them.
- **Version control:** every week's work is a commit on the private GitHub repository, so the history doubles as evidence of progress.
- **Research method:** content is written from sources, every page links its sources, and disputed histories are flagged rather than simplified. In week 5 I added a stricter rule for numbers: two independent sources per figure, and a published verdict per row.

### Where I am in the process

At the end of the content iterations and the start of the build-out iterations. Weeks 3–6 were "research, write, review, revise" loops on the four sections; weeks 8–12 are engineering loops (schema, seed, pages, polish, deploy), and weeks 13–15 close with testing and reporting.

### How effective it has been

Effective, for three reasons. First, small iterations surfaced problems while they were cheap: the koi-count error, the flat breeding page and the wrong care numbers were all caught within a week of being introduced. Second, the written scope rules ("real koi only, no game concepts, no accounts, no e-commerce") have been checked against every new idea; nothing outside them has been added, and the additions that were made (New Zealand legal status, the numbers audit table) are content, not scope. Third, keeping the log made the weekly updates and this review fast and factual.

One honest limitation: with AI-assisted tooling the foundation landed very quickly in the first weeks, which meant the documentation could have fallen behind the code. The log was the fix, and it is why the plan spreads real work across every week rather than front-loading it.

### Processes I am currently engaged in

Polishing what exists (copy, lint, layout on phones), capturing screenshots of every route at desktop and phone width for this review and the final report, and planning the database phase: reading the current Prisma 7 and Neon documentation, and deciding how the phase adds technical depth (see Conclusions).

## 3. Results and findings

### Research undertaken and what it feeds

- **Technical research** into how my existing layered artwork is structured and how the original renderer composited it, so the site could reproduce it. Result: the site draws every koi from a 22-row JSON file and 26 sprite files (about 490 KB), with no runtime dependency on anything else.
- **Content research** for the 22 varieties (name meanings, families, patterns, origins), 15 documented historical crosses, origin years, ancestor varieties, and per-variety care notes, all with sources.
- **Care research** across veterinary and koi-organisation sources (Merck Veterinary Manual, VIN, WOAH, Koi Organisation International, koi farms). Result: 30 figures each checked against two sources.
- **Plants research** for 20 species with two general sources each (RHS, university extension pages, botanical gardens, koi farms) plus a New Zealand status source (NZPCN, Weedbusters, DOC).
- **Legal research** on the status of koi and pond plants in New Zealand (DOC, MPI, NZPCN, Weedbusters).
- **Tool research** on Next.js 16 (bundled docs), Prisma 7 (driver adapters, `prisma.config.ts`, seeding) and Neon (pooled vs direct connection strings), so the database phase uses current APIs.

All of it is on the site or ready to seed the database, and every page links its sources.

### Important results and findings

1. **The rendering recipe is exact.** A koi is one untinted body plus four fin layers drawn into the same rectangle in the order back fin, tail, body, dorsal, side fin, with each fin sheet multiplied by a hex tint. Only Asagi and Shusui use a per-fin override. Reproducing this on canvas gives fish that match the original artwork pixel for pixel.
2. **The variety list is 22, not 25.** Three of the 25 koi in my artwork set are colourways I invented, not real varieties, so they were cut.
3. **Breeding facts are messier than dealer sites suggest.** Founding fish for Sanke and Kumonryu are disputed, Tancho cannot be bred to order, and no cross reliably produces a variety. The guide says so.
4. **Two of my care numbers were wrong and six more were tightened.** Of 30 figures, 16 agreed outright, 6 were close with a differing range, and 8 changed after checking (ulcer band, quarantine minimum, KH, nitrate, filter turnover, herpesvirus temperature, comfortable temperature, and the feeding-frequency table). The old feeding table contradicted the text and was rebuilt.
5. **Koi are a controlled pest in New Zealand.** Possessing noxious fish without approval is an offence, and koi need DOC (and possibly MPI) approval. This is now the first thing on the care guide.
6. **Five of twenty common pond plants are banned here** (water hyacinth, water lettuce, hornwort, Egeria densa, Vallisneria) and two more have banned lookalikes. New Zealand's duckweed and raupō are natives.
7. **Measurable site state at mid-point:** 30 prerendered routes, build compiles in about 1.3 seconds, TypeScript and ESLint clean, 22 koi drawn on canvas, 15 crosses in the family tree, 12 care sections plus a 37-item checklist, 20 plants with licensed photos (2.9 MB total).

### Problems, things that did not work, and changes

- **Tried and dropped:** flat pre-rendered preview images on the dex grid (swapped for the real layered koi, and the previews deleted); a text-only breeding guide (redesigned); a fixed feeding table copied from one source (rebuilt from two); first-choice plant photos for five species (rejected on inspection and replaced); state-in-effect patterns for the checklist and filters (rewritten as external stores).
- **Changed outcomes:** the koi detail page became the per-variety hub for care and breeding, which was not in the original wireframes; New Zealand legal status was added to both the care guide and the plants data; the numbers audit became a visible feature rather than a private check.
- **Changed plan for phase 2:** feedback on the proposal was that a static reference site is a modest technical challenge at Level 7 and that the database phase must carry real weight. I agree, and I have reshaped weeks 8–14 accordingly (below).

## 4. Conclusions

### Conclusions so far

- Reusing my own artwork and design system was the right call: it let the project spend its time on accuracy and content, and the site already looks finished rather than like a prototype.
- The value of a reference site is trust. The two-source rule, the published audit table, the flagged disputes and the New Zealand legal notes are what separate Koi-dex from the dealer sites it was meant to improve on.
- Small iterations with a written log kept a solo project honest and on schedule.
- The static phase delivered early, which confirms the tutor's point: the remaining weeks need to add engineering depth, not just move content into a table.

### Is more research required?

Yes, but it is technical rather than content research: the Prisma 7 driver-adapter setup against Neon, Postgres recursive queries for the lineage tree, WCAG 2.2 AA checks for the accessibility pass, and a short user-testing protocol for week 13.

### Does the scope need to change?

The written scope holds; nothing is being removed. Within it, phase 2 will be deeper than the proposal sketched, so that the database is doing real work rather than mirroring a JSON file:

1. A relational schema with foreign keys (koi, families, plants, breeding_outcomes, sources), Prisma migrations, and a seed script that validates the content modules before inserting them.
2. Lineage computed in the database: a recursive SQL query that returns every ancestor and descendant of a variety, used by the family tree, the pairing explorer and each koi's page.
3. Server-side search across koi and plants using Postgres full-text search, exposed as a small read-only JSON API and used by a site-wide search box.
4. Static generation with on-demand revalidation, so pages stay fast and free to host while data lives in Neon.
5. Automated tests (the tint and lineage logic, the data validation) and a GitHub Actions pipeline that lints, type-checks, tests and builds every push.
6. Practical interactive tools within the care guide (pond volume, stocking and feeding calculators) alongside the existing checklist and pairing explorer.

Each of these fits the existing exclusions (no accounts, no e-commerce, no CMS, no game concepts) and each is a Level 7-appropriate engineering task with a measurable outcome.

### Is the project on target?

Yes. Milestones M0–M2 are complete, weeks 5–7 delivered what the plan asked for, and the buffer week is untouched. The main risk remains the solo team; the mitigation is unchanged (small milestones, everything in git, week 14 as buffer), and the front-loaded content work has effectively added a second buffer for the engineering weeks.

## 5. Additional information

- Figure 1: progress against the week-by-week plan (`docs/screenshots/diagram-progress.png`).
- Figure 2: system architecture, phase 1 and phase 2 (`docs/screenshots/diagram-architecture.png`).
- Figures 3–8: the six routes at desktop and phone width (`docs/screenshots/*-desktop.png`, `*-mobile.png`).
- Table: milestones and status (above).
- Repository commit history, one commit per week of the plan.
- Supporting documents in the repository: `docs/PLAN.md` (scope, data, rendering recipe, decisions log), `docs/REDESIGN.md`, `docs/wireframes.html` and `docs/wireframes-redesign.html`, `docs/Weekly_Reflection/PROJECT_LOG.md` and the weekly updates.
