/* Shapes and validation for the week-13 user test.

   POST /api/feedback is the one endpoint on the site a stranger can write to,
   so the body is checked here, in a pure module with no Prisma import, and
   the route handler does nothing but persist what comes back. That also lets
   tests/feedback.test.ts hold the rules to account without a database. */

export const TASK_RESULTS = ["ALONE", "STRUGGLED", "FAILED", "SKIPPED"] as const;
export type TaskResult = (typeof TASK_RESULTS)[number];

export const BACKGROUNDS = ["FISH_KEEPER", "GARDENER", "NEITHER", "OTHER"] as const;
export type Background = (typeof BACKGROUNDS)[number];

export const DEVICES = ["PHONE", "TABLET", "LAPTOP", "DESKTOP"] as const;
export type Device = (typeof DEVICES)[number];

/** Report shorthand, as docs/FEEDBACK_LOG.md writes it. */
export const RESULT_CODE: Record<TaskResult, string> = {
  ALONE: "A",
  STRUGGLED: "H",
  FAILED: "N",
  SKIPPED: "-",
};

export const BACKGROUND_LABEL: Record<Background, string> = {
  FISH_KEEPER: "keeps fish",
  GARDENER: "gardens",
  NEITHER: "neither",
  OTHER: "other",
};

export const DEVICE_LABEL: Record<Device, string> = {
  PHONE: "phone",
  TABLET: "tablet",
  LAPTOP: "laptop",
  DESKTOP: "desktop",
};

export type AnswerInput = {
  taskId: string;
  result: TaskResult;
  seconds: number | null;
  answer: string | null;
  comment: string | null;
};

export type SubmissionInput = {
  token: string;
  nickname: string | null;
  background: Background | null;
  device: Device | null;
  browser: string | null;
  viewportWidth: number | null;
  purpose: string | null;
  confusing: string | null;
  useful: string | null;
  deviceTrouble: string | null;
  oneChange: string | null;
  easeScore: number | null;
  trustScore: number | null;
  finishedScore: number | null;
  answers: AnswerInput[];
};

/* Caps, not guesses: long enough that nobody writing in good faith hits one,
   short enough that the free tier cannot be filled by a single POST. */
export const LIMITS = {
  /** Serialized body, checked against Content-Length before parsing. */
  bytes: 64 * 1024,
  token: 64,
  nickname: 60,
  browser: 120,
  text: 2000,
  /** Four hours: anything longer is a tab left open, not time on task. */
  seconds: 4 * 60 * 60,
} as const;

const FREE_TEXT = [
  "purpose",
  "confusing",
  "useful",
  "deviceTrouble",
  "oneChange",
] as const;

const SCORES = ["easeScore", "trustScore", "finishedScore"] as const;

type Parsed<T> = { ok: true; value: T } | { ok: false; error: string };

const fail = (error: string): Parsed<never> => ({ ok: false, error });

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Trim, collapse to null when empty, and reject anything over `max`.
    Returning an error rather than truncating keeps the tester's words whole:
    a silently cut answer is worse than a rejected one they can shorten. */
function text(
  value: unknown,
  field: string,
  max: number,
): Parsed<string | null> {
  if (value === null || value === undefined || value === "") {
    return { ok: true, value: null };
  }
  if (typeof value !== "string") return fail(`${field} must be a string`);
  const trimmed = value.trim();
  if (trimmed === "") return { ok: true, value: null };
  if (trimmed.length > max) {
    return fail(`${field} must be ${max} characters or fewer`);
  }
  return { ok: true, value: trimmed };
}

function score(value: unknown, field: string): Parsed<number | null> {
  if (value === null || value === undefined || value === "") {
    return { ok: true, value: null };
  }
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return fail(`${field} must be a whole number`);
  }
  if (value < 1 || value > 5) return fail(`${field} must be between 1 and 5`);
  return { ok: true, value };
}

function member<T extends string>(
  value: unknown,
  field: string,
  allowed: readonly T[],
): Parsed<T | null> {
  if (value === null || value === undefined || value === "") {
    return { ok: true, value: null };
  }
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    return fail(`${field} must be one of ${allowed.join(", ")}`);
  }
  return { ok: true, value: value as T };
}

