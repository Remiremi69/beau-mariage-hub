import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "update_lead_status",
  title: "Mettre à jour le statut d'un lead",
  description:
    "Met à jour le statut d'un lead du configurateur (ex: 'new', 'contacted', 'qualified', 'lost'). Réservé aux administrateurs.",
  inputSchema: {
    id: z.string().uuid().describe("UUID du lead."),
    status: z.string().min(1).max(50).describe("Nouveau statut."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Non authentifié." }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("configurateur_leads")
      .update({ status })
      .eq("id", id)
      .select("id, status")
      .maybeSingle();
    if (error) {
      return { content: [{ type: "text", text: `Erreur: ${error.message}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Lead ${data?.id} mis à jour en statut '${data?.status}'.` }],
      structuredContent: { lead: data },
    };
  },
});
