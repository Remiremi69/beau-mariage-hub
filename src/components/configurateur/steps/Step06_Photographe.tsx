import { useState } from "react";
import { motion } from "framer-motion";
import { ConfigurateurState, Photographe } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerPhotographe } from "../drawerContents";

interface Step06Props {
  state: ConfigurateurState;
  onUpdate: (partial: Partial<ConfigurateurState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" } }),
};

const cardBase: React.CSSProperties = {
  borderRadius: 2, cursor: "pointer", transition: "all 0.25s ease",
  border: "1px solid rgba(201,169,110,0.15)", background: "rgba(26,22,18,0.35)",
};
const cardActive: React.CSSProperties = {
  border: "1px solid #c9a96e", background: "rgba(201,169,110,0.07)",
};

const IncludedItem = ({ text }: { text: string }) => (
  <div className="flex gap-[10px] mb-2" style={{ alignItems: "flex-start" }}>
    <span style={{ color: "rgba(201,169,110,0.60)", flexShrink: 0, marginTop: 2 }}>—</span>
    <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.65)", lineHeight: 1.5 }}>{text}</span>
  </div>
);

const Badge = ({ label, tone = "gold" }: { label: string; tone?: "gold" | "neutral" }) => (
  <span style={{
    fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.2em",
    textTransform: "uppercase", padding: "3px 10px",
    border: tone === "gold" ? "1px solid rgba(201,169,110,0.40)" : "1px solid rgba(232,221,208,0.30)",
    color: tone === "gold" ? "rgba(201,169,110,0.80)" : "rgba(232,221,208,0.55)",
  }}>{label}</span>
);

const Step06_Photographe = ({ state, onUpdate, onNext, onPrev }: Step06Props) => {
  const selected = state.photographe;
  const select = (v: Photographe) => onUpdate({ photographe: v });
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 700 }}>
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 6 · La mémoire
        </motion.p>

        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
          Ce jour mérite<br />d'être vu.
        </motion.h2>

        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 480, marginBottom: 44 }}>
          Le photographe est inclus dans tous les mariages Limen. Loïc Cancade vous accompagne — choisissez simplement la profondeur de la couverture.
        </motion.p>

        <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp}>
          <InfoButton label="Voir le travail de Loïc" onClick={() => setDrawerOpen(true)} />
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 48px" }} />

        <div className="flex flex-col gap-4 w-full" style={{ maxWidth: 560 }}>
          {/* Essentielle */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
            onClick={() => select("essentielle")}
            className="flex flex-col"
            style={{ ...cardBase, ...(selected === "essentielle" ? cardActive : {}), minHeight: 200, padding: 28 }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e" }}>Essentielle</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 28, color: "#faf8f4", marginTop: 8 }}>Loïc Cancade</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)", marginTop: 4 }}>Préparatifs → entrée en salle · 12h-21h</p>
              </div>
              <Badge label="Inclus" tone="neutral" />
            </div>
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.10)", margin: "20px 0" }} />
            <IncludedItem text="Minimum 450 photos HD retouchées" />
            <IncludedItem text="Galerie privée en ligne" />
            <IncludedItem text="Téléchargement offert à vos invités" />
            <IncludedItem text="Livraison sous 6 à 8 semaines" />
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.40)", fontStyle: "italic", marginTop: 16 }}>
              Aucune contrainte logistique — le photographe arrive directement au domaine.
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
            onClick={() => select("signature")}
            className="flex flex-col"
            style={{ ...cardBase, ...(selected === "signature" ? cardActive : {}), minHeight: 200, padding: 28 }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e" }}>Signature</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 28, color: "#faf8f4", marginTop: 8 }}>Loïc Cancade</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)", marginTop: 4 }}>Préparatifs → soirée dansante · 12h00 → minuit</p>
              </div>
              <Badge label="Prestige" tone="gold" />
            </div>
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.10)", margin: "20px 0" }} />
            <IncludedItem text="Minimum 600 photos HD retouchées" />
            <IncludedItem text="Préparatifs de la mariée inclus" />
            <IncludedItem text="Slideshow cinématique 4 à 6 minutes" />
            <IncludedItem text="Galerie privée en ligne" />
            <IncludedItem text="Téléchargement offert à vos invités" />
            <IncludedItem text="Livraison sous 6 à 8 semaines" />
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.40)", fontStyle: "italic", marginTop: 16 }}>
              Lieu de préparatifs requis à moins de 30 min du domaine.
            </p>
          </motion.div>
        </div>

        <motion.p custom={7} initial="hidden" animate="visible" variants={fadeUp} className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.35)", fontStyle: "italic", marginTop: 24 }}>
          Loïc a été sélectionné en personne pour la Série Octobre 2027. Il connaît le domaine, la philosophie Limen, et sera briefé avant votre journée.
        </motion.p>
        <motion.p custom={7.5} initial="hidden" animate="visible" variants={fadeUp} className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.35)", fontStyle: "italic", marginTop: 8 }}>
          <a href="https://www.loiccancade.com/mariage" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(232,221,208,0.35)", textDecoration: "none" }}>
            <span style={{ color: "#c9a96e" }}>→</span> Voir le portfolio complet
          </a>
        </motion.p>

        <motion.div custom={8} initial="hidden" animate="visible" variants={fadeUp}
          className="flex items-center justify-between w-full mt-12" style={{ maxWidth: 480 }}>
          <button onClick={onPrev} className="transition-colors duration-200"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.2em", color: "rgba(232,221,208,0.40)", background: "transparent", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.70)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.40)"; }}>
            ← RETOUR
          </button>
          <motion.button onClick={() => { onNext(); }} className="transition-colors duration-300"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", border: "1px solid #c9a96e", background: "transparent", color: "#c9a96e", padding: "18px 56px", borderRadius: 0, cursor: "pointer" }}
            whileHover={{ backgroundColor: "#c9a96e", color: "#1a1612" }}>
            Continuer
          </motion.button>
        </motion.div>
      </div>

      <PresentationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={drawerPhotographe} />
    </div>
  );
};

export default Step06_Photographe;
