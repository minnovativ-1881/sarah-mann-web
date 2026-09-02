import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const SITE_URL = "https://www.sarahmann.de";

/**
 * Themen-Silos. Jeder Artikel gehört zu genau einem Silo.
 *
 * `beschreibung` ist die Katalogzeile: sie sagt, was im Bereich steht.
 * `problem` ist die Zeile für die Autorinnenseite: sie beschreibt den Abend,
 * an dem jemand nach so einem Bereich sucht. Eine reine Aufzählung der
 * Bereichsnamen sagt einem Leser nichts, die Situation dahinter schon.
 */
export const SILOS = {
  grundlagen: {
    slug: "grundlagen",
    test: "eltern-test",
    name: "Die Grundlagen",
    beschreibung:
      "Woher die Idee kommt, dass Kinder Wärme und Klarheit zugleich brauchen, und was daraus für den Alltag folgt.",
    problem:
      "Jeder Ratgeber sagt etwas anderes, und keiner davon passt auf dein Kind an einem echten Dienstagabend. Hier steht, was tatsächlich untersucht ist und was daraus für zu Hause folgt.",
  },
  grenzen: {
    slug: "grenzen",
    test: "wie-klar-ist-dein-nein",
    name: "Grenzen und Führung",
    beschreibung:
      "Was zwischen Erklären und Schimpfen liegt: Wie eine Grenze steht, ohne dass die Wärme verloren geht.",
    problem:
      "Du erklärst es zum vierten Mal, freundlich und ruhig, und es passiert nichts. Und irgendwann wirst du doch laut, obwohl du dir genau das nicht vorgenommen hattest.",
  },
  gefuehle: {
    slug: "gefuehle",
    test: "beduerfnis-oder-wunsch",
    name: "Gefühle und Selbstregulation",
    beschreibung:
      "Wie Kinder lernen, sich selbst zu halten, und was Eltern dafür tun, bevor sie es können.",
    problem:
      "Dein Kind kippt in Sekunden, und alles, was du sagst, macht es schlimmer. Wut, Scham, Neid, Enttäuschung: Warum die kommen und was in genau diesem Moment hilft.",
  },
  schlaf: {
    slug: "schlaf",
    test: "abend-test",
    name: "Schlaf und Abend",
    beschreibung:
      "Der Ort, an dem Führung zum ersten Mal gebraucht wird, und an dem sie am meisten kostet.",
    problem:
      "Der Abend zieht sich über Stunden, und am Ende sind alle wütend, obwohl das niemand wollte. Der Schlaf ist die Stelle, an der Klarheit am schwersten fällt und am meisten bringt.",
  },
  eltern: {
    slug: "eltern",
    test: "kraft-test",
    name: "Für dich als Elternteil",
    beschreibung:
      "Erschöpfung, Zweifel und die eigene Wut. Denn Führung fängt nicht beim Kind an.",
    problem:
      "Es liegt nicht daran, dass du zu wenig Geduld hast. Es liegt daran, dass nichts mehr da ist. Über diesen Teil wird selten offen gesprochen, und er entscheidet über den Rest.",
  },
  reizueberflutung: {
    slug: "reizueberflutung",
    test: "reizprofil-test",
    name: "Wenn alles zu viel wird",
    beschreibung:
      "Kinder, die mehr wahrnehmen und schneller an ihre Grenze kommen: Was dahintersteckt und was im Alltag wirklich hilft.",
    problem:
      "In der Kita hält dein Kind sich zusammen, zu Hause explodiert es. Von außen sieht das nach Erziehungsversagen aus und ist etwas ganz anderes.",
  },
  geschwister: {
    slug: "geschwister",
    test: "eltern-test",
    name: "Geschwister unter einem Dach",
    beschreibung:
      "Streit, Eifersucht und die Frage, wie man zwei oder sieben Kindern gerecht wird, ohne allen dasselbe zu geben.",
    problem:
      "Zwei Kinder, ein Bagger, und du sollst entscheiden, wer im Recht ist. Fünfmal am Tag. Dazu die Frage, wie man mehreren Kindern gerecht wird, ohne allen dasselbe zu geben.",
  },
  charakter: {
    slug: "charakter",
    test: "konsequenz-oder-strafe",
    name: "Was dein Kind stark macht",
    beschreibung:
      "Mut, Durchhalten, Ehrlichkeit und ein Selbstwert, der nicht am Lob hängt. Der einzige Bereich hier, der nicht von einem Problem ausgeht.",
    problem:
      "Der einzige Bereich, der nicht bei einem Problem anfängt, sondern bei dem, was du aufbaust: Selbstwert, Mut, Durchhalten, Ehrlichkeit. Und die Frage, warum Lob dabei fast nichts beiträgt.",
  },
  uebergaenge: {
    slug: "uebergaenge",
    test: "abend-test",
    name: "Übergänge im Familienjahr",
    beschreibung:
      "Kita, Schule, Zeitumstellung, Weihnachten: Die Momente, in denen Struktur besonders trägt.",
    problem:
      "Kita-Start, Einschulung, Zeitumstellung, Weihnachten. Immer dann, wenn die gewohnte Struktur wackelt, wird der Alltag laut, und meistens war es absehbar.",
  },
} as const;

