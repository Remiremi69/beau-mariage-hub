import { useMemo } from "react";
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

type PrepKey = "lieuGite" | "photographePrep" | "maquilleuse" | "coiffeuse";

type StatutStyle = "available" | "en-cours";

interface PreparationOption {
  id: PrepKey;
  numero: string;
  titre: string;
  tagline: string;
  description: string;
  badgeStatut: string;
  badgeStatutStyle: StatutStyle;
  mentionPrix: string;
  mentionSpeciale?: string;
}

const preparationOptions: PreparationOption[] = [
  {
    id: "lieuGite",
    numero: "OPTION 1",
    titre: "L'espace du gîte",
    tagline: "Deux salons, la lumière du matin, le silence.",
    description:
      "Le gîte du domaine vous est réservé pour la matinée. Deux espaces séparés et préparés : un pour la mariée et son cortège, un pour le marié et le sien. Lumière douce, miroirs, prises électriques pour les fers, fauteuils, café & viennoiseries posés. Vous arrivez à 11h30, tout est prêt.",
    badgeStatut: "DISPONIBLE",
    badgeStatutStyle: "available",
    mentionPrix: "Inclus dans votre forfait domaine",
  },
  {
    id: "photographePrep",
    numero: "OPTION 2",
    titre: "Le photographe du matin",
    tagline: "Loïc capture ce qui se passe avant que tout commence.",
    description:
      "Loïc Cancade rejoint la mariée pendant qu'elle se prépare. Il photographie les gestes, les regards complices avec les témoins, le rituel discret de l'habillage. Il passe ensuite vers le marié pour la même séquence. Aucune pose dirigée — il documente le moment. Le résultat : la séquence la plus intime de votre album.",
    badgeStatut: "DISPONIBLE",
    badgeStatutStyle: "available",
    mentionPrix: "Inclus dans votre formule photographe",
  },
  {
    id: "maquilleuse",
    numero: "OPTION 3",
    titre: "La maquilleuse",
    tagline: "Vous, en plus lumineuse — sans qu'on voie l'effort.",
    description:
      "Une maquilleuse professionnelle se déplace au gîte. Essais préalables possibles à votre domicile selon distance. Maquillage tenue longue durée pensé pour les photos comme pour la fin de soirée. Sur demande, peut également préparer les témoins et les mères.",
    badgeStatut: "SÉLECTION EN COURS",
    badgeStatutStyle: "en-cours",
    mentionPrix: "Prix précisé au récapitulatif",
    mentionSpeciale:
      "Nous finalisons notre partenariat — vous serez recontacté·e avec notre choix.",
  },
  {
    id: "coiffeuse",
    numero: "OPTION 4",
    titre: "La coiffeuse",
    tagline: "Le geste qui pose la silhouette du jour.",
    description:
      "Une coiffeuse spécialisée mariage rejoint le gîte. Essais préalables coordonnés. Coiffure tenue, pensée pour la lumière des photos et le rythme de la soirée. Voile, accessoires, ajustements en temps réel. Possibilité d'inclure les témoins et les mères selon votre souhait.",
    badgeStatut: "SÉLECTION EN COURS",
    badgeStatutStyle: "en-cours",
    mentionPrix: "Prix précisé au récapitulatif",
    mentionSpeciale:
      "Nous finalisons notre partenariat — vous serez recontacté·e avec notre choix.",
  },
];

