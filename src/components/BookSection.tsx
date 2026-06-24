import Link from "next/link";

const insights = [
  "Wie Social Media aus einer Erziehungsphilosophie eine Schuldindustrie gemacht hat",
  "Was John Bowlby wirklich gemeint hat — und was Instagram daraus gemacht hat",
  "Warum das kindliche Gehirn Grenzen braucht, bevor es selbst führen kann",
  "Wie Balanced Parenting in jeder Entwicklungsphase konkret aussieht (0–Pubertät)",
  "Warum Schlaf die erste Führungsaufgabe ist",
];

export default function BookSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Book visual */}
          <div className="flex justify-center">
            <div className="relative" style={{ maxWidth: "340px", width: "100%" }}>
              {/* Book mockup */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "2/3", boxShadow: "0 30px 60px rgba(28,27,24,0.18)" }}
              >
                {/* Book cover */}
                <div
                  className="absolute inset-0 flex flex-col"
                  style={{ background: "linear-gradient(160deg, #25241F 0%, #141310 100%)" }}
                >
                  {/* Subtle top accent */}
                  <div className="h-px bg-terra" />

                  <div className="flex-1 flex flex-col justify-between p-8 lg:p-10">
                    {/* Top: Overline */}
                    <div>
                      <p
                        className="text-stone text-xs tracking-widest uppercase mb-6"
                      >
                        Sarah Mann
                      </p>
                    </div>

                    {/* Center: Title */}
                    <div>
                      <h3
                        className="font-serif text-cream leading-none"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 500 }}
                      >
                        Wer
                        <br />
                        liebt,
                        <br />
                        <em className="text-stone italic">führt.</em>
                      </h3>
                      <div className="h-px bg-stone/40 my-5" />
                      <p className="text-cream/50 text-xs leading-relaxed">
                        Warum Kinder Grenzen brauchen —<br />
                        und Eltern die Erlaubnis, sie zu setzen
                      </p>
                    </div>

                    {/* Bottom: Credential */}
                    <div>
                      <p className="text-cream/30 text-xs">
                        Pädagogin · Babyschlafberaterin
                        <br />
                        Mutter von sieben Kindern
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Book info */}
          <div>
            <p className="text-overline text-terra mb-6">Das Buch</p>
            <h2
              className="heading-section text-deep"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)" }}
            >
              Wer liebt, führt.
            </h2>
            <p className="text-deep/50 italic font-serif text-lg mt-2">
              Warum Kinder Grenzen brauchen —<br />
              und Eltern die Erlaubnis, sie zu setzen
            </p>
            <div className="divider-terra" />

            <p className="text-deep/65 leading-relaxed mt-6 font-light">
              Viele Eltern tun heute mehr für ihre Kinder als je zuvor — und
              fühlen sich trotzdem wie Versager. Dieses Buch gibt zurück, was
              zu viele Eltern verloren haben: das Vertrauen, Nein zu sagen.
            </p>

            {/* What you learn */}
            <div className="mt-8">
              <p className="text-overline text-terra mb-5">Im Buch</p>
              <ul className="space-y-3">
                {insights.map((insight) => (
                  <li key={insight} className="flex gap-3 text-deep/65 text-sm font-light">
                    <span className="text-terra flex-shrink-0 mt-0.5">—</span>
                    <span className="leading-relaxed">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/buch/" className="btn-primary">
                Zum Buch
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
              <Link
                href="/kontakt/"
                className="btn-outline btn-outline-dark text-xs"
              >
                Leseprobe anfragen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
