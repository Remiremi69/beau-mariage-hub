import { useState } from "react";
import { motion } from "framer-motion";
import { ConfigurateurState, Deco } from "../pricingTypes";
import seveImage from "@/assets/deco-seve.png.asset.json";


interface Step08Props {
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
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

type DecoOptionId = "tapers_noires" | "velours" | "photophores_fumes";

interface FormulaCard {
  id: Deco;
  name: string;
  subtitle: string;
  description: string;
  badge?: string;
  image?: string;
  palette: { color: string; label: string }[];
  includes: string[];
}

const formulas: FormulaCard[] = [
  {
    id: "seve",
    name: "SÈVE",
    subtitle: "Végétal, terracotta, lin brut",
    image: seveImage.url,
    description:
      "Compositions de pampa blanc naturel, eucalyptus et gypsophile sur pieds dorés fins. Chemin de table jute, bougies pilier ivoire, photophores verre naturel, rondins de bois brut.",
    palette: [
      { color: "#C4A882", label: "Lin brut" },
      { color: "#C17B5A", label: "Terracotta" },
      { color: "#7A8C6E", label: "Végétal" },
    ],
    includes: [
      "Bougies pilier ivoire H.20cm — 2/table",
      "Chemin de table jute — table impériale",
      "Photophores verre naturel — 2/table",
      "Rondins de bois brut — centre de table",
      "Compositions pampa/eucalyptus sur pieds dorés",
      "Guirlandes sur poutres + plafond lumineux",
    ],
  },

  {
    id: "pierre",
    name: "PIERRE & LUMIÈRE",
    subtitle: "Blanc pur, minimalisme absolu",
    badge: "ÉPURÉ",
    description:
      "Arche habillée de floraux séchés, compositions pampa sur pieds dorés. Aucun chemin de table — juste la lumière des bougies pilier blanc.",
    palette: [
      { color: "#F0EDE6", label: "Blanc ivoire" },
      { color: "#E8E0D0", label: "Damassé" },
      { color: "#C8A96E", label: "Or" },
    ],
    includes: [
      "Bougies pilier blanc H.25cm — 2/table",
      "Arche cérémonie habillée floraux séchés",
      "Compositions pampa/eucalyptus sur pieds dorés",
      "Guirlandes sur poutres + plafond lumineux",
      "Aucun chemin de table — épure totale",
    ],
  },
];

const decoOptions: { id: DecoOptionId; name: string; description: string }[] = [
  {
    id: "tapers_noires",
    name: "BOUGIES TAPERS NOIRES ×60",
    description: "Effet dramatique — remplace les bougies pilier",
  },
  {
    id: "velours",
    name: "CHEMIN DE TABLE VELOURS",
    description: "Sur la table impériale — matière noble et texturée",
  },
  {
    id: "photophores_fumes",
    name: "PHOTOPHORES FUMÉS ×50",
    description: "Remplace verre naturel — ambiance tamisée profonde",
  },
];

const FONT_BODY = "'Jost', sans-serif";
const FONT_DISPLAY = "'Cormorant Garamond', serif";
const LIN = "#F5F0E8";
const OR = "#C8A96E";

const Step08_Deco = ({ state, onUpdate, onNext, onPrev }: Step08Props) => {
  const [decoTouched, setDecoTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selected = decoTouched ? state.deco : null;
  const decoOpts = state.decoOptions ?? [];

  const toggleOption = (id: DecoOptionId) => {
    const next = decoOpts.includes(id)
      ? decoOpts.filter((x) => x !== id)
      : [...decoOpts, id];
    onUpdate({ decoOptions: next });
  };

  const selectFormula = (id: Deco) => {
    setDecoTouched(true);
    setError(null);
    onUpdate({ deco: id });
  };

  const handleContinue = () => {
    if (!decoTouched) {
      setError("Choisissez votre univers décoratif pour continuer.");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    onNext();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-6"
      style={{ background: "#1A1814", paddingTop: 60, paddingBottom: 100 }}
    >
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 980 }}>
        {/* En-tête */}
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 200,
            fontSize: 11,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: `${OR}99`,
          }}
        >
          Étape 8 · L'atmosphère
        </motion.p>

