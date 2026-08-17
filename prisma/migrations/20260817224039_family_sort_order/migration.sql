-- Display order for families (conventional show-class order, Gosanke first).
-- Hand-written and idempotent: Prisma's generated diff also tried to drop
-- the generated search columns' expressions and their GIN indexes (which it
-- cannot represent) and failed part-way, so this also puts the indexes back.
ALTER TABLE "families" ADD COLUMN IF NOT EXISTS "sort_order" INTEGER NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS "plants_search_idx" ON "plants" USING GIN ("search");
CREATE INDEX IF NOT EXISTS "varieties_search_idx" ON "varieties" USING GIN ("search");
