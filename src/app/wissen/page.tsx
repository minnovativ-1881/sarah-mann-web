import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brotkrumen } from "@/components/ArtikelExtras";
import { alleArtikel, artikelUrl, findeBild, SILOS, SITE_URL, type SiloSlug } from "@/lib/artikel";
import { KachelBild, SiloBand } from "@/components/ArtikelBild";
import { TESTS, testUrl } from "@/lib/tests";

export const metadata: Metadata = {
  title: "Wissen: Erziehung mit Wärme und Klarheit | Sarah Mann",
  description:
    "Artikel über Grenzen, Gefühle, Schlaf und die Frage, wie Führung und Nähe zusammengehen. Von Sarah Mann, Pädagogin und Mutter von sieben Kindern.",
  alternates: { canonical: `${SITE_URL}/wissen/` },
};

/**
 * Bildausschnitt der Silo-Baender.
 *
 * Standard ist "center 48%". Zwei Fotos haben die Person so weit oben im
 * Bild, dass dabei der Kopf angeschnitten wird, darum eigene Werte.
 */
const BILDPOSITION: Record<string, string> = {
  gefuehle: "center 32%",
  uebergaenge: "center 8%",
};

export default function WissenSeite() {
  const artikel = alleArtikel();
  const reihenfolge = Object.keys(SILOS) as SiloSlug[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Wissen",
    url: `${SITE_URL}/wissen/`,
    inLanguage: "de-DE",
    // ItemList statt hasPart: Google liest daraus die Reihenfolge und kann
    // die Uebersicht als Sammlung erkennen.
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: artikel.length,
      itemListElement: artikel.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${artikelUrl(a.slug)}`,
        name: a.titel,
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Wissen", item: `${SITE_URL}/wissen/` },
      ],
    },
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="pt-36 pb-14 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Brotkrumen punkte={[{ href: "/", label: "Start" }, { label: "Wissen" }]} />
          <h1
            className="font-serif text-deep mt-8"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Wärme und Klarheit,
            <br />
            <em className="text-terra italic">im echten Alltag.</em>
          </h1>
          <p className="text-deep/75 leading-relaxed mt-8 max-w-2xl" style={{ fontSize: "1.2rem" }}>
            Kein Ratgeber-Stapel und keine Tippliste. Sondern der eine Gedanke,
            durchbuchstabiert bis in die Momente, in denen es schwierig wird.
          </p>
        </div>
      </header>

      {/* Tests zuerst, weil sie der schnellste Einstieg sind */}
      {TESTS.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-overline text-terra mb-8">Die kostenlosen Tests</p>
            <div className="grid md:grid-cols-2 gap-6">
              {TESTS.map((t) => (
                <Link
                  key={t.slug}
                  href={testUrl(t.slug)}
                  className="kachel group"
                >
                  <KachelBild
                    src={findeBild("tests", t.slug)}
                    alt={t.titel}
                    hoehe="16.5rem"
                    position="center 30%"
                  />
                  <div className="px-4 pt-6 pb-4 lg:px-5">
                    <p className="text-overline text-terra/70 mb-4">{t.dauer}</p>
                    <h2 className="font-serif text-deep text-2xl lg:text-3xl mb-4 group-hover:text-terra transition-colors">
                      {t.titel}
                    </h2>
                    <p className="text-deep/70 leading-relaxed">{t.intro}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Artikel nach Silo */}
      {reihenfolge.map((key) => {
        const silo = SILOS[key];
        const liste = artikel.filter((a) => a.silo === key);
        if (!liste.length) return null;
        return (
          <section key={key} className="section-padding bg-cream-dark odd:bg-cream">
            <SiloBand
              src={findeBild("silos", key)}
              titel={silo.name}
              position={BILDPOSITION[key] ?? "center 48%"}
            />
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="max-w-2xl mb-12">
                <h2
                  className="font-serif text-deep"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
                >
                  {silo.name}
                </h2>
                <div className="divider-terra" />
                <p className="text-deep/70 leading-relaxed mt-6">{silo.beschreibung}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liste.map((a) => (
                  <Link
                    key={a.slug}
                    href={artikelUrl(a.slug)}
                    className="kachel group flex flex-col"
                  >
                    <KachelBild src={a.bild} alt={a.bildAlt} />
                    <div className="px-4 pt-6 pb-4 flex flex-col flex-1">
                      <h3 className="font-serif text-deep text-xl lg:text-2xl leading-snug mb-3 group-hover:text-terra transition-colors">
                        {a.titel}
                      </h3>
                      <p className="text-deep/65 text-sm leading-relaxed flex-1">
                        {a.beschreibung}
                      </p>
                      <p className="text-deep/40 text-xs tracking-wide mt-6">
                        {a.lesezeit} Min. Lesezeit
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {artikel.length === 0 && (
        <section className="section-padding bg-cream">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <p className="text-deep/60">Die ersten Artikel erscheinen in Kürze.</p>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
