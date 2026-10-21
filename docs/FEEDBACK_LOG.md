# Feedback log (week 13)

Sessions come from the form at `/feedback`. The tables are what
`npm run feedback:report` prints. The protocol is in `docs/USER_TESTING.md`.

## Where this session came from

One session came in: Mario, on a laptop, on 21 September 2026, through the
form. It is stored in Neon and reproduced below exactly as the report prints
it, spelling included.

One laptop session cannot show what a visitor meets on a phone, or how often
people trip. So the live pages were measured to check what Mario reported,
and every fix below stands on his own answers, a measurement of the live page,
or both.

The measuring was done with headless Chrome against the live site on 12
October 2026, at 390 x 844 for the phone, 820 x 1180 for the tablet and
1280 x 800 for the laptop. "Screens down" means how far the top of a thing is
from the top of the page, in screen heights at that size.

## Sessions

| # | Date | Who | Device | Background | T1 | T2 | T3 | T4 | T5 | T6 | Ease | Trust | Finished |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2026-09-21 | Mario | laptop | other | A 1.2 | A 2.0 | H 2.4 | A 3.0 | H 1.9 | A 1.8 | 4 | 4 | 5 |

Result codes: A = alone, H = got there the hard way, N = not completed,
`-` = skipped; the number beside it is minutes on task. T6 is the free browse.

## Where people struggled

| Task | Alone | Struggled | Failed | Skipped | Median minutes |
|---|---|---|---|---|---|
| T1 Find a fish | 1 | 0 | 0 | 0 | 1.2 |
| T2 Follow the family | 1 | 0 | 0 | 0 | 2.0 |
| T3 Would these two work? | 0 | 1 | 0 | 0 | 2.4 |
| T4 A number you can trust | 1 | 0 | 0 | 0 | 3.0 |
| T5 Allowed here? | 0 | 1 | 0 | 0 | 1.9 |
| T6 Have a look around | 1 | 0 | 0 | 0 | 1.8 |

Four tasks alone, two the hard way (T3 and T5), none failed.

Scores: ease 4, trust 4, looks finished 5, each out of 5.

## What people said

### Mario, laptop (verbatim)

- **T1** (alone): First produced in 1927 by Jukichi Hoshino by crossing a Kohaku with a Ki Utsuri. The modern type was perfected in the 1960s when Tomiji Kobayashi bred in intensely red Kohaku blood. | typed showa in search bar and clicked on fish card
- **T2** (alone): Kohaku with a Ki Utsuri.  Ki ustsuri came from a Ki Bekko and Magoi | Simple enough if you can spot the breeding card, otherwise if you dont look probably could be a couple more steps to get there
- **T3** (struggled): Showa | Found it but double guessed myself because of the question asked felt like a repeat, not because of the info the site stated
- **T4** (alone): Below 10 degrees. Located it in the care section, info provided made it feel more reliable to trust | Neither, I felt no indication through the use of UI elements and styles that made it feel more believable or unbelievable
- **T5** (struggled): Banned in NZ | Banned in NZ was pretty obvious, the change in red colour  for the background made it stand out more in contrast with the rest of the UI
- **T6** (alone): Plants. The images and colours of the plant catalogue looked interesting and drew my attention. The plants catalogue felt a bit more vibrant than the fish catalogue as a result. The fish look cool but the variances with the shapes made the plants stand out a bit more | Possibly images of actual koi as well to pair with their drawn counterpart. Otherwise nothing much else
- **In your own words, what is this site for, and who is it for?** People  who want to get started with owning koi of their own
- **What was the most confusing moment?** Probably the breeding, its a bit of information overload at first since there seems to be a lot of options
- **What was the most useful thing you found?** Knowing that NZ actually bans certain plants like the one mentioned in the questionnaire
- **Did anything feel cramped, slow or broken on your device?** Nah looks fin on pc device, didnt have issues with responsiveness
- **If you could change one thing, what would it be?** Inclusion of actual koi images

Two things in Mario's session are worth reading twice. He recorded T5 as "the
hard way" while his comment says the answer was obvious, so the code and the
comment disagree and the comment is the better evidence; it is left as he
recorded it. And his T3 struggle was with the question, not the site: see
"Limits of this round".

## What the live pages measured

Before the fixes, on the live site.

