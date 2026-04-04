import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfigurateurState, OPTION_PRICES } from "../pricingTypes";

interface Step09Props {
  state: ConfigurateurState;
  onUpdate: (partial: Partial<ConfigurateurState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" } }),
};

interface OptionDef {
  id: string;
  name: string;
  description: string;
  prix: string;
  icon: React.ReactNode;
}

const mkIcon = (children: React.ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.60)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const options: OptionDef[] = [
  { id: "photobooth", name: "PHOTOBOOTH PREMIUM", description: "Borne photo vintage, accessoires inclus, impressions instantanées & galerie numérique", prix: "+ 400 €",
    icon: mkIcon(<><rect x="4" y="6" width="16" height="13" rx="2" /><circle cx="12" cy="13" r="3" /><line x1="9" y1="3" x2="15" y2="3" /></>) },
  { id: "cocktail_bar", name: "BAR À COCKTAILS", description: "Barman dédié, cocktails signature Limen, mocktails & boissons premium pendant le vin d'honneur", prix: "+ 600 €",
    icon: mkIcon(<><path d="M8 2L16 2L12 10L12 20" /><line x1="8" y1="20" x2="16" y2="20" /><line x1="7" y1="6" x2="17" y2="6" /></>) },
  { id: "feu_artifice", name: "FEU D'ARTIFICE", description: "8 minutes de feu d'artifice musical synchronisé, tiré depuis le domaine à minuit", prix: "+ 1 800 €",
    icon: mkIcon(<><line x1="12" y1="12" x2="12" y2="2" /><line x1="12" y1="12" x2="4" y2="6" /><line x1="12" y1="12" x2="20" y2="6" /><line x1="12" y1="12" x2="6" y2="18" /><line x1="12" y1="12" x2="18" y2="18" /><circle cx="12" cy="12" r="2" /></>) },
  { id: "voiture_collection", name: "VOITURE DE COLLECTION", description: "Arrivée des mariés en véhicule de prestige, chauffeur en livrée, décoration florale du véhicule", prix: "+ 550 €",
    icon: mkIcon(<><rect x="2" y="10" width="20" height="7" rx="3" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M5 10L7 5H17L19 10" /></>) },
  { id: "livre_or", name: "LIVRE D'OR LIMEN", description: "Livre relié cuir, papier aquarelle, calligraphe présent pendant le vin d'honneur", prix: "+ 280 €",
    icon: mkIcon(<><path d="M4 19V5a2 2 0 012-2h12a2 2 0 012 2v14" /><path d="M4 19a2 2 0 012-2h12a2 2 0 012 2" /><path d="M4 19a2 2 0 002 2h12a2 2 0 002-2" /></>) },
  { id: "candy_bar", name: "SWEET TABLE", description: "Table de confiseries artisanales, macarons, chocolats, calissons — tout en blanc et or", prix: "+ 350 €",
    icon: mkIcon(<><rect x="6" y="4" width="12" height="16" rx="1" /><line x1="6" y1="4" x2="18" y2="4" /><rect x="8" y="2" width="8" height="2" rx="1" /></>) },
  { id: "caricaturiste", name: "CARICATURISTE", description: "Artiste présent 3h pendant le repas, croquis remis en souvenir à chaque table", prix: "+ 480 €",
    icon: mkIcon(<><line x1="4" y1="20" x2="10" y2="4" /><line x1="10" y1="4" x2="11" y2="3" /><line x1="11" y1="3" x2="12" y2="4" /></>) },
  { id: "lanternes", name: "LÂCHER DE LANTERNES", description: "50 lanternes biodégradables, moment collectif au coucher du soleil", prix: "+ 220 €",
    icon: mkIcon(<><rect x="8" y="6" width="8" height="12" rx="1" /><path d="M10 18L12 22L14 18" /><line x1="12" y1="6" x2="12" y2="3" /></>) },
];

const Step09_Options = ({ state, onUpdate, onNext, onPrev }: Step09Props) => {
  const [selected, setSelected] = useState<string[]>(state.options);

  const toggle = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const total = selected.reduce((sum, id) => sum + (OPTION_PRICES[id] || 0), 0);

  const handleContinue = () => {
    onUpdate({ options: selected });
    onNext();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 100 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 700 }}>
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 9 · Les extras
        </motion.p>

        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
          Les détails qui<br />font la différence.
        </motion.h2>

        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 480, marginBottom: 44 }}>
          Chaque option est indépendante. Prenez tout, prenez rien — composez exactement ce dont vous avez besoin.
        </motion.p>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 48px" }} />

        {/* Grid */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-[14px] w-full">
          {options.map((opt) => {
            const isOn = selected.includes(opt.id);
            return (
              <div
                key={opt.id}
                onClick={() => toggle(opt.id)}
                className="flex gap-4 relative transition-all duration-[250ms]"
                style={{
                  padding: "22px 24px", borderRadius: 2, cursor: "pointer",
                  border: isOn ? "1px solid rgba(201,169,110,0.60)" : "1px solid rgba(201,169,110,0.15)",
                  background: isOn ? "rgba(201,169,110,0.07)" : "rgba(26,22,18,0.40)",
                  alignItems: "flex-start",
                }}
                onMouseEnter={(e) => { if (!isOn) { e.currentTarget.style.border = "1px solid rgba(201,169,110,0.35)"; e.currentTarget.style.background = "rgba(201,169,110,0.03)"; } }}
                onMouseLeave={(e) => { if (!isOn) { e.currentTarget.style.border = "1px solid rgba(201,169,110,0.15)"; e.currentTarget.style.background = "rgba(26,22,18,0.40)"; } }}
              >
                {isOn && <div className="absolute top-4 right-4" style={{ width: 10, height: 10, background: "#c9a96e" }} />}
                <div className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 44, height: 44, background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 2 }}>
                  {opt.icon}
                </div>
                <div className="flex-1">
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(232,221,208,0.80)", marginBottom: 6 }}>{opt.name}</p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.50)", lineHeight: 1.60 }}>{opt.description}</p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 14, color: "#c9a96e", marginTop: 10 }}>{opt.prix}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Counter */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-5 mt-9">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 48, color: "#c9a96e", lineHeight: 1 }}>{selected.length}</span>
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,221,208,0.55)", marginBottom: 4 }}>
                  option{selected.length > 1 ? "s" : ""} choisie{selected.length > 1 ? "s" : ""}
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(201,169,110,0.70)" }}>
                  + {total.toLocaleString("fr-FR")} € au forfait
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
          className="flex items-center justify-between w-full mt-12" style={{ maxWidth: 480 }}>
          <button onClick={onPrev} className="transition-colors duration-200"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.2em", color: "rgba(232,221,208,0.40)", background: "transparent", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.70)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.40)"; }}>
            ← RETOUR
          </button>
          <motion.button onClick={handleContinue} className="transition-colors duration-300"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", border: "1px solid #c9a96e", background: "transparent", color: "#c9a96e", padding: "18px 56px", borderRadius: 0, cursor: "pointer" }}
            whileHover={{ backgroundColor: "#c9a96e", color: "#1a1612" }}>
            Voir mon récapitulatif
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Step09_Options;
