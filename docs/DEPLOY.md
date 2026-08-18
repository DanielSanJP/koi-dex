# Deploying Koi-dex (Vercel + Neon)

Zero-cost stack: Vercel Hobby for the site, Neon Free for Postgres. Pages
are prerendered at build time from Neon and revalidate daily or on demand,
so the database sees a handful of queries per build, not per visitor.

## One-time setup

1. `npx vercel login` (interactive, opens the browser).
2. From `koi-dex/`: `npx vercel link` and create a new project called
   `koi-dex` (framework: Next.js, root directory `.`).
3. Environment variables (production, and preview if you want PR previews to
   read the database):

   | Name | Value | Notes |
   |---|---|---|
   | `DATABASE_URL` | Neon **pooled** string (`-pooler` host) | used by the app at build/revalidate |
   | `DIRECT_URL` | Neon **direct** string | only needed if you run migrations from Vercel; safe to set |
   | `REVALIDATE_SECRET` | the value in `.env` | protects `POST /api/revalidate` |
   | `NEXT_PUBLIC_SITE_URL` | `https://<project>.vercel.app` or the custom domain | absolute URLs for sitemap/robots |

   Add each with `npx vercel env add NAME production` (paste the value when
   prompted), or in the dashboard under Settings → Environment Variables.
4. `npm run deploy` (= `vercel --prod`). The build runs `prisma generate` on
   install, then `next build`, which reads Neon once per cached query.
5. Optional: connect the GitHub repo in the Vercel dashboard so every push
   to `main` deploys and every PR gets a preview URL. CI on GitHub still runs
   the no-secrets fallback build in parallel.

## After a content change

1. Edit the content module (`src/content/*.ts` or `data/koi.json`).
2. `npm run db:validate` then `npm run db:seed` (upserts; safe to repeat).
3. Refresh the live pages without a redeploy:

   ```bash
   curl -X POST "$SITE/api/revalidate" \
     -H "Authorization: Bearer $REVALIDATE_SECRET" \
     -H "Content-Type: application/json" \
     -d '{"tags":["koi","breeding","plants"]}'
   ```

   Or just push: the commit redeploys and rebuilds everything anyway.

## Schema changes

`npm run db:migrate -- --name <what>` locally against Neon (uses
`DIRECT_URL`), then commit `prisma/migrations/`. Read any generated migration
before applying it: Prisma cannot describe the generated `search` columns and
GIN indexes, so a diff it writes may try to drop them (see
`prisma/migrations/20260817224039_family_sort_order/migration.sql`).

## Checks before calling it live

- `npm run check` locally (lint, typecheck, tests, content validation).
- Open the production URL on a phone: home, a koi page, the breeding tree,
  the care checklist (ticks persist), plants grid and a plant page, search.
- `GET /api/koi`, `GET /api/search?q=iris`, `GET /sitemap.xml`,
  `GET /robots.txt`, and a bad URL for the 404.
