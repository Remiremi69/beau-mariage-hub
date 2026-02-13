import { Check } from "lucide-react";
import { useRef, useState } from "react";

// Images (fallback posters)
import comptoirCanuts from "@/assets/menu/comptoir-canuts.jpg";
import jardinEpicure from "@/assets/menu/jardin-epicure.jpg";
import barBao from "@/assets/menu/bar-bao.jpg";
import comptoirTacos from "@/assets/menu/comptoir-tacos.jpg";
import rotisserieFlamboyante from "@/assets/menu/rotisserie-flamboyante.jpg";
import jardinMarin from "@/assets/menu/jardin-marin.jpg";
import barProfiteroles from "@/assets/menu/bar-profiteroles.jpg";
import fontaineFruits from "@/assets/menu/fontaine-fruits.jpg";

// Videos
import videoComptoirCanuts from "@/assets/menu/video-comptoir-canuts.mp4";
import videoJardinEpicure from "@/assets/menu/video-jardin-epicure.mp4";
import videoBarBao from "@/assets/menu/video-bar-bao.mp4";
import videoComptoirTacos from "@/assets/menu/video-comptoir-tacos.mp4";
import videoRotisserie from "@/assets/menu/video-rotisserie.mp4";
import videoJardinMarin from "@/assets/menu/video-jardin-marin.mp4";
import videoProfiteroles from "@/assets/menu/video-profiteroles.mp4";
import videoFontaineFruits from "@/assets/menu/video-fontaine-fruits.mp4";

interface StationOption {
  id: string;
  title: string;
  description: string;
  image: string;
  video: string;
}

interface StationCategory {
  id: string;
  stepLabel: string;
  title: string;
  options: [StationOption, StationOption];
}

const voyageData: StationCategory[] = [
  {
    id: "aperitif",
    stepLabel: "Étape 1",
    title: "L'Apéritif Terroir",
    options: [
      {
        id: "comptoir-canuts",
        title: "Le Comptoir des Canuts",
        description: "Un hommage à la gastronomie lyonnaise. Une sélection généreuse de charcuteries et fromages affinés, présentée dans un esprit marché authentique et convivial.",
        image: comptoirCanuts,
        video: videoComptoirCanuts,
      },
      {
        id: "jardin-epicure",
        title: "Le Jardin d'Épicure",
        description: "Une ode à la fraîcheur méditerranéenne. Un assortiment de dips savoureux et de légumes croquants pour une mise en bouche légère et pleine de saveurs.",
        image: jardinEpicure,
        video: videoJardinEpicure,
      },
    ],
  },
  {
    id: "atelier",
    stepLabel: "Étape 2",
    title: "L'Atelier du Monde",
    options: [
      {
        id: "bar-bao",
        title: "Le Bar à Bao",
        description: "Un voyage express en Asie. De moelleux pains vapeur garnis de porc confit ou de poulet croustillant, assemblés devant vous.",
        image: barBao,
        video: videoBarBao,
      },
      {
        id: "comptoir-tacos",
        title: "Le Comptoir à Tacos",
        description: "Une explosion de saveurs mexicaines. Composez vous-même vos tacos avec des garnitures fraîches et épicées pour une ambiance festive.",
        image: comptoirTacos,
        video: videoComptoirTacos,
      },
    ],
  },
  {
    id: "plat",
    stepLabel: "Étape 3",
    title: "Le Plat Signature",
    options: [
      {
        id: "rotisserie-flamboyante",
        title: "La Rôtisserie Flamboyante",
        description: "Le spectacle de la découpe. Une pièce de viande noble, rôtie à la perfection et découpée devant vous pour une saveur et une tendreté incomparables.",
        image: rotisserieFlamboyante,
        video: videoRotisserie,
      },
      {
        id: "jardin-marin",
        title: "Le Jardin Marin",
        description: "Une brise marine dans votre assiette. Une sélection d'huîtres fraîches, de ceviche et de produits de la mer pour une dégustation iodée et raffinée.",
        image: jardinMarin,
        video: videoJardinMarin,
      },
    ],
  },
  {
    id: "dessert",
    stepLabel: "Étape 4",
    title: "Le Laboratoire Sucré",
    options: [
      {
        id: "bar-profiteroles",
        title: "Le Bar à Profiteroles",
        description: "La gourmandise régressive et chic. Composez vous-même vos profiteroles avec des nappages chauds et des toppings croquants.",
        image: barProfiteroles,
        video: videoProfiteroles,
      },
      {
        id: "fontaine-fruits",
        title: "La Fontaine de Fruits",
        description: "Le spectacle gourmand par excellence. Une cascade de chocolat chaud où tremper des brochettes de fruits frais pour un final ludique et délicieux.",
        image: fontaineFruits,
        video: videoFontaineFruits,
      },
    ],
  },
];

