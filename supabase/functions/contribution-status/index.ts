// contribution-status: expose UNIQUEMENT le statut d'une contribution donnée.
// Aucun email, montant ou autre donnée sensible n'est renvoyée.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  const cid = url.searchParams.get("cid");
  if (!cid || !/^[0-9a-f-]{36}$/i.test(cid)) {
    return json({ error: "cid invalide" }, 400);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data } = await supabase
    .from("contributions")
    .select("statut")
    .eq("id", cid)
    .maybeSingle();

  if (!data) return json({ statut: null }, 404);
  return json({ statut: data.statut }, 200);
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