const Step03_Preparation = ({ state, onUpdate, onNext, onPrev }: Step03Props) => {
  const prep = state.preparation;

  const horaires = state.ceremonieLaique
    ? `${WEDDING_SCHEDULE.preparationStart} — ${WEDDING_SCHEDULE.ceremonyStart} · juste avant la cérémonie`
    : `${WEDDING_SCHEDULE.preparationStartNoCeremony} — ${WEDDING_SCHEDULE.vinHonneurStartNoCeremony} · le matin du jour J`;

  const horairesShort = state.ceremonieLaique
    ? `${WEDDING_SCHEDULE.preparationStart} — ${WEDDING_SCHEDULE.ceremonyStart}`
    : `${WEDDING_SCHEDULE.preparationStartNoCeremony} — ${WEDDING_SCHEDULE.vinHonneurStartNoCeremony}`;

  const toggle = (id: PrepKey) =>
    onUpdate({ preparation: { ...prep, [id]: !prep[id] } });

  const selected = useMemo(
    () => preparationOptions.filter((o) => prep[o.id]),
    [prep]
  );
  const anySelected = selected.length > 0;

  return (
    <div
      className="flex items-start justify-center min-h-screen px-6"
      style={{ paddingTop: 80, paddingBottom: 120 }}
    >
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 900 }}>
        {/* Eyebrow */}
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
          Votre matin,<br />avant que tout commence.
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
          }}
        >
          4 heures rien qu'à vous, au gîte du domaine.
        </motion.p>

        {/* Badge horaire */}
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
          ⌛ {horaires}
        </motion.div>

        {/* Séparateur */}
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

        {/* Bloc narratif */}
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
          Le matin du jour J ne ressemble à aucun autre. C'est l'heure où deux
          personnes se préparent à devenir mariés. Nous avons gardé le gîte rien
          que pour vous — deux espaces séparés, le silence qu'il faut, le temps
          de respirer avant que tout commence.
        </motion.p>

        <motion.p
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: 18,
            color: "#c9a96e",
            marginTop: 20,
          }}
        >
          Composez votre matin.
        </motion.p>

        {/* Eyebrow section à la carte */}
        <motion.p
          custom={7}
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
          À la carte
        </motion.p>
        <motion.p
          custom={8}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: 24,
            color: "#faf8f4",
            marginTop: 8,
          }}
        >
          Cochez ce qui vous fait envie
        </motion.p>
        <motion.p
          custom={9}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontStyle: "italic",
            fontSize: 12,
            color: "rgba(232,221,208,0.50)",
            marginTop: 6,
          }}
        >
          Aucune option n'est obligatoire. Le matin vous appartient.
        </motion.p>

        {/* Grid cartes */}
        <motion.div
          custom={10}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 w-full"
          style={{ gap: 16, marginTop: 40 }}
        >
          {preparationOptions.map((opt) => {
            const isSelected = prep[opt.id];
            const isAvailable = opt.badgeStatutStyle === "available";

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.id)}
                className="text-left transition-all duration-200"
                style={{
                  background: isSelected
                    ? "rgba(201,169,110,0.06)"
                    : isAvailable
                    ? "rgba(26,22,18,0.40)"
                    : "rgba(26,22,18,0.30)",
                  border: `1px solid ${
                    isSelected
                      ? "#c9a96e"
                      : isAvailable
                      ? "rgba(201,169,110,0.15)"
                      : "rgba(201,169,110,0.10)"
                  }`,
                  borderRadius: 2,
                  padding: "28px 28px 24px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.40)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = isAvailable
                      ? "rgba(201,169,110,0.15)"
                      : "rgba(201,169,110,0.10)";
                  }
                }}
              >
                {/* Badge statut */}
                <span
                  style={{
                    alignSelf: "flex-start",
                    background: isAvailable
                      ? "rgba(201,169,110,0.10)"
                      : "transparent",
                    border: `1px solid ${
                      isAvailable
                        ? "rgba(201,169,110,0.30)"
                        : "rgba(201,169,110,0.25)"
                    }`,
                    color: isAvailable ? "#c9a96e" : "rgba(201,169,110,0.6)",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: 2,
                  }}
                >
                  {opt.badgeStatut}
                </span>

                {/* Numéro option */}
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.5)",
                    marginTop: 22,
                  }}
                >
                  ─── {opt.numero} ───
                </p>

                {/* Titre */}
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: 24,
                    color: "#faf8f4",
                    marginTop: 10,
                    lineHeight: 1.2,
                  }}
                >
                  {opt.titre}
                </h3>

                {/* Tagline */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "rgba(201,169,110,0.70)",
                    marginTop: 10,
                    lineHeight: 1.5,
                  }}
                >
                  « {opt.tagline} »
                </p>

                {/* Mini séparateur */}
                <div
                  style={{
                    width: 30,
                    height: 1,
                    background: "rgba(201,169,110,0.30)",
                    margin: "16px 0",
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 13,
                    color: "rgba(232,221,208,0.60)",
                    lineHeight: 1.7,
                  }}
                >
                  {opt.description}
                </p>

                {/* CTA */}
                <div style={{ marginTop: 22 }}>
                  <span
                    style={{
                      display: "inline-block",
                      border: `1px solid ${
                        isSelected ? "#c9a96e" : "rgba(201,169,110,0.30)"
                      }`,
                      padding: "10px 18px",
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: isSelected
                        ? "#c9a96e"
                        : isAvailable
                        ? "rgba(201,169,110,0.60)"
                        : "rgba(201,169,110,0.50)",
                      background: isSelected
                        ? "rgba(201,169,110,0.08)"
                        : "transparent",
                      borderRadius: 2,
                    }}
                  >
                    {isSelected
                      ? isAvailable
                        ? "✓ Ajouté à ma matinée"
                        : "✓ Intérêt noté"
                      : isAvailable
                      ? "○ Ajouter à ma matinée"
                      : "○ Me prévenir quand disponible"}
                  </span>
                </div>

                {/* Mention spéciale */}
                {opt.mentionSpeciale && (
                  <p
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontStyle: "italic",
                      fontSize: 10,
                      color: "rgba(232,221,208,0.40)",
                      marginTop: 10,
                      lineHeight: 1.5,
                    }}
                  >
                    {opt.mentionSpeciale}
                  </p>
                )}

                {/* Mention prix */}
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontStyle: "italic",
                    fontSize: 12,
                    color: "rgba(232,221,208,0.45)",
                    marginTop: 14,
                  }}
                >
                  {opt.mentionPrix}
                </p>
              </button>
            );
          })}
        </motion.div>

        {/* Récap dynamique */}
        <AnimatePresence>
          {anySelected && (
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
                ────  Votre matin  ────
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
                  {selected.map((s) => (
                    <li
                      key={s.id}
                      className="flex justify-between items-baseline"
                      style={{ gap: 16 }}
                    >
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontStyle: "italic",
                          fontSize: 16,
                          color: "#faf8f4",
                        }}
                      >
                        ✓ {s.titre}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontStyle: "italic",
                          fontSize: 11,
                          color: "rgba(201,169,110,0.60)",
                          textAlign: "right",
                        }}
                      >
                        {s.badgeStatutStyle === "available"
                          ? "Inclus"
                          : "À confirmer"}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    width: "100%",
                    height: 1,
                    background: "rgba(201,169,110,0.20)",
                    margin: "24px 0 18px",
                  }}
                />
                <p
                  className="text-center"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 12,
                    color: "rgba(201,169,110,0.70)",
                    letterSpacing: "0.05em",
                  }}
                >
                  ⌛ {horairesShort}
                </p>
                <p
                  className="text-center"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "rgba(232,221,208,0.55)",
                    marginTop: 6,
                  }}
                >
                  Votre matinée au gîte du domaine
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bloc "rien pour l'instant" */}
        <AnimatePresence>
          {!anySelected && (
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
                Vous préférez gérer votre matinée vous-même.<br />
                Tout à fait possible — le domaine vous accueillera à partir de
                13h30, prêt pour l'arrivée des invités.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
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
            onClick={onNext}
            className="transition-colors duration-300"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              border: `1px solid ${anySelected ? "#c9a96e" : "rgba(201,169,110,0.6)"}`,
              background: "transparent",
              color: anySelected ? "#c9a96e" : "rgba(201,169,110,0.6)",
              padding: "16px 36px",
              borderRadius: 0,
              cursor: "pointer",
            }}
            whileHover={{ backgroundColor: "#c9a96e", color: "#1a1612" }}
          >
            {anySelected ? "Mon matin est prêt — Continuer" : "Continuer"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Step03_Preparation;
