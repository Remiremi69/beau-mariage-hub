import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_leads",
  title: "Lister les leads du configurateur",
  description:
    "Retourne les leads récents captés via le configurateur Limen (Domaine de la Croix Rochefort). Réservé aux administrateurs (RLS).",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(20).describe("Nombre maximum de leads à retourner (défaut 20)."),
    status: z
      .string()
      .optional()
      .describe("Filtre optionnel sur le statut du lead (ex: 'new', 'contacted')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Non authentifié." }], isError: true };
    }
    let query = supabaseForUser(ctx)
      .from("configurateur_leads")
      .select(
        "id, created_at, prenom, nom, email, telephone, date_mariage, serie_label, guests_estimate, total_estimate, localisation, status",
      )
      .order("created_at", { ascending: false })
      .limit(limit);
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: `Erreur: ${error.message}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { leads: data ?? [], count: data?.length ?? 0 },
    };
  },
});
