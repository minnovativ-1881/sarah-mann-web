import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brotkrumen } from "@/components/ArtikelExtras";
import {
  alleArtikel,
  artikelUrl,
  siloUrl,
  testFuerSilo,
  SILOS,
  SITE_URL,
  type SiloSlug,
} from "@/lib/artikel";
import { testNachSlug, testUrl } from "@/lib/tests";

export const metadata: Metadata = {
  title: "Über Sarah Mann: Pädagogin und Mutter von sieben Kindern",
  description:
    "Wer hinter sarahmann.de steht: Pädagogin mit Master of Education, zertifizierte Babyschlafberaterin, seit acht Jahren in der Beratung und Mutter von sieben Kindern.",
  alternates: { canonical: `${SITE_URL}/ueber-sarah/` },
  openGraph: {
    title: "Über Sarah Mann",
    description:
      "Pädagogin, Babyschlafberaterin, Mutter von sieben Kindern. Warum sie über Wärme und Klarheit schreibt.",
    url: "/ueber-sarah/",
    type: "profile",
    images: [{ url: "/bilder/og-sarah.jpg", width: 1200, height: 630, alt: "Sarah Mann" }],
  },
};

/**
 * Eigene Autorinnenseite.
 *
 * Bis hierher gab es nur einen Anker auf der Startseite. Für die Einordnung
 * als Autorin braucht Google eine eigene Seite mit Person-Schema, auf die
 * jeder Artikel verweist. Das ist bei einer Personenmarke der wichtigste
 * einzelne Baustein für Erfahrung, Fachlichkeit und Vertrauen.
 */
