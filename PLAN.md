# Plan og status

Status 3. november 2026: mappe og git oprettet, `index.html` og `config.js` skrevet. Resten mangler.
Næste tråd kører på Opus 5.5.

## Trin 1 – Læs kommissærens ark (først!)
Peter har links til kommissærens Google Sheets. Når de er indsat:
1. Åbn hvert ark (Drive-connector `read_file_content`, eller gviz-CSV-adressen hvis arket er offentligt).
2. Notér: fanenavne, kolonneoverskrifter, hvordan et resultat skrives (TD hjemme/ude? én celle "2-1"?),
   om der er flere sæsoner, sammenflettede celler, formler, og hvad der mangler (fx casualties, datoer).
3. Afgør: kan siden læse arket direkte, eller skal der et bro-ark til? Skriv svaret her i PLAN.md.
4. Tjek deling: er arket "Anyone with the link"? Hvis ikke, spørg Peter, om kommissæren vil dele det sådan,
   eller om vi laver et bro-ark i Peters Drive (IMPORTRANGE kræver kun, at Peter har læseadgang).

## Trin 2 – Byg siden
- `app.js`: CSV-parser (med anførselstegn og linjeskift i celler), loader (Google eller `data/`),
  mapping-lag i `config.js`, stillingsberegning, hash-routing (`#forside`, `#stilling`, `#kampe`,
  `#hold`, `#hold/<navn>`, `#nyheder`), venlige fejlbeskeder, "sidst hentet"-tid i footer.
- `style.css`: mørkt tema, responsive tabeller, fanenavigation der kan scrolle på mobil.
- `data/*.csv`: eksempeldata **med kommissærens kolonner** (kopiér et udsnit af hans ark, anonymiseret om nødvendigt).
- Forside: velkomst i kommissærens stemme, næste runde, top 3, seneste nyhed.
- Test lokalt: preview_start "bloodbowl" (port 8765), tjek mobilbredde.

## Trin 3 – Nyheder og husregler
Kommissærens ark har næppe en nyhedsfane. Forslag (vælg med Peter): en fane "Nyheder" i hans ark
(dato, overskrift, tekst), eller en simpel `nyheder.md`/CSV i repoet, som Peter sender tekst til.

## Trin 4 – Udgiv
- Spørg Peter, før repoet oprettes offentligt: `gh repo create bloodbowl --public --source . --push`,
  slå Pages til (branch main, rodmappe). Adresse bliver `https://pjo1980.github.io/bloodbowl/`.
- Skriv `GUIDE.md` (til Peter) og en kort `KOMMISSAER.md` (til kommissæren: "du gør som du plejer,
  siden opdaterer sig selv inden for ca. 5 minutter").

## Åbne spørgsmål til Peter
- Hvad hedder ligaen og kommissæren (vises på siden)?
- Må kommissæren vide, at siden findes, før den er færdig? (Han kan blive bedt om at dele arket.)
- Egen domæneadresse senere, eller er github.io fint?
