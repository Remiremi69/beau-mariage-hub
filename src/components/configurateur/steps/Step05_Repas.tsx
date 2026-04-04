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

interface Dish {
  id: string;
  name: string;
  description: string;
  detail: string;
  tag: string;
  tagColor: TagColor;
  imagePlaceholder: string;
}

// ── Data ──

const entrees: Dish[] = [
  { id: "entree-1", name: "Velouté de courge rôtie", description: "Crème légère, huile de noisette,\ncopeaux de châtaigne torréfiée", detail: "Courge butternut du domaine · Noisettes du Piémont\nBouillon de légumes maison", tag: "Végétarien", tagColor: "vert", imagePlaceholder: "PHOTO DU PLAT À VENIR" },
  { id: "entree-2", name: "Tartare de saumon fumé", description: "Avocat, câpres, zeste de citron vert,\ncroustillant de sarrasin", detail: "Saumon fumé artisanal · Avocat du commerce équitable\nHuile d'olive AOC", tag: "Signature", tagColor: "or", imagePlaceholder: "PHOTO DU PLAT À VENIR" },
  { id: "entree-3", name: "Terrine de foie gras maison", description: "Chutney de figues au Beaujolais,\ntoast brioché, fleur de sel", detail: "Foie gras du Sud-Ouest · Figues séchées du Var\nBeaujolais Villages du domaine voisin", tag: "Terroir", tagColor: "or", imagePlaceholder: "PHOTO DU PLAT À VENIR" },
];

const plats: Dish[] = [
  { id: "plat-1", name: "Filet de bœuf Rossini", description: "Médaillon de foie gras poêlé, sauce Périgueux,\npommes dauphine, haricots verts", detail: "Bœuf charolais élevé sous la mère · Foie gras du Périgord\nTruffe noire de saison · Jus corsé au Madère", tag: "Signature", tagColor: "or", imagePlaceholder: "PHOTO DU PLAT À VENIR" },
  { id: "plat-2", name: "Suprême de volaille fermière", description: "Farce fine aux herbes, jus de volaille réduit,\nrisotto crémeux aux cèpes", detail: "Volaille fermière Label Rouge · Cèpes du Beaujolais\nRiz Carnaroli · Parmesan 24 mois", tag: "Terroir", tagColor: "or", imagePlaceholder: "PHOTO DU PLAT À VENIR" },
  { id: "plat-3", name: "Pavé de cabillaud sauvage", description: "Écrasé de pommes de terre à l'huile d'olive,\nvierge de tomates confites, beurre blanc", detail: "Cabillaud de ligne MSC · Pommes de terre ratte\nTomates confites maison · Citron de Menton", tag: "Légèreté", tagColor: "blanc", imagePlaceholder: "PHOTO DU PLAT À VENIR" },
];

const desserts: Dish[] = [
  { id: "dessert-1", name: "Pièce montée choux revisitée", description: "Choux à la crème vanille Bourbon,\ncaramel beurre salé, décor en sucre filé", detail: "Vanille Bourbon de Madagascar · Beurre AOP Charentes\nSucre artisanal · Pièce montée sur-mesure", tag: "Signature", tagColor: "or", imagePlaceholder: "PHOTO DU PLAT À VENIR" },
  { id: "dessert-2", name: "Entremets Beaujolais", description: "Mousse légère au Gamay, gelée de raisins,\nbiscuit amande, éclats de chocolat noir", detail: "Gamay du Beaujolais Villages · Chocolat Valrhona 70%\nAmandes de Provence · Raisins du domaine", tag: "Terroir", tagColor: "or", imagePlaceholder: "PHOTO DU PLAT À VENIR" },
  { id: "dessert-3", name: "Vacherin glacé aux fruits rouges", description: "Meringue croustillante, glace vanille maison,\ncoulis de framboise, fruits frais de saison", detail: "Framboises et fraises du Val de Saône · Meringue française\nGlace turbinée sur place · Fruits de saison", tag: "Légèreté", tagColor: "blanc", imagePlaceholder: "PHOTO DU PLAT À VENIR" },
];

// ── Tag styles ──

const tagStyles: Record<TagColor, React.CSSProperties> = {
  or: { border: "1px solid rgba(201,169,110,0.50)", color: "rgba(201,169,110,0.85)", background: "rgba(201,169,110,0.08)" },
  vert: { border: "1px solid rgba(80,140,80,0.50)", color: "rgba(120,180,100,0.85)", background: "rgba(80,140,80,0.08)" },
  blanc: { border: "1px solid rgba(232,221,208,0.30)", color: "rgba(232,221,208,0.65)", background: "transparent" },
};

