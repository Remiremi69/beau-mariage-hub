import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfigurateurState, Repas } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerRepas } from "../drawerContents";
import menuTraditionImg from "@/assets/menu/menu-tradition-beaujolais.jpg";
import menuSignatureImg from "@/assets/menu/menu-signature-limen.jpg";
import royalChocolatImg from "@/assets/desserts/royal-chocolat-feuillantine.jpg";
import tarteTatinImg from "@/assets/desserts/tarte-tatin-caramel.jpg";
import fraisierImg from "@/assets/desserts/fraisier-mascarpone.jpg";

interface Step05Props {
  state: ConfigurateurState;
  onUpdate: (partial: Partial<ConfigurateurState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

/* ───────────── Data ───────────── */

interface PlatDef {
  id: string;
  nom: string;
  accompagnement: string;
  accroche: string;
}

interface MenuDef {
  id: Repas;
  number: string;
  name: string;
  image: string;
  accroche: string;
  vh: { title: string; sub1: string; sub2: string };
  fromagesLine: string;
  plats: PlatDef[];
  full: {
    vinHonneur: string;
    cocktailTitle: string;
    cocktail: string;
    fromages: string;
  };
}

const menus: MenuDef[] = [
  {
    id: "menu1",
    number: "Menu 1",
    name: "Tradition Beaujolais",
    image: menuTraditionImg,
    accroche: "Pour qui aime le terroir, la générosité, l'âme lyonnaise.",
    vh: {
      title: "Kir royal crémant de Bourgogne",
      sub1: "Kir au choix (4 sirops) · Citronnade maison · Eaux plate & gazeuse à volonté · Softs",
      sub2: "+ 8 pièces lyonnaises",
    },
    fromagesLine: "+ Plateau de fromages du Beaujolais",
    plats: [
      {
        id: "rumsteak",
        nom: "Cœur de rumsteak sauce vigneronne",
        accompagnement: "Wok de légumes · gratin dauphinois",
        accroche: "Pour qui aime la viande rouge, le caractère, la tradition.",
      },
      {
        id: "saint-jacques",
        nom: "Quenelle Saint-Jacques mousseline",
        accompagnement: "Sauce bouillabaisse · riz gourmand",
        accroche: "Pour qui aime la mer, la finesse, les saveurs lyonnaises.",
      },
    ],
    full: {
      vinHonneur: "Kir royal crémant de Bourgogne · Kir (4 choix de sirop) · Citronnade maison · Eaux plate & gazeuse à volonté · Softs",
      cocktailTitle: "Cocktail · 8 pièces",
      cocktail:
        "Plancha poulet sauce Bresse · Feuilleté 3 goûts (anchois / fromage / olive) · " +
        "Escargots persillade · Cervelle de canut · Crêpes truite fumée · " +
        "Pruneaux lard fumé · Tarte à l'oignon · Burger bœuf · " +
        "Crostini caviar d'aubergine poivron confit",
      fromages:
        "Saint-marcellin · Fourme d'Ambert · Chèvre mariné huile et herbes · Pain aux fruits",
    },
  },
  {
    id: "menu2",
    number: "Menu 2",
    name: "Signature Limen",
    image: menuSignatureImg,
    accroche: "Pour qui aime la cuisine précise, les saveurs voyageuses, l'évasion.",
    vh: {
      title: "Punch citron vert",
      sub1: "Citronnade maison · Eaux plate & gazeuse à volonté · Softs · Gingembre · Coriandre",
      sub2: "+ 8 pièces signature",
    },
    fromagesLine: "+ Plateau de fromages affinés",
    plats: [
      {
        id: "poulet-morilles",
        nom: "Poulet fermier crème de morilles",
        accompagnement: "Pommes boulangère · wok de légumes",
        accroche: "Pour qui aime la volaille noble, les sauces crémées, la rondeur.",
      },
      {
        id: "saumon-laque",
        nom: "Pavé de saumon laqué japonais",
        accompagnement: "Riz gourmand · wok de légumes",
        accroche: "Pour qui aime les saveurs venues d'ailleurs, la précision asiatique.",
      },
    ],
    full: {
      vinHonneur: "Punch citron vert · Citronnade maison · Eaux plate & gazeuse à volonté · Softs · Gingembre · Coriandre",
      cocktailTitle: "Cocktail · 8 pièces",
      cocktail:
        "Plancha gambas snackées marmelade mangue safran · Rouleau d'aubergine · " +
        "Mini-cannelés chorizo crème d'aneth · Velouté courge émulsion chèvre frais noisette · " +
        "Verrine guacamole crevette · Croque monsieur jambon truffé · " +
        "Brochette canard mangue miel orange · Œuf brouillé saumon fumé et œufs de saumon",
      fromages:
        "Saint-marcellin · Fourme d'Ambert · Chèvre mariné · Fromage blanc coulis",
    },
  },
];

interface DessertDef {
  id: string;
  name: string;
  accroche: string;
  image?: string;
}

const desserts: DessertDef[] = [
  {
    id: "royal-chocolat",
    name: "Royal chocolat feuillantine",
    accroche: "Trois textures de chocolat, croquant praliné, mousse aérienne.",
    image: royalChocolatImg,
  },
  {
    id: "tarte-tatin",
    name: "Tarte tatin caramel",
    accroche: "Pommes caramélisées, crème de Bresse fouettée.",
    image: tarteTatinImg,
  },
  {
    id: "fraisier",
    name: "Fraisier mascarpone",
    accroche: "Fraises de saison, citron vert, basilic frais.",
    image: fraisierImg,
  },
];

/* ───────────── Data — Options Nuit ───────────── */

interface OptionNuitDef {
  id: string;
  numero: string;
  titre: string;
  badge: string;
  badgeStyle: "inclus" | "prestige";
  tagline: string;
  description: string;
  selectable: boolean;
}

const optionsNuit: OptionNuitDef[] = [
  {
    id: "bar-nuit",
    numero: "Option 1",
    titre: "Bar de nuit",
    badge: "INCLUS",
    badgeStyle: "inclus",
    tagline: "Déjà en place. À vous de l'habiter.",
    description:
      "Le bar est installé, éclairé, prêt. Bouteilles disposées, verres en place, espace dédié — sans qu'on vous le signale. La nuit peut continuer à son rythme, sans rupture. Les invités se servent. La fête reste fluide.",
    selectable: false,
  },
  {
    id: "service-bar-2h",
    numero: "Option 2",
    titre: "Service bar — 2 heures",
    badge: "PRESTIGE",
    badgeStyle: "prestige",
    tagline: "Quelqu'un tient le bar. Vous tenez la nuit.",
    description:
      "Pendant deux heures, un serveur J&J prend position derrière le bar. Cocktails servis, verres renouvelés, rythme tenu. Vos invités ne cherchent rien — ils reçoivent. L'option pour les mariages où la soirée dansante doit rester pleine, de bout en bout.",
    selectable: true,
  },
  {
    id: "soupe-oignon",
    numero: "Option 3",
    titre: "Soupe à l'oignon",
    badge: "PRESTIGE",
    badgeStyle: "prestige",
    tagline: "Le rituel qui marque la fin d'une belle nuit.",
    description:
      "J&J la prépare, la maintient au chaud, la pose en self-service. Bouillon doré, croûtons, fromage râpé. Pas une anecdote : le moment où la salle ralentit, où les gens s'assoient, où les conversations deviennent vraies. Une tradition qui n'a pas besoin d'être servie pour exister.",
    selectable: true,
  },
];

/* ───────────── Animations ───────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
  }),
};

/* ───────────── Atoms ───────────── */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontFamily: "'Jost', sans-serif",
      fontWeight: 400,
      fontSize: 11,
      letterSpacing: "0.30em",
      textTransform: "uppercase",
      color: "rgba(201,169,110,0.60)",
      textAlign: "center",
    }}
  >
    {children}
  </p>
);

const SubLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center" style={{ gap: 10, marginBottom: 14 }}>
    <div style={{ flex: 1, height: 0.5, background: "rgba(201,169,110,0.20)" }} />
    <span
      style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 9,
        letterSpacing: "0.30em",
        textTransform: "uppercase",
        color: "rgba(201,169,110,0.55)",
      }}
    >
      {children}
    </span>
    <div style={{ flex: 1, height: 0.5, background: "rgba(201,169,110,0.20)" }} />
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 16 }}>
    <p
      style={{
        fontFamily: "'Jost', sans-serif",
        fontWeight: 400,
        fontSize: 10,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "rgba(201,169,110,0.65)",
        marginBottom: 6,
      }}
    >
      {title}
    </p>
    <div
      style={{
        fontFamily: "'Jost', sans-serif",
        fontWeight: 300,
        fontSize: 13,
        color: "rgba(232,221,208,0.70)",
        lineHeight: 1.65,
      }}
    >
      {children}
    </div>
  </div>
);

/* ───────────── Menu Card ───────────── */

const MenuCard = ({
  menu,
  isSelected,
  selectedPlatId,
  onSelect,
}: {
  menu: MenuDef;
  isSelected: boolean;
  selectedPlatId: string | null;
  onSelect: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="flex flex-col overflow-hidden transition-all duration-[250ms]"
      style={{
        borderRadius: 2,
        border: isSelected
          ? "1px solid #c9a96e"
          : "1px solid rgba(201,169,110,0.15)",
        background: isSelected ? "rgba(201,169,110,0.06)" : "rgba(26,22,18,0.40)",
        flex: 1,
        minWidth: 0,
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
      {/* Photo */}
      <div
        onClick={onSelect}
        className="relative overflow-hidden"
        style={{
          height: 220,
          borderBottom: "1px solid rgba(201,169,110,0.10)",
          cursor: "pointer",
        }}
      >
        <img
          src={menu.image}
          alt={menu.name}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center 60%" }}
        />
        <span
          className="absolute top-3 left-3"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            fontSize: 10,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: 1,
            border: "1px solid rgba(201,169,110,0.50)",
            color: "rgba(201,169,110,0.95)",
            background: "rgba(15,12,10,0.75)",
            backdropFilter: "blur(4px)",
          }}
        >
          Vin d'honneur compris
        </span>
        <span
          className="absolute top-3 right-3"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            fontSize: 10,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: 1,
            border: "1px solid rgba(201,169,110,0.50)",
            color: "rgba(201,169,110,0.95)",
            background: "rgba(15,12,10,0.75)",
            backdropFilter: "blur(4px)",
          }}
        >
          Inclus
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1" style={{ padding: "24px 22px 0" }}>
        <div onClick={onSelect} style={{ cursor: "pointer" }}>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: 11,
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "rgba(232,221,208,0.55)",
              marginBottom: 4,
            }}
          >
            {menu.number}
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: 26,
              color: "#faf8f4",
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            {menu.name}
          </p>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: 15,
              color: "rgba(201,169,110,0.75)",
              lineHeight: 1.5,
              marginBottom: 22,
            }}
          >
            « {menu.accroche} »
          </p>

          {/* ─── Vin d'honneur (HERO) ─── */}
          <SubLabel>Votre vin d'honneur</SubLabel>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              color: "#faf8f4",
              lineHeight: 1.3,
              marginBottom: 4,
            }}
          >
            {menu.vh.title}
          </p>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 13,
              color: "rgba(232,221,208,0.55)",
              marginBottom: 4,
            }}
          >
            {menu.vh.sub1}
          </p>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: "rgba(232,221,208,0.65)",
              marginBottom: 22,
            }}
          >
            {menu.vh.sub2}
          </p>

          {/* ─── Votre table ─── */}
          <SubLabel>Votre table</SubLabel>

          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 14,
              color: "rgba(201,169,110,0.85)",
              marginBottom: 2,
            }}
          >
            Plat au choix parmi 2
          </p>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontStyle: "italic",
              fontSize: 11,
              color: "rgba(232,221,208,0.50)",
              marginBottom: 10,
            }}
          >
            (sélection ci-dessous)
          </p>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: "rgba(232,221,208,0.65)",
              marginBottom: 20,
            }}
          >
            {menu.fromagesLine}
          </p>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.75)",
            background: "transparent",
            border: "1px solid rgba(201,169,110,0.25)",
            padding: "10px 16px",
            borderRadius: 0,
            cursor: "pointer",
            marginBottom: 16,
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(201,169,110,0.55)";
            e.currentTarget.style.color = "#c9a96e";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
            e.currentTarget.style.color = "rgba(201,169,110,0.75)";
          }}
        >
          {expanded ? "Réduire ↑" : "Voir tous les détails ↓"}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="full"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ paddingTop: 8, paddingBottom: 8 }}>
                <Section title="Vin d'honneur">{menu.full.vinHonneur}</Section>
                <Section title={menu.full.cocktailTitle}>{menu.full.cocktail}</Section>
                <Section title="Plat au choix">
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {menu.plats.map((p) => {
                      const chosen = selectedPlatId === p.id;
                      return (
                        <li
                          key={p.id}
                          style={{
                            paddingLeft: 16,
                            position: "relative",
                            marginBottom: 4,
                            color: chosen
                              ? "rgba(201,169,110,0.95)"
                              : "rgba(232,221,208,0.70)",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              color: chosen
                                ? "#c9a96e"
                                : "rgba(201,169,110,0.55)",
                            }}
                          >
                            {chosen ? "✓" : "→"}
                          </span>
                          {p.nom} — {p.accompagnement}
                        </li>
                      );
                    })}
                  </ul>
                </Section>
                <Section title="Fromages">{menu.full.fromages}</Section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected banner */}
        {isSelected && (
          <div
            style={{
              marginTop: "auto",
              marginLeft: -22,
              marginRight: -22,
              marginBottom: 0,
              padding: "12px 22px",
              background: "rgba(201,169,110,0.08)",
              borderTop: "1px solid rgba(201,169,110,0.30)",
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#c9a96e",
              textAlign: "center",
            }}
          >
            ✓ Menu sélectionné
          </div>
        )}
        {!isSelected && <div style={{ paddingBottom: 24 }} />}
      </div>
    </div>
  );
};

