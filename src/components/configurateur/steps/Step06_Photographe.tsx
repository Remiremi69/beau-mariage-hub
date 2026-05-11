import { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
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

const PhotoCircle = ({ slot }: { slot: string }) => (
  <div
    data-photo-slot={slot}
    className="flex items-center justify-center flex-shrink-0"
    style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.25)" }}
  >
    <User size={24} color="rgba(201,169,110,0.30)" />
  </div>
);

const IncludedItem = ({ text }: { text: string }) => (
  <div className="flex gap-[10px] mb-2" style={{ alignItems: "flex-start" }}>
    <span style={{ color: "rgba(201,169,110,0.60)", flexShrink: 0, marginTop: 2 }}>—</span>
    <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.65)", lineHeight: 1.5 }}>{text}</span>
  </div>
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
          Un photographe de mariage ne capture pas des poses. Il capture ce qui se passe entre les poses. Les larmes retenues. Le rire qui déborde.
        </motion.p>

        <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp}>
          <InfoButton label="Voir le travail de Loïc" onClick={() => setDrawerOpen(true)} />
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 48px" }} />

        <div className="flex flex-col gap-4 w-full" style={{ maxWidth: 560 }}>
          {/* Sans photographe */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
            onClick={() => select("none")}
            className="flex items-center justify-between"
            style={{ ...cardBase, ...(selected === "none" ? cardActive : {}), height: 80, padding: "0 28px" }}>
            <div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,221,208,0.50)" }}>Sans photographe</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.30)", marginTop: 4 }}>Vous gérez vous-même les souvenirs</p>
            </div>
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.35)" }}>—</span>
          </motion.div>

          {/* Reportage */}
          <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
            onClick={() => select("reportage")}
            className="flex flex-col"
            style={{ ...cardBase, ...(selected === "reportage" ? cardActive : {}), minHeight: 200, padding: 28 }}>
            <div className="flex items-start justify-between">
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e" }}>Reportage</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 28, color: "#faf8f4", marginTop: 8 }}>Loïc Cancade</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)", marginTop: 4 }}>Photographe de mariage · ~50 mariages · Note 5/5</p>
              </div>
              <PhotoCircle slot="photographe-alexandre" />
            </div>
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.10)", margin: "20px 0" }} />
            <IncludedItem text="Couverture complète de la journée — préparatifs à la soirée" />
            <IncludedItem text="Entretien préparatoire avec Loïc — visio ou présentiel" />
            <IncludedItem text="Style naturel, poétique, documentaire — jamais de pose forcée" />
            <IncludedItem text="Ain · Rhône · Beaujolais — intervient sur le domaine" />
            <div className="flex items-end justify-between" style={{ marginTop: 20 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.35)", fontStyle: "italic" }}>Disponible pour toutes les dates d'Octobre 2027</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 18, color: "#c9a96e" }}>+ 1 800 €</span>
            </div>
          </motion.div>

          {/* Premium */}
          <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}
            onClick={() => select("premium")}
            className="flex flex-col relative"
            style={{ ...cardBase, ...(selected === "premium" ? cardActive : {}), minHeight: 200, padding: 28 }}>
            <span className="absolute top-3 right-4"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(201,169,110,0.40)", padding: "3px 10px", color: "rgba(201,169,110,0.70)" }}>
              Coup de cœur
            </span>
            <div className="flex items-start justify-between">
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e" }}>Premium</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 28, color: "#faf8f4", marginTop: 8 }}>Loïc Cancade + vidéaste</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)", marginTop: 4 }}>Photo & vidéo · Duo sur-mesure</p>
              </div>
              <div className="flex flex-shrink-0" style={{ marginLeft: 16 }}>
                <PhotoCircle slot="photographe-alexandre" />
                <div style={{ marginLeft: -16 }}>
                  <PhotoCircle slot="videaste-clara" />
                </div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.10)", margin: "20px 0" }} />
            <IncludedItem text="Tout le Reportage, plus :" />
            <IncludedItem text="Vidéaste dédié toute la journée" />
            <IncludedItem text="Film de mariage narratif — livraison selon modalités convenues" />
            <IncludedItem text="Teaser court livré en priorité" />
            <IncludedItem text="Volume et délais précisés lors de l'entretien préparatoire" />
            <div className="flex items-end justify-between" style={{ marginTop: 20 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.35)", fontStyle: "italic" }}>Disponible pour toutes les dates d'Octobre 2027</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 18, color: "#c9a96e" }}>+ 3 200 €</span>
            </div>
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
