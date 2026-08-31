import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestEngine from "@/components/TestEngine";
import { Brotkrumen, FaqBlock } from "@/components/ArtikelExtras";
import { TESTS, testNachSlug, testUrl } from "@/lib/tests";
import { artikelNachSlug, artikelUrl, SITE_URL } from "@/lib/artikel";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TESTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = testNachSlug(slug);
  if (!t) return {};
  const url = `${SITE_URL}${testUrl(t.slug)}`;
  return {
    title: t.seoTitel ?? `${t.titel} | Sarah Mann`,
    description: t.beschreibung,
    alternates: { canonical: url },
    openGraph: {
      title: t.seoTitel ?? t.titel,
      description: t.beschreibung,
      url,
      type: "website",
      locale: "de_DE",
    },
  };
}

export default async function TestSeite({ params }: Props) {
  const { slug } = await params;
  const t = testNachSlug(slug);
  if (!t) notFound();

  const artikel = t.artikel ? artikelNachSlug(t.artikel) : undefined;
  const url = `${SITE_URL}${testUrl(t.slug)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t.titel,
        description: t.beschreibung,
        url,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        inLanguage: "de-DE",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        author: { "@type": "Person", name: "Sarah Mann", url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Tests", item: `${SITE_URL}/tests/` },
          { "@type": "ListItem", position: 3, name: t.titel, item: url },
        ],
      },
      ...(t.faq?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: t.faq.map((f) => ({
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

      <header className="pt-36 pb-12 px-6 lg:px-12 bg-cream-dark">
        <div className="max-w-3xl mx-auto">
          <Brotkrumen
            punkte={[
              { href: "/", label: "Start" },
              { href: "/tests/", label: "Tests" },
              { label: t.titel },
            ]}
          />
          <p className="text-overline text-terra mt-8 mb-5">{t.eyebrow}</p>
          <h1
            className="font-serif text-deep"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.1 }}
          >
            {t.titel}
          </h1>
          <p className="text-deep/75 leading-relaxed mt-7" style={{ fontSize: "1.2rem" }}>
            {t.intro}
          </p>
          <p className="text-deep/45 text-xs tracking-wide mt-7">
            {t.fragen.length} Fragen · {t.dauer} · kostenlos, ohne Anmeldung
          </p>
        </div>
      </header>

      <section className="section-padding bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <TestEngine test={t} />
          {artikel && (
            <div className="mt-14 pt-10 border-t border-cream-mid">
              <p className="text-overline text-terra mb-4">Der Artikel dazu</p>
              <Link href={artikelUrl(artikel.slug)} className="group block">
                <h2 className="font-serif text-deep text-2xl lg:text-3xl group-hover:text-terra transition-colors">
                  {artikel.titel}
                </h2>
                <p className="text-deep/70 leading-relaxed mt-3">{artikel.beschreibung}</p>
              </Link>
            </div>
          )}
          <FaqBlock faq={t.faq ?? []} />
        </div>
      </section>
      <Footer />
    </>
  );
}
