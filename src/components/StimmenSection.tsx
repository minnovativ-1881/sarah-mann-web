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
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-overline text-terra mb-6">Was viele Eltern denken</p>
          <h2
            className="heading-section text-deep"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Und selten laut aussprechen.
          </h2>
          <div className="divider-terra" />
          <p className="text-deep/70 leading-relaxed mt-8 font-normal">
            Das sind keine erfundenen Sätze. Es sind echte Gedanken von Eltern, aus
            Foren, aus Beratungen, aus schlaflosen Nächten. Vielleicht ist einer
            davon deiner.
          </p>
        </div>

        {/* Zitat-Karten */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gedanken.map((g, i) => (
            <div
              key={i}
              className="bg-cream p-8 lg:p-9 flex flex-col justify-between card-hover"
              style={{ minHeight: "11rem" }}
            >
              <span
                className="font-serif text-terra/25 leading-none"
                style={{ fontSize: "3.5rem", lineHeight: 0.7 }}
                aria-hidden="true"
              >
                &bdquo;
              </span>
              <p className="font-serif italic text-deep/85 text-lg lg:text-xl leading-relaxed mt-2">
                {g}
              </p>
            </div>
          ))}
        </div>

        {/* Der Abhol-Text, volle Breite */}
        <div className="mt-20 border-t-2 border-terra pt-14 max-w-4xl">
          <div className="space-y-6 text-deep/80" style={{ fontSize: "1.2rem", lineHeight: 1.75 }}>
            <p>
              Wenn du dich in diesen Sätzen wiederfindest, dann lies bitte langsam
              weiter.
            </p>
            <p className="font-serif italic text-deep" style={{ fontSize: "1.75rem", lineHeight: 1.4 }}>
              Du machst nichts falsch.
            </p>
            <p>
              Dir wurde ein Erziehungsmodell verkauft, das nur eine Richtung kennt:
              das Kind zuerst, immer. Spiegle seine Gefühle, erfülle seine
              Bedürfnisse, erkläre jede Grenze, bleib geduldig. Und wenn es nicht
              funktioniert, dann warst du eben noch nicht geduldig genug.
            </p>
            <p>
              Niemand hat dir gesagt, wohin dieser Weg führt. Er führt dazu, dass{" "}
              <strong className="text-deep font-medium">du langsam verschwindest</strong>.
              Immer verfügbar, immer erklärend, immer schuld. Bis du selbst nicht
              mehr weißt, wo du in all dem noch vorkommst.
            </p>
            <p className="text-deep font-normal">
              Das ist keine Liebe. Das ist Selbstaufgabe.
            </p>
            <p>
              Dein Kind braucht keine Mutter, die sich selbst verliert. Es braucht
              eine, die{" "}
              <strong className="text-deep font-medium">da ist, klar ist und bei sich bleibt</strong>.
              Ein Kind, das spürt, dass jemand ruhig die Führung hält, muss sie
              nicht selbst übernehmen. Es darf endlich Kind sein.
            </p>
            <p className="font-serif italic text-terra" style={{ fontSize: "1.6rem", lineHeight: 1.4 }}>
              Es geht auch anders. Wärmer für dich, klarer für dein Kind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
