# Weekly Progress Update

**Name:** Daniel Medcalf
**Week #:** 2
**Student ID:** _[add]_
**Date:** _[add]_

---

## 1. What did I accomplish this week?

This week was scoping and design, before writing any site code.

- **Settled what the project is.** Koi-dex: a reference website about real koi, with four sections — an encyclopedia of the varieties, a breeding guide covering which pairings produce which varieties, a care guide, and pond plants. Decided it covers real koi only, with no game-style features.
- **Worked out which koi the site will cover.** The artwork comes from my Koi app, whose catalogue holds 27 koi. Five of those are inventions of the app rather than real varieties, so the site covers the remaining **22 real varieties** (Kohaku, Sanke, Showa, Asagi, Shusui, Chagoi and so on), renumbered 1–22.
- **Set the visual direction from the Koi brand moodboard.** Carried over the existing brand rather than inventing a new one: the Pally typeface, an off-white ground (#f7f6f9) with dark grey text (#313131), a sky-blue header and footer band with a 3px divider, green buttons (#66dd93 with a #49ad6d shadow) and an orange accent. Flat colour, no gradients.
- **Drew wireframes for all six screens** — home, the koi index, a koi detail page, breeding, care, and plants — with desktop and mobile layouts for the main three. Revised them three times as the scope tightened: dropped the game-style rarity and tier badges, dropped the colour swatch panel, and made the detail page display-only.
- **Decided the technical approach.** Next.js with TypeScript and Tailwind. The koi data will be a local JSON file committed to the project instead of a live backend, so the site has nothing to pay for and nothing to break; a database (Neon Postgres) comes later for the plants table and the breeding data.
- **Set up the GitHub repository** and wrote the project plan and a running project log so the weekly updates have something factual behind them.

## 2. What do I plan to work on next week?

1. **Build the site itself** — scaffold the Next.js project, set up the layout with the brand styling from the moodboard, and get the navigation, home page and routing working.
2. **Build the koi encyclopedia pages** — the index grid of all 22 varieties and an individual detail page for each one, generated from the JSON data.
3. **Get the koi rendering properly.** Rather than flat images, each koi is drawn from a body sprite with its fins layered on top and coloured by that variety's own colour values, which is how the app itself draws them. This is the part I expect to take the longest.

## 3. Any challenges or blockers?

No blockers, but two things took longer than expected to decide.

The first was working out which koi actually count. I assumed the app held 25 original koi, but going through the catalogue properly showed several are app inventions rather than real varieties, so the honest number is 22. Better to find that now than after building 25 pages.

The second was how to show the koi at all. The app draws each fish from a body sprite plus separate fin layers that get tinted a colour per variety, so there is no single ready-made picture of each koi to drop onto a page. I have to reproduce that layering in the browser. I know what needs to happen; next week will show whether it works.

## 4. How do I feel about my overall progress?

☑ **On track** ☐ Slightly behind ☐ Falling behind

The design work is done and the decisions that shape the build are made, so next week is implementation rather than more deciding.
