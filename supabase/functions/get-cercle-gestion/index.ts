// get-cercle-gestion: retourne les données du Cercle pour l'espace couple.
// Accès par token (pas d'auth). Ne renvoie JAMAIS: montant_cible, emails, montants individuels.
import { corsHeaders, jsonRes, adminClient, validateToken } from "../_shared/cercle-token.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonRes({ error: "Method not allowed" }, 405);

  try {
    const { token } = await req.json().catch(() => ({}));
    const admin = adminClient();
    const check = await validateToken(admin, token);
    if (!check.ok) return jsonRes({ error: check.error }, check.status);

    const cercleId = check.cercle_id;

    const { data: cercle, error: cErr } = await admin
      .from("cercles")
      .select("id, slug, statut, mot_couple, photo_url, couple_id, date_cloture")
      .eq("id", cercleId)
      .maybeSingle();
    if (cErr || !cercle) return jsonRes({ error: "Cercle introuvable" }, 404);

    const [{ data: couple }, { data: partsRaw }, { data: contribs }] = await Promise.all([
      admin
        .from("configurateur_leads")
        .select("prenom, nom")
        .eq("id", cercle.couple_id)
        .maybeSingle(),
      // NB: on lit montant_cible en interne pour connaître la liste, mais on ne le renvoie PAS
      admin
        .from("parts")
        .select("id, titre, evocation, ordre, actif")
        .eq("cercle_id", cercleId)
        .eq("actif", true)
        .order("ordre", { ascending: true }),
      admin
        .from("contributions")
        .select("part_id, prenom, mot, created_at")
        .eq("statut", "payee")
        .in(
          "part_id",
          // sous-requête impossible ici → on filtrera après
          [],
        ),
    ]);

    const parts = partsRaw ?? [];
    const partIds = parts.map((p) => p.id);

    // Deuxième requête ciblée sur les part_ids réels
    let contribsFiltered: Array<{ part_id: string; prenom: string; mot: string | null; created_at: string }> = [];
    if (partIds.length > 0) {
      const { data: cs } = await admin
        .from("contributions")
        .select("part_id, prenom, mot, created_at")
        .eq("statut", "payee")
        .in("part_id", partIds);
      contribsFiltered = (cs ?? []) as typeof contribsFiltered;
    }

    // Compteurs par part (nombre de proches uniquement)
    const counts: Record<string, number> = {};
    for (const c of contribsFiltered) {
      counts[c.part_id] = (counts[c.part_id] ?? 0) + 1;
    }

    // Mur des mots (prénom + mot, sans email ni montant)
    const mots = contribsFiltered
      .filter((c) => c.mot && c.mot.trim().length > 0)
      .map((c) => ({ prenom: c.prenom, mot: c.mot, created_at: c.created_at }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return jsonRes({
      cercle: {
        slug: cercle.slug,
        statut: cercle.statut,
        mot_couple: cercle.mot_couple,
        photo_url: cercle.photo_url,
      },
      couple: couple ?? null,
      parts: parts.map((p) => ({
        id: p.id,
        titre: p.titre,
        evocation: p.evocation,
        ordre: p.ordre,
        nb_proches: counts[p.id] ?? 0,
      })),
      mots,
    });
  } catch (err) {
    console.error("get-cercle-gestion error:", err);
    return jsonRes({ error: "Erreur serveur" }, 500);
  }
});
