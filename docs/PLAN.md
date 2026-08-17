# Koi-dex: school project plan

2026-07-28. Lives at `~/CodingProjects/Koi_Calm_App/koi-dex` (its own git repo, GitHub: DanielSanJP/koi-dex, private). Koi-dex keeps its own `docs/` folder; this file is the single copy of the plan.

## What it is

A reference website about **real koi**, built with Next.js as a school project, illustrated with the Koi app's sprites:

1. **Koi-dex** (`/koi`, `/koi/[slug]`): the 22 real koi varieties, each with a composite render, origin/pattern notes, and what the variety produces in breeding. Display only — no viewer controls or palette swatches; the tint hexes exist purely to draw the koi
2. **Breeding guide** (`/breeding`): variety lineage and which pairings produce which outcomes
3. **Care guide** (`/care`): water, feeding, seasons, health
4. **Pond plants** (`/plants`, `/plants/[slug]`): real pond plants with care info

Scope rules (fixed 2026-07-28):

- **Real koi only, no game concepts.** No glow, no rarity, no tiers, no prices, no unlock conditions. Hotaru (fantasy glowing koi), Clown, Kinship, and the Valentine pair (app-original colourways) are excluded.
- **The app contributes exactly two things: koi sprites and fin tint colours.** Everything else on the site (variety notes, breeding outcomes, care content, plants) is authored for koi-dex.
- **Plants are completely separate from the app.** They get their own table in the koi-dex database, populated by hand when the DB phase starts. No plant data ships from the app snapshot.

## The 22 varieties

