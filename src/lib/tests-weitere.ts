import type { Test } from "./tests";

/* ------------------------------------------------------------------ *
 * 3. Konsequenz oder Strafe (Zuordnung)
 * ------------------------------------------------------------------ */

export const konsequenzOderStrafe: Test = {
  slug: "konsequenz-oder-strafe",
  art: "zuordnung",
  titel: "Konsequenz oder Strafe?",
  seoTitel: "Konsequenz oder Strafe? Test mit 8 Beispielen aus dem Alltag",
  eyebrow: "Der Unterschieds-Test",
  intro:
    "Viele sogenannte Konsequenzen sind in Wahrheit Strafen mit besserem Namen. Acht Situationen aus dem Alltag. Erkennst du, was was ist?",
  beschreibung:
    "Konsequenz oder Strafe? Acht konkrete Beispiele mit Auflösung. Der Unterschied liegt nicht im Ton, sondern darin, ob es einen echten Zusammenhang zur Sache gibt.",
  dauer: "3 Minuten",
  achsen: [{ key: "treffer", name: "Treffer", max: 8 }],
  artikel: "kind-hoert-nicht-trotz-konsequenz",
  fragen: [
    {
      kopf: "Der Becher",
      szenario:
        "Dein Kind kippt beim Spielen absichtlich Wasser auf den Tisch. Du sagst: „Dann wischen wir das jetzt zusammen auf.“",
      achse: "treffer",
      antworten: [
        { text: "Konsequenz", wert: 1 },
        { text: "Strafe", wert: 0 },
      ],
      aufloesung:
        "Konsequenz. Es gibt einen echten Zusammenhang zur Sache, es passiert sofort, und es beschämt nicht. Aufwischen gehört zum Umkippen, so einfach ist das.",
    },
    {
      kopf: "Kein Hörspiel",
      szenario:
        "Dein Kind räumt nachmittags nicht auf. Du sagst: „Dann gibt es heute Abend kein Hörspiel.“",
      achse: "treffer",
      antworten: [
        { text: "Konsequenz", wert: 0 },
        { text: "Strafe", wert: 1 },
      ],
      aufloesung:
        "Strafe. Aufräumen und Hörspiel haben nichts miteinander zu tun, und zwischen beidem liegen Stunden. Für ein kleines Kind ist der Zusammenhang nicht erkennbar. Es lernt daraus nicht Aufräumen, sondern dass du Macht hast.",
    },
    {
      kopf: "Der Sandkasten",
      szenario:
        "Dein Kind wirft wiederholt Sand. Du nimmst es an die Hand: „Wir machen eine Pause vom Sandkasten und kommen gleich wieder.“",
      achse: "treffer",
      antworten: [
        { text: "Konsequenz", wert: 1 },
        { text: "Strafe", wert: 0 },
      ],
      aufloesung:
        "Konsequenz. Direkter Zusammenhang, sofort, und mit einer Rückkehr verbunden. Es geht ums Schützen, nicht ums Büßen.",
    },
    {
      kopf: "Die stille Treppe",
      szenario:
        "Dein Kind haut sein Geschwisterchen. Du schickst es für fünf Minuten allein auf die Treppe.",
      achse: "treffer",
      antworten: [
        { text: "Konsequenz", wert: 0 },
        { text: "Strafe", wert: 1 },
      ],
      aufloesung:
        "Strafe. Ausschluss aus der Gemeinschaft hat keinen Zusammenhang zum Hauen. Und ein aufgewühltes Kind kann sich allein meist gar nicht beruhigen. Hilfreicher ist, dazwischenzugehen und in deiner Nähe zur Ruhe zu kommen.",
    },
    {
      kopf: "Zu spät fertig",
      szenario:
        "Dein Kind trödelt beim Anziehen. Am Spielplatz bleibt dadurch weniger Zeit. Du sagst das vorher an und bleibst dabei.",
      achse: "treffer",
      antworten: [
        { text: "Konsequenz", wert: 1 },
        { text: "Strafe", wert: 0 },
      ],
      aufloesung:
        "Konsequenz, und zwar eine natürliche. Die Zeit ist einfach weg, das musst du nicht herstellen. Wichtig: vorher ankündigen und danach nicht nachtreten mit „Siehst du, hätte ich dir ja gesagt.“",
    },
    {
      kopf: "Ohne Nachtisch",
      szenario:
        "Dein Kind isst sein Gemüse nicht. Du sagst: „Dann gibt es auch keinen Nachtisch.“",
      achse: "treffer",
      antworten: [
        { text: "Konsequenz", wert: 0 },
        { text: "Strafe", wert: 1 },
      ],
      aufloesung:
        "Strafe, und beim Essen besonders ungünstig. Essen wird damit zum Druckmittel. Tragfähiger ist eine klare Regel, die für alle gilt und nicht vom Verhalten abhängt, etwa dass es Nachtisch nur an bestimmten Tagen gibt.",
    },
    {
      kopf: "Das Tablet",
      szenario:
        "Ihr habt eine Zeit abgemacht. Dein Kind will nicht aufhören. Du nimmst das Tablet und sagst: „Wir hatten es abgesprochen. Morgen probieren wir es wieder.“",
      achse: "treffer",
      antworten: [
        { text: "Konsequenz", wert: 1 },
        { text: "Strafe", wert: 0 },
      ],
      aufloesung:
        "Konsequenz. Der Zusammenhang ist direkt, die Regel war vorher bekannt, und die Rückkehr ist eingebaut. Zur Strafe würde es, wenn du das Tablet für eine Woche wegschließt.",
    },
    {
      kopf: "Nicht mitkommen",
      szenario:
        "Dein Kind war morgens frech. Nachmittags sagst du: „Weil du heute so warst, darfst du nicht mit zu Oma.“",
      achse: "treffer",
      antworten: [
        { text: "Konsequenz", wert: 0 },
        { text: "Strafe", wert: 1 },
      ],
      aufloesung:
        "Strafe. Kein Zusammenhang, großer zeitlicher Abstand, und der Entzug von Beziehung als Druckmittel. Genau das ist die Form, die in der Forschung am ungünstigsten abschneidet.",
    },
  ],
  ergebnisse: [
    {
      key: "sicher",
      name: "Du siehst den Unterschied klar",
      unter: "Sieben oder acht Treffer.",
      text: "Du erkennst zuverlässig, ob es einen echten Zusammenhang zur Sache gibt oder ob nur Druck aufgebaut wird. Die eigentliche Arbeit liegt für dich woanders: dabei zu bleiben, wenn es anstrengend wird, statt in der Erschöpfung doch zur schnellen Drohung zu greifen.",
      von: 7,
      bis: 8,
    },
    {
      key: "meist",
      name: "Meistens sicher",
      unter: "Fünf oder sechs Treffer.",
      text: "Du hast das Prinzip verstanden, und an ein paar Stellen rutscht es. Meist dort, wo etwas seit Jahren als selbstverständlich gilt, etwa die stille Treppe oder der Nachtisch. Das ist kein Wunder, das steht in vielen Ratgebern noch als Konsequenz.",
      von: 5,
      bis: 6,
    },
    {
      key: "unsicher",
      name: "Da lohnt sich ein zweiter Blick",
      unter: "Vier oder weniger Treffer.",
      text: "Das ist völlig normal, denn die Begriffe werden fast überall vermischt. Die einfachste Prüffrage für den Alltag: Hat das, was jetzt passiert, mit der Sache zu tun? Wenn nein, ist es eine Strafe, auch wenn sie freundlich klingt.",
      von: 0,
      bis: 4,
    },
  ],
  faq: [
    {
      frage: "Was ist der Unterschied zwischen Konsequenz und Strafe?",
      antwort:
        "Eine Konsequenz hat einen echten Zusammenhang zur Sache, folgt zeitnah und beschämt nicht. Eine Strafe stellt einen künstlichen Zusammenhang her, kommt oft viel später und soll unangenehm sein, damit das Kind etwas lernt. Der Ton entscheidet nicht: Auch eine freundlich vorgetragene Strafe bleibt eine Strafe.",
    },
    {
      frage: "Sind logische Konsequenzen nicht auch nur Strafen?",
      antwort:
        "Oft ja, und der Einwand ist berechtigt. Sobald man sich eine Folge ausdenken muss, damit sie „logisch“ wirkt, ist es meistens keine mehr. Echte Konsequenzen muss man selten erfinden, sie ergeben sich aus der Situation.",
    },
    {
      frage: "Darf ich meinem Kind gar nichts mehr wegnehmen?",
      antwort:
        "Doch. Wenn dein Kind mit etwas nicht so umgeht wie vereinbart, ist es sinnvoll, dass die Sache pausiert. Entscheidend ist, dass es einen Zusammenhang gibt und dass eine Rückkehr eingebaut ist. Nicht als Bestrafung, sondern als Klärung.",
    },
  ],
};

