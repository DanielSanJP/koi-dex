# Koi-dex

A reference website about real koi, built with Next.js. School project.

Four sections:

- **Koi-dex** (`/koi`) — the 22 real koi varieties: composite renders, origin and pattern notes, breeding outcomes
- **Breeding guide** (`/breeding`) — variety lineage and which pairings produce which outcomes
- **Care guide** (`/care`) — water quality, feeding, seasonal care, health
- **Pond plants** (`/plants`) — real pond plants with care info (own table, populated separately)

The [Koi](https://koi-calm.app) mindfulness app contributes exactly two things: the koi sprites (vendored under `public/assets/`) and each variety's fin tint colours (`data/koi.json`). Everything else is authored for this site. No game concepts appear here — no rarity, tiers, or glow — and the site has **no runtime backend dependency** in phase 1.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Koi brand carried over from koi-web: Pally font, design tokens, Lenis smooth scroll, and the component library (chunky button, fade-in, shadcn/Base UI primitives, koi render components)
- Data: Neon Postgres + Prisma 7 (varieties, families, breeding outcomes, plants, sources), read at build time through tagged `"use cache"` queries and revalidated daily or on demand. `data/koi.json` and `src/content/*.ts` are the seed source, and double as a fallback so a clone with no `DATABASE_URL` still builds the whole site (`scripts/parity-check.ts` proves the two agree).

## Getting started

```bash
npm install
npm run dev
```

## Database (phase 2)

Neon Postgres with Prisma 7 (Neon driver adapter). Schema in `prisma/schema.prisma`; connection URLs in `.env` (see `.env.example`: pooled `DATABASE_URL` for the app, direct `DIRECT_URL` for the CLI).

```bash
npm run db:validate   # check the content modules, no database needed
npm run db:migrate    # prisma migrate dev (needs DIRECT_URL)
npm run db:seed       # load koi, families, ancestors, crosses, plants + sources
npm run db:studio     # browse the data
```

`prisma generate` runs on install and writes the client to `src/generated/prisma` (git-ignored).

## Read-only JSON API

Public, cacheable, no auth. Backed by the same cached queries as the pages.

| Route | Returns |
|---|---|
| `GET /api/koi` | the 22 varieties in dex order with family, origin and sprite/tint data |
| `GET /api/koi/:slug` | one variety with sources and every documented breeding outcome |
| `GET /api/plants` | plant summaries (type, difficulty, koi-safe, NZ status, image) |
| `GET /api/plants/:slug` | one plant with its sources |
| `GET /api/search?q=` | Postgres full-text search over varieties and plants (prefix match on the last word) |
| `POST /api/revalidate` | `Authorization: Bearer $REVALIDATE_SECRET`, body `{"tags":["plants"]}`; refreshes cached reads after a re-seed |

Pages are prerendered from Neon at build time (`"use cache"` + `cacheTag`, Cache Components) and revalidate daily or on demand, so hosting stays static and free.

## How a koi is drawn

A koi is one untinted body sprite (`/assets/koi/bodies/<slug>.webp`, 688×464) plus four fin layers drawn into the same rect, in order: back fin → tail → **body** → dorsal → side fin. Fin frames come from the shared white sprite sheets in `/assets/fins/white/` (5×4 grids of 688×464 frames) and are multiplied by the variety's tint: `fins.<part> ?? fins.dominant` from `data/koi.json` (`#000000` counts as null). Static views use frame 0; animation cycles the 20 frames over 2 s. See `docs/PLAN.md` for the full recipe and `src/components/admin/koi-first-frame-image.tsx` for a working reference.

## Project docs

- `docs/PLAN.md` — full project plan (scope, variety list, rendering recipe, phases, milestones)
- `docs/wireframes.html` — brand-styled wireframes for all six screens (open directly in a browser)
