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
function alsDatenUri(datei, typ = "webp") {
  const roh = fs.readFileSync(path.join(__dirname, datei));
  return `data:image/${typ};base64,${roh.toString("base64")}`;
}

const LOGO = {
  hell: alsDatenUri("logo-nav.webp", "webp"),
  dunkel: alsDatenUri("logo-nav-light.webp", "webp"),
};

/**
 * Sarahs Fotos.
 *
 * rund: Kreisausschnitt direkt aus dem Foto. Bewusst kein Freisteller, denn
 *       ein Kreis hat keinen Saum, den man auf Petrol sehen koennte.
 * frei: Freisteller fuer die Portraetfolie. Die mitgelieferte Datei hatte
 *       einen weissen Rand, die Maske ist deshalb neu aufgebaut.
 */
const FOTO = {
  // Gegenlaeufig: das Foto auf Creme kommt auf die dunkle Folie, das Foto auf
  // Petrol auf die helle. So entsteht eine Scheibe mit Kontrast statt eines
  // Bildes, das in der Flaeche verschwindet.
  kreisAufDunkel: alsDatenUri("fotos/sarah-kreis-hell.png", "png"),
  kreisAufHell: alsDatenUri("fotos/sarah-kreis-dunkel.png", "png"),
  frei: alsDatenUri("fotos/sarah-freisteller.png", "png"),
};

