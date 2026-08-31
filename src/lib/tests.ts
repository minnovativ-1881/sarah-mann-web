/**
 * Test-System.
 *
 * Alle Tests sind reine Daten, damit ein neuer Test nur ein Eintrag hier ist
 * und keine neue Komponente braucht. Zwei Bauarten:
 *
 *  - "matrix": zwei Achsen, vier Ergebnisfelder (Wärme x Klarheit).
 *  - "skala":  eine Achse, Ergebnis nach Punktebereich.
 *  - "zuordnung": jede Frage hat eine richtige Antwort, Ergebnis nach Trefferzahl.
 *
 * Alles muss serialisierbar bleiben, weil die Daten vom Server in eine
 * Client-Komponente wandern. Deshalb keine Funktionen in den Objekten.
 */

export type Antwort = { text: string; wert: number };

export type Frage = {
  /** Kurzer Titel über der Situation, z.B. "An der Kasse". */
  kopf: string;
  /** Die Situation in zwei bis drei Sätzen. */
  szenario: string;
  /** Auf welche Achse zahlt die Frage ein. */
  achse: string;
  antworten: Antwort[];
  /** Nur bei "zuordnung": kurze Auflösung nach der Antwort. */
  aufloesung?: string;
};

export type Ergebnis = {
  key: string;
  name: string;
  unter: string;
  text: string;
  /** Was jetzt konkret hilft. Zwei bis vier Punkte. */
  schritte?: string[];
  /** Bei "matrix": welche Achsenlage. */
  lage?: Record<string, "hoch" | "niedrig">;
  /** Bei "skala"/"zuordnung": Punktebereich, beide Grenzen inklusive. */
  von?: number;
  bis?: number;
};

export type Test = {
  slug: string;
  art: "matrix" | "skala" | "zuordnung";
  titel: string;
  seoTitel?: string;
  eyebrow: string;
  /** Der Aufhänger über dem Start, in der Sprache der Eltern. */
  intro: string;
  beschreibung: string;
  dauer: string;
  achsen: { key: string; name: string; max: number; schwelle?: number }[];
  fragen: Frage[];
  ergebnisse: Ergebnis[];
  /** Artikel, zu dem der Test gehört. */
  artikel?: string;
  faq?: { frage: string; antwort: string }[];
};

/* ------------------------------------------------------------------ *
 * 1. Der Eltern-Test (Hauptasset, Wärme x Klarheit nach Baumrind)
 * ------------------------------------------------------------------ */

