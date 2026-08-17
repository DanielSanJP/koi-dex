import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

/* Prisma 7 client over the Neon serverless driver. The pooled DATABASE_URL
   is for the app; the Prisma CLI uses DIRECT_URL (see prisma.config.ts).
   A single instance is cached on globalThis so dev hot-reloads do not open
   a new pool each time. Nothing imports this until the phase 2 pages land,
   so a static build without a database still succeeds. */

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function create(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and fill in the Neon pooled connection string.",
    );
  }
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? create();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
