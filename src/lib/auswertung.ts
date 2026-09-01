import type { Test, Ergebnis, Frage } from "@/lib/tests";
import { TEST_DETAILS, ACHSEN_TEXTE, type AchsenStufe } from "@/lib/test-details";

/**
 * Auswertung eines Tests.
 *
 * Vorher stand am Ende nur ein Ergebnisname wie "Zwischen den Stühlen". Das
 * ist für eine E-Mail zu wenig. Hier entsteht stattdessen eine dreistufige
 * Auswertung:
 *
 *   1. das Hauptergebnis (welches Feld, welcher Bereich)
 *   2. die Achsen einzeln, wo ein Test mehr als eine hat
 *   3. die stärksten und schwächsten Einzelantworten
 *
 * Stufe 3 ist der Grund, warum zwei Menschen mit derselben Punktzahl
 * unterschiedliche Post bekommen. Das Ergebnis wird als fertiges HTML
 * ausgegeben und in KlickTipp in ein Feld geschrieben, damit die E-Mail nur
 * noch den Platzhalter setzen muss.
 */

export type BereichsBefund = {
  bereich: string;
  satz: string;
  anteil: number;
};

export type Auswertung = {
  ergebnis: Ergebnis;
  punkte: Record<string, number>;
  gesamt: number;
  max: number;
  prozent: number;
  /** Je Achse die Stufe, für Tests mit mehreren Achsen. */
  stufen: Record<string, AchsenStufe>;
  /** Sätze zu den Achsen, nur wo hinterlegt. */
  achsenSaetze: string[];
  staerken: BereichsBefund[];
  schwaechen: BereichsBefund[];
};

/** Höchster erreichbarer Wert einer einzelnen Frage. */
function maxWert(f: Frage): number {
  return f.antworten.reduce((m, a) => Math.max(m, a.wert), 0);
}

function stufeFuer(anteil: number): AchsenStufe {
  if (anteil >= 0.75) return "hoch";
  if (anteil >= 0.5) return "mittel";
  return "niedrig";
}

export function ermittleErgebnis(
  test: Test,
  punkte: Record<string, number>,
): Ergebnis {
  if (test.art === "matrix") {
    const lage: Record<string, "hoch" | "niedrig"> = {};
    for (const a of test.achsen) {
      lage[a.key] =
        (punkte[a.key] ?? 0) >= (a.schwelle ?? Math.ceil(a.max * 0.67))
          ? "hoch"
          : "niedrig";
    }
    const treffer = test.ergebnisse.find((e) =>
      e.lage ? Object.entries(e.lage).every(([k, v]) => lage[k] === v) : false,
    );
    return treffer ?? test.ergebnisse[test.ergebnisse.length - 1];
  }
  const summe = Object.values(punkte).reduce((a, b) => a + b, 0);
  const treffer = test.ergebnisse.find(
    (e) => summe >= (e.von ?? 0) && summe <= (e.bis ?? Number.MAX_SAFE_INTEGER),
  );
  return treffer ?? test.ergebnisse[test.ergebnisse.length - 1];
}

export function werteAus(test: Test, werte: number[]): Auswertung {
  const punkte: Record<string, number> = {};
  test.fragen.forEach((f, i) => {
    punkte[f.achse] = (punkte[f.achse] ?? 0) + (werte[i] ?? 0);
  });

  const gesamt = Object.values(punkte).reduce((a, b) => a + b, 0);
  const max = test.fragen.reduce((s, f) => s + maxWert(f), 0);
  const prozent = max ? Math.round((gesamt / max) * 100) : 0;

  const stufen: Record<string, AchsenStufe> = {};
  for (const a of test.achsen) {
    stufen[a.key] = stufeFuer(a.max ? (punkte[a.key] ?? 0) / a.max : 0);
  }

  const achsenTexte = ACHSEN_TEXTE[test.slug];
  const achsenSaetze =
    test.achsen.length > 1 && achsenTexte
      ? test.achsen
          .map((a) => achsenTexte[a.key]?.[stufen[a.key]])
          .filter((s): s is string => Boolean(s))
      : [];

  // Stufe 3: die einzelnen Bereiche. Ohne hinterlegte Details bleibt sie leer,
  // der Rest der Auswertung funktioniert trotzdem.
  const details = TEST_DETAILS[test.slug] ?? [];
  const befunde = test.fragen.map((f, i) => {
    // Sicherung: passt der Eintrag nicht mehr zur Frage, wird er weggelassen.
    // Lieber eine kürzere Auswertung als ein Satz zur falschen Situation.
    const d = details[i]?.kopf === f.kopf ? details[i] : undefined;
    const m = maxWert(f);
    const anteil = m ? (werte[i] ?? 0) / m : 0;
    return { frage: f, detail: d, anteil };
  });

  // Bei Zuordnungstests ist jede Frage richtig oder falsch. Dort sind die
  // Fehltreffer der eigentliche Wert der Auswertung, deshalb bis zu vier.
  const zuordnung = test.art === "zuordnung";
  const maxSchwach = zuordnung ? 4 : 3;

  const staerken: BereichsBefund[] = befunde
    .filter((b) => b.detail && b.anteil >= (zuordnung ? 1 : 0.75))
    .sort((a, b) => b.anteil - a.anteil)
    .slice(0, 3)
    .map((b) => ({ bereich: b.detail!.bereich, satz: b.detail!.stark, anteil: b.anteil }));

  const schwaechen: BereichsBefund[] = befunde
    .filter((b) => b.detail && b.anteil <= (zuordnung ? 0 : 0.4))
    .sort((a, b) => a.anteil - b.anteil)
    .slice(0, maxSchwach)
    .map((b) => ({ bereich: b.detail!.bereich, satz: b.detail!.schwach, anteil: b.anteil }));

  return {
    ergebnis: ermittleErgebnis(test, punkte),
    punkte,
    gesamt,
    max,
    prozent,
    stufen,
    achsenSaetze,
    staerken,
    schwaechen,
  };
}

