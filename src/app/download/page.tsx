"use client";

import Link from "next/link";
import { useState } from "react";

import { APP_URL, FEEDBACK_HREF } from "@/lib/site";

/* ── Platform icons ── */
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M8 20.5h8M12 16.5v4" />
    </svg>
  );
}

const PLATFORMS = [
  {
    key: "ios",
    title: "iPhone & iPad",
    subtitle: "Safari",
    icon: AppleIcon,
    steps: [
      "Open Lektra in Safari",
      "Tap Share, then Add to Home Screen",
      "Tap Add — it opens full-screen from now on",
    ],
  },
  {
    key: "android",
    title: "Android",
    subtitle: "Chrome, Edge, Firefox",
    icon: PhoneIcon,
    steps: [
      "Open Lektra in your browser",
      "Open the menu (⋮) and choose Install app",
      "It appears in your app drawer, ready offline",
    ],
  },
  {
    key: "desktop",
    title: "Desktop",
    subtitle: "Chrome, Edge, Safari",
    icon: MonitorIcon,
    steps: [
      "Open Lektra in your browser",
      "Click the install icon in the address bar",
      "Or keep it open in a pinned tab",
    ],
  },
];

const STEPS = [
  {
    num: "1",
    title: "Open the app",
    desc: "Head to the link above in the browser you normally use. Nothing to download, nothing to sign up for.",
  },
  {
    num: "2",
    title: "Add it to your home screen",
    desc: "Use your browser's install or Add to Home Screen action. One tap, and Lektra looks and opens like any other app.",
  },
  {
    num: "3",
    title: "Carry on offline",
    desc: "Every subject, class and deadline is stored on the device. After the first load, the app needs no connection at all.",
  },
];

const KEEP = [
  {
    label: "Local database",
    tag: "On-device",
    desc: "Your plan lives in the browser's own database. There is no account and no server holding a copy.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
        <path d="M4.5 5.5v13c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5v-13" />
        <path d="M4.5 12c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5" />
      </svg>
    ),
  },
  {
    label: "Works offline",
    tag: "Always",
    desc: "Basements, trains, exam halls — the app opens and your week is there, whether or not the signal is.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3l18 18" />
        <path d="M8.5 8.6a7 7 0 0 1 9.6 1.4" />
        <path d="M5.2 12.2a12 12 0 0 1 2.4-1.9" />
        <path d="M12 19.5h.01" />
      </svg>
    ),
  },
  {
    label: "Backup & restore",
    tag: "Yours",
    desc: "Export a file whenever you like and restore it on a new device. Moving phones takes a minute, not an account.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5" />
        <path d="M20 4v4.5h-4.5" />
        <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5" />
        <path d="M4 20v-4.5h4.5" />
      </svg>
    ),
  },
];

