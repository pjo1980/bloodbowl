# Kommissærens Kontor – hjemmeside til Peters Blood Bowl-liga

Peter er strategisk, ikke teknisk: forklar enkelt og kort, på dansk. Menunavne i Google/GitHub på engelsk.
Kommissæren (ligaens leder, en anden person end Peter) er heller ikke teknisk og skal **ikke lære noget nyt**:
han fører allerede ligaen i sine egne Google Sheets, og det skal han blive ved med.

## Beslutninger (3. november 2026)
- **Formål:** rigtig ligadata (stilling, kampe, hold, nyheder/husregler) pakket ind i kommissærens stemme og humor.
- **Data:** siden læser **direkte fra kommissærens eksisterende Google Sheets**. Vi laver ikke et nyt ark,
  medmindre hans ark er umuligt at læse maskinelt (så laver vi et "bro-ark" i Peters Drive med IMPORTRANGE,
  der rydder op, og kommissæren rører stadig kun sit eget ark).
- **Hosting:** offentlig og gratis på GitHub Pages: https://pjo1980.github.io/bloodbowl/ (repo pjo1980/bloodbowl, branch main).
  Push til main = udgivelse. Ingen server, ingen build, ingen login.
- **Teknik:** ren HTML + CSS + JavaScript. Ingen frameworks, ingen npm. Data hentes i browseren som CSV via
  `https://docs.google.com/spreadsheets/d/<SHEET_ID>/gviz/tq?tqx=out:csv&sheet=<fanenavn>`
  (kræver at arket er delt "Anyone with the link → Viewer"). `BRUG_LOKALE_DATA: true` i `config.js` = lokale filer i `data/`.
- **Læsning af data:** app.js skal have et **mapping-lag** (fanenavn + kolonnenavne → sidens felter), så siden
  tilpasses kommissærens kolonner, ikke omvendt. **Stillingen beregnes IKKE i browseren**: kommissæren regner
  den selv i arket (30 sejr / 10 uafgjort / +1 pr. TD og CAS), og siden viser hans tal. Se DATAKORT.md.
- **Udseende:** mørk, "sports-tabloid"-stemning i Blood Bowl-stil (orange/blodrød/guld), fonte Bangers + Barlow.
  Skal virke på mobil (coaches kigger på telefonen).

## Mappestruktur
- `index.html` – skelet (header, faner Forside/Stilling/Kampe/Hold/Ranglister/Nyheder). Hæv `?v=N` på css/js ved ændringer (GitHub Pages cacher).
- `config.js` – ark-ID'er, fanenavne og holdnavn→fane-afvigelser.
- `DATAKORT.md` – hvad der ligger i hvilket ark og hvilken fane, og åbne uklarheder i data.
- `style.css` – design. `app.js` – hentning, CSV-parser, én læser pr. fanetype, sider og router.
- `nyheder.csv` – nyheder (dato, overskrift, tekst); ligger i repoet, ikke i arket.
- `data/` – kopier af kommissærens faner (hentet 3. nov. 2026) til test uden net.
- `.claude/launch.json` – lokal test: `python -m http.server 8765` (fetch virker ikke fra file://).
  Navn: Semper Fortuna Blood Bowl Liga (foreløbigt). Kommissær: Mikkel Steen.
- `.nojekyll` – GitHub Pages skal servere filerne råt.

## Regler for arbejdet
- Rør aldrig kommissærens ark uden Peters ja; læs det kun.
- Alt brugerdata fra arket HTML-escapes før visning.
- Google sender den FØRSTE fane, hvis et fanenavn er forkert. Hver læser i app.js tjekker derfor fanens form.
- Vis venlige fejl på dansk (fx "Arket er ikke delt offentligt"), ikke tekniske stakke.
- Spørg Peter før: ændring af deling på ark, kontakt til kommissæren, eget domæne.
