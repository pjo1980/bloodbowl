// Blood Bowl-humor til siden. Ret, slet eller tilføj frit: siden vælger tilfældigt fra listerne.
// Alt her er satire og skrevet til siden (ikke kopieret fra Games Workshops bøger).
// Kommissærens ord hører IKKE hjemme her: de kommer kun fra hans egen Nyheder-fane.
window.HUMOR = {
  yndlingshold: "GutBuster Gluttons",

  // Opdigtet figur. Navnet kan frit skiftes.
  pressechef: { navn: "Gunnar Grådig", titel: "Ligaens pressechef (100 % neutral)" },

  // Gunnar har "opdaget", at han er i familie med The Eternal Sages, og fedter for elverne (Peter 9. nov.).
  // Spillernavnene (Golthorn IX, Taln, Bradur VI, Raelth) kommer fra coachens eget Spike!-interview.
  // Vises på forsiden og stillingen (af og til), på Sages' holdside og i Sages' kampreferater.
  elverfamilie: {
    hold: "The Eternal Sages",
    linjer: [
      "Pressechefen kan afsløre, at hans oldemor engang stod i kø bag Golthorn III. Slægtsforskere kalder det et svagt bånd. Pressechefen kalder det blod.",
      "Golthorn IX er min fætter. En meget fjern fætter. Så fjern, at han ikke ved det endnu.",
      "Mine ører er spidse. Det kan bare ikke ses under hatten.",
      "Pressechefen er stadig 100 % neutral. Han er bare også 3 % elver.",
      "Taln tackler ikke. Han omfavner med eftertryk. Det ligger til familien.",
      "Bradur VI kaster som min farfar. Han kastede også med ting. Mest tallerkener.",
      "GutBuster Gluttons er mit hjerte. The Eternal Sages er bare min stamtavle.",
      "Pressechefen har sendt Raelth et julekort, underskrevet “Din kære fætter, Gunnar Grådig-Golthorn”.",
      "Raelth har ikke svaret på mine breve. Det er typisk elverbeskedenhed. Det har jeg også.",
      "Pressechefen har spist med kniv og gaffel en hel uge for at øve sig i at være elver. Gaflen overlevede ikke.",
      "Pressechefen har bestilt et stamtræ. Det er ikke færdigt, men grenene mod The Eternal Sages er allerede malet med guld.",
      "Elvere ældes ikke. Det gør jeg heller ikke. Jeg bliver bare bredere. Det er samme gen.",
      "Jeg er ikke blevet elverfan. Jeg er blevet elverfamilie. Det er noget helt andet, og det er helt neutralt.",
      "Pressechefen har lært at sige “tillykke” på elversk. Han har endnu ikke lært at sige det uden smuler i skægget."
    ],
    // Til kampreferater, hvor Sages er med (vinder / taber / uafgjort).
    vandt: "Pressechefen fældede en tåre over sejren. “Blod er tykkere end sovs,” siger han. Det er første gang, han har sagt det.",
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
