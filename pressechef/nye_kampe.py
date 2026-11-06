"""Finder spillede puljekampe, som Spike! endnu ikke har skrevet referat om.

Bruges af den daglige Claude-opgave "Pressetribunen: sæt nye indlæg op".
Kør fra projektmappen:  python -X utf8 pressechef/nye_kampe.py
Udskriver JSON: en liste med kampe og fakta fra kommissærens kampskema (samme læsning som læsKamp i app.js).
Id'et ("spike-...") SKAL bruges uændret i presse.js, ellers skrives referatet igen næste gang.
"""
import csv
import io
import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROD = Path(__file__).resolve().parent.parent


def config():
    cfg = (ROD / "config.js").read_text(encoding="utf-8")
    ark = dict(re.findall(r'^\s*(\w+):\s*"([A-Za-z0-9_-]{30,})"', cfg, re.M))
    blok = cfg[cfg.index("PULJEKAMPE"):]
    puljer = []
    for m in re.finditer(r'\{\s*pulje:\s*"([^"]+)",\s*ark:\s*"(\w+)",\s*faner:\s*\[(.*?)\]\s*\}', blok, re.S):
        puljer.append({"pulje": m[1], "ark": ark[m[2]], "faner": re.findall(r'"([^"]+)"', m[3])})
    return puljer


def kendte_id():
    return set(re.findall(r'"?id"?\s*:\s*"([^"]+)"', (ROD / "presse.js").read_text(encoding="utf-8")))


def slug(s):
    s = s.lower().replace("æ", "ae").replace("ø", "oe").replace("å", "aa").replace("ö", "o").replace("ü", "u")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def tal(x):
    try:
        return int(float(str(x).replace(",", ".")))
    except ValueError:
        return 0


def hent(ark_id, fane):
    url = (f"https://docs.google.com/spreadsheets/d/{ark_id}/gviz/tq?tqx=out:csv&sheet="
           + urllib.parse.quote(fane))
    with urllib.request.urlopen(url, timeout=60) as svar:
        return [[c.strip() for c in r] for r in csv.reader(io.StringIO(svar.read().decode("utf-8")))]


def laes_kamp(rows, fane):
    hjemme, ude = [s.strip() for s in re.split(r"\s+vs[.,]\s*", fane, flags=re.I)]
    r = next((x for x in rows if "Score" in x), None)
    if not r:
        return None
    i = r.index("Score")
    hold1 = ude if len(rows) > 1 and len(rows[1]) > 2 and rows[1][2] == ude else hjemme
    hold2 = ude if hold1 == hjemme else hjemme
    g = lambda x, j: x[j] if j < len(x) else ""

    def venstre(lbl):
        x = next((y for y in rows if lbl in y), None)
        if not x:
            return ["", ""]
        j = x.index(lbl)
        return [g(x, j + 1), g(x, j + 3)]

    sc1, sc2 = g(r, i + 1), g(r, i + 3)
    score = {hold1: sc1, hold2: sc2}
    w1, w2 = venstre("Winnings")
    c0 = rows[0] if rows else []
    coach = {hold1: g(c0, 2), hold2: g(c0, 3)}
    blokke = [idx for idx, x in enumerate(rows) if "Player" in x][:2]
    spillere = {}
    felter = {"mng": 1, "td": 2, "comp": 3, "int": 4, "foul": 5, "cas": 6, "mvp": 7}
    for b, h in enumerate(blokke):
        iN = rows[h].index("Player")
        liste = []
        k = h + 1
        while k < len(rows) and re.fullmatch(r"\d+", g(rows[k], 0)):
            x = rows[k]
            k += 1
            if not g(x, iN):
                continue
            s = {"navn": g(x, iN)}
            for f, off in felter.items():
                v = g(x, iN + off)
                if f == "mng":
                    if v == "Y":
                        s["miss_next_game"] = True
                elif tal(v):
                    s[f] = tal(v)
            if len(s) > 1:  # kun spillere, der gjorde noget
                liste.append(s)
        spillere[hold1 if b == 0 else hold2] = liste
    flueben = any(re.search(r"Y$", c, re.I) for c in c0 if re.match(r"Tjekbokse", c, re.I))
    spillet = flueben or tal(sc1) > 0 or tal(sc2) > 0
    return {"hjemme": hjemme, "ude": ude, "score": f"{score[hjemme]}-{score[ude]}",
            "coach": coach, "winnings": {hold1: w1, hold2: w2}, "spillere": spillere, "spillet": spillet}


def main():
    kendte = kendte_id()
    nye = []
    for p in config():
        for fane in p["faner"]:
            id_ = "spike-" + slug(fane)
            if id_ in kendte:
                continue
            try:
                k = laes_kamp(hent(p["ark"], fane), fane)
            except Exception as e:  # en enkelt fane må ikke stoppe resten
                print(f"Advarsel: {fane}: {e}", file=sys.stderr)
                continue
            if not k or not k["spillet"]:
                continue
            k.pop("spillet")
            nye.append({"id": id_, "pulje": p["pulje"], "fane": fane,
                        "kampside": "https://bloodbowl.pages.dev/#kamp/" + urllib.parse.quote(fane), **k})
    print(json.dumps(nye, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
