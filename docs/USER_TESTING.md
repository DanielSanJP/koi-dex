# User testing plan (week 13)

Goal: get three to five people who are new to koi through the live site on
their own device, find the top problems, fix them, and record what changed.

Sessions are **unmoderated**. Each tester opens
`https://koi-dex.vercel.app/feedback`, works through six tasks at their own
pace and types what they found. The form is the facilitator: it carries the
consent panel, the tasks one screen at a time, the timing, and the closing
questions. Nothing is asked in person, so nothing depends on me being free at
the same time as five other people in week 13.

Results land in Neon (`feedback_sessions`, `feedback_answers`) and come back
out as markdown with `npm run feedback:report`, which is what goes into
`docs/FEEDBACK_LOG.md`.

## Who

3-5 people. Ideal mix: one who keeps fish, one who gardens, one who does
neither; at least one on a phone, at least one on a laptop. No developers if
possible. The form asks which of those they are, so the mix can be checked
afterwards rather than assumed.

## What to send them

> I have built a website about koi for a school project and I need people who
> know nothing about koi to try it. It takes about fifteen minutes on your
> phone or laptop, there is nothing to install and nothing to sign up for:
> https://koi-dex.vercel.app/feedback

Nothing else. Any explanation of what the site does, where things are, or what
it is for is exactly the knowledge the test is trying to measure.

## The tasks

Authored in `src/content/feedback.ts`, in this order, because each one leaves
the tester somewhere the next can start from and the free browse is last so it
cannot teach them the earlier answers.

1. **Find a fish.** Showa, and one thing about where it came from.
   (dex grid, search panel or family filter, koi detail page)
2. **Follow the family.** Which two koi Showa came from, and where one of
   those came from in turn. (breeding card, whole-lineage panel, family tree)
3. **Would these two work?** What Kohaku crossed with Ki Utsuri produces.
   (pairing explorer on the breeding guide)
4. **A number you can trust.** The temperature to stop feeding below, and how
   sure they are. (care guide quick facts, feeding section, numbers table)
5. **Allowed here?** Water hyacinth in a New Zealand pond. (plants grid, plant
   page, NZ status block)
6. **Have a look around.** Two minutes, unguided.

Every task asks three things: **what answer they found**, how it went
(unaided / the hard way / could not / skipping), and what went through their
head. The answer field is what makes an unmoderated session honest: without
someone watching, "I found it" and "I found the right thing" are different
claims, and only the typed answer separates them.

## What the form records

The tester's answers, seconds on each task (its own clock, stopped when they
leave the screen, voided if they come back to a task later), the device and
background they chose, the browser and window width at submit, and a nickname
if they give one. No name, no email, no account, no IP, no location. The
consent panel says all of this before they start, and they can skip any
question.

## After the tasks

The form asks, in order: what the site is for and who it is for, the most
confusing moment, the most useful thing, whether anything felt cramped, slow
or broken, and one thing they would change. Then three scores out of five:
easy to use, trustworthy, looks finished.

## Scoring

Per task: A = alone, H = got there the hard way, N = not completed, - =
skipped, with minutes beside it. A problem seen by two or more people is a
fix; one person is a note. `npm run feedback:report` tallies the four results
per task and the median time, which is the ranking input.

## Fix loop

Rank problems by (how many hit it) x (how badly). Fix the top three to five,
redeploy, and re-run the affected task with one person if possible. Log every
change in `docs/FEEDBACK_LOG.md` and `PROJECT_LOG.md`.

## Running it

```bash
npm run feedback:report              # markdown for FEEDBACK_LOG.md
npm run feedback:report -- --verbatim # include answers with no comment
```

The form is at `/feedback`, kept out of the navigation, the sitemap and
`robots.txt`: it is an instrument for a handful of invited people, not part of
the reference site.
