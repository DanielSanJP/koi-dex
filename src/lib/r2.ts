/* Adapted from koi-web/src/lib/r2.ts: koi-dex serves the same asset tree
   from the local snapshot in public/assets instead of the R2 CDN, so the
   copied components keep working unchanged. Upload/delete helpers dropped
   (admin-only). */

/** Base URL for constructing public asset URLs. */
export const R2_CDN_BASE = "/assets";

/**
 * Construct a public URL for an asset in the vendored snapshot.
 *
 * `version` appends a `?v=N` cache-buster; kept for API parity with koi-web
 * (unused for static local assets).
 */
export function r2PublicUrl(
  storagePath: string | undefined | null,
  version?: number,
): string | null {
  if (!storagePath) return null;
  const base = `${R2_CDN_BASE}/${storagePath}`;
  return version ? `${base}?v=${version}` : base;
}
