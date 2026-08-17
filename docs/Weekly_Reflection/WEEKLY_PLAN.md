# Koi-dex weekly work plan (GENR.7100)

A forward plan that spreads the remaining real work across the term so every
weekly progress update reports genuine progress. How to use it: each week, do
that week's slice (adjust freely), add what actually happened to
`PROJECT_LOG.md`, then draft the weekly template answers from the log. The
updates describe what really happened in that week; this file is the plan,
not the history.

A lot of the foundation landed fast in week 1 with AI assistance (worth
saying so in the reflections; using tools well is part of the story). The
weeks below are the work that is genuinely still ahead.

| Week | Focus | Concrete tasks |
|---|---|---|
| 2 | Understand + document the foundation | Walk every file of the scaffold; write an architecture note in your own words; run the site locally; verify each variety page's facts against its sources |
| 3 | Content editing pass | Rewrite/personalise the variety descriptions; check tone consistency; fix anything the sources contradict |
| 4 | Breeding guide depth | Flesh out the breeding page prose around the documented crosses; add a lineage diagram (even hand-drawn/SVG) |
| 5 | Care guide depth | Expand care sections; sanity-check every number against two sources; add a "new pond checklist" |
| 6 | Plants research | Choose the plant species list; research each (type, light, difficulty, koi-safety) with sources; decide image approach |
| 7 | Mid-point prep | Polish what exists; collect screenshots; write the mid-point review from PROJECT_LOG.md |
| 8 | Neon database setup | Create the Neon project; set up Prisma; write the koi + plants + breeding_outcomes schema; seed koi from JSON |
| 9 | Plants table + pages | Populate the plants table by hand; build /plants grid and detail pages against the DB |
| 10 | Breeding outcomes data | Enter the documented crosses into breeding_outcomes; wire the detail-page breeding strips to it |
| 11 | Polish pass | Responsive/mobile audit, accessibility pass (alt text, focus states, contrast), 404 page, loading states |
| 12 | Deployment | Deploy to Vercel; custom domain if wanted; test the live site on phones; fix what breaks |
| 13 | Testing + feedback | Show the site to a few people; log their feedback; fix the top issues |
| 14 | Buffer + stretch | Catch up on anything slipped, or a stretch feature (animated koi frames on hover, breeding pairing explorer) |
| 15 | Final report | Write the final report from PROJECT_LOG.md; record a demo; submit |

## Reshaping of weeks 8–14 (drafted week 7; working plan from week 8)

Tutor feedback on the proposal: a static reference site is a modest
challenge at Level 7; the database phase and other features must carry
enough technical weight. The rows above stay as the spine; each database
week gets a real engineering deliverable, all inside the written scope
(no accounts, no e-commerce, no CMS, no game concepts).

| Week | Focus (unchanged) | Technical-weight deliverable |
|---|---|---|
| 8 | Neon database setup | Prisma 7 with the Neon driver adapter; relational schema with foreign keys (koi, families, plants, breeding_outcomes, sources); migrations; seed script that validates the content modules (Zod) before inserting; `prisma.config.ts` seed hook |
| 9 | Plants table + pages | Plants grid + detail from the DB; Postgres full-text search across koi and plants (`tsvector`); a small read-only JSON API (`/api/search`, `/api/koi`, `/api/plants`) and a site-wide search box; static generation with on-demand revalidation (secret-protected route) so hosting stays free |
| 10 | Breeding outcomes data | `breeding_outcomes` with FKs; lineage computed in the database with a recursive CTE (all ancestors and descendants of a variety); family tree, pairing explorer and koi pages read it; parity check against the old in-code list |
| 11 | Polish pass | Responsive + accessibility audit against WCAG 2.2 AA (Lighthouse + manual keyboard/screen-reader pass), 404 and loading states, image pipeline for plant photos |
| 12 | Deployment | Vercel with Neon env vars (pooled + direct URLs), GitHub Actions: lint, type-check, test, build on every push; preview deployments per branch |
| 13 | Testing + feedback | Automated tests (Vitest): tint resolution, lineage functions, data validation, API routes; plus the user-testing session |
| 14 | Buffer + stretch | Care-guide calculators (pond volume, stocking, feeding by temperature); animated fin frames on hover if time allows |
