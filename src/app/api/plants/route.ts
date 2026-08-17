import { json } from "@/lib/api";
import { getPlantSummaries } from "@/lib/queries";

/* GET /api/plants -> every plant's summary row (type, difficulty, koi-safe,
   NZ status, image). Read-only; served from the same cached query as the
   plants page, so a re-seed plus /api/revalidate refreshes both. */
export async function GET() {
  const plants = await getPlantSummaries();
  return json({ count: plants.length, plants });
}
