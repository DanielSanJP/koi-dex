# Koi-dex: school project plan

2026-07-28. Lives at `~/CodingProjects/Koi_Calm_App/koi-dex` (its own git repo, GitHub: DanielSanJP/koi-dex, private). Koi-dex keeps its own `docs/` folder; this file is the single copy of the plan.

## What it is

A Next.js encyclopedia website of Koi app content, built as a school project, deliberately decoupled from the live Koi backend:

1. **Koi-dex** (`/koi`, `/koi/[slug]`): all koi varieties with dex numbers, rarity, tier, colours, fin breakdowns
2. **Breeding guide** (`/breeding`): real-world variety lineage, illustrated with app sprites
3. **Care guide** (`/care`): water, feeding, seasons, health
4. **Pond plants encyclopedia** (`/plants`, `/plants/[slug]`): the app's plant decorations paired with real-world care info

Constraints that shaped the design: no live Supabase usage from the school project (cost + isolation from prod), data starts as local JSON committed to the repo, Neon Postgres comes later only for the relational parts (koi body ↔ fin mapping) and interactive features.

## Source data (verified against prod Supabase, 2026-07-28)

All counts are published rows:

| Table | Rows | Used for |
|---|---|---|
| `content_items` category `koi` | 24 | dex entries (slug, name, body sprite `file_url`, `preview_url`, `glow_url`, blurhash, rarity, price) |
| `encyclopedia_configs` | 27 (one per koi incl. drafts) | `dex_number`, `tier`, `description`, body/dorsal/tail/back/side fin colour hexes |
| `fin_sets` | 8 (a 9th is unpublished) | fin sprites per slot: `tail_url`, `dorsal_url`, `back_fin_url`, `side_fin_url` |
| `koi_fin_configs` | 27 | the body → fin mapping: per koi, one fin-set id per slot (tail/dorsal/back/side) |
| `content_items` category `decoration` | 27 | pond plants live here (anubias, water_lettuce, lily_pad, eelgrass, amazon_sword, + rocks/lanterns/etc.) |
| `content_items` category `accessory` | 160 | optional gallery/extras |
| `content_items` category `scenery` | 7 | optional |
| `content_families` | 66 | shared layered sprites for colour variants (`render_layers` + `layer_tints`) |

Assets: Cloudflare R2 public bucket `https://pub-e6a57e9a5ca145b5b37fc4ea1415fe78.r2.dev`. All `*_url` columns are bucket-relative paths (e.g. `koi/bodies/chagoi.webp`). The full published snapshot is 412 files / 17 MB, so vendoring everything into the repo is fine.

Key discovery: the app already has everything the site needs. `encyclopedia_configs` is effectively a ready-made dex (numbers, tiers, descriptions, palettes) and `koi_fin_configs` is exactly the body↔fin mapping the Neon phase will model. Koi names are real variety names (Chagoi, Bekko, Benigoi, Hi Utsuri, ...), which is what lets the breeding/care guides blend in-app art with real-world koi content.

## Export pipeline (one-time snapshot)

Executed once at project start via Supabase MCP + curl, committed to the repo:

- `data/koi.json`: published koi joined with their encyclopedia config (nested `encyclopedia` object) and fin config resolved to fin-set slugs (nested `fins: {tail, dorsal, back, side}`). UUIDs dropped, joins by slug.
- `data/fin_sets.json`, `data/decorations.json`, `data/accessories.json`, `data/scenery.json`, `data/content_families.json`: per-table exports, published only, ops columns (hashes, sizes, timestamps) omitted.
- `public/assets/<relative path>`: every referenced sprite downloaded from R2, preserving the bucket's relative paths. So any `file_url` in the JSON resolves in the site as `/assets/<file_url>`. Paths referenced inside `render_layers` / `preview_render_layers` JSON are included.

Re-export: repeat the same queries (published filter, slug joins) and re-mirror the URLs. This is deliberately manual; the school project should not hold Supabase credentials.

## Phase 1: fully static site

