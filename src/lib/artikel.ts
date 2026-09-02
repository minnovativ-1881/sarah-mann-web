import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const SITE_URL = "https://www.sarahmann.de";

/** Themen-Silos. Jeder Artikel gehört zu genau einem Silo. */
export const SILOS = {
  grundlagen: {
    slug: "grundlagen",
    name: "Die Grundlagen",
    beschreibung:
      "Woher die Idee kommt, dass Kinder Wärme und Klarheit zugleich brauchen, und was daraus für den Alltag folgt.",
  },
  grenzen: {
    slug: "grenzen",
    name: "Grenzen und Führung",
    beschreibung:
      "Was zwischen Erklären und Schimpfen liegt: wie eine Grenze steht, ohne dass die Wärme verloren geht.",
  },
  gefuehle: {
    slug: "gefuehle",
    name: "Gefühle und Selbstregulation",
    beschreibung:
      "Wie Kinder lernen, sich selbst zu halten, und was Eltern dafür tun, bevor sie es können.",
  },
  schlaf: {
    slug: "schlaf",
    name: "Schlaf und Abend",
    beschreibung:
      "Der Ort, an dem Führung zum ersten Mal gebraucht wird, und an dem sie am meisten kostet.",
  },
  eltern: {
    slug: "eltern",
    name: "Für dich als Elternteil",
    beschreibung:
      "Erschöpfung, Zweifel und die eigene Wut. Denn Führung fängt nicht beim Kind an.",
  },
  reizueberflutung: {
    slug: "reizueberflutung",
    name: "Wenn alles zu viel wird",
    beschreibung:
      "Kinder, die mehr wahrnehmen und schneller an ihre Grenze kommen: was dahintersteckt und was im Alltag wirklich hilft.",
  },
  uebergaenge: {
    slug: "uebergaenge",
    name: "Übergänge im Familienjahr",
    beschreibung:
      "Kita, Schule, Zeitumstellung, Weihnachten: die Momente, in denen Struktur besonders trägt.",
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
