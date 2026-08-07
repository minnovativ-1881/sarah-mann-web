const schritte = [
  {
    titel: "Verbinden",
    text: "Kurz zuwenden, das Gefühl anerkennen. Ein Satz, keine Therapiesitzung.",
  },
  {
    titel: "Entscheiden",
    text: "Grenze, Bitte oder Präferenz? Innerlich klar werden, was jetzt wirklich gilt.",
  },
  {
    titel: "Handeln",
    text: "Bei einer Grenze ruhig und freundlich ins Tun kommen, ohne weiter zu diskutieren.",
  },
  {
    titel: "Zurückfinden",
    text: "Wenn der Sturm vorbei ist, wieder zueinander. Kein Nachtreten. Die Beziehung bleibt heil.",
  },
];

const arten = [
  { name: "Grenze", text: "Nicht verhandelbar. Sicherheit, Gesundheit, Werte. Hier führe ich." },
  { name: "Bitte", text: "Ich wünsche es mir, das Kind darf Nein sagen. Hier bleibe ich beweglich." },
  { name: "Präferenz", text: "Eigentlich nur Gewohnheit. Hier lasse ich los." },
];

export default function MethodeSection() {
  return (
    <>
      {/* Teil 1: Die Methode und die Kern-Frage */}
      <section id="methode" className="section-padding bg-cream-dark scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-14">
            <p className="text-overline text-terra mb-6">Sarahs Methode</p>
            <h2
              className="heading-section text-deep"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
            >
              Wenn Reden nicht mehr reicht.
            </h2>
            <div className="divider-terra" />
            <p className="body-text text-deep/85 mt-8">
              Die meisten Ratgeber geben dir Sätze. Sarah gibt dir einen Weg für
              den Moment, in dem Erklären nicht mehr wirkt. Nicht durch mehr Reden,
              sondern durch ruhiges Handeln.
            </p>
          </div>

          {/* Kern-Frage, als helle Box abgesetzt */}
          <div className="bg-cream border-l-2 border-terra p-8 lg:p-12">
            <p className="study-source mb-4">Die eine Frage, die sofort entlastet</p>
            <p
              className="font-serif text-deep italic mb-8"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.25 }}
            >
              Ist das eine Grenze, eine Bitte oder eine Präferenz?
            </p>
            <div className="grid sm:grid-cols-3 gap-8">
              {arten.map((a) => (
                <div key={a.name}>
                  <p className="text-terra font-medium mb-2 uppercase tracking-widest text-xs">
                    {a.name}
                  </p>
                  <p className="text-deep/75 text-sm leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
            <p className="text-deep/60 text-sm mt-8 leading-relaxed">
              Die meisten Machtkämpfe entstehen, weil eine Präferenz behandelt wird
              wie eine Grenze. Diese Frage nimmt sofort Druck heraus.
            </p>
          </div>
        </div>
      </section>

      {/* Teil 2: Die vier Schritte */}
      <section className="section-padding bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-12">
            <p className="text-overline text-terra mb-5">Der Weg durch den Moment</p>
            <h2
              className="heading-section text-deep"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Die vier Schritte.
            </h2>
            <div className="divider-terra" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-cream-mid">
            {schritte.map((s, i) => (
              <div key={s.titel} className="bg-cream-dark p-8">
                <span
                  className="font-serif text-stone/50 font-normal"
                  style={{ fontSize: "2.5rem", lineHeight: 1 }}
                >
                  {i + 1}
                </span>
                <h3 className="font-serif text-deep text-2xl mt-4 mb-3">{s.titel}</h3>
                <p className="text-deep/80 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          <p className="text-deep/70 text-base mt-10 max-w-3xl leading-relaxed font-normal">
            Verbinden und Zurückfinden sind die volle Liebe. Entscheiden und Handeln
            sind die klare Führung. Und das Handeln sieht in jedem Alter anders aus:
            beim Kleinkind heißt es begleiten, beim Schulkind die natürliche Folge
            wirken lassen, beim Teenager die Vereinbarung.
          </p>
        </div>
      </section>
    </>
  );
}
