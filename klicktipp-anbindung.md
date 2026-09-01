# KlickTipp-Anbindung der Tests

Stand 01.09.2026.

## Kurz

Jeder Test schickt am Ende nicht mehr nur seinen Ergebnisnamen, sondern die
komplette, fertig formulierte Auswertung als HTML. In der E-Mail muss nur noch
der Platzhalter des Feldes stehen, mehr nicht.

Der Eintrag läuft über `/api/eintrag/`, also serverseitig. Der API-Schlüssel
liegt in einer Vercel-Umgebungsvariablen und kommt nie in den Browser.

## Was in der Auswertung steht

Drei Ebenen, alle automatisch aus den Antworten gebaut:

1. **Das Hauptergebnis.** Überschrift, Unterzeile, ein ausformulierter Absatz.
   Jeder Test hat dafür vier Stufen statt vorher drei.
2. **Die Achsen einzeln.** Nur beim Eltern-Test, weil er als Einziger zwei
   Achsen hat: ein Satz zur Wärme, ein Satz zur Klarheit, je nach Stand hoch,
   mittel oder niedrig.
3. **Die stärksten und schwächsten Einzelantworten.** Bis zu drei Bereiche, die
   schon tragen, und bis zu drei (bei den Zuordnungstests vier), bei denen sich
   der nächste Blick lohnt. Das ist der Grund, warum zwei Menschen mit derselben
   Punktzahl unterschiedliche Post bekommen.

Dazu die nächsten Schritte des jeweiligen Ergebnisses und eine Zeile mit der
Punktzahl.

Länge des fertigen HTML: je nach Test und Antworten 2.000 bis 3.900 Zeichen.
Die Route deckelt bei 6.000 Zeichen, damit ein Feldlimit den Eintrag nicht
kippen kann.

## Die Felder in KlickTipp

Pro Test genügt **ein** Feld vom Typ HTML. Wer die Kurzfassung zusätzlich im
Betreff verwenden will, legt ein zweites, einzeiliges Feld an.

| Zweck | Feldtyp | Inhalt |
|---|---|---|
| Auswertung | HTML | die komplette Auswertung, fertig formatiert |
| Ergebnisname (optional) | Text, einzeilig | z. B. „Zwischen den Stühlen“ |
| Unterzeile (optional) | Text, einzeilig | z. B. „Mal so, mal so. Und du selbst kommst kaum vor.“ |
| Punkte (optional) | Text, einzeilig | z. B. „12 von 24 (50 Prozent)“ |
| Klartext (optional) | Freitext | dieselbe Auswertung ohne HTML |

## Die Umgebungsvariablen

`<SLUG>` ist der Test-Slug in Großbuchstaben, Bindestrich wird Unterstrich.

```
ELTERN_TEST
WIE_KLAR_IST_DEIN_NEIN
BEDUERFNIS_ODER_WUNSCH
KONSEQUENZ_ODER_STRAFE
ABEND_TEST
KRAFT_TEST
```

Pro Test:

```
KLICKTIPP_APIKEY_<SLUG>        Schlüssel des Opt-In-Prozesses  (Pflicht)
KLICKTIPP_FELD_<SLUG>_HTML     Feld-ID des HTML-Feldes         (Pflicht)
KLICKTIPP_FELD_<SLUG>          Feld-ID für den Ergebnisnamen   (optional)
KLICKTIPP_FELD_<SLUG>_UNTER    Feld-ID für die Unterzeile      (optional)
KLICKTIPP_FELD_<SLUG>_PUNKTE   Feld-ID für die Punktzahl       (optional)
KLICKTIPP_FELD_<SLUG>_TEXT     Feld-ID für die Klartextfassung (optional)
```

Rückfallebenen, wenn für einen Test nichts Eigenes gesetzt ist:

```
KLICKTIPP_APIKEY               Schlüssel für alle übrigen Tests
KLICKTIPP_FELD_HTML            HTML-Feld für alle übrigen Tests
KLICKTIPP_FELD_TYP             Feld für den Ergebnisnamen
KLICKTIPP_FELD_TEST            Feld für den Test-Slug
```

Fehlt ein Feld, wird es einfach nicht gesetzt. Ein fehlendes Feld führt nie
dazu, dass die Eintragung scheitert.

## Stand der Einrichtung

Alle sechs Tests sind eingerichtet, Schlüssel und HTML-Feld liegen als
Umgebungsvariablen in Vercel (Production, Preview, Development). Die Feld-IDs
und Schlüssel stehen in `zugaenge-sarahmann.env`, die Datei ist gitignored.

| Test | Ergebnisfeld |
|---|---|
| Eltern-Test | field1001135 |
| Wie klar ist dein Nein | field1001158 |
| Bedürfnis oder Wunsch | field1001159 |
| Konsequenz oder Strafe | field1001160 |
| Abend-Test | field1001161 |
| Kraft-Test | field1001162 |

Die E-Mail-Vorlagen dazu liegen in `email-vorlagen-tests.md`.

Ein siebter Test (Reizprofil) ist in Arbeit. Sobald er live geht, braucht er
nach demselben Muster `KLICKTIPP_APIKEY_REIZPROFIL_TEST` und
`KLICKTIPP_FELD_REIZPROFIL_TEST_HTML`. Bis dahin laeuft er auf der Seite
durch, traegt aber nicht ein.

Solange für einen Test kein Schlüssel gesetzt ist, läuft der Test auf der Seite
normal durch, die Adresse wird aber nicht eingetragen. Der Nutzer sieht davon
nichts, es geht nur der Kontakt verloren. Deshalb: bevor ein Test beworben wird,
erst Schlüssel und Feld eintragen.

## Beim Testen

**Niemals mit einer @example.com-Adresse testen.** KlickTipp blockt die Domain
und antwortet mit `error 10`, was aussieht wie ein Formatfehler. Mit einer
echten Adresse kommt sofort HTTP 200.

## Format des Aufrufs

`POST https://api.klicktipp.com/subscriber/signin`, JSON, `fields` als
verschachteltes Objekt:

```json
{
  "apikey": "…",
  "email": "…",
  "fields": {
    "fieldFirstName": "Anna",
    "field1001135": "<p>…die komplette Auswertung…</p>"
  }
}
```
