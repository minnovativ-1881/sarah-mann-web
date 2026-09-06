/**
 * Der taegliche Versand. Laeuft in GitHub Actions, funktioniert aber genauso
 * lokal.
 *
 *   node telegram/skripte/posten.mjs              scharf, nur um 16 Uhr Berlin
 *   node telegram/skripte/posten.mjs --jetzt      scharf, ohne Uhrzeitpruefung
 *   node telegram/skripte/posten.mjs --trocken    zeigt nur an, sendet nichts
 *   node telegram/skripte/posten.mjs --test       sendet, ohne den Stand zu aendern
 *   ... --test --position=2                       erzwingt eine Position im Zyklus
 *
 * Braucht TELEGRAM_BOT_TOKEN in der Umgebung. TELEGRAM_ADMIN_CHAT_ID ist
 * optional und bekommt eine Nachricht, wenn der Vorrat zur Neige geht.
 */

import { writeFileSync, readFileSync } from "node:fs";
import { join, basename } from "node:path";
import { TELEGRAM, KANAL, ladeArtikel, ladeTests, ladeTipps, ladeJson } from "./daten.mjs";
import { baueBeitrag, baueTastatur, teilenLink, ZYKLUS_LAENGE } from "./beitrag.mjs";

const argumente = process.argv.slice(2);
const hat = (name) => argumente.includes(name);

const trocken = hat("--trocken");
// Ein Testlauf sendet wirklich, schreibt aber nichts fort. Damit laesst sich der
// Kanal ausprobieren, ohne Beitraege aus dem Vorrat zu verbrauchen.
const test = hat("--test");
const ohneUhrzeit = hat("--jetzt") || trocken || test;

const erzwungenePosition = Number(
  argumente.find((a) => a.startsWith("--position="))?.split("=")[1] ?? NaN,
);
const erzwungeneId = argumente.find((a) => a.startsWith("--id="))?.slice(5);

/** Ab wie wenigen uebrigen Beitraegen eine Warnung rausgeht. */
const WARNSCHWELLE = 30;

const kanal = process.env.TELEGRAM_KANAL ?? `@${KANAL}`;
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token && !trocken) {
  console.error("TELEGRAM_BOT_TOKEN fehlt.");
  process.exit(1);
}

/* ------------------------------------------------------------- Uhrzeit */

/** Datum und Stunde in Berlin, unabhaengig von der Zeitzone des Rechners. */
function berlin() {
  const teile = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const feld = (typ) => teile.find((t) => t.type === typ).value;
  return {
    datum: `${feld("year")}-${feld("month")}-${feld("day")}`,
    stunde: Number(feld("hour")),
  };
}

const jetzt = berlin();

if (!ohneUhrzeit && jetzt.stunde !== 16) {
  console.log(`In Berlin ist es ${jetzt.stunde} Uhr, nicht 16. Nichts zu tun.`);
  process.exit(0);
}

/* --------------------------------------------------------------- Auswahl */

const artikel = ladeArtikel();
const tests = ladeTests();
const tipps = new Map(ladeTipps().map((t) => [t.id, t]));
const plan = ladeJson("plan.json", []);
const zustand = ladeJson("zustand.json", { gesendet: [] });

if (plan.length === 0) {
  console.error("plan.json ist leer. Erst 'node telegram/skripte/bauen.mjs' laufen lassen.");
  process.exit(1);
}

if (!test && zustand.gesendet.at(-1)?.datum === jetzt.datum) {
  console.log(`Heute (${jetzt.datum}) ging schon etwas raus. Nichts zu tun.`);
  process.exit(0);
}

const bereitsGesendet = new Set(zustand.gesendet.map((e) => e.id));
const zurueckgestellt = [];
let naechster = null;

/**
 * Der erste Beitrag im Plan, der noch nicht raus ist und gesendet werden darf.
 * Heikle ohne Freigabe werden uebersprungen, bleiben aber in der Warteschlange:
 * Sobald sie freigegeben sind, sind sie als naechste dran.
 */
for (const id of plan) {
  if (erzwungeneId && id !== erzwungeneId) continue;
  if (!erzwungeneId && bereitsGesendet.has(id)) continue;

  const tipp = tipps.get(id);
  if (!tipp) continue;

  if (!erzwungeneId && tipp.heikel && !tipp.freigegeben) {
    zurueckgestellt.push(id);
    continue;
  }

  naechster = tipp;
  break;
}

if (!naechster) {
  console.error(
    `Kein sendbarer Beitrag uebrig. ${zurueckgestellt.length} warten auf Freigabe.`,
  );
  process.exit(1);
}

// Die Position im Zyklus haengt an der Zahl der bisher gesendeten Beitraege,
// nicht an der Stelle im Plan. Uebersprungenes verschiebt die Mischung damit nicht.
const position = Number.isInteger(erzwungenePosition)
  ? erzwungenePosition
  : zustand.gesendet.length % ZYKLUS_LAENGE;