/* ------------------------------------------------------------------ *
 * 4. Wie viel Kraft hast du noch (Skala)
 * ------------------------------------------------------------------ */

export const kraftTest: Test = {
  slug: "kraft-test",
  art: "skala",
  titel: "Wie viel Kraft hast du noch?",
  seoTitel: "Eltern-Erschöpfung: Test, wie viel Kraft dir noch bleibt",
  eyebrow: "Der ehrliche Blick auf dich",
  intro:
    "Nicht auf dein Kind, sondern auf dich. Acht Fragen, die niemand sonst dir stellt. Ehrlich antworten, es sieht ja niemand.",
  beschreibung:
    "Ein kurzer, ehrlicher Selbsttest zur elterlichen Erschöpfung. Acht Fragen zu Schlaf, Geduld, Schuldgefühlen und dem eigenen Anteil am Familienalltag.",
  dauer: "2 Minuten",
  achsen: [{ key: "kraft", name: "Kraft", max: 24 }],
  artikel: "kind-angeschrien-was-jetzt",
  fragen: [
    {
      kopf: "Der Morgen",
      szenario: "Wie wachst du meistens auf?",
      achse: "kraft",
      antworten: [
        { text: "Schon erschöpft, bevor der Tag beginnt.", wert: 0 },
        { text: "Müde, aber es geht.", wert: 1 },
        { text: "Meistens einigermaßen ausgeruht.", wert: 2 },
        { text: "Ausgeruht.", wert: 3 },
      ],
    },
    {
      kopf: "Deine Geduld",
      szenario: "Wann reißt dir üblicherweise der Faden?",
      achse: "kraft",
      antworten: [
        { text: "Fast täglich, oft schon vormittags.", wert: 0 },
        { text: "Meistens abends.", wert: 1 },
        { text: "Ein- bis zweimal die Woche.", wert: 2 },
        { text: "Selten.", wert: 3 },
      ],
    },
    {
      kopf: "Zeit für dich",
      szenario: "Wann hattest du zuletzt eine Stunde ganz für dich?",
      achse: "kraft",
      antworten: [
        { text: "Ich weiß es nicht mehr.", wert: 0 },
        { text: "Vor Wochen.", wert: 1 },
        { text: "Diese Woche, kurz.", wert: 2 },
        { text: "Regelmäßig.", wert: 3 },
      ],
    },
    {
      kopf: "Nach einem schwierigen Moment",
      szenario: "Wie geht es dir, wenn etwas eskaliert ist?",
      achse: "kraft",
      antworten: [
        { text: "Ich denke stundenlang daran und mache mir Vorwürfe.", wert: 0 },
        { text: "Es beschäftigt mich lange.", wert: 1 },
        { text: "Kurz, dann kann ich es einordnen.", wert: 2 },
        { text: "Ich mache es wieder gut und komme gut weiter.", wert: 3 },
      ],
    },
    {
      kopf: "Unterstützung",
      szenario: "Wer trägt den Alltag mit dir?",
      achse: "kraft",
      antworten: [
        { text: "Im Grunde niemand.", wert: 0 },
        { text: "Jemand, aber selten und unzuverlässig.", wert: 1 },
        { text: "Eine Person, auf die ich zählen kann.", wert: 2 },
        { text: "Mehrere Menschen.", wert: 3 },
      ],
    },
    {
      kopf: "Freude",
      szenario: "Wie oft genießt du die Zeit mit deinem Kind gerade wirklich?",
      achse: "kraft",
      antworten: [
        { text: "Kaum noch, ich funktioniere nur.", wert: 0 },
        { text: "Selten, meist bin ich zu erschöpft.", wert: 1 },
        { text: "Oft, mit Unterbrechungen.", wert: 2 },
        { text: "Meistens.", wert: 3 },
      ],
    },
    {
      kopf: "Der Körper",
      szenario: "Wie geht es dir körperlich?",
      achse: "kraft",
      antworten: [
        { text: "Dauernd angespannt, Kopf, Nacken, Magen.", wert: 0 },
        { text: "Oft verspannt.", wert: 1 },
        { text: "Geht so.", wert: 2 },
        { text: "Gut.", wert: 3 },
      ],
    },
    {
      kopf: "Die eigenen Bedürfnisse",
      szenario: "Wie oft kommst du selbst im Familienalltag vor?",
      achse: "kraft",
      antworten: [
        { text: "Gar nicht. Ich stelle mich immer hinten an.", wert: 0 },
        { text: "Selten, und dann mit schlechtem Gewissen.", wert: 1 },
        { text: "Manchmal.", wert: 2 },
        { text: "Regelmäßig, ohne mich dafür zu rechtfertigen.", wert: 3 },
      ],
    },
  ],
  ergebnisse: [
    {
      key: "leer",
      name: "Dein Tank ist leer",
      unter: "Und das ist keine Charakterfrage.",
      text: "Was du beschreibst, ist keine Erziehungsfrage mehr, sondern eine Frage von Kraft. Ruhigbleiben ist eine Leistung, die Energie kostet, und du hast gerade keine übrig. Deshalb helfen dir gute Vorsätze im Umgang mit deinem Kind an dieser Stelle nicht weiter. Was dir hilft, ist Entlastung, und zwar echte.",
      schritte: [
        "Such dir eine einzige Sache, die dir diese Woche zwei Stunden zurückgibt. Nicht drei Sachen. Eine.",
        "Sag einem Menschen konkret, was du brauchst. Nicht „mir geht es schlecht“, sondern „kannst du Donnerstag von vier bis sechs übernehmen“.",
        "Wenn das seit Monaten so geht: Eine Erziehungsberatungsstelle ist kostenlos und dafür da. Das ist kein Versagen, sondern vernünftig.",
      ],
      von: 0,
      bis: 8,
    },
    {
      key: "knapp",
      name: "Du hältst dich gerade so",
      unter: "Es geht, aber ohne Reserve.",
      text: "Du funktionierst, und an guten Tagen läuft es. Aber es fehlt der Puffer. Wenn etwas dazukommt, ein Infekt, eine schlechte Nacht, ein voller Terminkalender, kippt es sofort. Genau dieser fehlende Puffer ist der Grund, warum es meistens abends knallt und nicht vormittags.",
      schritte: [
        "Schau auf die Woche: An welchem Tag rutscht es dir am ehesten weg? Dort ansetzen, nicht überall.",
        "Eine feste Sache im Ablauf ändern schlägt zehn gute Vorsätze.",
      ],
      von: 9,
      bis: 16,
    },
    {
      key: "stabil",
      name: "Du stehst stabil",
      unter: "Und das ist die halbe Miete.",
      text: "Du hast Reserve, Unterstützung und einen guten Umgang mit dir selbst. Das ist keine Selbstverständlichkeit, und es ist das Wichtigste, was du deinem Kind mitgeben kannst. Denn deine Ruhe ist das, woran es sich orientiert, lange bevor es sich selbst beruhigen kann.",
      schritte: [
        "Halt dir bewusst, was dir diese Stabilität gibt, und schütze es. Genau das fällt als Erstes weg, wenn es voll wird.",
      ],
      von: 17,
      bis: 24,
    },
  ],
  faq: [
    {
      frage: "Ist elterliche Erschöpfung dasselbe wie ein Burnout?",
      antwort:
        "Nicht automatisch. Erschöpfung ist ein Zustand, der sich mit Entlastung und Schlaf wieder bessert. Wenn allerdings über Monate emotionale Distanz zum eigenen Kind, ständige Gereiztheit und das Gefühl völliger Leere dazukommen, sollte das ärztlich oder psychologisch abgeklärt werden.",
    },
    {
      frage: "Ist es egoistisch, an mich selbst zu denken?",
      antwort:
        "Nein, und es ist auch keine Belohnung, die man sich verdienen muss. Ein erschöpfter Mensch kann nicht ruhig bleiben, und Ruhe ist das Wichtigste, was ein Kind in einem schwierigen Moment braucht. Deine Erholung ist Teil der Aufgabe, nicht die Pause davon.",
    },
  ],
};

