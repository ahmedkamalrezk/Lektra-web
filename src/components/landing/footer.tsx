import Link from "next/link";

import { APP_URL, FEEDBACK_HREF } from "@/lib/site";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Install", href: "/download" },
    { label: "Pricing", href: "/pricing" },
  ],
  Elsewhere: [
    { label: "Open Lektra", href: APP_URL },
    { label: "Send feedback", href: FEEDBACK_HREF },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  Support: [
    { label: "Install guide", href: "/download" },
    { label: "Offline use", href: "/download#offline" },
    { label: "Backup & restore", href: "/download#backup" },
    { label: "Send feedback", href: FEEDBACK_HREF },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--th-bd-subtle)]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/lektra-icon-192.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 shrink-0 rounded-[7px]"
              />
              <span className="th-text-heading text-base font-semibold tracking-tight">
                Lektra
              </span>
            </Link>
            <p className="th-text-muted mt-4 max-w-xs text-sm leading-relaxed">
              A quiet planner for lectures, sections, labs, quizzes and
              deadlines. Free, offline, and yours.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="th-text-strong text-sm font-semibold">{heading}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="th-text-secondary text-sm transition-colors hover:text-[var(--th-text-strong)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="section-divider mt-12" />
        <div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="th-text-muted text-sm">
            &copy; {new Date().getFullYear()} Lektra. All rights reserved.
          </p>

          <p className="th-text-muted text-[13px]">
            Made for students who have enough to remember.
          </p>

          <div className="flex items-center gap-5">
            {/* Feedback */}
            <Link
              href={FEEDBACK_HREF}
              className="th-text-muted transition-colors hover:text-[var(--th-text-strong)]"
              aria-label="Send feedback"
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
          </div>
        </div>
      </div>
    </footer>
  );
}
