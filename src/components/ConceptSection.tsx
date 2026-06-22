import Link from "next/link";

const pillars = [
  {
    number: "01",
    title: "Warm",
    subtitle: "Echte Verbindung",
    description:
      "Sichere Bindung entsteht nicht durch Omnipräsenz, sondern durch Verlässlichkeit. Ein Kind, das weiß, dass es geliebt wird — unabhängig davon, was gerade passiert — kann sich sicher entwickeln.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M14 24s-9-5.5-9-12a6 6 0 0 1 9-5.2A6 6 0 0 1 23 12c0 6.5-9 12-9 12Z"
          stroke="#C47A5A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Klar",
    subtitle: "Verlässliche Struktur",
    description:
      "Grenzen sind keine Liebesentzug — sie sind Liebesbeweis. Ein Kind braucht ein Geländer, bevor es eigenständig die Treppe steigen kann. Konsequenz erzeugt Vorhersehbarkeit. Vorhersehbarkeit erzeugt Sicherheit.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="#C47A5A" strokeWidth="1.5" />
        <path
          d="M14 8v6l4 2"
          stroke="#C47A5A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Verlässlich",
    subtitle: "Konsequente Führung",
    description:
      "Führung bedeutet: Ich handle aus Überzeugung, nicht aus Angst. Ich sage Nein, wenn ich Nein meine — und Ja, wenn ich Ja meine. Auch wenn das Kind dagegen ist. Auch wenn es schwer ist.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M14 4 L20 8 L20 16 C20 20 14 24 14 24 C14 24 8 20 8 16 L8 8 Z"
          stroke="#C47A5A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M11 14l2 2 4-4"
          stroke="#C47A5A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ConceptSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          <div>
            <p className="text-overline text-terra mb-6">Das Konzept</p>
            <h2
              className="heading-section text-deep"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Was ist
              <br />
              Balanced Parenting?
            </h2>
            <div className="divider-terra" />
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-deep/70 text-lg leading-relaxed">
              Balanced Parenting ist kein neuer Erziehungstrend. Es ist die
              wissenschaftlich am besten bestätigte Antwort auf die Frage,
              was Kinder wirklich brauchen — kombiniert mit dem, was Eltern
              wirklich leisten können.
            </p>
            <p className="text-deep/60 text-base leading-relaxed mt-4">
              Sechzig Jahre Forschung, von Diana Baumrind bis heute, zeigen
              dasselbe Ergebnis: Hohe Wärme{" "}
              <em className="font-serif font-medium text-terra">und</em> hohe
              Anforderungen. Beides. Gleichzeitig. Nicht abwechselnd.
            </p>
          </div>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              className="card-hover bg-white p-8 lg:p-10"
              style={{ borderTop: "2px solid #C47A5A" }}
            >
              <div className="flex items-start justify-between mb-8">
                {pillar.icon}
                <span
                  className="font-serif text-cream-dark font-light"
                  style={{ fontSize: "3.5rem", lineHeight: 1 }}
                >
                  {pillar.number}
                </span>
              </div>
              <h3
                className="heading-section text-deep mb-1"
                style={{ fontSize: "2rem" }}
              >
                {pillar.title}
              </h3>
              <p className="text-terra text-sm font-medium tracking-wide mb-5">
                {pillar.subtitle}
              </p>
              <p className="text-deep/65 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom quote + CTA */}
        <div className="mt-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <blockquote
            className="font-serif text-2xl lg:text-3xl italic text-deep/80 max-w-2xl"
            style={{ fontWeight: 300 }}
          >
            „Das authoritative Modell — warm und fordernd — erzeugt in sechzig
            Jahren Forschung, in dutzenden Kulturen, immer dasselbe Ergebnis:
            die resilientesten, sozial kompetentesten Kinder."
          </blockquote>
          <div className="flex-shrink-0">
            <p className="text-overline text-terra mb-3">Diana Baumrind, 1971</p>
            <Link
              href="/balanced-parenting/"
              className="btn-outline btn-outline-dark text-xs"
            >
              Mehr zum Konzept
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
