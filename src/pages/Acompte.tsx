import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";

const formatPrice = (n: number): string => n.toLocaleString("fr-FR") + " €";
const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return "Date à confirmer";
  try {
    return new Date(dateStr).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  } catch { return dateStr; }
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" } }),
};

type LeadData = {
  id: string;
  prenom: string | null;
  nom: string | null;
  email: string;
  date_mariage: string | null;
  guests_estimate: number | null;
  total_estimate: number | null;
};

const Acompte = () => {
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get("token") !== null && !token;
  const successToken = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lead, setLead] = useState<LeadData | null>(null);
  const [tokenStatus, setTokenStatus] = useState<string>("pending");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [amountCents, setAmountCents] = useState(0);

  const activeToken = token || successToken;

  useEffect(() => {
    const fetchData = async () => {
      if (!activeToken) { setError("Lien invalide."); setLoading(false); return; }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const client = supabase as any;
      const { data: tk, error: tkErr } = await client
        .from("lead_tokens").select("*").eq("token", activeToken).eq("type", "acompte").single();

      if (tkErr || !tk) { setError("Ce lien de paiement est invalide ou a expiré."); setLoading(false); return; }

      setTokenStatus(tk.status);

      const { data: leadData, error: leadErr } = await client
        .from("configurateur_leads").select("*").eq("id", tk.lead_id).single();

      if (leadErr || !leadData) { setError("Données du mariage introuvables."); setLoading(false); return; }

      setLead(leadData);
      const total = leadData.total_estimate || 0;
      setAmountCents(Math.ceil(total * 0.30) * 100);
      setLoading(false);
    };
    fetchData();
  }, [activeToken]);

  const handleCheckout = async () => {
    if (!activeToken || !lead) return;
    setCheckoutLoading(true);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("stripe-create-session", {
        body: { token: activeToken },
      });
      if (fnErr || !data?.url) {
        setError("Impossible de créer la session de paiement. Veuillez réessayer.");
        setCheckoutLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, #1a1612 0%, #0d0b09 100%)" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div style={{ width: 40, height: 40, border: "1px solid rgba(201,169,110,0.3)", borderTop: "1px solid #c9a96e", borderRadius: "50%", margin: "0 auto 24px" }} className="animate-spin" />
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,221,208,0.5)" }}>Chargement…</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, #1a1612 0%, #0d0b09 100%)" }}>
        <div className="text-center" style={{ maxWidth: 480, padding: "0 24px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 24, color: "rgba(201,169,110,0.4)", marginBottom: 16 }}>◇</p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 16, color: "rgba(232,221,208,0.7)" }}>{error}</p>
        </div>
      </div>
    );
  }

  const total = lead?.total_estimate || 0;
  const acompte = Math.ceil(total * 0.30);
  const solde = total - acompte;

  // Success state
  if (tokenStatus === "paid") {
    return (
      <>
        <SEO title="Date réservée — Limen" description="Votre mariage est confirmé." />
        <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #1a1612 0%, #0d0b09 100%)" }}>
          <div className="flex items-start justify-center px-4 sm:px-6" style={{ paddingTop: 80, paddingBottom: 120 }}>
            <div className="flex flex-col items-center w-full" style={{ maxWidth: 600 }}>
              <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 48, color: "#c9a96e" }}>
                ◇
              </motion.p>
              <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-8"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(28px, 4vw, 42px)", color: "#faf8f4", lineHeight: 1.2 }}>
                Votre date est officiellement réservée.
              </motion.h1>
              <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-6"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 480 }}>
                L'acompte de {formatPrice(acompte)} a bien été encaissé. Votre mariage au Domaine de la Croix Rochefort est confirmé pour le {formatDate(lead?.date_mariage)}.
              </motion.p>

              {/* Roadmap */}
              <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="mt-16 w-full">
                <RoadmapSuccess />
              </motion.div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Payment form
  return (
    <>
      <SEO title="Acompte mariage — Limen" description="Réglez votre acompte pour confirmer votre date de mariage." />
      <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #1a1612 0%, #0d0b09 100%)" }}>
        <div className="flex items-start justify-center px-4 sm:px-6" style={{ paddingTop: 60, paddingBottom: 120 }}>
          <div className="flex flex-col items-center w-full" style={{ maxWidth: 600 }}>

            <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
              Dernière étape
            </motion.p>
            <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(28px, 4vw, 42px)", color: "#faf8f4", lineHeight: 1.2 }}>
              Confirmez votre date<br />en un clic.
            </motion.h1>
            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} style={{ width: 80, height: 1, background: "#c9a96e", margin: "36px auto 48px" }} />

            {/* Amount breakdown */}
            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="w-full"
              style={{ background: "rgba(26,22,18,0.60)", border: "1px solid rgba(201,169,110,0.25)", borderRadius: 2, padding: "32px 36px" }}>
              <div className="flex justify-between items-center mb-4" style={{ borderBottom: "1px solid rgba(201,169,110,0.10)", paddingBottom: 16 }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.55)" }}>Prix total définitif</span>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 14, color: "rgba(232,221,208,0.80)" }}>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between items-center mb-4" style={{ borderBottom: "1px solid rgba(201,169,110,0.10)", paddingBottom: 16 }}>
                <div>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 14, color: "#c9a96e" }}>Acompte 30%</span>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, color: "rgba(232,221,208,0.35)", marginTop: 2 }}>À régler aujourd'hui</p>
                </div>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 32, color: "#c9a96e" }}>{formatPrice(acompte)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.40)" }}>Solde à régler</span>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.50)" }}>{formatPrice(solde)}</span>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="w-full mt-6"
              style={{ background: "rgba(201,169,110,0.05)", borderLeft: "2px solid rgba(201,169,110,0.40)", padding: "16px 20px" }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.55)", lineHeight: 1.75 }}>
                Le paiement est sécurisé par Stripe. Vous serez redirigé vers une page de paiement sécurisée.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="w-full mt-10">
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                style={{
                  width: "100%", fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 14, letterSpacing: "0.20em", textTransform: "uppercase",
                  padding: "20px 40px", background: checkoutLoading ? "rgba(201,169,110,0.10)" : "#c9a96e",
                  border: "none", color: checkoutLoading ? "rgba(201,169,110,0.5)" : "#1a1612",
                  cursor: checkoutLoading ? "not-allowed" : "pointer", transition: "all 0.25s ease", borderRadius: 2,
                }}
                onMouseEnter={e => { if (!checkoutLoading) e.currentTarget.style.background = "#d4b67e"; }}
                onMouseLeave={e => { if (!checkoutLoading) e.currentTarget.style.background = "#c9a96e"; }}
              >
                {checkoutLoading ? "Redirection…" : `Régler l'acompte · ${formatPrice(acompte)}`}
              </button>
            </motion.div>

            {/* Roadmap */}
            <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp} className="mt-16 w-full flex justify-center">
              <RoadmapAcompte />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

