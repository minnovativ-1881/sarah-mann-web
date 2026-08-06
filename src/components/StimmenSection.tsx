const gedanken = [
  "Ich kann nicht mehr.",
  "Seine Bedürfnisse gehen immer über meine, und das will ich nicht mehr.",
  "Bedürfnisorientiert heißt nicht, dass meine Bedürfnisse nicht zählen.",
  "Ich fühle mich wie die schlechteste Mutter.",
  "Ich bin selbst so aufgewachsen, und alles in mir schreit.",
  "Ein Konflikt nach dem anderen. Ich will einfach nur meine Ruhe.",
  "Der hohe Anspruch an mich selbst hat mich ein Stück weit krank gemacht.",
  "Bin ich zu streng, oder mache ich mir zu viele Gedanken?",
];

export default function StimmenSection() {
  return (
    <section className="section-padding bg-cream-dark">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-14">
          <p className="text-overline text-terra mb-6">Was viele Eltern denken</p>
          <h2
            className="heading-section text-deep"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Und selten laut aussprechen.
          </h2>
          <div className="divider-terra" />
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-cream-mid">
          {gedanken.map((g, i) => (
            <div key={i} className="bg-cream p-8 lg:p-10">
              <p className="font-serif italic text-deep/80 text-xl leading-relaxed">
                „{g}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-2xl">
          <p className="body-text text-deep/85">
            Wenn du dich hier wiederfindest: Du machst nichts falsch. Dir wurde ein
            Erziehungsmodell verkauft, das dich langsam verschwinden lässt. Immer
            verfügbar, immer erklärend, immer schuld. Es geht auch anders.
          </p>
        </div>
      </div>
    </section>
  );
}
