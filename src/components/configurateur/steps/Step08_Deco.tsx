import { motion } from "framer-motion";
import { ConfigurateurState, Deco } from "../pricingTypes";

interface Step08Props {
  state: ConfigurateurState;
  onUpdate: (partial: Partial<ConfigurateurState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" } }),
};

const SvgChampetre = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
    <line x1="40" y1="75" x2="40" y2="25" stroke="rgba(201,169,110,0.40)" strokeWidth="1" />
    <line x1="60" y1="75" x2="60" y2="15" stroke="rgba(201,169,110,0.40)" strokeWidth="1" />
    <line x1="80" y1="75" x2="80" y2="30" stroke="rgba(201,169,110,0.40)" strokeWidth="1" />
    <circle cx="40" cy="20" r="8" stroke="rgba(201,169,110,0.35)" fill="none" strokeWidth="1" />
    <circle cx="80" cy="26" r="6" stroke="rgba(201,169,110,0.35)" fill="none" strokeWidth="1" />
    <path d="M55 35 Q60 25 65 35" fill="rgba(80,120,60,0.30)" />
    <path d="M35 40 Q40 30 45 40" fill="rgba(80,120,60,0.30)" />
  </svg>
);

const SvgBoheme = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
    <rect x="35" y="15" width="20" height="20" transform="rotate(45 45 25)" stroke="rgba(201,169,110,0.35)" fill="none" strokeWidth="1" />
    <rect x="60" y="30" width="16" height="16" transform="rotate(45 68 38)" stroke="rgba(201,169,110,0.35)" fill="none" strokeWidth="1" />
    <circle cx="50" cy="55" r="12" stroke="rgba(201,169,110,0.25)" fill="none" strokeWidth="1" />
    <circle cx="30" cy="20" r="2" fill="rgba(201,169,110,0.40)" />
    <circle cx="90" cy="35" r="2" fill="rgba(201,169,110,0.40)" />
    <circle cx="75" cy="60" r="2" fill="rgba(201,169,110,0.40)" />
    <circle cx="45" cy="70" r="2" fill="rgba(201,169,110,0.40)" />
  </svg>
);

const SvgElegance = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
    <rect x="20" y="10" width="80" height="53" stroke="rgba(201,169,110,0.30)" fill="none" strokeWidth="1" />
    <line x1="20" y1="10" x2="100" y2="63" stroke="rgba(201,169,110,0.15)" strokeWidth="0.5" />
    <line x1="100" y1="10" x2="20" y2="63" stroke="rgba(201,169,110,0.15)" strokeWidth="0.5" />
    <line x1="20" y1="70" x2="100" y2="70" stroke="rgba(201,169,110,0.20)" strokeWidth="1" />
  </svg>
);

interface DecoCardData {
  id: Deco;
  svg: React.ReactNode;
  bgColor: string;
  slot: string;
  name: string;
  accroche: [string, string];
  description: string;
  palette: { color: string; label: string }[];
  includes: string[];
  prix: string;
  prixGold: boolean;
  badge?: string;
}

const decoCards: DecoCardData[] = [
  {
    id: "champetre", svg: <SvgChampetre />, bgColor: "rgba(80,70,50,0.35)", slot: "deco-champetre",
    name: "CHAMPÊTRE AUTHENTIQUE", accroche: ["La nature", "invitée à table"],
    description: "Fleurs sauvages, bois flotté, herbes folles. Une décoration qui sent bon la campagne et la lumière d'été.",
    palette: [{ color: "#8B7355", label: "Lin" }, { color: "#5C7A4E", label: "Vert sauge" }, { color: "#C4A882", label: "Paille" }],
    includes: ["Centres de table fleuris (fleurs locales)", "Bougies piliers & photophores", "Chemin de table en lin brut", "Arche florale pour cérémonie (si option)"],
    prix: "Inclus dans le forfait", prixGold: false,
  },
  {
    id: "boheme", svg: <SvgBoheme />, bgColor: "rgba(60,55,70,0.35)", slot: "deco-boheme",
    name: "BOHÈME MODERNE", accroche: ["Brut, doux", "et lumineux"], badge: "TENDANCE 2027",
    description: "Macramé, pampa, velours et cuivre. Un mélange de textures organiques et de détails métalliques fins.",
    palette: [{ color: "#B8860B", label: "Or cuivré" }, { color: "#9E8E7E", label: "Grège" }, { color: "#D4C5B0", label: "Nude" }],
    includes: ["Suspension macramé & pampa", "Mobilier en bois brut (bancs, tables têtes)", "Vaisselle grès artisanal (surclassement)", "Éclairage guirlandes & lanternes cuivrées"],
    prix: "+ 600 €", prixGold: true,
  },
  {
    id: "elegance", svg: <SvgElegance />, bgColor: "rgba(30,28,24,0.60)", slot: "deco-elegance",
    name: "ÉLÉGANCE INTEMPORELLE", accroche: ["Blanc, or", "et silence"],
    description: "Nappes immaculées, orfèvrerie, roses blanches et bougies hautes. La grande tradition de la réception.",
    palette: [{ color: "#F5F0E8", label: "Blanc ivoire" }, { color: "#C9A96E", label: "Or" }, { color: "#1A1612", label: "Nuit" }],
    includes: ["Nappes en lin blanc (coupe sur-mesure)", "Chandeliers et roses blanches", "Vaisselle porcelaine fine", "Drapés plafond & éclairage architectural"],
    prix: "+ 1 200 €", prixGold: true,
  },
];

