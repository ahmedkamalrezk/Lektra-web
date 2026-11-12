/**
 * Private by design — editorial magazine spread. Big headline left, a
 * local-first design moment + meta data right. No card grid, no install
 * terminal.
 */
import Link from "next/link";

import { APP_URL, FEEDBACK_HREF } from "@/lib/site";

export function OpenSource() {
  return (
    <section className="os-section">
      <div className="os-container">
        <div className="os-grid">
          {/* Left — editorial */}
          <div className="os-lead">
            <p className="os-eyebrow">Private by design</p>
            <h2 className="os-headline">
              Your semester,<br />yours to&nbsp;keep.
            </h2>
            <p className="os-body">
              Lektra has no account and no server of its own. Your subjects,
              classes and deadlines live in your browser&rsquo;s storage, on the
              device in your hand — and leave only when you export a backup.
            </p>
            <div className="os-cta-row">
              <a
                className="os-btn os-btn--primary"
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
              >
                Open Lektra
              </a>
              <Link className="os-btn os-btn--ghost" href={FEEDBACK_HREF}>
                Send feedback
              </Link>
            </div>
          </div>

          {/* Right — local-first design moment + meta */}
          <aside className="os-side">
            <div className="os-license">
              <span className="os-license-eyebrow">Your plan</span>
              <span className="os-license-name">Local-first</span>
              <p className="os-license-note">
                A local database in the browser. No sync service in between,
                no copy on someone else&rsquo;s disk.
              </p>
            </div>

            <dl className="os-meta">
              <div className="os-meta-row">
                <dt>Data lives</dt>
                <dd>On your device, in the app&rsquo;s local database.</dd>
              </div>
              <div className="os-meta-row">
                <dt>Accounts</dt>
                <dd>None. There is nothing to sign in to.</dd>
              </div>
              <div className="os-meta-row">
                <dt>Offline</dt>
                <dd>Full function without a connection, once installed.</dd>
              </div>
              <div className="os-meta-row">
                <dt>Backup</dt>
                <dd>Export a file from Settings; restore it on any device.</dd>
              </div>
              <div className="os-meta-row">
                <dt>Ads</dt>
                <dd>No feed, no ads, no attention tax.</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
