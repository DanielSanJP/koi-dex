import type { NextRequest } from "next/server";
import { json } from "@/lib/api";
import { getKoiSummaries, searchAll } from "@/lib/queries";

/* GET /api/search?q=kohaku  ->  { query, hits: [{kind, slug, name, subtitle,
   snippet, rank, koi?}] }. Postgres full-text search over varieties and
   plants (weighted tsvector columns, prefix match on the last word). Koi hits
   carry the sprite data so a client can draw the fish. */
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").slice(0, 80);
  const limitParam = Number(req.nextUrl.searchParams.get("limit") ?? 12);
  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(limitParam, 1), 30)
    : 12;
  if (q.trim().length < 2) return json({ query: q, hits: [] }, { maxAge: 60 });
  const [raw, summaries] = await Promise.all([searchAll(q, limit), getKoiSummaries()]);
  const hits = raw.map((h) =>
    h.kind === "koi"
      ? { ...h, koi: summaries.find((k) => k.slug === h.slug)?.koi ?? null }
      : h,
  );
  return json({ query: q, hits }, { maxAge: 60 });
}
