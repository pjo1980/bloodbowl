"""Siden sidst: dagligt øjebliksbillede af kommissærens ark og listen over, hvad der er sket.

Scriptet LÆSER kun (gviz-CSV, samme adresser som siden). Det henter alle holdfaner, fanen med døde spillere,
turneringsstillingen og alle kampfaner i PULJEKAMPE, gemmer et kompakt øjebliksbillede i
vagt/snapshots/ÅÅÅÅ-MM-DD.json og sammenligner med det seneste billede fra en TIDLIGERE dag.
Forskellene bliver til hændelser i data/siden-sidst.json (nyeste først, ca. 14 dage), som forsiden viser.

Kør fra projektmappen:  python vagt/snapshot.py
Udskrift: "INGEN NYE HÆNDELSER" eller "N NYE HÆNDELSER" med en linje pr. hændelse, plus evt. FEJL-linjer.

Regler i koden:
- Første kørsel har intet at sammenligne med og giver en tom liste.
- Fejler hentningen af en fane, genbruges tallene fra forrige billede for den fane. En fejl bliver altså
  aldrig til "spilleren er forsvundet" eller "ny spiller".
- En spiller kendes på nummer + navn (alle Runts hedder "Runt").
- Køres scriptet flere gange samme dag, erstattes dagens billede og dagens hændelser (ingen dubletter).
"""
import csv, datetime, io, json, os, re, sys, time, urllib.parse, urllib.request
from collections import Counter
from concurrent.futures import ThreadPoolExecutor

sys.stdout.reconfigure(encoding="utf-8")
ROD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAPPE = os.path.join(ROD, "vagt", "snapshots")
UD = os.path.join(ROD, "data", "siden-sidst.json")
BEHOLD = 14  # antal øjebliksbilleder og antal dages hændelser
I_DAG = datetime.date.today().isoformat()

config = io.open(os.path.join(ROD, "config.js"), encoding="utf-8").read()
ARK = dict(re.findall(r'^\s*(\w+):\s*"([\w-]{30,})"', config, re.M))
fane_navn = lambda n: re.search(r'^\s*%s:\s*"([^"]+)"' % n, config, re.M).group(1)
F_STILLING, F_DOEDE = fane_navn("stilling"), fane_navn("doede")
ROSTER_FANE = dict(re.findall(r'"([^"\n]+)":\s*"([^"\n]+)"', re.search(r"ROSTER_FANE:\s*\{(.*?)\}", config, re.S).group(1)))
KAMPE = []  # (ark, fane)
for ark, blok in re.findall(r'ark:\s*"(\w+)",\s*faner:\s*\[(.*?)\]', config[config.index("PULJEKAMPE:"):], re.S):
    KAMPE += [(ark, f) for f in re.findall(r'"([^"\n]+)"', blok)]


def hent(ark, fane):
    url = f"https://docs.google.com/spreadsheets/d/{ARK[ark]}/gviz/tq?tqx=out:csv&sheet={urllib.parse.quote(fane)}"
    sidste = None
    for forsøg in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            t = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
            if t.lstrip().startswith("<"):
                raise RuntimeError("fik en webside i stedet for tal (er arket stadig delt?)")
            return [[c.strip() for c in r] for r in csv.reader(io.StringIO(t))]
        except Exception as e:  # noqa: BLE001
            sidste = e
            time.sleep(2 * (forsøg + 1))
    raise sidste


def tal(s):
    t = re.sub(r"[^\d,.\-]", "", str(s or ""))
    t = re.sub(r"\.(?=\d{3}(\D|$))", "", t).replace(",", ".", 1)
    try:
        return float(t)
    except ValueError:
        return 0.0


def celle(r, i):
    return r[i] if 0 <= i < len(r) else ""


