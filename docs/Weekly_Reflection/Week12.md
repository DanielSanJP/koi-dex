Weekly Progress Update  [DRAFT: finish after the Vercel deploy]

Name: Daniel Medcalf
Week #: 12
Student ID:
Date:


1. What did I accomplish this week?

Deployment week. Milestone M4.

- Pushed the repository to GitHub and watched the build pipeline run there for the first time: lint, type-check, the tests, the content validation and a full production build, all passing in under a minute and a half. The pipeline deliberately has no database secrets, so every push proves the fallback build still works.

- Wrote the deployment runbook: how the Vercel project is linked, the four environment variables (the pooled and direct Neon connection strings, the revalidate secret, the public site URL), the deploy command, and the "edit, seed, revalidate" loop for content changes that does not need a redeploy.

- [TODO] Deployed to Vercel at [URL]. Set the environment variables, ran the production build there (which reads Neon once per cached query and prerenders all 58 routes), and checked the live site.

- [TODO] Tested the live site on real phones: [devices/browsers]. What worked / what broke and how it was fixed: [notes].

- [TODO] Verified the API and search on the live URL, the sitemap and robots, and the 404 page.


2. What do I plan to work on next week?

1. Show the live site to three to five people and run the testing protocol I wrote, on their own devices.

2. Rank what they hit, fix the top problems, redeploy, and log every change.

3. Start collecting screenshots of the live site for the final report and presentation.


3. Any challenges or blockers?

The one blocker this week was that my stored Vercel login had expired, so the deploy waited on me logging in again from the terminal. Everything around it (runbook, environment variables, the CI pipeline) was ready before that.

[TODO] Anything that broke on the live site: [notes].


4. How do I feel about my overall progress?

[X] On track     [ ] Slightly behind     [ ] Falling behind

[TODO] one line once live.
