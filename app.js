// Kommissærens Kontor – læser kommissærens Google Sheets og viser dem som hjemmeside.
// Se DATAKORT.md for hvad der ligger hvor. Ingen frameworks, ingen build.
(() => {
  "use strict";
  const C = window.CONFIG;
  const $main = document.getElementById("main");
  const $foot = document.getElementById("foot");

  // Lokale testfiler i data/ (bruges når CONFIG.BRUG_LOKALE_DATA = true).
  const LOKAL = {
    "turnering|Turneringsstilling": "turneringsstilling.csv",
    "turnering|Sort Pulje": "pulje-sort.csv",
    "turnering|Kampprogram Regnbuepiljen": "kampprogram.csv",
    "turnering|Holdranglister": "holdranglister.csv",
    "turnering|Spiller ranglister": "spillerranglister.csv",
    "hold|Holdstats ud": "holdstats-ud.csv",
    "hold|GutBuster Gluttons": "roster-gutbuster-gluttons.csv",
    "turnering|Nyheder": "nyheder-fane-eksempel.csv",
    "presse|Form Responses 1": "presseformular-eksempel.csv"
  };

  // ---------- Hjælpere ----------
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tal = (s) => {
    const t = String(s ?? "").replace(/[^\d,.\-]/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
    const n = parseFloat(t);
    return Number.isFinite(n) ? n : 0;
  };
  const fejlboks = (tekst) => `<div class="fejl">${esc(tekst)}</div>`;
  const holdLink = (navn) => `<a href="#hold/${encodeURIComponent(navn)}">${esc(navn)}</a>`;
  const titel = (s) => s.toLowerCase().replace(/(^|\s)\S/g, (m) => m.toUpperCase());

  function parseCSV(text) {
    const rows = [];
    let row = [], cell = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) {
        if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; }
        else cell += ch;
      } else if (ch === '"') q = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); rows.push(row); row = []; cell = "";
      } else cell += ch;
    }
    if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
    return rows.map((r) => r.map((c) => c.trim()));
  }

  // ---------- Hentning ----------
  let cache = {};
  // Gemt kopi i browseren: siden viser først de tal, browseren gemte sidst, og henter friske i baggrunden.
  // Er Google langsom eller nede, ser man stadig de seneste tal. Alt i try/catch: privat browsing kan blokere lageret.
  const LAGER = "bb-ark|";
  let brugGemt = false;  // true = svar med den gemte kopi uden at spørge Google
  let ændret = false;    // sat, når friske tal afviger fra den gemte kopi
  let brugteGemt = false; // sat, når Google svigtede, og den gemte kopi blev brugt i stedet
  const gemtTekst = (key) => { try { return localStorage.getItem(LAGER + key); } catch (e) { return null; } };
  const gem = (key, t) => { try { localStorage.setItem(LAGER + key, t); } catch (e) { /* fuldt eller blokeret */ } };
  function hent(ark, fane) {
    const key = ark + "|" + fane;
    if (cache[key]) return cache[key];
    if (brugGemt && !C.BRUG_LOKALE_DATA) {
      const t = gemtTekst(key);
      if (t != null) return (cache[key] = Promise.resolve(parseCSV(t)));
    }
    let url;
    if (C.BRUG_LOKALE_DATA) {
      if (!LOKAL[key]) return Promise.reject(new Error(`Ingen lokal testfil for fanen "${fane}".`));
      url = "data/" + encodeURIComponent(LOKAL[key]);
    } else {
      url = `https://docs.google.com/spreadsheets/d/${C.ARK[ark]}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(fane)}`;
    }
    const p = fetch(url, { cache: "no-store" }).then(async (r) => {
      if (!r.ok) throw new Error(`Kunne ikke hente fanen "${fane}" (fejl ${r.status}).`);
      const t = await r.text();
      if (/^\s*</.test(t)) throw new Error(`Fanen "${fane}" kunne ikke læses. Er arket stadig delt med "Anyone with the link"?`);
      if (!C.BRUG_LOKALE_DATA) {
        if (gemtTekst(key) !== t) ændret = true;
        gem(key, t);
      }
      return parseCSV(t);
    }).catch((e) => {
      delete cache[key];
      const gemt = C.BRUG_LOKALE_DATA ? null : gemtTekst(key);
      if (gemt != null) { brugteGemt = true; return parseCSV(gemt); }
      if (e instanceof TypeError) throw new Error(`Ingen forbindelse til Google Sheets (fanen "${fane}").`);
      throw e;
    });
    cache[key] = p;
    return p;
  }

  // ---------- Læsere: én pr. fanetype. De tåler titelrækker, "I ALT" og tomme rækker. ----------
  // Google sender den FØRSTE fane, hvis et fanenavn ikke findes. Derfor tjekker hver læser formen.

  function læsStilling(rows, fane) {
    const h = rows.findIndex((r) => r.some((c) => /^win$/i.test(c)) && r.some((c) => /^point$/i.test(c)));
    if (h < 0) throw new Error(`Fanen "${fane}" ligner ikke en stilling (mangler WIN/POINT).`);
    const hr = rows[h];
    const col = (n) => hr.findIndex((c) => c.toLowerCase() === n.toLowerCase());
    const iW = col("WIN"), iD = col("DRAW"), iL = col("LOST"), iP = col("POINT"), iK = col("Kampe Spillet");
    const hold = [];
    let total = null;
    for (const r of rows.slice(h + 1)) {
      if (!r[0]) continue;
      if (/^I ALT/i.test(r[0])) { total = r; break; }
      hold.push({ navn: r[0], w: tal(r[iW]), d: tal(r[iD]), l: tal(r[iL]), p: tal(r[iP]), kampe: iK >= 0 ? tal(r[iK]) : null });
    }
    // Regeltekst står i titelcellen: "TURNERINGSSTILLING 13 hold • 30 point for sejr • ... HOLDNAVN"
    const regler = (hr[0] || rows[0][0] || "").replace(/^TURNERINGSSTILLING\s*/i, "").replace(/\s*HOLDNAVN\s*$/i, "").replace(/\s+/g, " ").trim();
    const spillet = total && iK >= 0 ? tal(total[iK]) : null; // fx "12,50%" -> 12.5
    return { hold, regler, spillet };
  }

  function læsProgram(rows, fane) {
    const h = rows.findIndex((r) => r[0] === "HOLD");
    if (h < 0) throw new Error(`Fanen "${fane}" ligner ikke et kampprogram (mangler HOLD-række).`);
    const kolonner = rows[h].slice(1).filter(Boolean);
    const info = rows.slice(0, h).map((r) => r[0]).filter(Boolean);
    const puljer = [];
    let cur = null;
    for (const r of rows.slice(h + 1)) {
      if (!r[0]) continue;
      if (r.slice(1).every((c) => !c) && /PULJE/i.test(r[0])) {
        cur = { navn: titel(r[0]), hold: [] };
        puljer.push(cur);
        continue;
      }
      if (!cur) { cur = { navn: "", hold: [] }; puljer.push(cur); }
      cur.hold.push({ navn: r[0], kampe: kolonner.map((_, i) => r[i + 1] || "") });
    }
    return { info, kolonner, puljer };
  }

  // Ranglister: blokke side om side. Hold: [navn, tal, tom]. Spillere: [nr, navn, tal, tom].
  function læsRanglister(rows, fane, bredde) {
    const kategorier = [];
    let aktive = null;
    const erOverskrift = (s) => /^[A-ZÆØÅ][A-ZÆØÅ .]{2,}/.test(s || "") && !/[a-zæøå]{3,}/.test((s || "").split(/\s+/)[0]);
    for (const r of rows) {
      if (r.some((c, i) => i % bredde === 0 && erOverskrift(c))) {
        aktive = [];
        for (let i = 0; i < r.length; i += bredde) {
          if (!erOverskrift(r[i])) { aktive.push(null); continue; }
          const k = { navn: r[i].replace(/\s+(Hold|NR\.?)$/i, "").trim(), liste: [] };
          kategorier.push(k);
          aktive.push(k);
        }
        continue;
      }
      if (!aktive) continue;
      aktive.forEach((k, b) => {
        if (!k) return;
        const o = b * bredde;
        const navn = bredde === 4 ? r[o + 1] : r[o];
        const v = bredde === 4 ? r[o + 2] : r[o + 1];
        if (navn) k.liste.push({ nr: bredde === 4 ? r[o] : "", navn, v });
      });
    }
    if (!kategorier.length) throw new Error(`Fanen "${fane}" ligner ikke en rangliste.`);
    return kategorier;
  }

  function læsHoldstats(rows, fane) {
    const hr = rows[0] || [];
    const iH = hr.indexOf("Hold");
    if (iH < 0) throw new Error(`Fanen "${fane}" ligner ikke holdstatistik (mangler kolonnen Hold).`);
    const navne = hr.slice(iH + 1);
    const ud = {};
    for (const r of rows.slice(1)) {
      if (!r[iH]) continue;
      const o = {};
      navne.forEach((n, i) => { if (n) o[n.trim()] = r[iH + 1 + i]; });
      ud[r[iH]] = o;
    }
    return ud;
  }

  function læsRoster(rows, fane) {
    const h = rows.findIndex((r) => r.includes("Name") && r.includes("Position"));
    if (h < 0) throw new Error(`Fanen "${fane}" ligner ikke en holdliste.`);
    const hr = rows[h];
    const c = (n) => hr.indexOf(n);
    const felt = {
      navn: c("Name"), pos: c("Position"), MA: c("MA"), ST: c("ST"), AG: c("AG"), PA: c("PA"), AV: c("AV"),
      skills: c("Skills and Improvements"), niveau: c("Player Level"), mng: c("Miss Next Game"),
      td: c("Touch Down"), cas: c("Cas"), mvp: c("MVP"), spp: c("Current SPP"), nig: c("Niggling Injuries"),
      vaerdi: c("Current Team Value")
    };
    // Spillerlisten slutter, hvor holdinfo begynder ("Team Name:").
    let slut = rows.findIndex((r, i) => i > h && r.some((x) => x.startsWith("Team Name")));
    if (slut < 0) slut = rows.length;
    // Skills fra level-up står på en ekstra linje UNDER spilleren: uden nummer og navn,
    // i kolonnerne fra "Skills and Improvements" og frem til "Player Level".
    const skillFra = felt.skills, skillTil = felt.niveau > felt.skills ? felt.niveau : felt.skills + 6;
    const spillere = [];
    for (let i = h + 1; i < slut; i++) {
      const r = rows[i];
      if (/^\d+$/.test(r[0] || "")) {
        if (!r[felt.navn]) { spillere.push(null); continue; } // tom plads: ekstra linjer under den ignoreres
        const s = { nr: r[0], nye: [] };
        for (const [k, idx] of Object.entries(felt)) s[k] = idx >= 0 ? r[idx] : "";
        spillere.push(s);
      } else if (!r[0] && !r[felt.navn] && skillFra >= 0) {
        const sidste = spillere[spillere.length - 1];
        if (sidste) sidste.nye.push(...r.slice(skillFra, skillTil).filter(Boolean));
      }
    }
    const fundne = spillere.filter(Boolean);
    spillere.length = 0;
    spillere.push(...fundne);
    // Holdinfo under spillerlisten: find etiketten og tag første udfyldte celle til højre / nedenunder.
    const rest = rows.slice(slut);
    const højre = (lbl) => {
      for (const r of rest) {
        const i = r.findIndex((x) => x.startsWith(lbl));
        if (i >= 0) return r.slice(i + 1).find(Boolean) || "";
      }
      return "";
    };
    const under = (lbl) => {
      for (let j = 0; j < rest.length; j++) {
        const i = rest[j].findIndex((x) => x.startsWith(lbl));
        if (i < 0) continue;
        for (let k = j + 1; k < Math.min(j + 4, rest.length); k++) if (rest[k][i]) return rest[k][i];
      }
      return "";
    };
    const qty = rest.findIndex((r) => r.includes("Qty"));
    return {
      spillere,
      race: qty > 0 ? rest[qty - 1].find(Boolean) || "" : "",
      tv: højre("Current Team Value"),
      rerolls: højre("Re-Rolls"),
      fans: højre("Dedicated Fans"),
      treasury: højre("Treasury"),
      apo: højre("Apothecary"),
      assist: højre("Assistant Coaches"),
      cheer: højre("Cheerleaders"),
      liga: under("Leagues"),
      regler: under("Special Rules")
    };
  }

  // ---------- Data ----------
  const D = {};
  const puljeKlasse = { sort: "p-sort", "rød": "p-roed", "blå": "p-blaa", gul: "p-gul" };
  const puljeAf = {}; // holdnavn -> puljenavn
  const chip = (pulje) => pulje ? `<span class="chip ${puljeKlasse[pulje.split(" ")[0].toLowerCase()] || ""}">${esc(pulje)}</span>` : "";
  const puljeKl = (pulje) => puljeKlasse[(pulje || "").split(" ")[0].toLowerCase()] || "";

  async function hentAlt() {
    const F = C.FANER;
    const job = {
      stilling: hent("turnering", F.stilling).then((r) => læsStilling(r, F.stilling)),
      program: hent("turnering", F.program).then((r) => læsProgram(r, F.program)),
      holdrang: hent("turnering", F.holdrang).then((r) => læsRanglister(r, F.holdrang, 3)),
      spillerrang: hent("turnering", F.spillerrang).then((r) => læsRanglister(r, F.spillerrang, 4)),
      holdstats: hent("hold", F.holdstats).then((r) => læsHoldstats(r, F.holdstats)),
      nyheder: fetch("nyheder.csv", { cache: "no-store" }).then((r) => r.ok ? r.text() : "").then(parseCSV),
      nyhedsfane: hent("turnering", F.nyheder), // valgfri: Mikkels fane "Nyheder" i turneringsarket
      pressemail: C.ARK.presse || C.BRUG_LOKALE_DATA ? hent("presse", F.presseUdgivet || "Udgivet") : Promise.resolve([]),
      // Indlæg fra sidens egen indsend-side (Cloudflare, functions/api/presse). Lokalt findes den ikke -> tom liste.
      webpresse: fetch("/api/presse", { cache: "no-store" }).then((r) => r.ok ? r.json() : []).catch(() => [])
    };
    F.puljer.forEach((p) => { job["pulje:" + p] = hent("turnering", p).then((r) => læsStilling(r, p)); });
    const navne = Object.keys(job);
    const res = await Promise.allSettled(Object.values(job));
    res.forEach((r, i) => { D[navne[i]] = r.status === "fulfilled" ? { ok: r.value } : { fejl: r.reason.message }; });

    // Hvem er i hvilken pulje: puljefanerne først, ellers kampprogrammet.
    for (const k of Object.keys(puljeAf)) delete puljeAf[k];
    if (D.program.ok) D.program.ok.puljer.forEach((p) => p.hold.forEach((h) => { puljeAf[h.navn] = p.navn; }));
    F.puljer.forEach((p) => {
      const d = D["pulje:" + p];
      if (d && d.ok) d.ok.hold.forEach((h) => { puljeAf[h.navn] = titel(p); });
    });
    // Indlæg fra coachernes Google-formular flettes med dem i presse.js.
    // Formular-indlæg: Claudes pæne udgave i presse.js (samme id) vinder over coachens rå tekst.
    // "x" i Skjul fjerner både den rå og den pæne udgave.
    const form = [...læsWebPresse(D.webpresse && D.webpresse.ok), ...læsPressemail(D.pressemail && D.pressemail.ok)];
    const skjulte = new Set(form.filter((p) => p.skjult).map((p) => p.id));
    const faste = (window.PRESSE || []).filter((p) => !skjulte.has(p.id));
    const fasteId = new Set(faste.map((p) => p.id));
    PRESSE = [...faste, ...form.filter((p) => !p.skjult && !fasteId.has(p.id))]
      .sort((a, b) => (b.dato || "").localeCompare(a.dato || ""));
    D.hentet = new Date();
  }

  // ---------- Sider ----------
  const liga = C.LIGA || "Blood Bowl-ligaen";

  function stillingTabel(hold, medPulje) {
    let plads = 0, forrige = null;
    const rækker = hold.map((h, i) => {
      if (h.p !== forrige) { plads = i + 1; forrige = h.p; }
      return `<tr><td class="rank">${plads}</td><td>${holdLink(h.navn)}${medPulje ? " " + chip(puljeAf[h.navn]) : ""}</td>
        <td class="num">${h.w}</td><td class="num">${h.d}</td><td class="num">${h.l}</td>
        ${h.kampe !== null && !medPulje ? `<td class="num">${h.kampe}</td>` : ""}<td class="num pts">${h.p}</td></tr>`;
    }).join("");
    const kampeKol = !medPulje && hold.some((h) => h.kampe !== null);
    return `<div class="tabel-wrap"><table><thead><tr><th>#</th><th>Hold</th>
      <th class="num" title="Sejre">V</th><th class="num" title="Uafgjorte">U</th><th class="num" title="Nederlag">T</th>
      ${kampeKol ? '<th class="num" title="Kampe spillet">K</th>' : ""}<th class="num">Point</th></tr></thead><tbody>${rækker}</tbody></table></div>`;
  }

  // ---------- Humor (indholdet står i humor.js) ----------
  const H = window.HUMOR || { sponsorer: [], citater: [], spike: [], pressechef: { navn: "Pressechefen", titel: "" }, yndlingshold: "" };
  const tilfældig = (a) => (a && a.length ? a[Math.floor(Math.random() * a.length)] : null);

  // Pressechefens "analyse" bygger på de rigtige tal, men ender altid med at hylde yndlingsholdet.
  const EF = H.elverfamilie;
  function pressechefAnalyse() {
    if (EF && Math.random() < 0.35) return tilfældig(EF.linjer); // af og til fedter han for elverne i stedet
    const s = D.stilling.ok, Y = H.yndlingshold;
    const y = s && Y ? s.hold.find((h) => h.navn === Y) : null;
    if (!y) return "";
    const fører = s.hold[0];
    const plads = s.hold.findIndex((h) => h.p === y.p) + 1;
    const delt = s.hold.filter((h) => h.p === y.p).length > 1;
    if (plads === 1) return tilfældig([
      `Som forventet ligger ${Y} øverst. Pressechefen har intet at tilføje, udover at han havde ret hele tiden.`,
      `${Y} fører ligaen. Pressechefen har bestilt kage til hele pressekorpset. Gluttons har allerede spist den.`
    ]);
    const valg = [
      `Ja, ${fører.navn} fører med ${fører.p} point. Men lad os være ærlige: Alle taler om ${Y} på en ${delt ? "delt " : ""}${plads}.-plads. Det kaldes at lure.`,
      `Tabellen lyver ikke. Den er bare ikke færdig med at fortælle, hvor gode ${Y} er.`,
      `${fører.navn} fører. Pressechefen har bedt tabellen om en kommentar, men den henviser til ${Y}' imponerende appetit.`,
      `${y.p} point til ${Y}. Pressechefen understreger, at det er ${y.p} meget tunge point.`
    ];
    if (y.w + y.d + y.l === 0) valg.push(`${Y} har ikke tabt en eneste kamp i år. De har heller ikke spillet nogen, men det er en detalje.`);
    return tilfældig(valg);
  }
  const pressechefKort = (tekst) => tekst ? `<aside class="card presse"><p class="kicker">Pressechefens hjørne</p>
    <p class="presse-tekst">»${esc(tekst)}«</p><div class="small muted">${esc(H.pressechef.navn)}, ${esc(H.pressechef.titel)}</div></aside>` : "";
  // Skiftevis et Star Player-citat og et ordret citat fra en af ligaens egne coaches.
  function citatKort() {
    const hc = H.holdCitater || [];
    if (hc.length && Math.random() < 0.5) return holdCitatKort(tilfældig(hc));
    const c = tilfældig(H.citater);
    return c ? `<figure class="card citat"><p class="kicker">Star Player-citatet</p><blockquote>»${esc(c.tekst)}«</blockquote>
      <figcaption>${esc(c.hvem)}</figcaption></figure>` : "";
  }
  const holdCitatKort = (c) => c ? `<figure class="card citat"><p class="kicker">Coachen har ordet</p><blockquote>»${esc(c.tekst)}«</blockquote>
      <figcaption>${esc(c.hvem)}, ${holdLink(c.hold)}</figcaption></figure>` : "";
  // Rygter om kommissæren: altid fra pressechefen, aldrig kommissærens egne ord.
  const rygteKort = () => {
    const t = tilfældig(H.kommissaerRygter);
    return t ? `<aside class="card presse"><p class="kicker">Rygter fra gangene</p><p class="presse-tekst">${esc(t)}</p>
      <div class="small muted">Ubekræftet. Kilde: ${esc(H.pressechef.navn)}s mest upålidelige kilder.</div></aside>` : "";
  };
  function spikeKort(overskrift) {
    const t = tilfældig(H.spike);
    return t ? `<div class="card spike"><span class="spike-logo">Spike!</span><span class="kicker">${esc(overskrift || "Magazine")}</span>
      <p>${esc(t)}</p></div>` : "";
  }
  function visSponsor() {
    const el = document.getElementById("sponsor");
    const s = tilfældig(H.sponsorer);
    if (el && s) el.innerHTML = `Sponsoreret af <b>${esc(s.navn)}</b>: ${esc(s.tekst)}`;
  }

  function sideForside() {
    const s = D.stilling.ok;
    const top = s ? s.hold.slice(0, 3) : [];
    const nyhed = nyheder()[0];
    const td = førsteMed(D.spillerrang, "TOUCHDOWNS");
    const cas = førsteMed(D.spillerrang, "CASUALTIES");
    return `
      <section class="hero">
        <img class="hero-billede" src="logo/semper-fortuna.jpg" width="1536" height="1024"
          alt="Odder Brætspilsklub Semper Fortuna – Blood Bowl Liga">
        <div class="hero-tekst">
        <p class="kicker">Odder Brætspilsklub · Officielt fra kommissærens kontor</p>
        ${H.beta && H.beta.length ? `<p class="beta-note"><span class="beta">Beta</span> ${esc(tilfældig(H.beta))}</p>` : ""}
        <h1>${esc(liga)}</h1>
        <p class="lead">Kommissær: <b>${esc(C.KOMMISSAER || "")}</b>. Stilling, kampprogram, hold og ranglister,
          hentet direkte fra kommissærens egne ark. Blod på banen, orden i papirerne.</p>
        ${s && s.regler ? `<span class="regler">${esc(s.regler)}</span>` : ""}
        </div>
      </section>

      <h2>Toppen af tabellen</h2>
      ${s ? `<div class="podie">${top.map((h, i) => `
        <a class="card" href="#hold/${encodeURIComponent(h.navn)}">
          <div class="plads">${i + 1}</div>
          <div class="navn">${esc(h.navn)}</div>
          ${chip(puljeAf[h.navn])}
          <div class="stor">${h.p} point</div>
          <div class="muted small">${h.w} V · ${h.d} U · ${h.l} T</div>
        </a>`).join("")}</div>` : fejlboks(D.stilling.fejl)}

      <div class="grid-2" style="margin-top:24px">
        <div class="card">
          <h3>Hvor langt er puljerne?</h3>
          <div class="fremdrift">${C.FANER.puljer.map((p) => {
            const d = D["pulje:" + p];
            if (!d.ok) return `<div>${chip(titel(p))} <span class="muted small">kunne ikke hentes</span></div>`;
            const pct = Math.max(0, Math.min(100, d.ok.spillet ?? 0));
            return `<div><div class="fremdrift-row">${chip(titel(p))}<span>${pct.toLocaleString("da-DK", { maximumFractionDigits: 0 })} % spillet</span></div>
              <div class="bar"><span style="width:${pct}%"></span></div></div>`;
          }).join("")}</div>
        </div>
        <div class="card">
          <h3>Kontorets øjne</h3>
          <ul class="top5">
            <li><span>Flest touchdowns</span><span>${td ? `${esc(td.navn)} <span class="v">${esc(td.v)}</span>` : '<span class="muted">Ingen endnu</span>'}</span></li>
            <li><span>Flest casualties</span><span>${cas ? `${esc(cas.navn)} <span class="v">${esc(cas.v)}</span>` : '<span class="muted">Ingen endnu</span>'}</span></li>
          </ul>
          <p class="small muted" style="margin:10px 0 0"><a href="#ranglister">Se alle ranglister</a></p>
        </div>
      </div>

      <h2>Fra pressetribunen</h2>
      <div class="grid">${spikeKort()}${citatKort()}${pressechefKort(pressechefAnalyse())}${rygteKort()}${plakatKort()}</div>
      ${PRESSE.length ? `<div style="margin-top:16px">${pkTeaser(PRESSE[0])}</div>` : ""}

      ${nyhed ?`<h2>Seneste fra kontoret</h2>${nyhedKort(nyhed)}<p><a href="#nyheder">Alle nyheder</a></p>` : ""}`;
  }

  function førsteMed(d, kat) {
    if (!d || !d.ok) return null;
    const k = d.ok.find((x) => x.navn.startsWith(kat));
    return k ? k.liste.find((e) => tal(e.v) > 0) || null : null;
  }

  function sideStilling() {
    const s = D.stilling;
    return `
      <p class="kicker">Hvem bløder mest?</p>
      <h1>Stilling</h1>
      ${s.ok && s.ok.regler ? `<p class="lead">${esc(s.ok.regler)}</p>` : ""}
      ${pressechefKort(pressechefAnalyse())}
      <h2>Samlet</h2>
      ${s.ok ? stillingTabel(s.ok.hold, true) : fejlboks(s.fejl)}
      <h2>Puljerne</h2>
      <div class="grid-2">${C.FANER.puljer.map((p) => {
        const d = D["pulje:" + p];
        const pn = titel(p);
        return `<div class="card pulje ${puljeKl(pn)}"><h3>${esc(pn)}</h3>${d.ok ? stillingTabel(d.ok.hold, false) : fejlboks(d.fejl)}</div>`;
      }).join("")}</div>
      <p class="small muted">V = sejre, U = uafgjorte, T = nederlag, K = kampe spillet. Tallene er kommissærens egne.</p>`;
  }

  // Ét kampskema (én fane i et puljeark). Score står i rækken "Score": hjemmeholdet (først i fanenavnet)
  // i cellen lige til højre, udeholdet to celler længere henne. Coachernes afkrydsning står i række 1
  // som "Tjekbokse Y". Kampen regnes som spillet, hvis en coach har krydset af, eller der er scoret.
  function læsKamp(rows, fane) {
    const [hjemme, ude] = fane.split(/\s+vs[.,]\s*/i).map((s) => s.trim());
    const r = rows.find((x) => x.includes("Score"));
    if (!r || !ude) throw new Error(`Fanen "${fane}" ligner ikke et kampskema.`);
    const i = r.indexOf("Score");
    const hold1 = (rows[1] || [])[2] === ude ? ude : hjemme; // holdet i skemaets venstre kolonne
    const hold2 = hold1 === hjemme ? ude : hjemme;
    const venstre = (lbl) => { const x = rows.find((y) => y.includes(lbl)); if (!x) return ["", ""]; const j = x.indexOf(lbl); return [x[j + 1] || "", x[j + 3] || ""]; };
    const [sc1, sc2] = [r[i + 1], r[i + 3]];
    const score = { [hold1]: sc1, [hold2]: sc2 };
    const [w1, w2] = venstre("Winnings");
    const c0 = rows[0] || [];
    const coach = { [hold1]: c0[2] || "", [hold2]: c0[3] || "" };
    // Spillerblokke: to rækker med "Player". Kolonnerne står altid i samme rækkefølge efter spillernavnet:
    // Miss Next Game, TD, Completion, Interception, Foul, Casualties, MVP. (Google mister nogle af overskrifterne.)
    const blokke = [];
    rows.forEach((x, idx) => { if (x.includes("Player")) blokke.push(idx); });
    const spillere = {};
    blokke.slice(0, 2).forEach((h, b) => {
      const iN = rows[h].indexOf("Player");
      const c = (n) => iN + { "Miss Next Game": 1, TD: 2, Completion: 3, Interception: 4, Foul: 5, Casualties: 6, MVP: 7 }[n];
      const liste = [];
      for (let k = h + 1; k < rows.length && /^\d+$/.test(rows[k][0] || ""); k++) {
        const x = rows[k];
        if (!x[iN]) continue;
        const v = (j) => (j >= 0 ? tal(x[j]) : 0);
        liste.push({ nr: x[0], navn: x[iN], td: v(c("TD")), comp: v(c("Completion")), int: v(c("Interception")), foul: v(c("Foul")),
          cas: v(c("Casualties")), mvp: v(c("MVP")), mng: x[c("Miss Next Game")] === "Y" });
      }
      spillere[b === 0 ? hold1 : hold2] = liste;
    });
    const flueben = c0.filter((x) => /^Tjekbokse/i.test(x)).some((x) => /Y$/i.test(x));
    return { fane, hjemme, ude, s1: score[hjemme], s2: score[ude], coach, spillere,
      winnings: { [hold1]: w1, [hold2]: w2 }, spillet: flueben || tal(sc1) > 0 || tal(sc2) > 0 };
  }

  async function sidePuljekampe() {
    const hoved = `<p class="kicker">Første fase</p><h1>Puljekampe</h1>
      <p class="lead">Hvert hold spiller 4 kampe i sin egen pulje. Når puljerne er spillet færdige, går turneringen videre til
        <a href="#regnbue">Regnbuepuljen</a>.</p>`;
    $main.innerHTML = hoved + '<p class="loading">Henter kampskemaerne …</p>';
    const puljer = await Promise.all((C.PULJEKAMPE || []).map(async (p) => ({
      ...p,
      kampe: await Promise.all(p.faner.map((f) => hent(p.ark, f).then((r) => læsKamp(r, f)).catch((e) => ({ fejl: e.message, fane: f }))))
    })));
    const kort = (k) => {
      if (k.fejl) return `<li class="kamp">${fejlboks(k.fejl)}</li>`;
      const v1 = k.spillet && tal(k.s1) > tal(k.s2), v2 = k.spillet && tal(k.s2) > tal(k.s1);
      return `<li class="kamp${k.spillet ? " spillet" : ""}">
        <span class="h${v1 ? " vinder" : ""}">${holdLink(k.hjemme)}</span>
        ${k.spillet ? `<a class="score" href="#kamp/${encodeURIComponent(k.fane)}" title="Se kampen">${esc(k.s1)} – ${esc(k.s2)}</a>` : '<span class="score">–</span>'}
        <span class="u${v2 ? " vinder" : ""}">${holdLink(k.ude)}</span></li>`;
    };
    // Pressechefen kommenterer yndlingsholdets puljekampe ud fra de rigtige resultater.
    const Y = H.yndlingshold;
    const yk = puljer.flatMap((p) => p.kampe).filter((k) => !k.fejl && k.spillet && (k.hjemme === Y || k.ude === Y));
    const yv = yk.filter((k) => (k.hjemme === Y ? tal(k.s1) > tal(k.s2) : tal(k.s2) > tal(k.s1))).length;
    const presse = !Y ? "" : yk.length === 0
      ? `${Y} har endnu ikke spillet en puljekamp. Pressechefen kalder det den perfekte sæson: ubesejrede.`
      : yv === yk.length
        ? `${Y} har spillet ${yk.length} og vundet ${yv}. Pressechefen arbejder allerede på biografien.`
        : yv === 0
          ? `${Y} har spillet ${yk.length} og vundet ${yv}. Pressechefen kalder det taktisk opvarmning.`
          : `${Y} har spillet ${yk.length} og vundet ${yv}. Pressechefen tæller kun de vundne.`;
    return hoved + `<div class="grid-2">${pressechefKort(presse)}${rygteKort()}</div>` + `<div class="grid-2" style="margin-top:16px">${puljer.map((p) => {
      const spillet = p.kampe.filter((k) => k.spillet).length;
      return `<div class="card pulje ${puljeKl(p.pulje)}"><h3>${esc(titel(p.pulje))}</h3>
        <p class="small muted" style="margin:0 0 8px">${spillet} af ${p.kampe.length} kampe spillet</p>
        <ul class="kampe">${[...p.kampe.filter((k) => k.spillet), ...p.kampe.filter((k) => !k.spillet)].map(kort).join("")}</ul></div>`;
    }).join("")}</div>
      <p class="small muted">Hjemmeholdet står til venstre. Resultater hentes fra kommissærens kampskemaer.</p>`;
  }

  function sideRegnbue() {
    const d = D.program;
    if (!d.ok) return `<h1>Regnbuepuljen</h1>${fejlboks(d.fejl)}`;
    const p = d.ok;
    // Prik i modstanderens puljefarve, så man kan se, at modstanderen kommer fra en anden pulje.
    const prik = (navn) => puljeAf[navn]
      ? `<span class="prik ${puljeKl(puljeAf[navn])}" title="${esc(puljeAf[navn])}" aria-label="${esc(puljeAf[navn])}"></span>` : "";
    const forklaring = Object.values(puljeAf).filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => C.FANER.puljer.findIndex((x) => titel(x) === a) - C.FANER.puljer.findIndex((x) => titel(x) === b))
      .map((v) => chip(v)).join(" ");
    return `
      <p class="kicker">Anden fase</p>
      <h1>Regnbuepuljen</h1>
      <p class="lead">Spilles, når puljespillet er færdigt. Hvem der møder hvem, afgøres af resultaterne i
        <a href="#puljekampe">puljekampene</a>, så programmet herunder kan ændre sig indtil da.</p>
      ${p.info.slice(1).map((t) => `<p class="small muted">${esc(t)}</p>`).join("")}
      <p class="small muted">Modstanderne kommer fra alle puljer. Prikken viser modstanderens egen pulje: ${forklaring}</p>
      <div class="grid-2">${p.puljer.map((pu) => `
        <div class="card pulje ${puljeKl(pu.navn)}"><h3>${esc(pu.navn || "Hold")}</h3>
          <div class="tabel-wrap"><table><thead><tr><th>Hold</th>${p.kolonner.map((k) => `<th>${esc(titel(k))}</th>`).join("")}</tr></thead>
          <tbody>${pu.hold.map((h) => `<tr><td>${holdLink(h.navn)}</td>${h.kampe.map((m) =>
            !m || /^[—–-]$/.test(m) ? '<td class="oversidder">Oversidder</td>' : `<td>${prik(m)}${holdLink(m)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
        </div>`).join("")}</div>
      <p class="small muted">Programmet vises, som det står i kommissærens ark.</p>`;
  }

  function alleHold() {
    const navne = new Set();
    if (D.stilling.ok) D.stilling.ok.hold.forEach((h) => navne.add(h.navn));
    Object.keys(puljeAf).forEach((n) => navne.add(n));
    return [...navne];
  }

  function sideHoldListe() {
    const st = D.holdstats.ok || {};
    const point = {};
    if (D.stilling.ok) D.stilling.ok.hold.forEach((h) => { point[h.navn] = h; });
    const navne = alleHold();
    if (!navne.length) return `<h1>Hold</h1>${fejlboks(D.stilling.fejl || "Ingen hold fundet.")}`;
    return `
      <p class="kicker">Ligaens ${navne.length} hold</p>
      <h1>Hold</h1>
      <p class="lead">Tryk på et hold for at se holdlisten.</p>
      ${D.holdstats.fejl ? fejlboks(D.holdstats.fejl) : ""}
      <div class="grid">${navne.map((n) => {
        const s = st[n] || {}, p = point[n];
        return `<a class="card pulje hold-kort ${puljeKl(puljeAf[n])}" href="#hold/${encodeURIComponent(n)}">
          ${PLAKATER[n] ? `<img class="hold-plakat" src="${plakatSti(n, true)}" alt="" loading="lazy">` : '<div class="hold-plakat tom">Plakat mangler</div>'}
          <h3>${esc(n)}</h3>${chip(puljeAf[n])}
          ${PLAKATER[n] ? `<p class="slogan small">»${esc(PLAKATER[n].slogans[0])}«</p>` : ""}
          <div class="stats">
            ${p ? `<span><b>${p.p}</b> point</span><span><b>${p.w}-${p.d}-${p.l}</b></span>` : ""}
            <span><b>${esc(s["Touch Down"] ?? "–")}</b> TD</span><span><b>${esc(s["Casualties"] ?? "–")}</b> CAS</span>
          </div></a>`;
      }).join("")}</div>`;
  }

  async function sideHold(navn) {
    const fane = (C.ROSTER_FANE || {})[navn] || navn;
    const st = (D.holdstats.ok || {})[navn] || {};
    const p = D.stilling.ok ? D.stilling.ok.hold.find((h) => h.navn === navn) : null;
    const hoved = `<a class="tilbage" href="#hold">← Alle hold</a>
      <p class="kicker">${chip(puljeAf[navn])}</p><h1>${esc(navn)}</h1>`;
    $main.innerHTML = hoved + '<p class="loading">Henter holdlisten …</p>';
    let r;
    try { r = læsRoster(await hent("hold", fane), fane); }
    catch (e) { return hoved + fejlboks(e.message); }
    const f = (lbl, val) => val ? `<div class="card"><div class="lbl">${lbl}</div><div class="val">${esc(val)}</div></div>` : "";
    return `${hoved}
      ${navn === H.yndlingshold ? `<div class="spike-bane">${spikeKort("Pressens yndlinge")}</div>` : ""}
      ${plakatBlok(navn)}
      ${r.race || r.liga ? `<p class="lead">${esc([r.race, r.liga].filter(Boolean).join(" · "))}</p>` : ""}
      <div class="fakta">
        ${p ? f("Point", String(p.p)) + f("V-U-T", `${p.w}-${p.d}-${p.l}`) : ""}
        ${f("Holdværdi", r.tv)}${f("Rerolls", r.rerolls)}${f("Dedicated fans", r.fans)}
        ${f("Treasury", r.treasury)}${f("Apothecary", r.apo === "1" ? "Ja" : r.apo === "0" ? "Nej" : r.apo)}
        ${f("Touchdowns", st["Touch Down"])}${f("Casualties", st["Casualties"])}
      </div>
      ${r.regler ? `<p class="small muted">Særregler: ${esc(r.regler)}</p>` : ""}
      <div class="tabel-wrap"><table><thead><tr><th>#</th><th>Navn</th><th>Position</th>
        <th class="num">MA</th><th class="num">ST</th><th class="num">AG</th><th class="num">PA</th><th class="num">AV</th>
        <th>Skills</th><th class="num">SPP</th><th class="num">TD</th><th class="num">CAS</th><th class="num">MVP</th><th>Skader</th></tr></thead>
        <tbody>${r.spillere.map((s) => `<tr>
          <td class="rank">${esc(s.nr)}</td><td><b>${esc(s.navn === "Runt" ? "Runt #" + s.nr : s.navn)}</b>${s.niveau && s.niveau !== "Rookie" ? ` <span class="chip">${esc(s.niveau)}</span>` : ""}</td>
          <td>${esc(s.pos)}</td><td class="num">${esc(s.MA)}</td><td class="num">${esc(s.ST)}</td><td class="num">${esc(s.AG)}</td>
          <td class="num">${esc(s.PA)}</td><td class="num">${esc(s.AV)}</td><td class="wrap-ok">${esc(s.skills === "None" && s.nye.length ? "" : s.skills)}${s.nye.length ? `${s.skills && s.skills !== "None" ? ", " : ""}<span class="ny" title="Ny skill fra level-up">${s.nye.map(esc).join(", ")}</span>` : ""}</td>
          <td class="num">${esc(s.spp)}</td><td class="num">${esc(s.td)}</td><td class="num">${esc(s.cas)}</td><td class="num">${esc(s.mvp)}</td>
          <td>${s.mng === "Y" ? '<span class="mng">Misser næste kamp</span>' : ""}${tal(s.nig) > 0 ? ` <span class="mng">Niggling ×${esc(s.nig)}</span>` : ""}</td>
        </tr>`).join("") || '<tr><td colspan="14" class="muted">Ingen spillere på holdlisten endnu.</td></tr>'}</tbody></table></div>
      ${holdLore(navn)}`;
  }

  const KAT = {
    "TOUCHDOWNS": "Touchdowns", "COMPLETIONS": "Completions", "INTERCEPTIONS": "Interceptions", "FOULS": "Fouls",
    "CASUALTIES": "Casualties", "MVP": "MVP", "TV INCREASE": "Stigning i holdværdi", "CASUALTIES BALANCE": "CAS-balance",
    "GENNEMSNITLIGE CASUALTIES PR. KAMP": "Casualties pr. kamp", "GENNEMSNITLIGE TOUCHDOWNS PR. KAMP": "Touchdowns pr. kamp"
  };
  function rangKort(kategorier, spillere) {
    return `<div class="grid">${kategorier.map((k) => {
      const liste = k.liste.filter((e) => tal(e.v) !== 0).slice(0, 5);
      return `<div class="card"><h3>${esc(KAT[k.navn] || titel(k.navn))}</h3>
        ${liste.length ? `<ol class="top5">${liste.map((e) => `<li><span>${spillere && e.nr ? `<span class="nr">#${esc(e.nr)}</span>` : ""}${spillere ? esc(e.navn) : holdLink(e.navn)}</span><span class="v">${esc(e.v)}</span></li>`).join("")}</ol>`
          : '<p class="muted small" style="margin:0">Ingen endnu.</p>'}</div>`;
    }).join("")}</div>`;
  }
  function sideRanglister() {
    return `
      <p class="kicker">Helte og skurke</p>
      <h1>Ranglister</h1>
      <h2>Spillere</h2>${D.spillerrang.ok ? rangKort(D.spillerrang.ok, true) : fejlboks(D.spillerrang.fejl)}
      <h2>Hold</h2>${D.holdrang.ok ? rangKort(D.holdrang.ok, false) : fejlboks(D.holdrang.fejl)}
      <p class="small muted">Top 5 pr. kategori. Nuller vises ikke.</p>
      <div style="max-width:560px;margin-top:24px">${citatKort()}</div>`;
  }

  // Ingen datoer fra den virkelige verden på siden: alt vises i Warhammers Imperial Calendar.
  // Rigtig dato -> samme dag i den tilsvarende Imperial-måned, år + 500. Fx 4. nov. 2026 = 4. Ulriczeit 2526 IC.
  const IC_MÅNEDER = ["Nachexen", "Jahrdrung", "Pflugzeit", "Sigmarzeit", "Sommerzeit", "Vorgeheim",
    "Nachgeheim", "Erntezeit", "Brauzeit", "Kaldezeit", "Ulriczeit", "Vorhexen"];
  const bbDato = (d) => `${d.getDate()}. ${IC_MÅNEDER[d.getMonth()]} ${d.getFullYear() + 500} IC`;

  // Datoer som Mikkel skriver dem: 2026-11-05, 5-11-2026, 5.11.2026 eller 5/11/26 (dag først).
  function læsDato(s) {
    s = (s || "").trim();
    let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (m) return new Date(+m[1], m[2] - 1, +m[3]);
    m = s.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})/);
    if (m) return new Date(+m[3] < 100 ? 2000 + +m[3] : +m[3], m[2] - 1, +m[1]);
    return null;
  }
  // Nyheder fra én kilde: kræver kolonnerne Dato, Overskrift, Tekst (store/små bogstaver er ligegyldige).
  // Hvis fanen ikke findes, sender Google den første fane; den har ingen "Overskrift" og giver derfor ingen nyheder.
  function læsNyheder(rows, kilde) {
    if (!rows || !rows.length) return [];
    const h = rows.findIndex((r) => r.some((c) => /^(overskrift|titel)$/i.test(c)));
    if (h < 0) return [];
    const hr = rows[h].map((x) => x.toLowerCase());
    const i = (...n) => hr.findIndex((x) => n.includes(x));
    const iD = i("dato"), iO = i("overskrift", "titel"), iT = i("tekst", "nyhed");
    return rows.slice(h + 1).filter((r) => r[iO]).map((r) => {
      const dt = iD >= 0 ? læsDato(r[iD]) : null;
      return { dato: dt, datoTekst: iD >= 0 ? r[iD] : "", overskrift: r[iO], tekst: iT >= 0 ? r[iT] : "", kilde };
    });
  }
  function nyheder() {
    const alle = [
      ...læsNyheder(D.nyhedsfane && D.nyhedsfane.ok, "kommissaer"),
      ...læsNyheder(D.nyheder && D.nyheder.ok, "redaktion")
    ];
    return alle.sort((a, b) => (b.dato ? b.dato.getTime() : 0) - (a.dato ? a.dato.getTime() : 0));
  }
  function nyhedKort(n) {
    const dato = n.dato && !isNaN(n.dato) ? bbDato(n.dato) : n.datoTekst;
    return `<article class="card nyhed"><div class="dato">${esc(dato)} · ${n.kilde === "kommissaer" ? `Kommissær ${esc(C.KOMMISSAER || "")} skriver` : "Redaktionen"}</div><h3>${esc(n.overskrift)}</h3><p>${esc(n.tekst)}</p></article>`;
  }
  function sideNyheder() {
    const liste = nyheder();
    const s = D.stilling.ok;
    return `
      <p class="kicker">Fra kommissærens skrivebord</p>
      <h1>Nyheder og regler</h1>
      ${liste.length ? liste.map(nyhedKort).join("") : '<p class="muted">Ingen nyheder endnu.</p>'}
      <h2>Pointregler</h2>
      <div class="card">${s && s.regler ? esc(s.regler) : '<span class="muted">Kunne ikke hente reglerne fra arket.</span>'}</div>`;
  }

  // ---------- Presse og holdlore (indholdet står i presse.js) ----------
  const LORE = window.LORE || {};
  let PRESSE = (window.PRESSE || []).slice().sort((a, b) => (b.dato || "").localeCompare(a.dato || ""));

  // Tekst fra coachens formular -> replikker. Regler (står også i coach-beskeden i pressechef/FORMULAR.md):
  //   "NAVN: tekst"           -> replik (navnet højst 4 ord, ikke et klokkeslæt)
  //   linje i anførselstegn  -> mellemoverskrift (også linjer der starter med en emoji)
  //   linje i (parentes)     -> regi
  //   andre linjer           -> fortsættelse af replikken ovenover, ellers et almindeligt afsnit
  const pæntNavn = (n) => (n === n.toUpperCase() && /\p{Lu}/u.test(n) ? n.toLowerCase().replace(/(^|\s)\S/g, (m) => m.toUpperCase()) : n);
  // Fjerner Markdown, som ChatGPT og lignende tager med, når man bruger deres kopiknap.
  // Giver { tekst, overskrift } — overskrift = true for "## Titel" og linjer, der kun er **fed tekst**.
  function rensMarkdown(l) {
    let overskrift = false;
    const h = l.match(/^#{1,6}\s+(.+?)\s*#*$/);
    if (h) { l = h[1]; overskrift = true; }
    if (/^(\*\*|__)[^*_]+(\*\*|__)$/.test(l) && !/:/.test(l.slice(0, -2))) overskrift = true;
    l = l.replace(/^>\s?/, "")                                   // citat-markering
      .replace(/^[-*+]\s+/, "• ")                                // punktopstilling
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")                   // [tekst](link)
      .replace(/(\*\*|__)(.+?)\1/g, "$2")                      // **fed**
      .replace(/(^|[\s(])[*_]([^*_\s][^*_]*?)[*_](?=[\s).,!?:;]|$)/g, "$1$2") // *kursiv*
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*/g, "");
    return { tekst: l.trim(), overskrift };
  }
  function tekstTilReplikker(t) {
    const ud = [];
    let cur = null;
    const emoji = /^[\u{1F000}-\u{1FFFF}\u2600-\u27BF\u2B50\uFE0F\s]+/u;
    for (let l of String(t || "").split(/\n/)) {
      l = l.trim();
      if (!l || /^([-*_]\s*){3,}$/.test(l)) continue; // tomme linjer og skillestreger (---)
      const md = rensMarkdown(l);
      l = md.tekst;
      if (!l) continue;
      if (md.overskrift) { ud.push({ afsnit: l.replace(emoji, "").trim() || l }); cur = null; continue; }
      const m = l.match(/^([^:]{1,40}):\s*(.+)$/);
      const navn = m ? m[1].trim() : "";
      if (m && navn.split(/\s+/).length <= 4 && /^\p{L}/u.test(navn) && !/\d$/.test(navn)) {
        cur = { hvem: pæntNavn(navn), tekst: m[2].trim() };
        ud.push(cur);
      } else if (emoji.test(l) || /^[“"«»].+[”"«»]$/.test(l)) {
        ud.push({ afsnit: l.replace(emoji, "").trim() }); cur = null;
      } else if (/^\(.+\)$/.test(l)) {
        ud.push({ scene: l.slice(1, -1).trim() });
      } else if (cur) {
        cur.tekst += "\n" + l;
      } else {
        ud.push({ p: l });
      }
    }
    return ud;
  }
  // Formularens tidsstempel: "6/11/2026 14.03.22" (dansk) eller "11/6/2026 14:03:22" (amerikansk). Et indlæg kan
  // aldrig være fra fremtiden, så den læsning, der ikke ligger i fremtiden, vinder.
  function formularDato(s) {
    s = String(s || "").trim();
    if (/^\d{4}-/.test(s)) return s.slice(0, 10);
    const m = s.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})(?:\s+\d{1,2}([:.]))?/);
    if (!m) return s;
    const iso = (y, mo, d) => `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dk = iso(m[3], m[2], m[1]), us = iso(m[3], m[1], m[2]);
    const imorgen = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
    const gyldig = (d) => +d.slice(5, 7) <= 12 && d <= imorgen;
    const først = m[4] === ":" ? [us, dk] : [dk, us];
    return først.find(gyldig) || først[0];
  }
  // Billede fra formularen: et Google Drive-upload (deles offentligt af pressechef/OpretFormular.gs) eller et link.
  function billedUrl(s) {
    const u = String(s || "").split(/[,\s]+/)[0];
    const id = (u.match(/drive\.google\.com\/.*?(?:[?&]id=|\/d\/)([\w-]{20,})/) || [])[1];
    if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
    return /^https:\/\//.test(u) ? u : "";
  }
  const kortCitat = (s) => (s.length > 160 ? s.slice(0, 157).replace(/\s+\S*$/, "") + " …" : s);
  // Indlæg fra indsend-siden: { id, dato, hold, type, overskrift, tekst, navn, billede, skjult }.
  function læsWebPresse(liste) {
    return (Array.isArray(liste) ? liste : []).filter((p) => p && p.id).map((p) => {
      if (p.skjult) return { id: p.id, skjult: true };
      const replikker = tekstTilReplikker(p.tekst);
      const første = replikker.find((x) => x.hvem || x.p);
      return {
        id: p.id, skjult: false, hold: p.hold, dato: p.dato, titel: p.overskrift,
        undertitel: p.type || "Pressemeddelelse", indsendt: p.navn ? `Indsendt af ${p.navn}` : "Indsendt af holdets coach", replikker,
        forside: p.billede ? `/api/presse/billede/${encodeURIComponent(p.id)}` : "",
        citat: første ? { hvem: første.hvem || p.hold, tekst: kortCitat((første.tekst || første.p).split("\n")[0]) } : null
      };
    });
  }
  function læsPressemail(rows) {
    if (!rows || !rows.length) return [];
    const h = rows.findIndex((r) => r.some((x) => /^overskrift/i.test(x)) && r.some((x) => /^hold$/i.test(x.trim())));
    if (h < 0) return [];
    const kol = (re) => rows[h].findIndex((x) => re.test(String(x).trim()));
    const k = { id: kol(/^id$/i), dato: kol(/^(dato|timestamp|tidsstempel)$/i), hold: kol(/^hold$/i), type: kol(/^type/i),
      titel: kol(/^overskrift/i), tekst: kol(/^tekst/i), navn: kol(/^(dit navn|navn|coach)/i), skjul: kol(/^skjul/i),
      billede: kol(/^billede/i) };
    const v = (r, i) => (i >= 0 ? String(r[i] || "").trim() : "");
    const kort = (s) => (s.length > 160 ? s.slice(0, 157).replace(/\s+\S*$/, "") + " …" : s);
    return rows.slice(h + 1).map((r, i) => ({ r, i })).filter(({ r }) => v(r, k.hold) && v(r, k.titel)).map(({ r, i }) => {
      const replikker = tekstTilReplikker(v(r, k.tekst));
      const første = replikker.find((x) => x.hvem || x.p);
      const navn = v(r, k.navn);
      return {
        // Fast id ud fra tidsstemplet, så Claudes pæne udgave i presse.js kan genkende indlægget.
        id: "coach-" + (v(r, k.id) || v(r, k.dato).replace(/\D/g, "") || String(i + 1)).replace(/[^\w-]/g, ""),
        skjult: !!v(r, k.skjul),
        hold: v(r, k.hold), dato: formularDato(v(r, k.dato)), titel: v(r, k.titel),
        undertitel: v(r, k.type) || "Pressemeddelelse", indsendt: navn ? `Indsendt af ${navn}` : "Indsendt af holdets coach", replikker,
        forside: billedUrl(v(r, k.billede)),
        citat: første ? { hvem: første.hvem || v(r, k.hold), tekst: kort((første.tekst || første.p).split("\n")[0]) } : null
      };
    });
  }
  const pkDato = (pk) => { const d = læsDato(pk.dato); return d ? bbDato(d) : pk.dato || ""; };

  function pressekonference(pk) {
    const set = new Set();
    const coachNavn = pk.coach || (LORE[pk.hold] || {}).coach;
    const linjer = pk.replikker.map((r) => {
      if (r.afsnit) return `<h3 class="pk-afsnit">${esc(r.afsnit)}</h3>`;
      if (r.p) return `<p class="pk-p">${esc(r.p)}</p>`;
      if (r.scene) return `<p class="scene">${esc(r.scene)}</p>`;
      const rolle = r.rolle && !set.has(r.hvem) ? ` <span class="rolle">${esc(r.rolle)}</span>` : "";
      set.add(r.hvem);
      const kl = r.hvem === H.pressechef.navn ? " formand" : r.hvem === coachNavn ? " coach" : "";
      return `<div class="replik${kl}"><div class="taler">${esc(r.hvem)}${rolle}${r.note ? ` <span class="note">(${esc(r.note)})</span>` : ""}</div>
        ${String(r.tekst || "").split("\n").map((t) => `<p>${esc(t)}</p>`).join("")}</div>`;
    }).join("");
    return `<article class="card pk" id="pk-${esc(pk.id)}">
      <p class="kicker">${esc(pk.undertitel || "Pressekonference")} · ${esc(pkDato(pk))}</p>
      <h2 class="pk-titel">${esc(pk.titel)}</h2>
      <p class="small muted">${holdLink(pk.hold)} ${chip(puljeAf[pk.hold])}${pk.sted ? ` · ${esc(pk.sted)}` : ""}${pk.indsendt ? ` · ${esc(pk.indsendt)}` : ""}</p>
      ${pk.forside ? `<a href="${esc(pk.forside)}" target="_blank" rel="noopener"><img class="pk-forside" src="${esc(pk.forside)}" alt="Forside til ${esc(pk.titel)}"></a>` : ""}
      <div class="pk-tekst">${linjer}</div></article>`;
  }

  function pkTeaser(pk) {
    return pk ? `<a class="card pk-teaser" href="#presse/${encodeURIComponent(pk.id)}">
      <p class="kicker">${esc(pk.undertitel || "Pressekonference")} · ${esc(pk.hold)}</p>
      <h3>${esc(pk.titel)}</h3>
      ${pk.citat ? `<blockquote>»${esc(pk.citat.tekst)}«</blockquote><div class="small muted">${esc(pk.citat.hvem)}</div>` : ""}
      <p class="small" style="margin:10px 0 0">Læs det hele →</p></a>` : "";
  }

  // Én linje i presse-oversigten: plakat, type og dato, overskrift, hold og et kort citat. Klik åbner artiklen.
  const forsideLille = (pk) => !pk.forside ? "" : /^forsider\//.test(pk.forside) ? pk.forside.replace(/\.jpg$/i, "-lille.jpg")
    : pk.forside.replace(/sz=w1600$/, "sz=w400");
  function pkLinje(pk) {
    const img = forsideLille(pk) || plakatSti(pk.hold, true);
    return `<a class="card pk-linje" href="#presse/${encodeURIComponent(pk.id)}">
      ${img ? `<img src="${img}" alt="" loading="lazy">` : '<div class="pk-linje-tom">📰</div>'}
      <div>
        <p class="kicker">${esc(pk.undertitel || "Pressekonference")} · ${esc(pkDato(pk))}</p>
        <h3>${esc(pk.titel)}</h3>
        <p class="small muted">${esc(pk.hold)}</p>
        ${pk.citat ? `<p class="pk-linje-citat">»${esc(pk.citat.tekst)}«</p>` : ""}
      </div></a>`;
  }

  function sidePresse(id) {
    const valgt = id ? PRESSE.find((p) => p.id === id) : null;
    const tilbage = '<p><a href="#presse">← Alle artikler fra pressetribunen</a></p>';
    if (valgt) return `
      <p class="kicker">Pressetribunen</p>
      ${tilbage}
      ${pressekonference(valgt)}
      ${tilbage}`;
    return `
      <p class="kicker">Pressetribunen</p>
      <h1>Presse</h1>
      <p class="lead">Pressekonferencer, kampreferater og interviews fra ligaens hold. Tryk på en overskrift for at læse.</p>
      ${C.PRESSE_FORMULAR ? `<p><a class="knap" style="display:inline-block;text-decoration:none" href="${esc(C.PRESSE_FORMULAR)}"${/^#/.test(C.PRESSE_FORMULAR) ? "" : ' target="_blank" rel="noopener"'}>✍️ Indsend til pressetribunen</a></p>` : ""}
      ${PRESSE.length ? `<div class="pk-liste">${PRESSE.map(pkLinje).join("")}</div>` : '<p class="muted">Ingen artikler endnu.</p>'}
      <p class="small muted">Satire. Skrevet af eller ud fra holdenes egne coaches.</p>`;
  }

  function holdLore(navn) {
    const egne = (H.holdCitater || []).filter((c) => c.hold === navn);
    const kort = [EF && navn === EF.hold ? pressechefKort(tilfældig(EF.linjer)) : "", egne.length ? holdCitatKort(tilfældig(egne)) : ""].filter(Boolean);
    return (kort.length ? `<div class="grid-2" style="margin-bottom:16px">${kort.join("")}</div>` : "") + holdLoreIndhold(navn);
  }
  function holdLoreIndhold(navn) {
    const L = LORE[navn];
    const pk = PRESSE.filter((p) => p.hold === navn);
    if (!L) return pk.length ? `<h2>Presse</h2><div class="grid">${pk.map(pkTeaser).join("")}</div>` : "";
    return `
      <h2>Om holdet</h2>
      <div class="fakta">
        ${L.coach ? `<div class="card"><div class="lbl">Coach</div><div class="val">${esc(L.coach)}</div></div>` : ""}
        ${L.hjemmebane ? `<div class="card"><div class="lbl">Hjemmebane</div><div class="val">${esc(L.hjemmebane)}</div></div>` : ""}
      </div>
      ${L.motto ? `<div class="card motto"><div class="lbl">Klubbens motto</div><div class="motto-tekst">${esc(L.motto)}</div>
        ${L.mottoDa ? `<div class="small muted">${esc(L.mottoDa)}</div>` : ""}</div>` : ""}
      <div class="grid" style="margin-top:16px">${(L.afsnit || []).map((a) => `<div class="card"><h3>${esc(a.titel)}</h3><p style="margin:0">${esc(a.tekst)}</p></div>`).join("")}
        ${L.spillebog ? `<div class="card"><h3>Den officielle spillebog</h3><ol class="spillebog">${L.spillebog.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
          <p class="small muted" style="margin:8px 0 0">Komplet. Der findes ingen side 2.</p></div>` : ""}
        ${L.ottoCitater && L.coach ? `<figure class="card citat"><p class="kicker">Coachen siger</p><blockquote>»${esc(tilfældig(L.ottoCitater))}«</blockquote><figcaption>${esc(L.coach)}</figcaption></figure>` : ""}
      </div>
      ${pk.length ? `<h2>Presse</h2><div class="grid">${pk.map(pkTeaser).join("")}</div>` : ""}`;
  }

  // ---------- Holdplakater ----------
  const PLAKATER = window.PLAKATER || {};
  const plakatSti = (navn, lille) => PLAKATER[navn] ? `plakater/${PLAKATER[navn].fil}${lille ? "-lille" : ""}.jpg` : "";
  function plakatBlok(navn) {
    const p = PLAKATER[navn];
    if (!p) return "";
    return `<div class="plakat-blok">
      <a href="${plakatSti(navn)}" target="_blank" rel="noopener" title="Se plakaten i fuld størrelse">
        <img src="${plakatSti(navn)}" alt="Holdplakat for ${esc(navn)}" loading="lazy"></a>
      <div><p class="kicker">Fra holdets plakat</p>
        <ul class="slogans">${p.slogans.map((t) => `<li>»${esc(t)}«</li>`).join("")}</ul>
        <p class="small muted" style="margin:0">Tryk på plakaten for at se den i fuld størrelse.</p></div></div>`;
  }
  function plakatKort() {
    const navne = Object.keys(PLAKATER);
    const n = tilfældig(navne);
    if (!n) return "";
    return `<a class="card plakat-kort" href="#hold/${encodeURIComponent(n)}">
      <img src="${plakatSti(n, true)}" alt="" loading="lazy">
      <div><p class="kicker">Fra omklædningsrummet</p><p class="slogan">»${esc(tilfældig(PLAKATER[n].slogans))}«</p>
      <div class="small muted">${esc(n)}</div></div></a>`;
  }

  // ---------- Kampside ----------
  const listeTekst = (a) => a.length <= 1 ? (a[0] || "") : a.slice(0, -1).join(", ") + " og " + a[a.length - 1];
  const hashTal = (t) => [...t].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

  // Referatet skrives automatisk ud fra kampskemaets tal. Kun fakta, plus en markeret kommentar fra pressechefen.
  function referat(k) {
    const A = k.hjemme, B = k.ude, a = tal(k.s1), b = tal(k.s2);
    const sp = (h) => k.spillere[h] || [];
    const navne = (h, felt) => sp(h).filter((p) => p[felt] > 0).map((p) => (p[felt] > 1 ? `${p.navn} (${p[felt]})` : p.navn));
    const vinder = a > b ? A : b > a ? B : null, taber = vinder === A ? B : vinder === B ? A : null;
    const linjer = [];
    linjer.push(vinder ? `${vinder} vandt ${Math.max(a, b)}-${Math.min(a, b)} over ${taber}.` : `${A} og ${B} spillede ${a}-${b}.`);
    const tdV = navne(vinder || A, "td"), tdT = navne(taber || B, "td");
    if (tdV.length && tdT.length) linjer.push(`${listeTekst(tdV)} scorede for ${vinder || A}, mens ${listeTekst(tdT)} scorede for ${taber || B}.`);
    else if (tdV.length) linjer.push(`${listeTekst(tdV)} scorede for ${vinder || A}.`);
    else if (tdT.length) linjer.push(`${listeTekst(tdT)} scorede for ${taber || B}.`);
    const cas = [...navne(A, "cas"), ...navne(B, "cas")];
    const casTal = [...sp(A), ...sp(B)].reduce((n, p) => n + p.cas, 0);
    if (cas.length) linjer.push(`${listeTekst(cas)} stod for ${casTal === 1 ? "kampens eneste casualty" : `kampens ${casTal} casualties`}.`);
    const passer = [...sp(A), ...sp(B)].filter((p) => p.comp >= 2).sort((x, y) => y.comp - x.comp)[0];
    if (passer) linjer.push(`${passer.navn} leverede ${passer.comp} completions${taber && sp(taber).includes(passer) ? " i nederlaget" : ""}.`);
    const ints = [...navne(A, "int"), ...navne(B, "int")];
    if (ints.length) linjer.push(`${listeTekst(ints)} snuppede bolden med en interception.`);
    const fouls = [...navne(A, "foul"), ...navne(B, "foul")];
    if (fouls.length) linjer.push(`${listeTekst(fouls)} gik efter manden med en foul.`);
    const mvp = [...navne(A, "mvp"), ...navne(B, "mvp")];
    if (mvp.length) linjer.push(`${mvp.length > 1 ? "Kampens MVP'er" : "Kampens MVP"}: ${listeTekst(mvp)}.`);
    const Y = H.yndlingshold;
    const presse = EF && [A, B].includes(EF.hold) && ![A, B].includes(Y)
      ? (vinder === EF.hold ? EF.vandt : vinder ? EF.tabte : EF.uafgjort)
      : [A, B].includes(Y)
      ? (vinder === Y ? `En historisk aften for ${Y}. Pressechefen har allerede bestilt statuen.` : vinder ? `Et resultat, der ikke afspejler ${Y}' enorme overlegenhed. Pressechefen har klaget til Nuffle.` : `Uafgjort, men moralsk en sejr til ${Y}.`)
      : [`Pressechefen kalder kampen solid, men bemærker, at den havde været bedre med ${Y} på banen.`,
         `Pressechefen konstaterer, at ${Y} fortsat er ubesejrede i denne kamp.`,
         `Pressechefen roser begge hold og minder om, at ${Y} også findes.`][hashTal(k.fane) % 3];
    return { tekst: linjer.join(" "), presse };
  }

  async function sideKamp(fane) {
    const def = (C.PULJEKAMPE || []).find((p) => p.faner.includes(fane));
    const tilbage = '<a class="tilbage" href="#puljekampe">← Alle puljekampe</a>';
    if (!def) return tilbage + fejlboks("Kampen findes ikke.");
    $main.innerHTML = tilbage + '<p class="loading">Henter kampskemaet …</p>';
    let k;
    try { k = læsKamp(await hent(def.ark, fane), fane); } catch (e) { return tilbage + fejlboks(e.message); }
    const A = k.hjemme, B = k.ude, a = tal(k.s1), b = tal(k.s2);
    const hoved = `${tilbage}<p class="kicker">${chip(titel(def.pulje))} Puljekamp</p>
      <div class="kamp-hoved">
        <div class="side${k.spillet && a > b ? " vinder" : ""}">${holdLink(A)}<span class="small muted">Hjemme${k.coach[A] ? ` · Coach ${esc(k.coach[A])}` : ""}</span></div>
        <div class="stor-score">${k.spillet ? `${esc(k.s1)} – ${esc(k.s2)}` : "–"}</div>
        <div class="side u${k.spillet && b > a ? " vinder" : ""}">${holdLink(B)}<span class="small muted">Ude${k.coach[B] ? ` · Coach ${esc(k.coach[B])}` : ""}</span></div>
      </div>`;
    if (!k.spillet) return hoved + '<p class="muted">Kampen er ikke spillet endnu.</p>';
    const r = referat(k);
    const holdTabel = (h) => {
      const aktive = (k.spillere[h] || []).filter((p) => p.td || p.comp || p.int || p.foul || p.cas || p.mvp || p.mng);
      const n = (v) => (v ? esc(v) : '<span class="muted">·</span>');
      return `<div class="card"><h3>${esc(h)}</h3>
        <p class="small muted" style="margin:0 0 8px">Winnings: ${esc(k.winnings[h] ? Number(tal(k.winnings[h])).toLocaleString("da-DK") + " GP" : "–")}</p>
        ${aktive.length ? `<div class="tabel-wrap"><table><thead><tr><th>#</th><th>Spiller</th><th class="num">TD</th><th class="num">Comp</th>
          <th class="num">Int</th><th class="num">Foul</th><th class="num">CAS</th><th class="num">MVP</th></tr></thead><tbody>
          ${aktive.map((p) => `<tr><td class="rank">${esc(p.nr)}</td><td><b>${esc(p.navn === "Runt" ? "Runt #" + p.nr : p.navn)}</b>${p.mng ? ' <span class="mng">Misser næste kamp</span>' : ""}</td>
            <td class="num">${n(p.td)}</td><td class="num">${n(p.comp)}</td><td class="num">${n(p.int)}</td><td class="num">${n(p.foul)}</td>
            <td class="num">${n(p.cas)}</td><td class="num">${n(p.mvp)}</td></tr>`).join("")}</tbody></table></div>`
          : '<p class="muted small" style="margin:0">Ingen spillere med stats i kampen.</p>'}</div>`;
    };
    return `${hoved}
      <article class="card referat"><p class="kicker">Kampreferat</p><p class="referat-tekst">${esc(r.tekst)}</p>
        <p class="small muted" style="margin:0">Skrevet automatisk ud fra kommissærens kampskema.</p></article>
      ${pressechefKort(r.presse)}
      <h2>Stats</h2><div class="grid-2">${holdTabel(A)}${holdTabel(B)}</div>`;
  }

  // ---------- Off pitch training ----------
  function sideTraening() {
    const ext = (url, tekst) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(tekst)} ↗</a>`;
    return `
      <p class="kicker">Uden for banen</p>
      <h1>Off pitch training</h1>
      <p class="lead">Bliv en bedre coach mellem kampene. Her er ligaens anbefalede steder at lære, øve og lytte.</p>
      ${pressechefKort("Coach Otto Overbelly træner ikke uden for banen. Han siger, at det kaldes frokost. Pressechefen kalder det visionært.")}
      <div class="grid-2" style="margin-top:16px">${(C.TRAENING || []).map((t) => `
        <div class="card traening"><h3>${ext(t.url, t.navn)}</h3><p>${esc(t.tekst)}</p>
          <ul class="top5">${(t.links || []).map((l) => `<li><span>${ext(l.url, l.navn)}</span><span class="muted small">${esc(l.tekst)}</span></li>`).join("")}</ul>
        </div>`).join("")}</div>
      <p class="small muted">Links åbner i en ny fane. Siderne er lavet af andre og har intet med ligaen at gøre.</p>`;
  }

  // Regler og guider (indholdet står i regler.js). Hvert afsnit kan foldes ud og sammen.
  function sideRegler() {
    const R = window.REGLER || { afsnit: [], docs: {} };
    const ext = (url, tekst) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(tekst)} ↗</a>`;
    const punkt = (p) => typeof p === "string" ? `<li>${esc(p)}</li>`
      : `<li>${esc(p.tekst)}${p.under ? `<ul>${p.under.map((u) => `<li>${esc(u)}</li>`).join("")}</ul>` : ""}</li>`;
    const afsnit = R.afsnit.map((a) => `
      <details class="card regel"${a.aaben ? " open" : ""}>
        <summary><h2>${esc(a.titel)}</h2></summary>
        ${a.intro ? `<p>${esc(a.intro)}</p>` : ""}
        <ul class="regel-liste">${a.punkter.map(punkt).join("")}</ul>
        ${a.guide && R.docs[a.guide] ? `<p class="small">${ext(R.docs[a.guide], "Kommissærens guide med billeder")}</p>` : ""}
      </details>`).join("");
    return `
      <p class="kicker">Kommissærens kontor</p>
      <h1>Regler og guider</h1>
      <p class="lead">Ligaens husregler, slutspillet og hjælp til kamparket og holdarket. Tryk på en overskrift for at folde den ud.</p>
      ${pressechefKort("Pressechefen har læst alle reglerne. Han forstod dem ikke, men han er helt enig.")}
      <div class="regler">${afsnit}</div>
      <p class="small muted">Kilde: ${ext(R.docs.regler, "Kommissærens regeldokument")} · ${ext(R.docs.cheatsheet, "Cheat sheet til kampen")}</p>`;
  }

  // Skadestuen: hvem er ude (holdarkene: Miss Next Game, Niggling) og hvem har gjort skade (kampskemaerne: CAS, MNG).
  async function sideSkadestue() {
    const hoved = `<p class="kicker">Lægen er ikke uddannet</p><h1>Skadestuen</h1>
      <p class="lead">Hvem er på sygelisten, hvem har varige mén, og hvem har sendt flest modstandere på bænken.</p>`;
    $main.innerHTML = hoved + '<p class="loading">Lægen kigger på patienterne …</p>';
    const hold = alleHold();
    const rostre = (await Promise.all(hold.map((n) => {
      const fane = (C.ROSTER_FANE || {})[n] || n;
      return hent("hold", fane).then((r) => ({ hold: n, spillere: læsRoster(r, fane).spillere })).catch(() => null);
    }))).filter(Boolean);
    const kampe = (await Promise.all((C.PULJEKAMPE || []).flatMap((p) => p.faner.map((f) =>
      hent(p.ark, f).then((r) => læsKamp(r, f)).catch(() => null))))).filter((k) => k && k.spillet);

    const syge = [], nig = [];
    rostre.forEach((r) => r.spillere.forEach((s) => {
      if (/^y/i.test(s.mng || "")) syge.push({ ...s, hold: r.hold });
      if (tal(s.nig) > 0) nig.push({ ...s, hold: r.hold });
    }));
    const slagtere = [], kampMng = [];
    kampe.forEach((k) => Object.entries(k.spillere).forEach(([h, liste]) => {
      const mod = h === k.hjemme ? k.ude : k.hjemme;
      liste.forEach((s) => {
        if (s.cas > 0) slagtere.push({ navn: s.navn, hold: h, cas: s.cas, mod, fane: k.fane });
        if (s.mng) kampMng.push({ navn: s.navn, hold: h, mod, fane: k.fane });
      });
    }));
    slagtere.sort((a, b) => b.cas - a.cas);
    const casHold = {};
    slagtere.forEach((s) => { casHold[s.hold] = (casHold[s.hold] || 0) + s.cas; });
    const casListe = Object.entries(casHold).sort((a, b) => b[1] - a[1]);

    const kampLink = (f) => `<a href="#kamp/${encodeURIComponent(f)}">kampen</a>`;
    const tom = (t) => `<p class="muted">${esc(t)}</p>`;
    const liste = (rækker) => `<ul class="top5">${rækker.join("")}</ul>`;
    const kortSyge = `<div class="card"><h2>🩹 Sygelisten</h2><p class="small muted">Spillere med Miss Next Game i holdarket.</p>
      ${syge.length ? liste(syge.map((s) => `<li><span><b>${esc(s.navn)}</b> <span class="muted small">${esc(s.pos || "")}</span></span><span>${holdLink(s.hold)}</span></li>`))
        : tom("Ingen er på sygelisten. Enten er alle raske, eller også har ingen tastet det.")}
      ${kampMng.length ? `<p class="small" style="margin-top:12px"><b>Fra kampskemaerne:</b></p>` + liste(kampMng.map((s) =>
        `<li><span><b>${esc(s.navn)}</b> ${holdLink(s.hold)}</span><span class="muted small">mod ${esc(s.mod)} · ${kampLink(s.fane)}</span></li>`)) : ""}
    </div>`;
    const kortNig = `<div class="card"><h2>🦴 Varige mén</h2><p class="small muted">Niggling Injuries i holdarket.</p>
      ${nig.length ? liste(nig.map((s) => `<li><span><b>${esc(s.navn)}</b> ${holdLink(s.hold)}</span><span class="v">${esc(s.nig)}</span></li>`))
        : tom("Ingen varige mén endnu. Sæsonen er ung.")}</div>`;
    const kortSlagtere = `<div class="card"><h2>🪓 Slagterne</h2><p class="small muted">Spillere, der har påført skader (CAS) i puljekampene.</p>
      ${slagtere.length ? liste(slagtere.slice(0, 10).map((s) =>
        `<li><span><b>${esc(s.navn)}</b> ${holdLink(s.hold)} <span class="muted small">mod ${esc(s.mod)} · ${kampLink(s.fane)}</span></span><span class="v">${s.cas}</span></li>`))
        : tom("Ingen CAS endnu. Usædvanligt fredeligt.")}</div>`;
    const kortHold = `<div class="card"><h2>🏥 Mest voldelige hold</h2><p class="small muted">CAS påført i puljekampene.</p>
      ${casListe.length ? liste(casListe.map(([h, n], i) => `<li><span><span class="nr">${i + 1}.</span>${holdLink(h)}</span><span class="v">${n}</span></li>`))
        : tom("Ingen endnu.")}</div>`;
    const værst = slagtere[0];
    const delt = slagtere.filter((s) => værst && s.cas === værst.cas).length;
    const gunnar = !værst ? "Skadestuen er tom. Pressechefen er skuffet. Han havde købt popcorn." : delt > 1
      ? `${delt} spillere deler førstepladsen blandt slagterne med ${værst.cas} CAS hver. Pressechefen kalder det "fysisk spil". Lægen kalder det overarbejde.`
      : `${værst.navn} fra ${værst.hold} topper listen over slagtere. Pressechefen kalder det "fysisk spil". Lægen kalder det overarbejde.`;
    return hoved + pressechefKort(gunnar) + `<div class="grid-2" style="margin-top:16px">${kortSyge}${kortSlagtere}${kortNig}${kortHold}</div>
      <p class="small muted">Skader kommer kun med, hvis de er tastet: Miss Next Game og Niggling i holdarket, CAS og Miss Next Game i kamparket.
        Se <a href="#kampdag">Kampdag</a>.</p>`;
  }

  // Kampdag: Mikkels guide til kamparket som tjekliste. Afkrydsningerne gemmes i browseren, til man trykker "Ny kamp".
  const KAMPDAG = "bb-kampdag";
  const kampdagLæs = () => { try { return JSON.parse(localStorage.getItem(KAMPDAG) || "{}"); } catch (e) { return {}; } };
  const kampdagGem = (o) => { try { localStorage.setItem(KAMPDAG, JSON.stringify(o)); } catch (e) {} };
  function sideKampdag() {
    const R = window.REGLER || { afsnit: [], docs: {} };
    const g = R.afsnit.find((a) => a.guide === "kampark");
    if (!g) return '<h1>Kampdag</h1><p class="muted">Guiden mangler.</p>';
    const valgt = kampdagLæs();
    const dele = g.punkter.filter((p) => typeof p !== "string");
    const noter = g.punkter.filter((p) => typeof p === "string");
    const ext = (url, tekst) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(tekst)} ↗</a>`;
    const blok = (p, i) => {
      const n = p.under.filter((_, j) => valgt[`${i}-${j}`]).length;
      return `<section class="card tjek" data-del="${i}">
        <h2>${esc(p.tekst.replace(/:$/, ""))} <span class="tjek-tal">${n}/${p.under.length}</span></h2>
        <ul>${p.under.map((u, j) => `<li><label><input type="checkbox" data-id="${i}-${j}"${valgt[`${i}-${j}`] ? " checked" : ""}>
          <span>${esc(u)}</span></label></li>`).join("")}</ul></section>`;
    };
    return `
      <p class="kicker">Til bordet</p>
      <h1>Kampdag</h1>
      <p class="lead">Tjeklisten til kamparket. Sæt flueben undervejs, så glemmer du ikke noget. Fluebenene huskes på denne
        telefon eller tablet, til du trykker "Ny kamp".</p>
      <p><button class="knap" type="button" id="ny-kamp">🔄 Ny kamp</button>
        ${R.docs.cheatsheet ? ` · ${ext(R.docs.cheatsheet, "Cheat sheet")}` : ""}
        ${R.docs.kampark ? ` · ${ext(R.docs.kampark, "Guide med billeder")}` : ""}</p>
      <div class="tjekliste">${dele.map(blok).join("")}</div>
      ${noter.map((t) => `<p class="tjek-note">✅ ${esc(t)}</p>`).join("")}
      <p class="small muted">Reglerne står under <a href="#regler">Regler</a>.</p>`;
  }
  document.addEventListener("change", (e) => {
    const cb = e.target.closest && e.target.closest(".tjek input[type=checkbox]");
    if (!cb) return;
    const o = kampdagLæs();
    if (cb.checked) o[cb.dataset.id] = 1; else delete o[cb.dataset.id];
    kampdagGem(o);
    const sek = cb.closest(".tjek");
    const alle = sek.querySelectorAll("input[type=checkbox]");
    sek.querySelector(".tjek-tal").textContent = `${[...alle].filter((x) => x.checked).length}/${alle.length}`;
    sek.classList.toggle("faerdig", [...alle].every((x) => x.checked));
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest || !e.target.closest("#ny-kamp")) return;
    if (!confirm("Fjern alle flueben og start en ny kamp?")) return;
    kampdagGem({});
    vis();
  });

  // ---------- Indsend til pressetribunen (sidens egen formular; serveren er functions/api/presse) ----------
  const gemt = (k, v) => { try { if (v === undefined) return localStorage.getItem(k) || ""; localStorage.setItem(k, v); } catch (e) {} return ""; };
  function sideIndsend() {
    const hold = Object.keys(puljeAf).sort((a, b) => a.localeCompare(b, "da"));
    const typer = ["Pressemeddelelse", "Kampreferat", "Interview", "Rygte", "Lore"];
    return `
      <p class="kicker">Pressetribunen</p>
      <p><a href="#presse">← Tilbage til Presse</a></p>
      <h1>Indsend til pressetribunen</h1>
      <p class="lead">Kampreferater, interviews, rygter og pressemeddelelser. Gerne med et billede, fx lavet med AI.
        Det kommer på siden med det samme, og pressechefen sætter det pænt op senere.</p>
      <form id="indsend" class="card indsend" autocomplete="off">
        <label>Hold<select name="hold" required><option value="">Vælg hold</option>
          ${hold.map((h) => `<option${gemt("bb-hold") === h ? " selected" : ""}>${esc(h)}</option>`).join("")}</select></label>
        <label>Type<select name="type">${typer.map((t) => `<option>${t}</option>`).join("")}</select></label>
        <label>Overskrift<input name="overskrift" maxlength="150" required></label>
        <label>Tekst<textarea name="tekst" rows="12" maxlength="20000" required placeholder="Sæt bare teksten ind. Også tekst fra ChatGPT."></textarea></label>
        <label>Billede (valgfrit)<input name="billede" type="file" accept="image/*"></label>
        <label>Dit navn (valgfrit)<input name="navn" maxlength="60" placeholder="Coachens eller figurens navn" value="${esc(gemt("bb-navn"))}"></label>
        <label>Liga-kode<input name="kode" required placeholder="Fås hos Peter eller Mikkel" value="${esc(gemt("bb-kode"))}"></label>
        <input name="hjemmeside" tabindex="-1" aria-hidden="true" autocomplete="off" style="position:absolute;left:-9999px">
        <button class="knap" type="submit">Send til pressetribunen</button>
        <p class="small" id="indsend-status" role="status"></p>
      </form>
      <details class="card" id="redaktoer"><summary>Redaktør (Peter og Mikkel)</summary>
        <p class="small muted">Skriv redaktør-koden for at skjule eller vise indlæg fra denne side.</p>
        <label>Redaktør-kode<input id="admin-kode" value="${esc(gemt("bb-admin"))}"></label>
        <button class="knap" type="button" id="admin-hent">Vis indlæg</button>
        <div id="admin-liste"></div>
      </details>`;
  }
  // Skalerer billedet ned i browseren (højst 1600 px, JPEG). Fjerner samtidig skjulte data som GPS-position.
  async function lilleBillede(fil) {
    const bmp = await createImageBitmap(fil);
    const f = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * f); c.height = Math.round(bmp.height * f);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    return new Promise((ok) => c.toBlob(ok, "image/jpeg", 0.85));
  }
  function indsendKlar() {
    const form = document.getElementById("indsend");
    const status = document.getElementById("indsend-status");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const knap = form.querySelector("button[type=submit]");
      const fd = new FormData(form);
      fd.delete("billede");
      const fil = form.billede.files[0];
      knap.disabled = true; status.textContent = "Sender …";
      try {
        if (fil) {
          const b = await lilleBillede(fil).catch(() => null);
          if (!b) throw new Error("Billedet kunne ikke læses. Prøv et JPG- eller PNG-billede.");
          fd.append("billede", b, "billede.jpg");
        }
        const r = await fetch("/api/presse", { method: "POST", body: fd });
        const d = await r.json().catch(() => ({}));
        if (!r.ok || !d.ok) throw new Error(d.fejl || "Det gik galt. Prøv igen om lidt.");
        gemt("bb-kode", fd.get("kode")); gemt("bb-navn", fd.get("navn")); gemt("bb-hold", fd.get("hold"));
        status.textContent = "Tak! Indlægget er på siden.";
        await hentAlt();
        location.hash = d.id ? "#presse/" + d.id : "#presse";
      } catch (err) {
        status.textContent = err.message;
        knap.disabled = false;
      }
    };
    const adminKode = document.getElementById("admin-kode");
    const listeEl = document.getElementById("admin-liste");
    async function visListe() {
      gemt("bb-admin", adminKode.value.trim());
      const r = await fetch("/api/presse", { cache: "no-store", headers: { "x-admin-kode": adminKode.value.trim() } });
      const alle = r.ok ? await r.json() : [];
      const fuld = alle.filter((p) => p.overskrift !== undefined);
      if (alle.length && !fuld.length) { listeEl.innerHTML = '<p class="small">Forkert redaktør-kode.</p>'; return; }
      listeEl.innerHTML = fuld.length ? fuld.map((p) => `<p class="small"><button class="knap" type="button" data-id="${esc(p.id)}" data-skjul="${p.skjult ? "" : "1"}">${p.skjult ? "Vis" : "Skjul"}</button>
        ${p.skjult ? "<s>" : ""}${esc(p.hold)}: ${esc(p.overskrift)}${p.skjult ? "</s>" : ""} <span class="muted">${esc(p.dato)}</span></p>`).join("")
        : '<p class="small muted">Ingen indlæg fra denne side endnu.</p>';
    }
    document.getElementById("admin-hent").onclick = visListe;
    listeEl.onclick = async (e) => {
      const b = e.target.closest("button[data-id]");
      if (!b) return;
      b.disabled = true;
      const r = await fetch("/api/presse/skjul", { method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: b.dataset.id, kode: adminKode.value.trim(), skjul: !!b.dataset.skjul }) });
      if (!r.ok) { const d = await r.json().catch(() => ({})); alert(d.fejl || "Det gik galt."); }
      await visListe(); hentAlt();
    };
  }

  // ---------- Router ----------
  const SIDER = { forside: sideForside, stilling: sideStilling, puljekampe: sidePuljekampe, regnbue: sideRegnbue,
    hold: sideHoldListe, ranglister: sideRanglister, presse: () => sidePresse(""), nyheder: sideNyheder, kamp: sidePuljekampe, traening: sideTraening, regler: sideRegler, kampdag: sideKampdag, skadestue: sideSkadestue, indsend: sideIndsend };
  const ALIAS = { kampe: "puljekampe", regel: "regler", guide: "regler" }; // gamle og nemme links
  const SIDENAVN = { puljekampe: "Puljekampe", regnbue: "Regnbuepuljen", presse: "Presse", traening: "Off pitch training", regler: "Regler og guider", kampdag: "Kampdag", skadestue: "Skadestuen", indsend: "Indsend til pressetribunen" };
  let visNr = 0;
  async function vis() {
    const nr = ++visNr;
    const [rå, ...rest] = (location.hash.replace(/^#/, "") || "forside").split("/");
    const side = ALIAS[rå] || rå;
    const navn = rest.length ? decodeURIComponent(rest.join("/")) : "";
    const key = SIDER[side] ? side : "forside";
    const fane = key === "kamp" ? "puljekampe" : key;
    document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("on", a.dataset.page === (fane === "indsend" ? "presse" : fane)));
    if (!navn || key === "presse") window.scrollTo(0, 0);
    const html = key === "hold" && navn ? await sideHold(navn) : key === "presse" && navn ? sidePresse(navn)
      : key === "kamp" && navn ? await sideKamp(navn) : await SIDER[key]();
    if (nr !== visNr) return; // brugeren har skiftet side imens
    $main.innerHTML = html;
    if (key === "indsend") indsendKlar();
    $main.querySelectorAll(".tjek").forEach((sek) => {
      const alle = sek.querySelectorAll("input[type=checkbox]");
      sek.classList.toggle("faerdig", alle.length > 0 && [...alle].every((x) => x.checked));
    });
    const pkTitel = key === "presse" && navn ? (PRESSE.find((p) => p.id === navn) || {}).titel : key === "kamp" && navn ? navn : "";
    document.title = (key === "forside" ? "" : (pkTitel || navn || SIDENAVN[key] || titel(key)) + " · ") + liga;
  }

  function visFod() {
    const kl = D.hentet ? D.hentet.toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" }) : "";
    const status = D.gemt ? ". Viser sidst gemte tal, mens nye hentes"
      : brugteGemt ? ". Google svarer ikke lige nu, så du ser de sidst gemte tal"
      : kl ? `. Sidst hentet kl. ${kl}` : "";
    $foot.innerHTML = `<span>Data hentes direkte fra kommissærens Google Sheets${status}.
      ${C.BRUG_LOKALE_DATA ? "<b>Testdata.</b>" : ""}<br>Sponsorer, Star Player-citater, Spike! og pressechefen er satire. Kommissærens ord er hans egne.</span>
      <button class="knap" id="opdater" type="button">Hent igen</button>`;
    document.getElementById("opdater").onclick = start;
  }

  async function start() {
    cache = {};
    brugteGemt = false;
    const harGemt = !C.BRUG_LOKALE_DATA && gemtTekst("turnering|" + C.FANER.stilling) != null;
    if (harGemt) {
      // 1) Vis den gemte kopi med det samme.
      brugGemt = true;
      try { await hentAlt(); D.gemt = true; visFod(); await vis(); } catch (e) { /* så venter vi på de friske */ }
      brugGemt = false;
      // 2) Hent friske tal i baggrunden, og tegn kun siden igen, hvis noget er ændret.
      cache = {}; ændret = false;
      const side = location.hash, y = window.scrollY;
      await hentAlt(); D.gemt = false; visFod();
      if (ændret && location.hash === side) { await vis(); window.scrollTo(0, y); }
      return;
    }
    $main.innerHTML = '<p class="loading">Henter papirerne fra kommissærens kontor …</p>';
    await hentAlt();
    visFod();
    await vis();
  }

  document.getElementById("liganavn").textContent = liga;
  document.getElementById("saeson").textContent = C.KOMMISSAER ? "Kommissær: " + C.KOMMISSAER : "";
  window.addEventListener("hashchange", vis);
  visSponsor();
  setInterval(visSponsor, 12000);
  const $beta = document.getElementById("beta");
  if ($beta && H.beta) $beta.title = "BETA: " + tilfældig(H.beta);
  start();
})();
