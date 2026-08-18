Weekly Progress Update

Name: Daniel Medcalf
Week #: 12
Student ID:
Date:


1. What did I accomplish this week?

Deployment week, and milestone M4: the site is live at https://koi-dex.vercel.app.

- Pushed the repository to GitHub and watched the build pipeline run there for the first time: lint, type-check, the tests, the content validation and a full production build, all passing in under a minute and a half. The pipeline deliberately has no database secrets, so every push proves the fallback build still works.

- Wrote the deployment runbook: how the Vercel project is linked, the four environment variables (the pooled and direct Neon connection strings, the revalidate secret, the public site URL), the deploy command, and the "edit, seed, revalidate" loop for content changes that does not need a redeploy.

- Deployed to Vercel. Linked the repository, set the environment variables for production and preview, and ran the production deploy: 39 seconds, all 58 routes prerendered from the database.

- Checked the live site from outside: every page loads (koi pages in under a second, plant pages in about half a second), the 404 works, the API answers (22 koi, search ranked from Postgres, a plant with its New Zealand status), each koi page carries its lineage panel, the sitemap lists all 47 pages with the real address, and the refresh endpoint refuses without the secret and works with it.

- Ran Lighthouse on five live pages. Best practices and SEO are 100 everywhere, accessibility 96 to 97, performance 96 to 98 on the content pages and 80 to 82 on the home page and the plants grid under the throttled mobile profile. The only accessibility fail is the brand-green contrast I had already decided to keep and documented.


2. What do I plan to work on next week?

1. Show the live site to three to five people and run the testing protocol I wrote, on their own devices.

2. Rank what they hit, fix the top problems, redeploy, and log every change.

3. Collect screenshots of the live site for the final report and presentation.


3. Any challenges or blockers?

The one thing that held the deploy up was that my stored Vercel login had expired, so it waited on me logging in again from the terminal. Everything around it (the runbook, the environment variables, the CI pipeline) was ready before that.

Still to do on my side: open the live site on my own phone and one other, and note anything that behaves differently from the browser-width checks.


4. How do I feel about my overall progress?

[X] On track     [ ] Slightly behind     [ ] Falling behind

Live, tested from outside, and measured. Two weeks of buffer remain before the report.
