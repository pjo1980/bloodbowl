// Pressetribunens indbakke på Cloudflare (Pages Functions). Erstatter Google-formularen: intet Google, intet login.
//   GET  /api/presse                 -> alle indlæg (skjulte kun som { id, skjult: true }; med x-admin-kode: det hele)
//   POST /api/presse                 -> nyt indlæg (multipart: kode, hold, type, overskrift, tekst, navn, billede)
//   GET  /api/presse/billede/<id>    -> indlæggets billede
//   POST /api/presse/skjul           -> JSON { id, kode, skjul: true|false } (kræver ADMIN_KODE)
//   POST /api/presse/tjek            -> JSON { kode } -> { admin: true|false } (til redaktør-feltet)
// Opsætning i Cloudflare (se pressechef/INDSEND.md): KV-binding PRESSE_KV og hemmelighederne LIGA_KODE og ADMIN_KODE.
// Koderne står ALDRIG i repoet, for det er offentligt.

const MAX_TEKST = 20000;
const MAX_BILLEDE = 4 * 1024 * 1024; // browseren skalerer ned til ca. 0,3-1 MB, før den sender
const TYPER = ["Kampreferat", "Interview", "Pressemeddelelse", "Rygte", "Lore"];

const svar = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});
const fejl = (tekst, status = 400) => svar({ fejl: tekst }, status);
const ens = (a, b) => !!a && !!b && String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
const ren = (s, max) => String(s || "").replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "").trim().slice(0, max);

async function hentListe(env) {
  return (await env.PRESSE_KV.get("indlaeg", "json")) || [];
}

// Kun rigtige billeder (JPEG, PNG, WebP) ud fra filens første bytes, ikke hvad browseren påstår.
function billedType(b) {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45) return "image/webp";
  return "";
}

async function liste(env, request) {
  const admin = ens(request.headers.get("x-admin-kode"), env.ADMIN_KODE);
  const alle = await hentListe(env);
  return svar(admin ? alle : alle.map((p) => (p.skjult ? { id: p.id, skjult: true } : p)));
}

async function indsend(env, request) {
  let f;
  try { f = await request.formData(); } catch { return fejl("Kunne ikke læse formularen."); }
  if (f.get("hjemmeside")) return svar({ ok: true, id: "" }); // fælde for spam-robotter
  if (!ens(f.get("kode"), env.LIGA_KODE)) return fejl("Forkert liga-kode. Spørg Peter eller Mikkel.", 403);
  const hold = ren(f.get("hold"), 60);
  const type = TYPER.includes(f.get("type")) ? f.get("type") : "Pressemeddelelse";
  const overskrift = ren(f.get("overskrift"), 150);
  const tekst = ren(f.get("tekst"), MAX_TEKST);
  const navn = ren(f.get("navn"), 60);
  if (!hold || !overskrift || !tekst) return fejl("Hold, overskrift og tekst skal udfyldes.");

  const id = "web-" + Date.now();
  let billede = false;
  const fil = f.get("billede");
  if (fil && typeof fil === "object" && fil.size > 0) {
    if (fil.size > MAX_BILLEDE) return fejl("Billedet er for stort (højst 4 MB).");
    const data = await fil.arrayBuffer();
    const mime = billedType(new Uint8Array(data.slice(0, 12)));
    if (!mime) return fejl("Billedet skal være JPG, PNG eller WebP.");
    await env.PRESSE_KV.put("billede:" + id, data, { metadata: { type: mime } });
    billede = true;
  }

  const dato = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Copenhagen" }); // ÅÅÅÅ-MM-DD
  const alle = await hentListe(env);
  alle.unshift({ id, dato, hold, type, overskrift, tekst, navn, billede, skjult: false });
  await env.PRESSE_KV.put("indlaeg", JSON.stringify(alle));
  return svar({ ok: true, id });
}

async function billede(env, id) {
  if (!/^web-\d+$/.test(id)) return fejl("Ukendt billede.", 404);
  const { value, metadata } = await env.PRESSE_KV.getWithMetadata("billede:" + id, "arrayBuffer");
  if (!value) return fejl("Ukendt billede.", 404);
  return new Response(value, { headers: {
    "content-type": (metadata && metadata.type) || "image/jpeg",
    "cache-control": "public, max-age=86400",
    "x-content-type-options": "nosniff"
  } });
}

async function skjul(env, request) {
  let d;
  try { d = await request.json(); } catch { return fejl("Ugyldig forespørgsel."); }
  if (!ens(d.kode, env.ADMIN_KODE)) return fejl("Forkert redaktør-kode.", 403);
  const alle = await hentListe(env);
  const p = alle.find((x) => x.id === d.id);
  if (!p) return fejl("Indlægget findes ikke.", 404);
  p.skjult = !!d.skjul;
  await env.PRESSE_KV.put("indlaeg", JSON.stringify(alle));
  return svar({ ok: true });
}

export async function onRequest({ request, env, params }) {
  if (!env.PRESSE_KV || !env.LIGA_KODE || !env.ADMIN_KODE) {
    if (request.method === "GET" && !(params.sti || []).length) return svar([]); // siden virker, før det er sat op
    return fejl("Indsendelse er ikke sat op endnu. Prøv igen senere.", 503);
  }
  const sti = params.sti || [];
  const m = request.method;
  if (!sti.length && m === "GET") return liste(env, request);
  if (!sti.length && m === "POST") return indsend(env, request);
  if (sti[0] === "billede" && sti[1] && m === "GET") return billede(env, sti[1]);
  if (sti[0] === "skjul" && m === "POST") return skjul(env, request);
  if (sti[0] === "tjek" && m === "POST") {
    let d = {};
    try { d = await request.json(); } catch {}
    return svar({ admin: ens(d.kode, env.ADMIN_KODE) });
  }
  return fejl("Ukendt adresse.", 404);
}
