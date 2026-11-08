# -*- coding: utf-8 -*-
"""
Baut ein Zahlen-Reel (1080 x 1920) für @sarahmann2202 als HyperFrames-Komposition.

    python bauen.py z01-weitergabe            mit Ton, falls vertont
    python bauen.py z01-weitergabe --still    ohne Ton, Zeiten geschätzt

Abgeleitet von der Hier-und-Wir-Werkstatt (traffic-battle/reels/bauen.py).

Aufbau einer Szene: Foto oben (1080 x 1060, langsamer Ken-Burns-Zug), das nach
unten in die Markenfläche ausläuft. Der Text steht darunter auf ruhigem Grund.
Grund: Alle Fotos sind 1536 x 1024 quer. Bildfüllend im Hochformat müssten sie
fast doppelt hochgerechnet werden und würden weich. So bleiben sie scharf, und
der Text steht nie auf einem unruhigen Bildteil.

Safe Zones (Skill insta-post-design): Wichtiges nur zwischen y 280 und 1350,
rechts 130 px frei für Instagrams Knöpfe.
"""
import html
import json
import os
import re
import shutil
import sys

HIER = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.join(HIER, "projekt")
WEB = os.path.abspath(os.path.join(HIER, "..", ".."))
BILDQUELLE = os.path.join(WEB, "public", "bilder")
INSTA = os.path.join(HIER, "..", "instagram")

# Exakt die Website-Farben (tailwind.config.ts), wie in instagram/design.js.
M = dict(ink="#1C1B18", petrol="#136B73", petrolHell="#15727B", petrolMittel="#0D454E",
         sand="#F2EAE0", taupe="#A89B8C", creme="#F6F4EF", weiss="#FFFFFF")

VARIANTE = {
    "dunkel": dict(grund=f"linear-gradient(180deg,{M['petrolHell']} 0%,{M['petrolMittel']} 100%)",
                   text=M["weiss"], leise="rgba(255,255,255,.80)", akzent=M["sand"],
                   pille=M["sand"], pilleText=M["petrolMittel"],
                   logo="logo-nav-light.webp", kreis="sarah-kreis-hell.png"),
    "hell": dict(grund=M["creme"], text=M["ink"], leise="rgba(28,27,24,.70)", akzent=M["petrol"],
                 pille=M["petrol"], pilleText=M["weiss"],
                 logo="logo-nav.webp", kreis="sarah-kreis-dunkel.png"),
}

GAP = 0.25     # Pause zwischen Szenen (s)
FADE = 0.4     # Überblendung Foto (s)


def schaetzen(sz):
    d = len(sz["sprich"].split()) * 0.40 + 0.5
    return max(d, {"hook": 1.8, "zahl": 2.4, "text": 2.4, "cta": 4.0}.get(sz["typ"], 2.0))


def woerter(txt, cls_em="em"):
    """*wort* hebt hervor; jedes Wort ein eigener Span für das gestaffelte Einblenden."""
    out = []
    for t in re.split(r"(\*[^*]+\*)", txt):
        if not t:
            continue
        em = t.startswith("*") and t.endswith("*")
        for w in t.strip("*").split():
            out.append(f'<span class="w{" " + cls_em if em else ""}">{html.escape(w)}</span>')
    return " ".join(out)


def kopieren(quelle, name):
    ziel = os.path.join(PROJ, "bilder", name)
    if not os.path.exists(ziel):
        os.makedirs(os.path.dirname(ziel), exist_ok=True)
        shutil.copy(quelle, ziel)
    return "bilder/" + name


def bild(rel):
    return kopieren(os.path.join(BILDQUELLE, rel.replace("/", os.sep)), rel.replace("/", "_"))


def zahl_text(sz):
    z = sz["zahl"]
    if isinstance(z, str):
        return z
    n = sz.get("nachkomma", 0)
    return f"{z:,.{n}f}".replace(",", "#").replace(".", ",").replace("#", ".")


