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

interface VHItem {
  id: string;
  name: string;
  description: string;
  detail: string;
  tag: string;
  tagColor: TagColor;
  imagePlaceholder: string;
  imageUrl?: string;
}

// ── Data ──

const boucheesSalees: VHItem[] = [
  { id: "vh-salé-1", name: "Classique Terroir", description: "Canapés au foie gras, verrines avocat-crevettes,\nmini-brochettes de bœuf charolais", detail: "Foie gras du Sud-Ouest · Bœuf charolais local\nLégumes du jardin · Pain de campagne maison", tag: "Terroir", tagColor: "or", imagePlaceholder: "BOUCHÉES À VENIR" },
  { id: "vh-salé-2", name: "Mer & Jardin", description: "Blinis saumon fumé, verrines de crevettes,\ntartines tapenade & tomates confites", detail: "Saumon fumé artisanal · Crevettes MSC\nTomates confites maison · Olives AOC", tag: "Légèreté", tagColor: "blanc", imagePlaceholder: "BOUCHÉES À VENIR" },
  { id: "vh-salé-3", name: "Prestige Beaujolais", description: "Verrines de foie gras en gelée de Beaujolais,\nmini-tartines truffe & parmesan, huîtres fraîches", detail: "Foie gras · Truffe noire de saison\nHuîtres Gillardeau · Beaujolais Villages en gelée", tag: "Prestige", tagColor: "or", imagePlaceholder: "BOUCHÉES À VENIR" },
];

const animations: VHItem[] = [
  { id: "vh-anim-1", name: "Jambon Ibérique à la coupe", description: "Jambon Pata Negra découpé en direct\ndevant les invités, pain cristal & tomate", detail: "Jambon Ibérique Bellota 36 mois\nPain cristal catalan · Tomates grappe\nCouteau et trancheuse de boucher", tag: "Signature", tagColor: "or", imagePlaceholder: "ANIMATION À VENIR" },
  { id: "vh-anim-2", name: "Bar à Huîtres", description: "Huîtres ouvertes minute sur lit de glace,\nmignonette, citron & pain au levain", detail: "Huîtres de Bretagne n°3 · Citrons de Menton\nPain au levain maison · Beurre AOC Charentes\nOstréiculteur partenaire", tag: "Terroir", tagColor: "or", imagePlaceholder: "ANIMATION À VENIR" },
  { id: "vh-anim-3", name: "Plancha Méditerranéenne", description: "Gambas, légumes grillés & fromages chauds\ncuisinés en direct sur plancha au feu de bois", detail: "Gambas sauvages · Légumes de saison\nFromages régionaux · Herbes fraîches du jardin\nCuisiné minute sous vos yeux", tag: "Convivial", tagColor: "vert", imagePlaceholder: "ANIMATION À VENIR" },
];

