import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brotkrumen } from "@/components/ArtikelExtras";
import { findeBild } from "@/lib/artikel";
import { KachelBild } from "@/components/ArtikelBild";
import { TESTS, testUrl } from "@/lib/tests";
import { SITE_URL } from "@/lib/artikel";

export const metadata: Metadata = {
  title: "Kostenlose Tests für Eltern | Sarah Mann",
  description:
    "Kurze, ehrliche Selbsttests rund um Erziehung: Welcher Eltern-Typ bist du? Bedürfnis oder Wunsch? Kostenlos, mit ausführlicher Auswertung per E-Mail.",
  alternates: { canonical: `${SITE_URL}/tests/` },
};

export default function TestsSeite() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kostenlose Tests für Eltern",
    url: `${SITE_URL}/tests/`,
    inLanguage: "de-DE",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: TESTS.length,
      itemListElement: TESTS.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${testUrl(t.slug)}`,
        name: t.titel,
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Tests", item: `${SITE_URL}/tests/` },
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
          <Brotkrumen punkte={[{ href: "/", label: "Start" }, { label: "Tests" }]} />
          <h1
            className="font-serif text-deep mt-8"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Wo stehst du
            <br />
            <em className="text-terra italic">gerade wirklich?</em>
          </h1>
          <p className="text-deep/75 leading-relaxed mt-8 max-w-2xl" style={{ fontSize: "1.2rem" }}>
            Kurze Tests mit echten Alltagssituationen aus dem Familienalltag.
            Kostenlos. Am Ende bekommst du deine ausführliche Auswertung.
          </p>
        </div>
      </header>

      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6">
            {TESTS.map((t) => (
              <Link
                key={t.slug}
                href={testUrl(t.slug)}
                className="kachel group flex flex-col"
              >
                <KachelBild
                  src={findeBild("tests", t.slug)}
                  alt={t.titel}
                  hoehe="16.5rem"
                  position="center 30%"
                />
                <div className="px-5 pt-7 pb-5 lg:px-6 flex flex-col flex-1">
                  <p className="text-overline text-terra/70 mb-4">
                    {t.fragen.length} Fragen · {t.dauer}
                  </p>
                  <h2 className="font-serif text-deep text-2xl lg:text-3xl mb-4 group-hover:text-terra transition-colors">
                    {t.titel}
                  </h2>
                  <p className="text-deep/70 leading-relaxed flex-1">{t.intro}</p>
                  <span className="text-terra text-sm tracking-wide mt-7">Test starten</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
