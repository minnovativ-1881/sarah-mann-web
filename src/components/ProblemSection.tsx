export default function ProblemSection() {
  return (
    <section className="section-padding bg-deep text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Stats */}
          <div>
            <p className="text-overline text-terra mb-8">Der Kontext</p>

            <div className="space-y-12">
              {[
                {
                  num: "35%",
                  label: "der selbst identifizierten Gentle Parents",
                  desc: "berichten Erschöpfung und Versagensgefühle — nicht weil sie zu wenig tun, sondern weil der Anspruch nicht erfüllbar ist.",
                  source: "Edelstein et al., PLOS ONE 2024",
                },
                {
                  num: "53%",
                  label: "der Jugendlichen zwischen 14 und 17",
                  desc: "fühlen sich chronisch erschöpft. Als Grundzustand, nicht als Ausnahme.",
                  source: "DAK Jugendreport 2025",
                },
                {
                  num: "16,9%",
                  label: "der Kinder und Jugendlichen in Deutschland",
                  desc: "gelten als psychisch auffällig. Fast jedes sechste Kind.",
                  source: "RKI KiGGS Welle 2, 2018",
                },
              ].map((stat) => (
                <div key={stat.num} className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div
                      className="font-serif text-terra"
                      style={{
                        fontSize: "3rem",
                        lineHeight: 1,
                        fontWeight: 300,
                      }}
                    >
                      {stat.num}
                    </div>
                  </div>
                  <div>
                    <p className="text-cream/90 font-medium text-sm mb-2">
                      {stat.label}
                    </p>
                    <p className="text-cream/60 text-sm leading-relaxed">
                      {stat.desc}
                    </p>
                    <p className="text-terra/70 text-xs mt-2 tracking-wide">
                      {stat.source}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Text */}
          <div>
            <h2
              className="heading-section text-cream mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Mehr Wissen.
              <br />
              Mehr Schuld.
              <br />
              <em className="text-terra">Weniger Vertrauen.</em>
            </h2>

            <div className="space-y-5 text-cream/65 leading-relaxed">
              <p>
                Eltern heute lesen mehr Erziehungsratgeber als jede Generation
                vor ihnen. Sie folgen mehr Accounts. Sie kennen mehr Begriffe.
                Sie reflektieren jede Reaktion, validieren jedes Gefühl, erklären
                jede Grenze dreimal.
              </p>
              <p>
                Und fühlen sich trotzdem schlechter. Nicht trotz des Wissens —
                sondern wegen der Art, wie dieses Wissen verbreitet wird.
              </p>
              <p>
                Social Media hat aus einer Erziehungsphilosophie eine
                Identität gemacht. Und Identitäten lassen sich nicht
                ablegen, wenn man erschöpft ist.
              </p>
              <p className="text-cream/85 font-medium">
                Was Eltern fehlt, ist nicht mehr Wissen. Was Eltern fehlt,
                ist die Erlaubnis, sich selbst zu vertrauen.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className="mt-10 pl-6 border-l-2 border-terra"
            >
              <p className="font-serif text-xl italic text-cream/80">
                „Du machst nicht zu wenig. Du tust zu viel — von dem, das dir
                nicht hilft."
              </p>
              <p className="text-terra text-sm mt-3">— Sarah Mann</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
