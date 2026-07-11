import { motion } from "framer-motion";
import { ConfigurateurState } from "../pricingTypes";

interface Step10MPProps {
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
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" },
  }),
};

const moments = [
  {
    title: "Ouverture du bal",
    description:
      "Votre première danse. Morceau choisi avec le DJ, timing orchestré, lumière accordée.",
  },
  {
    title: "Entrée des mariés",
    description:
      "L'instant où vous franchissez le seuil ensemble. Effets, musique, mise en scène — construits avec vous.",
  },
  {
    title: "Discours & témoignages",
    description:
      "Vos témoins ont quelque chose à dire. Micro, timing, séquençage — rien n'est laissé au hasard.",
  },
  {
    title: "Surprise des proches",
    description:
      "Chorégraphie, vidéo, chanson — vos proches peuvent tout préparer. Nous leur donnons la scène.",
  },
  {
    title: "Moments silencieux",
    description:
      "La coupure du gâteau, le lancer de bouquet, les photos de famille — chaque rituel a sa place dans le programme.",
  },
];

const Step10_MomentsPersonnels = ({ onNext, onPrev }: Step10MPProps) => {
  return (
    <div
      className="flex items-start justify-center min-h-screen px-6"
      style={{ paddingTop: 80, paddingBottom: 120 }}
    >
      <div
        className="flex flex-col items-center w-full"
        style={{ maxWidth: 700 }}
      >
        {/* Label */}
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: 11,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.6)",
          }}
        >
          Étape 11 · Vos moments
        </motion.p>

        {/* Titre */}
        <motion.h2
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mt-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(38px, 5vw, 52px)",
            color: "#faf8f4",
            lineHeight: 1.15,
          }}
        >
          Vos moments
        </motion.h2>

        {/* Sous-titre */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: 16,
            color: "rgba(232,221,208,0.70)",
            marginTop: 14,
            maxWidth: 560,
          }}
        >
          Ce qui rendra ce jour unique, c'est vous.
        </motion.p>

        {/* Séparateur */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            width: 60,
            height: 1,
            background: "#c9a96e",
            margin: "28px auto 0",
          }}
        />

        {/* Bloc intro */}
        <motion.p
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: 15,
            color: "rgba(232,221,208,0.65)",
            lineHeight: 1.8,
            maxWidth: 640,
            marginTop: 32,
          }}
        >
          Avant le mariage, vous rencontrerez chacun de nos prestataires —
          traiteur, photographe, DJ, violoniste. Ces rencontres ne sont pas
          des formalités : elles servent à construire les moments qui
          n'appartiennent qu'à vous.
        </motion.p>

        {/* Liste des moments */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="w-full flex flex-col gap-[14px]"
          style={{ maxWidth: 560, marginTop: 48 }}
        >
          {moments.map((m, i) => (
            <div
              key={i}
              style={{
                padding: "28px 32px",
                background: "rgba(26,22,18,0.40)",
                border: "1px solid rgba(201,169,110,0.15)",
                borderRadius: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: 22,
                  color: "#faf8f4",
                  marginBottom: 10,
                  lineHeight: 1.2,
                }}
              >
                {m.title}
              </p>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "rgba(232,221,208,0.60)",
                  lineHeight: 1.7,
                }}
              >
                {m.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bloc de clôture */}
        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            marginTop: 48,
            padding: "28px 32px",
            background: "rgba(201,169,110,0.05)",
            border: "1px solid rgba(201,169,110,0.20)",
            borderRadius: 0,
            maxWidth: 560,
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: "rgba(232,221,208,0.70)",
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            Tout est coordonné par Limen avec chaque prestataire en amont.
            Vous n'avez rien à orchestrer le Jour J — juste à vivre.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          custom={7}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center justify-between w-full mt-14"
          style={{ maxWidth: 560 }}
        >
          <button
            onClick={onPrev}
            className="transition-colors duration-200"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "rgba(232,221,208,0.40)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(232,221,208,0.70)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(232,221,208,0.40)";
            }}
          >
            ← RETOUR
          </button>
          <motion.button
            onClick={onNext}
            className="transition-colors duration-300"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              border: "1px solid #c9a96e",
              background: "transparent",
              color: "#c9a96e",
              padding: "18px 48px",
              borderRadius: 0,
              cursor: "pointer",
            }}
            whileHover={{
              backgroundColor: "#c9a96e",
              color: "#1a1612",
            }}
          >
            Continuer vers le récapitulatif
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Step10_MomentsPersonnels;
