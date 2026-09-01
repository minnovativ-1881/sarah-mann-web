/**
 * Die zweite und dritte Ebene der Auswertung.
 *
 * Das Hauptergebnis eines Tests sagt, in welchem Feld jemand steht. Das allein
 * ist dünn: zwei Menschen mit derselben Punktzahl haben oft ganz verschiedene
 * Stellen, an denen es hakt. Deshalb bekommt jede Frage hier einen Bereich und
 * zwei Sätze: einen für "läuft schon" und einen für "hier lohnt der nächste
 * Blick". Aus den stärksten und schwächsten Antworten baut die Auswertung
 * daraus einen persönlichen Teil, der bei jedem anders aussieht.
 *
 * Die Reihenfolge entspricht den Fragen im jeweiligen Test. `kopf` ist die
 * Sicherung: stimmt sie nicht mehr mit der Frage überein, faellt das beim
 * Bauen auf statt still falsche Saetze zu verschicken.
 */

export type FrageDetail = {
  /** Muss mit dem kopf der Frage übereinstimmen. */
  kopf: string;
  /** Kurzer Name des Bereichs, erscheint als Überschrift der Zeile. */
  bereich: string;
  /** Wenn hier stark geantwortet wurde. */
  stark: string;
  /** Wenn hier schwach geantwortet wurde. */
  schwach: string;
};

