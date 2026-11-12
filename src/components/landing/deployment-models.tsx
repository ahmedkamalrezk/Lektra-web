/**
 * Where it runs — three big numbered panels. Middle (install) is the
 * inverted dark panel for visual rhythm. Big "01/02/03" as type-as-design.
 */

const MODELS = [
  {
    n: "01",
    tag: "iPhone & iPad",
    title: "Home screen",
    lead:
      "Add Lektra to your Home Screen from Safari and it opens full-screen, like any other app. No App Store, no account.",
    points: [
      "Full-screen, with no browser chrome",
      "Works offline once installed",
      "Dark or light, whichever you prefer",
    ],
    price: "Free",
    priceNote: "Share → Add to Home Screen",
  },
  {
    n: "02",
    tag: "Android",
    title: "Install in one tap",
    lead:
      "Chrome offers to install Lektra the moment you open it. It sits in the app drawer and starts without a connection.",
    points: [
      "Installs from any modern browser",
      "Starts offline, instantly",
      "Updates itself quietly",
    ],
    price: "Free",
    priceNote: "No store, no sign-up",
    feature: true,
  },
  {
    n: "03",
    tag: "Desktop",
    title: "A tab, or its own window",
    lead:
      "Use it in a tab on any laptop, or install it as its own window. The same week, on a bigger canvas.",
    points: [
      "Chrome, Edge, Safari, Firefox",
      "Install as a desktop app",
      "Print the week if you like",
    ],
    price: "Free",
    priceNote: "Any modern browser",
  },
];

export function DeploymentModels() {
  return (
    <section className="dm-section">
      <div className="dm-container">
        <header className="dm-head">
          <p className="dm-eyebrow">On every device</p>
          <h2 className="dm-title">
            Phone, tablet,<br />or browser.
          </h2>
          <p className="dm-sub">
            One app, installed in seconds. The same plan everywhere you open it.
          </p>
        </header>

        <div className="dm-grid">
          {MODELS.map((m) => (
            <article
              key={m.n}
              className={`dm-panel ${m.feature ? "dm-panel--feature" : ""}`}
            >
              <div className="dm-panel-top">
                <span className="dm-panel-n">{m.n}</span>
                <span className="dm-panel-tag">{m.tag}</span>
              </div>

              <h3 className="dm-panel-title">{m.title}</h3>
              <p className="dm-panel-lead">{m.lead}</p>

              <ul className="dm-panel-points">
                {m.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>

              <div className="dm-panel-foot">
                <span className="dm-panel-price">{m.price}</span>
                <span className="dm-panel-pricenote">{m.priceNote}</span>
              </div>
            </article>
          ))}
        </div>

        {/* ── Backup callout ───────────────────────────────────────── */}
        <div className="dm-migrate">
          <div className="dm-migrate-left">
            <span className="dm-migrate-tag">Backup &amp; restore</span>
            <h3 className="dm-migrate-title">
              New phone{" "}
              <span className="dm-migrate-arrow" aria-hidden="true">⇄</span>
              {" "}same week.<br />
              <span className="dm-migrate-soft">One file, a minute.</span>
            </h3>
          </div>
          <p className="dm-migrate-body">
            Export a backup from Settings and restore it on the new device. Your plan
            is a file you own — no account, no cloud, no sync service in the middle.
            Move it by cable, message, or the folder you already trust.
          </p>
        </div>
      </div>
    </section>
  );
}
