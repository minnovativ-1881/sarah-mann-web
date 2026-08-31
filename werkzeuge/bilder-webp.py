# -*- coding: utf-8 -*-
"""
Wandelt alle PNG/JPG in public/bilder/{artikel,silos,tests} nach WebP um,
schneidet mittig auf das richtige Seitenverhaeltnis und loescht das Original.

Aufruf:  python werkzeuge/bilder-webp.py
"""
import os, sys
from PIL import Image

BASIS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "bilder")

ZIELE = {
    "artikel": (1600, 1067),
    "silos":   (1920, 1080),
    "tests":   (1200, 800),
}


def zuschneiden(bild, breite, hoehe):
    """Mittig auf das Zielverhaeltnis beschneiden, dann skalieren."""
    ziel = breite / hoehe
    ist = bild.width / bild.height
    if ist > ziel:
        neu = int(bild.height * ziel)
        links = (bild.width - neu) // 2
        bild = bild.crop((links, 0, links + neu, bild.height))
    elif ist < ziel:
        neu = int(bild.width / ziel)
        oben = (bild.height - neu) // 2
        bild = bild.crop((0, oben, bild.width, oben + neu))
    return bild.resize((breite, hoehe), Image.LANCZOS)


def main():
    gesamt = 0
    for ordner, (b, h) in ZIELE.items():
        pfad = os.path.join(BASIS, ordner)
        if not os.path.isdir(pfad):
            continue
        for datei in sorted(os.listdir(pfad)):
            name, endung = os.path.splitext(datei)
            if endung.lower() not in (".png", ".jpg", ".jpeg"):
                continue
            quelle = os.path.join(pfad, datei)
            ziel = os.path.join(pfad, name + ".webp")
            with Image.open(quelle) as im:
                im = im.convert("RGB")
                im = zuschneiden(im, b, h)
                im.save(ziel, "WEBP", quality=82, method=6)
            kb = os.path.getsize(ziel) // 1024
            os.remove(quelle)
            print("%-10s %-42s %4d KB" % (ordner, name + ".webp", kb))
            gesamt += 1
    print("\n%d Bilder umgewandelt." % gesamt)
    if gesamt == 0:
        print("Nichts gefunden. Liegen die PNG/JPG in public/bilder/artikel, /silos oder /tests?")


if __name__ == "__main__":
    main()