export type SiloSlug = keyof typeof SILOS;

export type ArtikelFaq = { frage: string; antwort: string };

export type ArtikelMeta = {
  slug: string;
  titel: string;
  /** Der Titel für Google. Hier darf der Suchbegriff stehen. */
  seoTitel?: string;
  beschreibung: string;
  /** Der Satz über der H1, in der Sprache der Eltern. */
  eyebrow?: string;
  silo: SiloSlug;
  datum: string;
  aktualisiert?: string;
  lesezeit: number;
  bild?: string;
  bildAlt?: string;
  /**
   * Bildausschnitt des Kopfbilds, z. B. "center 4%".
   * Nur noetig, wenn der Standardwert den Kopf einer Person anschneidet.
   */
  bildPosition?: string;
  /** Slugs verwandter Artikel. Ohne Angabe wird nach Silo verlinkt. */
  verwandt?: string[];
  /** Slug des passenden Tests, falls vorhanden. */
  test?: string;
  faq?: ArtikelFaq[];
  /** Nicht in der Übersicht zeigen (Entwurf). */
  entwurf?: boolean;
};

export type Artikel = ArtikelMeta & { inhalt: string };

const ORDNER = path.join(process.cwd(), "src", "content", "artikel");

function leseDatei(datei: string): Artikel | null {
  const voll = path.join(ORDNER, datei);
  const roh = fs.readFileSync(voll, "utf8");
  const { data, content } = matter(roh);
  if (!data.titel || !data.silo) return null;
  const slug = datei.replace(/\.md$/, "");
  return {
    slug,
    titel: data.titel,
    seoTitel: data.seoTitel,
    beschreibung: data.beschreibung ?? "",
    eyebrow: data.eyebrow,
    silo: data.silo as SiloSlug,
    datum: data.datum ?? new Date().toISOString().slice(0, 10),
    aktualisiert: data.aktualisiert,
    lesezeit: data.lesezeit ?? schaetzeLesezeit(content),
    // Bild wird automatisch gefunden, sobald public/bilder/artikel/<slug>.webp
    // existiert. Ein bild: im Frontmatter hat Vorrang, ist aber nicht noetig.
    bild: data.bild ?? findeBild("artikel", slug),
    bildAlt: data.bildAlt ?? data.titel,
    bildPosition: data.bildPosition,
    verwandt: data.verwandt,
    test: data.test,
    faq: data.faq,
    entwurf: data.entwurf === true,
    inhalt: content,
  };
}

/**
 * Sucht ein Bild nach Namenskonvention. Gibt undefined zurueck, wenn keins da
 * ist, damit die Seite ohne Fotos vollstaendig funktioniert.
 *
 *   findeBild("artikel", "ko-regulation")  ->  "/bilder/artikel/ko-regulation.webp"
 */
