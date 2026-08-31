# KlickTipp-Anbindung der Tests

Stand 31.08.2026. Die Technik steht, KlickTipp weist den Eintrag noch ab.

## Was gebaut ist

Der Eintrag läuft über `/api/eintrag/`, also serverseitig. Der API-Schlüssel
liegt in einer Vercel-Umgebungsvariablen und kommt nie in den Browser.

Der Schlüssel für den Eltern-Test ist bereits in Vercel hinterlegt als
`KLICKTIPP_APIKEY_ELTERN_TEST`, für Produktion, Preview und Development.

Weitere Tests bekommen jeweils eine eigene Variable nach demselben Muster,
Slug in Großbuchstaben, Bindestrich wird Unterstrich:

```
KLICKTIPP_APIKEY_WIE_KLAR_IST_DEIN_NEIN
KLICKTIPP_APIKEY_BEDUERFNIS_ODER_WUNSCH
KLICKTIPP_APIKEY_KONSEQUENZ_ODER_STRAFE
KLICKTIPP_APIKEY_ABEND_TEST
KLICKTIPP_APIKEY_KRAFT_TEST
```

Wer keinen eigenen Schlüssel hat, fällt auf `KLICKTIPP_APIKEY` zurück.

## Was KlickTipp gerade antwortet

Der Schlüssel wird erkannt, der Eintrag scheitert trotzdem:

| Aufruf | Antwort |
|---|---|
| Schlüssel absichtlich verfälscht | `error 100` Ungültiger API-Key |
| Richtiger Schlüssel, gültige Adresse | `error 10` Aktualisierung des Kontakts fehlgeschlagen |
| Richtiger Schlüssel, unsinnige Adresse | `error 10` derselbe Fehler |
| Richtiger Schlüssel, gar keine Adresse | `error 32` E-Mail-Adresse fehlt |

**Was daraus folgt:** Der Schlüssel ist gültig, sonst käme Fehler 100. Und der
Fehler kommt schon bei einer unsinnigen Adresse, also bevor KlickTipp die
Adresse überhaupt prüft. Das Problem liegt damit nicht an den Daten, die wir
senden, sondern am Opt-In-Prozess dahinter.

Die `uid` in der Antwort ist übrigens keine Kontakt-Nummer. Sie kommt auch dann,
wenn gar keine Adresse mitgeschickt wird, gehört also zum Konto.

## Was in KlickTipp zu prüfen ist

In dieser Reihenfolge:

1. **Ist der Opt-In-Prozess aktiv?** Ein angelegter, aber nicht scharf
   geschalteter Prozess nimmt keine Einträge an.
2. **Ist die Bestätigungsmail hinterlegt?** Ohne vollständig eingerichtete
   Double-Opt-In-Mail weist KlickTipp den Eintrag ab.
3. **Ist es der Schlüssel des Opt-In-Prozesses?** Gebraucht wird der aus dem
   Prozess selbst, nicht der aus den Konto-Einstellungen.
4. **Pflichtfelder im Prozess?** Wenn der Prozess ein Feld zwingend verlangt,
   das wir nicht senden, scheitert der Eintrag.
5. **Kontingent des Kontos.** Bei erreichter Kontaktgrenze lehnt KlickTipp
   neue Einträge ab.

Sobald sich dort etwas ändert, teste ich sofort nach. Der Code muss dafür nicht
angefasst werden.

## Was die Tests senden

| Feld | Inhalt | Beispiel |
|---|---|---|
| `email` | E-Mail-Adresse | `anna@beispiel.de` |
| `fields[fieldFirstName]` | Vorname, wenn eingetragen | `Anna` |

Optional, sobald du mir die Feld-IDs gibst, schreibe ich zusätzlich Test und
Ergebnis in eigene Felder. Dafür sind zwei weitere Variablen vorgesehen:

```
KLICKTIPP_FELD_TEST=fieldXXXXXX
KLICKTIPP_FELD_TYP=fieldXXXXXX
```

Die Feld-ID steht in KlickTipp beim jeweiligen Feld.

## Die möglichen Werte

| `test` | mögliche `typ`-Werte |
|---|---|
| `eltern-test` | `warmklar`, `herz`, `klar`, `zwischen` |
| `wie-klar-ist-dein-nein` | `klar`, `teils`, `wandernd` |
| `beduerfnis-oder-wunsch` | `sicher`, `meist`, `unsicher` |
| `konsequenz-oder-strafe` | `sicher`, `meist`, `unsicher` |
| `abend-test` | `fest`, `teils`, `wackelig` |
| `kraft-test` | `stabil`, `knapp`, `leer` |

**Vorschlag:** ein Tag pro Test und ein Tag pro Ergebnis. Damit lässt sich
später jede Kombination anschreiben, ohne dass wir etwas nachrüsten müssen.

## Die beiden Seiten

**`/danke-bestaetige-deinen-eintrag/`**
Hierhin leitet der Test nach dem Eintrag weiter. Die Seite erklärt die
Bestätigung und zeigt darunter die vollständige Auswertung.

**`/erfolgreich-angemeldet/`**
Diese URL gehört in KlickTipp als Zielseite nach dem Klick auf den
Bestätigungslink.

Beide lesen Test, Ergebnis und Vorname aus der URL:

```
/danke-bestaetige-deinen-eintrag/?test=eltern-test&typ=warmklar&name=Anna
/erfolgreich-angemeldet/?test=eltern-test&typ=warmklar&name=Anna
```

Beide funktionieren auch ohne Parameter, dann fällt nur der Ergebnisteil weg.
Beide stehen auf `noindex`, sie sollen nicht in die Suche.

**Wichtig für KlickTipp:** Wenn die Zielseite nach der Bestätigung für alle
Tests dieselbe ist, kann sie das Ergebnis nicht kennen. Zwei Wege:
entweder pro Test ein eigener Opt-In-Prozess mit eigener Zielseite
(`/erfolgreich-angemeldet/?test=eltern-test`), oder die Seite bleibt allgemein
und die persönliche Auswertung steht in der E-Mail.

## Sicherheit

Ein Fehler beim Eintragen blockiert nie den Nutzer. Die Route antwortet auch
bei einem KlickTipp-Ausfall mit `ok`, und die Weiterleitung zur Auswertung
passiert in jedem Fall. Kein Interessent steht vor einer Wand, und keiner geht
still verloren.
