const topics = [
  {
    title: "Balanced Parenting",
    desc: "Das wissenschaftlich fundierte Gegenmodell zu anxious, child-focused Erziehung. Warm und klar. Für alle Entwicklungsphasen.",
  },
  {
    title: "Schlaf als Führungsaufgabe",
    desc: "Warum der Abend zeigt, wer in der Familie führt — und wie gesunder Kinderschlaf konkret aussieht.",
  },
  {
    title: "Bindung richtig verstehen",
    desc: "Was Bowlby und Ainsworth wirklich erforscht haben — und wie sichere Bindung durch Verlässlichkeit entsteht, nicht durch Omnipräsenz.",
  },
  {
    title: "Die Schuldindustrie",
    desc: "Wie Social Media aus Erziehung ein Schuldgefühl-System gemacht hat — und wie Eltern da herausfinden.",
  },
  {
    title: "Gehirn und Grenzen",
    desc: "Was Neurowissenschaft über kindliche Entwicklung, Stressregulation und den präfrontalen Kortex sagt.",
  },
  {
    title: "Pubertät und psychische Gesundheit",
    desc: "Warum die Schuljahre die entscheidendsten sind — und was in der Jugend sichtbar wird, wenn frühe Fundamente fehlen.",
  },
];

export default function ExpertiseSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-between mb-16">
          <div>
            <p className="text-overline text-terra mb-6">Expertise</p>
            <h2
              className="heading-section text-deep"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
            >
              Themen & Schwerpunkte
            </h2>
            <div className="divider-terra" />
          </div>
          <p className="text-deep/60 leading-relaxed lg:max-w-md">
            Sarah Mann steht für Vorträge, Workshops, Podcast-Interviews,
            Medienanfragen und Beratungsprojekte zur Verfügung. Als
            deutschsprachige Expertin für Balanced Parenting verbindet sie
            Forschung mit praktischer Erfahrung.
          </p>
        </div>

        {/* Topic grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream-mid">
          {topics.map((topic, i) => (
            <div
              key={topic.title}
              className="bg-cream p-8 lg:p-10 card-hover group"
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="font-serif text-cream-mid font-light"
                  style={{ fontSize: "2.5rem", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-terra opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10h12M10 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-deep font-medium text-lg mb-3 group-hover:text-terra transition-colors duration-200">
                {topic.title}
              </h3>
              <p className="text-deep/60 text-sm leading-relaxed">{topic.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <a href="/kontakt/" className="btn-primary">
            Vortrag oder Workshop anfragen
          </a>
          <a href="/kontakt/" className="btn-outline btn-outline-dark">
            Medienanfrage stellen
          </a>
        </div>
      </div>
    </section>
  );
}
