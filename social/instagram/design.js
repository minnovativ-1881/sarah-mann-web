/**
 * Karussell-Design für @sarahmann2202.
 *
 * Baut aus einer Folien-Beschreibung fertiges HTML. Format und Safe Zones
 * kommen aus dem Skill insta-post-design: 1080 x 1440, alles Wichtige
 * zwischen y 180 und 1260 und zwischen x 80 und 1000.
 *
 * Zwei Varianten, die sich von Post zu Post abwechseln:
 *   hell    Creme #F6F4EF, Text Ink, Akzent Petrol
 *   dunkel  Petrol-Verlauf, Text Creme, Akzent Taupe
 *
 * Die Farben sind exakt die der Website (tailwind.config.ts), nichts erfunden.
 */

const fs = require("node:fs");
const path = require("node:path");

/**
 * Die Logos als Data-URI.
 *
 * Der Renderer setzt die Seite ueber setContent, es gibt also keinen
 * Basispfad. Ein relativer Bildpfad bliebe still leer, und genau das faellt
 * auf einem fertigen Post erst auf, wenn er online ist.
 */
function alsDatenUri(datei) {
  const roh = fs.readFileSync(path.join(__dirname, datei));
  return `data:image/webp;base64,${roh.toString("base64")}`;
}

const LOGO = {
  hell: alsDatenUri("logo-nav.webp"),
  dunkel: alsDatenUri("logo-nav-light.webp"),
};

const MARKE = {
  ink: "#1C1B18",
  petrol: "#136B73",
  petrolTief: "#0C3A40",
  petrolHell: "#15727B",
  petrolMittel: "#0D454E",
  sand: "#F2EAE0",
  taupe: "#A89B8C",
  creme: "#F6F4EF",
  weiss: "#FFFFFF",
  haarlinie: "#E7E4DE",
};

/** Farbrollen je Variante. */
function palette(variante) {
  if (variante === "dunkel") {
    return {
      // Der Verlauf bleibt bis unten erkennbar tuerkis. Waere er zu dunkel,
      // saehe die Folie schwarz aus und die Marke waere weg.
      grund: `linear-gradient(160deg, ${MARKE.petrolHell} 0%, ${MARKE.petrolMittel} 100%)`,
      text: MARKE.weiss,
      textLeise: "rgba(255,255,255,0.78)",
      // Taupe kommt auf dem hellen Ende des Verlaufs nur auf 2:1 und ist dort
      // nicht mehr lesbar. Warmer Sand steht bei 4,7 bis 8,9.
      akzent: MARKE.sand,
      linie: "rgba(255,255,255,0.34)",
      kastenGrund: "rgba(255,255,255,0.10)",
      kastenRand: "rgba(255,255,255,0.34)",
      logo: LOGO.dunkel,
    };
  }
  return {
    grund: MARKE.creme,
    text: MARKE.ink,
    textLeise: "rgba(28,27,24,0.72)",
    akzent: MARKE.petrol,
    linie: MARKE.haarlinie,
    kastenGrund: "rgba(19,107,115,0.06)",
    kastenRand: "rgba(19,107,115,0.30)",
    logo: LOGO.hell,
  };
}

/** Betontes Wort: *so* wird kursiv und in der Akzentfarbe gesetzt. */
function betonen(text, p) {
  return String(text).replace(
    /\*(.+?)\*/g,
    `<em style="font-style:italic;color:${p.akzent}">$1</em>`,
  );
}

const KOPF = `<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">`;

function rahmen(p, inhalt, fuss) {
  return `<!doctype html><html lang="de"><head>${KOPF}<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1080px;height:1440px;background:${p.grund};color:${p.text};
       font-family:'Jost',system-ui,sans-serif;overflow:hidden}
  .buehne{position:absolute;left:0;top:180px;width:1080px;height:1080px;
          padding:0 80px;display:flex;flex-direction:column}
  .eyebrow{font-size:23px;font-weight:500;letter-spacing:.26em;
           text-transform:uppercase;color:${p.akzent}}
  .titel{font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;
         letter-spacing:-.01em}
  .text{font-size:34px;line-height:1.5;color:${p.textLeise};font-weight:300}
  .linie{width:64px;height:1px;background:${p.akzent};opacity:.85}
  .fuss{position:absolute;left:80px;right:80px;bottom:190px;
        display:flex;align-items:flex-end;justify-content:space-between}
  .nummer{font-size:22px;letter-spacing:.22em;color:${p.textLeise};font-weight:400}
  .logo{height:62px;opacity:1}
</style></head><body>
<div class="buehne">${inhalt}</div>
${fuss}
</body></html>`;
}

