# Koi-dex: school project plan

2026-07-28. Lives at `~/CodingProjects/Koi_Calm_App/koi-dex` (its own git repo, GitHub: DanielSanJP/koi-dex, private). Koi-dex keeps its own `docs/` folder; this file is the single copy of the plan.

## What it is

A Next.js encyclopedia website of Koi app content, built as a school project, deliberately decoupled from the live Koi backend:

1. **Koi-dex** (`/koi`, `/koi/[slug]`): all koi varieties with dex numbers, rarity, tier, colours, composite renders
2. **Breeding guide** (`/breeding`): real-world variety lineage, illustrated with app sprites
3. **Care guide** (`/care`): water, feeding, seasons, health
4. **Pond plants encyclopedia** (`/plants`, `/plants/[slug]`): the app's plant decorations paired with real-world care info

Constraints that shaped the design: no live Supabase usage from the school project (cost + isolation from prod), data starts as local JSON committed to the repo, Neon Postgres comes later only for interactive features.

## Source data (verified against prod Supabase, 2026-07-28)

All counts are published rows:

| Table | Rows | Used for |
|---|---|---|
| `content_items` category `koi` | 24 | dex entries (slug, name, body sprite `file_url`, `preview_url`, `glow_url`, blurhash, rarity, price) |
| `encyclopedia_configs` | 27 (one per koi incl. drafts) | `dex_number`, `tier`, `description`, and the **fin tint hexes** (dominant + per-fin) |
| `content_items` category `decoration` | 27 | pond plants live here (anubias, water_lettuce, lily_pad, eelgrass, amazon_sword, + rocks/lanterns/etc.) |
| `content_items` category `accessory` | 160 | optional gallery/extras |
| `content_items` category `scenery` | 7 | optional |
| `content_families` | 66 | shared layered sprites for colour variants (`render_layers` + `layer_tints`) |
| `fin_sets` / `koi_fin_configs` | — | **vestigial, excluded from the snapshot** (see rendering section) |

Assets: Cloudflare R2 public bucket `https://pub-e6a57e9a5ca145b5b37fc4ea1415fe78.r2.dev`. All `*_url` columns are bucket-relative paths (e.g. `koi/bodies/chagoi.webp`).

## How a koi is drawn (verified against the Flutter renderer)

The app's canonical routine (`koi/lib/widgets/koi_composite_painter.dart`) draws every koi as **one untinted body image + four tinted fin layers**, all into the *same* destination rect — fin placement is baked into the artwork, there are no offsets.

- **Assets:** body `koi/bodies/<slug>.webp` (688×464, static). Fins come from four **shared white-base sprite sheets** used by *every* koi: `fins/white/{back_fin,tail,dorsal,side_fin}.webp` (3440×1856 = 5×4 grid of 688×464 frames). All are in `public/assets/`.
- **Layer order (bottom → top):** back fin → tail → **body** → dorsal → side fin (glow and accessories are optional extra passes).
- **Tint:** each fin layer is multiplied by a hex colour (Flutter `BlendMode.modulate`; on the web: canvas `globalCompositeOperation = "multiply"` on the white frame, alpha preserved). Per-fin resolution: `<part>_fin_color_hex ?? dominant_color_hex ?? untinted`; `#000000` is treated as null. The body is never tinted (`body_color_hex` is null on every koi).
- **Animation:** no procedural motion — the sway is 20 hand-drawn frames. Cards cycle all 20 over 2 s (~10 fps); static previews use frame 0; the app's home widget uses the cheap 6-frame slice 0/3/6/9/12/15.
- **Growth (optional):** the app scales a koi `0.4 + habitDays/70 * 0.6`; the site can just render adults (scale 1).
- **`fin_sets` / `koi_fin_configs` are dead:** the colour-named sets (brown, orange, black…) are pre-colored legacy art the runtime never reads — the app always loads the white set and tints. The snapshot therefore drops `fin_sets.json`, drops the `fins` block from `koi.json`, and prunes the legacy coloured fin art (only `fins/white/` is kept).

Reference implementations already copied into this repo from koi-web's admin (`src/components/admin/`): `koi-first-frame-image.tsx`, `koi-preview-canvas.tsx`, `layered-preview-image.tsx`, `content-thumbnail.tsx`.

## Export pipeline (one-time snapshot)

Executed once at project start via Supabase MCP + curl, committed to the repo:

- `data/koi.json`: published koi joined with their encyclopedia config (nested `encyclopedia` object holding dex number, tier, description, tint hexes). UUIDs dropped, joins by slug.
- `data/decorations.json`, `data/accessories.json`, `data/scenery.json`, `data/content_families.json`: per-table exports, published only, ops columns (hashes, sizes, timestamps) omitted.
- `public/assets/<relative path>`: every referenced sprite (412 files at export; legacy coloured fins pruned afterwards), preserving the bucket's relative paths — any `file_url` resolves as `/assets/<file_url>` via `src/lib/r2.ts`.

Re-export: repeat the same queries (published filter, slug joins) and re-mirror the URLs. Deliberately manual; the school project holds no Supabase credentials.

Known snapshot quirks: `hotaru` has no `preview_url` (render its card from the body sprite) and sits at dex 26 with a null tier; dex 15/16 are unpublished and correctly absent; `accessories/previews/hat/headphones.webp` is PNG bytes under a .webp name (browsers content-sniff, it renders fine).

## Brand & components (carried over from koi-web)

Everything visual is copied from koi-web rather than re-invented:

