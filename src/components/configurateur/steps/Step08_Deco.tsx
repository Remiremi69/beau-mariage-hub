import { useState } from "react";
import { motion } from "framer-motion";
import { ConfigurateurState, Deco } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerDeco } from "../drawerContents";

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

const SvgSeve = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
    <line x1="35" y1="75" x2="35" y2="20" stroke="rgba(201,169,110,0.40)" strokeWidth="1" />
    <line x1="60" y1="75" x2="60" y2="10" stroke="rgba(201,169,110,0.40)" strokeWidth="1" />
    <line x1="85" y1="75" x2="85" y2="25" stroke="rgba(201,169,110,0.40)" strokeWidth="1" />
    <path d="M60 10 Q50 20 55 30" stroke="rgba(201,169,110,0.30)" fill="none" strokeWidth="0.8" />
    <path d="M60 10 Q70 20 65 30" stroke="rgba(201,169,110,0.30)" fill="none" strokeWidth="0.8" />
    <path d="M60 10 Q55 25 60 35" stroke="rgba(201,169,110,0.25)" fill="none" strokeWidth="0.8" />
    <path d="M35 20 Q28 28 32 36" stroke="rgba(201,169,110,0.25)" fill="none" strokeWidth="0.8" />
    <path d="M35 20 Q42 28 38 36" stroke="rgba(201,169,110,0.25)" fill="none" strokeWidth="0.8" />
    <path d="M85 25 Q78 33 82 40" stroke="rgba(201,169,110,0.25)" fill="none" strokeWidth="0.8" />
    <path d="M85 25 Q92 33 88 40" stroke="rgba(201,169,110,0.25)" fill="none" strokeWidth="0.8" />
    <ellipse cx="48" cy="55" rx="5" ry="8" transform="rotate(-20 48 55)" fill="rgba(100,130,80,0.25)" />
    <ellipse cx="72" cy="58" rx="4" ry="7" transform="rotate(15 72 58)" fill="rgba(100,130,80,0.20)" />
  </svg>
);

const SvgPierre = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
    <line x1="15" y1="65" x2="105" y2="65" stroke="rgba(201,169,110,0.20)" strokeWidth="1" />
    <rect x="38" y="35" width="8" height="30" stroke="rgba(201,169,110,0.30)" fill="none" strokeWidth="0.8" />
    <rect x="56" y="25" width="8" height="40" stroke="rgba(201,169,110,0.35)" fill="none" strokeWidth="0.8" />
    <rect x="74" y="40" width="8" height="25" stroke="rgba(201,169,110,0.30)" fill="none" strokeWidth="0.8" />
    <path d="M42 35 Q42 28 42 32 Q44 27 42 35" fill="rgba(201,169,110,0.40)" />
    <path d="M60 25 Q60 17 60 21 Q62 16 60 25" fill="rgba(201,169,110,0.50)" />
    <path d="M78 40 Q78 33 78 37 Q80 32 78 40" fill="rgba(201,169,110,0.40)" />
    <circle cx="42" cy="70" r="5" stroke="rgba(232,221,208,0.20)" fill="none" strokeWidth="0.8" />
    <circle cx="60" cy="70" r="5" stroke="rgba(232,221,208,0.20)" fill="none" strokeWidth="0.8" />
    <circle cx="78" cy="70" r="5" stroke="rgba(232,221,208,0.20)" fill="none" strokeWidth="0.8" />
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
    id: "seve", svg: <SvgSeve />, bgColor: "rgba(80,65,45,0.40)", slot: "deco-seve",
    name: "SÈVE", accroche: ["Végétal, terracotta,", "lin brut"],
    description: "Compositions de pampa blanc naturel, eucalyptus et gypsophile sur pieds dorés fins. Vaisselle en grès beige, lin brut, bougies pilier ivoire.",
    palette: [{ color: "#C4A882", label: "Lin brut" }, { color: "#B87B5A", label: "Terracotta" }, { color: "#8B9E78", label: "Végétal" }],
    includes: [
      "Nappage lin brut beige — table impériale + rondes",
      "Vaisselle grès beige/ivoire (assiette plate + creuse)",
      "Bougies pilier ivoire H.20cm — 2/table ronde",
      "Chemin de table jute — table impériale",
      "Photophores verre naturel — 2/table ronde",
      "Compositions pampa/eucalyptus sur pieds dorés",
    ],
    prix: "Inclus dans le forfait", prixGold: false,
  },
  {
    id: "pierre", svg: <SvgPierre />, bgColor: "rgba(28,28,28,0.60)", slot: "deco-pierre",
    name: "PIERRE & LUMIÈRE", accroche: ["Blanc pur,", "minimalisme absolu"], badge: "ÉPURÉ",
    description: "Nappes damassé blanc épais, porcelaine blanche premium, cristallin. Aucun chemin de table — juste la lumière des bougies pilier blanc.",
    palette: [{ color: "#F5F0E8", label: "Blanc ivoire" }, { color: "#D4CFC8", label: "Damassé" }, { color: "#C9A96E", label: "Or" }],
    includes: [
      "Nappage blanc damassé épais — 10 tables rondes",
      "Vaisselle porcelaine blanche premium",
      "Bougies pilier blanc H.25cm — 2/table",
      "Verres cristallin — vin + eau",
      "Compositions pampa/eucalyptus sur pieds dorés",
      "Arche cérémonie métal doré + floraux séchés",
    ],
    prix: "Inclus dans le forfait", prixGold: false,
  },
];

