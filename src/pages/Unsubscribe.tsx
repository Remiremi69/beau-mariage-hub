import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

type Status = "loading" | "valid" | "already" | "invalid" | "confirming" | "done" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setStatus("invalid");
        return;
      }
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } }
        );
        const data = await res.json();
        if (!res.ok) {
          setStatus("invalid");
          setErrorMsg(data.error ?? "Lien invalide");
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already");
          return;
        }
        if (data.valid === true) {
          setStatus("valid");
          return;
        }
        setStatus("invalid");
      } catch (e) {
        setStatus("error");
        setErrorMsg(e instanceof Error ? e.message : "Erreur réseau");
      }
    };
    validate();
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    setStatus("confirming");
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }
    if (data?.success || data?.reason === "already_unsubscribed") {
      setStatus("done");
    } else {
      setStatus("error");
      setErrorMsg("Échec du désabonnement");
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-6 py-20">
      <Helmet>
        <title>Désabonnement — Limen</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-md w-full bg-white border border-[#1A1814]/10 p-10 text-center">
        <h1 className="font-serif text-3xl text-[#1A1814] mb-2 tracking-wide">LIMEN</h1>
        <p className="text-xs uppercase tracking-[0.2em] text-[#C8A96E] mb-8">Le Beau Mariage</p>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3 text-[#1A1814]">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Vérification du lien…</p>
          </div>
        )}

        {status === "valid" && (
          <>
            <h2 className="text-xl text-[#1A1814] mb-4">Confirmer le désabonnement</h2>
            <p className="text-sm text-[#1A1814]/70 mb-8">
              Vous ne recevrez plus aucun email de notre part suite à cette confirmation.
            </p>
            <Button
              onClick={handleConfirm}
              className="w-full rounded-none bg-[#1A1814] hover:bg-[#1A1814]/90 text-[#F5F0E8]"
            >
              Confirmer le désabonnement
            </Button>
          </>
        )}

        {status === "confirming" && (
          <div className="flex flex-col items-center gap-3 text-[#1A1814]">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Traitement en cours…</p>
          </div>
        )}

        {status === "done" && (
          <div className="flex flex-col items-center gap-3 text-[#1A1814]">
            <CheckCircle2 className="h-10 w-10 text-[#C8A96E]" />
            <h2 className="text-xl">Désabonnement confirmé</h2>
            <p className="text-sm text-[#1A1814]/70">Vous ne recevrez plus d'emails de notre part.</p>
          </div>
        )}

        {status === "already" && (
          <div className="flex flex-col items-center gap-3 text-[#1A1814]">
            <CheckCircle2 className="h-10 w-10 text-[#C8A96E]" />
            <h2 className="text-xl">Déjà désabonné</h2>
            <p className="text-sm text-[#1A1814]/70">Cette adresse n'est plus inscrite à nos emails.</p>
          </div>
        )}

        {status === "invalid" && (
          <div className="flex flex-col items-center gap-3 text-[#1A1814]">
            <XCircle className="h-10 w-10 text-red-600" />
            <h2 className="text-xl">Lien invalide</h2>
            <p className="text-sm text-[#1A1814]/70">{errorMsg || "Ce lien de désabonnement n'est plus valide."}</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3 text-[#1A1814]">
            <XCircle className="h-10 w-10 text-red-600" />
            <h2 className="text-xl">Une erreur est survenue</h2>
            <p className="text-sm text-[#1A1814]/70">{errorMsg}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
