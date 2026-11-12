import Link from "next/link";

import { Navbar, Footer } from "@/components/landing";
import { FEEDBACK_HREF } from "@/lib/site";

export const metadata = {
  title: "Terms · Lektra",
  description: "The terms for using Lektra, in plain words.",
};

const SECTIONS = [
  {
    id: "agreement",
    title: "Agreement",
    body: [
      "By using Lektra you agree to these terms. If you do not agree, please do not use the app.",
      "Lektra is provided free of charge. There is no account, no subscription, and no paid tier.",
    ],
  },
  {
    id: "the-app",
    title: "The app",
    body: [
      "Lektra is a planner for lectures, sections, labs, quizzes and deadlines. It runs in your browser and stores its data on your device.",
      "We may improve, change, or retire features at any time. Because the app works offline, a change only reaches you the next time you open it online.",
    ],
  },
  {
    id: "your-content",
    title: "Your content",
    body: [
      "Everything you add belongs to you. Your subjects, classes, notes, files and backups are stored on your device and are not sent to us.",
      "You are responsible for keeping your own backups. Clearing browser data, losing a device, or uninstalling the app will remove the data unless you exported a backup.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: [
      "Lektra — the app, this website, its source code, design, copy, icons and screenshots — belongs to its author and is not open source.",
      "You may read the code and run an unmodified copy for your own private, noncommercial use. You may not modify it, build other works on it, redistribute it, or use it commercially, and the Lektra name and logo may not be reused for another project.",
      "Everything you add to the app stays yours. Nothing in this section claims any rights over your subjects, classes, notes or backups.",
    ],
  },
  {
    id: "ai-features",
    title: "AI features",
    body: [
      "Timetable scanning and the AI chat are optional and rely on a third-party service. Their output can be wrong — always check the entries that were read from a photo before you rely on them.",
      "When you use an AI feature, the photo or message you submit is handled under that provider's terms as well as these.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: [
      "Do not use Lektra to break the law, to attack this website or the services it relies on, or to interfere with anyone else's use of them.",
      "Do not attempt to misrepresent the app as your own official release, or redistribute modified builds as Lektra.",
    ],
  },
  {
    id: "availability",
    title: "Availability",
    body: [
      "The website and any future online features are provided on a best-effort basis. We do not promise uninterrupted availability.",
      "The installed app is designed to keep working offline, but we cannot guarantee that a particular browser will always support every feature.",
    ],
  },
  {
    id: "warranty",
    title: "Warranty disclaimer",
    body: [
      "The app is provided “as is”, without warranties of any kind, express or implied, including fitness for a particular purpose.",
      "We do not warrant that the app will be error-free, or that scanned timetables will be perfectly accurate.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      "To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of the app.",
      "This includes missed classes or deadlines caused by inaccurate data, lost backups, or a device failure. Keep a backup and check your week.",
    ],
  },
  {
    id: "termination",
    title: "Stopping use",
    body: [
      "You can stop using Lektra at any time. Remove the installed app and clear its site data to delete everything stored on your device.",
      "There is no account to close and nothing for us to delete on your behalf.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "When these terms change, the updated version will be posted on this page with a new date. Continued use after a change means you accept the new terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="legal-root">

        <section className="legal-hero">
          <div className="legal-container">
            <p className="legal-eyebrow">Terms of service</p>
            <h1 className="legal-title">
              The rules<br />
              <span className="legal-title-soft">in plain words.</span>
            </h1>
            <p className="legal-meta">
              Last updated <time dateTime="2026-11-12">November&nbsp;12, 2026</time>
              <span className="legal-meta-sep">·</span>
              <Link href={FEEDBACK_HREF} className="legal-meta-link">
                Send feedback
              </Link>
            </p>
          </div>
        </section>

        <section className="legal-body">
          <div className="legal-container">
            <div className="legal-grid">
              <aside className="legal-toc" aria-label="Table of contents">
                <p className="legal-toc-title">On this page</p>
                <ol>
                  {SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>
                        <span className="legal-toc-n">{String(i + 1).padStart(2, "0")}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </aside>

              <article className="legal-article">
                {SECTIONS.map((s, i) => (
                  <section key={s.id} id={s.id} className="legal-section">
                    <header className="legal-section-head">
                      <span className="legal-section-n">{String(i + 1).padStart(2, "0")}</span>
                      <h2 className="legal-section-title">{s.title}</h2>
                    </header>
                    {s.body.map((p, j) => (
                      <p key={j} className="legal-p">{p}</p>
                    ))}
                  </section>
                ))}

                <footer className="legal-foot">
                  <p>
                    Questions? <Link href={FEEDBACK_HREF}>Send us feedback</Link>.
                  </p>
                </footer>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
