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
          src="/bilder/vater-kind.webp"
          alt="Vater mit seinen beiden Kindern auf dem Boden, ruhiger Blickkontakt"
          position="center 38%"
          quote="Ein Kind, das Halt spürt, muss ihn nicht bei Peergroup und Bildschirm suchen."
        />
        <QuizTeaser />
        <ExpertiseSection />
        <ImageBand
          src="/bilder/schlaf.webp"
          alt="Mutter am Bett ihres schlafenden Kindes im warmen Nachtlicht"
          position="center 45%"
          quote="Schlaf ist die erste Führungsaufgabe."
        />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
