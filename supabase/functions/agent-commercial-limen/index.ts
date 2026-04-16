import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-webhook-name",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-6";
const AGENT_ID = "agent_011Ca7zwtS5KSLDEA6w674Rr";

interface LeadPayload {
  id?: string;
  prenom?: string | null;
  nom?: string | null;
  email?: string | null;
  telephone?: string | null;
  date_mariage?: string | null;
  guests_estimate?: number | null;
  repas_formule?: string | null;
  deco?: string | null;
  dj?: string | null;
  photographe?: string | null;
  total_estimate?: number | null;
  localisation?: string | null;
  rdv_semaine?: string | null;
  rdv_jour?: string | null;
  rdv_creneau?: string | null;
  coffret_demande?: boolean | null;
  status?: string | null;
  created_at?: string | null;
  [key: string]: unknown;
}

function formatLeadAsMessage(lead: LeadPayload): string {
  const lines: string[] = [
    "Nouveau lead reçu depuis le configurateur Limen :",
    "",
    `- ID : ${lead.id ?? "—"}`,
    `- Prénom : ${lead.prenom ?? "—"}`,
    `- Nom : ${lead.nom ?? "—"}`,
    `- Email : ${lead.email ?? "—"}`,
    `- Téléphone : ${lead.telephone ?? "—"}`,
    `- Date de mariage : ${lead.date_mariage ?? "—"}`,
    `- Nombre d'invités estimé : ${lead.guests_estimate ?? "—"}`,
    `- Localisation : ${lead.localisation ?? "—"}`,
    "",
    "Choix configurés :",
    `- Formule repas : ${lead.repas_formule ?? "—"}`,
    `- Décoration : ${lead.deco ?? "—"}`,
    `- DJ : ${lead.dj ?? "—"}`,
    `- Photographe : ${lead.photographe ?? "—"}`,
    `- Coffret demandé : ${lead.coffret_demande ? "Oui" : "Non"}`,
    "",
    "Estimation budgétaire :",
    `- Total estimé : ${lead.total_estimate ? `${lead.total_estimate} €` : "—"}`,
    "",
    "Rendez-vous souhaité :",
    `- Semaine : ${lead.rdv_semaine ?? "—"}`,
    `- Jour : ${lead.rdv_jour ?? "—"}`,
    `- Créneau : ${lead.rdv_creneau ?? "—"}`,
    "",
    `Statut actuel : ${lead.status ?? "—"}`,
    `Créé le : ${lead.created_at ?? "—"}`,
  ];
  return lines.join("\n");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY non configurée");
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY manquante" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Le webhook Supabase envoie soit le record directement, soit { type, table, record, ... }
    const raw = await req.json();
    const lead: LeadPayload =
      raw && typeof raw === "object" && "record" in raw && raw.record
        ? (raw.record as LeadPayload)
        : (raw as LeadPayload);

    console.log("Lead reçu pour agent commercial:", lead.id, lead.email);

    const userMessage = formatLeadAsMessage(lead);

    const anthropicResp = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        agent_id: AGENT_ID,
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
        metadata: {
          lead_id: lead.id ?? null,
          source: "configurateur_leads_webhook",
        },
      }),
    });

    const responseText = await anthropicResp.text();

    if (!anthropicResp.ok) {
      console.error(
        "Erreur Anthropic API:",
        anthropicResp.status,
        responseText,
      );
      return new Response(
        JSON.stringify({
          error: "Erreur Anthropic API",
          status: anthropicResp.status,
          details: responseText,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    let anthropicData: unknown;
    try {
      anthropicData = JSON.parse(responseText);
    } catch {
      anthropicData = { raw: responseText };
    }

    console.log("Agent commercial Limen exécuté avec succès pour", lead.email);

    return new Response(
      JSON.stringify({
        success: true,
        lead_id: lead.id ?? null,
        agent_response: anthropicData,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Erreur agent-commercial-limen:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Erreur inconnue",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