const elternTyp: Test = {
  slug: "eltern-test",
  art: "matrix",
  titel: "Welcher Eltern-Typ bist du?",
  seoTitel: "Erziehungsstil-Test: Welcher Eltern-Typ bist du? (kostenlos)",
  eyebrow: "Der kostenlose Test",
  intro:
    "Acht ganz normale Situationen aus dem Familienalltag. Keine Theorie, keine Fachbegriffe. Am Ende siehst du, wo du zwischen Wärme und Klarheit gerade stehst.",
  beschreibung:
    "Kostenloser Erziehungsstil-Test auf den beiden Achsen, die die Forschung seit sechzig Jahren untersucht: Wärme und Klarheit. Acht Alltagssituationen, zwei Minuten, danach die ausführliche Auswertung.",
  dauer: "2 Minuten",
  achsen: [
    { key: "waerme", name: "Wärme", max: 12, schwelle: 8 },
    { key: "klarheit", name: "Klarheit", max: 12, schwelle: 8 },
  ],
  artikel: "autoritativer-erziehungsstil",
  fragen: [
    {
      kopf: "An der Kasse",
      szenario:
        "Dein Kind bekommt keinen Schokoriegel und weint los. Die Leute schauen.",
      achse: "waerme",
      antworten: [
        { text: "Ich sage ihm, es soll aufhören, so ein Theater wegen nichts.", wert: 0 },
        { text: "Ich rede schnell dagegen an, damit endlich Ruhe ist.", wert: 1 },
        { text: "Ich bleibe ruhig und erkläre kurz, warum es heute nichts gibt.", wert: 2 },
        { text: "Ich gehe auf Augenhöhe und sage ihm, dass ich sehe, wie enttäuscht es ist.", wert: 3 },
      ],
    },
    {
      kopf: "Bettgehzeit",
      szenario:
        "Es ist Zeit fürs Bett. Dein Kind will noch spielen und protestiert.",
      achse: "klarheit",
      antworten: [
        { text: "Dann darf es eben noch. Hauptsache Ruhe.", wert: 0 },
        { text: "Ich verschiebe es noch ein paar Mal, irgendwann klappt es schon.", wert: 1 },
        { text: "Ich bleibe dabei, erkläre aber noch sehr lange.", wert: 2 },
        { text: "Ich bleibe ruhig bei meinem Nein und begleite den Protest.", wert: 3 },
      ],
    },
    {
      kopf: "Abends um acht",
      szenario:
        "Du bist am Ende deiner Kräfte, und dein Kind möchte noch kuscheln.",
      achse: "waerme",
      antworten: [
        { text: "Dafür ist jetzt wirklich keine Zeit mehr.", wert: 0 },
        { text: "Ich lege mich kurz dazu, bin aber mit den Gedanken schon woanders.", wert: 1 },
        { text: "Ich nehme mir ein paar Minuten, auch wenn ich müde bin.", wert: 2 },
        { text: "Ich lasse alles liegen. Diese Minuten gehören uns.", wert: 3 },
      ],
    },
    {
      kopf: "Die dritte Runde",
      szenario: "Dein Kind diskutiert dieselbe Regel zum dritten Mal.",
      achse: "klarheit",
      antworten: [
        { text: "Meistens gebe ich irgendwann nach.", wert: 0 },
        { text: "Ich diskutiere mit, bis einer von uns aufgibt.", wert: 1 },
        { text: "Ich erkläre es noch einmal und hoffe, dass es einsieht.", wert: 2 },
        { text: "Ich sage einmal freundlich, dass es dabei bleibt, und lasse die Diskussion dann los.", wert: 3 },
      ],
    },
    {
      kopf: "Das Missgeschick",
      szenario: "Dein Kind hat etwas umgeschüttet und schaut dich erschrocken an.",
      achse: "waerme",
      antworten: [
        { text: "Ich schimpfe erst mal los, das war ja abzusehen.", wert: 0 },
        { text: "Ich seufze und mache es wortlos weg.", wert: 1 },
        { text: "Ich sage, dass so etwas passieren kann, und wir räumen zusammen auf.", wert: 2 },
        { text: "Ich beruhige es zuerst und zeige ihm, dass nichts Schlimmes passiert ist.", wert: 3 },
      ],
    },
    {
      kopf: "Unsere Abende",
      szenario: "Wenn du ehrlich auf eure Abende schaust:",
      achse: "klarheit",
      antworten: [
        { text: "Jeder Abend läuft anders, oft ziemlich chaotisch.", wert: 0 },
        { text: "Wir haben grobe Gewohnheiten, aber nichts wirklich Verlässliches.", wert: 1 },
        { text: "Meistens gibt es einen ähnlichen Ablauf.", wert: 2 },
        { text: "Unsere Abende folgen einem festen, ruhigen Rhythmus.", wert: 3 },
      ],
    },
    {
      kopf: "Danach",
      szenario: "Du bist laut geworden. Der Moment war für euch beide unschön.",
      achse: "waerme",
      antworten: [
        { text: "Das war nötig. Es muss ja auch mal hören.", wert: 0 },
        { text: "Ich lasse es auf sich beruhen und mache weiter.", wert: 1 },
        { text: "Später sage ich, dass es mir leidtut.", wert: 2 },
        { text: "Ich gehe bewusst noch einmal hin und stelle die Verbindung wieder her.", wert: 3 },
      ],
    },
    {
      kopf: "Die Schuhe",
      szenario:
        "Du hast dreimal gesagt, dass die Schuhe angezogen werden. Nichts passiert.",
      achse: "klarheit",
      antworten: [
        { text: "Ich mache es am Ende selbst, das geht schneller.", wert: 0 },
        { text: "Ich werde lauter, bis sich etwas bewegt.", wert: 1 },
        { text: "Ich zähle bis drei und kündige eine Konsequenz an.", wert: 2 },
        { text: "Ich gehe freundlich hin und helfe ins Handeln, ohne noch mehr zu reden.", wert: 3 },
      ],
    },
  ],
  ergebnisse: [
    {
      key: "warmklar",
      name: "Warm und klar",
      unter: "Du hältst beides zugleich. Das ist die eigentliche Kunst.",
      text: "Du gibst deinem Kind Nähe und Orientierung im selben Moment. Genau das ist der Boden, auf dem Kinder sicher werden. Die ehrlichste Frage für dich ist deshalb nicht, ob du es richtig machst. Sondern ob du dabei auch dich selbst im Blick behältst. Denn diese Haltung kostet Kraft, besonders an müden Tagen.",
      schritte: [
        "Schau einmal auf die Woche: An welchem Tag rutscht es dir am ehesten weg? Meist ist es kein Erziehungsproblem, sondern ein Kraftproblem.",
        "Sag deinem Kind auch dann, was gilt, wenn es gerade leicht wäre nachzugeben. Genau da entsteht die Verlässlichkeit.",
      ],
      lage: { waerme: "hoch", klarheit: "hoch" },
    },
    {
      key: "herz",
      name: "Viel Herz, noch wenig Klarheit",
      unter: "Deine Wärme steht. Was fehlt, ist das Geländer.",
      text: "Du bist zugewandt, und das ist mehr wert, als du vielleicht denkst. Was in schwierigen Momenten fehlt, ist die ruhige Führung: das Nein, das nicht wackelt. Und das Verblüffende ist, dass dein Kind daran nicht leidet, sondern sich daran festhalten kann. Ein klares Nein ist für ein Kind leichter auszuhalten als ein Vielleicht, das jeden Tag anders aussieht.",
      schritte: [
        "Such dir für diese Woche genau eine Sache aus, bei der du nicht mehr verhandelst. Eine reicht.",
        "Sag sie einmal freundlich und dann nicht mehr. Nicht lauter, nicht öfter, sondern einmal und dann ins Handeln.",
        "Rechne damit, dass dein Kind das prüft. Das ist kein Rückschlag, das ist der Test, ob die Grenze wirklich steht.",
      ],
      lage: { waerme: "hoch", klarheit: "niedrig" },
    },
    {
      key: "klar",
      name: "Klar, aber die Wärme kommt zu kurz",
      unter: "Du gibst Halt. Jetzt darf die Nähe nachrücken.",
      text: "Du kannst führen, und du hältst, was du sagst. Das ist wertvoll und seltener, als man denkt. Was deinem Kind jetzt hilft, ist Wärme im selben Moment, in dem die Grenze steht. Also nicht die Grenze weicher machen, sondern sie warm halten.",
      schritte: [
        "Übe einen einzigen Satz: „Ich sehe, dass du wütend bist. Und es bleibt trotzdem dabei.“ Beides in einem Atemzug.",
        "Geh nach einem harten Moment noch einmal hin. Nicht um die Regel zurückzunehmen, sondern um die Verbindung wiederherzustellen.",
      ],
      lage: { waerme: "niedrig", klarheit: "hoch" },
    },
    {
      key: "zwischen",
      name: "Zwischen den Stühlen",
      unter: "Mal so, mal so. Und du selbst kommst kaum vor.",
      text: "An manchen Tagen gibst du nach, an anderen wirst du strenger, als du wolltest, und danach fühlst du dich schlecht. Das ist kein Versagen. Das ist, was passiert, wenn man zwischen lauter widersprüchlichen Ratschlägen steht und nirgends festen Boden findet. Der erste Schritt ist deshalb nicht mehr Disziplin. Es ist eine klare Linie, an der du dich selbst festhalten kannst.",
      schritte: [
        "Nimm dir nicht den ganzen Alltag vor, sondern eine einzige Situation. Meist ist der Abend der beste Ort zum Anfangen.",
        "Leg für diese eine Situation vorher fest, was gilt. Nicht im Moment entscheiden, sondern vorher.",
        "Sei nachsichtig mit dir. Zwischen den Stühlen zu sitzen ist anstrengender als jede der beiden Seiten.",
      ],
      lage: { waerme: "niedrig", klarheit: "niedrig" },
    },
  ],
  faq: [
    {
      frage: "Was misst dieser Erziehungsstil-Test eigentlich?",
      antwort:
        "Er misst zwei Dinge getrennt voneinander: wie viel Wärme dein Kind bei dir erlebt und wie viel klare Orientierung. Genau diese beiden Achsen hat die Psychologin Diana Baumrind in den Sechzigerjahren beschrieben, und die Erziehungsforschung arbeitet bis heute damit.",
    },
    {
      frage: "Gibt es ein richtiges Ergebnis?",
      antwort:
        "Die Forschung zeigt über Jahrzehnte hinweg ein ähnliches Muster: Kindern geht es im Durchschnitt am besten, wenn sie viel Wärme und zugleich klare Orientierung erleben. Das heißt aber nicht, dass ein anderes Ergebnis ein Urteil über dich ist. Es zeigt nur, wo gerade dein nächster Schritt liegt.",
    },
    {
      frage: "Ist der Test wissenschaftlich?",
      antwort:
        "Er beruht auf einem gut belegten Modell, ist selbst aber kein diagnostisches Verfahren. Er ist eine ehrliche Selbsteinschätzung anhand von acht Alltagssituationen und ersetzt keine Beratung.",
    },
    {
      frage: "Kostet der Test etwas?",
      antwort:
        "Nein, der Test ist kostenlos. Am Ende trägst du deine E-Mail-Adresse ein, damit du die Auswertung in Ruhe nachlesen kannst. Danach siehst du dein Ergebnis sofort auf der Seite.",
    },
  ],
};

