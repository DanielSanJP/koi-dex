import { NextResponse } from "next/server";

/* Shared helpers for the read-only JSON API. Responses are public and
   cacheable at the CDN edge; the data behind them changes only on re-seed. */

export function json<T>(data: T, init?: { status?: number; maxAge?: number }) {
  const maxAge = init?.maxAge ?? 300;
  return NextResponse.json(data, {
    status: init?.status ?? 200,
    headers: {
      "Cache-Control": `public, max-age=60, s-maxage=${maxAge}, stale-while-revalidate=86400`,
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export function notFoundJson(what: string) {
  return NextResponse.json({ error: `${what} not found` }, { status: 404 });
}
