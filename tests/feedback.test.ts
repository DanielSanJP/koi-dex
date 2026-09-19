import { describe, expect, it } from "vitest";
import { CLOSING_QUESTIONS, SCORE_QUESTIONS, TASKS } from "@/content/feedback";
import { LIMITS, parseSubmission } from "@/lib/feedback";

/* POST /api/feedback is the one endpoint a stranger can write to, so the rules
   that keep it narrow are held here rather than trusted to review. */

const TASK_IDS = TASKS.map((t) => t.id);

const submission = (over: Record<string, unknown> = {}) => ({
  token: "9f1d0a2c-0000-4000-8000-000000000000",
  nickname: "Sam",
  background: "GARDENER",
  device: "PHONE",
  browser: "Safari 18",
  viewportWidth: 390,
  purpose: "Looking up koi.",
  confusing: "",
  useful: "The plant pages.",
  deviceTrouble: null,
  oneChange: "Bigger search button.",
  easeScore: 4,
  trustScore: 5,
  finishedScore: 4,
  answers: [
    { taskId: TASK_IDS[0], result: "ALONE", seconds: 45, answer: "Japan, 1920s", comment: "Used search" },
    { taskId: TASK_IDS[1], result: "STRUGGLED", seconds: 150, answer: "Kohaku and Ki Utsuri", comment: "" },
  ],
  ...over,
});

describe("content: the user test", () => {
  it("has six tasks with unique ids and report labels", () => {
    expect(TASKS).toHaveLength(6);
    expect(new Set(TASK_IDS).size).toBe(6);
    expect(TASKS.map((t) => t.short)).toEqual(["T1", "T2", "T3", "T4", "T5", "T6"]);
  });
  it("keeps the probe notes out of the tester's copy", () => {
    for (const t of TASKS) {
      const shown = [t.title, t.prompt, t.answerLabel, t.commentLabel].join(" ");
      expect(shown).not.toContain(t.probes);
    }
  });
  it("asks every closing question and score the log has a column for", () => {
    expect(CLOSING_QUESTIONS.map((q) => q.id)).toEqual([
      "purpose",
      "confusing",
      "useful",
      "deviceTrouble",
      "oneChange",
    ]);
    expect(SCORE_QUESTIONS.map((q) => q.id)).toEqual([
      "easeScore",
      "trustScore",
      "finishedScore",
    ]);
  });
});

describe("feedback: a good submission", () => {
  it("is accepted, trimmed and emptied to null", () => {
    const parsed = parseSubmission(
      submission({ nickname: "  Sam  ", confusing: "   " }),
      TASK_IDS,
    );
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.value.nickname).toBe("Sam");
    expect(parsed.value.confusing).toBeNull();
    expect(parsed.value.answers).toHaveLength(2);
    expect(parsed.value.answers[1].comment).toBeNull();
  });
  it("accepts a session that answered nothing at all", () => {
    const parsed = parseSubmission({ token: "t", answers: [] }, TASK_IDS);
    expect(parsed.ok).toBe(true);
  });
  it("drops an implausible clock but keeps the answer", () => {
    const parsed = parseSubmission(
      submission({
        answers: [
          { taskId: TASK_IDS[0], result: "ALONE", seconds: LIMITS.seconds + 1, answer: "Japan" },
        ],
      }),
      TASK_IDS,
    );
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.value.answers[0].seconds).toBeNull();
    expect(parsed.value.answers[0].answer).toBe("Japan");
  });
});

describe("feedback: a bad submission", () => {
  const rejects = (over: Record<string, unknown>, matching: RegExp) => {
    const parsed = parseSubmission(submission(over), TASK_IDS);
    expect(parsed.ok).toBe(false);
    if (parsed.ok) return;
    expect(parsed.error).toMatch(matching);
  };

  it("needs a token", () => rejects({ token: "" }, /token/));
  it("needs an array of answers", () => rejects({ answers: "none" }, /answers/));
  it("refuses a task that is not in the test", () =>
    rejects(
      { answers: [{ taskId: "drop-tables", result: "ALONE" }] },
      /unknown task/,
    ));
  it("refuses a task answered twice", () =>
    rejects(
      {
        answers: [
          { taskId: TASK_IDS[0], result: "ALONE" },
          { taskId: TASK_IDS[0], result: "FAILED" },
        ],
      },
      /twice/,
    ));
  it("refuses a result it does not know", () =>
    rejects({ answers: [{ taskId: TASK_IDS[0], result: "GREAT" }] }, /result/));
  it("refuses a missing result", () =>
    rejects({ answers: [{ taskId: TASK_IDS[0], answer: "Japan" }] }, /required/));
  it("refuses a score off the scale", () => rejects({ easeScore: 9 }, /between 1 and 5/));
  it("refuses a fractional score", () => rejects({ trustScore: 4.5 }, /whole number/));
  it("refuses an essay in a text field", () =>
    rejects({ purpose: "x".repeat(LIMITS.text + 1) }, /characters or fewer/));
  it("refuses more answers than there are tasks", () =>
    rejects(
      { answers: TASKS.concat(TASKS).map((t) => ({ taskId: t.id, result: "ALONE" })) },
      /at most/,
    ));
  it("refuses a body that is not an object", () => {
    expect(parseSubmission("hello", TASK_IDS).ok).toBe(false);
    expect(parseSubmission(null, TASK_IDS).ok).toBe(false);
    expect(parseSubmission([1, 2], TASK_IDS).ok).toBe(false);
  });
});
