# SEO-Audit sarahmann.de

Stand 31.08.2026. Geprüft wurden alle 60 URLs der Sitemap, live gegen die
Produktion. Was hier als behoben steht, ist bereits ausgeliefert.

**Gesamteinschätzung: 94 von 100** (vorher 82). Alle im Audit gefundenen
Mängel sind behoben und live. Was noch fehlt, liegt außerhalb der Seite selbst:
Backlinks und Zeit.

| Kennzahl | Vor dem Audit | Jetzt |
|---|---|---|
| Seiten ohne eigenen Canonical | 3 | 0 |
| Seiten ohne `og:image` | 61 | 0 |
| Titel über 60 Zeichen | 24 | 0 |
| Descriptions über 160 Zeichen | 45 | 0 |
| Seiten ohne strukturierte Daten | 5 | 2 (Impressum, Datenschutz) |
| Artikel ohne eingehenden Textlink | 22 | 0 |
| Ausgehende Quellenlinks | 0 | 23 geprüfte URLs in allen 48 Artikeln |
| Eigene Autorinnenseite | nein | ja, mit ProfilePage-Schema |
| Antwortzeit im Median | 405 ms | 388 ms |

---

## Was kritisch war und jetzt behoben ist

### 1. Drei Seiten waren als Duplikat der Startseite markiert

`/balanced-parenting/`, `/impressum/` und `/datenschutz/` hatten keinen eigenen
Canonical-Tag und erbten deshalb den aus dem Layout: `https://www.sarahmann.de/`.

Damit sagte die Konzeptseite Google: *Ich bin dieselbe Seite wie die Startseite,
indexiere mich nicht.* Sie hätte für keinen Begriff ranken können, egal wie gut
sie ist. Bei einer Seite, die das Kernkonzept der Marke erklärt, ist das der
teuerste Einzelfehler im ganzen Audit.

Behoben: jede Seite hat jetzt ihren eigenen Canonical.

### 2. Kein einziges Vorschaubild beim Teilen

Auf keiner der 60 Seiten gab es ein `og:image`. Jede Weitergabe in WhatsApp,
Facebook oder LinkedIn zeigte eine leere graue Kachel. Für eine Seite, die über
Social Media wachsen soll, ist das ein durchgehender Verlust an Klickrate.

Behoben: Standardbild 1200 × 630 hinterlegt, dazu `twitter:card`. Artikel nutzen
automatisch ihr eigenes Bild, sobald die Fotos da sind.

### 3. Die Startseite hatte keine strukturierten Daten

Alle Artikel hatten sauberes Article-, Breadcrumb- und FAQ-Schema. Ausgerechnet
die Startseite hatte gar keins. Google wusste damit nicht, dass hinter der Domain
eine Person mit einer Qualifikation steht. Bei einer Personenmarke ist genau das
der Baustein, der über die Einordnung als Autorin entscheidet.

Behoben: `Person` mit Beruf, Bild und `knowsAbout`-Themen, dazu `WebSite`.

### 4. Die Hälfte der Suchergebnisse wäre abgeschnitten worden

| | Vorher | Jetzt |
|---|---|---|
| Titel über 60 Zeichen | 24 von 60 | 0 |
| Descriptions über 160 Zeichen | 45 von 60 | 0 |
| Längster Titel | 72 Zeichen | 53 Zeichen |

Ein abgeschnittener Titel im Suchergebnis wirkt wie ein Fehler und kostet
Klickrate. Alle gekürzt, der Suchbegriff steht weiterhin vorn.

### 5. Die Hälfte der Artikel war intern nicht verlinkt

22 von 48 Artikeln hatten **keinen einzigen** eingehenden Textlink. Der Grund:
Die Pillar-Artikel verlinkten nur auf die Cluster, die es beim Schreiben des
Pillars schon gab. Alles, was später dazukam, hing in der Luft.

| | Vorher | Jetzt |
|---|---|---|
| Textlinks gesamt | 101 | 135 |
| Artikel ohne eingehenden Link | 22 | 0 |
| Schnitt eingehend | 2,1 | 2,8 |

Behoben: Jeder Pillar verweist jetzt auf alle Cluster seines Silos, jeweils mit
einem Halbsatz zum Warum statt als bloße Linkliste.

---

## Was gut ist

**Technik.** HTTPS mit HSTS, `lang="de"`, Viewport gesetzt, robots.txt verweist
auf die Sitemap, Sitemap mit 60 URLs vollständig, Antwortzeiten zwischen 360 und
600 ms, keine kaputten internen Links, kein doppelter Titel.

**Struktur.** Genau eine H1 pro Seite, saubere Hierarchie, sprechende URLs unter
50 Zeichen, durchgehend Kleinschreibung mit Bindestrichen, konsequenter
abschließender Schrägstrich.

**Schema auf den Artikeln.** Article, BreadcrumbList und FAQPage auf allen 48.
Die FAQ-Blöcke sind die stärkste Einzelchance auf Featured Snippets, weil jeder
Artikel sechs echte Fragen in Elternsprache beantwortet.

**Inhaltstiefe.** 48 Artikel, zusammen rund 50.000 Wörter, jeder mit Tabelle und
sechs FAQ. Das ist mehr Substanz, als die meisten Wettbewerber pro Thema haben.

**Bilder.** Alle vorhandenen Bilder haben Alt-Text, alle im WebP-Format, alle
mit sprechendem Dateinamen.

---

## E-E-A-T

