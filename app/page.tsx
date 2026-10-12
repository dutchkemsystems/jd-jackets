import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IndustryGrid from "@/components/IndustryGrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <IndustryGrid />
      </main>
    </>
  );
}
