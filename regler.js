// Regler og guider til Regler-siden (#regler). Kilde: kommissærens tre Google-dokumenter, sendt 6. nov. 2026.
// Ret teksten her. Hvert afsnit er { titel, intro?, punkter: [tekst eller { tekst, under: [...] }] }.
// "aaben: true" = afsnittet er foldet ud, når siden åbnes.
window.REGLER = {
  docs: {
    regler: "https://docs.google.com/document/d/1QBumZodN42znlb5cWGdYvJWtb2BcCWiYRhBB-BbTHMA/edit",
    kampark: "https://docs.google.com/document/d/1j4As2Kw4PTaHqbBRnYtG9xFWwxtfWGotFq06bocHCrs/edit",
    holdark: "https://docs.google.com/document/d/1ivF9Fy8FnjPZiZyql9jAkkNbRu1jMrwTeaUOIy5EoSI/edit",
    cheatsheet: "https://bloodbowlbase.ru/bb2025/core_rules/cheat_sheet/"
  },
  afsnit: [
    {
      titel: "Husregler",
      aaben: true,
      intro: "Ligaen bruger reglerne fra bogen. Der er kun tre undtagelser.",
      punkter: [
        { tekst: "Ekstra MVP til nye hold. Alle opstartshold får en ekstra MVP. Det giver holdudvikling og forhindrer, at de gamle hold er for langt foran, når de mødes.",
          under: [
            "Første MVP: Modstanderen udpeger 4 spillere, der har gjort det godt på det andet hold. Slå en d4 for at finde vinderen. Det anbefales, at trænerne skiftes til at vælge, til der er 4 på hvert hold.",
            "Anden MVP: Fordeles som normalt."
          ] },
        "Stalling: Slå en d8 i stedet for en d6. Det er en almindelig husregel, som blandt andet The Bonehead Podcast bruger. Den gør stalling endnu mindre attraktivt.",
        "Kick Team-mate tæller som Throw Team-mate, når en skill kræver, at spilleren har Throw Team-mate."
      ]
    },
    {
      titel: "Sådan er turneringen bygget op",
      punkter: [
        "Først spilles farvepuljerne.",
        "Derefter Regnbuepuljen. Den blandes efter, hvordan hver coach placerede sig i sin farvepulje.",
        "Til sidst kommer slutspillet med et lille twist. Se næste afsnit."
      ]
    },
    {
      titel: "Slutspillet",
      intro: "Ligaen har 13 coaches, men et godt slutspil kræver 8 eller 16. Derfor har kommissæren besluttet følgende.",
      punkter: [
        "En 14. coach er inviteret: Coach Lustrian og Southland Stegadons kommer og forsvarer titlen. De møder nr. 1 i ligaen.",
        "De 14 hold spiller knockoutkampe, og 7 vindere går videre til kvartfinalerne.",
        { tekst: "Den sidste plads i kvartfinalen går til en Lucky Loser:",
          under: [
            "Taber nr. 1 til Southland Stegadons, får nr. 1 Lucky Loser-pladsen.",
            "Ellers trækkes der lod blandt taberne. Coach Lustrian er også med.",
            "Lodderne: I ottendedelsfinalerne krydser alle af på et skema ved hver turnover: hvor mange mulige aktiveringer de havde tilbage, og hvad der forårsagede turnoveren. Det giver et antal lodder.",
            "Går kampen i overtid, tæller de to halvlege, der giver flest lodder."
          ] },
        { tekst: "Uafgjort i slutspillet afgøres som i bogen. Står det stadig lige efter overtid, er der straffesparkskonkurrence med terninger:",
          under: [
            "Hver coach vælger 5 spillere, der sparker field goal. De slår én ad gangen.",
            "Ingen spillere fra Casualty-boksen. Spillere fra KO-boksen kun, hvis de klarer et 4+. Man skal kunne stille med 5 spillere.",
            "+1 til spillere med Kick eller Kick Team-mate.",
            "+1 til én spiller på holdet med flest cheerleaders.",
            "+1 til spillere med ST 5 eller mere.",
            "−1 til spillere med Stunty, Unsteady eller Drunkard.",
            "Ingen spiller kan få mere end +1 på sit d6-slag.",
            "Spillere med fx Animal Savagery eller Bone Head skal stadig slå for at aktivere.",
            "Rerolls, der er tilbage fra 2. halvleg, må bruges."
          ] },
        "Tabernes taber: Blandt de 6 coaches, der ikke går videre til kvartfinalerne, mødes de to med færrest point i en Tabernes taber-kamp."
      ]
    },
    {
      titel: "Præmier og titler",
      punkter: [
        "Klubmester: trofæ og vandrepokal.",
        "Tabernes taber: trøstepræmie og måske en træske."
      ]
    },
    {
      titel: "Guide: Kamparket",
      guide: "kampark",
      intro: "Det her skal tastes i kamparket. Kommissærens guide har billeder af, hvor det står.",
      punkter: [
        { tekst: "Før kampen", under: [
          "Fans: Slå en d3 for hvert hold, og vælg tallet.",
          "Journeymen tastes FØR inducements. Så tæller de med i Team Value og dermed i inducements.",
          "Inducements købt fra eget treasury tastes ind. Holdet med højest TV køber først.",
          "Arket regner selv ud, hvem der køber inducements, og for hvor meget."
        ] },
        { tekst: "Under kampen", under: [
          "Tast det, jeres spillere lykkes med.",
          "Other: point fra fx Prayers to Nuffle.",
          "Foul: vellykkede fouls. De giver ikke SPP, men de er sjove at følge.",
          "SPP regnes ud automatisk. Kommer de ikke, så genindlæs siden.",
          "Casualty: Vælg det tal, I slog på d16. Så viser arket, hvad der sker.",
          "Lasting injury: Tast −1 i den rigtige kolonne. Niggling injuries regnes ud automatisk."
        ] },
        { tekst: "Efter kampen", under: [
          "Tast antallet af CAS, I har fået, som ikke er registreret.",
          "Sæt Stalling til No, medmindre I har stallet.",
          "Dedicated fans: Slå en d6, og vælg tallet. Arket regner selv ud, om I går op eller ned.",
          "Tast, hvad I har brugt på Hire/Fire/Retire og Expensive Mistakes. Tast 0, hvis I intet har brugt."
        ] },
        { tekst: "Underskriv ved at vælge Y i rullemenuerne. I bekræfter, at:", under: [
          "I er den coach, der spillede kampen.",
          "CAS modtaget er rigtigt.",
          "Scoren stemmer.",
          "I er færdige med Player Advancement.",
          "I er færdige med Hire/Fire/Retire.",
          "I har tjekket for Expensive Mistakes.",
          "I har overført beløbet under Treasury til holdarket ved at overskrive det gamle beløb."
        ] },
        "Når alt stemmer, bliver tjekboksen grøn, og stillingen opdateres."
      ]
    },
    {
      titel: "Guide: Holdarket",
      guide: "holdark",
      intro: "Sådan holder du dit holdark opdateret. Kommissærens guide har billeder.",
      punkter: [
        "Ny spiller: Find et tomt felt på din roster, vælg spilleren i rullemenuen, og giv den et navn. Træk prisen fra dit treasury.",
        "Winnings fra kampene overføres også i treasury.",
        "Miss Next Game: Begge coaches i en kamp hjælper hinanden med at huske det, hvis en casualty giver Miss Next Game. Holdets egen coach slår det fra igen, når næste kamp spilles.",
        "Skills: Skriv den nye skill i første tomme felt. Så skifter feltet farve, og spilleren skifter rank. Opdater selv, hvor mange SPP du har brugt, og hvor meget spillerens værdi stiger.",
        "Dedicated fans: Opdater dem selv efter hver kamp ud fra et d6-slag.",
        "Holdopgraderinger kan købes for guld fra dit treasury. Husk, at rerolls koster det dobbelte, efter ligaen er begyndt.",
        "Alt andet i arket passer sig selv. Ellers skriv til kommissæren."
      ]
    }
  ]
};