interface DecoOption {
  id: string;
  name: string;
  description: string;
  prix: string;
}

const decoOptions: DecoOption[] = [
  { id: "couverts-dores", name: "COUVERTS DORÉS MAT", description: "Remplace l'inox brossé — finition mat luxueuse", prix: "+ 110 €" },
  { id: "verres-fumes", name: "VERRES FUMÉS", description: "Remplace cristallin/transparent — ambiance intimiste", prix: "+ 180 €" },
  { id: "bougies-tapers-noires", name: "BOUGIES TAPERS NOIRES ×60", description: "Effet dramatique — remplacement des bougies pilier", prix: "+ 225 €" },
  { id: "chemin-velours", name: "CHEMIN DE TABLE VELOURS", description: "Sur la table impériale — matière noble et texturée", prix: "+ 100 €" },
  { id: "photophores-fumes", name: "PHOTOPHORES FUMÉS ×50", description: "Remplace verre naturel — ambiance tamisée profonde", prix: "+ 60 €" },
];

const DECO_OPTION_IDS = decoOptions.map(o => o.id);

const Step08_Deco = ({ state, onUpdate, onNext, onPrev }: Step08Props) => {
  const selected = state.deco;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [decoOptionsSelected, setDecoOptionsSelected] = useState<string[]>(
    state.options.filter(id => DECO_OPTION_IDS.includes(id))
  );

  const toggleDecoOption = (id: string) => {
    setDecoOptionsSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    const otherOptions = state.options.filter(id => !DECO_OPTION_IDS.includes(id));
    onUpdate({
      deco: selected,
      options: [...otherOptions, ...decoOptionsSelected],
    });
    onNext();
  };

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

        <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp}>
          <InfoButton label="Voir les réalisations déco" onClick={() => setDrawerOpen(true)} />
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "0 auto 52px" }} />

        {/* Cards — 2 columns */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
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
                  <p style={{ borderTop: "1px solid rgba(201,169,110,0.10)", paddingTop: 16, marginTop: "auto", fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 14, color: "rgba(232,221,208,0.60)" }}>
                    {card.prix}
                  </p>

                  {isSelected && <div className="absolute bottom-4 right-4" style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a96e" }} />}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Options upgrades */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="w-full">
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.30em",
            textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginTop: 44, marginBottom: 20,
          }}>
            OPTIONS — APPLICABLES AUX DEUX FORMULES
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            {decoOptions.map((opt) => {
              const isActive = decoOptionsSelected.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleDecoOption(opt.id)}
                  className="relative flex items-center gap-3 transition-all duration-200"
                  style={{
                    padding: "16px 18px", cursor: "pointer", borderRadius: 2,
                    border: isActive ? "1px solid rgba(201,169,110,0.60)" : "1px solid rgba(201,169,110,0.15)",
                    background: isActive ? "rgba(201,169,110,0.07)" : "rgba(26,22,18,0.40)",
                  }}
                >
                  {isActive && (
                    <div className="absolute top-2 right-2" style={{ width: 8, height: 8, background: "#c9a96e" }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(232,221,208,0.80)" }}>
                      {opt.name}
                    </p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.45)", marginTop: 4 }}>
                      {opt.description}
                    </p>
                  </div>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 13, color: "#c9a96e", flexShrink: 0 }}>
                    {opt.prix}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}
          className="w-full" style={{ marginTop: 40, padding: "18px 22px", background: "rgba(201,169,110,0.04)", borderLeft: "2px solid rgba(201,169,110,0.40)", borderRadius: "0 2px 2px 0" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(232,221,208,0.60)", lineHeight: 1.75 }}>
            La décoration est installée la veille du mariage. Les deux formules sont incluses dans le forfait. Les options upgrades s'appliquent à la formule choisie.
          </p>
        </motion.div>

        {/* Nav */}
        <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp}
          className="flex items-center justify-between w-full mt-12" style={{ maxWidth: 480 }}>
          <button onClick={onPrev} className="transition-colors duration-200"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.2em", color: "rgba(232,221,208,0.40)", background: "transparent", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.70)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(232,221,208,0.40)"; }}>
            ← RETOUR
          </button>
          <motion.button onClick={handleContinue} className="transition-colors duration-300"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", border: "1px solid #c9a96e", background: "transparent", color: "#c9a96e", padding: "18px 56px", borderRadius: 0, cursor: "pointer" }}
            whileHover={{ backgroundColor: "#c9a96e", color: "#1a1612" }}>
            Continuer
          </motion.button>
        </motion.div>
      </div>

      <PresentationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={drawerDeco} />
    </div>
  );
};

export default Step08_Deco;
