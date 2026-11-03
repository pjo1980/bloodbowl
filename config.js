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
    puljeRoed: "1-AdI1rklMUmDNp9wiJWRyE6FJfqc1y2Hrp2QDVVaxLs"
    // puljeSort: mangler link
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
  }
};
