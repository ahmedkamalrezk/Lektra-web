"use client";

import { formatReviewDate, type Review } from "@/lib/reviews";

const AVATARS = [
  { background: "var(--th-clr-plum-bg)", color: "var(--th-clr-plum)" },
  { background: "var(--th-clr-sea-bg)", color: "var(--th-clr-sea)" },
  { background: "var(--th-clr-terra-bg)", color: "var(--th-clr-terra)" },
];

function avatarFor(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash + seed.charCodeAt(index) * (index + 1)) % AVATARS.length;
  }
  return AVATARS[hash];
}

type Props = {
  review: Review;
  onSelectUniversity: (university: string) => void;
};

export function ReviewCard({ review, onSelectUniversity }: Props) {
  const initial = review.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border p-6 transition-colors duration-200 hover:border-[var(--th-bd-strong)]"
      style={{
        background: "var(--th-card-bg)",
        borderColor: "var(--th-card-bd)",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-3 select-none text-[52px] font-semibold leading-none"
        style={{ color: "var(--th-sf-05)" }}
      >
        &ldquo;
      </span>

      <p
        className="relative flex-1 whitespace-pre-line pr-6 text-[15px] leading-[1.7]"
        style={{ color: "var(--th-text-body)" }}
      >
        {review.body}
      </p>

      <footer
        className="mt-6 flex items-center gap-3 border-t pt-4"
        style={{ borderColor: "var(--th-divider)" }}
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
          style={avatarFor(review.name)}
          aria-hidden="true"
        >
          {initial}
        </span>

        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[13.5px] font-semibold"
            style={{ color: "var(--th-text-heading)" }}
          >
            {review.name}
          </p>

          <div
            className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11.5px]"
            style={{ color: "var(--th-text-muted)" }}
          >
            <button
              type="button"
              onClick={() => onSelectUniversity(review.university)}
              title={`Read reviews from ${review.university}`}
              className="max-w-[70%] truncate text-left underline-offset-2 transition-colors hover:text-[var(--th-text-strong)] hover:underline"
            >
              {review.university}
            </button>
            <span aria-hidden="true">·</span>
            <time dateTime={review.createdAt} className="shrink-0">
              {formatReviewDate(review.createdAt)}
            </time>
            {review.demo && (
              <>
                <span aria-hidden="true">·</span>
                <span
                  className="shrink-0 text-[10px] font-medium uppercase tracking-[0.08em]"
                  style={{ color: "var(--th-text-hint)" }}
                  title="Example review shown in preview mode"
                >
                  Example
                </span>
              </>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
}
