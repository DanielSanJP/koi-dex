/* Read the user-test sessions back out of Neon as markdown:
   `npx tsx scripts/feedback-report.ts` (add --verbatim for every answer in
   full). Paste the output into docs/FEEDBACK_LOG.md.

   Ranking the problems stays a human job, so this stops at the evidence: who
   tested, how each task went, how long it took, what they said, and a tally of
   which tasks hurt. The last of those is the input to the fix loop, because a
   task two or more people struggled with is a fix, not a note. */
import "dotenv/config";
import { prisma } from "../src/lib/db";
import { TASKS, CLOSING_QUESTIONS } from "../src/content/feedback";
import {
  BACKGROUND_LABEL,
  DEVICE_LABEL,
  RESULT_CODE,
  type Background,
  type Device,
  type TaskResult,
} from "../src/lib/feedback";

const verbatim = process.argv.includes("--verbatim");

const mins = (seconds: number | null) =>
  seconds === null ? "" : ` ${(seconds / 60).toFixed(1)}`;

/** Keep a pasted table on one line: pipes and newlines would break the row. */
const cell = (s: string | null) =>
  !s ? "" : s.replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " / ").trim();

const date = (d: Date) => d.toISOString().slice(0, 10);

async function main() {
  const sessions = await prisma.feedbackSession.findMany({
    orderBy: { submittedAt: "asc" },
    include: { answers: true },
  });

  if (sessions.length === 0) {
    console.log("No sessions yet. The form is at /feedback.");
    await prisma.$disconnect();
    return;
  }

  const head = ["#", "Date", "Who", "Device", "Background"];
  const scoreHead = ["Ease", "Trust", "Finished"];
  console.log("## Sessions\n");
  console.log(`| ${[...head, ...TASKS.map((t) => t.short), ...scoreHead].join(" | ")} |`);
  console.log(`|${"---|".repeat(head.length + TASKS.length + scoreHead.length)}`);

  sessions.forEach((s, i) => {
    const byTask = new Map(s.answers.map((a) => [a.taskId, a]));
    const cells = TASKS.map((t) => {
      const a = byTask.get(t.id);
      return a ? `${RESULT_CODE[a.result as TaskResult]}${mins(a.seconds)}` : "";
    });
    console.log(
      `| ${[
        i + 1,
        date(s.submittedAt),
        cell(s.nickname) || "anon",
        s.device ? DEVICE_LABEL[s.device as Device] : "",
        s.background ? BACKGROUND_LABEL[s.background as Background] : "",
        ...cells,
        s.easeScore ?? "",
        s.trustScore ?? "",
        s.finishedScore ?? "",
      ].join(" | ")} |`,
    );
  });

  console.log(
    "\nResult codes: A = alone, H = got there the hard way, N = not completed, - = skipped; the number after is minutes on task.\n",
  );

  // Where it hurt. Anything two or more people hit is a fix by the protocol.
  console.log("## Where people struggled\n");
  console.log("| Task | Alone | Struggled | Failed | Skipped | Median minutes |");
  console.log("|---|---|---|---|---|---|");
  for (const t of TASKS) {
    const rows = sessions.flatMap((s) => s.answers.filter((a) => a.taskId === t.id));
    const count = (r: TaskResult) => rows.filter((a) => a.result === r).length;
    const times = rows
      .map((a) => a.seconds)
      .filter((n): n is number => n !== null)
      .sort((a, b) => a - b);
    const median = times.length
      ? (times[Math.floor((times.length - 1) / 2)] / 60).toFixed(1)
      : "";
    console.log(
      `| ${t.short} ${t.title} | ${count("ALONE")} | ${count("STRUGGLED")} | ${count("FAILED")} | ${count("SKIPPED")} | ${median} |`,
    );
  }

  const scored = (k: "easeScore" | "trustScore" | "finishedScore") => {
    const vals = sessions.map((s) => s[k]).filter((n): n is number => n !== null);
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "n/a";
  };
  console.log(
    `\nMean scores over ${sessions.length} session${sessions.length === 1 ? "" : "s"}: ease ${scored("easeScore")}, trust ${scored("trustScore")}, looks finished ${scored("finishedScore")}.\n`,
  );

  console.log("## What people said\n");
  for (const [i, s] of sessions.entries()) {
    const who = s.nickname ?? `session ${i + 1}`;
    console.log(`### ${who}, ${s.device ? DEVICE_LABEL[s.device as Device] : "unknown device"}\n`);
    for (const t of TASKS) {
      const a = s.answers.find((x) => x.taskId === t.id);
      if (!a) continue;
      const said = [a.answer, a.comment].filter(Boolean).join(" | ");
      if (!said && !verbatim) continue;
      console.log(`- **${t.short}** (${a.result.toLowerCase()}): ${said || "no comment"}`);
    }
    for (const q of CLOSING_QUESTIONS) {
      const value = s[q.id];
      if (!value) continue;
      console.log(`- **${q.label}** ${value}`);
    }
    console.log("");
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
