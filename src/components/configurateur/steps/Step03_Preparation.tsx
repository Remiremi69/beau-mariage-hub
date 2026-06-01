import { motion, AnimatePresence } from "framer-motion";
import { ConfigurateurState } from "../pricingTypes";
import { WEDDING_SCHEDULE } from "@/lib/wedding-schedule";

interface Step03Props {
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

const PreparationPackCard = ({
  selected,
  onSelect,
  hasCeremony,
}: {
  selected: boolean;
  onSelect: () => void;
  hasCeremony: boolean;
}) => {
  const horaireDebut = hasCeremony ? "11h30" : "12h00";
  const horaireFin = hasCeremony ? "15h30" : "16h00";

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ y: -2 }}
      style={{
        maxWidth: 720,
        width: "100%",
        margin: "0 auto",
        padding: "48px 40px",
        background: selected ? "rgba(201,169,110,0.06)" : "rgba(26,22,18,0.40)",
        border: `1px solid ${selected ? "#c9a96e" : "rgba(201,169,110,0.15)"}`,
        borderRadius: 2,
        cursor: "pointer",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <span
          style={{
            display: "inline-block",
            padding: "4px 14px",
            background: "rgba(201,169,110,0.10)",
            border: "1px solid rgba(201,169,110,0.30)",
            color: "#c9a96e",
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            borderRadius: 2,
          }}
        >
          Prestige
        </span>
      </div>

      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: 30,
          color: "#faf8f4",
          textAlign: "center",
          marginBottom: 16,
          lineHeight: 1.2,
        }}
      >
        La matinée des mariés
      </h3>

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: 16,
          color: "rgba(201,169,110,0.75)",
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        « Un lieu, deux espaces, deux mains expertes. »
      </p>

      <div
        style={{
          width: 60,
          height: 1,
          background: "rgba(201,169,110,0.30)",
          margin: "0 auto 28px",
        }}
      />

      <div
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 13,
          color: "rgba(232,221,208,0.65)",
          lineHeight: 1.8,
          marginBottom: 32,
        }}
      >
        <p style={{ marginBottom: 16 }}>
          Le gîte du domaine vous est entièrement réservé pendant quatre heures.
          Deux salons préparés et séparés : un pour la mariée et son cortège,
          un pour le marié et le sien. Café et viennoiseries posés à votre
          arrivée à {horaireDebut}.
        </p>
        <p>
          Une maquilleuse professionnelle vient à vous. Une coiffeuse
          spécialisée mariage rejoint le gîte.
        </p>
      </div>

      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.60)",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Ce qui est inclus
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 auto 32px",
          maxWidth: 480,
        }}
      >
        {[
          `Le gîte privatisé · ${horaireDebut} à ${horaireFin}`,
          "La maquilleuse · maquillage tenue longue durée",
          "La coiffeuse · spécialisée mariage",
        ].map((item, i) => (
          <li
            key={i}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15,
              color: "rgba(232,221,208,0.85)",
              padding: "8px 0",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "#c9a96e", fontSize: 13 }}>✓</span>
            {item}
          </li>
        ))}
      </ul>

      <div
        style={{
          padding: "20px 24px",
          background: "rgba(201,169,110,0.04)",
          border: "1px solid rgba(201,169,110,0.15)",
          borderRadius: 2,
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.60)",
            marginBottom: 10,
          }}
        >
          À noter
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: 14,
            color: "rgba(232,221,208,0.70)",
            lineHeight: 1.7,
          }}
        >
          Choisir cette option active la formule photographe « Signature » qui
          inclut la couverture de votre préparation par Loïc Cancade.
        </p>
      </div>

      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "18px 48px",
            background: selected ? "#c9a96e" : "transparent",
            border: `1px solid ${selected ? "#c9a96e" : "rgba(201,169,110,0.40)"}`,
            color: selected ? "#1a1612" : "#c9a96e",
            fontFamily: "'Jost', sans-serif",
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            borderRadius: 2,
            transition: "all 0.3s ease",
          }}
        >
          {selected ? "✓ AJOUTÉ À MON MARIAGE" : "○ AJOUTER À MON MARIAGE"}
        </div>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 11,
            fontStyle: "italic",
            color: "rgba(232,221,208,0.40)",
            marginTop: 12,
          }}
        >
          Prix précisé au récapitulatif
        </p>
      </div>
    </motion.div>
  );
};

