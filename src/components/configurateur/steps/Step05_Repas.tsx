import { useState } from "react";
import { motion } from "framer-motion";
import { ConfigurateurState, Repas } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerRepas } from "../drawerContents";
import menuTraditionImg from "@/assets/menu-automne-charolais.jpg";
import menuSignatureImg from "@/assets/menu-nocturne-royal.jpg";

interface Step05Props {
  state: ConfigurateurState;
  onUpdate: (partial: Partial<ConfigurateurState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface MenuDef {
  id: Repas;
  name: string;
  image: string;
  vinHonneur: string;
  cocktailTitle: string;
  cocktail: string;
  plat: string[];
  fromages: string;
}

const menus: MenuDef[] = [
  {
    id: "menu1",
    name: "Tradition Beaujolais",
    image: menuTraditionImg,
    vinHonneur: "Crémant de Bourgogne · Kir (4 choix de sirop)",
    cocktailTitle: "Cocktail — 8 pièces",
    cocktail:
      "Plancha poulet sauce Bresse · Feuilleté 3 goûts (anchois / fromage / olive) · " +
      "Escargots persillade · Cervelle de canut · Crêpes truite fumée · " +
      "Pruneaux lard fumé · Tarte à l'oignon · Burger bœuf · " +
      "Crostini caviar d'aubergine poivron confit",
    plat: [
      "Cœur de rumsteak sauce vigneronne, wok légumes, gratin dauphinois",
      "Quenelle Saint-Jacques mousseline, sauce bouillabaisse, riz gourmand",
    ],
    fromages:
      "Saint-marcellin · Fourme d'Ambert · Chèvre mariné huile et herbes · Pain aux fruits",
  },
  {
    id: "menu2",
    name: "Signature Limen",
    image: menuSignatureImg,
    vinHonneur: "Punch citron vert · Gingembre · Coriandre",
    cocktailTitle: "Cocktail — 8 pièces",
    cocktail:
      "Plancha gambas snackées marmelade mangue safran · Rouleau d'aubergine · " +
      "Mini-cannelés chorizo crème d'aneth · Velouté courge émulsion chèvre frais noisette · " +
      "Verrine guacamole crevette · Croque monsieur jambon truffé · " +
      "Brochette canard mangue miel orange · Œuf brouillé saumon fumé et œufs de saumon",
    plat: [
      "Poulet fermier crème morilles, pommes boulangère, wok légumes",
      "Pavé saumon laqué japonais, riz gourmand, wok légumes",
    ],
    fromages:
      "Saint-marcellin · Fourme d'Ambert · Chèvre mariné · Fromage blanc coulis",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
  }),
};

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

const MenuCard = ({
  menu,
  isSelected,
  onSelect,
}: {
  menu: MenuDef;
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
      className="relative overflow-hidden"
      style={{
        height: 220,
        borderBottom: "1px solid rgba(201,169,110,0.10)",
      }}
    >
      <img
        src={menu.image}
        alt={menu.name}
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center 60%" }}
      />
      {/* Inclus badge */}
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
    <div className="flex flex-col flex-1" style={{ padding: "24px 22px 28px" }}>
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
        Menu {menu.id === "menu1" ? "1" : "2"}
      </p>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: 26,
          color: "#faf8f4",
          lineHeight: 1.15,
          marginBottom: 20,
        }}
      >
        {menu.name}
      </p>

      <div
        style={{
          height: 0.5,
          background: "rgba(201,169,110,0.15)",
          marginBottom: 20,
        }}
      />

      <Section title="Vin d'honneur">{menu.vinHonneur}</Section>
      <Section title={menu.cocktailTitle}>{menu.cocktail}</Section>
      <Section title="Plat — au choix le jour J">
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menu.plat.map((p, i) => (
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
      <Section title="Fromages">{menu.fromages}</Section>

      {/* Selected dot */}
      {isSelected && (
        <div
          style={{
            marginTop: 8,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#c9a96e",
            alignSelf: "flex-end",
          }}
        />
      )}
    </div>
  </div>
);

const Step05_Repas = ({ state, onUpdate, onNext, onPrev }: Step05Props) => {
  const [selected, setSelected] = useState<Repas>(
    state.repas === "menu2" ? "menu2" : "menu1"
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleContinue = () => {
    onUpdate({
      repas: selected,
      repasEntree: null,
      repasPlat: null,
      repasDessert: null,
    });
    onNext();
  };

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
        Étape · Votre menu
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
        Votre menu.
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
        J&J Traiteur — Terroir Beaujolais
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

      {/* Menu cards */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full flex flex-col md:flex-row"
        style={{ gap: 20, maxWidth: 1000, alignItems: "stretch" }}
      >
        {menus.map((m) => (
          <MenuCard
            key={m.id}
            menu={m}
            isSelected={selected === m.id}
            onSelect={() => setSelected(m.id)}
          />
        ))}
      </motion.div>

      {/* Commun aux deux menus */}
      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full"
        style={{
          maxWidth: 1000,
          marginTop: 40,
          padding: "32px 36px",
          background: "rgba(26,22,18,0.50)",
          border: "1px solid rgba(201,169,110,0.15)",
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
          Commun aux deux menus
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 24 }}>
          <Section title="Dessert">
            Au choix parmi : Royal chocolat feuillantine · Tarte tatin caramel
            pommes crème de Bresse · Fraisier mascarpone citron vert basilic
            <br />
            <span style={{ color: "rgba(232,221,208,0.50)", fontStyle: "italic" }}>
              Servi avec crème anglaise et cascade de fruits.
            </span>
          </Section>
          <Section title="Plat végétarien disponible">
            Wellington courge butternut, épinard, champignons, sauce bourguignonne.
          </Section>
          <Section title="Inclus systématiquement">
            Café · Thé · Infusions · Mignardises
          </Section>
          <Section title="Boissons">
            Citronnade maison menthe · Eau aromatisée · Eau plate · Eau gazeuse
          </Section>
        </div>
      </motion.div>

      {/* Navigation */}
      <div
        className="flex items-center justify-between w-full mt-12"
        style={{ maxWidth: 480 }}
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
          Continuer
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