const Step08_Deco = ({ state, onUpdate, onNext, onPrev }: Step08Props) => {
  const selected = state.deco;

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 100 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 760 }}>
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 8 · L'atmosphère
        </motion.p>

        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15 }}>
          L'espace qui<br />vous ressemble.
        </motion.h2>

        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.8, maxWidth: 500, marginBottom: 44 }}>
          La décoration n'est pas un décor. C'est la première chose que vos invités ressentent en entrant. Choisissez votre langage visuel.
        </motion.p>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 52px" }} />

        {/* Cards */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {decoCards.map((card) => {
            const isSelected = selected === card.id;
            return (
              <div
                key={card.id}
                onClick={() => onUpdate({ deco: card.id })}
                className="flex flex-col overflow-hidden transition-all duration-300"
                style={{
                  borderRadius: 2, cursor: "pointer", minHeight: 420,
                  border: isSelected ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.15)",
                  background: isSelected ? "rgba(201,169,110,0.06)" : "rgba(26,22,18,0.40)",
                }}
                onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.border = "1px solid rgba(201,169,110,0.40)"; e.currentTarget.style.transform = "translateY(-3px)"; } }}
                onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.border = "1px solid rgba(201,169,110,0.15)"; e.currentTarget.style.transform = "translateY(0)"; } }}
              >
                {/* Visual zone */}
                <div data-photo-slot={card.slot} className="relative flex flex-col items-center justify-center"
                  style={{ height: 200, background: card.bgColor, borderBottom: "1px solid rgba(201,169,110,0.10)" }}>
                  {card.svg}
                  <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 10, letterSpacing: "0.30em", textTransform: "uppercase", color: "rgba(201,169,110,0.30)", marginTop: 8 }}>
                    Visuel à venir
                  </span>
                  {card.badge && (
                    <span className="absolute top-3 right-3" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(201,169,110,0.40)", padding: "3px 10px", color: "rgba(201,169,110,0.70)" }}>
                      {card.badge}
                    </span>
                  )}
                </div>

                {/* Text zone */}
                <div className="flex flex-col flex-1 relative" style={{ padding: "24px 22px 28px" }}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: "0.30em", textTransform: "uppercase", color: "rgba(232,221,208,0.80)", marginBottom: 6 }}>{card.name}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 22, color: "#faf8f4", lineHeight: 1.3, marginBottom: 14 }}>
                    {card.accroche[0]}<br />{card.accroche[1]}
                  </p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.55)", lineHeight: 1.70, marginBottom: 16 }}>{card.description}</p>

                  {/* Palette */}
                  <div className="flex gap-3 mb-4">
                    {card.palette.map((p) => (
                      <div key={p.label} className="flex items-center gap-2">
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: p.color, border: "1px solid rgba(201,169,110,0.15)" }} />
                        <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, color: "rgba(232,221,208,0.40)", letterSpacing: "0.10em" }}>{p.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Includes */}
                  <div className="flex flex-col gap-[6px] mb-4">
                    {card.includes.map((item) => (
                      <span key={item} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.50)" }}>— {item}</span>
                    ))}
                  </div>

                  {/* Prix */}
                  <p style={{ borderTop: "1px solid rgba(201,169,110,0.10)", paddingTop: 16, marginTop: "auto", fontFamily: "'Jost', sans-serif", fontWeight: card.prixGold ? 500 : 400, fontSize: 14, color: card.prixGold ? "#c9a96e" : "rgba(232,221,208,0.60)" }}>
                    {card.prix}
                  </p>

                  {isSelected && <div className="absolute bottom-4 right-4" style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a96e" }} />}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Note */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
          className="w-full" style={{ marginTop: 40, padding: "18px 22px", background: "rgba(201,169,110,0.04)", borderLeft: "2px solid rgba(201,169,110,0.40)", borderRadius: "0 2px 2px 0" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.60)", lineHeight: 1.75 }}>
            La décoration est installée la veille du mariage par notre équipe. Vous pouvez apporter vos propres éléments personnels — photos, objets de famille, signalétique — qui s'intègreront à l'univers choisi.
          </p>
        </motion.div>

        {/* Nav */}
        <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}
          className="flex items-center justify-between w-full mt-12" style={{ maxWidth: 480 }}>
          <button onClick={onPrev} className="transition-colors duration-200"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.2em", color: "rgba(232,221,208,0.40)", background: "transparent", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.70)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.40)"; }}>
            ← RETOUR
          </button>
          <motion.button onClick={() => { onNext(); }} className="transition-colors duration-300"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", border: "1px solid #c9a96e", background: "transparent", color: "#c9a96e", padding: "18px 56px", borderRadius: 0, cursor: "pointer" }}
            whileHover={{ backgroundColor: "#c9a96e", color: "#1a1612" }}>
            Continuer
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Step08_Deco;
