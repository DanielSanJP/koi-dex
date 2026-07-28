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
- Phase 1: fully static, data read from `data/koi.json` at build time
- Phase 2 (planned): Neon Postgres + Drizzle ORM — koi, plants (hand-populated), and breeding-outcomes tables

## Getting started

```bash
npm install
npm run dev
```

## How a koi is drawn

A koi is one untinted body sprite (`/assets/koi/bodies/<slug>.webp`, 688×464) plus four fin layers drawn into the same rect, in order: back fin → tail → **body** → dorsal → side fin. Fin frames come from the shared white sprite sheets in `/assets/fins/white/` (5×4 grids of 688×464 frames) and are multiplied by the variety's tint: `fins.<part> ?? fins.dominant` from `data/koi.json` (`#000000` counts as null). Static views use frame 0; animation cycles the 20 frames over 2 s. See `docs/PLAN.md` for the full recipe and `src/components/admin/koi-first-frame-image.tsx` for a working reference.

## Project docs

- `docs/PLAN.md` — full project plan (scope, variety list, rendering recipe, phases, milestones)
- `docs/wireframes.html` — brand-styled wireframes for all six screens (open directly in a browser)
