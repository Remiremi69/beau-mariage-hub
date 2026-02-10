import PrestataireTemplate, { PrestataireData } from "./PrestataireTemplate";
import { Utensils } from "lucide-react";

const traiteurData: PrestataireData = {
  icon: Utensils,
  category: "TRAITEUR",
  title: "Gastronomie d'Exception",
  tagline: "Des saveurs qui racontent votre histoire",
  heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop",
  description: [
    "Notre traiteur partenaire propose une gastronomie d'exception, avec des menus sur mesure utilisant des produits locaux et frais. Chaque plat est une histoire, chaque saveur une émotion.",
    "Passionné par son métier, notre chef sait que le repas de mariage est bien plus qu'un simple repas : c'est un moment de partage, de convivialité, et de célébration. C'est pourquoi chaque menu est pensé pour refléter votre personnalité et ravir vos convives.",
    "Des entrées raffinées aux desserts gourmands, en passant par des plats principaux savoureux, nous créons une expérience culinaire inoubliable, adaptée à tous les régimes alimentaires et à toutes les envies."
  ],
  services: [
    "Menu gastronomique personnalisé",
    "Cuisine locale et produits frais",
    "Service impeccable et discret",
    "Adaptable à tous les régimes alimentaires"
  ],
  galleryImages: [
    { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop", alt: "Plat gastronomique" },
    { src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop", alt: "Présentation culinaire" },
    { src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop", alt: "Dessert élégant" },
    { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop", alt: "Table de mariage" },
    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop", alt: "Buffet de mariage" },
    { src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop", alt: "Création culinaire" }
  ],
  testimonials: [
    { quote: "Le repas était absolument exceptionnel. Nos invités en parlent encore !", author: "Marie & Thomas", date: "Mariage Juin 2024" },
    { quote: "Une équipe aux petits soins et des plats dignes d'un restaurant étoilé.", author: "Sophie & Pierre", date: "Mariage Septembre 2024" }
  ]
};

const Traiteur = () => {
  return <PrestataireTemplate data={traiteurData} slug="traiteur" />;
};

export default Traiteur;
