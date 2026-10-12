Weekly Progress Update

Name: Daniel Medcalf
Week #: 13
Student ID:
Date:


1. What did I accomplish this week?

Testing and feedback. The week split into two halves: building the thing that
collects the feedback, then running it.

- The automated side was already in place from week 11: unit tests over the
  fin-colour logic, the search query builder and the content, the
  database-versus-content parity check, and the build pipeline on every push.

- Wrote the user-testing plan: three to five people new to koi, on their own
  devices, six short tasks (find a fish, follow its lineage, check a pairing,
  find a number and say how much you trust it, check whether a plant is legal
  in New Zealand, and a free browse), then the closing questions and three
  1-to-5 scores. Problems seen by two or more people count as fixes.

- Built the test into the site rather than running it over someone's shoulder.
  Sitting with five people in one week was never going to happen, so
  /feedback now does the facilitator's job: a consent panel that says exactly
  what is recorded, the six tasks one screen at a time, and the closing
  questions. Three things make an unattended session still worth reading.
  Every task asks what answer they actually found, because without anyone
  watching, "I found it" and "I found the right thing" are different claims.
  The form keeps its own clock per task and voids it if they come back later,
  so the time is honest or absent, never wrong. And the whole draft lives in
  the browser, so a volunteer who gets interrupted on a phone does not lose
  ten minutes of typing and give up.

- The submissions go to Neon in two new tables. The endpoint is the only place
  on the site a stranger can write to, so the body is validated in a module of
  its own before Prisma is even loaded, keyed on a token the browser generates
  so a retry updates the same row instead of opening a second one, and covered
  by 17 new tests: unknown tasks, repeated tasks, scores off the scale,
  oversized text and bodies that are not objects all bounce. The suite is now
  31 tests. Nothing on the public site reads the answers back; they come out
  with npm run feedback:report, as markdown that pastes into the feedback log.

- Checked the whole path end to end against the live database: a submission
  stored, the same submission again leaving one row rather than two, malformed
  bodies rejected, and the report rendering the tables the log expects. The
  test row was then deleted.

- Ran it, and got one real session: Mario, on a laptop, who put his background
  down as "other". He finished all six tasks, four on his own and two "the hard
  way", and scored the site 4 for ease, 4 for trust and 5 for looking
  finished. No more sessions came in, so with Francisco's agreement I filled
  the set out to five with four simulated ones: scripted walk-throughs of the
  same tasks on the live site at phone, tablet and laptop sizes, for the kinds
  of visitor the real session did not cover. They are marked as simulated
  everywhere they appear. They carry no times, no scores and no quotes, and I
  did not let any fix rest on one of them alone.

- To keep the simulated sessions tied to something real, I measured the live
  pages instead of guessing. On a phone, Showa's breeding card starts 1.8
  screens down and the whole-lineage panel 2.8. The breeding guide is 19
  screens long, with the pairing explorer 4.9 screens down under the family
  tree. On the care guide the quick-facts card landed after all twelve
  sections, 13 screens down, and the table that proves the numbers 18 screens
  down. Those figures line up with what Mario wrote: the lineage is "simple
  enough if you can spot the breeding card", the breeding guide is
  "information overload at first", and nothing on the care page made the
  feeding temperature feel more or less believable.

- Fixed the top problems. Every koi page now has a row of jump links under the
  name (Care, Breeding, Whole lineage, Others in the family). The breeding
  guide has the same "on this page" row the care guide has had since week 5.
  On a phone the care guide's quick facts now come first, 2 screens down
  instead of 13, with a "checked against two sources" link under the heading
  and another on the feeding strip. The lineage panel now says to open a fish
  to see its own parents, because it groups ancestors by distance and not by
  parent. And the breeding guide stopped saying "the 22 varieties in the dex":
  there are 56 now, and the page counts them from the data.

- Redeployed and re-checked the affected pages at phone and laptop sizes:
  every jump link lands on a real section, nothing scrolls sideways at 390
  pixels, and the lint, the type check, the 31 tests and the 94-page
  production build all pass. The sessions, the measurements, the ranked
  problems and the fixes are written up in the feedback log.


2. What do I plan to work on next week?

1. Buffer week: anything that slipped, plus the two stretch features already
   built (the pond calculator and the animated koi) get a final check on the
   live site.

2. Start the final report from the project log, and plan the demo.


3. Any challenges or blockers?

The real constraint was scheduling, not building: a moderated think-aloud test
needs the tester and me free at the same time, five times over, in the week
before a report is due. Moving to unattended sessions solved that and cost the
two things a facilitator gives you, the running commentary and the stopwatch.
The typed answer per task and the form's own clock are what replace them, and
the free-text box after every task is where the commentary has to come from
instead.

Recruiting was the part that did not work. One real person in the time
available is thin, and I would rather say so than hide it. The simulated
sessions cover the screen sizes and backgrounds that one person could not, but
they show where a page makes a task long, not how often real people trip, and
there is still no real session on a phone.

Two surprises. Mario marked the banned-plant task as "the hard way" while his
comment said the answer was obvious, so without the typed answer I would have
logged a problem that was not there. And his one real struggle was with my
question, not the site: task 3 asks about the same cross that task 2 has just
had him read, and the pairing explorer happens to open on exactly that pair,
so the task never tested the two pickers at all. I left the task alone so the
sessions stay comparable, and wrote down what a second round should use
instead.


4. How do I feel about my overall progress?

[X] On track     [ ] Slightly behind     [ ] Falling behind

The build is finished and the fixes from testing are live. The honest weak
spot is the size of the test: one real session. The test itself found faults
in my own instrument as well as in the site, which is what it was for, and the
feedback log says plainly which evidence is real and which is simulated.
