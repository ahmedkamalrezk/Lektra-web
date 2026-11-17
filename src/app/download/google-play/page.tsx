import type { Metadata } from "next";
import Link from "next/link";

import { DownloadHeader } from "@/components/download/download-header";
import { APP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Google Play · Lektra",
  description:
    "Lektra for Android is coming to Google Play. Until then it installs straight from your browser.",
};

export default function GooglePlayPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--th-bg-page)" }}>
      <DownloadHeader />

      <main className="mx-auto flex min-h-[calc(100svh-76px)] max-w-2xl flex-col items-center justify-center px-6 pb-24 text-center">
        <p
          className="text-[12px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "var(--th-text-muted)" }}
        >
          Google Play
        </p>

        <h1
          className="mt-4 text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.035em]"
          style={{ color: "var(--th-text-heading)" }}
        >
          Coming soon.
          <br />
          <span style={{ color: "var(--th-text-muted)" }}>Not long now.</span>
        </h1>

        <p
          className="mt-6 max-w-md text-[16px] leading-[1.65]"
          style={{ color: "var(--th-text-body)" }}
        >
          Until then, Lektra installs straight from your browser.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-7 py-3 text-[15px] font-medium transition-all"
            style={{ background: "var(--th-btn-bg)", color: "var(--th-btn-text)" }}
          >
            Open Lektra
          </a>
          <Link
            href="/download"
            className="rounded-full px-7 py-3 text-[15px] font-medium transition-colors"
            style={{ border: "1px solid var(--th-card-bd)", color: "var(--th-text-heading)" }}
          >
            Install guide
          </Link>
        </div>

        <p className="mt-7 text-[13px]" style={{ color: "var(--th-text-muted)" }}>
          Same app, same data. Nothing to sign up for.
        </p>
      </main>
    </div>
  );
}
