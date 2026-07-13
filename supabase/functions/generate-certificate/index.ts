// generate-certificate: génère un certificat de part (PNG) et l'envoie par email.
// Invoquée en fire-and-forget par stripe-webhook-cercle après passage à `payee`.
// Idempotente : ne fait rien si `certificat_url` déjà rempli ou si `statut != 'payee'`.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resvg, initWasm } from "npm:@resvg/resvg-wasm@2.6.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Polices hébergées dans le bucket privé `fonts` de Supabase Storage
// (fichiers uploadés une fois pour toutes — pas de dépendance à GitHub).
const FONT_FILES = [
  "CormorantGaramond-Regular.ttf",
  "CormorantGaramond-Italic.ttf",
  "Jost-Regular.ttf",
];

const WASM_URL = "https://unpkg.com/@resvg/resvg-wasm@2.6.2/index_bg.wasm";

// Cache global (persiste entre invocations sur la même instance)
let wasmReady: Promise<void> | null = null;
let fontBuffersCache: Uint8Array[] | null = null;

async function ensureWasm() {
  if (!wasmReady) {
    wasmReady = (async () => {
      const wasm = await fetch(WASM_URL).then((r) => r.arrayBuffer());
      await initWasm(wasm);
    })();
  }
  await wasmReady;
}

async function loadFonts(
  supabase: ReturnType<typeof createClient>,
): Promise<Uint8Array[]> {
  if (fontBuffersCache) return fontBuffersCache;
  const buffers = await Promise.all(
    FONT_FILES.map(async (file) => {
      const { data, error } = await supabase.storage.from("fonts").download(file);
      if (error || !data) {
        throw new Error(`Font download ${file}: ${error?.message ?? "no data"}`);
      }
      return new Uint8Array(await data.arrayBuffer());
    }),
  );
  fontBuffersCache = buffers;
  return buffers;
}

