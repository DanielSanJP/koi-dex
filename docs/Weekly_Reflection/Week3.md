Weekly Progress Update

Name: Daniel Medcalf
Week #: 3
Student ID:
Date:


1. What did I accomplish this week?

I built the site from the wireframes. It runs, and every page from last week's design now exists.

- Set up the Next.js project with TypeScript and Tailwind, and applied the brand from the moodboard: the Pally typeface loaded from font files, the colour palette as reusable design tokens, the sky-blue navigation bar and footer with their 3px divider, and the chunky green button style. I also added smooth scrolling to match the feel of my other site.

- Exported the koi data. I pulled the 22 real varieties out of the app's database into a single JSON file holding each koi's name, number, body sprite and fin colours, and copied the sprite images into the project so the site has no live backend to depend on. That is 26 image files, about 490 KB in total.

- Got the koi rendering working, which was the main technical goal. Each koi is drawn onto an HTML canvas as five layers in order (back fin, tail, body, dorsal fin, side fin), where the body is the variety's own sprite and the four fins come from shared white fin images that are multiplied by that variety's colour. This is the same method the app uses, so the koi look right rather than approximated.

- Built all six pages: the home page with a featured koi, the encyclopedia index with all 22 varieties plus search and filtering, an individual page for each variety (22 pages generated automatically), the breeding and care guides, and a placeholder for plants.

- Researched the content properly instead of writing from memory. Every variety has its name meaning, its classification family, its pattern and its documented origin, each with source links. Where sources disagree, such as who first bred Sanke or where Kumonryu came from, the site says the record is disputed rather than picking one version.


2. What do I plan to work on next week?

1. Improve the breeding guide. It works, but it reads as plain text, which is weak for the most visual subject on the site. I want a family tree showing how the varieties descend from one another, and the documented crossings shown with the actual koi rather than just their names.

2. Make each koi's page the hub for that variety, so its care information and its breeding lineage sit on the koi's own page instead of only in the general guides.

3. Research variety-specific care, meaning what is genuinely different about keeping each variety, rather than repeating the same general advice on all 22 pages.


3. Any challenges or blockers?

No blockers. Two problems came up and both are solved.

The layered rendering was slower to get right than expected. Colouring a fin the naive way wiped out the layers already drawn underneath it, because the transparent parts of one layer erased what was behind them. The fix was to colour each fin separately on its own hidden canvas, and then stack the finished layers.

The second was performance. The shared fin images are large, and with 22 koi on one page the browser was loading them over and over. I now load each image once and reuse it across every koi on the page.

I also started by using the flat preview pictures from the app on the index page, then replaced them with the proper layered rendering. Every koi on the site is now the real thing, and the preview images have been deleted.


4. How do I feel about my overall progress?

[X] On track     [ ] Slightly behind     [ ] Falling behind

The whole site is standing and the hardest technical part is behind me. From here the work is content and polish, rather than making things work at all.