export const TEST_DETAILS: Record<string, FrageDetail[]> = {
  /* ------------------------------ Eltern-Test ----------------------------- */
  "eltern-test": [
    {
      kopf: "An der Kasse",
      bereich: "Gefühle in der Öffentlichkeit",
      stark: "Du bleibst bei deinem Kind, auch wenn andere zuschauen. Das ist der schwerste Ort dafür, und du hältst ihn.",
      schwach: "Unter fremden Blicken rutschst du eher ins Abwürgen. Verständlich, aber dein Kind lernt daraus vor allem, dass Gefühle draußen unerwünscht sind.",
    },
    {
      kopf: "Bettgehzeit",
      bereich: "Das Ende des Tages",
      stark: "Du bleibst am Abend bei dem, was gilt, und begleitest den Protest, statt ihn wegzudiskutieren.",
      schwach: "Am Abend weicht deine Grenze am schnellsten auf. Genau da braucht dein Kind sie am dringendsten, weil es selbst müde ist.",
    },
    {
      kopf: "Abends um acht",
      bereich: "Nähe, wenn du leer bist",
      stark: "Du schaffst Nähe auch dann, wenn du selbst nichts mehr hast. Das ist der Moment, der bei Kindern am tiefsten hängen bleibt.",
      schwach: "Wenn deine Kraft aus ist, geht die Nähe als Erstes. Das ist kein Charakterproblem, sondern ein Kraftproblem, und es lässt sich anders lösen als mit mehr Disziplin.",
    },
    {
      kopf: "Die dritte Runde",
      bereich: "Die Wiederholung",
      stark: "Du sagst es einmal und lässt die Diskussion dann los. Damit lernt dein Kind, dass Nachfragen die Antwort nicht ändert.",
      schwach: "Beim dritten Mal kippt es. Dein Kind lernt daraus nicht, dass du hart bist, sondern dass Ausdauer sich lohnt.",
    },
    {
      kopf: "Das Missgeschick",
      bereich: "Wenn etwas schiefgeht",
      stark: "Bei Missgeschicken bist du zuerst bei deinem Kind und dann beim Aufwischen. Genau so entsteht ein Kind, das Fehler zugibt statt versteckt.",
      schwach: "Bei Missgeschicken kommt der Ärger vor dem Trost. Dein Kind merkt sich weniger das Malheur als deinen Blick dabei.",
    },
    {
      kopf: "Unsere Abende",
      bereich: "Der verlässliche Rahmen",
      stark: "Euer Abend hat einen erkennbaren Rhythmus. Das nimmt euch beiden jeden Tag ein Stück Verhandlung ab.",
      schwach: "Euer Abend läuft jedes Mal anders. Dadurch muss dein Kind jeden Abend neu austesten, was heute gilt, und das kostet euch beide unnötig Kraft.",
    },
    {
      kopf: "Danach",
      bereich: "Wiedergutmachung",
      stark: "Nach einem lauten Moment gehst du zurück und stellst die Verbindung wieder her. Das ist wichtiger als jeder Moment, in dem du ruhig geblieben bist.",
      schwach: "Nach einem lauten Moment bleibt es stehen. Kinder brauchen keine fehlerfreien Eltern, aber sie brauchen die Rückkehr danach.",
    },
    {
      kopf: "Die Schuhe",
      bereich: "Vom Reden ins Handeln",
      stark: "Du gehst vom Reden ins Handeln, ohne lauter zu werden. Damit brauchst du das dritte und vierte Mal gar nicht erst.",
      schwach: "Zwischen deinem Satz und dem, was dann passiert, klafft eine Lücke. Dein Kind hört nicht schlecht, es hat gelernt, dass es beim ersten Mal nichts kostet.",
    },
  ],

  /* -------------------------- Bedürfnis oder Wunsch ----------------------- */
  "beduerfnis-oder-wunsch": [
    {
      kopf: "Abends im Bett",
      bereich: "Nähe beim Einschlafen",
      stark: "Du erkennst, dass Nähe beim Einschlafen kein Verhandlungsthema ist.",
      schwach: "Nähe beim Einschlafen ist ein Bedürfnis, kein Trick. Die Frage ist nicht ob, sondern in welcher Form du sie gibst.",
    },
    {
      kopf: "Der zweite Nachtisch",
      bereich: "Der zweite Nachtisch",
      stark: "Du siehst, dass hier ein Wunsch vorliegt, kein Mangel.",
      schwach: "Nach dem ersten Eis ist der zweite ein Wunsch. Ein Nein enttäuscht, aber es fehlt danach nichts.",
    },
    {
      kopf: "Im Autositz",
      bereich: "Sicherheit im Auto",
      stark: "Bei Sicherheit machst du keine Ausnahme, auch nicht unter Geschrei.",
      schwach: "Angeschnallt zu sein ist keine Verhandlungsfrage. Hier steht die Sicherheit über dem Protest, so laut er auch ist.",
    },
    {
      kopf: "Nach der Kita",
      bereich: "Ankommen nach der Trennung",
      stark: "Du erkennst das Nachtanken nach der Kita als das, was es ist.",
      schwach: "Das Klammern nach der Kita ist kein Anhänglichkeitsproblem, sondern der Wunsch, wieder anzukommen. Zehn Minuten Vorrang sparen dir den ganzen Abend.",
    },
    {
      kopf: "Das Spielzeug im Laden",
      bereich: "Spontane Wünsche",
      stark: "Spontane Kaufwünsche kannst du als Wünsche einordnen.",
      schwach: "Der Wunsch im Laden ist echt, aber es ist ein Wunsch. Enttäuschung aushalten zu lernen gehört zum Größerwerden dazu.",
    },
    {
      kopf: "Mitten in der Nacht",
      bereich: "Nachts rufen",
      stark: "Nachts gerufen zu werden liest du richtig als Bedürfnis.",
      schwach: "Ein Kind, das nachts ruft, spielt nicht mit dir. Nachts ist Rufen fast immer ein echtes Bedürfnis nach Rückversicherung.",
    },
    {
      kopf: "Der Fernseher",
      bereich: "Die eine Folge mehr",
      stark: "Bei der abgesprochenen Folge bleibst du sauber beim Wunsch.",
      schwach: "Nach der abgemachten Folge ist die nächste ein Wunsch. Der Ärger darüber ist echt, der Mangel nicht.",
    },
    {
      kopf: "Beim Abschied",
      bereich: "Der Abschied morgens",
      stark: "Den Trennungsschmerz morgens ordnest du richtig ein.",
      schwach: "Weinen beim Abschied ist ein Bedürfnis nach Sicherheit, keine Masche. Es braucht ein verlässliches Ritual, keine schnellere Abgabe.",
    },
  ],

  /* -------------------------- Konsequenz oder Strafe ---------------------- */
  "konsequenz-oder-strafe": [
    {
      kopf: "Der Becher",
      bereich: "Wiedergutmachen statt büßen",
      stark: "Du erkennst: Aufwischen gehört zum Umkippen dazu, das ist eine Konsequenz.",
      schwach: "Wer etwas verschüttet, wischt es auf. Das ist keine Strafe, sondern der natürliche zweite Teil der Handlung.",
    },
    {
      kopf: "Kein Hörspiel",
      bereich: "Der thematische Zusammenhang",
      stark: "Du siehst, dass Aufräumen und Hörspiel nichts miteinander zu tun haben.",
      schwach: "Aufräumen und Hörspiel haben nichts miteinander zu tun. Sobald der Zusammenhang fehlt, wird aus der Konsequenz eine Strafe.",
    },
    {
      kopf: "Der Sandkasten",
      bereich: "Die Pause als Schutz",
      stark: "Die Pause vom Sandkasten liest du richtig als Schutz, nicht als Strafe.",
      schwach: "Wer Sand wirft, macht eine Pause vom Sandkasten. Das schützt die anderen und hängt direkt mit dem Verhalten zusammen.",
    },
    {
      kopf: "Die stille Treppe",
      bereich: "Alleinsein als Mittel",
      stark: "Du erkennst das Alleinschicken als das, was es ist.",
      schwach: "Ein Kind, das gerade die Kontrolle verloren hat, allein zu schicken, ist eine Strafe. Es braucht in diesem Moment Begleitung, nicht Entzug.",
    },
    {
      kopf: "Zu spät fertig",
      bereich: "Zeit, die wirklich vergeht",
      stark: "Vorher angekündigte Zeitfolgen ordnest du richtig ein.",
      schwach: "Wer trödelt, hat weniger Zeit. Das ist keine Erfindung von dir, das ist die Uhr, und es war vorher angekündigt.",
    },
    {
      kopf: "Ohne Nachtisch",
      bereich: "Essen als Hebel",
      stark: "Du siehst, dass Essen kein Erziehungsmittel ist.",
      schwach: "Nachtisch an Gemüse zu koppeln macht aus Essen einen Handel. Das ist eine Strafe und formt das Verhältnis zum Essen langfristig ungünstig.",
    },
    {
      kopf: "Das Tablet",
      bereich: "Die abgemachte Zeit",
      stark: "Beim Tablet trennst du Absprache und Bestrafung sauber.",
      schwach: "Wenn die abgemachte Zeit um ist, endet die Zeit. Das ist die Absprache, nicht deine Rache.",
    },
    {
      kopf: "Nicht mitkommen",
      bereich: "Der zeitliche Abstand",
      stark: "Du erkennst, dass Stunden später keine Konsequenz mehr möglich ist.",
      schwach: "Was morgens war, lässt sich nachmittags nicht mehr sinnvoll beantworten. Mit dem zeitlichen Abstand wird jede Konsequenz zur Strafe.",
    },
  ],

  /* ------------------------------- Kraft-Test ----------------------------- */
  "kraft-test": [
    {
      kopf: "Der Morgen",
      bereich: "Wie du in den Tag startest",
      stark: "Du startest halbwegs ausgeruht in den Tag. Das ist dein größtes Guthaben, hüte es.",
      schwach: "Du bist schon erschöpft, bevor der Tag anfängt. Alles Weitere findet dann auf Kredit statt, und das hält niemand lange durch.",
    },
    {
      kopf: "Deine Geduld",
      bereich: "Wann der Faden reißt",
      stark: "Deine Geduld hält bis in die schwierigen Stunden hinein.",
      schwach: "Dein Faden reißt an einer vorhersehbaren Stelle. Das ist eine gute Nachricht: was vorhersehbar ist, lässt sich vorbereiten.",
    },
    {
      kopf: "Zeit für dich",
      bereich: "Zeit ohne Kind",
      stark: "Du kommst regelmäßig zu Zeit für dich. Das ist keine Selbstverständlichkeit.",
      schwach: "Zeit für dich liegt lange zurück. Eine Stunde pro Woche ist kein Luxus, sondern die Wartung an dem Menschen, der die Familie trägt.",
    },
    {
      kopf: "Nach einem schwierigen Moment",
      bereich: "Wie du dich erholst",
      stark: "Nach einer Eskalation findest du wieder zu dir. Diese Fähigkeit trägt dich durch die schweren Jahre.",
      schwach: "Nach einer Eskalation bleibst du lange darin hängen. Die Schuldschleife danach kostet oft mehr Kraft als der Moment selbst.",
    },
    {
      kopf: "Unterstützung",
      bereich: "Wer mitträgt",
      stark: "Du stehst nicht allein. Diese Entlastung ist der stärkste Einzelfaktor überhaupt.",
      schwach: "Du trägst zu viel allein. Bevor du an deiner Geduld arbeitest, lohnt sich die Frage, wer eine einzige feste Aufgabe übernehmen kann.",
    },
    {
      kopf: "Freude",
      bereich: "Freude am Zusammensein",
      stark: "Du genießt die Zeit mit deinem Kind noch wirklich. Halte diese Momente fest, sie sind der eigentliche Treibstoff.",
      schwach: "Die Freude ist gerade selten geworden. Das ist ein ernstes Zeichen und meist eines von Erschöpfung, nicht von fehlender Liebe.",
    },
    {
      kopf: "Der Körper",
      bereich: "Was dein Körper sagt",
      stark: "Körperlich geht es dir gut. Damit hast du Reserven, auf die du zurückgreifen kannst.",
      schwach: "Dein Körper meldet sich. Kopf, Rücken oder Schlaf sind oft die erste Stelle, an der Dauerbelastung sichtbar wird.",
    },
    {
      kopf: "Die eigenen Bedürfnisse",
      bereich: "Dein eigener Platz",
      stark: "Du kommst im Familienalltag selbst noch vor. Genau daran hängt, wie lange du warm bleiben kannst.",
      schwach: "Du kommst in eurem Alltag kaum vor. Bedürfnisorientierung meint alle in der Familie, dich eingeschlossen.",
    },
  ],

  /* ------------------------------- Abend-Test ----------------------------- */
  "abend-test": [
    {
      kopf: "Der Ablauf",
      bereich: "Die immer gleiche Reihenfolge",
      stark: "Euer Abend hat eine feste Reihenfolge. Das ist der wirksamste Einzelbaustein überhaupt.",
      schwach: "Euer Abend läuft jedes Mal anders. Dein Kind muss dadurch jeden Abend neu herausfinden, was jetzt kommt, und wehrt sich gegen die Unsicherheit.",
    },
    {
      kopf: "Die Ankündigung",
      bereich: "Der angekündigte Übergang",
      stark: "Dein Kind weiß, wann Schluss ist, bevor es so weit ist. Damit ersparst du euch den Großteil des Widerstands.",
      schwach: "Das Ende kommt für dein Kind aus dem Nichts. Eine Ankündigung fünf Minuten vorher kostet dich nichts und nimmt dem Übergang die Härte.",
    },
    {
      kopf: "Die Nochmal-Wünsche",
      bereich: "Noch ein Buch, noch ein Schluck",
      stark: "Die Nachschlag-Wünsche haben bei euch eine klare Grenze. Genau daran hängt, wie lange der Abend dauert.",
      schwach: "Die Nochmal-Wünsche dehnen den Abend. Nicht weil dein Kind bockig ist, sondern weil noch nicht feststeht, wo Schluss ist.",
    },
    {
      kopf: "Wer bringt ins Bett",
      bereich: "Die Verteilung",
      stark: "Das Insbettbringen ist bei euch verteilt. Damit hält die Person, die es tut, deutlich länger durch.",
      schwach: "Das Zubettbringen hängt an einer Person. Das geht eine Weile gut und wird dann zur wundesten Stelle des Tages.",
    },
    {
      kopf: "Der Bildschirm",
      bereich: "Bildschirm am Abend",
      stark: "Der Bildschirm hat am Abend seinen festen Platz oder ist raus. Beides ist besser als das tägliche Aushandeln.",
      schwach: "Der Bildschirm am Abend ist noch ungeklärt. Er ist selten das eigentliche Problem, aber fast immer der Ort, an dem der Abend kippt.",
    },
    {
      kopf: "Deine Verfassung",
      bereich: "Wie du in den Abend gehst",
      stark: "Du gehst halbwegs ruhig in den Abend. Deine Verfassung entscheidet mehr über den Verlauf als alles, was dein Kind tut.",
      schwach: "Du gehst schon leer in den Abend. Solange das so ist, hilft kein besserer Ablauf, sondern nur eine Entlastung davor.",
    },
    {
      kopf: "Das Ende",
      bereich: "Wie der Abend endet",
      stark: "Euer Abend endet friedlich. Das ist der Punkt, den dein Kind mit in den Schlaf und in den nächsten Tag nimmt.",
      schwach: "Euer Abend endet oft im Streit oder im Aufgeben. Genau dieser letzte Eindruck bleibt bei euch beiden hängen.",
    },
  ],

  /* ------------------------- Wie klar ist dein Nein ----------------------- */
  "wie-klar-ist-dein-nein": [
    {
      kopf: "Nach dem dritten Mal",
      bereich: "Die dritte Nachfrage",
      stark: "Beim dritten Nachfragen bleibst du ruhig bei deiner Antwort. Damit lernt dein Kind, dass Ausdauer die Sache nicht dreht.",
      schwach: "Beim dritten Mal kippst du. Dein Kind fragt nicht dreimal, weil es dich ärgern will, sondern weil es beim dritten Mal schon geklappt hat.",
    },
    {
      kopf: "In der Öffentlichkeit",
      bereich: "Wenn andere zuschauen",
      stark: "Auch unter fremden Blicken bleibt dein Nein dasselbe. Das ist der schwerste Prüfstein überhaupt.",
      schwach: "Vor Publikum wird dein Nein weicher. Dein Kind merkt das schneller als jeder Erwachsene und nutzt es, ganz ohne böse Absicht.",
    },
    {
      kopf: "Vom Reden ins Handeln",
      bereich: "Vom Sagen zum Tun",
      stark: "Auf dein Wort folgt eine Handlung. Deshalb reicht bei dir das erste Mal.",
      schwach: "Zwischen deinem Satz und dem Tun liegt zu viel Reden. Ein Kind lernt aus dem, was passiert, nicht aus dem, was gesagt wird.",
    },
    {
      kopf: "Wenn du erschöpft bist",
      bereich: "Die Grenze am Abend",
      stark: "Auch erschöpft bleibt deine Linie erkennbar. Das ist der Unterschied zwischen streng und verlässlich.",
      schwach: "Am Abend wandert deine Grenze. Das macht sie unberechenbar, und Unberechenbarkeit ist für ein Kind anstrengender als jedes Nein.",
    },
    {
      kopf: "Die Ankündigung",
      bereich: "Wenn du etwas ankündigst",
      stark: "Was du ankündigst, kommt auch so. Damit haben deine Worte Gewicht.",
      schwach: "Deine Ankündigungen halten nicht immer. Jede nicht eingelöste Ankündigung entwertet die nächste.",
    },
    {
      kopf: "Mit dem Partner",
      bereich: "Einigkeit zu zweit",
      stark: "Ihr zieht bei den wichtigen Regeln an einem Strang. Damit muss dein Kind nicht zwischen euch suchen.",
      schwach: "Bei den wichtigen Regeln seid ihr uneins. Dann ist nicht dein Nein das Problem, sondern dass es ein zweites Nein daneben gibt, das anders lautet.",
    },
    {
      kopf: "Die Anzahl der Regeln",
      bereich: "Wie viele Regeln es gibt",
      stark: "Ihr habt wenige, klare Regeln. Genau deshalb kannst du sie halten.",
      schwach: "Ihr habt zu viele Regeln. Wer zwanzig Regeln hat, kann keine davon verlässlich halten, und dein Kind merkt das.",
    },
  ],
};

