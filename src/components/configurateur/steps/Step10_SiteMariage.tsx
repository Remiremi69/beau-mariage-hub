import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfigurateurState } from "../pricingTypes";

interface Step10Props {
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

const Step10_SiteMariage = ({ state, onUpdate, onNext, onPrev }: Step10Props) => {
  const [withSite, setWithSite] = useState(state.siteMariage);
  const [hover, setHover] = useState(false);

  const handleContinue = () => {
    onUpdate({ siteMariage: withSite });
    onNext();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 100 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 680 }}>

        {/* Label */}
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 10 · Votre présence en ligne
        </motion.p>

        {/* Titre */}
        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
          Votre histoire,<br />partagée avec élégance.
        </motion.h2>

        {/* Intro */}
        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 500, marginBottom: 44 }}>
          Un site de mariage personnalisé est offert dans votre forfait Limen. Vos invités y trouvent tout ce dont ils ont besoin — sans que vous ayez à gérer 50 messages.
        </motion.p>

        {/* Séparateur */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 48px" }} />

        {/* Aperçu visuel */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="w-full flex flex-col items-center">
          <a
            href="https://beau-mariage-template.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full relative overflow-hidden"
            style={{
              maxWidth: 520,
              height: window.innerWidth < 640 ? 180 : 280,
              background: "rgba(40,60,120,0.20)",
              border: "1px solid rgba(201,169,110,0.25)",
              borderRadius: 4,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              src="https://i.postimg.cc/Bn6MwGJf/exemple-site-mariage-capture.webp"
              alt="Exemple de site de mariage personnalisé"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
            />
            <div
              style={{
                position: "absolute", inset: 0,
                background: hover ? "rgba(13,11,8,0.40)" : "transparent",
                transition: "background 0.3s ease",
              }}
            />
            <div style={{
              position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: "0.20em",
              textTransform: "uppercase", border: "1px solid rgba(201,169,110,0.50)",
              padding: "8px 20px", background: "rgba(13,11,8,0.80)", color: "rgba(201,169,110,0.85)",
              whiteSpace: "nowrap",
            }}>
              Voir un exemple →
            </div>
          </a>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11,
            color: "rgba(232,221,208,0.35)", fontStyle: "italic", textAlign: "center", marginTop: 10,
          }}>
            Cliquez pour voir un exemple en ligne
          </p>
        </motion.div>

        {/* Ce qui est inclus */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-col gap-[14px] w-full" style={{ maxWidth: 480, marginTop: 40 }}>
          {[
            "Votre histoire & vos photos de couple",
            "Informations pratiques pour vos invités (horaires, adresse, hébergements)",
            "Gestion des confirmations de présence (RSVP)",
            "Votre liste de mariage intégrée",
          ].map((item, i) => (
            <div key={i} className="flex gap-3" style={{ alignItems: "flex-start" }}>
              <span style={{ color: "#c9a96e", flexShrink: 0, fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13 }}>—</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.70)", lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Le choix — deux cartes */}
        <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] w-full" style={{ maxWidth: 520, marginTop: 44 }}>

          {/* Carte A — Avec site */}
          <button
            onClick={() => setWithSite(true)}
            data-cursor-hover
            className="text-center transition-all duration-300"
            style={{
              padding: "28px 24px", borderRadius: 2, cursor: "pointer",
              background: withSite ? "rgba(201,169,110,0.07)" : "rgba(26,22,18,0.40)",
              border: withSite ? "1px solid rgba(201,169,110,0.60)" : "1px solid rgba(201,169,110,0.15)",
            }}
          >
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 28, color: "#c9a96e" }}>◇</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginTop: 12 }}>Avec site inclus</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.55)", marginTop: 8, lineHeight: 1.6 }}>
              Nous créons et personnalisons votre site ensemble après la signature.
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(232,221,208,0.45)", marginTop: 12 }}>Inclus dans le forfait</p>
          </button>

          {/* Carte B — Sans site */}
          <button
            onClick={() => setWithSite(false)}
            data-cursor-hover
            className="text-center transition-all duration-300"
            style={{
              padding: "28px 24px", borderRadius: 2, cursor: "pointer",
              background: !withSite ? "rgba(201,169,110,0.07)" : "rgba(26,22,18,0.40)",
              border: !withSite ? "1px solid rgba(201,169,110,0.60)" : "1px solid rgba(201,169,110,0.15)",
            }}
          >
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 28, color: "rgba(232,221,208,0.25)" }}>○</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,221,208,0.55)", marginTop: 12 }}>Sans site</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.55)", marginTop: 8, lineHeight: 1.6 }}>
              Vous gérez vous-même votre communication avec vos invités.
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(232,221,208,0.45)", marginTop: 12 }}>—</p>
          </button>
        </motion.div>

        {/* Message contextuel si sans site */}
        <AnimatePresence>
          {!withSite && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12,
                color: "rgba(232,221,208,0.45)", fontStyle: "italic",
                borderLeft: "1px solid rgba(201,169,110,0.30)", paddingLeft: 14, marginTop: 20,
                maxWidth: 480, lineHeight: 1.6,
              }}>
              Vous pourrez toujours nous contacter après la signature si vous changez d'avis.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp}
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
    </div>
  );
};

export default Step10_SiteMariage;
