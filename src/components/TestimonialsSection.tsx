const testimonials = [
  {
    quote:
      "Nach sechs Monaten Schlaflosigkeit und drei Erziehungsbüchern, die sich widersprochen haben, hat mir Sarah in einer Stunde mehr gegeben als alles andere zusammen: Klarheit. Und die Erlaubnis, Nein zu sagen.",
    name: "Miriam K.",
    detail: "Mutter von zwei Kindern, Beratungsklientin",
  },
  {
    quote:
      "Ich habe mich als Vater oft unsichtbar gefühlt in der Erziehungsdiskussion. Sarahs Ansatz richtet sich an Eltern — beide. Und er funktioniert, weil er ehrlich ist. Nicht weil er das sagt, was man hören will.",
    name: "Thomas R.",
    detail: "Vater von drei Kindern",
  },
  {
    quote:
      "Endlich jemand, der Wissenschaft versteht und trotzdem mit beiden Beinen im Alltag steht. Sarah spricht nicht von oben herab — sie spricht aus Erfahrung. Das merkt man jeder Seite an.",
    name: "Nadja M.",
    detail: "Grundschulpädagogin und Mutter",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-overline text-terra mb-6">Stimmen</p>
          <h2
            className="heading-section text-deep"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Was Eltern sagen
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-cream-mid">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-cream p-10 lg:p-12 flex flex-col"
            >
              {/* Quote mark */}
              <div
                className="font-serif text-terra/25 mb-6 leading-none"
                style={{ fontSize: "5rem", fontWeight: 300, lineHeight: 0.8 }}
                aria-hidden="true"
              >
                &bdquo;
              </div>
              <blockquote className="text-deep/75 leading-relaxed flex-1 italic font-serif text-lg">
                {t.quote}
              </blockquote>
              <div className="mt-8 pt-6 border-t border-cream-mid">
                <p className="text-deep font-normal text-sm">{t.name}</p>
                <p className="text-terra text-xs mt-1">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
