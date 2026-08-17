import "dotenv/config";
import { defineConfig } from "prisma/config";

// The Prisma CLI (migrate, db push, studio, db seed) uses the DIRECT (unpooled)
// Neon URL; the app itself uses the pooled DATABASE_URL via the Neon adapter
// in src/lib/db.ts. See .env.example.
//
// process.env is read directly (not the env() helper) so that `prisma generate`
// still works where no database URL is set, e.g. a CI type-check or a static
// build. Commands that actually need the database fail clearly without it.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
