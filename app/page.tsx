import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IndustryGrid from "@/components/IndustryGrid";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <IndustryGrid />
        <FAQ />
      </main>
    </>
  );
}
