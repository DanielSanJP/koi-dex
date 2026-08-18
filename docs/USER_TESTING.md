# User testing plan (week 13)

Goal: watch three to five people who are new to koi use the live site on
their own device, find the top problems, fix them, and record what changed.
Sessions are short (15 minutes), think-aloud, no leading. Results go in
`docs/FEEDBACK_LOG.md`.

## Who

3–5 people. Ideal mix: one who keeps fish, one who gardens, one who does
neither; at least one on a phone, at least one on a laptop. No developers
if possible.

## Setup

- Live URL open on the participant's own device (not mine).
- A notes file open for me. Record: device, browser, time per task, where
  they hesitated, anything said out loud, anything that broke.
- Say: "I am testing the site, not you. Please talk me through what you are
  thinking. There are no wrong answers. If something is confusing, that is
  exactly what I need to hear."

## Tasks (in this order)

1. **Find a fish.** "Find the koi called Showa and tell me one thing about
   where it came from." (dex grid, search or family filter, detail page)
2. **Follow the lineage.** "Which fish is Showa bred from, and what fish was
   *that* bred from?" (breeding card or Whole lineage panel)
3. **Would these two breed a Showa?** "Use the site to check what Kohaku
   crossed with Ki Utsuri produces." (pairing explorer)
4. **A number you can trust.** "Find the temperature below which you should
   stop feeding koi, and tell me how confident you are that it is right and
   why." (care guide, quick facts, numbers-checked-twice table)
5. **Legal here?** "You are in New Zealand and want to put water hyacinth in a
   pond. What does the site say?" (plants grid, plant page, NZ status)
6. **Free browse (2 min).** "Look at anything you like." Note what they open
   and what they say.

## After the tasks (ask, then write down verbatim)

- What was this site for? Who is it for?
- What was the most confusing moment?
- What was the most useful thing you found?
- On your phone, did anything feel cramped, slow or broken?
- One thing you would change.
- Score 1–5: easy to use / trustworthy / looks finished.

## Scoring

Per task: completed alone / completed with a hint / not completed, plus time.
A problem seen by two or more people is a fix; one person is a note.

## Fix loop

Rank problems by (how many hit it) × (how badly). Fix the top three to
five, redeploy, and re-run the affected task with one person if possible.
Log every change in `docs/FEEDBACK_LOG.md` and `PROJECT_LOG.md`.