# ---------- Læsere (samme logik som læsStilling, læsRoster og læsKamp i app.js) ----------
def læs_stilling(rows):
    h = next((i for i, r in enumerate(rows) if any(re.fullmatch("win", c, re.I) for c in r) and any(re.fullmatch("point", c, re.I) for c in r)), -1)
    if h < 0:
        raise RuntimeError("ligner ikke en stilling")
    iP = next(i for i, c in enumerate(rows[h]) if c.lower() == "point")
    hold = []
    for r in rows[h + 1:]:
        if not celle(r, 0):
            continue
        if re.match("I ALT", r[0], re.I):
            break
        hold.append([r[0], int(tal(celle(r, iP)))])
    if not hold:
        raise RuntimeError("stillingen er tom")
    return hold


def læs_roster(rows):
    h = next((i for i, r in enumerate(rows) if "Name" in r and "Position" in r), -1)
    if h < 0:
        raise RuntimeError("ligner ikke en holdliste")
    hr = rows[h]
    c = lambda n: hr.index(n) if n in hr else -1
    iNavn, iPos, iSkills, iNiveau = c("Name"), c("Position"), c("Skills and Improvements"), c("Player Level")
    iMng, iSpp, iNig = c("Miss Next Game"), c("Current SPP"), c("Niggling Injuries")
    slut = next((i for i, r in enumerate(rows) if i > h and any(x.startswith("Team Name") for x in r)), len(rows))
    # Skills fra level-up står på en ekstra linje UNDER spilleren (uden nummer og navn).
    skill_til = iNiveau if iNiveau > iSkills else iSkills + 6
    spillere, sidste = {}, None
    for r in rows[h + 1:slut]:
        if re.fullmatch(r"\d+", celle(r, 0)):
            if not celle(r, iNavn):
                sidste = None  # tom plads: ekstra linjer under den ignoreres
                continue
            sidste = {"navn": r[iNavn], "pos": celle(r, iPos), "niveau": celle(r, iNiveau), "nye": [],
                      "spp": int(tal(celle(r, iSpp))), "mng": bool(re.match("y", celle(r, iMng), re.I)), "nig": int(tal(celle(r, iNig)))}
            spillere[r[0] + "|" + r[iNavn]] = sidste
        elif not celle(r, 0) and not celle(r, iNavn) and iSkills >= 0 and sidste:
            sidste["nye"] += [x for x in r[iSkills:skill_til] if x]
    if not spillere:
        raise RuntimeError("holdlisten er tom")
    return spillere


def læs_kamp(rows, fane):
    hjemme, ude = [s.strip() for s in re.split(r"\s+vs[.,]\s*", fane, flags=re.I)]
    r = next((x for x in rows if "Score" in x), None)
    if r is None:
        raise RuntimeError("ligner ikke et kampskema")
    i = r.index("Score")
    hold1 = ude if celle(rows[1] if len(rows) > 1 else [], 2) == ude else hjemme  # holdet i skemaets venstre kolonne
    hold2 = ude if hold1 == hjemme else hjemme
    score = {hold1: celle(r, i + 1), hold2: celle(r, i + 3)}
    flueben = any(re.match("Tjekbokse", x, re.I) and re.search("Y$", x, re.I) for x in rows[0])
    men = {}
    blokke = [idx for idx, x in enumerate(rows) if "Player" in x][:2]
    for b, h in enumerate(blokke):
        hr = rows[h]
        iN = hr.index("Player")
        # Varige mén: kolonnerne "- ST", "-AG", "-PA", "-AV"; kolonnen lige før "- ST" er MA (Google mister overskriften).
        hk = lambda m: next((j for j, t in enumerate(hr) if re.fullmatch(m, t or "", re.I)), -1)
        iST = hk(r"-\s*ST")
        if iST < 0:
            continue
        kol = {"MA": iST - 1, "ST": iST, "AG": hk(r"-\s*AG"), "PA": hk(r"-\s*PA"), "AV": hk(r"-\s*AV")}
        for x in rows[h + 1:]:
            if not re.fullmatch(r"\d+", celle(x, 0)):
                break
            if not celle(x, iN):
                continue
            m = [f"−{int(abs(tal(celle(x, j))))} {stat}" for stat, j in kol.items() if j >= 0 and tal(celle(x, j)) < 0]
            if m:
                men[f"{hold1 if b == 0 else hold2}|{x[0]}|{x[iN]}"] = m
    return {"s1": score[hjemme], "s2": score[ude], "men": men,
            "spillet": bool(flueben or tal(score[hold1]) > 0 or tal(score[hold2]) > 0)}


