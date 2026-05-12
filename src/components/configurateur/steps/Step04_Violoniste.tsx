import { motion, AnimatePresence } from "framer-motion";
import { ConfigurateurState } from "../pricingTypes";

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

const Step04_Violoniste = ({ state, onUpdate, onNext, onPrev }: Step04Props) => {
  const withOption = state.violonisteOption;

  const cardBase: React.CSSProperties = {
    minHeight: 260, borderRadius: 2, padding: "32px 28px",
    transition: "all 0.30s ease",
    display: "flex", flexDirection: "column",
  };
  const cardDefault: React.CSSProperties = {
    ...cardBase,
    border: "1px solid rgba(201,169,110,0.15)",
    background: "rgba(26,22,18,0.35)",
    cursor: "pointer",
  };
  const cardSelected: React.CSSProperties = {
    ...cardBase,
    border: "1px solid #c9a96e",
    background: "rgba(201,169,110,0.07)",
    cursor: "pointer",
  };
  const cardLocked: React.CSSProperties = {
    ...cardBase,
    border: "1px solid #c9a96e",
    background: "rgba(201,169,110,0.10)",
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 720 }}>
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 4 · Le violoniste
        </motion.p>

        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
          Une scène vivante,<br />au cœur de votre journée.
        </motion.h2>

        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 500, marginBottom: 36 }}>
          Alexandre Medjaher Chomat — violoniste dansant, +80 mariages en France, Suisse, Dubaï
          et aux États-Unis. Il ne joue pas de la musique : il traverse la salle. Chaque
          performance est une fusion de violon, mouvement et émotion.
        </motion.p>

        <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 40px" }} />

        {/* Visuel */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          className="w-full" style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", marginBottom: 32, border: "1px solid rgba(201,169,110,0.20)" }}>
          <img src="/images/alexandre-performance-soiree.jpg" alt="Alexandre Medjaher Chomat en performance"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(13,11,8,0.75))" }} />
          <p style={{ position: "absolute", left: 24, bottom: 20, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: 20, color: "#e8d5b0", lineHeight: 1.4, maxWidth: "80%" }}>
            « Une performance émotionnelle — un moment suspendu dans le temps. »
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-col md:flex-row gap-4 w-full">
          {/* Carte A — Show de base (obligatoire) */}
          <div style={cardLocked} className="flex-1 relative">
            <span className="absolute top-3 right-4"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(201,169,110,0.40)", padding: "3px 10px", color: "rgba(201,169,110,0.80)" }}>
              Inclus dans la sélection
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 32, color: "#c9a96e" }}>◆</span>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginTop: 16 }}>
              Show vin d'honneur
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: 22, color: "#faf8f4", marginTop: 6 }}>
              3 morceaux signature
            </p>
            <div className="flex flex-col gap-[6px] mt-4">
              {[
                "Performance scénique pendant le vin d'honneur",
                "3 morceaux choisis avec vous (entrée, climax, sortie)",
                "Coordination amont avec le déroulé Limen",
                "Tenue & matériel professionnels",
              ].map((item) => (
                <span key={item} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(201,169,110,0.75)", lineHeight: 1.6 }}>
                  — {item}
                </span>
              ))}
            </div>
          </div>

          {/* Carte B — Option complémentaire */}
          <div
            onClick={() => onUpdate({ violonisteOption: !withOption })}
            className="flex-1 hover:border-[rgba(201,169,110,0.40)] hover:bg-[rgba(201,169,110,0.03)] relative"
            style={withOption ? cardSelected : cardDefault}
          >
            <span className="absolute top-3 right-4"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,221,208,0.40)" }}>
              Option
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 32, color: withOption ? "#c9a96e" : "rgba(232,221,208,0.30)" }}>
              {withOption ? "◇" : "○"}
            </span>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", color: withOption ? "#c9a96e" : "rgba(232,221,208,0.70)", marginTop: 16 }}>
              Interventions étendues
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: 22, color: "#faf8f4", marginTop: 6 }}>
              3 morceaux additionnels
            </p>
            <div className="flex flex-col gap-[6px] mt-4">
              {[
                "1 morceau pendant le dîner — instant suspendu",
                "2 morceaux sur la piste — ouverture & climax",
                "Synchronisation avec Astrévia Events (DJ)",
                "Setlist co-construite avec vous",
              ].map((item) => (
                <span key={item} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: withOption ? "rgba(201,169,110,0.75)" : "rgba(232,221,208,0.50)", lineHeight: 1.6 }}>
                  — {item}
                </span>
              ))}
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 15, color: withOption ? "#c9a96e" : "rgba(232,221,208,0.45)", marginTop: "auto", paddingTop: 20 }}>
              + 450 €
            </p>
          </div>
        </motion.div>

        <AnimatePresence>
          {withOption && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
              className="text-center"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.55)", lineHeight: 1.7, fontStyle: "italic", marginTop: 28 }}
            >
              Alexandre construit la setlist avec vous trois mois avant — pour que chaque morceau tombe au bon moment.
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}
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

export default Step04_Violoniste;
