> **Forældet 6. nov. 2026:** Google lukkede Gunnars Gmail. Brug i stedet `FORMULAR.md` (Google-formular).

# Pressechefens indbakke – guide til Peter

Coaches sender en mail til pressechef Gunnar Grådig. Et lille script i Google lægger mailen i et ark.
Når du eller Mikkel skriver **Ja**, kommer indlægget på hjemmesiden inden for få minutter.
Ingen server, intet på Vagten. Det tager cirka 15 minutter at sætte op én gang.

Menunavne står på engelsk, som på din pc.

---

## Trin 1 – Opret Gunnars Gmail (5 min)
1. Åbn et privat browservindue, og gå til **accounts.google.com/signup**.
2. Fornavn **Gunnar**, efternavn **Grådig**.
3. Vælg en adresse, fx `gunnar.gradig.presse@gmail.com` (tag en anden, hvis den er optaget).
4. Brug en stærk adgangskode, og gem den i din adgangskodemanager.
5. Bliv logget ind som Gunnar i resten af guiden.

## Trin 2 – Opret arket (1 min)
1. Gå til **sheets.new** (mens du er logget ind som Gunnar).
2. Klik på "Untitled spreadsheet" øverst, og kald arket **Pressechefens indbakke**.

## Trin 3 – Sæt scriptet ind (5 min)
1. I arket: **Extensions → Apps Script**.
2. Slet alt i kodevinduet, og indsæt hele indholdet af filen `pressechef/Kode.gs`.
3. Klik på **Untitled project** øverst, og kald det **Pressechef**.
4. I venstre side: klik **+** ud for **Services**, vælg **Drive API**, og klik **Add**.
   **Virker + ikke** (sker i private vinduer): klik på tandhjulet **Project Settings** → sæt flueben i
   **Show "appsscript.json" manifest file in editor** → åbn **appsscript.json** under Files → erstat indholdet
   med filen `pressechef/appsscript.json` → gem. Så står **Drive** under Services.
5. Klik på disketten (**Save project**).

## Trin 4 – Start det (3 min)
1. Vælg funktionen **opsaet** i listen øverst (ved siden af **Debug**), og klik **Run**.
2. Google spørger om tilladelse: **Review permissions** → vælg Gunnars konto.
3. Der står "Google hasn't verified this app". Det er normalt, for det er dit eget script:
   klik **Advanced** → **Go to Pressechef (unsafe)** → **Allow**.
4. Gå tilbage til arket. Der er nu fanerne **Coaches**, **Indbakke** og **Info**.
5. Åbn fanen **Info**, og **send ID'et i celle B2 til Claude**. Så kobler jeg siden på.

## Trin 5 – Coaches (tilmelder sig selv)
**Coaches tilmelder sig selv:** første gang de skriver, sætter de holdnavnet i emnefeltet (fx "Gluttons klar til sæsonen").
Scriptet genkender holdet (også med små stavefejl) og skriver coachen i fanen **Coaches** automatisk.
Du kan også skrive coaches ind selv: mailadresse i kolonne A og holdnavn i kolonne B.
Holdnavnet skal stå **præcis** sådan (kopiér herfra):

```
The Eternal Sages
Elmtree Evaders
The Maurading Ocras
Mörkley Crüe
Fright Night Fumblers
The Full Moon Foulers
The FumbleBoyz
GutBuster Gluttons
Return Of The Living Deadbeats
Da Demolitionaz
Black Mountain Slavers
Bedstefars Besudlere
Bros Being Bros
```

En coach med flere mailadresser kan stå på flere rækker.

## Trin 6 – Giv dig selv og Mikkel adgang (2 min)
1. I arket: **Share** (øverst til højre).
2. Tilføj **din egen** Google-konto og **Mikkels**, og vælg **Editor**.
3. **Del ikke arket offentligt.** Det indeholder coachernes mailadresser.
   (Det offentlige ark "Pressechefens udgivelser" er lavet af scriptet og indeholder ingen mailadresser.)

**Adgang til selve mailen (valgfrit):** I Gmail som Gunnar: tandhjulet → **See all settings** → **Accounts** →
**Grant access to your account** → **Add another account** → skriv din egen Gmail. Det virker til almindelige Gmail-konti.
Mikkels skolekonto kan sandsynligvis ikke få adgang på den måde, men han behøver kun arket for at godkende.

---

## Sådan styrer I indlæggene
Indlæg fra kendte coaches kommer **automatisk** på siden (Godkendt = Ja), inden for ca. 10 minutter.
1. Åbn arket **Pressechefens indbakke** → fanen **Indbakke**.
2. **Tag et indlæg af siden:** skriv **Nej** i kolonnen **Godkendt**.
3. **Er kolonnen Hold tom**, kender scriptet ikke afsenderen (holdnavnet stod ikke i emnet). Skriv holdnavnet og **Ja**, så kommer det på.
4. Du kan rette overskrift og tekst direkte i arket. Siden følger med.

---

## Besked til coaches (kopiér og send)

```text
Pressechef Gunnar Grådig modtager nu pressemeddelelser, interviews og pressekonferencer på:
gunnar.gradig.presse@gmail.com   ← (ret til den rigtige adresse)

Sådan gør du:
• Første gang: skriv dit holdnavn i emnefeltet, fx "Gluttons: klar til sæsonen". Så husker Gunnar dig.
  Bagefter kan emnet være hvad som helst, bare du skriver fra samme mailadresse.
• Emnefeltet bliver overskriften.
• Skriv teksten i mailen, eller vedhæft et Word-dokument.
• Interview eller pressekonference? Skriv hver replik på sin egen linje som NAVN: tekst
  Fx  OTTO: Vi slår dem.
• En mellemoverskrift skriver du i anførselstegn på sin egen linje, fx "Vores taktik er enkel".
• Én pressemeddelelse pr. mail.

Gunnar læser alt (han er 100 % neutral), og indlægget kommer på siden inden for ca. 10 minutter.
```
