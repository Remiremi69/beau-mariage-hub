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

interface VHFormule {
  id: string;
  name: string;
  tagline: string;
  tag: string;
  tagColor: TagColor;
  duree: string;
  prix: string;
  prixNote: string;
  cocktail: string;
  pieces: string;
  plancha: string;
  boissons: string;
  inclus: string[];
  imagePlaceholder: string;
}

const vhFormules: VHFormule[] = [
  {
    id: "vh-beaujolais-vivant",
    name: "Beaujolais Vivant",
    tagline: "Le terroir lyonnais en 7 pièces",
    tag: "Essentiel",
    tagColor: "or",
    duree: "1h30",
    prix: "Inclus dans le forfait",
    prixNote: "",
    cocktail: "Soupe champenoise au Crémant de Bourgogne",
    pieces: "7 pièces cocktail · terroir lyonnais & Beaujolais · assortiment feuilletés maison",
    plancha: "Volaille grillée à la crème de Bresse bleu",
    boissons: "Citronnade maison · Jus artisanaux pomme/poire/coing · Eau",
    inclus: [
      "Soupe champenoise au Crémant de Bourgogne à l'arrivée",
      "7 pièces cocktail sélectionnées (terroir lyonnais)",
      "Assortiment feuilletés maison",
      "Plancha : Volaille grillée crème de Bresse bleu",
      "Citronnade maison & jus artisanaux",
    ],
    imagePlaceholder: "PHOTO À VENIR",
  },
  {
    id: "vh-seuil-signature",
    name: "Le Seuil Signature",
    tagline: "Saint Jacques, foie gras, saumon tataki",
    tag: "Signature",
    tagColor: "or",
    duree: "2h",
    prix: "Inclus dans le forfait",
    prixNote: "Formule premium · durée étendue",
    cocktail: "Bélini (crème de pêche, prosecco)",
    pieces: "7 pièces cocktail · mer + terroir · assortiment feuilletés maison",
    plancha: "Plancha DOUBLE : Saint Jacques + Foie gras fondue d'oignons",
    boissons: "Citronnade maison · Jus artisanaux · Eau",
    inclus: [
      "Bélini (crème de pêche, prosecco) à l'arrivée",
      "7 pièces cocktail sélectionnées (mer + terroir)",
      "Assortiment feuilletés maison",
      "Plancha double : Saint Jacques + Foie gras fondue d'oignons",
      "Citronnade maison & jus artisanaux",
    ],
    imagePlaceholder: "PHOTO À VENIR",
  },
];

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
  onSelect,
}: {
  formule: VHFormule;
  isSelected: boolean;
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
      minHeight: window.innerWidth >= 768 ? 420 : "auto",
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
          marginBottom: 6,
        }}
      >
        {formule.name}
      </p>

      <h4
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: 22,
          color: "#faf8f4",
          lineHeight: 1.3,
          marginBottom: 16,
        }}
      >
        {formule.tagline}
      </h4>

      {/* Separator */}
      <div style={{ height: 0.5, background: "rgba(201,169,110,0.15)", marginBottom: 16 }} />

      {/* Inclus list */}
      <div className="flex flex-col" style={{ gap: 8 }}>
        {formule.inclus.map((item, i) => (
          <div key={i} className="flex items-start" style={{ gap: 10 }}>
            <span style={{ color: "#c9a96e", fontFamily: "'Jost', sans-serif", fontSize: 13, lineHeight: 1.6 }}>—</span>
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: "rgba(232,221,208,0.65)",
                lineHeight: 1.6,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Prix */}
      <div style={{ borderTop: "1px solid rgba(201,169,110,0.10)", paddingTop: 16, marginTop: "auto" }}>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: "rgba(232,221,208,0.60)",
          }}
        >
          {formule.prix}
        </p>
        {formule.prixNote && (
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
              fontSize: 11,
              color: "rgba(201,169,110,0.55)",
              fontStyle: "italic",
              marginTop: 4,
            }}
          >
            {formule.prixNote}
          </p>
        )}
      </div>

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selected = vhFormules.find((f) => f.id === selectedFormule) ?? null;

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
        Le vin d'honneur, c'est le moment où tout le monde se retrouve après la cérémonie. 1h30 dans les jardins du
        domaine, debout, coupe en main — avant de passer à table. Composez-le comme vous l'imaginez.
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
        DEUX FORMULES CLÉS EN MAIN · TOUT INCLUS
      </motion.p>

      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{ width: 60, height: 1, background: "#c9a96e", margin: "36px auto 52px" }}
      />

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

            <div className="flex items-center justify-between" style={{ padding: "8px 0" }}>
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
              className="text-center"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 12,
                color: "rgba(232,221,208,0.35)",
                fontStyle: "italic",
                marginTop: 16,
              }}
            >
              + Champagne & vins beaujolais servis à volonté
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
