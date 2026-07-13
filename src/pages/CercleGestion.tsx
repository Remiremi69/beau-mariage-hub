import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";

const NUIT = "#1A1814";
const LIN = "#F5F0E8";
const OR = "#C8A96E";

type PartLite = {
  id: string;
  titre: string;
  evocation: string | null;
  ordre: number;
  nb_proches: number;
};
type Mot = { prenom: string; mot: string; created_at: string };
type Couple = { prenom: string | null; nom: string | null };
type GestionData = {
  cercle: {
    slug: string;
    statut: string;
    mot_couple: string | null;
    photo_url: string | null;
  };
  couple: Couple | null;
  parts: PartLite[];
  mots: Mot[];
};

const FN_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

async function callFn<T = unknown>(name: string, init: RequestInit): Promise<T> {
  const res = await fetch(`${FN_BASE}/${name}`, {
    ...init,
    headers: {
      apikey: ANON,
      Authorization: `Bearer ${ANON}`,
      ...(init.headers ?? {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as { error?: string })?.error ?? `Erreur ${res.status}`);
  return json as T;
}

const CercleGestion = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GestionData | null>(null);

  const [mot, setMot] = useState("");
  const [savingMot, setSavingMot] = useState(false);
  const [motSavedAt, setMotSavedAt] = useState<number | null>(null);

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [publishing, setPublishing] = useState(false);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await callFn<GestionData>("get-cercle-gestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      setData(res);
      setMot(res.cercle.mot_couple ?? "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const publicUrl = useMemo(() => {
    if (!data) return "";
    return `${window.location.origin}/cercle/${data.cercle.slug}`;
  }, [data]);

  const saveMot = async () => {
    if (!token) return;
    setSavingMot(true);
    try {
      await callFn("update-cercle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, mot_couple: mot }),
      });
      setMotSavedAt(Date.now());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSavingMot(false);
    }
  };

  const uploadPhoto = async (file: File) => {
    if (!token) return;
    setUploadingPhoto(true);
    try {
      const form = new FormData();
      form.set("token", token);
      form.set("photo", file);
      await callFn("update-cercle", { method: "POST", body: form });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setUploadingPhoto(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const togglePublish = async () => {
    if (!token || !data) return;
    setPublishing(true);
    try {
      const action = data.cercle.statut === "publie" ? "pause" : "publier";
      await callFn("publish-cercle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action }),
      });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setPublishing(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: NUIT, color: LIN }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl italic opacity-80">
          Chargement de votre Cercle…
        </p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: NUIT, color: LIN }}>
        <div className="max-w-md text-center space-y-4">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: OR }} className="text-4xl">
            Ce lien n'est pas valide
          </h1>
          <p className="opacity-80">Ce lien n'est pas valide ou a expiré. Contactez-nous à remi@lebeaumariage.fr.</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const isPublie = data.cercle.statut === "publie";
  const prenoms = [data.couple?.prenom, data.couple?.nom].filter(Boolean).join(" ");

  return (
    <div style={{ background: NUIT, color: LIN, fontFamily: "'Jost', sans-serif" }} className="min-h-screen">
      <SEO title="Votre Cercle" description="Espace de gestion de votre Cercle" noIndex />

      <header className="border-b" style={{ borderColor: `${OR}33` }}>
        <div className="max-w-4xl mx-auto px-6 py-10 text-center space-y-3">
          <p style={{ color: OR, letterSpacing: "0.3em" }} className="text-xs uppercase">
            Votre Cercle
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl">
            {prenoms || "Votre mariage"}
          </h1>
          <p className="text-sm opacity-70">
            Statut :{" "}
            <span style={{ color: isPublie ? OR : LIN }} className="font-medium">
              {isPublie ? "Publié" : "Brouillon"}
            </span>
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {error && (
          <div
            className="p-4 text-sm text-center"
            style={{ background: `${OR}15`, color: OR, border: `1px solid ${OR}66` }}
          >
            {error}
          </div>
        )}

        {/* Publication */}
        <section className="p-8 text-center space-y-5" style={{ background: `${LIN}08`, border: `1px solid ${OR}33` }}>
          {!isPublie ? (
            <>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: OR }} className="text-3xl">
                Publier votre Cercle
              </h2>
              <p className="opacity-80 max-w-xl mx-auto text-sm leading-relaxed">
                Une fois publié, votre Cercle sera accessible à vos proches via le lien de partage.
                Vous pourrez le remettre en pause à tout moment.
              </p>
              <button
                onClick={togglePublish}
                disabled={publishing}
                className="px-8 py-3 text-sm tracking-widest uppercase transition-opacity disabled:opacity-50"
                style={{ background: OR, color: NUIT }}
              >
                {publishing ? "…" : "Publier mon Cercle"}
              </button>
            </>
          ) : (
            <>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: OR }} className="text-3xl">
                Votre Cercle est publié
              </h2>
              <p className="opacity-80 text-sm">Partagez ce lien avec les personnes que vous souhaitez inviter.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-2xl mx-auto">
                <input
                  readOnly
                  value={publicUrl}
                  className="flex-1 px-4 py-3 text-sm text-center bg-transparent"
                  style={{ border: `1px solid ${OR}66`, color: LIN }}
                />
                <button
                  onClick={copyLink}
                  className="px-6 py-3 text-xs tracking-widest uppercase"
                  style={{ background: OR, color: NUIT }}
                >
                  {copied ? "Copié ✓" : "Copier le lien"}
                </button>
              </div>
              <button
                onClick={togglePublish}
                disabled={publishing}
                className="text-xs tracking-widest uppercase underline opacity-60 hover:opacity-100"
                style={{ color: LIN }}
              >
                {publishing ? "…" : "Mettre en pause"}
              </button>
            </>
          )}
        </section>

        {/* Mot du couple */}
        <section className="space-y-4">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: OR }} className="text-2xl">
            Le mot du couple
          </h2>
          <p className="text-sm opacity-70">
            Adressez quelques lignes à vos proches. Ce texte apparaît en tête de votre Cercle.
          </p>
          <textarea
            value={mot}
            onChange={(e) => setMot(e.target.value)}
            rows={6}
            maxLength={2000}
            className="w-full p-4 bg-transparent text-sm leading-relaxed resize-y"
            style={{ border: `1px solid ${OR}44`, color: LIN, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
            placeholder="Merci d'être là. Voici notre Cercle…"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={saveMot}
              disabled={savingMot || mot === (data.cercle.mot_couple ?? "")}
              className="px-6 py-2.5 text-xs tracking-widest uppercase disabled:opacity-40"
              style={{ border: `1px solid ${OR}`, color: OR }}
            >
              {savingMot ? "Enregistrement…" : "Enregistrer le mot"}
            </button>
            {motSavedAt && <span className="text-xs opacity-60">Enregistré ✓</span>}
          </div>
        </section>

        {/* Photo */}
        <section className="space-y-4">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: OR }} className="text-2xl">
            Votre photo
          </h2>
          <p className="text-sm opacity-70">
            Elle s'affiche en tête de la page vue par vos proches. Format conseillé : paysage, 8 Mo max.
          </p>
          {data.cercle.photo_url && (
            <div className="max-w-xl">
              <img
                src={data.cercle.photo_url}
                alt="Votre couple"
                className="w-full aspect-[4/3] object-cover"
                style={{ border: `1px solid ${OR}33` }}
              />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadPhoto(f);
              }}
              className="hidden"
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploadingPhoto}
              className="px-6 py-2.5 text-xs tracking-widest uppercase disabled:opacity-40"
              style={{ border: `1px solid ${OR}`, color: OR }}
            >
              {uploadingPhoto ? "Envoi…" : data.cercle.photo_url ? "Changer la photo" : "Ajouter une photo"}
            </button>
          </div>
        </section>

        {/* Postes (lecture seule) */}
        <section className="space-y-4">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: OR }} className="text-2xl">
            Les postes de votre Cercle
          </h2>
          <p className="text-sm opacity-70">
            Voici les enveloppes actives. Vous voyez qui les porte, jamais les montants.
          </p>
          <ul className="divide-y" style={{ borderColor: `${OR}22` }}>
            {data.parts.map((p) => (
              <li key={p.id} className="py-5 flex items-baseline justify-between gap-6" style={{ borderColor: `${OR}22`, borderTopWidth: 0 }}>
                <div className="min-w-0">
                  <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl">{p.titre}</p>
                  {p.evocation && <p className="text-sm opacity-60 mt-1 italic">{p.evocation}</p>}
                </div>
                <p className="text-xs whitespace-nowrap opacity-80" style={{ color: OR }}>
                  Porté par {p.nb_proches} {p.nb_proches > 1 ? "proches" : "proche"}
                </p>
              </li>
            ))}
            {data.parts.length === 0 && (
              <li className="py-8 text-center text-sm opacity-60">Aucun poste actif pour le moment.</li>
            )}
          </ul>
        </section>

        {/* Mur des mots */}
        <section className="space-y-4">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: OR }} className="text-2xl">
            Le mur des mots
          </h2>
          {data.mots.length === 0 ? (
            <p className="text-sm opacity-60 italic">
              Les mots de vos proches apparaîtront ici, au fil de leurs contributions.
            </p>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {data.mots.map((m, i) => (
                <li
                  key={i}
                  className="p-5"
                  style={{ background: `${LIN}08`, border: `1px solid ${OR}22` }}
                >
                  <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-lg italic leading-snug">
                    « {m.mot} »
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-widest" style={{ color: OR }}>
                    — {m.prenom}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-10 text-center text-xs opacity-50">
        Espace privé — ne partagez ce lien qu'entre vous deux.
      </footer>
    </div>
  );
};

export default CercleGestion;
