/**
 * Hero showcase — three app screens stacked like a deck. The back cards
 * fan out on hover. The screenshots are the story, no copy needed.
 */
export function Dashboard() {
  return (
    <section className="dashboard-showcase">
      <div className="mx-auto max-w-6xl px-6">
        <div className="dashboard-stack">
          <div className="dashboard-stack__back dashboard-stack__back--left" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scan.webp"
              alt=""
              loading="lazy"
              decoding="async"
              width="1170"
              height="2532"
            />
          </div>
          <div className="dashboard-stack__back dashboard-stack__back--right" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/voice.webp"
              alt=""
              loading="lazy"
              decoding="async"
              width="1170"
              height="2532"
            />
          </div>
          <div className="dashboard-stack__center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/calendar.webp"
              alt="Lektra's November calendar with classes, quizzes and deadlines"
              loading="lazy"
              decoding="async"
              width="1170"
              height="2532"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
