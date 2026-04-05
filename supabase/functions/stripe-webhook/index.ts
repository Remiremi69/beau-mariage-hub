import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!stripeKey || !webhookSecret) {
      console.error("Stripe keys not configured");
      return new Response("Server error", { status: 500 });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" });

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response("No signature", { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response("Invalid signature", { status: 400 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const tokenValue = session.metadata?.token;
      const leadId = session.metadata?.lead_id;

      if (tokenValue) {
        await supabase
          .from("lead_tokens")
          .update({
            status: "paid",
            stripe_session_id: session.id,
            stripe_payment_intent: typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id || null,
            used_at: new Date().toISOString(),
          })
          .eq("token", tokenValue);
      }

      if (leadId) {
        await supabase
          .from("configurateur_leads")
          .update({ status: "paid" })
          .eq("id", leadId);
      }

      console.log(`Payment completed for lead ${leadId}, token ${tokenValue}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Webhook error", { status: 500 });
  }
});
