# Plan og status

## Status 3. november 2026
- Trin 1 er **færdigt**: alle ark er læst og kortlagt i `DATAKORT.md`. Alle er delt offentligt.
- Konklusion: **intet bro-ark**. Siden læser turneringsarket og hold-arket direkte.
- `config.js` har ark-ID'er og fanenavne. `data/` har kopier af fanerne til test.
- Trin 2 (version 1) er **bygget og testet lokalt** samme aften med rigtige data: alle seks faner,
  alle 13 holdlister, mobilbredde uden vandret scroll.
- **Udgivet 3. november 2026** på https://pjo1980.github.io/bloodbowl/ (repo pjo1980/bloodbowl, offentligt, Pages fra main/rod).
  Ændringer udgives ved at committe og pushe til main.
- Navn: Semper Fortuna Blood Bowl Liga (foreløbigt). Kommissær: Mikkel Steen.

## Trin 2 – Byg siden (version 1)
- `app.js`: CSV-parser (anførselstegn, kommaer i tal som "12,50%"), loader (gviz eller `data/`),
  små "læsere" pr. fane der tåler titelrækker, "I ALT"-rækker, mellemrækker og tomme spillerpladser.
- Faner på siden:
  - **Forside**: velkomst i kommissærens stemme, top 3, fremdrift pr. pulje ("Kampe spillet"), seneste nyhed.
  - **Stilling**: samlet stilling + de fire puljer.
  - **Kampe**: kampprogrammet (vis som det står i arket, se uklarhed 1–2 i DATAKORT.md).
  - **Hold**: liste over 13 hold med holdtal fra "Holdstats ud"; klik → roster fra hold-arket.
  - **Ranglister**: top 5 hold og spillere pr. kategori (TD, Comp, Int, Fouls, CAS, MVP).
  - **Nyheder**: se trin 3.
- "Sidst hentet"-tid i footer. Venlige danske fejlbeskeder.
- Test: preview_start "bloodbowl" (port 8765), også i mobilbredde.

## Trin 3 – Nyheder og husregler
Bygget 3. nov.: siden læser en valgfri fane "Nyheder" i turneringsarket (Dato | Overskrift | Tekst).
Venter på, at Mikkel opretter fanen. Peter har fået en besked at sende ham. Indtil da vises kun velkomstnyheden.

## Trin 4 – Udgiv
- Repo og Pages er oprettet (se status).
- `GUIDE.md` til Peter og kort `KOMMISSAER.md` ("du gør som du plejer, siden følger med inden for ca. 5 minutter").

## Gjort 3. nov. (version 2)
- Holdliste-fejl rettet (4 hold viste kun 1 spiller). Skills fra level-up vises.
- Kampe delt op: **Puljekampe** (resultater fra kampskemaerne) og **Regnbuepuljen** (foreløbigt program).

