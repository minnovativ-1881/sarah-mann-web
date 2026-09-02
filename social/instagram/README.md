# Karussells für @sarahmann2202

Stand 01.09.2026. Nur Karussells, nichts anderes.

## Die Farben

Die Website hat drei Flächen, nicht zwei. Für Instagram brauchen wir davon
genau diese:

| Rolle | Wert | Verwendung |
|---|---|---|
| Petrol, Signatur | `#136B73` | Akzent auf hell: Eyebrow, Kursivstelle, Linie |
| Petrol, tief | `#0C3A40` bzw. `#0D454E` | unteres Ende des dunklen Verlaufs |
| Creme | `#F6F4EF` | Grundfläche der hellen Folien |
| Ink | `#1C1B18` | Text auf hell |
| Sand | `#F2EAE0` | Akzent auf dunkel |

Warum Sand und nicht Taupe als Akzent auf dunkel: Das Taupe der Website
(`#A89B8C`) kommt auf dem hellen Ende des Verlaufs nur auf 2,1 zu 1 und ist
dort nicht mehr lesbar. Sand liegt zwischen 4,7 und 8,9.

Alle Kombinationen sind gegen WCAG geprüft. Der niedrigste Wert im ganzen
System ist 4,7 zu 1, und der gilt nur für das Eyebrow, also große Schrift.
Fließtext liegt überall über 5,1.

## Die zwei Varianten

Sie wechseln sich von Post zu Post ab. Im Profil-Grid ergibt das ein
Schachbrett, und genau das macht ein Feed erkennbar.

- **hell**: Creme-Fläche, Ink-Text, Petrol als Akzent
- **dunkel**: Verlauf von `#15727B` nach `#0D454E`, weißer Text, Sand als Akzent

Der Verlauf endet bewusst nicht in Schwarz. Sonst sieht die Folie dunkel aus
statt türkis, und die Marke ist weg.

## Format

1080 × 1440 (3:4), gerendert mit `deviceScaleFactor: 2`, also 2160 × 2880.
Alles Wichtige liegt zwischen y 180 und 1260 und zwischen x 80 und 1000, damit
der Post auch im 1:1-Zuschnitt des Explore-Feeds funktioniert. Details im Skill
`insta-post-design`.

**Upload direkt in der Instagram-App.** Die Meta Business Suite beschneidet 3:4
gelegentlich noch.

## Die sieben Folientypen

| Typ | Wofür | Felder |
|---|---|---|
| `hook` | Folie 1, die Aussage, die den Daumen stoppt | `eyebrow`, `titel`, `unter` |
| `wende` | die Kehrtwende danach | `eyebrow`, `titel`, `text` |
| `punkt` | ein Gedanke pro Folie, durchnummeriert | `nummer`, `titel`, `text` |
| `zitat` | ein Satz, der für sich steht | `titel`, `text` |
| `portraet` | Hook mit Sarah, **nur hell** | `eyebrow`, `titel`, `text` |
| `person` | wer das schreibt, rundes Foto | `eyebrow`, `text` |
| `cta` | letzte Folie | `eyebrow`, `titel`, `text`, `stichwort` oder `bio` |

Ein `*Wort*` im Titel wird kursiv und in der Akzentfarbe gesetzt. Genau eine
Betonung pro Folie, sonst verpufft sie.

Der Zähler unten rechts und die Logo-Signatur unten links entstehen von selbst.
Folie 1 bekommt statt des Zählers den Hinweis zum Weiterwischen.

## Sarahs Fotos und die Pfeile

In `fotos/` liegen die Kreise, in `pfeile/` die Wischpfeile. Beide werden je
Variante automatisch gewählt, es gibt dafür nichts einzustellen.

Die Kreise sind **gegenläufig** zugeordnet:

- dunkle Folie bekommt `sarah-kreis-hell.png`, also das Foto auf Creme
- helle Folie bekommt `sarah-kreis-dunkel.png`, also das Foto auf Petrol

So entsteht eine Scheibe mit Kontrast. Würde man gleichfarbig zuordnen, ginge
der Kreis in der Fläche unter. Und weil die Fotos schon auf der Markenfläche
aufgenommen sind, gibt es keine Freistellungskante, um die man sich kümmern
müsste.