/* ───────────── Plat Card ───────────── */

const PlatCard = ({
  plat,
  index,
  isSelected,
  onSelect,
}: {
  plat: PlatDef;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <div
    onClick={onSelect}
    className="flex flex-col transition-all duration-[250ms]"
    style={{
      borderRadius: 2,
      border: isSelected
        ? "1px solid #c9a96e"
        : "1px solid rgba(201,169,110,0.15)",
      background: isSelected ? "rgba(201,169,110,0.06)" : "rgba(26,22,18,0.40)",
      padding: "26px 24px 22px",
      cursor: "pointer",
      minWidth: 0,
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
    <div className="flex items-center" style={{ gap: 10, marginBottom: 12 }}>
      <div style={{ flex: 1, height: 0.5, background: "rgba(201,169,110,0.20)" }} />
      <span
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 9,
          letterSpacing: "0.30em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.60)",
        }}
      >
        Plat {index + 1}
      </span>
      <div style={{ flex: 1, height: 0.5, background: "rgba(201,169,110,0.20)" }} />
    </div>

    <p
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontSize: 24,
        color: "#faf8f4",
        lineHeight: 1.2,
        marginBottom: 6,
      }}
    >
      {plat.nom}
    </p>
    <p
      style={{
        fontFamily: "'Jost', sans-serif",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: 13,
        color: "rgba(232,221,208,0.60)",
        marginBottom: 14,
      }}
    >
      {plat.accompagnement}
    </p>

    <div
      style={{
        width: 24,
        height: 0.5,
        background: "rgba(201,169,110,0.45)",
        marginBottom: 12,
      }}
    />

    <p
      style={{
        fontFamily: "'Jost', sans-serif",
        fontWeight: 300,
        fontSize: 12,
        color: "rgba(232,221,208,0.50)",
        lineHeight: 1.6,
        marginBottom: 18,
        flex: 1,
      }}
    >
      {plat.accroche}
    </p>

    <span
      style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 10,
        letterSpacing: "0.30em",
        textTransform: "uppercase",
        color: isSelected ? "#c9a96e" : "rgba(232,221,208,0.50)",
        alignSelf: "flex-start",
      }}
    >
      {isSelected ? "✓ Plat sélectionné" : "○ Choisir ce plat"}
    </span>
  </div>
);