def læs_døde(rows):
    h = next((i for i, x in enumerate(rows) if re.match("Døde spillere", celle(x, 0), re.I)), -1)
    if h < 0:
        raise RuntimeError("ligner ikke fanen med døde spillere")
    return [[x[0], celle(x, 1), celle(x, 2)] for x in rows[h + 1:] if celle(x, 0)]


# ---------- Øjebliksbillede ----------
def tag_billede(forrige):
    fejl = []

    def prøv(nøgle, gruppe, f):
        try:
            return f()
        except Exception as e:  # noqa: BLE001
            fejl.append(f"FEJL {nøgle}: {e}")
            return (forrige or {}).get(gruppe, {}).get(nøgle) if gruppe else (forrige or {}).get(nøgle)

    stilling = prøv("stilling", None, lambda: læs_stilling(hent("turnering", F_STILLING)))
    if not stilling:
        print("\n".join(fejl))
        sys.exit("Stillingen kunne ikke hentes, og der er intet tidligere billede. Intet gemt.")
    holdnavne = [h[0] for h in stilling]
    with ThreadPoolExecutor(6) as pool:
        r_hold = pool.map(lambda n: prøv(n, "hold", lambda: læs_roster(hent("hold", ROSTER_FANE.get(n, n)))), holdnavne)
        r_kamp = pool.map(lambda k: prøv(k[1], "kampe", lambda: læs_kamp(hent(k[0], k[1]), k[1])), KAMPE)
        hold = {n: v for n, v in zip(holdnavne, r_hold) if v}
        kampe = {k[1]: v for k, v in zip(KAMPE, r_kamp) if v}
    # Google sender arkets FØRSTE fane, hvis fanenavnet er forkert. To hold med præcis samme liste er derfor en fejl.
    for a in list(hold):
        for b in list(hold):
            if a < b and a in hold and b in hold and hold[a] == hold[b]:
                fejl.append(f"FEJL {a} / {b}: to hold har præcis samme holdliste (forkert fanenavn?)")
                for n in (a, b):
                    gl = (forrige or {}).get("hold", {}).get(n)
                    if gl:
                        hold[n] = gl
                    else:
                        del hold[n]
    døde = prøv("doede", None, lambda: læs_døde(hent("hold", F_DOEDE)))
    return {"dato": I_DAG, "stilling": stilling, "hold": hold, "kampe": kampe, "doede": døde, "fejl": fejl}


