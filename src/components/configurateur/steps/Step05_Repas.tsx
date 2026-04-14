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

interface Menu {
  id: string;
  name: string;
  tagline: string;
  tag: string;
  tagColor: TagColor;
  formule: "essentiel" | "gastronomique" | "prestige";
  prixTTC: string;
  prixNote: string;
  plat: string;
  vegetarien: string;
  accompagnements: string;
  fromage: string;
  dessert: string;
  mignardise: string;
  detail: string[];
  imagePlaceholder: string;
}

const menus: Menu[] = [
  {
    id: "menu-automne-charolais",
    name: "Automne Charolais",
    tagline: "Bœuf Charolais AOP ou saumon laqué,\ntatin aux pommes crème de Bresse",
    tag: "Essentiel",
    tagColor: "or",
    formule: "essentiel",
    prixTTC: "85 € / pers.",
    prixNote: "88 € avec le bœuf (+3 €)",
    plat: "Pavé de bœuf Charolais sauce marchand de vin\nOU Saumon laqué japonais",
    vegetarien: "Risotto aux légumes de saison et œuf",
    accompagnements: "Gratin dauphinois · Wok légumes de saison",
    fromage: "Trilogie marché (st marcellin, chèvre, comté) + confiture maison",
    dessert: "Tatin caramélisée aux pommes, crème de Bresse",
    mignardise: "Tarte praline",
    detail: [
      "Plat : Bœuf Charolais AOP sauce marchand de vin",
      "        OU Saumon laqué japonais",
      "Végétarien : Risotto légumes de saison & œuf",
      "Fromage : Trilogie marché + confiture maison",
      "Dessert : Tatin caramélisée · Crème de Bresse",
      "Mignardise : Tarte praline",
      "Café, thé & mignardises maison inclus",
    ],
    imagePlaceholder: "PHOTO À VENIR",
  },
  {
    id: "menu-cocon-lyonnais",
    name: "Cocon Lyonnais",
    tagline: "Quenelle saint-jacques façon lyonnaise\nou poulet aux morilles",
    tag: "Essentiel",
    tagColor: "or",
    formule: "essentiel",
    prixTTC: "85 € / pers.",
    prixNote: "88 € avec le poulet aux morilles (+3 €)",
    plat: "Quenelle cabillaud & saint-jacques sauce américaine\nOU Poulet fermier aux morilles",
    vegetarien: "Curry de légumes riz gourmand et tofu artisanal",
    accompagnements: "Moelleux de pomme de terre · Flan de légumes",
    fromage: "Fromage blanc coulis + trilogie fromage sec",
    dessert: "Charlotte Poire chocolat, crème anglaise, tuile à l'orange",
    mignardise: "Cannelé bordelais",
    detail: [
      "Plat : Quenelle cabillaud & saint-jacques sauce américaine",
      "        OU Poulet fermier aux morilles",
      "Végétarien : Curry légumes · riz · tofu artisanal",
      "Fromage : Fromage blanc coulis + trilogie secs",
      "Dessert : Charlotte poire chocolat · Tuile orange",
      "Mignardise : Cannelé bordelais",
      "Café, thé & mignardises maison inclus",
    ],
    imagePlaceholder: "PHOTO À VENIR",
  },
  {
    id: "menu-nocturne-royal",
    name: "Nocturne Royal",
    tagline: "Royal chocolat feuillantine,\nmacarons caramel-chocolat",
    tag: "Signature",
    tagColor: "blanc",
    formule: "prestige",
    prixTTC: "88 € / pers.",
    prixNote: "90 € avec pièce montée macarons (+2 €/pers)",
    plat: "Pavé de bœuf Charolais sauce marchand de vin\nOU Quenelle saint-jacques sauce américaine",
    vegetarien: "Lentilles aux légumes, tofu, œuf mollet",
    accompagnements: "Gratin dauphinois · Wok légumes de saison",
    fromage: "Trilogie marché + fromage blanc coulis",
    dessert: "Royal chocolat Feuillantine, crème anglaise, tuile à l'orange",
    mignardise: "Verrine vanille framboise façon charlotte\n+ Option pièce montée macarons (+2 €/pers)",
    detail: [
      "Plat : Bœuf Charolais AOP sauce marchand de vin",
      "        OU Quenelle saint-jacques sauce américaine",
      "Végétarien : Lentilles · légumes · tofu · œuf mollet",
      "Fromage : Trilogie marché + fromage blanc coulis",
      "Dessert : Royal chocolat Feuillantine",
      "Mignardise : Verrine vanille framboise",
      "Option : Pièce montée macarons (+2 €/pers)",
      "Café, thé & mignardises maison inclus",
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

const menuGridRows: { label: string; key: keyof Menu }[] = [
  { label: "PLAT", key: "plat" },
  { label: "VÉGÉTARIEN", key: "vegetarien" },
  { label: "FROMAGE", key: "fromage" },
  { label: "DESSERT", key: "dessert" },
  { label: "MIGNARDISE", key: "mignardise" },
];

const MenuCard = ({
  menu,
  isSelected,
  onSelect,
}: {
  menu: Menu;
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
      width: "100%",
      maxWidth: 680,
      margin: "0 auto",
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
        height: window.innerWidth >= 768 ? 200 : 150,
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

      {/* Prix badge */}
      <span
        className="absolute bottom-3 left-3"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 500,
          fontSize: 13,
          color: "#c9a96e",
          background: "rgba(13,11,8,0.80)",
          border: "1px solid rgba(201,169,110,0.30)",
          padding: "6px 14px",
          borderRadius: 1,
        }}
      >
        {menu.prixTTC}
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
        {menu.name}
      </p>

      <h4
        className="whitespace-pre-line"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: 22,
          color: "#faf8f4",
          lineHeight: 1.3,
          marginBottom: 20,
        }}
      >
        {menu.tagline}
      </h4>

      {/* Content grid */}
      <div className="flex flex-col">
        {menuGridRows.map((row, i) => (
          <div
            key={row.key}
            className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-x-3"
            style={{
              padding: "8px 0",
              borderBottom: i < menuGridRows.length - 1 ? "1px solid rgba(201,169,110,0.06)" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(232,221,208,0.40)",
              }}
            >
              {row.label}
            </span>
            <span
              className="whitespace-pre-line"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: "rgba(232,221,208,0.70)",
              }}
            >
              {String(menu[row.key])}
            </span>
          </div>
        ))}
      </div>

      {/* Prix note */}
      {menu.prixNote && (
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: 11,
            color: "rgba(201,169,110,0.55)",
            fontStyle: "italic",
            marginTop: 12,
          }}
        >
          {menu.prixNote}
        </p>
      )}

      {/* Prix bottom */}
      <div style={{ borderTop: "1px solid rgba(201,169,110,0.10)", paddingTop: 16, marginTop: 16 }} />

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

