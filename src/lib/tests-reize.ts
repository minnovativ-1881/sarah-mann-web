import type { Test } from "./tests";

/* ------------------------------------------------------------------ *
 * Das Reizprofil (Matrix: Reize suchen x Reize meiden)
 *
 * Zwei unabhaengige Kanaele, keine Skala mit zwei Enden. Ein Kind kann
 * Bewegung suchen und Geraeusche meiden. Genau das erklaert, warum sich
 * die ueblichen Ratschlaege fuer Eltern widersprechen.
 *
 * Ausdruecklich kein diagnostisches Verfahren.
 * ------------------------------------------------------------------ */

export const reizTest: Test = {
  slug: "reizprofil-test",
  art: "matrix",
  titel: "Sucht dein Kind Reize oder flieht es vor ihnen?",
  seoTitel: "Reizprofil-Test für Kinder: sucht oder meidet dein Kind Reize?",
  eyebrow: "Der kostenlose Reiz-Test",
  intro:
    "Zehn ganz normale Alltagssituationen. Am Ende siehst du, ob dein Kind eher Input sucht, eher zu viel davon abbekommt oder beides zugleich. Das ist keine Diagnose, aber es erklärt, warum manche Tipps bei euch funktionieren und andere alles schlimmer machen.",
  beschreibung:
    "Kostenloser Test: Sucht dein Kind Reize oder meidet es sie? Zehn Alltagssituationen, drei Minuten, mit konkreten Empfehlungen für genau euer Profil.",
  dauer: "3 Minuten",
  achsen: [
    { key: "suchen", name: "Reize suchen", max: 15, schwelle: 9 },
    { key: "meiden", name: "Reize meiden", max: 15, schwelle: 9 },
  ],
  artikel: "kind-staendig-ueberdreht",
  fragen: [
    {
      kopf: "Auf dem Spielplatz",
      szenario:
        "Ihr seid seit einer Stunde da. Die anderen Kinder werden langsam müde.",
      achse: "suchen",
      antworten: [
        { text: "Meines auch. Es setzt sich irgendwann von selbst hin.", wert: 0 },
        { text: "Es macht weiter wie die anderen, ohne aufzufallen.", wert: 1 },
        { text: "Es hat mehr Ausdauer als die meisten und will noch nicht weg.", wert: 2 },
        { text: "Es klettert höher, rennt schneller und hört gar nicht mehr auf.", wert: 3 },
      ],
    },
    {
      kopf: "Wenn es dich begrüßt",
      szenario: "Dein Kind kommt auf dich zu und will Nähe.",
      achse: "suchen",
      antworten: [
        { text: "Es kuschelt ruhig und vorsichtig.", wert: 0 },
        { text: "Ganz normal, nichts Besonderes.", wert: 1 },
        { text: "Es umarmt ziemlich fest und bleibt lange hängen.", wert: 2 },
        { text: "Es springt mich an, drückt zu fest und klettert auf mir herum.", wert: 3 },
      ],
    },
    {
      kopf: "Am Tisch",
      szenario: "Ihr esst gemeinsam. Das Essen dauert zwanzig Minuten.",
      achse: "suchen",
      antworten: [
        { text: "Es sitzt ruhig, das ist bei uns kein Thema.", wert: 0 },
        { text: "Gegen Ende wird es unruhig, aber es geht.", wert: 1 },
        { text: "Es kippelt, wippt mit den Beinen und rutscht ständig hin und her.", wert: 2 },
        { text: "Stillsitzen ist praktisch unmöglich. Es steht mehrfach auf.", wert: 3 },
      ],
    },
    {
      kopf: "Der Geräuschpegel",
      szenario: "Ihr seid zu Hause, dein Kind spielt für sich allein.",
      achse: "suchen",
      antworten: [
        { text: "Es spielt still, ich merke kaum, dass es da ist.", wert: 0 },
        { text: "Normal laut, wie andere Kinder auch.", wert: 1 },
        { text: "Es singt, brummt oder redet fast durchgehend vor sich hin.", wert: 2 },
        { text: "Es macht ununterbrochen Geräusche und ist dabei sehr laut, auch allein.", wert: 3 },
      ],
    },
    {
      kopf: "Nach einem Kindergeburtstag",
      szenario: "Drei Stunden Trubel sind vorbei, ihr fahrt nach Hause.",
      achse: "suchen",
      antworten: [
        { text: "Es ist erschöpft und will nur noch Ruhe.", wert: 0 },
        { text: "Es ist zufrieden und ruhig.", wert: 1 },
        { text: "Es will unbedingt noch weiterspielen, obwohl es müde ist.", wert: 2 },
        { text: "Es dreht erst richtig auf und will noch mehr von allem.", wert: 3 },
      ],
    },
    {
      kopf: "Beim Anziehen",
      szenario: "Ihr wollt raus. Dein Kind soll sich anziehen.",
      achse: "meiden",
      antworten: [
        { text: "Das ist bei uns kein Thema.", wert: 0 },
        { text: "Manchmal will es ein bestimmtes Teil, sonst ist es ihm egal.", wert: 1 },
        { text: "Bestimmte Sachen zieht es nie an, ohne dass ich weiß warum.", wert: 2 },
        { text: "Nähte, Etiketten oder Socken sind bei uns regelmäßig ein Drama.", wert: 3 },
      ],
    },
    {
      kopf: "Laute Geräusche",
      szenario: "Staubsauger, Händetrockner, Feuerwehrsirene, platzender Luftballon.",
      achse: "meiden",
      antworten: [
        { text: "Interessiert es nicht weiter.", wert: 0 },
        { text: "Es erschrickt kurz und macht dann weiter.", wert: 1 },
        { text: "Es hält sich manchmal die Ohren zu oder geht weg.", wert: 2 },
        { text: "Es hält die Ohren zu, weint oder verlässt fluchtartig den Raum.", wert: 3 },
      ],
    },
    {
      kopf: "Auf dem Teller",
      szenario: "Es gibt etwas, das dein Kind noch nicht kennt.",
      achse: "meiden",
      antworten: [
        { text: "Es probiert einfach.", wert: 0 },
        { text: "Es ist skeptisch, isst aber meistens mit.", wert: 1 },
        { text: "Bestimmte Konsistenzen gehen gar nicht, und Vermischtes mag es nicht.", wert: 2 },
        { text: "Die Auswahl ist sehr klein und wird eher kleiner als größer.", wert: 3 },
      ],
    },
    {
      kopf: "Im Supermarkt",
      szenario:
        "Samstagvormittag, voll, hell, laut. Ihr braucht zwanzig Minuten.",
      achse: "meiden",
      antworten: [
        { text: "Läuft problemlos.", wert: 0 },
        { text: "Es wird gegen Ende ungeduldig.", wert: 1 },
        { text: "Es will ziemlich schnell wieder raus und quengelt viel.", wert: 2 },
        { text: "Es kippt dort regelmäßig, deshalb meide ich solche Orte inzwischen.", wert: 3 },
      ],
    },
    {
      kopf: "Haare und Nägel",
      szenario: "Haare waschen, kämmen, schneiden, Nägel schneiden.",
      achse: "meiden",
      antworten: [
        { text: "Alles unproblematisch.", wert: 0 },
        { text: "Manchmal mag es nicht, aber es geht.", wert: 1 },
        { text: "Mindestens eines davon ist bei uns jedes Mal ein Kampf.", wert: 2 },
        { text: "Das sind die schlimmsten Situationen der Woche, mit Weinen und Wehren.", wert: 3 },
      ],
    },
  ],
  ergebnisse: [
    {
      key: "motor",
      name: "Dein Kind ist ein Motor",
      unter: "Es sucht Input, um sich selbst zu spüren.",
      text: "Dein Kind braucht mehr Bewegung, mehr Druck und mehr Tempo als andere, um in Balance zu bleiben. Was von außen oft als Ungezogenheit gelesen wird, ist in Wahrheit ein Suchen: nach festem Griff, nach Höhe, nach Geschwindigkeit. Wenn es diesen Input nicht bekommt, holt es ihn sich selbst, und dann sieht es aus wie Rempeln, Toben und Nicht-hören-Können. Der wichtigste Satz für euch lautet deshalb: erst bewegen, dann reden. Ein Motor kommt nicht durch Stillsitzen herunter, sondern durch kräftige Arbeit.",
      schritte: [
        "Bau vor schwierigen Situationen kräftige Bewegung ein: rennen, klettern, tragen, gegen deine Hände drücken. Zehn Minuten reichen oft.",
        "Setz auf Widerstand statt auf Streicheln. Fest drücken, in eine Decke wickeln, eine schwere Kiste tragen beruhigt Motoren schneller als sanfte Berührung.",
        "Erwarte Stillsitzen nicht dort, wo es nicht nötig ist. Kippeln am Tisch ist keine Respektlosigkeit, sondern Regulierung.",
      ],
      lage: { suchen: "hoch", meiden: "niedrig" },
    },
    {
      key: "antenne",
      name: "Dein Kind ist eine Antenne",
      unter: "Es bekommt mehr mit, als es verarbeiten kann.",
      text: "Dein Kind nimmt Geräusche, Berührungen, Gerüche und Stimmungen stärker wahr als die meisten. Das ist keine Empfindlichkeit im Sinne von Anstellen, sondern eine andere Grundeinstellung der Wahrnehmung. Der Preis dafür ist, dass ganz normale Orte anstrengend sind: der Supermarkt, der Turnraum, der Geburtstag. Für euch gilt deshalb oft das Gegenteil dessen, was man Eltern gewöhnlich rät. Nicht mehr Programm, sondern weniger. Nicht auspowern, sondern reduzieren.",
      schritte: [
        "Nimm bei den ersten Anzeichen von Überlastung etwas weg statt etwas hinzuzufügen: Licht dimmen, Musik aus, Raum wechseln, weniger sprechen.",
        "Richte einen Rückzugsort ein, den dein Kind selbst aufsuchen darf. Eine Höhle, ein Zelt, eine Ecke mit Kissen. Kein Strafort, sondern ein eigener Ort.",
        "Plane nach jedem vollen Termin einen leeren Nachmittag ein, auch wenn dein Kind protestiert.",
        "Nimm Kleidung, Essen und Geräusche ernst. Was für dich eine Kleinigkeit ist, ist für dein Kind körperlich unangenehm.",
      ],
      lage: { suchen: "niedrig", meiden: "hoch" },
    },
    {
      key: "beides",
      name: "Motor und Antenne zugleich",
      unter: "Das häufigste und das verwirrendste Profil.",
      text: "Dein Kind sucht bei manchen Sinnen viel Input und wird bei anderen schnell überflutet. Es kann den ganzen Tag klettern und toben wollen und gleichzeitig keine Socken mit Nähten ertragen. Genau deshalb widersprechen sich alle Ratschläge, die du bisher bekommen hast, und genau deshalb hast du das Gefühl, dein Kind nicht zu durchschauen. Es gibt aber keinen Widerspruch. Es sind zwei verschiedene Kanäle. Sobald du sie getrennt betrachtest, wird der Alltag berechenbarer.",
      schritte: [
        "Schreib zwei Wochen lang auf, wann es kippt und was unmittelbar davor war. Fast alle Eltern finden dabei ein Muster, das sie vorher nicht gesehen haben.",
        "Trenne die Kanäle: Wo braucht dein Kind mehr, wo weniger? Meistens ist es mehr Bewegung und weniger Geräusch.",
        "Erwarte nicht, dass eine einzige Strategie beides abdeckt. Ihr braucht zwei.",
      ],
      lage: { suchen: "hoch", meiden: "hoch" },
    },
    {
      key: "robust",
      name: "Reize sind wohl nicht euer Hauptthema",
      unter: "Dann lohnt sich der Blick woanders hin.",
      text: "Dein Kind zeigt weder ein ausgeprägtes Suchen noch ein ausgeprägtes Meiden von Reizen. Wenn euer Alltag trotzdem schwer ist, liegt die Ursache wahrscheinlich woanders. Die häufigsten Kandidaten sind Schlafmangel, eine zu volle Woche, ein Umbruch wie Eingewöhnung oder Einschulung, oder schlicht das Alter. Auch das ist eine nützliche Auskunft, denn sie erspart dir, an der falschen Stelle zu suchen.",
      schritte: [
        "Schau zuerst auf den Schlaf. Sehr viele Alltagsprobleme sind in Wahrheit Schlafprobleme.",
        "Zähl die Termine der Woche. Oft ist nicht das Kind zu viel, sondern die Woche.",
        "Wenn es trotzdem schwer bleibt, sprich mit deiner Kinderärztin. Nicht um ein Etikett zu bekommen, sondern um auszuschließen, was sich ausschließen lässt.",
      ],
      lage: { suchen: "niedrig", meiden: "niedrig" },
    },
  ],
  faq: [
    {
      frage: "Ist das ein Test auf ADHS oder Autismus?",
      antwort:
        "Nein, ausdrücklich nicht. Dieser Test stellt keine Diagnose und deutet auch keine an. Er beschreibt nur, wie dein Kind mit Sinnesreizen umgeht, damit du weißt, welche Alltagsstrategien bei euch überhaupt eine Chance haben. Wenn du den Verdacht auf mehr hast, gehört das in die Hände deiner Kinderärztin.",
    },
    {
      frage: "Kann ein Kind gleichzeitig Reize suchen und meiden?",
      antwort:
        "Ja, und das ist sogar der häufigste Fall. Suchen und Meiden sind zwei unabhängige Kanäle, nicht zwei Enden einer Skala. Ein Kind kann Bewegung lieben und Geräusche hassen. Genau deshalb widersprechen sich die üblichen Ratschläge so oft.",
    },
    {
      frage: "Ab welchem Alter ist der Test sinnvoll?",
      antwort:
        "Die Situationen sind auf Kinder zwischen etwa drei und zehn Jahren zugeschnitten. Bei jüngeren Kindern lässt sich vieles noch nicht unterscheiden, weil ein Kleinkind ohnehin erst wenig Selbstregulierung hat.",
    },
    {
      frage: "Ändert sich das Ergebnis mit der Zeit?",
      antwort:
        "Die Grundtendenz bleibt meistens erhalten, aber wie stark sie sich zeigt, schwankt deutlich. Müdigkeit, Krankheit, Umbrüche und volle Wochen verstärken beide Seiten. Wenn du den Test nach einer ruhigen Woche und nach einer anstrengenden machst, wirst du einen Unterschied sehen.",
    },
    {
      frage: "Kostet der Test etwas?",
      antwort:
        "Nein. Der Test ist kostenlos, du musst dich nicht anmelden und bekommst dein Ergebnis sofort.",
    },
  ],
};
