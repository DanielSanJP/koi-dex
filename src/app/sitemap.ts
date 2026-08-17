import type { MetadataRoute } from "next";
import { getKoiSummaries, getPlantSummaries } from "@/lib/queries";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [koi, plants] = await Promise.all([getKoiSummaries(), getPlantSummaries()]);
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl()}${path}`,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/koi", 0.9),
    page("/breeding", 0.8),
    page("/care", 0.8),
    page("/plants", 0.8),
    ...koi.map((k) => page(`/koi/${k.slug}`, 0.7)),
    ...plants.map((p) => page(`/plants/${p.slug}`, 0.6)),
  ];
}
