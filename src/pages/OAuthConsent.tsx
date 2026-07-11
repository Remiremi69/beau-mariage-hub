import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

/**
 * Page de consentement OAuth 2.1 pour le serveur MCP Limen.
 *
 * IMPORTANT — pourquoi on n'utilise PAS supabase.auth.oauth.* :
 * Le namespace beta `supabase.auth.oauth.*` (getAuthorizationDetails,
 * approveAuthorization, denyAuthorization) passe par `_useSession()`, qui
 * acquiert un verrou global `navigator.locks` sur la clé de session Supabase
 * (`sb-<ref>-auth-token`). Ce verrou est partagé entre TOUS les onglets du
 * même origin. Quand Claude ouvre cette page depuis un onglet parent (ou que
 * notre `AuthProvider` fait tourner en parallèle `getSession()` +
 * `onAuthStateChange` + `checkAdmin` RLS), le verrou peut ne jamais se
 * libérer → la Promise reste pending indéfiniment et AUCUNE requête réseau
 * n'est même émise (symptôme observé : « Chargement… » infini, 0 requête
 * dans l'onglet Network).
 *
 * On appelle donc directement l'API REST Supabase Auth OAuth 2.1
 * (`/auth/v1/oauth/authorizations/:id` et `.../consent`), en lisant le token
 * d'accès depuis le storage local — sans passer par le lock du SDK.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const PROJECT_REF = import.meta.env.VITE_SUPABASE_PROJECT_ID as string;
const STORAGE_KEY = `sb-${PROJECT_REF}-auth-token`;
const REQUEST_TIMEOUT_MS = 8000;

type OAuthClient = { name?: string; client_name?: string; redirect_uris?: string[] };
type OAuthDetails = {
  client?: OAuthClient;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
} | null;

function readAccessToken(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.access_token ?? parsed?.currentSession?.access_token ?? null;
  } catch {
    return null;
  }
}

async function oauthFetch(
  path: string,
  init: RequestInit,
  timeoutMs = REQUEST_TIMEOUT_MS,
): Promise<{ data: OAuthDetails; error: { message: string } | null }> {
  const token = readAccessToken();
  if (!token) return { data: null, error: { message: "Session absente (token introuvable)." } };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${token}`,
        ...(init.headers ?? {}),
      },
    });
    const text = await res.text();
    const json = text ? JSON.parse(text) : null;
    if (!res.ok) {
      const msg = json?.error_description || json?.msg || json?.error || `HTTP ${res.status}`;
      return { data: null, error: { message: msg } };
    }
    return { data: json, error: null };
  } catch (e) {
    if ((e as Error).name === "AbortError") {
      return { data: null, error: { message: `Délai dépassé (${timeoutMs / 1000}s) — le serveur d'autorisation n'a pas répondu.` } };
    }
    return { data: null, error: { message: e instanceof Error ? e.message : "Erreur réseau inconnue." } };
  } finally {
    clearTimeout(timeout);
  }
}

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Paramètre authorization_id manquant.");
        setLoaded(true);
        return;
      }

      // Vérif de session SANS passer par supabase.auth.getSession() (qui prend
      // le lock). On lit directement le storage.
      const token = readAccessToken();
      if (!token) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/admin/login?next=" + encodeURIComponent(next);
        return;
      }

      const { data, error } = await oauthFetch(
        `/oauth/authorizations/${encodeURIComponent(authorizationId)}`,
        { method: "GET" },
      );
      if (!active) return;

      if (error) {
        console.error("[OAuthConsent] getAuthorizationDetails failed:", error);
        setError(error.message);
        setLoaded(true);
        return;
      }

      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }

      setDetails(data);
      setLoaded(true);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = await oauthFetch(
      `/oauth/authorizations/${encodeURIComponent(authorizationId)}/consent`,
      { method: "POST", body: JSON.stringify({ action: approve ? "approve" : "deny" }) },
    );
    if (error) {
      console.error("[OAuthConsent] consent failed:", error);
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
  }

  // Silence l'avertissement d'unused import de `supabase` sans casser le build
  // si un futur refactor souhaite y revenir.
  void supabase;

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

        {!loaded && !error && (
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
              Cette application pourra utiliser les outils Limen activés (leads du composeur) en votre nom.
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
