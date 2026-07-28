# Koi-dex

A koi encyclopedia website built with Next.js. School project.

Four sections:

- **Koi-dex** (`/koi`) — browsable encyclopedia of all koi varieties, with dex numbers, rarity, tiers, colour palettes, and live composite renders
- **Breeding guide** (`/breeding`) — variety lineage and breeding fundamentals
- **Care guide** (`/care`) — water quality, feeding, seasonal care, health
- **Pond plants** (`/plants`) — encyclopedia of pond plants with care info

Art and catalogue data come from the [Koi](https://koi-calm.app) mindfulness app: a one-time snapshot of its content database lives in `data/*.json`, and all sprites are vendored under `public/assets/` (mirroring the CDN's relative paths, so `file_url` values resolve as `/assets/<file_url>` via `src/lib/r2.ts`). The site has **no runtime backend dependency** in phase 1.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Koi brand carried over from koi-web: Pally font, design tokens, Lenis smooth scroll, and the component library (chunky button, fade-in, shadcn/Base UI primitives, koi render components)
- Phase 1: fully static, data read from `data/*.json` at build time
- Phase 2 (planned): Neon Postgres + Drizzle ORM for interactive features

## Getting started

```bash
npm install
npm run dev
```

## How a koi is drawn

A koi is one untinted body sprite (`/assets/koi/bodies/<slug>.webp`, 688×464) plus four fin layers drawn into the same rect, in order: back fin → tail → **body** → dorsal → side fin. Fin frames come from the shared white sprite sheets in `/assets/fins/white/` (5×4 grids of 688×464 frames) and are multiplied by the variety's tint: `<part>_fin_color_hex ?? dominant_color_hex` from its encyclopedia entry (`#000000` counts as null). Static views use frame 0; animation cycles the 20 frames over 2 s. See `docs/PLAN.md` for the full recipe and `src/components/admin/koi-first-frame-image.tsx` for a working reference.

## Project docs

- `docs/PLAN.md` — full project plan (data model, rendering recipe, phases, milestones)
- `docs/wireframes.html` — brand-styled wireframes for all six screens (open directly in a browser)

## Data files

| File | Contents |
|---|---|
| `data/koi.json` | Koi bodies + nested `encyclopedia` entry (dex number, tier, description, tint hexes) |
| `data/decorations.json` | Decorations, including the pond plants |
| `data/accessories.json` | Koi accessories |
| `data/scenery.json` | Pond scenery |
| `data/content_families.json` | Shared sprite families (layered/recoloured variants) |
