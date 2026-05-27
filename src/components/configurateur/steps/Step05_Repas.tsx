import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfigurateurState, Repas } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerRepas } from "../drawerContents";
import menuTraditionImg from "@/assets/menu-automne-charolais.jpg";
import menuSignatureImg from "@/assets/menu-nocturne-royal.jpg";
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

interface MenuDef {
  id: Repas;
  number: string;
  name: string;
  image: string;
  accroche: string;
  platSignature: { title: string; subtitle: string };
  inclusBullets: string[];
  full: {
    vinHonneur: string;
    cocktailTitle: string;
    cocktail: string;
    plats: string[];
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
    platSignature: {
      title: "Cœur de rumsteak sauce vigneronne",
      subtitle: "Wok de légumes · gratin dauphinois",
    },
    inclusBullets: [
      "Vin d'honneur Crémant de Bourgogne",
      "Cocktail 8 pièces (lyonnaises)",
      "Plateau de fromages du Beaujolais",
    ],
    full: {
      vinHonneur: "Crémant de Bourgogne · Kir (4 choix de sirop)",
      cocktailTitle: "Cocktail · 8 pièces",
      cocktail:
        "Plancha poulet sauce Bresse · Feuilleté 3 goûts (anchois / fromage / olive) · " +
        "Escargots persillade · Cervelle de canut · Crêpes truite fumée · " +
        "Pruneaux lard fumé · Tarte à l'oignon · Burger bœuf · " +
        "Crostini caviar d'aubergine poivron confit",
      plats: [
        "Cœur de rumsteak sauce vigneronne, wok légumes, gratin dauphinois",
        "Quenelle Saint-Jacques mousseline, sauce bouillabaisse, riz gourmand",
      ],
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
    platSignature: {
      title: "Poulet fermier crème de morilles",
      subtitle: "Pommes boulangère · wok de légumes",
    },
    inclusBullets: [
      "Vin d'honneur Punch citron vert gingembre",
      "Cocktail 8 pièces (signature)",
      "Plateau de fromages affinés",
    ],
    full: {
      vinHonneur: "Punch citron vert · Gingembre · Coriandre",
      cocktailTitle: "Cocktail · 8 pièces",
      cocktail:
        "Plancha gambas snackées marmelade mangue safran · Rouleau d'aubergine · " +
        "Mini-cannelés chorizo crème d'aneth · Velouté courge émulsion chèvre frais noisette · " +
        "Verrine guacamole crevette · Croque monsieur jambon truffé · " +
        "Brochette canard mangue miel orange · Œuf brouillé saumon fumé et œufs de saumon",
      plats: [
        "Poulet fermier crème morilles, pommes boulangère, wok légumes",
        "Pavé saumon laqué japonais, riz gourmand, wok légumes",
      ],
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

/* ───────────── Menu Card ───────────── */

const MenuCard = ({
  menu,
  isSelected,
  onSelect,
}: {
  menu: MenuDef;
  isSelected: boolean;
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

          {/* Separator */}
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
              Le plat signature
            </span>
            <div style={{ flex: 1, height: 0.5, background: "rgba(201,169,110,0.20)" }} />
          </div>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              color: "#faf8f4",
              lineHeight: 1.3,
              marginBottom: 4,
            }}
          >
            {menu.platSignature.title}
          </p>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 12,
              color: "rgba(232,221,208,0.55)",
              marginBottom: 6,
            }}
          >
            {menu.platSignature.subtitle}
          </p>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              color: "rgba(232,221,208,0.40)",
              fontStyle: "italic",
              marginBottom: 20,
            }}
          >
            Second choix de plat possible le Jour J
          </p>

          {/* Micro separator */}
          <div
            style={{
              width: 30,
              height: 0.5,
              background: "rgba(201,169,110,0.40)",
              margin: "0 0 16px",
            }}
          />

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
            {menu.inclusBullets.map((b, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "rgba(232,221,208,0.65)",
                  paddingLeft: 16,
                  position: "relative",
                  marginBottom: 6,
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    color: "rgba(201,169,110,0.75)",
                  }}
                >
                  +
                </span>
                {b}
              </li>
            ))}
          </ul>
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
          {expanded ? "Réduire ↑" : "Voir le menu complet ↓"}
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
                <Section title="Plat au choix le Jour J">
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {menu.full.plats.map((p, i) => (
                      <li
                        key={i}
                        style={{
                          paddingLeft: 14,
                          position: "relative",
                          marginBottom: 4,
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: "rgba(201,169,110,0.60)",
                          }}
                        >
                          →
                        </span>
                        {p}
                      </li>
                    ))}
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

/* ───────────── Dessert Card ───────────── */

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

/* ───────────── Main Step ───────────── */

const Step05_Repas = ({ state, onUpdate, onNext, onPrev }: Step05Props) => {
  const [selectedMenu, setSelectedMenu] = useState<Repas | null>(
    state.repas === "menu2" || state.repas === "menu1" ? state.repas : null
  );
  const [selectedDessert, setSelectedDessert] = useState<string | null>(
    state.repasDessert ?? null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dessertRef = useRef<HTMLDivElement>(null);
  const recapRef = useRef<HTMLDivElement>(null);

  // Smooth scroll when blocs unlock
  useEffect(() => {
    if (selectedMenu && dessertRef.current) {
      const el = dessertRef.current;
      setTimeout(() => {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 350);
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedMenu && selectedDessert && recapRef.current) {
      const el = recapRef.current;
      setTimeout(() => {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 350);
    }
  }, [selectedDessert, selectedMenu]);

  const canContinue = !!selectedMenu && !!selectedDessert;

  const handleContinue = () => {
    if (!canContinue) return;
    onUpdate({
      repas: selectedMenu!,
      repasEntree: null,
      repasPlat: null,
      repasDessert: selectedDessert!,
    });
    onNext();
  };

  const currentMenu = menus.find((m) => m.id === selectedMenu) ?? null;
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
        Étape · Vin d'honneur & Table
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
        Votre vin d'honneur<br />et votre table.
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
            onSelect={() => setSelectedMenu(m.id)}
          />
        ))}
      </motion.div>

      {/* ───── BLOC 2 — DESSERT ───── */}
      <AnimatePresence>
        {selectedMenu && (
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
            {/* Decorative separator */}
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

            <Eyebrow>02 · Votre dessert</Eyebrow>

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
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── BLOC 3 — RÉCAP ───── */}
      <AnimatePresence>
        {selectedMenu && selectedDessert && currentMenu && currentDessert && (
          <motion.div
            ref={recapRef}
            key="recap-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            style={{
              width: "100%",
              maxWidth: 520,
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
              { label: "Plat signature", value: currentMenu.platSignature.title },
              { label: "Dessert", value: currentDessert.name },
              { label: "Vin d'honneur", value: "Inclus dans le menu" },
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
            border: "1px solid #c9a96e",
            background: "transparent",
            color: "#c9a96e",
            padding: "18px 40px",
            borderRadius: 0,
            cursor: canContinue ? "pointer" : "not-allowed",
            opacity: canContinue ? 1 : 0.4,
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
