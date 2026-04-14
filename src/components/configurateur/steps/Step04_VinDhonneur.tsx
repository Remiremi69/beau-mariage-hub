import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfigurateurState } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerVin } from "../drawerContents";

interface Step04Props {
  state: ConfigurateurState;
  onUpdate: (partial: Partial<ConfigurateurState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

type TagColor = "or" | "vert" | "blanc";
type VHFiltre = "terroir" | "signature" | null;

interface VHFormule {
  id: string;
  name: string;
  tag: string;
  tagColor: TagColor;
  accroche: string;
  description: string;
  duree: string;
  inclus: string[];
  imagePlaceholder: string;
}

const vhFormules: VHFormule[] = [
  {
    id: "vh-beaujolais-vivant",
    name: "Beaujolais Vivant",
    tag: "Terroir",
    tagColor: "or",
    accroche:
      "Crémant de Bourgogne, escargots en persillade, " +
      "plancha volaille de Bresse. " +
      "Le Beaujolais comme premier mot.",
    description:
      "Crémant de Bourgogne à l'arrivée — pas de champagne " +
      "importé, pas de compromis. Un verre qui dit " +
      "immédiatement où vous êtes.\n\n" +
      "Sept pièces lyonnaises et beaujolaises : escargots " +
      "en persillade, crêpe vonnassienne à la truite fumée, " +
      "cervelles de canut sur pain croustillant, foie gras " +
      "en panna cotta, brochette de canard à la mangue, " +
      "pruneaux au lard fumé.\n\n" +
      "Une plancha de volaille à la crème de Bresse — " +
      "ouverte, visible, le genre de cuisine qu'on entend " +
      "avant de la voir.\n\n" +
      "Ce n'est pas un cocktail amuse-bouche. " +
      "C'est une déclaration de lieu.",
    duree: "1h30",
    inclus: [
      "Crémant de Bourgogne à l'arrivée",
      "Escargots en persillade",
      "Crêpe vonnassienne à la truite fumée",
      "Cervelles de canut sur pain croustillant",
      "Foie gras en panna cotta",
      "Brochette de canard à la mangue",
      "Pruneaux au lard fumé",
      "Plancha : Volaille à la crème de Bresse",
    ],
    imagePlaceholder: "PHOTO À VENIR",
  },
  {
    id: "vh-seuil-signature",
    name: "Le Seuil Signature",
    tag: "Signature",
    tagColor: "or",
    accroche:
      "Bélini, saint-jacques snackée, foie gras " +
      "et fondue d'oignons. Deux planchas. " +
      "Le vin d'honneur le plus long.",
    description:
      "Bélini d'ouverture — crème de pêche blanche, " +
      "prosecco. Doux, précis, une entrée en matière.\n\n" +
      "Sept pièces pensées pour ce qu'elles font dans " +
      "la bouche : saumon tataki sauce soja, poulpes " +
      "marinés, avocat crevette pamplemousse, foie gras, " +
      "roulade d'aubergine, chouquette au comté, " +
      "cannelé chorizo-parmesan.\n\n" +
      "Deux planchas en simultané : saint-jacques snackée, " +
      "foie gras et fondue d'oignons. Le genre d'animation " +
      "qui crée une conversation sans qu'on ait eu besoin " +
      "de la provoquer.",
    duree: "2h",
    inclus: [
      "Bélini (crème de pêche blanche, prosecco)",
      "Saumon tataki sauce soja",
      "Poulpes marinés",
      "Avocat crevette pamplemousse",
      "Foie gras",
      "Roulade d'aubergine",
      "Chouquette au comté",
      "Cannelé chorizo-parmesan",
      "Plancha double : Saint-Jacques + Foie gras fondue d'oignons",
    ],
    imagePlaceholder: "PHOTO À VENIR",
  },
];

const FILTRE_TO_FORMULE: Record<NonNullable<VHFiltre>, string> = {
  terroir: "vh-beaujolais-vivant",
  signature: "vh-seuil-signature",
};

const tagStyles: Record<TagColor, React.CSSProperties> = {
  or: { border: "1px solid rgba(201,169,110,0.50)", color: "rgba(201,169,110,0.85)", background: "rgba(201,169,110,0.08)" },
  vert: { border: "1px solid rgba(80,140,80,0.50)", color: "rgba(120,180,100,0.85)", background: "rgba(80,140,80,0.08)" },
  blanc: { border: "1px solid rgba(232,221,208,0.30)", color: "rgba(232,221,208,0.65)", background: "transparent" },
};

const PlaceholderIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="rgba(201,169,110,0.20)" strokeWidth="1.5">
    <rect x="2" y="2" width="28" height="28" rx="1" />
    <line x1="2" y1="2" x2="30" y2="30" />
  </svg>
);

const VHFormuleCard = ({
  formule,
  isSelected,
  isRecommended,
  onSelect,
}: {
  formule: VHFormule;
  isSelected: boolean;
  isRecommended: boolean;
  onSelect: () => void;
}) => (
  <div
    onClick={onSelect}
    className="flex flex-col overflow-hidden transition-all duration-[250ms]"
    style={{
      borderRadius: 2,
      border: isSelected ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.15)",
      background: isSelected ? "rgba(201,169,110,0.06)" : "rgba(26,22,18,0.40)",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      if (!isSelected) {
        e.currentTarget.style.border = "1px solid rgba(201,169,110,0.40)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }
    }}
    onMouseLeave={(e) => {
      if (!isSelected) {
        e.currentTarget.style.border = "1px solid rgba(201,169,110,0.15)";
        e.currentTarget.style.transform = "translateY(0)";
      }
    }}
  >
    {/* Photo zone */}
    <div
      data-photo-slot={formule.id}
      className="relative flex flex-col items-center justify-center"
      style={{
        height: 180,
        background: isSelected ? "rgba(201,169,110,0.10)" : "rgba(201,169,110,0.06)",
        borderBottom: "1px solid rgba(201,169,110,0.10)",
        transition: "background 0.25s",
      }}
    >
      <PlaceholderIcon />
      <span
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: 11,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.25)",
          marginTop: 8,
        }}
      >
        {formule.imagePlaceholder}
      </span>

      {/* Recommandé badge */}
      {isRecommended && (
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: "0.20em",
            padding: "4px 14px",
            background: "rgba(201,169,110,0.85)",
            color: "#1a1612",
          }}
        >
          RECOMMANDÉ POUR VOUS
        </span>
      )}

      {/* Tag */}
      <span
        className="absolute top-3 right-3"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: 10,
          letterSpacing: "0.15em",
          padding: "4px 10px",
          borderRadius: 1,
          ...tagStyles[formule.tagColor],
        }}
      >
        {formule.tag}
      </span>

      {/* Durée badge */}
      <span
        className="absolute top-3 left-3"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: 10,
          letterSpacing: "0.15em",
          padding: "3px 10px",
          border: "1px solid rgba(201,169,110,0.35)",
          color: "rgba(201,169,110,0.70)",
          background: "transparent",
          borderRadius: 1,
        }}
      >
        {formule.duree}
      </span>
    </div>

    {/* Text zone */}
    <div className="flex flex-col flex-1 relative" style={{ padding: "24px 22px 28px" }}>
      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 400,
          fontSize: 12,
          letterSpacing: "0.30em",
          textTransform: "uppercase",
          color: "rgba(232,221,208,0.80)",
          marginBottom: 8,
        }}
      >
        {formule.name}
      </p>

      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: 13,
          fontStyle: "italic",
          color: "rgba(232,221,208,0.65)",
          lineHeight: 1.6,
          marginBottom: 16,
        }}
      >
        {formule.accroche}
      </p>

      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: 13,
          color: "rgba(232,221,208,0.60)",
          lineHeight: 1.75,
          whiteSpace: "pre-line",
          marginBottom: 16,
        }}
      >
        {formule.description}
      </p>

      {/* Separator */}
      <div style={{ height: 0.5, background: "rgba(201,169,110,0.15)", marginBottom: 14 }} />

      {/* Inclus list */}
      <div className="flex flex-col" style={{ gap: 6 }}>
        {formule.inclus.map((item, i) => (
          <div key={i} className="flex items-start" style={{ gap: 10 }}>
            <span style={{ color: "#c9a96e", fontFamily: "'Jost', sans-serif", fontSize: 12, lineHeight: 1.6 }}>—</span>
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 12,
                color: "rgba(232,221,208,0.50)",
                lineHeight: 1.6,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Mention basse */}
      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: 11,
          fontStyle: "italic",
          color: "rgba(232,221,208,0.30)",
          marginTop: 16,
        }}
      >
        Inclus dans votre forfait Limen
      </p>

      {/* Selected dot */}
      {isSelected && (
        <div
          className="absolute bottom-4 right-4"
          style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a96e" }}
        />
      )}
    </div>
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" } }),
};

