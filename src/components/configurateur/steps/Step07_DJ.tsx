import { useEffect } from "react";
import { motion } from "framer-motion";
import { Music2, Mic2, Sparkles } from "lucide-react";
import { ConfigurateurState } from "../pricingTypes";

interface Step07Props {
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

const COLORS = {
  nuit: "#1A1814",
  lin: "#F5F0E8",
  or: "#C8A96E",
};

const Badge = ({
  label,
  variant = "lin",
}: { label: string; variant?: "lin" | "or" | "amber" }) => {
  const styles: Record<string, React.CSSProperties> = {
    lin: {
      border: "1px solid rgba(245,240,232,0.30)",
      color: "rgba(245,240,232,0.70)",
      background: "transparent",
    },
    or: {
      border: "1px solid #c9a96e",
      color: "#c9a96e",
      background: "rgba(201,169,110,0.10)",
    },
    amber: {
      border: "1px solid rgba(232,213,176,0.65)",
      color: "#1a1612",
      background: "rgba(232,213,176,0.85)",
    },
  };
  return (
    <span
      style={{
        ...styles[variant],
        fontFamily: "'Jost', sans-serif",
        fontWeight: 400,
        fontSize: 10,
        letterSpacing: "0.20em",
        textTransform: "uppercase",
        padding: "3px 10px",
      }}
    >
      {label}
    </span>
  );
};

const Toggle = ({
  on, disabled = false, onClick,
}: { on: boolean; disabled?: boolean; onClick: () => void }) => (
  <button
    onClick={disabled ? undefined : onClick}
    aria-pressed={on}
    disabled={disabled}
    style={{
      width: 48, height: 26, borderRadius: 999, position: "relative",
      background: on ? "#c9a96e" : "rgba(245,240,232,0.18)",
      border: "1px solid rgba(245,240,232,0.20)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.25s ease",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        position: "absolute", top: 2, left: on ? 24 : 2,
        width: 20, height: 20, borderRadius: "50%",
        background: on ? "#1a1612" : "rgba(245,240,232,0.85)",
        transition: "all 0.25s ease",
      }}
    />
  </button>
);

const Step07_DJ = ({ state, onUpdate, onNext, onPrev }: Step07Props) => {
  const dj = state.dj;
  const sonoForcee = state.ceremonieLaique;

  // Sync auto : cérémonie laïque → sonoVH forcé true
  useEffect(() => {
    if (sonoForcee && !dj.sonoVH) {
      onUpdate({ dj: { ...dj, sonoVH: true } });
    } else if (!sonoForcee && dj.sonoVH && (dj as { _ceremonieSync?: boolean })._ceremonieSync) {
      // n/a — l'utilisateur garde le contrôle
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sonoForcee]);

  const toggleSono = () => {
    if (sonoForcee) return;
    onUpdate({ dj: { ...dj, sonoVH: !dj.sonoVH } });
  };
  const togglePrestige = () => {
    onUpdate({ dj: { ...dj, effetPrestige: !dj.effetPrestige } });
  };

  const cardBase: React.CSSProperties = {
    borderRadius: 2,
    padding: "26px 28px",
    transition: "all 0.25s ease",
    background: "rgba(26,22,18,0.50)",
    border: "1px solid rgba(201,169,110,0.18)",
  };
  const cardActive: React.CSSProperties = {
    background: "rgba(201,169,110,0.07)",
    border: "1px solid #c9a96e",
  };
  const cardLocked: React.CSSProperties = {
    background: "rgba(232,213,176,0.06)",
    border: "1px solid rgba(232,213,176,0.40)",
    opacity: 0.95,
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 720 }}>
        {/* Eyebrow */}
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 8 · La musique
        </motion.p>

        {/* Titre */}
        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
          Votre soirée.
        </motion.h2>

        {/* Subtitle */}
        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 480, marginBottom: 36 }}>
          Tout est déjà prêt.<br />Vous choisissez l'atmosphère.
        </motion.p>

        <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: COLORS.or, margin: "0 auto 36px" }} />

        <div className="flex flex-col gap-4 w-full" style={{ maxWidth: 600 }}>
          {/* ─── Bloc 1 — Forfait inclus (non interactif) ─── */}
          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
            style={{ ...cardBase, border: "1px solid rgba(201,169,110,0.30)" }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0" style={{
                width: 44, height: 44, borderRadius: 2, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(201,169,110,0.10)", border: "1px solid rgba(201,169,110,0.30)",
              }}>
                <Music2 size={20} color={COLORS.or} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.20em", textTransform: "uppercase", color: "#faf8f4" }}>
                    Votre soirée musicale
                  </p>
                  <Badge label="Inclus" variant="or" />
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: 22, color: COLORS.or, marginTop: 8 }}>
                  2 DJ · 19h30 → 4h du matin
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.60)", lineHeight: 1.7, marginTop: 10 }}>
                  Son professionnel HK Audio · Éclairage d'ambiance salle.
                  Lecture de salle et adaptation en temps réel.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── Bloc 2 — Sonorisation cocktail ─── */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
            onClick={toggleSono}
            title={sonoForcee ? "Activé car vous avez choisi la cérémonie laïque" : undefined}
            style={{
              ...(sonoForcee ? cardLocked : (dj.sonoVH ? cardActive : cardBase)),
              cursor: sonoForcee ? "not-allowed" : "pointer",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0" style={{
                width: 44, height: 44, borderRadius: 2, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(201,169,110,0.10)", border: "1px solid rgba(201,169,110,0.25)",
              }}>
                <Mic2 size={20} color={COLORS.or} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.20em", textTransform: "uppercase", color: "#faf8f4" }}>
                    {sonoForcee ? "Ambiance cérémonie & cocktail" : "Ambiance cocktail"}
                  </p>
                  {sonoForcee
                    ? <Badge label="Obligatoire" variant="amber" />
                    : <Badge label="Optionnel" variant="lin" />}
                </div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.65)", lineHeight: 1.7, marginTop: 10 }}>
                  {sonoForcee
                    ? "La sonorisation de votre cérémonie et de votre cocktail est incluse."
                    : "Une ambiance musicale pendant votre vin d'honneur."}
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)", fontStyle: "italic", marginTop: 6 }}>
                  {sonoForcee
                    ? "Inclus avec votre cérémonie laïque."
                    : "Micro HF · Set list définie avec vous en amont."}
                </p>
              </div>
              <Toggle on={dj.sonoVH || sonoForcee} disabled={sonoForcee} onClick={toggleSono} />
            </div>
          </motion.div>

          {/* ─── Bloc 3 — Effet Prestige ─── */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            onClick={togglePrestige}
            style={{
              ...(dj.effetPrestige
                ? {
                    borderRadius: 2,
                    padding: "26px 28px",
                    transition: "all 0.25s ease",
                    background: "rgba(201,169,110,0.07)",
                    border: "1px solid #c9a96e",
                    cursor: "pointer",
                  }
                : cardBase),
              cursor: "pointer",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(201,169,110,0.10)",
                  border: "1px solid rgba(201,169,110,0.25)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: 26,
                    color: COLORS.or,
                    lineHeight: 1,
                  }}
                >
                  ✦
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 400,
                      fontSize: 13,
                      letterSpacing: "0.20em",
                      textTransform: "uppercase",
                      color: "#faf8f4",
                    }}
                  >
                    Prestige
                  </p>
                  <div className="flex items-center gap-3">
                    <Badge label="Prestige" variant="or" />
                    <Toggle on={dj.effetPrestige} onClick={togglePrestige} />
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: 22,
                    color: COLORS.lin,
                    marginTop: 14,
                    lineHeight: 1.4,
                  }}
                >
                  Certains moments méritent d'être vus depuis la salle.
                </p>
                <div className="flex flex-col gap-6 mt-6">
                  <div>
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 400,
                        fontSize: 11,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: COLORS.or,
                        marginBottom: 4,
                      }}
                    >
                      VOTRE ENTRÉE
                    </p>
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 300,
                        fontSize: 13,
                        color: "rgba(245,240,232,0.75)",
                        lineHeight: 1.7,
                      }}
                    >
                      Des gerbes d'étincelles dorées jaillissent de chaque côté
                      lorsque vous franchissez le seuil.
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 400,
                        fontSize: 11,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: COLORS.or,
                        marginBottom: 4,
                      }}
                    >
                      L'OUVERTURE DU BAL
                    </p>
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 300,
                        fontSize: 13,
                        color: "rgba(245,240,232,0.75)",
                        lineHeight: 1.7,
                      }}
                    >
                      Une brume légère effleure le sol pendant que vous dansez —
                      le reste de la salle disparaît.
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 400,
                        fontSize: 11,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: COLORS.or,
                        marginBottom: 4,
                      }}
                    >
                      LE DESSERT
                    </p>
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 300,
                        fontSize: 13,
                        color: "rgba(245,240,232,0.75)",
                        lineHeight: 1.7,
                      }}
                    >
                      Votre pièce montée arrive dans un halo d'étincelles et de
                      lumière.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp}
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

export default Step07_DJ;
