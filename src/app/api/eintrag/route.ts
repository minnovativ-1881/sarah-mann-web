import { NextResponse } from "next/server";

/**
 * Traegt eine Adresse in KlickTipp ein und schreibt die fertige Auswertung
 * in die Felder, die zu diesem Test gehoeren.
 *
 * Laeuft bewusst auf dem Server, damit der API-Schluessel nicht im Browser
 * landet und damit wir eine echte Antwort bekommen statt ins Leere zu senden.
 *
 * Format nach der Listbuilding-API: POST mit JSON, "fields" als verschachteltes
 * Objekt. Feldschluessel sind entweder Standardnamen wie fieldFirstName oder
 * die IDs eigener Felder aus KlickTipp, also z. B. field1001135.
 *
 * Umgebungsvariablen. <SLUG> ist der Test-Slug in Grossbuchstaben, Bindestrich
 * wird zu Unterstrich, also ELTERN_TEST, ABEND_TEST, KRAFT_TEST,
 * WIE_KLAR_IST_DEIN_NEIN, BEDUERFNIS_ODER_WUNSCH, KONSEQUENZ_ODER_STRAFE.
 *
 *   KLICKTIPP_APIKEY_<SLUG>       Schluessel je Test
 *   KLICKTIPP_APIKEY              Rueckfallebene fuer alle uebrigen Tests
 *   KLICKTIPP_FELD_<SLUG>         Feld fuer den Ergebnisnamen, z. B. "Warm und klar"
 *   KLICKTIPP_FELD_<SLUG>_HTML    Feld fuer die komplette Auswertung als HTML
 *   KLICKTIPP_FELD_<SLUG>_TEXT    Feld fuer dieselbe Auswertung als Klartext
 *   KLICKTIPP_FELD_TYP            Rueckfallebene fuer den Ergebnisnamen
 *   KLICKTIPP_FELD_HTML           Rueckfallebene fuer die HTML-Auswertung
 *   KLICKTIPP_FELD_TEST           Feld fuer den Testnamen, optional
 *
 * Fehlt ein Feld, wird es einfach nicht gesetzt. Ein fehlendes Feld darf
 * niemals dazu fuehren, dass die Eintragung scheitert.
 */

const ENDPUNKT = "https://api.klicktipp.com/subscriber/signin";

/** Obergrenze je Feld, damit ein KlickTipp-Limit den Eintrag nicht kippt. */
const MAX_FELD = 6000;

function grossSlug(test: string): string {
  return test.toUpperCase().replace(/-/g, "_");
}

function schluesselFuer(test: string): string | undefined {
  return (
    process.env[`KLICKTIPP_APIKEY_${grossSlug(test)}`] || process.env.KLICKTIPP_APIKEY
  );
}

function istMail(wert: unknown): wert is string {
  return (
    typeof wert === "string" &&
    wert.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert)
  );
}

function text(wert: unknown, max: number): string {
  return typeof wert === "string" ? wert.slice(0, max) : "";
}

export async function POST(anfrage: Request) {
  let daten: Record<string, unknown>;
  try {
    daten = await anfrage.json();
  } catch {
    return NextResponse.json({ ok: false, grund: "format" }, { status: 400 });
  }

  const mail = daten.mail;
  const vorname = text(daten.vorname, 80);
  const test = text(daten.test, 60);
  const ergebnis = text(daten.ergebnis, 120);
  const unter = text(daten.unter, 200);
  const typ = text(daten.typ, 60);
  const html = text(daten.html, MAX_FELD);
  const klartext = text(daten.klartext, MAX_FELD);
  const punkte = typeof daten.punkte === "number" ? daten.punkte : null;
  const maximum = typeof daten.maximum === "number" ? daten.maximum : null;
  const prozent = typeof daten.prozent === "number" ? daten.prozent : null;

  if (!istMail(mail)) {
    return NextResponse.json({ ok: false, grund: "adresse" }, { status: 400 });
  }

  const apikey = schluesselFuer(test);
  if (!apikey) {
    console.warn(`[eintrag] Kein KlickTipp-Schluessel fuer Test "${test}"`);
    return NextResponse.json({ ok: true, eingetragen: false });
  }

  const slug = grossSlug(test);
  const fields: Record<string, string> = {};
  const setze = (feldId: string | undefined, wert: string) => {
    if (feldId && wert) fields[feldId] = wert;
  };

  if (vorname) fields.fieldFirstName = vorname;

  // Erst das Feld dieses Tests, sonst die allgemeine Rueckfallebene.
  setze(
    process.env[`KLICKTIPP_FELD_${slug}`] || process.env.KLICKTIPP_FELD_TYP,
    ergebnis || typ,
  );
  setze(
    process.env[`KLICKTIPP_FELD_${slug}_HTML`] || process.env.KLICKTIPP_FELD_HTML,
    html,
  );
  setze(process.env[`KLICKTIPP_FELD_${slug}_TEXT`], klartext);
  setze(process.env[`KLICKTIPP_FELD_${slug}_UNTER`], unter);
  setze(
    process.env[`KLICKTIPP_FELD_${slug}_PUNKTE`],
    punkte !== null && maximum !== null
      ? `${punkte} von ${maximum}${prozent !== null ? ` (${prozent} Prozent)` : ""}`
      : "",
  );
  setze(process.env.KLICKTIPP_FELD_TEST, test);

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
      const fehlertext = await antwort.text().catch(() => "");
      console.error(
        `[eintrag] KlickTipp ${antwort.status} bei "${test}": ${fehlertext.slice(0, 300)}`,
      );
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
