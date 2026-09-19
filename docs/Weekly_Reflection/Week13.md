Weekly Progress Update  [DRAFT: finish after the user-testing sessions]

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

- [TODO] Ran [N] sessions: [who, devices]. Task results: [summary]. Scores:
  ease [x], trust [y], looks finished [z].

- [TODO] Top problems found and what I changed: [list, with commits].

- [TODO] Redeployed and re-checked the affected tasks.


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

[TODO] Recruiting testers / anything surprising in the sessions.


4. How do I feel about my overall progress?

[X] On track     [ ] Slightly behind     [ ] Falling behind

[TODO]