## Bestillinger fra Mikkel (4. nov.)
- [x] Nyt klubblogo på forsiden + delebillede (se "Nyt logo").
- [x] Fane **Off pitch training** (#traening) med BB School of Block (bbsob.net) og The Bonehead Podcast. Links i `config.js` (TRAENING).
  "Bonehead" er tolket som The Bonehead Podcast. Bekræft med Mikkel.
- [x] 12 holdplakater lagt op 4. nov. (`plakater/`, data i `presse.js` → PLAKATER med slogans). Vises på holdliste, holdside og forsiden.
- [x] Fright Night Fumblers (Beasties Goblin-hold) fik sin plakat 4. nov. Alle 13 hold har nu plakat.
  Plakatnavne der afviger fra arket: "The Marauding Ocras" (arket: Maurading), "FumbleBoyz OWA" (arket: The FumbleBoyz).
- [x] **Pressechef-mail** (valgt af Peter 4. nov.): Gmail til Gunnar Grådig + Google Apps Script (`pressechef/Kode.gs`).
  Mails → arket "Pressechefens indbakke" (privat, Peter + Mikkel) → "Ja" i Godkendt → offentligt ark "Pressechefens udgivelser" → siden.
  **Sat op 4. nov.:** Gmail gunnar.gradig.presse@gmail.com, script kører, offentligt ark-ID i config.js → ARK.presse.
  Mangler (Peter): coaches i fanen Coaches, del arket med Mikkel, send coach-beskeden fra guiden.
- [x] Spike!-interview med Raelth (The Eternal Sages), indsendt af holdets coach, lagt op 4. nov. Original i `lore/`.
  Presse-siden understøtter nu interviews: `afsnit` (mellemoverskrift), svar med flere afsnit (
), `coach`, `indsendt`.

## Kampsider (bygget 3. nov.)
Tryk på et resultat under Puljekampe: score, coaches, winnings, spillerstats og et automatisk referat (kun fakta fra skemaet)
+ en markeret kommentar fra pressechefen. Idé senere: coaches kan skrive deres eget referat via formularen.

## Humor (bygget 3. nov., version 3)
Sponsorbjælke under menuen (skifter hvert 12. sek.), "Fra pressetribunen" på forsiden (Spike!, Star Player-citat,
pressechefen), pressechefen på Stilling og Puljekampe, Spike!-banner på GutBuster Gluttons' holdside, citat på Ranglister,
satire-note i bunden. Pressechefen hedder Gunnar Grådig (godkendt af Peter 3. nov.).

## Idéer og ønsker (Peters ønsker 3. nov.)
- **Blood Bowl-humor rundt omkring:** sponsorer fra Blood Bowl-universet, "citater" fra kendte Star Players.
  Skriv selv originale gags i Blood Bowl-stil; kopiér ikke tekst fra Games Workshops bøger.
- **Peters hold er GutBuster Gluttons (Ogres, Blå pulje), og pressen elsker dem.** Fx Spike! Magazine
  der hylder dem, overskrifter, "eksklusive interviews". En kærlig running gag; de andre hold må gerne få lidt
  medieopmærksomhed også, så det ikke bliver ondt.
- **Stående joke: ligaens pressechef er (ikke så hemmeligt) GutBuster Gluttons-fan.** En opdigtet figur (ikke en rigtig
  person), der skriver pressemeddelelser, kommentarer og "objektive" analyser, som altid ender med at hylde Gluttons.
  Navn: Gunnar Grådig (godkendt). Holdes adskilt fra kommissæren, hvis ord altid er Mikkels egne.
- **Kommissærens ord:** kun hans egne ord (fx fra Nyheder-fanen eller en fane/kolonne han selv skriver i). Opdigt aldrig citater fra Mikkel.
- **Coaches indsender lore, interviews og især pressekonferencer** for deres hold (Peters idé 3. nov.).
  Forslag: en Google Formular (hold, type, overskrift, tekst) der skriver i et ark, som siden læser.
  Indsendt tekst vises først, når Peter eller Mikkel har sat "Godkendt" i arket. Vises på holdsiden og som pressekonference på forsiden.
  **Gjort 3. nov.:** Peters lorepakke ligger i `lore/gutbuster-gluttons.md` (kopi i Google Drive: My Drive/Blood Bowl).
  Første pressekonference + "Om holdet" er bygget ud fra den (`presse.js`, side #presse). Formular til coaches mangler stadig.
- **Mere statistik** på sigt fra ligaens egne spillere (fx flest SPP, flest skader, MVP-konge, "mest farlige fouler").
- Evt. "Seneste resultater" på forsiden (kræver at forsiden henter kampskemaerne, 26 små hentninger).

## Åbne spørgsmål til Peter
- Må kommissæren vide, at siden findes, før den er færdig?
- Eget domæne senere, eller er github.io fint?
- Uklarhederne i data (se DATAKORT.md): hvad kampprogrammet er i forhold til puljekampene, og kampprogrammets rækkefølge.

## Stil for pressekonferencer (Peters feedback 3. nov.)
- Gnoblarer taler ikke. De kan nævnes, men har ingen replikker. De er som Doozers i Fraggle Rock: usynlige, indtil de mangler.
- "Family Isn't Food" og "Runts' Union" er ikke officielle. Brug dem ikke.
- Hold dem omkring 40 korte replikker.
- Korte, tætte replikker. Meget få eller ingen beskrivelser af omgivelser og handlinger.
- Passer til sæsonens fase (fx pre-season: forberedelser, nyindkøb, mål, odds).
- Replikker, der nævner tal (point, spillere, kasse), skal passe med Mikkels ark.

## Nyt logo (4. nov.)
Klubbens officielle logo "Odder Brætspilsklub Semper Fortuna – Blood Bowl Liga" (fra Peter): `logo/semper-fortuna.jpg`.
Vises øverst på forsiden. `logo/delebillede.jpg` (1200x630) er forhåndsbillede i Messenger/Facebook (og:image).
Skjoldet (nedenfor) bruges stadig som lille ikon i toppen og i browserfanen, fordi det nye logo ikke kan læses i lille størrelse.

## Logo (idéer 3. nov.)
Klubben hedder Semper Fortuna og ligger i **Odder**. Logoet skal kombinere SF/Semper Fortuna, Blood Bowl-stemning og "ODDER BLOOD BOWL".
**Valgt 3. nov.: A, skjoldet med blokterningen.** Filer: `logo/logo.svg` (stor), `logo/ikon.svg` (top og browserfane).
Tegnes af `logo/generer.py`; ret der og kør `python logo/generer.py`, og kopiér derefter ikonet ind i index.html (header) og
`<template id="logo-stor">`. Udkast til sammenligning: `logo/udkast.html`.
Andre idéer: laurbærkrans med S·F (latinsk/romersk), lykkehjul. Kopiér ikke Games Workshops officielle Blood Bowl-logo.
