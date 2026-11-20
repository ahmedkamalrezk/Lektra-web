"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  OTHER_UNIVERSITIES,
  chartSeries,
  reviewsAreShared,
  submitReview,
  subscribeReviews,
  type Review,
} from "@/lib/reviews";
import { ArrowIcon, InfoIcon, QuoteIcon } from "./icons";
import { ReviewCard } from "./review-card";
import { ReviewForm } from "./review-form";
import { UniversityChart } from "./university-chart";

type Status = "loading" | "ready" | "error";

export function ReviewsBoard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStatus("loading");
    setLoadError(null);

    return subscribeReviews(
      (next) => {
        setReviews(next);
        setStatus("ready");
      },
      (failure) => {
        setLoadError(failure.message);
        setStatus("error");
      },
    );
  }, [reloadKey]);

  const series = useMemo(() => chartSeries(reviews), [reviews]);

  const visible = useMemo(() => {
    if (!selected) return reviews;
    if (selected === OTHER_UNIVERSITIES) {
      return reviews.filter(
        (review) => !series.topNames.has(review.university),
      );
    }
    return reviews.filter((review) => review.university === selected);
  }, [reviews, selected, series]);

  const selectUniversity = (university: string) => {
    setSelected(university);
  };

  const scrollToReviews = () => {
    window.requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const pickUniversity = (university: string) => {
    setSelected(university);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      scrollToReviews();
    }
  };

  const filterFromCard = (university: string) => {
    setSelected(university);
    scrollToReviews();
  };

  const handleSubmit = async (input: {
    name: string;
    university: string;
    body: string;
  }) => {
    const review = await submitReview(input);
    setReviews((previous) => [
      review,
      ...previous.filter((item) => item.id !== review.id),
    ]);
    setSelected(null);
    return review;
  };

  return (
    <div>
      {!reviewsAreShared && (
        <div
          className="mt-10 flex items-start gap-3 rounded-2xl border px-4 py-3.5"
          style={{
            background: "var(--th-clr-amber-wash)",
            borderColor: "var(--th-clr-plum-bdr)",
          }}
        >
          <InfoIcon
            className="mt-[1px] h-4 w-4 shrink-0"
            style={{ color: "var(--th-text-secondary)" }}
          />
          <p
            className="text-[13px] leading-[1.6]"
            style={{ color: "var(--th-text-body)" }}
          >
            <strong style={{ color: "var(--th-text-strong)" }}>
              Preview mode.
            </strong>{" "}
            New reviews are saved in this browser only. Connect a reviews
            database to collect them from everyone.
          </p>
        </div>
      )}

      <div className="mx-auto mt-8 max-w-3xl">
        <ReviewForm onSubmit={handleSubmit} />
      </div>

      <div className="mt-10">
        <UniversityChart
          reviews={reviews}
          selected={selected}
          onHover={selectUniversity}
          onPick={pickUniversity}
          onClear={() => setSelected(null)}
        />
      </div>

      <section
        ref={listRef}
        aria-labelledby="review-list-heading"
        className="mt-14 scroll-mt-28 border-t pt-10"
        style={{ borderColor: "var(--th-divider)" }}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="review-list-heading"
              className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.025em]"
              style={{ color: "var(--th-text-heading)" }}
            >
              {selected ? (
                <>
                  Reviews from{" "}
                  <span style={{ color: "var(--th-text-secondary)" }}>
                    {selected === OTHER_UNIVERSITIES
                      ? "other universities"
                      : selected}
                  </span>
                </>
              ) : (
                "Recent reviews"
              )}
            </h2>
            <p
              className="mt-2 text-[13.5px] leading-[1.55]"
              style={{ color: "var(--th-text-muted)" }}
            >
              {selected
                ? selected === OTHER_UNIVERSITIES
                  ? "Everyone from universities outside the top ten."
                  : "Everyone who left a review from this university."
                : "Hover a university in the chart to filter — or read every review here."}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="text-[12.5px] font-medium tabular-nums"
              style={{ color: "var(--th-text-muted)" }}
            >
              {visible.length} {visible.length === 1 ? "review" : "reviews"}
            </span>
            {selected && (
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors hover:bg-[var(--th-sf-03)]"
                style={{
                  borderColor: "var(--th-card-bd)",
                  color: "var(--th-text-secondary)",
                }}
              >
                Show all
              </button>
            )}
          </div>
        </div>

        {status === "loading" && (
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="animate-pulse rounded-[24px] border p-6"
                style={{
                  background: "var(--th-card-bg)",
                  borderColor: "var(--th-card-bd)",
                }}
              >
                <span
                  className="block h-3 w-full rounded-full"
                  style={{ background: "var(--th-sf-04)" }}
                />
                <span
                  className="mt-2.5 block h-3 w-11/12 rounded-full"
                  style={{ background: "var(--th-sf-04)" }}
                />
                <span
                  className="mt-2.5 block h-3 w-2/3 rounded-full"
                  style={{ background: "var(--th-sf-04)" }}
                />
                <div
                  className="mt-6 flex items-center gap-3 border-t pt-4"
                  style={{ borderColor: "var(--th-divider)" }}
                >
                  <span
                    className="h-9 w-9 rounded-full"
                    style={{ background: "var(--th-sf-05)" }}
                  />
                  <span className="flex-1">
                    <span
                      className="block h-3 w-24 rounded-full"
                      style={{ background: "var(--th-sf-05)" }}
                    />
                    <span
                      className="mt-2 block h-2.5 w-32 rounded-full"
                      style={{ background: "var(--th-sf-04)" }}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div
            className="mt-7 rounded-[24px] border p-8 text-center"
            style={{
              background: "var(--th-clr-terra-bg)",
              borderColor: "var(--th-card-bd)",
            }}
          >
            <p
              className="text-[14px] font-medium"
              style={{ color: "var(--th-text-strong)" }}
            >
              Reviews could not be loaded.
            </p>
            <p
              className="mx-auto mt-1.5 max-w-md text-[13px] leading-[1.55]"
              style={{ color: "var(--th-text-body)" }}
            >
              {loadError ?? "Check your connection and try again."}
            </p>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium"
              style={{
                background: "var(--th-btn-bg)",
                color: "var(--th-btn-text)",
              }}
            >
              Try again
              <ArrowIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {status === "ready" && visible.length === 0 && (
          <div
            className="mt-7 rounded-[24px] border border-dashed p-10 text-center"
            style={{ borderColor: "var(--th-bd-strong)" }}
          >
            <span
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                background: "var(--th-clr-plum-bg)",
                color: "var(--th-clr-plum)",
              }}
            >
              <QuoteIcon className="h-5 w-5" />
            </span>
            <p
              className="mt-4 text-[15px] font-semibold"
              style={{ color: "var(--th-text-heading)" }}
            >
              {selected ? `No reviews from ${selected} yet.` : "No reviews yet."}
            </p>
            <p
              className="mx-auto mt-1.5 max-w-sm text-[13.5px] leading-[1.6]"
              style={{ color: "var(--th-text-muted)" }}
            >
              {selected
                ? "Be the first one to write from this university."
                : "Yours can be the first one on the page."}
            </p>
            <a
              href="#review-form"
              className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium"
              style={{
                background: "var(--th-btn-bg)",
                color: "var(--th-btn-text)",
              }}
            >
              Write a review
              <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {status === "ready" && visible.length > 0 && (
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {visible.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onSelectUniversity={filterFromCard}
              />
            ))}
          </div>
        )}
        </section>
    </div>
  );
}
