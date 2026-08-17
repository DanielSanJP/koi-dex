# Accessibility and responsive audit (week 11, 2026-08-18)

Target: WCAG 2.2 AA. Method: a keyboard-only pass through every route, the
Chrome accessibility tree, contrast arithmetic on the design tokens, and
phone-width renders (390 px) of every route via `scripts/screenshots.sh`.

## Fixed in this pass

- **Text contrast.** Secondary text used black at 35–50 % alpha, which
  measures 2.6–4.0:1 on the page ground and on white cards (AA needs 4.5:1
  for body text). Raised the floor to 55 % (≈4.7:1) and 60 % (≈5.8:1)
  site-wide; decorative × and → glyphs at 25–30 % are exempt (not text).
- **Keyboard focus.** One visible `:focus-visible` ring (3 px brand green,
  2 px offset) on every focusable element; a "Skip to content" link as the
  first tab stop; `<main id="content" tabIndex={-1}>` as its target.
- **Landmarks and state.** `<nav aria-label="Main">`, `aria-current="page"`
  on the section you are in (also underlined), `aria-pressed` on filter
  chips, `role="progressbar"` with values on the checklist bar, `aria-busy`
  on loading skeletons, `role="dialog" aria-modal` on the search panel with
  Escape to close and "/" to open.
- **Names for controls.** The search input, the pairing selects and the dex
  search box carry `aria-label`s; the checklist uses real `<label>`s;
  every koi `<canvas>` has `role="img"` and an `aria-label`; every plant
  photo has descriptive alt text recorded with its credit.
- **Motion.** `prefers-reduced-motion: reduce` disables the hover lifts,
  scale-ups and animated widths, and skips Lenis smooth scrolling entirely.
- **Not found and loading.** A branded 404 with two clear ways out; skeleton
  `loading.tsx` for the two dynamic detail routes.
- **Discoverability.** `sitemap.xml` (all 47 pages) and `robots.txt`
  (disallows only `/api/revalidate`); `metadataBase` set from the site URL.

## Known deviations, kept on purpose

- **Brand green.** The chunky button (white bold text on `#66dd93`,
  ≈1.7:1) and the green chip text (`#49ad6d` on a pale green tint,
  ≈2.6:1) do not meet AA. They are the Koi design language the site was
  asked to keep. Every such element also has a non-colour cue (shape,
  position, label, underline or icon), and no information is carried by
  colour alone. Recorded here as a conscious trade-off; the fix, if wanted,
  is ink-coloured button text and a darker green (`#257a45`) for chip text.
- **The family tree** is a set of linked tiles rather than a true graph, so
  it is fully keyboard-navigable but the visual grouping by era is conveyed
  by headings, not by drawn edges.

## Responsive

All routes render without horizontal overflow at 390 px; wide content (the
numbers table, the feeding bands, the timeline strip) scrolls inside its own
container. The header keeps the four section links plus the search button
at 390 px.
