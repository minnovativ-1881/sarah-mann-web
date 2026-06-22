import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wer liebt, führt — Das Buch | Sarah Mann",
  description:
    "„Wer liebt, führt" von Sarah Mann: Warum Kinder Grenzen brauchen — und Eltern die Erlaubnis, sie zu setzen. Das Standardwerk für Balanced Parenting auf Deutsch.",
};

const chapters = [
  { num: "01", title: "Von Dr. Spock zu Instagram", subtitle: "Die Geschichte einer Entmachtung" },
  { num: "02", title: "Das Schuld-Geschäft", subtitle: "Wie Social Media Elternschuld zur Industrie machte" },
  { num: "03", title: "Das Versprechen und der Preis", subtitle: "Was Gentle Parenting wirklich ist" },
  { num: "04", title: "Bindung — Das missverstandene Fundament", subtitle: "Was John Bowlby wirklich gemeint hat" },
  { num: "05", title: "Das Gehirn braucht ein Geländer", subtitle: "Was die Neurowissenschaft sagt" },
  { num: "06", title: "Warm und klar", subtitle: "Das Beste aus zwei Welten" },
  { num: "07", title: "Schlaf als erste Führungsaufgabe", subtitle: "Warum der Abend zeigt, wer führt" },
  { num: "08", title: "0 bis 3 Jahre", subtitle: "Sicherheit durch Struktur" },
  { num: "09", title: "3 bis 6 Jahre", subtitle: "Grenzen als Liebesbeweis" },
  { num: "10", title: "6 bis 12 Jahre", subtitle: "Autorität behalten" },
  { num: "11", title: "Was in der Jugend sichtbar wird", subtitle: "Psychische Gesundheit und Grenzen" },
  { num: "12", title: "Sarahs Plädoyer", subtitle: "Was ich nach fünfzehn Jahren glaube" },
];

export default function BuchPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-midnight pt-40 pb-0 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-end">
              {/* Text */}
              <div className="pb-24">
                <p className="text-overline text-terra mb-8">Das Buch</p>
                <h1
                  className="heading-display text-cream"
                  style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
                >
                  Wer liebt,
                  <br />
                  <em className="text-terra">führt.</em>
                </h1>
                <div className="divider-terra mt-8" />
                <p className="text-cream/50 italic font-serif text-xl mt-6 leading-relaxed">
                  Warum Kinder Grenzen brauchen —<br />
                  und Eltern die Erlaubnis, sie zu setzen
                </p>
                <p className="text-cream/40 text-sm mt-4">
                  Sarah Mann — 2025
                </p>

                <div className="mt-10">
                  <Link href="/kontakt/" className="btn-primary">
                    Leseprobe anfragen
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Book visual */}
              <div className="flex justify-center lg:justify-end pb-0">
                <div className="relative" style={{ maxWidth: "300px", width: "100%" }}>
                  <div
                    className="relative overflow-hidden shadow-2xl"
                    style={{ aspectRatio: "2/3" }}
                  >
                    <div
                      className="absolute inset-0 flex flex-col"
                      style={{ background: "linear-gradient(160deg, #1C2D3F 0%, #0F1A24 100%)" }}
                    >
                      <div className="h-1 bg-terra" />
                      <div className="flex-1 flex flex-col justify-between p-8 lg:p-10">
                        <p className="text-terra text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                          Sarah Mann
                        </p>
                        <div>
                          <h3
                            className="font-serif text-cream leading-none"
                            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 600 }}
                          >
                            Wer<br />liebt,<br /><em className="text-terra">führt.</em>
                          </h3>
                          <div className="h-px bg-terra/40 my-5" />
                          <p className="text-cream/40 text-xs leading-relaxed">
                            Warum Kinder Grenzen brauchen —<br />
                            und Eltern die Erlaubnis, sie zu setzen
                          </p>
                        </div>
                        <p className="text-cream/25 text-xs">
                          Pädagogin · Babyschlafberaterin<br />Mutter von sieben Kindern
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 right-0 bottom-0 -z-10" style={{ background: "#C47A5A", opacity: 0.12 }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Klappentext */}
        <section className="section-padding bg-cream">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <p className="text-overline text-terra mb-6">Worum es geht</p>
                <h2 className="heading-section text-deep mb-6" style={{ fontSize: "2rem" }}>
                  Das Buch, das Eltern Erlaubnis gibt
                </h2>
                <div className="divider-terra" />
              </div>
              <div className="space-y-5 text-deep/70 leading-relaxed">
                <p className="font-medium text-deep text-lg">
                  Viele Eltern tun heute mehr für ihre Kinder als je zuvor — und fühlen sich trotzdem wie Versager.
                </p>
                <p>
                  Sie kennen alle Theorien. Sie reflektieren jede Reaktion.
                  Sie validieren Gefühle, spiegeln Emotionen, erklären Grenzen
                  immer wieder und immer geduldiger.
                </p>
                <p>
                  Und irgendwo am Ende eines langen Abends stellen sie sich
                  leise eine Frage: <em>Mache ich das richtig?</em>
                </p>
                <p>
                  Sarah Mann gibt eine klare Antwort — und die Erlaubnis, die
                  viele Eltern nie bekommen haben: Kinder brauchen nicht weniger
                  Grenzen, weil wir sie mehr lieben. Sie brauchen Grenzen,
                  <strong> weil</strong> wir sie lieben.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pull quotes */}
        <section className="bg-terra py-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {[
                "„Kein Nein erzeugt kein Trauma. Aber ein Kind ohne Grenzen — das erzeugt eines."",
                "„Sichere Bindung entsteht durch Verlässlichkeit — nicht durch Omnipräsenz."",
              ].map((q, i) => (
                <blockquote key={i} className="font-serif text-xl italic text-cream/90 leading-relaxed">
                  {q}
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter list */}
        <section className="section-padding bg-cream-dark">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <p className="text-overline text-terra mb-10">Inhalt</p>
            <h2 className="heading-section text-deep mb-12" style={{ fontSize: "2rem" }}>
              12 Kapitel. Alle Entwicklungsphasen.
            </h2>
            <div className="space-y-0">
              {chapters.map((ch) => (
                <div
                  key={ch.num}
                  className="flex gap-6 py-6 border-t border-cream-mid items-baseline"
                >
                  <span className="font-serif text-cream-mid flex-shrink-0 text-sm" style={{ fontWeight: 300 }}>
                    {ch.num}
                  </span>
                  <div>
                    <p className="text-deep font-medium text-sm">{ch.title}</p>
                    <p className="text-terra/70 text-xs mt-1 italic">{ch.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-deep">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="heading-section text-cream mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Wer liebt, führt.
            </h2>
            <p className="text-cream/65 leading-relaxed mb-10">
              Für alle Eltern, die aufgehört haben, sich selbst zu vertrauen —
              und wieder anfangen möchten.
            </p>
            <Link href="/kontakt/" className="btn-primary">
              Leseprobe und Bezugsinfo anfragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
