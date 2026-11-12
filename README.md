# Lektra

The marketing site for [Lektra](https://ahmedkamalrezk.github.io/Lektra/) — a calm,
offline-first study planner for students. Scan a timetable, add plans by voice, and
keep lectures, sections, labs, quizzes and deadlines in one place.

Built with Next.js 16, React 19 and Tailwind CSS 4.

## Running locally

```bash
bun install
bun run dev
```

The site runs on [http://localhost:3009](http://localhost:3009).

## Building

```bash
bun run build
bun run start
```

## Structure

```
apps/web
├── public/                 icons, screenshots, OG image, self-hosted fonts
└── src
    ├── app/                routes: /, /download, /pricing, /privacy, /terms
    ├── components/landing/ page sections
    ├── hooks/              scroll helpers
    └── styles/             theme tokens, landing styles, fonts
```

## Links

- App: https://ahmedkamalrezk.github.io/Lektra/
- App source: https://github.com/ahmedkamalrezk/Lektra
