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
    "hold|GutBuster Gluttons": "roster-gutbuster-gluttons.csv"
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
  function hent(ark, fane) {
    const key = ark + "|" + fane;
    if (cache[key]) return cache[key];
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
      return parseCSV(t);
    }).catch((e) => {
      delete cache[key];
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
    const spillere = [];
    let slut = rows.length;
    for (let i = h + 1; i < rows.length; i++) {
      const r = rows[i];
      if (!/^\d+$/.test(r[0] || "")) { slut = i; break; }
      if (!r[felt.navn]) continue;
      const s = { nr: r[0] };
      for (const [k, idx] of Object.entries(felt)) s[k] = idx >= 0 ? r[idx] : "";
      spillere.push(s);
    }
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
      nyheder: fetch("nyheder.csv", { cache: "no-store" }).then((r) => r.ok ? r.text() : "").then(parseCSV)
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

  function sideForside() {
    const s = D.stilling.ok;
    const top = s ? s.hold.slice(0, 3) : [];
    const nyhed = nyheder()[0];
    const td = førsteMed(D.spillerrang, "TOUCHDOWNS");
    const cas = førsteMed(D.spillerrang, "CASUALTIES");
    return `
      <section class="hero">
        <p class="kicker">Officielt fra kommissærens kontor</p>
        <h1>${esc(liga)}</h1>
        <p class="lead">Kommissær: <b>${esc(C.KOMMISSAER || "")}</b>. Stilling, kampprogram, hold og ranglister,
          hentet direkte fra kommissærens egne ark. Blod på banen, orden i papirerne.</p>
        ${s && s.regler ? `<span class="regler">${esc(s.regler)}</span>` : ""}
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

      ${nyhed ? `<h2>Seneste fra kontoret</h2>${nyhedKort(nyhed)}<p><a href="#nyheder">Alle nyheder</a></p>` : ""}`;
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

  function sideKampe() {
    const d = D.program;
    if (!d.ok) return `<h1>Kampe</h1>${fejlboks(d.fejl)}`;
    const p = d.ok;
    return `
      <p class="kicker">Hvem skal knuses hvornår</p>
      <h1>Kampprogram</h1>
      ${p.info.slice(1).map((t) => `<p class="lead">${esc(t)}</p>`).join("")}
      <div class="grid-2">${p.puljer.map((pu) => `
        <div class="card pulje ${puljeKl(pu.navn)}"><h3>${esc(pu.navn || "Hold")}</h3>
          <div class="tabel-wrap"><table><thead><tr><th>Hold</th>${p.kolonner.map((k) => `<th>${esc(titel(k))}</th>`).join("")}</tr></thead>
          <tbody>${pu.hold.map((h) => `<tr><td>${holdLink(h.navn)}</td>${h.kampe.map((m) =>
            !m || /^[—–-]$/.test(m) ? '<td class="oversidder">Oversidder</td>' : `<td>${holdLink(m)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
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
        return `<a class="card pulje ${puljeKl(puljeAf[n])}" href="#hold/${encodeURIComponent(n)}">
          <h3>${esc(n)}</h3>${chip(puljeAf[n])}
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
          <td class="rank">${esc(s.nr)}</td><td><b>${esc(s.navn)}</b>${s.niveau && s.niveau !== "Rookie" ? ` <span class="chip">${esc(s.niveau)}</span>` : ""}</td>
          <td>${esc(s.pos)}</td><td class="num">${esc(s.MA)}</td><td class="num">${esc(s.ST)}</td><td class="num">${esc(s.AG)}</td>
          <td class="num">${esc(s.PA)}</td><td class="num">${esc(s.AV)}</td><td class="wrap-ok">${esc(s.skills)}</td>
          <td class="num">${esc(s.spp)}</td><td class="num">${esc(s.td)}</td><td class="num">${esc(s.cas)}</td><td class="num">${esc(s.mvp)}</td>
          <td>${s.mng === "Y" ? '<span class="mng">Misser næste kamp</span>' : ""}${tal(s.nig) > 0 ? ` <span class="mng">Niggling ×${esc(s.nig)}</span>` : ""}</td>
        </tr>`).join("") || '<tr><td colspan="14" class="muted">Ingen spillere på holdlisten endnu.</td></tr>'}</tbody></table></div>`;
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
      <p class="small muted">Top 5 pr. kategori. Nuller vises ikke.</p>`;
  }

  function nyheder() {
    const d = D.nyheder && D.nyheder.ok;
    if (!d || !d.length) return [];
    const hr = d[0].map((x) => x.toLowerCase());
    const i = (n) => hr.indexOf(n);
    return d.slice(1).filter((r) => r[i("overskrift")])
      .map((r) => ({ dato: r[i("dato")], overskrift: r[i("overskrift")], tekst: r[i("tekst")] }))
      .sort((a, b) => (b.dato || "").localeCompare(a.dato || ""));
  }
  function nyhedKort(n) {
    const dt = n.dato ? new Date(n.dato + "T12:00:00") : null;
    const dato = dt && !isNaN(dt) ? dt.toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" }) : n.dato;
    return `<article class="card nyhed"><div class="dato">${esc(dato)}</div><h3>${esc(n.overskrift)}</h3><p>${esc(n.tekst)}</p></article>`;
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

  // ---------- Router ----------
  const SIDER = { forside: sideForside, stilling: sideStilling, kampe: sideKampe, hold: sideHoldListe, ranglister: sideRanglister, nyheder: sideNyheder };
  async function vis() {
    const [side, ...rest] = (location.hash.replace(/^#/, "") || "forside").split("/");
    const navn = rest.length ? decodeURIComponent(rest.join("/")) : "";
    const key = SIDER[side] ? side : "forside";
    document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("on", a.dataset.page === key));
    const html = key === "hold" && navn ? await sideHold(navn) : SIDER[key]();
    $main.innerHTML = html;
    document.title = (key === "forside" ? "" : (navn || titel(key)) + " · ") + liga;
    if (!navn) window.scrollTo(0, 0);
  }

  function visFod() {
    const kl = D.hentet ? D.hentet.toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" }) : "";
    $foot.innerHTML = `<span>Data hentes direkte fra kommissærens Google Sheets${kl ? `. Sidst hentet kl. ${kl}` : ""}.
      ${C.BRUG_LOKALE_DATA ? "<b>Testdata.</b>" : ""}</span>
      <button class="knap" id="opdater" type="button">Hent igen</button>`;
    document.getElementById("opdater").onclick = start;
  }

  async function start() {
    cache = {};
    $main.innerHTML = '<p class="loading">Henter papirerne fra kommissærens kontor …</p>';
    await hentAlt();
    visFod();
    await vis();
  }

  document.getElementById("liganavn").textContent = liga;
  document.getElementById("saeson").textContent = C.KOMMISSAER ? "Kommissær: " + C.KOMMISSAER : "";
  window.addEventListener("hashchange", vis);
  start();
})();
