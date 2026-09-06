"use client";
import { useState } from "react";
import type { Test } from "@/lib/tests";
import { werteAus, ergebnisHtml, ergebnisText } from "@/lib/auswertung";

const box = "bg-cream p-8 lg:p-12 border-2 border-terra";
const schatten = { boxShadow: "0 24px 60px rgba(19,107,115,0.18)" };

export default function TestEngine({ test }: { test: Test }) {
  const [schritt, setSchritt] = useState(0);
  const [werte, setWerte] = useState<number[]>([]);
  /** Nur fuer die kurze Bestaetigung nach dem Klick, kein Richtig-Falsch. */
  const [gewaehlt, setGewaehlt] = useState<number | null>(null);
  const [mail, setMail] = useState("");
  const [vorname, setVorname] = useState("");
  const [freigegeben, setFreigegeben] = useState(false);
  const [sendet, setSendet] = useState(false);
  const [fehler, setFehler] = useState("");

  /**
   * Eine Antwort, ein Klick.
   *
   * Bei den Zuordnungstests stand hier vorher die Aufloesung: Es wurde
   * angezeigt, welche Antwort richtig gewesen waere, und man musste ein
   * zweites Mal auf "Weiter" klicken. Beides ist raus. Die Aufloesung gehoert
   * in die E-Mail, wo Platz fuer eine Erklaerung ist, und ein Klick reicht.
   *
   * Was bleibt, ist eine kurze Bestaetigung: Die gewaehlte Antwort leuchtet
   * einen Moment auf, dann kommt die naechste Frage von selbst. Die
   * Bestaetigung sagt bewusst nur "angekommen" und nicht "richtig".
   */
  const antworten = (wert: number, index: number) => {
    if (gewaehlt !== null) return; // zweiter Klick waehrend der Bestaetigung
    if (test.art !== "zuordnung") {
      setWerte([...werte, wert]);
      setSchritt(schritt + 1);
      return;
    }
    setGewaehlt(index);
    setWerte([...werte, wert]);
    window.setTimeout(() => {
      setGewaehlt(null);
      setSchritt((s) => s + 1);
    }, 520);
  };

  const zurueck = () => {
    if (schritt <= 0 || gewaehlt !== null) return;
    setWerte(werte.slice(0, -1));
    setSchritt(schritt - 1);
  };

  const neu = () => {
    setWerte([]);
    setSchritt(0);
    setGewaehlt(null);
    setFreigegeben(false);
    setFehler("");
  };

  /* ----------------------------- Fragen ----------------------------- */
  if (schritt < test.fragen.length) {
    const f = test.fragen[schritt];
    const pct = Math.round((schritt / test.fragen.length) * 100);
    const bestaetigt = gewaehlt !== null;

    return (
      <div className={box} style={schatten}>
        <div className="flex items-center justify-between mb-6">
          <p className="text-overline text-terra">
            Frage {schritt + 1} von {test.fragen.length}
          </p>
          {schritt > 0 && !bestaetigt && (
            <button
              onClick={zurueck}
              className="text-deep/45 text-xs tracking-wide hover:text-deep transition-colors"
            >
              zurück
            </button>
          )}
        </div>
        <div className="h-px bg-cream-mid mb-9">
          <div
            className="h-px bg-terra transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="text-overline text-terra/70 mb-3">{f.kopf}</p>
        <p
          className="font-serif text-deep mb-9"
          style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", lineHeight: 1.35 }}
        >
          {f.szenario}
        </p>

        <div className="grid gap-3">
          {f.antworten.map((a, i) => {
            const dieseGewaehlt = i === gewaehlt;
            return (
              <button
                key={i}
                onClick={() => antworten(a.wert, i)}
                disabled={bestaetigt}
                aria-pressed={dieseGewaehlt}
                className={`text-left border px-6 py-4 transition-all duration-200 ${
                  dieseGewaehlt
                    ? "border-terra bg-tint-dark text-deep"
                    : bestaetigt
                      ? "border-cream-mid bg-cream text-deep/30"
                      : "border-cream-mid bg-cream text-deep/80 hover:border-terra hover:bg-tint hover:text-deep"
                }`}
                style={
                  dieseGewaehlt
                    ? { boxShadow: "0 0 0 2px rgba(19,107,115,0.35)" }
                    : undefined
                }
              >
                {a.text}
              </button>
            );
          })}
        </div>
        {test.art === "zuordnung" && (
          <p className="text-deep/45 text-xs leading-relaxed mt-7">
            Die Auflösung bekommst du am Ende per E-Mail, Situation für
            Situation und mit Erklärung.
          </p>
        )}
      </div>
    );
  }

  /* --------------------------- Auswertung --------------------------- */
  // Die volle Auswertung, nicht nur der Name des Feldes: Achsen einzeln,
  // stärkste und schwächste Bereiche, Schritte. Genau das geht als fertiges
  // HTML nach KlickTipp, damit die E-Mail nur noch den Platzhalter setzt.
  const aus = werteAus(test, werte);
  const erg = aus.ergebnis;

  /* --------------------- Schranke vor dem Ergebnis ------------------- */
  if (!freigegeben) {
    const absenden = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!mail.includes("@") || !mail.includes(".")) {
        setFehler("Bitte prüf die E-Mail-Adresse noch einmal.");
        return;
      }
      setFehler("");
      setSendet(true);

      // Das Ergebnis geht ausschliesslich per E-Mail. Auf der Seite danach
      // steht deshalb nichts davon, auch nicht in Teilen.
      const ziel = "/danke-bestaetige-deinen-eintrag/";

      // Ein Fehler beim Eintragen darf den Weg zum Ergebnis nicht blockieren.
      try {
        await eintragen({
          mail,
          vorname,
          test: test.slug,
          typ: erg.key,
          ergebnis: erg.name,
          unter: erg.unter,
          html: ergebnisHtml(test, aus),
          klartext: ergebnisText(test, aus),
          punkte: aus.gesamt,
          maximum: aus.max,
          prozent: aus.prozent,
        });
      } catch {
        /* absichtlich still */
      }

      try {
        window.location.assign(ziel);
      } catch {
        // Falls die Weiterleitung nicht greift, wenigstens die Bestaetigung
        // zeigen. Das Ergebnis bleibt auch dann der E-Mail vorbehalten.
        setFreigegeben(true);
        setSendet(false);
      }
    };

    return (
      <div className={box} style={schatten}>
        <p className="text-overline text-terra mb-5">Geschafft</p>
        <h2
          className="font-serif text-deep"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.2 }}
        >
          Wohin soll ich dein
          <br />
          <em className="text-terra italic">Ergebnis schicken?</em>
        </h2>
        <div className="divider-terra" />
        <p
          className="text-deep/80 leading-relaxed mt-6 max-w-xl"
          style={{ fontSize: "1.1rem" }}
        >
          Deine Auswertung ist fertig. Ich schicke sie dir per E-Mail, mit der
          Einordnung und den nächsten Schritten, damit du sie in Ruhe lesen
          kannst und später wiederfindest.
        </p>

        <form onSubmit={absenden} className="mt-9 max-w-xl">
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={vorname}
              onChange={(e) => setVorname(e.target.value)}
              placeholder="Dein Vorname"
              autoComplete="given-name"
              className="border border-cream-mid bg-cream px-4 py-3 text-deep text-sm focus:outline-none focus:border-terra transition-colors"
            />
            <input
              type="email"
              required
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="deine@email.de"
              autoComplete="email"
              className="border border-cream-mid bg-cream px-4 py-3 text-deep text-sm focus:outline-none focus:border-terra transition-colors"
            />
          </div>
          {fehler && (
            <p className="text-terra text-sm mt-3">{fehler}</p>
          )}
          <button
            type="submit"
            disabled={sendet}
            className="btn-primary justify-center mt-4 w-full sm:w-auto disabled:opacity-60"
          >
            {sendet ? "Einen Moment …" : "Ergebnis zuschicken"}
          </button>
          <p className="text-deep/50 text-xs leading-relaxed mt-5">
            Du bekommst dein Ergebnis und danach Sarahs Impulse für klare
            Führung und volle Liebe. Jederzeit mit einem Klick abbestellbar.
            Deine Adresse geht an niemanden weiter.
          </p>
        </form>

        <button
          onClick={neu}
          className="text-deep/40 text-xs tracking-wide hover:text-deep transition-colors mt-8"
        >
          Antworten noch einmal durchgehen
        </button>
      </div>
    );
  }

  /* ------------- Rueckfall, wenn die Weiterleitung nicht greift ------------- */
  /* Auch hier steht das Ergebnis NICHT. Es geht ausschliesslich per E-Mail. */
  return (
    <div className={box} style={schatten}>
      <p className="text-overline text-terra mb-5">Unterwegs</p>
      <h2
        className="font-serif text-deep"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.2 }}
      >
        Deine Auswertung ist raus.
      </h2>
      <div className="divider-terra" />
      <p
        className="text-deep/80 leading-relaxed mt-6 max-w-xl"
        style={{ fontSize: "1.1rem" }}
      >
        Schau bitte in dein Postfach. Dort liegt eine E-Mail mit der Bitte, deine
        Adresse zu bestätigen. Ein Klick darauf, und du bekommst dein Ergebnis.
      </p>
      <p className="text-deep/55 text-sm leading-relaxed mt-6 max-w-xl">
        Nichts angekommen? Gib der Mail zwei Minuten und schau danach im
        Spam-Ordner nach.
      </p>
    </div>
  );
}

/**
 * Eintragung in die Liste.
 *
 * Geht ueber die eigene Route /api/eintrag, damit der KlickTipp-Schluessel auf
 * dem Server bleibt und wir eine echte Antwort bekommen. Die Route antwortet
 * auch dann mit ok, wenn KlickTipp gerade nicht erreichbar ist: kein Fehler
 * darf dazu fuehren, dass jemand sein Ergebnis nicht sieht.
 */
async function eintragen(daten: {
  mail: string;
  vorname: string;
  test: string;
  typ: string;
  ergebnis: string;
  unter: string;
  html: string;
  klartext: string;
  punkte: number;
  maximum: number;
  prozent: number;
}) {
  await fetch("/api/eintrag/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(daten),
  });
}
