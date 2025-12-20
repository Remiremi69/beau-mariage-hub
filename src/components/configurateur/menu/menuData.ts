// Menu Data Structure
import velouteChampignons from "@/assets/menu/veloute-champignons.jpg";
import verrineSaumon from "@/assets/menu/verrine-saumon.jpg";
import volailleFermiere from "@/assets/menu/volaille-fermiere.jpg";
import paveBoeuf from "@/assets/menu/pave-boeuf.jpg";
import plateauFromages from "@/assets/menu/plateau-fromages.jpg";
import chevreToast from "@/assets/menu/chevre-toast.jpg";
import pieceMontee from "@/assets/menu/piece-montee.jpg";
import mignardises from "@/assets/menu/mignardises.jpg";

export interface DishOption {
  id: string;
  name: string;
  shortDescription: string;
  storytelling: string;
  image: string;
  infoBadges: string[];
  winePairing: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  options: DishOption[];
}

export const menuData: MenuCategory[] = [
  {
    id: "entree",
    title: "L'Entrée",
    subtitle: "La Première Impression",
    options: [
      {
        id: "veloute",
        name: "Velouté de saison aux champignons des bois",
        shortDescription: "Crème truffée et croûtons dorés",
        storytelling: "Imaginé par notre Chef comme une promenade en forêt, ce velouté réconfortant allie la puissance du champignon des bois à la noblesse de la truffe. Chaque cuillère est une caresse pour le palais, un voyage gustatif vers l'authenticité de notre terroir.",
        image: velouteChampignons,
        infoBadges: ["Local", "Végétarien", "Fait Maison"],
        winePairing: "S'accorde à merveille avec un Chardonnay de Bourgogne, dont les notes beurrées subliment la crème truffée."
      },
      {
        id: "saumon",
        name: "Verrine de saumon fumé et crème citronnée",
        shortDescription: "Aneth frais et perles de citron",
        storytelling: "La fraîcheur à l'état pur. Nous sélectionnons un saumon d'Écosse Label Rouge, fumé par nos soins, dont la saveur est réveillée par une crème légère infusée au citron de Menton et à l'aneth frais du jardin. Une entrée qui éveille les sens.",
        image: verrineSaumon,
        infoBadges: ["Produit de la Mer", "Label Rouge", "Sans Gluten"],
        winePairing: "Un Sancerre vif et minéral sublimera les notes marines et citronnées de cette entrée."
      }
    ]
  },
  {
    id: "plat",
    title: "Le Plat Principal",
    subtitle: "Le Cœur du Repas",
    options: [
      {
        id: "volaille",
        name: "Suprême de volaille fermière rôtie au jus de thym",
        shortDescription: "Gratin dauphinois et légumes de saison glacés",
        storytelling: "Notre volaille fermière, élevée en plein air pendant 81 jours minimum, développe une chair tendre et savoureuse. Rôtie lentement au four, arrosée de son jus parfumé au thym frais, elle révèle toute la générosité d'un plat de terroir revisité avec élégance.",
        image: volailleFermiere,
        infoBadges: ["Volaille Fermière", "Label Rouge", "Produit Local"],
        winePairing: "Un Côtes du Rhône blanc ou un Pouilly-Fuissé accompagnera parfaitement ce plat."
      },
      {
        id: "boeuf",
        name: "Pavé de bœuf Angus, sauce au poivre vert",
        shortDescription: "Écrasé de pommes de terre à l'huile de truffe",
        storytelling: "Pour les amateurs de viande d'exception, nous sélectionnons un bœuf Angus maturé 21 jours. Saisi à la perfection, il révèle des notes beurrées et une tendreté incomparable. La sauce au poivre vert apporte une touche de piquant maîtrisée.",
        image: paveBoeuf,
        infoBadges: ["Viande d'Exception", "Angus", "Maturation 21 jours"],
        winePairing: "Un Saint-Émilion ou un Pauillac magnifieront les saveurs profondes de cette viande d'exception."
      }
    ]
  },
  {
    id: "fromage",
    title: "Les Fromages",
    subtitle: "La Tradition Gourmande",
    options: [
      {
        id: "plateau",
        name: "Plateau de fromages régionaux affinés",
        shortDescription: "Sélection de 4 fromages emblématiques",
        storytelling: "Un voyage à travers nos terroirs : Comté 24 mois, Brie de Meaux, Fourme d'Ambert et un chèvre fermier. Chaque fromage est affiné avec soin par notre maître fromager partenaire. Servis à température idéale avec pain aux noix et confitures maison.",
        image: plateauFromages,
        infoBadges: ["Fromages AOP", "Affiné sur place", "Producteur local"],
        winePairing: "Un Porto Tawny ou un vin jaune du Jura pour un accord parfait avec le plateau."
      },
      {
        id: "chevre",
        name: "Cœur de chèvre frais sur toast de pain d'épices",
        shortDescription: "Salade de jeunes pousses et noix",
        storytelling: "Une création originale qui allie la douceur du chèvre frais à la chaleur épicée du pain d'épices. Les jeunes pousses apportent fraîcheur et croquant, tandis que les noix caramélisées ajoutent une touche gourmande irrésistible.",
        image: chevreToast,
        infoBadges: ["Chèvre Fermier", "Pain d'épices maison", "Végétarien"],
        winePairing: "Un Gewurztraminer légèrement moelleux pour accompagner les notes épicées."
      }
    ]
  },
  {
    id: "dessert",
    title: "Le Dessert",
    subtitle: "La Touche Sucrée",
    options: [
      {
        id: "piece-montee",
        name: "Pièce montée traditionnelle",
        shortDescription: "Choux ou macarons selon votre choix",
        storytelling: "Le classique indémodable pour un final spectaculaire ! Notre pâtissier confectionne chaque chou ou macaron à la main, garni de crème vanille bourbon de Madagascar. La pièce montée sera personnalisée aux couleurs de votre mariage.",
        image: pieceMontee,
        infoBadges: ["Fait Main", "Personnalisable", "Tradition Française"],
        winePairing: "Un Champagne demi-sec ou un Crémant de Loire pour célébrer ce moment magique."
      },
      {
        id: "mignardises",
        name: "Buffet de 5 mignardises par personne",
        shortDescription: "Mini-éclairs, tartelettes, macarons, verrines...",
        storytelling: "Pour les gourmands qui n'arrivent pas à choisir ! Chaque invité compose son assiette parmi une variété de mini-douceurs : éclairs au café, tartelettes aux fruits de saison, macarons parfumés, verrines chocolat-passion... Un festival de saveurs.",
        image: mignardises,
        infoBadges: ["5 pièces/pers.", "Variété de saveurs", "Fait Maison"],
        winePairing: "Un assortiment avec un Muscat de Beaumes-de-Venise ou simplement un thé parfumé."
      }
    ]
  }
];

export type SelectedDishes = {
  [categoryId: string]: string | null;
};