- Next.js App Router + TypeScript + Tailwind (scaffolded with create-next-app, `src/` layout).
- Data layer `src/lib/data.ts`: reads and zod-validates `data/*.json`, exposes typed accessors (`getAllKoi()`, `getKoi(slug)`, `getPlants()`, ...). Pages use `generateStaticParams`, everything renders at build time. This interface is the seam where Neon slots in later without touching pages.
- Koi composite rendering: body sprite + the four fin sprites as absolutely positioned layered `<img>`s (same approach for the optional glow layer). Colour swatches come straight from the encyclopedia hexes.
- Plants: `decorations.json` filtered to the plant slugs; real-world info (type: floating/submerged/marginal, care difficulty, light, koi-safety, description) is authored content, kept in a small `content/plants/*.mdx` or a hand-written `data/plant_info.json` keyed by slug.
- Guides: MDX in `content/` (breeding.mdx, care.mdx) rendered with next-mdx-remote or the built-in MDX support; TOC generated from headings.
- Visual design: from the existing Koi brand moodboard (out of scope for this plan). Wireframes fix layout only.
- Deploy: Vercel hobby tier, zero cost, static output.

## Phase 2: Neon Postgres (optional, when needed)

Trigger: interactive features (breeding pairing tool, search across authored content) or coursework requiring a real database. Until then JSON is simpler and free.

- Neon free tier: serverless Postgres, autosuspends when idle, comfortably fits this data (well under 1 MB of rows).
- ORM: Drizzle. Schema normalises the app's four fin columns into a proper relation, which is a good schema-design talking point for school:

```sql
create table koi (
  slug text primary key,
  display_name text not null,
  dex_number int unique,
  tier text,
  rarity smallint,
  description text,
  file_url text not null,
  preview_url text,
  glow_url text,
  blurhash text,
  body_color_hex text,
  dorsal_fin_color_hex text,
  tail_fin_color_hex text,
  back_fin_color_hex text,
  side_fin_color_hex text
);

create table fin_sets (
  slug text primary key,
  display_name text,
  tail_url text,
  dorsal_url text,
  back_fin_url text,
  side_fin_url text
);

create table koi_fins (
  koi_slug text not null references koi(slug),
  slot text not null check (slot in ('tail','dorsal','back','side')),
  fin_set_slug text not null references fin_sets(slug),
  primary key (koi_slug, slot)
);

create table plants (
  slug text primary key,
  display_name text,
  file_url text,
  plant_type text check (plant_type in ('floating','submerged','marginal')),
  care_difficulty text,
  light text,
  koi_safe boolean,
  description text
);
```

- Seed script: `scripts/seed.ts` reads the committed JSON and inserts. The JSON snapshot stays in the repo as the source of truth; Neon is derived, so it can be dropped/recreated freely.
- Assets stay static in `public/assets/` in both phases; the DB stores paths only.

## Wireframes

Six screens (home, dex index, koi detail, breeding, care, plants), desktop + mobile for the core three:

- Artifact (shareable): https://claude.ai/code/artifact/18f4ca89-b3c3-43b8-9e2c-9e8d245bd7b7
- Repo copy: `docs/wireframes.html` (open in any browser)

Layout decisions they fix: persistent 4-section nav; dex cards carry number + preview + rarity; koi detail is composite-viewer left / identity right with the fin-slot breakdown below; guides are TOC + prose with a quick-facts sidebar on care; plants reuse the dex card pattern with a type filter; the breeding page reserves a visible "phase 2" slot for the Neon-backed pairing tool.

## GitHub

Repo `koi-dex`, created **private** because it vendors the app's paid/premium sprite content. If school submission needs a public repo, either invite the assessor as a collaborator or discuss trimming the vendored premium assets first.

## Milestones

- **M0 (done at kickoff):** scaffold, data snapshot + assets vendored, wireframes, plan, GitHub repo
- **M1:** data layer + koi-dex index + koi detail (composite viewer, swatches, fin breakdown)
- **M2:** plants section (grid + detail + authored care info)
- **M3:** care + breeding guides in MDX
- **M4:** apply moodboard styling, responsive pass, deploy to Vercel
- **M5 (optional):** Neon + Drizzle + seed, breeding pairing tool

## Decisions taken at kickoff (flag if wrong)

- Name: `koi-dex`, as suggested.
- Private GitHub repo (reason above).
- Snapshot-in-repo instead of a live export script with credentials.
- Exported all published categories (accessories/scenery too, not just koi/fins/plants) since total weight is ~5 MB; unused data costs nothing.
- Plants sourced from the decoration category; their real-world attributes are authored, not from the app DB.
