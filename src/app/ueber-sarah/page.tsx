import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Über Sarah Mann | Balanced Parenting Expertin",
  description:
    "Sarah Mann: Pädagogin, Babyschlafberaterin und Mutter von sieben Kindern. Die führende deutschsprachige Expertin für Balanced Parenting.",
};

const milestones = [
  { year: "2008", event: "Erste Ausbildung zur Babyschlafberaterin" },
  { year: "2010", event: "Beginn der eigenen Beratungspraxis" },
  { year: "2015", event: "Erweiterung auf Erziehungsbegleitung und Familiencoaching" },
  { year: "2020", event: "Babyschlummerland — über 1.000 Familien begleitet" },
  { year: "2025", event: "Aufbau der Autorinnen-Marke und der Bewegung Balanced Parenting" },
  { year: "2026", event: "Erste Bücher erscheinen: 'Wer liebt, führt' und 'Dein Baby darf schlafen' (September)" },
];

export default function UeberSarahPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-cream-dark pt-44 pb-28 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <p className="text-overline text-terra mb-8">Die Expertin</p>
            <h1
              className="heading-display text-deep"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              Sarah
              <br />
              <em className="text-terra italic">Mann</em>
            </h1>
            <div className="divider-terra mt-8" />
            <p className="text-deep/65 text-xl leading-relaxed mt-8 max-w-2xl font-light">
              Pädagogin. Babyschlafberaterin. Mutter von sieben Kindern.
              Autorin. Und die führende deutschsprachige Stimme für Balanced
              Parenting.
            </p>
          </div>
        </section>

        {/* Main bio section */}
        <section className="section-padding bg-cream">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-5 gap-16">
              {/* Photo */}
              <div className="lg:col-span-2">
                <div className="photo-frame">
                  <div
                    className="overflow-hidden"
                    style={{
                      aspectRatio: "3/4",
                      background:
                        "linear-gradient(160deg, #FBF9F5 0%, #ECE8E0 100%)",
                    }}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="text-center px-8">
                        <div
                          className="font-serif text-stone mb-3"
                          style={{ fontSize: "3.5rem", lineHeight: 1, fontWeight: 300, letterSpacing: "0.05em" }}
                        >
                          SM
                        </div>
                        <p className="text-deep/35 text-xs tracking-widest uppercase">Portrait Sarah Mann</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credential list */}
                <div className="mt-10 space-y-4">
                  {[
                    "Pädagogin",
                    "Zertifizierte Babyschlafberaterin",
                    "Erziehungsbegleiterin",
                    "Mutter von sieben Kindern",
                    "Autorin",
                  ].map((c) => (
                    <div key={c} className="flex gap-3 items-center text-sm text-deep/70 font-light">
                      <span className="text-terra">—</span>
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio text */}
              <div className="lg:col-span-3 space-y-6 text-deep/70 leading-relaxed font-light">
                <h2
                  className="heading-section text-deep mb-8"
                  style={{ fontSize: "2.5rem" }}
                >
                  Die Geschichte hinter
                  <br />
                  Balanced Parenting
                </h2>

                <p>
                  Es ist 23:14 Uhr. Ich sitze auf dem Boden des Kinderzimmers
                  meiner damals vierjährigen Tochter Miriam. Mein Rücken lehnt
                  gegen das Bettgestell, und ich bin todmüde. Nicht die normale
                  Müdigkeit einer Mutter von sieben Kindern. Eine andere
                  Müdigkeit. Ich habe heute Abend alles richtig gemacht. Alles.
                  Genau so, wie es in den Büchern steht.
                </p>

                <p>
                  In diesem Moment denke ich an meinen eigenen Vater. Wie er
                  mich ins Bett gebracht hat. Ein Kuss auf die Stirn.
                  „Gute Nacht." Das Licht aus. Er ist gegangen. Kein Verhandeln.
                  Keine zwanzig Minuten auf dem Boden. Und weißt du was?
                  Ich habe ihn trotzdem geliebt.
                </p>

                <p>
                  Diese Frage hat mich nicht losgelassen. In dieser Nacht.
                  Nicht in den Monaten danach. Nicht in fünfzehn Jahren als
                  Babyschlafberaterin, in denen ich über tausend Familien
                  getroffen habe.
                </p>

                <blockquote
                  className="pl-6 border-l border-terra my-8"
                >
                  <p className="font-serif text-2xl italic text-deep/80">
                    „Was Eltern fehlt, ist nicht mehr Wissen. Was Eltern fehlt,
                    ist die Erlaubnis, sich selbst zu vertrauen."
                  </p>
                </blockquote>

                <p>
                  Als Pädagogin und Babyschlafberaterin — und als Mutter von
                  sieben Kindern, die alle Entwicklungsphasen aus nächster Nähe
                  erlebt hat — verbinde ich zwei Dinge, die in der
                  Erziehungsdiskussion zu selten zusammenkommen: Forschung und
                  Alltag.
                </p>

                <p>
                  Ich zitiere Studien — und ich weiß, wie sich ein Keks-Streit
                  mit einem Dreijährigen anfühlt, wenn man gerade vier Stunden
                  geschlafen hat. Beides. Gleichzeitig.
                </p>

                <p>
                  Das ist die Grundlage von Balanced Parenting. Nicht als
                  Theorie. Als gelebte Haltung.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-cream-dark py-24 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { num: "15+", label: "Jahre Erfahrung" },
                { num: "7", label: "eigene Kinder" },
                { num: "1.000+", label: "Familien begleitet" },
                { num: "2", label: "Bücher — ab September 2026" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="font-serif text-deep"
                    style={{ fontSize: "3.5rem", fontWeight: 300, lineHeight: 1 }}
                  >
                    {s.num}
                  </div>
                  <p className="text-deep/55 text-xs mt-3 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-cream">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <p className="text-overline text-terra mb-10">Stationen</p>
            <div className="space-y-0">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="flex gap-8 py-8 border-t border-cream-mid items-start"
                >
                  <span className="font-serif text-terra flex-shrink-0 w-16 text-lg">
                    {m.year}
                  </span>
                  <p className="text-deep/70 text-sm leading-relaxed font-light pt-1">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-cream-dark">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h2
              className="heading-section text-deep mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Mit Sarah arbeiten
            </h2>
            <p className="text-deep/65 leading-relaxed mb-10 max-w-xl mx-auto font-light">
              Für Vorträge, Workshops, Medienanfragen und Beratungsprojekte
              steht Sarah Mann zur Verfügung.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/kontakt/" className="btn-primary">
                Anfrage stellen
              </Link>
              <Link href="/buch/" className="btn-outline btn-outline-dark">
                Das Buch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
