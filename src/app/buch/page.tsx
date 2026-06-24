import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Die Bücher | Sarah Mann | Balanced Parenting",
  description:
    "Sarah Mann baut eine Bewegung für Erziehung mit Wärme und Klarheit. Den Anfang machen zwei Bücher: 'Wer liebt, führt' und 'Dein Baby darf schlafen'. Beide erscheinen im September 2026.",
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

const schlafInside = [
  "Warum sichere Bindung Verlässlichkeit heißt, nicht ständige Verfügbarkeit",
  "Ein klarer Plan für Abend und Nacht, durchgehend warm begleitet",
  "Frust darf sein, einsam darf er nicht sein: der dritte Weg zwischen Schreienlassen und Aufgeben",
  "Ein Praxis-Handbuch zum Nachschlagen für jeden Moment des Abends",
];

function CoverHaupt({ small = false }: { small?: boolean }) {
  return (
    <div
      className="relative overflow-hidden mx-auto"
      style={{ aspectRatio: "2/3", maxWidth: small ? "190px" : "300px", width: "100%", boxShadow: "0 30px 60px rgba(12,58,64,0.22)" }}
    >
      <div className="absolute inset-0 flex flex-col" style={{ background: "linear-gradient(160deg, #15727B 0%, #0C3A40 100%)" }}>
        <div className="h-px bg-stone" />
        <div className="flex-1 flex flex-col justify-between p-7 lg:p-9">
          <p className="text-stone text-xs tracking-widest uppercase">Sarah Mann</p>
          <div>
            <h3 className="font-serif text-cream leading-none" style={{ fontSize: small ? "2rem" : "clamp(2rem, 5vw, 3.25rem)", fontWeight: 500 }}>
              Wer
              <br />
              liebt,
              <br />
              <em className="text-stone italic">führt.</em>
            </h3>
            <div className="h-px bg-stone/40 my-5" />
            <p className="text-cream/50 text-xs leading-relaxed">Warum Kinder Grenzen brauchen</p>
          </div>
          <p className="text-cream/30 text-xs">Mutter von sieben Kindern</p>
        </div>
      </div>
    </div>
  );
}

function CoverSchlaf({ small = false }: { small?: boolean }) {
  return (
    <div
      className="relative overflow-hidden mx-auto border border-cream-mid"
      style={{ aspectRatio: "2/3", maxWidth: small ? "190px" : "300px", width: "100%", boxShadow: "0 30px 60px rgba(28,27,24,0.12)" }}
    >
      <div className="absolute inset-0 flex flex-col" style={{ background: "linear-gradient(160deg, #FBF9F5 0%, #ECE8E0 100%)" }}>
        <div className="h-px bg-terra" />
        <div className="flex-1 flex flex-col justify-between p-7 lg:p-9">
          <p className="text-terra text-xs tracking-widest uppercase">Sarah Mann</p>
          <div>
            <h3 className="font-serif text-deep leading-none" style={{ fontSize: small ? "2rem" : "clamp(2rem, 5vw, 3.25rem)", fontWeight: 500 }}>
              Dein
              <br />
              Baby
              <br />
              darf
              <br />
              <em className="text-terra italic">schlafen</em>
            </h3>
            <div className="h-px bg-terra/30 my-5" />
            <p className="text-deep/50 text-xs leading-relaxed">Bindungsbewusst und klar</p>
          </div>
          <p className="text-deep/35 text-xs">Babyschlaf, sanft und mit Plan</p>
        </div>
      </div>
    </div>
  );
}

