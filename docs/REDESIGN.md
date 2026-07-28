# Redesign plan: visual breeding guide + koi page as the hub

2026-07-28, after reviewing the first build. Two problems to fix:

1. **The breeding guide is bland.** It is a list of bullets and text rows on a page about the most visual subject the site has.
2. **Care and breeding are stranded on their own pages.** Each koi has a detail page, and that is where a reader actually wants this variety's care and this variety's breeding outcomes. The guides should stay as the general references, with the koi page as the per-variety entry point into both.

A third, related gap found while auditing: the breeding text names six parents the site cannot show (Magoi, Kigoi, Soragoi, Nezu Ogon, German mirror carp, and a clumsy "line-bred metallic offspring" phrase). The redesign absorbs them as ancestor nodes rather than leaving them as dead text.

Wireframes: `docs/wireframes-redesign.html`, also at
https://claude.ai/code/artifact/8eb464a2-7c44-47ac-94db-439727725d0a

## Breeding guide (`/breeding`), five blocks

**1. The family tree.** The hero. Varieties in tiers by era, from Magoi at the root down to the 1990s, edges drawn from the documented-cross data. Ancestors with no sprite (Magoi, Kigoi, Soragoi, Nezu Ogon, German carp) render as dashed, art-free nodes so they read as context, not broken links. Hovering a node lights its ancestry path; clicking opens that variety's page. Built as CSS/flex tiers with an SVG edge overlay, not a graph library.

**2. Pairing explorer.** Two pickers over the 22 varieties. A documented pairing shows the offspring sprite, the year and the breeder; anything else says plainly that the pairing is not documented, and repeats that spawns are variable. It never invents an outcome. This is the interactive answer to "which types breed what outcome".

**3. Cross cards.** The historical crosses as cards showing real sprites for parents and offspring, note underneath, source link kept. Replaces the current text rows.

**4. Timeline.** Origin years on one axis, so a reader sees how recent most varieties are (Kohaku 1800s, Shusui 1910, Sanke 1917, Showa 1927, Ogon 1946, Kujaku 1960, Beni Kumonryu 1980, Ochiba 1990s).

**5. Culling funnel.** The spawn numbers as a shrinking stack: up to 500,000 eggs at the top, 100–200 kept at the bottom. One glance carries the hardest fact in koi breeding.

The fundamentals prose stays, but below these blocks rather than opening the page.

## Koi detail page (`/koi/[slug]`), the hub

Order: the fish, then identity and story (as now), then two side-by-side cards, then a family strip.

- **Caring for a &lt;variety&gt;** — only the researched, variety-specific points (Chagoi's size and growth rate, Kumonryu's temperature-driven pattern, staining risk on white grounds, metallic lustre, doitsu scalelessness), plus a link into the full care guide for general husbandry. Varieties with nothing distinctive show just the link rather than padded filler.
- **Breeding, both directions** — "Produced by" walks up the lineage, "Parent of" walks down, both with sprites and links, both from the same cross data as the guide.
- **Others in the &lt;family&gt;** — the remaining varieties in that classification, so browsing works sideways as well as by number.

## Data this needs

Two research passes were run for it (2026-07-28):

- **Variety-specific care notes** per slug, sourced; empty where nothing distinctive is documented.
- **Origin years** per slug for the timeline and the tree's tiers, plus **ancestor and relative definitions** (Magoi, Kigoi, Soragoi, Nezu Ogon, German carp, Ki Bekko; and the well-known varieties the site does not cover: Goshiki, Matsuba, Kikusui, Kikokuryu, Yamato Nishiki, plus the Ginrin and Doitsu overlay classes, which are not varieties in themselves).

New content modules: `src/content/ancestors.ts`, `src/content/timeline.ts`, and per-variety `care` added to `src/content/varieties.ts`. One shared `DOCUMENTED_CROSSES` list keeps the tree, the cards, the explorer and the koi pages from ever disagreeing.

Also fix while in here: the dex page says "the 22 real koi varieties", which overclaims. Real classification is much wider, so the copy becomes plain "22 varieties" with an honest note, and the relatives list acknowledges what is not covered and why (no artwork).

## Build order

1. Data modules: timeline years, ancestors/relatives, per-variety care.
2. Detail page hub: care card, bidirectional breeding, family strip.
3. Breeding page: cross cards → timeline → funnel (static blocks first).
4. Family tree with hover highlighting.
5. Pairing explorer (client component over the cross list).
6. Copy fix and honest coverage note.

Steps 1–3 are the bulk of the value; 4 and 5 are the interactive layer and can land separately if time is short.
