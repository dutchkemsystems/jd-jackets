import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandSection from "@/components/BrandSection";
import IndustryGrid from "@/components/IndustryGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import CustomizationSection from "@/components/CustomizationSection";
import HowItWorks from "@/components/HowItWorks";
import WhoWeServe from "@/components/WhoWeServe";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <BrandSection />
        <IndustryGrid />
        <WhyChooseUs />
        <CustomizationSection />
        <HowItWorks />
        <WhoWeServe />
        <Gallery />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
