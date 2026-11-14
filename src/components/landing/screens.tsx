/**
 * Screens — the app itself, seven times. Each screenshot sits in a phone frame
 * with a one-line caption underneath; no paragraph is longer than a sentence.
 */
import { asset } from "@/lib/site";

type Screen = {
  img: string;
  alt: string;
  title: string;
  line: string;
};

const SCREENS: Screen[] = [
  {
    img: asset("/calendar.webp"),
    alt: "Lektra's November calendar, with every class, quiz and deadline on its day",
    title: "The whole month",
    line: "Every class, quiz and deadline in one grid.",
  },
  {
    img: asset("/scan.webp"),
    alt: "A photographed timetable being read into Lektra's week",
    title: "Scan your timetable",
    line: "Photograph the sheet. The week fills itself.",
  },
  {
    img: asset("/voice.webp"),
    alt: "A plan being added to Lektra by voice",
    title: "Say it instead",
    line: "Speak a plan on the way to class.",
  },
  {
    img: asset("/search-results.webp"),
    alt: "Search results in Lektra across subjects",
    title: "Find anything",
    line: "One field, every class and deadline.",
  },
  {
    img: asset("/theme-gallery.webp"),
    alt: "Lektra's theme gallery, light and dark presets side by side",
    title: "Forty themes",
    line: "Light, dark, or one you build.",
  },
  {
    img: asset("/settings-menu.webp"),
    alt: "Lektra settings for install, reminders and voice",
    title: "The small stuff",
    line: "Reminders, install, voice — one place.",
  },
  {
    img: asset("/backup-restore.webp"),
    alt: "Lektra's backup and restore sheet over the calendar",
    title: "Move it with a file",
    line: "Export, restore, done. No account.",
  },
];

export function Screens() {
  return (
    <section className="scr-section" aria-labelledby="scr-title">
      <div className="scr-container">
        <header className="scr-head">
          <p className="scr-eyebrow">The app</p>
          <h2 id="scr-title" className="scr-title">
            This is what you open.
          </h2>
        </header>

        <ul className="scr-grid">
          {SCREENS.map((s) => (
            <li key={s.img} className="scr-item">
              <figure className="scr-figure">
                <div className="scr-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt={s.alt}
                    width={1170}
                    height={2532}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className="scr-caption">
                  <h3 className="scr-name">{s.title}</h3>
                  <p className="scr-line">{s.line}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
