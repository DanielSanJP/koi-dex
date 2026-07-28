# Koi-dex project log

A factual running log of what happened and when. Each weekly progress update
gets drafted from this log, so it stays honest and the mid-point review and
final report write themselves. Add an entry whenever work happens.

## 2026-07-28 — Project kickoff

- Decided scope: a real-koi reference site (22 genuine varieties, care guide,
  breeding guide with documented outcomes, pond plants), using Koi app sprites
  as illustrations. No game concepts.
- Explored the Koi app's database and renderer to understand the data:
  found the app draws every koi as one body sprite + four shared white fin
  sheets tinted by a hex colour, which the website reimplements on canvas.
- Exported the snapshot: `data/koi.json` (22 varieties + fin tints) and
  ~2.8 MB of sprites into `public/assets/`.
- Scaffolded Next.js 16 + TypeScript + Tailwind v4; carried the Koi brand
  over from koi-web (Pally font, design tokens, Lenis smooth scroll, chunky
  button and UI components).
- Made wireframes for all six screens (docs/wireframes.html), three
  revisions as scope tightened.
- Researched variety facts with sources (name meanings, families, patterns,
  origins) and wrote them into the site content.
- Researched breeding and care facts against veterinary, ZNA and koi-farm
  sources: spawning and culling reality, 15 documented historical crosses,
  water chemistry, feeding by temperature, seasonal care, disease and
  quarantine. Every page links its sources; disputed histories (Kumonryu's
  parentage, Sanke's founding fish) are flagged as uncertain rather than
  simplified, and the Hanako 226-year claim is presented as folklore.
- Built all six routes: home, dex grid with search + family filters, 22
  detail pages with canvas composite renders, breeding and care article
  layouts, plants placeholder. `npm run build` green; pushed to GitHub
  (private repo DanielSanJP/koi-dex).

- Reviewed the first build and found the breeding guide too plain and the
  care/breeding content stranded on their own pages. Replanned both
  (docs/REDESIGN.md + docs/wireframes-redesign.html) and rebuilt: breeding
  is now a family tree, a pairing explorer, sprite cross cards, a culling
  funnel and a timeline; the koi detail page became the hub, carrying that
  variety's care notes and its breeding in both directions.
- Switched every koi image on the site to the real sprite composite
  (body plus tinted fin sheets) and deleted the flat preview images.
- Two more research passes: per-variety care notes, and origin years plus
  the ancestor varieties (Magoi, Kigoi, Soragoi, Nezu Ogon, German mirror
  carp, Ki Bekko) that the lineage needed. Added an honest section naming
  the real varieties the site has no artwork for.

<!-- Add new dated entries above this line as work happens. -->
