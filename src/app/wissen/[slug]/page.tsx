import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArtikelHeroBild } from "@/components/ArtikelBild";
import ArtikelBody from "@/components/ArtikelBody";
import {
  Inhaltsverzeichnis,
  FaqBlock,
  TestHinweis,
  VerwandteArtikel,
  AutorinBox,
  Brotkrumen,
} from "@/components/ArtikelExtras";
import {
  alleArtikel,
  artikelNachSlug,
  verwandteArtikel,
  ueberschriften,
  artikelUrl,
  SILOS,
  SITE_URL,
} from "@/lib/artikel";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return alleArtikel().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
      images: a.bild ? [{ url: `${SITE_URL}${a.bild}` }] : undefined,
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
          name: "Sarah Mann",
          jobTitle: "Pädagogin und zertifizierte Babyschlafberaterin",
          url: `${SITE_URL}/#ueber-sarah`,
        },
        publisher: { "@type": "Person", name: "Sarah Mann", url: SITE_URL },
        ...(a.bild ? { image: `${SITE_URL}${a.bild}` } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Wissen", item: `${SITE_URL}/wissen/` },
          { "@type": "ListItem", position: 3, name: a.titel, item: url },
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
                { label: silo.name },
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
              Von Sarah Mann · {a.lesezeit} Minuten Lesezeit
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
            {a.test && <TestHinweis slug={a.test} />}
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
