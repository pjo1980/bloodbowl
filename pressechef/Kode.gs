/**
 * Pressechef Gunnar Grådigs indbakke – Semper Fortuna Blood Bowl Liga
 *
 * Kører inde i Google (Apps Script) under Gunnars Gmail-konto. Ingen server.
 * 1. Hvert 10. minut læses nye mails i indbakken.
 * 2. Afsenderens mail slås op i fanen "Coaches" for at finde holdet.
 * 3. Mailen (eller et vedhæftet Word-dokument) skrives i fanen "Indbakke".
 * 4. Når nogen skriver "Ja" i kolonnen "Godkendt", kopieres indlægget til et OFFENTLIGT ark
 *    ("Pressechefens udgivelser"), som hjemmesiden læser. Mailadresser kommer aldrig med derover.
 *
 * Opsætning: se pressechef/GUIDE.md. Kør funktionen "opsaet" én gang.
 * Kræver tjenesten "Drive API" (Services → Drive API) for at kunne læse Word-filer.
 */

const FANE_COACHES = "Coaches";
const FANE_INDBAKKE = "Indbakke";
const FANE_INFO = "Info";
const NOEGLE_UDGIVET = "UDGIVET_ID";
const KOLONNER = ["ID", "Modtaget", "Fra", "Hold", "Overskrift", "Tekst", "Godkendt", "Udgivet"];

// true = indlæg fra kendte coaches kommer på siden med det samme (skriv "Nej" i Godkendt for at fjerne et).
// false = Peter eller Mikkel skal skrive "Ja" i Godkendt først.
const AUTO_GODKEND = false;

// Holdnavne og ord, der genkendes i emnefeltet, når en ny coach skriver første gang.
// Står præcis ét hold i emnet, tilmeldes afsenderen automatisk til det hold i fanen Coaches.
const HOLD = {
  "The Eternal Sages": ["eternal sages", "sages"],
  "Elmtree Evaders": ["elmtree"],
  "The Maurading Ocras": ["ocras", "maurading", "marauding"],
  "Mörkley Crüe": ["morkley"],
  "Fright Night Fumblers": ["fright night", "fumblers"],
  "The Full Moon Foulers": ["full moon", "foulers"],
  "The FumbleBoyz": ["fumbleboyz", "fumble boyz"],
  "GutBuster Gluttons": ["gutbuster", "gluttons"],
  "Return Of The Living Deadbeats": ["deadbeats", "living dead"],
  "Da Demolitionaz": ["demolitionaz"],
  "Black Mountain Slavers": ["black mountain", "slavers"],
  "Bedstefars Besudlere": ["bedstefar", "besudlere"],
  "Bros Being Bros": ["bros being bros"]
};
const AUTOMATISK = /(^|[.@])(no-?reply|mailer-daemon|postmaster)|@(accounts\.)?google\.com$/;

