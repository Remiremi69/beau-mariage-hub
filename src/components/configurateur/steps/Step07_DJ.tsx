import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { ConfigurateurState, DJ } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerDJ } from "../drawerContents";

interface Step07Props {
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

const ambiancePeriodes = [
  { label: "VIN D'HONNEUR", tags: ["Jazz", "Bossa Nova", "Soul", "Acoustique"] },
  { label: "DÎNER", tags: ["Variété française", "Jazz contemporain", "Électro-swing", "Lounge"] },
  { label: "SOIRÉE", tags: ["Pop", "R&B", "House", "80s-90s", "Funk"] },
];

const Step07_DJ = ({ state, onUpdate, onNext, onPrev }: Step07Props) => {
  const selected = state.dj;
  const [musicTags, setMusicTags] = useState<string[]>(state.ambianceMusique || []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const select = (v: DJ) => onUpdate({ dj: v });

  const toggleTag = (tag: string) => {
    setMusicTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleContinue = () => {
    onUpdate({ ambianceMusique: musicTags });
    onNext();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 700 }}>
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 7 · La nuit
        </motion.p>

        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
          La fête commence<br />quand vous voulez.
        </motion.h2>

        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 480, marginBottom: 44 }}>
          Du jazz pendant le dîner à l'électro à 2h du matin. Notre DJ lit la salle et adapte chaque set à l'énergie unique de votre soirée.
        </motion.p>

        <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp}>
          <InfoButton label="Découvrir l'univers de Marcus" onClick={() => setDrawerOpen(true)} />
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 48px" }} />

        <div className="flex flex-col gap-4 w-full" style={{ maxWidth: 560 }}>
          {/* Sans DJ */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}>
            <div onClick={() => select("none")}
              className="flex items-center justify-between"
              style={{ ...cardBase, ...(selected === "none" ? cardActive : {}), height: 80, padding: "0 28px" }}>
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,221,208,0.50)" }}>Sans DJ</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.30)", marginTop: 4 }}>Playlist personnelle sur sono fournie</p>
              </div>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.35)" }}>—</span>
            </div>
            <AnimatePresence>
              {selected === "none" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)", fontStyle: "italic", borderLeft: "1px solid rgba(201,169,110,0.30)", paddingLeft: 14, marginTop: 12, lineHeight: 1.7 }}>
                  La sono du domaine est incluse dans tous les cas. Vous pouvez connecter votre propre playlist.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Standard */}
          <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
            onClick={() => select("standard")}
            className="flex flex-col"
            style={{ ...cardBase, ...(selected === "standard" ? cardActive : {}), minHeight: 200, padding: 28 }}>
            <div className="flex items-start justify-between">
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e" }}>Standard</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 28, color: "#faf8f4", marginTop: 8 }}>Marcus D.</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)", marginTop: 4 }}>DJ mariage & événements · 12 ans</p>
              </div>
              <div data-photo-slot="dj-marcus" className="flex items-center justify-center flex-shrink-0"
                style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.25)" }}>
                <User size={24} color="rgba(201,169,110,0.30)" />
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.10)", margin: "20px 0" }} />
            <IncludedItem text="Présence de 19h à 2h du matin (7h)" />
            <IncludedItem text="Sono professionnelle haut de gamme" />
            <IncludedItem text="Jeu de lumières scénique inclus" />
            <IncludedItem text="Consultation musicale 1 mois avant" />
            <IncludedItem text="Lecture de salle & adaptation en temps réel" />
            <div className="flex items-end justify-between" style={{ marginTop: 20 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.35)", fontStyle: "italic" }}>Disponible pour toutes les dates d'Octobre 2027</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 18, color: "#c9a96e" }}>+ 1 200 €</span>
            </div>
          </motion.div>

          {/* Premium */}
          <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}
            onClick={() => select("premium")}
            className="flex flex-col relative"
            style={{ ...cardBase, ...(selected === "premium" ? cardActive : {}), minHeight: 200, padding: 28 }}>
            <span className="absolute top-3 right-4"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(201,169,110,0.40)", padding: "3px 10px", color: "rgba(201,169,110,0.70)" }}>
              Expérience totale
            </span>
            <div className="flex items-start justify-between">
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e" }}>Premium</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 28, color: "#faf8f4", marginTop: 8 }}>Marcus D.</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)", marginTop: 4 }}>DJ · Sono live · Animation</p>
              </div>
              <div data-photo-slot="dj-marcus" className="flex items-center justify-center flex-shrink-0"
                style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.25)" }}>
                <User size={24} color="rgba(201,169,110,0.30)" />
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.10)", margin: "20px 0" }} />
            <IncludedItem text="Tout le Standard, plus :" />
            <IncludedItem text="Présence de 18h à 4h du matin (10h)" />
            <IncludedItem text="Sono premium Funktion-One" />
            <IncludedItem text="Système d'éclairage architectural" />
            <IncludedItem text="Soirée ouverte avec option karaoké" />
            <IncludedItem text="Coordination avec le photographe en temps réel" />
            <div className="flex items-end justify-between" style={{ marginTop: 20 }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.35)", fontStyle: "italic" }}>Disponible pour toutes les dates d'Octobre 2027</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 18, color: "#c9a96e" }}>+ 2 100 €</span>
            </div>
          </motion.div>
        </div>

        {/* Ambiance musicale */}
        <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp}
          className="w-full" style={{ maxWidth: 560, marginTop: 44 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.30em", textTransform: "uppercase", color: "rgba(201,169,110,0.60)", marginBottom: 20 }}>
            Personnalisez l'ambiance
          </p>
          {ambiancePeriodes.map((periode) => (
            <div key={periode.label} className="flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ padding: "14px 0", borderBottom: "1px solid rgba(201,169,110,0.08)" }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,221,208,0.55)", width: 160, flexShrink: 0 }}>
                {periode.label}
              </span>
              <div className="flex flex-wrap gap-2 flex-1">
                {periode.tags.map((tag) => {
                  const isActive = musicTags.includes(tag);
                  return (
                    <button key={tag} onClick={() => toggleTag(tag)}
                      className="transition-all duration-200"
                      style={{
                        fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: "0.12em",
                        padding: "6px 14px", borderRadius: 1, cursor: "pointer", background: isActive ? "rgba(201,169,110,0.08)" : "transparent",
                        border: isActive ? "1px solid rgba(201,169,110,0.70)" : "1px solid rgba(201,169,110,0.20)",
                        color: isActive ? "rgba(201,169,110,0.90)" : "rgba(232,221,208,0.45)",
                      }}>
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p custom={8} initial="hidden" animate="visible" variants={fadeUp} className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.35)", fontStyle: "italic", marginTop: 24 }}>
          Marcus connaît le domaine. Il a déjà fait danser des salles entières jusqu'au lever du soleil à Croix Rochefort.
        </motion.p>

        <motion.div custom={9} initial="hidden" animate="visible" variants={fadeUp}
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
            Continuer
          </motion.button>
        </motion.div>
      </div>

      <PresentationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={drawerDJ} />
    </div>
  );
};

export default Step07_DJ;
