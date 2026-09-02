# -*- coding: utf-8 -*-
"""
Baut werkzeuge/bildstrecke.html aus werkzeuge/bild-prompts.json.

Vorher war die Seite von Hand gepflegt. Dadurch fehlte Silo 7, obwohl die
Prompts in bild-prompts.md laengst standen. Jetzt gibt es eine Quelle: die
JSON. Kommt ein Silo dazu, wird sie ergaenzt und diese Datei einmal aufgerufen.

    python werkzeuge/bildstrecke-bauen.py

Kopf und Fuss der Seite liegen in bildstrecke-rahmen.html und bleiben
unberuehrt, damit das Design erhalten bleibt.
"""
import html
import io
import json
import os
import re

HIER = os.path.dirname(os.path.abspath(__file__))

STIL = (
    "Fotorealistische Familienfotografie, 35mm, weiches warmes Sonnenlicht durch ein großes "
    "Fenster, späte Nachmittagssonne, helle luftige Wohnung in Creme und hellem Holz, warme "
    "Farbpalette aus Creme, Honig, Sand und weichem Grün von Zimmerpflanzen, zarte zugewandte "
    "Stimmung, geringe Schärfentiefe mit weichem Bokeh, unscharfe Blätter oder Stoff im "
    "Vordergrund, natürliche warme Hauttöne, hell und freundlich, viel Licht.\n\n"
    "Vermeide: Text, Schrift, Logos, Wasserzeichen, Illustration, Comic-Stil, Collage, düstere "
    "oder graue Bildstimmung, kaltes blaues Licht, harte Schatten, traurige oder leere Gesichter, "
    "Unordnung, überfüllte Räume, grelle Buntheit, Werbe-Hochglanz, direkter Blick in die Kamera."
)

ZAHLWORT = {
    60: "Sechzig", 66: "Sechsundsechzig", 70: "Siebzig", 71: "Einundsiebzig",
    72: "Zweiundsiebzig", 73: "Dreiundsiebzig", 74: "Vierundsiebzig",
    75: "Fünfundsiebzig", 80: "Achtzig", 84: "Vierundachtzig", 90: "Neunzig",
}


def zahlwort(n):
    """Ohne Eintrag lieber die Ziffer als ein falsches Wort."""
    return ZAHLWORT.get(n, str(n))


def karte(eintrag):
    datei = html.escape(eintrag["datei"])
    szene = html.escape(eintrag["szene"])
    prompt = html.escape(f'{STIL}\n\n{eintrag["szene"]}', quote=True)
    # Zwei Dateinamen kommen doppelt vor, einmal als Artikelbild und einmal als
    # Test-Kachel. Ohne Unterscheidung waere die id doppelt vergeben, und dann
    # schaltet ein Haken die falsche Karte. Nur die Kacheln bekommen deshalb ein
    # Praefix, damit der gespeicherte Fortschritt der Artikel erhalten bleibt.
    kennung = ("test_" + datei) if eintrag["ordner"] == "tests" else datei
    return (
        f'<div class="karte" data-fertig="nein">'
        f'<input class="haken" type="checkbox" id="h_{kennung}" '
        f'aria-label="{datei} als erzeugt markieren">'
        f'<div><p class="datei">{datei}</p><p class="szene">{szene}</p></div>'
        f'<button type="button" data-prompt="{prompt}">Prompt kopieren</button>'
        f"</div>"
    )


def main():
    daten = json.load(io.open(os.path.join(HIER, "bild-prompts.json"), encoding="utf-8"))
    rahmen = io.open(os.path.join(HIER, "bildstrecke-rahmen.html"), encoding="utf-8").read()
    kopf, fuss = rahmen.split("<!--BILDER-->")

    gesamt = len(daten)
    kopf = kopf.replace("{{ZAHLWORT}}", zahlwort(gesamt))
    kopf = kopf.replace("{{ANZAHL}}", str(gesamt))
    kopf = kopf.replace("{{ZAHLWORT_KLEIN}}", zahlwort(gesamt).lower())

    teile = []
    for gruppe in dict.fromkeys(e["gruppe"] for e in daten):
        eintraege = [e for e in daten if e["gruppe"] == gruppe]
        erster = eintraege[0]
        teile.append(
            f'<section class="gruppe"><h2>{html.escape(gruppe)}</h2>\n'
            f'<p class="gruppenzeile"><span>{len(eintraege)} Bilder</span>'
            f'<span>{html.escape(erster["format"])}</span>'
            f'<span>public/bilder/{erster["ordner"]}/</span></p>\n'
            + "\n".join(karte(e) for e in eintraege)
            + "\n</section>"
        )

    ziel = os.path.join(HIER, "bildstrecke.html")
    io.open(ziel, "w", encoding="utf-8", newline="\n").write(kopf + "\n".join(teile) + fuss)

    doppelt = [d for d, n in
               __import__("collections").Counter(e["datei"] for e in daten).items() if n > 1]
    print(f"{gesamt} Bilder in {len(set(e['gruppe'] for e in daten))} Gruppen geschrieben.")
    if doppelt:
        print("Achtung, Dateiname doppelt:", ", ".join(doppelt))


if __name__ == "__main__":
    main()