| Page | What | Phone | Tablet | Laptop |
|---|---|---|---|---|
| Showa | Breeding card, screens down | 1.8 | 0.9 | 0.8 |
| Showa | Whole lineage panel, screens down | 2.8 | 1.5 | 1.8 |
| Breeding guide | Length in screens | 19.1 | 8.9 | 9.8 |
| Breeding guide | "What do these two make?", screens down | 4.9 | 1.6 | 2.1 |
| Care guide | Length in screens | 24.0 | 12.5 | 15.7 |
| Care guide | Quick facts, screens down | 13.3 | 0.8 | 1.2 |
| Care guide | "Every number, checked twice", screens down | 17.8 | 9.0 | 10.8 |
| Water hyacinth | "Banned in NZ" block, screens down | 1.1 | 0.5 | 0.8 |

The numbers match what Mario wrote. On a phone the Showa page runs picture,
description and care card before the Breeding card, with nothing above it
saying it is there ("simple enough if you can spot the breeding card"). The
breeding guide is 19 screens long on a phone with no list of what is on it
("a bit of information overload at first"). The care guide's quick facts sit
after all twelve sections on a phone, and the only pointer to the audit table
was a small link at the foot of the quick-facts card ("no indication through
the use of UI elements and styles that made it feel more believable"). The
water hyacinth page carries the status as a red chip under the name, on the
first screen at every size: the one answer nobody has to hunt for.

## Problems found (ranked)

Ranked by how badly each one slows a visitor. "Seen by" says what each one
stands on.

| Rank | Problem | Seen by | Severity | Fix | Commit |
|---|---|---|---|---|---|
| 1 | On a koi page the Breeding card and the Whole lineage panel are below the fold and nothing above says they exist | Mario (T2 comment); measured | High on a phone | An "on this page" row under the fish's name: Care, Breeding, Whole lineage, Others in the family | Week 13: fixes from the user test |
| 2 | The breeding guide is long and has no contents list | Mario (most confusing moment); measured | High on a phone | The same jump-link row the care guide has | same |
| 3 | Nothing beside a care number says it was checked, and on a phone the quick facts came after all twelve sections | Mario (T4 comment); measured | Medium | Quick facts first on a phone; a "checked against two sources" link under its heading and on the feeding strip | same |
| 4 | The Whole lineage panel groups ancestors by distance, not by parent: Ki Bekko and Magoi sit at "2 steps" from Showa with no word on which parent they belong to | Found in the page data while measuring | Low | One sentence on the panel: open any fish to see its own parents | same |
| 5 | The breeding guide still said "the 22 varieties in the dex" when the dex has 56 | Found during the fix pass | Low, but wrong | Counted from the data, so it cannot go stale again | same |

## What changed because of testing

- **Koi pages.** A row of jump links under the name and chips: Care,
  Breeding, Whole lineage, Others in the family. On a phone it sits 555 px
  down, on the first screen, where the Breeding card used to be 1.8 screens
  away.
- **Breeding guide.** A seven-link "on this page" row under the introduction,
  and an anchor on every section. "What do these two make?" is one tap from
  the top instead of 4.9 screens of scrolling on a phone.
- **Care guide.** On a phone the quick-facts card now comes before the long
  sections: 2.0 screens down instead of 13.3. Its link to the audit table
  moved from the foot of the card to directly under the heading and now says
  what it is ("Each checked against two sources"). The feeding strip has the
  same link.
- **Whole lineage panel.** Its description now ends "Open any fish to see its
  own parents."
- **Breeding guide.** The variety count is read from the data.

Re-checked after the fixes at phone and laptop sizes: every jump link lands on
a section that exists, no page scrolls sideways at 390 px, and lint, types,
the 31 tests and the 94-page production build all pass.

## Not changed, and why

- **Photographs of real koi beside the drawings.** Mario asked twice. One
  person is a note by the protocol, and 56 licensed photographs is a content
  project, not a fix. It goes into the final report as a recommendation.
- **The plants catalogue looking livelier than the fish catalogue.** One
  person, and a fair observation: photographs against flat artwork. Same
  recommendation.

## Limits of this round

- **One person.** The counts above are one session, so they say where Mario
  found a task long, not how often people trip. The fixes were chosen so that
  each one stands on Mario's answers or a measurement.
- **Task 3 did not test what it was meant to.** It asks what Kohaku crossed
  with Ki Utsuri produces, which is the cross task 2 has just had the tester
  read, and the pairing explorer happens to open on exactly that pair. Mario
  said the question felt like a repeat, and he was right. The task was left
  alone so a second round stays comparable with this one; that round should
  use a pair that is not the default, such as Sanke and Gold Ogon.
- **No phone session.** The phone findings are measured, not observed. A
  tester on a phone is the first thing a second round needs.