/* ---------------------------- Ausgabe fuer die Mail ---------------------- */

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Die fertige Auswertung als HTML.
 *
 * Geht so, wie sie ist, in ein KlickTipp-Feld. Die E-Mail muss nur noch den
 * Platzhalter setzen. Bewusst ohne Klassen und ohne externes CSS, damit es in
 * jedem Mailprogramm ankommt; nur inline-styles, die überall funktionieren.
 *
 * Ohne Anrede: die kommt aus der Vorlage in KlickTipp, sonst steht der Name
 * zweimal kurz hintereinander in der Mail.
 */
export function ergebnisHtml(test: Test, a: Auswertung): string {
  const p = "margin:0 0 14px;line-height:1.55;";
  const h3 = "margin:26px 0 10px;font-size:17px;line-height:1.3;color:#136B73;";
  const li = "margin:0 0 10px;line-height:1.5;";

  const teile: string[] = [];

  teile.push(
    `<p style="${p}font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#136B73;">Dein Ergebnis</p>`,
  );
  teile.push(
    `<h2 style="margin:0 0 6px;font-size:24px;line-height:1.25;color:#1C1B18;">${esc(a.ergebnis.name)}</h2>`,
  );
  teile.push(
    `<p style="${p}font-size:17px;color:#136B73;">${esc(a.ergebnis.unter)}</p>`,
  );

  teile.push(`<p style="${p}">${esc(a.ergebnis.text)}</p>`);

  if (a.achsenSaetze.length) {
    teile.push(`<h3 style="${h3}">Deine beiden Achsen einzeln</h3>`);
    teile.push(
      `<ul style="margin:0 0 14px;padding-left:20px;">${a.achsenSaetze
        .map((s) => `<li style="${li}">${esc(s)}</li>`)
        .join("")}</ul>`,
    );
  }

  if (a.staerken.length) {
    teile.push(
      `<h3 style="${h3}">${
        test.art === "zuordnung"
          ? "Das hast du sicher erkannt"
          : "Das trägt bei euch schon"
      }</h3>`,
    );
    teile.push(
      `<ul style="margin:0 0 14px;padding-left:20px;">${a.staerken
        .map(
          (s) =>
            `<li style="${li}"><strong>${esc(s.bereich)}.</strong> ${esc(s.satz)}</li>`,
        )
        .join("")}</ul>`,
    );
  }

  if (a.schwaechen.length) {
    teile.push(
      `<h3 style="${h3}">${
        test.art === "zuordnung"
          ? "Diese Stellen sind bei dir gerutscht"
          : "Hier lohnt sich dein nächster Blick"
      }</h3>`,
    );
    teile.push(
      `<ul style="margin:0 0 14px;padding-left:20px;">${a.schwaechen
        .map(
          (s) =>
            `<li style="${li}"><strong>${esc(s.bereich)}.</strong> ${esc(s.satz)}</li>`,
        )
        .join("")}</ul>`,
    );
  }

  if (a.ergebnis.schritte?.length) {
    teile.push(`<h3 style="${h3}">Deine nächsten Schritte</h3>`);
    teile.push(
      `<ol style="margin:0 0 14px;padding-left:20px;">${a.ergebnis.schritte
        .map((s) => `<li style="${li}">${esc(s)}</li>`)
        .join("")}</ol>`,
    );
  }

  teile.push(
    `<p style="${p}font-size:14px;color:#6b6b66;">Punkte: ${a.gesamt} von ${a.max} (${a.prozent} Prozent). Der Test ist eine Selbsteinschätzung und keine Diagnose.</p>`,
  );

  return teile.join("\n");
}

/** Dieselbe Auswertung als Klartext, als Rückfallebene und für Notizfelder. */
export function ergebnisText(test: Test, a: Auswertung): string {
  const zeilen: string[] = [
    `Ergebnis: ${a.ergebnis.name}`,
    a.ergebnis.unter,
    "",
    a.ergebnis.text,
  ];
  if (a.achsenSaetze.length) {
    zeilen.push("", "Deine beiden Achsen einzeln:");
    a.achsenSaetze.forEach((s) => zeilen.push(`- ${s}`));
  }
  if (a.staerken.length) {
    zeilen.push(
      "",
      test.art === "zuordnung"
        ? "Das hast du sicher erkannt:"
        : "Das trägt bei euch schon:",
    );
    a.staerken.forEach((s) => zeilen.push(`- ${s.bereich}: ${s.satz}`));
  }
  if (a.schwaechen.length) {
    zeilen.push(
      "",
      test.art === "zuordnung"
        ? "Diese Stellen sind gerutscht:"
        : "Hier lohnt der nächste Blick:",
    );
    a.schwaechen.forEach((s) => zeilen.push(`- ${s.bereich}: ${s.satz}`));
  }
  if (a.ergebnis.schritte?.length) {
    zeilen.push("", "Deine nächsten Schritte:");
    a.ergebnis.schritte.forEach((s, i) => zeilen.push(`${i + 1}. ${s}`));
  }
  zeilen.push("", `Punkte: ${a.gesamt} von ${a.max} (${a.prozent} Prozent).`);
  return zeilen.join("\n");
}
