"use client";

import Link from "next/link";
import { useState } from "react";

import { APP_URL } from "@/lib/site";

const TOPICS = [
  {
    name: "Lectures",
    icon: (
      <>
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14.5H6.5A2.5 2.5 0 0 0 4 21z" />
        <path d="M4 6.5v14" />
      </>
    ),
  },
  {
    name: "Sections",
    icon: (
      <>
        <circle cx="9" cy="8" r="2.6" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
        <path d="M16 5.2a2.6 2.6 0 0 1 0 5.1" />
        <path d="M17.5 13.6A5 5 0 0 1 21 18.4" />
      </>
    ),
  },
  {
    name: "Labs",
    icon: (
      <>
        <path d="M9 3h6" />
        <path d="M10 3v5.2L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.2V3" />
        <path d="M7.5 15h9" />
      </>
    ),
  },
  {
    name: "Quizzes",
    icon: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2.5" />
        <path d="M9 4a3 3 0 0 1 6 0" />
        <path d="M9 13l2 2 4-4" />
      </>
    ),
  },
  {
    name: "Deadlines",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
  },
  {
    name: "Timetables",
    icon: (
      <>
        <path d="M4 8.5h2.2l1.3-2h9l1.3 2H20a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5z" />
        <circle cx="12" cy="13.5" r="3.2" />
      </>
    ),
  },
  {
    name: "Reminders",
    icon: (
      <>
        <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
        <path d="M10.5 20a2 2 0 0 0 3 0" />
      </>
    ),
  },
  {
    name: "Calendar",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M8 3.5v4M16 3.5v4M3.5 10h17" />
      </>
    ),
  },
  {
    name: "Subjects",
    icon: (
      <path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h4l2 2h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
    ),
  },
  {
    name: "Offline",
    icon: (
      <>
        <path d="M6 18a4 4 0 0 1-.7-7.9A5.5 5.5 0 0 1 15 6.3" />
        <path d="M17.5 9.5A3.5 3.5 0 0 1 18 18h-1" />
        <path d="M3 3l18 18" />
      </>
    ),
  },
];

export function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(APP_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero-section relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden">
      {/* ═══════════════ Background layers ═══════════════ */}
      <div className="hero-grain absolute inset-0" aria-hidden="true" />
      <div className="hero-grid absolute inset-0" aria-hidden="true" />

      {/* ── Bottom aurora glow ── */}
      <div className="hero-aurora" aria-hidden="true">
        <div className="hero-aurora-core" />
        <div className="hero-aurora-wing hero-aurora-wing--left" />
        <div className="hero-aurora-wing hero-aurora-wing--right" />
      </div>

      {/* ═══════════════ Content ═══════════════ */}
      <div className="relative z-20 mx-auto w-full max-w-[860px] px-6 text-center">
        {/* Install hint */}
        <button
          onClick={handleCopy}
          className="animate-fade-in-up group mb-7 inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.01em] th-text-muted transition-colors hover:th-text-secondary"
        >
          <span className="opacity-50">$</span>
          <span>add lektra to your home screen</span>
          <span className="ml-0.5 opacity-0 transition-opacity group-hover:opacity-50">
            {copied ? (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            )}
          </span>
        </button>

        {/* Headline */}
        <h1 className="animate-fade-in-up animate-delay-100">
          <span className="block text-[clamp(2.75rem,6vw,4.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] th-text-heading">
            Plan your week.
          </span>
          <span className="hero-headline-second block text-[clamp(2.75rem,6vw,4.75rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
            Own your semester.
          </span>
        </h1>

        {/* Sub */}
        <p className="animate-fade-in-up animate-delay-200 mx-auto mt-6 max-w-[560px] text-[16px] leading-[1.65] th-text-body">
          Lectures, sections, labs, quizzes and deadlines — one calm place. Scan your
          timetable, add plans by voice, and keep going when the signal&nbsp;drops.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up animate-delay-300 mt-9 flex flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-3.5">
            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              className="th-btn group rounded-full px-7 py-3 text-[15px] font-medium"
            >
              Open Lektra
              <svg
                className="ml-1.5 -mr-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <Link
              href="/download"
              className="th-btn-ghost group rounded-full px-7 py-3 text-[15px] font-medium"
            >
              Install
              <svg
                className="ml-1.5 -mr-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════ Topic ticker ═══════════════ */}
      <div className="animate-fade-in-up animate-delay-500 relative z-10 mt-16 w-full max-w-[900px] px-6">
        <p className="mb-6 text-center text-[13px] font-medium uppercase tracking-[0.1em] th-text-muted">
          Built for the way you actually study
        </p>
        <div className="hero-ticker-mask overflow-hidden">
          <div className="hero-ticker flex w-max items-center gap-12">
            {[0, 1].map((i) => (
              <div key={i} className="flex shrink-0 items-center gap-12">
                {TOPICS.map((t) => (
                  <div key={`${i}-${t.name}`} className="flex shrink-0 items-center gap-2.5 opacity-50" style={{ filter: 'grayscale(1) brightness(0.45) contrast(1.1)' }}>
                    <svg
                      className="h-[26px] w-[26px] th-text-secondary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {t.icon}
                    </svg>
                    <span className="whitespace-nowrap text-[14px] font-medium th-text-secondary">{t.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edge fades */}
      <div className="hero-edge-fade-top absolute top-0 left-0 right-0 h-20" aria-hidden="true" />
      <div className="hero-edge-fade-bottom absolute bottom-0 left-0 right-0 h-40" aria-hidden="true" />
    </section>
  );
}
