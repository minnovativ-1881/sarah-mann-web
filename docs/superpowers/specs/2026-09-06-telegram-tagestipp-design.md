# Telegram-Tagestipp: Entwurf

Datum: 2026-09-06
Status: freigegeben

## Zweck

Jeden Tag gegen 16 Uhr geht im Telegram-Kanal "Klare Führung. Volle Liebe."
(`@klarefuehrung_volleliebe`) ein kurzer Beitrag raus: ein Mini-Tipp aus einem
Artikel von sarahmann.de, dazu das Bild des Artikels und ein wechselnder
Handlungsaufruf. Der Ablauf ist vollautomatisch, niemand muss dafür online sein.

## Inhalt

Alle Beiträge werden einmalig vorab geschrieben und liegen als Datei im Repo.
Zur Laufzeit wird kein Text erzeugt. Aus 79 Artikeln entstehen rund 300
Beiträge, das reicht für etwa zehn Monate.

Ein Beitrag besteht aus einer fetten Titelzeile, drei bis fünf kurzen Absätzen
und der Kanalsignatur. Die Bildunterschrift eines Telegram-Fotos ist auf 1024
Zeichen begrenzt, die Beiträge liegen bei 400 bis 800 Zeichen. Keine Emojis,
passend zum Ton der Website.

## Handlungsaufrufe

Jeder Beitrag bekommt genau einen Button, dazu immer die Kanalsignatur als
Schlusszeile. Die Signatur wirkt nur bei Weiterleitungen, kostet aber nichts.

Zyklus über sechs Positionen, danach von vorn:

| Position | Button |
|---|---|
| 1 | Ganzer Artikel |
| 2 | Weiterleiten |
| 3 | Test aus dem Frontmatter des Artikels |
| 4 | Verwandter Artikel aus dem Frontmatter |
| 5 | Weiterleiten, dazu eine Reaktionszeile im Text |
| 6 | Test aus dem Frontmatter des Artikels |

Der Test landet damit auf jedem dritten Beitrag. Bewusst nur ein Button pro
Beitrag: Zwei Auswahlmöglichkeiten senken die Klickrate auf beide.

## Heikle Beiträge

Beiträge, die körperliche Gewalt, Strafe, elterliche Wut, Warnzeichen,
ärztliche Abklärung, die Abgrenzung zu ADHS, Notfallnummern oder riskante
Schlafverkürzungen berühren, werden mit `heikel: true` markiert. Sie werden
erst gepostet, wenn `freigegeben: true` gesetzt ist. Ohne Freigabe überspringt
der Job sie stillschweigend. Damit kann nichts rausgehen, das Timon nicht
gesehen hat.

## Aufbau

    telegram/
      tipps/<silo>.yaml     die Beiträge, neun Dateien nach Silo
      plan.json             festgelegte Sendereihenfolge, einmal erzeugt
      zustand.json          nächste Position, Protokoll des Gesendeten
      skripte/bauen.mjs     Plan und Vorschau erzeugen, Längen prüfen
      skripte/posten.mjs    der eigentliche Versand
      vorschau/             HTML-Vorschau zum Durchsehen
    .github/workflows/telegram-tipp.yml

Die Website selbst wird nicht verändert. Es kommt kein Code in `src/`, und für
den Kanal muss nie neu deployt werden.

Datensatz eines Beitrags:

    - id: grenzen-setzen-kleinkind-01
      artikel: grenzen-setzen-kleinkind
      titel: Der Unterschied zwischen einer Bitte und einer Grenze
      text: |
        ...
      heikel: false

## Täglicher Ablauf

Der Job startet um 14:00 und 15:00 UTC. Er prüft selbst, ob es in Berlin gerade
16 Uhr ist, und bricht sonst ab. Damit stimmt die Uhrzeit über die
Zeitumstellung hinweg.

1. Prüfen, ob heute schon etwas rausging (verhindert Doppelversand)
2. Nächsten Beitrag aus dem Plan nehmen, nicht freigegebene heikle überspringen
3. Bildunterschrift und Button für diese Position bauen
4. `sendPhoto` an den Kanal, Bild als URL von sarahmann.de
5. `zustand.json` fortschreiben und ins Repo committen

Weder Vercel noch GitHub garantieren eine minutengenaue Ausführung. Geplant ist
"gegen 16 Uhr", Abweichungen von einigen Minuten sind normal.

## Bilder

Telegram nimmt WebP bei `sendPhoto` nicht zuverlässig an. Die 80 Artikelbilder
werden einmalig nach JPG konvertiert und liegen unter
`public/bilder/telegram/<slug>.jpg`. Telegram holt sie per URL von sarahmann.de,
es wird nichts hochgeladen.

## Fehlerfall

Schlägt der Versand fehl, bricht der Job ab und GitHub schickt eine E-Mail. Die
Position rückt nicht vor, der Beitrag geht am nächsten Tag raus. Verpasste Tage
werden nicht nachgeholt: ein Tag Lücke ist besser als zwei Beiträge auf einmal.

Fällt der Vorrat unter 30 Beiträge, schickt der Bot eine private Nachricht an
Timon. Das lässt einen Monat Zeit zum Nachlegen.

## Zugangsdaten

Der Bot-Token liegt lokal in `.env.local` (nicht im Repo) und in den
GitHub-Secrets als `TELEGRAM_BOT_TOKEN`. Für die Warnmeldungen kommt
`TELEGRAM_ADMIN_CHAT_ID` dazu. Der Kanalname steht offen im Workflow, er ist
kein Geheimnis.

## Bewusst nicht enthalten

Keine Datenbank, der Zustand ist eine Datei im Repo. Keine KI zur Laufzeit.
Keine Auswertung von Reaktionen. Kein Nachholen verpasster Tage. Kein
Handlungsaufruf auf die Startseite, weil ein konkreter Artikel besser wirkt.

## Offener Punkt

Im Kanal sind Reaktionen zurzeit deaktiviert. Der Handlungsaufruf an Position 5
wirkt erst, wenn sie in den Kanaleinstellungen eingeschaltet werden.
