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
      { titel: "Runts", tekst: "Ogrerne er officielt holdet. Gnoblarerne, kaldet Runts, er i praksis embedsværket. De står for logistik, udstyr, forplejning, skadesrapporter og papirarbejde. Ingen lægger mærke til dem. Man opdager dem først, når de ikke er der, og hele klubben går i stå. Det forstår Otto aldrig helt." },
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
    "id": "sages-spike-interview",
    "hold": "The Eternal Sages",
    "type": "Interview",
    "dato": "2026-11-04",
    "titel": "»Ligaen er reelt allerede afgjort«",
    "undertitel": "Spike!-interview",
    "sted": "Et eksklusivt interview med Raelth, cheftræner for The Eternal Sages",
    "coach": "Raelth",
    "indsendt": "Indsendt af holdets coach",
    "citat": {
      "hvem": "Raelth",
      "tekst": "Mesterskabet er minimumskravet."
    },
    "replikker": [
      {
        "hvem": "Spike!",
        "tekst": "Først og fremmest, tillykke med sejren over Wood Elf-holdet Elmtree Evaders. Og ikke mindst med førstepladsen i ligaen!",
        "rolle": "Magasin"
      },
      {
        "hvem": "Raelth",
        "tekst": "Tak. Selvom \"tillykke\" måske er et lidt voldsomt ord. Man lykønsker jo heller ikke solen med at stå op om morgenen. Nogle ting sker ganske enkelt, fordi det er naturens orden.",
        "rolle": "Cheftræner, The Eternal Sages"
      },
      {
        "hvem": "Spike!",
        "tekst": "Nu skal det måske nævnes, at kun fire hold faktisk har spillet en kamp endnu."
      },
      {
        "hvem": "Raelth",
        "tekst": "Korrekt. Fire hold har haft muligheden for at demonstrere deres niveau, og blandt disse fire har vi demonstreret det højeste. Jeg kan ikke se, hvordan de resterende holds administrative langsommelighed skal gøre vores førsteplads mindre imponerende.\nHvis de ønskede at ligge nummer ét, kunne de jo bare have spillet tidligere.\nOg bedre."
      },
      {
        "afsnit": "“Wood Elves er High Elves, der er blevet væk i skoven”"
      },
      {
        "hvem": "Spike!",
        "tekst": "Hvad synes du om Elmtree Evaders? De er trods alt kendt for fart og teknisk Blood Bowl."
      },
      {
        "hvem": "Raelth",
        "tekst": "Wood Elves er fascinerende.\nDe er, på mange måder, hvad der sker, når High Elves holder op med at gå i bad, flytter ud i en skov og begynder at tro, at det at hoppe over folk er en erstatning for taktisk forståelse."
      },
      {
        "hvem": "Spike!",
        "tekst": "Så du var aldrig nervøs under kampen?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Nervøs?\nNej.\nDer var enkelte øjeblikke, hvor jeg var bekymret for, om de var nervøse. Jeg ønsker trods alt ikke, at vores modstandere får en traumatisk oplevelse.\nDe skal helst have lyst til at møde os igen.\nVi har brug for point."
      },
      {
        "afsnit": "Golthorn IX: “Han scorer, fordi det er hurtigere”"
      },
      {
        "hvem": "Spike!",
        "tekst": "Lad os tale om nogle af spillerne. Golthorn IX har allerede markeret sig som holdets topscorer."
      },
      {
        "hvem": "Raelth",
        "tekst": "Naturligvis.\nGolthorn IX kommer fra en lang og glorværdig slægt af Golthorner. Golthorn III scorede eksempelvis syv touchdowns i én kamp."
      },
      {
        "hvem": "Spike!",
        "tekst": "Er det dokumenteret?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Nej. Modstanderens statistikfører døde."
      },
      {
        "hvem": "Spike!",
        "tekst": "På banen?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Nej, mange år senere.\nMen det ændrer ikke på historiens troværdighed.\nGolthorn IX har forstået noget fundamentalt om Blood Bowl: Hvis man står med bolden tæt på modstanderens endzone, bør man gå ind i den.\nMange spillere komplicerer sporten unødigt."
      },
      {
        "afsnit": "Taln: “En usædvanligt kulturel lineman”"
      },
      {
        "hvem": "Spike!",
        "tekst": "Så er der Taln. Jeres lineman, som tilsyneladende har udviklet en stor kærlighed til at smadre modstandere."
      },
      {
        "hvem": "Raelth",
        "tekst": "Jeg ville ikke kalde Taln voldelig."
      },
      {
        "hvem": "Spike!",
        "tekst": "Han slog tre spillere ned på otte minutter."
      },
      {
        "hvem": "Raelth",
        "tekst": "Entusiastisk.\nTaln betragter tackling som en kunstform. Hvor en Orc ser en modstander og tænker: “SMASH!”, ser Taln anatomi, vinkler, balancepunkt og potentiel skade.\nDet er forskellen på vold og kultur."
      },
      {
        "hvem": "Spike!",
        "tekst": "Han headbuttede en Wardancer."
      },
      {
        "hvem": "Raelth",
        "tekst": "Ja.\nSmukt udført."
      },
      {
        "afsnit": "Bradur VI: “Bolden adlyder ham”"
      },
      {
        "hvem": "Spike!",
        "tekst": "Og jeres thrower, Bradur VI?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Den bedste kaster i ligaen."
      },
      {
        "hvem": "Spike!",
        "tekst": "Efter én kamp?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Har du set de andre?"
      },
      {
        "hvem": "Spike!",
        "tekst": "Ikke alle har spillet endnu."
      },
      {
        "hvem": "Raelth",
        "tekst": "Præcis.\nIngen har endnu fremlagt beviser for, at de har en bedre kaster. Indtil det sker, er Bradur VI den bedste.\nSådan fungerer videnskab.\nBradur VI kaster ikke bolden. Han forklarer den, hvor den skal hen.\nOg bolden adlyder."
      },
      {
        "afsnit": "“Vores taktik er egentlig ganske enkel”"
      },
      {
        "hvem": "Spike!",
        "tekst": "Hvad kan de andre hold forvente taktisk fra The Eternal Sages?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Det ville naturligvis være tåbeligt at afsløre hele vores taktiske plan i et magasin, som Orcs muligvis kan få nogen til at læse højt for sig.\nMen grundlæggende:\nVi løber hurtigere end de langsomme hold.\nVi tænker hurtigere end de dumme hold.\nVi kaster bedre end de løbende hold.\nOg mod de hold, der mener, at fysik er vigtigst, sender vi Taln ind."
      },
      {
        "hvem": "Spike!",
        "tekst": "Det lyder overraskende simpelt."
      },
      {
        "hvem": "Raelth",
        "tekst": "Kun fordi jeg har forklaret det på et niveau, en journalist kan forstå."
      },
      {
        "afsnit": "Mesterskabet?"
      },
      {
        "hvem": "Spike!",
        "tekst": "Så hvad er forventningen til sæsonen? Mesterskabet?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Forventningen?\nMesterskabet er minimumskravet.\nThe Eternal Sages er ikke kommet for at deltage i ligaen. Vi er kommet for at give ligaen noget, den siden kan fortælle sine børnebørn om."
      },
      {
        "hvem": "Spike!",
        "tekst": "Og hvis I ikke vinder?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Så bør turneringsledelsen naturligvis iværksætte en undersøgelse."
      },
      {
        "hvem": "Spike!",
        "tekst": "Af hvad?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Alt.\nBanerne. Dommerne. Kampplanen. Vejret. Boldenes kvalitet. Publikum. Modstandernes moral. Sandsynligvis også reglerne.\nDet kan umuligt være vores skyld.\nVi er High Elves."
      },
      {
        "hvem": "Spike!",
        "tekst": "Men rent hypotetisk kunne et andet hold vel bare være bedre?"
      },
      {
        "scene": "Lang stilhed."
      },
      {
        "hvem": "Raelth",
        "tekst": "Jeg forstår ikke spørgsmålet."
      },
      {
        "hvem": "Spike!",
        "tekst": "Tak for interviewet, Raelth."
      },
      {
        "hvem": "Raelth",
        "tekst": "Selv tak. Send mig artiklen inden udgivelse. Jeg går ud fra, at I har nogen, der kan rette fejlene."
      },
      {
        "hvem": "Spike!",
        "tekst": "Stavefejl?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Nej. Jeres meninger."
      }
    ]
  },
  {
    id: "gluttons-foer-puljespillet",
    hold: "GutBuster Gluttons",
    dato: "2026-11-03",
    titel: "»Planen er at slå dem«",
    undertitel: "Pre-season-pressekonference",
    sted: "The Gutpit, presserummet",
    citat: { hvem: "Otto Overbelly", tekst: "Du godeste, nej. Vi er ikke barbarer!" },
    replikker: [
      { hvem: "Gunnar Grådig", rolle: "Ligaens pressechef", tekst: "Velkommen til sæsonens første pressekonference. Presseafdelingen er naturligvis 100 % neutral i sin dækning af ligaen. Og nu: ligaens klart bedste coach, Otto Overbelly! Otto, hvordan føles det at have vundet prisen som ligaens bedste coach, inden sæsonen er gået i gang?" },
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
      { hvem: "Spike!", tekst: "Holdets gnoblarer har klaget over Throw Team-mate. Kommentar?" },
      { hvem: "Otto Overbelly", tekst: "Har vi gnoblarer?" },
      { hvem: "Gunnar Grådig", tekst: "Fem, Otto." },
      { hvem: "Otto Overbelly", tekst: "Nå. Klagen er noteret." },
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
      { hvem: "Gunnar Grådig", tekst: "Det var sidste spørgsmål. Vi ses til kick-off. Der er frokost nu." },
      { hvem: "Otto Overbelly", tekst: "Endelig." },
      { hvem: "Gunnar Grådig", tekst: "Pressen er velkommen til at spise med. Jeg anbefaler salaten. Det er den eneste ret, vi kan garantere indholdet af." }
    ]
  }
];

