import PrestataireTemplate, { PrestataireData } from "./PrestataireTemplate";
import { Sparkles } from "lucide-react";

const decorateurData: PrestataireData = {
  icon: Sparkles,
  category: "DÉCORATEUR",
  title: "Les Architectes de l'Ambiance",
  tagline: "Transformer le lieu en décor de rêve",
  heroImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=400&fit=crop",
  description: [
    "Notre décorateur est un architecte de l'ambiance. Il a le talent de transformer un lieu en un décor de rêve, créant une atmosphère unique qui vous ressemble. Chaque détail compte.",
    "Du choix des couleurs à la disposition des éléments, en passant par l'éclairage et les textures, notre décorateur crée un univers visuel cohérent qui sublimera votre mariage.",
    "Que vous rêviez d'un mariage bohème, romantique, champêtre ou contemporain, notre décorateur saura donner vie à votre vision et surprendre vos invités."
  ],
  services: [
    "Décoration complète du lieu de réception",
    "Création d'ambiance sur mesure selon vos envies",
    "Arrangements lumineux et mise en scène",
    "Coordination parfaite avec le thème de votre mariage"
  ],
  galleryImages: [
    { src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop", alt: "Décoration de table" },
    { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop", alt: "Décor de cérémonie" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop", alt: "Ambiance soirée" },
    { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop", alt: "Détails décoratifs" },
    { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&h=400&fit=crop", alt: "Vue d'ensemble" },
    { src: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&h=400&fit=crop", alt: "Éclairage romantique" }
  ],
  testimonials: [
    { quote: "Nous avons eu l'impression d'entrer dans un conte de fées. Absolument magique !", author: "Inès & Romain", date: "Mariage Septembre 2024" },
    { quote: "Chaque détail était pensé avec soin. Nos invités étaient émerveillés.", author: "Pauline & Nicolas", date: "Mariage Mai 2024" }
  ]
};

const Decorateur = () => {
  return <PrestataireTemplate data={decorateurData} slug="decorateur" />;
};

export default Decorateur;
