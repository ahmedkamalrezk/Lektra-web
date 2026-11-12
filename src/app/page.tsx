import {
  Navbar,
  Hero,
  Dashboard,
  Features,
  DeploymentModels,
  CompletePlatform,
  HowItWorks,
  Comparison,
  OpenSource,
  FinalCta,
  Footer,
} from "@/components/landing";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Dashboard />
        <Features />
        <DeploymentModels />
        <CompletePlatform />
        <HowItWorks />
        <Comparison />
        <OpenSource />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
