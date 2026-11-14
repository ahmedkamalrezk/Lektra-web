import {
  Navbar,
  Hero,
  Screens,
  FinalCta,
  Footer,
} from "@/components/landing";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Screens />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
