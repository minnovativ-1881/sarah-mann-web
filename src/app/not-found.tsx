import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Seite nicht gefunden | Sarah Mann",
  description: "Diese Seite gibt es nicht mehr. Hier geht es weiter.",
  robots: { index: false, follow: true },
};

// trailingSlash: true — deshalb hier überall mit Schrägstrich am Ende.
const WEGE = [
  {
    href: "/wissen/",
    titel: "Wissen",
    text: "Alle Artikel, nach Themen sortiert: Grundlagen, Grenzen, Gefühle, Schlaf.",
  },
  {
    href: "/tests/",
    titel: "Tests",
    text: "In wenigen Minuten sehen, wo ihr gerade steht, und was daraus folgt.",
  },
  {
    href: "/balanced-parenting/",
    titel: "Das Konzept",
    text: "Warum Wärme und klare Führung keine Gegensätze sind.",
  },
  {
    href: "/ueber-sarah/",
    titel: "Über Sarah",
    text: "Pädagogin, Babyschlafberaterin, Mutter von sieben Kindern.",
  },
];

export default function NichtGefunden() {
  return (
    <>
      <Navbar />

      <header className="pt-36 pb-16 bg-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-overline text-terra mb-6">Fehler 404</p>
          <h1
            className="font-serif text-deep"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.08 }}
          >
            Diese Seite gibt es nicht.
            <br />
            <em className="text-terra italic">Aber vieles andere schon.</em>
          </h1>
          <div
            className="mx-auto mt-8"
            style={{ width: "3rem", height: "1px", backgroundColor: "#136B73" }}
          />
          <p
            className="text-deep/80 leading-relaxed mt-8 mx-auto"
            style={{ fontSize: "1.15rem", maxWidth: "36rem" }}
          >
            Vielleicht ist der Link veraltet, vielleicht hat sich ein Buchstabe
            verirrt. Such dir aus, wo du weitermachen möchtest.
          </p>

          <Link
            href="/"
            className="inline-block mt-10 px-8 py-4 bg-terra text-cream text-overline transition-colors hover:bg-terra-light"
          >
            Zur Startseite
          </Link>
        </div>
      </header>

      <section className="section-padding bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="text-overline text-terra mb-8">Wo du weiterlesen kannst</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {WEGE.map((weg) => (
              <Link key={weg.href} href={weg.href} className="kachel group p-7">
                <p className="font-serif text-deep text-xl group-hover:text-terra transition-colors mb-2">
                  {weg.titel}
                </p>
                <p className="text-deep/65 text-sm leading-relaxed">{weg.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