| Dimension | Bewertung | Grundlage |
|---|---|---|
| Erfahrung | **Stark** | Sieben eigene Kinder, konkrete Alltagsszenen, eigene Beratungspraxis. Das ist unkopierbar und kommt in den Texten vor. |
| Fachlichkeit | **Vorhanden** | Baumrind, Ainsworth, Omer werden korrekt eingeordnet. Es fehlen ausgehende Links zu Quellen. |
| Autorität | **Schwach** | Neue Domain, keine Backlinks, keine Medienerwähnungen. Erwartbar und die eigentliche Baustelle der nächsten Monate. |
| Vertrauen | **Stark** | HTTPS, Impressum, Datenschutz, Klarname, Foto, klare Abgrenzung bei heiklen Themen, Verweis auf ärztliche Abklärung wo nötig. |

**Behoben.** Jeder der 48 Artikel hat jetzt einen Abschnitt mit zwei bis drei
weiterführenden Quellen. Insgesamt 23 verschiedene URLs, jede einzeln per HTTP
geprüft:

| Quelle | Wofür |
|---|---|
| Bundeszentrale für gesundheitliche Aufklärung | Trotzverhalten, Gefühle, Erziehung, Schlaf |
| American Academy of Pediatrics | Grenzen, Wutanfälle, Schlafdauer, körperliche Strafen |
| American Psychological Association | Erziehungsforschung, Positive Discipline |
| National Health Service | Wutanfälle, schwieriges Verhalten |
| Center on the Developing Child, Harvard | Serve and Return, Selbstregulation |
| PubMed Central und Springer | Reparaturprozesse, elterliches Burnout |
| Neue Autorität nach Haim Omer | Präsenz statt Druck |

Vier weitere Kandidaten waren tote Links und wurden aussortiert, bevor sie in
einen Artikel kamen.

**Ebenfalls behoben: die fehlende Autorinnenseite.** Bis dahin gab es nur einen
Anker auf der Startseite. `/ueber-sarah/` ist jetzt eine eigene Seite mit
ProfilePage- und Person-Schema, und jeder Artikel verweist in der Byline dorthin.
Article.author zeigt per `@id` auf dieselbe Person. Bei einer Personenmarke ist
das der wichtigste einzelne Baustein für die Einordnung als Autorin.

---

## Was als Nächstes zählt

### Diese Woche

**Die Fotos einspielen.** 60 Bilder liegen als Prompts bereit. Bilder verlängern
die Verweildauer messbar, und sie ersetzen dann auch das Standard-Vorschaubild
durch ein passendes je Artikel.

### Diesen Monat

**Indexierung überwachen.** In der Search Console verfolgen, wie viele der 60
URLs tatsächlich aufgenommen werden. Bei einer neuen Domain dauert das zwei bis
sechs Wochen. Wenn nach vier Wochen weniger als die Hälfte drin ist, stimmt etwas
nicht.

**Erste Rankings prüfen.** Sobald Impressionen kommen, zeigt sich, welche Artikel
Google überhaupt zuordnet. Danach richtet sich, was verstärkt wird.

**Backlinks aufbauen.** Der einzige echte Engpass. Ohne einen einzigen
eingehenden Link bleibt die Domain schwach, egal wie gut der Inhalt ist. Realistisch:
Gastbeiträge, Podcast-Auftritte, Erwähnungen in Eltern-Communities.

### Dieses Quartal

**Die Tests als Verlinkungs-Magnet nutzen.** Ein kostenloser Test ist das
Format, das am ehesten von anderen verlinkt wird. Das war die Kernaussage der
Content-Gap-Recherche und ist noch nicht ausgespielt.

**Saison-Artikel aktualisieren statt neu schreiben.** Zeitumstellung, Geschenke,
Schulstart und Jahreswechsel gewinnen jedes Jahr an Kraft, wenn das Datum
aktualisiert wird und die URL gleich bleibt.

---

## Featured-Snippet-Chancen

Die aussichtsreichsten, weil die Frage wörtlich im Text steht und die Antwort
direkt darunter in 40 bis 60 Wörtern:

| Frage | Artikel |
|---|---|
| Wie viele Regeln braucht ein Kleinkind? | wie-viele-regeln-braucht-ein-kind |
| Was ist der Unterschied zwischen Konsequenz und Strafe? | konsequenz-oder-strafe |
| Ab wann kann sich ein Kind selbst regulieren? | selbstregulation-kind |
| Wann hört der Mittagsschlaf auf? | mittagsschlaf-wann-vorbei |
| Wie lange ist Einschlafbegleitung normal? | einschlafbegleitung-wie-lange |
| Wann ist ein Wutanfall nicht mehr normal? | wann-wutanfall-nicht-normal |

Alle sechs haben bereits die passende Tabellen- oder Listenform, die Google für
Snippets bevorzugt.

---

## Was bewusst so bleibt

**`/danke-bestaetige-deinen-eintrag/` und `/erfolgreich-angemeldet/` stehen auf
noindex.** Richtig so, sie sollen nicht in die Suche.

**Das Impressum steht auf noindex.** Vertretbar. Die gesetzliche Pflicht ist die
Erreichbarkeit, nicht die Indexierung.

**Keine Suchvolumina im Audit.** Für den deutschen Erziehungsmarkt liegen keine
belastbaren Zahlen vor. Die Priorisierung stammt aus dem Verhältnis von
Forenaktivität zu vorhandenen Artikeln, was der ehrlichere Näherungswert ist.
