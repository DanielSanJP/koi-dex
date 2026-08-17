Weekly Progress Update

Name: Daniel Medcalf
Week #: 10
Student ID:
Date:


1. What did I accomplish this week?

Milestone M3 is done: the whole site now reads from the database, and the breeding data is the part doing the most interesting work.

- Moved the koi pages, the breeding guide, the family tree, the pairing explorer and the cross cards onto the database. Everything is keyed by a real foreign key now instead of matching on names, which was how the first version worked. Where a cross was "bred by selecting within a line" rather than a pairing of two named varieties, the page now shows that as a dotted chip instead of pretending there was a second parent.

- Built lineage in the database. A recursive query walks up through both parents and down through offspring, however many steps away, and each koi's page now has a "Whole lineage" panel that groups its ancestors and descendants by generation. Showa, for example, shows Kohaku and Ki Utsuri one step up and Bekko and the wild Magoi two steps up.

- Made the site build without the database too. All the reads go through one interface with two implementations: Neon, and the content files in the repository. If the connection string is not set, the site builds from the files. That is the fallback I promised in the proposal, and I checked it by hiding the credentials and running a full build.

- Wrote a parity check that compares every single read (all 22 koi including their lineage, the crosses, the relatives, the plants, the families) between the database and the content files. It passes, so I know the database says exactly what the research says.

- Cleaned up: the old name-matching breeding code is gone, and the family order in the database now matches the conventional show-class order the filters use.


2. What do I plan to work on next week?

Week 11 is the polish pass.

1. Responsive and accessibility audit: keyboard navigation, focus states, alt text, contrast, headings, and a check on real phone widths.

2. A proper 404 page and loading states, plus a sitemap and robots file ready for deployment.

3. Set up automated tests and a build pipeline on GitHub so every push lints, type-checks, runs the parity and content checks, and builds.


3. Any challenges or blockers?

One real incident, fixed. When I added a small column for the family order, Prisma generated a migration that also tried to remove the search columns and indexes I had written by hand in week 9, because it cannot describe generated columns. It failed part-way through and left the search indexes dropped. I rewrote the migration by hand so it only does what I meant and can be re-run safely, marked the failed one as rolled back, re-applied it, and then taught the schema about the search columns and indexes so the tool no longer sees them as something to remove. I checked that by diffing the schema against the live database, which now comes back empty. Lesson learned: always read a generated migration before applying it, and keep the hand-written SQL idempotent.

Nothing else blocking.


4. How do I feel about my overall progress?

[X] On track     [ ] Slightly behind     [ ] Falling behind

M3 landed on time with more in it than the plan asked for: lineage in the database, a search API, and a fallback that keeps the site building without any secrets.
