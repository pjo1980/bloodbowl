"""Vagt på kommissærens ark: er der kommet faner, som siden ikke kender?

Siden kan ikke selv liste et arks faner, så kampfaner står skrevet i config.js (PULJEKAMPE).
Dette script henter fanenavnene fra alle ark og sammenligner med config.js og vagt/kendte_faner.json.

Kør fra projektmappen:  python vagt/tjek_faner.py          (kun tjek)
                        python vagt/tjek_faner.py --gem    (gem de nuværende faner som kendte)
Udskrift: "INGEN ÆNDRINGER" eller en liste med NY KAMPFANE / MANGLER / NY FANE / FORSVUNDET.
"""
import io, json, os, re, sys, urllib.request

sys.stdout.reconfigure(encoding="utf-8")
ROD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KENDTE = os.path.join(ROD, "vagt", "kendte_faner.json")
config = io.open(os.path.join(ROD, "config.js"), encoding="utf-8").read()

# Ark-ID'er og puljekampe læses fra config.js, så der kun er ét sted at rette.
ark = dict(re.findall(r'^\s*(\w+):\s*"([\w-]{30,})"', config, re.M))
i_config = set(re.findall(r'"([^"\n]+\svs[.,]\s[^"\n]+)"', config[config.index("PULJEKAMPE:"):]))
er_kamp = lambda n: re.search(r"\svs[.,]\s", n) is not None


def faner(ark_id):
    req = urllib.request.Request(f"https://docs.google.com/spreadsheets/d/{ark_id}/htmlview", headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
    navne = re.findall(r'items\.push\(\{name: "(.*?)", pageUrl:', html)
    if not navne:
        raise RuntimeError("ingen faner fundet (er arket stadig delt offentligt?)")
    return [json.loads('"' + n + '"') for n in navne]


nu, fejl = {}, []
for navn, ark_id in ark.items():
    if navn == "presse":  # svar-arket fra formularen er ikke kommissærens
        continue
    try:
        nu[navn] = faner(ark_id)
    except Exception as e:  # noqa: BLE001
        fejl.append(f"FEJL {navn}: {e}")

if "--gem" in sys.argv:
    json.dump({k: [n for n in v if not er_kamp(n)] for k, v in nu.items()}, io.open(KENDTE, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("Gemt:", KENDTE)
    sys.exit(0)

kendte = json.load(io.open(KENDTE, encoding="utf-8")) if os.path.exists(KENDTE) else {}
ud = list(fejl)
set_nu = set()
for navn, liste in nu.items():
    for f in liste:
        if er_kamp(f):
            set_nu.add(f)
            if f not in i_config:
                ud.append(f'NY KAMPFANE i arket "{navn}": {f}')
        elif f not in kendte.get(navn, []):
            ud.append(f'NY FANE i arket "{navn}": {f}')
    for f in kendte.get(navn, []):
        if f not in liste:
            ud.append(f'FORSVUNDET fra arket "{navn}": {f}')
if not fejl:
    for f in sorted(i_config - set_nu):
        ud.append(f"MANGLER i arkene, men står i config.js: {f}")

print("\n".join(ud) if ud else "INGEN ÆNDRINGER")