const RoadmapStep = ({ label, done, active }: { label: string; done: boolean; active?: boolean; index: number }) => (
  <div className="flex flex-col items-center" style={{ minWidth: 80 }}>
    <div style={{
      width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13,
      border: done ? "1px solid #c9a96e" : active ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.25)",
      background: done ? "rgba(201,169,110,0.20)" : active ? "rgba(201,169,110,0.10)" : "transparent",
      color: done || active ? "#c9a96e" : "rgba(201,169,110,0.40)",
    }}>
      {done ? "✓" : active ? "●" : "○"}
    </div>
    <p style={{
      fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11,
      color: done || active ? "#c9a96e" : "rgba(232,221,208,0.40)",
      textAlign: "center", marginTop: 6, lineHeight: 1.3, maxWidth: 100,
    }}>
      {label}
    </p>
  </div>
);

const RoadmapLine = ({ done }: { done: boolean }) => (
  <>
    <div className="hidden sm:block" style={{ flex: 1, height: 1, background: done ? "rgba(201,169,110,0.5)" : "rgba(201,169,110,0.15)", minWidth: 20, marginTop: -20 }} />
    <div className="block sm:hidden" style={{ width: 1, height: 16, background: "rgba(201,169,110,0.15)", margin: "4px 0" }} />
  </>
);

const RoadmapAcompte = () => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0" style={{ maxWidth: 520, width: "100%" }}>
    <RoadmapStep label="Dégustation" done index={0} />
    <RoadmapLine done />
    <RoadmapStep label="Devis définitif" done index={1} />
    <RoadmapLine done />
    <RoadmapStep label="Signature" done index={2} />
    <RoadmapLine done={false} />
    <RoadmapStep label="Acompte" done={false} active index={3} />
  </div>
);

const RoadmapSuccess = () => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 justify-center" style={{ maxWidth: 520, width: "100%", margin: "0 auto" }}>
    <RoadmapStep label="Dégustation" done index={0} />
    <RoadmapLine done />
    <RoadmapStep label="Devis définitif" done index={1} />
    <RoadmapLine done />
    <RoadmapStep label="Signature" done index={2} />
    <RoadmapLine done />
    <RoadmapStep label="Acompte versé" done index={3} />
  </div>
);

export default Acompte;
