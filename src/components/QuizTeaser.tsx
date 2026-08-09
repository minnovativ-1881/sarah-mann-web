import ElternTypQuiz from "@/components/ElternTypQuiz";

const quadranten = [
  { waerme: "hoch", name: "Warm, aber nachgiebig" },
  { waerme: "hoch", name: "Warm und klar", highlight: true },
  { waerme: "niedrig", name: "Erschöpft und unsicher" },
  { waerme: "niedrig", name: "Klar, aber kühl" },
];

export default function QuizTeaser() {
  return (
    <section
      id="quiz"
      className="section-padding scroll-mt-24"
      style={{ background: "linear-gradient(180deg, #EDF4F4 0%, #D6E8E8 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14">
          <p className="text-overline text-terra mb-6">Der kostenlose Test</p>
          <h2
            className="heading-section text-deep"
            style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
          >
            Welcher Eltern-Typ bist du?
          </h2>
          <div className="divider-terra" />
          <p className="body-text text-deep/85 mt-8 measure">
            Zwischen Wärme und Klarheit gibt es vier Wege. Drei führen in Erschöpfung
            oder Distanz. Einer macht Kinder stark. Acht kurze Situationen, zwei
            Minuten, und du weißt, wo du gerade stehst.
          </p>
        </div>

        {/* Matrix */}
        <div>
          <div className="flex justify-between text-overline text-terra mb-3 px-1">
            <span>Wenig Klarheit</span>
            <span>Viel Klarheit</span>
          </div>
          <div className="grid grid-cols-2 gap-px bg-cream-mid border border-cream-mid">
            {quadranten.map((q, i) => (
              <div
                key={i}
                className="p-6 lg:p-8 min-h-[7.5rem] flex flex-col justify-between"
                style={
                  q.highlight
                    ? { background: "linear-gradient(160deg, #15727B 0%, #0C3A40 100%)" }
                    : { background: "#FFFFFF" }
                }
              >
                <span className={`text-xs ${q.highlight ? "text-cream/60" : "text-deep/45"}`}>
                  Wärme {q.waerme}
                </span>
                <p
                  className={`font-serif text-lg lg:text-xl mt-3 ${
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

        {/* Der Test, direkt startbar */}
        <div className="mt-12">
          <ElternTypQuiz />
        </div>
      </div>
    </section>
  );
}
