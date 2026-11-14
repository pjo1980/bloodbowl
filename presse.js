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
    "id": "web-1794636044885",
    "hold": "The Maurading Ocras",
    "type": "Interview",
    "dato": "2026-11-14",
    "titel": "Blod, løgne og en meget lang ferie",
    "undertitel": "Interview",
    "sted": "Kenny Clickbaits sidste interview med GrimStone the Merciless",
    "coach": "GrimStone the Merciless",
    "indsendt": "Indsendt af holdets coach",
    "citat": {
      "hvem": "GrimStone",
      "tekst": "Kenny, jeg forventer ikke vold. Jeg forlanger den."
    },
    "replikker": [
      {
        "p": "En eksklusiv udsendelse fra Gunnar Grådigs sportsredaktion – fire dage efter Marauding Ocras' nederlag på 1-2 til The Eternal Sages."
      },
      {
        "afsnit": "Redaktionel meddelelse fra Gunnar Grådig"
      },
      {
        "p": "Det følgende interview blev gennemført af vores udsendte journalist, Kenny Clickbait, fire dage efter Marauding Ocras' seneste kamp."
      },
      {
        "p": "Interviewet skulle oprindeligt have været bragt direkte på Cabalvision, men cheftræner GrimStone the Merciless havde insisteret på, at der skulle gå mindst fire dage efter kampen, før han ville modtage pressen."
      },
      {
        "p": "Vi antager, at dette var for at give ham tid til at falde til ro."
      },
      {
        "p": "Tre dage efter det planlagte interview modtog redaktionen en pakke indeholdende Kennys Whisper-Boks, indsmurt i noget, som vores retsmedicinske afdeling har identificeret som blod. Sandsynligvis menneskeblod."
      },
      {
        "p": "Vedlagt var en lille seddel, skrevet med en påfaldende barnagtig håndskrift:"
      },
      {
        "p": "\"Kenny Clickbait har sagt op. Han er taget på ferie. Han kommer ikke tilbage. Hilsen Kenny.\""
      },
      {
        "p": "Efter adskillige timers overtalelse, to eksorcister og en betydelig mængde helligt vand lykkedes det redaktionen at få den stærkt traumatiserede ånd i Whisper-Boksen til at gengive interviewet."
      },
      {
        "p": "Ånden nægter efterfølgende at tale mere og skriger, hver gang nogen nævner ordet \"GrimStone\"."
      },
      {
        "p": "Vi bringer her interviewet i sin helhed."
      },
      {
        "afsnit": "Interviewet"
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Først og fremmest, GrimStone, tak fordi du ville tage dig tid til at tale med os. Hvordan har du det her fire dage efter nederlaget til The Eternal Sages?",
        "rolle": "Udsendt journalist, Gunnar Grådigs sportsredaktion"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Bedre.",
        "rolle": "Cheftræner, The Maurading Ocras"
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Det er godt at høre!"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Lægen siger, at jeg snart må begynde at bruge min højre hånd igen."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Åh... var du kommet til skade under kampen?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Nej."
      },
      {
        "scene": "En længere pause følger. Ifølge Whisper-Boksen kan man høre Kenny rømme sig."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Nå, men lad os tale lidt om kampen. I tabte 1-2 til The Eternal Sages, men det lykkedes jer trods alt at påføre dem hele tre casualties i anden halvleg. Er det noget, du er tilfreds med?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Tilfreds? Nej. Men tre casualties er tre smukke små ofringer til Blodguden. Tre øjeblikke, hvor mine små englebasser endelig huskede, hvad de var skabt til."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Så du ser det som et fremskridt?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Sidste sæson kunne mine spillere ikke engang knække en tør kiks uden at få en forstuvning. Så ja, Kenny. Jeg vil kalde det et fremskridt."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Det må være en lettelse efter sidste sæsons resultater?"
      },
      {
        "scene": "Der bliver stille."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Kenny..."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Ja?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Vi taler ikke om sidste sæson."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Nej. Selvfølgelig ikke."
      },
      {
        "afsnit": "En meget uheldig Lovebug"
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Lad os skifte emne. Rygterne vil vide, at du fyrede Kragor umiddelbart efter kampen?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Hvem?"
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Kragor. Nummer 7. Lovebug?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Åååh, Lovebug! Ja, naturligvis. Min lille Lovebug."
      },
      {
        "scene": "GrimStone sukker næsten kærligt."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Det er sandt. Han blev fyret lige efter kampen. Faktisk var han død for mig i samme sekund, han lod sig skubbe ud over sidelinjen af en elver."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Ja, netop. Og rygterne vil vide, at Lovebug pådrog sig nogle frygtelige skader, da han landede blandt publikum."
      },
      {
        "scene": "GrimStone løfter langsomt det ene øjenbryn og stirrer på Kenny."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Ja, altså... det er bare fordi... det var jo Marauding Ocras' egne fans, han landede iblandt. Så jeg undrer mig lidt..."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Jeg forstår ikke, hvad du mener."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Nej, naturligvis. Det var heller ikke for at antyde noget. Men jeg har faktisk haft svært ved at få historien bekræftet. Jeg har ikke kunnet finde Kragor... undskyld, Lovebug... nogen steder under mine forberedelser."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Jeg hører, at han er taget på ferie. Måske et sted i området omkring Caledor."
      },
      {
        "scene": "Ifølge Whisper-Boksen begynder GrimStone her ganske henkastet at nusse et kranie, der står på hans skrivebord."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Ja... øhh... Caledor? I Ulthuan?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Smukt sted, har jeg hørt. Elverne sætter stor pris på personlige gaver."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Og... er det et nyt kranie, du har stående dér?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Ja. En afskedsgave fra en gammel ven."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Nå... hvor betænksomt."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Han var altid sådan en sød lille Lovebug."
      },
      {
        "scene": "Der følger elleve sekunders stilhed."
      },
      {
        "afsnit": "Sweetums og den døde elver"
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Hvis vi vender tilbage til kampen, så må vi tale om Sweetums. Sikke en tackling, han lavede på Ilthien III! Et øjeblik så det ud, som om Ilthiens karriere i Blood Bowl var slut."
      },
      {
        "scene": "En svag, tilfreds latter høres fra GrimStone."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Den elver var død."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Undskyld?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Død, Kenny. Ikke skadet. Ikke bevidstløs. DØD. Jeg ved ikke, hvad elverne gjorde ved ham bagefter, men han var død. Det ved jeg."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Hvordan kan du være så sikker?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Jeg har set nok sjæle forlade deres kroppe til at genkende det, når jeg ser det. Og det, Sweetums gjorde ved den elver, overlever man ikke."
      },
      {
        "scene": "GrimStone læner sig frem."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Jeg så lyset forlade hans øjne. Det smukke, vidunderlige øjeblik, hvor kroppen indser, at den ikke længere har brug for sin ejer."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Men Ilthien overlevede jo?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Det påstår elverne."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Så du mener, de har snydt?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Jeg mener, at nogen har blandet sig i et fuldendt stykke arbejde. Om det var magi, nekromanti eller en af deres forbandede elverguder, ved jeg ikke. Men Sweetums slog ham ihjel. Det var et smukt øjeblik, og de stjal det fra os."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Hvordan tog Sweetums det?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Han græd."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Græd?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Af skuffelse, Kenny. Min lille Sweetums havde endelig gjort far stolt, og så rejser hans gave til Khorne sig bare op igen."
      },
      {
        "scene": "GrimStone sukker."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Jeg måtte love ham, at han nok skulle få lov at prøve igen."
      },
      {
        "afsnit": "Khornes små kæledægger"
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Der er noget andet, vores seere længe har undret sig over. Hvorfor giver du dine spillere navne som Sweetums, Honeybun og Snuggles? Det er jo trods alt frygtindgydende krigere i Khornes tjeneste."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Frygtindgydende? Har du SET dem spille, Kenny?"
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Øh... ja?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Så ved du også, hvorfor de ikke fortjener deres gamle navne."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Men hvorfor lige kælenavne?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Fordi jeg elsker mine små drenge, Kenny."
      },
      {
        "scene": "Whisper-Boksen registrerer en langsom, metallisk skraben."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Når en kriger træder ind på mit hold, efterlader han sit gamle navn, sin stolthed og enhver forestilling om personlig værdighed ved døren. Han bliver min. Og jeg bestemmer, hvad mine små kæledægger skal hedde."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Men bliver de ikke ydmyget af det?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Jo."
      },
      {
        "scene": "En kort pause."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Er det ikke vidunderligt?"
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Og spillerne accepterer det?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Honeybun protesterede engang. Han mente, at navnet ikke passede til en kriger af hans kaliber."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Hvad skete der?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Nu elsker han sit navn."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Hvordan fik du ham overtalt?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Vi havde en lang samtale. Meget intim. Meget lærerig."
      },
      {
        "scene": "GrimStone ler sagte."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Han kan stadig ikke høre ordet 'skat' uden at begynde at ryste. Det er ganske bedårende."
      },
      {
        "afsnit": "Tre casualties. En halvleg for sent."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Lad os afslutningsvis tale om fremtiden. De tre casualties i anden halvleg må trods alt give dig noget at bygge videre på?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Bestemt. Mine små sukkertoppe har vist, at der stadig flyder blod i deres årer. Og endnu vigtigere, at de er i stand til at få det til at flyde ud af andres."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Så vi kan forvente et mere voldsomt Marauding Ocras fremover?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Kenny, jeg forventer ikke vold. Jeg forlanger den."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Og målet er stadig at vinde ligaen?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Selvfølgelig. Men jeg vil hellere tabe en kamp med elleve modstandere på lazarettet end vinde en kamp, hvor alle elverne kan danse hjem til deres små silkepuder bagefter."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Det er jo en interessant prioritering."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Det er ikke en prioritering. Det er en trosbekendelse."
      },
      {
        "p": "Her burde interviewet være afsluttet."
      },
      {
        "p": "Men Kenny Clickbait var aldrig en mand, der lod en god overskrift gå til spilde."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Bare ét sidste spørgsmål, GrimStone."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Du har allerede stillet flere, end jeg havde håbet."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Jo, men nu nævnte du selv volden. I fik ganske rigtigt tre casualties i anden halvleg mod The Eternal Sages, men i første halvleg fik I jo ikke en eneste."
      },
      {
        "scene": "Stilhed."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Og hvis vi nu ser på sidste sæson, hvor I heller ikke rigtig formåede at skade nogen, og hvor I til sidst tabte selve tabernes taberkamp..."
      },
      {
        "scene": "En stol knirker."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "... så er spørgsmålet vel, hvordan du vil sikre dig, at Marauding Ocras ikke igen ender som ligaens absolutte tabere? For er der ikke en reel risiko for, at holdet endnu en gang bliver mere kendt for at få tæsk end for at dele dem ud?"
      },
      {
        "scene": "Whisper-Boksen registrerer 19 sekunders fuldstændig stilhed."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Kenny."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Ja?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "Ved du, hvad forskellen er på første og anden halvleg?"
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Øh... nej?"
      },
      {
        "hvem": "GrimStone",
        "tekst": "I første halvleg var jeg tålmodig."
      },
      {
        "scene": "Lyden af en tung stol, der bliver skubbet bagud."
      },
      {
        "hvem": "GrimStone",
        "tekst": "I pausen forklarede jeg mine små skattemus, hvad der ville ske, hvis de ikke begyndte at levere blod til Blodguden."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Ja, og det virkede jo tydeligvis..."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Tre casualties, Kenny. Tre. Og alligevel sidder du her og spørger mig, hvordan jeg vil undgå endnu en ydmygelse."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "Jeg mener bare, at seerne nok gerne vil vide..."
      },
      {
        "hvem": "GrimStone",
        "tekst": "Så lad os give dem et svar."
      },
      {
        "scene": "Lyden af tunge skridt."
      },
      {
        "hvem": "Kenny Clickbait",
        "tekst": "GrimStone? Hvad laver du?"
      },
      {
        "p": "Herefter fik vi ikke mere ud af ånden, og har måttet kassere whisper-boksen."
      },
      {
        "afsnit": "Efterskrift fra Gunnar Grådigs redaktion"
      },
      {
        "p": "Gunnar Grådig ønsker at understrege, at Kenny Clickbait officielt er registreret som værende på ubestemt ferie."
      },
      {
        "p": "Vi har forsøgt at kontakte Marauding Ocras for en kommentar til interviewet, men modtog alene følgende skriftlige svar:"
      },
      {
        "p": "\"Kenny havde en dejlig tid. Han var meget åben til sidst. Vi ønsker ham alt godt på hans rejse.\""
      },
      {
        "p": "Svaret var underskrevet: GrimStone the Merciless, cheftræner, Marauding Ocras"
      },
      {
        "p": "Gunnar Grådigs sportsredaktion søger i øjeblikket en ny Blood Bowl-korrespondent."
      },
      {
        "p": "Erfaring er ikke nødvendig. Livsforsikring anbefales."
      },
      {
        "p": "Blod til Blodguden. Kranier til Kranietronen."
      }
    ]
  },
  {
    "id": "web-1794637498029",
    "hold": "The Eternal Sages",
    "type": "Rygte",
    "dato": "2026-11-14",
    "titel": "Mystisk udskiftning? Er Ilthien III i virkeligheden død?",
    "undertitel": "Rygte",
    "indsendt": "Indsendt af holdets coach",
    "citat": {
      "hvem": "Rygtet",
      "tekst": "Hvad indeholdt kassen? Og hvorfor ligner Ilthien pludselig ikke helt sig selv?"
    },
    "replikker": [
      {
        "p": "Vedholdende rygter hævder, at Ilthien III har lidt en permanent skæbne og i al hemmelighed er blevet erstattet af sin yngre bror!"
      },
      {
        "p": "Flere fans har bemærket, at Ilthien på det seneste ser mistænkeligt anderledes ud. Mistanken blev kun yderligere næret, da øjenvidner berettede om en mystisk kasse, der blev leveret til Return Of The Living Deadbeats' træningsfaciliteter midt om natten efter opgøret mellem The Marauding Ocras og The Eternal Sages."
      },
      {
        "p": "Hvad indeholdt kassen? Og hvorfor ligner Ilthien pludselig ikke helt sig selv?"
      },
      {
        "p": "Hverken coach Raelth eller Michael Moulder har ønsket at kommentere sagen, og ingen har endnu haft modet til at stille GrimStone et eneste spørgsmål."
      },
      {
        "p": "Om der er tale om et kynisk identitetstyveri, en familiehemmelighed eller blot endnu et tilfælde af usædvanligt fremskreden nekromantisk personalepolitik, står hen i det uvisse."
      }
    ]
  },
  {
    "id": "spike-the-maurading-ocras-vs-the-eternal-sages",
    "hold": "The Eternal Sages",
    "type": "Kampreferat",
    "dato": "2026-11-11",
    "titel": "»Golthorn IX tager sagen i egne hænder – to gange!«",
    "undertitel": "Spike! kampreferat",
    "sted": "The Maurading Ocras 1-2 The Eternal Sages",
    "indsendt": "Skrevet af Spike! Magazine ud fra kommissærens kampskema",
    "citat": {
      "hvem": "Spike!",
      "tekst": "Tre skader til Ocras, ét touchdown. Tre skader giver altså ikke tre point, drenge – vi har tjekket regelbogen!"
    },
    "replikker": [
      {
        "p": "DAMER OG HERRER, TROLDE OG GOBLINS! The Eternal Sages har snoet sig ud af Khornes favntag med en 2-1-sejr over The Maurading Ocras!"
      },
      {
        "p": "Manden i centrum: Golthorn IX! Begge Sages-touchdowns kom fra den elegante elvers fingerspidser. To scoringer, nul hårtotter i uorden. Bradur VI leverede kampens eneste completion, og hvis man kun har brug for én, hvorfor så spilde flere?"
      },
      {
        "p": "Ocras gjorde, hvad Ocras gør: de slog! Snuggles, Sweetums og Peaches stod for én skade hver – et nydeligt hattrick af knusende omfavnelser fra spillere med navne som plyslegetøj. Tre skader til Ocras, ét touchdown. Tre skader giver altså ikke tre point, drenge – vi har tjekket regelbogen! Honeybun scorede Ocras’ eneste touchdown, og Dreamboat blev kåret som holdets MVP."
      },
      {
        "p": "Hos Sages fik Ilthien III MVP-æren, mens Malth må tilbringe næste kamp i apothecariens telt med en kop urtete. Nuffle giver, Nuffle tager!"
      },
      {
        "p": "Kassen: 70.000 guld til Eberhards Sages og 60.000 til GrimStones Ocras. Hvis Ocras investerer det i en regelbog, kan det blive farligt."
      },
      {
        "hvem": "Gunnar Grådig",
        "rolle": "Ligaens pressechef",
        "tekst": "Jeg er selvfølgelig 100 % neutral. Men at min kære fætter Golthorn IX scorer to gange, og at onkel Bradur VI kaster præcis så mange afleveringer, som der er brug for … det siger vel bare noget om familiens gener. Hilsen til Raelth!"
      },
      {
        "p": "Læs også coachens eget referat på Presse-siden."
      }
    ]
  },
  {
    "id": "web-1794404445437",
    "hold": "The Full Moon Foulers",
    "type": "Interview",
    "dato": "2026-11-11",
    "titel": "»Et lig? Nein, nein ... en råvare!«",
    "undertitel": "Interview",
    "coach": "Herr Doktor von Cünthenstien",
    "indsendt": "Indsendt af Herr Doktor von Cünthenstien",
    "forside": "forsider/web-1794404445437.jpg",
    "citat": {
      "hvem": "Herr Doktor von Cünthenstien",
      "tekst": "Jeg forsøgte etik én gang. Den nægtede at rejse sig fra operationsbordet."
    },
    "replikker": [
      {
        "hvem": "Spike!",
        "rolle": "Spike! Magazine",
        "tekst": "Herr Doktor von Cünthenstien, hvad er Deres ambitioner for The Full Moon Foulers denne sæson?"
      },
      {
        "hvem": "Herr Doktor von Cünthenstien",
        "tekst": "Ambitioner? ACH! Jeg ønsker resultater! Data! Og friske lig! Især det sidste. Pokaler samler støv. Zombier samler … reservedele.",
        "rolle": "Cheftræner, The Full Moon Foulers"
      },
      {
        "hvem": "Spike!",
        "tekst": "Så De håber på sejre?"
      },
      {
        "hvem": "Herr Doktor von Cünthenstien",
        "tekst": "Jaa jaa. Men jeg studerer mest modstanderne. Orker har fremragende skuldre. Dværge har vidunderligt kompakte knogler. Elvere … mmm, lange lemmer, lav fedtprocent. Meget elegant zombiemateriale!"
      },
      {
        "hvem": "Spike!",
        "tekst": "Det lyder ikke særligt etisk."
      },
      {
        "hvem": "Herr Doktor von Cünthenstien",
        "tekst": "Etik?! HAHAHA! Jeg forsøgte etik én gang. Den nægtede at rejse sig fra operationsbordet. Ubrugeligt fagområde."
      },
      {
        "hvem": "Spike!",
        "tekst": "Er der nogen modstandere, De særligt glæder Dem til at møde?"
      },
      {
        "hvem": "Herr Doktor von Cünthenstien",
        "tekst": "Absolut! Jeg mangler stadig en Skaven-zombie. Forestil Dem det! Hurtig, rådden og muligvis med halen stadig funktionel! Og en Ogre-zombie ville være magnifik. Jeg skal bare bruge en meget stor spand … og flere elektroder."
      },
      {
        "hvem": "Spike!",
        "tekst": "Har spillerne selv noget at skulle have sagt?"
      },
      {
        "hvem": "Herr Doktor von Cünthenstien",
        "tekst": "Natürlich! De må vælge mellem »Ja, Herr Doktor« og »AAAAARGH!« Begge svar betragtes som informeret samtykke."
      },
      {
        "hvem": "Spike!",
        "tekst": "Et sidste ord til ligaens øvrige hold?"
      },
      {
        "hvem": "Herr Doktor von Cünthenstien",
        "tekst": "Ja. Spil hårdt. Tag chancer. Og hvis De føler en pludselig smerte i brystet … PRØV VENLIGST IKKE AT BESKADIGE ORGANERNE!"
      },
      {
        "scene": "Interviewet sluttede, da Herr Doktor begyndte at måle reporterens lårben og mumle: »Hmm … perfekt til en reserve-runner.«"
      }
    ]
  },
  {
    "id": "web-1794396696309",
    "hold": "The Eternal Sages",
    "type": "Kampreferat",
    "dato": "2026-11-11",
    "titel": "De slog os ned. Vi vandt kampen. Forskellen er tydelig",
    "undertitel": "Kampreferat",
    "sted": "The Maurading Ocras 1-2 The Eternal Sages",
    "coach": "Raelth",
    "indsendt": "Indsendt af holdets coach",
    "forside": "forsider/web-1794396696309.jpg",
    "citat": {
      "hvem": "Raelth",
      "tekst": "Hvorfor skulle mine spillere risikere deres fine hænder, når der sidder tusindvis af frivillige på tribunen? Det kaldes delegering."
    },
    "replikker": [
      {
        "p": "Spike! møder Raelth efter The Eternal Sages’ dramatiske 2-1-sejr over The Maurading Ocras."
      },
      {
        "scene": "Der lugter af blod, sved og dyr parfume uden for The Eternal Sages’ omklædningsrum. Indenfor ligger flere High Elves på brikse, mens holdets healere arbejder febrilsk. Midt i kaosset står cheftræner Raelth upåvirket med et glas vin i hånden."
      },
      {
        "hvem": "Spike!",
        "rolle": "Spike! Magazine",
        "tekst": "Raelth, tillykke! 2-1 over Khorne-holdet The Maurading Ocras. Det blev langt mere dramatisk, end mange havde forventet."
      },
      {
        "hvem": "Raelth",
        "tekst": "Gjorde det?\nJeg synes egentlig, kampen fulgte den forventede udvikling ganske præcist.\nDe slog på os. Vi spillede Blood Bowl. Vi vandt 2-1.",
        "rolle": "Cheftræner, The Eternal Sages"
      },
      {
        "hvem": "Spike!",
        "tekst": "I skal dog have ros for at holde stand. Flere af dine spillere blev slået ud under kampen."
      },
      {
        "hvem": "Raelth",
        "tekst": "Ja, Khorne-hold er meget stolte af den slags."
      },
      {
        "hvem": "Spike!",
        "tekst": "De slog en hel del af dine spillere ud."
      },
      {
        "hvem": "Raelth",
        "tekst": "Og hvor mange touchdowns fik de for det?"
      },
      {
        "hvem": "Spike!",
        "tekst": "1."
      },
      {
        "hvem": "Raelth",
        "tekst": "Netop.\nMan får heller ikke ligapoint for savlen, råben eller imponerende armomkreds. Ellers ville Khorne naturligvis være en alvorlig konkurrent."
      },
      {
        "hvem": "Spike!",
        "tekst": "Til gengæld lykkedes det kun jer at skade én af deres spillere."
      },
      {
        "hvem": "Raelth",
        "tekst": "»Kun«?\nVi gjorde det med præcision."
      },
      {
        "hvem": "Spike!",
        "tekst": "Han blev skubbet ud over sidelinjen, hvorefter publikum slog ham til plukfisk."
      },
      {
        "hvem": "Raelth",
        "tekst": "Præcis.\nHvorfor skulle mine spillere risikere deres fine hænder, når der sidder tusindvis af frivillige på tribunen?\nDet kaldes delegering. Jeg forstår godt, hvis Khorne ikke kender konceptet."
      },
      {
        "afsnit": "Golthorn IX og bolden"
      },
      {
        "hvem": "Spike!",
        "tekst": "Lad os tale om kampens måske største chok. Golthorn IX tabte en bold!"
      },
      {
        "hvem": "Raelth",
        "tekst": "Ja."
      },
      {
        "hvem": "Spike!",
        "tekst": "En bold, der blev kastet direkte til ham."
      },
      {
        "hvem": "Raelth",
        "tekst": "Jeg var der."
      },
      {
        "hvem": "Spike!",
        "tekst": "Og han tabte den."
      },
      {
        "hvem": "Raelth",
        "tekst": "Det er korrekt."
      },
      {
        "scene": "Raelth tager en lang slurk af sit glas."
      },
      {
        "hvem": "Raelth",
        "tekst": "Vi har iværksat en undersøgelse."
      },
      {
        "hvem": "Spike!",
        "tekst": "En undersøgelse?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Bolden var tydeligvis manipuleret."
      },
      {
        "hvem": "Spike!",
        "tekst": "Af hvem?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Formentlig en Skaven.\nJeg bemærkede straks en svag lugt af rotteolie."
      },
      {
        "hvem": "Spike!",
        "tekst": "Rotteolie?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Meget glat. Meget Skaven."
      },
      {
        "hvem": "Spike!",
        "tekst": "Kunne Golthorn IX ikke bare have … tabt bolden?"
      },
      {
        "scene": "Lang stilhed."
      },
      {
        "hvem": "Raelth",
        "tekst": "Jeg vil bede Spike! Magazine om ikke at sprede den slags absurde konspirationsteorier."
      },
      {
        "hvem": "Spike!",
        "tekst": "Men Golthorn kom stærkt tilbage. To touchdowns og begge jeres scoringer."
      },
      {
        "hvem": "Raelth",
        "tekst": "Naturligvis.\nStore spillere laver ikke fejl. De skaber dramatiske narrative forløb.\nGolthorn forstod tydeligvis, at publikum havde brug for spænding."
      },
      {
        "hvem": "Spike!",
        "tekst": "Det sidste touchdown var især bemærkelsesværdigt. Kampens sidste øjeblik, og næsten alt var imod ham."
      },
      {
        "hvem": "Raelth",
        "tekst": "Næsten alt.\nGolthorn IX var stadig på banen. Det gjorde beregningen ganske enkel."
      },
      {
        "hvem": "Spike!",
        "tekst": "De fleste ville nok sige, at oddsene var imod ham."
      },
      {
        "hvem": "Raelth",
        "tekst": "Odds er noget, mennesker bruger til at beskrive ting, High Elves endnu ikke har gjort.\nSekunder tilbage. Khorne-spillere overalt. Kampen på vippen. Og Golthorn scorer.\nJeg tror ærligt talt, at han gjorde det sværere med vilje."
      },
      {
        "hvem": "Spike!",
        "tekst": "Hvorfor?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Man husker ikke almindelige touchdowns."
      },
      {
        "afsnit": "Mesterskabet"
      },
      {
        "hvem": "Spike!",
        "tekst": "Efter endnu en sejr må selvtilliden være høj?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Selvtillid antyder en tro på egne evner.\nVi behøver ikke tro. Vi har beviser."
      },
      {
        "hvem": "Spike!",
        "tekst": "Så The Eternal Sages er stadig dine favoritter til mesterskabet?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Naturligvis.\nVi har nu bevist, at vi kan besejre Wood Elves i Blood Bowl og Khorne i noget, der kun lejlighedsvis mindede om Blood Bowl.\nJeg er faktisk ikke sikker på, hvad ligaen ellers ønsker af os."
      },
      {
        "hvem": "Spike!",
        "tekst": "Og hvis I taber næste kamp?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Så må vi undersøge boldene."
      },
      {
        "hvem": "Spike!",
        "tekst": "For rotteolie?"
      },
      {
        "hvem": "Raelth",
        "tekst": "Det er rart at se, at du endelig begynder at forstå sporten."
      }
    ]
  },
  {
    "id": "web-1794387977022",
    "hold": "Bros Being Bros",
    "type": "Kampreferat",
    "dato": "2026-11-11",
    "titel": "Tømmermænd og en dum trold?",
    "undertitel": "Kampreferat",
    "sted": "Træningskamp: Da Demolitionaz 1-1 Bros Being Bros",
    "indsendt": "Indsendt af Rygte Rasmus",
    "forside": "forsider/web-1794387977022.jpg",
    "citat": {
      "hvem": "Rygte Rasmus",
      "tekst": "Kampen sluttede 1-1 og før tid, fordi man ikke gad mere."
    },
    "replikker": [
      {
        "p": "Vi havde vores udsendte reporter på pletten til træningskampen mellem Da Demolitionaz og Bros Being Bros. Men han faldt i søvn af kedsomhed. Det gjorde nogle af spillerne vist også. De stod bare op og ned ad hinanden hele tiden."
      },
      {
        "p": "Kampen sluttede 1-1 og før tid, fordi man ikke gad mere."
      },
      {
        "p": "Det mest spændende var, at en goblin landede helt fint på fødderne efter at være kastet igennem luften."
      }
    ]
  },
  {
    "id": "web-1794313556304",
    "hold": "Bros Being Bros",
    "type": "Rygte",
    "dato": "2026-11-10",
    "titel": "Bagstive Bros havnet i træningsopgør mod orker!",
    "undertitel": "Rygte",
    "indsendt": "Indsendt af Rygte Rasmus",
    "forside": "forsider/web-1794313556304.jpg",
    "citat": {
      "hvem": "Rygte Rasmus",
      "tekst": "Det bliver latterligt eller LEGENDARISK!"
    },
    "replikker": [
      {
        "p": "Efter en mega hed fest til langt ud på den efterfølgende eftermiddag har Bros Being Bros åbenbart rodet sig ud i et væddemål om at spille mod ligaens smadrehold, Da Demolitionaz."
      },
      {
        "p": "Det bliver latterligt eller LEGENDARISK!"
      }
    ]
  },
  {
    "id": "web-1794249217162",
    "hold": "GutBuster Gluttons",
    "type": "Rygte",
    "dato": "2026-11-09",
    "titel": "Breaking! Gnoblars nedlægger arbejdet! Ogres i panik!",
    "undertitel": "Rygte",
    "indsendt": "Indsendt af holdets coach",
    "forside": "forsider/web-1794249217162.jpg",
    "citat": {
      "hvem": "Gunnar Grådig",
      "tekst": "Jeg er 100 % neutral, men det her er en humanitær katastrofe. Send sovs."
    },
    "replikker": [
      {
        "p": "GutBuster Gluttons’ ogrer har nu misset både frokost og aftensmad, fordi gnoblarerne strejker."
      },
      {
        "p": "Køkkenet står koldt, spisekammeret er låst, og ingen ved, hvor nøglen er."
      },
      {
        "p": "Det er første gang i holdets historie, at en ogre har været sulten i mere end en halv time. Holdlægen betegner situationen som kritisk og frygter for både moralen og mavesækkene."
      },
      {
        "hvem": "Gunnar Grådig",
        "rolle": "Ligaens pressechef",
        "tekst": "Jeg er 100 % neutral, men det her er en humanitær katastrofe. Send sovs."
      }
    ]
  },
  {
    "id": "coach-1192026153042",
    "hold": "The Eternal Sages",
    "type": "Rygte",
    "dato": "2026-11-09",
    "titel": "Ligaens bedste mod ligaens vildeste!",
    "undertitel": "Rygte",
    "indsendt": "Indsendt af Rygte Rasmus",
    "forside": "forsider/sages-orcas-rygte.jpg",
    "citat": {
      "hvem": "Rygte Rasmus",
      "tekst": "Træneren for Orcas lignede et frådende vilddyr."
    },
    "replikker": [
      {
        "p": "Der er lagt op til et brag af en kamp, når The Eternal Sages og The Marauding Orcas efter planen møder hinanden på tirsdag."
      },
      {
        "p": "Det bliver den elegante og spektakulære spillestil mod det brutale, dødsensfarlige voldsorgie."
      },
      {
        "p": "Desværre har det ikke været muligt at tale med hverken den ene eller den anden træner. Raelth var stadig i gang med at feste efter sejren over Elmtree Evaders. Træneren for Orcas lignede et frådende vilddyr, og vi har ikke set vores udsendte reporter, siden han forsøgte at stille træneren nogle spørgsmål."
      }
    ]
  },
  {
    "id": "coach-118202660211",
    "hold": "Black Mountain Slavers",
    "type": "Rygte",
    "dato": "2026-11-08",
    "titel": "Knæk, knas og korruption! Taskmaster Flemming vil have flere elvere at smadre!",
    "undertitel": "Rygte",
    "sted": "Af Gunnar Grådig, pressechef og indehaver af ligaens mest upålidelige kilder",
    "coach": "Taskmaster Flemming",
    "indsendt": "Indsendt af holdets coach",
    "citat": {
      "hvem": "Taskmaster Flemming",
      "tekst": "Det lyder så skønt, når deres knogler knækker. Det kan kendes på knækket!"
    },
    "replikker": [
      {
        "p": "Der går grimme rygter i Ligaens mørke omklædningsrum. Og denne gang handler det hverken om ulovlige våben, dopede gobliner eller en halfling, der er blevet spist af sin egen holdkammerat."
      },
      {
        "p": "Nej, denne gang handler det om Taskmaster Flemming og hans angiveligt sygelige fascination af lyden af knækkende elverknogler!"
      },
      {
        "p": "Ifølge flere særdeles tvivlsomme kilder har Taskmasteren højlydt beklaget sig over, at der kun er TO elverhold i Ligaen, og ingen i hans pulje."
      },
      {
        "hvem": "Taskmaster Flemming",
        "rolle": "Black Mountain Slavers",
        "tekst": "Det er simpelthen for dårligt! Hvordan skal man kunne nyde en ordentlig Blood Bowl-sæson, når der næsten ikke er nogen elvere at trampe på?"
      },
      {
        "scene": "Råbt under et møde, hvor flere tilstedeværende efterfølgende måtte behandles for høreskader."
      },
      {
        "p": "Og Flemming lægger som bekendt ikke skjul på sin kærlighed til elvernes skrøbelige anatomi."
      },
      {
        "hvem": "Taskmaster Flemming",
        "tekst": "Det lyder så skønt, når deres knogler knækker. Det kan kendes på knækket!"
      },
      {
        "p": "Et citat, der efter sigende er blevet gentaget så ofte, at selv Nuffle er begyndt at blive bekymret."
      },
      {
        "afsnit": "Bestikkelse i kommissærens lommer?"
      },
      {
        "p": "Men historien stopper ikke her!"
      },
      {
        "p": "Gunnar Grådig er kommet i besiddelse af oplysninger fra en anonym kilde, der hævder at have set Taskmaster Flemming forlade kommissærens kontor med et mistænkeligt tomt pengebælte og et endnu mere mistænkeligt stort smil."
      },
      {
        "p": "Rygtet vil vide, at Flemming har bestukket selveste kommissæren for at sikre sig kampe mod BEGGE ligaens elverhold!"
      },
      {
        "p": "Tilfældighed? Næppe!"
      },
      {
        "p": "Kommissæren afviser indtil videre alle beskyldninger, men har angiveligt netop fået råd til en ny guldbelagt Bloodweiser-tønde og en sommerresidens i Lustria."
      },
      {
        "p": "Da Gunnar Grådig forsøgte at få en kommentar fra Flemming, lød svaret angiveligt blot:"
      },
      {
        "hvem": "Taskmaster Flemming",
        "tekst": "Bestikkelse? Sikke noget vrøvl! Jeg støtter bare elvernes deltagelse i ligaen. De fortjener alle sammen en chance for at komme på banen ... og blive båret af den igen!"
      },
      {
        "afsnit": "Elverne frygter det værste"
      },
      {
        "p": "De to elverhold er endnu ikke kommet med en officiel udtalelse, men lokale apotekere melder allerede om stigende efterspørgsel på bandager, benskinner og testamentformularer."
      },
      {
        "p": "Om der virkelig er tale om korruption, eller om Nuffle blot har velsignet Flemmings blodtørstige ønsker, må tiden vise."
      },
      {
        "p": "Én ting er dog sikkert: Når Taskmaster Flemming siger, at han glæder sig til at møde elverne, er det næppe for at udveksle trøjer efter kampen."
      },
      {
        "p": "Dog kan der ingen tvivl være om, at de to elverhold også begge skal spille mod GutBuster Gluttons. Det har Nuffle skrevet i stjernerne."
      },
      {
        "hvem": "Gunnar Grådig",
        "rolle": "Pressechef",
        "tekst": "Vi bringer sandheden. Især når den kan sælge billetter."
      }
    ]
  },
  {
    "id": "spike-the-eternal-sages-vs-elmtree-evaders",
    "hold": "The Eternal Sages",
    "type": "Kampreferat",
    "dato": "2026-11-06",
    "titel": "»Elverkrigen i Sort Pulje går til Sages«",
    "undertitel": "Spike! kampreferat",
    "sted": "The Eternal Sages 2-1 Elmtree Evaders",
    "indsendt": "Skrevet af Spike! Magazine ud fra kommissærens kampskema",
    "citat": {
      "hvem": "Spike!",
      "tekst": "Begge hold var for fine til at svede. Kun det ene var fint nok til at vinde."
    },
    "replikker": [
      {
        "p": "Elverkrig i Sort Pulje! The Eternal Sages slog Elmtree Evaders 2-1. Begge hold var for fine til at svede. Kun det ene var fint nok til at vinde."
      },
      {
        "p": "Ilthien III og Golthorn IX scorede for Sages. Golthorn IX har tidligere fortalt Spike!, at han scorer, fordi det er hurtigere. Vi kan bekræfte, at det var det."
      },
      {
        "p": "Kampens eneste skade kom fra Taln, som også blev kåret som MVP. Spike! har engang kaldt ham en usædvanligt kulturel lineman. Kulturen har åbenbart knoer."
      },
      {
        "p": "Evaders gav ikke op. Oakenfist scorede holdets touchdown, og Lily Sunflower kastede tre completions. Tre! Det er flere, end de fleste katapulter klarer på en hel sæson."
      },
      {
        "p": "Kassen: 80.000 til Coach Eberhard og Sages, 70.000 til Coach Lasse og Evaders. Det rækker til mange fjer i hjelmene."
      },
      {
        "hvem": "Gunnar Grådig",
        "rolle": "Ligaens pressechef",
        "tekst": "To fremragende hold. Pressechefen er 100 % neutral og bemærker blot, at ingen af dem er GutBuster Gluttons."
      }
    ]
  },
  {
    "id": "spike-bedstefars-besudlere-vs-black-mountain-slavers",
    "hold": "Black Mountain Slavers",
    "type": "Kampreferat",
    "dato": "2026-11-06",
    "titel": "»Ét touchdown var nok«",
    "undertitel": "Spike! kampreferat",
    "sted": "Bedstefars Besudlere 0-1 Black Mountain Slavers",
    "indsendt": "Skrevet af Spike! Magazine ud fra kommissærens kampskema",
    "citat": {
      "hvem": "Spike!",
      "tekst": "Ét touchdown. Præcis ét mere, end Besudlerne kunne klare."
    },
    "replikker": [
      {
        "p": "Black Mountain Slavers vandt 1-0 over Bedstefars Besudlere i Gul pulje. Kampens eneste touchdown kom fra Igor Longblade. Det var præcis ét mere, end Besudlerne kunne klare."
      },
      {
        "p": "Gert Galdespreder stod for kampens eneste skade. Han kalder det angiveligt kunst. Spike! kalder det et CAS, men vi anerkender penselstrøget."
      },
      {
        "p": "Arschhier noterede et foul for Slavers. Ifølge Besudlernes eget referat var dommeren ikke imponeret."
      },
      {
        "p": "Ligaens husregel giver nye hold en ekstra MVP, så begge hold fik to. Razghul og Azathor for Slavers, Søren Svulmesæk og Finn Fluefjert for Besudlerne. Nuffle var gavmild. Apothecaryen var travl."
      },
      {
        "p": "Kassen: 40.000 til Coach Flemse og Slavers, 30.000 til Coach Svulst-Stank og Besudlerne. Det rækker til nye bandager. Eller én rigtig god flaske desinfektion."
      },
      {
        "p": "Læs også coachens eget referat på Presse-siden."
      },
      {
        "hvem": "Gunnar Grådig",
        "rolle": "Ligaens pressechef",
        "tekst": "Pressechefen er 100 % neutral. Han bemærker blot, at GutBuster Gluttons aldrig har tabt til Black Mountain Slavers. De har heller ikke mødt dem endnu."
      }
    ]
  },
  {
    "id": "besudlere-slavers-kampreferat",
    "hold": "Bedstefars Besudlere",
    "type": "Interview",
    "dato": "2026-11-06",
    "titel": "»Det var ikke ild. Det var et fejt trick!«",
    "undertitel": "Kampreferat",
    "sted": "Black Mountain Slavers 1-0 Bedstefars Besudlere · Et eksklusivt interview med Coach Svulst-Stank",
    "coach": "Coach Svulst-Stank",
    "indsendt": "Indsendt af holdets coach",
    "citat": {
      "hvem": "Coach Svulst-Stank",
      "tekst": "Han. Snublede."
    },
    "replikker": [
      {
        "p": "Et flammende overfald, en hobgoblin med et svuppende kranie og et sidste desperat forsøg på at redde æren."
      },
      {
        "p": "Der var både blod, galde, brækkede knogler og tvivlsomme dommerkendelser, da Bedstefars Besudlere tørnede sammen med Black Mountain Slavers. Men da det sidste fløjt lød, var det de forhadte ko-dværge, der kunne forlade banen med en sejr på 1-0."
      },
      {
        "p": "Vi har efter kampen fået et eksklusivt interview med Besudlernes cheftræner, Coach Svulst-Stank, der trods nederlaget var i overraskende godt humør. Om det skyldtes tilfredshed med holdets indsats eller de mistænkelige dampe fra hans drikkedunk, står hen i det uvisse."
      },
      {
        "afsnit": "“Det var ikke ild. Det var et fejt trick!”"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Coach Svulst-Stank, et bittert 0-1-nederlag til Black Mountain Slavers. I havde bolden, I havde momentum, og så gik det hele pludselig op i flammer. Hvad skete der?",
        "rolle": "Pressen"
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "HVAD DER SKETE?! Den forbandede dværgeyngels Flamesmith, Azathor, besluttede sig for, at almindeligt Blood Bowl åbenbart ikke var beskidt nok! I tredje tur spyr den lille skorstensnisse ild direkte i ansigtet på Bent Betænt! BENT! Vores stolte Pestigor! Han havde bolden under kontrol, lige indtil hans øjenbryn, horn og bolden pludselig befandt sig tre forskellige steder!",
        "rolle": "Cheftræner, Bedstefars Besudlere"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Nogle ville mene, at ildsprøjtende dværge er en del af spillets charme."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "CHARME?! Ved du, hvad der er charmerende? En byld, der modnes langsomt i sommervarmen! Det dér var et fejt trick! Bent lugter stadig af brændt hår og svovl, og det siger ikke så lidt for en mand, der normalt lugter som indersiden af en pestbefængt kloak!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Bolden skiftede hænder, men Besudlernes forsvar kæmpede bravt for at forhindre scoringen."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Og det var et SMUKT forsvar! En mur af rådnende kød, betændte lemmer og dårligt humør! Men de forbandede ko-dværge fik alligevel presset sig igennem, og i sjette tur kunne Igor Longblade bringe dem foran 1-0. Det var mere, end jeg kunne holde ud at se på. Jeg kastede min drikkedunk efter dommeren."
      },
      {
        "hvem": "Interviewer",
        "tekst": "Ramte du?"
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Nej, men indholdet ramte en tilskuer. Han er stadig under observation. HAHAHA!"
      },
      {
        "afsnit": "“Gert Galdespreder er ikke en spiller. Han er kunstner!”"
      },
      {
        "hvem": "Interviewer",
        "tekst": "I det efterfølgende drive fik vi dog et af kampens absolutte højdepunkter, da Gert Galdespreder kastede sig over hobgoblinen Harkhier med en tackling, der var lige dele vold og kunst."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Nogle ville sige, at det er én og samme ting! HAHAHA! Åh, Gert... Sikke en kunstner! Den måde, han drejede hoften på, det lille ekstra tryk fra skulderen, og så den vidunderlige lyd, da Harkhiers hoved mødte jorden! KRASJ-SVUP! Det var som at høre en symfoni spillet på en sæk rådne kartofler!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Harkhiers hoved er efter sigende så ilde tilredt, at han som minimum må springe næste kamp over. Rygterne fra Slavers' omklædningsrum fortæller endda om et blødt sted på kraniet, der afgiver en besynderlig svuppende lyd, når man trykker på det."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "HAHAHAHA! Lidt ligesom når luft passerer rundt i Finn Fluefjerts labyrint af tarme! Du skulle høre ham efter en ordentlig portion rådden kålsuppe! Det er som et helt orkester af prutter, der forsøger at finde udgangen fra en mineskakt!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Det bliver spændende at se, om nogle af de andre hold finder det bløde sted på Harkhiers hoved i løbet af ligaen."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Hvis ikke Galdesprederen finder det, når vi mødes igen! Men for Gert er alle goblinhoveder jo bløde! HAHAHAHA!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Trods dette bemærkelsesværdige stykke performativ vold gik I til pause bagud 0-1. Hvordan var stemningen i omklædningsrummet?"
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Elendig! Der var skuffelse, raseri og en lugt, der kunne få en Great Unclean One til at knibe næsen sammen. Spillerne var rasende over at være bagud. Gert forsøgte at opmuntre de andre ved at demonstrere tacklingen igen på en af vores vandbærere. Vi har endnu ikke fundet vandbærerens tænder."
      },
      {
        "afsnit": "“Man kan ikke vinde en kamp ved bare at stå og rådne!”"
      },
      {
        "hvem": "Interviewer",
        "tekst": "I anden halvleg så vi en mere defensiv tilgang fra Besudlerne. Var det en bevidst taktisk beslutning?"
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Selvfølgelig! Vi gik over i vores berømte ankerformation. En solid klump af kød, sygdom og stædighed, der skulle forhindre de vamle ko-dværge i at løbe om hjørner med os. Og det virkede! De kunne ikke finde vej igennem os, og de kunne ikke komme udenom!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Men I var stadig bagud."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "PRÆCIS! Og man kan ikke vinde en kamp ved bare at stå og rådne! Tro mig, vi har prøvet! Så før eller siden var vi nødt til at gå i offensiven. Vi skulle have fat i den bold, koste hvad det ville!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Og det kom til at koste Pest Povl dyrt."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Ja, den stakkels, vidunderligt betændte Povl! Han lå fredeligt på græsset og passede sine infektioner, da den nederdrægtige hobgoblin Arschhier besluttede sig for at trampe ham direkte i hovedet! Og ikke bare et lille kærligt tråd. Nej, han plantede støvlen så dybt, at han fik fat i et løst stykke af Povls kranie!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Dommeren reagerede heldigvis prompte og udviste Arschhier."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Velfortjent! Selv en dommer må jo ramme rigtigt en gang imellem! Men skaden var sket. Povl må desværre sidde over i næste kamp, mens vi forsøger at få hans hoved samlet igen. Vores holdlæge mener, at lidt frisk mug og en god håndfuld maddiker burde gøre underværker."
      },
      {
        "hvem": "Interviewer",
        "tekst": "Interessant, for rygterne fra en fortrolig kilde på Besudlernes eget hold siger, at det ikke kun er Harkhiers hoved, der svupper."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "INTET ANDET END ONDE TUNGER!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Så du afviser, at Pest Povls kranie skulle afgive en lignende lyd?"
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Jeg afviser ingenting! Jeg siger bare, at hvis Povls hoved svupper, så er det fordi, Nurgles velsignelser bobler af liv derinde! Det er noget ganske andet end en hobgoblin, der har fået banket hjernen ned i støvlerne!"
      },
      {
        "afsnit": "“Bolden var fri! Og så gik det hele ad Helvede til!”"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Tilbage til kampen. Trods skaderne lykkedes det faktisk Besudlerne at få bolden fri fra Slavers. Et afgørende øjeblik, hvor kampen kunne være vendt."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "JA! Vi havde dem! De små kulsværtede svin troede, at de havde sejren i lommen, men vi fik revet bolden fri! Og så kommer Azathor, den ildspyende skorsten med storhedsvanvid, rendende og tror åbenbart, at han skal gøre sig selv til dagens helt!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Han forsøgte at samle bolden op og sikre Slavers endnu en scoring."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Og så skete miraklet! HAHAHA! Bolden smuttede fra ham! Og fra den næste! Og den næste igen! Det var som at se en flok berusede snotlinger forsøge at fange en indsmurt gris! Ingen kunne holde ordentligt fast i den forbandede bold!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Bortset fra Søren Svulmesæk."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "SØREN! Min vidunderlige, svulmende Søren! Endelig en mand med hænderne skruet rigtigt på! Eller... nogenlunde. Den ene er jo efterhånden vokset sammen med underarmen, men det er ikke pointen! Pointen er, at Søren kunne få fat i bolden, hvor alle andre fumlede rundt som halshuggede høns!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Og med to ture tilbage var der stadig en teoretisk mulighed for udligning."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Teoretisk?! Det var SKÆBNEN! Vi havde én eneste spiller, der kunne nå frem og score. ÉN! Nekrose Neller! Alt, hvad han skulle gøre, var at komme i position. Vi havde chancen for at stjæle et point lige ud af kløerne på de forbandede dværge!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Men Neller snublede."
      },
      {
        "scene": "Lang, meget lang stilhed."
      },
      {
        "hvem": "Interviewer",
        "tekst": "Coach?"
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Han. Snublede."
      },
      {
        "hvem": "Interviewer",
        "tekst": "Ja."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Der stod han. Med æren, pointet og hele Nurgles velsignede herlighed inden for rækkevidde. Og så falder han over sine egne fordømte fødder! Jeg har set zombier uden ben bevæge sig mere elegant!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Og dermed var kampen reelt afgjort."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "Ja... Jeg har aldrig været så stolt og så skuffet på samme tid. Det var en pragtfuld indsats, fyldt med vold, sygdom og lidelse. Men vi tabte. Og det gør ondt. Næsten lige så ondt som Harkhiers hoved. HAHAHA!"
      },
      {
        "afsnit": "“Vi tabte kampen, men de kommer til at huske os!”"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Afslutningsvis, Coach Svulst-Stank: Hvad tager I med jer fra dette nederlag, og hvad kan de kommende modstandere forvente?"
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "De kan forvente, at vi kommer igen! Bent Betænt skal nok få sine øjenbryn tilbage. Pest Povls hoved skal nok holde op med at svuppe. Og Nekrose Neller... ja, ham binder vi måske snørebåndene på næste gang!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Og Black Mountain Slavers?"
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "De kan nyde deres to point, eller hvad de nu får for sådan en ynkelig sejr! Men de skal huske én ting: Vi glemmer ikke! Vi tilgiver ikke! Og når vi mødes igen, så har Gert Galdespreder allerede udset sig et ganske bestemt blødt sted på en ganske bestemt hobgoblins hoved!"
      },
      {
        "hvem": "Interviewer",
        "tekst": "Tak for din tid, Coach."
      },
      {
        "hvem": "Coach Svulst-Stank",
        "tekst": "PRAISE NURGLE! OG HUSK AT VASKE HÆNDER... NEJ, VENT! LAD VÆRE MED DET! HAHAHAHAHA!"
      },
      {
        "afsnit": "Redaktionens efterbemærkning"
      },
      {
        "p": "Interviewet måtte afbrydes, da Finn Fluefjert passerede presseområdet og udløste, hvad de tilstedeværende først antog var et mindre jordskælv. Tre journalister er fortsat savnet, og en lokal præst har erklæret lokalet ubeboeligt."
      },
      {
        "p": "Slutresultat: Black Mountain Slavers 1-0 Bedstefars Besudlere. En sejr til Slavers på måltavlen. En sejr til Nurgle på skadestuen."
      }
    ]
  },
  {
    "id": "sages-spike-interview",
    "hold": "The Eternal Sages",
    "type": "Interview",
    "dato": "2026-11-04",
    "titel": "»Ligaen er reelt allerede afgjort«",
    "undertitel": "Spike!-interview",
    "forside": "forsider/sages-spike-interview.jpg",
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
  "Bros Being Bros": { fil: "bros-being-bros", slogans: ["Good friends. Cold beer. Hard hits. Great times."] },
  "Fright Night Fumblers": { fil: "fright-night-fumblers", slogans: ["Lower than a goblin's gutter. Meaner than your nightmares.", "They'll stab you. Poison you. Eat you.", "No fans. Just victims.", "Death is only a turnover away!"] }
};