`sarah-freisteller.png` ist die freigestellte Halbfigur für den Typ `portraet`.
**Nur auf hellen Folien.** Im Haar stecken helle Reste des ursprünglichen
Fotohintergrunds, auf Petrol sieht man sie deutlich. Der Renderer bricht mit
einer Meldung ab, wenn `portraet` in einem dunklen Deck steht.

Der Pfeil steht auf Folie 1 unten rechts, 64 px hoch, in Weiß auf dunkel und in
Petrol auf hell. Er ersetzt den Zähler, denn auf der ersten Folie weiß noch
niemand, dass es weitergeht.

Ein Gesicht gehört auf Folie 1 oder auf die vorletzte Folie, nicht auf beide.

## Ein Karussell bauen

Deck als JSON in `decks/` anlegen:

```json
{
  "titel": "Konsequenz oder Strafe",
  "variante": "dunkel",
  "quelle": "/wissen/konsequenz-oder-strafe/",
  "folien": [ { "typ": "hook", "titel": "..." } ]
}
```

Dann rendern:

```bash
node render.js decks/mein-deck.json
```

Ohne Argument werden alle Decks gerendert. Die PNG landen in
`export/<deck-name>/01.png` und so weiter.

## Hooks

Der Hook entscheidet alles. Die Prüffrage ist hart und einfach:

> **Erkennt sie sich in der ersten Zeile wieder, ohne nachzudenken?**

Wenn die Zeile einen Fachbegriff braucht, um zu wirken, ist sie zu schwach.
„Die stille Treppe ist keine Konsequenz" fällt genau darüber: Wer den
Unterschied noch nicht kennt, wischt weiter. Es muss eine Szene sein, die
gestern in der Küche stattgefunden hat.

Fünf Muster, die tragen:

| Muster | Beispiel |
|---|---|
| **Der Spiegel** | „Heute, 7:50 Uhr. Ich habe dreimal gesagt: Schuhe an." |
| **Das Urteil** | „Kein Nachtisch, weil das Gemüse liegen blieb? Das ist eine Strafe." |
| **Der verbotene Satz** | „Ich mag mein Kind gerade nicht." |
| **Die Umkehrung** | „Dein Kind hört nicht auf dich. Es hat mitgezählt." |
| **Die Zahl** | „Zwanzig Regeln. Und keine davon gilt." |

Was nicht funktioniert: Fragen ohne Reibung, Ratgeber-Ton, alles mit
„5 Tipps für", und jede Zeile, die erst eine Erklärung braucht. Keine
Gedankenstriche im Text.

Der Stoff kommt aus den Artikeln. Jede FAQ-Frage, jede Tabelle und jeder
Zwischentitel auf der Website ist ein Karussell-Kandidat. Das Feld `quelle` im
Deck hält fest, woher es stammt.

### Der Vorrat

**40 fertige Einstiege stehen in `hooks.md`**, jeder als Paar aus Folie 1 und
Folie 2, sortiert nach Silo und mit dem Artikel, aus dem er stammt. Wer ein
Karussell baut, nimmt dort ein Paar und schreibt den Rest darum herum.

Der Bauplan dieser Paare: Folie 1 spricht in ihrer Stimme, meist in der Ichform
und mit einer Uhrzeit. Folie 2 antwortet ihr in der Duform und nimmt der Szene
die Schuld. Erst erkannt werden, dann verstanden werden.

Zwei Beispiele liegen als Decks bereit:
`decks/beispiel-einstieg-hell.json` und `decks/beispiel-einstieg-dunkel.json`.

## Die letzte Folie

Sie muss die ganze Arbeit allein machen: sagen, dass es einen Test gibt, was
der Leser davon hat, und was er dafür tun muss. Deshalb hat sie drei
Nutzen-Zeilen, nicht nur eine Aufforderung.

Die drei Zeilen folgen immer demselben Bauplan:

1. **Was es ist.** „Sieben Situationen aus deinem Alltag, keine Theorie."
2. **Was am Ende dasteht.** „Am Ende weißt du, an welcher Stelle es bei euch kippt."
3. **Was du damit machst.** „Dazu drei Schritte, die du ab morgen umsetzen kannst."

Darunter der Stichwort-Kasten und eine letzte Zeile, die den Einwand wegnimmt:
„Zwei Minuten. Kostenlos. Ohne Anmeldung."

## Die Stichwörter

Ein Stichwort pro Test. Zwei Anforderungen, die zusammen knifflig sind: Es muss
positiv klingen, und es darf in einem normalen Kommentar praktisch nie
vorkommen, sonst verschickt ManyChat die Nachricht ungewollt.

