import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HighlightsStrip from "@/components/HighlightsStrip";
import ChangemakersSection from "@/components/ChangemakersSection";
import StorySection from "@/components/StorySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen" style={{ overflowX: "hidden", maxWidth: "100vw" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HighlightsStrip />
      <ChangemakersSection />
      <StorySection />
      <Footer />
    </div>
  );
};

export default Index;
