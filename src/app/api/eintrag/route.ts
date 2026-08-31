import { NextResponse } from "next/server";

/**
 * Traegt eine Adresse in KlickTipp ein.
 *
 * Laeuft bewusst auf dem Server, damit der API-Schluessel nicht im Browser
 * landet und damit wir eine echte Antwort bekommen statt ins Leere zu senden.
 *
 * Schluessel kommen aus den Umgebungsvariablen. Pro Test kann ein eigener
 * Opt-In-Prozess hinterlegt werden, sonst greift der allgemeine:
 *
 *   KLICKTIPP_APIKEY_ELTERN_TEST      (Test-Slug in Grossbuchstaben, - wird zu _)
 *   KLICKTIPP_APIKEY                  (Rueckfallebene fuer alle uebrigen Tests)
 *
 * Optional lassen sich Ergebnis und Punkte in KlickTipp-Felder schreiben:
 *
 *   KLICKTIPP_FELD_TEST=fieldXXXXXX
 *   KLICKTIPP_FELD_TYP=fieldXXXXXX
 */

const ENDPUNKT = "https://api.klicktipp.com/subscriber/signin";

function schluesselFuer(test: string): string | undefined {
  const spezifisch = `KLICKTIPP_APIKEY_${test.toUpperCase().replace(/-/g, "_")}`;
  return process.env[spezifisch] || process.env.KLICKTIPP_APIKEY;
}

function istMail(wert: unknown): wert is string {
  return (
    typeof wert === "string" &&
    wert.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert)
  );
}

export async function POST(anfrage: Request) {
  let daten: Record<string, unknown>;
  try {
    daten = await anfrage.json();
  } catch {
    return NextResponse.json({ ok: false, grund: "format" }, { status: 400 });
  }

  const mail = daten.mail;
  const vorname = typeof daten.vorname === "string" ? daten.vorname.slice(0, 80) : "";
  const test = typeof daten.test === "string" ? daten.test.slice(0, 60) : "";
  const typ = typeof daten.typ === "string" ? daten.typ.slice(0, 60) : "";

  if (!istMail(mail)) {
    return NextResponse.json({ ok: false, grund: "adresse" }, { status: 400 });
  }

  const apikey = schluesselFuer(test);
  if (!apikey) {
    // Noch kein Schluessel hinterlegt. Kein Fehler nach aussen: der Test soll
    // trotzdem durchlaufen, damit kein Interessent vor einer Wand steht.
    console.warn(`[eintrag] Kein KlickTipp-Schluessel fuer Test "${test}"`);
    return NextResponse.json({ ok: true, eingetragen: false });
  }

  const koerper = new URLSearchParams();
  koerper.set("apikey", apikey);
  koerper.set("email", mail);
  if (vorname) koerper.set("fields[fieldFirstName]", vorname);
  if (process.env.KLICKTIPP_FELD_TEST && test) {
    koerper.set(`fields[${process.env.KLICKTIPP_FELD_TEST}]`, test);
  }
  if (process.env.KLICKTIPP_FELD_TYP && typ) {
    koerper.set(`fields[${process.env.KLICKTIPP_FELD_TYP}]`, typ);
  }

  try {
    const antwort = await fetch(ENDPUNKT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: koerper,
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!antwort.ok) {
      const text = await antwort.text().catch(() => "");
      console.error(`[eintrag] KlickTipp antwortete ${antwort.status}: ${text.slice(0, 300)}`);
      // Auch hier: der Nutzer bekommt sein Ergebnis. Ein Fehler auf unserer
      // Seite darf keinen Lead kosten und niemanden blockieren.
      return NextResponse.json({ ok: true, eingetragen: false });
    }

    return NextResponse.json({ ok: true, eingetragen: true });
  } catch (fehler) {
    console.error("[eintrag] Aufruf fehlgeschlagen:", fehler);
    return NextResponse.json({ ok: true, eingetragen: false });
  }
}
