"use client";
import { useState } from "react";
import Link from "next/link";
import type { Test, Ergebnis } from "@/lib/tests";

const box = "bg-cream p-8 lg:p-12 border-2 border-terra";
const schatten = { boxShadow: "0 24px 60px rgba(19,107,115,0.18)" };

function ermittleErgebnis(test: Test, punkte: Record<string, number>): Ergebnis {
  if (test.art === "matrix") {
    const lage: Record<string, "hoch" | "niedrig"> = {};
    for (const a of test.achsen) {
      lage[a.key] =
        (punkte[a.key] ?? 0) >= (a.schwelle ?? Math.ceil(a.max * 0.67))
          ? "hoch"
          : "niedrig";
    }
    const treffer = test.ergebnisse.find((e) =>
      e.lage ? Object.entries(e.lage).every(([k, v]) => lage[k] === v) : false,
    );
    return treffer ?? test.ergebnisse[test.ergebnisse.length - 1];
  }
  const summe = Object.values(punkte).reduce((a, b) => a + b, 0);
  const treffer = test.ergebnisse.find(
    (e) => summe >= (e.von ?? 0) && summe <= (e.bis ?? Number.MAX_SAFE_INTEGER),
  );
  return treffer ?? test.ergebnisse[test.ergebnisse.length - 1];
}

