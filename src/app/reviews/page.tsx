import type { Metadata } from "next";

import { Footer, Navbar } from "@/components/landing";
import { ReviewsBoard } from "./reviews-board";

export const metadata: Metadata = {
  title: "Reviews · Lektra",
  description:
    "Read what students say about Lektra, add your own review, and see which universities are represented.",
};

export default function ReviewsPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-36 pb-24"
        style={{ background: "var(--th-bg-page)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <header className="mx-auto max-w-2xl text-center">
            <p
              className="text-[12px] font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--th-text-muted)" }}
            >
              Student reviews
            </p>
            <h1
              className="mt-5 text-[clamp(2.4rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
              style={{ color: "var(--th-text-heading)" }}
            >
              From the people
              <br />
              <span style={{ color: "var(--th-on-40)" }}>who use it.</span>
            </h1>
            <p
              className="mx-auto mt-6 max-w-lg text-[16px] leading-[1.65]"
              style={{ color: "var(--th-text-body)" }}
            >
              Add your review, then see which universities are showing up. Point
              at a university to read everyone&rsquo;s reviews — no scores, no
              rankings, just the honest version.
            </p>
          </header>

          <ReviewsBoard />
        </div>
      </main>
      <Footer />
    </>
  );
}
