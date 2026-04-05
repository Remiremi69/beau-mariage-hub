import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfigurateurState, OPTION_LABELS } from "../pricingTypes";
import { calculateBreakdown, PriceLine } from "../pricing/pricingEngine";
import { supabase } from "@/integrations/supabase/client";

interface Step10Props {
  state: ConfigurateurState;
  onUpdate: (partial: Partial<ConfigurateurState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

type Localisation = "local" | "distance" | null;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
  }),
};

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return "Date à confirmer";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  } catch { return dateStr; }
};

const formatPrice = (n: number): string => n.toLocaleString("fr-FR") + " €";

/* ── Animated counter ─────────────────────────────────── */
const AnimatedCounter = ({ target }: { target: number }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const duration = 1500;
          const animate = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value.toLocaleString("fr-FR")} €</span>;
};

/* ── Choice line ──────────────────────────────────────── */
const ChoiceLine = ({ category, value, price, subtext, badge }: {
  category: string; value: string; price?: string; subtext?: string; badge?: string;
}) => (
  <div style={{ padding: "14px 18px", background: "rgba(26,22,18,0.50)", border: "1px solid rgba(201,169,110,0.12)", borderRadius: 2 }}>
    <div className="flex justify-between items-start">
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,221,208,0.35)", marginBottom: 3 }}>{category}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(232,221,208,0.85)" }}>{value}</p>
          {badge && (
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "0.15em", border: "1px solid rgba(201,169,110,0.40)", padding: "2px 8px", color: "rgba(201,169,110,0.70)" }}>{badge}</span>
          )}
        </div>
        {subtext && <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, color: "rgba(232,221,208,0.35)", fontStyle: "italic", marginTop: 4 }}>{subtext}</p>}
      </div>
      {price && <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: price === "Inclus" ? "rgba(232,221,208,0.35)" : "#c9a96e", flexShrink: 0, marginLeft: 12 }}>{price}</span>}
    </div>
  </div>
);

/* ── Price line row ───────────────────────────────────── */
const PriceLineRow = ({ line }: { line: PriceLine }) => (
  <div className="flex justify-between items-start" style={{ padding: "10px 0", borderBottom: "1px solid rgba(201,169,110,0.06)" }}>
    <div style={{ flex: 1 }}>
      <div className="flex items-center gap-2 flex-wrap">
        <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(232,221,208,0.75)" }}>{line.label}</span>
        {line.isEstimate && <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "0.15em", border: "1px solid rgba(201,169,110,0.30)", padding: "2px 7px", color: "rgba(201,169,110,0.60)" }}>ESTIMATION</span>}
      </div>
      {line.sublabel && <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, color: "rgba(232,221,208,0.35)", fontStyle: "italic", marginTop: 2 }}>{line.sublabel}</p>}
    </div>
    <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: line.isIncluded ? 300 : 500, fontSize: line.isIncluded ? 13 : 14, color: line.isIncluded ? "rgba(232,221,208,0.35)" : "rgba(232,221,208,0.85)", flexShrink: 0, marginLeft: 16 }}>
      {line.isIncluded ? "Inclus" : formatPrice(line.amount)}
    </span>
  </div>
);

