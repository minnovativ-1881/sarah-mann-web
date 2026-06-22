import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Photo placeholder */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Frame effect */}
              <div
                className="absolute inset-0 border border-terra/30"
                style={{ transform: "translate(16px, 16px)" }}
              />
              <div
                className="bg-deep relative overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-deep/90 to-midnight">
                  <div className="text-center px-8">
                    <div className="w-24 h-24 rounded-full bg-terra/15 border border-terra/30 mx-auto mb-4 flex items-center justify-center">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        className="text-terra/50"
                      >
                        <circle cx="18" cy="13" r="6" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M6 32c0-6.627 5.373-12 12-12s12 5.373 12 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <p className="text-cream/20 text-xs tracking-widest uppercase">
                      Foto Sarah Mann
                    </p>
                  </div>
                </div>
                {/* Bottom overlay with quote */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-midnight via-midnight/80 to-transparent">
                  <p className="font-serif text-cream/85 italic text-sm">
                    „Mit sieben Kindern und fünfzehn Jahren Beratungspraxis
                    habe ich gelernt: Perfektion ist nicht das Ziel.
                    Verlässlichkeit ist das Ziel."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2">
            <p className="text-overline text-terra mb-6">Über Sarah Mann</p>
            <h2
              className="heading-section text-deep"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
            >
              Die Frau hinter
              <br />
              Balanced Parenting
            </h2>
            <div className="divider-terra" />

            <div className="space-y-5 text-deep/70 leading-relaxed mt-8">
              <p>
                Sarah Mann ist Pädagogin, Babyschlafberaterin und Mutter von
                sieben Kindern. Seit über fünfzehn Jahren begleitet sie Familien
                in der Schlafberatung und Erziehungsbegleitung — zuerst mit
                dem Idealismus einer jungen Mutter, dann mit der wachsenden
                Erfahrung von jemandem, der das Leben mit Kindern aus jeder
                Phase kennt.
              </p>
              <p>
                Als deutschsprachige Pionierin des{" "}
                <span className="text-deep font-medium">Balanced Parenting</span>{" "}
                verbindet sie wissenschaftliche Fundierung (Baumrind, Bowlby,
                Ainsworth) mit dem echten Alltag. Keine Theorie, die an der
                Praxis scheitert. Keine Praxis ohne wissenschaftliche Grundlage.
              </p>
              <p>
                Sarah lebt mit ihrem Mann und ihren sieben Kindern in Israel.
              </p>
            </div>

            {/* Credential cards */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                { label: "Pädagogin", detail: "Wissenschaftliche Basis" },
                { label: "Babyschlafberaterin", detail: "15+ Jahre Praxis" },
                { label: "Mutter von 7", detail: "Alle Phasen aus erster Hand" },
                { label: "Autorin", detail: "„Wer liebt, führt"" },
              ].map((cred) => (
                <div key={cred.label} className="bg-cream p-5">
                  <p className="text-deep font-medium text-sm">{cred.label}</p>
                  <p className="text-terra text-xs mt-1 tracking-wide">
                    {cred.detail}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/ueber-sarah/" className="btn-primary mt-10 inline-flex">
              Mehr über Sarah
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
