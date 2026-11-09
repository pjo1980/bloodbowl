# Indsend til pressetribunen (sidens egen formular, fra 9. nov. 2026)

Coaches indsender på **https://bloodbowl.pages.dev/#indsend**: hold, type, overskrift, tekst, valgfrit billede og navn.
Intet Google, intet login. Kun en fælles **liga-kode**, så fremmede ikke kan spamme.
Erstatter Google-formularen (den gamle formular og dens ark læses stadig, så gamle indlæg bliver på siden).

**Sådan virker det:** `functions/api/presse/[[sti]].js` kører på Cloudflare (Pages Functions) og gemmer indlæg og billeder
i Cloudflares gratis lager **KV**. Siden viser indlægget med det samme. Den daglige pressechef-opgave
(`nye_indlaeg.py`) finder det, sætter det pænt op i `presse.js` og gemmer billedet i `forsider/`.
Browseren skalerer billedet ned (højst 1600 px) og fjerner skjulte data som GPS, før det sendes.

**Skjul et indlæg:** nederst på #indsend → **Redaktør** → skriv redaktør-koden → **Vis indlæg** → **Skjul**.
Det fjerner både coachens rå tekst og pressechefens pæne udgave.

## Opsætning i Cloudflare (én gang, ca. 5 min)

Koderne må ALDRIG stå i repoet, for det er offentligt. De ligger kun i Cloudflare.

1. **dash.cloudflare.com** → **Storage & Databases** → **Workers KV** → **Create instance**. Navn: `bloodbowl-presse`.
2. **Workers & Pages** → projektet **bloodbowl** → **Settings** → **Bindings** → **Add** → **KV namespace**.
   Variable name: `PRESSE_KV`. KV namespace: `bloodbowl-presse`. **Save**.
3. Samme sted: **Settings** → **Variables and Secrets** → **Add**, to gange, type **Secret**:
   - `LIGA_KODE`: koden coaches skal bruge (fx et Blood Bowl-ord; store/små bogstaver er lige meget).
   - `ADMIN_KODE`: redaktør-koden til Peter og Mikkel. Skal være en anden og længere.
4. **Deployments** → ved den øverste: **⋯** → **Retry deployment**. (Bindinger gælder først fra næste udgivelse.)
5. Test: åbn https://bloodbowl.pages.dev/#indsend, send et testindlæg med et billede, og skjul det igen under Redaktør.

Indtil opsætningen er lavet, viser siden bare ingen nye indlæg, og formularen svarer "ikke sat op endnu".
Gratis grænser: 100.000 læsninger og 1.000 skrivninger om dagen, 1 GB lager. Ligaen bruger en brøkdel.

## Besked til coaches (kopier og send)

> Hej coaches!
> Nu kan I selv lægge kampreferater, interviews, rygter og pressemeddelelser på ligasiden. Gerne med et billede.
>
> 1. Gå til https://bloodbowl.pages.dev/#indsend (eller Presse → "✍️ Indsend til pressetribunen").
> 2. Vælg hold, skriv en overskrift, og sæt teksten ind. Også tekst fra ChatGPT.
> 3. Vedhæft gerne et billede, skriv liga-koden: [LIGA-KODE], og tryk Send.
>
> Intet login. Det kommer på siden med det samme.
