"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "How it works" — the rest of the app, walked through. Numbered steps
 * scroll past a sticky preview card that swaps to the matching screen.
 * Numbered steps scroll past a sticky phone preview that swaps screens.
 */

type Step = {
  label: string;
  title: string;
  desc: string;
  img: string;
  alt: string;
  caption: string;
};

const STEPS: Step[] = [
  {
    label: "Themes",
    title: "Make it yours.",
    desc: "Light, dark or system — then an accent colour and one of forty themes, from Matcha and Lavender to Dracula and Obsidian. Or build a theme of your own.",
    img: "/theme-gallery.webp",
    alt: "The theme gallery in Lektra showing light and dark presets",
    caption: "Forty presets, light and dark, plus your own.",
  },
  {
    label: "Search",
    title: "Find it in a second.",
    desc: "One field searches every class, quiz and deadline. Filter down to events or classes, then jump straight to the day it belongs to.",
    img: "/search-results.webp",
    alt: "Lektra search showing quiz results across subjects",
    caption: "Every event and class, from one field.",
  },
  {
    label: "Settings",
    title: "One place for the small stuff.",
    desc: "Install it to the home screen, choose how early reminders arrive, set the voice language, and decide what the month cells show.",
    img: "/settings-menu.webp",
    alt: "Lektra settings with install, appearance, reminders and backup",
    caption: "Install, reminders, voice.",
  },
  {
    label: "Backup",
    title: "Pack it up and go.",
    desc: "Export a small schedule file and restore it on a new phone. Lecture files stay on the device, and nothing leaves it unless you say so.",
    img: "/backup-restore.webp",
    alt: "Lektra backup and restore sheet over the November calendar",
    caption: "A small file, saved wherever you like.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = stepsRef.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLLIElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const node = stepsRef.current[index];
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  };

  return (
    <section className="hiw-section" aria-labelledby="hiw-title">
      <div className="hiw-container">
        <header className="hiw-head">
          <p className="hiw-eyebrow">Everything else</p>
          <h2 id="hiw-title" className="hiw-title">
            Today, without
            <br />
            <span>the noise.</span>
          </h2>
          <p className="hiw-sub">
            A timetable is only the start. Theme the app, search the whole
            semester, set reminders and keep a backup — no account, nothing to
            configure.
          </p>
        </header>

        <div className="hiw-walkthrough">
          <ol className="hiw-flow">
            {STEPS.map((step, index) => (
              <li
                key={step.label}
                className="hiw-step"
                data-active={index === active}
                ref={(node) => {
                  stepsRef.current[index] = node;
                }}
              >
                <div className="hiw-step-copy">
                  <p className="hiw-step-label">
                    <span className="hiw-step-n">0{index + 1}</span>
                    {step.label}
                  </p>
                  <h3 className="hiw-step-title">{step.title}</h3>
                  <p className="hiw-step-desc">{step.desc}</p>
                </div>
                <figure className="hiw-inline-preview">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.img}
                    alt={step.alt}
                    loading="lazy"
                    decoding="async"
                    width="1170"
                    height="2532"
                  />
                  <figcaption>{step.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ol>

          <aside className="hiw-preview" aria-label="Feature preview">
            <div className="hiw-preview-screen">
              {STEPS.map((step, index) => (
                <div
                  key={step.img}
                  className="hiw-slide"
                  data-active={index === active}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="1170"
                    height="2532"
                  />
                </div>
              ))}
            </div>
            <div className="hiw-preview-caption">
              <p className="hiw-preview-text">{STEPS[active].caption}</p>
              <div className="hiw-preview-controls">
                {STEPS.map((step, index) => (
                  <button
                    key={step.label}
                    type="button"
                    aria-label={`Show ${step.label}`}
                    aria-pressed={index === active}
                    onClick={() => goTo(index)}
                  >
                    <span />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
