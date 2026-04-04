import { motion } from "framer-motion";

interface Step00Props {
  onNext: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
  }),
};

const Step00_Domaine = ({ onNext }: Step00Props) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="flex flex-col items-center text-center max-w-xl">
        {/* Mention haute */}
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontSize: "11px",
            color: "rgba(201,169,110,0.7)",
          }}
        >
          Domaine de la Croix Rochefort — Beaujolais
        </motion.p>

        {/* Titre principal */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(48px, 6vw, 64px)",
            color: "#faf8f4",
            lineHeight: 1.1,
            marginTop: "32px",
          }}
        >
          Votre mariage
          <br />
          prend forme ici.
        </motion.h1>

        {/* Séparateur */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            width: "80px",
            height: "1px",
            background: "#c9a96e",
            margin: "32px auto",
          }}
        />

        {/* Texte poétique */}
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: "16px",
            color: "rgba(232,221,208,0.75)",
            maxWidth: "480px",
            lineHeight: 1.8,
          }}
        >
          Certains lieux ont été faits pour un seul jour. Le vôtre.
        </motion.p>

        {/* Bloc "Ce qui vous attend" */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col items-center gap-3 mt-10"
        >
          {[
            "Le domaine & la date",
            "Le repas, le vin, la cérémonie",
            "La déco, le photographe, le DJ",
          ].map((line) => (
            <span
              key={line}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.85)",
              }}
            >
              — {line}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          onClick={onNext}
          className="mt-12 transition-colors duration-300"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            border: "1px solid #c9a96e",
            background: "transparent",
            color: "#c9a96e",
            padding: "18px 56px",
            borderRadius: 0,
            cursor: "pointer",
          }}
          whileHover={{
            backgroundColor: "#c9a96e",
            color: "#1a1612",
          }}
        >
          Commencer
        </motion.button>

        {/* Mention basse */}
        <motion.p
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "rgba(232,221,208,0.35)",
            marginTop: "32px",
          }}
        >
          10 à 15 minutes · Sans engagement
        </motion.p>
      </div>
    </div>
  );
};

export default Step00_Domaine;
