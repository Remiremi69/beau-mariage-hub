// stripe-webhook-cercle: fait passer une contribution à "payee" (ou "echouee")
// uniquement après vérification de la signature Stripe.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!stripeKey || !webhookSecret) {
    console.error("Stripe env manquant");
    return new Response("Server error", { status: 500 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" });
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("No signature", { status: 400 });

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, signature, webhookSecret);
  } catch (err) {
    console.error("Signature invalide:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const contributionId = session.metadata?.contribution_id;
      if (!contributionId) {
        console.warn("Pas de contribution_id dans metadata", session.id);
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }

      // Vérif montant : on refuse toute divergence
      const { data: contribution } = await supabase
        .from("contributions")
        .select("id, montant_declare, statut")
        .eq("id", contributionId)
        .maybeSingle();

      if (!contribution) {
        console.warn("Contribution introuvable", contributionId);
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }

      const paidCents = session.amount_total ?? 0;
      const expectedCents = Math.round(Number(contribution.montant_declare) * 100);
      if (paidCents !== expectedCents) {
        console.error("Montant divergent", { paidCents, expectedCents, contributionId });
        await supabase.from("contributions")
          .update({ statut: "echouee" })
          .eq("id", contributionId);
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }

      await supabase
        .from("contributions")
        .update({ statut: "payee" })
        .eq("id", contributionId);

      console.log("Contribution payée:", contributionId);

      // Fire-and-forget : la génération du certificat et l'envoi de l'email sont
      // délégués à generate-certificate. Toute erreur y est loggée mais ne remonte
      // JAMAIS ici — sinon Stripe rejouerait l'événement et on risquerait un
      // double traitement. On ne bloque pas la réponse 200.
      supabase.functions
        .invoke("generate-certificate", { body: { contribution_id: contributionId } })
        .then(({ error }) => {
          if (error) console.error("generate-certificate invoke error:", error);
        })
        .catch((e) => console.error("generate-certificate invoke threw:", e));
    } else if (
      event.type === "checkout.session.expired" ||
      event.type === "checkout.session.async_payment_failed"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      const contributionId = session.metadata?.contribution_id;
      if (contributionId) {
        await supabase
          .from("contributions")
          .update({ statut: "echouee" })
          .eq("id", contributionId);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("stripe-webhook-cercle error:", err);
    return new Response("Webhook handler error", { status: 500 });
  }
});
