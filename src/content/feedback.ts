/* The week-13 user test, as the tester reads it.

   docs/USER_TESTING.md is the protocol this comes from. The tasks are in the
   order they must be attempted: each one lands the tester somewhere the next
   can start from, and task 6 is deliberately last so free browsing cannot
   teach them the answers to the first five.

   Sessions are unmoderated, so the wording has to carry what a facilitator
   would normally say out loud: no leading, no naming of the page that holds
   the answer, and a reason given for every question asked. */

export type TestTask = {
  id: string;
  /** Column label in docs/FEEDBACK_LOG.md. */
  short: string;
  title: string;
  prompt: string;
  /** What they type in. Asking for the answer is how an unmoderated session
      tells a real completion from a confident wrong one. */
  answerLabel: string;
  answerPlaceholder: string;
  commentLabel: string;
  /** What the task exercises. Never rendered: it would give the route away. */
  probes: string;
};

export const TASKS: TestTask[] = [
  {
    id: "find-a-fish",
    short: "T1",
    title: "Find a fish",
    prompt:
      "Find the koi called Showa, and tell me one thing about where it came from.",
    answerLabel: "What did you find out about where it came from?",
    answerPlaceholder: "Anything you read about its origin",
    commentLabel: "How did you go looking for it?",
    probes: "dex grid, search panel or family filter, koi detail page",
  },
  {
    id: "lineage",
    short: "T2",
    title: "Follow the family",
    prompt:
      "Showa was bred from two other koi. Which two? And where did one of those two come from in turn?",
    answerLabel: "Which fish, and which fish before them?",
    answerPlaceholder: "For example: X and Y, and Y came from Z",
    commentLabel: "Was the family history easy to follow, or not?",
    probes: "breeding card on the koi page, whole-lineage panel, family tree",
  },
  {
    id: "pairing",
    short: "T3",
    title: "Would these two work?",
    prompt:
      "A breeder crosses a Kohaku with a Ki Utsuri. Use the site to find out what that pairing is known for producing.",
    answerLabel: "What does the site say it produces?",
    answerPlaceholder: "The fish it names",
    commentLabel: "How did you find it, and did you trust the answer?",
    probes: "pairing explorer on the breeding guide (What do these two make?)",
  },
  {
    id: "trust-a-number",
    short: "T4",
    title: "A number you can trust",
    prompt:
      "Find the water temperature below which you should stop feeding koi. Then tell me how sure you are that the number is right, and what made you sure or unsure.",
    answerLabel: "What is the temperature, and how sure are you?",
    answerPlaceholder: "The number, then why you do or do not believe it",
    commentLabel: "Did anything on the page make it more or less believable?",
    probes: "care guide quick facts, feeding section, numbers-checked-twice table",
  },
  {
    id: "plant-legal",
    short: "T5",
    title: "Allowed here?",
    prompt:
      "You are in New Zealand and you like the look of water hyacinth for your pond. What does the site tell you about putting it in?",
    answerLabel: "What does the site say?",
    answerPlaceholder: "In your own words",
    commentLabel: "Was that clear the first time you read it?",
    probes: "plants grid, plant page, NZ status block",
  },
  {
    id: "free-browse",
    short: "T6",
    title: "Have a look around",
    prompt:
      "Last one, and there is nothing to get right. Spend about two minutes looking at whatever you like, then tell me where you ended up.",
    answerLabel: "Where did you go, and what caught your eye?",
    answerPlaceholder: "Whatever you opened",
    commentLabel: "Anything you expected to find and could not?",
    probes: "unguided navigation; what the site pulls people towards",
  },
];

export type ClosingQuestion = {
  id: "purpose" | "confusing" | "useful" | "deviceTrouble" | "oneChange";
  label: string;
  help?: string;
  placeholder: string;
};

export const CLOSING_QUESTIONS: ClosingQuestion[] = [
  {
    id: "purpose",
    label: "In your own words, what is this site for, and who is it for?",
    help: "I want to know whether that came across on its own.",
    placeholder: "Whatever impression you got",
  },
  {
    id: "confusing",
    label: "What was the most confusing moment?",
    help: "This is the single most useful answer on the page. Please be blunt.",
    placeholder: "Where you got stuck, even briefly",
  },
  {
    id: "useful",
    label: "What was the most useful thing you found?",
    placeholder: "Anything you would come back for",
  },
  {
    id: "deviceTrouble",
    label: "Did anything feel cramped, slow or broken on your device?",
    help: "Text too small, a button you had to aim at, a page that took its time.",
    placeholder: "Or say no if it all behaved",
  },
  {
    id: "oneChange",
    label: "If you could change one thing, what would it be?",
    placeholder: "One thing",
  },
];

export type ScoreQuestion = {
  id: "easeScore" | "trustScore" | "finishedScore";
  label: string;
  low: string;
  high: string;
};

export const SCORE_QUESTIONS: ScoreQuestion[] = [
  {
    id: "easeScore",
    label: "Easy to use",
    low: "hard work",
    high: "no effort",
  },
  {
    id: "trustScore",
    label: "Trustworthy",
    low: "would check elsewhere",
    high: "would rely on it",
  },
  {
    id: "finishedScore",
    label: "Looks finished",
    low: "unfinished",
    high: "a real site",
  },
];

/** The consent panel. Plain statements, because a volunteer should be able to
    read it in fifteen seconds and know exactly what they are agreeing to. */
export const CONSENT = {
  intro:
    "Koi-dex is a reference site about real koi. I built it as a school project, and before I hand it in I need to watch people who are new to it try to use it.",
  duration: "About fifteen minutes, on whatever device you are holding.",
  stance:
    "I am testing the site, not you. There are no wrong answers, and anything that confuses you is a fault in the site, not in your reading of it. Confusion is the thing I most need to hear about.",
  collected: [
    "Your answers, and how long each task took you.",
    "The kind of device and browser you used, and how wide the screen is.",
    "A nickname, only if you choose to give one.",
  ],
  notCollected:
    "No name, no email, no account, no location, nothing that identifies you. You can skip any question and stop at any point.",
  use: "The answers go into a written report for the assignment, and into a list of things to fix. Nothing is published anywhere else.",
} as const;