// Holdplakater (fra coacherne via Mikkel, 4. nov.) og slogans fra plakaterne. Filer i mappen plakater/.
// Nøglen skal stavet præcis som holdnavnet i Mikkels ark.
window.PLAKATER = {
  "Da Demolitionaz": { fil: "da-demolitionaz", slogans: ["We don't build plays… we tear 'em down!", "No plans. No permits. No problems.", "100 % WAAAGH! guaranteed."] },
  "Return Of The Living Deadbeats": { fil: "living-deadbeats", slogans: ["Same game… different kind of dead.", "No brain. No fear. Just teamwork.", "Shambling for glory."] },
  "Black Mountain Slavers": { fil: "black-mountain-slavers", slogans: ["Same chains. Different dreams.", "The mountain demands victory.", "Slave today. Cheer tomorrow."] },
  "The Maurading Ocras": { fil: "maurading-ocras", slogans: ["More blood. More hits. More glory."] },
  "The Eternal Sages": { fil: "eternal-sages", slogans: ["Grace. Wisdom. Victory.", "The mind plans. The body executes. The eternity remembers."] },
  "The Full Moon Foulers": { fil: "full-moon-foulers", slogans: ["We play. You die.", "The dead don't miss. They just foul.", "Raised. Ruthless. Relentless."] },
  "GutBuster Gluttons": { fil: "gutbuster-gluttons", slogans: ["Winning is optional. Lunch is mandatory.", "Welcome to the feast.", "Six Ogres. Numerous Gnoblars. Absolutely no refunds."] },
  "Bedstefars Besudlere": { fil: "bedstefars-besudlere", slogans: ["Blod, byld og bold.", "Snot, slim, sejr!", "Langsomt, men sikkert!"] },
  "Elmtree Evaders": { fil: "elmtree-evaders", slogans: ["Speed. Agility. Elegance.", "We dance. You fall.", "We don't hit hard. We don't need to."] },
  "The FumbleBoyz": { fil: "fumbleboyz", slogans: ["Honor. Team. Glory.", "More than a game.", "Legends play here."] },
  "Mörkley Crüe": { fil: "morkley-crue", slogans: ["Smash. Stomp. Score."] },
  "Bros Being Bros": { fil: "bros-being-bros", slogans: ["Good friends. Cold beer. Hard hits. Great times."] }
  // "Fright Night Fumblers": mangler plakat (Goblin-hold).
};
