import Link from "next/link";

import { Navbar, Footer } from "@/components/landing";
import { APP_URL } from "@/lib/site";

export const metadata = {
  title: "Pricing · Lektra",
  description: "Lektra is free. No account, no subscription, no upsell.",
};

const INCLUDED = [
  "Unlimited subjects, classes and deadlines",
  "Timetable scanning and voice input",
  "Reminders, calendar and month options",
  "Every theme and appearance setting",
  "Offline use on every device",
  "Backup export and restore",
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-36 pb-24" style={{ background: "var(--th-bg-page)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: "var(--th-text-muted)" }}
          >
            Pricing
          </p>
          <h1
            className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
            style={{ color: "var(--th-text-heading)" }}
          >
            Free.
            <br />
            <span style={{ color: "var(--th-text-muted)" }}>No asterisk.</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-lg text-[16px] leading-[1.65]"
            style={{ color: "var(--th-text-body)" }}
          >
            Lektra is a small app for students, not a business with a growth
            plan. There is nothing to buy, nothing to subscribe to, and no
            account to create.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-xl px-6">
          <div
            className="rounded-3xl border p-7 sm:p-9"
            style={{
              background: "var(--th-card-bg)",
              borderColor: "var(--th-card-bd)",
              boxShadow: "0 12px 36px rgba(0,0,0,.05)",
            }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[15px] font-semibold" style={{ color: "var(--th-text-heading)" }}>
                  Everything
                </p>
                <p className="mt-1 text-[13px]" style={{ color: "var(--th-text-muted)" }}>
                  The whole app, on every device you own.
                </p>
              </div>
              <p className="text-[2.25rem] font-semibold leading-none" style={{ color: "var(--th-text-heading)" }}>
                $0
              </p>
            </div>

            <ul className="mt-7 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-3 text-[14.5px] leading-[1.55]" style={{ color: "var(--th-text-body)" }}>
                  <svg
                    className="mt-[3px] h-4 w-4 shrink-0"
                    style={{ color: "var(--th-accent-violet)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-6 py-2.5 text-[14px] font-medium transition-all"
                style={{ background: "var(--th-btn-bg)", color: "var(--th-btn-text)" }}
              >
                Open Lektra
              </a>
              <Link
                href="/download"
                className="rounded-full px-6 py-2.5 text-[14px] font-medium transition-colors"
                style={{ color: "var(--th-text-secondary)" }}
              >
                Install guide
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-[13px] leading-[1.6]" style={{ color: "var(--th-text-muted)" }}>
            Hosting is a static site. Your data stays on your device — that is
            also why there is no bill.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