        <motion.h2
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mt-6"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(38px, 5vw, 52px)",
            color: LIN,
            lineHeight: 1.15,
          }}
        >
          L'espace qui vous ressemble.
        </motion.h2>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mt-6"
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 300,
            fontSize: 15,
            color: `${LIN}99`,
            lineHeight: 1.8,
            maxWidth: 560,
          }}
        >
          La décoration n'est pas un décor. C'est la première chose que vos invités ressentent en entrant. Choisissez votre langage visuel.
        </motion.p>

        <motion.span
          custom={2.5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-4"
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 300,
            fontSize: 12,
            letterSpacing: "0.15em",
            color: `${LIN}66`,
          }}
        >
          Voir les réalisations déco →
        </motion.span>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{ width: 60, height: 1, background: OR, margin: "44px auto 44px" }}
        />

        {/* Bloc 2 : Formules */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
        >
          {formulas.map((card) => {
            const isSelected = selected === card.id;
            return (
              <div
                key={card.id}
                onClick={() => selectFormula(card.id)}
                className="flex flex-col overflow-hidden transition-all duration-300"
                style={{
                  borderRadius: 2,
                  cursor: "pointer",
                  border: isSelected
                    ? `1.5px solid ${OR}`
                    : `1px solid ${LIN}1F`,
                  background: isSelected ? `${OR}0F` : `${LIN}0A`,
                }}
              >
                {/* Visuel */}
                <div
                  className="relative flex items-center justify-center overflow-hidden"
                  style={{
                    aspectRatio: "4 / 3",
                    background: "rgba(20,18,14,0.6)",
                    borderBottom: `1px solid ${LIN}14`,
                  }}
                >
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={`Décoration ${card.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontWeight: 200,
                        fontSize: 10,
                        letterSpacing: "0.30em",
                        textTransform: "uppercase",
                        color: `${OR}66`,
                      }}
                    >
                      Visuel à venir
                    </span>
                  )}

                  {card.badge && (
                    <span
                      className="absolute top-3 left-3"
                      style={{
                        fontFamily: FONT_BODY,
                        fontWeight: 400,
                        fontSize: 9,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        background: `${LIN}14`,
                        color: `${LIN}B3`,
                        padding: "3px 9px",
                      }}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>

                {/* Contenu */}
                <div className="flex flex-col flex-1" style={{ padding: "26px 24px 28px" }}>
                  <p
                    style={{
                      fontFamily: FONT_BODY,
                      fontWeight: 400,
                      fontSize: 15,
                      letterSpacing: "0.30em",
                      textTransform: "uppercase",
                      color: LIN,
                      marginBottom: 8,
                    }}
                  >
                    {card.name}
                  </p>
                  <p
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 300,
                      fontStyle: "italic",
                      fontSize: 20,
                      color: `${LIN}CC`,
                      lineHeight: 1.3,
                      marginBottom: 14,
                    }}
                  >
                    {card.subtitle}
                  </p>
                  <p
                    style={{
                      fontFamily: FONT_BODY,
                      fontWeight: 300,
                      fontSize: 13,
                      color: `${LIN}99`,
                      lineHeight: 1.75,
                      marginBottom: 18,
                    }}
                  >
                    {card.description}
                  </p>

                  {/* Chips palette */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    {card.palette.map((p) => (
                      <div key={p.label} className="flex items-center gap-2">
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            background: p.color,
                            border: `1px solid ${LIN}1F`,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: FONT_BODY,
                            fontWeight: 300,
                            fontSize: 11,
                            color: `${LIN}80`,
                            letterSpacing: "0.08em",
                          }}
                        >
                          {p.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Includes */}
                  <div className="flex flex-col gap-[6px] mb-5">
                    {card.includes.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontFamily: FONT_BODY,
                          fontWeight: 300,
                          fontSize: 12.5,
                          color: `${LIN}99`,
                          lineHeight: 1.55,
                        }}
                      >
                        — {item}
                      </span>
                    ))}
                  </div>

                  {/* Badge inclus */}
                  <span
                    className="self-start mt-auto"
                    style={{
                      fontFamily: FONT_BODY,
                      fontWeight: 400,
                      fontSize: 10,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      border: `1px solid ${OR}80`,
                      color: OR,
                      padding: "5px 12px",
                      background: "transparent",
                    }}
                  >
                    Inclus dans le forfait
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Bloc 3 : Options */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="w-full"
          style={{ marginTop: 56 }}
        >
          <p
            className="text-center"
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 400,
              fontSize: 10,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: `${LIN}80`,
              marginBottom: 20,
            }}
          >
            OPTIONS — APPLICABLES AUX DEUX FORMULES
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {decoOptions.map((opt) => {
              const isActive = decoOpts.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className="flex flex-col gap-3 transition-all duration-200"
                  style={{
                    padding: "18px 20px",
                    cursor: "pointer",
                    borderRadius: 2,
                    border: isActive ? `1px solid ${OR}` : `1px solid ${LIN}1F`,
                    background: isActive ? `${OR}14` : `${LIN}0A`,
                  }}
                >
                  <span
                    className="self-start"
                    style={{
                      fontFamily: FONT_BODY,
                      fontWeight: 400,
                      fontSize: 9.5,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      background: `${OR}1F`,
                      color: OR,
                      padding: "3px 9px",
                    }}
                  >
                    ✦ Prestige
                  </span>
                  <p
                    style={{
                      fontFamily: FONT_BODY,
                      fontWeight: 400,
                      fontSize: 12,
                      letterSpacing: "0.20em",
                      textTransform: "uppercase",
                      color: LIN,
                    }}
                  >
                    {opt.name}
                  </p>
                  <p
                    style={{
                      fontFamily: FONT_BODY,
                      fontWeight: 300,
                      fontSize: 12.5,
                      color: `${LIN}99`,
                      lineHeight: 1.55,
                    }}
                  >
                    {opt.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Bloc 4 : Note de service */}
        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="w-full"
          style={{
            marginTop: 44,
            padding: "22px 26px",
            background: `${LIN}08`,
            borderLeft: `2px solid ${OR}`,
            borderRadius: "0 2px 2px 0",
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 300,
              fontSize: 13,
              color: `${LIN}99`,
              lineHeight: 1.75,
              marginBottom: 14,
            }}
          >
            La décoration est installée la veille du mariage par notre équipe. Les deux formules sont incluses dans le forfait. Les options s'appliquent à la formule choisie.
          </p>
          <p
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: 15,
              color: OR,
              lineHeight: 1.6,
              marginBottom: 14,
            }}
          >
            « Même formule = 30 min de retouches. Changement de formule = 2h max. Tout est prévu pour les 5 mariages. »
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 300,
              fontSize: 13,
              color: LIN,
              lineHeight: 1.75,
            }}
          >
            La salle vous est accessible dès 12h si vous souhaitez y intégrer vos éléments personnels — photos, objets de famille, signalétique. Ils s'intègreront à l'univers choisi.
          </p>
        </motion.div>

        {/* Bloc 5 : Kit fixe */}
        <motion.div
          custom={7}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="w-full"
          style={{
            marginTop: 28,
            padding: "32px 32px",
            background: `${LIN}05`,
            borderRadius: 4,
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: LIN,
              marginBottom: 6,
            }}
          >
            Kit fixe Limen — installé une fois
          </p>
          <p
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: 16,
              color: `${LIN}99`,
              marginBottom: 24,
            }}
          >
            Identique pour les 5 mariages
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 400,
                  fontSize: 10.5,
                  letterSpacing: "0.30em",
                  textTransform: "uppercase",
                  color: OR,
                  marginBottom: 12,
                }}
              >
                Compositions
              </p>
              <div className="flex flex-col gap-2">
                {[
                  "Compositions florales séchées ×13 sur pieds dorés H.80-90cm",
                  "Pampa blanc naturel + eucalyptus + gypsophile",
                  "Compositions bar pressoir caveau — grands vases verre",
                  "Arche cérémonie habillée floraux séchés",
                ].map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: FONT_BODY,
                      fontWeight: 300,
                      fontSize: 12.5,
                      color: `${LIN}99`,
                      lineHeight: 1.6,
                    }}
                  >
                    — {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 400,
                  fontSize: 10.5,
                  letterSpacing: "0.30em",
                  textTransform: "uppercase",
                  color: OR,
                  marginBottom: 12,
                }}
              >
                Structure & éclairage
              </p>
              <div className="flex flex-col gap-2">
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontWeight: 300,
                    fontSize: 12.5,
                    color: `${LIN}99`,
                    lineHeight: 1.6,
                  }}
                >
                  — Tapis allée cérémonie lin brut
                </span>
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontWeight: 300,
                    fontSize: 12.5,
                    color: `${LIN}99`,
                    lineHeight: 1.6,
                  }}
                >
                  — Guirlandes sur poutres + plafond lumineux{" "}
                  <span style={{ color: `${LIN}66`, fontSize: 11 }}>
                    (inclus dans le domaine)
                  </span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Erreur */}
        {error && (
          <p
            className="text-center mt-8"
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 300,
              fontSize: 12,
              letterSpacing: "0.10em",
              color: OR,
            }}
          >
            {error}
          </p>
        )}

        {/* Nav */}
        <motion.div
          custom={8}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center justify-between w-full mt-12"
          style={{ maxWidth: 480 }}
        >
          <button
            onClick={onPrev}
            className="transition-colors duration-200"
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 300,
              fontSize: 12,
              letterSpacing: "0.2em",
              color: `${LIN}66`,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            ← RETOUR
          </button>
          <motion.button
            onClick={handleContinue}
            className="transition-colors duration-300"
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 400,
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              border: `1px solid ${OR}`,
              background: "transparent",
              color: OR,
              padding: "18px 56px",
              borderRadius: 0,
              cursor: "pointer",
            }}
            whileHover={{ backgroundColor: OR, color: "#1A1814" }}
          >
            Continuer
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Step08_Deco;
