"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Features", href: "/features" },
  { label: "Install", href: "/download" },
  { label: "Privacy", href: "/privacy" },
];

import { APP_URL, FEEDBACK_HREF, asset } from "@/lib/site";

export function Navbar() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const navBottom = 80;
    const darkEls = document.querySelectorAll('[data-section="dark"]');
    let inDark = false;
    darkEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= navBottom && rect.bottom > 0) inDark = true;
    });
    setDark(inDark);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-5">
        {/* ── Logo ────────────────────────────────────────────── */}
        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/lektra-icon-192.png")}
            alt=""
            width={30}
            height={30}
            className="h-[30px] w-[30px] shrink-0 rounded-[8px]"
          />
          <span
            className="text-[16px] font-semibold tracking-[-0.01em]"
            style={{
              color: dark ? "rgba(255,255,255,.95)" : "var(--th-text-heading)",
              transition: "color .3s",
            }}
          >
            Lektra
          </span>
        </Link>

        {/* ── Center pill nav ─────────────────────────────────── */}
        <nav
          className="absolute left-1/2 top-5 hidden -translate-x-1/2 items-center gap-0.5 rounded-full px-1.5 py-1.5 backdrop-blur-xl md:flex"
          style={{
            background: dark ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.72)",
            border: dark ? "1px solid rgba(255,255,255,.10)" : "1px solid var(--th-on-05)",
            boxShadow: dark ? "none" : "0 0 0 1px rgba(0,0,0,.03), 0 2px 8px rgba(0,0,0,.04)",
            transition: "background .3s, border .3s, box-shadow .3s",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-pill-item rounded-full px-4 py-2 text-[14px] font-medium transition-all"
              style={{
                color: dark ? "rgba(255,255,255,.55)" : "var(--th-text-secondary)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={FEEDBACK_HREF}
            className="nav-pill-item flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium transition-all"
            style={{
              color: dark ? "rgba(255,255,255,.55)" : "var(--th-text-secondary)",
            }}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.9 8.9 0 0 1-3.8-.9L3 21l1.9-4.9A8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
            </svg>
            Feedback
          </Link>
        </nav>

        {/* ── Right side CTA ──────────────────────────────────── */}
        <div className="relative z-10 flex items-center gap-3">
          <a
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full px-5 py-2 text-[14px] font-medium transition-colors sm:inline-block"
            style={{
              color: dark ? "rgba(255,255,255,.55)" : "var(--th-text-secondary)",
            }}
          >
            Open app
          </a>
          <Link
            href="/download"
            className="hidden rounded-full px-5 py-2 text-[14px] font-medium transition-all sm:inline-block"
            style={{
              background: dark ? "#fff" : "var(--th-btn-bg)",
              color: dark ? "#000" : "var(--th-btn-text)",
            }}
          >
            Install
          </Link>

          {/* ── Hamburger (mobile only) ──────────────────────── */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            style={{
              background: dark ? "rgba(255,255,255,.10)" : "var(--th-sf-04)",
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={dark ? "#fff" : "var(--th-text-heading)"} strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile slide-out panel ──────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <nav
            className="absolute right-0 top-0 flex h-full w-[280px] flex-col gap-1 bg-[var(--th-bg-page)] px-6 pt-24 shadow-2xl"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-[15px] font-medium th-text-body transition-colors hover:bg-[var(--th-sf-04)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={FEEDBACK_HREF}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-[15px] font-medium th-text-body transition-colors hover:bg-[var(--th-sf-04)]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.9 8.9 0 0 1-3.8-.9L3 21l1.9-4.9A8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
              </svg>
              Feedback
            </Link>

            <div className="my-3 h-px bg-[var(--th-divider)]" />

            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-[15px] font-medium th-text-secondary transition-colors hover:bg-[var(--th-sf-04)]"
            >
              Open app
            </a>
            <Link
              href="/download"
              onClick={() => setMobileOpen(false)}
              className="mt-1 rounded-xl bg-[var(--th-btn-bg)] px-4 py-3 text-center text-[15px] font-medium text-[var(--th-btn-text)]"
            >
              Install
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
