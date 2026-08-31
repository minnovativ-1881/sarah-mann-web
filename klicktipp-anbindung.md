# KlickTipp-Anbindung der Tests

Was ich von dir brauche, und was die Tests dir schicken werden.

## Was ich brauche

**Die URL des Direktformulars.** Also das `action="..."` aus dem HTML-Schnipsel,
den KlickTipp ausgibt. Ein Formular reicht für alle sechs Tests, weil der Test
und das Ergebnis als eigene Felder mitkommen.

Kein Captcha, sonst verschluckt es die Eintragungen.

## Was die Tests senden

Bei jedem abgeschlossenen Test wird ein POST abgesetzt mit diesen Feldern:

| Feld | Inhalt | Beispiel |
|---|---|---|
| `email` | E-Mail-Adresse | `anna@beispiel.de` |
| `firstname` | Vorname, wenn eingetragen | `Anna` |
| `test` | welcher Test | `eltern-test` |
| `typ` | welches Ergebnis herauskam | `warmklar` |
| `punkte_*` | Punktstände je Achse | `punkte_waerme` = `10` |

Wenn KlickTipp andere Feldnamen erwartet (oft `fields[…]`), sag mir die Namen aus
dem Schnipsel, dann passe ich sie an.

## Die möglichen Werte

Damit du in KlickTipp die Tags und Kampagnen darauf aufbauen kannst:

| `test` | mögliche `typ`-Werte |
|---|---|
| `eltern-test` | `warmklar`, `herz`, `klar`, `zwischen` |
| `wie-klar-ist-dein-nein` | `klar`, `teils`, `wandernd` |
| `beduerfnis-oder-wunsch` | `sicher`, `meist`, `unsicher` |
| `konsequenz-oder-strafe` | `sicher`, `meist`, `unsicher` |
| `abend-test` | `fest`, `teils`, `wackelig` |
| `kraft-test` | `stabil`, `knapp`, `leer` |

**Vorschlag für die Auswertung:** ein Tag pro Test (`test-eltern-test`) und ein
Tag pro Ergebnis (`typ-warmklar`). Damit lässt sich später jede Kombination
anschreiben, ohne dass wir etwas nachrüsten müssen.

## Was schon steht

Die Tests halten ihr Ergebnis vollständig zurück, bis eine E-Mail eingetragen
ist. Keine Teilergebnisse vorab, keine Andeutung.

Wenn der Request scheitert, wird das Ergebnis trotzdem freigeschaltet. Das ist
Absicht: ein technischer Fehler darf keinen Interessenten kosten und keinen
Besucher vor einer leeren Wand stehen lassen.

## Danach

Ich trage die URL in `src/components/TestEngine.tsx` ein, baue und pushe. Dann
läuft es auf allen sechs Testseiten und auf der Startseite.
