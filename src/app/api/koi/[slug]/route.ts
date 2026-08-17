import { json, notFoundJson } from "@/lib/api";
import { getKoiDetail } from "@/lib/queries";

/* GET /api/koi/:slug -> one variety with family, sources and every documented
   breeding outcome it takes part in (as offspring or as either parent). */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const koi = await getKoiDetail(slug);
  if (!koi) return notFoundJson(`koi "${slug}"`);
  return json(koi);
}
