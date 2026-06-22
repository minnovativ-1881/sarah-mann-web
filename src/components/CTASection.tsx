import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #C47A5A 0%, #9E5E3F 100%)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(245, 239, 230, 0.5) 40px,
            rgba(245, 239, 230, 0.5) 41px
          )`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-overline text-cream/70 mb-6">
            Für Vorträge · Workshops · Medien · Beratung
          </p>
          <h2
            className="heading-section text-cream"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Sarah Mann
            <br />
            als Expertin
            <br />
            gewinnen
          </h2>

          <div className="divider-terra mt-8" style={{ background: "rgba(245, 239, 230, 0.5)" }} />

          <p className="text-cream/80 text-lg leading-relaxed mt-8 max-w-xl">
            Ob Keynote auf Elternabenden, Workshop für Familieneinrichtungen,
            Podcast-Interview oder Medienanfrage — Sarah Mann steht für Auftritte
            zur Verfügung, die Balanced Parenting in den deutschsprachigen Diskurs bringen.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/kontakt/"
              className="bg-cream text-deep px-8 py-4 text-xs font-medium tracking-widest uppercase hover:bg-cream-dark transition-colors duration-200 inline-flex items-center gap-3"
            >
              Anfrage stellen
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
              href="/buch/"
              className="border border-cream/50 text-cream px-8 py-4 text-xs font-medium tracking-widest uppercase hover:bg-cream/10 transition-colors duration-200 inline-flex items-center gap-3"
            >
              Das Buch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