export default function TestEngine({ test }: { test: Test }) {
  const [schritt, setSchritt] = useState(0);
  const [werte, setWerte] = useState<number[]>([]);
  const [gezeigt, setGezeigt] = useState<number | null>(null);
  const [mail, setMail] = useState("");
  const [vorname, setVorname] = useState("");
  const [freigegeben, setFreigegeben] = useState(false);
  const [sendet, setSendet] = useState(false);
  const [fehler, setFehler] = useState("");

  const antworten = (wert: number, index: number) => {
    if (test.art === "zuordnung" && gezeigt === null) {
      setGezeigt(index);
      setWerte([...werte, wert]);
      return;
    }
    setWerte([...werte, wert]);
    setSchritt(schritt + 1);
  };

  const weiter = () => {
    setGezeigt(null);
    setSchritt(schritt + 1);
  };

  const zurueck = () => {
    if (schritt <= 0) return;
    setWerte(werte.slice(0, -1));
    setGezeigt(null);
    setSchritt(schritt - 1);
  };

  const neu = () => {
    setWerte([]);
    setSchritt(0);
    setGezeigt(null);
    setFreigegeben(false);
    setFehler("");
  };

  /* ----------------------------- Fragen ----------------------------- */
  if (schritt < test.fragen.length) {
    const f = test.fragen[schritt];
    const pct = Math.round((schritt / test.fragen.length) * 100);
    const zeigeAufloesung = test.art === "zuordnung" && gezeigt !== null;

    return (
      <div className={box} style={schatten}>
        <div className="flex items-center justify-between mb-6">
          <p className="text-overline text-terra">
            Frage {schritt + 1} von {test.fragen.length}
          </p>
          {schritt > 0 && !zeigeAufloesung && (
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

        {!zeigeAufloesung ? (
          <div className="grid gap-3">
            {f.antworten.map((a, i) => (
              <button
                key={i}
                onClick={() => antworten(a.wert, i)}
                className="text-left border border-cream-mid bg-cream px-6 py-4 text-deep/80 hover:border-terra hover:bg-cream-dark hover:text-deep transition-colors duration-200"
              >
                {a.text}
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div className="grid gap-3 mb-7">
              {f.antworten.map((a, i) => {
                const richtig = a.wert === 1;
                const gewaehlt = i === gezeigt;
                return (
                  <div
                    key={i}
                    className={`border px-6 py-4 text-sm ${
                      richtig
                        ? "border-terra bg-cream-dark text-deep"
                        : gewaehlt
                          ? "border-stone bg-cream text-deep/60"
                          : "border-cream-mid bg-cream text-deep/40"
                    }`}
                  >
                    {a.text}
                    {richtig && (
                      <span className="text-terra text-xs tracking-widest uppercase ml-3">
                        richtig
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            {f.aufloesung && (
              <p className="text-deep/80 leading-relaxed border-l-2 border-terra pl-5 mb-8">
                {f.aufloesung}
              </p>
            )}
            <button onClick={weiter} className="btn-primary">
              {schritt + 1 === test.fragen.length ? "Zum Ergebnis" : "Weiter"}
            </button>
          </div>
        )}
      </div>
    );
  }

  /* --------------------------- Auswertung --------------------------- */
  const punkte: Record<string, number> = {};
  test.fragen.forEach((f, i) => {
    punkte[f.achse] = (punkte[f.achse] ?? 0) + (werte[i] ?? 0);
  });
  const erg = ermittleErgebnis(test, punkte);

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

      // Das Ergebnis lebt ab jetzt auf der Bestaetigungsseite. Der Weg dorthin
      // traegt Test und Ergebnis in der URL, damit die Seite ohne Server-Sitzung
      // auskommt und der Link teilbar bleibt.
      const ziel =
        "/danke-bestaetige-deinen-eintrag/?test=" +
        encodeURIComponent(test.slug) +
        "&typ=" +
        encodeURIComponent(erg.key) +
        (vorname ? "&name=" + encodeURIComponent(vorname) : "");

      // Ein Fehler beim Eintragen darf den Weg zum Ergebnis nicht blockieren.
      try {
        await eintragen({
          mail,
          vorname,
          test: test.slug,
          typ: erg.key,
          punkte,
        });
      } catch {
        /* absichtlich still */
      }

      try {
        window.location.assign(ziel);
      } catch {
        // Falls die Weiterleitung nicht greift, das Ergebnis hier zeigen.
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
          Dein Ergebnis ist fertig.
        </h2>
        <div className="divider-terra" />
        <p
          className="text-deep/80 leading-relaxed mt-6 max-w-xl"
          style={{ fontSize: "1.1rem" }}
        >
          Sag mir, wohin ich es schicken darf. Du kommst direkt danach zu deiner
          Auswertung und bekommst sie zusätzlich per E-Mail, damit du sie in Ruhe
          nachlesen kannst.
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
            {sendet ? "Einen Moment …" : "Ergebnis ansehen"}
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

  /* ---------------------------- Ergebnis ---------------------------- */
  return (
    <div className={box} style={schatten}>
      <p className="text-overline text-terra mb-5">
        {vorname ? `${vorname}, dein Ergebnis` : "Dein Ergebnis"}
      </p>
      <h2
        className="font-serif text-deep"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}
      >
        {erg.name}
      </h2>
      <p className="font-serif italic text-terra text-lg lg:text-xl mt-3">
        {erg.unter}
      </p>
      <div className="divider-terra" />

      <div className="flex flex-wrap gap-8 mt-7 mb-8">
        {test.achsen.map((a) => (
          <div key={a.key}>
            <p className="text-overline text-terra/70 mb-2">{a.name}</p>
            <p className="font-serif text-deep text-2xl">
              {punkte[a.key] ?? 0}
              <span className="text-deep/40 text-base"> von {a.max}</span>
            </p>
            <div className="h-1 bg-cream-mid mt-2" style={{ width: "9rem" }}>
              <div
                className="h-1 bg-terra"
                style={{
                  width: `${Math.round(((punkte[a.key] ?? 0) / a.max) * 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p
        className="text-deep/80 leading-relaxed max-w-2xl"
        style={{ fontSize: "1.1rem" }}
      >
        {erg.text}
      </p>

      {erg.schritte && erg.schritte.length > 0 && (
        <div className="mt-8 max-w-2xl">
          <p className="text-overline text-terra mb-4">
            Was jetzt konkret hilft
          </p>
          <ul className="space-y-3">
            {erg.schritte.map((s, i) => (
              <li key={i} className="flex gap-4 text-deep/80 leading-relaxed">
                <span
                  className="font-serif text-stone flex-shrink-0"
                  style={{ fontSize: "1.4rem", lineHeight: 1.2 }}
                >
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-6 items-center mt-10">
        {test.artikel && (
          <Link
            href={`/wissen/${test.artikel}/`}
            className="btn-outline btn-outline-dark"
          >
            Mehr dazu lesen
          </Link>
        )}
        <button
          onClick={neu}
          className="text-deep/50 text-sm tracking-wide hover:text-deep transition-colors"
        >
          Test wiederholen
        </button>
      </div>
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
  punkte: Record<string, number>;
}) {
  await fetch("/api/eintrag/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(daten),
  });
}
