import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/landing";
import { FEEDBACK_EMAIL } from "@/lib/site";
import { FeedbackForm } from "./feedback-form";

export const metadata: Metadata = {
  title: "Feedback · Lektra",
  description:
    "Report a bug, suggest a feature, or just say hello. Every message is read.",
};

export default function FeedbackPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-36 pb-24"
        style={{ background: "var(--th-bg-page)" }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <header className="mx-auto max-w-2xl text-center">
            <p
              className="text-[12px] font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--th-text-muted)" }}
            >
              Feedback
            </p>
            <h1
              className="mt-5 text-[clamp(2.4rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
              style={{ color: "var(--th-text-heading)" }}
            >
              Tell us what&rsquo;s
              <br />
              <span style={{ color: "var(--th-on-40)" }}>missing.</span>
            </h1>
            <p
              className="mx-auto mt-6 max-w-lg text-[16px] leading-[1.65]"
              style={{ color: "var(--th-text-body)" }}
            >
              A bug, a rough edge, a feature you keep wishing for — it all lands
              in the same inbox. Every message gets read, and the small ones are
              often the most useful.
            </p>
          </header>

          <FeedbackForm email={FEEDBACK_EMAIL} />
        </div>
      </main>
      <Footer />
    </>
  );
}
