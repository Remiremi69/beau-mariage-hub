import { useEffect } from "react";
import { motion } from "framer-motion";
import { Music2, Mic2 } from "lucide-react";
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

const MATERIEL_PILLS = [
  "Portique 8 m",
  "8 lyres Beam",
  "4 éblouisseurs",
  "4 projecteurs LED",
  "2 geysers CO₂",
  "Machine à brouillard",
  "2 écrans 85''",
  "Mapping vidéo personnalisé",
  "Système HK Audio",
  "Micro HF",
];

const Step07_DJ = ({ state, onUpdate, onNext, onPrev }: Step07Props) => {
  const dj = state.dj;
  const sonoForcee = state.ceremonieLaique;
  const barVinylesBloque = sonoForcee || dj.sonoVH;

  // Sync auto : cérémonie laïque → sonoVH forcé true
  useEffect(() => {
    if (sonoForcee && !dj.sonoVH) {
      onUpdate({ dj: { ...dj, sonoVH: true } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sonoForcee]);

  // Désactive bar à vinyles si non cumulable
  useEffect(() => {
    if (barVinylesBloque && dj.barVinyles) {
      onUpdate({ dj: { ...dj, barVinyles: false } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barVinylesBloque]);

  const toggleSono = () => {
    if (sonoForcee) return;
    onUpdate({ dj: { ...dj, sonoVH: !dj.sonoVH } });
  };
  const togglePrestige = () => {
    onUpdate({ dj: { ...dj, effetPrestige: !dj.effetPrestige } });
  };
  const toggleBarVinyles = () => {
    if (barVinylesBloque) return;
    onUpdate({ dj: { ...dj, barVinyles: !dj.barVinyles } });
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

  const barVinylesMessage = sonoForcee
    ? "Inclus dans votre cérémonie laïque — la sonorisation du vin d'honneur est déjà prévue."
    : dj.sonoVH
      ? "Non cumulable avec l'ambiance cocktail."
      : null;

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
          {/* ─── Bloc 1 — Ambiance cocktail ─── */}
          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
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
                    Ambiance cocktail
                  </p>
                  {sonoForcee
                    ? <Badge label="Obligatoire" variant="amber" />
                    : <Badge label="Optionnel" variant="lin" />}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: 20, color: COLORS.lin, marginTop: 12, lineHeight: 1.4 }}>
                  La fête commence avant la fête.
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.65)", lineHeight: 1.7, marginTop: 10 }}>
                  Une ambiance sonore soignée pendant votre vin d'honneur — intérieur et extérieur — avec une set list construite avec vous en amont et un micro HF disponible. Cérémonie laïque incluse si elle a lieu sur le domaine.
                </p>
              </div>
              <Toggle on={dj.sonoVH || sonoForcee} disabled={sonoForcee} onClick={toggleSono} />
            </div>
          </motion.div>

          {/* ─── Bloc 2 — Bar à vinyles ─── */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
            onClick={toggleBarVinyles}
            style={{
              ...(dj.barVinyles ? cardActive : cardBase),
              cursor: barVinylesBloque ? "not-allowed" : "pointer",
              opacity: barVinylesBloque ? 0.35 : 1,
            }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0" style={{
                width: 44, height: 44, borderRadius: 2, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(201,169,110,0.10)", border: "1px solid rgba(201,169,110,0.25)",
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 22, color: COLORS.or, lineHeight: 1 }}>♪</span>
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.20em", textTransform: "uppercase", color: "#faf8f4" }}>
                    Bar à vinyles
                  </p>
                  <div className="flex items-center gap-3">
                    <Badge label="Optionnel" variant="lin" />
                    <Toggle on={dj.barVinyles} disabled={barVinylesBloque} onClick={toggleBarVinyles} />
                  </div>
                </div>
                {barVinylesMessage && (
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontStyle: "italic", fontSize: 12, color: "rgba(232,221,208,0.50)", marginTop: 8 }}>
                    {barVinylesMessage}
                  </p>
                )}
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: 20, color: COLORS.lin, marginTop: 12, lineHeight: 1.4 }}>
                  Pendant le vin d'honneur — le son du sillon, rien d'autre.
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.65)", lineHeight: 1.7, marginTop: 10 }}>
                  Une régie vinyle installée dans l'espace cocktail. Les DJs sélectionnent les titres, vos invités posent l'aiguille et choisissent parmi une large sélection de 33 tours — du jazz feutré aux soul sessions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── Bloc 3 — Votre soirée musicale (inclus) ─── */}
          <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
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
                  Astrévia Events · 19h30 → 4h du matin
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.60)", lineHeight: 1.7, marginTop: 10 }}>
                  Astrévia Events lit la salle et fait évoluer la soirée —
                  de l'ambiance feutrée du dîner aux dernières danses,
                  sans que vous ayez à orchestrer quoi que ce soit.
                </p>
                <div className="flex flex-wrap" style={{ gap: 6, marginTop: 16 }}>
                  {MATERIEL_PILLS.map((pill) => (
                    <span key={pill} style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 300,
                      fontSize: 10,
                      color: "rgba(245,240,232,0.40)",
                      border: "1px solid rgba(245,240,232,0.12)",
                      padding: "3px 8px",
                      borderRadius: 20,
                    }}>
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Bloc 4 — Prestige ─── */}
          <motion.div
            custom={6}
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
                    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.or, marginBottom: 4 }}>
                      VOTRE ENTRÉE
                    </p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(245,240,232,0.75)", lineHeight: 1.7 }}>
                      Étincelles froides au moment où vous franchissez le seuil.
                    </p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.or, marginBottom: 4 }}>
                      L'OUVERTURE DU BAL
                    </p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(245,240,232,0.75)", lineHeight: 1.7 }}>
                      Étincelles froides et fumée lourde pour votre première danse.
                    </p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.or, marginBottom: 4 }}>
                      LE DESSERT
                    </p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(245,240,232,0.75)", lineHeight: 1.7 }}>
                      Étincelles et lumière à l'arrivée de la pièce montée.
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
