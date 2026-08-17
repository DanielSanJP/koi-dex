import "dotenv/config";
import { prisma } from "../src/lib/db";
async function main() {
  const cols = await prisma.$queryRaw<{ table_name: string; column_name: string; is_generated: string }[]>`
    SELECT table_name::text AS table_name, column_name::text AS column_name, is_generated::text AS is_generated FROM information_schema.columns
    WHERE column_name = 'search' AND table_schema = 'public'`;
  console.log(cols);
  const hits = await prisma.$queryRaw<{ name: string; rank: number }[]>`
    SELECT name, ts_rank(search, q)::float AS rank FROM plants, to_tsquery('english', 'koi & eat:*') q
    WHERE search @@ q ORDER BY rank DESC LIMIT 5`;
  console.log(hits);
  await prisma.$disconnect();
}
main().catch((e) => { console.error(e.message); process.exit(1); });