/* ------------------------------------------------------------------ *
 * 5. Wie fest ist euer Abend (Skala)
 * ------------------------------------------------------------------ */

export const abendTest: Test = {
  slug: "abend-test",
  art: "skala",
  titel: "Wie verlässlich ist euer Abend?",
  seoTitel: "Abendroutine-Test: Wie verlässlich ist euer Abend wirklich?",
  eyebrow: "Der Test für die schwierigste Stunde",
  intro:
    "Der Abend ist die Stunde, in der alles zusammenkommt: Müdigkeit, Ungeduld und der zwanzigste Verhandlungsversuch. Sieben Fragen dazu, wie fest euer Abend wirklich steht.",
  beschreibung:
    "Wie verlässlich läuft euer Abend? Sieben Fragen zu Ablauf, Ankündigung, Nochmal-Wünschen und dem Punkt, an dem Eltern abends am häufigsten einknicken.",
  dauer: "2 Minuten",
  achsen: [{ key: "halt", name: "Verlässlichkeit", max: 21 }],
  artikel: "kind-hoert-nicht-trotz-konsequenz",
  fragen: [
    {
      kopf: "Der Ablauf",
      szenario: "Wie läuft ein normaler Abend bei euch ab?",
      achse: "halt",
      antworten: [
        { text: "Jeden Tag anders.", wert: 0 },
        { text: "Grobe Gewohnheiten, aber nichts Festes.", wert: 1 },
        { text: "Meistens ähnlich.", wert: 2 },
        { text: "Fast immer dieselbe Reihenfolge.", wert: 3 },
      ],
    },
    {
      kopf: "Die Ankündigung",
      szenario: "Weiß dein Kind, wann Schluss ist?",
      achse: "halt",
      antworten: [
        { text: "Es kommt für uns beide überraschend.", wert: 0 },
        { text: "Ich sage es, wenn es so weit ist.", wert: 1 },
        { text: "Ich kündige es meistens vorher an.", wert: 2 },
        { text: "Es ist an feste Punkte gebunden, die es selbst erkennt.", wert: 3 },
      ],
    },
    {
      kopf: "Die Nochmal-Wünsche",
      szenario: "Noch ein Buch, noch ein Schluck, noch einmal Pipi.",
      achse: "halt",
      antworten: [
        { text: "Das geht ewig so, ich weiß nie, wann ich Schluss machen soll.", wert: 0 },
        { text: "Ich gebe meistens noch zwei- bis dreimal nach.", wert: 1 },
        { text: "Ich habe eine Grenze, halte sie aber nicht immer.", wert: 2 },
        { text: "Die Anzahl ist vorher klar und gilt.", wert: 3 },
      ],
    },
    {
      kopf: "Wer bringt ins Bett",
      szenario: "Wie ist das bei euch verteilt?",
      achse: "halt",
      antworten: [
        { text: "Immer nur ich, es geht mit niemand anderem.", wert: 0 },
        { text: "Fast immer ich.", wert: 1 },
        { text: "Wir wechseln uns ab, mit Protest.", wert: 2 },
        { text: "Es funktioniert mit mehreren Menschen.", wert: 3 },
      ],
    },
    {
      kopf: "Der Bildschirm",
      szenario: "Wie ist das mit Fernsehen oder Tablet am Abend?",
      achse: "halt",
      antworten: [
        { text: "Läuft oft bis kurz vor dem Schlafen.", wert: 0 },
        { text: "Unterschiedlich.", wert: 1 },
        { text: "Meistens mit etwas Abstand davor.", wert: 2 },
        { text: "Fester Schlusspunkt, gut vor der Schlafenszeit.", wert: 3 },
      ],
    },
    {
      kopf: "Deine Verfassung",
      szenario: "Wie gehst du selbst in den Abend?",
      achse: "halt",
      antworten: [
        { text: "Völlig am Ende, ich zähle die Minuten.", wert: 0 },
        { text: "Erschöpft und angespannt.", wert: 1 },
        { text: "Müde, aber einigermaßen ruhig.", wert: 2 },
        { text: "Ruhig, ich mag diese Zeit meistens.", wert: 3 },
      ],
    },
    {
      kopf: "Das Ende",
      szenario: "Wie endet der Abend üblicherweise?",
      achse: "halt",
      antworten: [
        { text: "Mit Streit oder Tränen, fast täglich.", wert: 0 },
        { text: "Oft angespannt.", wert: 1 },
        { text: "Meistens friedlich.", wert: 2 },
        { text: "Ruhig, und ich habe danach noch etwas vom Abend.", wert: 3 },
      ],
    },
  ],
  ergebnisse: [
    {
      key: "wackelig",
      name: "Euer Abend hat noch keinen Boden",
      unter: "Und deshalb kostet er so viel Kraft.",
      text: "Wenn jeder Abend anders läuft, muss dein Kind jeden Abend neu herausfinden, was gilt. Genau das erzeugt die Verhandlungen, die dich fertigmachen. Nicht dein Kind ist zäh, die Lage ist unklar. Und Unklarheit ist für ein Kind anstrengender als jede feste Regel.",
      schritte: [
        "Leg eine einzige feste Reihenfolge fest, drei bis vier Schritte reichen. Immer dieselbe.",
        "Entscheide vorher, wie viele Nochmal-Wünsche es gibt. Eine Zahl. Und dann gilt sie.",
        "Kündige das Ende an einem festen Punkt an, nicht an der Uhr. „Nach dem zweiten Buch machen wir Licht aus.“",
      ],
      von: 0,
      bis: 7,
    },
    {
      key: "teils",
      name: "Der Rahmen steht, das Ende wackelt",
      unter: "Das Muster kennen viele.",
      text: "Bei euch gibt es einen Ablauf, und trotzdem zieht sich das Ende. Das liegt fast immer an derselben Stelle: Der Schlusspunkt ist nicht vorher festgelegt, sondern wird im Moment ausgehandelt, und zwar dann, wenn du am wenigsten Kraft hast.",
      schritte: [
        "Verleg die Entscheidung nach vorn. Was gilt, wird nicht um halb neun entschieden, sondern vorher.",
        "Sag den letzten Schritt einmal an und dann nicht mehr. Jede Wiederholung verschiebt den Ernstfall nach hinten.",
      ],
      von: 8,
      bis: 14,
    },
    {
      key: "fest",
      name: "Euer Abend trägt",
      unter: "Und das merkt man vermutlich am ganzen Tag.",
      text: "Ein verlässlicher Abend ist mehr wert, als er aussieht. Kinder, die wissen, was kommt, müssen abends nicht mehr prüfen, ob heute etwas anderes gilt. Diese eingesparte Wachsamkeit ist der Grund, warum verlässliche Abläufe Kindern spürbar guttun.",
      schritte: [
        "Schütze diesen Ablauf, gerade wenn es voll wird. Er ist meistens das Erste, was bei Stress wegbricht.",
      ],
      von: 15,
      bis: 21,
    },
  ],
  faq: [
    {
      frage: "Wie viele Nochmal-Wünsche soll ich abends erfüllen?",
      antwort:
        "Die genaue Zahl ist weniger wichtig als dass sie feststeht und vorher bekannt ist. Ein Kind, das weiß, dass es zwei Bücher gibt, fragt seltener nach dem dritten als eines, bei dem es jeden Abend darauf ankommt, wie erschöpft die Eltern sind.",
    },
    {
      frage: "Warum ist der Abend so viel schwieriger als der Rest des Tages?",
      antwort:
        "Weil zwei Dinge zusammenkommen. Dein Kind ist müde und hat dadurch weniger Zugriff auf seine Selbstbeherrschung. Und du bist es auch. Ruhigbleiben kostet Energie, und abends ist der Vorrat am kleinsten.",
    },
    {
      frage: "Muss die Abendroutine immer gleich ablaufen?",
      antwort:
        "Sie muss nicht auf die Minute gleich sein, aber die Reihenfolge sollte es. Kinder orientieren sich nicht an der Uhr, sondern an Abfolgen. Wenn nach dem Zähneputzen immer das Buch kommt, weiß dein Kind, wo es im Abend steht.",
    },
  ],
};

