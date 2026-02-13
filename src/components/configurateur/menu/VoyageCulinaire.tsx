import { Check } from "lucide-react";
import comptoirCanuts from "@/assets/menu/comptoir-canuts.jpg";
import jardinEpicure from "@/assets/menu/jardin-epicure.jpg";
import barBao from "@/assets/menu/bar-bao.jpg";
import comptoirTacos from "@/assets/menu/comptoir-tacos.jpg";
import rotisserieFlamboyante from "@/assets/menu/rotisserie-flamboyante.jpg";
import jardinMarin from "@/assets/menu/jardin-marin.jpg";
import barProfiteroles from "@/assets/menu/bar-profiteroles.jpg";
import fontaineFruits from "@/assets/menu/fontaine-fruits.jpg";

interface StationOption {
  id: string;
  title: string;
  description: string;
  image: string;
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
      },
      {
        id: "jardin-epicure",
        title: "Le Jardin d'Épicure",
        description: "Une ode à la fraîcheur méditerranéenne. Un assortiment de dips savoureux et de légumes croquants pour une mise en bouche légère et pleine de saveurs.",
        image: jardinEpicure,
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
      },
      {
        id: "comptoir-tacos",
        title: "Le Comptoir à Tacos",
        description: "Une explosion de saveurs mexicaines. Composez vous-même vos tacos avec des garnitures fraîches et épicées pour une ambiance festive.",
        image: comptoirTacos,
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
      },
      {
        id: "jardin-marin",
        title: "Le Jardin Marin",
        description: "Une brise marine dans votre assiette. Une sélection d'huîtres fraîches, de ceviche et de produits de la mer pour une dégustation iodée et raffinée.",
        image: jardinMarin,
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
      },
      {
        id: "fontaine-fruits",
        title: "La Fontaine de Fruits",
        description: "Le spectacle gourmand par excellence. Une cascade de chocolat chaud où tremper des brochettes de fruits frais pour un final ludique et délicieux.",
        image: fontaineFruits,
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

const VoyageCulinaire = ({ selections, onSelect }: VoyageCulinaireProps) => {
  const allSelected = voyageData.every((cat) => selections[cat.id]);

  return (
    <div className="relative">
      {/* Header */}
      <div className="text-center py-6 mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Composez Votre Voyage Culinaire
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
          Sélectionnez une station pour chaque moment de votre soirée. Chaque choix est une nouvelle escale dans une expérience inoubliable.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sections */}
        <div className="flex-1 space-y-12">
          {voyageData.map((category) => (
            <section key={category.id}>
              {/* Section Header */}
              <div className="mb-6">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                  {category.stepLabel}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {category.title}
                </h3>
                <div className="w-16 h-1 bg-primary/30 rounded-full mt-2" />
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {category.options.map((option) => {
                  const isSelected = selections[category.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => onSelect(category.id, option.id)}
                      className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isSelected
                          ? "ring-4 ring-primary shadow-2xl scale-[1.02]"
                          : "hover:shadow-xl hover:scale-[1.01]"
                      }`}
                    >
                      {/* Image */}
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={option.image}
                          alt={option.title}
                          className={`w-full h-full object-cover transition-transform duration-500 ${
                            isSelected ? "scale-110" : "group-hover:scale-105"
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </div>

                      {/* Selected badge */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold z-10 animate-scale-in">
                          <Check className="w-3.5 h-3.5" />
                          Sélectionné
                        </div>
                      )}

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                        <h4 className="text-lg md:text-xl font-bold text-white mb-2">
                          {option.title}
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Validation message */}
          {allSelected && (
            <div className="text-center py-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full font-semibold">
                <Check className="w-5 h-5" />
                Votre Voyage Culinaire est complet !
              </div>
            </div>
          )}
        </div>

        {/* Sticky Sidebar */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-28 bg-card rounded-2xl border border-border shadow-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Votre Voyage Culinaire</h3>
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
                      <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
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
