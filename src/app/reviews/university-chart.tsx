"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  CHART_LIMIT,
  OTHER_UNIVERSITIES,
  chartSeries,
  type Review,
  type UniversityCount,
} from "@/lib/reviews";

type Props = {
  reviews: Review[];
  selected: string | null;
  /** Hovering a point or its name filters the list. */
  onHover: (university: string) => void;
  /** Click or tap — scrolls to the list on small screens. */
  onPick: (university: string) => void;
  onClear: () => void;
};

const CHART_HEIGHT = 224;
const TOP = 20; // percent — headroom for the value pill above the highest point
const BOTTOM = 92;
const GRID_STEPS = [0.25, 0.5, 0.75, 1];

type Point = UniversityCount & {
  isOther: boolean;
  x: number;
  y: number;
  percentText: string;
  label: string;
};

/**
 * Monotone cubic interpolation — passes through every point, and never dips
 * below a valley or above a peak, so the line always stays on the chart.
 */
function smoothPath(points: Point[]) {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  const count = points.length;
  const deltas: number[] = [];

  for (let index = 0; index < count - 1; index += 1) {
    const span = points[index + 1].x - points[index].x;
    deltas.push(span === 0 ? 0 : (points[index + 1].y - points[index].y) / span);
  }

  const slopes: number[] = new Array(count);
  slopes[0] = deltas[0];
  slopes[count - 1] = deltas[count - 2];

  for (let index = 1; index < count - 1; index += 1) {
    const before = deltas[index - 1];
    const after = deltas[index];

    if (before * after <= 0) {
      slopes[index] = 0;
      continue;
    }

    const average = (before + after) / 2;
    const limit = 3 * Math.min(Math.abs(before), Math.abs(after));
    slopes[index] = Math.sign(average) * Math.min(Math.abs(average), limit);
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < count - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const span = next.x - current.x;
    const low = Math.min(current.y, next.y);
    const high = Math.max(current.y, next.y);
    const clamp = (value: number) => Math.min(high, Math.max(low, value));

    const controlOneX = current.x + span / 3;
    const controlOneY = clamp(current.y + (slopes[index] * span) / 3);
    const controlTwoX = next.x - span / 3;
    const controlTwoY = clamp(next.y - (slopes[index + 1] * span) / 3);

    path += ` C ${controlOneX} ${controlOneY}, ${controlTwoX} ${controlTwoY}, ${next.x} ${next.y}`;
  }

  return path;
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UniversityChart({
  reviews,
  selected,
  onHover,
  onPick,
  onClear,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; scrollLeft: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [scrollState, setScrollState] = useState({
    left: 0,
    client: 0,
    width: 0,
  });

  const { top, rest, other } = chartSeries(reviews);
  const total = reviews.length;
  const universityCount = top.length + rest.length;
  const hasMore = rest.length > 0;

  // Top universities are alphabetical so the line rises and falls; the
  // grouped bucket always sits at the end.
  const ordered: UniversityCount[] = expanded
    ? [...top, ...rest].sort((a, b) =>
        a.university.localeCompare(b.university),
      )
    : [
        ...[...top].sort((a, b) =>
          a.university.localeCompare(b.university),
        ),
        ...(other ? [other] : []),
      ];

  const maxShare = Math.max(...ordered.map((row) => row.share), 0);

  const points: Point[] = ordered.map((row, index) => {
    const isOther = row.university === OTHER_UNIVERSITIES;
    const percent = row.share * 100;

    return {
      ...row,
      isOther,
      x: ordered.length === 1 ? 50 : ((index + 0.5) / ordered.length) * 100,
      y:
        BOTTOM -
        (maxShare > 0 ? row.share / maxShare : 0) * (BOTTOM - TOP),
      percentText:
        percent > 0 && percent < 1 ? "<1%" : `${Math.round(percent)}%`,
      label: isOther
        ? OTHER_UNIVERSITIES
        : row.university.replace(/\s*\([^)]*\)\s*$/, ""),
    };
  });

  const linePath = smoothPath(points);
  const areaPath =
    points.length > 1
      ? `${linePath} L ${points[points.length - 1].x},${BOTTOM} L ${points[0].x},${BOTTOM} Z`
      : null;
  const activePoint = points.find((point) => point.university === selected);

  const measure = useCallback(() => {
    const element = scrollerRef.current;
    if (!element) return;
    setScrollState({
      left: element.scrollLeft,
      client: element.clientWidth,
      width: element.scrollWidth,
    });
  }, []);

  useEffect(() => {
    measure();

    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!scroller) return;

    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    if (content) observer.observe(content);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, points.length]);

  const maxScroll = Math.max(0, scrollState.width - scrollState.client);
  const scrollable = maxScroll > 4;
  const thumbWidth = scrollState.width
    ? Math.min(100, Math.max(16, (scrollState.client / scrollState.width) * 100))
    : 100;
  const thumbLeft =
    maxScroll > 0
      ? (scrollState.left / maxScroll) * (100 - thumbWidth)
      : 0;
  const canScrollLeft = scrollState.left > 2;
  const canScrollRight = scrollState.left < maxScroll - 2;

  const step = (direction: -1 | 1) => {
    const element = scrollerRef.current;
    if (!element) return;
    element.scrollBy({
      left: direction * element.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const jumpTo = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = scrollerRef.current;
    if (!element) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    element.scrollTo({
      left: ratio * element.scrollWidth - element.clientWidth / 2,
      behavior: "smooth",
    });
  };

  const startDrag = (event: ReactPointerEvent<HTMLSpanElement>) => {
    const element = scrollerRef.current;
    if (!element) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, scrollLeft: element.scrollLeft };
    setDragging(true);
  };

  const drag = (event: ReactPointerEvent<HTMLSpanElement>) => {
    const start = dragRef.current;
    const element = scrollerRef.current;
    const track = trackRef.current;
    if (!start || !element || !track) return;

    const travel = track.getBoundingClientRect().width * (1 - thumbWidth / 100);
    if (travel <= 0) return;

    const delta = ((event.clientX - start.x) / travel) * maxScroll;
    element.scrollLeft = start.scrollLeft + delta;
  };

  const endDrag = (event: ReactPointerEvent<HTMLSpanElement>) => {
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onRailKeyDown = (event: ReactKeyboardEvent<HTMLSpanElement>) => {
    const element = scrollerRef.current;
    if (!element) return;

    const amount = element.clientWidth * 0.6;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      element.scrollBy({ left: -amount, behavior: "smooth" });
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      element.scrollBy({ left: amount, behavior: "smooth" });
    } else if (event.key === "Home") {
      event.preventDefault();
      element.scrollTo({ left: 0, behavior: "smooth" });
    } else if (event.key === "End") {
      event.preventDefault();
      element.scrollTo({ left: element.scrollWidth, behavior: "smooth" });
    }
  };

  const toggleExpanded = () => {
    setExpanded((value) => !value);
    onClear();
  };

  return (
    <section
      aria-labelledby="university-chart-heading"
      className="relative overflow-hidden rounded-[30px] border p-6 sm:p-8"
      style={{
        background: "var(--th-card-bg)",
        borderColor: "var(--th-card-bd)",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full blur-[70px]"
        style={{ background: "rgba(0,0,0,0.05)" }}
      />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2
              id="university-chart-heading"
              className="text-[17px] font-semibold tracking-[-0.01em]"
              style={{ color: "var(--th-text-heading)" }}
            >
              Where reviews come from
            </h2>
            <p
              className="mt-1 text-[13px] leading-[1.55]"
              style={{ color: "var(--th-text-muted)" }}
            >
              Share of all reviews, by university.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[12px] font-semibold tabular-nums"
              style={{
                background: "var(--th-sf-04)",
                color: "var(--th-text-secondary)",
              }}
            >
              {total} {total === 1 ? "review" : "reviews"}
            </span>
            <span
              className="rounded-full px-3 py-1 text-[12px] font-semibold tabular-nums"
              style={{
                background: "var(--th-text-heading)",
                color: "var(--th-bg-page)",
              }}
            >
              {universityCount}{" "}
              {universityCount === 1 ? "university" : "universities"}
            </span>
          </div>
        </div>

        {points.length > 0 ? (
          <>
            <div className="relative mt-7">
              <div
                ref={scrollerRef}
                id="university-chart-scroller"
                onScroll={measure}
                className="no-scrollbar -mx-1 overflow-x-auto px-1"
              >
                <div
                  ref={contentRef}
                  role="group"
                  aria-label="Share of reviews by university"
                  className="relative flex"
                  style={{ width: `max(100%, ${points.length * 76}px)` }}
                >
                  <svg
                    className="pointer-events-none absolute inset-x-0 top-0 w-full overflow-visible"
                    height={CHART_HEIGHT}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="chart-area"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--th-text-heading)"
                          stopOpacity="0.14"
                        />
                        <stop
                          offset="70%"
                          stopColor="var(--th-text-heading)"
                          stopOpacity="0.04"
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--th-text-heading)"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <linearGradient
                        id="chart-line"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--th-text-heading)"
                        />
                        <stop
                          offset="100%"
                          stopColor="rgba(0,0,0,0.45)"
                        />
                      </linearGradient>
                    </defs>

                    {GRID_STEPS.map((fraction) => {
                      const y = BOTTOM - fraction * (BOTTOM - TOP);
                      return (
                        <line
                          key={fraction}
                          x1="0"
                          y1={y}
                          x2="100"
                          y2={y}
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="2 7"
                          opacity={fraction === 1 ? 0 : 0.11}
                          style={{ color: "var(--th-text-heading)" }}
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    })}

                    <line
                      x1="0"
                      y1={BOTTOM}
                      x2="100"
                      y2={BOTTOM}
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.14"
                      style={{ color: "var(--th-text-heading)" }}
                      vectorEffect="non-scaling-stroke"
                    />

                    {areaPath && (
                      <path
                        d={areaPath}
                        fill="url(#chart-area)"
                        className="chart-area-in"
                      />
                    )}

                    {activePoint && (
                      <line
                        x1={activePoint.x}
                        y1={TOP - 2}
                        x2={activePoint.x}
                        y2={BOTTOM}
                        stroke="var(--th-text-heading)"
                        strokeWidth="1"
                        strokeDasharray="3 6"
                        opacity="0.4"
                        vectorEffect="non-scaling-stroke"
                      />
                    )}

                    {points.length > 1 && (
                      <path
                        d={linePath}
                        fill="none"
                        pathLength={1}
                        stroke="url(#chart-line)"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        className="chart-line-draw"
                      />
                    )}
                  </svg>

                  {points.map((point) => {
                    const active = point.university === selected;
                    const dimmed = Boolean(selected) && !active;
                    const nameText = point.isOther
                      ? `${rest.length} other universities`
                      : point.university;
                    const countText = `${point.count} ${
                      point.count === 1 ? "review" : "reviews"
                    }`;

                    return (
                      <button
                        key={point.university}
                        type="button"
                        aria-pressed={active}
                        aria-label={`${nameText}: ${countText}, ${point.percentText}`}
                        title={`${nameText} — ${countText} (${point.percentText})`}
                        onMouseEnter={() => onHover(point.university)}
                        onClick={() => onPick(point.university)}
                        className="group flex flex-1 cursor-pointer flex-col items-center rounded-xl px-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--th-text-heading)]"
                      >
                        <span
                          className="relative w-full"
                          style={{ height: CHART_HEIGHT }}
                        >
                          <span
                            className="absolute left-1/2 whitespace-nowrap rounded-full border px-1.5 py-[3px] text-[11px] font-semibold tabular-nums"
                            style={{
                              top: `${point.y}%`,
                              transform:
                                "translate(-50%, calc(-100% - 13px))",
                              background: active
                                ? "var(--th-card-bg)"
                                : "transparent",
                              borderColor: active
                                ? "rgba(0,0,0,0.14)"
                                : "transparent",
                              color: active
                                ? "var(--th-text-heading)"
                                : "var(--th-text-muted)",
                              opacity: dimmed ? 0.5 : 1,
                              boxShadow: active
                                ? "0 6px 16px rgba(0,0,0,0.07)"
                                : "none",
                            }}
                          >
                            {point.percentText}
                          </span>

                          <span
                            className="absolute left-1/2 flex h-6 w-6 items-center justify-center"
                            style={{
                              top: `${point.y}%`,
                              transform: "translate(-50%, -50%)",
                              opacity: dimmed ? 0.45 : 1,
                            }}
                          >
                            <span
                              className="block rounded-full border-2 transition-transform duration-200 group-hover:scale-125"
                              style={{
                                width: active ? 14 : 9,
                                height: active ? 14 : 9,
                                background: active
                                  ? "var(--th-text-heading)"
                                  : "var(--th-card-bg)",
                                borderColor: active
                                  ? "var(--th-text-heading)"
                                  : "rgba(0,0,0,0.35)",
                                boxShadow: active
                                  ? "0 0 0 5px rgba(0,0,0,0.07), 0 6px 14px rgba(0,0,0,0.28)"
                                  : "none",
                              }}
                            />
                          </span>
                        </span>

                        <span
                          className="line-clamp-2 min-h-[2.7em] w-full px-0.5 text-center text-[10.5px] font-medium leading-[1.35] transition-colors"
                          style={{
                            color: active
                              ? "var(--th-text-heading)"
                              : "var(--th-text-secondary)",
                            opacity: dimmed ? 0.5 : 1,
                          }}
                        >
                          {point.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {canScrollLeft && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-10"
                  style={{
                    background:
                      "linear-gradient(to right, var(--th-card-bg), transparent)",
                  }}
                />
              )}
              {canScrollRight && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-10"
                  style={{
                    background:
                      "linear-gradient(to left, var(--th-card-bg), transparent)",
                  }}
                />
              )}
            </div>

            {scrollable && (
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={!canScrollLeft}
                  aria-label="Scroll chart left"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-opacity disabled:opacity-30"
                  style={{
                    borderColor: "var(--th-card-bd)",
                    color: "var(--th-text-secondary)",
                    background: "var(--th-card-bg)",
                  }}
                >
                  <Chevron direction="left" />
                </button>

                <div
                  ref={trackRef}
                  onPointerDown={jumpTo}
                  role="presentation"
                  className="relative h-5 flex-1 cursor-pointer touch-none"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full"
                    style={{ background: "var(--th-sf-05)" }}
                  />
                  <span
                    onPointerDown={startDrag}
                    onPointerMove={drag}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    onKeyDown={onRailKeyDown}
                    role="scrollbar"
                    aria-controls="university-chart-scroller"
                    aria-orientation="horizontal"
                    aria-label="Scroll chart universities"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={
                      maxScroll > 0
                        ? Math.round((scrollState.left / maxScroll) * 100)
                        : 0
                    }
                    tabIndex={0}
                    className={`absolute top-1/2 h-1.5 -translate-y-1/2 cursor-grab touch-none rounded-full active:cursor-grabbing ${
                      dragging ? "opacity-95" : "opacity-60 hover:opacity-100"
                    }`}
                    style={{
                      width: `${thumbWidth}%`,
                      left: `${thumbLeft}%`,
                      background: "var(--th-text-heading)",
                      transition: dragging ? "none" : "opacity 150ms ease",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -inset-y-2"
                    />
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={!canScrollRight}
                  aria-label="Scroll chart right"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-opacity disabled:opacity-30"
                  style={{
                    borderColor: "var(--th-card-bd)",
                    color: "var(--th-text-secondary)",
                    background: "var(--th-card-bg)",
                  }}
                >
                  <Chevron direction="right" />
                </button>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p
                className="text-[12px] leading-[1.5]"
                style={{ color: "var(--th-text-hint)" }}
              >
                Hover or tap a university to see only its reviews.
              </p>

              <div className="flex items-center gap-2">
                {hasMore && (
                  <button
                    type="button"
                    onClick={toggleExpanded}
                    className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors hover:bg-[var(--th-sf-03)]"
                    style={{
                      borderColor: "var(--th-card-bd)",
                      color: "var(--th-text-secondary)",
                    }}
                  >
                    {expanded
                      ? `Show top ${CHART_LIMIT}`
                      : `Show all ${universityCount} universities`}
                  </button>
                )}
                {selected && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="rounded-full border border-transparent px-3.5 py-1.5 text-[12px] font-medium transition-opacity hover:opacity-85"
                    style={{
                      background: "var(--th-text-heading)",
                      color: "var(--th-bg-page)",
                    }}
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <p
            className="mt-6 rounded-2xl px-4 py-5 text-center text-[13px] leading-[1.6]"
            style={{
              background: "var(--th-sf-02)",
              color: "var(--th-text-muted)",
            }}
          >
            No reviews yet. The first one will draw the first point.
          </p>
        )}
      </div>
    </section>
  );
}
