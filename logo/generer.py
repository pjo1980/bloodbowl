import math, os

OUT = os.path.dirname(os.path.abspath(__file__))
os.makedirs(OUT, exist_ok=True)

BLOOD, BLOOD_D, ORANGE, GOLD, DARK, CREAM, LEATHER, METAL = "#b3261e", "#7d1913", "#f28c28", "#e5b53a", "#1a120d", "#f3e9dc", "#8a4a22", "#d9d2c5"
FONT = "font-family=\"Bangers, Impact, sans-serif\""

def f(x): return f"{x:.1f}"

def ball(cx, cy, rx, ry, rot, spikes=8, sl=None):
    sl = sl or ry * 0.55
    parts = []
    for i in range(spikes):
        t = 2 * math.pi * i / spikes + math.pi / spikes
        px, py = rx * math.cos(t), ry * math.sin(t)
        nx, ny = math.cos(t) / rx, math.sin(t) / ry
        n = math.hypot(nx, ny); nx, ny = nx / n, ny / n
        tx, ty = -ny, nx
        w = ry * 0.28
        a = (px + tx * w, py + ty * w); b = (px - tx * w, py - ty * w); c = (px + nx * sl, py + ny * sl)
        parts.append(f'<path d="M{f(a[0])},{f(a[1])} L{f(c[0])},{f(c[1])} L{f(b[0])},{f(b[1])} Z" fill="{METAL}" stroke="{DARK}" stroke-width="2" stroke-linejoin="round"/>')
    laces = "".join(f'<line x1="{f(x)}" y1="{f(-ry*0.18)}" x2="{f(x)}" y2="{f(ry*0.18)}" stroke="{CREAM}" stroke-width="{f(ry*0.09)}" stroke-linecap="round"/>' for x in [-rx*0.3, -rx*0.1, rx*0.1, rx*0.3])
    return (f'<g transform="translate({f(cx)},{f(cy)}) rotate({rot})">' + "".join(parts) +
            f'<ellipse rx="{f(rx)}" ry="{f(ry)}" fill="{LEATHER}" stroke="{DARK}" stroke-width="3"/>'
            f'<line x1="{f(-rx*0.42)}" y1="0" x2="{f(rx*0.42)}" y2="0" stroke="{CREAM}" stroke-width="{f(ry*0.09)}" stroke-linecap="round"/>' + laces + '</g>')

def skull(cx, cy, s, fill=CREAM, eye=DARK):
    return (f'<g transform="translate({f(cx)},{f(cy)}) scale({s/20:.3f})">'
            f'<circle cx="0" cy="-3" r="10" fill="{fill}"/><rect x="-6" y="3" width="12" height="9" rx="2" fill="{fill}"/>'
            f'<circle cx="-4" cy="-3" r="3" fill="{eye}"/><circle cx="4" cy="-3" r="3" fill="{eye}"/>'
            f'<path d="M-1,2 L0,-0.5 L1,2 Z" fill="{eye}"/>'
            f'<line x1="-2" y1="8" x2="-2" y2="12" stroke="{eye}" stroke-width="1.2"/><line x1="2" y1="8" x2="2" y2="12" stroke="{eye}" stroke-width="1.2"/></g>')

def star(cx, cy, r, fill):
    pts = []
    for i in range(16):
        rr = r if i % 2 == 0 else r * 0.5
        a = math.pi * i / 8 - math.pi / 2
        pts.append(f"{f(cx + rr*math.cos(a))},{f(cy + rr*math.sin(a))}")
    return f'<polygon points="{" ".join(pts)}" fill="{fill}"/>'