In dex order (renumbered 1–22 for the site; the app's catalogue numbers had gaps): Chagoi, Bekko, Benigoi, Karasugoi, Hi Utsuri, Ki Utsuri, Hariwake, Shiro Utsuri, Ochiba, Kumonryu, Beni Kumonryu, Kujaku, Asagi, Shusui, Koromo, Platinum, Kin Ki Utsuri, Tancho, Showa, Sanke, Kohaku, Gold Ogon.

These are dex 1–25 of the app's catalogue minus the three app-originals (Valentine Pink 15, Valentine White 16, Kinship 24). Only Asagi and Shusui carry a per-fin tint override (dorsal `#56749a`); every other variety uses just its dominant hex.

## Data: one file

`data/koi.json` — 22 entries, snapshot from the app's prod DB (2026-07-28):

```json
{
  "slug": "chagoi",
  "name": "Chagoi",
  "number": 1,
  "body": "koi/bodies/chagoi.webp",
  "fins": { "dominant": "#9b4d09", "tail": null, "dorsal": null, "back": null, "side": null }
}
```

Assets (`public/assets/`, 26 files, ~490 KB total): `koi/bodies/` (22 body sprites, 688×464) and `fins/white/` (the four shared white fin sheets). Paths resolve as `/assets/<path>` via `src/lib/r2.ts`. Re-export is manual (query prod, mirror the CDN); the project holds no Supabase credentials.

Koi are **always drawn from the sprite composite** — the app's flat preview images are deliberately not used anywhere, so every koi on the site is the real layered fish.

## How a koi is drawn (verified against the Flutter renderer)

The app's canonical routine (`koi/lib/widgets/koi_composite_painter.dart`) draws every koi as **one untinted body image + four tinted fin layers**, all into the *same* destination rect — fin placement is baked into the artwork, there are no offsets.

- **Assets:** body `koi/bodies/<slug>.webp` (688×464, static). Fins come from four **shared white-base sprite sheets** used by *every* koi: `fins/white/{back_fin,tail,dorsal,side_fin}.webp` (3440×1856 = 5×4 grid of 688×464 frames).
- **Layer order (bottom → top):** back fin → tail → **body** → dorsal → side fin.
- **Tint:** each fin layer is multiplied by a hex colour (Flutter `BlendMode.modulate`; on the web: canvas `globalCompositeOperation = "multiply"` on the white frame, alpha preserved). Per-fin resolution: `fins.<part> ?? fins.dominant ?? untinted`; treat `#000000` as null. The body is never tinted.
- **Animation:** no procedural motion — the sway is 20 hand-drawn frames in the sheet. The site draws frame 0 everywhere; cycling all 20 over 2 s (~10 fps) is available if wanted later.
- **Sharing decodes:** the fin sheets are 3440×1856 and shared by every koi, so `koi-composite.tsx` caches loaded images at module level. A grid of 22 cards decodes each sheet once.

Reference implementations copied from koi-web's admin into `src/components/admin/` (`koi-first-frame-image.tsx` is the working canvas reference). Tints resolve through `src/lib/koi-fin-urls.ts` (`koiTintFromFins`).

## Brand & components (carried over from koi-web)

- **Font:** Pally (local OTFs in `public/fonts/`, 400/500/700) via `next/font/local`, the only typeface.
- **Tokens** (`src/app/globals.css`, ported wholesale): `#f7f6f9` background, `#313131` ink, `#93d9f0` sky-blue nav/footer band with 3px `#c1c1c1` dividers, greens `#66dd93`/`#49ad6d`, orange accent `#f8a634`, radius scale off `0.625rem`, card shadow `0 4px 12px rgba(0,0,0,.06)`, alpha-on-neutral convention. Light-only, flat colour, no gradients. Three koi-web bugs fixed in the port: `--foreground` is the ink, `--sidebar-accent` uses `color-mix`, `--font-sans` maps to Pally.
- **Components copied verbatim** into `src/components/`: the chunky button (hard offset shadow, sinks on press; Link adapted to `next/link`), fade-in, lenis-provider, the `ui/` shadcn (Base UI) primitives, and the admin koi render components. `src/lib/r2.ts` adapted to serve `/assets` locally.
- **Lenis** (`lenis@1.3.25`): root layout, `{ autoRaf: true, anchors: true, duration: 0.8, lerp: 0.15 }`, `lenis/dist/lenis.css` imported in the layout; nested scroll areas get `data-lenis-prevent`.
- Deps mirrored from koi-web: `shadcn`, `@base-ui/react`, `tw-animate-css`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`.
- Still to build: simplified navbar/footer with the band styling (koi-web's are next-intl-bound and weren't copied).

## Phase 1: fully static site

- Next.js 16 App Router + TypeScript + Tailwind v4, `src/` layout. Builds green.
- Data layer `src/lib/data.ts` (to build): reads and validates `data/koi.json`, exposes `getAllKoi()` / `getKoi(slug)`. Pages use `generateStaticParams`; everything renders at build time.
- Koi rendering: a canvas component implementing the recipe above.
- Authored content in `content/`: per-variety notes (origin, pattern, breeding remarks) as MDX or a hand-written JSON keyed by slug; `breeding.mdx` and `care.mdx` guides; variety-family groupings (Gosanke, Utsurimono, Ogon…) for the dex filter.
- Plants section: waits for its own data (see phase 2) or launches with a small hand-written list; nothing derives from the app.
- Deploy: Vercel hobby tier, zero cost, static output.

## Pond plants (decided week 6, 2026-08-18)

Twenty species, chosen to cover the three types a koi keeper actually shops
for and to include the plants New Zealand readers will find are banned:

- **Floating (6):** hardy water lily, sacred lotus, water hyacinth, water
  lettuce, duckweed, frogbit
- **Submerged (4):** hornwort, anacharis (Egeria densa), eelgrass
  (Vallisneria), Anubias
- **Marginal (10):** pickerel rush, Japanese water iris, marsh marigold,
  sweet flag, umbrella sedge, taro, watercress, water mint, raupō, creeping
  Jenny

Per plant: type, light, difficulty, koi-safe (does it survive koi
unprotected) plus how to protect it, hardiness, planting depth/size,
benefits, a plain description, **NZ status** (native / naturalised / sold /
banned under the National Pest Plant Accord / not listed) with an NZ source
(NZPCN, Weedbusters, DOC), and two general sources. Five of the twenty are
banned pest plants in New Zealand (water hyacinth, water lettuce, hornwort,
Egeria, Vallisneria) and two more have a banned lookalike (yellow flag iris
for the water irises, Typha latifolia for raupō), which the pages say
plainly. Data lives in
`src/content/plants.ts` and is the seed source for the `plants` table.

**Images:** one photograph per plant from Wikimedia Commons, restricted to
CC0 / public domain / CC BY / CC BY-SA licences, licence and author verified
against the Commons API, vendored under `public/assets/plants/<slug>.webp`
(centre-cropped 3:2, 1200×800, ~150 KB each) with the author, licence and
Commons file page recorded on the plant and shown as a credit line. Photos
were chosen over drawn icons because the site has no plant artwork and a
reader needs to recognise the plant; they sit inside the same white card
and radius as the koi so the page still reads as one design.

## Phase 2: Neon Postgres

Trigger: the plants table (populated by hand, as decided), the breeding-outcomes data, or interactive features (pairing tool). Prisma ORM; `scripts/seed.ts` seeds the koi table from the committed JSON. Sketch:

```sql
create table koi (
  slug text primary key,
  name text not null,
  number int unique not null,
  body_path text not null,
  dominant_hex text,
  tail_hex text,
  dorsal_hex text,
  back_hex text,
  side_hex text,
  origin text,
  pattern_notes text
);

create table plants (            -- populated by hand, entirely koi-dex's own
  slug text primary key,
  name text not null,
  latin_name text not null,
  plant_type text check (plant_type in ('floating','submerged','marginal')),
  light text,
  difficulty text check (difficulty in ('easy','moderate','hard')),
  koi_safe boolean not null,
  koi_notes text,
  hardiness text,
  planting text,
  benefits text,
  description text,
  nz_status text check (nz_status in ('native','naturalised','cultivated','pest','unknown')),
  nz_note text,
  nz_url text,
  image_path text,                 -- plus image_alt/author/license/url credit columns
  sources jsonb                    -- [{name,url}]
);

create table breeding_outcomes ( -- "which types breed what outcome"
  parent_a text not null references koi(slug),
  parent_b text not null references koi(slug),
  offspring text not null references koi(slug),
  notes text,
  primary key (parent_a, parent_b, offspring)
);
```

Neon free tier fits this trivially; assets stay static in `public/assets/` in both phases.

## Wireframes

Six screens, set in the real brand (Pally embedded, actual palette, band + chunky button), v3 with the game concepts removed (no rarity, tiers, or glow; variety-family filter chips; a breeding strip on the detail page):

- Artifact (shareable): https://claude.ai/code/artifact/18f4ca89-b3c3-43b8-9e2c-9e8d245bd7b7
- Repo copy: `docs/wireframes.html` (open in any browser)

## GitHub

Repo `koi-dex`, **private** (it vendors the app's sprite art). If school submission needs a public repo, invite the assessor as a collaborator.

## Milestones

- **M0 (done at kickoff):** scaffold, koi snapshot + assets, brand + components from koi-web (builds green), wireframes, plan, GitHub repo
- **M1:** data layer + koi-dex index + koi detail (canvas composite, breeding strip)
- **M2:** care + breeding guides (authored MDX, outcomes table)
- **M3:** plants section once its data exists
- **M4:** navbar/footer + responsive pass + deploy to Vercel
- **M5 (optional):** Neon + Prisma + seed, breeding pairing tool

## Decisions log

- Name `koi-dex`; lives inside `Koi_Calm_App/` with its own git repo and its own `docs/` (user preference). Private repo.
- Real koi only; game concepts (glow/rarity/tier/price) excluded (2026-07-28). The app's OG dex 1–25 minus the three app-originals = 22 varieties, renumbered 1–22.
- DB data from the app = koi + fin colours only; plants completely separate, populated by hand in koi-dex's own table at the DB phase (2026-07-28).
- Fins render from the shared white sheets + hex tint (fin_sets are vestigial in the app and excluded).
- Brand and components copied from koi-web verbatim where possible, adapted only where koi-web infra (i18n, Supabase, R2 uploads) doesn't exist here.
