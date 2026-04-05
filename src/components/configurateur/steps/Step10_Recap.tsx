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
const ChoiceLine = ({ category, value, price, subtext }: {
  category: string; value: string; price?: string; subtext?: string;
}) => (
  <div style={{ padding: "14px 18px", background: "rgba(26,22,18,0.50)", border: "1px solid rgba(201,169,110,0.12)", borderRadius: 2 }}>
    <div className="flex justify-between items-center">
      <div>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,221,208,0.35)", marginBottom: 3 }}>{category}</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(232,221,208,0.85)" }}>{value}</p>
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

/* ── Menu name lookup ─────────────────────────────────── */
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

/* ════════════════════════════════════════════════════════ */
const Step10_Recap = ({ state, onPrev }: Step10Props) => {
  const breakdown = useMemo(() => calculateBreakdown(state), [state]);

  const [contact, setContact] = useState({ prenom: state.contact?.prenom || "", nom: "", email: state.contact?.email || "", telephone: state.contact?.telephone || "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = useCallback((field: string, value: string) => setContact((prev) => ({ ...prev, [field]: value })), []);

  const handleSubmit = async () => {
    if (!contact.email.trim() || !contact.prenom.trim()) return;
    setIsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const client = supabase as any;
      const { error } = await client.from("configurateur_leads").insert({
        prenom: contact.prenom, nom: contact.nom, email: contact.email, telephone: contact.telephone,
        message: contact.message, date_mariage: state.date, guests_estimate: state.guests,
        ceremonie_laique: state.ceremonieLaique, vin_dhonneur: [state.vhBouchee, state.vhAnimation, state.vhMignardise].filter(Boolean).join(' · '), repas_formule: state.repas,
        repas_entree: state.repasEntree, repas_plat: state.repasPlat, repas_dessert: state.repasDessert,
        photographe: state.photographe, dj: state.dj, deco: state.deco,
        options: state.options, ambiance_musique: state.ambianceMusique ?? [],
        total_estimate: breakdown.totalEstimate, status: "new",
      });
      if (error) console.error("Erreur envoi:", error, { state, contact });
      setIsSuccess(true);
    } catch (err) {
      console.error("Erreur envoi:", err, { state, contact });
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  const menuSubtext = [state.repasEntree, state.repasPlat, state.repasDessert].map((id) => id ? menuNames[id] : null).filter(Boolean).join(" · ");
  const optionsList = (state.options || []).map((id) => OPTION_LABELS[id] || id).join(" · ");
  const canSubmit = contact.prenom.trim() && contact.email.trim() && !isLoading;

  return (
    <div className="flex items-start justify-center min-h-screen px-4 sm:px-6" style={{ paddingTop: 60, paddingBottom: 120 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 780 }}>

        {/* BLOC 1 — ACCROCHE */}
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Votre mariage Limen
        </motion.p>
        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(40px, 5vw, 58px)", color: "#faf8f4", lineHeight: 1.05 }}>
          Tout est là.<br />Il ne manque plus que vous.
        </motion.h2>
        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(201,169,110,0.80)", letterSpacing: "0.10em", marginTop: 16 }}>
          {formatDate(state.date)} · Domaine de la Croix Rochefort
        </motion.p>
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} style={{ width: 80, height: 1, background: "#c9a96e", margin: "36px auto 48px" }} />

        {/* BLOC 2 — VOS CHOIX */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="w-full" style={{ maxWidth: 700 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginBottom: 28 }}>Vos choix</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ChoiceLine category="Date" value={formatDate(state.date)} />
            <ChoiceLine category="Invités" value={`${state.guests} personnes (estimation)`} />
            <ChoiceLine category="Cérémonie" value={state.ceremonieLaique ? "Laïque" : "Mariage civil uniquement"} price={state.ceremonieLaique ? "+ 800 €" : "Inclus"} />
            <ChoiceLine category="Vin d'honneur" value={vinLabels[state.vinDhonneur] || state.vinDhonneur} price={state.vinDhonneur === "decouverte" ? "Inclus" : `≈ ${formatPrice((state.vinDhonneur === "prestige" ? 18 : 38) * state.guests)}`} />
            <ChoiceLine category="Repas" value={repasLabels[state.repas] || state.repas} price={`≈ ${formatPrice((state.repas === "essentiel" ? 65 : state.repas === "gastronomique" ? 90 : 130) * state.guests)}`} subtext={menuSubtext || undefined} />
            <ChoiceLine category="Décoration" value={decoLabels[state.deco] || state.deco} price={state.deco === "champetre" ? "Inclus" : state.deco === "boheme" ? "+ 600 €" : "+ 1 200 €"} />
            <ChoiceLine category="Photographe" value={photoLabels[state.photographe] || "Non sélectionné"} price={state.photographe === "none" ? undefined : state.photographe === "reportage" ? "+ 1 800 €" : "+ 3 200 €"} />
            <ChoiceLine category="DJ" value={djLabels[state.dj] || "Non sélectionné"} price={state.dj === "none" ? undefined : state.dj === "standard" ? "+ 1 200 €" : "+ 2 100 €"} />
            <div className="sm:col-span-2">
              <ChoiceLine category="Options" value={optionsList || "Aucune option"} price={breakdown.subtotalOptions > 0 ? `+ ${formatPrice(breakdown.subtotalOptions)}` : undefined} />
            </div>
          </div>
        </motion.div>

        {/* BLOC 3 — PRIX */}
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

            {/* Total */}
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.40)", marginTop: 20, paddingTop: 24 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-end">
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.60)", marginBottom: 6 }}>Estimation totale</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, color: "rgba(232,221,208,0.35)", lineHeight: 1.6 }}>
                  Basé sur {state.guests} invités estimés<br />Le total définitif sera établi après<br />confirmation du nombre exact
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
          </div>

          <p className="text-center" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.40)", lineHeight: 1.75, fontStyle: "italic", marginTop: 20 }}>
            Les montants marqués "estimation" seront ajustés à la date butoir fixée ensemble, environ 6 semaines avant le mariage. Seul le nombre définitif d'invités modifiera ces lignes.
          </p>
        </motion.div>

        {/* BLOC 4 — FORMULAIRE */}
        <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp} style={{ width: 80, height: 1, background: "#c9a96e", margin: "48px auto" }} />

        <motion.div custom={8} initial="hidden" animate="visible" variants={fadeUp} className="w-full flex flex-col items-center" style={{ maxWidth: 700 }}>
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-center" style={{ maxWidth: 480 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 48, color: "#c9a96e", marginBottom: 16 }}>◇</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 36, color: "#faf8f4", marginBottom: 16 }}>Votre demande est envoyée.</h3>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,221,208,0.60)", lineHeight: 1.8 }}>
                  Nous vous contacterons dans les 24 heures pour confirmer votre date et répondre à toutes vos questions.
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 12, color: "rgba(232,221,208,0.35)", marginTop: 16 }}>
                  Un email de confirmation vous a été envoyé à {contact.email}
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" className="w-full flex flex-col items-center">
                <h3 className="text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 36, color: "#faf8f4", marginBottom: 8 }}>On vous rappelle ?</h3>
                <p className="text-center" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(232,221,208,0.55)", lineHeight: 1.7, marginBottom: 36 }}>
                  Laissez-nous vos coordonnées.<br />Un conseiller Limen vous contacte sous 24h<br />pour valider votre date et répondre à vos questions.
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
                      fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.30em", textTransform: "uppercase",
                      background: "#c9a96e", color: "#1a1612", padding: 20, borderRadius: 0, border: "none",
                      cursor: canSubmit ? "pointer" : "not-allowed", opacity: canSubmit ? 1 : 0.5, marginTop: 8,
                    }}
                    whileHover={canSubmit ? { backgroundColor: "#e8d5b0" } : {}}
                    data-cursor-hover
                  >
                    {isLoading ? "ENVOI EN COURS..." : "ENVOYER MA DEMANDE"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!isSuccess && (
          <motion.div custom={9} initial="hidden" animate="visible" variants={fadeUp} className="mt-12">
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

export default Step10_Recap;
