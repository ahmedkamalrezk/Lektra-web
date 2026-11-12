import { DarkSection } from "./dark-section";

/**
 * Complete platform — dark section, alternating with the light Features
 * section above. Six capability groups with big numbered anchors and an
 * abstract category mark composed of exactly six elements (matching the
 * six items in that group).
 */

type Item = { name: string; desc: string };
type Group = { n: string; heading: string; mark: React.ReactNode; items: Item[] };

/* ─── Category marks — each contains exactly 6 elements ─────────
 * Refined line-art for the dark surface. Generous viewBox margins,
 * consistent visual weight across all six categories. Color comes
 * from the .cp-group-mark class — a soft lavender, not raw white.
 */
const MARKS = {
  /* Plan — 6 dots on a smooth ascending bezier (the week ahead) */
  plan: (
    <>
      <path d="M14 82 Q34 76 50 56 T86 18" opacity="0.7" />
      <circle cx="14" cy="82" r="2.1" />
      <circle cx="28" cy="76" r="2.1" />
      <circle cx="42" cy="66" r="2.1" />
      <circle cx="56" cy="52" r="2.1" />
      <circle cx="70" cy="35" r="2.1" />
      <circle cx="86" cy="18" r="2.6" fill="currentColor" />
    </>
  ),
  /* Capture — 6 vertical bars on a baseline with caps (a schedule) */
  capture: (
    <>
      <path d="M12 82 L88 82" opacity="0.55" />
      <path d="M20 82 L20 52" strokeLinecap="round" />
      <path d="M32 82 L32 38" strokeLinecap="round" />
      <path d="M44 82 L44 60" strokeLinecap="round" />
      <path d="M56 82 L56 28" strokeLinecap="round" />
      <path d="M68 82 L68 46" strokeLinecap="round" />
      <path d="M80 82 L80 22" strokeLinecap="round" />
    </>
  ),
  /* Organize — hub + 5 nodes arranged on a pentagon (subjects) */
  organize: (
    <>
      <path d="M50 50 L50 18" opacity="0.55" />
      <path d="M50 50 L80 32" opacity="0.55" />
      <path d="M50 50 L72 80" opacity="0.55" />
      <path d="M50 50 L28 80" opacity="0.55" />
      <path d="M50 50 L20 32" opacity="0.55" />
      <circle cx="50" cy="50" r="3.2" fill="currentColor" />
      <circle cx="50" cy="18" r="2.4" />
      <circle cx="80" cy="32" r="2.4" />
      <circle cx="72" cy="80" r="2.4" />
      <circle cx="28" cy="80" r="2.4" />
      <circle cx="20" cy="32" r="2.4" />
    </>
  ),
  /* Remember — 6 stacked layers with subtle isometric step (days) */
  remember: (
    <>
      <rect x="22" y="14" width="56" height="8" rx="1.5" />
      <rect x="18" y="26" width="64" height="8" rx="1.5" />
      <rect x="14" y="38" width="72" height="8" rx="1.5" />
      <rect x="14" y="50" width="72" height="8" rx="1.5" />
      <rect x="14" y="62" width="72" height="8" rx="1.5" />
      <rect x="14" y="74" width="72" height="8" rx="1.5" />
    </>
  ),
  /* Make it yours — 6 list rows with toggle handles (appearance) */
  yours: (
    <>
      <path d="M14 18 L62 18" opacity="0.7" />
      <circle cx="80" cy="18" r="2.6" fill="currentColor" />
      <path d="M14 32 L62 32" opacity="0.7" />
      <circle cx="80" cy="32" r="2.6" />
      <path d="M14 46 L62 46" opacity="0.7" />
      <circle cx="80" cy="46" r="2.6" fill="currentColor" />
      <path d="M14 60 L62 60" opacity="0.7" />
      <circle cx="80" cy="60" r="2.6" />
      <path d="M14 74 L62 74" opacity="0.7" />
      <circle cx="80" cy="74" r="2.6" fill="currentColor" />
      <path d="M14 88 L62 88" opacity="0.7" />
      <circle cx="80" cy="88" r="2.6" />
    </>
  ),
  /* Own — hexagon (6 sides) with inner check (private by design) */
  own: (
    <>
      <path d="M50 12 L82 30 L82 70 L50 88 L18 70 L18 30 Z" />
      <circle cx="50" cy="12" r="1.8" fill="currentColor" />
      <circle cx="82" cy="30" r="1.8" fill="currentColor" />
      <circle cx="82" cy="70" r="1.8" fill="currentColor" />
      <circle cx="50" cy="88" r="1.8" fill="currentColor" />
      <circle cx="18" cy="70" r="1.8" fill="currentColor" />
      <circle cx="18" cy="30" r="1.8" fill="currentColor" />
      <path d="M40 50 L48 58 L62 42" opacity="0.55" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

const GROUPS: Group[] = [
  {
    n: "01",
    heading: "Plan",
    mark: MARKS.plan,
    items: [
      { name: "Today view", desc: "The day in order, with what's next." },
      { name: "Week & month", desc: "Move between the month grid and a single day." },
      { name: "Quick add", desc: "One line in the composer adds an entry." },
      { name: "Plan today", desc: "Let Lektra lay out the day when you don't know where to start." },
      { name: "Search", desc: "Find a class, a room or a deadline in seconds." },
      { name: "Subject filters", desc: "Show one course, or the whole term." },
    ],
  },
  {
    n: "02",
    heading: "Capture",
    mark: MARKS.capture,
    items: [
      { name: "Timetable scan", desc: "Photograph your schedule; the entries are read for you." },
      { name: "Voice input", desc: "Speak a plan and it's added, hands free." },
      { name: "Sections & labs", desc: "Not just lectures — every kind of class." },
      { name: "Quizzes & deadlines", desc: "One-date entries with a time and a note." },
      { name: "Files", desc: "Keep the hand-out attached to its subject." },
      { name: "Review before save", desc: "See what was understood before anything lands." },
    ],
  },
  {
    n: "03",
    heading: "Organize",
    mark: MARKS.organize,
    items: [
      { name: "Subjects", desc: "Every course in its own place." },
      { name: "Class kinds", desc: "Lecture, section, lab, quiz, midterm, final." },
      { name: "Rooms", desc: "Building and hall on every weekly class." },
      { name: "Weekly times", desc: "A repeating schedule, set once." },
      { name: "Notes", desc: "The detail you'll want later, on the entry." },
      { name: "Colours", desc: "Each subject gets its own colour." },
    ],
  },
  {
    n: "04",
    heading: "Remember",
    mark: MARKS.remember,
    items: [
      { name: "Reminders", desc: "Choose when Lektra nudges you." },
      { name: "Per-kind timing", desc: "Separate lead times for classes, quizzes, deadlines and exams." },
      { name: "Next up", desc: "The rest of the day, without opening every entry." },
      { name: "Day view", desc: "Tomorrow and the day after, one step away." },
      { name: "Today button", desc: "Back to now from anywhere in the app." },
      { name: "Deadline detail", desc: "Date, time and note on one line." },
    ],
  },
  {
    n: "05",
    heading: "Make it yours",
    mark: MARKS.yours,
    items: [
      { name: "Dozens of themes", desc: "Light, dark, and a gallery in between." },
      { name: "Accent colours", desc: "Blue, green, violet, pink and more." },
      { name: "Day colour styles", desc: "Fill, corner, stripe, dot or badge." },
      { name: "Month styles", desc: "Cards, frosted, soft, tint or minimal." },
      { name: "Weekday labels", desc: "Chips, plain, or hidden." },
      { name: "Sizes", desc: "Small, medium or large text and controls." },
    ],
  },
  {
    n: "06",
    heading: "Own",
    mark: MARKS.own,
    items: [
      { name: "Offline-first", desc: "No connection needed, ever." },
      { name: "On-device storage", desc: "Your timetable stays in your browser." },
      { name: "No account", desc: "Nothing to sign up for, nothing to verify." },
      { name: "Installable", desc: "Home screen, full-screen, one tap." },
      { name: "Backup & restore", desc: "Export a file; restore it on a new device." },
      { name: "No feed, no ads", desc: "Nothing competing for your attention." },
    ],
  },
];

export function CompletePlatform() {
  return (
    <section className="cp-outer">
      <DarkSection>
        <div className="cp-container">
          <header className="cp-head">
            <p className="cp-eyebrow">The full picture</p>
            <h2 className="cp-title">
              Your whole semester,<br />in one app.
            </h2>
            <p className="cp-sub">
              No integrations, no add-ons, no accounts. One app that already knows the week.
            </p>
          </header>

          <div className="cp-stack">
            {GROUPS.map((g) => (
              <section key={g.n} className="cp-group">
                <div className="cp-group-rail">
                  <span className="cp-group-n">{g.n}</span>
                  <h3 className="cp-group-heading">{g.heading}</h3>

                  <svg
                    className="cp-group-mark"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {g.mark}
                  </svg>

                  <span className="cp-group-count">
                    <span className="cp-group-count-n">{g.items.length}</span>
                    <span className="cp-group-count-label">capabilities</span>
                  </span>
                </div>
                <div className="cp-grid">
                  {g.items.map((it) => (
                    <article key={it.name} className="cp-item">
                      <h4 className="cp-item-name">{it.name}</h4>
                      <p className="cp-item-desc">{it.desc}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </DarkSection>
    </section>
  );
}
