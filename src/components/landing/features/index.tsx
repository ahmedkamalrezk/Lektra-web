import { DarkSection } from "../dark-section";

/* ─── Abstract corner marks — subtle, decorative, no fill ─────
 *  Each is a 1px-stroke line-art glyph that sits in the bottom-right
 *  corner of its cell at very low opacity. Not a labeled icon —
 *  a thematic accent that hints at the card's subject.
 */
const MARKS = {
  /* 01 Deploy — outward-radiating waypoints (launch) */
  deploy: (
    <>
      <circle cx="20" cy="76" r="2.5" />
      <circle cx="38" cy="58" r="2.5" />
      <circle cx="58" cy="38" r="2.5" />
      <circle cx="78" cy="18" r="2.5" />
      <path d="M22 74 L36 60" />
      <path d="M40 56 L56 40" />
      <path d="M60 36 L76 20" />
      <path d="M82 14 L88 8" strokeLinecap="round" />
      <path d="M84 8 L88 8 L88 12" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  /* 02 Backend — stacked layers */
  backend: (
    <>
      <rect x="14" y="18" width="68" height="14" rx="2" />
      <rect x="14" y="38" width="68" height="14" rx="2" />
      <rect x="14" y="58" width="68" height="14" rx="2" />
      <circle cx="22" cy="25" r="1.6" />
      <circle cx="22" cy="45" r="1.6" />
      <circle cx="22" cy="65" r="1.6" />
    </>
  ),
  /* 03 Git — branching graph */
  git: (
    <>
      <circle cx="20" cy="20" r="3.5" />
      <circle cx="20" cy="50" r="3.5" />
      <circle cx="20" cy="80" r="3.5" />
      <circle cx="64" cy="35" r="3.5" />
      <circle cx="64" cy="65" r="3.5" />
      <path d="M20 23 L20 47" />
      <path d="M20 53 L20 77" />
      <path d="M23 22 Q44 22 64 32" />
      <path d="M23 78 Q44 78 64 68" />
    </>
  ),
  /* 04 Safety — counter-clockwise arc with returning arrow */
  safety: (
    <>
      <path d="M84 44 A40 40 0 1 0 44 84" />
      <path d="M44 84 L44 70" strokeLinecap="round" />
      <path d="M44 84 L58 84" strokeLinecap="round" />
    </>
  ),
  /* 05 Stacks — irregular grid of squares */
  stacks: (
    <>
      <rect x="14" y="14" width="20" height="20" rx="2" />
      <rect x="40" y="14" width="20" height="20" rx="2" />
      <rect x="66" y="14" width="20" height="20" rx="2" />
      <rect x="14" y="40" width="20" height="20" rx="2" />
      <rect x="40" y="40" width="20" height="20" rx="2" />
      <rect x="14" y="66" width="20" height="20" rx="2" />
      <rect x="40" y="66" width="20" height="20" rx="2" />
      <rect x="66" y="66" width="20" height="20" rx="2" />
    </>
  ),
  /* 06 Routing — concentric arcs (signal propagation) */
  routing: (
    <>
      <circle cx="50" cy="50" r="3.5" />
      <path d="M50 30 A20 20 0 0 1 70 50" />
      <path d="M50 14 A36 36 0 0 1 86 50" />
      <path d="M50 50 L80 28" strokeLinecap="round" />
      <circle cx="80" cy="28" r="2.5" />
    </>
  ),
};

const FEATURES = [
  {
    n: "01",
    tag: "Plan",
    title: "Today, at a glance",
    description: "Open the app and see what's next: today's classes in order, with the quizzes and deadlines that need attention.",
    mark: MARKS.deploy,
  },
  {
    n: "02",
    tag: "Capture",
    title: "Scan your timetable",
    description: "Photograph the sheet they handed out in week one. Lektra reads it and turns it into your week — no retyping.",
    mark: MARKS.backend,
  },
  {
    n: "03",
    tag: "Voice",
    title: "Say it, don't type it",
    description: "Add a lecture, a section or a deadline by speaking. It lands on the right day, under the right subject.",
    mark: MARKS.git,
  },
  {
    n: "04",
    tag: "Subjects",
    title: "Every course in place",
    description: "Lectures, sections, labs and hand-outs live under one subject — the whole term, easy to find again.",
    mark: MARKS.safety,
  },
  {
    n: "05",
    tag: "Remember",
    title: "Deadlines that surface",
    description: "Quizzes, midterms and hand-ins show up before they matter, with reminders timed the way you like.",
    mark: MARKS.stacks,
  },
  {
    n: "06",
    tag: "Offline",
    title: "Works without a signal",
    description: "Everything is stored on your device. Basements, trains, exam halls — Lektra keeps opening and keeps your week.",
    mark: MARKS.routing,
  },
];

export function Features() {
  return (
    <section id="features" className="feat-outer">
      <DarkSection>
        <div className="feat-container">
          <header className="feat-head">
            <p className="feat-eyebrow">The app</p>
            <h2 className="feat-title">
              Everything between your timetable and your day
            </h2>
            <p className="feat-sub">
              Lektra keeps the term in order — the classes, the quizzes, the small
              deadlines — so your attention can stay on the work itself.
            </p>
          </header>

          <div className="feat-grid">
            {FEATURES.map((f) => (
              <article key={f.n} className="feat-cell">
                <div className="feat-cell-top">
                  <div className="feat-cell-ident">
                    <span className="feat-cell-n">{f.n}</span>
                    <span className="feat-cell-tag">{f.tag}</span>
                  </div>

                  {/* Decorative top-right mark — present, never a label */}
                  <svg
                    className="feat-cell-mark"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    aria-hidden="true"
                  >
                    {f.mark}
                  </svg>
                </div>

                <h3 className="feat-cell-title">{f.title}</h3>
                <p className="feat-cell-desc">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </DarkSection>
    </section>
  );
}
