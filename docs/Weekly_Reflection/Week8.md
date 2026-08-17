Weekly Progress Update

Name: Daniel Medcalf
Week #: 8
Student ID:
Date:


1. What did I accomplish this week?

This week the site got its database.

- Read the current documentation before writing anything, because Prisma changed a lot in version 7. The database connection now lives in a config file instead of the schema, the client needs a driver adapter (there is one made for Neon), the generated client goes into the project instead of node_modules, and seeding is set up in the config too. Neon also wants two connection strings: a pooled one for the running site and a direct one for migrations.

- Designed the schema properly instead of just copying my JSON file into a table. There is one table for every named fish the site talks about (the 22 drawn koi, the six older fish they descend from that I have no artwork for, and the seven well-known varieties I mention but do not cover), a table of families, a plants table, a breeding outcomes table where both parents and the offspring are real foreign keys, and a sources table so every claim on the site links back to where it came from. One design decision worth noting: the second parent of a cross can be empty, which means "bred by selecting within a line" rather than a pairing of two named varieties. That happens once, for Gold Ogon.

- Wrote the seed script so it checks everything before it writes anything. Every content file is validated: every koi has its notes and its origin year, every family exists, every breeding cross names a real variety, every plant has at least two sources and a properly licensed photo. If any of that is wrong the seed refuses to run. The check can also run on its own without a database, which I will use in the build pipeline later.

- Created the Neon project, ran the first migration, and seeded it: 10 families, 35 varieties (22 of them koi), 15 breeding outcomes, 20 plants and 177 sources.

- Wrote a small check script that reads back through the site's own database client and tried out the recursive query I will use for the family tree in week 10. Asking the database for every ancestor of Showa correctly comes back with Kohaku and Ki Utsuri one step up, and Bekko and the wild Magoi two steps up.


2. What do I plan to work on next week?

Week 9 is the plants section, built from the database.

1. Build the plants grid and a page for each plant, reading from Neon, with the type filter, the care chips and the New Zealand status.

2. Add search across koi and plants using Postgres full-text search, exposed as a small read-only JSON API and a search box in the site header.

3. Keep the pages static and free to host: generate them at build time and revalidate on demand when the data changes.


3. Any challenges or blockers?

Two small things.

I put the real connection strings into the example environment file by mistake. It turned out the file was ignored by git anyway so nothing leaked, but I moved the secrets into the proper ignored file and fixed the example so the template is actually in the repository.

My first recursive query failed because Postgres only allows one recursive step in that kind of query and I had written two (one per parent). Restructuring it to look at both parents in a single step fixed it, and I also had to guard against a cross where a variety is refined by breeding it back to itself, which would otherwise loop.

The other thing is not a blocker but a direction. My tutor's feedback was that the database phase needs to carry real technical weight, so I am building it that way: proper foreign keys, validation, a recursive lineage query, and next week search and an API rather than only moving content into tables.


4. How do I feel about my overall progress?

[X] On track     [ ] Slightly behind     [ ] Falling behind

The database exists, it is populated, and the site's client can read it. Next week the site starts using it.
