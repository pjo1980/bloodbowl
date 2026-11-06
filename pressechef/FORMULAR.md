# Pressetribunen: coaches indsender selv via Google-formular

Afløser Gunnar Grådigs Gmail, som Google lukkede 5. nov. 2026. Ingen ekstra konto, intet script.
Formularen ejes af Peters egen Google-konto. Svarene lander i et ark, og siden læser arket.
Indlæg kommer på siden med det samme (inden for få minutter). Peter eller Mikkel kan skjule et indlæg.

## Peter: sæt det op (ca. 10 min)

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
   - **Tekst**, beskrivelse (tryk ⋮ → **Description**):
     `Skriv "NAVN: tekst" for replikker. En linje i "anførselstegn" bliver mellemoverskrift. En linje i (parentes) bliver regi.`
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

## Besked til coaches (kopier og send)

> Hej coaches!
> Nu kan I selv lægge sjove ting på ligasiden: pressemeddelelser, kampreferater, interviews, rygter og lore.
> Brug knappen "✍️ Indsend til pressetribunen" på Presse-siden, eller dette link: [FORMULAR-LINK]
> Det kommer på siden med det samme. Intet login.
>
> Tips til teksten:
> - Skriv `NAVN: tekst` for at lave en replik, fx `COACH SVULST-STANK: Det var et fejt trick!`
> - En linje i "anførselstegn" bliver en mellemoverskrift.
> - En linje i (parentes) bliver regi, fx (Lang stilhed.)
> - Har I en PDF eller Word-fil, så kopier teksten ind i feltet.
>
> Hold det i ligaens ånd. Kommissæren kan skjule indlæg.