export type VoyageSelections = {
  [categoryId: string]: string | null;
};

interface VoyageCulinaireProps {
  selections: VoyageSelections;
  onSelect: (categoryId: string, stationId: string) => void;
}

/* ─── Video Card ─── */
const StationCard = ({
  option,
  isSelected,
  isOtherSelected,
  onClick,
}: {
  option: StationOption;
  isSelected: boolean;
  isOtherSelected: boolean;
  onClick: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        videoRef.current?.play();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        videoRef.current?.pause();
      }}
      className="relative w-full text-left overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        aspectRatio: "16/9",
        transition: "all 0.4s cubic-bezier(.25,.8,.25,1)",
        transform: isHovered && !isSelected ? "scale(1.03)" : "scale(1)",
        opacity: isOtherSelected ? 0.45 : 1,
        border: isSelected ? "3px solid hsl(var(--primary))" : "3px solid transparent",
        boxShadow: isSelected
          ? "0 0 30px hsl(var(--primary) / 0.35)"
          : isHovered
          ? "0 20px 60px rgba(0,0,0,0.35)"
          : "0 8px 30px rgba(0,0,0,0.15)",
      }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        src={option.video}
        poster={option.image}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: isHovered
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* Selected badge */}
      {isSelected && (
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold z-10 animate-scale-in">
          <Check className="w-4 h-4" />
          Sélectionné
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
        <h4
          className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
        >
          {option.title}
        </h4>
        <p
          className="text-white/85 text-sm md:text-base leading-relaxed max-w-lg"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
        >
          {option.description}
        </p>
      </div>
    </button>
  );
};

/* ─── Main Component ─── */
const VoyageCulinaire = ({ selections, onSelect }: VoyageCulinaireProps) => {
  const allSelected = voyageData.every((cat) => selections[cat.id]);

  return (
    <div className="relative -mx-4 md:-mx-8">
      {/* Header */}
      <div className="text-center py-8 md:py-12 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Composez Votre Voyage Culinaire
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
          Sélectionnez une station pour chaque moment de votre soirée. Chaque choix est une nouvelle escale dans une expérience inoubliable.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sections */}
        <div className="flex-1 space-y-0">
          {voyageData.map((category, catIndex) => {
            const selectedId = selections[category.id];
            return (
              <section
                key={category.id}
                className="min-h-[80vh] flex flex-col justify-center px-4 md:px-8 py-10 md:py-16"
                style={{
                  scrollSnapAlign: "start",
                }}
              >
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-12">
                  <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-2">
                    {category.stepLabel}
                  </span>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
                    {category.title}
                  </h3>
                  <div className="w-20 h-0.5 bg-primary/40 mx-auto mt-4" />
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto w-full">
                  {category.options.map((option) => (
                    <StationCard
                      key={option.id}
                      option={option}
                      isSelected={selectedId === option.id}
                      isOtherSelected={!!selectedId && selectedId !== option.id}
                      onClick={() => onSelect(category.id, option.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {/* Validation */}
          {allSelected && (
            <div className="text-center py-10 animate-fade-in px-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full font-semibold">
                <Check className="w-5 h-5" />
                Votre Voyage Culinaire est complet !
              </div>
            </div>
          )}
        </div>

        {/* Floating Sidebar */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-28 bg-card rounded-2xl border border-border shadow-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Votre Voyage Culinaire
            </h3>
            <div className="space-y-4">
              {voyageData.map((category) => {
                const selected = category.options.find(
                  (o) => o.id === selections[category.id]
                );
                return (
                  <div key={category.id} className="space-y-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {category.stepLabel} — {category.title}
                    </span>
                    {selected ? (
                      <p className="text-sm font-semibold text-foreground flex items-center gap-1.5 animate-fade-in">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {selected.title}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        Non sélectionné
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            {!allSelected && (
              <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                Sélectionnez une station dans chaque catégorie pour compléter votre voyage.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { voyageData };
export default VoyageCulinaire;