/* ── Input styles ─────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%", background: "rgba(26,22,18,0.60)", border: "1px solid rgba(201,169,110,0.20)",
  borderRadius: 2, padding: "14px 18px", fontFamily: "'Jost', sans-serif", fontWeight: 300,
  fontSize: 14, color: "#faf8f4", outline: "none", transition: "0.25s ease",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: "0.20em",
  textTransform: "uppercase", color: "rgba(232,221,208,0.45)", marginBottom: 6, display: "block",
};

const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = "rgba(201,169,110,0.60)";
  e.currentTarget.style.background = "rgba(201,169,110,0.04)";
};
const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = "rgba(201,169,110,0.20)";
  e.currentTarget.style.background = "rgba(26,22,18,0.60)";
};

/* ── Name lookups ─────────────────────────────────────── */
const menuNames: Record<string, string> = {
  "entree-1": "Velouté de courge rôtie", "entree-2": "Tartare de saumon fumé", "entree-3": "Terrine de foie gras maison",
  "plat-1": "Filet de bœuf Rossini", "plat-2": "Suprême de volaille fermière", "plat-3": "Pavé de cabillaud sauvage",
  "dessert-1": "Pièce montée choux revisitée", "dessert-2": "Entremets Beaujolais", "dessert-3": "Vacherin glacé aux fruits rouges",
};
const vhNames: Record<string, string> = {
  "vh-salé-1": "Classique Terroir", "vh-salé-2": "Mer & Jardin", "vh-salé-3": "Prestige Beaujolais",
  "vh-anim-1": "Jambon Ibérique", "vh-anim-2": "Bar à Huîtres", "vh-anim-3": "Plancha Méditerranéenne",
  "vh-sucré-1": "Classique Français", "vh-sucré-2": "Terroir Beaujolais", "vh-sucré-3": "Gourmandise Libre",
};
const repasLabels: Record<string, string> = { essentiel: "Essentiel", gastronomique: "Gastronomique", prestige: "Prestige" };
const decoLabels: Record<string, string> = { champetre: "Champêtre Authentique", boheme: "Bohème Moderne", elegance: "Élégance Intemporelle" };
const photoLabels: Record<string, string> = { none: "Non sélectionné", reportage: "Reportage", premium: "Premium Duo" };
const djLabels: Record<string, string> = { none: "Non sélectionné", standard: "Standard", premium: "Premium" };

/* ── Week generation ──────────────────────────────────── */
type WeekOption = { label: string; value: string; monday: Date };

const generateWeeks = (): WeekOption[] => {
  const weeks: WeekOption[] = [];
  const today = new Date();
  // Start from 3 weeks from now (skip 2 next weeks)
  const start = new Date(today);
  start.setDate(start.getDate() + 14);
  // Find next Monday
  while (start.getDay() !== 1) start.setDate(start.getDate() + 1);

  for (let i = 0; i < 8; i++) {
    const monday = new Date(start);
    monday.setDate(start.getDate() + i * 7);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const fmt = (d: Date) => d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
    weeks.push({
      label: `Semaine du ${fmt(monday)} au ${fmt(sunday)}`,
      value: monday.toISOString().split("T")[0],
      monday,
    });
  }
  return weeks;
};

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const CRENEAUX = [
  { label: "Matin (10h)", value: "10h" },
  { label: "Midi (12h)", value: "12h" },
  { label: "Après-midi (15h)", value: "15h" },
];

/* ── CTA label ────────────────────────────────────────── */
const getCTALabel = (loc: Localisation): string => {
  if (loc === "local") return "RÉSERVER MA DÉGUSTATION";
  if (loc === "distance") return "ENVOYER MA DEMANDE + EXPÉDIER MON COFFRET";
  return "ENVOYER MA DEMANDE";
};

const getSubtitle = (loc: Localisation): string => {
  if (loc === "local") return "Votre demande de dégustation sur site sera confirmée dans les 2 heures.";
  if (loc === "distance") return "Votre coffret sera expédié et le RDV Zoom confirmé dans les 2 heures.";
  return "Un conseiller Limen vous contacte sous 24h.";
};

