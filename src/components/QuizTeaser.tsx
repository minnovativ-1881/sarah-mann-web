import Link from "next/link";

/**
 * Die Lead-Maschine der Seite: der kostenlose Eltern-Typ-Test.
 * Sammelt E-Mails ueber die persoenliche Auswertung.
 * Sektion traegt id="quiz", damit Navigation und CTAs hierher scrollen koennen.
 */
const quadrants = [
  { warm: "hoch", klar: "niedrig", name: "Der warme Nachgeber", muted: true },
  { warm: "hoch", klar: "hoch", name: "Warm und klar", highlight: true },
  { warm: "niedrig", klar: "niedrig", name: "Der unsichere Beobachter", muted: true },
  { warm: "niedrig", klar: "hoch", name: "Der strenge Kontrolleur", muted: true },
];

export default function QuizTeaser() {
  return (
    <section id="quiz" className="section-padding bg-cream-dark scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Pitch */}
          <div>
            <p className="text-overline text-terra mb-6">Der kostenlose Test</p>
            <h2
              className="heading-section text-deep"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
            >
              Welcher Eltern-Typ
              <br />
              bist du?
            </h2>
            <div className="divider-terra" />
            <p className="body-text text-deep/85 mt-8 measure">
              Zwischen Wärme und Klarheit gibt es vier Wege. Drei führen in
              Erschöpfung oder Distanz. Einer macht Kinder stark. In zwei Minuten
              findest du heraus, wo du gerade stehst.
            </p>
            <p className="body-text text-deep/85 mt-5 measure">
              Du bekommst eine persönliche Auswertung: was dein Ergebnis für den
              Alltag bedeutet und dein erster Schritt in Richtung Balance.
            </p>
            <div className="mt-10">
              <Link href="/quiz/" className="btn-primary">
                Test starten
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <p className="text-deep/55 text-xs mt-4 tracking-wide">
                Kostenlos. Auswertung direkt per E-Mail.
              </p>
            </div>
          </div>

          {/* Right: Matrix preview */}
          <div>
            <div className="relative">
              {/* Axis labels */}
              <div className="flex justify-between text-overline text-terra mb-3 px-1">
                <span>Wenig Klarheit</span>
                <span>Viel Klarheit</span>
              </div>
              <div className="grid grid-cols-2 gap-px bg-cream-mid border border-cream-mid">
                {[quadrants[0], quadrants[1], quadrants[2], quadrants[3]].map((q, i) => (
                  <div
                    key={i}
                    className="bg-cream p-7 lg:p-9 min-h-[9rem] flex flex-col justify-between"
                    style={
                      q.highlight
                        ? { background: "linear-gradient(160deg, #15727B 0%, #0C3A40 100%)" }
                        : undefined
                    }
                  >
                    <div className="flex justify-between text-xs">
                      <span className={q.highlight ? "text-cream/60" : "text-deep/45"}>
                        Wärme {q.warm}
                      </span>
                    </div>
                    <p
                      className={`font-serif text-lg lg:text-xl mt-4 ${
                        q.highlight ? "text-cream" : "text-deep/70"
                      }`}
                    >
                      {q.name}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-deep/45 text-xs text-center mt-4 tracking-wide">
                Nach dem Modell von Diana Baumrind
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
