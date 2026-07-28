Weekly Progress Update

Name: Daniel Medcalf
Week #: 3
Student ID:
Date:


1. What did I accomplish this week?

I built the site from my wireframes. It runs now, and all the pages I designed last week exist.

- Set up the Next.js project with TypeScript and Tailwind, and put the design in: the Pally font, the colours saved so I can reuse them everywhere, the light blue bar at the top and bottom, and the green buttons. I also added smooth scrolling like my other site has.

- Got the koi data out of the app. I made one JSON file with the 22 koi in it, each with its name, number, body image and fin colours, and copied the images into the project. It's 26 image files and about 490 KB, so it all fits in the project and the site doesn't need a database yet.

- Got the koi drawing working, which was the main thing I wanted to do this week. Each koi is drawn on a canvas in five layers: back fin, tail, body, top fin, side fin. The body is that koi's own picture, and the fins are white pictures that get coloured in with that koi's colour. It's the same way the app does it, so the koi actually look right.

- Built all six pages: the home page with a koi on it, the list page with all 22 koi plus a search box and filters, a page for each koi (22 pages that get made automatically), the breeding and care guides, and a placeholder for the plants page.

- Looked up all the information properly instead of writing it from memory. Every koi has what its name means, what family it belongs to, what its pattern is and where it came from, with links to where I got it. Some things aren't agreed on, like who first bred Sanke, so I say that instead of just picking one answer.


2. What do I plan to work on next week?

1. Make the breeding guide better. It works but it's just text, which is boring for something this visual. I want a family tree that shows which koi came from which, and to show the actual koi in it instead of just their names.

2. Put each koi's care info and breeding info on its own page, instead of only having it in the guides.

3. Look up care info for each koi, so I can say what's actually different about looking after that one instead of repeating the same general advice 22 times.


3. Any challenges or blockers?

Nothing blocking me. Two things went wrong and I fixed both.

Getting the koi to draw took longer than I thought. When I coloured a fin, it wiped out the layers I'd already drawn underneath, because the see-through parts of the fin erased what was behind them. I fixed it by colouring each fin on its own hidden canvas first, then stacking them.

The other one was speed. The fin images are big, and with 22 koi on one page the browser was loading them again for every single koi. Now it loads each image once and reuses it.

I also used the app's flat preview pictures on the list page at first, then swapped them for the proper layered koi. Every koi on the site is the real drawing now and I deleted the preview images.


4. How do I feel about my overall progress?

[X] On track     [ ] Slightly behind     [ ] Falling behind

The whole site is up and the hardest part is done. The rest is mostly adding content and making it look better, not trying to get things to work.
