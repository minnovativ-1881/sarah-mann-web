import { NextResponse } from "next/server";

/**
 * Traegt eine Adresse in KlickTipp ein.
 *
 * Laeuft bewusst auf dem Server, damit der API-Schluessel nicht im Browser
 * landet und damit wir eine echte Antwort bekommen statt ins Leere zu senden.
 *
 * Format nach der Listbuilding-API: POST mit JSON, "fields" als verschachteltes
 * Objekt. Feldschluessel sind entweder Standardnamen wie fieldFirstName oder
 * die IDs eigener Felder aus KlickTipp.
 *
 * Umgebungsvariablen:
 *   KLICKTIPP_APIKEY_<SLUG>   Schluessel je Test, Slug gross, - wird zu _
 *   KLICKTIPP_APIKEY          Rueckfallebene fuer alle uebrigen Tests
 *   KLICKTIPP_FELD_TYP        Feld-ID fuer das Testergebnis, z. B. field1001135
 *   KLICKTIPP_FELD_TEST       Feld-ID fuer den Testnamen, optional
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
  // Klartext des Ergebnisses, damit in KlickTipp lesbar steht, was herauskam.
  const ergebnis = typeof daten.ergebnis === "string" ? daten.ergebnis.slice(0, 120) : "";
  const typ = typeof daten.typ === "string" ? daten.typ.slice(0, 60) : "";

  if (!istMail(mail)) {
    return NextResponse.json({ ok: false, grund: "adresse" }, { status: 400 });
  }

  const apikey = schluesselFuer(test);
  if (!apikey) {
    console.warn(`[eintrag] Kein KlickTipp-Schluessel fuer Test "${test}"`);
    return NextResponse.json({ ok: true, eingetragen: false });
  }

  const fields: Record<string, string> = {};
  if (vorname) fields.fieldFirstName = vorname;
  if (process.env.KLICKTIPP_FELD_TYP) {
    fields[process.env.KLICKTIPP_FELD_TYP] = ergebnis || typ;
  }
  if (process.env.KLICKTIPP_FELD_TEST && test) {
    fields[process.env.KLICKTIPP_FELD_TEST] = test;
  }

  try {
    const antwort = await fetch(ENDPUNKT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apikey,
        email: mail,
        ...(Object.keys(fields).length ? { fields } : {}),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!antwort.ok) {
      const text = await antwort.text().catch(() => "");
      console.error(`[eintrag] KlickTipp ${antwort.status} bei "${test}": ${text.slice(0, 300)}`);
      // Der Nutzer bekommt trotzdem seine Bestaetigungsseite. Ein Fehler auf
      // unserer Seite darf keinen Interessenten kosten.
      return NextResponse.json({ ok: true, eingetragen: false });
    }

    return NextResponse.json({ ok: true, eingetragen: true });
  } catch (fehler) {
    console.error("[eintrag] Aufruf fehlgeschlagen:", fehler);
    return NextResponse.json({ ok: true, eingetragen: false });
  }
}
