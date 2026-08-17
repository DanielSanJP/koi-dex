import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { TAGS } from "@/lib/queries";

/* POST /api/revalidate  { "tags": ["plants"] }  with
   Authorization: Bearer $REVALIDATE_SECRET

   The database reads are cached with tags (see src/lib/queries.ts), which is
   what lets the pages be prerendered and hosted for free. After a re-seed,
   call this to refresh them without a redeploy. Uses stale-while-revalidate
   ("max"): visitors keep getting the old page until the new one is ready. */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const auth = req.headers.get("authorization") ?? "";
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }
  let body: { tags?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    /* empty body = all tags */
  }
  const known = Object.values(TAGS) as string[];
  const requested = Array.isArray(body.tags)
    ? body.tags.filter((t): t is string => typeof t === "string")
    : known;
  const tags = requested.filter((t) => known.includes(t));
  if (tags.length === 0) {
    return NextResponse.json(
      { error: `tags must be some of ${known.join(", ")}` },
      { status: 400 },
    );
  }
  for (const t of tags) revalidateTag(t, "max");
  return NextResponse.json({ revalidated: tags, at: new Date().toISOString() });
}