export default function UeberSarahSeite() {
  const artikel = alleArtikel();
  const silos = Object.keys(SILOS) as SiloSlug[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/ueber-sarah/`,
        url: `${SITE_URL}/ueber-sarah/`,
        inLanguage: "de-DE",
        name: "Über Sarah Mann",
        mainEntity: { "@id": `${SITE_URL}/#sarah` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#sarah`,
        name: "Sarah Mann",
        jobTitle: "Pädagogin und zertifizierte Babyschlafberaterin",
        description:
          "Pädagogin mit Master of Education, zertifizierte Babyschlafberaterin und Mutter von sieben Kindern. Begleitet seit acht Jahren Familien in Schlafberatung und Erziehungsfragen.",
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "Master of Education",
        },
        url: `${SITE_URL}/ueber-sarah/`,
        image: `${SITE_URL}/bilder/og-sarah.jpg`,
        knowsAbout: [
          "Autoritativer Erziehungsstil",
          "Grenzen setzen",
          "Ko-Regulation",
          "Selbstregulation bei Kindern",
          "Kinderschlaf",
          "Einschlafbegleitung",
          "Elterliche Erschöpfung",
        ],
        knowsLanguage: "de",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Über Sarah", item: `${SITE_URL}/ueber-sarah/` },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="pt-36 pb-14 bg-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <Brotkrumen punkte={[{ href: "/", label: "Start" }, { label: "Über Sarah" }]} />
          <div className="flex flex-col sm:flex-row gap-9 items-start mt-8">
            <div
              className="relative flex-shrink-0 overflow-hidden rounded-full bg-sand"
              style={{
                width: "clamp(7.5rem, 21vw, 10.5rem)",
                height: "clamp(7.5rem, 21vw, 10.5rem)",
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
            <div>
              <p className="text-overline text-terra mb-5">Über mich</p>
              <h1
                className="font-serif text-deep"
                style={{ fontSize: "clamp(2.1rem, 5vw, 3.4rem)", lineHeight: 1.1 }}
              >
                Sarah Mann
              </h1>
              <p className="text-deep/75 leading-relaxed mt-6" style={{ fontSize: "1.15rem" }}>
                Pädagogin mit Master of Education, zertifizierte
                Babyschlafberaterin und Mutter von sieben Kindern.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="section-padding bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="space-y-6 text-deep/85 leading-relaxed" style={{ fontSize: "1.08rem" }}>
            <p>
              Seit acht Jahren begleite ich Familien in der Schlafberatung und
              in Erziehungsfragen. Eigene Kinder habe ich seit sechzehn Jahren.
              In dieser Zeit habe ich sehr viele Abende gehört, die ähnlich
              klangen: Eltern, die alles richtig machen wollen, es freundlich
              erklären, geduldig bleiben, und trotzdem abends laut werden.
            </p>
            <p>
              Was diesen Eltern fehlte, war nie die Liebe. Es war das Geländer.
            </p>
            <p>
              Ich schreibe hier über den Weg dazwischen. Nicht über Strenge, und
              nicht über die Auflösung jeder Struktur. Sondern über die
              Kombination, die in der Forschung seit sechzig Jahren am besten
              abschneidet: Gleichzeitig viel Wärme und viel klare Orientierung.
            </p>
          </div>

          <h2
            className="font-serif text-deep mt-16 mb-6"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Woher ich das habe
          </h2>
          <div className="space-y-6 text-deep/85 leading-relaxed">
            <p>
              Fachlich stütze ich mich auf die Erziehungsstilforschung von{" "}
              <strong className="font-medium text-deep">Diana Baumrind</strong>,
              auf die Bindungsforschung von{" "}
              <strong className="font-medium text-deep">John Bowlby</strong> und{" "}
              <strong className="font-medium text-deep">Mary Ainsworth</strong>,
              und für den schwierigsten Teil, den Moment nach dem Nein, auf das
              Modell der Neuen Autorität von{" "}
              <strong className="font-medium text-deep">Haim Omer</strong>.
            </p>
            <p>
              Praktisch stütze ich mich auf vier Dinge. Auf ein pädagogisches
              Studium, abgeschlossen mit dem{" "}
              <strong className="font-medium text-deep">
                Master of Education
              </strong>
              . Auf sehr viele Beratungsgespräche mit Familien, in denen ich
              gesehen habe, was tatsächlich hilft und was nur gut klingt. Auf
              sieben eigene Kinder. Und auf den Blick über den eigenen
              Tellerrand: In anderen Ländern und Kulturen ist vieles
              selbstverständlich, was bei uns als Erziehungsfrage verhandelt
              wird, und umgekehrt.
            </p>
            <p>
              Das zusammen ist der Grund, warum in meinen Texten wenig steht,
              was an einem müden Dienstagabend nicht funktioniert. Was hier
              steht, musste bei uns halten und bei den Familien, mit denen ich
              arbeite.
            </p>
            <p className="font-serif italic text-terra text-xl leading-relaxed pt-2">
              Perfektion ist nicht das Ziel. Zuverlässigkeit ist das Ziel.
            </p>
          </div>

          <h2
            className="font-serif text-deep mt-16 mb-6"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Worüber ich schreibe
          </h2>
          <p className="text-deep/75 leading-relaxed mb-8">
            Jeder Bereich fängt bei einer Situation an, die vermutlich schon
            einmal bei euch am Tisch saß. Und zu jedem gehört ein kurzer Test,
            falls du wissen willst, wo ihr gerade steht.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {silos.map((key) => {
              if (!artikel.some((a) => a.silo === key)) return null;
              const test = testNachSlug(testFuerSilo(key) ?? "");
              return (
                <div key={key} className="kachel p-6 flex flex-col">
                  <Link href={siloUrl(key)} className="group">
                    <p className="font-serif text-deep text-lg group-hover:text-terra transition-colors">
                      {SILOS[key].name}
                    </p>
                    <p className="text-deep/70 text-sm leading-relaxed mt-3">
                      {SILOS[key].problem}
                    </p>
                  </Link>
                  {test && (
                    <Link
                      href={testUrl(test.slug)}
                      className="mt-5 pt-4 text-sm text-terra hover:text-midnight transition-colors"
                      style={{ borderTop: "1px solid rgba(19,107,115,0.18)" }}
                    >
                      Willst du dich testen? {test.titel}{" "}
                      <span className="text-deep/45">({test.dauer})</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <Link href="/tests/" className="btn-primary">
              Alle Tests ansehen
            </Link>
            <Link href="/wissen/" className="btn-outline btn-outline-dark">
              Alle Artikel
            </Link>
          </div>

          <h2
            className="font-serif text-deep mt-16 mb-6"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Wo du anfangen kannst
          </h2>
          <div className="grid gap-4">
            {["autoritativer-erziehungsstil", "grenzen-setzen-kleinkind", "elterliche-erschoepfung"]
              .map((slug) => artikel.find((a) => a.slug === slug))
              .filter((a): a is NonNullable<typeof a> => Boolean(a))
              .map((a) => (
                <Link
                  key={a.slug}
                  href={artikelUrl(a.slug)}
                  className="kachel group p-6"
                >
                  <p className="font-serif text-deep text-lg group-hover:text-terra transition-colors mb-1">
                    {a.titel}
                  </p>
                  <p className="text-deep/60 text-sm leading-relaxed">{a.beschreibung}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