const Step05_Repas = ({ state, onUpdate, onNext, onPrev }: Step05Props) => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(state.repasEntree);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedMenuData = menus.find((m) => m.id === selectedMenu) ?? null;

  const handleContinue = () => {
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
        que vous méritez.
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
          maxWidth: 500,
          marginBottom: 16,
        }}
      >
        J&J Traiteur compose trois menus de saison, ancrés dans le terroir beaujolais et lyonnais. Chaque menu propose
        une option végétarienne. Choisissez celui qui vous ressemble.
      </motion.p>

      <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp} className="mb-2">
        <InfoButton label="Rencontrer le chef Sébastien" onClick={() => setDrawerOpen(true)} />
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
        style={{ width: 60, height: 1, background: "#c9a96e", margin: "36px auto 52px" }}
      />

      {/* Menu cards */}
      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full flex flex-col items-center gap-4"
      >
        {menus.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            isSelected={selectedMenu === menu.id}
            onSelect={() => setSelectedMenu(menu.id)}
          />
        ))}
      </motion.div>

      {/* Récap */}
      <AnimatePresence>
        {selectedMenuData && (
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
                marginBottom: 8,
              }}
            >
              {selectedMenuData.name}
            </p>

            <p
              className="whitespace-pre-line"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 14,
                color: "rgba(232,221,208,0.55)",
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              {selectedMenuData.tagline}
            </p>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#c9a96e",
                marginBottom: 12,
              }}
            >
              {selectedMenuData.prixTTC}
            </p>

            <p
              className="text-center"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 12,
                color: "rgba(232,221,208,0.35)",
                fontStyle: "italic",
                marginTop: 8,
              }}
            >
              + Café, thé & mignardises maison
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
          {selectedMenuData ? "Mon menu est prêt — Continuer" : "Continuer"}
        </motion.button>
      </div>

      <PresentationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={drawerRepas} />
    </div>
  );
};

export default Step05_Repas;
