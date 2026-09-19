import { NextResponse, type NextRequest } from "next/server";
import { TASKS } from "@/content/feedback";
import { LIMITS, parseSubmission } from "@/lib/feedback";

/* POST /api/feedback: one completed user-test session.

   The only public write on the site, so it is deliberately narrow. The body
   is validated by src/lib/feedback.ts before Prisma is even imported, the
   import is dynamic so a build without DATABASE_URL still succeeds (CI builds
   that way on purpose), and a session is keyed on the tester's own token, so
   a retry after a dropped connection updates their row instead of adding a
   second one. Nothing here is cached and nothing is read back: the results
   come out through scripts/feedback-report.ts, against the database. */

const TASK_IDS = TASKS.map((t) => t.id);

const bad = (error: string, status = 400) =>
  NextResponse.json({ error }, { status });

export async function POST(req: NextRequest) {
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > LIMITS.bytes) return bad("That is more than I can store", 413);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("body must be JSON");
  }

  const parsed = parseSubmission(body, TASK_IDS);
  if (!parsed.ok) return bad(parsed.error);
  const session = parsed.value;

  if (!process.env.DATABASE_URL) {
    return bad("The feedback database is not configured here", 503);
  }

  const { prisma } = await import("@/lib/db");
  const { token, answers, ...fields } = session;

  try {
    const row = await prisma.feedbackSession.upsert({
      where: { token },
      create: { token, ...fields },
      update: { ...fields, submittedAt: new Date() },
    });
    // Replace rather than merge: a resubmission is the whole session again,
    // and a task the tester went back and skipped should not linger.
    await prisma.$transaction([
      prisma.feedbackAnswer.deleteMany({ where: { sessionId: row.id } }),
      prisma.feedbackAnswer.createMany({
        data: answers.map((a) => ({ sessionId: row.id, ...a })),
      }),
    ]);
    return NextResponse.json({ ok: true, answers: answers.length }, { status: 201 });
  } catch (e) {
    console.error("feedback: could not save session", e);
    return bad("Could not save that. Please try again in a moment.", 500);
  }
}
