import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestEngine from "@/components/TestEngine";
import { KachelBild, SiloBand } from "@/components/ArtikelBild";
import { Brotkrumen } from "@/components/ArtikelExtras";
import {
  SILOS,
  artikelImSilo,
  artikelUrl,
  findeBild,
  siloUrl,
  SITE_URL,
  type SiloSlug,
} from "@/lib/artikel";
import { testNachSlug } from "@/lib/tests";

/**
 * Bildausschnitt der Silo-Bänder.
 *
 * Standard ist "center 48%". Bei zwei Fotos steht die Person so weit oben im
 * Bild, dass der Standardwert den Kopf anschneidet.
 */
export const BILDPOSITION: Record<string, string> = {
  gefuehle: "center 32%",
  uebergaenge: "center 8%",
};

/**
 * Welcher Test passt zu diesem Silo?
 *
 * Wird aus den Artikeln selbst abgeleitet: der Test, der in diesem Silo am
 * häufigsten zugeordnet ist. So bleibt die Zuordnung automatisch richtig,
 * wenn Artikel dazukommen.
 */
function testFuerSilo(silo: SiloSlug): string | undefined {
  const zaehler = new Map<string, number>();
  for (const a of artikelImSilo(silo)) {
    if (a.test) zaehler.set(a.test, (zaehler.get(a.test) ?? 0) + 1);
  }
  let bester: string | undefined;
  let max = 0;
  for (const [slug, n] of zaehler) {
    if (n > max) {
      max = n;
      bester = slug;
    }
  }
  return bester;
}

export function siloJsonLd(key: SiloSlug) {
  const silo = SILOS[key];
  const liste = artikelImSilo(key);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: silo.name,
    description: silo.beschreibung,
    url: `${SITE_URL}${siloUrl(key)}`,
    inLanguage: "de-DE",
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: liste.length,
      itemListElement: liste.map((a, i) => ({
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
        {
          "@type": "ListItem",
          position: 3,
          name: silo.name,
          item: `${SITE_URL}${siloUrl(key)}`,
        },
      ],
    },
  };
}

export default function SiloSeite({ silo: key }: { silo: SiloSlug }) {
  const silo = SILOS[key];
  const liste = artikelImSilo(key);
  const andere = (Object.keys(SILOS) as SiloSlug[]).filter((s) => s !== key);
  const test = testNachSlug(testFuerSilo(key) ?? "");

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siloJsonLd(key)) }}
      />

      <header className="pt-36 pb-14 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Brotkrumen
            punkte={[
              { href: "/", label: "Start" },
              { href: "/wissen/", label: "Wissen" },
              { label: silo.name },
            ]}
          />
          <h1
            className="font-serif text-deep mt-8"
            style={{ fontSize: "clamp(2.3rem, 5.5vw, 4.2rem)", lineHeight: 1.06 }}
          >
            {silo.name}
          </h1>
          <p
            className="text-deep/75 leading-relaxed mt-8 max-w-2xl"
            style={{ fontSize: "1.2rem" }}
          >
            {silo.beschreibung}
          </p>
          <p className="text-overline text-terra/70 mt-8">{liste.length} Artikel</p>
        </div>
      </header>

      <SiloBand
        src={findeBild("silos", key)}
        titel={silo.name}
        position={BILDPOSITION[key] ?? "center 48%"}
      />

      <section className="pb-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liste.map((a) => (
              <Link key={a.slug} href={artikelUrl(a.slug)} className="kachel group flex flex-col">
                <KachelBild src={a.bild} alt={a.bildAlt} />
                <div className="px-4 pt-6 pb-4 flex flex-col flex-1">
                  <h2 className="font-serif text-deep text-xl lg:text-2xl leading-snug mb-3 group-hover:text-terra transition-colors">
                    {a.titel}
                  </h2>
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

      {/* Der passende Test, direkt hier startbar */}
      {test && (
        <section className="section-padding bg-cream-dark">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <p className="text-overline text-terra mb-6">{test.eyebrow}</p>
            <h2
              className="font-serif text-deep"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", lineHeight: 1.1 }}
            >
              {test.titel}
            </h2>
            <div className="divider-terra" />
            <p className="text-deep/75 leading-relaxed mt-7 mb-10">{test.intro}</p>
            <TestEngine test={test} />
          </div>
        </section>
      )}

      {/* Weiter zu den anderen Themen */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-overline text-terra mb-8">Die anderen Themen</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {andere.map((s) => (
              <Link key={s} href={siloUrl(s)} className="kachel group flex flex-col">
                <div className="px-4 pt-6 pb-5">
                  <h2 className="font-serif text-deep text-xl leading-snug mb-3 group-hover:text-terra transition-colors">
                    {SILOS[s].name}
                  </h2>
                  <p className="text-deep/65 text-sm leading-relaxed">
                    {SILOS[s].beschreibung}
                  </p>
                  <p className="text-overline text-terra/70 mt-5">
                    {artikelImSilo(s).length} Artikel
                  </p>
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
