Weekly Progress Update

Name: Daniel Medcalf
Week #: 9
Student ID:
Date:


1. What did I accomplish this week?

The plants section is live from the database, and the site got search and an API.

- Built the plants pages from Neon. The plants page is a grid of all 20 species with filters for floating, submerged and marginal, plus a "koi leave it alone" filter; the filters live in the page address so a filtered view can be shared. Each plant has its own page: the photo with its licence credit, chips for type, difficulty, koi-safety and New Zealand status, a coloured New Zealand callout (red for banned, green for native), and cards for how koi treat it, planting, hardiness and what it does for the pond, with sources and links to the other plants of the same type.

- Added full-text search inside Postgres. Each plant and each variety now has a generated search column, weighted so a match on the name counts for more than a match in the description, with an index on it. Typing part of a word works too. Anything the user types is cleaned and passed as a parameter, so I tested an SQL injection string against it and it just returns no results.

- Put a search box in the site header (pressing "/" opens it). It queries the API as you type and shows koi drawn from their artwork, plants, and the varieties I have no artwork for, with the matching words highlighted.

- Added a small read-only JSON API: all koi, one koi with its breeding outcomes, all plants, one plant, and search. It sits on the same cached queries as the pages, so both stay in step.

- Kept hosting free. The database is only read at build time or when I ask for a refresh: I turned on Next.js Cache Components, tagged every database read, and added a protected endpoint that refreshes a tag on demand after I re-seed. The plants pages are prerendered and revalidate once a day on their own.


2. What do I plan to work on next week?

Week 10 is the breeding data.

1. Move the family tree, the pairing explorer and each koi's breeding section onto the database, using the recursive lineage query from week 8.

2. Move the koi pages themselves onto the database as well, so the koi-dex and the plants section work the same way, and check the result against the old in-code data so nothing changed.

3. Retire the in-code breeding list once the pages read from the database, keeping it only as the seed source.


3. Any challenges or blockers?

None blocking.

The generated search column tripped over a Postgres rule: everything in a generated column has to be a function Postgres considers immutable, and joining the care notes array into text is not one, so care notes stay out of search. That is fine, they are on the koi pages.

Cache Components is new in Next.js 16 and changes how pages are prerendered, so I checked the whole site still built as static pages before adding anything to it. It did, and the plants pages came out prerendered with a one-day revalidate window, which is exactly what I wanted.


4. How do I feel about my overall progress?

[X] On track     [ ] Slightly behind     [ ] Falling behind

The database is now doing real work: pages, search and an API come from it, and hosting is still free.