/* ───────────── Dessert Card ───────────── */

const DessertPlaceholder = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(201,169,110,0.06)",
      gap: 8,
    }}
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.45)" strokeWidth="1">
      <path d="M12 3l1.5 4.5H18l-3.5 2.7L16 15l-4-3-4 3 1.5-4.8L6 7.5h4.5z" />
    </svg>
    <span
      style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 10,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "rgba(201,169,110,0.35)",
      }}
    >
      Photo à venir
    </span>
  </div>
);

const DessertCard = ({
  dessert,
  isSelected,
  onSelect,
}: {
  dessert: DessertDef;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <div
    onClick={onSelect}
    className="flex flex-col overflow-hidden transition-all duration-[250ms]"
    style={{
      borderRadius: 2,
      border: isSelected
        ? "1px solid #c9a96e"
        : "1px solid rgba(201,169,110,0.15)",
      background: isSelected ? "rgba(201,169,110,0.06)" : "rgba(26,22,18,0.40)",
      cursor: "pointer",
      flex: 1,
      minWidth: 0,
      maxHeight: 280,
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
    <div
      className="relative overflow-hidden"
      style={{
        height: 160,
        borderBottom: "1px solid rgba(201,169,110,0.10)",
      }}
    >
      {dessert.image ? (
        <img
          src={dessert.image}
          alt={dessert.name}
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 60%" }}
          loading="lazy"
        />
      ) : (
        <DessertPlaceholder />
      )}
    </div>
    <div className="flex flex-col flex-1" style={{ padding: "16px 18px 18px" }}>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 18,
          color: "#faf8f4",
          lineHeight: 1.2,
          marginBottom: 6,
        }}
      >
        {dessert.name}
      </p>
      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: 12,
          color: "rgba(232,221,208,0.60)",
          lineHeight: 1.5,
          marginBottom: 12,
          flex: 1,
        }}
      >
        {dessert.accroche}
      </p>
      <span
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 10,
          letterSpacing: "0.30em",
          textTransform: "uppercase",
          color: isSelected ? "#c9a96e" : "rgba(232,221,208,0.50)",
          alignSelf: "flex-start",
        }}
      >
        {isSelected ? "✓ Sélectionné" : "○ Choisir"}
      </span>
    </div>
  </div>
);

