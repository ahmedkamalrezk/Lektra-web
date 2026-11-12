import { Navbar, Footer } from "@/components/landing";

const GITHUB_ISSUES = "https://github.com/ahmedkamalrezk/Lektra/issues";

export const metadata = {
  title: "Privacy · Lektra",
  description: "How Lektra handles your data — mostly by leaving it on your device.",
};

const SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "Lektra is a study planner that runs in your browser. There is no account, no sign-up, and no Lektra server holding a copy of your timetable.",
      "This policy covers the Lektra app and this website. It describes what stays on your device, what leaves it (only when you ask), and how to remove it.",
    ],
  },
  {
    id: "on-your-device",
    title: "What stays on your device",
    body: [
      "Subjects, lectures, sections, labs, quizzes, deadlines, notes, attached files and appearance settings are stored in your browser's local database on your device.",
      "They are not sent to us. We cannot read them, recover them, or hand them to anyone else.",
      "Backups are created only when you export one, and they go wherever you choose to save the file.",
    ],
  },
  {
    id: "ai-features",
    title: "Optional AI features",
    body: [
      "Scanning a timetable photo and the in-app AI chat are optional. They use a third-party AI service (Puter.js) and only run when you choose to use them.",
      "When you scan a photo or send a chat message, that photo or message is sent to the AI service to produce a result. Nothing else from your planner is included unless you put it in the message.",
      "You can use Lektra fully without these features. If you never open them, nothing leaves your device.",
    ],
  },
  {
    id: "this-website",
    title: "This website",
    body: [
      "This is a static marketing page. It sets no advertising or analytics cookies and does not profile visitors.",
      "The hosting provider may keep standard server logs — IP address, time, and the page requested — for security and abuse prevention.",
    ],
  },
  {
    id: "your-control",
    title: "Your control",
    body: [
      "Inside the app you can delete individual entries and subjects, or clear the app's site data from your browser to remove everything.",
      "Export a backup before clearing data if you want to keep it. Because there is no account, deleting your data is entirely in your hands — there is nothing for us to delete on your behalf.",
    ],
  },
  {
    id: "third-parties",
    title: "Third parties",
    body: [
      "GitHub Pages hosts this website. Puter.js powers the optional AI scan and chat. Neither has access to your planner data beyond what you explicitly submit.",
      "There are no ad networks, marketing pixels, or session-replay tools on this site.",
    ],
  },
  {
    id: "changes",
    title: "Changes",
    body: [
      "If this policy changes in a meaningful way, the updated version will be posted on this page with a new date. There are no accounts, so there is no mailing list to notify.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="legal-root">

        <section className="legal-hero">
          <div className="legal-container">
            <p className="legal-eyebrow">Privacy</p>
            <h1 className="legal-title">
              How we<br />
              <span className="legal-title-soft">handle your data.</span>
            </h1>
            <p className="legal-meta">
              Last updated <time dateTime="2026-11-11">November&nbsp;11, 2026</time>
              <span className="legal-meta-sep">·</span>
              <a href={GITHUB_ISSUES} className="legal-meta-link" target="_blank" rel="noreferrer">
                Questions on GitHub
              </a>
            </p>
          </div>
        </section>

        <section className="legal-body">
          <div className="legal-container">
            <div className="legal-grid">
              {/* Table of contents */}
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

              {/* Article */}
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
                    Questions? Open an issue on{" "}
                    <a href={GITHUB_ISSUES} target="_blank" rel="noreferrer">GitHub</a>.
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
