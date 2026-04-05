import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return "Date à confirmer";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  } catch { return dateStr; }
};

const formatPrice = (n: number): string => n.toLocaleString("fr-FR") + " €";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" } }),
};

const OPTION_LABELS: Record<string, string> = {
  photobooth: "Photobooth Premium", cocktail_bar: "Bar à cocktails", feu_artifice: "Feu d'artifice",
  voiture_collection: "Voiture de collection", livre_or: "Livre d'or Limen", candy_bar: "Sweet Table",
  caricaturiste: "Caricaturiste", lanternes: "Lâcher de lanternes",
};

const repasLabels: Record<string, string> = { essentiel: "Essentiel", gastronomique: "Gastronomique", prestige: "Prestige" };
const decoLabels: Record<string, string> = { champetre: "Champêtre Authentique", boheme: "Bohème Moderne", elegance: "Élégance Intemporelle" };
const photoLabels: Record<string, string> = { none: "Non sélectionné", reportage: "Reportage", premium: "Premium Duo" };
const djLabels: Record<string, string> = { none: "Non sélectionné", standard: "Standard", premium: "Premium" };

type TokenData = {
  id: string;
  token: string;
  type: string;
  status: string;
  used_at: string | null;
  docusign_envelope_id: string | null;
  lead_id: string;
};

type LeadData = {
  id: string;
  prenom: string | null;
  nom: string | null;
  email: string;
  date_mariage: string | null;
  guests_estimate: number | null;
  ceremonie_laique: boolean | null;
  vin_dhonneur: string | null;
  repas_formule: string | null;
  repas_entree: string | null;
  repas_plat: string | null;
  repas_dessert: string | null;
  photographe: string | null;
  dj: string | null;
  deco: string | null;
  options: string[] | null;
  total_estimate: number | null;
};

const ChoiceLine = ({ category, value, price }: { category: string; value: string; price?: string }) => (
  <div style={{ padding: "14px 18px", background: "rgba(26,22,18,0.50)", border: "1px solid rgba(201,169,110,0.12)", borderRadius: 2 }}>
    <div className="flex justify-between items-start">
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,221,208,0.35)", marginBottom: 3 }}>{category}</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(232,221,208,0.85)" }}>{value}</p>
      </div>
      {price && <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: price === "Inclus" ? "rgba(232,221,208,0.35)" : "#c9a96e", flexShrink: 0, marginLeft: 12 }}>{price}</span>}
    </div>
  </div>
);

