// create-checkout: crée une contribution en_attente + une Stripe Checkout Session
// à montant dynamique, et renvoie l'URL de paiement.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return json({ error: "Stripe non configuré" }, 500);
    }
    const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" });

    const body = await req.json().catch(() => null);
    if (!body) return json({ error: "Corps invalide" }, 400);

    const { part_id, cercle_id, montant, prenom, mot, email } = body as {
      part_id?: string; cercle_id?: string; montant?: number;
      prenom?: string; mot?: string | null; email?: string;
    };

    const m = Number(montant);
    if (!part_id || !cercle_id) return json({ error: "part_id et cercle_id requis" }, 400);
    if (!m || m < 5) return json({ error: "Montant minimum 5 €" }, 400);
    if (m > 100000) return json({ error: "Montant trop élevé" }, 400);
    if (!prenom || !prenom.trim()) return json({ error: "Prénom requis" }, 400);
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return json({ error: "Email invalide" }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Vérifie que le cercle est publié et que la part appartient bien à ce cercle et est active
    const { data: cercle } = await supabase
      .from("cercles")
      .select("id, statut, slug, couple_id")
      .eq("id", cercle_id)
      .maybeSingle();

    if (!cercle || cercle.statut !== "publie") {
      return json({ error: "Ce Cercle n'est pas ouvert aux contributions" }, 400);
    }

    const { data: part } = await supabase
      .from("parts")
      .select("id, titre, cercle_id, actif")
      .eq("id", part_id)
      .maybeSingle();

    if (!part || part.cercle_id !== cercle_id || !part.actif) {
      return json({ error: "Cette part n'est plus disponible" }, 400);
    }

    // Récupère le prénom du couple pour la description
    const { data: couple } = await supabase
      .from("configurateur_leads")
      .select("prenom, nom")
      .eq("id", cercle.couple_id)
      .maybeSingle();
    const coupleLabel = [couple?.prenom, couple?.nom].filter(Boolean).join(" ") || "les mariés";

    // 1. Crée la contribution en_attente
    const { data: contribution, error: insertErr } = await supabase
      .from("contributions")
      .insert({
        part_id,
        prenom: prenom.trim(),
        mot: (mot || "").trim() || null,
        email: email.trim(),
        montant_declare: m,
        statut: "en_attente",
      })
      .select("id")
      .single();

    if (insertErr || !contribution) {
      console.error("insert contribution error", insertErr);
      return json({ error: "Impossible d'enregistrer votre part" }, 500);
    }

    // 2. Crée la Checkout Session
    const origin = req.headers.get("origin") || `https://${req.headers.get("host") || "lebeaumariage.fr"}`;
    const successUrl = `${origin}/cercle/${cercle.slug}?porte=1&cid=${contribution.id}`;
    const cancelUrl = `${origin}/cercle/${cercle.slug}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(m * 100),
          product_data: {
            name: `Une part — ${part.titre}`,
            description: `Le Cercle de ${coupleLabel}`,
          },
        },
      }],
      customer_email: email.trim(),
      metadata: {
        contribution_id: contribution.id,
        part_id,
        cercle_id,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      locale: "fr",
    });

    // 3. Stocke le session id sur la contribution
    await supabase
      .from("contributions")
      .update({ stripe_session_id: session.id })
      .eq("id", contribution.id);

    return json({ url: session.url, contribution_id: contribution.id }, 200);
  } catch (err) {
    console.error("create-checkout error:", err);
    return json({ error: "Erreur interne" }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
