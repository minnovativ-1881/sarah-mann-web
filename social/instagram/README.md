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
| **Der Spiegel** | „Du sagst es dreimal. Beim vierten Mal wirst du laut." |
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

## Der CTA

Aktuell steht auf der letzten Folie ein Stichwort. Das ist bewusst so, weil ein
Link in der Bio bei einem neuen Konto fast nichts bringt und ein Kommentar
zusätzlich die Reichweite hebt.

Damit das Stichwort automatisch beantwortet wird, braucht es ein Werkzeug für
Instagram-Automationen, zum Beispiel ManyChat. Buffer kann das nicht, Buffer
plant nur die Posts. Bis das steht, geht auch die Variante mit `bio` statt
`stichwort`, dann verweist die Folie auf den Link im Profil.

Ein Stichwort pro Test, damit man später sieht, welcher Post welchen Test
gezogen hat:

| Test | Stichwort |
|---|---|
| Eltern-Test | TYP |
| Wie klar ist dein Nein | NEIN |
| Bedürfnis oder Wunsch | WUNSCH |
| Konsequenz oder Strafe | STRAFE |
| Abend-Test | ABEND |
| Kraft-Test | KRAFT |
| Reizprofil | REIZ |

## Was als Nächstes dazukommt

- Anbindung an Buffer, damit die fertigen Folien direkt in die Warteschlange
  wandern. Der Schlüssel liegt bereits in `zugaenge-sarahmann.env`.