/** Handgezeichneter Wischpfeil, je Variante in der lesbaren Farbe. */
const PFEIL = {
  hell: alsDatenUri("pfeile/pfeil-hell.png", "png"),
  dunkel: alsDatenUri("pfeile/pfeil-petrol.png", "png"),
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
      kreis: FOTO.kreisAufDunkel,
      pfeil: PFEIL.hell,
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
    kreis: FOTO.kreisAufHell,
    pfeil: PFEIL.dunkel,
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
  .rund{width:470px;height:470px;border-radius:50%;display:block}
  .pfeil{height:64px;width:auto;display:block}
  .frei{position:absolute;right:40px;bottom:0;height:742px;width:auto}
</style></head><body>
<div class="buehne">${inhalt}</div>
${fuss}
</body></html>`;
}

function fussleiste(p, folie) {
  const links = folie.logo === false
    ? ""
    : `<img class="logo" src="${p.logo}" alt="">`;
  const rechts = folie.typ === "portraet"
    ? ""
    : folie.zaehler
    ? `<span class="nummer">${folie.zaehler}</span>`
    : folie.wisch
      ? `<img class="pfeil" src="${p.pfeil}" alt="weiterwischen">`
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

  /**
   * Sarah selbst. Bei einer Personenmarke hebt ein Gesicht die Verweildauer,
   * und der Leser merkt sich, von wem der Gedanke kam.
   */
  person(folie, p) {
    // "Hallo, ich bin" laeuft direkt in den Namen, das liest sich wie ein
    // Mensch. Eine Bildunterschrift wie "Wer das schreibt" waere ein Etikett.
    return `
      <div style="margin:auto 0;text-align:center">
        <img class="rund" style="margin:0 auto" src="${p.kreis}" alt="Sarah Mann">
        <p class="eyebrow" style="margin-top:46px">${folie.eyebrow || "Hallo, ich bin"}</p>
        <h2 class="titel" style="font-size:64px;line-height:1.1;margin-top:14px">Sarah Mann</h2>
        <p class="text" style="margin-top:18px">${
          folie.text ||
          "Pädagogin, Babyschlafberaterin<br>und Mutter von sieben Kindern."
        }</p>
        ${
          folie.haltung
            ? `<p class="text" style="margin-top:26px;max-width:720px;margin-left:auto;margin-right:auto">${folie.haltung}</p>`
            : ""
        }
      </div>`;
  },

  /**
   * Hook mit Gesicht. Der Freisteller laeuft unten aus dem Bild heraus, der
   * Text bleibt oben im sicheren Bereich.
   */
  portraet(folie, p, variante) {
    // Nur auf hellen Folien. Der Freisteller hat im Haar helle Reste des
    // urspruenglichen Hintergrunds. Auf Creme sieht man sie nicht, auf Petrol
    // schon, und zwar deutlich. Auf dunklen Folien nimmt man person, der
    // Kreisausschnitt hat das Problem gar nicht erst.
    if (variante === "dunkel") {
      throw new Error(
        'Folientyp "portraet" gibt es nur in der hellen Variante. ' +
          'Fuer eine dunkle Folie mit Sarah bitte "person" nehmen.',
      );
    }
    // Der Text steht oben, das Foto laeuft unten aus dem Bild. Beides
    // ueberschneidet sich nicht: die Schrift endet, bevor das Foto anfaengt.
    return `
      <img class="frei" src="${FOTO.frei}" alt="Sarah Mann">
      <div style="position:relative;z-index:1">
        ${folie.eyebrow ? `<p class="eyebrow" style="margin-bottom:30px">${folie.eyebrow}</p>` : ""}
        <h1 class="titel" style="font-size:70px;line-height:1.1">${betonen(folie.titel, p)}</h1>
        ${folie.text ? `<p class="text" style="margin-top:24px;max-width:640px">${folie.text}</p>` : ""}
      </div>`;
  },

  /**
   * Die letzte Folie. Sie muss die ganze Arbeit machen: sagen, was es gibt,
   * was der Leser davon hat, und was er dafuer tun muss. Die alte Fassung
   * hat nur nach dem Stichwort gefragt und den Nutzen weggelassen.
   */
  cta(folie, p) {
    const nutzen = (folie.nutzen || [])
      .map(
        (n) => `<li style="display:flex;gap:18px;margin-bottom:16px;align-items:flex-start">
                  <span style="flex:0 0 auto;width:22px;height:1px;background:${p.akzent};
                               margin-top:22px;opacity:.9"></span>
                  <span style="font-size:31px;line-height:1.42;color:${p.textLeise};
                               font-weight:300">${n}</span>
                </li>`,
      )
      .join("");

    const kasten = folie.stichwort
      ? `<div style="margin-top:38px;border:1px solid ${p.kastenRand};background:${p.kastenGrund};
                     padding:34px 40px">
           <p style="font-size:31px;line-height:1.45;color:${p.text};font-weight:300">
             Schreib <strong style="font-weight:500;color:${p.akzent};letter-spacing:.08em">
             ${folie.stichwort}</strong> in die Kommentare.<br>
             Dann schicke ich dir den Test als Nachricht.
           </p>
         </div>`
      : folie.bio
        ? `<div style="margin-top:38px;border:1px solid ${p.kastenRand};background:${p.kastenGrund};
                       padding:34px 40px">
             <p style="font-size:31px;line-height:1.45;color:${p.text};font-weight:300">${folie.bio}</p>
           </div>`
        : "";

    // Oben ausgerichtet statt mittig: der Block ist hoch, mittig gesetzt
    // saehe die Folie unten gedraengt und oben leer aus.
    return `
      <div style="margin-top:30px">
        <p class="eyebrow" style="margin-bottom:26px">${folie.eyebrow || "Der kostenlose Test"}</p>
        <h2 class="titel" style="font-size:64px;line-height:1.14">${betonen(folie.titel, p)}</h2>
        ${nutzen ? `<ul style="margin-top:30px;list-style:none">${nutzen}</ul>` : ""}
        ${kasten}
        <p style="margin-top:22px;font-size:24px;letter-spacing:.04em;color:${p.textLeise};
                  font-weight:300">${folie.fuss || "Zwei Minuten. Kostenlos. Ohne Anmeldung."}</p>
      </div>`;
  },

};

/** Baut das HTML einer Folie. */
function folieHtml(folie, variante) {
  const p = palette(variante);
  const bauer = TYPEN[folie.typ];
  if (!bauer) throw new Error(`Unbekannter Folientyp: ${folie.typ}`);
  return rahmen(p, bauer(folie, p, variante), fussleiste(p, folie));
}

module.exports = { folieHtml, MARKE, palette };