const mignardises: VHItem[] = [
  { id: "vh-sucré-1", name: "Classique Français", description: "Macarons, mini-éclairs au chocolat,\nchoux à la crème & cannelés bordelais", detail: "Macarons garnis à la commande\nChocolat Valrhona · Crème pâtissière vanille\nCannelés cuits le matin même", tag: "Signature", tagColor: "or", imagePlaceholder: "MIGNARDISES À VENIR" },
  { id: "vh-sucré-2", name: "Terroir Beaujolais", description: "Bugnes lyonnaises, tartelettes aux fruits rouges,\nbrioche perdue au Gamay & tuiles aux amandes", detail: "Bugnes tradition lyonnaise · Fruits rouges du Val de Saône\nGamay du Beaujolais · Amandes de Provence\nRecettes du chef pâtissier", tag: "Terroir", tagColor: "or", imagePlaceholder: "MIGNARDISES À VENIR" },
  { id: "vh-sucré-3", name: "Gourmandise Libre", description: "Bar à mignardises en libre-service :\nchocolats, fruits frais, guimauves & douceurs", detail: "Chocolats Bernachon (Lyon) · Fruits de saison\nGuimauves artisanales · Nougats de Montélimar\nPrésentés sur plateaux en ardoise", tag: "Festif", tagColor: "vert", imagePlaceholder: "MIGNARDISES À VENIR" },
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

// ── VHCard ──

const VHCard = ({ item, isSelected, onSelect }: { item: VHItem; isSelected: boolean; onSelect: () => void }) => (
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
      data-photo-slot={item.id}
      className="relative flex flex-col items-center justify-center"
      style={{
        height: window.innerWidth >= 768 ? 160 : 130,
        background: isSelected ? "rgba(201,169,110,0.10)" : "rgba(201,169,110,0.06)",
        borderBottom: "1px solid rgba(201,169,110,0.10)",
        transition: "background 0.25s",
      }}
    >
      {item.imageUrl ? (
        <img src={item.imageUrl} alt={item.name} className="w-full h-full" style={{ objectFit: "cover" }} />
      ) : (
        <>
          <PlaceholderIcon />
          <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.25)", marginTop: 8 }}>
            {item.imagePlaceholder}
          </span>
        </>
      )}
      {/* Tag */}
      <span className="absolute top-3 right-3" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.15em", padding: "4px 10px", borderRadius: 1, ...tagStyles[item.tagColor] }}>
        {item.tag}
      </span>
    </div>

    {/* Text zone */}
    <div className="flex flex-col flex-1 relative" style={{ padding: "20px 20px 24px" }}>
      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 20, color: isSelected ? "#c9a96e" : "#faf8f4", lineHeight: 1.2, marginBottom: 8, transition: "color 0.25s" }}>
        {item.name}
      </h4>
      <p className="whitespace-pre-line" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.55)", lineHeight: 1.65, marginBottom: 12 }}>
        {item.description}
      </p>
      <p className="whitespace-pre-line" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 12, color: "rgba(232,221,208,0.35)", lineHeight: 1.6, fontStyle: "italic", borderTop: "1px solid rgba(201,169,110,0.08)", paddingTop: 10, marginTop: "auto" }}>
        {item.detail}
      </p>
      {isSelected && (
        <div className="absolute bottom-4 right-4" style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a96e" }} />
      )}
    </div>
  </div>
);

// ── VHSection ──

