import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="section-padding relative overflow-hidden bg-midnight"
    >
      {/* Sehr dezenter warmer Lichtschein */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 20%, rgba(168,155,140,0.10) 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-overline text-stone mb-8">
            Vortr&auml;ge &middot; Workshops &middot; Medien &middot; Beratung
          </p>
          <h2
            className="heading-display text-cream"
            style={{ fontSize: "clamp(3rem, 6vw, 5.25rem)" }}
          >
            Sarah Mann
            <br />
            als Expertin
            <br />
            <em className="italic text-stone">gewinnen</em>
          </h2>

          <div className="flex flex-wrap gap-4 mt-12">
            <Link
              href="/kontakt/"
              className="bg-cream text-deep px-8 py-4 text-xs font-medium tracking-widest uppercase hover:bg-cream-dark transition-colors duration-300 inline-flex items-center gap-3"
            >
              Anfrage stellen
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/buch/"
              className="btn-outline btn-outline-light"
            >
              Das Buch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
