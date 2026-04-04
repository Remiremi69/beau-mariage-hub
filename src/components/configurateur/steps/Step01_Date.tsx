import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ConfigurateurState } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerDomaine } from "../drawerContents";

interface Step01Props {
  state: ConfigurateurState;
  onUpdate: (partial: Partial<ConfigurateurState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
  }),
};

const dates = [
  { id: "2027-10-04", jour: "Lundi", date: "4 Octobre 2027" },
  { id: "2027-10-05", jour: "Mardi", date: "5 Octobre 2027" },
  { id: "2027-10-06", jour: "Mercredi", date: "6 Octobre 2027" },
  { id: "2027-10-07", jour: "Jeudi", date: "7 Octobre 2027" },
  { id: "2027-10-08", jour: "Vendredi", date: "8 Octobre 2027" },
];

const Step01_Date = ({ state, onUpdate, onNext }: Step01Props) => {
  const selected = state.date;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSelect = (id: string) => {
    onUpdate({ date: id });
  };

  const handleContinue = () => {
    if (selected) onNext();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 680 }}>
        {/* Label */}
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 1 · Le jour
        </motion.p>

        {/* Titre */}
        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15, marginBottom: 12 }}>
          Quel jour<br />vous appartient ?
        </motion.h2>

        {/* Sous-titre */}
        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.7, maxWidth: 440 }}>
          Cinq dates sont disponibles pour la série Octobre 2027 au Domaine de la Croix Rochefort.
        </motion.p>

        <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp}>
          <InfoButton label="En savoir plus sur le domaine" onClick={() => setDrawerOpen(true)} />
        </motion.div>

        {/* Séparateur */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "36px auto" }} />

        {/* Grille de dates */}
        <div className="flex flex-col items-center gap-[10px] w-full" style={{ maxWidth: 480 }}>
          {dates.map((d, i) => {
            const isSelected = selected === d.id;
            return (
              <motion.button
                key={d.id}
                custom={4 + i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                onClick={() => handleSelect(d.id)}
                className="w-full flex items-center justify-between transition-all duration-[250ms]"
                style={{
                  height: 72,
                  padding: "0 28px",
                  borderRadius: 2,
                  border: isSelected ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.20)",
                  background: isSelected ? "rgba(201,169,110,0.08)" : "rgba(26,22,18,0.40)",
                  cursor: "pointer",
                }}
                whileHover={!isSelected ? { borderColor: "rgba(201,169,110,0.45)", background: "rgba(201,169,110,0.04)" } : {}}
              >
                <div className="flex flex-col items-start">
                  <span style={{
                    fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 15,
                    color: isSelected ? "#c9a96e" : "#faf8f4",
                    transition: "color 0.25s ease",
                  }}>
                    {d.jour}
                  </span>
                  <span style={{
                    fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13,
                    color: "rgba(232,221,208,0.55)",
                  }}>
                    {d.date}
                  </span>
                </div>

                {isSelected ? (
                  <Check size={16} color="#c9a96e" />
                ) : (
                  <span style={{
                    fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11,
                    letterSpacing: "0.15em", color: "rgba(201,169,110,0.70)",
                    border: "1px solid rgba(201,169,110,0.35)", padding: "4px 12px",
                  }}>
                    Disponible
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Note poétique */}
        <motion.p custom={9} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.40)", letterSpacing: "0.1em", marginTop: 28 }}>
          Toutes les dates sont au même tarif — seul votre ressenti compte.
        </motion.p>

        {/* CTA */}
        <motion.button
          custom={10}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          onClick={handleContinue}
          disabled={!selected}
          className="mt-12 transition-colors duration-300"
          style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13,
            letterSpacing: "0.25em", textTransform: "uppercase",
            border: "1px solid #c9a96e", background: "transparent",
            color: "#c9a96e", padding: "18px 56px", borderRadius: 0,
            cursor: selected ? "pointer" : "not-allowed",
            opacity: selected ? 1 : 0.35,
          }}
          whileHover={selected ? { backgroundColor: "#c9a96e", color: "#1a1612" } : {}}
        >
          Date choisie — Continuer
        </motion.button>
      </div>
    </div>
  );
};

export default Step01_Date;
