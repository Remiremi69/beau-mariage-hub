import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Wrapper typé local pour la beta supabase.auth.oauth
type OAuthClient = { name?: string; client_name?: string; redirect_uris?: string[] };
type OAuthDetails = {
  client?: OAuthClient;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
} | null;
interface OAuthNs {
  getAuthorizationDetails: (id: string) => Promise<{ data: OAuthDetails; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: OAuthDetails; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: OAuthDetails; error: { message: string } | null }>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const oauth = (supabase.auth as any).oauth as OAuthNs;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Paramètre authorization_id manquant.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/admin/login?next=" + encodeURIComponent(next);
        return;
      }
      try {
        const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
        if (!active) return;
        if (error) {
          setError(error.message);
          return;
        }
        const immediate = data?.redirect_url ?? data?.redirect_to;
        if (immediate && !data?.client) {
          window.location.href = immediate;
          return;
        }
        setDetails(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur inconnue.");
      }
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    try {
      const { data, error } = approve
        ? await oauth.approveAuthorization(authorizationId)
        : await oauth.denyAuthorization(authorizationId);
      if (error) {
        setBusy(false);
        setError(error.message);
        return;
      }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) {
        setBusy(false);
        setError("Aucune URL de redirection retournée par le serveur d'autorisation.");
        return;
      }
      window.location.href = target;
    } catch (e) {
      setBusy(false);
      setError(e instanceof Error ? e.message : "Erreur inconnue.");
    }
  }

  const clientName = details?.client?.client_name ?? details?.client?.name ?? "cette application";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.12) 0%, transparent 60%), linear-gradient(160deg, #0d0b08 0%, #1a1612 50%, #231e17 100%)",
      }}
    >
      <div style={{ maxWidth: 480, width: "100%", color: "#faf8f4" }}>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: 11,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.6)",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Autorisation d'accès
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: 32,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Connecter {clientName} à Limen
        </h1>

        {error && (
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 13,
              color: "#ef4444",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            {error}
          </p>
        )}

        {!details && !error && (
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 14, textAlign: "center", opacity: 0.7 }}>
            Chargement…
          </p>
        )}

        {details && (
          <>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 15,
                lineHeight: 1.6,
                textAlign: "center",
                marginBottom: 12,
                color: "rgba(250,248,244,0.85)",
              }}
            >
              Cette application pourra utiliser les outils Limen activés (leads du configurateur) en votre nom.
            </p>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                lineHeight: 1.6,
                textAlign: "center",
                marginBottom: 28,
                color: "rgba(250,248,244,0.55)",
              }}
            >
              Les règles d'accès de Limen (RLS) restent appliquées : les données par utilisateur ne sont visibles que
              par les administrateurs autorisés.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                type="button"
                onClick={() => decide(true)}
                disabled={busy}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  background: "#c9a96e",
                  color: "#1a1612",
                  padding: "16px 20px",
                  border: "none",
                  borderRadius: 0,
                  cursor: busy ? "not-allowed" : "pointer",
                  opacity: busy ? 0.6 : 1,
                }}
              >
                {busy ? "…" : "Autoriser"}
              </button>
              <button
                type="button"
                onClick={() => decide(false)}
                disabled={busy}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 12,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  background: "transparent",
                  color: "rgba(250,248,244,0.7)",
                  padding: "14px 20px",
                  border: "1px solid rgba(201,169,110,0.2)",
                  borderRadius: 0,
                  cursor: busy ? "not-allowed" : "pointer",
                }}
              >
                Refuser
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