def die(cx, cy, s, rot=0):
    """Isometrisk blokterning: SF på venstre side, dødningehoved på højre, POW-stjerne ovenpå."""
    k = s / 60
    top = f'<path d="M0,-60 L52,-30 L0,0 L-52,-30 Z" fill="#fbf4e8" stroke="{DARK}" stroke-width="4" stroke-linejoin="round"/>'
    left = f'<path d="M-52,-30 L0,0 L0,60 L-52,30 Z" fill="{CREAM}" stroke="{DARK}" stroke-width="4" stroke-linejoin="round"/>'
    right = f'<path d="M0,0 L52,-30 L52,30 L0,60 Z" fill="#d8cbb6" stroke="{DARK}" stroke-width="4" stroke-linejoin="round"/>'
    sf = f'<g transform="matrix(0.866,0.5,0,1,-52,-30)"><text x="30" y="45" text-anchor="middle" {FONT} font-size="38" fill="{BLOOD}" letter-spacing="1">SF</text></g>'
    sk = f'<g transform="matrix(0.866,-0.5,0,1,0,0)">{skull(30, 30, 30, DARK, "#d8cbb6")}</g>'
    sk = sk.replace(f'fill="{DARK}"/><circle', f'fill="{DARK}"/><circle', 1)
    pw = f'<g transform="matrix(0.866,0.5,-0.866,0.5,0,-60)">{star(30, 30, 20, ORANGE)}</g>'
    return f'<g transform="translate({f(cx)},{f(cy)}) rotate({rot}) scale({k:.3f})">{top}{left}{right}{sf}{sk}{pw}</g>'

def shield_path(scale=1):
    s = scale
    return f"M{f(-100*s)},{f(-105*s)} L{f(100*s)},{f(-105*s)} L{f(100*s)},{f(5*s)} Q{f(100*s)},{f(95*s)} 0,{f(140*s)} Q{f(-100*s)},{f(95*s)} {f(-100*s)},{f(5*s)} Z"

def shield(with_spikes=True):
    sp = ""
    if with_spikes:
        for x in [-75, -37, 0, 37, 75]:
            sp += f'<path d="M{x-13},-103 L{x},-138 L{x+13},-103 Z" fill="{METAL}" stroke="{DARK}" stroke-width="3" stroke-linejoin="round"/>'
    return (sp + f'<path d="{shield_path(1.0)}" fill="{DARK}"/>'
            f'<path d="{shield_path(0.94)}" fill="{BLOOD}" stroke="{GOLD}" stroke-width="5"/>'
            f'<path d="{shield_path(0.8)}" fill="none" stroke="{BLOOD_D}" stroke-width="3"/>')

def ring_text(r_top, r_bot, top, bot, size, fill, idp):
    return (f'<defs><path id="{idp}t" d="M{-r_top},0 A{r_top},{r_top} 0 0 1 {r_top},0"/>'
            f'<path id="{idp}b" d="M{-r_bot},0 A{r_bot},{r_bot} 0 0 0 {r_bot},0"/></defs>'
            f'<text {FONT} font-size="{size}" fill="{fill}" letter-spacing="2"><textPath href="#{idp}t" startOffset="50%" text-anchor="middle">{top}</textPath></text>'
            f'<text {FONT} font-size="{size}" fill="{fill}" letter-spacing="2"><textPath href="#{idp}b" startOffset="50%" text-anchor="middle">{bot}</textPath></text>')

# ---------- A: Skjoldet med blokterningen ----------
def logo_a():
    ribbon = (f'<path d="M-158,128 L158,128 L146,150 L158,172 L-158,172 L-146,150 Z" fill="{DARK}"/>'
              f'<path d="M-152,132 L152,132 L141,150 L152,168 L-152,168 L-141,150 Z" fill="{ORANGE}"/>'
              f'<text x="0" y="161" text-anchor="middle" {FONT} font-size="30" fill="{DARK}" letter-spacing="2">ODDER BLOOD BOWL</text>')
    title = (f'<text x="0" y="-150" text-anchor="middle" {FONT} font-size="44" fill="{DARK}" stroke="{DARK}" stroke-width="8" stroke-linejoin="round" letter-spacing="2">SEMPER FORTUNA</text>'
             f'<text x="0" y="-150" text-anchor="middle" {FONT} font-size="44" fill="{GOLD}" letter-spacing="2">SEMPER FORTUNA</text>')
    return f'<svg viewBox="-170 -200 340 390" xmlns="http://www.w3.org/2000/svg">{title}<g transform="translate(0,10)">{shield()}{die(0, 5, 66)}</g>{ribbon}</svg>'

def icon_a():
    return f'<svg viewBox="-115 -145 230 295" xmlns="http://www.w3.org/2000/svg">{shield()}{die(0, 0, 70)}</svg>'