- **Font:** Pally (local OTFs in `public/fonts/`, weights 400/500/700) via `next/font/local`, bound to `--font-pally`. It's the only typeface.
- **Tokens** (`src/app/globals.css`, ported wholesale): `#f7f6f9` background, `#313131` ink, `#93d9f0` sky-blue nav/footer band with 3px `#c1c1c1` dividers, greens `#66dd93`/`#49ad6d`, orange accent `#f8a634`, radius scale off `0.625rem`, card shadow `0 4px 12px rgba(0,0,0,.06)`, alpha-on-neutral convention (`border-black/10`, `text-black/50`…). Light-only, flat colour, no gradients. Three koi-web bugs fixed in the port: `--foreground` is now the ink, `--sidebar-accent` uses `color-mix`, `--font-sans` maps to Pally instead of itself.
- **Components copied verbatim** into `src/components/`: the signature chunky `button.tsx` (hard offset shadow, sinks 4px on press; its Link import adapted to `next/link`), `fade-in.tsx` (IntersectionObserver scroll reveal), `lenis-provider.tsx`, the `ui/` shadcn (Base UI) primitives, and the admin koi-render components. `src/lib/utils.ts` and `src/hooks/use-mobile.ts` came along; `src/lib/r2.ts` was adapted to serve `/assets` locally and `src/lib/koi-fin-urls.ts` to resolve tints from the snapshot instead of Supabase.
- **Lenis** (`lenis@1.3.25`): mounted in the root layout wrapping the app shell, `{ autoRaf: true, anchors: true, duration: 0.8, lerp: 0.15 }`, `lenis/dist/lenis.css` imported in the layout; nested scroll areas get `data-lenis-prevent` + `overscroll-contain`. Written React-Compiler-clean (instance local to the effect, no refs).
- Deps mirrored from koi-web: `shadcn`, `@base-ui/react`, `tw-animate-css`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`.

Still to adapt when pages are built: a simplified navbar/footer (koi-web's are next-intl-bound, so they weren't copied; rebuild with the band styling and plain English strings).

## Phase 1: fully static site

- Next.js 16 App Router + TypeScript + Tailwind v4, `src/` layout. Verified building.
- Data layer `src/lib/data.ts` (to build): reads and zod-validates `data/*.json`, exposes typed accessors (`getAllKoi()`, `getKoi(slug)`, `getPlants()`…). Pages use `generateStaticParams`; everything renders at build time. This interface is the seam where Neon slots in later without touching pages.
- Koi rendering: a canvas component implementing the recipe above (the copied `koi-first-frame-image.tsx` is the working reference).
- Plants: `decorations.json` filtered to plant slugs; real-world info (type, care difficulty, light, koi-safety, description) is authored content in `content/` or a hand-written `data/plant_info.json`.
- Guides: MDX in `content/` (breeding.mdx, care.mdx); TOC generated from headings.
- Deploy: Vercel hobby tier, zero cost, static output.

## Phase 2: Neon Postgres (optional, when needed)

Trigger: interactive features (breeding pairing tool, favourites) or coursework requiring a real database. Until then JSON is simpler and free. Note the original "map bodies to fins" need dissolved once the renderer was understood — the mapping is just the tint hexes already on each koi row — so the schema is two tables:

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
  dominant_color_hex text,
  body_color_hex text,
  dorsal_fin_color_hex text,
  tail_fin_color_hex text,
  back_fin_color_hex text,
  side_fin_color_hex text
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

- Neon free tier: serverless Postgres, autosuspends when idle, comfortably fits this data.
- ORM: Drizzle. Seed script `scripts/seed.ts` reads the committed JSON and inserts; the JSON snapshot stays the source of truth, Neon is derived and can be dropped/recreated freely.
- Assets stay static in `public/assets/` in both phases; the DB stores paths only.

## Wireframes

Six screens (home, dex index, koi detail, breeding, care, plants), set in the real brand (Pally embedded, actual palette, band + chunky button furniture):

- Artifact (shareable): https://claude.ai/code/artifact/18f4ca89-b3c3-43b8-9e2c-9e8d245bd7b7
- Repo copy: `docs/wireframes.html` (open in any browser)

Layout decisions they fix: persistent 4-section band nav; dex cards carry number + preview + rarity; koi detail is composite-viewer left / identity + tint swatches right (no fin-set section — fins aren't separate content); guides are TOC + prose with a quick-facts sidebar on care; plants reuse the dex card pattern with a type filter; the breeding page reserves a visible "phase 2" slot for the Neon-backed pairing tool.

## GitHub

Repo `koi-dex`, created **private** because it vendors the app's paid/premium sprite content. If school submission needs a public repo, either invite the assessor as a collaborator or trim the vendored premium assets first.

## Milestones

- **M0 (done at kickoff):** scaffold, data snapshot + assets vendored, brand + components carried over from koi-web (builds green), wireframes, plan, GitHub repo
- **M1:** data layer + koi-dex index + koi detail (canvas composite, tint swatches)
- **M2:** plants section (grid + detail + authored care info)
- **M3:** care + breeding guides in MDX
- **M4:** navbar/footer + responsive pass + deploy to Vercel
- **M5 (optional):** Neon + Drizzle + seed, breeding pairing tool

## Decisions taken at kickoff (flag if wrong)

- Name: `koi-dex`, as suggested. Lives inside `Koi_Calm_App/` with its own git repo and its own `docs/` (user preference).
- Private GitHub repo (reason above).
- Snapshot-in-repo instead of a live export script with credentials.
- Exported all published categories (accessories/scenery too) since total weight is ~17 MB; unused data costs nothing.
- Fin sets dropped from data (vestigial in the app; fins render from the shared white sheets + hex tint). Legacy coloured fin art pruned from assets.
- Brand and components copied from koi-web verbatim where possible, adapted only where koi-web infra (i18n, Supabase, R2 uploads) doesn't exist here.
- Plants sourced from the decoration category; their real-world attributes are authored, not from the app DB.
