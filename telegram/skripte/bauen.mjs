/**
 * Prueft alle Beitraege, legt die Sendereihenfolge fest und baut die Vorschau.
 *
 * Laeuft nur lokal, nie im taeglichen Job. Aufruf:
 *   node telegram/skripte/bauen.mjs
 */

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { TELEGRAM, ladeArtikel, ladeTests, ladeTipps, ZEICHEN_GRENZE } from "./daten.mjs";
import { baueBeitrag, ZYKLUS_LAENGE } from "./beitrag.mjs";

const artikel = ladeArtikel();
const tests = ladeTests();
const tipps = ladeTipps();

if (tipps.length === 0) {
  console.error("Keine Beitraege in telegram/tipps/ gefunden.");
  process.exit(1);
}

/* ------------------------------------------------------------------ Pruefung */

const fehler = [];
const warnungen = [];
const gesehen = new Set();

for (const tipp of tipps) {
  const ort = `${tipp.quelle}: ${tipp.id ?? "(ohne id)"}`;

  if (!tipp.id) fehler.push(`${ort}: keine id`);
  else if (gesehen.has(tipp.id)) fehler.push(`${ort}: id kommt doppelt vor`);
  gesehen.add(tipp.id);

  if (!tipp.titel?.trim()) fehler.push(`${ort}: kein Titel`);
  if (!tipp.text?.trim()) fehler.push(`${ort}: kein Text`);

  const quelle = artikel.get(tipp.artikel);
  if (!quelle) {
    fehler.push(`${ort}: Artikel "${tipp.artikel}" gibt es nicht`);
    continue;
  }

  if (!existsSync(quelle.bildDatei)) {
    fehler.push(`${ort}: Bild fehlt (${quelle.bildDatei})`);
  }

  if (tipp.heikel && tipp.freigegeben === undefined) {
    fehler.push(`${ort}: als heikel markiert, aber ohne Feld "freigegeben"`);
  }

  // Alle sechs Positionen durchspielen, damit kein Handlungsaufruf spaeter
  // ueberraschend zu lang wird oder ins Leere zeigt.
  for (let position = 0; position < ZYKLUS_LAENGE; position++) {
    let beitrag;
    try {
      beitrag = baueBeitrag(tipp, position, artikel, tests);
    } catch (e) {
      fehler.push(`${ort}: ${e.message}`);
      break;
    }

    if (beitrag.zuLang) {
      fehler.push(
        `${ort}: ${beitrag.laenge} Zeichen an Position ${position}, erlaubt sind ${ZEICHEN_GRENZE}`,
      );
    }
    if (beitrag.cta.beschriftung.length > 64) {
      fehler.push(`${ort}: Button-Beschriftung zu lang ("${beitrag.cta.beschriftung}")`);
    }
  }

  if (!quelle.test) warnungen.push(`${ort}: Artikel hat kein "test:" im Frontmatter`);
  if (quelle.verwandt.length === 0) warnungen.push(`${ort}: Artikel hat kein "verwandt:"`);
}

if (fehler.length > 0) {
  console.error(`\n${fehler.length} Fehler:\n`);
  for (const zeile of fehler) console.error("  " + zeile);
  process.exit(1);
}

/* ------------------------------------------------------- Sendereihenfolge */

/**
 * Zwei Ziele: Aufeinanderfolgende Beitraege kommen aus verschiedenen Silos,
 * und zwei Beitraege aus demselben Artikel liegen moeglichst weit auseinander.
 *
 * Dafuer bekommt jeder Beitrag innerhalb seines Silos eine Bruchposition
 * zwischen 0 und 1. Nach dieser Zahl wird am Ende global sortiert, wodurch sich
 * jedes Silo gleichmaessig ueber den ganzen Zeitraum verteilt.
 */
function baueReihenfolge(tipps) {
  const nachSilo = new Map();

  for (const tipp of tipps) {
    const silo = artikel.get(tipp.artikel).silo;
    if (!nachSilo.has(silo)) nachSilo.set(silo, new Map());

    const artikelListe = nachSilo.get(silo);
    if (!artikelListe.has(tipp.artikel)) artikelListe.set(tipp.artikel, []);
    artikelListe.get(tipp.artikel).push(tipp);
  }

  const mitPosition = [];

  for (const [silo, artikelListe] of [...nachSilo].sort(([a], [b]) => a.localeCompare(b))) {
    // Innerhalb des Silos reihum durch die Artikel: erst der erste Tipp jedes
    // Artikels, dann der zweite, und so weiter.
    const reihen = [...artikelListe].sort(([a], [b]) => a.localeCompare(b)).map(([, t]) => t);
    const laengste = Math.max(...reihen.map((r) => r.length));
    const folge = [];

    for (let runde = 0; runde < laengste; runde++) {
      for (const reihe of reihen) if (reihe[runde]) folge.push(reihe[runde]);
    }

    folge.forEach((tipp, i) => {
      mitPosition.push({ tipp, silo, anteil: (i + 0.5) / folge.length });
    });
  }

  mitPosition.sort((a, b) => a.anteil - b.anteil || a.silo.localeCompare(b.silo));
  return mitPosition.map((e) => e.tipp.id);
}

