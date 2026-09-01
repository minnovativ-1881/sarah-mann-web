# Umsetzung: Stand und Fahrplan

Ergaenzt `master-landkarte.md` (Suchraum, Markt) und `inhalts-landkarte.md` (Buch-Bauplan).

## Erledigt am 2026-09-01

**Neuer Themen-Silo** in `src/lib/artikel.ts`: `reizueberflutung`, Name „Wenn alles zu viel wird". Erscheint automatisch in Footer, Sitemap, Ueber-Sarah und unter `/wissen/reizueberflutung/`, weil alle Stellen dynamisch aus SILOS lesen.

**Vier Artikel** in `src/content/artikel/`:

| Slug | Traegt | Suchanker |
|---|---|---|
| `kind-rastet-nach-kita-und-schule-aus` | Begriffspraegung „Heimkehr-Entladung" | kind ist nach der schule aggressiv, kind ueberdreht nach kita, erschoepft nach der schule |
| `kind-staendig-ueberdreht` | Pillar des Silos, Reizsucher vs. Reizmeider | kind ist staendig ueberdreht (59 Varianten), reizueberflutung kind was tun |
| `meltdown-oder-trotzanfall` | Die zentrale Unterscheidung | unterschied meltdown trotzanfall, meltdown kind was tun |
| `gefuehlsstark-oder-adhs` | Die woertliche Frage der Zielgruppe | gefuehlsstark/hochsensibel/high need/wild oder adhs |

Alle mit 6 FAQ (FAQPage-Schema), Tabelle, Quellen, internen Links, ueber 1.400 Woertern.

**Der Test** `reizprofil-test` in `src/lib/tests-reize.ts`, registriert in `tests.ts`, mit personalisierter Auswertung in `test-details.ts`.

Bauart: Matrix mit zwei **unabhaengigen** Achsen, `suchen` und `meiden` (je 5 Fragen, max 15, Schwelle 9). Das ist der fachliche Kern: Reizsuche und Reizempfindlichkeit sind zwei Kanaele, keine Skala mit zwei Enden. Vier Ergebnisse: **Motor**, **Antenne**, **Motor und Antenne zugleich** (haeufigster Fall), **eher robust** (dann liegt es woanders, Verweis auf Schlaf und Wochenlast).

Ausdruecklich kein diagnostisches Verfahren, steht so in der FAQ.

## Die Begriffsentscheidung

Gewaehlt: **„Die Heimkehr-Entladung"**.

Geprueft und frei (Google-Autocomplete, 0 Vorschlaege): heimkehr entladung, sicherheitsentladung, zusammenreiss effekt, nachmittagssturm, ankommenssturm, heimkehreffekt, entladung nach der schule, kind haelt sich zusammen. Belegt und deshalb verworfen: „Kita-Kater" und „Schulkater" (anderweitig besetzt), „Reizkater" (Buchtitel Alexander Falk 06/2026).

Gruende fuer die Wahl: Der Begriff enthaelt den Ort (heim = sicher) und den Vorgang (Entladung = das Angestaute geht raus, nicht: das Kind ist boese). Er traegt damit die Umdeutung, auf die es ankommt. Und er schliesst an Sarahs vorhandene Sprache aus dem WilA-Kurs an, wo „Entladung" fuer Babys schon verwendet wird. Damit spannt sich ein Bogen vom Baby bis zum Schulkind.

**Korrigierbar.** Wenn Sarah einen anderen Begriff will, sind alle Alternativen oben frei und der Austausch betrifft nur zwei Dateien.

## Wichtig zur SEO-Mechanik

Der Begriff selbst hat null Suchvolumen, weil er neu ist. Deshalb ist er **nicht** der Titel-Anker. Der Artikel rankt ueber die bestehenden Suchanfragen (`seoTitel`, H2, FAQ) und fuehrt den Begriff **im Text** ein. So besetzt man einen Begriff, ohne Reichweite zu verlieren.

## Naechste Schritte

1. Artikel-Bilder (`public/bilder/artikel/<slug>.webp`) fehlen noch. Werden automatisch gefunden, sobald sie da sind.
2. Die restlichen Bruchstellen-Artikel: Morgen und Anziehen, Uebergaenge, der Abend, Sensorik beim Essen, wenn gar nichts mehr geht (Low Demand), anders reden (Declarative Language).
3. Der Reihentitel der Kinderbuch-Reihe „Anders und das ist gut so" muss wegen Imlau-Naehe neu gefasst werden.
4. Buchmanuskript nach dem 20-Kapitel-Bauplan aus `inhalts-landkarte.md`.

## Verifikation am 2026-09-01

- `npx tsc --noEmit` ohne Fehler.
- `npm run build`: erfolgreich, 84 statische Seiten, Route `/tests/reizprofil-test` erzeugt.
- Alle sechs neuen URLs liefern HTTP 200 (vier Artikel, Silo-Hub, Test).
- Test im Browser durchgeklickt: alle 10 Fragen laufen sauber durch bis zum Abschluss, der verlinkte Artikel unter dem Ergebnis stimmt.
- Datenstruktur geprueft: 5 Fragen je Achse, erreichbares Maximum 15 deckt sich mit der Deklaration, Schwelle 9 sinnvoll, alle vier Ergebnisfelder abgedeckt, keine Doppelung. Jede Antwortkombination trifft genau ein Ergebnis.
- Fragenkoepfe in `tests-reize.ts` und `test-details.ts` stimmen an allen 10 Positionen ueberein. Das war der wichtigste stille Fehler: bei Abweichung faellt die personalisierte Auswertung wortlos aus, ohne dass der Build meckert.

Nicht geprueft: die Ergebnisseite selbst. Der Test gibt das Ergebnis erst nach E-Mail-Eintrag heraus, und ein echter Eintrag haette einen KlickTipp-Kontakt angelegt.

## Befund zum Kinderbuch-Reihentitel

„Anders und das ist gut so" ist als Reihentitel schwach: Google-Autocomplete zeigt eine ganze besetzte Phrasenfamilie („jeder ist anders und das ist gut so", „ich bin anders und das ist gut so", „du bist anders und das ist gut so"). Der Titel ist ein Allgemeinplatz, kein Markenname, und liegt zusaetzlich dicht an Imlaus „Du bist anders, du bist gut".

Frei und geprueft (je 0 Autocomplete-Treffer): **Auf meine Weise**, Genau so richtig, Meine Art zu sein, Anders unterwegs, Wie ich die Welt sehe, Eins von uns.

Nebenbefund mit Folgen fuer die Vermarktung: „kinderbuch adhs 7 jahre", „kinderbuch legasthenie geschichten", „vorlesebuch anders sein grundschule" liefern alle **null** Autocomplete-Treffer. Die Kinderbuecher werden also **nicht ueber Suche gefunden**. Ihr Absatzweg sind die Elternartikel und die Amazon-Kategorien. Genau das ist der Grund, warum die Reihenfolge Artikel zuerst, Kinderbuecher spaeter richtig ist.
