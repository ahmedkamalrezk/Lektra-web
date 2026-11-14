/**
 * Screens — the app itself, seven times. The phone stays pinned while the
 * copy scrolls past it; each line of copy swaps the screen behind the glass.
 */
"use client";

import { useEffect, useRef, useState } from "react";

// Imported rather than linked from `public/`, so every regeneration gets a
// content-hashed URL: a stale copy can never survive in a browser cache.
import backupRestoreShot from "../../../public/backup-restore.webp";
import calendarShot from "../../../public/calendar.webp";
import scanShot from "../../../public/scan.webp";
import searchShot from "../../../public/search-results.webp";
import settingsShot from "../../../public/settings-menu.webp";
import themesShot from "../../../public/theme-gallery.webp";
import voiceShot from "../../../public/voice.webp";

type Screen = {
  img: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  line: string;
};

const SCREENS: Screen[] = [
  {
    img: calendarShot.src,
    width: calendarShot.width,
    height: calendarShot.height,
    alt: "Lektra's November calendar, with every class, quiz and deadline on its day",
    title: "The whole month",
    line: "Every class, quiz and deadline in one grid.",
  },
  {
    img: scanShot.src,
    width: scanShot.width,
    height: scanShot.height,
    alt: "A photographed timetable being read into Lektra's week",
    title: "Scan your timetable",
    line: "Photograph the sheet. The week fills itself.",
  },
  {
    img: voiceShot.src,
    width: voiceShot.width,
    height: voiceShot.height,
    alt: "A plan being added to Lektra by voice",
    title: "Say it instead",
    line: "Speak a plan on the way to class.",
  },
  {
    img: searchShot.src,
    width: searchShot.width,
    height: searchShot.height,
    alt: "Search results in Lektra across subjects",
    title: "Find anything",
    line: "One field, every class and deadline.",
  },
  {
    img: themesShot.src,
    width: themesShot.width,
    height: themesShot.height,
    alt: "Lektra's theme gallery, light and dark presets side by side",
    title: "Forty themes",
    line: "Light, dark, or one you build.",
  },
  {
    img: settingsShot.src,
    width: settingsShot.width,
    height: settingsShot.height,
    alt: "Lektra settings for install, reminders and voice",
    title: "The small stuff",
    line: "Reminders, install, voice — one place.",
  },
  {
    img: backupRestoreShot.src,
    width: backupRestoreShot.width,
    height: backupRestoreShot.height,
    alt: "Lektra's backup and restore sheet over the calendar",
    title: "Move it with a file",
    line: "Export, restore, done. No account.",
  },
];

export function Screens() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const list = stepsRef.current;
    if (!list) return;
    const steps = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"));
    if (!steps.length) return;

    const visual = list.parentElement?.querySelector<HTMLElement>(".scr-visual");
    let frame = 0;

    // The screen follows whichever caption is closest to the reading line, not
    // whichever block happens to have crossed it: that way the phone never
    // shows a screen whose words have already scrolled away.
    const sync = () => {
      frame = 0;
      const vh = window.innerHeight;
      const narrow = window.matchMedia("(max-width: 899px)").matches;
      const bandBottom =
        narrow && visual ? Math.min(visual.getBoundingClientRect().bottom, vh) : 0;
      const target = narrow ? bandBottom + (vh - bandBottom) * 0.5 : vh * 0.45;

      let next = 0;
      let closest = Infinity;
      for (let i = 0; i < steps.length; i += 1) {
        const box = steps[i].getBoundingClientRect();
        const distance = Math.abs(box.top + box.height / 2 - target);
        if (distance < closest) {
          closest = distance;
          next = i;
        }
      }
      setActive((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="scr-section" aria-labelledby="scr-title">
      <div className="scr-container">
        <header className="scr-head">
          <p className="scr-eyebrow">The app</p>
          <h2 id="scr-title" className="scr-title">
            This is what you open.
          </h2>
        </header>

        <div className="scr-layout">
          <div className="scr-visual">
            <div className="scr-frame">
              {SCREENS.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.img}
                  src={s.img}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className={`scr-shot${i === active ? " is-active" : ""}`}
                />
              ))}
            </div>
          </div>

          <ol className="scr-steps" ref={stepsRef}>
            {SCREENS.map((s, i) => (
              <li
                key={s.img}
                data-step={i}
                className={`scr-step${i === active ? " is-active" : ""}`}
              >
                <span className="scr-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="scr-name">{s.title}</h3>
                <p className="scr-line">{s.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
