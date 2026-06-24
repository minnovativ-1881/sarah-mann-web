export default function ProblemSection() {
  const stats = [
    {
      num: "35%",
      label: "Eltern berichten Versagensgefühle",
      sub: "Edelstein et al., PLOS ONE 2024",
      icon: (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M18 30s-11-7-11-15a8 8 0 0 1 11-7.4A8 8 0 0 1 29 15c0 8-11 15-11 15Z" stroke="#4A4F3C" strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M18 20v-6M18 23v1" stroke="#4A4F3C" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: "53%",
      label: "Jugendliche chronisch erschöpft",
      sub: "DAK Jugendreport 2025",
      icon: (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="14" r="7" stroke="#4A4F3C" strokeWidth="1.25" />
          <path d="M8 30c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#4A4F3C" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M13 13.5c1-2 7-2 8 0" stroke="#4A4F3C" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M15 16h6" stroke="#4A4F3C" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: "1/6",
      label: "Kinder psychisch auffällig",
      sub: "RKI KiGGS Welle 2",
      icon: (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M18 6 L32 30 L4 30 Z" stroke="#4A4F3C" strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M18 16v6M18 25v1" stroke="#4A4F3C" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-overline text-terra mb-6">Warum es Zeit ist</p>
          <h2
            className="heading-section text-deep"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Mehr Wissen. Mehr Schuld.{" "}
            <em className="text-terra italic">Weniger Vertrauen.</em>
          </h2>
        </div>

        {/* Stats row */}
        <div className="grid md:grid-cols-3 gap-px bg-cream-mid">
          {stats.map((s) => (
            <div key={s.num} className="bg-cream text-center px-10 py-16">
              {/* Icon */}
              <div className="flex justify-center mb-8">{s.icon}</div>

              {/* Big number */}
              <div
                className="font-serif text-deep"
                style={{ fontSize: "clamp(4.5rem, 8vw, 7rem)", fontWeight: 300, lineHeight: 1 }}
              >
                {s.num}
              </div>

              {/* Label */}
              <p className="text-deep/65 text-base mt-6 leading-snug font-light">
                {s.label}
              </p>

              {/* Source */}
              <p className="text-terra text-xs mt-3 tracking-wide">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className="mt-20 max-w-2xl mx-auto text-center">
          <p className="font-serif text-2xl lg:text-3xl italic text-deep/70" style={{ fontWeight: 300 }}>
            &bdquo;Was Eltern fehlt, ist nicht mehr Wissen.
            Was Eltern fehlt, ist die Erlaubnis,
            sich selbst zu vertrauen.&ldquo;
          </p>
          <p className="text-overline text-terra mt-6">&mdash; Sarah Mann</p>
        </div>

      </div>
    </section>
  );
}
