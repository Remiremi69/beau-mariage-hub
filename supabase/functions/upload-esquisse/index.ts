// Upload esquisse PDF for a lead using service role.
// Only allows setting esquisse_url once (when currently NULL) for the given lead_id.
// Anyone possessing a fresh, unguessable lead UUID (returned only to the submitter on insert)
// can call this once. Subsequent attempts to overwrite are rejected.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const form = await req.formData();
    const leadId = String(form.get("lead_id") || "");
    const file = form.get("file");

    if (!leadId || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: "Missing lead_id or file" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Basic validation
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(leadId)) {
      return new Response(JSON.stringify({ error: "Invalid lead_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (file.size > 10 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: "File too large" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (file.type !== "application/pdf") {
      return new Response(JSON.stringify({ error: "Only PDF allowed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Verify the lead exists and esquisse_url is still NULL (one-shot write)
    const { data: lead, error: leadErr } = await admin
      .from("configurateur_leads")
      .select("id, esquisse_url")
      .eq("id", leadId)
      .maybeSingle();

    if (leadErr || !lead) {
      return new Response(JSON.stringify({ error: "Lead not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (lead.esquisse_url) {
      return new Response(JSON.stringify({ error: "Esquisse already set" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const path = `${leadId}.pdf`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error: uploadErr } = await admin.storage
      .from("esquisses")
      .upload(path, bytes, { contentType: "application/pdf", upsert: true });
    if (uploadErr) throw uploadErr;

    const { data: signed, error: signErr } = await admin.storage
      .from("esquisses")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 5);
    if (signErr || !signed?.signedUrl) throw signErr || new Error("Sign failed");

    const { error: updErr } = await admin
      .from("configurateur_leads")
      .update({ esquisse_url: signed.signedUrl })
      .eq("id", leadId)
      .is("esquisse_url", null);
    if (updErr) throw updErr;

    return new Response(JSON.stringify({ url: signed.signedUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("upload-esquisse error:", err);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
