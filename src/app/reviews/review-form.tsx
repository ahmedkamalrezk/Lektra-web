"use client";

import { useState } from "react";

import {
  REVIEW_LIMITS,
  UNIVERSITIES,
  normalizeReviewInput,
  type Review,
} from "@/lib/reviews";
import { ArrowIcon, CheckIcon, InfoIcon, PenIcon, SpinnerIcon } from "./icons";

const fieldStyle: React.CSSProperties = {
  background: "var(--th-card-bg)",
  color: "var(--th-text-heading)",
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-[var(--th-bd-default)] px-3.5 py-2.5 text-[15px] leading-6 outline-none transition-[border-color,box-shadow] placeholder:text-[var(--th-text-hint)] hover:border-[var(--th-bd-strong)] focus:border-[var(--th-text-heading)] focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]";

type Props = {
  onSubmit: (input: {
    name: string;
    university: string;
    body: string;
  }) => Promise<Review>;
};

export function ReviewForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [body, setBody] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedName, setSavedName] = useState<string | null>(null);
  const [trap, setTrap] = useState("");

  const bodyLength = body.trim().length;
  const tooShort = bodyLength > 0 && bodyLength < REVIEW_LIMITS.bodyMin;

  const change = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setSavedName(null);
    setError(null);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;

    setError(null);

    // Hidden field: bots fill it, people never see it.
    if (trap) {
      setSavedName(name.trim().split(/\s+/)[0] || "there");
      setName("");
      setUniversity("");
      setBody("");
      return;
    }

    let clean: { name: string; university: string; body: string };
    try {
      clean = normalizeReviewInput({ name, university, body });
    } catch (validation) {
      setError(
        validation instanceof Error
          ? validation.message
          : "Please check the form.",
      );
      return;
    }

    setPending(true);
    try {
      const review = await onSubmit(clean);
      setSavedName(review.name.trim().split(/\s+/)[0] || "there");
      setName("");
      setUniversity("");
      setBody("");
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      id="review-form"
      onSubmit={submit}
      className="scroll-mt-28 rounded-[30px] border p-6 sm:p-8"
      style={{
        background: "var(--th-bg-card)",
        borderColor: "var(--th-card-bd)",
        boxShadow: "0 20px 50px rgba(0,0,0,.06), 0 2px 8px rgba(0,0,0,.03)",
      }}
    >
      <div className="flex items-start gap-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: "var(--th-text-heading)",
            color: "var(--th-bg-page)",
          }}
          aria-hidden="true"
        >
          <PenIcon className="h-5 w-5" />
        </span>
        <div className="pt-0.5">
          <h2
            className="text-[19px] font-semibold tracking-[-0.015em]"
            style={{ color: "var(--th-text-heading)" }}
          >
            Leave a review
          </h2>
          <p
            className="mt-1 text-[13.5px] leading-[1.55]"
            style={{ color: "var(--th-text-muted)" }}
          >
            Two minutes, and it shows up on this page right away.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span
            className="text-[12.5px] font-semibold tracking-[0.01em]"
            style={{ color: "var(--th-text-strong)" }}
          >
            Your name
          </span>
          <input
            type="text"
            required
            minLength={2}
            maxLength={REVIEW_LIMITS.name}
            value={name}
            onChange={(event) => change(setName)(event.target.value)}
            autoComplete="name"
            placeholder="e.g. Mariam H."
            className={fieldClass}
            style={fieldStyle}
          />
        </label>

        <label className="block">
          <span
            className="text-[12.5px] font-semibold tracking-[0.01em]"
            style={{ color: "var(--th-text-strong)" }}
          >
            University
          </span>
          <input
            type="text"
            required
            minLength={2}
            maxLength={REVIEW_LIMITS.university}
            value={university}
            onChange={(event) => change(setUniversity)(event.target.value)}
            list="review-universities"
            autoComplete="off"
            placeholder="Start typing…"
            className={fieldClass}
            style={fieldStyle}
          />
          <datalist id="review-universities">
            {UNIVERSITIES.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        </label>
      </div>

      <label className="mt-4 block">
        <span
          className="text-[12.5px] font-semibold tracking-[0.01em]"
          style={{ color: "var(--th-text-strong)" }}
        >
          Your review
        </span>
        <span className="relative mt-2 block">
          <textarea
            required
            rows={5}
            minLength={REVIEW_LIMITS.bodyMin}
            maxLength={REVIEW_LIMITS.bodyMax}
            value={body}
            onChange={(event) => change(setBody)(event.target.value)}
            placeholder="What do you use it for? What works, what doesn't?"
            className={`${fieldClass} mt-0 min-h-[142px] resize-y pb-9`}
            style={fieldStyle}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2.5 right-2.5 rounded-md px-1.5 py-0.5 text-[11.5px] font-medium tabular-nums"
            style={{
              background: "var(--th-card-bg)",
              color: tooShort
                ? "var(--th-clr-terra)"
                : "var(--th-text-hint)",
            }}
          >
            {tooShort
              ? `${REVIEW_LIMITS.bodyMin - bodyLength} more characters`
              : `${bodyLength} / ${REVIEW_LIMITS.bodyMax.toLocaleString("en-GB")}`}
          </span>
        </span>
      </label>

      {/* Honeypot — visually hidden, never focusable. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(event) => setTrap(event.target.value)}
          />
        </label>
      </div>

      <div
        className="mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: "var(--th-divider)" }}
      >
        <p
          className="flex items-start gap-1.5 text-[12px] leading-[1.5]"
          style={{ color: "var(--th-text-muted)" }}
        >
          <InfoIcon
            className="mt-[1px] h-3.5 w-3.5 shrink-0"
            style={{ color: "var(--th-text-hint)" }}
          />
          <span>
            Public — please leave out phone numbers and emails.
          </span>
        </p>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-[transform,opacity] hover:opacity-90 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          style={{
            background: "var(--th-btn-bg)",
            color: "var(--th-btn-text)",
          }}
        >
          {pending ? "Posting…" : "Post review"}
          {pending ? (
            <SpinnerIcon className="h-4 w-4" />
          ) : (
            <ArrowIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      <div aria-live="polite" className="mt-4 empty:mt-0">
        {savedName && (
          <p
            className="flex items-start gap-2 rounded-xl border px-4 py-3 text-[13px] leading-[1.5]"
            style={{
              background: "var(--th-clr-sea-wash)",
              borderColor: "var(--th-clr-sea-bdr)",
              color: "var(--th-text-strong)",
            }}
          >
            <span
              className="mt-[1px] shrink-0"
              style={{ color: "var(--th-clr-sea)" }}
            >
              <CheckIcon className="h-4 w-4" />
            </span>
            Thanks, {savedName} — your review is live below.
          </p>
        )}
        {error && (
          <p
            role="alert"
            className="rounded-xl border px-4 py-3 text-[13px] leading-[1.5]"
            style={{
              background: "var(--th-clr-terra-wash)",
              borderColor: "var(--th-clr-terra-bdr)",
              color: "var(--th-text-strong)",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