interface VHSectionProps {
  sectionLabel: string;
  sectionIndex: number;
  items: VHItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const VHSection = ({ sectionLabel, sectionIndex, items, selectedId, onSelect }: VHSectionProps) => (
  <div className="relative w-full mb-12">
    <span className="absolute -left-2 md:left-0 top-0 select-none pointer-events-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 72, color: "rgba(201,169,110,0.12)", lineHeight: 1 }}>
      {String(sectionIndex).padStart(2, "0")}
    </span>
    <p className="ml-16 md:ml-20" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,169,110,0.70)" }}>
      {sectionLabel}
    </p>
    <div className="w-full mt-4 mb-8" style={{ height: 1, background: "rgba(201,169,110,0.15)" }} />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
      {items.map((item) => (
        <VHCard key={item.id} item={item} isSelected={selectedId === item.id} onSelect={() => onSelect(item.id)} />
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

const Step04_VinDhonneur = ({ state, onUpdate, onNext, onPrev }: Step04Props) => {
  const [selectedBouchee, setSelectedBouchee] = useState<string | null>(state.vhBouchee);
  const [selectedAnimation, setSelectedAnimation] = useState<string | null>(state.vhAnimation);
  const [selectedMignardise, setSelectedMignardise] = useState<string | null>(state.vhMignardise);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const chosenCount = [selectedBouchee, selectedAnimation, selectedMignardise].filter(Boolean).length;
  const allChosen = chosenCount === 3;
  const remaining = 3 - chosenCount;

  const boucheeName = boucheesSalees.find((d) => d.id === selectedBouchee)?.name ?? null;
  const animationName = animations.find((d) => d.id === selectedAnimation)?.name ?? null;
  const mignardiseName = mignardises.find((d) => d.id === selectedMignardise)?.name ?? null;

  const handleContinue = () => {
    onUpdate({ vhBouchee: selectedBouchee, vhAnimation: selectedAnimation, vhMignardise: selectedMignardise });
    onNext();
  };

  return (
    <div className="flex flex-col items-center w-full px-6" style={{ maxWidth: 740, margin: "0 auto", paddingTop: 60, paddingBottom: 120 }}>
      {/* Header */}
      <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
        Étape 4 · Le vin d'honneur
      </motion.p>

      <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp}
        className="text-center mt-6"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
        Le premier verre<br />ensemble.
      </motion.h2>

      <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
        className="text-center"
        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 520, marginBottom: 16 }}>
        Le vin d'honneur, c'est le moment où tout le monde se retrouve après la cérémonie. 1h30 dans les jardins du domaine, debout, coupe en main — avant de passer à table. Composez-le comme vous l'imaginez.
      </motion.p>

      <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp} className="mb-2">
        <InfoButton label="Rencontrer notre sommelier" onClick={() => setDrawerOpen(true)} />
      </motion.div>

      <motion.p custom={3} initial="hidden" animate="visible" variants={fadeUp}
        className="text-center"
        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(201,169,110,0.60)", letterSpacing: "0.15em" }}>
        BOUCHÉES SALÉES · ANIMATION · MIGNARDISES · CHAMPAGNE & VINS BEAUJOLAIS INCLUS
      </motion.p>

      <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
        style={{ width: 60, height: 1, background: "#c9a96e", margin: "36px auto 52px" }} />

      {/* Sections */}
      <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="w-full">
        <VHSection sectionLabel="LES BOUCHÉES SALÉES" sectionIndex={1} items={boucheesSalees} selectedId={selectedBouchee} onSelect={setSelectedBouchee} />
      </motion.div>

      <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp} className="w-full">
        <VHSection sectionLabel="L'ANIMATION CULINAIRE" sectionIndex={2} items={animations} selectedId={selectedAnimation} onSelect={setSelectedAnimation} />
      </motion.div>

      <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp} className="w-full">
        <VHSection sectionLabel="LES MIGNARDISES SUCRÉES" sectionIndex={3} items={mignardises} selectedId={selectedMignardise} onSelect={setSelectedMignardise} />
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
              Votre vin d'honneur
            </p>

            {([["Bouchées", boucheeName], ["Animation", animationName], ["Mignardises", mignardiseName]] as const).map(([label, name], i) => (
              <div key={label} className="flex items-center justify-between" style={{ padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(201,169,110,0.08)" : "none" }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,221,208,0.40)" }}>
                  {label}
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic", fontSize: 16, color: name ? "#faf8f4" : "rgba(232,221,208,0.25)" }}>
                  {name ?? "—"}
                </span>
              </div>
            ))}

            <p className="text-center" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.35)", fontStyle: "italic", marginTop: 16 }}>
              + Champagne & vins beaujolais servis à volonté
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
            className="transition-colors duration-300"
            style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13,
              letterSpacing: "0.25em", textTransform: "uppercase",
              border: "1px solid #c9a96e", background: "transparent",
              color: "#c9a96e", padding: "18px 56px", borderRadius: 0,
              cursor: "pointer",
              opacity: allChosen ? 1 : chosenCount > 0 ? 0.70 : 1,
            }}
            whileHover={allChosen || chosenCount === 0 ? { backgroundColor: "#c9a96e", color: "#1a1612" } : {}}
          >
            {allChosen ? "Mon vin d'honneur est prêt — Continuer" : "Continuer"}
          </motion.button>
          {!allChosen && chosenCount > 0 && (
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, color: "rgba(232,221,208,0.35)", marginTop: 8 }}>
              Encore {remaining} choix
            </span>
          )}
        </div>
      </div>

      <PresentationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={drawerVin} />
    </div>
  );
};

export default Step04_VinDhonneur;