const Step04_VinDhonneur = ({ state, onUpdate, onNext, onPrev }: Step04Props) => {
  const [selectedFormule, setSelectedFormule] = useState<string | null>(state.vhBouchee);
  const [filtre, setFiltre] = useState<VHFiltre>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selected = vhFormules.find((f) => f.id === selectedFormule) ?? null;
  const recommendedId = filtre ? FILTRE_TO_FORMULE[filtre] : null;

  const handleFiltre = (f: NonNullable<VHFiltre>) => {
    setFiltre(f);
    setSelectedFormule(FILTRE_TO_FORMULE[f]);
  };

  const handleContinue = () => {
    onUpdate({
      vhBouchee: selectedFormule,
      vhAnimation: null,
      vhMignardise: null,
    });
    onNext();
  };

  return (
    <div
      className="flex flex-col items-center w-full px-6"
      style={{ maxWidth: 740, margin: "0 auto", paddingTop: 60, paddingBottom: 120 }}
    >
      {/* Header */}
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
        Étape 4 · Le vin d'honneur
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
        Le premier verre
        <br />
        ensemble.
      </motion.h2>

      <motion.p
        custom={2}
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
          maxWidth: 520,
          marginBottom: 16,
        }}
      >
        1h30 dans les jardins du domaine.
        <br />
        Deux directions — une déclaration.
      </motion.p>

      <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp} className="mb-2">
        <InfoButton label="Rencontrer notre sommelier" onClick={() => setDrawerOpen(true)} />
      </motion.div>

      <motion.p
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-center"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: 12,
          color: "rgba(201,169,110,0.60)",
          letterSpacing: "0.15em",
        }}
      >
        UNE FORMULE · TOUT INCLUS · SANS COMPROMIS
      </motion.p>

      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{ width: 60, height: 1, background: "#c9a96e", margin: "36px auto 40px" }}
      />

      {/* Filtre question */}
      <motion.div
        custom={4.5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full flex flex-col items-center"
        style={{ maxWidth: 520, marginBottom: 40 }}
      >
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.55)",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          VOTRE VIN D'HONNEUR, C'EST PLUTÔT…
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2" style={{ gap: 12 }}>
          {/* Bouton A — Terroir */}
          <button
            onClick={() => handleFiltre("terroir")}
            className="text-left transition-all duration-[250ms]"
            style={{
              padding: "20px 24px",
              border: filtre === "terroir" ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.20)",
              background: filtre === "terroir" ? "rgba(201,169,110,0.08)" : "rgba(26,22,18,0.40)",
              borderRadius: 2,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (filtre !== "terroir") {
                e.currentTarget.style.border = "1px solid rgba(201,169,110,0.40)";
                e.currentTarget.style.background = "rgba(201,169,110,0.03)";
              }
            }}
            onMouseLeave={(e) => {
              if (filtre !== "terroir") {
                e.currentTarget.style.border = "1px solid rgba(201,169,110,0.20)";
                e.currentTarget.style.background = "rgba(26,22,18,0.40)";
              }
            }}
          >
            <div className="flex items-baseline">
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: 28,
                  color: "rgba(201,169,110,0.30)",
                  marginRight: 12,
                }}
              >
                A
              </span>
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                  fontSize: 12,
                  letterSpacing: "0.20em",
                  textTransform: "uppercase",
                  color: "rgba(232,221,208,0.80)",
                }}
              >
                TERROIR VIVANT
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: "rgba(232,221,208,0.50)",
                marginTop: 6,
                lineHeight: 1.6,
              }}
            >
              Pièces locales, plancha volaille, crémant de Bourgogne
            </p>
          </button>

          {/* Bouton B — Signature */}
          <button
            onClick={() => handleFiltre("signature")}
            className="text-left transition-all duration-[250ms]"
            style={{
              padding: "20px 24px",
              border: filtre === "signature" ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.20)",
              background: filtre === "signature" ? "rgba(201,169,110,0.08)" : "rgba(26,22,18,0.40)",
              borderRadius: 2,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (filtre !== "signature") {
                e.currentTarget.style.border = "1px solid rgba(201,169,110,0.40)";
                e.currentTarget.style.background = "rgba(201,169,110,0.03)";
              }
            }}
            onMouseLeave={(e) => {
              if (filtre !== "signature") {
                e.currentTarget.style.border = "1px solid rgba(201,169,110,0.20)";
                e.currentTarget.style.background = "rgba(26,22,18,0.40)";
              }
            }}
          >
            <div className="flex items-baseline">
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: 28,
                  color: "rgba(201,169,110,0.30)",
                  marginRight: 12,
                }}
              >
                B
              </span>
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                  fontSize: 12,
                  letterSpacing: "0.20em",
                  textTransform: "uppercase",
                  color: "rgba(232,221,208,0.80)",
                }}
              >
                SIGNATURE
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: "rgba(232,221,208,0.50)",
                marginTop: 6,
                lineHeight: 1.6,
              }}
            >
              Pièces premium, plancha Saint-Jacques + foie gras
            </p>
          </button>
        </div>
      </motion.div>

      {/* Formules */}
      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
        style={{ maxWidth: 740 }}
      >
        {vhFormules.map((formule) => (
          <VHFormuleCard
            key={formule.id}
            formule={formule}
            isSelected={selectedFormule === formule.id}
            isRecommended={recommendedId === formule.id}
            onSelect={() => setSelectedFormule(formule.id)}
          />
        ))}
      </motion.div>

      {/* Récap */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5 }}
            className="w-full mt-10"
            style={{
              maxWidth: 520,
              margin: "40px auto 0",
              padding: "28px 32px",
              background: "rgba(201,169,110,0.05)",
              border: "1px solid rgba(201,169,110,0.20)",
              borderRadius: 2,
            }}
          >
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
                fontSize: 11,
                letterSpacing: "0.30em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.60)",
                marginBottom: 20,
              }}
            >
              Votre vin d'honneur
            </p>

            <div
              className="flex items-center justify-between"
              style={{ padding: "8px 0", borderBottom: "1px solid rgba(201,169,110,0.08)" }}
            >
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(232,221,208,0.40)",
                }}
              >
                Formule
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: 16,
                  color: "#faf8f4",
                }}
              >
                {selected.name}
              </span>
            </div>

            <div
              className="flex items-center justify-between"
              style={{ padding: "8px 0", borderBottom: "1px solid rgba(201,169,110,0.08)" }}
            >
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(232,221,208,0.40)",
                }}
              >
                Durée
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: 16,
                  color: "#faf8f4",
                }}
              >
                {selected.duree}
              </span>
            </div>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                fontStyle: "italic",
                color: "rgba(232,221,208,0.50)",
                lineHeight: 1.6,
                marginTop: 16,
              }}
            >
              {selected.accroche}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between w-full mt-12" style={{ maxWidth: 480 }}>
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
            fontSize: 13,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            border: "1px solid #c9a96e",
            background: "transparent",
            color: "#c9a96e",
            padding: "18px 56px",
            borderRadius: 0,
            cursor: "pointer",
          }}
          whileHover={{ backgroundColor: "#c9a96e", color: "#1a1612" }}
        >
          {selected ? "Mon vin d'honneur est prêt — Continuer" : "Continuer"}
        </motion.button>
      </div>

      <PresentationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={drawerVin} />
    </div>
  );
};

export default Step04_VinDhonneur;
