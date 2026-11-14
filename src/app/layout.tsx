import type { Metadata } from "next";
import "./globals.css";

import { asset, SITE_URL } from "@/lib/site";
import { gellix, sfArabic } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: "Lektra — Plan your week, own your semester",
  description:
    "Plan your week, track lectures, sections, labs, quizzes and deadlines. Scan your timetable, add plans by voice, and keep working fully offline. Free, installable, no account.",
  keywords: [
    "study planner",
    "timetable app",
    "lecture tracker",
    "student planner",
    "offline planner",
    "PWA",
    "college schedule",
    "quiz deadlines",
    "semester planner",
    "no account",
  ],
  icons: {
    icon: [
      { url: asset("/favicon.ico") },
      { url: asset("/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
      { url: asset("/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: asset("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: asset("/android-chrome-192x192.png"), sizes: "192x192", type: "image/png" },
      { url: asset("/android-chrome-512x512.png"), sizes: "512x512", type: "image/png" },
    ],
  },
  authors: [{ name: "Lektra" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Lektra",
    title: "Lektra — Plan your week, own your semester",
    description:
      "Lectures, sections, labs, quizzes and deadlines in one calm place. Free, offline, and yours.",
    images: [
      {
        url: `${SITE_URL}/og.jpg`,
        width: 1200,
        height: 630,
        alt: "Lektra checking a scanned timetable, the November calendar, and an entry filled from a spoken sentence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lektra — Plan your week, own your semester",
    description:
      "A quiet planner for the whole semester. Scan your timetable, plan by voice, work offline.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${gellix.variable} ${sfArabic.variable}`}>
      <head>
        <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
