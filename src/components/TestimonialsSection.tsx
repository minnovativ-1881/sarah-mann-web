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
    <section className="section-padding bg-deep">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-overline text-terra mb-6">Stimmen</p>
          <h2
            className="heading-section text-cream"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Was Eltern sagen
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-midnight p-8 lg:p-10 flex flex-col"
              style={{ borderTop: "1px solid rgba(196, 122, 90, 0.3)" }}
            >
              {/* Quote mark */}
              <div
                className="font-serif text-terra/30 mb-6 leading-none"
                style={{ fontSize: "5rem", fontWeight: 300, lineHeight: 0.8 }}
                aria-hidden="true"
              >
                "
              </div>
              <blockquote className="text-cream/75 text-sm leading-relaxed flex-1 italic font-serif text-base">
                {t.quote}
              </blockquote>
              <div className="mt-8 pt-6 border-t border-cream/10">
                <p className="text-cream font-medium text-sm">{t.name}</p>
                <p className="text-terra/70 text-xs mt-1">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