const Step03_Preparation = ({ state, onUpdate, onNext, onPrev }: Step03Props) => {
  const preparation = state.preparation === true;
  const hasCeremony = state.ceremonieLaique;

  const horairesShort = hasCeremony
    ? `${WEDDING_SCHEDULE.preparationStart} — ${WEDDING_SCHEDULE.ceremonyStart}`
    : `${WEDDING_SCHEDULE.preparationStartNoCeremony} — ${WEDDING_SCHEDULE.vinHonneurStartNoCeremony}`;

  const horairesLong = hasCeremony
    ? `${WEDDING_SCHEDULE.preparationStart} — ${WEDDING_SCHEDULE.ceremonyStart} · de midi à la cérémonie`
    : `${WEDDING_SCHEDULE.preparationStartNoCeremony} — ${WEDDING_SCHEDULE.vinHonneurStartNoCeremony} · le matin du jour J`;

  const select = () => onUpdate({ preparation: true });
  const decline = () => onUpdate({ preparation: false });

  const handleContinue = () => {
    if (preparation) {
      onUpdate({ photographe: "signature" });
    }
    onNext();
  };

  return (
    <div
      className="flex items-start justify-center min-h-screen px-6"
      style={{ paddingTop: 80, paddingBottom: 120 }}
    >
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 900 }}>
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.6)",
          }}
        >
          Étape · Préparation des mariés
        </motion.p>

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
          Votre journée<br />commence ici.
        </motion.h2>

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
          Quatre heures rien qu'à vous, au gîte du domaine.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            marginTop: 22,
            padding: "8px 16px",
            border: "1px solid rgba(201,169,110,0.20)",
            borderRadius: 2,
            fontFamily: "'Jost', sans-serif",
            fontSize: 12,
            color: "rgba(201,169,110,0.6)",
            letterSpacing: "0.05em",
          }}
        >
          ⌛ {horairesLong}
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            width: 60,
            height: 1,
            background: "#c9a96e",
            margin: "32px auto 0",
          }}
        />

        <motion.p
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: 17,
            color: "rgba(232,221,208,0.75)",
            lineHeight: 1.8,
            maxWidth: 640,
            marginTop: 32,
          }}
        >
          Le jour du mariage ne ressemble à aucun autre. C'est l'heure où deux
          personnes se préparent à devenir mariés. Nous avons gardé le gîte
          rien que pour vous — deux espaces séparés, le silence qu'il faut,
          le temps de respirer avant que tout commence.
        </motion.p>

        <motion.p
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.50)",
            marginTop: 56,
          }}
        >
          Le pack préparation
        </motion.p>
        <motion.p
          custom={7}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: 24,
            color: "#faf8f4",
            marginTop: 8,
          }}
        >
          Tout ce dont vous avez besoin, déjà prêt.
        </motion.p>

        <motion.div
          custom={8}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="w-full"
          style={{ marginTop: 40 }}
        >
          <PreparationPackCard
            selected={preparation}
            onSelect={select}
            hasCeremony={hasCeremony}
          />

          <div style={{ marginTop: 32, textAlign: "center" }}>
            <button
              type="button"
              onClick={decline}
              style={{
                display: "inline-block",
                padding: "12px 32px",
                background:
                  state.preparation === false
                    ? "rgba(232,221,208,0.05)"
                    : "transparent",
                border: `1px solid ${
                  state.preparation === false
                    ? "rgba(232,221,208,0.35)"
                    : "rgba(232,221,208,0.15)"
                }`,
                color:
                  state.preparation === false
                    ? "rgba(232,221,208,0.80)"
                    : "rgba(232,221,208,0.40)",
                fontFamily: "'Jost', sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderRadius: 2,
              }}
            >
              Je préfère gérer ma préparation moi-même
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {preparation && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
              style={{ marginTop: 56 }}
            >
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.55)",
                }}
              >
                ────  Votre préparation  ────
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: 22,
                  color: "#faf8f4",
                  marginTop: 12,
                }}
              >
                Ce que vous avez choisi
              </p>

              <div
                style={{
                  marginTop: 24,
                  width: "100%",
                  maxWidth: 540,
                  padding: "32px 36px",
                  background: "rgba(201,169,110,0.05)",
                  border: "1px solid rgba(201,169,110,0.20)",
                  borderRadius: 2,
                }}
              >
                <ul className="flex flex-col" style={{ gap: 14 }}>
                  <li
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 16,
                      color: "#faf8f4",
                    }}
                  >
                    ✓ Le pack Préparation des mariés
                  </li>
                  <li
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 14,
                      color: "rgba(232,221,208,0.65)",
                      paddingLeft: 18,
                    }}
                  >
                    {horairesShort} · votre matinée au gîte du domaine
                  </li>
                  <li
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 16,
                      color: "#faf8f4",
                      marginTop: 6,
                    }}
                  >
                    ✓ Photographe « Signature » activé
                  </li>
                  <li
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 14,
                      color: "rgba(232,221,208,0.65)",
                      paddingLeft: 18,
                    }}
                  >
                    Couverture de la préparation par Loïc Cancade
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state.preparation === false && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center"
              style={{ marginTop: 56, maxWidth: 500 }}
            >
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  color: "rgba(201,169,110,0.4)",
                  letterSpacing: "0.3em",
                }}
              >
                ────  ❀  ────
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: 15,
                  color: "rgba(232,221,208,0.50)",
                  lineHeight: 1.8,
                  marginTop: 18,
                }}
              >
                Vous préférez gérer votre préparation vous-même.<br />
                Tout à fait possible — le domaine vous accueillera à partir de
                13h30, prêt pour l'arrivée des invités.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="flex items-center justify-between w-full mt-16"
          style={{ maxWidth: 600 }}
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
            onClick={handleContinue}
            className="transition-colors duration-300"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              border: `1px solid ${preparation ? "#c9a96e" : "rgba(201,169,110,0.6)"}`,
              background: "transparent",
              color: preparation ? "#c9a96e" : "rgba(201,169,110,0.6)",
              padding: "16px 36px",
              borderRadius: 0,
              cursor: "pointer",
            }}
            whileHover={{ backgroundColor: "#c9a96e", color: "#1a1612" }}
          >
            {preparation ? "Ma préparation est prête — Continuer" : "Continuer"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Step03_Preparation;
