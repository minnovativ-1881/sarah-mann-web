/**
 * Wann in dieser Woche gesendet wird.
 *
 * Zwei bis drei Beitraege pro Woche, an zufaelligen Tagen zu zufaelligen
 * Uhrzeiten zwischen 7 und 22 Uhr.
 *
 * Der Zufall ist bewusst kein echter Zufall, sondern aus der Kalenderwoche
 * abgeleitet. Der Job laeuft stuendlich und muss bei jedem Lauf denselben
 * Wochenplan errechnen, sonst wuerde er sich bei jedem Aufruf neu wuerfeln.
 * Gleiche Woche heisst gleicher Plan, naechste Woche heisst neuer Plan.
 *
 * Warum stuendlich und nicht punktgenau: GitHub startet zeitgesteuerte Jobs
 * teils mehrere Stunden zu spaet. Ein Plan, der eine exakte Uhrzeit verlangt,
 * geht dabei jedes Mal leer aus. Deshalb gilt ein Termin als faellig, sobald
 * seine Stunde erreicht oder ueberschritten ist.
 */

/** Frueheste und spaeteste Stunde, zu der ein Beitrag rausgehen darf. */
export const FRUEHESTENS = 7;
export const SPAETESTENS = 22;

/** Datum, Uhrzeit und Wochentag in Berlin, unabhaengig vom Rechner. */
export function berlinJetzt(zeitpunkt = new Date()) {
  const teile = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(zeitpunkt);

  const feld = (typ) => Number(teile.find((t) => t.type === typ).value);
  const [jahr, monat, tag] = [feld("year"), feld("month"), feld("day")];

  // Aus Jahr, Monat und Tag gebaut, deshalb zeitzonenunabhaengig.
  const kalender = new Date(Date.UTC(jahr, monat - 1, tag));

  return {
    datum: `${jahr}-${String(monat).padStart(2, "0")}-${String(tag).padStart(2, "0")}`,
    stunde: feld("hour") % 24,
    /** Montag ist 0, Sonntag ist 6. */
    wochentag: (kalender.getUTCDay() + 6) % 7,
    kalender,
  };
}

/** Kalenderwoche nach ISO 8601, als "2026-W37". */
export function wochenSchluessel(kalender) {
  const d = new Date(kalender.getTime());
  // Auf den Donnerstag derselben Woche schieben, so will es ISO 8601.
  d.setUTCDate(d.getUTCDate() + 3 - ((d.getUTCDay() + 6) % 7));
  const jahr = d.getUTCFullYear();
  const ersterDonnerstag = new Date(Date.UTC(jahr, 0, 4));
  ersterDonnerstag.setUTCDate(
    ersterDonnerstag.getUTCDate() + 3 - ((ersterDonnerstag.getUTCDay() + 6) % 7),
  );
  const woche = 1 + Math.round((d - ersterDonnerstag) / (7 * 24 * 3600 * 1000));
  return `${jahr}-W${String(woche).padStart(2, "0")}`;
}

/** Kleiner Zufallszahlengenerator mit festem Startwert. */
function wuerfel(startwert) {
  let a = startwert >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function startwertAus(text) {
  let h = 2166136261;
  for (const zeichen of text) {
    h ^= zeichen.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Die Termine einer Woche, aufsteigend sortiert.
 * Rueckgabe: [{ wochentag, stunde }], zwei oder drei Eintraege.
 */
export function wochenplan(schluessel) {
  const rnd = wuerfel(startwertAus(schluessel));

  // Warmlaufen lassen. Zwei aufeinanderfolgende Wochen haben fast denselben
  // Startwert, und die ersten Werte liegen dann zu nah beieinander. Ohne das
  // faellt jede zweite Woche auf denselben Wochentag.
  for (let i = 0; i < 12; i++) rnd();

  const anzahl = rnd() < 0.5 ? 2 : 3;

  const tage = [];
  while (tage.length < anzahl) {
    const tag = Math.floor(rnd() * 7);
    if (!tage.includes(tag)) tage.push(tag);
  }

  return tage
    .map((wochentag) => ({
      wochentag,
      // 7 bis 21, damit ein Beitrag nie nach 22 Uhr faellig wird.
      stunde: FRUEHESTENS + Math.floor(rnd() * (SPAETESTENS - FRUEHESTENS)),
    }))
    .sort((a, b) => a.wochentag - b.wochentag || a.stunde - b.stunde);
}

/**
 * Entscheidet, ob jetzt gesendet werden soll.
 *
 * `gesendeteDaten` sind die Datumsangaben der bisher gesendeten Beitraege.
 * Verglichen wird nicht die Uhrzeit, sondern die Zahl der bis jetzt faelligen
 * Termine gegen die Zahl der in dieser Woche tatsaechlich gesendeten. Damit
 * holt ein verspaeteter Lauf einen verpassten Termin von selbst nach, und ein
 * Termin wird nie doppelt bedient.
 */
export function sollSenden(jetzt, gesendeteDaten) {
  if (jetzt.stunde < FRUEHESTENS || jetzt.stunde >= SPAETESTENS) {
    return { senden: false, grund: `${jetzt.stunde} Uhr liegt ausserhalb von ${FRUEHESTENS} bis ${SPAETESTENS} Uhr` };
  }

  if (gesendeteDaten.includes(jetzt.datum)) {
    return { senden: false, grund: `heute (${jetzt.datum}) ging schon ein Beitrag raus` };
  }

  const schluessel = wochenSchluessel(jetzt.kalender);
  const plan = wochenplan(schluessel);

  const faellig = plan.filter(
    (t) => t.wochentag < jetzt.wochentag || (t.wochentag === jetzt.wochentag && t.stunde <= jetzt.stunde),
  ).length;

  // Montag dieser Woche, um die eigenen Sendungen der Woche zu zaehlen.
  const montag = new Date(jetzt.kalender.getTime());
  montag.setUTCDate(montag.getUTCDate() - jetzt.wochentag);
  const montagsDatum = montag.toISOString().slice(0, 10);
  const gesendet = gesendeteDaten.filter((d) => d >= montagsDatum && d <= jetzt.datum).length;

  const planText = plan.map((t) => `${TAGE[t.wochentag]} ${t.stunde} Uhr`).join(", ");

  if (gesendet >= faellig) {
    return {
      senden: false,
      grund: `${schluessel}: ${faellig} von ${plan.length} Terminen faellig, ${gesendet} gesendet. Plan: ${planText}`,
    };
  }

  return {
    senden: true,
    grund: `${schluessel}: ${faellig} Termine faellig, erst ${gesendet} gesendet. Plan: ${planText}`,
  };
}

export const TAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
