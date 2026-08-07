"use client";
import { useState } from "react";

type Achse = "waerme" | "struktur";

const fragen: { text: string; achse: Achse }[] = [
  { text: "Wenn mein Kind wütend ist, versuche ich zuerst zu verstehen, was in ihm vorgeht.", achse: "waerme" },
  { text: "Ich nehme mir bewusst Zeit für Nähe, auch wenn der Tag anstrengend war.", achse: "waerme" },
  { text: "Mein Kind weiß, dass meine Liebe nicht davon abhängt, ob es gerade brav ist.", achse: "waerme" },
  { text: "Ich zeige meine Zuneigung offen, mit Worten und mit Körperkontakt.", achse: "waerme" },
  { text: "Bei wichtigen Regeln bleibe ich ruhig konsequent, auch wenn mein Kind protestiert.", achse: "struktur" },
  { text: "Ich sage Nein und meine es auch, ohne mich in lange Verhandlungen ziehen zu lassen.", achse: "struktur" },
  { text: "In unserem Alltag gibt es verlässliche Abläufe und klare Grenzen.", achse: "struktur" },
  { text: "Wenn Reden nicht reicht, komme ich freundlich, aber bestimmt ins Handeln.", achse: "struktur" },
];

const skala = ["Trifft gar nicht zu", "Eher nicht", "Eher schon", "Trifft voll zu"];

const typen = {
  warmklar: {
    name: "Warm und klar",
    unter: "Du lebst genau die Balance, die Kinder stark macht.",
    text: "Du gibst deinem Kind Wärme und Halt zugleich. Das ist der Weg, den sechzig Jahre Forschung als den stärksten beschreiben. Sarahs Methode hilft dir, diese Haltung auch dann zu halten, wenn Reden nicht mehr reicht.",
  },
  nachgiebig: {
    name: "Viel Herz, noch wenig Klarheit",
    unter: "Deine Wärme ist ein Geschenk. Jetzt fehlt nur die ruhige Führung.",
    text: "Du bist liebevoll und zugewandt, und das ist die halbe Miete. Was dir und deinem Kind gerade Halt geben würde, ist die klare, ruhige Führung im entscheidenden Moment. Genau dafür ist Sarahs Methode gemacht.",
  },
  kuehl: {
    name: "Klar, aber die Wärme kommt zu kurz",
    unter: "Du gibst Halt. Jetzt darf die Nähe wieder mehr Raum bekommen.",
    text: "Du kannst führen und Grenzen setzen, das ist wertvoll und selten. Damit dein Kind sich sicher anlehnen kann, braucht diese Klarheit spürbare Wärme an ihrer Seite. Sarahs Methode zeigt dir, wie beides zusammengeht.",
  },
  erschoepft: {
    name: "Zwischen den Stühlen, oft erschöpft",
    unter: "Du gibst so viel. Und fühlst dich trotzdem verloren.",
    text: "Zwischen Nachgeben und Strenge, zwischen Schuld und Erschöpfung, ist gerade wenig Boden unter deinen Füßen. Das ist kein Versagen, sondern das Ergebnis eines Modells, das dich verschwinden lässt. Sarahs Methode gibt dir Schritt für Schritt wieder Halt.",
  },
};

