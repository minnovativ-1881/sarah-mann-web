# -*- coding: utf-8 -*-
"""
Stellt ein fertig gerendertes Karussell in die Buffer-Warteschlange.

    python social/instagram/buffer.py vorlagen-hell            in die Warteschlange
    python social/instagram/buffer.py vorlagen-hell --wann "2026-09-05 09:00"
    python social/instagram/buffer.py vorlagen-hell --entwurf  nur als Entwurf
    python social/instagram/buffer.py vorlagen-hell --nur-bilder   nur hochladen

Ablauf:
  1. Die PNG aus export/<deck>/ werden als JPEG nach public/social/<deck>/ gelegt.
  2. Der Ordner wird committet und gepusht, danach wartet das Skript, bis Vercel
     ausgeliefert hat.
  3. Buffer bekommt die oeffentlichen Adressen und legt den Beitrag an.

Warum der Umweg ueber die Website: Buffer nimmt Bilder nur als oeffentliche
Adresse entgegen, es gibt in der API keinen Upload. Die Folien sind ohnehin
oeffentliche Werbebilder, und nebenbei entsteht ein Archiv aller Karussells.

Der Zugang steht in zugaenge-sarahmann.env unter "Buffer". Er wird nie
ausgegeben, auch nicht in Fehlermeldungen.
"""
import argparse
import io
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

from PIL import Image

HIER = os.path.dirname(os.path.abspath(__file__))
PROJEKT = os.path.dirname(os.path.dirname(HIER))
ZUGAENGE = os.path.join(PROJEKT, "zugaenge-sarahmann.env")
BASIS_URL = "https://www.sarahmann.de/social"

# Kanal und Organisation stehen fest, es gibt genau einen Instagram-Kanal.
ORGANISATION = "6a96b36df5e85fde081af415"
KANAL = "6a96b401065799be4667b7e6"

# Instagram zeigt Feed-Bilder hoechstens 1440 Pixel breit an. Wir liefern die
# Entwurfsgroesse, das ist scharf genug und haelt die Dateien klein.
BREITE, HOEHE = 1080, 1440


def zugang():
    zeilen = [z.strip() for z in io.open(ZUGAENGE, encoding="utf-8") if z.strip()]
    for i, z in enumerate(zeilen):
        if "Buffer" in z and i + 1 < len(zeilen):
            return zeilen[i + 1]
    raise SystemExit("Kein Buffer-Zugang in zugaenge-sarahmann.env gefunden.")


