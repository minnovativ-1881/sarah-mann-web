import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErgebnisAusUrl from "@/components/ErgebnisAusUrl";
import { alleArtikel, artikelUrl, SITE_URL } from "@/lib/artikel";
import { TESTS, testUrl } from "@/lib/tests";

export const metadata: Metadata = {
  title: "Willkommen, du bist dabei | Sarah Mann",
  description: "Deine Anmeldung ist bestätigt. Hier geht es weiter.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/erfolgreich-angemeldet/` },
};

export default function AngemeldetSeite() {
  // Ein kleiner Einstieg ins Wissen, statt die Seite als Sackgasse zu bauen.
  const empfehlungen = ["autoritativer-erziehungsstil", "grenzen-setzen-kleinkind", "elterliche-erschoepfung"]
    .map((slug) => alleArtikel().find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <Navbar />

      <header className="pt-36 pb-14 bg-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="text-overline text-terra mb-6">Bestätigt</p>
          <h1
            className="font-serif text-deep"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.08 }}
          >
            Du bist dabei.
            <br />
            <em className="text-terra italic">Schön, dass du da bist.</em>
          </h1>
          <p className="text-deep/75 leading-relaxed mt-8" style={{ fontSize: "1.2rem" }}>
            Deine Adresse ist bestätigt. Ab morgen früh bekommst du meine
            Impulse: kurze Gedanken zu dem, was zwischen Erklären und Schimpfen
            liegt. Wenn dir etwas nicht gefällt, meld dich einfach ab, ein Klick
            genügt.
          </p>
        </div>
      </header>

      {/* Ergebnis, falls die URL es mitbringt */}
      <section className="section-padding bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <Suspense fallback={null}>
            <ErgebnisAusUrl eyebrow="Dein Ergebnis, noch einmal in Ruhe" />
          </Suspense>
        </div>
      </section>

      {/* Weiter */}
      <section className="section-padding bg-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="text-overline text-terra mb-8">Womit die meisten anfangen</p>
          <div className="grid gap-px bg-cream-mid">
            {empfehlungen.map((a) => (
              <Link
                key={a.slug}
                href={artikelUrl(a.slug)}
                className="bg-cream p-7 group hover:bg-cream-dark transition-colors"
              >
                <p className="font-serif text-deep text-xl group-hover:text-terra transition-colors mb-2">
                  {a.titel}
                </p>
                <p className="text-deep/65 text-sm leading-relaxed">{a.beschreibung}</p>
              </Link>
            ))}
          </div>

          <p className="text-overline text-terra mt-14 mb-6">Oder noch ein Test</p>
          <div className="flex flex-wrap gap-3">
            {TESTS.map((t) => (
              <Link
                key={t.slug}
                href={testUrl(t.slug)}
                className="border border-cream-mid bg-cream px-5 py-3 text-deep/75 text-sm hover:border-terra hover:text-deep transition-colors"
              >
                {t.titel}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
