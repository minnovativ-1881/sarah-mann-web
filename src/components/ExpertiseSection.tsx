const topics = [
  {
    title: "Balanced Parenting",
    desc: "Das wissenschaftliche Gegenmodell zu anxious, child-focused Erziehung.",
  },
  {
    title: "Schlaf als Führungsaufgabe",
    desc: "Warum der Abend zeigt, wer in der Familie führt.",
  },
  {
    title: "Bindung richtig verstehen",
    desc: "Was Bowlby wirklich meinte — und wie sichere Bindung wirklich entsteht.",
  },
  {
    title: "Die Schuldindustrie",
    desc: "Wie Social Media aus Erziehung ein Schuldgefühl-System machte.",
  },
  {
    title: "Gehirn und Grenzen",
    desc: "Was Neurowissenschaft über kindliche Entwicklung sagt.",
  },
  {
    title: "Pubertät & psychische Gesundheit",
    desc: "Was in der Jugend sichtbar wird, wenn frühe Fundamente fehlen.",
  },
];

export default function ExpertiseSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-16">
          <p className="text-overline text-terra mb-6">Expertise</p>
          <h2
            className="heading-section text-deep"
            style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
          >
            Themen &amp; Schwerpunkte
          </h2>
          <div className="divider-terra" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream-mid">
          {topics.map((topic, i) => (
            <div key={topic.title} className="bg-cream p-10 group card-hover">
              <div className="flex items-start justify-between mb-8">
                <span
                  className="font-serif text-cream-mid font-light"
                  style={{ fontSize: "2.5rem", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="text-terra opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1"
                  aria-hidden="true"
                >
                  <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-deep font-medium text-lg mb-3 group-hover:text-terra transition-colors duration-200">
                {topic.title}
              </h3>
              <p className="text-deep/55 text-sm leading-relaxed">{topic.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <a href="/kontakt/" className="btn-primary">
            Vortrag oder Workshop anfragen
          </a>
          <a href="/kontakt/" className="btn-outline btn-outline-dark">
            Medienanfrage
          </a>
        </div>

      </div>
    </section>
  );
}
