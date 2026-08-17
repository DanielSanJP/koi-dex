import { json, notFoundJson } from "@/lib/api";
import { getPlantBySlug } from "@/lib/queries";

/* GET /api/plants/:slug -> the full plant record with its sources. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const plant = await getPlantBySlug(slug);
  if (!plant) return notFoundJson(`plant "${slug}"`);
  return json(plant);
}