/* ------------------------------------------------------------------ *
 * 6. Wie klar ist dein Nein (Matrix light: Skala)
 * ------------------------------------------------------------------ */

export const neinTest: Test = {
  slug: "wie-klar-ist-dein-nein",
  art: "skala",
  titel: "Wie klar ist dein Nein?",
  seoTitel: "Test: Wie klar ist dein Nein? Grenzen setzen bei Kindern",
  eyebrow: "Der Grenzen-Test",
  intro:
    "Nicht wie streng du bist. Sondern wie verlässlich. Sieben Situationen, in denen sich zeigt, ob deine Grenze steht oder wandert.",
  beschreibung:
    "Ein Test zur Verlässlichkeit von Grenzen: Wie oft wird aus einem Nein doch ein Ja, wie schnell gehst du vom Reden ins Handeln, und was passiert nach dem dritten Nachfragen?",
  dauer: "2 Minuten",
  achsen: [{ key: "klarheit", name: "Verlässlichkeit", max: 21 }],
  artikel: "kind-hoert-nicht-trotz-konsequenz",
  fragen: [
    {
      kopf: "Nach dem dritten Mal",
      szenario: "Dein Kind fragt zum dritten Mal nach derselben Sache.",
      achse: "klarheit",
      antworten: [
        { text: "Meistens gebe ich irgendwann nach.", wert: 0 },
        { text: "Ich diskutiere weiter, bis einer aufgibt.", wert: 1 },
        { text: "Ich erkläre es noch einmal ausführlich.", wert: 2 },
        { text: "Ich sage einmal freundlich, dass es dabei bleibt, und lasse es dann.", wert: 3 },
      ],
    },
    {
      kopf: "In der Öffentlichkeit",
      szenario: "Dasselbe passiert im Supermarkt, alle schauen.",
      achse: "klarheit",
      antworten: [
        { text: "Da gebe ich fast immer nach.", wert: 0 },
        { text: "Es fällt mir deutlich schwerer als zu Hause.", wert: 1 },
        { text: "Ich versuche, dabei zu bleiben.", wert: 2 },
        { text: "Da gilt dasselbe wie zu Hause.", wert: 3 },
      ],
    },
    {
      kopf: "Vom Reden ins Handeln",
      szenario: "Du hast etwas gesagt, es passiert nichts.",
      achse: "klarheit",
      antworten: [
        { text: "Ich sage es noch fünf- bis zehnmal.", wert: 0 },
        { text: "Ich werde lauter.", wert: 1 },
        { text: "Ich zähle bis drei.", wert: 2 },
        { text: "Ich stehe auf, gehe hin und helfe ins Handeln.", wert: 3 },
      ],
    },
    {
      kopf: "Wenn du erschöpft bist",
      szenario: "Es ist Abend, du bist am Ende.",
      achse: "klarheit",
      antworten: [
        { text: "Dann gilt bei uns praktisch nichts mehr.", wert: 0 },
        { text: "Dann bin ich deutlich nachgiebiger.", wert: 1 },
        { text: "Es wackelt, aber es hält meistens.", wert: 2 },
        { text: "Was gilt, gilt auch dann.", wert: 3 },
      ],
    },
    {
      kopf: "Die Ankündigung",
      szenario: "Wenn du eine Folge ankündigst, was passiert dann?",
      achse: "klarheit",
      antworten: [
        { text: "Meistens setze ich sie nicht um.", wert: 0 },
        { text: "Kommt drauf an, wie der Tag war.", wert: 1 },
        { text: "Meistens setze ich sie um.", wert: 2 },
        { text: "Ich kündige nur an, was ich auch umsetze.", wert: 3 },
      ],
    },
    {
      kopf: "Mit dem Partner",
      szenario: "Wie einig seid ihr bei den wichtigen Regeln?",
      achse: "klarheit",
      antworten: [
        { text: "Wir widersprechen uns oft vor dem Kind.", wert: 0 },
        { text: "Wir sind uns oft uneinig.", wert: 1 },
        { text: "Bei den wichtigen Dingen sind wir uns einig.", wert: 2 },
        { text: "Wir sind uns einig und klären Unterschiede unter uns.", wert: 3 },
      ],
    },
    {
      kopf: "Die Anzahl der Regeln",
      szenario: "Wie viele feste Regeln habt ihr?",
      achse: "klarheit",
      antworten: [
        { text: "Sehr viele, ich verliere selbst den Überblick.", wert: 1 },
        { text: "Eigentlich keine festen.", wert: 0 },
        { text: "Einige, aber nicht alle gelten wirklich.", wert: 2 },
        { text: "Wenige, und die gelten.", wert: 3 },
      ],
    },
  ],
  ergebnisse: [
    {
      key: "wandernd",
      name: "Deine Grenze wandert",
      unter: "Und dein Kind sucht sie deshalb immer wieder.",
      text: "Wenn ein Nein manchmal doch ein Ja wird, dann lernt dein Kind nicht, dass es keins bekommt. Es lernt, wie lange es dauert. Das ist kein Ungehorsam, sondern eine völlig zutreffende Beobachtung. Die gute Nachricht: Das ist die Sorte Problem, die sich in wenigen Wochen deutlich ändert, wenn eine einzige Sache verlässlich wird.",
      schritte: [
        "Wähle genau eine Sache aus, bei der ab jetzt nicht mehr verhandelt wird. Eine reicht völlig.",
        "Kündige nur noch an, was du auch umsetzt. Lieber weniger ankündigen.",
        "Rechne mit ein paar anstrengenden Tagen. Das Prüfen ist der Beweis, dass dein Kind die Veränderung bemerkt hat.",
      ],
      von: 0,
      bis: 7,
    },
    {
      key: "teils",
      name: "Meistens klar, an einer Stelle nicht",
      unter: "Und genau dort hakt es.",
      text: "Bei euch gilt vieles, und es gibt eine oder zwei Situationen, in denen die Grenze regelmäßig kippt. Meist sind das die Momente mit Zuschauern oder die späten Abendstunden. Das ist kein Charakterproblem, sondern eine Frage von Kraft und Vorbereitung.",
      schritte: [
        "Finde heraus, welche Situation es bei euch ist. Es sind fast nie viele, meist zwei.",
        "Entscheide für diese Situation vorher, was gilt, statt im Moment abzuwägen.",
      ],
      von: 8,
      bis: 14,
    },
    {
      key: "klar",
      name: "Dein Nein steht",
      unter: "Und das entlastet dein Kind mehr, als du denkst.",
      text: "Ein verlässliches Nein ist für ein Kind leichter auszuhalten als ein Vielleicht, das jeden Tag anders aussieht. Wenn deine Grenzen halten, muss dein Kind sie nicht ständig prüfen, und diese eingesparte Energie steht ihm für anderes zur Verfügung. Achte jetzt vor allem darauf, dass die Wärme im selben Moment sichtbar bleibt.",
      schritte: [
        "Übe den Doppelsatz: „Ich sehe, dass du wütend bist. Und es bleibt trotzdem dabei.“",
        "Geh nach einem harten Moment noch einmal hin. Nicht um die Regel zurückzunehmen, sondern um die Verbindung wiederherzustellen.",
      ],
      von: 15,
      bis: 21,
    },
  ],
  faq: [
    {
      frage: "Wie viele Regeln braucht ein Kleinkind?",
      antwort:
        "Weniger, als die meisten denken, und die dafür verlässlich. Eine Handvoll Dinge, die immer gelten, geben mehr Orientierung als zwanzig Regeln, von denen die Hälfte je nach Tagesform ausgesetzt wird.",
    },
    {
      frage: "Darf ich nie nachgeben?",
      antwort:
        "Doch. Es ist völlig in Ordnung, eine Entscheidung zu ändern, wenn du ein gutes Argument gehört hast. Der Unterschied liegt im Grund: Nachgeben, weil dein Kind etwas Kluges gesagt hat, ist Respekt. Nachgeben, weil es laut genug war, bringt euch beide in eine schwierige Lage.",
    },
    {
      frage: "Was, wenn ich merke, dass ich diese Grenze heute nicht halten kann?",
      antwort:
        "Dann setz sie besser gar nicht erst. Eine nicht gesetzte Grenze ist harmloser als eine, die nach zwanzig Minuten fällt. Kündige nur an, was du auch umsetzen willst und kannst.",
    },
  ],
};
