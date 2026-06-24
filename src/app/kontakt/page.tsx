import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kontakt & Anfragen | Sarah Mann",
  description:
    "Vorträge, Workshops, Medienanfragen und Beratung — hier können Sie Sarah Mann erreichen.",
};

const options = [
  {
    title: "Vortrag & Keynote",
    desc: "Balanced Parenting als Keynote auf Elternabenden, Fachkonferenzen oder Unternehmensveranstaltungen. 30–90 Minuten, live oder digital.",
  },
  {
    title: "Workshop",
    desc: "Interaktive Workshops für Elterngruppen, Familieneinrichtungen, Kindergärten und Schulen. Halb- und ganztägig.",
  },
  {
    title: "Medienanfrage",
    desc: "Podcast-Interview, Printartikel, TV oder Radio. Sarah Mann steht als Expertin für Balanced Parenting zur Verfügung.",
  },
  {
    title: "Buchinfos & Leseprobe",
    desc: "Interesse an 'Wer liebt, führt'? Leseprobe, Rezensionsexemplar oder Presseinformationen.",
  },
];

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-cream-dark pt-44 pb-28 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <p className="text-overline text-terra mb-8">Kontakt</p>
            <h1
              className="heading-display text-deep"
              style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}
            >
              Anfrage
              <br />
              <em className="text-terra italic">stellen</em>
            </h1>
            <div className="divider-terra mt-8" />
            <p className="text-deep/65 text-xl leading-relaxed mt-8 max-w-xl font-normal">
              Für Vorträge, Workshops, Medienanfragen, Buchinfos und
              Beratungsprojekte.
            </p>
          </div>
        </section>

        {/* Options */}
        <section className="section-padding bg-cream">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <p className="text-overline text-terra mb-10">Was passt zu Ihnen?</p>
            <div className="grid md:grid-cols-2 gap-px bg-cream-mid mb-20">
              {options.map((opt, i) => (
                <div
                  key={opt.title}
                  className="bg-cream p-10 card-hover"
                >
                  <div className="flex items-baseline justify-between mb-6">
                    <h3 className="font-serif text-deep text-2xl">{opt.title}</h3>
                    <span className="font-serif text-stone/50 font-normal" style={{ fontSize: "1.75rem", lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-deep/60 text-sm leading-relaxed font-normal">{opt.desc}</p>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="max-w-2xl">
              <p className="text-overline text-terra mb-8">Ihre Nachricht</p>
              <form
                action="mailto:hallo@sarahmann.de"
                method="get"
                encType="text/plain"
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-deep/60 mb-2 tracking-wide uppercase">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full border border-cream-mid bg-cream px-4 py-3 text-deep text-sm focus:outline-none focus:border-terra transition-colors"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-deep/60 mb-2 tracking-wide uppercase">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full border border-cream-mid bg-cream px-4 py-3 text-deep text-sm focus:outline-none focus:border-terra transition-colors"
                      placeholder="ihre@email.de"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="anliegen" className="block text-xs font-medium text-deep/60 mb-2 tracking-wide uppercase">
                    Art der Anfrage
                  </label>
                  <select
                    id="anliegen"
                    name="anliegen"
                    className="w-full border border-cream-mid bg-cream px-4 py-3 text-deep text-sm focus:outline-none focus:border-terra transition-colors"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="vortrag">Vortrag / Keynote</option>
                    <option value="workshop">Workshop</option>
                    <option value="medien">Medienanfrage</option>
                    <option value="buch">Buch / Leseprobe</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="nachricht" className="block text-xs font-medium text-deep/60 mb-2 tracking-wide uppercase">
                    Nachricht *
                  </label>
                  <textarea
                    id="nachricht"
                    name="body"
                    required
                    rows={6}
                    className="w-full border border-cream-mid bg-cream px-4 py-3 text-deep text-sm focus:outline-none focus:border-terra transition-colors resize-none"
                    placeholder="Beschreiben Sie kurz Ihr Anliegen — Termin, Format, Zielgruppe..."
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Anfrage senden
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>

              <p className="text-deep/58 text-xs mt-6">
                Oder direkt per E-Mail:{" "}
                <a href="mailto:hallo@sarahmann.de" className="text-terra hover:underline">
                  hallo@sarahmann.de
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
