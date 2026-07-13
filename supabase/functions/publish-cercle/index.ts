// publish-cercle: bascule le statut du Cercle entre 'brouillon' et 'publie'.
import { corsHeaders, jsonRes, adminClient, validateToken } from "../_shared/cercle-token.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonRes({ error: "Method not allowed" }, 405);

  try {
    const { token, action } = await req.json().catch(() => ({}));
    const admin = adminClient();
    const check = await validateToken(admin, token);
    if (!check.ok) return jsonRes({ error: check.error }, check.status);

    // action: 'publier' | 'pause'
    const target = action === "pause" ? "brouillon" : "publie";

    const { data: current } = await admin
      .from("cercles")
      .select("statut")
      .eq("id", check.cercle_id)
      .maybeSingle();
    if (!current) return jsonRes({ error: "Cercle introuvable" }, 404);
    if (current.statut === "cloture") return jsonRes({ error: "Cercle clôturé" }, 409);

    const { data, error } = await admin
      .from("cercles")
      .update({ statut: target })
      .eq("id", check.cercle_id)
      .select("statut, slug")
      .maybeSingle();
    if (error) return jsonRes({ error: "Erreur publication" }, 500);

    return jsonRes({ ok: true, cercle: data });
  } catch (err) {
    console.error("publish-cercle error:", err);
    return jsonRes({ error: "Erreur serveur" }, 500);
  }
});
