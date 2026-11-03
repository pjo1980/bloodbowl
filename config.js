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
  ARK: {
    turnering: "1sYVF9bm5XaG8sHLOOU8SGHGvMKqWEBPfR9ZL46oudtA",
    hold:      "1wqXQfoZ2DZdCUSWBF0o1tgtiycztq8NuJ2f_nUif46o",
    puljeGul:  "1vzKPfw-2WmsEEfPjgJPqEBeVN08ODg36qQ1GH3SXVbI",
    puljeBlaa: "1t-ZntRFVAy79VqMz-G6dJwhLalMWs8rHFjPDNsh3ARY",
    puljeRoed: "1-AdI1rklMUmDNp9wiJWRyE6FJfqc1y2Hrp2QDVVaxLs",
    puljeSort: "1rucYUGovKDidPORuZyOO2HxyEYdG7Qg62Q0a-lX3ARc"
  },
  FANER: {
    stilling: "Turneringsstilling",
    puljer: ["Sort Pulje", "Rød pulje", "Blå pulje", "Gul pulje"],
    program: "Kampprogram Regnbuepiljen",
    holdrang: "Holdranglister",
    spillerrang: "Spiller ranglister",
    holdstats: "Holdstats ud",
    nyheder: "Nyheder"          // valgfri fane i turneringsarket: Dato | Overskrift | Tekst
  },
  // Holdnavn på siden -> fanenavn i hold-arket, hvor de afviger.
  ROSTER_FANE: {
    "Return Of The Living Deadbeats": "Living Deadbeats"
  },
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