function answer(value: unknown, taskIds: readonly string[]): Parsed<AnswerInput> {
  if (!isObject(value)) return fail("each answer must be an object");
  const taskId = value.taskId;
  if (typeof taskId !== "string" || !taskIds.includes(taskId)) {
    return fail(`unknown task ${JSON.stringify(taskId)}`);
  }
  const result = member(value.result, `${taskId}.result`, TASK_RESULTS);
  if (!result.ok) return result;
  if (result.value === null) return fail(`${taskId}.result is required`);

  const answered = text(value.answer, `${taskId}.answer`, LIMITS.text);
  if (!answered.ok) return answered;
  const comment = text(value.comment, `${taskId}.comment`, LIMITS.text);
  if (!comment.ok) return comment;

  let seconds: number | null = null;
  if (value.seconds !== null && value.seconds !== undefined) {
    if (typeof value.seconds !== "number" || !Number.isFinite(value.seconds)) {
      return fail(`${taskId}.seconds must be a number`);
    }
    const whole = Math.round(value.seconds);
    // A tab left open all afternoon is not time on task: drop the clock and
    // keep the answer, rather than rejecting the whole submission over it.
    seconds = whole < 0 || whole > LIMITS.seconds ? null : whole;
  }

  return {
    ok: true,
    value: { taskId, result: result.value, seconds, answer: answered.value, comment: comment.value },
  };
}

/** Validate one submitted session. `taskIds` comes from the content module,
    so a task renamed there invalidates drafts for it instead of storing an
    orphan row. */
export function parseSubmission(
  body: unknown,
  taskIds: readonly string[],
): Parsed<SubmissionInput> {
  if (!isObject(body)) return fail("body must be a JSON object");

  const token = text(body.token, "token", LIMITS.token);
  if (!token.ok) return token;
  if (!token.value) return fail("token is required");

  const nickname = text(body.nickname, "nickname", LIMITS.nickname);
  if (!nickname.ok) return nickname;
  const browser = text(body.browser, "browser", LIMITS.browser);
  if (!browser.ok) return browser;

  const background = member(body.background, "background", BACKGROUNDS);
  if (!background.ok) return background;
  const device = member(body.device, "device", DEVICES);
  if (!device.ok) return device;

  let viewportWidth: number | null = null;
  if (body.viewportWidth !== null && body.viewportWidth !== undefined) {
    const w = body.viewportWidth;
    if (typeof w !== "number" || !Number.isFinite(w)) {
      return fail("viewportWidth must be a number");
    }
    const whole = Math.round(w);
    viewportWidth = whole > 0 && whole < 20000 ? whole : null;
  }

  const free: Record<string, string | null> = {};
  for (const field of FREE_TEXT) {
    const parsed = text(body[field], field, LIMITS.text);
    if (!parsed.ok) return parsed;
    free[field] = parsed.value;
  }

  const scores: Record<string, number | null> = {};
  for (const field of SCORES) {
    const parsed = score(body[field], field);
    if (!parsed.ok) return parsed;
    scores[field] = parsed.value;
  }

  if (!Array.isArray(body.answers)) return fail("answers must be an array");
  if (body.answers.length > taskIds.length) {
    return fail(`answers must hold at most ${taskIds.length} entries`);
  }
  const answers: AnswerInput[] = [];
  const seen = new Set<string>();
  for (const entry of body.answers) {
    const parsed = answer(entry, taskIds);
    if (!parsed.ok) return parsed;
    if (seen.has(parsed.value.taskId)) {
      return fail(`${parsed.value.taskId} answered twice`);
    }
    seen.add(parsed.value.taskId);
    answers.push(parsed.value);
  }

  return {
    ok: true,
    value: {
      token: token.value,
      nickname: nickname.value,
      background: background.value,
      device: device.value,
      browser: browser.value,
      viewportWidth,
      purpose: free.purpose,
      confusing: free.confusing,
      useful: free.useful,
      deviceTrouble: free.deviceTrouble,
      oneChange: free.oneChange,
      easeScore: scores.easeScore,
      trustScore: scores.trustScore,
      finishedScore: scores.finishedScore,
      answers,
    },
  };
}