const reihenfolge = baueReihenfolge(tipps);
writeFileSync(join(TELEGRAM, "plan.json"), JSON.stringify(reihenfolge, null, 2) + "\n");

/* ------------------------------------------------------------------ Vorschau */

const nachId = new Map(tipps.map((t) => [t.id, t]));
const beitraege = reihenfolge.map((id, i) => baueBeitrag(nachId.get(id), i, artikel, tests));

function vorschauSeite(titel, liste, hinweis) {
  const karten = liste
    .map((b, i) => {
      const nummer = reihenfolge.indexOf(b.id) + 1;
      const status = b.heikel
        ? b.freigegeben
          ? '<span class="frei">freigegeben</span>'
          : '<span class="sperre">wartet auf Freigabe</span>'
        : "";

      return `
    <article class="karte">
      <header>
        <span class="nr">Nr. ${nummer}</span>
        <span class="silo">${b.silo}</span>
        ${status}
      </header>
      <img src="${b.bildVorschau}" alt="">
      <div class="text">${b.text.replace(/\n/g, "<br>")}</div>
      <a class="button" href="${b.cta.url}">${b.cta.beschriftung}</a>
      <footer>${b.id} · ${b.laenge} Zeichen · ${b.cta.art}</footer>
    </article>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="de">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titel}</title>
<style>
  :root { color-scheme: dark; }
  body { margin: 0; padding: 2rem 1rem 6rem; background: #17212b; color: #e9edf1;
         font: 16px/1.5 -apple-system, "Segoe UI", system-ui, sans-serif; }
  h1 { font-size: 1.3rem; max-width: 30rem; margin: 0 auto 0.5rem; }
  .hinweis { max-width: 30rem; margin: 0 auto 2rem; color: #8b9aa8; font-size: 0.9rem; }
  .karte { max-width: 30rem; margin: 0 auto 2.5rem; background: #202b36; border-radius: 14px;
           overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.4); }
  .karte header { display: flex; gap: .6rem; align-items: center; padding: .7rem 1rem .2rem;
                  font-size: .75rem; color: #8b9aa8; }
  .nr { font-variant-numeric: tabular-nums; }
  .silo { background: #2b3947; border-radius: 99px; padding: .1rem .5rem; }
  .sperre { margin-left: auto; color: #f0a35e; }
  .frei { margin-left: auto; color: #7fc48a; }
  .karte img { display: block; width: 100%; height: auto; }
  .text { padding: .9rem 1rem; }
  .text b { color: #fff; }
  .text a { color: #6ab3f3; text-decoration: none; }
  .button { display: block; margin: 0 .6rem .6rem; padding: .7rem; text-align: center;
            background: #2b3947; color: #6ab3f3; border-radius: 8px; text-decoration: none;
            font-size: .95rem; }
  footer { padding: 0 1rem 1rem; font-size: .72rem; color: #61717f; }
</style>
<h1>${titel}</h1>
<p class="hinweis">${hinweis}</p>
${karten}
</html>`;
}

const vorschauOrdner = join(TELEGRAM, "vorschau");
if (!existsSync(vorschauOrdner)) mkdirSync(vorschauOrdner, { recursive: true });

const heikle = beitraege.filter((b) => b.heikel);

writeFileSync(
  join(vorschauOrdner, "alle.html"),
  vorschauSeite(
    "Alle Beiträge in Sendereihenfolge",
    beitraege,
    `${beitraege.length} Beiträge, das reicht für rund ${Math.floor(beitraege.length / 30)} Monate.`,
  ),
);

writeFileSync(
  join(vorschauOrdner, "heikel.html"),
  vorschauSeite(
    "Beiträge zur Freigabe",
    heikle,
    "Diese Beiträge berühren heikle Themen und gehen erst raus, wenn in der YAML-Datei " +
      "<code>freigegeben: true</code> steht. Ohne Freigabe überspringt der Job sie.",
  ),
);

/* ---------------------------------------------------------------- Ausgabe */

const jeSilo = new Map();
for (const b of beitraege) jeSilo.set(b.silo, (jeSilo.get(b.silo) ?? 0) + 1);

console.log(`${beitraege.length} Beiträge, ${new Set(beitraege.map((b) => b.artikel)).size} Artikel`);
console.log(
  "Silos: " +
    [...jeSilo].sort(([a], [b]) => a.localeCompare(b)).map(([s, n]) => `${s} ${n}`).join(", "),
);
console.log(
  `Heikel: ${heikle.length}, davon freigegeben ${heikle.filter((b) => b.freigegeben).length}`,
);
console.log(
  `Längster Beitrag: ${Math.max(...beitraege.map((b) => b.laenge))} von ${ZEICHEN_GRENZE} Zeichen`,
);

if (warnungen.length > 0) {
  console.log(`\n${warnungen.length} Hinweise:`);
  for (const zeile of warnungen.slice(0, 10)) console.log("  " + zeile);
  if (warnungen.length > 10) console.log(`  ... und ${warnungen.length - 10} weitere`);
}

console.log("\nGeschrieben: telegram/plan.json, telegram/vorschau/alle.html, telegram/vorschau/heikel.html");
