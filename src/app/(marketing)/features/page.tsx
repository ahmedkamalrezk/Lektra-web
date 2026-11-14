import type { Metadata } from "next";

import {
  Navbar,
  Footer,
  Features,
  DeploymentModels,
  CompletePlatform,
  Comparison,
  OpenSource,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "Features · Lektra",
  description:
    "Everything Lektra does: timetable scanning, voice input, reminders, themes, search and backup — all on your device, with no account.",
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        <header className="ftr-hero">
          <div className="ftr-hero-inner">
            <p className="ftr-eyebrow">Features</p>
            <h1 className="ftr-title">Everything in Lektra.</h1>
            <p className="ftr-sub">
              Every capability, one app, nothing on a server.
            </p>
          </div>
        </header>

        <Features />
        <DeploymentModels />
        <CompletePlatform />
        <Comparison />
        <OpenSource />
      </main>
      <Footer />
    </>
  );
}
