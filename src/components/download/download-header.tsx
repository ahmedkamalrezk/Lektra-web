/** The slim header shared by the install pages. */

import Link from "next/link";

import { FEEDBACK_HREF, asset } from "@/lib/site";

const LINKS = [
  { label: "Features", href: "/features" },
  // This is the install section itself; the link is only useful on wide screens.
  { label: "Install", href: "/download", wideOnly: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Privacy", href: "/privacy" },
];

export function DownloadHeader() {
  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: "var(--th-bg-page)" }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/lektra-icon-192.png")}
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
        <nav className="flex items-center gap-5 sm:gap-6">
          {LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-[14px] font-medium transition-colors ${
                item.wideOnly ? "hidden sm:inline" : ""
              }`}
              style={{ color: "var(--th-text-secondary)" }}
            >
              {item.label}
            </Link>
          ))}
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
  );
}
