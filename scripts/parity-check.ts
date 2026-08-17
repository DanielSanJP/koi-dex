/* Parity check: the database and the in-repo content modules must describe
   the same site. Compares every read the pages make (koi summaries, every
   koi detail including lineage, outcomes, relatives, plants) between the two
   DataSources and prints the differences. `npx tsx scripts/parity-check.ts` */
import "dotenv/config";
import { contentSource } from "../src/lib/content-source";
import { dbSource } from "../src/lib/db-source";
import { prisma } from "../src/lib/db";

function diff(path: string, a: unknown, b: unknown, out: string[]) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) out.push(`${path}: length ${a.length} vs ${b.length}`);
    for (let i = 0; i < Math.min(a.length, b.length); i++) diff(`${path}[${i}]`, a[i], b[i], out);
    return;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      if (k === "id") continue; // surrogate ids differ by design
      diff(`${path}.${k}`, (a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], out);
    }
    return;
  }
  if (a !== b) out.push(`${path}: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
}

async function main() {
  const out: string[] = [];
  const [cs, ds] = await Promise.all([contentSource.koiSummaries(), dbSource.koiSummaries()]);
  diff("koiSummaries", cs, ds, out);
  for (const k of cs) {
    const [c, d] = await Promise.all([contentSource.koiDetail(k.slug), dbSource.koiDetail(k.slug)]);
    diff(`koiDetail(${k.slug})`, c, d, out);
  }
  diff("outcomes", await contentSource.outcomes(), await dbSource.outcomes(), out);
  diff("relatives", await contentSource.relatives(), await dbSource.relatives(), out);
  diff("plantSummaries", await contentSource.plantSummaries(), await dbSource.plantSummaries(), out);
  for (const p of await contentSource.plantSummaries()) {
    diff(`plant(${p.slug})`, await contentSource.plant(p.slug), await dbSource.plant(p.slug), out);
  }
  diff("families", await contentSource.families(), await dbSource.families(), out);
  console.log(out.length === 0 ? "PARITY OK: database and content modules agree" : `${out.length} differences:`);
  for (const line of out.slice(0, 40)) console.log("  " + line);
  await prisma.$disconnect();
  process.exit(out.length === 0 ? 0 : 1);
}
main().catch((e) => { console.error(e); process.exit(1); });
