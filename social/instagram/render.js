/**
 * Rendert ein Karussell zu PNG-Folien.
 *
 *   node render.js decks/vorlagen-hell.json
 *   node render.js decks            (alle Decks im Ordner)
 *
 * Ausgabe: export/<deck>/01.png, 02.png ...  je 1080x1440 bei 2x,
 * also 2160x2880. Direkt in der Instagram-App hochladen, nicht ueber die
 * Meta Business Suite, die schneidet 3:4 gelegentlich zurecht.
 */
const puppeteer = require("C:/_timon-claude/projects/bsl-de-web/freebies/node_modules/puppeteer");
const fs = require("node:fs");
const path = require("node:path");
const { folieHtml } = require("./design.js");

async function deckRendern(browser, deckPfad) {
  const deck = JSON.parse(fs.readFileSync(deckPfad, "utf8"));
  const name = path.basename(deckPfad, ".json");
  const ziel = path.join(__dirname, "export", name);
  fs.mkdirSync(ziel, { recursive: true });

  const seite = await browser.newPage();
  await seite.setViewport({ width: 1080, height: 1440, deviceScaleFactor: 2 });

  const gesamt = deck.folien.length;
  for (let i = 0; i < gesamt; i++) {
    const folie = { ...deck.folien[i] };
    // Zaehler automatisch, ausser die Folie setzt ihn selbst oder verbietet ihn
    if (folie.zaehler === undefined && folie.wisch === undefined && i > 0) {
      folie.zaehler = `${i + 1} / ${gesamt}`;
    }
    if (i === 0 && folie.wisch === undefined) folie.wisch = true;

    const html = folieHtml(folie, deck.variante || "hell");
    await seite.setContent(html, { waitUntil: "networkidle0" });
    // Schriften brauchen einen Moment, sonst rendert der Fallback
    await new Promise((r) => setTimeout(r, 700));

    const datei = path.join(ziel, String(i + 1).padStart(2, "0") + ".png");
    await seite.screenshot({ path: datei, type: "png" });
    console.log("  " + path.relative(__dirname, datei));
  }
  await seite.close();
  return gesamt;
}

(async () => {
  const arg = process.argv[2] || "decks";
  const voll = path.isAbsolute(arg) ? arg : path.join(__dirname, arg);
  const decks = fs.statSync(voll).isDirectory()
    ? fs.readdirSync(voll).filter((f) => f.endsWith(".json")).map((f) => path.join(voll, f))
    : [voll];

  if (!decks.length) {
    console.error("Keine Decks gefunden.");
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--allow-file-access-from-files"],
  });

  let summe = 0;
  for (const d of decks) {
    console.log(path.basename(d));
    summe += await deckRendern(browser, d);
  }
  await browser.close();
  console.log(`\n${summe} Folien gerendert.`);
})();
