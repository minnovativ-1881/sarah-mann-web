import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wer liebt, fuehrt | Das Buch | Sarah Mann",
  description:
    "Warum Kinder Grenzen brauchen und Eltern die Erlaubnis, sie zu setzen. Das Standardwerk fuer Balanced Parenting auf Deutsch von Sarah Mann.",
};

const chapters = [
  { num: "01", title: "Von Dr. Spock zu Instagram", sub: "Die Geschichte einer Entmachtung" },
  { num: "02", title: "Das Schuld-Geschäft", sub: "Wie Social Media Elternschuld zur Industrie machte" },
  { num: "03", title: "Das Versprechen und der Preis", sub: "Was Gentle Parenting wirklich ist" },
  { num: "04", title: "Bindung — Das missverstandene Fundament", sub: "Was John Bowlby wirklich gemeint hat" },
  { num: "05", title: "Das Gehirn braucht ein Geländer", sub: "Was die Neurowissenschaft sagt" },
  { num: "06", title: "Warm und klar", sub: "Das Beste aus zwei Welten" },
  { num: "07", title: "Schlaf als erste Führungsaufgabe", sub: "Warum der Abend zeigt, wer führt" },
  { num: "08", title: "0 bis 3 Jahre", sub: "Sicherheit durch Struktur" },
  { num: "09", title: "3 bis 6 Jahre", sub: "Grenzen als Liebesbeweis" },
  { num: "10", title: "6 bis 12 Jahre", sub: "Autorität behalten" },
  { num: "11", title: "Was in der Jugend sichtbar wird", sub: "Psychische Gesundheit und Grenzen" },
  { num: "12", title: "Sarahs Plädoyer", sub: "Was ich nach fünfzehn Jahren glaube" },
];

export default function BuchPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-cream-dark pt-44 pb-0 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-end">
              <div className="pb-28">
                <p className="text-overline text-terra mb-8">Das Buch</p>
                <h1
                  className="heading-display text-deep"
                  style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
                >
                  Wer liebt,
                  <br />
                  <em className="text-terra italic">f&uuml;hrt.</em>
                </h1>
                <div className="divider-terra mt-8" />
                <p className="text-deep/55 italic font-serif text-xl mt-6 leading-relaxed">
                  Warum Kinder Grenzen brauchen &mdash;
                  <br />
                  und Eltern die Erlaubnis, sie zu setzen
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

              <div className="flex justify-center lg:justify-end">
                <div className="relative" style={{ maxWidth: "300px", width: "100%" }}>
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "2/3", boxShadow: "0 30px 60px rgba(28,27,24,0.20)" }}
                  >
                    <div
                      className="absolute inset-0 flex flex-col"
                      style={{ background: "linear-gradient(160deg, #25241F 0%, #141310 100%)" }}
                    >
                      <div className="h-px bg-terra" />
                      <div className="flex-1 flex flex-col justify-between p-8 lg:p-10">
                        <p className="text-stone text-xs tracking-widest uppercase">
                          Sarah Mann
                        </p>
                        <div>
                          <h3
                            className="font-serif text-cream leading-none"
                            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 500 }}
                          >
                            Wer
                            <br />
                            liebt,
                            <br />
                            <em className="text-stone italic">f&uuml;hrt.</em>
                          </h3>
                          <div className="h-px bg-stone/40 my-5" />
                          <p className="text-cream/40 text-xs leading-relaxed">
                            Warum Kinder Grenzen brauchen
                          </p>
                        </div>
                        <p className="text-cream/25 text-xs">
                          P&auml;dagogin &middot; Babyschlafberaterin
                          <br />
                          Mutter von sieben Kindern
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <p className="text-overline text-terra mb-6">Worum es geht</p>
                <h2 className="heading-section text-deep mb-6" style={{ fontSize: "2.25rem" }}>
                  Das Buch, das Eltern Erlaubnis gibt
                </h2>
                <div className="divider-terra" />
              </div>
              <div className="space-y-5 text-deep/70 leading-relaxed font-light">
                <p className="font-normal text-deep text-lg">
                  Viele Eltern tun heute mehr f&uuml;r ihre Kinder als je zuvor
                  &mdash; und f&uuml;hlen sich trotzdem wie Versager.
                </p>
                <p>
                  Sie kennen alle Theorien. Sie reflektieren jede Reaktion.
                  Sie validieren Gef&uuml;hle, spiegeln Emotionen, erkl&auml;ren
                  Grenzen immer wieder und immer geduldiger.
                </p>
                <p>
                  Sarah Mann gibt eine klare Antwort &mdash; und die Erlaubnis,
                  die viele Eltern nie bekommen haben: Kinder brauchen nicht
                  weniger Grenzen, weil wir sie mehr lieben. Sie brauchen Grenzen,
                  <strong className="font-normal text-deep"> weil</strong> wir sie lieben.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream-dark py-24 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <blockquote className="font-serif text-2xl lg:text-3xl italic text-deep/80 leading-relaxed">
                &bdquo;Kein Nein erzeugt kein Trauma. Aber ein Kind ohne Grenzen
                &mdash; das erzeugt eines.&ldquo;
              </blockquote>
              <blockquote className="font-serif text-2xl lg:text-3xl italic text-deep/80 leading-relaxed">
                &bdquo;Sichere Bindung entsteht durch Zuverl&auml;ssigkeit &mdash;
                nicht durch Omnipr&auml;senz.&ldquo;
              </blockquote>
            </div>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <p className="text-overline text-terra mb-10">Inhalt</p>
            <h2 className="heading-section text-deep mb-12" style={{ fontSize: "2.25rem" }}>
              12 Kapitel. Alle Entwicklungsphasen.
            </h2>
            <div className="space-y-0">
              {chapters.map((ch) => (
                <div
                  key={ch.num}
                  className="flex gap-6 py-6 border-t border-cream-mid items-baseline"
                >
                  <span className="font-serif text-stone/60 flex-shrink-0 text-sm" style={{ fontWeight: 300 }}>
                    {ch.num}
                  </span>
                  <div>
                    <p className="font-serif text-deep text-lg">{ch.title}</p>
                    <p className="text-terra/80 text-xs mt-1 italic">{ch.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-deep relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 20% 20%, rgba(168,155,140,0.10) 0%, transparent 60%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="heading-section text-cream mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Wer liebt, f&uuml;hrt.
            </h2>
            <p className="text-cream/70 leading-relaxed mb-10 font-light">
              F&uuml;r alle Eltern, die aufgeh&ouml;rt haben, sich selbst zu
              vertrauen &mdash; und wieder anfangen m&ouml;chten.
            </p>
            <Link
              href="/kontakt/"
              className="bg-cream text-deep px-8 py-4 text-xs font-medium tracking-widest uppercase hover:bg-cream-dark transition-colors inline-flex items-center gap-3"
            >
              Leseprobe und Bezugsinfo anfragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
