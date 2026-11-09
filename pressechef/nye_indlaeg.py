"""Finder coach-indlæg fra formularen, som endnu ikke har en pæn udgave i presse.js.

Bruges af den daglige Claude-opgave "Pressetribunen: sæt nye indlæg op".
Kør fra projektmappen:  python -X utf8 pressechef/nye_indlaeg.py
Udskriver JSON: en liste med id, dato (ÅÅÅÅ-MM-DD), hold, type, overskrift, tekst, navn
og evt. forside. Har coachen vedhæftet et billede, hentes det til forsider/<id>.jpg (+ -lille.jpg),
og "forside" er stien, der skal stå i presse.js.
Tom liste [] = intet nyt. Id'et SKAL bruges uændret i presse.js, ellers vises begge udgaver.
"""
import csv
import io
import json
import re
import sys
import urllib.request
from datetime import date, timedelta
from pathlib import Path

ROD = Path(__file__).resolve().parent.parent


def ark_id():
    cfg = (ROD / "config.js").read_text(encoding="utf-8")
    m = re.search(r'\bpresse:\s*"([^"]+)"', cfg)
    if not m:
        sys.exit("Ingen ARK.presse i config.js")
    return m.group(1)


def faste_id():
    js = (ROD / "presse.js").read_text(encoding="utf-8")
    return set(re.findall(r'"?id"?\s*:\s*"([^"]+)"', js))


def iso_dato(s):
    """Samme regel som formularDato i app.js: et indlæg er aldrig fra fremtiden."""
    s = (s or "").strip()
    m = re.match(r"^(\d{1,2})[./-](\d{1,2})[./-](\d{4})(?:\s+\d{1,2}([:.]))?", s)
    if not m:
        return s[:10]
    dk = f"{m[3]}-{int(m[2]):02d}-{int(m[1]):02d}"
    us = f"{m[3]}-{int(m[1]):02d}-{int(m[2]):02d}"
    imorgen = (date.today() + timedelta(days=1)).isoformat()
    gyldig = lambda d: int(d[5:7]) <= 12 and d <= imorgen
    raekke = [us, dk] if m[4] == ":" else [dk, us]
    return next((d for d in raekke if gyldig(d)), raekke[0])


def hent_billede(link, id_):
    """Henter coachens billede (Drive-upload eller link) og gemmer stor og lille JPG. Giver stien eller ""."""
    u = re.split(r"[,\s]+", link.strip())[0]
    m = re.search(r"drive\.google\.com/.*?(?:[?&]id=|/d/)([\w-]{20,})", u)
    if m:
        u = f"https://drive.google.com/uc?export=download&id={m.group(1)}"
    if not u.startswith("https://"):
        return ""
    try:
        from PIL import Image
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as svar:
            im = Image.open(io.BytesIO(svar.read())).convert("RGB")
    except Exception as e:  # ikke delt, ikke et billede osv.
        print(f"Kunne ikke hente billede til {id_}: {e}", file=sys.stderr)
        return ""
    mappe = ROD / "forsider"
    mappe.mkdir(exist_ok=True)
    stor = im.copy()
    stor.thumbnail((1600, 1600))
    stor.save(mappe / f"{id_}.jpg", quality=85, optimize=True)
    im.thumbnail((360, 360))
    im.save(mappe / f"{id_}-lille.jpg", quality=82, optimize=True)
    return f"forsider/{id_}.jpg"


def main():
    url = f"https://docs.google.com/spreadsheets/d/{ark_id()}/gviz/tq?tqx=out:csv"
    with urllib.request.urlopen(url, timeout=60) as svar:
        rows = list(csv.reader(io.StringIO(svar.read().decode("utf-8"))))
    if not rows:
        print("[]")
        return
    hoved = [h.strip().lower() for h in rows[0]]

    def kol(*navne):
        for i, h in enumerate(hoved):
            if any(h.startswith(n) for n in navne):
                return i
        return -1

    k = {"dato": kol("timestamp", "tidsstempel", "dato"), "hold": kol("hold"), "type": kol("type"),
         "titel": kol("overskrift"), "tekst": kol("tekst"), "navn": kol("dit navn", "navn", "coach"),
         "skjul": kol("skjul"), "billede": kol("billede")}
    v = lambda r, i: (r[i].strip() if 0 <= i < len(r) else "")

    kendte = faste_id()
    nye = []
    for nr, r in enumerate(rows[1:], start=1):
        if not v(r, k["hold"]) or not v(r, k["titel"]) or v(r, k["skjul"]):
            continue
        id_ = "coach-" + (re.sub(r"\D", "", v(r, k["dato"])) or str(nr))
        if id_ in kendte:
            continue
        nye.append({"id": id_, "dato": iso_dato(v(r, k["dato"])), "hold": v(r, k["hold"]),
                    "type": v(r, k["type"]) or "Pressemeddelelse", "overskrift": v(r, k["titel"]),
                    "tekst": v(r, k["tekst"]), "navn": v(r, k["navn"])})
        if v(r, k["billede"]):
            nye[-1]["forside"] = hent_billede(v(r, k["billede"]), id_)
    print(json.dumps(nye, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