# ---------- Sammenligning ----------
def sammenlign(gl, ny):
    ud = []
    kamp_hold = lambda f: [s.strip() for s in re.split(r"\s+vs[.,]\s*", f, flags=re.I)]
    # Kampe: nyspillede, og nye varige mén i skemaerne
    for fane, k in ny["kampe"].items():
        g = gl["kampe"].get(fane)
        if g is None:
            continue  # ny kampfane eller fejl sidst: intet at sammenligne med
        hjemme, ude = kamp_hold(fane)
        if k["spillet"] and not g["spillet"]:
            ud.append({"type": "kamp", "fane": fane, "hjemme": hjemme, "ude": ude, "s1": k["s1"] or "0", "s2": k["s2"] or "0"})
        for nøgle, men in k["men"].items():
            h, _nr, navn = nøgle.split("|", 2)
            for m in men:
                if m not in g["men"].get(nøgle, []):
                    ud.append({"type": "men", "hold": h, "spiller": navn, "men": m, "mod": ude if h == hjemme else hjemme, "fane": fane})
    # Døde: nye rækker (talt op, så to døde med samme navn begge kommer med)
    if ny["doede"] is not None and gl.get("doede") is not None:
        for (navn, pos, h), n in (Counter(map(tuple, ny["doede"])) - Counter(map(tuple, gl["doede"]))).items():
            ud += [{"type": "doed", "hold": h, "spiller": navn, "pos": pos}] * n
    # Holdlister
    for h, spillere in ny["hold"].items():
        g = gl["hold"].get(h)
        if not g:
            continue
        for nøgle, s in spillere.items():
            p = g.get(nøgle)
            if p is None:
                # Samme nummer, position og SPP under et andet navn = spilleren har skiftet navn, ikke en ny spiller.
                nr = nøgle.split("|")[0]
                omdøbt = any(k.split("|")[0] == nr and k not in spillere and v["pos"] == s["pos"] and v["spp"] == s["spp"] and v["nye"] == s["nye"] for k, v in g.items())
                if not omdøbt:
                    ud.append({"type": "ny", "hold": h, "spiller": s["navn"], "pos": s["pos"]})
                continue
            fælles = Counter(s["nye"]) - Counter(p["nye"])
            nye = list(fælles.elements())
            niveau = s["niveau"] if s["niveau"] and s["niveau"] != p["niveau"] else ""
            if nye or niveau:
                ud.append({"type": "skill", "hold": h, "spiller": s["navn"], "pos": s["pos"], "skills": nye, "niveau": niveau})
            if s["nig"] > p["nig"]:
                ud.append({"type": "men", "hold": h, "spiller": s["navn"], "men": "Niggling Injury"})
            if s["mng"] != p["mng"]:
                ud.append({"type": "syg" if s["mng"] else "rask", "hold": h, "spiller": s["navn"]})
    # Stillingen: kun hold, der er rykket OP og har fået flere point (de andre er bare blevet skubbet ned).
    gl_plads = {n: (i + 1, p) for i, (n, p) in enumerate(gl["stilling"])}
    for i, (n, p) in enumerate(ny["stilling"]):
        if n in gl_plads and i + 1 < gl_plads[n][0] and p > gl_plads[n][1]:
            ud.append({"type": "op", "hold": n, "fra": gl_plads[n][0], "til": i + 1, "point": p})
    orden = ["kamp", "doed", "men", "syg", "skill", "ny", "rask", "op"]
    ud.sort(key=lambda e: orden.index(e["type"]))
    return [dict(e, dato=I_DAG) for e in ud]


def tekst(e):  # kun til udskriften; siden skriver sine egne sætninger
    return " · ".join(str(v) for k, v in e.items() if k not in ("dato", "fane") and v not in ("", []))


def main():
    os.makedirs(MAPPE, exist_ok=True)
    filer = sorted(f for f in os.listdir(MAPPE) if re.fullmatch(r"\d{4}-\d{2}-\d{2}\.json", f))
    ældre = [f for f in filer if f[:10] < I_DAG]
    forrige = json.load(io.open(os.path.join(MAPPE, ældre[-1]), encoding="utf-8")) if ældre else None

    ny = tag_billede(forrige)
    json.dump(ny, io.open(os.path.join(MAPPE, I_DAG + ".json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    for f in sorted(set(filer) | {I_DAG + ".json"})[:-BEHOLD]:
        os.remove(os.path.join(MAPPE, f))

    nye = sammenlign(forrige, ny) if forrige else []
    gamle = json.load(io.open(UD, encoding="utf-8")).get("haendelser", []) if os.path.exists(UD) else []
    grænse = (datetime.date.today() - datetime.timedelta(days=BEHOLD)).isoformat()
    alle = nye + [e for e in gamle if grænse <= e.get("dato", "") < I_DAG]
    indhold = json.dumps({"haendelser": alle}, ensure_ascii=False, indent=0)
    if not os.path.exists(UD) or io.open(UD, encoding="utf-8").read() != indhold:
        io.open(UD, "w", encoding="utf-8", newline="\n").write(indhold)

    print("\n".join(ny["fejl"] + ([f"{len(nye)} NYE HÆNDELSER"] + [tekst(e) for e in nye] if nye else
                                  ["INGEN NYE HÆNDELSER" + ("" if forrige else " (første kørsel: intet at sammenligne med)")])))


main()
