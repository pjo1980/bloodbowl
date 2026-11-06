/**
 * Bygger coachernes formular "Semper Fortuna – Pressetribunen" og svar-arket i ét hug.
 * Kør én gang fra script.google.com på Peters egen Google-konto (se FORMULAR.md).
 * Til sidst står to links i loggen: ARK og FORMULAR. Send dem til Claude.
 */
function opretPressetribunen() {
  const HOLD = [
    "Bedstefars Besudlere", "Black Mountain Slavers", "Bros Being Bros", "Da Demolitionaz",
    "Elmtree Evaders", "Fright Night Fumblers", "GutBuster Gluttons", "Mörkley Crüe",
    "Return Of The Living Deadbeats", "The Eternal Sages", "The FumbleBoyz",
    "The Full Moon Foulers", "The Maurading Ocras"
  ];

  const form = FormApp.create("Semper Fortuna – Pressetribunen");
  form.setDescription("Indsend kampreferater, interviews, rygter og pressemeddelelser til ligasiden. " +
    "Det kommer på siden af sig selv inden for få minutter.");
  form.setCollectEmail(false);            // arket er offentligt, så ingen mailadresser
  form.setLimitOneResponsePerUser(false); // ellers skal coaches logge ind
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(true);
  form.setConfirmationMessage("Tak! Dit indlæg kommer på ligasiden om få minutter. Pressechefen er allerede ved at læse det.");

  form.addListItem().setTitle("Hold").setChoiceValues(HOLD).setRequired(true);
  form.addMultipleChoiceItem().setTitle("Type")
    .setChoiceValues(["Kampreferat", "Interview", "Pressemeddelelse", "Rygte", "Lore"]).setRequired(true);
  form.addTextItem().setTitle("Overskrift").setRequired(true);
  form.addParagraphTextItem().setTitle("Tekst")
    .setHelpText("Sæt bare teksten ind. Også tekst fra ChatGPT. Vi sætter den pænt op.").setRequired(true);
  form.addTextItem().setTitle("Dit navn")
    .setHelpText("Valgfrit. Coachens eller figurens navn, fx Coach Svulst-Stank.");

  try { if (form.setPublished) form.setPublished(true); } catch (e) { /* ældre formularer er altid udgivet */ }

  // Svar-arket: ét faneblad med svarene + kolonnen "Skjul" til at fjerne indlæg fra siden.
  const ss = SpreadsheetApp.create("Pressetribunen – svar");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  SpreadsheetApp.flush();
  Utilities.sleep(3000);
  const ark = SpreadsheetApp.openById(ss.getId());
  const svar = ark.getSheets().find((s) => s.getFormUrl()) || ark.getSheets()[0];
  ark.getSheets().forEach((s) => { if (s.getSheetId() !== svar.getSheetId()) ark.deleteSheet(s); });
  const sidste = Math.max(svar.getLastColumn(), 6);
  svar.getRange(1, sidste + 1).setValue("Skjul").setFontWeight("bold");
  svar.getRange(1, sidste + 1).setNote("Skriv x her ud for et indlæg for at fjerne det fra ligasiden.");

  // Siden skal kunne læse arket: alle med linket må se det (ikke rette).
  DriveApp.getFileById(ss.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  let kort = form.getPublishedUrl();
  try { kort = form.shortenFormUrl(kort); } catch (e) {}
  Logger.log("Færdig! Send disse to linjer til Claude:");
  Logger.log("ARK: " + ark.getUrl());
  Logger.log("FORMULAR: " + kort);
}