/* ── Roadmap ──────────────────────────────────────────── */
const Roadmap = ({ loc }: { loc: Localisation }) => {
  const steps = [
    loc === "distance" ? "Coffret + RDV Zoom" : "Dégustation sur site",
    "Devis définitif",
    "Signature du contrat",
    "Date bloquée ✓",
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-0 mt-10 w-full" style={{ maxWidth: 520, margin: "40px auto 0" }}>
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col sm:flex-row items-center" style={{ flex: 1 }}>
          <div className="flex flex-col items-center" style={{ minWidth: 80 }}>
            <div
              style={{
                width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13,
                border: i === 0 ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.25)",
                background: i === 0 ? "rgba(201,169,110,0.10)" : "transparent",
                color: i === 0 ? "#c9a96e" : "rgba(201,169,110,0.40)",
              }}
            >
              {i + 1}
            </div>
            <p style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, color: i === 0 ? "#c9a96e" : "rgba(232,221,208,0.40)",
              textAlign: "center", marginTop: 6, lineHeight: 1.3, maxWidth: 100,
            }}>
              {step}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div className="hidden sm:block" style={{ flex: 1, height: 1, background: "rgba(201,169,110,0.15)", minWidth: 20, marginTop: -20 }} />
          )}
          {i < steps.length - 1 && (
            <div className="block sm:hidden" style={{ width: 1, height: 16, background: "rgba(201,169,110,0.15)", margin: "4px 0" }} />
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Tag button ───────────────────────────────────────── */
const TagButton = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    data-cursor-hover
    style={{
      fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, letterSpacing: "0.05em",
      padding: "10px 18px", borderRadius: 2, cursor: "pointer", transition: "all 0.25s ease",
      background: selected ? "rgba(201,169,110,0.15)" : "rgba(26,22,18,0.50)",
      border: selected ? "1px solid rgba(201,169,110,0.50)" : "1px solid rgba(201,169,110,0.15)",
      color: selected ? "#c9a96e" : "rgba(232,221,208,0.60)",
    }}
  >
    {label}
  </button>
);

/* ── RDV Selector ─────────────────────────────────────── */
const RDVSelector = ({
  semaine, setSemaine, jour, setJour, creneau, setCreneau,
}: {
  semaine: string; setSemaine: (v: string) => void;
  jour: string; setJour: (v: string) => void;
  creneau: string; setCreneau: (v: string) => void;
}) => {
  const weeks = useMemo(() => generateWeeks(), []);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label style={labelStyle}>Semaine</label>
        <select
          value={semaine}
          onChange={(e) => { setSemaine(e.target.value); setJour(""); setCreneau(""); }}
          style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(201,169,110,0.6)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
        >
          <option value="">Choisir une semaine</option>
          {weeks.map((w) => <option key={w.value} value={w.value}>{w.label}</option>)}
        </select>
      </div>

      {semaine && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <label style={{ ...labelStyle, marginBottom: 10 }}>Jour</label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((d) => <TagButton key={d} label={d} selected={jour === d} onClick={() => { setJour(d); setCreneau(""); }} />)}
          </div>
        </motion.div>
      )}

      {jour && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <label style={{ ...labelStyle, marginBottom: 10 }}>Créneau</label>
          <div className="flex flex-wrap gap-2">
            {CRENEAUX.map((c) => <TagButton key={c.value} label={c.label} selected={creneau === c.value} onClick={() => setCreneau(c.value)} />)}
          </div>
        </motion.div>
      )}

      <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.40)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
        Nous confirmons le créneau par email dans les 2 heures suivant votre demande.
      </p>
    </div>
  );
};