/** Kør én gang. Opretter faner, det offentlige ark og de automatiske kørsler. */
function opsaet() {
  const ss = SpreadsheetApp.getActive();
  const coaches = ss.getSheetByName(FANE_COACHES) || ss.insertSheet(FANE_COACHES);
  if (coaches.getLastRow() === 0) {
    coaches.appendRow(["Mail", "Hold", "Coach (valgfrit)"]);
    coaches.setFrozenRows(1);
  }
  const indbakke = ss.getSheetByName(FANE_INDBAKKE) || ss.insertSheet(FANE_INDBAKKE);
  if (indbakke.getLastRow() === 0) {
    indbakke.appendRow(KOLONNER);
    indbakke.setFrozenRows(1);
    indbakke.setColumnWidth(6, 420);
  }

  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty(NOEGLE_UDGIVET);
  if (!id) {
    const pub = SpreadsheetApp.create("Pressechefens udgivelser (offentlig)");
    pub.getSheets()[0].setName("Udgivet").appendRow(["ID", "Dato", "Hold", "Overskrift", "Tekst"]);
    DriveApp.getFileById(pub.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    id = pub.getId();
    props.setProperty(NOEGLE_UDGIVET, id);
  }

  ScriptApp.getProjectTriggers().forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("koer").timeBased().everyMinutes(10).create();
  ScriptApp.newTrigger("vedRedigering").forSpreadsheet(ss).onEdit().create();

  const info = ss.getSheetByName(FANE_INFO) || ss.insertSheet(FANE_INFO);
  info.clear();
  info.getRange("A1:B4").setValues([
    ["Opsætning færdig", new Date()],
    ["Send dette ID til Claude:", id],
    ["Offentligt ark (siden læser det):", "https://docs.google.com/spreadsheets/d/" + id],
    ["Godkend et indlæg:", "Skriv Ja i kolonnen Godkendt i fanen Indbakke"]
  ]);
  info.setColumnWidth(1, 260);
  koer();
  Logger.log("Færdig. Send dette ID til Claude: " + id);
}

/** Kører automatisk hvert 10. minut. */
function koer() {
  hentMails();
  synk();
}

/** Kører automatisk, når nogen retter i arket (fx skriver Ja i Godkendt). */
function vedRedigering(e) {
  if (e && e.range && e.range.getSheet().getName() === FANE_INDBAKKE) synk();
}

function hentMails() {
  const ss = SpreadsheetApp.getActive();
  const indbakke = ss.getSheetByName(FANE_INDBAKKE);
  const kendte = new Set(indbakke.getRange(1, 1, Math.max(indbakke.getLastRow(), 1), 1).getValues().map((r) => String(r[0])));
  const coaches = coachKort();
  const mig = Session.getEffectiveUser().getEmail().toLowerCase();

  GmailApp.search("in:inbox newer_than:30d", 0, 50).forEach((traad) => {
    traad.getMessages().forEach((m) => {
      if (kendte.has(m.getId())) return;
      const fra = afsender(m.getFrom());
      if (fra === mig) return; // Gunnars egne svar
      if (AUTOMATISK.test(fra)) { kendte.add(m.getId()); return; } // Googles og andres automatiske mails
      let hold = coaches[fra] || "";
      if (!hold) {
        hold = findHold(m.getSubject());
        if (hold) { tilmeld(fra, hold); coaches[fra] = hold; }
      }
      let tekst = rens(m.getPlainBody());
      m.getAttachments().forEach((a) => {
        if (/\.docx?$/i.test(a.getName())) {
          const t = wordTekst(a);
          if (t) tekst = t;
        }
      });
      const overskrift = (m.getSubject() || "").replace(/^(re|fw|fwd|vs|sv):\s*/i, "").trim() || "Pressemeddelelse";
      indbakke.appendRow([m.getId(), m.getDate(), fra, hold, overskrift, tekst.slice(0, 45000), AUTO_GODKEND && hold ? "Ja" : "", ""]);
      kendte.add(m.getId());
    });
  });
}

/** Kopierer godkendte indlæg til det offentlige ark (uden mailadresser). */
function synk() {
  const ss = SpreadsheetApp.getActive();
  const id = PropertiesService.getScriptProperties().getProperty(NOEGLE_UDGIVET);
  if (!id) return;
  const indbakke = ss.getSheetByName(FANE_INDBAKKE);
  const data = indbakke.getDataRange().getValues();
  const ud = [["ID", "Dato", "Hold", "Overskrift", "Tekst"]];
  const status = [];
  for (let i = 1; i < data.length; i++) {
    const [mid, modtaget, , hold, overskrift, tekst, godkendt] = data[i];
    const ok = /^\s*ja/i.test(String(godkendt)) && String(hold).trim() !== "";
    status.push([ok ? "Ja" : ""]);
    if (!ok) continue;
    const dato = modtaget instanceof Date ? Utilities.formatDate(modtaget, "Europe/Copenhagen", "yyyy-MM-dd") : String(modtaget);
    ud.push([String(mid), dato, String(hold).trim(), String(overskrift), String(tekst)]);
  }
  if (status.length) indbakke.getRange(2, 8, status.length, 1).setValues(status);
  const pub = SpreadsheetApp.openById(id).getSheetByName("Udgivet");
  pub.clearContents();
  pub.getRange(1, 1, ud.length, 5).setValues(ud);
}

function coachKort() {
  const fane = SpreadsheetApp.getActive().getSheetByName(FANE_COACHES);
  const kort = {};
  if (!fane) return kort;
  fane.getDataRange().getValues().slice(1).forEach((r) => {
    const mail = String(r[0]).trim().toLowerCase();
    if (mail) kort[mail] = String(r[1]).trim();
  });
  return kort;
}

const norm = (s) => String(s || "").toLowerCase().replace(/ø/g, "o").replace(/æ/g, "ae").replace(/å/g, "a").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Finder præcis ét hold i en tekst (fx emnefeltet). Flere eller ingen = "". */
function findHold(tekst) {
  const ord = norm(tekst).replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  const fundne = Object.keys(HOLD).filter((h) => HOLD[h].some((a) => ligner(ord, norm(a))));
  return fundne.length === 1 ? fundne[0] : "";
}

/** Tåler stavefejl: 1 forkert bogstav i ord på 5+ tegn, 2 i ord på 9+ tegn. */
function ligner(ord, alias) {
  const dele = alias.split(" ");
  const max = alias.length >= 9 ? 2 : alias.length >= 5 ? 1 : 0;
  for (let i = 0; i + dele.length <= ord.length; i++) {
    const bid = ord.slice(i, i + dele.length).join(" ");
    if (afstand(bid, alias) <= max) return true;
  }
  return false;
}

/** Antal bogstaver, der skal rettes for at gøre a til b (Levenshtein). */
function afstand(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

/** Skriver en ny coach i fanen Coaches. */
function tilmeld(mail, hold) {
  const fane = SpreadsheetApp.getActive().getSheetByName(FANE_COACHES);
  if (fane) fane.appendRow([mail, hold, "Tilmeldt automatisk " + Utilities.formatDate(new Date(), "Europe/Copenhagen", "d/M yyyy")]);
}

function afsender(fra) {
  const m = String(fra).match(/<([^>]+)>/);
  return (m ? m[1] : String(fra)).trim().toLowerCase();
}

/** Fjerner signaturer og citerede svar fra mailteksten. */
function rens(tekst) {
  const linjer = String(tekst || "").replace(/\r/g, "").split("\n");
  const ud = [];
  for (const l of linjer) {
    if (/^(--\s*$|Sendt fra min|Sent from my|Hent Outlook|Get Outlook)/i.test(l.trim())) break;
    if (/^(Den .* skrev|On .* wrote):?\s*$/i.test(l.trim())) break;
    if (/^>/.test(l)) continue;
    ud.push(l);
  }
  return ud.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** Læser teksten fra et vedhæftet Word-dokument (kræver tjenesten Drive API). */
function wordTekst(blob) {
  try {
    const fil = Drive.Files.create({ name: blob.getName(), mimeType: MimeType.GOOGLE_DOCS }, blob);
    const tekst = DocumentApp.openById(fil.id).getBody().getText();
    DriveApp.getFileById(fil.id).setTrashed(true);
    return tekst.trim();
  } catch (e) {
    Logger.log("Kunne ikke læse Word-fil: " + e);
    return "";
  }
}
