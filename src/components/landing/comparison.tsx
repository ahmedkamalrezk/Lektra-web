/**
 * Comparison — clean table, Lektra column visually highlighted with
 * tinted background. Each cell carries a refined status mark (win / loss
 * / neutral) so the comparison reads at a glance, without bright colors.
 */

type Status = "win" | "loss" | "neutral";
type Cell = { text: string; status: Status };
type Row = { feature: string; lektra: Cell; notes: Cell; paper: Cell };

const ROWS: Row[] = [
  {
    feature: "Built for lectures & sections",
    lektra: { text: "Every kind of class, in its place", status: "win" },
    notes:  { text: "Folders and free text",            status: "loss" },
    paper:  { text: "Rewrite it every term",            status: "loss" },
  },
  {
    feature: "Getting the timetable in",
    lektra: { text: "Photograph it and scan",           status: "win" },
    notes:  { text: "Type every line yourself",         status: "loss" },
    paper:  { text: "Copy it by hand",                  status: "neutral" },
  },
  {
    feature: "Adding a plan by voice",
    lektra: { text: "Say it and it's added",            status: "win" },
    notes:  { text: "Dictate, then tidy it up",         status: "neutral" },
    paper:  { text: "Not possible",                     status: "loss" },
  },
  {
    feature: "Reminders",
    lektra: { text: "Per class and per deadline",       status: "win" },
    notes:  { text: "Generic, easy to ignore",          status: "loss" },
    paper:  { text: "Your memory",                      status: "neutral" },
  },
  {
    feature: "Works offline",
    lektra: { text: "Always, by design",                status: "win" },
    notes:  { text: "Offline edits vary",               status: "neutral" },
    paper:  { text: "Always",                           status: "win" },
  },
  {
    feature: "Finding something",
    lektra: { text: "Search everything, instantly",     status: "win" },
    notes:  { text: "Search the notes only",            status: "neutral" },
    paper:  { text: "Flip the pages",                   status: "loss" },
  },
  {
    feature: "Setup",
    lektra: { text: "Under a minute",                   status: "win" },
    notes:  { text: "An afternoon of folders",          status: "loss" },
    paper:  { text: "A new notebook",                   status: "neutral" },
  },
  {
    feature: "Price",
    lektra: { text: "Free, no account",                 status: "win" },
    notes:  { text: "Free with an account",             status: "neutral" },
    paper:  { text: "Cheap, every term",                status: "neutral" },
  },
  {
    feature: "Your data",
    lektra: { text: "On your device, exportable",       status: "win" },
    notes:  { text: "Synced to their cloud",            status: "loss" },
    paper:  { text: "In your bag",                      status: "win" },
  },
  {
    feature: "Quizzes & midterms",
    lektra: { text: "First-class entries",              status: "win" },
    notes:  { text: "Just another note",                status: "loss" },
    paper:  { text: "Circled in red",                   status: "neutral" },
  },
];

function StatusMark({ status }: { status: Status }) {
  return (
    <span className={`cmp-mark cmp-mark--${status}`} aria-hidden="true">
      {status === "win" && (
        <svg viewBox="0 0 14 14" fill="none">
          <path d="M3 7.2 L6 10 L11 4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {status === "loss" && (
        <svg viewBox="0 0 14 14" fill="none">
          <path d="M4 4 L10 10 M10 4 L4 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {status === "neutral" && (
        <svg viewBox="0 0 14 14" fill="none">
          <path d="M3.5 7 L10.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

export function Comparison() {
  return (
    <section className="cmp-section">
      <div className="cmp-container">
        <header className="cmp-head">
          <p className="cmp-eyebrow">Compared to the alternatives</p>
          <h2 className="cmp-title">
            Different planners,<br />made honestly.
          </h2>
          <p className="cmp-sub">
            The right planner depends on how you study. Here&rsquo;s where Lektra sits
            next to the notes app and the paper timetable.
          </p>
        </header>

        <div className="cmp">
          <div className="cmp-highlight" aria-hidden="true" />

          {/* Header */}
          <div className="cmp-row cmp-row--head">
            <div className="cmp-cell cmp-cell--feature">Feature</div>
            <div className="cmp-cell cmp-cell--win">Lektra</div>
            <div className="cmp-cell">Notes app</div>
            <div className="cmp-cell">Paper planner</div>
          </div>

          {/* Body */}
          {ROWS.map((r) => (
            <div key={r.feature} className="cmp-row">
              <div className="cmp-cell cmp-cell--feature">{r.feature}</div>
              <div className="cmp-cell cmp-cell--win">
                <StatusMark status={r.lektra.status} />
                <span>{r.lektra.text}</span>
              </div>
              <div className="cmp-cell">
                <StatusMark status={r.notes.status} />
                <span>{r.notes.text}</span>
              </div>
              <div className="cmp-cell">
                <StatusMark status={r.paper.status} />
                <span>{r.paper.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
