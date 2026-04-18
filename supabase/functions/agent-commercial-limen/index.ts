import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    "",
    "Génère un email personnalisé, chaleureux et professionnel à envoyer directement à ce client. Ne mets pas de salutation type 'Bonjour [Prénom]' ni de signature, juste le corps du message.",
  ];
  return lines.join("\n");
}

function extractTextFromAnthropicResponse(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const obj = data as Record<string, unknown>;
  const content = obj.content;
  if (Array.isArray(content)) {
    return content
      .map((block: unknown) => {
        if (block && typeof block === "object") {
          const b = block as Record<string, unknown>;
          if (b.type === "text" && typeof b.text === "string") return b.text;
        }
        return "";
      })
      .filter(Boolean)
      .join("\n\n");
  }
  return "";
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

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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

    // Extraction du texte généré par l'agent
    const generatedText = extractTextFromAnthropicResponse(anthropicData);

    // Envoi notification Telegram
    let telegramDispatch: Record<string, unknown> = { attempted: false };
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const telegramText = [
          "🔔 Nouveau lead Limen",
          "",
          `Prénom : ${lead.prenom ?? "—"}`,
          `Date : ${lead.date_mariage ?? "—"}`,
          `Invités : ${lead.guests_estimate ?? "—"}`,
          `Budget : ${lead.total_estimate ?? "—"}€`,
          `Localisation : ${lead.localisation ?? "—"}`,
          "",
          "---",
          "EMAIL SUGGÉRÉ :",
          generatedText || "(aucun texte généré)",
        ].join("\n");

        const tgResp = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: telegramText,
              parse_mode: "HTML",
            }),
          },
        );

        const tgData = await tgResp.json().catch(() => ({}));
        if (!tgResp.ok) {
          console.error("Erreur envoi Telegram:", tgResp.status, tgData);
          telegramDispatch = { attempted: true, success: false, status: tgResp.status, response: tgData };
        } else {
          console.log("Notification Telegram envoyée pour lead", lead.id);
          telegramDispatch = { attempted: true, success: true };
        }
      } catch (tgErr) {
        console.error("Exception envoi Telegram:", tgErr);
        telegramDispatch = {
          attempted: true,
          success: false,
          error: tgErr instanceof Error ? tgErr.message : String(tgErr),
        };
      }
    } else {
      console.warn("Telegram non configuré (TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID manquant)");
      telegramDispatch = { attempted: false, reason: "missing_telegram_config" };
    }

    let emailDispatch: Record<string, unknown> = {
      attempted: false,
      reason: "no_recipient_or_text",
    };

    if (lead.email && generatedText && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        const { data: emailRes, error: emailErr } =
          await supabase.functions.invoke("send-transactional-email", {
            body: {
              templateName: "agent-commercial-message",
              recipientEmail: lead.email,
              idempotencyKey: `agent-commercial-${lead.id ?? crypto.randomUUID()}`,
              templateData: {
                prenom: lead.prenom ?? null,
                bodyText: generatedText,
              },
            },
          });

        if (emailErr) {
          console.error("Erreur envoi email transactionnel:", emailErr);
          emailDispatch = { attempted: true, success: false, error: String(emailErr) };
        } else {
          console.log("Email transactionnel envoyé pour", lead.email);
          emailDispatch = { attempted: true, success: true, response: emailRes };
        }
      } catch (sendErr) {
        console.error("Exception envoi email:", sendErr);
        emailDispatch = {
          attempted: true,
          success: false,
          error: sendErr instanceof Error ? sendErr.message : String(sendErr),
        };
      }
    } else {
      console.warn(
        "Email non envoyé — email du lead ou texte généré manquant, ou config Supabase absente",
        {
          hasEmail: !!lead.email,
          hasText: !!generatedText,
          hasSupabaseConfig: !!(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY),
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        lead_id: lead.id ?? null,
        agent_response: anthropicData,
        email_dispatch: emailDispatch,
        telegram_dispatch: telegramDispatch,
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
