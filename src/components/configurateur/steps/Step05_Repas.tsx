import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfigurateurState } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerRepas } from "../drawerContents";

interface Step05Props {
  state: ConfigurateurState;
  onUpdate: (partial: Partial<ConfigurateurState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

type TagColor = "or" | "vert" | "blanc";
type RepasFiltre = "terroir" | "mer" | "les-deux" | null;

interface Menu {
  id: string;
  name: string;
  tag: string;
  tagColor: TagColor;
  formule: "essentiel" | "gastronomique" | "prestige";
  accroche: string;
  description: string;
  vegetarien: string;
  option_add_on?: string;
  imagePlaceholder: string;
}

const menus: Menu[] = [
  {
    id: "menu-automne-charolais",
    name: "Automne Charolais",
    tag: "Terroir & viande",
    tagColor: "or",
    formule: "essentiel",
    accroche:
      "Bœuf Charolais ou saumon laqué. " +
      "Gratin dauphinois. " +
      "Tarte tatin aux pommes, crème de Bresse.",
    description:
      "En octobre en Beaujolais, il y a des tables qui " +
      "ont un goût précis. Bœuf Charolais rôti sauce " +
      "marchand de vin — ou saumon laqué à la japonaise, " +
      "si vous préférez la mer.\n\n" +
      "Gratin dauphinois. Trilogie de fromages du marché : " +
      "saint-marcellin, chèvre frais, comté, avec une " +
      "confiture maison que J&J préparent eux-mêmes.\n\n" +
      "Tarte tatin caramélisée aux pommes, crème de Bresse. " +
      "Puis une tarte praline — la mignardise lyonnaise " +
      "qui n'est pas là par hasard.\n\n" +
      "C'est la table que vous voudrez retrouver " +
      "dans dix ans en vous souvenant de ce soir.",
    vegetarien: "Risotto aux légumes de saison et œuf",
    imagePlaceholder: "PHOTO À VENIR",
  },
  {
    id: "menu-cocon-lyonnais",
    name: "Cocon Lyonnais",
    tag: "Mer & terroir",
    tagColor: "or",
    formule: "essentiel",
    accroche:
      "Quenelle saint-jacques façon lyonnaise " +
      "ou poulet aux morilles. " +
      "Charlotte poire chocolat. La table de Lyon.",
    description:
      "La quenelle de cabillaud et saint-jacques sauce " +
      "américaine — c'est le plat de Lyon. Pas la version " +
      "modernisée, pas réinterprétée : faite comme elle " +
      "doit être faite.\n\n" +
      "Ou le poulet fermier aux morilles — champignons " +
      "cueillis en automne, le plat de saison par " +
      "excellence.\n\n" +
      "Moelleux de pomme de terre. Charlotte poire chocolat " +
      "avec une crème anglaise et une tuile à l'orange. " +
      "Cannelé bordelais en fin de repas.\n\n" +
      "La cuisine de Lyon n'est pas un concept. " +
      "C'est une façon d'être à table — présente, " +
      "généreuse, sans esbroufe.",
    vegetarien: "Curry de légumes, riz gourmand et tofu artisanal",
    imagePlaceholder: "PHOTO À VENIR",
  },
  {
    id: "menu-nocturne-royal",
    name: "Nocturne Royal",
    tag: "Signature",
    tagColor: "blanc",
    formule: "prestige",
    accroche:
      "Royal chocolat feuillantine. " +
      "Macarons caramel beurre salé et chocolat. " +
      "Le menu conçu pour être la dernière image.",
    description:
      "Bœuf Charolais sauce marchand de vin — ou quenelle " +
      "de cabillaud et saint-jacques. " +
      "Le plat n'est pas le sujet de ce menu.\n\n" +
      "Le sujet, c'est la fin.\n\n" +
      "Royal chocolat feuillantine, crème anglaise, " +
      "tuile à l'orange. Le dessert qui clôture une " +
      "soirée comme on ferme un livre qu'on ne voulait " +
      "pas finir. Suivi d'une verrine vanille framboise " +
      "posée devant chaque convive sans cérémonie.\n\n" +
      "En option : une pièce montée de macarons — " +
      "caramel beurre salé et chocolat — posée sur les " +
      "tables sans annonce préalable, au moment où " +
      "les conversations ralentissent.",
    vegetarien: "Lentilles aux légumes, tofu et œuf mollet",
    option_add_on: "Pièce montée macarons — caramel beurre salé & chocolat",
    imagePlaceholder: "PHOTO À VENIR",
  },
];

const FILTRE_TO_MENU: Record<NonNullable<RepasFiltre>, string> = {
  terroir: "menu-automne-charolais",
  mer: "menu-cocon-lyonnais",
  "les-deux": "menu-nocturne-royal",
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

const MenuCard = ({
  menu,
  isSelected,
  isRecommended,
  onSelect,
}: {
  menu: Menu;
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
      data-photo-slot={menu.id}
      className="relative flex flex-col items-center justify-center"
      style={{
        height: 200,
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
        {menu.imagePlaceholder}
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
          ...tagStyles[menu.tagColor],
        }}
      >
        {menu.tag}
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
        {menu.name}
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
        {menu.accroche}
      </p>

      {/* Separator */}
      <div style={{ height: 0.5, background: "rgba(201,169,110,0.15)", marginBottom: 16 }} />

      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: 13,
          color: "rgba(232,221,208,0.60)",
          lineHeight: 1.75,
          whiteSpace: "pre-line",
          marginBottom: 12,
        }}
      >
        {menu.description}
      </p>

      {/* Option add-on */}
      {menu.option_add_on && (
        <div
          style={{
            background: "rgba(201,169,110,0.05)",
            borderLeft: "2px solid rgba(201,169,110,0.35)",
            padding: "10px 14px",
            marginTop: 12,
          }}
        >
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: 10,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.55)",
              marginBottom: 4,
            }}
          >
            OPTION
          </p>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: 12,
              color: "rgba(201,169,110,0.75)",
            }}
          >
            {menu.option_add_on}
          </p>
        </div>
      )}

      {/* Végétarien */}
      <div
        style={{
          borderTop: "1px solid rgba(201,169,110,0.08)",
          paddingTop: 12,
          marginTop: 12,
        }}
      >
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            fontSize: 10,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "rgba(232,221,208,0.35)",
            marginBottom: 4,
          }}
        >
          VÉGÉTARIEN
        </p>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: 12,
            color: "rgba(232,221,208,0.50)",
          }}
        >
          {menu.vegetarien}
        </p>
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
        Café, thé & mignardises maison · Inclus
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