/**
 * Die Achsen einzeln, für Tests mit mehr als einer Achse.
 *
 * Das Feld im Vierfelder-Schema sagt nur "hoch" oder "niedrig". Zwei Menschen
 * im selben Feld können aber sehr unterschiedlich dort gelandet sein, einer
 * knapp und einer deutlich. Diese Sätze machen daraus eine zweite Ebene.
 */
export type AchsenStufe = "hoch" | "mittel" | "niedrig";

export const ACHSEN_TEXTE: Record<string, Record<string, Record<AchsenStufe, string>>> = {
  "eltern-test": {
    waerme: {
      hoch: "Deine Wärme ist hoch. Dein Kind erlebt dich als jemanden, bei dem es mit allem ankommen darf, auch mit den unbequemen Gefühlen.",
      mittel: "Deine Wärme ist da, aber sie hat Lücken. Meist sind es die müden Momente, in denen sie als Erstes verschwindet.",
      niedrig: "Deine Wärme kommt gerade zu kurz. Das heißt nicht, dass sie fehlt, sondern dass sie im Alltag zu selten bei deinem Kind ankommt.",
    },
    klarheit: {
      hoch: "Deine Klarheit ist hoch. Dein Kind weiß bei dir, woran es ist, und muss nicht jeden Tag neu austesten, was heute gilt.",
      mittel: "Deine Klarheit steht grundsätzlich, wackelt aber an bestimmten Stellen. Genau diese Stellen sind der ganze Hebel.",
      niedrig: "Deine Klarheit ist gerade dünn. Dein Kind muss dadurch selbst herausfinden, wo die Grenzen liegen, und das erledigt es durch Ausprobieren.",
    },
  },
};
