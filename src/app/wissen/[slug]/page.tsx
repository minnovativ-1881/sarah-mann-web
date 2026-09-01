import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArtikelHeroBild } from "@/components/ArtikelBild";
import ArtikelBody from "@/components/ArtikelBody";
import {
  Inhaltsverzeichnis,
  FaqBlock,
  ArtikelTest,
  VerwandteArtikel,
  AutorinBox,
  Brotkrumen,
} from "@/components/ArtikelExtras";
import SiloSeite from "@/components/SiloSeite";
import {
  alleArtikel,
  artikelNachSlug,
  artikelImSilo,
  istSiloSlug,
  verwandteArtikel,
  ueberschriften,
  artikelUrl,
  siloUrl,
  findeBild,
  SILOS,
  SITE_URL,
  type SiloSlug,
} from "@/lib/artikel";

type Props = { params: Promise<{ slug: string }> };

/**
 * Diese Route bedient zwei Dinge: die 48 Artikel und die sechs
 * Themenseiten. Beide liegen unter /wissen/<slug>/, damit die Adressen kurz
 * bleiben. Kein Artikel heisst wie ein Silo, deshalb ist die Zuordnung
 * eindeutig.
 */
export function generateStaticParams() {
  return [
    ...(Object.keys(SILOS) as SiloSlug[]).map((slug) => ({ slug })),
    ...alleArtikel().map((a) => ({ slug: a.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (istSiloSlug(slug)) {
    const silo = SILOS[slug];
    const url = `${SITE_URL}${siloUrl(slug)}`;
    const bild = findeBild("silos", slug);
    return {
      title: `${silo.name}: ${artikelImSilo(slug).length} Artikel | Sarah Mann`,
      description: silo.beschreibung,
      alternates: { canonical: url },
      openGraph: {
        title: silo.name,
        description: silo.beschreibung,
        url,
        type: "website",
        locale: "de_DE",
        images: bild
          ? [{ url: `${SITE_URL}${bild}` }]
          : [{ url: `${SITE_URL}/bilder/og-standard.jpg`, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: silo.name,
        description: silo.beschreibung,
      },
    };
  }

  const a = artikelNachSlug(slug);
  if (!a) return {};
  const url = `${SITE_URL}${artikelUrl(a.slug)}`;
  return {
    title: a.seoTitel ?? `${a.titel} | Sarah Mann`,
    description: a.beschreibung,
    alternates: { canonical: url },
    openGraph: {
      title: a.seoTitel ?? a.titel,
      description: a.beschreibung,
      url,
      type: "article",
      locale: "de_DE",
      publishedTime: a.datum,
      modifiedTime: a.aktualisiert ?? a.datum,
      authors: ["Sarah Mann"],
      // Ein eigener openGraph-Block ersetzt den aus dem Layout vollstaendig.
      // Ohne Rueckfall haetten alle Artikel ohne Foto gar kein Vorschaubild.
      images: a.bild
        ? [{ url: `${SITE_URL}${a.bild}` }]
        : [{ url: `${SITE_URL}/bilder/og-standard.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: a.seoTitel ?? a.titel,
      description: a.beschreibung,
    },
  };
}

export default async function ArtikelSeite({ params }: Props) {
  const { slug } = await params;
  if (istSiloSlug(slug)) return <SiloSeite silo={slug} />;

  const a = artikelNachSlug(slug);
  if (!a) notFound();

  const silo = SILOS[a.silo];
  const toc = ueberschriften(a.inhalt);
  const verwandt = verwandteArtikel(a, 3);
  const url = `${SITE_URL}${artikelUrl(a.slug)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: a.titel,
        description: a.beschreibung,
        datePublished: a.datum,
        dateModified: a.aktualisiert ?? a.datum,
        inLanguage: "de-DE",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: {
          "@type": "Person",
          "@id": `${SITE_URL}/#sarah`,
          name: "Sarah Mann",
          jobTitle: "Pädagogin und zertifizierte Babyschlafberaterin",
          url: `${SITE_URL}/ueber-sarah/`,
        },
        publisher: { "@type": "Person", name: "Sarah Mann", url: SITE_URL },
        ...(a.bild ? { image: `${SITE_URL}${a.bild}` } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Wissen", item: `${SITE_URL}/wissen/` },
          {
            "@type": "ListItem",
            position: 3,
            name: silo.name,
            item: `${SITE_URL}${siloUrl(a.silo)}`,
          },
          { "@type": "ListItem", position: 4, name: a.titel, item: url },
        ],
      },
      ...(a.faq?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: a.faq.map((f) => ({
                "@type": "Question",
                name: f.frage,
                acceptedAnswer: { "@type": "Answer", text: f.antwort },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Kopf */}
        <header className="pt-36 pb-12 bg-cream-dark">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <Brotkrumen
              punkte={[
                { href: "/", label: "Start" },
                { href: "/wissen/", label: "Wissen" },
                { href: siloUrl(a.silo), label: silo.name },
              ]}
            />
            {a.eyebrow && (
              <p className="text-overline text-terra mt-8 mb-5">{a.eyebrow}</p>
            )}
            <h1
              className="font-serif text-deep"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.1 }}
            >
              {a.titel}
            </h1>
            <p className="text-deep/75 leading-relaxed mt-7" style={{ fontSize: "1.2rem" }}>
              {a.beschreibung}
            </p>
            <p className="text-deep/45 text-xs tracking-wide mt-8">
              Von{" "}
              <Link href="/ueber-sarah/" className="underline underline-offset-2 hover:text-deep">
                Sarah Mann
              </Link>{" "}
              · {a.lesezeit} Minuten Lesezeit
              {a.aktualisiert ? ` · aktualisiert ${formatiere(a.aktualisiert)}` : ""}
            </p>
          </div>
        </header>

        <ArtikelHeroBild src={a.bild} alt={a.bildAlt} />

        {/* Text */}
        <div className="section-padding bg-cream">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <Inhaltsverzeichnis punkte={toc} />
            <ArtikelBody inhalt={a.inhalt} />
            {a.test && <ArtikelTest slug={a.test} />}
            <FaqBlock faq={a.faq ?? []} />
            <AutorinBox />
          </div>
        </div>
      </article>

      <VerwandteArtikel artikel={verwandt} />
      <Footer />
    </>
  );
}

function formatiere(iso: string): string {
  const [j, m, t] = iso.split("-");
  return `${t}.${m}.${j}`;
}
