/**
 * The site is a fully static export so it can be hosted on GitHub Pages.
 * `NEXT_PUBLIC_BASE_PATH` mirrors the path it is served from — `/Lektra-web`
 * for a GitHub Pages project site, empty for a root domain or local dev.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
