import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Cache Components: database reads are wrapped in "use cache" with tags, so
  // pages prerender at build time and refresh on demand via /api/revalidate.
  cacheComponents: true,
};

export default nextConfig;
