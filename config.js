// Indstillinger for Kommissærens Kontor.
// Ark-ID'er er det lange stykke mellem /d/ og /edit i Google Sheet-adressen.
// Alle ark skal være delt "Anyone with the link" -> "Viewer" (det er de pr. 3. nov. 2026).
// Se DATAKORT.md for hvad der ligger i hvilken fane.
//
// BRUG_LOKALE_DATA: true = siden bruger eksempelfilerne i data/ (til test uden net).
window.CONFIG = {
  LIGA: "Semper Fortuna Blood Bowl Liga",  // navn indtil videre
  KOMMISSAER: "Mikkel Steen",
  BRUG_LOKALE_DATA: false,
  // Link til Google-formularen, hvor coaches indsender presse (vises som knap på Presse-siden). Tomt = ingen knap.
  PRESSE_FORMULAR: "",
  ARK: {
    turnering: "1sYVF9bm5XaG8sHLOOU8SGHGvMKqWEBPfR9ZL46oudtA",
    hold:      "1wqXQfoZ2DZdCUSWBF0o1tgtiycztq8NuJ2f_nUif46o",
    puljeGul:  "1vzKPfw-2WmsEEfPjgJPqEBeVN08ODg36qQ1GH3SXVbI",
    puljeBlaa: "1t-ZntRFVAy79VqMz-G6dJwhLalMWs8rHFjPDNsh3ARY",
    puljeRoed: "1-AdI1rklMUmDNp9wiJWRyE6FJfqc1y2Hrp2QDVVaxLs",
    puljeSort: "1rucYUGovKDidPORuZyOO2HxyEYdG7Qg62Q0a-lX3ARc",
    // Svar-arket fra coachernes Google-formular (se pressechef/FORMULAR.md). Tomt = slået fra.
    // (Gunnars gamle Gmail-ark 1ygdWehk… døde, da Google lukkede kontoen 5. nov.)
    presse: ""
  },
  FANER: {
    stilling: "Turneringsstilling",
    puljer: ["Sort Pulje", "Rød pulje", "Blå pulje", "Gul pulje"],
    program: "Kampprogram Regnbuepiljen",
    holdrang: "Holdranglister",
    spillerrang: "Spiller ranglister",
    holdstats: "Holdstats ud",
    nyheder: "Nyheder",         // valgfri fane i turneringsarket: Dato | Overskrift | Tekst
    presseUdgivet: "Form Responses 1" // svar-fanen: Timestamp | Hold | Type | Overskrift | Tekst | Dit navn (+ Skjul)
  },
  // Holdnavn på siden -> fanenavn i hold-arket, hvor de afviger.
  ROSTER_FANE: {
    "Return Of The Living Deadbeats": "Living Deadbeats"
  },
  // Off pitch training: links til læring og inspiration (bestilt af Mikkel 4. nov.). Tilføj frit flere.
  TRAENING: [
    {
      navn: "BB School of Block", url: "https://bbsob.net/",
      tekst: "Gratis træningsside lavet af fans. Du lærer Blood Bowl ved at træffe valg på en digital bane og se, hvad der sker.",
      links: [
        { navn: "Rookie Academy", url: "https://bbsob.net/rookie/", tekst: "Start her, hvis du er ny." },
        { navn: "Playmaker", url: "https://bbsob.net/playmaker/", tekst: "Lær at læse banen." },
        { navn: "Head Coach", url: "https://bbsob.net/head-coach/", tekst: "Systemet bag spillet." },
        { navn: "Toolshed", url: "https://bbsob.net/toolshed/", tekst: "Holdbygger, terningeslag og digital bane." },
        { navn: "Om siden", url: "https://bbsob.net/about/", tekst: "Hvem står bag." }
      ]
    },
    {
      navn: "The Bonehead Podcast", url: "https://theboneheadpodcast.podbean.com/",
      tekst: "Podcast om alt Blood Bowl: holdgennemgange, taktik, regler og turneringer. Godt selskab på vej til kamp.",
      links: [
        { navn: "Podbean", url: "https://theboneheadpodcast.podbean.com/", tekst: "Lyt i browseren." },
        { navn: "Apple Podcasts", url: "https://podcasts.apple.com/podcast/id1418889092", tekst: "Lyt på iPhone." }
      ]
    }
  ],

  // Puljekampe: én fane pr. kamp i hvert puljeark, PRÆCIS som fanerne hedder (også stavefejl som "vs,").
  // "A vs. B" og "B vs. A" er to forskellige kampe (hjemme/ude). Kommer der nye kampfaner, skal de skrives her.
  PULJEKAMPE: [
    { pulje: "Sort Pulje", ark: "puljeSort", faner: [
      "The Eternal Sages vs. Elmtree Evaders", "The Maurading Ocras vs. Mörkley Crüe",
      "The Eternal Sages vs. Mörkley Crüe", "Elmtree Evaders vs. The Eternal Sages",
      "Mörkley Crüe vs. The Maurading Ocras", "Mörkley Crüe vs. Elmtree Evaders",
      "The Maurading Ocras vs. Elmtree Evaders", "The Maurading Ocras vs. The Eternal Sages"] },
    { pulje: "Rød pulje", ark: "puljeRoed", faner: [
      "The Full Moon Foulers vs. The FumbleBoyz", "The FumbleBoyz vs. The Full Moon Foulers",
      "The Full Moon Foulers vs, Fright Night Fumblers", "Fright Night Fumblers vs. The Full Moon Foulers",
      "The FumbleBoyz vs, Fright Night Fumblers", "Fright Night Fumblers vs. The FumbleBoyz"] },
    { pulje: "Blå pulje", ark: "puljeBlaa", faner: [
      "Da Demolitionaz vs. Return Of The Living Deadbeats", "Return Of The Living Deadbeats vs. Da Demolitionaz",
      "Return Of The Living Deadbeats vs. GutBuster Gluttons", "GutBuster Gluttons vs. Return Of The Living Deadbeats",
      "Da Demolitionaz vs. GutBuster Gluttons", "GutBuster Gluttons vs. Da Demolitionaz"] },
    { pulje: "Gul pulje", ark: "puljeGul", faner: [
      "Bros Being Bros vs. Black Mountain Slavers", "Black Mountain Slavers vs. Bros Being Bros",
      "Black Mountain Slavers vs. Bedstefars Besudlere", "Bedstefars Besudlere vs. Black Mountain Slavers",
      "Bedstefars Besudlere vs. Bros Being Bros", "Bros Being Bros vs. Bedstefars Besudlere"] }
  ]
};
