<div align="center">

<img src="public/lektra-icon-512.png" width="96" alt="Lektra" />

# Lektra

**Plan your week. Own your semester.**

The marketing site for Lektra — a calm, offline-first study planner for students.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-087ea4?logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-All_Rights_Reserved-b3261e.svg)](LICENSE)

[**Open the app**](https://ahmedkamalrezk.github.io/Lektra/) · [App source](https://github.com/ahmedkamalrezk/Lektra) · [Report a bug](https://github.com/ahmedkamalrezk/Lektra-web/issues) · [Request a feature](https://github.com/ahmedkamalrezk/Lektra-web/issues)

</div>

<p align="center">
  <img src="public/og.jpg" alt="Lektra — the timetable, the scan and the voice entry" width="880" />
</p>

## What is Lektra?

Lektra keeps a semester in one place: lectures, sections, labs, quizzes, midterms,
finals and deadlines. Scan a timetable photo, add the rest by voice, and keep
working when the signal drops. No account, no feed, no ads.

Everything stays on the device, backed up in a small file you own.

<table>
  <tr>
    <td align="center" width="25%"><img src="public/calendar.webp" alt="Month calendar" /><br /><sub><b>Month &amp; day</b></sub></td>
    <td align="center" width="25%"><img src="public/scan.webp" alt="Timetable scan review" /><br /><sub><b>Timetable scan</b></sub></td>
    <td align="center" width="25%"><img src="public/voice.webp" alt="Voice entry" /><br /><sub><b>Voice entry</b></sub></td>
    <td align="center" width="25%"><img src="public/theme-gallery.webp" alt="Theme gallery" /><br /><sub><b>Forty themes</b></sub></td>
  </tr>
</table>

## About this repo

This is the site only — a statically generated Next.js app. The planner itself
lives in [ahmedkamalrezk/Lektra](https://github.com/ahmedkamalrezk/Lektra) and is
linked from every call to action here.

| Page | What it is |
| --- | --- |
| `/` | Landing page: hero, the three-screen stack, features, install models, the full capability grid, themes/search/settings/backup walkthrough, comparison, privacy |
| `/download` | Install instructions for iPhone, Android and desktop (PWA) |
| `/pricing` | Free, forever — and what that means |
| `/feedback` | Report a bug, suggest a feature, or say hello — opens a pre-filled mail with your message |
| `/privacy` | What stays on your device (everything) |
| `/terms` | Terms of use |

## Tech

- **Next.js 16** (App Router, static export-ready, Turbopack in dev)
- **React 19** + **TypeScript**
- **Tailwind CSS 4** for utilities, plus hand-written CSS for the landing sections
- **GSAP + ScrollTrigger** for the scroll-driven section transitions
- **Self-hosted fonts** — Gellix and SF Arabic in `public/fonts`, no third-party CDN
- No analytics, no trackers, no external requests at runtime

## Getting started

```bash
bun install
bun run dev      # http://localhost:3009
```

Build and preview the production output:

```bash
bun run build
bun run start
```

> Node 20+ is required.

## Structure

```text
.
├── public/                     icons, screenshots, OG image, fonts
│   ├── fonts/                  Gellix + SF Arabic (woff2/ttf)
│   └── *.webp                  app screens used across the page
└── src/
    ├── app/
    │   ├── page.tsx            landing page composition
    │   ├── layout.tsx          metadata, icons, OG/Twitter cards
    │   ├── download/           install guide
    │   ├── (marketing)/        pricing, privacy, terms
    │   ├── robots.ts           crawl rules + sitemap
    │   └── sitemap.ts          route list
    ├── components/landing/     one component per page section
    ├── hooks/                  scroll helpers
    └── styles/
        ├── theme.css           colour, surface and text tokens
        ├── landing.css         section layouts and animations
        └── fonts.css           @font-face declarations
```

## Editing the site

- **Copy** lives in the section components under `src/components/landing/` — each
  file is self-contained.
- **Colours and surfaces** are tokens in `src/styles/theme.css`.
- **Screenshots** are plain images in `public/`; swap a file and every section
  that references it updates.
- **SEO** is centralised in `src/app/layout.tsx`, `robots.ts` and `sitemap.ts`.

## Deploy

The app builds to standard Next.js output, so any Node host works. For a fully
static deployment, the marketing routes can be exported with `output: "export"`
in `next.config.mjs` and served from any static host.

## License

**All rights reserved — this repository is not open source.**

It is published under the [PolyForm Strict License 1.0.0](LICENSE): you may
read the code and run an unmodified copy for private, noncommercial use. You
may **not** modify it, build new works on it, redistribute it, or use it
commercially. The Lektra name, icon, screenshots and design belong to their
author and are not licensed for reuse.

<div align="center">
<sub>Built for the way you actually study.</sub>
</div>
