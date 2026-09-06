/**
 * Gemeinsame Datenquelle fuer den Telegram-Tagestipp.
 *
 * Liest die Artikel, die Tests und die vorgeschriebenen Beitraege ein. Alles,
 * was hier herauskommt, sind reine Daten. Kein Skript darf Artikel oder Tests
 * an anderer Stelle noch einmal selbst einlesen, sonst laufen die Quellen
 * auseinander.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { load as ladeYaml } from "js-yaml";

export const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const TELEGRAM = join(WURZEL, "telegram");

export const SEITE = "https://sarahmann.de";
export const KANAL = "klarefuehrung_volleliebe";
export const KANAL_NAME = "Klare Führung, volle Liebe";

/** Telegram erlaubt bei einem Foto hoechstens so viele Zeichen Bildunterschrift. */
export const ZEICHEN_GRENZE = 1024;

/**
 * Alle Artikel mit den Feldern, die der Kanal braucht.
 * Rueckgabe: Map slug -> { slug, titel, silo, test, verwandt, bildDatei }
 */
export function ladeArtikel() {
  const ordner = join(WURZEL, "src", "content", "artikel");
  const artikel = new Map();

  for (const datei of readdirSync(ordner).filter((d) => d.endsWith(".md"))) {
    const slug = datei.replace(/\.md$/, "");
    const { data } = matter(readFileSync(join(ordner, datei), "utf8"));

    artikel.set(slug, {
      slug,
      titel: data.titel,
      silo: data.silo,
      test: data.test ?? null,
      verwandt: Array.isArray(data.verwandt) ? data.verwandt : [],
      url: `${SEITE}/wissen/${slug}/`,
      bildDatei: join(TELEGRAM, "bilder", `${slug}.jpg`),
      bildVorschau: `../bilder/${slug}.jpg`,
    });
  }

  return artikel;
}

/**
 * Slug und Titel der Tests, direkt aus den TypeScript-Quellen.
 *
 * Absichtlich per Textsuche statt als eigene Liste: Ein neuer Test taucht damit
 * hier automatisch auf, statt zweimal gepflegt werden zu muessen.
 */
export function ladeTests() {
  const dateien = ["tests.ts", "tests-reize.ts", "tests-weitere.ts"];
  const tests = new Map();

  for (const datei of dateien) {
    const quelle = readFileSync(join(WURZEL, "src", "lib", datei), "utf8");
    const treffer = quelle.matchAll(
      /slug:\s*"([^"]+)",[\s\S]{0,200}?titel:\s*"([^"]+)"/g,
    );

    for (const [, slug, titel] of treffer) {
      if (!tests.has(slug)) tests.set(slug, { slug, titel, url: `${SEITE}/tests/${slug}/` });
    }
  }

  return tests;
}

/**
 * Alle Beitraege aus telegram/tipps/*.yaml, in Dateireihenfolge.
 * Die Reihenfolge des Versands entsteht erst in bauen.mjs, nicht hier.
 */
export function ladeTipps() {
  const ordner = join(TELEGRAM, "tipps");
  if (!existsSync(ordner)) return [];

  const tipps = [];
  for (const datei of readdirSync(ordner).filter((d) => d.endsWith(".yaml")).sort()) {
    const inhalt = ladeYaml(readFileSync(join(ordner, datei), "utf8")) ?? [];
    for (const tipp of inhalt) tipps.push({ ...tipp, quelle: datei });
  }

  return tipps;
}

export function ladeJson(pfad, ersatz) {
  const voll = join(TELEGRAM, pfad);
  if (!existsSync(voll)) return ersatz;
  return JSON.parse(readFileSync(voll, "utf8"));
}
