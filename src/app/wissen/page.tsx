import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brotkrumen } from "@/components/ArtikelExtras";
import { ThemenWegweiser, NeueArtikel, ArtikelVerzeichnis } from "@/components/Wegweiser";
import { alleArtikel, artikelUrl, SITE_URL } from "@/lib/artikel";

export const metadata: Metadata = {
  title: "Wissen: Erziehung mit Wärme und Klarheit | Sarah Mann",
  description:
    "Artikel über Grenzen, Gefühle, Schlaf und die Frage, wie Führung und Nähe zusammengehen. Von Sarah Mann, Pädagogin und Mutter von sieben Kindern.",
  alternates: { canonical: `${SITE_URL}/wissen/` },
};

/**
 * Übersicht des Wissensbereichs.
 *
 * Vorher standen hier zuerst die Tests (die es unter /tests/ schon gibt) und
 * darunter alle 48 Artikel als Kacheln. Das waren siebzehn Bildschirme.
 * Jetzt ist die Seite ein Verteiler: sechs Themen, die neuesten Artikel, dann
 * das vollständige Verzeichnis als Textliste. Die Tests sind raus, sie haben
 * ihren eigenen Bereich und stecken zusätzlich in jedem Artikel.
 */
export default function WissenSeite() {
  const artikel = alleArtikel();

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
            {artikel.length > 0 && ` Aktuell ${artikel.length} Artikel in sechs Themen.`}
          </p>
        </div>
      </header>

      <ThemenWegweiser
        eyebrow="Die sechs Themen"
        ueberschrift="Wo möchtest du anfangen?"
        einleitung="Jedes Thema hat eine eigene Seite mit allen Artikeln dazu und dem Test, der am besten passt."
        hintergrund="bg-cream"
      />

      <NeueArtikel artikel={artikel.slice(0, 6)} hintergrund="bg-cream-dark" />

      <ArtikelVerzeichnis hintergrund="bg-cream" />

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
