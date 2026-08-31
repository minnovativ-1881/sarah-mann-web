import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErgebnisAusUrl from "@/components/ErgebnisAusUrl";
import { SITE_URL } from "@/lib/artikel";
import { TESTS, testUrl } from "@/lib/tests";

export const metadata: Metadata = {
  title: "Fast geschafft: bestätige deinen Eintrag | Sarah Mann",
  description:
    "Dein Ergebnis liegt bereit. Bestätige noch kurz die E-Mail, dann geht es los.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/danke-bestaetige-deinen-eintrag/` },
};

export default function BestaetigenSeite() {
  return (
    <>
      <Navbar />

      <header className="pt-36 pb-14 bg-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="text-overline text-terra mb-6">Noch ein Schritt</p>
          <h1
            className="font-serif text-deep"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.08 }}
          >
            Schau bitte kurz
            <br />
            <em className="text-terra italic">in dein Postfach.</em>
          </h1>
          <p className="text-deep/75 leading-relaxed mt-8" style={{ fontSize: "1.2rem" }}>
            Ich habe dir gerade eine E-Mail geschickt. Ein Klick auf den Link
            darin, und du bist dabei. Das ist gesetzlich vorgeschrieben und
            dauert zehn Sekunden.
          </p>
        </div>
      </header>

      {/* Was zu tun ist */}
      <section className="section-padding bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <ol className="space-y-7">
            {[
              {
                titel: "E-Mail öffnen",
                text: "Absenderin ist Sarah Mann. Betreff: Bitte bestätige deine E-Mail-Adresse.",
              },
              {
                titel: "Auf den Link klicken",
                text: "Damit bestätigst du, dass die Adresse wirklich dir gehört.",
              },
              {
                titel: "Fertig",
                text: "Ab dann bekommst du Sarahs Impulse. Die erste Mail kommt am nächsten Morgen.",
              },
            ].map((s, i) => (
              <li key={i} className="flex gap-6">
                <span
                  className="font-serif text-stone flex-shrink-0"
                  style={{ fontSize: "2rem", lineHeight: 1 }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-serif text-deep text-xl mb-1">{s.titel}</p>
                  <p className="text-deep/70 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="border-l-2 border-terra pl-6 mt-12">
            <p className="text-deep/75 leading-relaxed">
              <strong className="font-medium text-deep">Nichts angekommen?</strong>{" "}
              Gib der Mail zwei Minuten. Danach lohnt ein Blick in den
              Spam-Ordner und bei Gmail in den Reiter Werbung. Wenn sie dort
              liegt, zieh sie einmal in den Posteingang, dann kommen die
              nächsten richtig an.
            </p>
          </div>
        </div>
      </section>

      {/* Das Ergebnis, falls die URL es mitbringt */}
      <section className="section-padding bg-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <Suspense fallback={null}>
            <ErgebnisAusUrl eyebrow="Deine Auswertung" />
          </Suspense>
        </div>
      </section>

      {/* Weiterlesen, damit die Seite kein Ende ist */}
      <section className="section-padding bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="text-overline text-terra mb-8">Solange du wartest</p>
          <h2
            className="font-serif text-deep mb-8"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Es gibt noch {TESTS.length - 1} weitere Tests.
          </h2>
          <div className="grid sm:grid-cols-2 gap-px bg-cream-mid">
            {TESTS.slice(0, 4).map((t) => (
              <Link
                key={t.slug}
                href={testUrl(t.slug)}
                className="bg-cream p-6 group hover:bg-cream-dark transition-colors"
              >
                <p className="text-overline text-terra/70 mb-2">{t.dauer}</p>
                <p className="font-serif text-deep text-lg group-hover:text-terra transition-colors">
                  {t.titel}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-10">
            <Link href="/wissen/" className="btn-outline btn-outline-dark">
              Zu den Artikeln
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
