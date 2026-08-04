import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eltern-Typ-Test | Sarah Mann",
  description:
    "Der kostenlose Test: Wo stehst du zwischen Wärme und Klarheit? In zwei Minuten zu deiner persönlichen Auswertung.",
};

export default function QuizPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-cream-dark pt-44 pb-28 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-overline text-terra mb-8">Der kostenlose Test</p>
            <h1
              className="heading-display text-deep"
              style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
            >
              Welcher Eltern-Typ
              <br />
              bist <em className="text-terra italic">du?</em>
            </h1>
            <div className="divider-terra mx-auto" style={{ marginLeft: "auto", marginRight: "auto" }} />
            <p className="body-text text-deep/85 mt-8 mx-auto measure">
              Zwölf kurze Situationen aus dem echten Familienalltag. Am Ende weißt
              du, wo du zwischen Wärme und Klarheit stehst und was dein nächster
              Schritt in Richtung Balance ist.
            </p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
            {/* TODO: Interaktiver Test + KlickTipp-Optin fuer die Auswertung.
                Aktuell Platzhalter, damit der Flow von der Startseite steht. */}
            <div className="study-box text-left">
              <p className="study-source mb-3">In Arbeit</p>
              <p className="text-deep/85 leading-relaxed">
                Der interaktive Test wird gerade gebaut. Er führt durch zwölf
                Alltagssituationen und schickt dir deine persönliche Auswertung
                per E-Mail.
              </p>
            </div>
            <Link href="/" className="btn-outline btn-outline-dark mt-10 inline-flex">
              Zurück zur Startseite
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
