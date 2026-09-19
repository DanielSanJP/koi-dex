"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Button from "@/components/button";
import {
  CLOSING_QUESTIONS,
  CONSENT,
  SCORE_QUESTIONS,
  TASKS,
} from "@/content/feedback";
import {
  BACKGROUNDS,
  DEVICES,
  DEVICE_LABEL,
  LIMITS,
  type Background,
  type Device,
  type TaskResult,
} from "@/lib/feedback";

/* The tester's side of the week-13 user test: consent, six tasks one screen
   at a time, then the closing questions, posted once to /api/feedback.

   Three things the unmoderated format has to replace. The form keeps its own
   clock per task, because nobody is sitting there with a stopwatch. It asks
   what answer they found, because "I did it" and "I did it right" are not the
   same claim. And the whole draft, step included, lives in localStorage,
   because a volunteer on a phone will be interrupted, and losing ten minutes
   of typing is how you lose a participant.

   localStorage is the state, read through useSyncExternalStore exactly as the
   pond checklist does it: the server snapshot is an empty draft, so the HTML
   matches on hydration and a saved draft fills in, at whatever step it was
   abandoned. */

const STORAGE_KEY = "koi-dex:feedback";

type TaskDraft = {
  result: TaskResult | "";
  answer: string;
  comment: string;
  seconds: number | null;
  /** Set once the tester has left this task; a second visit voids the clock. */
  timed: boolean;
};

type Draft = {
  token: string;
  /** Which screen they are on, so a reload does not send them back to the
      start with their answers already typed. */
  step: number;
  submitted: boolean;
  nickname: string;
  background: Background | "";
  device: Device | "";
  tasks: Record<string, TaskDraft>;
  purpose: string;
  confusing: string;
  useful: string;
  deviceTrouble: string;
  oneChange: string;
  easeScore: number | null;
  trustScore: number | null;
  finishedScore: number | null;
};

const INTRO_STEP = 0;
const ABOUT_STEP = 1;
const FIRST_TASK_STEP = 2;
const CLOSING_STEP = FIRST_TASK_STEP + TASKS.length;
const DONE_STEP = CLOSING_STEP + 1;

const emptyTask = (): TaskDraft => ({
  result: "",
  answer: "",
  comment: "",
  seconds: null,
  timed: false,
});

function emptyDraft(): Draft {
  return {
    token: "",
    step: INTRO_STEP,
    submitted: false,
    nickname: "",
    background: "",
    device: "",
    tasks: Object.fromEntries(TASKS.map((t) => [t.id, emptyTask()])),
    purpose: "",
    confusing: "",
    useful: "",
    deviceTrouble: "",
    oneChange: "",
    easeScore: null,
    trustScore: null,
    finishedScore: null,
  };
}

