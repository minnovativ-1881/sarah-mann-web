import Link from "next/link";
import { KachelBild } from "@/components/ArtikelBild";
import {
  SILOS,
  artikelImSilo,
  siloAnzahl,
  zahlwort,
  artikelUrl,
  findeBild,
  siloUrl,
  type Artikel,
  type SiloSlug,
} from "@/lib/artikel";
import { TESTS, testUrl } from "@/lib/tests";

/**
 * Wegweiser.
 *
 * Die Startseite muss auf dem Handy die Arbeit des Menüs mitmachen, weil
 * Menüs dort kaum geöffnet werden. Diese drei Blöcke sind deshalb bewusst
 * Navigation und nicht Deko: von der Startseite aus soll jeder Bereich der
 * Seite in einem Griff erreichbar sein.
 */

/* ------------------------------ Themen (Silos) ----------------------------- */

export function ThemenWegweiser({
  ueberschrift = "Wo möchtest du anfangen?",
  eyebrow,
  einleitung,
  hintergrund = "bg-cream",
}: {
  ueberschrift?: string;
  eyebrow?: string;
  einleitung?: string;
  hintergrund?: string;
}) {
  const silos = Object.keys(SILOS) as SiloSlug[];
  const beschriftung = eyebrow ?? `Die ${zahlwort(siloAnzahl())} Themen`;
  return (
    <section className={`section-padding ${hintergrund}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-12">
          <p className="text-overline text-terra mb-6">{beschriftung}</p>
          <h2
            className="font-serif text-deep"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1 }}
          >
            {ueberschrift}
          </h2>
          <div className="divider-terra" />
          {einleitung && (
            <p className="text-deep/75 leading-relaxed mt-7" style={{ fontSize: "1.12rem" }}>
              {einleitung}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {silos.map((key) => {
            const silo = SILOS[key];
            const anzahl = artikelImSilo(key).length;
            if (!anzahl) return null;
            return (
              <Link key={key} href={siloUrl(key)} className="kachel group flex flex-col">
                <KachelBild
                  src={findeBild("silos", key)}
                  alt={silo.name}
                  hoehe="11rem"
                  position="center 45%"
                />
                <div className="px-4 pt-6 pb-4 flex flex-col flex-1">
                  <h3 className="font-serif text-deep text-xl lg:text-2xl leading-snug mb-3 group-hover:text-terra transition-colors">
                    {silo.name}
                  </h3>
                  <p className="text-deep/65 text-sm leading-relaxed flex-1">
                    {silo.beschreibung}
                  </p>
                  <p className="text-overline text-terra/70 mt-6">
                    {anzahl} Artikel
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Tests ---------------------------------- */

export function TestWegweiser({
  hintergrund = "bg-cream-dark",
  ausser,
  mitBild = true,
}: {
  hintergrund?: string;
  /** Diesen Test weglassen, z.B. weil er auf der Seite schon läuft. */
  ausser?: string;
  /** Ohne Fotos. Auf der Startseite, sonst wird sie zum Bilderkatalog. */
  mitBild?: boolean;
}) {
  const liste = TESTS.filter((t) => t.slug !== ausser);
  if (!liste.length) return null;
  return (
    <section className={`section-padding ${hintergrund}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-12">
          <p className="text-overline text-terra mb-6">Kostenlos, ohne Anmeldung</p>
          <h2
            className="font-serif text-deep"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1 }}
          >
            Die anderen Tests
          </h2>
          <div className="divider-terra" />
          <p className="text-deep/75 leading-relaxed mt-7" style={{ fontSize: "1.12rem" }}>
            Jeder Test dauert zwei bis drei Minuten und dreht sich um eine
            einzige Alltagsfrage. Das Ergebnis kommt per E-Mail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liste.map((t) => (
            <Link key={t.slug} href={testUrl(t.slug)} className="kachel group flex flex-col">
              {mitBild && (
                <KachelBild
                  src={findeBild("tests", t.slug)}
                  alt={t.titel}
                  hoehe="11rem"
                  position="center 30%"
                />
              )}
              <div className="px-4 pt-6 pb-4 flex flex-col flex-1">
                <p className="text-overline text-terra/70 mb-4">{t.dauer}</p>
                <h3 className="font-serif text-deep text-xl lg:text-2xl leading-snug mb-3 group-hover:text-terra transition-colors">
                  {t.titel}
                </h3>
                <p className="text-deep/65 text-sm leading-relaxed flex-1">{t.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Neue Artikel ------------------------------- */

export function NeueArtikel({
  artikel,
  hintergrund = "bg-cream",
}: {
  artikel: Artikel[];
  hintergrund?: string;
}) {
  if (!artikel.length) return null;
  return (
    <section className={`section-padding ${hintergrund}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-overline text-terra mb-6">Zuletzt geschrieben</p>
            <h2
              className="font-serif text-deep"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1 }}
            >
              Neu im Wissensbereich
            </h2>
            <div className="divider-terra" />
          </div>
          <Link
            href="/wissen/"
            className="text-terra underline underline-offset-4 hover:text-midnight transition-colors"
          >
            Alle Artikel ansehen
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artikel.map((a) => (
            <Link key={a.slug} href={artikelUrl(a.slug)} className="kachel group flex flex-col">
              <KachelBild src={a.bild} alt={a.bildAlt} hoehe="11rem" position={a.bildPosition} />
              <div className="px-4 pt-6 pb-4 flex flex-col flex-1">
                <p className="text-overline text-terra/70 mb-4">{SILOS[a.silo].name}</p>
                <h3 className="font-serif text-deep text-xl lg:text-2xl leading-snug mb-3 group-hover:text-terra transition-colors">
                  {a.titel}
                </h3>
                <p className="text-deep/65 text-sm leading-relaxed flex-1">
                  {a.beschreibung}
                </p>
                <p className="text-deep/40 text-xs tracking-wide mt-6">
                  {a.lesezeit} Min. Lesezeit
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Vollständiges Verzeichnis ------------------------ */

/**
 * Alle Artikel als reine Textliste, nach Silo gruppiert.
 *
 * Zwei Aufgaben: der Leser überblickt in einem Bildschirm, was es gibt, und
 * jeder Artikel bleibt von der Übersicht aus direkt verlinkt. Das ist für die
 * interne Verlinkung wichtiger als hübsche Kacheln.
 */
export function ArtikelVerzeichnis({ hintergrund = "bg-cream-dark" }: { hintergrund?: string }) {
  const silos = Object.keys(SILOS) as SiloSlug[];
  return (
    <section className={`section-padding ${hintergrund}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-overline text-terra mb-6">Das ganze Verzeichnis</p>
        <h2
          className="font-serif text-deep"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.1 }}
        >
          Alle Artikel auf einen Blick
        </h2>
        <div className="divider-terra" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mt-12">
          {silos.map((key) => {
            const liste = artikelImSilo(key);
            if (!liste.length) return null;
            return (
              <div key={key}>
                <Link
                  href={siloUrl(key)}
                  className="font-serif text-terra text-xl hover:text-midnight transition-colors"
                >
                  {SILOS[key].name}
                </Link>
                <ul className="mt-5 space-y-3">
                  {liste.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={artikelUrl(a.slug)}
                        className="text-deep/70 hover:text-terra transition-colors text-sm leading-snug"
                      >
                        {a.titel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Schnellzugriff ----------------------------- */

const zugriffe = [
  {
    href: "/tests/eltern-test/",
    kopf: "Test starten",
    zeile: "Zwei Minuten, acht Situationen, dein Ergebnis per E-Mail.",
  },
  {
    href: "/wissen/",
    kopf: "Wissen",
    zeile: "Artikel zu Grenzen, Gefühlen, Schlaf und Übergängen.",
  },
  {
    href: "/balanced-parenting/",
    kopf: "Das Konzept",
    zeile: "Warum Wärme und Klarheit keine Gegensätze sind.",
  },
  {
    href: "/ueber-sarah/",
    kopf: "Über Sarah",
    zeile: "Pädagogin, Schlafberaterin, Mutter von sieben Kindern.",
  },
];

/**
 * Schmale Leiste direkt unter dem Hero.
 *
 * Auf dem Handy wird das Menü oben kaum geöffnet. Wer auf der Startseite
 * landet, muss die vier Bereiche der Seite trotzdem sofort sehen, ohne dafür
 * scrollen oder ein Menü suchen zu müssen.
 */
export function SchnellZugriff() {
  return (
    <nav aria-label="Bereiche dieser Seite" className="bg-cream border-y border-cream-mid">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-cream-mid">
          {zugriffe.map((z) => (
            <Link
              key={z.href}
              href={z.href}
              className="group bg-cream hover:bg-tint transition-colors px-5 py-7 lg:px-7 lg:py-9"
            >
              <p className="font-serif text-deep text-lg lg:text-xl group-hover:text-terra transition-colors">
                {z.kopf}
              </p>
              <p className="text-deep/60 text-sm leading-snug mt-2">{z.zeile}</p>
              <span className="text-terra text-xs tracking-widest uppercase mt-4 inline-block">
                Ansehen
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
