/** Public origin of the deployed site, for absolute URLs (sitemap, robots,
    Open Graph). Set NEXT_PUBLIC_SITE_URL in production; Vercel's own
    VERCEL_PROJECT_PRODUCTION_URL is used as a fallback. */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
