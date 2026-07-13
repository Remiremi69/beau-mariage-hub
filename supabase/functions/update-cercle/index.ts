// update-cercle: met à jour mot_couple et/ou photo_url du Cercle.
// Accepte multipart/form-data: token (string), mot_couple? (string), photo? (File).
// Ou JSON: { token, mot_couple, photo_url } (si photo déjà uploadée ailleurs).
import { corsHeaders, jsonRes, adminClient, validateToken } from "../_shared/cercle-token.ts";

const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonRes({ error: "Method not allowed" }, 405);

  try {
    const admin = adminClient();
    const contentType = req.headers.get("content-type") ?? "";

    let token = "";
    let motCouple: string | null | undefined;
    let photoFile: File | null = null;
    let removePhoto = false;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      token = String(form.get("token") ?? "");
      if (form.has("mot_couple")) motCouple = String(form.get("mot_couple") ?? "");
      const p = form.get("photo");
      if (p instanceof File && p.size > 0) photoFile = p;
      if (String(form.get("remove_photo") ?? "") === "1") removePhoto = true;
    } else {
      const body = await req.json().catch(() => ({}));
      token = String(body.token ?? "");
      if ("mot_couple" in body) motCouple = body.mot_couple ?? "";
      if (body.remove_photo === true) removePhoto = true;
    }

    const check = await validateToken(admin, token);
    if (!check.ok) return jsonRes({ error: check.error }, check.status);
    const cercleId = check.cercle_id;

    const update: Record<string, unknown> = {};

    if (typeof motCouple === "string") {
      if (motCouple.length > 2000) return jsonRes({ error: "Mot trop long" }, 400);
      update.mot_couple = motCouple.trim() ? motCouple.trim() : null;
    }

    if (photoFile) {
      if (photoFile.size > MAX_PHOTO_BYTES) return jsonRes({ error: "Image trop lourde (max 8 Mo)" }, 400);
      if (!ALLOWED_MIME.has(photoFile.type)) return jsonRes({ error: "Format non supporté (jpg/png/webp)" }, 400);

      const ext = photoFile.type === "image/png" ? "png" : photoFile.type === "image/webp" ? "webp" : "jpg";
      const path = `${cercleId}/${Date.now()}.${ext}`;
      const bytes = new Uint8Array(await photoFile.arrayBuffer());

      const { error: upErr } = await admin.storage
        .from("cercle-photos")
        .upload(path, bytes, { contentType: photoFile.type, upsert: false });
      if (upErr) {
        console.error("upload photo error:", upErr);
        return jsonRes({ error: "Échec upload photo" }, 500);
      }
      const { data: signed, error: signErr } = await admin.storage
        .from("cercle-photos")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 5);
      if (signErr || !signed?.signedUrl) {
        console.error("sign photo error:", signErr);
        return jsonRes({ error: "Échec URL photo" }, 500);
      }
      update.photo_url = signed.signedUrl;
    } else if (removePhoto) {
      update.photo_url = null;
    }

    if (Object.keys(update).length === 0) {
      return jsonRes({ ok: true, updated: false });
    }

    const { data, error } = await admin
      .from("cercles")
      .update(update)
      .eq("id", cercleId)
      .select("mot_couple, photo_url")
      .maybeSingle();

    if (error) {
      console.error("update cercle error:", error);
      return jsonRes({ error: "Erreur mise à jour" }, 500);
    }

    return jsonRes({ ok: true, updated: true, cercle: data });
  } catch (err) {
    console.error("update-cercle error:", err);
    return jsonRes({ error: "Erreur serveur" }, 500);
  }
});
