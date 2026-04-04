import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ConfigurateurState } from "../pricingTypes";

interface Step02Props {
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

const counterVariant = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.35, duration: 0.8, ease: "easeOut" },
  },
};

const MIN = 20;
const MAX = 200;

const Step02_Invites = ({ state, onUpdate, onNext, onPrev }: Step02Props) => {
  const guests = state.guests;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const setGuests = useCallback(
    (n: number) => onUpdate({ guests: Math.max(MIN, Math.min(MAX, n)) }),
    [onUpdate]
  );

  const startHold = useCallback(
    (delta: number) => {
      setGuests(guests + delta);
      if (intervalRef.current) clearInterval(intervalRef.current);
      let current = guests + delta;
      intervalRef.current = setInterval(() => {
        current = Math.max(MIN, Math.min(MAX, current + delta));
        onUpdate({ guests: current });
      }, 80);
    },
    [guests, onUpdate, setGuests]
  );

  const stopHold = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 640 }}>
        {/* Label */}
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 2 · Les invités
        </motion.p>

        {/* Titre */}
        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
          Combien de<br />présences ?
        </motion.h2>

        {/* Séparateur */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "32px auto" }} />

        {/* Compteur */}
        <motion.div initial="hidden" animate="visible" variants={counterVariant}
          className="flex items-center justify-center gap-8 mt-4 select-none">
          {/* Minus */}
          <button
            onMouseDown={() => startHold(-1)}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
            onTouchStart={() => startHold(-1)}
            onTouchEnd={stopHold}
            className="flex items-center justify-center transition-colors duration-200"
            style={{
              width: 52, height: 52, borderRadius: "50%",
              border: "1px solid rgba(201,169,110,0.30)", background: "transparent",
              color: "rgba(201,169,110,0.70)", fontSize: 24,
              fontFamily: "'Jost', sans-serif", fontWeight: 300, cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c9a96e"; e.currentTarget.style.color = "#c9a96e"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.30)"; e.currentTarget.style.color = "rgba(201,169,110,0.70)"; }}
          >
            −
          </button>

          {/* Number */}
          <div className="flex flex-col items-center">
            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(80px, 12vw, 120px)", color: "#c9a96e", lineHeight: 1,
            }}>
              {guests}
            </span>
            <span style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 14,
              letterSpacing: "0.35em", textTransform: "uppercase",
              color: "rgba(232,221,208,0.55)",
            }}>
              invités
            </span>
          </div>

          {/* Plus */}
          <button
            onMouseDown={() => startHold(1)}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
            onTouchStart={() => startHold(1)}
            onTouchEnd={stopHold}
            className="flex items-center justify-center transition-colors duration-200"
            style={{
              width: 52, height: 52, borderRadius: "50%",
              border: "1px solid rgba(201,169,110,0.30)", background: "transparent",
              color: "rgba(201,169,110,0.70)", fontSize: 24,
              fontFamily: "'Jost', sans-serif", fontWeight: 300, cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c9a96e"; e.currentTarget.style.color = "#c9a96e"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.30)"; e.currentTarget.style.color = "rgba(201,169,110,0.70)"; }}
          >
            +
          </button>
        </motion.div>

        {/* Slider */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
          className="w-full flex flex-col items-center mt-8" style={{ maxWidth: 360 }}>
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full"
            style={{
              accentColor: "#c9a96e",
              height: 2,
            }}
          />
          <div className="flex justify-between w-full mt-2">
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, color: "rgba(232,221,208,0.40)" }}>{MIN}</span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, color: "rgba(232,221,208,0.40)" }}>{MAX}</span>
          </div>
        </motion.div>

        {/* Bloc informatif */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
          className="w-full"
          style={{
            maxWidth: 480, marginTop: 40, padding: "20px 24px", borderRadius: 2,
            background: "rgba(201,169,110,0.06)",
            borderLeft: "2px solid rgba(201,169,110,0.50)",
            borderTop: "1px solid rgba(201,169,110,0.12)",
            borderRight: "1px solid rgba(201,169,110,0.12)",
            borderBottom: "1px solid rgba(201,169,110,0.12)",
          }}>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12,
            letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 10,
          }}>
            Une précision importante
          </p>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14,
            color: "rgba(232,221,208,0.75)", lineHeight: 1.75,
          }}>
            Le nombre d'invités que vous indiquez ici est une estimation. Nous fixerons ensemble une date butoir — environ 6 semaines avant le mariage — pour confirmer le nombre définitif. C'est ce chiffre final qui déterminera le prix exact du repas.
          </p>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13,
            color: "rgba(201,169,110,0.80)", marginTop: 12,
          }}>
            Votre estimation aujourd'hui : aucun engagement sur ce chiffre.
          </p>
        </motion.div>

        {/* Fourchette prix */}
        {state.date && (
          <motion.p custom={6} initial="hidden" animate="visible" variants={fadeUp}
            className="text-center"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.45)", marginTop: 20 }}>
            Pour {guests} invités — fourchette repas : sur devis
          </motion.p>
        )}

        {/* Navigation */}
        <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp}
          className="flex items-center justify-between w-full mt-12" style={{ maxWidth: 480 }}>
          <button
            onClick={onPrev}
            className="transition-colors duration-200"
            style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12,
              letterSpacing: "0.2em", color: "rgba(232,221,208,0.40)",
              background: "transparent", border: "none", cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.70)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.40)"; }}
          >
            ← RETOUR
          </button>

          <motion.button
            onClick={onNext}
            className="transition-colors duration-300"
            style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13,
              letterSpacing: "0.25em", textTransform: "uppercase",
              border: "1px solid #c9a96e", background: "transparent",
              color: "#c9a96e", padding: "18px 56px", borderRadius: 0, cursor: "pointer",
            }}
            whileHover={{ backgroundColor: "#c9a96e", color: "#1a1612" }}
          >
            Continuer
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Step02_Invites;