function fussleiste(p, folie) {
  const links = folie.logo === false
    ? ""
    : `<img class="logo" src="${p.logo}" alt="">`;
  const rechts = folie.zaehler
    ? `<span class="nummer">${folie.zaehler}</span>`
    : folie.wisch
      ? `<span class="nummer">weiterwischen &nbsp;&rsaquo;</span>`
      : "";
  if (!links && !rechts) return "";
  return `<div class="fuss">${links || "<span></span>"}${rechts}</div>`;
}

/* ------------------------------ Folientypen ------------------------------ */

const TYPEN = {
  /** Folie 1. Die Aussage, die den Daumen stoppt. */
  hook(folie, p) {
    const groesse = folie.gross === false ? 82 : 104;
    return `
      ${folie.eyebrow ? `<p class="eyebrow" style="margin-bottom:auto">${folie.eyebrow}</p>` : `<div style="margin-bottom:auto"></div>`}
      <h1 class="titel" style="font-size:${groesse}px;line-height:1.06">${betonen(folie.titel, p)}</h1>
      ${folie.unter ? `<p class="text" style="margin-top:38px">${folie.unter}</p>` : ""}
      <div style="margin-top:auto"></div>`;
  },

  /** Die Wendung nach dem Hook: hier kippt die Erwartung. */
  wende(folie, p) {
    return `
      <div style="margin:auto 0">
        ${folie.eyebrow ? `<p class="eyebrow" style="margin-bottom:30px">${folie.eyebrow}</p>` : ""}
        <h2 class="titel" style="font-size:72px;line-height:1.14">${betonen(folie.titel, p)}</h2>
        ${folie.text ? `<div class="linie" style="margin:34px 0"></div><p class="text">${folie.text}</p>` : ""}
      </div>`;
  },

  /** Ein Gedanke pro Folie, durchnummeriert. */
  punkt(folie, p) {
    return `
      <div style="margin:auto 0">
        <p class="titel" style="font-size:132px;line-height:1;color:${p.akzent};opacity:.55">${folie.nummer}</p>
        <h2 class="titel" style="font-size:62px;line-height:1.16;margin-top:14px">${betonen(folie.titel, p)}</h2>
        ${folie.text ? `<p class="text" style="margin-top:28px">${folie.text}</p>` : ""}
      </div>`;
  },

  /** Ein Satz, der für sich steht. */
  zitat(folie, p) {
    return `
      <div style="margin:auto 0;text-align:center">
        <div class="linie" style="margin:0 auto 46px"></div>
        <p class="titel" style="font-size:76px;line-height:1.22;font-style:italic">${folie.titel}</p>
        <div class="linie" style="margin:46px auto 0"></div>
        ${folie.text ? `<p class="text" style="margin-top:38px">${folie.text}</p>` : ""}
      </div>`;
  },

  /** Letzte Folie: was der Leser jetzt tun soll. */
  cta(folie, p) {
    const kasten = folie.stichwort
      ? `<div style="margin-top:44px;border:1px solid ${p.kastenRand};background:${p.kastenGrund};
                     padding:38px 44px">
           <p class="text" style="color:${p.text};font-size:32px;line-height:1.45">
             Schreib <strong style="font-weight:500;color:${p.akzent};letter-spacing:.06em">
             ${folie.stichwort}</strong> in die Kommentare,<br>dann schicke ich dir den Link.
           </p>
         </div>`
      : folie.bio
        ? `<div style="margin-top:44px;border:1px solid ${p.kastenRand};background:${p.kastenGrund};
                       padding:38px 44px">
             <p class="text" style="color:${p.text};font-size:32px;line-height:1.45">${folie.bio}</p>
           </div>`
        : "";
    return `
      <div style="margin:auto 0">
        <p class="eyebrow" style="margin-bottom:30px">${folie.eyebrow || "Kostenlos, ohne Anmeldung"}</p>
        <h2 class="titel" style="font-size:68px;line-height:1.14">${betonen(folie.titel, p)}</h2>
        ${folie.text ? `<p class="text" style="margin-top:26px">${folie.text}</p>` : ""}
        ${kasten}
      </div>`;
  },
};

/** Baut das HTML einer Folie. */
function folieHtml(folie, variante) {
  const p = palette(variante);
  const bauer = TYPEN[folie.typ];
  if (!bauer) throw new Error(`Unbekannter Folientyp: ${folie.typ}`);
  return rahmen(p, bauer(folie, p), fussleiste(p, folie));
}

module.exports = { folieHtml, MARKE, palette };
