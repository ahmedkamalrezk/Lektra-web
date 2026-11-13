import localFont from "next/font/local";

/**
 * Gellix — the Latin face, self-hosted. `next/font` emits the files under
 * `_next/static/media` so they work behind a deployment base path and get
 * fingerprinted for caching.
 */
export const gellix = localFont({
  src: [
    { path: "../fonts/Gellix-Thin.woff2", weight: "100", style: "normal" },
    { path: "../fonts/Gellix-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Gellix-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Gellix-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Gellix-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Gellix-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Gellix-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../fonts/Gellix-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-gellix",
  display: "swap",
});

/** SF Arabic — the fallback that keeps Arabic copy on-brand. */
export const sfArabic = localFont({
  src: [
    { path: "../fonts/SFArabic-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
});