const beitrag = baueBeitrag(naechster, position, artikel, tests);
const uebrig = plan.filter((id) => !bereitsGesendet.has(id)).length - 1;

console.log(`Beitrag:  ${beitrag.id} (${beitrag.silo})`);
console.log(`Aufruf:   ${beitrag.cta.art} -> ${beitrag.cta.beschriftung}`);
console.log(`Laenge:   ${beitrag.laenge} Zeichen`);
console.log(`Uebrig:   ${uebrig} Beitraege${zurueckgestellt.length ? `, ${zurueckgestellt.length} warten auf Freigabe` : ""}`);

if (trocken) {
  console.log("\n--- Bildunterschrift ---\n" + beitrag.text);
  console.log("\nTrockenlauf, es wurde nichts gesendet.");
  process.exit(0);
}

/* --------------------------------------------------------------- Versand */

async function telegram(methode, nutzlast) {
  const antwort = await fetch(`https://api.telegram.org/bot${token}/${methode}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(nutzlast),
  });

  const ergebnis = await antwort.json();
  if (!ergebnis.ok) {
    throw new Error(`Telegram ${methode}: ${ergebnis.description ?? antwort.status}`);
  }
  return ergebnis.result;
}

/**
 * Das Bild wird hochgeladen statt verlinkt. Damit haengt der Kanal nicht davon
 * ab, ob die Website gerade neu deployt ist.
 */
async function sendeFoto(felder, datei) {
  const formular = new FormData();
  for (const [name, wert] of Object.entries(felder)) {
    formular.append(name, typeof wert === "string" ? wert : JSON.stringify(wert));
  }
  formular.append("photo", new Blob([readFileSync(datei)]), basename(datei));

  const antwort = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
    method: "POST",
    body: formular,
  });

  const ergebnis = await antwort.json();
  if (!ergebnis.ok) {
    throw new Error(`Telegram sendPhoto: ${ergebnis.description ?? antwort.status}`);
  }
  return ergebnis.result;
}

const gesendet = await sendeFoto(
  {
    chat_id: kanal,
    caption: beitrag.text,
    parse_mode: "HTML",
    reply_markup: baueTastatur(beitrag.cta),
  },
  beitrag.bildDatei,
);

console.log(`Gesendet als Nachricht ${gesendet.message_id}.`);

// Beim Teilen-Button soll der Beitrag selbst geteilt werden, nicht nur der
// Kanal. Dessen Adresse steht erst nach dem Senden fest, deshalb der Nachtrag.
// Schlaegt er fehl, bleibt der Kanal-Link stehen, der Beitrag ist trotzdem raus.
if (beitrag.cta.art.startsWith("weiterleiten")) {
  try {
    await telegram("editMessageReplyMarkup", {
      chat_id: kanal,
      message_id: gesendet.message_id,
      reply_markup: baueTastatur({
        ...beitrag.cta,
        url: teilenLink(`https://t.me/${KANAL}/${gesendet.message_id}`),
      }),
    });
  } catch (e) {
    console.warn(`Teilen-Link konnte nicht nachgetragen werden: ${e.message}`);
  }
}

/* --------------------------------------------------------------- Zustand */

// Ab hier bewusst kein process.exit mehr: Node bricht unter Windows mit einer
// Assertion ab, wenn beim Beenden noch eine HTTP-Verbindung offen ist. Der
// Prozess endet von allein, sobald nichts mehr aussteht.
if (test) {
  console.log("Testlauf, der Stand bleibt unveraendert.");
} else {
  zustand.gesendet.push({
    datum: jetzt.datum,
    id: beitrag.id,
    artikel: beitrag.artikel,
    silo: beitrag.silo,
    cta: beitrag.cta.art,
    nachricht: gesendet.message_id,
  });

  writeFileSync(join(TELEGRAM, "zustand.json"), JSON.stringify(zustand, null, 2) + "\n");
}

/* --------------------------------------------------------------- Warnung */

const adminChat = process.env.TELEGRAM_ADMIN_CHAT_ID;

if (!test && uebrig < WARNSCHWELLE && adminChat) {
  const nachricht =
    `Nur noch ${uebrig} Beiträge im Vorrat, das reicht bis etwa in einem Monat.` +
    (zurueckgestellt.length
      ? `\n\nDazu warten ${zurueckgestellt.length} heikle Beiträge auf deine Freigabe.`
      : "");

  try {
    await telegram("sendMessage", { chat_id: adminChat, text: nachricht });
    console.log("Warnung an den Admin geschickt.");
  } catch (e) {
    console.warn(`Warnung konnte nicht zugestellt werden: ${e.message}`);
  }
}
