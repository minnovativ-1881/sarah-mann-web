import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { alleArtikel, artikelUrl, SITE_URL } from "@/lib/artikel";

export const metadata: Metadata = {
  title: "Willkommen, du bist dabei | Sarah Mann",
  description: "Deine Anmeldung ist bestätigt. Hier geht es weiter.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/erfolgreich-angemeldet/` },
};

export default function AngemeldetSeite() {
  const empfehlungen = [
    "autoritativer-erziehungsstil",
    "grenzen-setzen-kleinkind",
    "elterliche-erschoepfung",
  ]
    .map((slug) => alleArtikel().find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <Navbar />

      <header className="pt-36 pb-16 bg-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          {/* Rundes Foto: hier ist der Moment, in dem ein Gesicht zählt */}
          <div
            className="relative mx-auto mb-10 overflow-hidden rounded-full bg-sand"
            style={{
              width: "clamp(8rem, 22vw, 11rem)",
              height: "clamp(8rem, 22vw, 11rem)",
              border: "1px solid rgba(19,107,115,0.3)",
            }}
          >
            <Image
              src="/bilder/sarah-portrait.webp"
              alt="Sarah Mann"
              fill
              sizes="180px"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          <p className="text-overline text-terra mb-6">Bestätigt</p>
          <h1
            className="font-serif text-deep"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.08 }}
          >
            Du bist dabei.
            <br />
            <em className="text-terra italic">Schön, dass du da bist.</em>
          </h1>
          <div
            className="mx-auto mt-8"
            style={{ width: "3rem", height: "1px", backgroundColor: "#136B73" }}
          />
          <p
            className="text-deep/80 leading-relaxed mt-8 mx-auto"
            style={{ fontSize: "1.15rem", maxWidth: "36rem" }}
          >
            Deine Auswertung ist schon unterwegs zu dir. Und sie ist deutlich
            mehr als ein Ergebnisname.
          </p>

          <div className="mx-auto mt-10 text-left" style={{ maxWidth: "32rem" }}>
            <p className="text-overline text-terra mb-6">
              Das liegt gleich in deinem Postfach
            </p>
            <ul className="grid gap-5">
              {[
                [
                  "Deine Einordnung",
                  "Wo du gerade stehst, in ganzen Sätzen und in deiner Sprache.",
                ],
                [
                  "Was bei euch schon trägt",
                  "Die Stellen, an denen du längst richtig liegst. Die sieht man selbst am schlechtesten.",
                ],
                [
                  "Deine nächsten Schritte",
                  "Konkret genug, dass du heute Abend damit anfangen kannst.",
                ],
              ].map(([titel, text]) => (
                <li key={titel} className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex-shrink-0 mt-2"
                    style={{ width: "1.25rem", height: "1px", backgroundColor: "#136B73" }}
                  />
                  <span>
                    <strong className="font-medium text-deep">{titel}.</strong>{" "}
                    <span className="text-deep/75">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p
            className="text-deep/80 leading-relaxed mt-10 mx-auto"
            style={{ fontSize: "1.15rem", maxWidth: "36rem" }}
          >
            Und dann bleiben wir in Kontakt: Ich schreibe dir immer wieder kurze
            Gedanken dazu, wie Wärme und klare Führung zusammengehen. Aus dem
            Alltag mit sieben Kindern, und so, dass du sie noch am selben Tag
            ausprobieren kannst.
          </p>
          <p
            className="text-deep/80 leading-relaxed mt-6 mx-auto"
            style={{ fontSize: "1.15rem", maxWidth: "36rem" }}
          >
            Ich freue mich sehr, dass du dabei bist.
          </p>
          <p className="signatur mt-8">Sarah</p>
        </div>
      </header>

      <section className="section-padding bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="text-overline text-terra mb-8">Womit die meisten anfangen</p>
          <div className="grid gap-4">
            {empfehlungen.map((a) => (
              <Link
                key={a.slug}
                href={artikelUrl(a.slug)}
                className="kachel group p-7"
              >
                <p className="font-serif text-deep text-xl group-hover:text-terra transition-colors mb-2">
                  {a.titel}
                </p>
                <p className="text-deep/65 text-sm leading-relaxed">{a.beschreibung}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
