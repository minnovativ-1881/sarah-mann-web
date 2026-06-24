import Link from "next/link";

const pillars = [
  {
    number: "01",
    title: "Warm",
    subtitle: "Echte Verbindung",
    desc: "Sichere Bindung entsteht durch Verlässlichkeit — nicht durch Omnipräsenz.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 27s-10-6-10-13a7 7 0 0 1 10-6.3A7 7 0 0 1 26 14c0 7-10 13-10 13Z" stroke="#4A4F3C" strokeWidth="1.25" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Klar",
    subtitle: "Verlässliche Struktur",
    desc: "Grenzen sind kein Liebesentzug — sie sind Liebesbeweis. Konsequenz erzeugt Sicherheit.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 5 L22 9 L22 18 C22 23 16 27 16 27 C16 27 10 23 10 18 L10 9 Z" stroke="#4A4F3C" strokeWidth="1.25" strokeLinejoin="round" />
        <path d="M13 17l2 2 4-4" stroke="#4A4F3C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Verlässlich",
    subtitle: "Klare Führung",
    desc: "Ich handle aus Überzeugung, nicht aus Angst. Ich sage Nein, wenn ich Nein meine.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11" stroke="#4A4F3C" strokeWidth="1.25" />
        <path d="M16 10v6l4 2" stroke="#4A4F3C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ConceptSection() {
  return (
    <section className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-20">
          <p className="text-overline text-terra mb-6">Das Konzept</p>
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <h2
              className="heading-section text-deep"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)" }}
            >
              Was ist
              <br />
              Balanced Parenting?
            </h2>
            <p className="text-deep/60 text-lg leading-relaxed font-light">
              Die wissenschaftlich am besten bestätigte Antwort auf die Frage,
              was Kinder wirklich brauchen. Hohe Wärme{" "}
              <em className="font-serif text-terra not-italic">und</em> hohe
              Klarheit. Beides. Gleichzeitig.
            </p>
          </div>
          <div className="divider-terra mt-10" />
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-px bg-cream-mid">
          {pillars.map((p) => (
            <div key={p.number} className="bg-cream p-12 card-hover">
              <div className="flex items-start justify-between mb-12">
                {p.icon}
                <span className="font-serif text-cream-mid font-light" style={{ fontSize: "3.5rem", lineHeight: 1 }}>
                  {p.number}
                </span>
              </div>
              <h3 className="heading-section text-deep mb-2" style={{ fontSize: "2rem" }}>
                {p.title}
              </h3>
              <p className="text-terra text-xs font-medium tracking-widest uppercase mb-6">
                {p.subtitle}
              </p>
              <p className="text-deep/55 text-sm leading-relaxed font-light">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Baumrind quote */}
        <div className="mt-20 pt-12 border-t border-cream-mid flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <blockquote
            className="font-serif text-2xl lg:text-3xl italic text-deep/70 max-w-xl"
            style={{ fontWeight: 300 }}
          >
            &bdquo;Das autoritative Modell — warm und fordernd — erzeugt in sechzig Jahren Forschung immer dasselbe Ergebnis: die resilientesten Kinder.&ldquo;
          </blockquote>
          <div className="flex-shrink-0">
            <p className="text-overline text-terra mb-4">Diana Baumrind, 1971</p>
            <Link href="/balanced-parenting/" className="btn-outline btn-outline-dark text-xs">
              Mehr zum Konzept
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