def bauen(reel, modell, still=False):
    rid = reel["id"]
    v = VARIANTE[reel.get("variante", "dunkel")]
    name = f"{rid}__{modell}"
    tpath = os.path.join(PROJ, "audio", name + ".json")
    timing = None if still or not os.path.exists(tpath) else json.load(open(tpath, encoding="utf-8"))
    if timing:
        starts = [0.0] + timing["starts"][1:]
        grenzen = starts[1:] + [timing["ende"] + 0.3]
        dauern = [round(b - a - GAP, 3) for a, b in zip(starts, grenzen)]
        total = round(grenzen[-1] + 1.2, 2)
    else:
        dauern = [schaetzen(s) for s in reel["szenen"]]
        starts, t = [], 0.0
        for d in dauern:
            starts.append(round(t, 3))
            t += d + GAP
        total = round(t + 1.2, 2)

    logo = kopieren(os.path.join(INSTA, v["logo"]), v["logo"])
    logo_hell = kopieren(os.path.join(INSTA, "logo-nav-light.webp"), "logo-nav-light.webp")
    kreis = kopieren(os.path.join(INSTA, "fotos", v["kreis"]), v["kreis"])

    lagen, texte, js = [], [], []
    n = len(reel["szenen"])
    cta_start = starts[-1]
    for i, sz in enumerate(reel["szenen"]):
        s, d = starts[i], dauern[i] + GAP
        ende = i == n - 1
        bs = max(0, s - FADE)
        bd = (total - bs) if ende else (d + FADE * 2)

        # Foto mit Ken Burns, läuft per Maske in den Grund aus
        if sz.get("bild") and sz["typ"] != "cta":
            src = bild(sz["bild"])
            lagen.append(f'''<div id="bg{i}" class="clip foto" data-start="{bs:.3f}" data-duration="{bd:.3f}" data-track-index="0">
  <div id="bgl{i}" class="lage"><img id="kb{i}" class="kb" src="{src}" alt="" style="object-position:{sz.get('fokus', '50%')} 50%"><div class="scrim"></div></div></div>''')
            kx = 18 if i % 2 else -18
            js.append(f'tl.fromTo("#kb{i}",{{scale:1.0,x:{-kx}}},{{scale:1.08,x:{kx},duration:{bd:.3f},ease:"none"}},{bs:.3f});')
            if i > 0:
                js.append(f'tl.fromTo("#bgl{i}",{{opacity:0}},{{opacity:1,duration:{FADE},ease:"none"}},{bs:.3f});')

        # Text
        if sz["typ"] == "zahl":
            zt = zahl_text(sz)
            breite = len(zt) + 0.55 * len(sz.get("einheit", ""))
            groesse = min(300, int(820 / (0.52 * breite)))
            start_wert = zt if (i == 0 or isinstance(sz["zahl"], str)) else "0"
            inhalt = f'''<div class="zahl" style="font-size:{groesse}px"><span id="zn{i}">{html.escape(start_wert)}</span><em>{html.escape(sz.get("einheit", ""))}</em></div>
  <div class="satz klein">{woerter(sz["zeige"])}</div>'''
            if sz.get("quelle_zeigen", True):
                inhalt += f'<div class="quelle">{html.escape(sz.get("quelle", reel["quelle"]))}</div>'
            if not isinstance(sz["zahl"], str):
                nk = sz.get("nachkomma", 0)
                js.append(f'(function(){{var o={{v:0}};tl.to(o,{{v:{sz["zahl"]},duration:1.0,ease:"power2.out",onUpdate:function(){{document.getElementById("zn{i}").textContent=o.v.toFixed({nk}).replace(".",",").replace(/\\B(?=(\\d{{3}})+(?!\\d))/g,".");}}}},{s + 0.05:.3f});}})();')
            js.append(f'tl.fromTo("#tx{i} .zahl",{{opacity:0,y:50}},{{opacity:1,y:0,duration:0.5,ease:"power3.out"}},{s:.3f});')
            js.append(f'tl.fromTo("#tx{i} .quelle",{{opacity:0}},{{opacity:1,duration:0.4}},{s + 0.6:.3f});')
        elif sz["typ"] == "cta":
            klein = f'<div class="cta-klein">{html.escape(sz["klein"])}</div>' if sz.get("klein") else ""
            inhalt = f'''<div class="absender"><img class="kreis" src="{kreis}" alt=""><img class="unterschrift" src="{logo}" alt="Sarah Mann"></div>
  <div class="cta">{woerter(sz["zeige"], "pill")}</div>{klein}'''
            js.append(f'tl.fromTo("#tx{i} .absender",{{opacity:0,y:30}},{{opacity:1,y:0,duration:0.55,ease:"power3.out"}},{s:.3f});')
            js.append(f'tl.fromTo("#tx{i} .cta-klein",{{opacity:0,y:20}},{{opacity:1,y:0,duration:0.45,ease:"power3.out"}},{s + 1.0:.3f});')
        else:
            inhalt = f'<div class="satz {sz["typ"]}">{woerter(sz["zeige"])}</div>'

        texte.append(f'''<div id="tx{i}" class="clip tx {sz["typ"]}" data-start="{s:.3f}" data-duration="{(total - s) if ende else d:.3f}" data-track-index="2">
  <div class="box">{inhalt}</div></div>''')
        if i == 0:
            # Erste Szene steht ab Bild 0 (Vorschaubild), nur ein leichtes Atmen
            js.append(f'tl.fromTo("#tx{i} .satz",{{scale:1}},{{scale:1.03,duration:{d:.3f},ease:"none",transformOrigin:"left center"}},0);')
        else:
            js.append(f'tl.fromTo("#tx{i} .w",{{opacity:0,y:30}},{{opacity:1,y:0,duration:0.45,ease:"power3.out",stagger:0.055}},{s + 0.08:.3f});')
        if not ende:
            js.append(f'tl.to("#tx{i} > *",{{opacity:0,y:-20,duration:0.28,ease:"power2.in"}},{s + d - 0.32:.3f});')

    # Fotos aus, Grund bleibt, sobald der Schluss kommt
    js.append(f'tl.to(".foto .lage",{{opacity:0,duration:{FADE},ease:"none"}},{max(0, cta_start - FADE):.3f});')

    audio = ""
    if timing and os.path.exists(os.path.join(PROJ, "audio", name + ".mp3")):
        audio = f'<audio id="vo" src="audio/{name}.mp3" data-start="0" data-duration="{timing["ende"] + 0.2:.3f}" data-track-index="3"></audio>'

    fonts = open(os.path.join(PROJ, "fonts", "fonts.css"), encoding="utf-8").read()
    seite = f'''<!doctype html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
{fonts}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1920px;overflow:hidden;background:{M["petrolMittel"] if reel.get("variante","dunkel")=="dunkel" else M["creme"]}}}
#root{{position:relative;width:100%;height:100%;overflow:hidden;font-family:"Jost",sans-serif;font-variant-numeric:lining-nums;font-feature-settings:"lnum" 1;background:{v["grund"]}}}
.foto{{position:absolute;left:0;top:0;right:auto;bottom:auto;width:1080px;height:1060px;overflow:hidden}}
.lage{{position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(180deg,#000 0%,#000 62%,transparent 100%);mask-image:linear-gradient(180deg,#000 0%,#000 62%,transparent 100%)}}
.kb{{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}}
.scrim{{position:absolute;left:0;right:0;top:0;height:420px;background:linear-gradient(180deg,rgba(20,18,15,.42) 0%,rgba(20,18,15,0) 100%)}}
.marke{{position:absolute;left:0;right:0;top:170px;display:flex;justify-content:center}}
.marke{{right:auto;bottom:auto;width:1080px;height:100px}}
.marke img{{height:84px;width:auto}}
.tx{{position:absolute;inset:0}}
.box{{position:absolute;left:84px;top:905px;width:846px;height:445px;white-space:normal;display:flex;flex-direction:column;justify-content:center}}
.tx.cta .box{{top:290px;height:1060px}}
.w{{display:inline-block}}
.satz{{font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;font-size:96px;line-height:1.06;color:{v["text"]};letter-spacing:-.005em}}
.satz.hook{{font-size:108px}}
.satz.klein{{font-size:64px;line-height:1.12;margin-top:18px}}
.satz .em{{font-style:italic;color:{v["akzent"]}}}
.zahl{{font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;line-height:.86;color:{v["text"]};letter-spacing:-.02em;white-space:nowrap}}
.zahl em{{font-style:italic;color:{v["akzent"]};font-size:.5em;margin-left:.08em}}
.quelle{{margin-top:30px;font:400 30px/1.35 "Jost";color:{v["leise"]};letter-spacing:.01em}}
.absender{{display:flex;flex-direction:column;align-items:center;margin-bottom:56px}}
.kreis{{width:280px;height:280px;border-radius:50%;object-fit:cover}}
.unterschrift{{height:84px;width:auto;margin-top:26px}}
.cta{{font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;font-size:92px;line-height:1.1;color:{v["text"]};text-align:center}}
.cta .pill{{display:inline-block;font-family:"Jost",sans-serif;font-weight:500;font-size:.72em;letter-spacing:.06em;color:{v["pilleText"]};background:{v["pille"]};padding:.08em .4em .12em;border-radius:.3em;margin:.08em 0}}
.cta-klein{{margin-top:34px;font:400 40px/1.35 "Jost";color:{v["leise"]};text-align:center}}
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-width="1080" data-height="1920" data-duration="{total}">
{chr(10).join(lagen)}
<div id="marke" class="clip marke" data-start="0" data-duration="{cta_start:.3f}" data-track-index="1"><img src="{logo_hell}" alt="Sarah Mann"></div>
{chr(10).join(texte)}
{audio}
</div>
<script>
const tl = gsap.timeline({{ paused: true }});
{chr(10).join(js)}
window.__timelines["main"] = tl;
tl.seek(0);
</script>
</body>
</html>
'''
    open(os.path.join(PROJ, "index.html"), "w", encoding="utf-8").write(seite)
    os.makedirs(os.path.join(PROJ, "compositions"), exist_ok=True)
    open(os.path.join(PROJ, "compositions", name + ".html"), "w", encoding="utf-8").write(seite)
    print(f"{name}: {n} Szenen, {total} s, {'mit Ton' if audio else 'ohne Ton (geschätzt)'}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    reels = {r["id"]: r for r in json.load(open(os.path.join(HIER, "reels.json"), encoding="utf-8"))}
    modell = sys.argv[sys.argv.index("--modell") + 1] if "--modell" in sys.argv else \
        json.load(open(os.path.join(HIER, "stimme.json"), encoding="utf-8"))["model"]
    bauen(reels[sys.argv[1]], modell, still="--still" in sys.argv)
