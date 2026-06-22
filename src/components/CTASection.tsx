import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #C47A5A 0%, #9E5E3F 100%)" }}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-overline text-cream/60 mb-8">
            Vortr&auml;ge &middot; Workshops &middot; Medien &middot; Beratung
          </p>
          <h2
            className="heading-display text-cream"
            style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
          >
            Sarah Mann
            <br />
            als Expertin
            <br />
            gewinnen
          </h2>

          <div className="flex flex-wrap gap-4 mt-12">
            <Link
              href="/kontakt/"
              className="bg-cream text-deep px-8 py-4 text-xs font-medium tracking-widest uppercase hover:bg-cream-dark transition-colors duration-200 inline-flex items-center gap-3"
            >
              Anfrage stellen
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
