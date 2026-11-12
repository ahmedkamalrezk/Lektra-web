import { DarkSection } from "./dark-section";

const APP_URL = "https://ahmedkamalrezk.github.io/Lektra/";

export function FinalCta() {
  return (
    <section className="fcta-outer">
      <DarkSection>
        <div className="fcta-container">
          <h2 className="fcta-title">
            Ready for the term?
          </h2>
          <p className="fcta-sub">
            Open Lektra, add it to your home screen,<br />
            and let the week sort itself out.
          </p>
          <div className="fcta-row">
            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              className="fcta-btn fcta-btn--primary"
            >
              Open Lektra
            </a>
            <a href="/download" className="fcta-btn fcta-btn--ghost">
              Install guide
            </a>
          </div>
          <ul className="fcta-trust">
            <li>Free</li>
            <li>Works offline</li>
            <li>No account</li>
            <li>iPhone, Android &amp; desktop</li>
          </ul>
        </div>
      </DarkSection>
    </section>
  );
}
