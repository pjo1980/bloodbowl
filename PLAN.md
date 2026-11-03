# Plan og status

## Status 3. november 2026
- Trin 1 er **færdigt**: alle ark er læst og kortlagt i `DATAKORT.md`. Alle er delt offentligt.
- Konklusion: **intet bro-ark**. Siden læser turneringsarket og hold-arket direkte.
- `config.js` har ark-ID'er og fanenavne. `data/` har kopier af fanerne til test.
- Mangler: `style.css`, `app.js`, guide til Peter. Næste skridt er trin 2.

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
Ingen nyhedsfane i arkene. Forslag: en fane "Nyheder" (dato, overskrift, tekst) i turneringsarket,
eller en `nyheder.csv` i repoet, som Peter sender tekst til. Vælg med Peter.

## Trin 4 – Udgiv
- Spørg Peter, før repoet oprettes offentligt: `gh repo create bloodbowl --public --source . --push`,
  Pages fra main/rod. Adresse: `https://pjo1980.github.io/bloodbowl/`.
- `GUIDE.md` til Peter og kort `KOMMISSAER.md` ("du gør som du plejer, siden følger med inden for ca. 5 minutter").

## Senere (version 2)
- Kampresultater pr. kamp fra kampfanerne i puljearkene (faste celler, kræver omhu).

## Åbne spørgsmål til Peter
- Liganavn og kommissærens navn til siden?
- Må kommissæren vide, at siden findes, før den er færdig?
- github.io-adressen fin, eller eget domæne senere?
- Uklarhederne i data (se DATAKORT.md): hvilke kampe er spillet, kampprogrammets rækkefølge, de dobbelte kampfaner, Sort pulje-arket.