# ---------- B: Laurbærkransen ----------
def laurel(r):
    leaves = []
    for side in (-1, 1):
        for i in range(9):
            a = math.radians(250 - i * 15) if side == -1 else math.radians(-70 + i * 15)
            x, y = r * math.cos(a), -r * math.sin(a)
            tang = math.degrees(math.atan2(-math.cos(a), -math.sin(a))) if side == -1 else math.degrees(math.atan2(math.cos(a), math.sin(a)))
            for off, tilt in ((-9, -28), (9, 28)):
                ox, oy = x + off * math.cos(a) * 0.9, y - off * math.sin(a) * 0.9
                leaves.append(f'<ellipse cx="{f(ox)}" cy="{f(oy)}" rx="13" ry="5.5" transform="rotate({f(tang + tilt*side)} {f(ox)} {f(oy)})" fill="{GOLD}" stroke="{DARK}" stroke-width="1.5"/>')
    return "".join(leaves)

def logo_b():
    return (f'<svg viewBox="-170 -170 340 340" xmlns="http://www.w3.org/2000/svg">'
            f'<circle r="165" fill="{DARK}"/><circle r="160" fill="{BLOOD}"/><circle r="124" fill="{DARK}" stroke="{GOLD}" stroke-width="4"/>'
            f'<circle r="157" fill="none" stroke="{GOLD}" stroke-width="3"/>'
            + ring_text(133, 151, "SEMPER FORTUNA", "ODDER BLOOD BOWL", 27, CREAM, "b") +
            f'<circle cx="-146" cy="0" r="5" fill="{GOLD}"/><circle cx="146" cy="0" r="5" fill="{GOLD}"/>'
            + laurel(95) + ball(0, 28, 46, 28, -25) +
            f'<text x="0" y="-22" text-anchor="middle" {FONT} font-size="58" fill="{CREAM}" letter-spacing="3">S·F</text></svg>')

def icon_b():
    return (f'<svg viewBox="-130 -130 260 260" xmlns="http://www.w3.org/2000/svg"><circle r="125" fill="{DARK}" stroke="{GOLD}" stroke-width="6"/>'
            + laurel(95) + ball(0, 28, 46, 28, -25) +
            f'<text x="0" y="-22" text-anchor="middle" {FONT} font-size="58" fill="{CREAM}" letter-spacing="3">S·F</text></svg>')

# ---------- C: Lykkehjulet ----------
def wheel(r):
    spikes = "".join(
        f'<path d="M{f((r+4)*math.cos(math.radians(a-6)))},{f((r+4)*math.sin(math.radians(a-6)))} L{f((r+26)*math.cos(math.radians(a)))},{f((r+26)*math.sin(math.radians(a)))} L{f((r+4)*math.cos(math.radians(a+6)))},{f((r+4)*math.sin(math.radians(a+6)))} Z" fill="{METAL}" stroke="{DARK}" stroke-width="2.5" stroke-linejoin="round"/>'
        for a in range(0, 360, 30))
    spokes = "".join(f'<line x1="0" y1="0" x2="{f(r*math.cos(math.radians(a)))}" y2="{f(r*math.sin(math.radians(a)))}" stroke="{GOLD}" stroke-width="9" stroke-linecap="round"/>' for a in range(15, 360, 45))
    return (spikes + f'<circle r="{r}" fill="{BLOOD_D}" stroke="{DARK}" stroke-width="22"/><circle r="{r}" fill="none" stroke="{GOLD}" stroke-width="12"/>' + spokes +
            "".join(f'<circle cx="{f(r*math.cos(math.radians(a)))}" cy="{f(r*math.sin(math.radians(a)))}" r="5" fill="{DARK}"/>' for a in range(15, 360, 45)))

def logo_c():
    return (f'<svg viewBox="-170 -170 340 340" xmlns="http://www.w3.org/2000/svg">'
            f'<circle r="165" fill="{DARK}"/><circle r="160" fill="#2a201b" stroke="{ORANGE}" stroke-width="4"/>'
            + ring_text(136, 152, "SEMPER FORTUNA", "ODDER BLOOD BOWL", 26, ORANGE, "c") +
            f'<g transform="rotate(-8)">{wheel(84)}</g>' + die(0, 4, 42) + '</svg>')

def icon_c():
    return f'<svg viewBox="-125 -125 250 250" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-8)">{wheel(84)}</g>{die(0, 4, 42)}</svg>'

