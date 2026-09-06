/**
 * Baut aus einem Tipp die fertige Telegram-Nachricht.
 *
 * Der Handlungsaufruf haengt nicht am Tipp, sondern an seiner Position im
 * Sechser-Zyklus. Dadurch bleibt die Mischung gleichmaessig, egal welcher Tipp
 * gerade dran ist.
 */

import { KANAL, KANAL_NAME, ZEICHEN_GRENZE } from "./daten.mjs";

/** Position im Zyklus (0 bis 5) -> Art des Handlungsaufrufs. */
const ZYKLUS = [
  "artikel",
  "weiterleiten",
  "test",
  "verwandt",
  "weiterleiten-reaktion",
  "test",
];

export const ZYKLUS_LAENGE = ZYKLUS.length;

/** Telegram schneidet laengere Beschriftungen im Button ab. */
const BUTTON_GRENZE = 64;

const REAKTIONSZEILE = "Wenn du das kennst, lass ein Herz da.";

export function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Laenge so zaehlen, wie Telegram sie zaehlt: nach dem Aufloesen der
 * HTML-Auszeichnung. Die Tags selbst zaehlen nicht mit, ein maskiertes
 * Sonderzeichen dagegen als ein Zeichen.
 */
export function sichtbareLaenge(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&").length;
}

/** Titel fuer einen Button kuerzen, ohne ihn zu verstuemmeln. */
function buttonTitel(titel, ersatz) {
  if (titel.length <= BUTTON_GRENZE) return titel;

  const satzende = titel.search(/[.?!]/);
  if (satzende > 0 && satzende + 1 <= BUTTON_GRENZE) return titel.slice(0, satzende + 1);

  return ersatz;
}

export function teilenLink(ziel) {
  return `https://t.me/share/url?url=${encodeURIComponent(ziel)}`;
}

/**
 * Welcher Handlungsaufruf gehoert zu dieser Position, und ist er ueberhaupt
 * moeglich? Ein Artikel ohne Test faellt auf den Artikel-Link zurueck.
 */
export function bestimmeCta(position, artikel, tests) {
  const art = ZYKLUS[position % ZYKLUS.length];

  if (art === "test") {
    const test = artikel.test ? tests.get(artikel.test) : null;
    if (test) {
      return {
        art: "test",
        beschriftung: buttonTitel(`Mach den Test: ${test.titel}`, "Mach den Test"),
        url: test.url,
      };
    }
  }

  if (art === "verwandt") {
    const naechster = artikel.verwandt[0];
    if (naechster) {
      return {
        art: "verwandt",
        beschriftung: null, // wird in baueBeitrag aus dem Zielartikel gefuellt
        ziel: naechster,
      };
    }
  }

  if (art === "weiterleiten" || art === "weiterleiten-reaktion") {
    return {
      art,
      beschriftung: "Kennst du jemanden, der das braucht?",
      url: teilenLink(`https://t.me/${KANAL}`),
      reaktion: art === "weiterleiten-reaktion",
    };
  }

  return { art: "artikel", beschriftung: "Der ganze Text dazu", url: artikel.url };
}

/**
 * Fertige Nachricht: Bildunterschrift, Bild-URL und Button.
 *
 * `position` ist die Nummer des Beitrags im Zyklus, nicht die Nummer im Plan.
 * Uebersprungene Beitraege verschieben den Zyklus damit nicht.
 */
export function baueBeitrag(tipp, position, artikelListe, tests) {
  const artikel = artikelListe.get(tipp.artikel);
  if (!artikel) throw new Error(`Artikel ${tipp.artikel} gibt es nicht (Tipp ${tipp.id})`);

  const cta = bestimmeCta(position, artikel, tests);

  if (cta.art === "verwandt") {
    const ziel = artikelListe.get(cta.ziel);
    if (!ziel) throw new Error(`Verwandter Artikel ${cta.ziel} fehlt (Tipp ${tipp.id})`);
    cta.beschriftung = buttonTitel(ziel.titel, "Ein Text, der dazu passt");
    cta.url = ziel.url;
  }

  const absaetze = tipp.text
    .trim()
    .split(/\n\s*\n/)
    .map((absatz) => escapeHtml(absatz.trim().replace(/\s*\n\s*/g, " ")));

  const zeilen = [`<b>${escapeHtml(tipp.titel)}</b>`, "", ...absaetze.join("\n\n").split("\n")];

  if (cta.reaktion) zeilen.push("", REAKTIONSZEILE);

  zeilen.push("", `<a href="https://t.me/${KANAL}">${KANAL_NAME}</a>`);

  const text = zeilen.join("\n");

  return {
    id: tipp.id,
    artikel: artikel.slug,
    silo: artikel.silo,
    bildDatei: artikel.bildDatei,
    bildVorschau: artikel.bildVorschau,
    text,
    laenge: sichtbareLaenge(text),
    zuLang: sichtbareLaenge(text) > ZEICHEN_GRENZE,
    cta,
    heikel: Boolean(tipp.heikel),
    freigegeben: Boolean(tipp.freigegeben),
  };
}

export function baueTastatur(cta) {
  return { inline_keyboard: [[{ text: cta.beschriftung, url: cta.url }]] };
}
