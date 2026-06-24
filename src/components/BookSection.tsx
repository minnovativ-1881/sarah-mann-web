import Link from "next/link";

function CoverHaupt() {
  return (
    <div
      className="relative overflow-hidden mx-auto"
      style={{ aspectRatio: "2/3", maxWidth: "240px", width: "100%", boxShadow: "0 30px 60px rgba(12,58,64,0.22)" }}
    >
      <div
        className="absolute inset-0 flex flex-col"
        style={{ background: "linear-gradient(160deg, #15727B 0%, #0C3A40 100%)" }}
      >
        <div className="h-px bg-stone" />
        <div className="flex-1 flex flex-col justify-between p-7">
          <p className="text-stone text-[0.6rem] tracking-widest uppercase">Sarah Mann</p>
          <div>
            <h3 className="font-serif text-cream leading-none" style={{ fontSize: "2.4rem", fontWeight: 500 }}>
              Wer
              <br />
              liebt,
              <br />
              <em className="text-stone italic">führt.</em>
            </h3>
            <div className="h-px bg-stone/40 my-4" />
            <p className="text-cream/50 text-[0.65rem] leading-relaxed">
              Warum Kinder Grenzen brauchen
            </p>
          </div>
          <p className="text-cream/30 text-[0.6rem]">Mutter von sieben Kindern</p>
        </div>
      </div>
    </div>
  );
}

function CoverSchlaf() {
  return (
    <div
      className="relative overflow-hidden mx-auto border border-cream-mid"
      style={{ aspectRatio: "2/3", maxWidth: "240px", width: "100%", boxShadow: "0 30px 60px rgba(28,27,24,0.12)" }}
    >
      <div
        className="absolute inset-0 flex flex-col"
        style={{ background: "linear-gradient(160deg, #FBF9F5 0%, #ECE8E0 100%)" }}
      >
        <div className="h-px bg-terra" />
        <div className="flex-1 flex flex-col justify-between p-7">
          <p className="text-terra text-[0.6rem] tracking-widest uppercase">Sarah Mann</p>
          <div>
            <h3 className="font-serif text-deep leading-none" style={{ fontSize: "2.4rem", fontWeight: 500 }}>
              Dein
              <br />
              Baby
              <br />
              darf
              <br />
              <em className="text-terra italic">schlafen</em>
            </h3>
            <div className="h-px bg-terra/30 my-4" />
            <p className="text-deep/50 text-[0.65rem] leading-relaxed">
              Bindungsbewusst und klar
            </p>
          </div>
          <p className="text-deep/55 text-[0.6rem]">Babyschlaf, sanft und mit Plan</p>
        </div>
      </div>
    </div>
  );
}

const books = [
  {
    cover: <CoverHaupt />,
    label: "Das Hauptbuch",
    desc: "Das Manifest der Bewegung. Warum Kinder Grenzen brauchen, und Eltern die Erlaubnis, sie zu setzen.",
  },
  {
    cover: <CoverSchlaf />,
    label: "Der Babyschlaf-Ratgeber",
    desc: "Bindungsbewusst und klar zu ruhigen Nächten. Ohne Schreienlassen, und ohne dich selbst aufzugeben.",
  },
];

export default function BookSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-overline text-terra mb-6">Balanced Parenting &middot; Die Bücher</p>
          <h2
            className="heading-section text-deep"
            style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
          >
            Eine Bewegung.
            <br />
            Mehrere Bücher.
          </h2>
          <div className="divider-terra" />
          <p className="text-deep/60 leading-relaxed mt-8 font-normal text-lg">
            Sarah Mann schreibt nicht ein Buch, sondern baut eine Bewegung für Erziehung mit
            Wärme und Klarheit. Den Anfang machen zwei Bücher.
          </p>
        </div>

        {/* Two books */}
        <div className="grid md:grid-cols-2 gap-px bg-cream-mid">
          {books.map((b) => (
            <div key={b.label} className="bg-cream p-10 lg:p-12">
              {b.cover}
              <div className="mt-10 text-center">
                <p className="text-overline text-terra mb-3">{b.label}</p>
                <p className="font-serif italic text-deep/62 text-sm mb-4">Erscheint September 2026</p>
                <p className="text-deep/60 text-sm leading-relaxed font-normal max-w-xs mx-auto">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Coming */}
        <p className="text-center font-serif italic text-deep/68 text-lg mt-12 max-w-2xl mx-auto">
          Und Kinderbücher, die Kinder stark machen, und die sie selbst lesen. In Vorbereitung.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <Link href="/buch/" className="btn-primary">
            Zu den Büchern
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/kontakt/" className="btn-outline btn-outline-dark">
            Leseprobe anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