export function findeBild(
  ordner: "artikel" | "silos" | "tests",
  name: string,
): string | undefined {
  for (const endung of [".webp", ".jpg", ".png"]) {
    const rel = `/bilder/${ordner}/${name}${endung}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return undefined;
}

function schaetzeLesezeit(text: string): number {
  const woerter = text.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(woerter / 200));
}

let cache: Artikel[] | null = null;

export function alleArtikel(): Artikel[] {
  if (cache) return cache;
  if (!fs.existsSync(ORDNER)) return [];
  const dateien = fs.readdirSync(ORDNER).filter((d) => d.endsWith(".md"));
  const artikel = dateien
    .map(leseDatei)
    .filter((a): a is Artikel => a !== null)
    .filter((a) => !a.entwurf)
    .sort((a, b) => (a.datum < b.datum ? 1 : -1));
  cache = artikel;
  return artikel;
}

export function artikelSlugs(): string[] {
  return alleArtikel().map((a) => a.slug);
}

export function artikelNachSlug(slug: string): Artikel | undefined {
  return alleArtikel().find((a) => a.slug === slug);
}

export function artikelImSilo(silo: SiloSlug): Artikel[] {
  return alleArtikel().filter((a) => a.silo === silo);
}

/**
 * Der Test, der zu einem Silo gehört.
 *
 * Zuerst die feste Zuordnung aus SILOS. Sie ist nötig, weil die reine
 * Ableitung nach Häufigkeit den Eltern-Test in vier von neun Bereichen
 * gewählt hat: Er hängt an 21 Artikeln und gewinnt deshalb fast überall.
 * Auf der Autorinnenseite stehen alle neun Bereiche untereinander, und
 * viermal derselbe Test sieht dort nach Verlegenheit aus.
 *
 * Die Ableitung bleibt als Rückfall, damit ein neues Silo ohne feste
 * Zuordnung trotzdem einen sinnvollen Test bekommt.
 *
 * Steht hier und nicht in der Silo-Seite, damit Silo-Seite und
 * Autorinnenseite nicht auseinanderlaufen können.
 */
export function testFuerSilo(silo: SiloSlug): string | undefined {
  const gesetzt = SILOS[silo].test;
  if (gesetzt) return gesetzt;

  const zaehler = new Map<string, number>();
  for (const a of artikelImSilo(silo)) {
    if (a.test) zaehler.set(a.test, (zaehler.get(a.test) ?? 0) + 1);
  }
  let bester: string | undefined;
  let max = 0;
  for (const [slug, n] of zaehler) {
    if (n > max) {
      max = n;
      bester = slug;
    }
  }
  return bester;
}

/**
 * Verwandte Artikel. Erst die ausdrücklich gesetzten, dann nach Silo
 * aufgefüllt. So bleibt die interne Verlinkung dicht, auch wenn im
 * Frontmatter nichts steht.
 */
export function verwandteArtikel(artikel: Artikel, anzahl = 3): Artikel[] {
  const alle = alleArtikel();
  const raus = new Set([artikel.slug]);
  const ergebnis: Artikel[] = [];

  for (const slug of artikel.verwandt ?? []) {
    const a = alle.find((x) => x.slug === slug);
    if (a && !raus.has(a.slug)) {
      ergebnis.push(a);
      raus.add(a.slug);
    }
  }
  for (const a of alle) {
    if (ergebnis.length >= anzahl) break;
    if (raus.has(a.slug)) continue;
    if (a.silo !== artikel.silo) continue;
    ergebnis.push(a);
    raus.add(a.slug);
  }
  for (const a of alle) {
    if (ergebnis.length >= anzahl) break;
    if (raus.has(a.slug)) continue;
    ergebnis.push(a);
    raus.add(a.slug);
  }
  return ergebnis.slice(0, anzahl);
}

export function artikelUrl(slug: string): string {
  return `/wissen/${slug}/`;
}

/** Überschriften aus dem Markdown für das Inhaltsverzeichnis. */
export function ueberschriften(inhalt: string): { id: string; text: string }[] {
  const zeilen = inhalt.split("\n");
  const out: { id: string; text: string }[] = [];
  let inCode = false;
  for (const z of zeilen) {
    if (z.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const m = /^##\s+(.+?)\s*$/.exec(z);
    if (m) out.push({ id: slugify(m[1]), text: m[1].replace(/\*\*/g, "") });
  }
  return out;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Kleine Zahlen als Wort.
 *
 * Im Fliesstext stand an mehreren Stellen fest "sechs Themen". Als das
 * siebte dazukam, war die Seite an drei Stellen falsch, ohne dass es
 * jemandem aufgefallen waere. Jetzt rechnet sie es aus.
 */
const ZAHLWOERTER = [
  "null", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben",
  "acht", "neun", "zehn", "elf", "zwölf",
];

export function zahlwort(n: number): string {
  return ZAHLWOERTER[n] ?? String(n);
}

/** Wie viele Silos es gibt, in denen auch Artikel stehen. */
export function siloAnzahl(): number {
  return (Object.keys(SILOS) as SiloSlug[]).filter(
    (s) => artikelImSilo(s).length > 0,
  ).length;
}

/** Übersichtsseite eines Silos. Liegt bewusst unter /wissen/. */
export function siloUrl(silo: SiloSlug): string {
  return `/wissen/${silo}/`;
}

/**
 * Ist dieser Slug ein Silo und kein Artikel?
 *
 * Silo- und Artikelseiten teilen sich die Route /wissen/<slug>/, damit die
 * Adressen kurz bleiben. Es gibt keine Überschneidung: kein Artikel heißt wie
 * ein Silo.
 */
export function istSiloSlug(slug: string): slug is SiloSlug {
  return Object.prototype.hasOwnProperty.call(SILOS, slug);
}