// ── Placeholder icon ──

const PlaceholderIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="rgba(201,169,110,0.20)" strokeWidth="1.5">
    <rect x="2" y="2" width="28" height="28" rx="1" />
    <line x1="2" y1="2" x2="30" y2="30" />
  </svg>
);

// ── DishCard ──

const DishCard = ({ dish, isSelected, onSelect }: { dish: Dish; isSelected: boolean; onSelect: () => void }) => (
  <div
    onClick={onSelect}
    className="flex flex-col overflow-hidden transition-all duration-[250ms]"
    style={{
      borderRadius: 2,
      border: isSelected ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.15)",
      background: isSelected ? "rgba(201,169,110,0.06)" : "rgba(26,22,18,0.40)",
      cursor: "pointer",
      minHeight: window.innerWidth >= 768 ? 320 : "auto",
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
      data-photo-slot={dish.id}
      className="relative flex flex-col items-center justify-center"
      style={{
        height: window.innerWidth >= 768 ? 160 : 140,
        background: isSelected ? "rgba(201,169,110,0.10)" : "rgba(201,169,110,0.06)",
        borderBottom: "1px solid rgba(201,169,110,0.10)",
        transition: "background 0.25s",
      }}
    >
      <PlaceholderIcon />
      <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.25)", marginTop: 8 }}>
        {dish.imagePlaceholder}
      </span>
      {/* Tag */}
      <span className="absolute top-3 right-3" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.15em", padding: "4px 10px", borderRadius: 1, ...tagStyles[dish.tagColor] }}>
        {dish.tag}
      </span>
    </div>

    {/* Text zone */}
    <div className="flex flex-col flex-1 relative" style={{ padding: "20px 20px 24px" }}>
      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 20, color: isSelected ? "#c9a96e" : "#faf8f4", lineHeight: 1.2, marginBottom: 8, transition: "color 0.25s" }}>
        {dish.name}
      </h4>
      <p className="whitespace-pre-line" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.55)", lineHeight: 1.65, marginBottom: 12 }}>
        {dish.description}
      </p>
      <p className="whitespace-pre-line" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 12, color: "rgba(232,221,208,0.35)", lineHeight: 1.6, fontStyle: "italic", borderTop: "1px solid rgba(201,169,110,0.08)", paddingTop: 10, marginTop: "auto" }}>
        {dish.detail}
      </p>
      {isSelected && (
        <div className="absolute bottom-4 right-4" style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a96e" }} />
      )}
    </div>
  </div>
);

// ── CourseSection ──

interface CourseSectionProps {
  courseLabel: string;
  courseIndex: number;
  dishes: Dish[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const CourseSection = ({ courseLabel, courseIndex, dishes, selectedId, onSelect }: CourseSectionProps) => (
  <div className="relative w-full mb-12">
    {/* Decorative number */}
    <span className="absolute -left-2 md:left-0 top-0 select-none pointer-events-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 72, color: "rgba(201,169,110,0.12)", lineHeight: 1 }}>
      {String(courseIndex).padStart(2, "0")}
    </span>

    {/* Label */}
    <p className="ml-16 md:ml-20" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,169,110,0.70)" }}>
      {courseLabel}
    </p>

    {/* Line */}
    <div className="w-full mt-4 mb-8" style={{ height: 1, background: "rgba(201,169,110,0.15)" }} />

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} isSelected={selectedId === dish.id} onSelect={() => onSelect(dish.id)} />
      ))}
    </div>
  </div>
);

// ── Fade variant ──

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" } }),
};

// ── Main ──