// Normalise "ANTO" ou "anto" → "Anto"
function toProperCase(s: string): string {
  return s
    .toLowerCase()
    .split(/(\s|-)/)
    .map((part) => (part.length && !/\s|-/.test(part) ? part[0].toUpperCase() + part.slice(1) : part))
    .join("");
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Découpage naïf pour titres longs
function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > maxCharsPerLine && current) {
      lines.push(current);
      current = w;
    } else {
      current = (current + " " + w).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildSVG(opts: {
  prenom: string;
  poste: string;
  couple: string;
  date: string;
  shortId: string;
}): string {
  const W = 1080;
  const H = 1440;
  const NUIT = "#1A1814";
  const LIN = "#F5F0E8";
  const OR = "#C8A96E";

  const prenom = escapeXml(opts.prenom);
  const posteLines = wrapText(opts.poste, 22).map(escapeXml);
  const couple = escapeXml(opts.couple);
  const date = escapeXml(opts.date);
  const shortId = escapeXml(opts.shortId.toUpperCase());

  // Arche SVG (mêmes proportions que la page web, centrée en haut)
  const arche = `
    <g transform="translate(340, 200)">
      <path d="M 60 250 L 60 140 Q 60 40 200 40 Q 340 40 340 140 L 340 250"
            fill="none" stroke="${OR}" stroke-width="1.4" opacity="0.75"/>
      <path d="M 90 250 L 90 150 Q 90 70 200 70 Q 310 70 310 150 L 310 250"
            fill="none" stroke="${OR}" stroke-width="0.9" opacity="0.45"/>
      <line x1="200" y1="90" x2="200" y2="250" stroke="${OR}" stroke-width="0.6" opacity="0.35"/>
    </g>
  `;

  // Positions verticales
  const posteBaseY = 780;
  const posteLineHeight = 62;
  const posteBlockHeight = posteLines.length * posteLineHeight;
  const posteEndY = posteBaseY + posteBlockHeight;

  const posteTspans = posteLines
    .map(
      (line, i) =>
        `<tspan x="${W / 2}" dy="${i === 0 ? 0 : posteLineHeight}">${line}</tspan>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${NUIT}"/>

  <!-- Label haut -->
  <text x="${W / 2}" y="100" fill="${OR}" opacity="0.85"
        font-family="Jost" font-size="22" letter-spacing="12" text-anchor="middle">
    LE CERCLE
  </text>

  ${arche}

  <!-- Prénom du porteur -->
  <text x="${W / 2}" y="640" fill="${LIN}"
        font-family="Cormorant Garamond" font-style="italic" font-weight="400"
        font-size="120" text-anchor="middle">
    ${prenom}
  </text>

  <!-- "porte" -->
  <text x="${W / 2}" y="720" fill="${LIN}" opacity="0.7"
        font-family="Cormorant Garamond" font-style="italic" font-size="34" text-anchor="middle">
    porte
  </text>

  <!-- Titre du poste (peut faire plusieurs lignes) -->
  <text x="${W / 2}" y="${posteBaseY}" fill="${OR}"
        font-family="Cormorant Garamond" font-weight="400"
        font-size="52" text-anchor="middle">
    ${posteTspans}
  </text>

  <!-- Filet or -->
  <line x1="${W / 2 - 40}" y1="${posteEndY + 40}" x2="${W / 2 + 40}" y2="${posteEndY + 40}"
        stroke="${OR}" stroke-width="1" opacity="0.5"/>

  <!-- Pour le mariage de -->
  <text x="${W / 2}" y="${posteEndY + 110}" fill="${LIN}" opacity="0.75"
        font-family="Cormorant Garamond" font-style="italic" font-size="30" text-anchor="middle">
    pour le mariage de ${couple}
  </text>

  <!-- Phrase d'évocation -->
  <text x="${W / 2}" y="${posteEndY + 200}" fill="${LIN}" opacity="0.65"
        font-family="Cormorant Garamond" font-style="italic" font-size="28" text-anchor="middle">
    Le jour venu, il existera grâce à vous.
  </text>

  <!-- Bas : date + identifiant -->
  <text x="${W / 2}" y="${H - 90}" fill="${LIN}" opacity="0.55"
        font-family="Jost" font-size="16" letter-spacing="4" text-anchor="middle">
    ${date}
  </text>
  <text x="${W / 2}" y="${H - 55}" fill="${OR}" opacity="0.7"
        font-family="Jost" font-size="12" letter-spacing="6" text-anchor="middle">
    PART N° ${shortId}
  </text>
</svg>`;
}

function formatDate(iso: string | null | undefined): string {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  let contribution_id: string | undefined;
  try {
    const body = await req.json();
    contribution_id = body?.contribution_id;
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  if (!contribution_id) return json({ error: "contribution_id requis" }, 400);

  try {
    // 1. Charge la contribution
    const { data: contribution, error: cErr } = await supabase
      .from("contributions")
      .select("id, prenom, email, part_id, statut, certificat_url, created_at")
      .eq("id", contribution_id)
      .maybeSingle();
    if (cErr) throw cErr;
    if (!contribution) return json({ error: "contribution introuvable" }, 404);
    if (contribution.statut !== "payee") {
      return json({ skipped: true, reason: "not_payee" }, 200);
    }
    if (contribution.certificat_url) {
      return json({ skipped: true, reason: "already_generated" }, 200);
    }

    // 2. Charge poste + cercle + couple
    const { data: part } = await supabase
      .from("parts")
      .select("titre, cercle_id")
      .eq("id", contribution.part_id)
      .maybeSingle();
    if (!part) throw new Error("part introuvable");

    const { data: cercle } = await supabase
      .from("cercles")
      .select("slug, couple_id")
      .eq("id", part.cercle_id)
      .maybeSingle();
    if (!cercle) throw new Error("cercle introuvable");

    const { data: couple } = await supabase
      .from("configurateur_leads")
      .select("prenom, nom")
      .eq("id", cercle.couple_id)
      .maybeSingle();

    const prenomPorteur = toProperCase((contribution.prenom || "").trim() || "Invité");
    const posteTitre = part.titre || "une part";
    const couplePrenom = toProperCase((couple?.prenom || "").trim());
    const coupleNom = toProperCase((couple?.nom || "").trim());
    const coupleLabel = [couplePrenom, coupleNom].filter(Boolean).join(" & ") || "les mariés";

    // 3. Rendu SVG → PNG
    await ensureWasm();
    const fontBuffers = await loadFonts(supabase);

    const svg = buildSVG({
      prenom: prenomPorteur,
      poste: posteTitre,
      couple: coupleLabel,
      date: formatDate(contribution.created_at),
      shortId: contribution.id.slice(0, 8),
    });

    const resvg = new Resvg(svg, {
      background: "#1A1814",
      font: {
        fontBuffers,
        loadSystemFonts: false,
        defaultFontFamily: "Cormorant Garamond",
      },
      fitTo: { mode: "width", value: 1080 },
    });
    const pngBuffer = resvg.render().asPng();

    // 4. Upload dans le bucket privé `certificats`
    const path = `certificats/${contribution.id}.png`;
    const { error: upErr } = await supabase.storage
      .from("certificats")
      .upload(path, pngBuffer, { contentType: "image/png", upsert: true });
    if (upErr) throw upErr;

    // Signed URL longue durée (10 ans) — le bucket est privé
    const { data: signed, error: sErr } = await supabase.storage
      .from("certificats")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (sErr || !signed?.signedUrl) throw sErr || new Error("signed URL manquante");

    // 5. Enregistre l'URL
    await supabase
      .from("contributions")
      .update({ certificat_url: signed.signedUrl })
      .eq("id", contribution.id);

    // 6. Envoie l'email
    const publicUrl = Deno.env.get("PUBLIC_SITE_URL") || "https://lebeaumariage.fr";
    const cercleUrl = `${publicUrl}/cercle/${cercle.slug}`;

    const { error: mailErr } = await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "certificat-part",
        recipientEmail: contribution.email,
        idempotencyKey: `cert-${contribution.id}`,
        templateData: {
          prenom: prenomPorteur,
          poste: posteTitre,
          couple: coupleLabel,
          certificat_url: signed.signedUrl,
          cercle_url: cercleUrl,
        },
      },
    });
    if (mailErr) {
      console.error("Erreur envoi email certificat", mailErr);
      // On ne fait pas échouer : le certificat est stocké et récupérable depuis la page.
    }

    return json({ ok: true, certificat_url: signed.signedUrl }, 200);
  } catch (err) {
    console.error("generate-certificate error:", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