/* ───────────── OptionNuitCard ───────────── */

const OptionNuitCard = ({
  option,
  isSelected,
  onToggle,
}: {
  option: OptionNuitDef;
  isSelected: boolean;
  onToggle: () => void;
}) => {
  const clickable = option.selectable;
  const badgeStyle =
    option.badgeStyle === "inclus"
      ? {
          background: "transparent",
          border: "1px solid rgba(201,169,110,0.50)",
          color: "rgba(201,169,110,0.85)",
        }
      : {
          background: "rgba(201,169,110,0.10)",
          border: "1px solid rgba(201,169,110,0.30)",
          color: "#c9a96e",
        };

  const cardStyle: React.CSSProperties = !clickable
    ? {
        background: "rgba(201,169,110,0.04)",
        border: "1px solid rgba(201,169,110,0.25)",
      }
    : isSelected
    ? {
        background: "rgba(201,169,110,0.06)",
        border: "1px solid #c9a96e",
      }
    : {
        background: "rgba(26,22,18,0.40)",
        border: "1px solid rgba(201,169,110,0.15)",
      };

  return (
    <motion.div
      onClick={clickable ? onToggle : undefined}
      whileHover={clickable ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
      style={{
        ...cardStyle,
        padding: "28px 24px 22px",
        borderRadius: 2,
        cursor: clickable ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span
          style={{
            ...badgeStyle,
            padding: "4px 12px",
            borderRadius: 2,
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {option.badge}
        </span>
      </div>

      <div
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 11,
          letterSpacing: "0.30em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.60)",
          textAlign: "center",
        }}
      >
        ─── {option.numero} ───
      </div>

      <h4
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 22,
          color: "#faf8f4",
          textAlign: "center",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {option.titre}
      </h4>

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: 14,
          color: "rgba(201,169,110,0.70)",
          textAlign: "center",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        « {option.tagline} »
      </p>

      <div
        style={{
          width: 24,
          height: 1,
          background: "rgba(201,169,110,0.40)",
          margin: "4px auto",
        }}
      />

      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: 12,
          color: "rgba(232,221,208,0.60)",
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
        }}
      >
        {option.description}
      </p>

      <div style={{ marginTop: 10, textAlign: "center" }}>
        {!clickable ? (
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.70)",
            }}
          >
            ✓ Compris dans votre table
          </div>
        ) : (
          <>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: isSelected ? "#c9a96e" : "rgba(201,169,110,0.60)",
              }}
            >
              {isSelected ? "✓ Ajouté à ma nuit" : "○ Ajouter à ma nuit"}
            </div>
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontStyle: "italic",
                fontSize: 10,
                color: "rgba(232,221,208,0.40)",
                marginTop: 6,
              }}
            >
              Prix précisé au récapitulatif
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

/* ───────────── Main Step ───────────── */

/* ───────────── Main Step ───────────── */

