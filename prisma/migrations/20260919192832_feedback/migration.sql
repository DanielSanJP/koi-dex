-- CreateEnum
CREATE TYPE "TesterBackground" AS ENUM ('FISH_KEEPER', 'GARDENER', 'NEITHER', 'OTHER');

-- CreateEnum
CREATE TYPE "TesterDevice" AS ENUM ('PHONE', 'TABLET', 'LAPTOP', 'DESKTOP');

-- CreateEnum
CREATE TYPE "TaskResult" AS ENUM ('ALONE', 'STRUGGLED', 'FAILED', 'SKIPPED');

-- CreateTable
CREATE TABLE "feedback_sessions" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nickname" TEXT,
    "background" "TesterBackground",
    "device" "TesterDevice",
    "browser" TEXT,
    "viewport_width" INTEGER,
    "purpose" TEXT,
    "confusing" TEXT,
    "useful" TEXT,
    "device_trouble" TEXT,
    "one_change" TEXT,
    "ease_score" INTEGER,
    "trust_score" INTEGER,
    "finished_score" INTEGER,

    CONSTRAINT "feedback_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_answers" (
    "id" SERIAL NOT NULL,
    "session_id" INTEGER NOT NULL,
    "task_id" TEXT NOT NULL,
    "result" "TaskResult" NOT NULL,
    "seconds" INTEGER,
    "answer" TEXT,
    "comment" TEXT,

    CONSTRAINT "feedback_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feedback_sessions_token_key" ON "feedback_sessions"("token");

-- CreateIndex
CREATE INDEX "feedback_sessions_submitted_at_idx" ON "feedback_sessions"("submitted_at");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_answers_session_id_task_id_key" ON "feedback_answers"("session_id", "task_id");

-- AddForeignKey
ALTER TABLE "feedback_answers" ADD CONSTRAINT "feedback_answers_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "feedback_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
