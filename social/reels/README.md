# Zahlen-Reels für @sarahmann2202

Kurze Reels (30 bis 40 Sekunden) aus den aufrüttelndsten Zahlen der
Sammlung `../statistiken-reels.md`. Bewegtes Foto oben, gut lesbarer Text
darunter, gesprochen von Sarahs eigener Stimme.

## Die Stimme

**Sarahs Professional Voice Clone** aus dem ElevenLabs-Konto, Voice-ID
`REJHCJAXPaPT3ZXhOrax` („Sarah - Babyschlafberaterin"), trainiert auf ihren
YouTube-Videos. Modell `eleven_v4`, Stabilität 0,0, Ähnlichkeit 0,9, dazu die
Regieanweisung vorn, die Timon am 18.10.2026 für die Kurse gewählt hat. Sie
wird gespielt, nicht gelesen. Alles steht in `stimme.json`.

Achtung: Im Konto liegt auch eine Standardstimme namens „Sarah". Immer über
die Voice-ID gehen, nie über den Namen.

Kosten: rund 400 Credits je Reel inklusive Gegenprobe.

## Ablauf je Reel

```bash
python vertonen.py z01-weitergabe --pruefen    # Stimme + Gegenprobe per Spracherkennung
python bauen.py z01-weitergabe                 # Komposition mit exakten Szenenzeiten
cd projekt && npx --yes hyperframes@0.8.139 render -o renders/z01-weitergabe.mp4
```

Die Gegenprobe immer lesen. Besonders das **Stichwort** muss richtig
verstanden werden: Bei z04 kam einmal „Hasen" statt „Hafen" heraus, die
zweite Aufnahme war sauber.

`python bauen.py <id> --still` baut ohne Ton mit geschätzten Zeiten, für
schnelle Standbilder: `npx --yes hyperframes@0.8.139 snapshot --at 1.6,13 --no-end --describe false --timeout 30000`.

## Gestaltung

- **Foto oben** (1080 × 1060) mit langsamem Ken-Burns-Zug, läuft per Maske in
  die Markenfläche aus. Alle Fotos sind 1536 × 1024 quer. Bildfüllend im
  Hochformat müssten sie fast doppelt hochgerechnet werden und würden weich.
- **Text darunter** auf ruhigem Grund, nie auf dem Foto. Cormorant Garamond 600
  mit Normalziffern (`lnum`), die Mediävalziffern der Schrift hängen sonst
  unter die Zeile.
- **Safe Zones:** Text nur zwischen y 905 und 1350, rechts 150 px frei für
  Instagrams Knöpfe. Darunter bleibt die Fläche leer, dort liegt die Caption.
- **Zwei Varianten** wie bei den Karussells, abwechselnd: `dunkel` (Petrol,
  Schrift weiß, Akzent Sand) und `hell` (Creme, Schrift Ink, Akzent Petrol).
- **Erste Szene steht ab Bild 0**, sie ist zugleich das Vorschaubild.
- **Schluss:** Sarahs Foto im Kreis, Unterschrift-Logo, Stichwort als Pille.

HyperFrames-Falle: Die Szenen-Hülle (`.clip`) erzwingt volle Breite und
vererbt `white-space: nowrap`. Deshalb steckt jeder Text in einem eigenen
`.box`-Rahmen mit fester Breite und `white-space: normal`.

## Aufbau eines Skripts (`reels.json`)

Bewährt aus Hier und Wir, von Timon als „ziemlich genial" bezeichnet:

1. **Hook** in ihrer Stimme oder als Frage, sofort aussagekräftig
2. **Messung:** wer, wie viele, wie erhoben
3. **Zahl**, mit Quelle im Bild
4. **Zweite Zahl** als Gegenstück
5. **Haltungssatz** von Sarah, nie ein erfundenes Erlebnis
6. **Schmerz**, die Szene, in der sich die Zuschauerin wiedererkennt
7. **Stichwort** mit dem, was sie bekommt

Zahlen im Sprechtext immer **ausgeschrieben** („sechsundzwanzig Prozent"),
im Bild als Ziffer.

## Die sieben Reels

| Nr | Zahl | Variante | Stichwort |
|---|---|---|---|
| z01 | Zwei von drei geben Strafen weiter, sonst 5 % | dunkel | LEUCHTTURM |
| z02 | Bis 2000 war der Klaps erlaubt, 76,4 % → 30,9 % | hell | KOMPASS |
| z03 | 26,3 % haben ihr Kind angeschrien | dunkel | ANKER |
| z04 | Mütter: 60 Min. weniger Schlaf, nach sechs Jahren noch 20 | hell | HAFEN |
| z05 | Fair verteilt? Väter 82 %, Mütter 61 % | dunkel | QUELLE |
| z06 | Burnout hängt an der Kultur, nicht am Geld | hell | QUELLE |
| z07 | Jedes 5. Kleinkind hat ein eigenes Tablet | dunkel | ANTENNE |

Die Captions stehen im jeweiligen Eintrag in `reels.json`, mit Quelle.
Fertige Videos: `projekt/renders/`.