function newToken(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `t-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

/** Browser and version from the user agent, recorded at submit alongside the
    window width, so the self-reported device can be sanity-checked. Order
    matters: Edge and Opera both claim Chrome, and Chrome claims Safari. */
function readBrowser(): string {
  if (typeof navigator === "undefined") return "";
  const ua = navigator.userAgent;
  const pick = [
    ["Edge", /Edg\/([\d.]+)/],
    ["Opera", /OPR\/([\d.]+)/],
    ["Samsung Internet", /SamsungBrowser\/([\d.]+)/],
    ["Firefox", /Firefox\/([\d.]+)/],
    ["Chrome", /Chrome\/([\d.]+)/],
    ["Safari", /Version\/([\d.]+).*Safari/],
  ] as const;
  for (const [name, re] of pick) {
    const m = ua.match(re);
    if (m) return `${name} ${m[1].split(".")[0]}`;
  }
  return ua.slice(0, LIMITS.browser);
}

/* The draft as an external store. Every write goes to localStorage and then
   notifies, so the component never holds a second copy that could drift. */

const listeners = new Set<() => void>();
const EMPTY = "";

/* useSyncExternalStore compares snapshots by identity, so the raw string is
   the snapshot and the parsed draft is memoised beside it. */
let cached: { raw: string; draft: Draft } | null = null;

function readRaw(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeDraft(next: Draft) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* private mode or blocked storage: the draft will not survive a reload,
       but the in-memory value still reaches every listener */
  }
  cached = { raw: JSON.stringify(next), draft: next };
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => (cached ? cached.raw : readRaw());
const getServerSnapshot = () => EMPTY;

function parseDraft(raw: string): Draft {
  if (cached && cached.raw === raw) return cached.draft;
  let draft = emptyDraft();
  if (raw) {
    try {
      const saved = JSON.parse(raw) as Partial<Draft>;
      draft = { ...draft, ...saved };
      // A task renamed since the draft was saved simply drops out.
      draft.tasks = Object.fromEntries(
        TASKS.map((t) => [t.id, { ...emptyTask(), ...saved.tasks?.[t.id] }]),
      );
    } catch {
      draft = emptyDraft();
    }
  }
  cached = { raw, draft };
  return draft;
}

// ---- Small shared pieces -------------------------------------------------

function Choice({
  name,
  checked,
  onSelect,
  label,
  hint,
}: {
  name: string;
  checked: boolean;
  onSelect: () => void;
  label: string;
  hint?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
        checked
          ? "border-[#49ad6d] bg-[#66dd93]/10"
          : "border-black/10 bg-white hover:border-black/25"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[#49ad6d]"
      />
      <span className="flex flex-col">
        <span className="text-sm font-bold text-black/80">{label}</span>
        {hint && <span className="text-xs text-black/60">{hint}</span>}
      </span>
    </label>
  );
}

function TextAnswer({
  id,
  label,
  help,
  placeholder,
  value,
  onChange,
  rows = 3,
}: {
  id: string;
  label: string;
  help?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  const over = value.length > LIMITS.text;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-black/80">
        {label}
      </label>
      {help && <p className="text-xs text-black/60">{help}</p>}
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black/80 outline-none focus:border-[#49ad6d]"
      />
      {over && (
        <p className="text-xs font-bold text-[#ad4949]">
          That is longer than I can store. Please trim it to {LIMITS.text}{" "}
          characters.
        </p>
      )}
    </div>
  );
}

function Scale({
  id,
  label,
  low,
  high,
  value,
  onChange,
}: {
  id: string;
  label: string;
  low: string;
  high: string;
  value: number | null;
  onChange: (n: number) => void;
}) {
  return (
    <fieldset className="rounded-xl border border-black/10 bg-white p-4">
      <legend className="px-1 text-sm font-bold text-black/80">{label}</legend>
      <div className="mt-1 flex items-center justify-between gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            className={`flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-lg border py-2 text-sm font-bold transition-colors ${
              value === n
                ? "border-[#49ad6d] bg-[#66dd93]/15 text-[#49ad6d]"
                : "border-black/10 text-black/55 hover:border-black/25"
            }`}
          >
            <input
              type="radio"
              name={id}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            <span className="tabular-nums">{n}</span>
          </label>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-black/55">
        <span>1, {low}</span>
        <span>5, {high}</span>
      </div>
    </fieldset>
  );
}

// ---- The form ------------------------------------------------------------

const RESULT_CHOICES: { value: TaskResult; label: string; hint: string }[] = [
  { value: "ALONE", label: "Found it on my own", hint: "No real hesitation" },
  {
    value: "STRUGGLED",
    label: "Got there, but it took a while",
    hint: "Backtracked, guessed, or hunted for it",
  },
  { value: "FAILED", label: "Could not find it", hint: "Gave up" },
  { value: "SKIPPED", label: "Skipping this one", hint: "Rather not do it" },
];

export default function FeedbackForm() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const draft = useMemo(() => parseDraft(raw), [raw]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const enteredAt = useRef<number | null>(null);
  const firstRender = useRef(true);

  const step = draft.step;
  const taskIndex = step - FIRST_TASK_STEP;
  const task = taskIndex >= 0 && taskIndex < TASKS.length ? TASKS[taskIndex] : null;

  // Move focus to the new step's heading, so a keyboard or screen-reader user
  // lands on the question rather than back at the top of the page, and start
  // the clock on whatever is now in front of them.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      enteredAt.current = Date.now();
      return;
    }
    headingRef.current?.focus();
    enteredAt.current = Date.now();
  }, [step]);

  /** Every change goes through the store, read fresh each time: two controls
      touched in the same tick must not write over one another. */
  const edit = (change: (d: Draft) => Draft) => {
    writeDraft(change(parseDraft(readRaw())));
  };

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    edit((d) => ({ ...d, [key]: value }));

  const setTask = (id: string, patch: Partial<TaskDraft>) =>
    edit((d) => ({ ...d, tasks: { ...d.tasks, [id]: { ...d.tasks[id], ...patch } } }));

  /* Leaving a step: stop the clock on the task being left, then move. A task
     left for the second time loses its timing rather than reporting a number
     nobody can interpret. */
  const go = (next: number) => {
    edit((d) => {
      const leaving = TASKS[d.step - FIRST_TASK_STEP];
      if (!leaving) return { ...d, step: next };
      const current = d.tasks[leaving.id];
      const started = enteredAt.current;
      const seconds = current.timed
        ? null
        : started
          ? Math.round((Date.now() - started) / 1000)
          : null;
      return {
        ...d,
        step: next,
        tasks: { ...d.tasks, [leaving.id]: { ...current, seconds, timed: true } },
      };
    });
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  const submit = async () => {
    setSending(true);
    setError(null);
    // Mint the token on the first attempt and keep it: a retry after a dropped
    // connection has to land on the same row, not open a second session.
    const current = parseDraft(readRaw());
    const token = current.token || newToken();
    if (token !== current.token) edit((d) => ({ ...d, token }));
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          nickname: current.nickname,
          background: current.background || null,
          device: current.device || null,
          browser: readBrowser(),
          viewportWidth: window.innerWidth,
          purpose: current.purpose,
          confusing: current.confusing,
          useful: current.useful,
          deviceTrouble: current.deviceTrouble,
          oneChange: current.oneChange,
          easeScore: current.easeScore,
          trustScore: current.trustScore,
          finishedScore: current.finishedScore,
          answers: TASKS.filter((t) => current.tasks[t.id].result).map((t) => ({
            taskId: t.id,
            result: current.tasks[t.id].result,
            seconds: current.tasks[t.id].seconds,
            answer: current.tasks[t.id].answer,
            comment: current.tasks[t.id].comment,
          })),
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? `The server said ${res.status}.`);
      }
      edit((d) => ({ ...d, token, submitted: true, step: DONE_STEP }));
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError(
        e instanceof Error && e.message
          ? e.message
          : "That did not send.",
      );
    } finally {
      setSending(false);
    }
  };

  const startAgain = () => writeDraft({ ...emptyDraft(), token: newToken() });

  const progress = Math.min(step, DONE_STEP) / DONE_STEP;
  const stepLabel =
    step === INTRO_STEP
      ? "Before you start"
      : step === ABOUT_STEP
        ? "About you"
        : task
          ? `Task ${taskIndex + 1} of ${TASKS.length}`
          : step === CLOSING_STEP
            ? "Last few questions"
            : "Done";

  return (
    <div className="flex flex-col gap-5">
      {step !== DONE_STEP && (
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-xs font-bold tracking-wide text-black/55 uppercase">
              {stepLabel}
            </p>
            <p className="text-xs text-black/55">Your answers save as you go</p>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-black/5"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={DONE_STEP}
            aria-valuenow={step}
            aria-label="How far through you are"
          >
            <div
              className="h-full rounded-full bg-[#66dd93] transition-[width] duration-300"
              style={{ width: `${Math.max(progress, 0.04) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] sm:p-6">
        {/* Step 0: what this is, and what it records. */}
        {step === INTRO_STEP && (
          <div className="flex flex-col gap-4">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-pally text-xl font-bold outline-none"
            >
              Thanks for helping me test this
            </h2>
            <p className="max-w-prose text-black/70">{CONSENT.intro}</p>
            <p className="max-w-prose text-black/70">{CONSENT.stance}</p>
            <div className="rounded-xl bg-[#93d9f0]/20 p-4">
              <p className="text-sm font-bold text-black/80">
                {CONSENT.duration}
              </p>
              <p className="mt-3 text-xs font-bold tracking-wide text-black/55 uppercase">
                What gets recorded
              </p>
              <ul className="mt-1 flex list-disc flex-col gap-1 pl-5 text-sm text-black/70">
                {CONSENT.collected.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-black/70">
                {CONSENT.notCollected}
              </p>
              <p className="mt-2 text-sm text-black/70">{CONSENT.use}</p>
            </div>
            <p className="text-sm text-black/60">
              Keep this page open in one tab and the site in another. Every task
              has a link that opens the site in a new tab for you.
            </p>
            <div className="mt-1 flex flex-wrap gap-3">
              <Button text="Start" onPressed={() => go(ABOUT_STEP)} />
            </div>
          </div>
        )}

        {/* Step 1: who is testing, and on what. */}
        {step === ABOUT_STEP && (
          <div className="flex flex-col gap-5">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-pally text-xl font-bold outline-none"
            >
              A little about you
            </h2>
            <p className="-mt-3 max-w-prose text-sm text-black/60">
              Three quick ones. They tell me whether a problem is yours alone or
              everyone&apos;s.
            </p>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-bold text-black/80">
                Which of these sounds most like you?
              </legend>
              {BACKGROUNDS.map((b) => (
                <Choice
                  key={b}
                  name="background"
                  checked={draft.background === b}
                  onSelect={() => set("background", b)}
                  label={
                    b === "FISH_KEEPER"
                      ? "I keep fish, or I have"
                      : b === "GARDENER"
                        ? "I garden, but I do not keep fish"
                        : b === "NEITHER"
                          ? "Neither, koi are new to me"
                          : "Something else"
                  }
                />
              ))}
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-bold text-black/80">
                What are you reading this on?
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {DEVICES.map((d) => (
                  <Choice
                    key={d}
                    name="device"
                    checked={draft.device === d}
                    onSelect={() => set("device", d)}
                    label={DEVICE_LABEL[d].replace(/^./, (c) => c.toUpperCase())}
                  />
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="nickname"
                className="text-sm font-bold text-black/80"
              >
                What should I call you? Optional.
              </label>
              <p className="text-xs text-black/60">
                A first name or a nickname, just so I can tell responses apart.
                Leave it blank to stay anonymous.
              </p>
              <input
                id="nickname"
                type="text"
                value={draft.nickname}
                maxLength={LIMITS.nickname}
                onChange={(e) => set("nickname", e.target.value)}
                className="h-11 w-full max-w-xs rounded-xl border border-black/10 bg-white px-3 text-sm text-black/80 outline-none focus:border-[#49ad6d]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button text="Back" variant="outline" onPressed={() => go(INTRO_STEP)} />
              <Button text="First task" onPressed={() => go(FIRST_TASK_STEP)} />
            </div>
          </div>
        )}

        {/* Steps 2 to 7: one task each. */}
        {task && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-bold tracking-wide text-[#49ad6d] uppercase">
                Task {taskIndex + 1}
              </p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="font-pally text-xl font-bold outline-none"
              >
                {task.title}
              </h2>
            </div>
            <p className="max-w-prose rounded-xl bg-[#f7f6f9] p-4 text-black/80">
              {task.prompt}
            </p>
            <div>
              <Button
                text="Open the site in a new tab"
                variant="outline"
                compact
                href="/"
                target="_blank"
                rel="noopener"
              />
            </div>

            <TextAnswer
              id={`${task.id}-answer`}
              label={task.answerLabel}
              placeholder={task.answerPlaceholder}
              value={draft.tasks[task.id].answer}
              onChange={(v) => setTask(task.id, { answer: v })}
              rows={2}
            />

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-bold text-black/80">
                How did that go?
              </legend>
              {RESULT_CHOICES.map((c) => (
                <Choice
                  key={c.value}
                  name={`${task.id}-result`}
                  checked={draft.tasks[task.id].result === c.value}
                  onSelect={() => setTask(task.id, { result: c.value })}
                  label={c.label}
                  hint={c.hint}
                />
              ))}
            </fieldset>

            <TextAnswer
              id={`${task.id}-comment`}
              label={task.commentLabel}
              help="Whatever went through your head. Half a sentence is fine."
              placeholder="Say as much or as little as you like"
              value={draft.tasks[task.id].comment}
              onChange={(v) => setTask(task.id, { comment: v })}
            />

            <div className="flex flex-wrap gap-3">
              <Button text="Back" variant="outline" onPressed={() => go(step - 1)} />
              <Button
                text={taskIndex === TASKS.length - 1 ? "Last questions" : "Next task"}
                enabled={draft.tasks[task.id].result !== ""}
                onPressed={() => go(step + 1)}
              />
            </div>
            {draft.tasks[task.id].result === "" && (
              <p className="-mt-2 text-xs text-black/55">
                Pick one of the four above to carry on. &ldquo;Could not find
                it&rdquo; is a perfectly good answer.
              </p>
            )}
          </div>
        )}

        {/* Step 8: the closing questions and the three scores. */}
        {step === CLOSING_STEP && (
          <div className="flex flex-col gap-5">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-pally text-xl font-bold outline-none"
            >
              Last few questions
            </h2>
            <p className="-mt-3 max-w-prose text-sm text-black/60">
              Skip any that do not apply.
            </p>

            {CLOSING_QUESTIONS.map((q) => (
              <TextAnswer
                key={q.id}
                id={q.id}
                label={q.label}
                help={q.help}
                placeholder={q.placeholder}
                value={draft[q.id]}
                onChange={(v) => set(q.id, v)}
              />
            ))}

            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-black/80">
                Finally, three scores out of five.
              </p>
              {SCORE_QUESTIONS.map((s) => (
                <Scale
                  key={s.id}
                  id={s.id}
                  label={s.label}
                  low={s.low}
                  high={s.high}
                  value={draft[s.id]}
                  onChange={(n) => set(s.id, n)}
                />
              ))}
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-[#ad4949]/30 bg-[#dd6666]/10 p-3 text-sm text-[#ad4949]"
              >
                {error} Your answers are still saved in this browser, so nothing
                is lost.
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <Button
                text="Back"
                variant="outline"
                enabled={!sending}
                onPressed={() => go(CLOSING_STEP - 1)}
              />
              <Button
                text={sending ? "Sending" : "Send my answers"}
                enabled={!sending}
                onPressed={submit}
              />
            </div>
          </div>
        )}

        {/* Step 9: thank you. */}
        {step === DONE_STEP && (
          <div className="flex flex-col gap-4">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-pally text-2xl font-bold outline-none"
            >
              That is the lot. Thank you.
            </h2>
            <p className="max-w-prose text-black/70">
              Your answers are in. Anything you found confusing is now on a list
              of things to fix before this gets handed in, which is exactly what
              I needed.
            </p>
            <p className="max-w-prose text-sm text-black/60">
              You are welcome to keep looking around the site.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button text="Back to the site" href="/" />
              <Button
                text="Fill it in again"
                variant="ghost"
                compact
                onPressed={startAgain}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
