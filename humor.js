// Blood Bowl-humor til siden. Ret, slet eller tilføj frit: siden vælger tilfældigt fra listerne.
// Alt her er satire og skrevet til siden (ikke kopieret fra Games Workshops bøger).
// Kommissærens ord hører IKKE hjemme her: de kommer kun fra hans egen Nyheder-fane.
window.HUMOR = {
  yndlingshold: "GutBuster Gluttons",

  // Opdigtet figur. Navnet kan frit skiftes.
  // STEMME (Peter 16. nov.): I sine faste noter og kort omtaler Gunnar altid sig selv som "Pressechefen", aldrig "jeg".
  // Kun i replikker i interviews og pressekonferencer (presse.js) taler han i jeg-form.
  // Citat inde i en note skrives med enkelte tegn ›...‹, fordi kortet selv sætter »...« om hele teksten.
  pressechef: { navn: "Gunnar Grådig", titel: "Ligaens pressechef (100 % neutral)" },

  // "INGEN KOMMENTAR" (Peter 16. nov.): Gunnar opsøger de hold, der endnu ikke har skrevet til pressetribunen.
  // Venligt drilleri, der skal give lyst til at svare. Reglerne:
  //   - Drilleriet rammer HOLDET (navn, plakat, slogans), aldrig coachen som person.
  //   - Gunnar lægger aldrig ord i munden på nogen. Han gætter, venter og holder mikrofonen.
  //   - Det skal være en invitation, ikke en skideballe.
  // {hold} erstattes med holdnavnet. Noten forsvinder af sig selv, når holdet har indsendt noget.
  ingenKommentar: {
    knap: "Bryd tavsheden",
    generelle: [
      "{hold} har endnu ikke udtalt sig. Pressechefen har pudset mikrofonen og holdt forsiden fri.",
      "Ingen kommentar fra {hold} endnu. Pressechefen modtager alt: sejrstaler, undskyldninger og hilsner til dommeren.",
      "{hold} er stadig tavse. Pressechefen minder om, at tavshed ikke giver point. Det gør pressemeddelelser heller ikke, men de er sjovere."
    ],
    hold: {
      "Elmtree Evaders": [
        "Elmtree Evaders har endnu ikke udtalt sig. Pressechefen formoder, at de også undviger journalister.",
        "Ingen kommentar fra Elmtree Evaders. Pressechefen har stillet en mikrofon i skovbrynet og venter tålmodigt."
      ],
      "Mörkley Crüe": [
        "Mörkley Crüe har ikke givet lyd fra sig. Det er usædvanligt for et band.",
        "Ingen kommentar fra Mörkley Crüe. Pressechefen venter på, at lydprøven bliver færdig."
      ],
      "Fright Night Fumblers": [
        "Fright Night Fumblers har ikke svaret. Pressechefen ringede, men nogen trak bare vejret i røret.",
        "Ingen kommentar fra Fright Night Fumblers. Pressechefen tør ikke banke på efter mørkets frembrud, men postkassen er åben."
      ],
      "The FumbleBoyz": [
        "The FumbleBoyz har endnu ikke udtalt sig. Pressechefen går ud fra, at pressemeddelelsen blev tabt på vej til postkassen.",
        "Ingen kommentar fra The FumbleBoyz. ›Legends play here‹ står der på banneret. Pressechefen vil gerne høre legenden."
      ],
      "Return Of The Living Deadbeats": [
        "Return Of The Living Deadbeats tier som graven. Pressechefen har banket høfligt på kistelåget.",
        "Ingen kommentar fra Deadbeats. Pressechefen ved, at de er stået op. Det står i holdnavnet."
      ],
      "Da Demolitionaz": [
        "Da Demolitionaz har ingen planer, ingen tilladelser og indtil videre ingen kommentarer.",
        "Ingen kommentar fra Da Demolitionaz. Pressechefen hører kun larm fra byggepladsen og har stillet mikrofonen ved hegnet."
      ],
      "GutBuster Gluttons": [
        "GutBuster Gluttons har ikke udtalt sig. Pressechefen forstår det godt: Storhed taler for sig selv. Men han lytter gerne."
      ]
    }
  },

  // FIGURER MED ANSIGT: pressetribunens faste skribenter. Billedet vises ved deres replikker og som byline.
  // Nøglen er navnet, præcis som det står som taler eller i "Indsendt af ...". Billeder ligger i figurer/.
  figurer: {
    "Gunnar Grådig": { billede: "figurer/gunnar-graadig.jpg", lille: "figurer/gunnar-graadig-lille.jpg", titel: "Ligaens pressechef (100 % neutral)" },
    "Rygte Rasmus": { billede: "figurer/rygte-rasmus.jpg", lille: "figurer/rygte-rasmus-lille.jpg", titel: "Rygtereporter, Spike! Magazine" }
  },

  // GUNNARS POWER RANKING (Peter 16. nov.): pressechefens "helt neutrale" rangliste på #power.
  // Yndlingsholdet er altid nummer et. Resten står efter deres RIGTIGE point fra kommissærens ark; står to hold lige,
  // vinder det hold, der har sendt mest til pressetribunen (pressebonus). Begrundelserne bygger på de rigtige tal.
  // Pladsholdere: {hold} {p} {sejre} {nederlag} {td} {cas} {yndling}. Samme regler som ovenfor: drilleri mod holdet, ikke coachen.
  powerRanking: {
    intro: "Ligaens eneste helt neutrale rangliste. Udregnet efter pressechefens hemmelige formel: resultater, udstråling, sovs og villighed til at tale med pressen.",
    yndling: {
      ikkeSpillet: [
        "Har ikke spillet en eneste kamp. Formlen ser ingen grund til at vente på resultaterne.",
        "Ubesejrede. Uprøvede. Uovertrufne. Formlen er kontrolregnet tre gange."
      ],
      vinder: [
        "{sejre}. Pressechefen havde forudsagt det og vil gerne citeres for det.",
        "Nummer et, og denne gang har de endda point til at bevise det."
      ],
      taber: [
        "{nederlag}, som formlen har valgt at se stort på. Udstråling tæller dobbelt.",
        "Resultaterne er midlertidige. Førstepladsen er permanent."
      ],
      andet: ["Nummer et. Formlen kan ikke forklares, kun beundres."]
    },
    familie: [
      "Pressechefens egen familie. Det har naturligvis intet med placeringen at gøre.",
      "{p} point og fornemme aner. Formlen tager kun hensyn til det første. Siger den."
    ],
    ikkeSpillet: [
      "Har ikke spillet endnu. Ubesejrede, men også uprøvede.",
      "Venter på første kamp. Formlen venter med.",
      "Ingen kampe, ingen fejl. Pressechefen kalder det en fejlfri start.",
      "Har endnu ikke rørt en bold. Formlen har noteret sig, at udstyret er i fin stand.",
      "Nul kampe, nul skader. Apotekeren kalder det en drømmesæson.",
      "Ingen ved, hvor gode de er. Det gør dem farlige, mener formlen.",
      "Holder kortene tæt til kroppen. Så tæt, at formlen ikke kan se dem."
    ],
    ubesejret: [
      "{sejre} og ingen nederlag. Ville ligge nummer et i enhver liga uden {yndling}.",
      "Ubesejrede med {p} point. Formlen er imponeret, bare ikke imponeret nok."
    ],
    sejrloes: [
      "{nederlag} og ingen sejre endnu. Formlen tror stadig på dem. Det er dens job.",
      "Ingen sejre endnu. Pressechefen minder om, at alle store hold har haft en dårlig start. Næsten alle.",
      "{nederlag} indtil videre. Formlen noterer sig, at holdet mødte op. Det giver også point. Hos formlen.",
      "Starten kunne have været bedre. Formlen kunne også have været venligere."
    ],
    blandet: [
      "{sejre} og {nederlag}. Formlen kalder det karakteropbyggende.",
      "{p} point efter lidt af hvert. Formlen kalder dem ligaens mest uforudsigelige hold."
    ],
    uafgjort: ["Kun uafgjorte indtil videre. Formlen kan heller ikke bestemme sig."],
    cas: "{cas} casualties. Apotekerne sender en takkehilsen.",
    td: "{td} touchdowns. Publikum fik noget for pengene.",
    bonus: "Pressebonus",
    ingenBonus: "Ingen pressebonus endnu. Formlen belønner hold, der taler med pressen."
  },

  // GUNNARS TRE SPØRGSMÅL (Peter 16. nov.): efter hver spillet kamp får begge hold de samme tre faste spørgsmål.
  // Coachen svarer med én linje pr. spørgsmål på kampsiden. Svarene er coachens egne ord og vises ordret.
  treSpoergsmaal: {
    spoergsmaal: [
      "Hvem var jeres helt i kampen, og hvad er belønningen?",
      "Hvem skuffede mest, og hvad bliver straffen?",
      "Har I en hilsen til modstanderen, dommeren eller Nuffle?"
    ],
    intro: "Én linje pr. svar er nok. Pressechefen citerer ordret. Det er nyt for ham.",
    venter: [
      "{hold} har ikke svaret endnu. Pressechefen holder mikrofonen og bliver stående.",
      "Ingen kommentar fra {hold} endnu. Pressechefen har sat kaffe over og venter gerne.",
      "{hold} tænker stadig over svarene. Pressechefen minder om, at tre linjer er nok."
    ]
  },

  // Citater fra coachernes EGNE indlæg, ordret (kun forkortet). Vises skiftevis med Star Player-citaterne og på holdsiden.
  // Den daglige pressechef-opgave tilføjer 1-2 nye, når en coach skriver noget citatværdigt.
  holdCitater: [
    { hold: "The Maurading Ocras", hvem: "GrimStone the Merciless", tekst: "Jeg vil hellere tabe en kamp med elleve modstandere på lazarettet end vinde en kamp, hvor alle elverne kan danse hjem til deres små silkepuder bagefter." },
    { hold: "The Maurading Ocras", hvem: "GrimStone the Merciless", tekst: "Sidste sæson kunne mine spillere ikke engang knække en tør kiks uden at få en forstuvning." },
    { hold: "The Full Moon Foulers", hvem: "Herr Doktor von Cünthenstien", tekst: "Etik?! HAHAHA! Jeg forsøgte etik én gang. Den nægtede at rejse sig fra operationsbordet." },
    { hold: "The Full Moon Foulers", hvem: "Herr Doktor von Cünthenstien", tekst: "De må vælge mellem »Ja, Herr Doktor« og »AAAAARGH!« Begge svar betragtes som informeret samtykke." },
    { hold: "The Eternal Sages", hvem: "Raelth", tekst: "Odds er noget, mennesker bruger til at beskrive ting, High Elves endnu ikke har gjort." },
    { hold: "Black Mountain Slavers", hvem: "Taskmaster Flemming", tekst: "Det lyder så skønt, når deres knogler knækker. Det kan kendes på knækket!" },
    { hold: "Black Mountain Slavers", hvem: "Taskmaster Flemming", tekst: "Hvordan skal man kunne nyde en ordentlig Blood Bowl-sæson, når der næsten ikke er nogen elvere at trampe på?" },
    { hold: "Black Mountain Slavers", hvem: "Taskmaster Flemming", tekst: "Bestikkelse? Sikke noget vrøvl! Jeg støtter bare elvernes deltagelse i ligaen. De fortjener alle sammen en chance for at komme på banen ... og blive båret af den igen!" },
    { hold: "Bedstefars Besudlere", hvem: "Coach Svulst-Stank", tekst: "Han. Snublede." },
    { hold: "Bedstefars Besudlere", hvem: "Coach Svulst-Stank", tekst: "Jeg har set zombier uden ben bevæge sig mere elegant!" },
    { hold: "Bedstefars Besudlere", hvem: "Coach Svulst-Stank", tekst: "Man kan ikke vinde en kamp ved bare at stå og rådne! Tro mig, vi har prøvet!" },
    { hold: "Bedstefars Besudlere", hvem: "Coach Svulst-Stank", tekst: "Jeg har aldrig været så stolt og så skuffet på samme tid." },
    { hold: "Bedstefars Besudlere", hvem: "Coach Svulst-Stank", tekst: "PRAISE NURGLE! OG HUSK AT VASKE HÆNDER... NEJ, VENT! LAD VÆRE MED DET! HAHAHAHAHA!" },
    { hold: "The Eternal Sages", hvem: "Raelth", tekst: "Man lykønsker jo heller ikke solen med at stå op om morgenen." },
    { hold: "The Eternal Sages", hvem: "Raelth", tekst: "Mesterskabet er minimumskravet." },
    { hold: "The Eternal Sages", hvem: "Raelth", tekst: "Det er forskellen på vold og kultur." },
    { hold: "The Eternal Sages", hvem: "Raelth", tekst: "Det kan umuligt være vores skyld. Vi er High Elves." },
    { hold: "The Eternal Sages", hvem: "Raelth", tekst: "Send mig artiklen inden udgivelse. Jeg går ud fra, at I har nogen, der kan rette fejlene." }
  ],

  // Rygter om kommissæren og bestikkelse (Peter 9. nov.; bygger på Taskmaster Flemmings eget rygte).
  // Altid fortalt af pressechefen eller Spike!. Læg ALDRIG ord i munden på kommissæren: han er en rigtig person.
  kommissaerRygter: [
    "Kampprogrammet er lagt helt neutralt. At Taskmaster Flemming fik begge elverhold, er ren tilfældighed og en meget stor kasse Bloodweiser.",
    "Ifølge rygterne tager kommissærens kontor imod bestikkelse i guld, øl og kage. Pressechefen har tilbudt sovs. Det blev afvist.",
    "En anonym gnoblar har set kommissæren tælle guldmønter i stillingsarket. Ifølge kilden hed det »formler«.",
    "Kommissæren afviser alle rygter om bestikkelse. Det gør hans nye sommerresidens i Lustria også.",
    "Uofficiel prisliste fra kommissærens kontor: At flytte en kamp koster tre tønder Bugman's. At flytte den tilbage koster fire.",
    "Pressechefen spurgte kommissæren om Taskmaster Flemmings tomme pengebælte. Han fik intet svar, men en mistænkeligt god plads ved næste kamp.",
    "Kommissærens nye guldbelagte Bloodweiser-tønde er efter sigende en gave fra »en anonym elverelsker«. Elverne benægter. Flemming smiler."
  ],

  // Gunnar har "opdaget", at han er i familie med The Eternal Sages, og fedter for elverne (Peter 9. nov.).
  // Spillernavnene (Golthorn IX, Taln, Bradur VI, Raelth) kommer fra coachens eget Spike!-interview.
  // Vises på forsiden og stillingen (af og til), på Sages' holdside og i Sages' kampreferater.
  elverfamilie: {
    hold: "The Eternal Sages",
    linjer: [
      "Pressechefen kan afsløre, at hans oldemor engang stod i kø bag Golthorn III. Slægtsforskere kalder det et svagt bånd. Pressechefen kalder det blod.",
      "Golthorn IX er pressechefens fætter. En meget fjern fætter. Så fjern, at Golthorn ikke ved det endnu.",
      "Pressechefens ører er spidse. Det kan bare ikke ses under hatten.",
      "Pressechefen er stadig 100 % neutral. Han er bare også 3 % elver.",
      "Taln tackler ikke. Han omfavner med eftertryk. Det ligger til familien.",
      "Bradur VI kaster som pressechefens farfar. Farfar kastede også med ting. Mest tallerkener.",
      "GutBuster Gluttons er pressechefens hjerte. The Eternal Sages er bare hans stamtavle.",
      "Pressechefen har sendt Raelth et julekort, underskrevet ›Din hengivne fætter, Gunnar Grådig-Golthorn‹.",
      "Raelth har ikke svaret på pressechefens breve. Det er typisk elverbeskedenhed. Den har pressechefen også.",
      "Pressechefen har spist med kniv og gaffel en hel uge for at øve sig i at være elver. Gaflen overlevede ikke.",
      "Pressechefen har bestilt et stamtræ. Det er ikke færdigt, men grenene mod The Eternal Sages er allerede malet med guld.",
      "Elvere ældes ikke. Det gør pressechefen heller ikke. Han bliver bare bredere. Det er samme gen.",
      "Pressechefen er ikke blevet elverfan. Han er blevet elverfamilie. Det er noget helt andet, og det er helt neutralt.",
      "Pressechefen har bedt Taskmaster Flemming holde fingrene fra elverfamilien. Flemming spurgte bare, hvor de bor.",
      "Pressechefen sover nu med benskinner på. Man ved aldrig, hvornår Taskmaster Flemming opdager, at pressechefen er 3 % elver.",
      "Pressechefen har lært at sige ›tillykke‹ på elversk. Han har endnu ikke lært at sige det uden smuler i skægget."
    ],
    // Til kampreferater, hvor Sages er med (vinder / taber / uafgjort).
    vandt: "Pressechefen fældede en tåre over sejren. ›Blod er tykkere end sovs,‹ siger han. Det er første gang, han har sagt det.",
    tabte: "Pressechefen kalder nederlaget et familieanliggende og vil ikke kommentere det yderligere. Han har sendt blomster.",
    uafgjort: "Uafgjort. Pressechefen ser det som en moralsk sejr til sine slægtninge, The Eternal Sages."
  },

  sponsorer: [
    { navn: "Bloodweiser", tekst: "Den officielle øl for folk, der allerede har mistet tre tænder." },
    { navn: "Orcidas", tekst: "Støvler med pigge. Til at sparke bolden. Eller noget andet." },
    { navn: "Bugman's XXXXXX", tekst: "Dværgebrygget siden før din bedstefar blev trampet ned." },
    { navn: "Cabalvision", tekst: "Vi sender live fra banen, så længe kameramanden lever." },
    { navn: "Spike! Magazine", tekst: "Ligaens mest pålidelige kilde til rygter om GutBuster Gluttons." },
    { navn: "Nuffles Bandager", tekst: "Til når apotekeren er løbet hjem i første halvleg." },
    { navn: "Trolddommerforeningen", tekst: "Vi ser intet. Vi hører intet. Vi tager imod bestikkelse." },
    { navn: "Gnoblar-Ekspressen", tekst: "Hurtig levering. Pakken lander. Budet gør måske ikke." },
    { navn: "Golthorns Slægtsforskning", tekst: "Vi finder elverblod i alle, der betaler. Spørg pressechefen." }
  ],

  // BETA-undskyldninger: vises ved BETA-stemplet og på forsiden.
  beta: [
    "Fejl på siden skyldes Nuffle.",
    "Testet af gnoblarer. De fleste overlevede.",
    "Går noget i stykker, er det en feature. Spørg Otto.",
    "Kodet med Mighty Blow. Fejlene har Regeneration.",
    "Siden er ikke godkendt af dommeren. Han blev bestukket af en anden side.",
    "Får du en fejl, er det en turnover. Næste coach.",
    "Klager over siden modtages efter kick-off. Af Gunnar Grådig. Måske.",
    "Rul en d6. På 1 virker siden ikke. På 2-6 virker den sikkert heller ikke helt.",
    "Siden er bygget med elverpræcision. Pressechefen siger, at det ligger til familien."
  ],

  // "Citater" fra kendte Star Players. Opdigtede, med et glimt i øjet.
  citater: [
    { hvem: "Morg 'n' Thorg", tekst: "Jeg tæller ikke touchdowns. Jeg tæller dem, der stadig står op." },
    { hvem: "Griff Oberwald", tekst: "Mit hår har flere fans end de fleste hold. Det er ikke pral, det er statistik." },
    { hvem: "The Mighty Zug", tekst: "Taktik? Jeg løber ligeud. Det har virket hver gang, undtagen de gange det ikke gjorde." },
    { hvem: "Akhorne the Squirrel", tekst: "Nødder! NØDDER! … Undskyld, hvad var spørgsmålet?" },
    { hvem: "Lord Borak the Despoiler", tekst: "Jeg kom for at plyndre. Bolden var bare med i købet." },
    { hvem: "Deeproot Strongbranch", tekst: "Jeg har stået stille i tre hundrede år. En halvleg mere gør ingen forskel." },
    { hvem: "Grashnak Blackhoof", tekst: "Rødt kort? Rødt er min yndlingsfarve." },
    { hvem: "Bomber Dribblesnot", tekst: "Det var ikke en bombe. Det var en meget hurtig aflevering." },
    { hvem: "Hakflem Skuttlespike", tekst: "Fire arme. Én bold. Ingen skrupler." },
    { hvem: "Varag Ghoul-Chewer", tekst: "Jeg spiser ikke modstanderne. Ikke i første halvleg." },
    { hvem: "Kreek Rustgouger", tekst: "Min kugle og kæde er helt lovlig. Spørg dommeren, hvis du kan finde ham." },
    { hvem: "Glart Smashrip", tekst: "Ét skridt ad gangen. Helst hen over nogen." },
    { hvem: "Grim Ironjaw", tekst: "En dværg glemmer aldrig. Især ikke en foul." },
    { hvem: "Roxanna Darknail", tekst: "Jeg undviger ikke tacklinger. Tacklinger undviger mig." },
    { hvem: "Bertha Bigfist", tekst: "Jeg er ikke sur. Jeg er bare sulten. Det ser ens ud." }
  ],

  // Spike! Magazine elsker GutBuster Gluttons. Det er ikke til at skjule.
  spike: [
    "ELVERKNÆK-ALARM: Taskmaster Flemming set med stetoskop ved elvernes træningsbane. Han »lytter efter den rigtige lyd«.",
    "Apotekere melder om rekordsalg af benskinner i elverkvarteret. Taskmaster Flemming nægter at kommentere, men han smiler.",
    "Black Mountain Slavers' nye kampråb er afsløret: »Det kan kendes på knækket!« Elverne er ikke imponerede. De er bange.",
    "BESTIKKELSE? Spike! har fulgt pengebæltet fra Taskmaster Flemming til kommissærens kontor. Derefter mistede vi sporet. Og vores reporter.",
    "AFSLØRET: Pressechef Gunnar Grådig påstår at være i familie med The Eternal Sages. Elverne har ikke kommenteret. De har ikke opdaget ham.",
    "EKSKLUSIVT: GutBuster Gluttons spiste hele buffeten FØR kick-off. Eksperter kalder det mental opvarmning.",
    "Spike! kårer GutBuster Gluttons til ligaens mest fotogene hold. For 14. uge i træk.",
    "Læserafstemning: 97 % mener, at Gluttons fortjener flere point. De sidste 3 % ligger stadig på skadestuen.",
    "Gnoblar taler ud: »Det er en ære at blive kastet af en Ogre. Landingen er mindre ærefuld.«",
    "Holdets kok: »Jeg har aldrig set et hold tackle så godt efter dessert.«",
    "Ogre-eksperten om Gluttons' taktik: enkel, ærlig og ekstremt tung.",
    "Rygte: Gluttons har ansat en ernæringsekspert. Han er sidst set i nærheden af grillen.",
    "Spike! afslører: Modstandere træner nu ekstra, alene ved synet af Gluttons' frokostmenu.",
    "OVERBELLY BENÆGTER KANNIBALISME FOR SJETTE SÆSON I TRÆK.",
    "RUNTS KRÆVER SIKRERE ARBEJDSPLADS. LEDELSEN BESTILLER NY KATAPULT.",
    "GLUTTONS PRÆSENTERER NYT TAKTISK SYSTEM. DET ER AT SLÅ.",
    "RUNT #8 OPFINDER LØB.",
    "Otto Overbelly om statistik: »Statistik slår ikke folk.« Spike!s analytikere er stadig ved at tolke udtalelsen.",
    "Assistenttræner meldt savnet. Klubben ønsker ikke at spekulere."
  ]
};