export default function BuchPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-cream-dark pt-44 pb-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-overline text-terra mb-8">Die Bücher &middot; Eine Bewegung</p>
                <h1
                  className="heading-display text-deep"
                  style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }}
                >
                  Bücher, die
                  <br />
                  Eltern <em className="text-terra italic">stärken.</em>
                </h1>
                <div className="divider-terra mt-8" />
                <p className="text-deep/65 text-lg leading-relaxed mt-8 max-w-xl font-light">
                  Sarah Mann schreibt nicht ein Buch, sondern baut eine Bewegung für Erziehung mit
                  Wärme und Klarheit. Den Anfang machen zwei Bücher.
                </p>
                <p className="text-overline text-terra mt-8">Beide erscheinen im September 2026</p>
                <div className="mt-10">
                  <Link href="/kontakt/" className="btn-primary">
                    Leseprobe anfragen
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                <CoverHaupt small />
                <CoverSchlaf small />
              </div>
            </div>
          </div>
        </section>

        {/* Hauptbuch */}
        <section className="section-padding bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 lg:order-1">
                <CoverHaupt />
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-overline text-terra mb-6">Das Hauptbuch &middot; September 2026</p>
                <h2 className="heading-section text-deep" style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)" }}>
                  Wer liebt, führt.
                </h2>
                <p className="text-deep/50 italic font-serif text-lg mt-2">
                  Warum Kinder Grenzen brauchen —<br />
                  und Eltern die Erlaubnis, sie zu setzen
                </p>
                <div className="divider-terra" />
                <div className="space-y-5 text-deep/70 leading-relaxed mt-6 font-light">
                  <p className="text-deep font-normal text-lg">
                    Viele Eltern tun heute mehr für ihre Kinder als je zuvor — und fühlen sich
                    trotzdem wie Versager.
                  </p>
                  <p>
                    Sarah Mann gibt eine klare Antwort, und die Erlaubnis, die viele Eltern nie
                    bekommen haben: Kinder brauchen nicht weniger Grenzen, weil wir sie mehr lieben.
                    Sie brauchen Grenzen, <strong className="font-normal text-deep">weil</strong> wir
                    sie lieben.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote band */}
        <section className="bg-cream-dark py-24 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <blockquote className="font-serif text-2xl lg:text-3xl italic text-deep/80 leading-relaxed">
                &bdquo;Kein Nein erzeugt kein Trauma. Aber ein Kind ohne Grenzen — das erzeugt eines.&ldquo;
              </blockquote>
              <blockquote className="font-serif text-2xl lg:text-3xl italic text-deep/80 leading-relaxed">
                &bdquo;Sichere Bindung entsteht durch Zuverlässigkeit — nicht durch Omnipräsenz.&ldquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* Chapters */}
        <section className="section-padding bg-cream">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <p className="text-overline text-terra mb-10">Inhalt &middot; Wer liebt, führt</p>
            <h2 className="heading-section text-deep mb-12" style={{ fontSize: "2.25rem" }}>
              12 Kapitel. Alle Entwicklungsphasen.
            </h2>
            <div className="space-y-0">
              {chapters.map((ch) => (
                <div key={ch.num} className="flex gap-6 py-6 border-t border-cream-mid items-baseline">
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

        {/* Schlafbuch */}
        <section className="section-padding bg-cream-dark">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <p className="text-overline text-terra mb-6">Der Babyschlaf-Ratgeber &middot; September 2026</p>
                <h2 className="heading-section text-deep" style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)" }}>
                  Dein Baby darf schlafen
                </h2>
                <p className="text-deep/50 italic font-serif text-lg mt-2">
                  Bindungsbewusst und klar zu ruhigen Nächten,<br />
                  ohne Schreienlassen
                </p>
                <div className="divider-terra" />
                <p className="text-deep/70 leading-relaxed mt-6 font-light">
                  Du musst dich nicht entscheiden zwischen Schreienlassen und dich selbst aufgeben.
                  Es gibt einen dritten Weg, warm und klar zugleich. Schlaf ist die erste
                  Führungsaufgabe.
                </p>
                <ul className="space-y-3 mt-8">
                  {schlafInside.map((p) => (
                    <li key={p} className="flex gap-3 text-deep/65 text-sm font-light">
                      <span className="text-terra flex-shrink-0 mt-0.5">—</span>
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <CoverSchlaf />
              </div>
            </div>
          </div>
        </section>

        {/* Coming: Kinderbücher */}
        <section className="py-24 px-6 lg:px-12 bg-cream">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-overline text-terra mb-6">In Vorbereitung</p>
            <p className="font-serif italic text-deep/70 leading-relaxed" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              Und Kinderbücher, die Kinder stark machen, und die sie selbst lesen.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-midnight relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 20% 20%, rgba(168,155,140,0.10) 0%, transparent 60%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="heading-section text-cream mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Sei dabei, wenn die Bücher erscheinen.
            </h2>
            <p className="text-cream/70 leading-relaxed mb-10 font-light">
              Leseprobe, Erscheinungstermine und Bezugsinfos zu beiden Büchern, direkt von Sarah.
            </p>
            <Link
              href="/kontakt/"
              className="bg-cream text-deep px-8 py-4 text-xs font-medium tracking-widest uppercase hover:bg-cream-dark transition-colors inline-flex items-center gap-3"
            >
              Leseprobe und Infos anfragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