udkast = [
    ("A", "Skjoldet med blokterningen", "Anbefalet", "Pigget skjold med en blokterning: SF på den ene side, dødningehoved på den anden og POW ovenpå. »Altid held« med en terning, der sjældent er det.", logo_a(), icon_a()),
    ("B", "Laurbærkransen", "", "Det latinske motto får et romersk segl: laurbær, en pigget bold og S·F med romerske versaler.", logo_b(), icon_b()),
    ("C", "Lykkehjulet", "", "Fortunas lykkehjul med pigge og blokterningen som nav. Det mest symbolske af de tre.", logo_c(), icon_c()),
]

cards = ""
for key, navn, tag, tekst, stor, ikon in udkast:
    cards += f'''
  <section class="kort">
    <div class="hoved"><span class="bogstav">{key}</span><h2>{navn}</h2>{f'<span class="tag">{tag}</span>' if tag else ""}</div>
    <div class="stor">{stor}</div>
    <p>{tekst}</p>
    <div class="ikoner"><div><div class="i64">{ikon}</div><span>64 px</span></div><div><div class="i32">{ikon}</div><span>32 px</span></div>
      <div class="lys"><div class="i64">{ikon}</div><span>på lys</span></div></div>
  </section>'''

html = f'''<!doctype html>
<html lang="da"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Logo-udkast</title>
<link href="https://fonts.googleapis.com/css2?family=Bangers&family=Barlow:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  body {{ margin:0; background:#14100e; color:#f3e9dc; font:16px/1.5 Barlow, system-ui, sans-serif; }}
  .wrap {{ max-width:1150px; margin:0 auto; padding:24px 16px 48px; }}
  h1 {{ font-family:Bangers, Impact, sans-serif; font-weight:400; letter-spacing:1px; font-size:44px; margin:0; }}
  .lead {{ color:#b5a291; margin:4px 0 24px; }}
  .gitter {{ display:grid; gap:18px; grid-template-columns:repeat(auto-fit, minmax(min(100%,330px),1fr)); }}
  .kort {{ background:#1f1815; border:1px solid #3b2e27; border-radius:12px; padding:18px; }}
  .hoved {{ display:flex; align-items:center; gap:10px; }}
  .bogstav {{ font-family:Bangers; font-size:26px; color:#1a120d; background:#f28c28; border-radius:8px; width:36px; text-align:center; }}
  h2 {{ font-family:Bangers; font-weight:400; letter-spacing:1px; font-size:26px; margin:0; }}
  .tag {{ margin-left:auto; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1px; background:#e5b53a; color:#1a120d; padding:2px 8px; border-radius:999px; }}
  .stor {{ padding:12px 10%; }} .stor svg {{ width:100%; height:auto; display:block; }}
  p {{ color:#b5a291; margin:0 0 14px; }}
  .ikoner {{ display:flex; gap:18px; align-items:flex-end; border-top:1px dashed #3b2e27; padding-top:12px; }}
  .ikoner > div {{ text-align:center; font-size:12px; color:#b5a291; }}
  .i64 svg {{ width:64px; height:64px; }} .i32 svg {{ width:32px; height:32px; }}
  .lys {{ background:#f3e9dc; border-radius:8px; padding:6px 8px 2px; color:#1a120d !important; }}
  .lys span {{ color:#1a120d; }}
  .note {{ color:#b5a291; font-size:14px; margin-top:24px; }}
</style></head><body><div class="wrap">
  <h1>Logo-udkast</h1>
  <p class="lead">Semper Fortuna · Odder Blood Bowl. Tre retninger. Skitser: farver, former og tekst kan justeres.</p>
  <div class="gitter">{cards}
  </div>
  <p class="note">Inspireret af Blood Bowl-stemningen, men ikke en kopi af Games Workshops officielle logo.</p>
</div></body></html>'''
open(os.path.join(OUT, "udkast.html"), "w", encoding="utf-8").write(html)
print("ok")

# ---------- Valgt logo (A, 3. nov.): gem som filer ----------
open(os.path.join(OUT, "logo.svg"), "w", encoding="utf-8").write(logo_a())
open(os.path.join(OUT, "ikon.svg"), "w", encoding="utf-8").write(icon_a())
print("logo.svg og ikon.svg gemt")