def graph(abfrage, variablen=None):
    koerper = json.dumps({"query": abfrage, "variables": variablen or {}}).encode()
    req = urllib.request.Request(
        "https://api.buffer.com/",
        data=koerper,
        method="POST",
        headers={"Authorization": f"Bearer {zugang()}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as antwort:
            d = json.loads(antwort.read() or "{}")
    except urllib.error.HTTPError as fehler:
        text = fehler.read().decode("utf-8", "replace")
        raise SystemExit(f"Buffer antwortet {fehler.code}: {text[:400]}")
    if d.get("errors"):
        raise SystemExit("Buffer meldet: " + json.dumps(d["errors"], ensure_ascii=False)[:500])
    return d["data"]


def lauf(*befehl, im=PROJEKT):
    ergebnis = subprocess.run(befehl, cwd=im, capture_output=True, text=True)
    if ergebnis.returncode != 0:
        raise SystemExit(f"{' '.join(befehl)} fehlgeschlagen:\n{ergebnis.stderr[:400]}")
    return ergebnis.stdout.strip()


def bilder_ablegen(deck):
    quelle = os.path.join(HIER, "export", deck)
    if not os.path.isdir(quelle):
        raise SystemExit(f"Kein gerendertes Deck unter {quelle}. Erst render.js aufrufen.")
    ziel = os.path.join(PROJEKT, "public", "social", deck)
    os.makedirs(ziel, exist_ok=True)

    adressen = []
    for datei in sorted(f for f in os.listdir(quelle) if f.endswith(".png")):
        with Image.open(os.path.join(quelle, datei)) as im:
            im = im.convert("RGB").resize((BREITE, HOEHE), Image.LANCZOS)
            name = datei.replace(".png", ".jpg")
            pfad = os.path.join(ziel, name)
            im.save(pfad, "JPEG", quality=90, optimize=True, progressive=True)
        adressen.append(f"{BASIS_URL}/{deck}/{name}")
        print(f"  {name}  {os.path.getsize(pfad) // 1024} KB")
    if not adressen:
        raise SystemExit("Keine Folien gefunden.")
    if len(adressen) > 10:
        raise SystemExit(f"Instagram nimmt hoechstens 10 Folien, hier sind es {len(adressen)}.")
    return adressen


def veroeffentlichen(deck):
    lauf("git", "add", f"public/social/{deck}")
    stand = lauf("git", "status", "--porcelain", f"public/social/{deck}")
    if stand:
        lauf("git", "commit", "-q", "-m", f"Karussell {deck}: Folien fuer Buffer")
        lauf("git", "push", "-q", "origin", "HEAD")
        print("  gepusht")
    else:
        print("  unveraendert, kein Push noetig")


def warten_bis_erreichbar(adresse, sekunden=420):
    """Vercel braucht ein bis drei Minuten. Ohne Warten holt Buffer ins Leere."""
    ende = time.time() + sekunden
    while time.time() < ende:
        try:
            with urllib.request.urlopen(adresse, timeout=15) as a:
                if a.status == 200:
                    return True
        except Exception:
            pass
        time.sleep(15)
    return False


def zeitpunkt(text):
    """Termin in Israel-Zeit, so wie Timon denkt, umgerechnet nach UTC."""
    roh = datetime.strptime(text, "%Y-%m-%d %H:%M")
    # Israel liegt im Sommer drei, im Winter zwei Stunden vor UTC. Die genauen
    # Umstellungstage sind hier egal, der Beitrag geht um Stunden, nicht Minuten.
    versatz = 3 if 3 <= roh.month <= 10 else 2
    utc = roh - timedelta(hours=versatz)
    return utc.replace(tzinfo=timezone.utc).isoformat().replace("+00:00", "Z")


def buffer_anlegen(deck_daten, adressen, wann=None, entwurf=False):
    # Instagram kennt in der Buffer-API nur post, story und reel. Ein Karussell
    # ist ein ganz normaler Beitrag mit mehreren Bildern, kein eigener Typ.
    text = deck_daten.get("caption", "").strip()

    # Ein echter Erstkommentar setzt einen bezahlten Buffer-Tarif voraus. Damit
    # die Hashtags trotzdem mitgehen, haengen sie hier an den Text an.
    if deck_daten.get("ersterKommentar"):
        trenner = "\n\n.\n.\n.\n"
        text = text + trenner + deck_daten["ersterKommentar"].strip()

    eingabe = {
        "channelId": KANAL,
        "assets": [{"image": {"url": u}} for u in adressen],
        "text": text,
        "mode": "customScheduled" if wann else "addToQueue",
        "schedulingType": "automatic",
        "needsApproval": False,
        "source": "sarahmann-karussell",
        "metadata": {"instagram": {"type": "post", "shouldShareToFeed": True}},
    }
    if entwurf:
        eingabe["saveToDraft"] = True
    if wann:
        eingabe["dueAt"] = zeitpunkt(wann)

    # createPost gibt eine Union zurueck: entweder PostActionSuccess oder eine
    # der Fehlervarianten. Deshalb __typename mitlesen und danach verzweigen.
    daten = graph(
        """mutation($input: CreatePostInput!) {
             createPost(input: $input) {
               __typename
               ... on PostActionSuccess { post { id status dueAt } }
               ... on NotFoundError { message }
               ... on UnauthorizedError { message }
               ... on UnexpectedError { message }
               ... on RestProxyError { message code }
               ... on LimitReachedError { message }
               ... on InvalidInputError { message }
             }
           }""",
        {"input": eingabe},
    )
    return daten["createPost"]


def main():
    p = argparse.ArgumentParser(description="Karussell nach Buffer stellen")
    p.add_argument("deck", help="Name des Decks, wie der Ordner unter export/")
    p.add_argument("--wann", help='fester Termin, z. B. "2026-09-05 09:00" (Israel-Zeit)')
    p.add_argument("--entwurf", action="store_true", help="nur als Entwurf in Buffer")
    p.add_argument("--nur-bilder", action="store_true", help="nur ablegen und pushen")
    a = p.parse_args()

    deck_datei = os.path.join(HIER, "decks", a.deck + ".json")
    if not os.path.isfile(deck_datei):
        raise SystemExit(f"Kein Deck {a.deck}.json unter decks/.")
    deck = json.load(io.open(deck_datei, encoding="utf-8"))
    if not deck.get("caption"):
        raise SystemExit(
            f'{a.deck}.json hat keine "caption". Ohne Text soll kein Beitrag rausgehen.')

    print(f"Folien ablegen ({a.deck})")
    adressen = bilder_ablegen(a.deck)

    print("Auf die Website bringen")
    veroeffentlichen(a.deck)

    print("Warten, bis die erste Folie erreichbar ist")
    if not warten_bis_erreichbar(adressen[0]):
        raise SystemExit(f"{adressen[0]} ist nicht erreichbar. Deploy pruefen, dann erneut.")
    print("  erreichbar")

    if a.nur_bilder:
        print("\nNur Bilder gewuenscht, Buffer bleibt unberuehrt.")
        for u in adressen:
            print(" ", u)
        return

    print("Beitrag in Buffer anlegen")
    ergebnis = buffer_anlegen(deck, adressen, a.wann, a.entwurf)
    if ergebnis.get("__typename") == "PostActionSuccess":
        post = ergebnis["post"]
        print(f"  angelegt: {post['id']}  Status {post['status']}  Termin {post.get('dueAt')}")
        print(f"\n{len(adressen)} Folien, Kanal sarahmann2202. In Buffer nachsehen und freigeben.")
    else:
        raise SystemExit("Buffer hat den Beitrag abgelehnt: " +
                         json.dumps(ergebnis, ensure_ascii=False)[:400])


if __name__ == "__main__":
    main()
