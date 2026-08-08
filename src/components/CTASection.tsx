import Link from "next/link";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden bg-midnight">
      {/* Atmosphaerisches Hintergrundbild */}
      <Image
        src="/bilder/hand-in-hand.webp"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        style={{ objectFit: "cover", objectPosition: "center 45%", opacity: 0.28 }}
      />
      {/* Dunkles Overlay fuer Textkontrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(12,58,64,0.92) 0%, rgba(12,58,64,0.72) 45%, rgba(12,58,64,0.4) 100%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          {/* TODO: Bewegungsname einsetzen, sobald aus der Recherche entschieden. */}
          <p className="text-overline text-stone mb-8">Die Bewegung wächst</p>
          <h2
            className="heading-display text-cream"
            style={{ fontSize: "clamp(3rem, 6vw, 5.25rem)" }}
          >
            Wärme.
            <br />
            Klarheit.
            <br />
            <em className="italic text-stone">Und du mittendrin.</em>
          </h2>
          <p
            className="text-cream/80 leading-relaxed mt-8 max-w-lg font-normal"
            style={{ fontSize: "1.1rem" }}
          >
            Finde heraus, wo du stehst, und bekomme Impulse, die dich als
            Elternteil stärken. Kein erhobener Zeigefinger. Nur Wärme und
            Klarheit, wissenschaftlich fundiert.
          </p>

          <div className="flex flex-wrap gap-4 mt-12">
            <Link
              href="/#quiz"
              className="bg-cream text-deep px-8 py-4 text-xs font-medium tracking-widest uppercase hover:bg-cream-dark transition-colors duration-300 inline-flex items-center gap-3"
            >
              Test starten
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/#kontakt" className="btn-outline btn-outline-light">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