/* ════════════════════════════════════════════════════════ */
const Step11_Recap = ({ state, onPrev }: Step10Props) => {
  const breakdown = useMemo(() => calculateBreakdown(state), [state]);

  const [contact, setContact] = useState({ prenom: state.contact?.prenom || "", nom: "", email: state.contact?.email || "", telephone: state.contact?.telephone || "", message: "" });
  const [localisation, setLocalisation] = useState<Localisation>(null);
  const [rdvSemaine, setRdvSemaine] = useState("");
  const [rdvJour, setRdvJour] = useState("");
  const [rdvCreneau, setRdvCreneau] = useState("");
  const [adresse, setAdresse] = useState({ rue: "", cp: "", ville: "", pays: "France" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = useCallback((field: string, value: string) => setContact((prev) => ({ ...prev, [field]: value })), []);
  const updateAdresse = useCallback((field: string, value: string) => setAdresse((prev) => ({ ...prev, [field]: value })), []);

  const handleSubmit = async () => {
    if (!contact.email.trim() || !contact.prenom.trim()) return;
    setIsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const client = supabase as any;
      const { error } = await client.from("configurateur_leads").insert({
        prenom: contact.prenom, nom: contact.nom, email: contact.email, telephone: contact.telephone,
        message: contact.message, date_mariage: state.date, guests_estimate: state.guests,
        ceremonie_laique: state.ceremonieLaique,
        vin_dhonneur: [state.vhBouchee, state.vhAnimation, state.vhMignardise].filter(Boolean).join(' · '),
        repas_formule: state.repas, repas_entree: state.repasEntree, repas_plat: state.repasPlat, repas_dessert: state.repasDessert,
        photographe: state.photographe, dj: state.dj, deco: state.deco,
        options: state.options, ambiance_musique: state.ambianceMusique ?? [],
        total_estimate: breakdown.totalEstimate, status: "new",
        localisation: localisation,
        rdv_semaine: rdvSemaine || null,
        rdv_jour: rdvJour || null,
        rdv_creneau: rdvCreneau || null,
        adresse_livraison: localisation === "distance" ? { rue: adresse.rue, cp: adresse.cp, ville: adresse.ville, pays: adresse.pays } : null,
        coffret_demande: localisation === "distance",
        site_mariage: state.siteMariage,
      });
      if (error) console.error("Erreur envoi:", error);
      setIsSuccess(true);
    } catch (err) {
      console.error("Erreur envoi:", err);
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  const menuSubtext = [state.repasEntree, state.repasPlat, state.repasDessert].map((id) => id ? menuNames[id] : null).filter(Boolean).join(" · ");
  const optionsList = (state.options || []).map((id) => OPTION_LABELS[id] || id).join(" · ");
  const canSubmit = contact.prenom.trim() && contact.email.trim() && !isLoading;
  const subtotalConfirmed = breakdown.subtotalFixe + breakdown.subtotalOptions;

  return (
    <div className="flex items-start justify-center min-h-screen px-4 sm:px-6" style={{ paddingTop: 60, paddingBottom: 120 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 780 }}>

        {/* ═══ BLOC 1 — ACCROCHE ═══ */}
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Votre mariage Limen
        </motion.p>
        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(36px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.1 }}>
          Certains lieux ont été faits<br />pour un seul jour. Le vôtre.
        </motion.h2>
        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(201,169,110,0.80)", letterSpacing: "0.10em", marginTop: 16 }}>
          {formatDate(state.date)} · Domaine de la Croix Rochefort
        </motion.p>
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} style={{ width: 80, height: 1, background: "#c9a96e", margin: "36px auto 48px" }} />

        {/* ═══ BLOC 2 — VOS CHOIX ═══ */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="w-full" style={{ maxWidth: 700 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginBottom: 28 }}>Vos choix</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ChoiceLine category="Date" value={formatDate(state.date)} />
            <ChoiceLine category="Invités" value={`${state.guests} personnes (estimation)`} />
            <ChoiceLine category="Cérémonie" value={state.ceremonieLaique ? "Laïque" : "Mariage civil uniquement"} price={state.ceremonieLaique ? "+ 800 €" : "Inclus"} />
            <ChoiceLine category="Vin d'honneur" value={[state.vhBouchee, state.vhAnimation, state.vhMignardise].filter(Boolean).map(id => vhNames[id!] || id).join(" · ") || "À composer"} price="Inclus" />
            <ChoiceLine
              category="Repas"
              value={repasLabels[state.repas] || state.repas}
              price={`≈ ${formatPrice((state.repas === "essentiel" ? 65 : state.repas === "gastronomique" ? 90 : 130) * state.guests)}`}
              subtext={menuSubtext || undefined}
              badge="DÉGUSTATION INCLUSE"
            />
            <ChoiceLine category="Décoration" value={decoLabels[state.deco] || state.deco} price={state.deco === "champetre" ? "Inclus" : state.deco === "boheme" ? "+ 600 €" : "+ 1 200 €"} />
            <ChoiceLine category="Photographe" value={photoLabels[state.photographe] || "Non sélectionné"} price={state.photographe === "none" ? undefined : state.photographe === "reportage" ? "+ 1 800 €" : "+ 3 200 €"} />
            <ChoiceLine category="DJ" value={djLabels[state.dj] || "Non sélectionné"} price={state.dj === "none" ? undefined : state.dj === "standard" ? "+ 1 200 €" : "+ 2 100 €"} />
            <div className="sm:col-span-2">
              <ChoiceLine category="Options" value={optionsList || "Aucune option"} price={breakdown.subtotalOptions > 0 ? `+ ${formatPrice(breakdown.subtotalOptions)}` : undefined} />
            </div>
            <ChoiceLine category="Site de mariage" value={state.siteMariage ? "Site personnalisé inclus" : "Sans site"} price={state.siteMariage ? "Inclus" : "—"} />
          </div>
        </motion.div>

        {/* ═══ BLOC 3 — DEVIS ═══ */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} style={{ width: 60, height: 1, background: "#c9a96e", margin: "44px auto" }} />
        <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp} className="w-full" style={{ maxWidth: 700 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginBottom: 28 }}>Estimation de votre budget</p>
          <div style={{ background: "rgba(26,22,18,0.60)", border: "1px solid rgba(201,169,110,0.25)", borderRadius: 2 }} className="p-6 sm:p-10">
            {breakdown.lines.map((line, i) => <PriceLineRow key={i} line={line} />)}

            <div style={{ borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: 20, marginTop: 8 }} className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.50)" }}>Forfait & prestations fixes</span>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(232,221,208,0.70)" }}>{formatPrice(breakdown.subtotalFixe)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.50)" }}>Repas & boissons (estimation)</span>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(201,169,110,0.70)" }}>≈ {formatPrice(breakdown.subtotalRepas)}</span>
              </div>
              {breakdown.subtotalOptions > 0 && (
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.50)" }}>Options</span>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(232,221,208,0.70)" }}>{formatPrice(breakdown.subtotalOptions)}</span>
                </div>
              )}
            </div>

            {/* Transparence prix repas */}
            <div style={{
              background: "rgba(201,169,110,0.05)", borderLeft: "2px solid rgba(201,169,110,0.40)",
              padding: "16px 20px", marginTop: 24, marginBottom: 24,
            }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.60)", marginBottom: 10 }}>
                Prix repas — comment ça fonctionne
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.60)", lineHeight: 1.75 }}>
                Le prix du repas affiché est basé sur {state.guests} invités estimés. Le tarif définitif sera calculé sur le nombre exact confirmé ensemble environ 6 semaines avant le mariage. La différence est généralement de ±5 à 10%.
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(201,169,110,0.80)", marginTop: 10 }}>
                Votre estimation est volontairement calculée sur la fourchette haute.
              </p>
            </div>

            {/* Total */}
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.40)", paddingTop: 24 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-end">
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.60)", marginBottom: 6 }}>Estimation totale</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, color: "rgba(232,221,208,0.35)", lineHeight: 1.6 }}>
                  Basé sur {state.guests} invités estimés
                </p>
              </div>
              <div className="text-right mt-4 sm:mt-0">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(40px, 5vw, 52px)", color: "#c9a96e", lineHeight: 1 }}>
                  <AnimatedCounter target={breakdown.totalEstimate} />
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.40)", marginTop: 6 }}>
                  soit ≈ {formatPrice(breakdown.totalPerPerson)} / invité
                </p>
              </div>
            </div>

            {/* Sous le total — lignes détaillées */}
            <div style={{ marginTop: 8 }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.45)" }}>
                dont ≈ {formatPrice(breakdown.subtotalRepas)} à confirmer après validation des invités
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: "#c9a96e", marginTop: 4 }}>
                {formatPrice(subtotalConfirmed)} confirmés dès aujourd'hui
              </p>
            </div>
          </div>
        </motion.div>

        {/* ═══ BLOC 4 — PARCOURS DE CONVERSION ═══ */}
        <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp} style={{ width: 80, height: 1, background: "#c9a96e", margin: "48px auto" }} />

        {/* 4A — Mention dégustation */}
        <motion.div custom={8} initial="hidden" animate="visible" variants={fadeUp} className="w-full flex justify-center">
          <div style={{
            background: "rgba(26,22,18,0.60)", border: "1px solid rgba(201,169,110,0.20)", borderRadius: 2,
            padding: "32px 36px", maxWidth: 580, width: "100%", textAlign: "center",
          }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 24, color: "rgba(201,169,110,0.40)", marginBottom: 16 }}>✦</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 28, color: "#faf8f4", marginBottom: 12, lineHeight: 1.3 }}>
              Avant de vous décider,<br />goûtez.
            </h3>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,221,208,0.60)", lineHeight: 1.8 }}>
              Nous organisons une dégustation avec le chef Sébastien — les plats que vous avez choisis, les vins beaujolais du sommelier Julien, dans les jardins du domaine. C'est votre prochaine étape naturelle.
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(201,169,110,0.65)", letterSpacing: "0.10em", marginTop: 16 }}>
              2h avec le chef  ·  Menu complet dégusté  ·  Vins du domaine inclus
            </p>
          </div>
        </motion.div>

        {/* 4B — Question localisation */}
        <motion.div custom={9} initial="hidden" animate="visible" variants={fadeUp} className="w-full flex flex-col items-center" style={{ marginTop: 40 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,221,208,0.50)", marginBottom: 24 }}>
            Pour organiser votre dégustation
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,221,208,0.55)", marginBottom: 32 }}>
            Vous êtes plutôt...
          </p>

          <div className="flex flex-col-reverse sm:flex-row gap-3.5 w-full justify-center" style={{ maxWidth: 520 }}>
            {/* Carte LOCAL */}
            <button
              onClick={() => setLocalisation(localisation === "local" ? null : "local")}
              data-cursor-hover
              className="flex-1 text-center transition-all duration-300"
              style={{
                padding: "28px 24px", borderRadius: 2, cursor: "pointer", background: localisation === "local" ? "rgba(201,169,110,0.10)" : "rgba(26,22,18,0.50)",
                border: localisation === "local" ? "1px solid rgba(201,169,110,0.50)" : "1px solid rgba(201,169,110,0.15)",
              }}
            >
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 28, color: "rgba(201,169,110,0.50)", marginBottom: 12 }}>◎</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(232,221,208,0.75)" }}>Proche du domaine</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)", marginTop: 8 }}>À moins de 2h de Lyon</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a96e", marginTop: 16 }}>Choisir un créneau</p>
            </button>

            {/* Carte DISTANCE */}
            <button
              onClick={() => setLocalisation(localisation === "distance" ? null : "distance")}
              data-cursor-hover
              className="flex-1 text-center transition-all duration-300"
              style={{
                padding: "28px 24px", borderRadius: 2, cursor: "pointer", background: localisation === "distance" ? "rgba(201,169,110,0.10)" : "rgba(26,22,18,0.50)",
                border: localisation === "distance" ? "1px solid rgba(201,169,110,0.50)" : "1px solid rgba(201,169,110,0.15)",
              }}
            >
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 28, color: "rgba(201,169,110,0.50)", marginBottom: 12 }}>◌</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(232,221,208,0.75)" }}>Loin ou à l'étranger</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)", marginTop: 8 }}>Paris, province, étranger</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a96e", marginTop: 16 }}>Dégustation à distance</p>
            </button>
          </div>
        </motion.div>

        {/* 4C — Panneau LOCAL */}
        <AnimatePresence>
          {localisation === "local" && (
            <motion.div
              key="local-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center overflow-hidden"
              style={{ marginTop: 32 }}
            >
              <div style={{
                background: "rgba(26,22,18,0.60)", border: "1px solid rgba(201,169,110,0.20)", borderRadius: 2,
                padding: "28px 32px", maxWidth: 580, width: "100%",
              }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.30em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginBottom: 24 }}>
                  Choisissez votre créneau
                </p>
                <RDVSelector semaine={rdvSemaine} setSemaine={setRdvSemaine} jour={rdvJour} setJour={setRdvJour} creneau={rdvCreneau} setCreneau={setRdvCreneau} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4D — Panneau DISTANCE */}
        <AnimatePresence>
          {localisation === "distance" && (
            <motion.div
              key="distance-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center overflow-hidden"
              style={{ marginTop: 32 }}
            >
              <div style={{
                background: "rgba(26,22,18,0.60)", border: "1px solid rgba(201,169,110,0.20)", borderRadius: 2,
                padding: "28px 32px", maxWidth: 580, width: "100%",
              }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.30em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginBottom: 24 }}>
                  Votre dégustation à distance
                </p>

                {/* Étape 1 — RDV Zoom */}
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(232,221,208,0.50)", marginBottom: 16 }}>
                  1. RDV Zoom
                </p>
                <RDVSelector semaine={rdvSemaine} setSemaine={setRdvSemaine} jour={rdvJour} setJour={setRdvJour} creneau={rdvCreneau} setCreneau={setRdvCreneau} />
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.55)", marginTop: 12, lineHeight: 1.7 }}>
                  RDV vidéo de 45 min avec Rémi et le chef Sébastien. Vous visitez le domaine en live et découvrez votre menu en détail.
                </p>

                {/* Séparateur */}
                <div style={{ width: "100%", height: 1, background: "rgba(201,169,110,0.15)", margin: "24px 0" }} />

                {/* Étape 2 — Coffret */}
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginBottom: 16 }}>
                  Votre coffret Limen
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.55)", lineHeight: 1.75, marginBottom: 16 }}>
                  Nous vous envoyons un coffret avant notre appel vidéo pour que vous ayez le Beaujolais dans votre verre pendant qu'on parle de votre mariage.
                </p>

                <div className="flex flex-col gap-2" style={{ marginBottom: 20 }}>
                  {[
                    "1 bouteille Beaujolais Villages (sélection Julien, sommelier)",
                    "Échantillons huile d'olive, miel & confiture du terroir",
                    "Menu complet imprimé sur papier coton 300g",
                    "Note manuscrite du chef Sébastien",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.60)", lineHeight: 1.6 }}>
                      <span style={{ color: "#c9a96e", flexShrink: 0 }}>—</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Adresse de livraison */}
                <label style={labelStyle}>Adresse de livraison</label>
                <div className="flex flex-col gap-3 mt-2">
                  <input type="text" placeholder="Rue" value={adresse.rue} onChange={(e) => updateAdresse("rue", e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Code postal" value={adresse.cp} onChange={(e) => updateAdresse("cp", e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                    <input type="text" placeholder="Ville" value={adresse.ville} onChange={(e) => updateAdresse("ville", e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                  </div>
                  <input type="text" placeholder="Pays" value={adresse.pays} onChange={(e) => updateAdresse("pays", e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, color: "rgba(232,221,208,0.30)", fontStyle: "italic", marginTop: 8 }}>
                  Livraison offerte · Reçu 5 à 7 jours avant notre RDV Zoom
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ BLOC 5 — FORMULAIRE CONTACT ═══ */}
        <motion.div custom={10} initial="hidden" animate="visible" variants={fadeUp} style={{ width: 80, height: 1, background: "#c9a96e", margin: "48px auto" }} />

        <motion.div custom={11} initial="hidden" animate="visible" variants={fadeUp} className="w-full flex flex-col items-center" style={{ maxWidth: 700 }}>
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-center" style={{ maxWidth: 520 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 48, color: "#c9a96e", marginBottom: 16 }}>◇</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 36, color: "#faf8f4", marginBottom: 16 }}>
                  {localisation === "local" ? "Votre dégustation est réservée." : "Votre demande est envoyée."}
                </h3>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,221,208,0.60)", lineHeight: 1.8 }}>
                  {localisation === "local"
                    ? `Nous vous confirmons le créneau du ${rdvJour || "jour choisi"} par email dans les 2 heures. Vous rencontrerez le chef Sébastien et découvrirez votre menu en avant-première.`
                    : localisation === "distance"
                      ? `Votre coffret Limen sera expédié dans les 48 heures${adresse.ville ? ` à ${adresse.ville}` : ""}. Le RDV Zoom sera confirmé par email — prévoyez une bouteille de Beaujolais à portée de main.`
                      : "Nous vous contacterons dans les 24 heures pour confirmer votre date et répondre à toutes vos questions."
                  }
                </p>
                <Roadmap loc={localisation} />
              </motion.div>
            ) : (
              <motion.div key="form" className="w-full flex flex-col items-center">
                <h3 className="text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 36, color: "#faf8f4", marginBottom: 8 }}>On vous rappelle ?</h3>
                <p className="text-center" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,221,208,0.55)", lineHeight: 1.7, marginBottom: 36 }}>
                  {getSubtitle(localisation)}
                </p>
                <div className="flex flex-col gap-3.5 w-full" style={{ maxWidth: 480 }}>
                  <div><label style={labelStyle}>Prénom</label><input type="text" placeholder="Votre prénom" value={contact.prenom} onChange={(e) => updateField("prenom", e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} /></div>
                  <div><label style={labelStyle}>Nom</label><input type="text" placeholder="Votre nom" value={contact.nom} onChange={(e) => updateField("nom", e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} /></div>
                  <div><label style={labelStyle}>Email</label><input type="email" placeholder="votre@email.com" value={contact.email} onChange={(e) => updateField("email", e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} /></div>
                  <div><label style={labelStyle}>Téléphone</label><input type="tel" placeholder="06 xx xx xx xx" value={contact.telephone} onChange={(e) => updateField("telephone", e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} /></div>
                  <div><label style={labelStyle}>Un mot pour nous (optionnel)</label><textarea placeholder="" value={contact.message} onChange={(e) => updateField("message", e.target.value)} style={{ ...inputStyle, height: 80, resize: "none" }} onFocus={focusIn} onBlur={focusOut} /></div>

                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, color: "rgba(232,221,208,0.30)", lineHeight: 1.6, marginTop: 4 }}>
                    Vos données sont utilisées uniquement pour vous recontacter au sujet de votre mariage. Aucune diffusion à des tiers.
                  </p>

                  <motion.button onClick={handleSubmit} disabled={!canSubmit} className="w-full transition-colors duration-300"
                    style={{
                      fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
                      background: "#c9a96e", color: "#1a1612", padding: 20, borderRadius: 0, border: "none",
                      cursor: canSubmit ? "pointer" : "not-allowed", opacity: canSubmit ? 1 : 0.5, marginTop: 8,
                    }}
                    whileHover={canSubmit ? { backgroundColor: "#e8d5b0" } : {}}
                    data-cursor-hover
                  >
                    {isLoading ? "ENVOI EN COURS..." : getCTALabel(localisation)}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!isSuccess && (
          <motion.div custom={12} initial="hidden" animate="visible" variants={fadeUp} className="mt-12">
            <button onClick={onPrev} className="transition-colors duration-200" data-cursor-hover
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.2em", color: "rgba(232,221,208,0.40)", background: "transparent", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.70)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.40)"; }}>
              ← MODIFIER MES CHOIX
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Step11_Recap;
