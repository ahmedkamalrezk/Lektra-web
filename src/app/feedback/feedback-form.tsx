"use client";

import { useState } from "react";

const TOPICS = [
  { id: "bug", label: "Something's broken" },
  { id: "idea", label: "An idea" },
  { id: "other", label: "Something else" },
] as const;

type Topic = (typeof TOPICS)[number]["id"];

const fieldStyle: React.CSSProperties = {
  background: "var(--th-card-bg)",
  borderColor: "var(--th-card-bd)",
  color: "var(--th-text-heading)",
};

const fieldClass =
  "mt-2 w-full rounded-2xl border px-4 py-3 text-[15px] leading-6 outline-none transition-colors placeholder:text-[var(--th-text-hint)] focus:border-[var(--th-text-heading)]";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H6.5A2.5 2.5 0 0 0 4 5.5v6A2.5 2.5 0 0 0 6.5 14" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function FeedbackForm({ email }: { email: string }) {
  const [topic, setTopic] = useState<Topic>("idea");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const label = TOPICS.find((t) => t.id === topic)?.label ?? "Feedback";
    const body = [
      message.trim(),
      "",
      "—",
      name.trim() ? `From: ${name.trim()}` : "",
      from.trim() ? `Reply to: ${from.trim()}` : "",
      "Sent from the Lektra site",
    ]
      .filter(Boolean)
      .join("\n");

    const href =
      `mailto:${email}` +
      `?subject=${encodeURIComponent(`Lektra feedback — ${label}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      {/* ── Form card ── */}
      <form
        onSubmit={submit}
        className="rounded-[28px] border p-6 sm:p-8"
        style={{
          background: "var(--th-card-bg)",
          borderColor: "var(--th-card-bd)",
          boxShadow: "0 12px 36px rgba(0,0,0,.05)",
        }}
      >
        <fieldset>
          <legend
            className="text-[13px] font-semibold"
            style={{ color: "var(--th-text-strong)" }}
          >
            What is it about?
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {TOPICS.map((item) => {
              const active = item.id === topic;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setTopic(item.id);
                    setSent(false);
                  }}
                  className="rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors"
                  style={
                    active
                      ? {
                          background: "var(--th-btn-bg)",
                          color: "var(--th-btn-text)",
                          borderColor: "var(--th-btn-bg)",
                        }
                      : {
                          background: "var(--th-card-bg)",
                          color: "var(--th-text-secondary)",
                          borderColor: "var(--th-card-bd)",
                        }
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span
              className="text-[13px] font-semibold"
              style={{ color: "var(--th-text-strong)" }}
            >
              Name <span style={{ color: "var(--th-text-hint)" }}>· optional</span>
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              placeholder="Your name"
              className={fieldClass}
              style={fieldStyle}
            />
          </label>
          <label className="block">
            <span
              className="text-[13px] font-semibold"
              style={{ color: "var(--th-text-strong)" }}
            >
              Email <span style={{ color: "var(--th-text-hint)" }}>· optional</span>
            </span>
            <input
              type="email"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              className={fieldClass}
              style={fieldStyle}
            />
          </label>
        </div>

        <label className="mt-5 block">
          <span
            className="text-[13px] font-semibold"
            style={{ color: "var(--th-text-strong)" }}
          >
            Message
          </span>
          <textarea
            required
            rows={6}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              setSent(false);
            }}
            placeholder="What happened, what you expected, or what you wish Lektra did…"
            className={`${fieldClass} resize-y`}
            style={fieldStyle}
          />
        </label>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="text-[12.5px] leading-[1.5]"
            style={{ color: "var(--th-text-muted)" }}
          >
            {sent ? (
              <span
                className="inline-flex items-center gap-1.5 font-medium"
                style={{ color: "var(--th-text-strong)" }}
              >
                <CheckIcon className="h-4 w-4" />
                Your mail app should open with the message ready to send.
              </span>
            ) : (
              "This opens your mail app — nothing is stored on this site."
            )}
          </p>

          <button
            type="submit"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-transform active:scale-[.98]"
            style={{
              background: "var(--th-btn-bg)",
              color: "var(--th-btn-text)",
            }}
          >
            Send feedback
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* ── Sidebar ── */}
      <aside className="grid gap-6">
        <div
          className="rounded-[28px] border p-6"
          style={{
            background: "var(--th-card-bg)",
            borderColor: "var(--th-card-bd)",
          }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: "var(--th-sf-04)", color: "var(--th-text-strong)" }}
          >
            <MailIcon className="h-[18px] w-[18px]" />
          </div>
          <h2
            className="mt-4 text-[15px] font-semibold"
            style={{ color: "var(--th-text-heading)" }}
          >
            Prefer email?
          </h2>
          <p
            className="mt-1.5 text-[13.5px] leading-[1.55]"
            style={{ color: "var(--th-text-body)" }}
          >
            Write to us directly — same inbox, no form.
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-4 block break-all text-[14px] font-medium underline-offset-4 hover:underline"
            style={{ color: "var(--th-text-heading)" }}
          >
            {email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors"
            style={{
              borderColor: "var(--th-card-bd)",
              color: "var(--th-text-secondary)",
            }}
          >
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4" />
                Copy address
              </>
            )}
          </button>
        </div>

        <div
          className="rounded-[28px] border p-6"
          style={{
            background: "var(--th-sf-02)",
            borderColor: "var(--th-card-bd)",
          }}
        >
          <h2
            className="text-[15px] font-semibold"
            style={{ color: "var(--th-text-heading)" }}
          >
            What helps
          </h2>
          <ul className="mt-4 space-y-3">
            {[
              "What you were doing when it went wrong",
              "Your device and browser",
              "A screenshot, if you have one",
              "For ideas: what you expected instead",
            ].map((line) => (
              <li key={line} className="flex gap-2.5">
                <span
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                  style={{ background: "var(--th-text-hint)" }}
                />
                <span
                  className="text-[13.5px] leading-[1.55]"
                  style={{ color: "var(--th-text-body)" }}
                >
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
