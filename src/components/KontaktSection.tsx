export default function KontaktSection() {
  return (
    <section id="kontakt" className="section-padding bg-cream scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Text */}
          <div>
            <p className="text-overline text-terra mb-6">Kontakt</p>
            <h2
              className="heading-section text-deep"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Schreib Sarah.
            </h2>
            <div className="divider-terra" />
            <p className="body-text text-deep/80 mt-8">
              Für Presseanfragen, Podcast-Interviews oder einfach ein persönliches
              Wort: Sarah freut sich über deine Nachricht.
            </p>
            <p className="text-deep/70 mt-6 font-normal">
              Oder direkt per E-Mail:{" "}
              <a href="mailto:hallo@sarahmann.de" className="text-terra hover:underline">
                hallo@sarahmann.de
              </a>
            </p>
          </div>

          {/* Formular */}
          <form
            action="mailto:hallo@sarahmann.de"
            method="get"
            encType="text/plain"
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="k-name" className="block text-xs font-medium text-deep/60 mb-2 tracking-wide uppercase">
                  Name
                </label>
                <input
                  type="text"
                  id="k-name"
                  name="Name"
                  required
                  className="w-full border border-cream-mid bg-cream px-4 py-3 text-deep text-sm focus:outline-none focus:border-terra transition-colors"
                  placeholder="Dein Name"
                />
              </div>
              <div>
                <label htmlFor="k-mail" className="block text-xs font-medium text-deep/60 mb-2 tracking-wide uppercase">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="k-mail"
                  name="E-Mail"
                  required
                  className="w-full border border-cream-mid bg-cream px-4 py-3 text-deep text-sm focus:outline-none focus:border-terra transition-colors"
                  placeholder="deine@email.de"
                />
              </div>
            </div>
            <div>
              <label htmlFor="k-msg" className="block text-xs font-medium text-deep/60 mb-2 tracking-wide uppercase">
                Nachricht
              </label>
              <textarea
                id="k-msg"
                name="Nachricht"
                required
                rows={5}
                className="w-full border border-cream-mid bg-cream px-4 py-3 text-deep text-sm focus:outline-none focus:border-terra transition-colors resize-none"
                placeholder="Worum geht es?"
              />
            </div>
            <button type="submit" className="btn-primary">
              Nachricht senden
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
