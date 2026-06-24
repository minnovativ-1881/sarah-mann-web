import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Was ist Balanced Parenting? | Sarah Mann",
  description:
    "Balanced Parenting ist der wissenschaftlich fundierte Mittelweg zwischen Erschöpfung und Entfremdung. Sarah Mann erklärt das Konzept — und warum es die Erziehungsdiskussion verändert.",
};

const principles = [
  {
    title: "Wärme ohne Bedingungen",
    content:
      "Die Liebe der Bezugsperson ist nicht an Verhalten geknüpft. Das Kind weiß: Ich werde geliebt — unabhängig davon, ob ich gerade 'brav' bin oder nicht. Das ist das Fundament, auf dem alles andere aufbaut.",
  },
  {
    title: "Klarheit ohne Kälte",
    content:
      "Grenzen werden gesetzt — konsequent, ruhig, ohne Drama. Ein Nein ist ein Nein. Nicht weil das Kind bestraft werden soll, sondern weil das Kind ein Geländer braucht, bevor es selbst navigieren kann.",
  },
  {
    title: "Vorhersehbarkeit als Sicherheit",
    content:
      "Das kindliche Gehirn braucht Orientierung. Wenn das Kind weiß, was als Nächstes kommt, sinkt die kognitive Belastung. Energie, die sonst ins Testen geht, steht für Lernen, Spielen und Wachsen zur Verfügung.",
  },
  {
    title: "Elterliche Autonomie",
    content:
      "Eltern sind Teil des Systems, nicht nur Dienstleister. Ein erschöpftes Elternteil führt schlechter. Eigene Grenzen, eigene Bedürfnisse, eigene Ressourcen zu haben ist keine Schwäche — es ist Voraussetzung.",
  },
  {
    title: "Selbstregulation statt Abhängigkeit",
    content:
      "Kinder sollen lernen, ihre Gefühle selbst zu regulieren — nicht immer auf externe Auflösung warten. Co-Regulation bedeutet: der ruhige Anker sein, nicht der Mitreißende. Das Kind reguliert sich an meiner Ruhe.",
  },
];

export default function BalancedParentingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-cream-dark pt-44 pb-28 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <p className="text-overline text-terra mb-8">Das Konzept</p>
            <h1
              className="heading-display text-deep"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              Balanced
              <br />
              <em className="text-terra italic">Parenting</em>
            </h1>
            <div className="divider-terra mt-8" />
            <p className="text-deep/65 text-xl leading-relaxed mt-8 max-w-2xl font-light">
              Der wissenschaftlich fundierte Mittelweg zwischen Erschöpfung und
              Entfremdung. Warm. Klar. Verlässlich.
            </p>
          </div>
        </section>

        {/* Intro text */}
        <section className="section-padding bg-cream">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2
                  className="heading-section text-deep mb-6"
                  style={{ fontSize: "2.5rem" }}
                >
                  Kein Trend. Eine Haltung.
                </h2>
                <div className="divider-terra" />
              </div>
              <div className="space-y-5 text-deep/70 leading-relaxed font-light">
                <p>
                  Balanced Parenting ist nicht der nächste Erziehungstrend —
                  es ist die Rückkehr zu dem, was sechzig Jahre Forschung
                  immer wieder bestätigt.
                </p>
                <p>
                  Diana Baumrind hat es 1966 beschrieben. Mary Ainsworth hat
                  es mit Bindungsforschung unterlegt. Megan Gunnar hat es
                  neurobiologisch erklärt. Das Ergebnis ist immer das gleiche:
                </p>
                <p className="text-deep font-normal text-lg">
                  Hohe Wärme und hohe Anforderungen. Beides. Gleichzeitig.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vs comparison */}
        <section className="section-padding bg-cream-dark">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <p className="text-overline text-terra mb-12 text-center">
              Warum Balanced Parenting anders ist
            </p>
            <div className="grid md:grid-cols-3 gap-px bg-cream-mid">
              {[
                {
                  style: "Autoritär",
                  warmth: "Niedrig",
                  structure: "Hoch",
                  result: "Gehorcht, aber vertraut nicht. Befolgt Regeln aus Angst, nicht aus Überzeugung.",
                },
                {
                  style: "Balanced (Autoritativ)",
                  warmth: "Hoch",
                  structure: "Hoch",
                  result: "Liebt und respektiert. Sucht Nähe und akzeptiert Führung. Resilient, sozial kompetent, psychisch gesund.",
                  highlight: true,
                },
                {
                  style: "Permissiv",
                  warmth: "Hoch",
                  structure: "Niedrig",
                  result: "Liebt, aber respektiert nicht. Sucht Nähe, akzeptiert keine Führung.",
                },
              ].map((item) => (
                <div
                  key={item.style}
                  className="p-8 bg-cream"
                  style={
                    item.highlight
                      ? { boxShadow: "inset 0 2px 0 #4A4F3C" }
                      : undefined
                  }
                >
                  <p
                    className={`font-serif text-2xl mb-5 ${item.highlight ? "text-terra" : "text-deep/55"}`}
                  >
                    {item.style}
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-deep/40 tracking-wide uppercase">Wärme</span>
                      <span className={item.highlight ? "text-terra" : "text-deep/55"}>
                        {item.warmth}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-deep/40 tracking-wide uppercase">Struktur</span>
                      <span className={item.highlight ? "text-terra" : "text-deep/55"}>
                        {item.structure}
                      </span>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed font-light ${item.highlight ? "text-deep/75" : "text-deep/45"}`}>
                    {item.result}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-deep/35 text-xs text-center mt-6">
              Nach Diana Baumrind (1971) und Maccoby & Martin (1983)
            </p>
          </div>
        </section>

        {/* Five principles */}
        <section className="section-padding bg-cream">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <p className="text-overline text-terra mb-8">Die Prinzipien</p>
            <h2
              className="heading-section text-deep mb-14"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Balanced Parenting in der Praxis
            </h2>
            <div className="space-y-0">
              {principles.map((p, i) => (
                <div
                  key={p.title}
                  className="flex gap-8 py-10 border-t border-cream-mid first:border-t-0"
                >
                  <span
                    className="font-serif text-stone/50 flex-shrink-0 font-light"
                    style={{ fontSize: "2.25rem", lineHeight: 1, minWidth: "2.5rem" }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-deep text-2xl mb-3">{p.title}</h3>
                    <p className="text-deep/65 text-sm leading-relaxed font-light">{p.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-deep relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(168,155,140,0.10) 0%, transparent 60%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h2
              className="heading-section text-cream mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Tiefer einsteigen?
            </h2>
            <p className="text-cream/70 leading-relaxed mb-10 font-light">
              Im Buch „Wer liebt, führt" entfaltet Sarah Mann das Konzept
              vollständig — mit wissenschaftlicher Fundierung, persönlichen
              Geschichten und konkreten Praxis-Werkzeugen für jede
              Entwicklungsphase.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/buch/"
                className="bg-cream text-deep px-8 py-4 text-xs font-medium tracking-widest uppercase hover:bg-cream-dark transition-colors inline-flex items-center gap-3"
              >
                Das Buch entdecken
              </Link>
              <Link
                href="/kontakt/"
                className="btn-outline btn-outline-light"
              >
                Vortrag anfragen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
