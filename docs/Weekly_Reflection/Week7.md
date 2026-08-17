Weekly Progress Update

Name: Daniel Medcalf
Week #: 7
Student ID:
Date:


1. What did I accomplish this week?

This was the mid-point week: tidy up, take stock, and write the review.

- Polished what exists. The plants tile on the home page now shows a real photo instead of "coming soon". I fixed the wording on the home and koi pages that said "the 22 real koi varieties", because real koi classification is much wider than that and the site should not claim otherwise. I also cleaned up the last two code-quality warnings: the koi list's search and family filters now keep their state in the page address, so a filtered view can be shared as a link and the back button works.

- Made a screenshot script that captures every page at desktop size and at phone size, so I have a consistent set of images for the review, the final report and the presentation. Twelve screenshots are in the repository now.

- Drew two diagrams for the review: one showing progress against the week-by-week plan, and one showing how the site is built (where the koi data and artwork come from, the content modules, the Next.js build, and where the database fits in phase two).

- Wrote the mid-point review from my project log, following the Part B template and marking criteria: introduction with where I am on the timeline, methodology and how it has actually been used, results and findings with numbers, conclusions, and the diagrams and screenshots as supporting material. It is in the repository as Markdown and as a Word document built from the official template.

- Took my tutor's feedback on the proposal seriously. The comment was that a static reference site is a modest challenge at this level and that the database phase needs to carry real technical weight. I agree, so I have reshaped weeks 8 to 14: a proper relational schema with foreign keys and migrations, lineage worked out in the database with a recursive query, full-text search behind a small read-only API, static pages that revalidate on demand so hosting stays free, automated tests with a build pipeline on every push, and calculators in the care guide. Everything stays inside the written scope.


2. What do I plan to work on next week?

Week 8 is the database.

1. Create the Neon project and set up Prisma 7 with the Neon adapter, with separate pooled and direct connection strings.

2. Write the schema (koi, families, plants, breeding outcomes, sources) with foreign keys, and run the first migration.

3. Write the seed script that validates the content modules and loads the koi and plants tables, and prove the site can build from the database.


3. Any challenges or blockers?

One dependency: the database needs a Neon account and project, which is a manual sign-up step, and the connection strings have to be kept out of the repository. That is set up work rather than a blocker, but it is the one thing next week that cannot be done from code alone.

Otherwise the main challenge this week was honesty in the review: the plan and the log say different things about dates, because weeks 5 to 7 were done in one push, ahead of the calendar. The updates are filed by plan week and the log by real date, and the review says so.


4. How do I feel about my overall progress?

[X] On track     [ ] Slightly behind     [ ] Falling behind

Ahead on content, on time overall, and with a clearer, more demanding plan for the second half than I started with.
