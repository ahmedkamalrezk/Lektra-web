import Link from "next/link";

const APP_URL = "https://ahmedkamalrezk.github.io/Lektra/";
const GITHUB_URL = "https://github.com/ahmedkamalrezk/Lektra";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Install", href: "/download" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  Elsewhere: [
    { label: "Open Lektra", href: APP_URL },
    { label: "Source on GitHub", href: GITHUB_URL },
    { label: "Latest release", href: `${GITHUB_URL}/releases` },
    { label: "Report an issue", href: `${GITHUB_URL}/issues` },
  ],
  Support: [
    { label: "Install guide", href: "/download" },
    { label: "Offline use", href: "/download#offline" },
    { label: "Backup & restore", href: "/download#backup" },
    { label: "Questions", href: `${GITHUB_URL}/issues` },
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
            {/* GitHub */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="th-text-muted transition-colors hover:text-[var(--th-text-strong)]"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