export default function ElternTypQuiz() {
  const [step, setStep] = useState(-1); // -1 = Start, 0..7 = Fragen, 8 = Ergebnis
  const [answers, setAnswers] = useState<number[]>([]);
  const [mail, setMail] = useState("");
  const [mailDone, setMailDone] = useState(false);

  const answer = (val: number) => {
    setAnswers([...answers, val]);
    setStep(step + 1);
  };
  const zurueck = () => {
    if (step <= 0) return;
    setAnswers(answers.slice(0, -1));
    setStep(step - 1);
  };
  const reset = () => {
    setAnswers([]);
    setStep(0);
    setMail("");
    setMailDone(false);
  };

  // Startbildschirm
  if (step === -1) {
    return (
      <div className="bg-cream p-8 lg:p-12 text-center">
        <p className="text-deep/75 leading-relaxed max-w-md mx-auto mb-8" style={{ fontSize: "1.1rem" }}>
          Acht kurze Aussagen aus dem echten Familienalltag. Am Ende siehst du, wo
          du zwischen Wärme und Klarheit stehst, und was dein nächster Schritt ist.
        </p>
        <button onClick={() => setStep(0)} className="btn-primary">
          Test starten
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-deep/50 text-xs mt-4 tracking-wide">Dauert zwei Minuten. Kostenlos.</p>
      </div>
    );
  }

  // Fragen
  if (step < fragen.length) {
    const f = fragen[step];
    const pct = Math.round((step / fragen.length) * 100);
    return (
      <div className="bg-cream p-8 lg:p-12">
        {/* Fortschritt */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-overline text-terra">Frage {step + 1} von {fragen.length}</p>
          {step > 0 && (
            <button onClick={zurueck} className="text-deep/45 text-xs tracking-wide hover:text-deep transition-colors">
              zurück
            </button>
          )}
        </div>
        <div className="h-px bg-cream-mid mb-10">
          <div className="h-px bg-terra transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>

        {/* Aussage */}
        <p
          className="font-serif text-deep mb-10"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", lineHeight: 1.3 }}
        >
          {f.text}
        </p>

        {/* Skala */}
        <div className="grid gap-3">
          {skala.map((label, val) => (
            <button
              key={val}
              onClick={() => answer(val)}
              className="text-left border border-cream-mid bg-cream px-6 py-4 text-deep/80 hover:border-terra hover:text-deep transition-colors duration-200"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Ergebnis
  let waerme = 0;
  let struktur = 0;
  fragen.forEach((f, i) => {
    if (f.achse === "waerme") waerme += answers[i] ?? 0;
    else struktur += answers[i] ?? 0;
  });
  const waermeHoch = waerme >= 7;
  const strukturHoch = struktur >= 7;
  const key = waermeHoch && strukturHoch ? "warmklar" : waermeHoch ? "nachgiebig" : strukturHoch ? "kuehl" : "erschoepft";
  const typ = typen[key];

  return (
    <div className="bg-cream p-8 lg:p-12">
      <p className="text-overline text-terra mb-5">Dein Ergebnis</p>
      <h3 className="font-serif text-deep" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}>
        {typ.name}
      </h3>
      <p className="font-serif italic text-terra text-lg lg:text-xl mt-3">{typ.unter}</p>
      <div className="divider-terra" />
      <p className="text-deep/80 leading-relaxed mt-6 max-w-2xl" style={{ fontSize: "1.1rem" }}>
        {typ.text}
      </p>

      {/* E-Mail-Auswertung */}
      <div className="mt-10 bg-cream-dark p-7 lg:p-8 max-w-2xl">
        {!mailDone ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: KlickTipp-Anbindung. Aktuell nur Bestätigung im Client.
              if (mail.includes("@")) setMailDone(true);
            }}
          >
            <p className="font-serif text-deep text-xl mb-2">
              Deine ausführliche Auswertung, kostenlos per E-Mail.
            </p>
            <p className="text-deep/65 text-sm leading-relaxed mb-6">
              Dazu regelmäßig Sarahs Impulse für klare Führung und volle Liebe im
              Alltag. Jederzeit abbestellbar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="deine@email.de"
                className="flex-1 border border-cream-mid bg-cream px-4 py-3 text-deep text-sm focus:outline-none focus:border-terra transition-colors"
              />
              <button type="submit" className="btn-primary justify-center">
                Auswertung anfordern
              </button>
            </div>
          </form>
        ) : (
          <p className="font-serif text-deep text-xl">
            Danke. Schau in dein Postfach, deine Auswertung ist unterwegs.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-6 items-center mt-10">
        <a href="#methode" className="btn-outline btn-outline-dark">
          So hilft dir Sarahs Methode
        </a>
        <button onClick={reset} className="text-deep/50 text-sm tracking-wide hover:text-deep transition-colors">
          Test wiederholen
        </button>
      </div>
    </div>
  );
}
