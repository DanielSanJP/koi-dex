# Koi-dex

A koi encyclopedia website built with Next.js. School project.

Four sections:

- **Koi-dex** (`/koi`) — browsable encyclopedia of all koi varieties, with dex numbers, rarity, tiers, colour palettes, and per-slot fin breakdowns
- **Breeding guide** (`/breeding`) — variety lineage and breeding fundamentals
- **Care guide** (`/care`) — water quality, feeding, seasonal care, health
- **Pond plants** (`/plants`) — encyclopedia of pond plants with care info

Art and catalogue data come from the [Koi](https://koi-calm.app) mindfulness app: a one-time snapshot of its content database lives in `data/*.json`, and all sprites are vendored under `public/assets/` (mirroring the CDN's relative paths, so `file_url` values resolve as `/assets/<file_url>`). The site has **no runtime backend dependency** in phase 1.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Phase 1: fully static, data read from `data/*.json` at build time
- Phase 2 (planned): Neon Postgres + Drizzle ORM for the koi ↔ fin-set relations and interactive features

## Getting started

```bash
npm install
npm run dev
```

## Project docs

- `docs/PLAN.md` — full project plan (data model, phases, milestones)
- `docs/wireframes.html` — lo-fi wireframes for all six screens (open directly in a browser)

## Data files

| File | Contents |
|---|---|
| `data/koi.json` | Koi bodies + encyclopedia entry (dex number, tier, description, colours) + fin-set slugs per slot |
| `data/fin_sets.json` | Fin sets with tail / dorsal / back / side sprite paths |
| `data/decorations.json` | Decorations, including the pond plants |
| `data/accessories.json` | Koi accessories |
| `data/scenery.json` | Pond scenery |
| `data/content_families.json` | Shared sprite families (layered/recoloured variants) |
