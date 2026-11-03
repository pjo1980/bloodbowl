# Datakort: kommissærens Google Sheets

Kortlagt 3. november 2026. Alle ark er delt offentligt ("Anyone with the link"), så siden kan læse dem direkte.
Hent en fane som CSV: `https://docs.google.com/spreadsheets/d/<ID>/gviz/tq?tqx=out:csv&sheet=<fanenavn, URL-kodet>`
(`/export?format=csv` giver 307-omdirigering; gviz med fanenavn virker uden login.)

## Turneringen
Puljeturnering, 13 hold, 4 puljer (Sort 4 hold, Rød 3, Gul 3, Blå 3). Point: **30 for sejr, 10 for uafgjort,
1 point pr. CAS og pr. TD**. Kommissæren beregner selv stillingen i arket. Siden skal **vise** hans tal, ikke regne dem om.

## Ark og faner

### Turneringsstilling (hovedkilden) – `1sYVF9bm5XaG8sHLOOU8SGHGvMKqWEBPfR9ZL46oudtA`
| Fane | Indhold | Brug på siden |
|---|---|---|
| Turneringsstilling | Kolonne A–E: hold, WIN, DRAW, LOST, POINT, sorteret. G–K: samme i fast rækkefølge. Sidste række "I ALT". Række 1's første celle er en lang titel. | Stilling (brug A–E, drop "I ALT") |
| Sort Pulje / Rød pulje / Blå pulje / Gul pulje | Som ovenfor + "Kampe Spillet". "I ALT"-rækken har % spillet i sidste kolonne. | Puljestilling + fremdrift |
| Kampprogram Regnbuepiljen | 2 titelrækker, så HOLD, KAMP 1–4. Puljenavne som mellemrækker ("SORT PULJE"). "—" = oversidder. | Kampprogram |
| Holdranglister | Blokke side om side, adskilt af tom kolonne: TOUCHDOWNS, COMPLETIONS, INTERCEPTIONS … (hold + tal). | Topliste hold |
| Spiller ranglister | Blokke: NR., Spiller, tal for TD, COMP, INT, FOULS, CAS, MVP. **Intet holdnavn.** | Topliste spillere |
| Data Spillerranglister / Data Holdranglister | Rå hjælpedata bag ranglisterne. | Ikke brugt endnu |

### Hold og data – `1wqXQfoZ2DZdCUSWBF0o1tgtiycztq8NuJ2f_nUif46o`
- **En fane pr. hold** (13 stk., fanenavn = holdnavn, dog "Living Deadbeats" for "Return Of The Living Deadbeats"
  og stavning "The Maurading Ocras"). Række 1 = overskrifter (Name, Position, MA, ST, AG, PA, AV, Skills,
  Player Level, Miss Next Game, TD, Comp, Int, Foul, Cas, MVP, SPP, Purchase Cost, Niggling, Current Team Value).
  Række 2–17 = spillerplads 1–16 (tomme pladser har tomt navn). Derunder holdinfo (Re-Rolls, Dedicated Fans,
  Assistant Coaches …) i faste celler; Team Name/Coach/Race ser tomme ud i CSV (sandsynligvis sammenflettede celler).
- **Holdstats ud**: spiller-tal (A–H) og holdtal (J–S: TD, Comp, Int, Foul, Cas, TV increase, CAS balance, gns.).
- **TeamData**: officielle holdtyper med positioner, priser og skills (opslagsdata, ikke ligadata).
- Øvrige faner (HOW TO USE, Master, Passing Calculator, Injury Tables …) er værktøjer. Ignorér.

### Puljeark – Gul `1vzKPfw-2WmsEEfPjgJPqEBeVN08ODg36qQ1GH3SXVbI`, Blå `1t-ZntRFVAy79VqMz-G6dJwhLalMWs8rHFjPDNsh3ARY`, Rød `1-AdI1rklMUmDNp9wiJWRyE6FJfqc1y2Hrp2QDVVaxLs`
- Fane "Stilling <farve> Pulje", **en fane pr. kamp og pr. side** ("A vs. B" og "B vs. A") og "Holddata".
- Kampfanerne er kommissærens kampskema (pre-/post-match, score, winnings, skader pr. spiller).
  Layout med faste celler, fx score i række 4 kolonne G og I. Rodet, men læsbart, hvis vi får brug for kampresultater.
- **Sort pulje har intet puljeark i de links, Peter sendte.**

## Konklusion
**Ingen bro-ark nødvendigt.** Siden læser turneringsarket (stilling, puljer, program, ranglister) og hold-arket
(rosters). Kampresultater pr. kamp (score) står kun i kampfanerne i puljearkene. Version 1 kan vise stilling,
program og ranglister uden dem.

## Uklarheder (spørg Peter/kommissæren, ret ikke selv)
1. **Hvilke kampe er spillet?** De spillede kampe (Sages–Elmtree, Slavers–Besudlere) er puljekampe, men
   Kampprogram Regnbuepilen parrer hold på tværs af puljer. Er programmet en senere fase?
2. **Kampprogrammet er ikke symmetrisk:** The Eternal Sages har Black Mountain Slavers som kamp 1, men
   Black Mountain Slavers har Fright Night Fumblers som kamp 1. "Kamp N" er altså ikke en fælles runde.
3. Hvorfor har hver kamp to faner ("A vs. B" og "B vs. A")? Udfylder hver coach sin egen?
4. Findes der et Sort pulje-ark?