export default function DownloadPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--th-bg-page)" }}>
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 w-full" style={{ background: "var(--th-bg-page)" }}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lektra-icon-192.png"
              alt=""
              width={28}
              height={28}
              className="h-[28px] w-[28px] shrink-0 rounded-[7px]"
            />
            <span
              className="text-[16px] font-semibold tracking-[-0.01em]"
              style={{ color: "var(--th-text-heading)" }}
            >
              Lektra
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/#features"
              className="text-[14px] font-medium transition-colors"
              style={{ color: "var(--th-text-secondary)" }}
            >
              Features
            </Link>
            <Link
              href="/privacy"
              className="text-[14px] font-medium transition-colors"
              style={{ color: "var(--th-text-secondary)" }}
            >
              Privacy
            </Link>
            <Link
              href={FEEDBACK_HREF}
              aria-label="Send feedback"
              className="transition-colors"
              style={{ color: "var(--th-text-secondary)" }}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.9 8.9 0 0 1-3.8-.9L3 21l1.9-4.9A8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
              </svg>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-28">
        {/* ── Hero ── */}
        <div className="pt-16 pb-4 text-center sm:pt-24">
          <h1
            className="text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.035em]"
            style={{ color: "var(--th-text-heading)" }}
          >
            Install Lektra
          </h1>
          <p
            className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.65]"
            style={{ color: "var(--th-text-body)" }}
          >
            Add it to your home screen. Full-screen, offline, one tap away.
          </p>
        </div>

        {/* ── App link ── */}
        <div className="mx-auto mt-12 max-w-xl">
          <div
            className="overflow-hidden rounded-2xl border"
            style={{ background: "var(--th-card-bg)", borderColor: "var(--th-card-bd)" }}
          >
            <div className="flex items-center gap-2 border-b px-5 py-3" style={{ borderColor: "var(--th-card-bd)", background: "var(--th-sf-02)" }}>
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--th-clr-terra)" }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--th-clr-amber)" }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--th-clr-sea)" }} />
              </div>
              <span className="ml-2 text-[12px] font-medium" style={{ color: "var(--th-text-muted)" }}>App link</span>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <button
                onClick={() => handleCopy(APP_URL)}
                className="group flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[13px] transition-all hover:bg-[var(--th-sf-03)]"
                style={{ background: "var(--th-sf-01)", border: "1px solid var(--th-on-06)" }}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span style={{ color: "var(--th-clr-sea)" }}>$</span>
                  <span className="truncate" style={{ color: "var(--th-text-heading)" }}>{APP_URL}</span>
                </div>
                {copied ? (
                  <svg className="h-4 w-4 shrink-0" style={{ color: "var(--th-clr-sea)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 shrink-0 opacity-40 transition-opacity group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-7 py-3 text-[15px] font-medium transition-all"
              style={{ background: "var(--th-btn-bg)", color: "var(--th-btn-text)" }}
            >
              Open Lektra
            </a>
          </div>
          <p className="mt-4 text-center text-[13px]" style={{ color: "var(--th-text-muted)" }}>
            Free. No account. Works offline once installed.
          </p>
        </div>

        {/* ── Install by device ── */}
        <div className="mx-auto mt-24 max-w-3xl">
          <h2
            className="text-center text-[13px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: "var(--th-text-muted)" }}
          >
            Add to your home screen
          </h2>
          <p
            className="mx-auto mt-3 max-w-md text-center text-[15px] leading-[1.6]"
            style={{ color: "var(--th-text-body)" }}
          >
            Same app everywhere. Pick the device you are holding.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {PLATFORMS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.key}
                  className="rounded-2xl border p-5 sm:p-6"
                  style={{ background: "var(--th-card-bg)", borderColor: "var(--th-card-bd)" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: "var(--th-sf-04)",
                      border: "1px solid var(--th-on-06)",
                      color: "var(--th-text-heading)",
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3
                    className="mt-4 text-[15px] font-semibold"
                    style={{ color: "var(--th-text-heading)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mt-0.5 text-[12px] font-medium uppercase tracking-[0.08em]"
                    style={{ color: "var(--th-accent-violet)" }}
                  >
                    {p.subtitle}
                  </p>
                  <ol className="mt-4 space-y-2.5">
                    {p.steps.map((s, i) => (
                      <li key={s} className="flex gap-2.5 text-[13.5px] leading-[1.55]" style={{ color: "var(--th-text-body)" }}>
                        <span
                          className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                          style={{ background: "var(--th-sf-04)", color: "var(--th-text-secondary)" }}
                        >
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── How it works ── */}
        <div className="mx-auto mt-24 max-w-2xl">
          <h2
            className="text-center text-[13px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: "var(--th-text-muted)" }}
          >
            How it works
          </h2>
          <div className="mt-10 flex flex-col gap-10">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-5">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[14px] font-bold"
                  style={{
                    background: "var(--th-sf-04)",
                    border: "1px solid var(--th-on-06)",
                    color: "var(--th-accent-violet)",
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    className="text-[16px] font-semibold"
                    style={{ color: "var(--th-text-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-1.5 text-[15px] leading-[1.6]"
                    style={{ color: "var(--th-text-body)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Keep it ── */}
        <div id="offline" className="mx-auto mt-28 max-w-3xl scroll-mt-24">
          <h2
            className="text-center text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em]"
            style={{ color: "var(--th-text-heading)" }}
          >
            Yours, on your device
          </h2>
          <p
            className="mx-auto mt-3 max-w-md text-center text-[15px] leading-[1.6]"
            style={{ color: "var(--th-text-body)" }}
          >
            No account, no sync service, no subscription. Just the app and your week.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {KEEP.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border p-6"
                style={{
                  background: "var(--th-card-bg)",
                  borderColor: "var(--th-card-bd)",
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: "var(--th-sf-04)",
                    color: "var(--th-text-heading)",
                  }}
                >
                  {item.icon}
                </div>
                <div className="mt-4">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                    style={{ color: "var(--th-accent-violet)" }}
                  >
                    {item.tag}
                  </span>
                  <h3
                    className="mt-1 text-[16px] font-semibold"
                    style={{ color: "var(--th-text-heading)" }}
                  >
                    {item.label}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--th-text-body)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Backup ── */}
        <div id="backup" className="mx-auto mt-24 max-w-2xl scroll-mt-24">
          <h2
            className="text-center text-[13px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: "var(--th-text-muted)" }}
          >
            Moving to a new phone
          </h2>
          <div className="mt-8 rounded-2xl border p-6 sm:p-8" style={{ background: "var(--th-card-bg)", borderColor: "var(--th-card-bd)" }}>
            <ol className="space-y-4">
              {[
                "On the old device, open Settings → Backup & restore and export a backup file.",
                "Send the file to the new device however you like — cable, message, or your own storage.",
                "Open Lektra on the new device, choose Backup & restore, and import the file.",
              ].map((s, i) => (
                <li key={s} className="flex gap-3 text-[15px] leading-[1.6]" style={{ color: "var(--th-text-body)" }}>
                  <span
                    className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
                    style={{ background: "var(--th-sf-04)", color: "var(--th-text-secondary)" }}
                  >
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[13px] leading-[1.6]" style={{ color: "var(--th-text-muted)" }}>
              Keep the backup somewhere you trust. There is no cloud copy to fall back on — that is the point.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
