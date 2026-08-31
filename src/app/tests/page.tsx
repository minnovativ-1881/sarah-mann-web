import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brotkrumen } from "@/components/ArtikelExtras";
import { TESTS, testUrl } from "@/lib/tests";
import { SITE_URL } from "@/lib/artikel";

export const metadata: Metadata = {
  title: "Kostenlose Tests für Eltern | Sarah Mann",
  description:
    "Kurze, ehrliche Selbsttests rund um Erziehung: Welcher Eltern-Typ bist du? Bedürfnis oder Wunsch? Kostenlos, mit ausführlicher Auswertung per E-Mail.",
  alternates: { canonical: `${SITE_URL}/tests/` },
};

export default function TestsSeite() {
  return (
    <>
      <Navbar />
      <header className="pt-36 pb-14 px-6 lg:px-12 bg-cream-dark">
        <div className="max-w-7xl mx-auto">
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
            Kurze Tests mit echten Alltagssituationen. Kostenlos, und du
            bekommst deine Auswertung direkt zu sehen und zusätzlich per
            E-Mail.
          </p>
        </div>
      </header>

      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-px bg-cream-mid">
            {TESTS.map((t) => (
              <Link
                key={t.slug}
                href={testUrl(t.slug)}
                className="bg-cream p-8 lg:p-11 group hover:bg-cream-dark transition-colors flex flex-col"
              >
                <p className="text-overline text-terra/70 mb-4">
                  {t.fragen.length} Fragen · {t.dauer}
                </p>
                <h2 className="font-serif text-deep text-2xl lg:text-3xl mb-4 group-hover:text-terra transition-colors">
                  {t.titel}
                </h2>
                <p className="text-deep/70 leading-relaxed flex-1">{t.intro}</p>
                <span className="text-terra text-sm tracking-wide mt-7">Test starten</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
