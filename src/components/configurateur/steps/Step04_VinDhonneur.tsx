import { useState } from "react";
import { motion } from "framer-motion";
import { ConfigurateurState, VinDhonneur } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerVin } from "../drawerContents";

interface Step04Props {
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

const formules: { id: VinDhonneur; num: string; nom: string; desc: string; prix: string; perPerson: number; badge?: string }[] = [
  { id: "decouverte", num: "01", nom: "DÉCOUVERTE", desc: "Vins beaujolais, jus artisanaux,\nmignardises maison", prix: "Inclus", perPerson: 0 },
  { id: "prestige", num: "02", nom: "PRESTIGE", desc: "Champagne, vins sélectionnés,\nplanches de charcuterie & fromages", prix: "+ 18 € / pers.", perPerson: 18, badge: "POPULAIRE" },
  { id: "grand-cru", num: "03", nom: "GRAND CRU", desc: "Champagne grand cru, vins d'exception,\nbuffet gastronomique en plein air", prix: "+ 38 € / pers.", perPerson: 38 },
];

const Step04_VinDhonneur = ({ state, onUpdate, onNext, onPrev }: Step04Props) => {
  const selected = state.vinDhonneur;
  const guests = state.guests;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedFormule = formules.find((f) => f.id === selected);
  const liveTotal = selectedFormule && selectedFormule.perPerson > 0
    ? `+ ${(guests * selectedFormule.perPerson).toLocaleString("fr-FR")} €`
    : "Inclus";

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 720 }}>
        {/* Label */}
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 4 · Le vin d'honneur
        </motion.p>

        {/* Titre */}
        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
          Le premier verre<br />ensemble.
        </motion.h2>

        {/* Intro */}
        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 480, marginBottom: 44 }}>
          Le vin d'honneur donne le ton de la soirée. Cocktail, bulles, mignardises — tout est soigné, tout vient du territoire.
        </motion.p>

        {/* Séparateur */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 48px" }} />

        {/* Formules */}
        <div className="flex flex-col items-center gap-[14px] w-full" style={{ maxWidth: 520 }}>
          {formules.map((f, i) => {
            const isSelected = selected === f.id;
            return (
              <motion.button
                key={f.id}
                custom={4 + i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                onClick={() => onUpdate({ vinDhonneur: f.id })}
                className="w-full flex items-center justify-between relative transition-all duration-[250ms]"
                style={{
                  padding: "24px 28px", borderRadius: 2, cursor: "pointer",
                  border: isSelected ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.15)",
                  background: isSelected ? "rgba(201,169,110,0.07)" : "rgba(26,22,18,0.35)",
                }}
                whileHover={!isSelected ? { borderColor: "rgba(201,169,110,0.40)", background: "rgba(201,169,110,0.03)" } : {}}
              >
                {/* Badge */}
                {f.badge && (
                  <span className="absolute top-3 right-4"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(201,169,110,0.40)", padding: "3px 10px", color: "rgba(201,169,110,0.70)" }}>
                    {f.badge}
                  </span>
                )}

                {/* Left */}
                <div className="flex items-center gap-6 text-left">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 36, color: "rgba(201,169,110,0.25)", minWidth: 44 }}>
                    {f.num}
                  </span>
                  <div>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", color: isSelected ? "#c9a96e" : "rgba(232,221,208,0.80)", transition: "color 0.25s" }}>
                      {f.nom}
                    </p>
                    <p className="whitespace-pre-line" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.50)", marginTop: 6, lineHeight: 1.6 }}>
                      {f.desc}
                    </p>
                  </div>
                </div>

                {/* Right — prix */}
                <span style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: f.perPerson > 0 ? 500 : 400,
                  fontSize: 15,
                  color: f.perPerson > 0 ? "#c9a96e" : "rgba(232,221,208,0.70)",
                  whiteSpace: "nowrap", marginLeft: 16,
                }}>
                  {f.prix}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Calcul live */}
        <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp}
          className="w-full hidden md:flex items-center justify-between"
          style={{ maxWidth: 520, marginTop: 36, paddingTop: 24, borderTop: "1px solid rgba(201,169,110,0.15)" }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.45)" }}>
            Vin d'honneur · {guests} invités
          </span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 14, color: "rgba(232,221,208,0.75)" }}>
            {liveTotal}
          </span>
        </motion.div>

        {/* Note terroir */}
        <motion.p custom={8} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.35)", fontStyle: "italic", marginTop: 20 }}>
          Tous nos vins sont issus de domaines beaujolais sélectionnés à moins de 15 km du domaine.
        </motion.p>

        {/* Navigation */}
        <motion.div custom={9} initial="hidden" animate="visible" variants={fadeUp}
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

export default Step04_VinDhonneur;
