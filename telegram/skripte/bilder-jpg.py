"""Artikelbilder fuer Telegram nach JPG umwandeln.

Telegram nimmt WebP bei sendPhoto nicht zuverlaessig an, deshalb liegt von
jedem Artikelbild eine JPG-Fassung unter telegram/bilder/. Die Datei wird beim
Senden direkt hochgeladen, damit der Kanal nicht davon abhaengt, ob die Website
gerade neu deployt wurde.

Aufruf:  python telegram/skripte/bilder-jpg.py
Vorhandene Dateien werden nur ersetzt, wenn die Quelle neuer ist.
"""

from pathlib import Path

from PIL import Image

WURZEL = Path(__file__).resolve().parents[2]
QUELLE = WURZEL / "public" / "bilder" / "artikel"
ZIEL = WURZEL / "telegram" / "bilder"

# Telegram skaliert in der Vorschau ohnehin herunter. Mehr als 1280 Pixel
# Breite bringt nichts und kostet nur Ladezeit.
MAX_BREITE = 1280
QUALITAET = 82


def main() -> None:
    ZIEL.mkdir(parents=True, exist_ok=True)

    neu = 0
    uebersprungen = 0

    for datei in sorted(QUELLE.glob("*.webp")):
        ziel = ZIEL / f"{datei.stem}.jpg"

        if ziel.exists() and ziel.stat().st_mtime >= datei.stat().st_mtime:
            uebersprungen += 1
            continue

        with Image.open(datei) as bild:
            bild = bild.convert("RGB")

            if bild.width > MAX_BREITE:
                hoehe = round(bild.height * MAX_BREITE / bild.width)
                bild = bild.resize((MAX_BREITE, hoehe), Image.LANCZOS)

            bild.save(ziel, "JPEG", quality=QUALITAET, optimize=True, progressive=True)

        neu += 1
        print(f"  {ziel.name}  {bild.width}x{bild.height}  {ziel.stat().st_size // 1024} kB")

    print(f"\n{neu} umgewandelt, {uebersprungen} schon aktuell. Ziel: {ZIEL}")


if __name__ == "__main__":
    main()
