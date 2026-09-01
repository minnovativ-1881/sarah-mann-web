import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImageBand from "@/components/ImageBand";
import StimmenSection from "@/components/StimmenSection";
import ProblemSection from "@/components/ProblemSection";
import ConceptSection from "@/components/ConceptSection";
import MethodeSection from "@/components/MethodeSection";
import QuizTeaser from "@/components/QuizTeaser";
import ExpertiseSection from "@/components/ExpertiseSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import KontaktSection from "@/components/KontaktSection";
import Footer from "@/components/Footer";
import {
  SchnellZugriff,
  ThemenWegweiser,
  TestWegweiser,
  NeueArtikel,
} from "@/components/Wegweiser";
import { alleArtikel } from "@/lib/artikel";

/**
 * Person und WebSite als strukturierte Daten.
 *
 * Ohne das weiß Google nicht, dass hinter der Domain ein Mensch mit einer
 * Qualifikation steht. Bei einer Personenmarke ist das der wichtigste
 * Baustein für die Einordnung als Autorin.
 */
const startJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.sarahmann.de/#sarah",
      name: "Sarah Mann",
      jobTitle: "Pädagogin und zertifizierte Babyschlafberaterin",
      description:
        "Sarah Mann ist Pädagogin, Babyschlafberaterin und Mutter von sieben Kindern. Sie verbindet Wärme und Klarheit zu einer alltagstauglichen Haltung.",
      url: "https://www.sarahmann.de/",
      image: "https://www.sarahmann.de/bilder/og-sarah.jpg",
      knowsAbout: [
        "Autoritativer Erziehungsstil",
        "Grenzen setzen",
        "Ko-Regulation",
        "Selbstregulation bei Kindern",
        "Kinderschlaf",
        "Elterliche Erschöpfung",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.sarahmann.de/#website",
      url: "https://www.sarahmann.de/",
      name: "Sarah Mann",
      inLanguage: "de-DE",
      publisher: { "@id": "https://www.sarahmann.de/#sarah" },
    },
  ],
};

export default function Home() {
  const neueste = alleArtikel().slice(0, 3);

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(startJsonLd) }}
      />
      <main>
        <Hero />
        <SchnellZugriff />
        <ImageBand
          src="/bilder/geborgen.webp"
          alt="Mutter umarmt ihr Kind auf dem Sofa, warmes Licht"
          position="center 32%"
          quote="Wärme ist kein Gegenteil von Führung. Sie ist ihre Voraussetzung."
        />
        <StimmenSection />
        <ProblemSection />
        <ConceptSection />
        <ImageBand
          src="/bilder/vater-kind.webp"
          alt="Vater mit seinen beiden Kindern auf dem Boden, ruhiger Blickkontakt"
          position="center 38%"
          quote="Ein Kind, das Halt spürt, muss ihn nicht bei Peergroup und Bildschirm suchen."
        />
        <MethodeSection />
        <QuizTeaser />
        <TestWegweiser ausser="eltern-test" hintergrund="bg-cream-dark" mitBild={false} />
        {/* Text zwischen den Kachelbloecken, sonst wird die Startseite ein Raster */}
        <ExpertiseSection />
        <ThemenWegweiser
          eyebrow="Der Wissensbereich"
          ueberschrift="Wo es im Alltag knirscht"
          einleitung="Zu jedem Thema gibt es eine eigene Seite mit allen Artikeln und dem Test, der am besten dazu passt."
          hintergrund="bg-cream-dark"
        />
        <NeueArtikel artikel={neueste} hintergrund="bg-cream" />
        <ImageBand
          src="/bilder/schlaf.webp"
          alt="Mutter am Bett ihres schlafenden Kindes im warmen Nachtlicht"
          position="center 62%"
          height="72vh"
          quote="Dein Kind braucht keine perfekte Mutter. Es braucht eine, die bei sich bleibt."
        />
        <AboutSection />
        <CTASection />
        <KontaktSection />
      </main>
      <Footer />
    </>
  );
}