Genau daran scheitern Wörter aus dem Thema. „Klarheit", „Abend" oder „Kraft"
schreibt jemand ohne jede Absicht unter einen Beitrag, und schon läuft die
Automation. Deshalb sind es **Gegenstände**: positiv besetzt, leicht zu tippen,
und niemand schreibt sie zufällig unter einen Erziehungsbeitrag.

| Test | Stichwort | Warum |
|---|---|---|
| Eltern-Test | **KOMPASS** | wo stehe ich gerade |
| Wie klar ist dein Nein | **ANKER** | eine Grenze, die hält |
| Bedürfnis oder Wunsch | **WAAGE** | abwägen, was wirklich fehlt |
| Konsequenz oder Strafe | **LEUCHTTURM** | Orientierung statt Druck |
| Abend-Test | **HAFEN** | wo der Tag ankommt |
| Kraft-Test | **QUELLE** | woher deine Kraft kommt |
| Reizprofil | **ANTENNE** | wie viel dein Kind mitbekommt |

Zahlen im Stichwort brauchen wir dadurch nicht. Sie machen es nur schwerer zu
tippen und sehen auf der Folie schlechter aus.

In ManyChat auf **enthält** stellen, nicht auf **exakt**. Die Leute schreiben
„Anker bitte" oder „ANKER 🙏", und das soll auch auslösen. Und falls doch
einmal etwas falsch auslöst, ist der Schaden klein: Es geht eine freundliche
Nachricht mit einem kostenlosen Test raus.

Buffer plant nur die Posts, die Automation kann es nicht. Bis ManyChat steht,
nimmt man `bio` statt `stichwort`, dann verweist die Folie auf den Link im
Profil.

## Ab in die Warteschlange

```bash
python social/instagram/buffer.py vorlagen-hell
python social/instagram/buffer.py vorlagen-hell --wann "2026-09-05 09:00"
python social/instagram/buffer.py vorlagen-hell --entwurf
python social/instagram/buffer.py vorlagen-hell --nur-bilder
```

Ohne Angabe landet der Beitrag in der Buffer-Warteschlange. `--wann` setzt
einen festen Termin in **Israel-Zeit**, das Skript rechnet um. `--entwurf`
legt ihn nur als Entwurf ab.

Das Deck braucht dafür zwei Felder:

```json
{
  "caption": "Der Text unter dem Beitrag …",
  "ersterKommentar": "#erziehung #elternsein …"
}
```

Ohne `caption` bricht das Skript ab. Ein Beitrag ohne Text soll nicht
versehentlich rausgehen.

### Was dabei passiert

1. Die PNG aus `export/<deck>/` werden als JPEG nach `public/social/<deck>/`
   gelegt, 1080 × 1440, rund 60 KB pro Folie.
2. Der Ordner wird committet und gepusht.
3. Das Skript wartet, bis Vercel die erste Folie ausliefert.
4. Buffer legt den Beitrag mit allen Folien an.

Der Umweg über die Website hat einen Grund: Buffer nimmt Bilder **nur als
öffentliche Adresse** entgegen, einen Upload gibt es in der API nicht. Die
Folien sind ohnehin öffentliche Werbebilder, und nebenbei entsteht unter
`/social/` ein Archiv aller Karussells.

### Drei Dinge, die beim Bauen aufgefallen sind

- **Der alte Buffer-Zugang ist tot.** Die REST-API unter
  `api.bufferapp.com` weist den Schlüssel ab, sie wird im Februar 2027
  abgeschaltet. Es läuft über GraphQL auf `https://api.buffer.com/`.
- **Instagram kennt keinen Beitragstyp „carousel".** Gültig sind `post`,
  `story` und `reel`. Ein Karussell ist ein ganz normaler `post` mit mehreren
  Bildern. Höchstens zehn, danach lehnt Instagram ab.
- **Ein echter Erstkommentar braucht einen bezahlten Buffer-Tarif.** Deshalb
  hängt das Skript die Hashtags an den Text an, getrennt durch drei Punkte in
  eigenen Zeilen. Sieht im Feed fast gleich aus.

Kanal und Organisation stehen fest im Skript, es gibt genau einen
Instagram-Kanal: `sarahmann2202`, Typ Business, verbunden.

## Was als Nächstes dazukommt

- Die Automation für die Stichwörter, siehe oben. Ohne sie läuft der CTA ins
  Leere.
