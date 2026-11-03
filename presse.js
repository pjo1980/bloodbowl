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
      { titel: "Runts' Union", tekst: "Ogrerne er officielt holdet. Gnoblarerne er i praksis embedsværket. De står for logistik, udstyr, forplejning, skadesrapporter og papirarbejde. Otto forstår aldrig helt, hvorfor hele klubben går i stå, hver gang unionen truer med strejke." },
      { titel: "Navnetraditionen", tekst: "En gnoblar hos Gluttons får ikke et rigtigt navn. Den hedder Runt #7 eller Git #3. Et navn skal fortjenes, og grænsen er enkel: En gnoblar får et navn, når den lærer en skill. Det betragtes som helt normalt." },
      { titel: "Familie er ikke mad", tekst: "Holdets gnoblarer må gerne blive råbt ad, kastet og trampet på. Men de er familie, og familie er ikke mad. Klubben afviser i øvrigt alle rygter om forsvundne modstandere. Hjelmene ved gryderne er et tilfælde." }
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
    undertitel: "Pressekonference før puljespillet",
    sted: "The Gutpit. Presserummet var engang et kølerum. Det er det stadig lidt.",
    citat: { hvem: "Otto Overbelly", tekst: "Du godeste, nej. Vi er ikke barbarer!" },
    replikker: [
      { scene: "Der står en stor gryde i hjørnet af presserummet. Ingen spørger til den. Coach Otto Overbelly sidder ved bordet med Runt #8 og Runt #9 ved siden af sig. Runt #9 har et clipboard." },
      { hvem: "Gunnar Grådig", rolle: "Ligaens pressechef", tekst: "Velkommen til sæsonens første pressekonference. Jeg vil gerne understrege, at ligaens presseafdeling er fuldstændig neutral. Derfor går første spørgsmål til ligaens bedste coach. Otto, hvordan føles det at være favorit?" },
      { hvem: "Otto Overbelly", rolle: "Coach", tekst: "Er der frokost bagefter?" },
      { hvem: "Gunnar Grådig", tekst: "Det er der." },
      { hvem: "Otto Overbelly", tekst: "Så føles det godt." },
      { hvem: "Spike!", rolle: "Taktikanalytiker", tekst: "Coach, Gluttons har endnu ikke spillet en eneste puljekamp. Er det en bevidst strategi?" },
      { hvem: "Otto Overbelly", tekst: "Nej. Kampene er ikke begyndt." },
      { scene: "Spike!-analytikeren skriver ivrigt: »Tålmodighed som våben.« Otto ser på ham. Han skriver videre." },
      { hvem: "Cabalvision", rolle: "Reporter", tekst: "Hvad er jeres taktik mod Blå pulje?" },
      { hvem: "Otto Overbelly", tekst: "Vi slår dem." },
      { hvem: "Cabalvision", tekst: "Og hvis det ikke virker?" },
      { hvem: "Otto Overbelly", tekst: "Så slår vi dem hårdere." },
      { hvem: "Cabalvision", tekst: "Og hvis det heller ikke virker?" },
      { hvem: "Otto Overbelly", tekst: "Så kaster vi en gnoblar." },
      { hvem: "Spike!", tekst: "Fascinerende. En lagdelt kontakt-pres-doktrin, der skal opløse modstanderens rumlige integritet." },
      { hvem: "Otto Overbelly", tekst: "Nej. Det er at slå dem." },
      { hvem: "Cabalvision", tekst: "Jeres første modstandere er Return Of The Living Deadbeats. Det siges, at modstandere har det med at forsvinde efter besøg i The Gutpit. Skal Deadbeats være bekymrede?" },
      { hvem: "Otto Overbelly", tekst: "Du godeste, nej. Vi er ikke barbarer!", note: "dybt fornærmet" },
      { scene: "En gnoblar skubber stille gryden lidt længere ind i hjørnet." },
      { hvem: "Cabalvision", tekst: "Hvad er der i gryden?" },
      { hvem: "Gunnar Grådig", tekst: "Officielt er det bare svinekød. Næste spørgsmål." },
      { hvem: "Runt #9", rolle: "Tillidsmand, Runts' Union", tekst: "Unionen har en formel klage over Throw Team-mate. Ved sidste træning blev jeg kastet fire gange. Den ene gang ind i kantinen." },
      { hvem: "Otto Overbelly", tekst: "Klagen er noteret. Sikkerheden har høj prioritet." },
      { hvem: "Runt #9", tekst: "Hvis prioritet?" },
      { hvem: "Otto Overbelly", tekst: "Det står ikke i klagen." },
      { hvem: "Runt #9", tekst: "Desuden har klubben ansat Lugga Longkicker. Hans arbejdsopgave er at sparke os." },
      { hvem: "Otto Overbelly", tekst: "Det er ikke at kaste. Så er det ikke omfattet af klagen." },
      { scene: "Runt #9 skriver noget på sit clipboard. Det ser ud til at være en ny klage." },
      { hvem: "Spike!", tekst: "Runt #8, du bærer et legendarisk nummer. Er du DEN Runt #8?" },
      { hvem: "Runt #8", rolle: "Gnoblar Lineman", tekst: "Nej. Jeg er bare nummer otte." },
      { hvem: "Spike!", tekst: "Hvad er din plan for sæsonen?" },
      { hvem: "Runt #8", tekst: "Løbe. Blive ved med at løbe. Score. Måske." },
      { hvem: "Spike!", tekst: "Han har genopfundet løb!", note: "rejser sig" },
      { hvem: "Otto Overbelly", tekst: "Han har ikke engang et navn endnu." },
      { hvem: "Gunnar Grådig", tekst: "Til de nye journalister: Hos Gluttons får en gnoblar først et navn, når den har lært en skill. Det er en smuk tradition." },
      { hvem: "Cabalvision", tekst: "I har 11 spillere, ingen apotekar og 0 guldstykker i kassen. Er klubben i økonomisk krise?" },
      { hvem: "Otto Overbelly", tekst: "Nej. Hvis én knægt kan klare det, sender man ikke to. To knægte spiser dobbelt. Det hedder effektivitet." },
      { hvem: "Cabalvision", tekst: "Og hvis budgettet bliver rigtig stramt? Bliver gnoblarerne så …" },
      { hvem: "Otto Overbelly", tekst: "Familie er ikke mad.", note: "chokeret" },
      { hvem: "Runt #9", tekst: "Det står i overenskomsten. Paragraf ét." },
      { scene: "Udenfor lyder en fløjte. Otto rejser sig." },
      { hvem: "Otto Overbelly", tekst: "Frokost." },
      { hvem: "Gunnar Grådig", tekst: "Det var dommerens fløjte, Otto." },
      { hvem: "Otto Overbelly", tekst: "Frokost." },
      { scene: "Pressekonferencen er slut. Runt #9 samler de spørgeskemaer op, der ikke er blevet spist." },
      { hvem: "Gunnar Grådig", tekst: "Tak fordi I kom. Og husk: Winning is optional. Lunch is mandatory." }
    ]
  }
];