interface FiltreButtonProps {
  letter: string;
  title: string;
  desc: string;
  isActive: boolean;
  onClick: () => void;
}

const FiltreButton = ({ letter, title, desc, isActive, onClick }: FiltreButtonProps) => (
  <button
    onClick={onClick}
    className="text-left transition-all duration-[250ms]"
    style={{
      padding: "20px 24px",
      border: isActive ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.20)",
      background: isActive ? "rgba(201,169,110,0.08)" : "rgba(26,22,18,0.40)",
      borderRadius: 2,
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      if (!isActive) {
        e.currentTarget.style.border = "1px solid rgba(201,169,110,0.40)";
        e.currentTarget.style.background = "rgba(201,169,110,0.03)";
      }
    }}
    onMouseLeave={(e) => {
      if (!isActive) {
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
        {letter}
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
        {title}
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
      {desc}
    </p>
  </button>
);

const Step05_Repas = ({ state, onUpdate, onNext, onPrev }: Step05Props) => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(state.repasEntree);
  const [filtre, setFiltre] = useState<RepasFiltre>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selected = menus.find((m) => m.id === selectedMenu) ?? null;
  const recommendedId = filtre ? FILTRE_TO_MENU[filtre] : null;

  const handleFiltre = (f: NonNullable<RepasFiltre>) => {
    setFiltre(f);
    setSelectedMenu(FILTRE_TO_MENU[f]);
  };

  const handleContinue = () => {
    const selectedMenuData = menus.find((m) => m.id === selectedMenu);
    onUpdate({
      repasEntree: selectedMenu,
      repasPlat: null,
      repasDessert: null,
      repas: selectedMenuData?.formule ?? "essentiel",
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
        Étape 5 · Le repas
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
        La table
        <br />
        du soir.
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
        J&J Traiteur. Trois menus de saison,
        <br />
        ancrés dans le terroir beaujolais et lyonnais.
        <br />
        Un choix. Une direction.
      </motion.p>

      <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp} className="mb-2">
        <InfoButton label="Découvrir le chef" onClick={() => setDrawerOpen(true)} />
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
        PLAT · FROMAGE · DESSERT · CAFÉ & MIGNARDISES · TOUT INCLUS
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
          À TABLE, VOUS ÊTES PLUTÔT…
        </p>

        <div className="w-full flex flex-col" style={{ gap: 12 }}>
          <FiltreButton
            letter="A"
            title="TERROIR & VIANDE"
            desc="Beaujolais, Charolais, lyonnais. Ce que la région a de meilleur en octobre."
            isActive={filtre === "terroir"}
            onClick={() => handleFiltre("terroir")}
          />
          <FiltreButton
            letter="B"
            title="MER & LÉGÈRETÉ"
            desc="Poissons, quenelle, produits du littoral revisités à la lyonnaise."
            isActive={filtre === "mer"}
            onClick={() => handleFiltre("mer")}
          />
          <FiltreButton
            letter="C"
            title="LES DEUX"
            desc="Selon l'envie des convives — les deux options restent disponibles à la commande."
            isActive={filtre === "les-deux"}
            onClick={() => handleFiltre("les-deux")}
          />
        </div>
      </motion.div>

      {/* Menu cards */}
      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full flex flex-col items-center"
        style={{ gap: 16, maxWidth: 680 }}
      >
        {menus.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            isSelected={selectedMenu === menu.id}
            isRecommended={recommendedId === menu.id}
            onSelect={() => setSelectedMenu(menu.id)}
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
              Votre menu
            </p>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: 24,
                color: "#faf8f4",
                marginBottom: 12,
              }}
            >
              {selected.name}
            </p>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                fontStyle: "italic",
                color: "rgba(232,221,208,0.50)",
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              {selected.accroche}
            </p>

            <div
              style={{
                borderTop: "1px solid rgba(201,169,110,0.08)",
                paddingTop: 10,
                marginTop: 4,
              }}
            >
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 12,
                  color: "rgba(232,221,208,0.40)",
                }}
              >
                Végétarien disponible : {selected.vegetarien}
              </p>
            </div>

            {selected.option_add_on && (
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 12,
                  fontStyle: "italic",
                  color: "rgba(201,169,110,0.55)",
                  marginTop: 8,
                }}
              >
                Option : {selected.option_add_on}
              </p>
            )}
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
          {selected ? "Mon menu est prêt — Continuer" : "Continuer"}
        </motion.button>
      </div>

      <PresentationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={drawerRepas} />
    </div>
  );
};

export default Step05_Repas;