/* ------------------------------------------------------------------ *
 * 2. Bedürfnis oder Wunsch (Zuordnungstest)
 * ------------------------------------------------------------------ */

const bedWunsch: Test = {
  slug: "beduerfnis-oder-wunsch",
  art: "zuordnung",
  titel: "Bedürfnis oder Wunsch?",
  seoTitel: "Bedürfnis oder Wunsch? Test mit 8 Alltagssituationen",
  eyebrow: "Der Unterscheidungs-Test",
  intro:
    "Ein Bedürfnis ist nicht verhandelbar. Ein Wunsch schon. Genau an dieser Unterscheidung entscheidet sich im Alltag fast alles. Acht Situationen, ordne sie zu.",
  beschreibung:
    "Bedürfnis oder Wunsch? Acht ganz normale Familiensituationen zum Zuordnen, mit Auflösung. Die Unterscheidung, an der bedürfnisorientierte Erziehung im Alltag oft scheitert.",
  dauer: "3 Minuten",
  achsen: [{ key: "treffer", name: "Treffer", max: 8 }],
  artikel: "beduerfnis-oder-wunsch",
  fragen: [
    {
      kopf: "Abends im Bett",
      szenario: "Dein Kind sagt, es kann nicht einschlafen und möchte, dass du dableibst.",
      achse: "treffer",
      antworten: [
        { text: "Bedürfnis", wert: 1 },
        { text: "Wunsch", wert: 0 },
      ],
      aufloesung:
        "Bedürfnis. Nähe beim Einschlafen ist ein echtes Bedürfnis, besonders bei kleinen Kindern. Wie du es erfüllst, ist allerdings verhandelbar: dableiben, kurz zurückkommen, die Tür offen lassen. Das Bedürfnis gilt, die Form bestimmst du.",
    },
    {
      kopf: "Der zweite Nachtisch",
      szenario: "Es gab schon ein Eis. Dein Kind möchte unbedingt noch eines.",
      achse: "treffer",
      antworten: [
        { text: "Bedürfnis", wert: 0 },
        { text: "Wunsch", wert: 1 },
      ],
      aufloesung:
        "Wunsch. Der Hunger ist gestillt, hier geht es um mehr vom Angenehmen. Das darf man wollen, und du darfst Nein sagen. Wichtig ist nur: Das Nein gilt dem Eis, nicht dem Gefühl. Die Enttäuschung darf laut sein.",
    },
    {
      kopf: "Im Autositz",
      szenario: "Dein Kind will sich nicht anschnallen und schreit.",
      achse: "treffer",
      antworten: [
        { text: "Bedürfnis", wert: 0 },
        { text: "Wunsch", wert: 1 },
      ],
      aufloesung:
        "Wunsch, und zwar einer, der nicht erfüllt werden kann. Sicherheit ist nicht verhandelbar. Genau das ist so ein Moment, in dem Wärme und Klarheit zusammen müssen: Du hältst die Grenze und begleitest die Wut.",
    },
    {
      kopf: "Nach der Kita",
      szenario:
        "Dein Kind klammert sich an dich und will nicht, dass du telefonierst.",
      achse: "treffer",
      antworten: [
        { text: "Bedürfnis", wert: 1 },
        { text: "Wunsch", wert: 0 },
      ],
      aufloesung:
        "Bedürfnis. Nach einem langen Tag ohne dich braucht dein Kind Wiederanschluss. Zehn ungeteilte Minuten sind hier oft wirksamer als eine Stunde nebenher.",
    },
    {
      kopf: "Das Spielzeug im Laden",
      szenario: "Dein Kind sieht ein Spielzeug und will es sofort.",
      achse: "treffer",
      antworten: [
        { text: "Bedürfnis", wert: 0 },
        { text: "Wunsch", wert: 1 },
      ],
      aufloesung:
        "Wunsch. Dahinter steckt oft ein echtes Bedürfnis nach Selbstwirksamkeit oder Aufmerksamkeit. Das kannst du erfüllen, ohne das Spielzeug zu kaufen.",
    },
    {
      kopf: "Mitten in der Nacht",
      szenario: "Dein Kind wacht auf und ruft nach dir.",
      achse: "treffer",
      antworten: [
        { text: "Bedürfnis", wert: 1 },
        { text: "Wunsch", wert: 0 },
      ],
      aufloesung:
        "Bedürfnis. Sich nachts zu vergewissern, dass jemand da ist, gehört zur normalen Entwicklung. Die Frage ist nicht, ob du reagierst, sondern wie: ruhig, kurz, verlässlich, immer gleich.",
    },
    {
      kopf: "Der Fernseher",
      szenario: "Die abgesprochene Folge ist vorbei. Dein Kind will noch eine.",
      achse: "treffer",
      antworten: [
        { text: "Bedürfnis", wert: 0 },
        { text: "Wunsch", wert: 1 },
      ],
      aufloesung:
        "Wunsch. Und ein sehr verständlicher, weil Aufhören schwerfällt. Hilfreich ist, das Ende vorher anzukündigen, statt es danach zu verhandeln.",
    },
    {
      kopf: "Beim Abschied",
      szenario: "Dein Kind weint jeden Morgen, wenn du es in der Kita abgibst.",
      achse: "treffer",
      antworten: [
        { text: "Bedürfnis", wert: 1 },
        { text: "Wunsch", wert: 0 },
      ],
      aufloesung:
        "Bedürfnis. Der Trennungsschmerz ist echt. Die liebevolle Antwort ist trotzdem nicht, zu bleiben, sondern ein kurzes, verlässliches Ritual und dann zu gehen. Ein langer Abschied verlängert den Schmerz, er verkürzt ihn nicht.",
    },
  ],
  ergebnisse: [
    {
      key: "sicher",
      name: "Du unterscheidest sicher",
      unter: "Sieben oder acht Treffer.",
      text: "Du trennst Bedürfnis und Wunsch schon sehr klar. Das ist die eigentliche Kunst der bedürfnisorientierten Haltung, und genau daran scheitert sie im Alltag am häufigsten. Deine Aufgabe ist weniger das Erkennen als das Aushalten: bei einem Wunsch freundlich Nein zu sagen und die Enttäuschung stehen zu lassen.",
      von: 7,
      bis: 8,
    },
    {
      key: "meist",
      name: "Du liegst meistens richtig",
      unter: "Fünf oder sechs Treffer.",
      text: "Du hast ein gutes Gespür, und an ein paar Stellen rutscht die Unterscheidung. Meist passiert das dort, wo ein Wunsch sehr heftig vorgetragen wird. Die Lautstärke sagt nichts darüber, ob etwas ein Bedürfnis ist.",
      von: 5,
      bis: 6,
    },
    {
      key: "unsicher",
      name: "Da ist noch viel Unschärfe",
      unter: "Vier oder weniger Treffer.",
      text: "Das ist überhaupt kein schlechtes Zeichen, im Gegenteil. Die meisten Eltern haben nie gelernt, hier zu unterscheiden, weil in fast allen Ratgebern beides Bedürfnis heißt. Genau deshalb fühlt sich bedürfnisorientierte Erziehung so oft uferlos an. Mit dieser einen Unterscheidung wird vieles wieder handhabbar.",
      von: 0,
      bis: 4,
    },
  ],
  faq: [
    {
      frage: "Was ist der Unterschied zwischen einem Bedürfnis und einem Wunsch?",
      antwort:
        "Ein Bedürfnis ist etwas, das ein Kind zum Wachsen braucht: Nähe, Schlaf, Essen, Sicherheit, Zugehörigkeit. Es ist nicht verhandelbar. Ein Wunsch ist eine konkrete Vorstellung davon, wie etwas gerade sein soll. Wünsche darf man haben, und man darf sie ablehnen.",
    },
    {
      frage: "Heißt bedürfnisorientiert, dass ich alles erfüllen muss?",
      antwort:
        "Nein. Bedürfnisorientiert heißt, die Bedürfnisse deines Kindes ernst zu nehmen, nicht jeden Wunsch zu erfüllen. Diese Verwechslung ist der Hauptgrund, warum sich der Ansatz für viele Familien uferlos anfühlt.",
    },
    {
      frage: "Woran erkenne ich im Moment, was gerade vorliegt?",
      antwort:
        "Eine brauchbare Faustregel: Frag dich, was passiert, wenn du es nicht erfüllst. Bleibt ein echter Mangel, war es ein Bedürfnis. Bleibt eine Enttäuschung, war es ein Wunsch. Enttäuschung ist unangenehm, aber sie ist nicht schädlich.",
    },
  ],
};

import {
  konsequenzOderStrafe,
  kraftTest,
  abendTest,
  neinTest,
} from "./tests-weitere";

export const TESTS: Test[] = [
  elternTyp,
  neinTest,
  bedWunsch,
  konsequenzOderStrafe,
  abendTest,
  kraftTest,
];

export function testNachSlug(slug: string): Test | undefined {
  return TESTS.find((t) => t.slug === slug);
}

export function testSlugs(): string[] {
  return TESTS.map((t) => t.slug);
}

export function testUrl(slug: string): string {
  return `/tests/${slug}/`;
}
