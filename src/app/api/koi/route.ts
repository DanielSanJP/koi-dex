import { json } from "@/lib/api";
import { getKoiSummaries } from "@/lib/queries";

/* GET /api/koi -> the 22 varieties in dex order with family, origin and the
   sprite/tint data needed to draw them (body path under /assets/, fin hexes). */
export async function GET() {
  const koi = await getKoiSummaries();
  return json({ count: koi.length, koi });
}
