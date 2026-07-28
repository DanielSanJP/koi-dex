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
- Built all six routes: home, dex grid with search + family filters, 22
  detail pages with canvas composite renders, breeding and care article
  layouts, plants placeholder. `npm run build` green; pushed to GitHub
  (private repo DanielSanJP/koi-dex).

<!-- Add new dated entries above this line as work happens. -->