const Step05_Repas = ({ state, onUpdate, onNext, onPrev }: Step05Props) => {
  const [selectedEntree, setSelectedEntree] = useState<string | null>(state.repasEntree);
  const [selectedPlat, setSelectedPlat] = useState<string | null>(state.repasPlat);
  const [selectedDessert, setSelectedDessert] = useState<string | null>(state.repasDessert);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const chosenCount = [selectedEntree, selectedPlat, selectedDessert].filter(Boolean).length;
  const allChosen = chosenCount === 3;
  const remaining = 3 - chosenCount;

  const entreeName = entrees.find((d) => d.id === selectedEntree)?.name ?? null;
  const platName = plats.find((d) => d.id === selectedPlat)?.name ?? null;
  const dessertName = desserts.find((d) => d.id === selectedDessert)?.name ?? null;

  const handleContinue = () => {
    if (!allChosen) return;
    onUpdate({ repasEntree: selectedEntree, repasPlat: selectedPlat, repasDessert: selectedDessert });
    onNext();
  };

  return (
    <div className="flex flex-col items-center w-full px-6" style={{ maxWidth: 740, margin: "0 auto", paddingTop: 60, paddingBottom: 120 }}>
      {/* Header */}
      <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
        Étape 5 · Le repas
      </motion.p>

      <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp}
        className="text-center mt-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
        La table<br />que vous méritez.
      </motion.h2>

      <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
        className="text-center"
        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 500, marginBottom: 16 }}>
        Notre chef compose un menu de saison, ancré dans le terroir beaujolais. Choisissez un plat par service — votre menu sera unique.
      </motion.p>

      <motion.p custom={3} initial="hidden" animate="visible" variants={fadeUp}
        className="text-center"
        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(201,169,110,0.60)", letterSpacing: "0.15em" }}>
        ENTRÉE · PLAT · DESSERT · CAFÉ & MIGNARDISES INCLUS
      </motion.p>

      <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
        style={{ width: 60, height: 1, background: "#c9a96e", margin: "36px auto 52px" }} />

      {/* Sections */}
      <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="w-full">
        <CourseSection courseLabel="L'ENTRÉE" courseIndex={1} dishes={entrees} selectedId={selectedEntree} onSelect={setSelectedEntree} />
      </motion.div>

      <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp} className="w-full">
        <CourseSection courseLabel="LE PLAT" courseIndex={2} dishes={plats} selectedId={selectedPlat} onSelect={setSelectedPlat} />
      </motion.div>

      <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp} className="w-full">
        <CourseSection courseLabel="LE DESSERT" courseIndex={3} dishes={desserts} selectedId={selectedDessert} onSelect={setSelectedDessert} />
      </motion.div>

      {/* Récap */}
      <AnimatePresence>
        {chosenCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5 }}
            className="w-full"
            style={{ maxWidth: 520, margin: "0 auto", padding: "28px 32px", background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.20)", borderRadius: 2 }}
          >
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.30em", textTransform: "uppercase", color: "rgba(201,169,110,0.60)", marginBottom: 20 }}>
              Votre menu
            </p>

            {([["Entrée", entreeName], ["Plat", platName], ["Dessert", dessertName]] as const).map(([label, name], i) => (
              <div key={label} className="flex items-center justify-between" style={{ padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(201,169,110,0.08)" : "none" }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,221,208,0.40)" }}>
                  {label}
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic", fontSize: 16, color: name ? "#faf8f4" : "rgba(232,221,208,0.25)" }}>
                  {name ?? "—"}
                </span>
              </div>
            ))}

            <p className="text-center" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.35)", marginTop: 16 }}>
              + Café, thé & mignardises maison — inclus
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between w-full mt-12" style={{ maxWidth: 480 }}>
        <button onClick={onPrev} className="transition-colors duration-200"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.2em", color: "rgba(232,221,208,0.40)", background: "transparent", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.70)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.40)"; }}>
          ← RETOUR
        </button>

        <div className="flex flex-col items-center">
          <motion.button
            onClick={handleContinue}
            disabled={chosenCount === 0}
            className="transition-colors duration-300"
            style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13,
              letterSpacing: "0.25em", textTransform: "uppercase",
              border: "1px solid #c9a96e", background: "transparent",
              color: "#c9a96e", padding: "18px 56px", borderRadius: 0,
              cursor: allChosen ? "pointer" : chosenCount > 0 ? "pointer" : "not-allowed",
              opacity: allChosen ? 1 : chosenCount > 0 ? 0.6 : 0.35,
            }}
            whileHover={allChosen ? { backgroundColor: "#c9a96e", color: "#1a1612" } : {}}
          >
            {allChosen ? "Mon menu est prêt — Continuer" : "Continuer"}
          </motion.button>
          {!allChosen && chosenCount > 0 && (
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, color: "rgba(232,221,208,0.35)", marginTop: 8 }}>
              Encore {remaining} choix
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step05_Repas;
