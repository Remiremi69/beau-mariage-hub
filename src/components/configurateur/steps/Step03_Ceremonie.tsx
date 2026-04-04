import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfigurateurState } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerCeremonie } from "../drawerContents";

interface Step03Props {
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

const Step03_Ceremonie = ({ state, onUpdate, onNext, onPrev }: Step03Props) => {
  const withCeremonie = state.ceremonieLaique;

  const cardBase: React.CSSProperties = {
    minHeight: 260, borderRadius: 2, padding: "32px 28px",
    cursor: "pointer", transition: "all 0.30s ease",
    display: "flex", flexDirection: "column",
  };

  const cardDefault: React.CSSProperties = {
    ...cardBase,
    border: "1px solid rgba(201,169,110,0.15)",
    background: "rgba(26,22,18,0.35)",
  };

  const cardSelected: React.CSSProperties = {
    ...cardBase,
    border: "1px solid #c9a96e",
    background: "rgba(201,169,110,0.07)",
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 660 }}>
        {/* Label */}
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 3 · La cérémonie
        </motion.p>

        {/* Titre */}
        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
          Un moment<br />rien qu'à vous.
        </motion.h2>

        {/* Intro */}
        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 460, marginBottom: 40 }}>
          La cérémonie laïque est le cœur battant du mariage. Un officiant vous accompagne pour écrire et célébrer un moment sur-mesure, à votre image.
        </motion.p>

        {/* Séparateur */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 44px" }} />

        {/* Cards */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-col-reverse md:flex-row gap-4 w-full">
          {/* Carte A — Sans */}
          <div
            onClick={() => onUpdate({ ceremonieLaique: false })}
            className="flex-1 hover:border-[rgba(201,169,110,0.40)] hover:bg-[rgba(201,169,110,0.03)]"
            style={!withCeremonie ? cardSelected : cardDefault}
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 32, color: "rgba(232,221,208,0.30)" }}>○</span>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,221,208,0.70)", marginTop: 16 }}>
              Sans cérémonie
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.50)", lineHeight: 1.7, marginTop: 12 }}>
              Le mariage civil suffit.<br />Vous rejoignez directement<br />le vin d'honneur après la mairie.
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.35)", marginTop: "auto", paddingTop: 24 }}>
              Inclus
            </p>
          </div>

          {/* Carte B — Avec */}
          <div
            onClick={() => onUpdate({ ceremonieLaique: true })}
            className="flex-1 hover:border-[rgba(201,169,110,0.40)] hover:bg-[rgba(201,169,110,0.03)]"
            style={withCeremonie ? cardSelected : cardDefault}
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 32, color: "#c9a96e" }}>◇</span>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginTop: 16 }}>
              Cérémonie laïque
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.65)", lineHeight: 1.7, marginTop: 12 }}>
              Un officiant professionnel.<br />Un texte écrit avec vous.<br />30 à 45 minutes de pure émotion.
            </p>
            <div className="flex flex-col gap-[6px] mt-4">
              {["Rencontre préparatoire incluse", "Personnalisation complète du discours", "Sonorisation de la cérémonie"].map((item) => (
                <span key={item} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(201,169,110,0.75)" }}>
                  — {item}
                </span>
              ))}
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 15, color: "#c9a96e", marginTop: "auto", paddingTop: 20 }}>
              + 800 €
            </p>
          </div>
        </motion.div>

        {/* Message contextuel */}
        <AnimatePresence>
          {withCeremonie && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
              className="text-center"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.55)", lineHeight: 1.7, fontStyle: "italic", marginTop: 28 }}
            >
              L'officiant vous contactera 3 mois avant le mariage pour construire votre cérémonie ensemble.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
          className="flex items-center justify-between w-full mt-12" style={{ maxWidth: 480 }}>
          <button onClick={onPrev} className="transition-colors duration-200"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.2em", color: "rgba(232,221,208,0.40)", background: "transparent", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.70)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.40)"; }}>
            ← RETOUR
          </button>
          <motion.button onClick={onNext} className="transition-colors duration-300"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", border: "1px solid #c9a96e", background: "transparent", color: "#c9a96e", padding: "18px 56px", borderRadius: 0, cursor: "pointer" }}
            whileHover={{ backgroundColor: "#c9a96e", color: "#1a1612" }}>
            Continuer
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Step03_Ceremonie;
