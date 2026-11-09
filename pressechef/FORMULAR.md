# Pressetribunen: coaches indsender selv via Google-formular

Afløser Gunnar Grådigs Gmail, som Google lukkede 5. nov. 2026. Ingen ekstra konto, intet script.
Formularen ejes af Peters egen Google-konto. Svarene lander i et ark, og siden læser arket.
Indlæg kommer på siden med det samme (inden for få minutter). Peter eller Mikkel kan skjule et indlæg.

## Hurtig vej: lad et script bygge det (ca. 3 min)

1. Gå til **script.google.com** med din egen Google-konto, og tryk **New project**.
2. Slet den kode, der står der, og indsæt hele `pressechef/OpretFormular.gs`.
3. Tryk **Run** (▶). Google spørger om lov: **Review permissions** → vælg din konto →
   **Advanced** → **Go to Untitled project (unsafe)** → **Allow**. (Det er dit eget script.)
4. Vent til loggen nederst siger "Færdig!". Kopier linjerne **ARK:** og **FORMULAR:**, og send dem til Claude.
5. Del arket med Mikkel som **Editor**, så han kan skjule indlæg (åbn ARK-linket → **Share**).

## Manuel vej: byg formularen selv (ca. 10 min)

1. Gå til **forms.google.com** med din egen Google-konto, og vælg **Blank form**.
2. Titel: `Semper Fortuna – Pressetribunen`.
   Beskrivelse: `Indsend sjove pressemeddelelser, kampreferater, interviews og rygter. Det kommer på ligasiden med det samme.`
3. Lav de fem spørgsmål. Titlerne skal staves præcis sådan, for siden finder kolonnerne på navnet:

   | Spørgsmål (titel) | Type | Påkrævet |
   |---|---|---|
   | `Hold` | Dropdown | Ja |
   | `Type` | Multiple choice | Ja |
   | `Overskrift` | Short answer | Ja |
   | `Tekst` | Paragraph | Ja |
   | `Dit navn` | Short answer | Nej |

   - **Hold**, valgmuligheder (kopier hele listen ind, én pr. linje):
     ```
     Bedstefars Besudlere
     Black Mountain Slavers
     Bros Being Bros
     Da Demolitionaz
     Elmtree Evaders
     Fright Night Fumblers
     GutBuster Gluttons
     Mörkley Crüe
     Return Of The Living Deadbeats
     The Eternal Sages
     The FumbleBoyz
     The Full Moon Foulers
     The Maurading Ocras
     ```
   - **Type**, valgmuligheder: `Pressemeddelelse`, `Kampreferat`, `Interview`, `Rygte`, `Lore`.
   - **Tekst**, beskrivelse (tryk ⋮ → **Description**): `Sæt bare teksten ind. Vi sætter den pænt op.`
   - **Dit navn**, beskrivelse: `Coachens eller figurens navn, fx Coach Svulst-Stank.`
4. **Settings → Responses**: sæt **Collect email addresses** til **Do not collect**.
   Slå **Limit to 1 response** FRA. (Ellers skal coaches logge ind med Google.)
5. Fanen **Responses → Link to Sheets → Create a new spreadsheet**.
6. I det nye ark: skriv `Skjul` i den første tomme kolonne i række 1 (lige efter "Dit navn").
7. Tryk **Share** i arket:
   - **General access → Anyone with the link → Viewer**.
   - Tilføj Mikkel som **Editor**, så han kan skjule indlæg.
8. Send Claude to links: arkets adresse og formularens link (**Send → 🔗 → Shorten URL → Copy**).
   Claude sætter dem ind i `config.js` (ARK.presse og PRESSE_FORMULAR). Så kommer knappen
   "✍️ Indsend til pressetribunen" på Presse-siden.

**Skjul et indlæg:** skriv `x` i kolonnen Skjul ud for rækken. Det forsvinder fra siden inden for få minutter.
**Vigtigt:** slå aldrig "Collect email addresses" til. Arket er offentligt, så mailadresserne ville kunne ses.

## Billedupload (tilføjet 9. nov. 2026, ca. 5 min)

Google kan ikke lægge et upload-spørgsmål ind via script, så det gøres i hånden én gang:

1. Åbn formularen på **forms.google.com** → tryk **+** (Add question).
2. Titel: `Billede` (præcis sådan). Type: **File upload** → **Continue**.
   Slå **Allow only specific file types** til → **Image**. **Maximum number of files**: 1. **Maximum file size**: 10 MB.
   Påkrævet: **Nej**. Beskrivelse: `Valgfrit. Fx et AI-billede til indlægget.`
3. Gå til **script.google.com**, åbn projektet fra før (eller lav et nyt med hele `OpretFormular.gs`),
   vælg funktionen **opsaetBilleddeling** i menuen øverst, og tryk **Run**. Giv lov, som første gang.
   Nu deles hvert uploadet billede automatisk med "alle med linket", så siden kan vise det.

**Pris for det:** Google kræver, at man er logget ind med en Google-konto for at bruge en formular
med upload. Coaches uden Google-konto kan sende billedet til Peter i stedet.
Billederne ligger i dit Drev i mappen "Semper Fortuna – Pressetribunen (File responses)".
Siden viser billedet med det samme; den daglige pressechef-opgave gemmer en kopi i `forsider/`.

## Besked til coaches (kopier og send)

> Hej coaches!
> Nu kan I selv lægge sjove ting på ligasiden: kampreferater, interviews, rygter og pressemeddelelser.
>
> 1. Tryk på "✍️ Indsend til pressetribunen" på Presse-siden (eller her: [FORMULAR-LINK]).
> 2. Vælg jeres hold, og skriv en overskrift.
> 3. Sæt teksten ind, vedhæft gerne et billede (fx lavet med AI), og tryk Send.
>
> I skal være logget ind med Google. Det kommer på siden af sig selv.
> Har I skrevet det med ChatGPT eller lignende, så kopier bare teksten fra chatten ind.
> Har I kun en PDF eller Word-fil, så send den til Peter.
