// Holdlore og pressekonferencer. Satire, skrevet ud fra coachernes egen lore (se mappen lore/).
// Holdnavnet skal stavet præcis som i Mikkels ark, ellers findes holdet ikke.
//
// En pressekonference er en liste af "replikker": { hvem, rolle, tekst } eller { scene: "..." } for regi.
window.LORE = {
  "GutBuster Gluttons": {
    coach: "Otto Overbelly",
    hjemmebane: "The Gutpit",
    motto: "Winning is optional. Lunch is mandatory.",
    mottoDa: "At vinde er valgfrit. Frokost er obligatorisk.",
    afsnit: [
      { titel: "Fra slagter til sportsklub", tekst: "Før Blood Bowl drev Otto Overbelly en omrejsende slagterforretning, Overbelly's Prime Cuts. Den gik fallit. Otto så det ikke som en fiasko. Han omorganiserede bare: Ogrerne blev spillere, gnoblarerne blev personale, og slagtervognene blev holdets infrastruktur." },
      { titel: "The Gutpit", tekst: "Hjemmebanen er bygget i resterne af en slagtergård, et fælleskøkken og en ogrelejr. Der er store jerngryder, huggeblokke, kødkroge og røg fra kogebål. Den er kaotisk, farlig og dårligt reguleret. Den er også hjemme." },
      { titel: "Runts' Union", tekst: "Ogrerne er officielt holdet. Gnoblarerne, kaldet Runts, er i praksis embedsværket. De står for logistik, udstyr, forplejning, skadesrapporter og papirarbejde. Ingen lægger mærke til dem. Man opdager dem først, når de ikke er der, og hele klubben går i stå. Det forstår Otto aldrig helt." },
      { titel: "Navnetraditionen", tekst: "En gnoblar hos Gluttons får ikke et rigtigt navn. Den hedder Runt #7 eller Git #3. Et navn skal fortjenes, og grænsen er enkel: En gnoblar får et navn, når den lærer en skill. Det betragtes som helt normalt." },
      { titel: "Rygterne", tekst: "Modstandere har det med at forsvinde efter besøg i The Gutpit. Klubben afviser alle rygter. Hjelmene ved gryderne er et tilfælde, og kødet er officielt bare svinekød." }
    ],
    spillebog: ["Slå dem.", "Slå dem hårdere.", "Kast en gnoblar.", "Frokost."],
    ottoCitater: [
      "Statistik slår ikke folk.",
      "I slog dem ikke hårdt nok.",
      "Hvis én knægt kan klare det, sender man ikke to. To knægte spiser dobbelt.",
      "Det hedder ikke nærighed. Det hedder effektivitet."
    ]
  }
};

