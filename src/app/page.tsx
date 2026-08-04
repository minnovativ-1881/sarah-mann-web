import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImageBand from "@/components/ImageBand";
import ProblemSection from "@/components/ProblemSection";
import ConceptSection from "@/components/ConceptSection";
import QuizTeaser from "@/components/QuizTeaser";
import ExpertiseSection from "@/components/ExpertiseSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ImageBand
          src="/bilder/geborgen.webp"
          alt="Mutter umarmt ihr Kind auf dem Sofa, warmes Licht"
          position="center 32%"
          quote="Wärme ist kein Gegenteil von Führung. Sie ist ihre Voraussetzung."
        />
        <ProblemSection />
        <ConceptSection />
        <ImageBand
          src="/bilder/naehe.webp"
          alt="Mutter und Kind lachen sich an, warmes Tageslicht"
          position="center 30%"
          quote="Ein Kind, das Halt spürt, muss ihn nicht bei Peergroup und Bildschirm suchen."
        />
        <QuizTeaser />
        <ExpertiseSection />
        <ImageBand
          src="/bilder/familie.webp"
          alt="Mutter spielt mit ihren Kindern am Boden, ruhiger Familienalltag"
          position="center 42%"
          height="46vh"
        />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
