# -*- coding: utf-8 -*-
"""
Vertont ein Reel mit ElevenLabs. Der ganze Sprechtext geht in EINER Anfrage raus
(durchgehende Betonung, funktioniert mit v2, v3 und v4 gleich). Die Zeitstempel je
Buchstabe liefern die Startzeit jeder Szene.

    python vertonen.py r02-z04                          Modell aus stimme.json
    python vertonen.py r02-z04 --modell eleven_v4       anderes Modell
    python vertonen.py r02-z04 --modell eleven_v3 --pruefen   plus Transkript-Gegenprobe

Ergebnis: projekt/audio/<id>__<modell>.mp3 und .json {"starts": [...], "ende": s, "modell": ...}
Einstellungen in stimme.json: {"voice_id": "...", "model": "...", "stability": 0.42, "similarity": 0.8, "style": 0.0}
Schlüssel: _fuer-claude/secrets/zugang-elevenlabs.txt, Zeile "Key: ...". Wird nie ausgegeben.
"""
import base64
import json
import os
import sys
import urllib.error
import urllib.request
import uuid


# YouTube-Fassung (--yt): Szenen mit sprich_yt / zeige_yt / klein_yt nehmen diese Texte,
# weil es auf YouTube keine Direktnachrichten gibt (Schluss "Link oben im Kanal").
YT = "--yt" in sys.argv


def fassung(reel):
    if not YT:
        return reel
    r = dict(reel)
    r["szenen"] = [{**sz, **{k[:-3]: v for k, v in sz.items() if k.endswith("_yt")}} for sz in reel["szenen"]]
    return r

HIER = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.join(HIER, "projekt")
AUDIO = os.path.join(PROJ, "audio")


def schluessel():
    for z in open(r"C:\_timon-claude\_fuer-claude\secrets\zugang-elevenlabs.txt", encoding="utf-8"):
        if z.lower().startswith("key"):
            return z.split(":", 1)[1].strip()
    raise SystemExit("Kein ElevenLabs-Schlüssel gefunden.")


def anfrage(key, url, body=None, daten=None, typ="application/json; charset=utf-8"):
    if body is not None:
        daten = json.dumps(body, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(url, data=daten, headers={"xi-api-key": key, "Content-Type": typ}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise SystemExit(f"ElevenLabs-Fehler {e.code}: {e.read()[:400]!r}")


def einstellungen(cfg, modell):
    s = {"stability": cfg.get("stability", 0.42), "similarity_boost": cfg.get("similarity", 0.8)}
    if "v4" in modell:
        s["use_speaker_boost"] = True
    if "v3" in modell:          # v3 kennt nur 0.0 (kreativ), 0.5 (natürlich), 1.0 (robust)
        s["stability"] = min((0.0, 0.5, 1.0), key=lambda x: abs(x - cfg.get("stability_v3", 0.5)))
    if "multilingual" in modell or "turbo_v2" in modell or "flash" in modell:
        s["style"] = cfg.get("style", 0.0)
        s["use_speaker_boost"] = True
    return s


def pruefen(key, mp3):
    """Gegenprobe: Was versteht Scribe? Zeigt Verschlucktes oder falsch Gesprochenes."""
    grenze = uuid.uuid4().hex
    teile = [f'--{grenze}\r\nContent-Disposition: form-data; name="model_id"\r\n\r\nscribe_v1\r\n'.encode(),
             f'--{grenze}\r\nContent-Disposition: form-data; name="language_code"\r\n\r\ndeu\r\n'.encode(),
             f'--{grenze}\r\nContent-Disposition: form-data; name="file"; filename="a.mp3"\r\nContent-Type: audio/mpeg\r\n\r\n'.encode()
             + open(mp3, "rb").read() + b"\r\n", f"--{grenze}--\r\n".encode()]
    r = anfrage(key, "https://api.elevenlabs.io/v1/speech-to-text", daten=b"".join(teile),
                typ=f"multipart/form-data; boundary={grenze}")
    return r.get("text", "")


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    rid = sys.argv[1]
    reel = fassung({r["id"]: r for r in json.load(open(os.path.join(HIER, "reels.json"), encoding="utf-8"))}[rid])
    cfg = json.load(open(os.path.join(HIER, "stimme.json"), encoding="utf-8"))
    modell = sys.argv[sys.argv.index("--modell") + 1] if "--modell" in sys.argv else cfg["model"]
    key = schluessel()
    os.makedirs(AUDIO, exist_ok=True)

    saetze = [s["sprich"].strip() for s in reel["szenen"]]
    # Regieanweisung vorn (Timons Wahl C vom 18.10.2026): wird gespielt, nicht gelesen.
    text, anfaenge = (cfg["praefix"] + " ") if cfg.get("praefix") else "", []
    for satz in saetze:
        if text and not text.endswith(" "):
            text += " "
        anfaenge.append(len(text))
        text += satz

    body = {"text": text, "model_id": modell, "voice_settings": einstellungen(cfg, modell)}
    r = anfrage(key, f"https://api.elevenlabs.io/v1/text-to-speech/{cfg['voice_id']}/with-timestamps"
                     "?output_format=mp3_44100_128", body)
    name = f"{rid}__{modell}" + ("__yt" if YT else "")
    open(os.path.join(AUDIO, name + ".mp3"), "wb").write(base64.b64decode(r["audio_base64"]))

    al = r.get("alignment") or r.get("normalized_alignment")
    zeichen, st, en = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
    if "".join(zeichen) != text:
        raise SystemExit("Zeitstempel passen nicht zum Text, Szenengrenzen nicht sicher.")
    starts = [round(st[a], 3) for a in anfaenge]
    ende = round(max(en), 3)
    json.dump({"starts": starts, "ende": ende, "modell": modell}, open(os.path.join(AUDIO, name + ".json"), "w", encoding="utf-8"))

    for i, satz in enumerate(saetze):
        bis = starts[i + 1] if i + 1 < len(starts) else ende
        print(f"  {starts[i]:6.2f} bis {bis:6.2f}  {satz}")
    print(f"{name}: {ende:.1f} s, {len(text)} Zeichen")
    open(os.path.join(AUDIO, name + ".txt"), "w", encoding="utf-8").write(text)
    if "--pruefen" in sys.argv:
        print("Gegenprobe:", pruefen(key, os.path.join(AUDIO, name + ".mp3")))


if __name__ == "__main__":
    main()
