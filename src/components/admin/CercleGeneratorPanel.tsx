import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GeneratedPart {
  id: string;
  titre: string;
  evocation: string;
  niveau: "seuil" | "signature" | "fondatrice";
  montant_suggere: number;
  quantite_totale: number;
  etape_composeur_source: string | null;
  ordre: number;
}

interface GenerateResult {
  ok: boolean;
  cercle: { id: string; slug: string; couple_id: string; statut: string };
  parts: GeneratedPart[];
  parts_count: number;
  token: string;
  lien_gestion: string;
  email_sent: boolean;
  email_error: string | null;
}

const NIVEAUX: Array<GeneratedPart["niveau"]> = ["seuil", "signature", "fondatrice"];

const CercleGeneratorPanel = () => {
  const [coupleId, setCoupleId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (force = false) => {
    if (!coupleId.trim()) return;
    if (force && !confirm("Régénérer supprimera le Cercle brouillon existant et ses parts. Continuer ?")) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke(
        "generate-parts",
        { body: { couple_id: coupleId.trim(), force } }
      );
      if (fnErr) {
        // Tente de récupérer le corps JSON de la réponse d'erreur
        // deno-lint-ignore no-explicit-any
        const ctx = (fnErr as any)?.context;
        let msg = fnErr.message ?? String(fnErr);
        try {
          const body = ctx && typeof ctx.json === "function" ? await ctx.json() : null;
          if (body?.error) msg = body.error;
        } catch { /* noop */ }
        setError(msg);
      } else if (data?.error) {
        setError(`${data.error}${data.details ? ` — ${data.details}` : ""}`);
      } else {
        setResult(data as GenerateResult);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid rgba(201,169,110,0.3)",
        background: "rgba(26,24,20,0.4)",
        padding: 20,
        marginBottom: 24,
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22,
          color: "#c9a96e",
          margin: 0,
          marginBottom: 4,
        }}
      >
        Le Cercle — Générateur (banc d'essai)
      </h2>
      <p style={{ fontSize: 12, color: "rgba(232,221,208,0.55)", marginBottom: 16 }}>
        Colle un <code>configurateur_leads.id</code>, génère le Cercle complet
        (parts via Claude + token + email).
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <input
          type="text"
          value={coupleId}
          onChange={(e) => setCoupleId(e.target.value)}
          placeholder="couple_id (uuid)"
          style={{
            flex: "1 1 260px",
            padding: "8px 12px",
            background: "rgba(232,221,208,0.05)",
            border: "1px solid rgba(232,221,208,0.15)",
            color: "#E8DDD0",
            fontFamily: "'Jost', monospace",
            fontSize: 13,
          }}
        />
        <button
          onClick={() => handleGenerate(false)}
          disabled={loading || !coupleId.trim()}
          style={{
            padding: "8px 20px",
            background: loading ? "rgba(201,169,110,0.3)" : "#c9a96e",
            color: "#1A1814",
            border: "none",
            fontFamily: "'Jost', sans-serif",
            fontSize: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: loading ? "wait" : "pointer",
            fontWeight: 500,
          }}
        >
          {loading ? "Génération…" : "Générer le Cercle"}
        </button>
        <button
          onClick={() => handleGenerate(true)}
          disabled={loading || !coupleId.trim()}
          title="Supprime le Cercle brouillon existant puis régénère"
          style={{
            padding: "8px 20px",
            background: "transparent",
            color: "#c9a96e",
            border: "1px solid #c9a96e",
            fontFamily: "'Jost', sans-serif",
            fontSize: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: loading ? "wait" : "pointer",
            fontWeight: 500,
          }}
        >
          Régénérer
        </button>
      </div>


      {error && (
        <div
          style={{
            padding: 12,
            background: "rgba(239,68,68,0.10)",
            border: "1px solid rgba(239,68,68,0.30)",
            color: "#fca5a5",
            fontSize: 13,
            marginTop: 12,
          }}
        >
          ⚠ {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 16, color: "#E8DDD0", fontSize: 13 }}>
          <div
            style={{
              padding: 12,
              background: "rgba(16,185,129,0.10)",
              border: "1px solid rgba(16,185,129,0.30)",
              marginBottom: 16,
            }}
          >
            <div style={{ marginBottom: 6 }}>
              <strong style={{ color: "#c9a96e" }}>Cercle créé</strong> ·
              slug&nbsp;<code>{result.cercle.slug}</code> · statut&nbsp;
              <code>{result.cercle.statut}</code> · {result.parts_count} parts
            </div>
            <div style={{ marginBottom: 6 }}>
              <strong>Lien de gestion :</strong>{" "}
              <a
                href={result.lien_gestion}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#c9a96e", wordBreak: "break-all" }}
              >
                {result.lien_gestion}
              </a>
            </div>
            <div>
              <strong>Email :</strong>{" "}
              {result.email_sent ? (
                <span style={{ color: "#10B981" }}>envoyé ✓</span>
              ) : (
                <span style={{ color: "#F59E0B" }}>
                  non envoyé — {result.email_error ?? "raison inconnue"}
                </span>
              )}
            </div>
          </div>

          {NIVEAUX.map((niveau) => {
            const partsNiveau = result.parts.filter((p) => p.niveau === niveau);
            if (!partsNiveau.length) return null;
            return (
              <div key={niveau} style={{ marginBottom: 20 }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 18,
                    color: "#c9a96e",
                    borderBottom: "1px solid rgba(201,169,110,0.25)",
                    paddingBottom: 6,
                    marginBottom: 10,
                    textTransform: "capitalize",
                  }}
                >
                  {niveau} · {partsNiveau.length} parts
                </h3>
                {partsNiveau.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: "10px 12px",
                      background: "rgba(232,221,208,0.03)",
                      borderLeft: "2px solid rgba(201,169,110,0.4)",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 4,
                      }}
                    >
                      <strong style={{ color: "#E8DDD0", fontSize: 14 }}>
                        {p.titre}
                      </strong>
                      <span style={{ color: "#c9a96e", fontSize: 12 }}>
                        {p.montant_suggere} € × {p.quantite_totale}
                      </span>
                    </div>
                    <p
                      style={{
                        fontStyle: "italic",
                        color: "rgba(232,221,208,0.75)",
                        margin: "0 0 4px",
                        lineHeight: 1.5,
                      }}
                    >
                      {p.evocation}
                    </p>
                    {p.etape_composeur_source && (
                      <p
                        style={{
                          fontSize: 11,
                          color: "rgba(232,221,208,0.35)",
                          margin: 0,
                        }}
                      >
                        source : {p.etape_composeur_source}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CercleGeneratorPanel;