window.PRESSE = [
  {
    id: "gluttons-foer-puljespillet",
    hold: "GutBuster Gluttons",
    dato: "2026-11-03",
    titel: "»Planen er at slå dem«",
    undertitel: "Pre-season-pressekonference",
    sted: "The Gutpit, presserummet",
    citat: { hvem: "Otto Overbelly", tekst: "Du godeste, nej. Vi er ikke barbarer!" },
    replikker: [
      { hvem: "Gunnar Grådig", rolle: "Ligaens pressechef", tekst: "Velkommen til sæsonens første pressekonference. Der er endnu ikke sparket en bold, men presseafdelingen er allerede neutral. Første spørgsmål går til ligaens bedste coach. Otto, hvordan føles det at gå ind i sæsonen som favorit?" },
      { hvem: "Otto Overbelly", rolle: "Coach", tekst: "Er der frokost bagefter?" },
      { hvem: "Gunnar Grådig", tekst: "Ja." },
      { hvem: "Otto Overbelly", tekst: "Så føles det godt." },
      { hvem: "Spike!", rolle: "Taktikanalytiker", tekst: "Hvordan har forberedelserne været?" },
      { hvem: "Otto Overbelly", tekst: "Vi har spist." },
      { hvem: "Spike!", tekst: "Kulhydratladning før sæsonen. Meget moderne." },
      { hvem: "Otto Overbelly", tekst: "Det var kød." },
      { hvem: "Cabalvision", rolle: "Reporter", tekst: "Hvad er målet for sæsonen?" },
      { hvem: "Otto Overbelly", tekst: "Frokost. Og at vinde, hvis der er tid." },
      { hvem: "Spike!", tekst: "Gluttons har endnu ikke tabt en eneste kamp. Er det strategi?" },
      { hvem: "Otto Overbelly", tekst: "Nej. Sæsonen er ikke begyndt." },
      { hvem: "Spike!", tekst: "Tålmodighed som våben. Genialt." },
      { hvem: "Otto Overbelly", tekst: "Det er en kalender." },
      { hvem: "Cabalvision", tekst: "Hvad er taktikken mod Blå pulje?" },
      { hvem: "Otto Overbelly", tekst: "Vi slår dem." },
      { hvem: "Cabalvision", tekst: "Og hvis det ikke virker?" },
      { hvem: "Otto Overbelly", tekst: "Hårdere." },
      { hvem: "Cabalvision", tekst: "Og så?" },
      { hvem: "Otto Overbelly", tekst: "Så kaster vi en gnoblar." },
      { hvem: "Spike!", tekst: "En lagdelt kontakt-pres-doktrin, der opløser modstanderens rumlige integritet." },
      { hvem: "Otto Overbelly", tekst: "Nej. Vi slår dem." },
      { hvem: "Cabalvision", tekst: "I åbner mod Return Of The Living Deadbeats. Modstandere har det med at forsvinde efter besøg i The Gutpit. Skal de være bekymrede?" },
      { hvem: "Otto Overbelly", tekst: "Du godeste, nej. Vi er ikke barbarer!", note: "fornærmet" },
      { hvem: "Cabalvision", tekst: "Hvad er der så i gryden bag dig?" },
      { hvem: "Gunnar Grådig", tekst: "Officielt er det bare svinekød. Næste." },
      { hvem: "Spike!", tekst: "Runts' Union har klaget over Throw Team-mate. Kommentar?" },
      { hvem: "Otto Overbelly", tekst: "Hvem?" },
      { hvem: "Gunnar Grådig", tekst: "Gnoblarerne, Otto." },
      { hvem: "Otto Overbelly", tekst: "Nå. Dem. Klagen er noteret." },
      { hvem: "Spike!", tekst: "Af hvem?" },
      { hvem: "Otto Overbelly", tekst: "Det plejer at ordne sig selv." },
      { hvem: "Cabalvision", tekst: "Sommerens store nyindkøb er Lugga Longkicker. Hans job er at sparke gnoblarer." },
      { hvem: "Otto Overbelly", tekst: "Sparke er ikke kaste. Så gælder klagen ikke." },
      { hvem: "Cabalvision", tekst: "11 spillere, ingen apotekar og 0 guldstykker i kassen. Hvor er pengene blevet af?" },
      { hvem: "Otto Overbelly", tekst: "Vi måtte prioritere morgenmaden." },
      { hvem: "Cabalvision", tekst: "Hele budgettet?" },
      { hvem: "Otto Overbelly", tekst: "Det var en stor morgenmad." },
      { hvem: "Spike!", tekst: "Sidste spørgsmål. Bookmakerne giver jer odds 40 til 1 på at vinde ligaen. Kommentar?" },
      { hvem: "Otto Overbelly", tekst: "Statistik slår ikke folk." },
      { hvem: "Spike!", tekst: "Statistik som irrelevant størrelse. Revolutionerende." },
      { hvem: "Otto Overbelly", tekst: "Er det frokost nu?" },
      { hvem: "Gunnar Grådig", tekst: "Det er frokost nu. Vi ses til kick-off. Winning is optional. Lunch is mandatory." }
    ]
  }
];
