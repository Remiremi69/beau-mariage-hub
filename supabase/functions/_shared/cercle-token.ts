// Shared helper to validate a Cercle management token via service role.
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function jsonRes(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export function adminClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

export async function validateToken(
  admin: SupabaseClient,
  token: string,
): Promise<{ ok: true; cercle_id: string } | { ok: false; status: number; error: string }> {
  if (!token || typeof token !== "string" || token.length < 16) {
    return { ok: false, status: 400, error: "Token manquant" };
  }
  const { data, error } = await admin
    .from("cercle_tokens")
    .select("cercle_id, status, expires_at")
    .eq("token", token)
    .maybeSingle();

  if (error) return { ok: false, status: 500, error: "Erreur lecture token" };
  if (!data) return { ok: false, status: 404, error: "Lien invalide" };
  if (data.status !== "active") return { ok: false, status: 403, error: "Lien révoqué" };
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return { ok: false, status: 403, error: "Lien expiré" };
  }
  return { ok: true, cercle_id: data.cercle_id as string };
}