const Step05_Repas = ({ state, onUpdate, onNext, onPrev }: Step05Props) => {
  const [selectedMenu, setSelectedMenu] = useState<Repas | null>(
    state.repas === "menu2" || state.repas === "menu1" ? state.repas : null
  );
  const [selectedPlat, setSelectedPlat] = useState<string | null>(
    state.repasPlat ?? null
  );
  const [selectedDessert, setSelectedDessert] = useState<string | null>(
    state.repasDessert ?? null
  );
  const NUIT_OPTION_IDS = ["service-bar-2h", "soupe-oignon"];
  const [selectedOptionsNuit, setSelectedOptionsNuit] = useState<string[]>(
    (state.options ?? []).filter((o) => NUIT_OPTION_IDS.includes(o))
  );
  const toggleOptionNuit = (id: string) => {
    setSelectedOptionsNuit((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const [drawerOpen, setDrawerOpen] = useState(false);

  const platRef = useRef<HTMLDivElement>(null);
  const dessertRef = useRef<HTMLDivElement>(null);
  const nuitRef = useRef<HTMLDivElement>(null);
  const recapRef = useRef<HTMLDivElement>(null);

  const handleMenuSelect = (menuId: Repas) => {
    if (selectedMenu !== menuId) {
      setSelectedPlat(null);
      setSelectedDessert(null);
    }
    setSelectedMenu(menuId);
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    const el = ref.current;
    setTimeout(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 350);
  };

  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      window.scrollTo({ top: 0 });
      return;
    }
    if (selectedMenu) scrollToRef(platRef);
  }, [selectedMenu]);

  useEffect(() => {
    if (!didMountRef.current) return;
    if (selectedMenu && selectedPlat) scrollToRef(dessertRef);
  }, [selectedPlat]);

  useEffect(() => {
    if (!didMountRef.current) return;
    if (selectedMenu && selectedPlat && selectedDessert) scrollToRef(nuitRef);
  }, [selectedDessert]);

  const canContinue = !!selectedMenu && !!selectedPlat && !!selectedDessert;

  const handleContinue = () => {
    if (!canContinue) return;
    const otherOptions = (state.options ?? []).filter(
      (o) => !NUIT_OPTION_IDS.includes(o)
    );
    onUpdate({
      repas: selectedMenu!,
      repasEntree: null,
      repasPlat: selectedPlat!,
      repasDessert: selectedDessert!,
      options: [...otherOptions, ...selectedOptionsNuit],
    });
    onNext();
  };

  const currentMenu = menus.find((m) => m.id === selectedMenu) ?? null;
  const currentPlat = currentMenu?.plats.find((p) => p.id === selectedPlat) ?? null;
  const currentDessert = desserts.find((d) => d.id === selectedDessert) ?? null;

  return (
    <div
      className="flex flex-col items-center w-full px-6"
      style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 60, paddingBottom: 120 }}
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
        Étape · Votre table & votre nuit
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
        Votre table<br />et votre nuit.
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
          marginTop: 12,
          marginBottom: 16,
        }}
      >
        J&J Traiteur
      </motion.p>

      <motion.div
        custom={2.5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mb-2"
      >
        <InfoButton
          label="Découvrir le chef"
          onClick={() => setDrawerOpen(true)}
        />
      </motion.div>

      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{ width: 60, height: 1, background: "#c9a96e", margin: "36px auto 40px" }}
      />

      {/* ───── BLOC 1 — MENU ───── */}
      <motion.div
        custom={3.5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full"
        style={{ maxWidth: 1000, marginBottom: 24 }}
      >
        <Eyebrow>01 · Choisissez votre menu</Eyebrow>
      </motion.div>

      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full grid grid-cols-1 md:grid-cols-2"
        style={{ gap: 20, maxWidth: 1000, alignItems: "stretch" }}
      >
        {menus.map((m) => (
          <MenuCard
            key={m.id}
            menu={m}
            isSelected={selectedMenu === m.id}
            selectedPlatId={selectedMenu === m.id ? selectedPlat : null}
            onSelect={() => handleMenuSelect(m.id)}
          />
        ))}
      </motion.div>

      {/* ───── BLOC 2 — PLAT PRINCIPAL ───── */}
      <AnimatePresence>
        {selectedMenu && currentMenu && (
          <motion.div
            ref={platRef}
            key="plat-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="w-full"
            style={{ maxWidth: 1000, marginTop: 80 }}
          >
            <div
              className="flex items-center justify-center"
              style={{ gap: 16, marginBottom: 32 }}
            >
              <div style={{ width: 40, height: 1, background: "#c9a96e" }} />
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.30em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.80)",
                }}
              >
                Au cœur du repas
              </span>
              <div style={{ width: 40, height: 1, background: "#c9a96e" }} />
            </div>

            <Eyebrow>02 · Votre plat principal</Eyebrow>

            <h3
              className="text-center"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: 28,
                color: "#faf8f4",
                lineHeight: 1.2,
                marginTop: 14,
              }}
            >
              Choisissez votre plat
            </h3>
            <p
              className="text-center"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 13,
                color: "rgba(232,221,208,0.65)",
                marginTop: 8,
                marginBottom: 36,
              }}
            >
              Servi à tous vos invités — choisissez celui qui vous ressemble.
            </p>

            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: 16 }}
            >
              {currentMenu.plats.map((p, i) => (
                <PlatCard
                  key={p.id}
                  plat={p}
                  index={i}
                  isSelected={selectedPlat === p.id}
                  onSelect={() => setSelectedPlat(p.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── BLOC 3 — DESSERT ───── */}
      <AnimatePresence>
        {selectedMenu && selectedPlat && (
          <motion.div
            ref={dessertRef}
            key="dessert-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="w-full"
            style={{ maxWidth: 1000, marginTop: 80 }}
          >
            <div
              className="flex items-center justify-center"
              style={{ gap: 16, marginBottom: 32 }}
            >
              <div style={{ width: 40, height: 1, background: "#c9a96e" }} />
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.30em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.80)",
                }}
              >
                Et pour finir
              </span>
              <div style={{ width: 40, height: 1, background: "#c9a96e" }} />
            </div>

            <Eyebrow>03 · Votre dessert</Eyebrow>

            <h3
              className="text-center"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: 28,
                color: "#faf8f4",
                lineHeight: 1.2,
                marginTop: 14,
              }}
            >
              Choisissez votre dessert
            </h3>
            <p
              className="text-center"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 13,
                color: "rgba(232,221,208,0.55)",
                marginTop: 8,
                marginBottom: 36,
              }}
            >
              Servi avec crème anglaise et cascade de fruits
            </p>

            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: 16 }}
            >
              {desserts.map((d) => (
                <DessertCard
                  key={d.id}
                  dessert={d}
                  isSelected={selectedDessert === d.id}
                  onSelect={() => setSelectedDessert(d.id)}
                />
              ))}
            </div>

            {/* Également inclus */}
            <div
              className="flex flex-col items-center"
              style={{ maxWidth: 600, margin: "56px auto 0" }}
            >
              <div
                className="flex items-center justify-center"
                style={{ gap: 14, marginBottom: 20 }}
              >
                <div style={{ width: 30, height: 0.5, background: "rgba(201,169,110,0.40)" }} />
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.30em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.60)",
                  }}
                >
                  Également inclus
                </span>
                <div style={{ width: 30, height: 0.5, background: "rgba(201,169,110,0.40)" }} />
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {[
                  "Plat végétarien disponible (Wellington courge butternut)",
                  "Café, thé, infusions, mignardises en clôture",
                  "Citronnade maison, eaux plate et gazeuse à volonté",
                ].map((line, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 300,
                      fontSize: 13,
                      color: "rgba(232,221,208,0.50)",
                      marginBottom: 8,
                      lineHeight: 1.65,
                    }}
                  >
                    <span style={{ color: "rgba(201,169,110,0.60)", marginRight: 8 }}>◦</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* ─── Allergies & régimes ─── */}
            <div
              style={{
                maxWidth: 600,
                margin: "32px auto 0",
                padding: "20px 28px",
                background: "rgba(201,169,110,0.04)",
                border: "1px solid rgba(201,169,110,0.15)",
                borderRadius: 2,
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(201,169,110,0.60)"
                strokeWidth="1.5"
                style={{ flexShrink: 0, marginTop: 2 }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="8.01" />
                <line x1="12" y1="11" x2="12" y2="16" />
              </svg>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "rgba(232,221,208,0.60)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Allergies, régimes végétariens, casher, halal, sans gluten — nous
                les recueillerons{" "}
                <em style={{ color: "rgba(201,169,110,0.80)", fontStyle: "italic" }}>
                  ensemble
                </em>{" "}
                après signature, lors d'un rendez-vous dédié. Aucun détail à
                préciser maintenant.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── BLOC 4 — VOTRE NUIT ───── */}
      <AnimatePresence>
        {selectedMenu && selectedPlat && selectedDessert && (
          <motion.div
            ref={nuitRef}
            key="nuit-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="w-full"
            style={{ maxWidth: 1000, marginTop: 80 }}
          >
            <div
              className="flex items-center justify-center"
              style={{ gap: 16, marginBottom: 32 }}
            >
              <div style={{ width: 40, height: 1, background: "#c9a96e" }} />
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.30em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.80)",
                }}
              >
                Et pour la nuit
              </span>
              <div style={{ width: 40, height: 1, background: "#c9a96e" }} />
            </div>

            <Eyebrow>04 · Votre nuit</Eyebrow>

            <h3
              className="text-center"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: 28,
                color: "#faf8f4",
                lineHeight: 1.2,
                marginTop: 14,
              }}
            >
              Prolongez la fête
            </h3>
            <p
              className="text-center"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 13,
                color: "rgba(232,221,208,0.65)",
                marginTop: 8,
                marginBottom: 36,
              }}
            >
              Trois prestations J&J pour faire durer la nuit, à votre rythme.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 16 }}>
              {optionsNuit.map((opt) => (
                <OptionNuitCard
                  key={opt.id}
                  option={opt}
                  isSelected={selectedOptionsNuit.includes(opt.id)}
                  onToggle={() => opt.selectable && toggleOptionNuit(opt.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── RÉCAP ───── */}
      <AnimatePresence>
        {canContinue && currentMenu && currentPlat && currentDessert && (
          <motion.div
            ref={recapRef}
            key="recap-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            style={{
              width: "100%",
              maxWidth: 560,
              marginTop: 72,
              padding: "32px 36px",
              background: "rgba(201,169,110,0.05)",
              border: "1px solid rgba(201,169,110,0.20)",
              borderRadius: 2,
            }}
          >
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                letterSpacing: "0.30em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.60)",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              Votre table en un coup d'œil
            </p>

            {[
              { label: "Menu", value: currentMenu.name },
              { label: "Vin d'honneur", value: currentMenu.vh.title },
              { label: "Plat principal", value: currentPlat.nom },
              { label: "Dessert", value: currentDessert.name },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className="flex items-center justify-between"
                style={{
                  padding: "14px 0",
                  borderBottom:
                    i < arr.length - 1
                      ? "1px solid rgba(201,169,110,0.15)"
                      : "none",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 12,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(232,221,208,0.40)",
                    flexShrink: 0,
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 16,
                    color: "#faf8f4",
                    textAlign: "right",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}

            {/* Section VOTRE NUIT dans le récap */}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(201,169,110,0.20)" }}>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.30em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.60)",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                Votre nuit
              </p>
              {[
                { label: "Bar de nuit installé", tag: "Inclus", show: true },
                { label: "Service bar 2 heures", tag: "Prestige", show: selectedOptionsNuit.includes("service-bar-2h") },
                { label: "Soupe à l'oignon", tag: "Prestige", show: selectedOptionsNuit.includes("soupe-oignon") },
              ]
                .filter((r) => r.show)
                .map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between"
                    style={{ padding: "10px 0", gap: 16 }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic",
                        fontSize: 15,
                        color: "#faf8f4",
                      }}
                    >
                      <span style={{ color: "rgba(201,169,110,0.70)", marginRight: 10 }}>✓</span>
                      {r.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontStyle: "italic",
                        fontSize: 11,
                        color: "rgba(201,169,110,0.50)",
                      }}
                    >
                      ({r.tag})
                    </span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div
        className="flex items-center justify-between w-full mt-16"
        style={{ maxWidth: 620, gap: 16 }}
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
          disabled={!canContinue}
          className="transition-all duration-300"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            fontSize: 13,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            border: canContinue
              ? "1px solid #c9a96e"
              : "1px solid rgba(201,169,110,0.35)",
            background: "transparent",
            color: canContinue ? "#c9a96e" : "rgba(201,169,110,0.50)",
            padding: "18px 40px",
            borderRadius: 0,
            cursor: canContinue ? "pointer" : "not-allowed",
            opacity: canContinue ? 1 : 0.5,
          }}
          whileHover={
            canContinue ? { backgroundColor: "#c9a96e", color: "#1a1612" } : {}
          }
        >
          {canContinue ? "Ma table est prête — Continuer" : "Continuer"}
        </motion.button>
      </div>

      <PresentationDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        content={drawerRepas}
      />
    </div>
  );
};

export default Step05_Repas;
