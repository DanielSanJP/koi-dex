Weekly Progress Update

Name: Daniel Medcalf
Week #: 11
Student ID:
Date:


1. What did I accomplish this week?

The polish pass, plus the testing and build pipeline I promised.

- Did an accessibility audit against WCAG 2.2 AA and fixed what it found. The biggest one was contrast: a lot of my secondary text was grey at 35 to 50 percent, which measures well below the 4.5:1 that body text needs, so I raised the floor site-wide. I added a visible keyboard focus ring everywhere, a skip-to-content link, proper landmarks with the current section marked in the header, pressed states on the filter chips, labels on every control, and a reduced-motion setting that switches off the hover animations and smooth scrolling. I wrote the audit up in the repository, including two brand-colour contrast issues (white text on the green button, green chip text) that I have kept on purpose because they are the design language I was asked to follow, with the fix noted if I ever want it.

- Added a proper 404 page in the site's style, loading skeletons for the koi and plant pages, a sitemap and a robots file.

- Checked the new pages at phone width. Nothing overflows, and the header still fits the four sections plus the search button.

- Set up automated tests with Vitest: 14 tests over the logic that matters (how fin colours resolve, checked against the real koi data; the search query builder, including an SQL injection string; and the content: 22 koi with families, 15 crosses with the one line-bred case, Showa's ancestry two generations deep, Kohaku's descendants without looping, 20 plants with sources, images and the five banned ones). Writing the tests found a real bug: a lone "--" could get into a search query. Fixed.

- Set up GitHub Actions so every push lints, type-checks, runs the tests, validates the content, and does a full production build. The build in CI deliberately has no database secrets, so it proves the fallback keeps working.

- Made the plant photo pipeline reproducible with a script that rebuilds every image from its recorded Wikimedia file.


2. What do I plan to work on next week?

Week 12 is deployment.

1. Deploy to Vercel with the Neon connection strings and the revalidate secret as environment variables, and set the public site URL.

2. Test the live site on real phones and fix anything that breaks.

3. Wire the "refresh after re-seed" step into the workflow so a content change goes: edit, seed, revalidate, without a redeploy.


3. Any challenges or blockers?

None blocking.

The honest challenge this week was deciding what to do about the brand green. Making the button text and chip text pass contrast would mean changing the design system I was asked to keep, so I documented the trade-off instead of quietly changing it or quietly ignoring it. Everything else in the audit was fixable and is fixed.


4. How do I feel about my overall progress?

[X] On track     [ ] Slightly behind     [ ] Falling behind

The site is tested, checked on every push, and ready to deploy.