const Signature = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) { setError("Lien invalide."); setLoading(false); return; }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const client = supabase as any;
      const { data: tk, error: tkErr } = await client
        .from("lead_tokens").select("*").eq("token", token).eq("type", "signature").single();

      if (tkErr || !tk) { setError("Ce lien de signature est invalide ou a expiré."); setLoading(false); return; }
      if (tk.used_at) { setError("Ce contrat a déjà été signé."); setLoading(false); return; }

      setTokenData(tk);

      const { data: leadData, error: leadErr } = await client
        .from("configurateur_leads").select("*").eq("id", tk.lead_id).single();

      if (leadErr || !leadData) { setError("Données du mariage introuvables."); setLoading(false); return; }
      setLead(leadData);
      setLoading(false);
    };
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, #1a1612 0%, #0d0b09 100%)" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div style={{ width: 40, height: 40, border: "1px solid rgba(201,169,110,0.3)", borderTop: "1px solid #c9a96e", borderRadius: "50%", margin: "0 auto 24px" }} className="animate-spin" />
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,221,208,0.5)" }}>Chargement de votre contrat…</p>
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
  const optionsList = (lead?.options || []).map(id => OPTION_LABELS[id] || id).join(" · ");

  return (
    <>
      <SEO title="Votre contrat Limen" description="Signez votre contrat de mariage Limen." />
      <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #1a1612 0%, #0d0b09 100%)" }}>
        <div className="flex items-start justify-center px-4 sm:px-6" style={{ paddingTop: 60, paddingBottom: 120 }}>
          <div className="flex flex-col items-center w-full" style={{ maxWidth: 780 }}>

            {/* Header */}
            <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
              Votre contrat Limen
            </motion.p>
            <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(32px, 5vw, 48px)", color: "#faf8f4", lineHeight: 1.1 }}>
              Tout est prêt.<br />Il ne reste plus qu'à signer.
            </motion.h1>
            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} style={{ width: 80, height: 1, background: "#c9a96e", margin: "36px auto 48px" }} />

            {/* Recap */}
            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="w-full" style={{ maxWidth: 700 }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginBottom: 20 }}>Récapitulatif définitif</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ChoiceLine category="Couple" value={`${lead?.prenom || ""} ${lead?.nom || ""}`.trim() || "—"} />
                <ChoiceLine category="Date" value={formatDate(lead?.date_mariage)} />
                <ChoiceLine category="Invités" value={`${lead?.guests_estimate || "—"} personnes`} />
                <ChoiceLine category="Cérémonie" value={lead?.ceremonie_laique ? "Laïque" : "Civil uniquement"} />
                <ChoiceLine category="Vin d'honneur" value={lead?.vin_dhonneur || "À composer"} />
                <ChoiceLine category="Repas" value={repasLabels[lead?.repas_formule || ""] || lead?.repas_formule || "—"} />
                <ChoiceLine category="Décoration" value={decoLabels[lead?.deco || ""] || lead?.deco || "—"} />
                <ChoiceLine category="Photographe" value={photoLabels[lead?.photographe || ""] || "—"} />
                <ChoiceLine category="DJ" value={djLabels[lead?.dj || ""] || "—"} />
                <ChoiceLine category="Options" value={optionsList || "Aucune"} />
              </div>
            </motion.div>

            {/* Total */}
            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="w-full mt-8" style={{ maxWidth: 700 }}>
              <div style={{ background: "rgba(26,22,18,0.60)", border: "1px solid rgba(201,169,110,0.25)", borderRadius: 2, padding: "32px 36px" }} className="flex justify-between items-end">
                <div>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.60)", marginBottom: 6 }}>Prix définitif</p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, color: "rgba(232,221,208,0.35)" }}>
                    {lead?.guests_estimate} invités confirmés
                  </p>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(36px, 5vw, 48px)", color: "#c9a96e", lineHeight: 1 }}>
                  {formatPrice(total)}
                </p>
              </div>
            </motion.div>

            {/* DocuSign / PDF Fallback */}
            <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="w-full mt-12" style={{ maxWidth: 700 }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginBottom: 20 }}>Signature du contrat</p>

              {tokenData?.docusign_envelope_id ? (
                <iframe
                  src={`https://app.docusign.com/signing/${tokenData.docusign_envelope_id}`}
                  style={{ width: "100%", height: 600, border: "1px solid rgba(201,169,110,0.20)", borderRadius: 2, background: "#fff" }}
                  title="Signature DocuSign"
                />
              ) : (
                <div style={{ background: "rgba(26,22,18,0.60)", border: "1px solid rgba(201,169,110,0.20)", borderRadius: 2, padding: "40px 36px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 24, color: "rgba(201,169,110,0.4)", marginBottom: 16 }}>✦</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 24, color: "#faf8f4", marginBottom: 12, lineHeight: 1.3 }}>
                    Votre contrat sera disponible sous peu
                  </h3>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,221,208,0.55)", lineHeight: 1.8, maxWidth: 440, margin: "0 auto 24px" }}>
                    Rémi prépare votre contrat personnalisé. Vous recevrez un email dès qu'il sera prêt à signer. En attendant, vous pouvez télécharger le récapitulatif de vos choix.
                  </p>
                  <button
                    style={{
                      fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase",
                      padding: "16px 40px", background: "rgba(201,169,110,0.10)", border: "1px solid rgba(201,169,110,0.40)",
                      color: "#c9a96e", cursor: "pointer", transition: "all 0.25s ease", borderRadius: 2,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,169,110,0.20)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(201,169,110,0.10)"; }}
                    onClick={() => window.print()}
                  >
                    Imprimer le récapitulatif
                  </button>
                </div>
              )}
            </motion.div>

            {/* Roadmap */}
            <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp} className="w-full mt-12 flex justify-center">
              <RoadmapSignature />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

const RoadmapSignature = () => {
  const steps = [
    { label: "Dégustation", done: true },
    { label: "Devis définitif", done: true },
    { label: "Signature", done: false, active: true },
    { label: "Acompte", done: false },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-0" style={{ maxWidth: 520, width: "100%" }}>
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col sm:flex-row items-center" style={{ flex: 1 }}>
          <div className="flex flex-col items-center" style={{ minWidth: 80 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13,
              border: step.done ? "1px solid #c9a96e" : step.active ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.25)",
              background: step.done ? "rgba(201,169,110,0.20)" : step.active ? "rgba(201,169,110,0.10)" : "transparent",
              color: step.done || step.active ? "#c9a96e" : "rgba(201,169,110,0.40)",
            }}>
              {step.done ? "✓" : i + 1}
            </div>
            <p style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11,
              color: step.done || step.active ? "#c9a96e" : "rgba(232,221,208,0.40)",
              textAlign: "center", marginTop: 6, lineHeight: 1.3, maxWidth: 100,
            }}>
              {step.label}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div className="hidden sm:block" style={{ flex: 1, height: 1, background: step.done ? "rgba(201,169,110,0.5)" : "rgba(201,169,110,0.15)", minWidth: 20, marginTop: -20 }} />
          )}
          {i < steps.length - 1 && (
            <div className="block sm:hidden" style={{ width: 1, height: 16, background: "rgba(201,169,110,0.15)", margin: "4px 0" }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Signature;
