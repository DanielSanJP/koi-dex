-- Full-text search: a stored, generated tsvector per plant and per variety,
-- weighted so a hit in the name outranks a hit in the body text, plus GIN
-- indexes. Hand-written: Prisma cannot express generated columns, and the
-- schema declares the column as Unsupported("tsvector") so it is never
-- written by the client and never dropped by a later diff.

ALTER TABLE "plants" ADD COLUMN "search" tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce("name", '')), 'A') ||
    setweight(to_tsvector('english', coalesce("latin_name", '')), 'A') ||
    setweight(to_tsvector('english', coalesce("description", '')), 'B') ||
    setweight(to_tsvector('english', coalesce("koi_notes", '')), 'C') ||
    setweight(to_tsvector('english', coalesce("benefits", '')), 'C') ||
    setweight(to_tsvector('english', coalesce("planting", '')), 'D') ||
    setweight(to_tsvector('english', coalesce("hardiness", '')), 'D') ||
    setweight(to_tsvector('english', coalesce("nz_note", '')), 'D')
  ) STORED;

CREATE INDEX "plants_search_idx" ON "plants" USING GIN ("search");

ALTER TABLE "varieties" ADD COLUMN "search" tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce("name", '')), 'A') ||
    setweight(to_tsvector('english', coalesce("name_meaning", '')), 'B') ||
    setweight(to_tsvector('english', coalesce("pattern", '')), 'B') ||
    setweight(to_tsvector('english', coalesce("origin", '')), 'C') ||
    setweight(to_tsvector('english', coalesce("notes", '')), 'C') ||
    setweight(to_tsvector('english', coalesce("definition", '')), 'B') ||
    setweight(to_tsvector('english', coalesce("role", '')), 'C')
  ) STORED;
-- ("care" is a text[]; array_to_string is not IMMUTABLE so it cannot join a
--  generated column. Care notes are reachable through the koi pages instead.)

CREATE INDEX "varieties_search_idx" ON "varieties" USING GIN ("search");
