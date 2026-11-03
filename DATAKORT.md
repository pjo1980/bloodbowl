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

### Puljeark – Gul `1vzKPfw-2WmsEEfPjgJPqEBeVN08ODg36qQ1GH3SXVbI`, Blå `1t-ZntRFVAy79VqMz-G6dJwhLalMWs8rHFjPDNsh3ARY`, Rød `1-AdI1rklMUmDNp9wiJWRyE6FJfqc1y2Hrp2QDVVaxLs`, Sort `1rucYUGovKDidPORuZyOO2HxyEYdG7Qg62Q0a-lX3ARc`
- Fane "Stilling <farve> Pulje", **en fane pr. kamp og pr. side** ("A vs. B" og "B vs. A") og "Holddata".
- Kampfanerne er kommissærens kampskema (pre-/post-match, score, winnings, skader pr. spiller).
  Siden læser rækken "Score" (hjemme i cellen til højre, ude to celler længere) og "Tjekbokse Y" i række 1 = coach har afsluttet.
  Fanenavnene står i `config.js` under PULJEKAMPE, fordi en browser ikke kan liste et arks faner.
- Sort pulje (4 hold) har 8 kampfaner, så hvert hold har 4 puljekampe. De 3-holds-puljer har 6 kampfaner: hvert hold møder
  de to andre to gange ("A vs. B" og "B vs. A"). **Sandsynligvis hjemme/ude, altså to forskellige kampe**, ikke én kamp pr. coach.

## Konklusion
**Ingen bro-ark nødvendigt.** Siden læser turneringsarket (stilling, puljer, program, ranglister) og hold-arket
(rosters). Kampresultater pr. kamp (score) står kun i kampfanerne i puljearkene. Version 1 kan vise stilling,
program og ranglister uden dem.

## Uklarheder (spørg Peter/kommissæren, ret ikke selv)
1. ~~Hvornår spilles Regnbuepuljen?~~ **Bekræftet af Mikkel 3. nov.:** først puljespil (Sort/Rød/Blå/Gul), derefter
   "regnbuepuljen". Hvem der møder hvem i regnbuepuljen, afgøres af puljespillet, så fanen
   "Kampprogram Regnbuepiljen" er foreløbig. Puljekampe: 26 kampe, 4 pr. hold. Regnbuepuljen: 26 kampe, 4 pr. hold, kun på tværs.
2. ~~Kampprogrammet er ikke symmetrisk~~: forkert. Alle 26 par står hos begge hold, bare i forskellige kolonner.
   "Kamp N" er holdets egen nummerering, ikke en fælles runde. Ingen oversiddere i programmet.
3. ~~To faner pr. kamp~~: to forskellige kampe (hjemme/ude). Set i data: Sages–Elmtree spillet 2-1, Elmtree–Sages ikke spillet.
4. ~~Sort pulje-arket mangler~~: modtaget 3. nov. og tilføjet.

## Andet delt materiale
- Google Doc "Bud på opbygning af liga" (`1KrB-Q-GpUalk81khfPlMBhfYGEItIMQmYy-qR1gytPo`), delt 13. okt.
  Mulig kilde til husregler på siden. Ikke læst endnu.

## Holdlister: skills fra level-up
Står på en ekstra linje under spilleren (ingen nummer, intet navn) i kolonnerne fra "Skills and Improvements".
Siden sætter dem på spilleren ovenover og viser dem med guld. Stavning vises som i arket.

## Kampskemaer: spillerstats (til kampsiden)
To spillerblokke, hver med en række der indeholder "Player". Kolonnerne efter spillernavnet står altid i rækkefølgen
Miss Next Game, TD, Completion, Interception, Foul, Casualties, MVP (Google mister nogle overskrifter, så læs efter placering).
Kolonnen to pladser efter MVP er spillerens SPP. Første blok hører til holdet i række 2 kolonne C (normalt det første hold
i fanenavnet), og det hold ejer også venstre scorecelle og venstre "Winnings". Coaches står i række 1 kolonne C og D.
Bemærk: Bedstefars–Slavers har 4 MVP'er (2 pr. hold). Siden viser, hvad skemaet siger.
