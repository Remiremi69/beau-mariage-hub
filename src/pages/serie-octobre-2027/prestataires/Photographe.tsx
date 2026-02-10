import PrestataireTemplate, { PrestataireData } from "./PrestataireTemplate";
import { Camera } from "lucide-react";

const photographeData: PrestataireData = {
  icon: Camera,
  category: "PHOTOGRAPHE & VIDÉASTE",
  title: "Les Chasseurs de Souvenirs",
  tagline: "Capturer chaque moment, chaque émotion",
  heroImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&h=400&fit=crop",
  description: [
    "Notre photographe est un chasseur de souvenirs. Plus qu'un technicien, c'est un artiste qui sait capturer l'étincelle, le rire volé et la larme de joie. Chaque photo raconte une histoire.",
    "Avec un œil pour les détails et une sensibilité pour les émotions, notre photographe documente votre journée de manière authentique et intemporelle. Pas de poses forcées, juste des moments vrais capturés avec talent.",
    "Du maquillage de la mariée au dernier slow de la soirée, chaque instant précieux est immortalisé pour que vous puissiez revivre cette journée magique encore et encore."
  ],
  services: [
    "Photographie professionnelle toute la journée",
    "Vidéographie cinématique (drone optionnel)",
    "Album photo premium personnalisé",
    "Galerie en ligne privée pour vos invités"
  ],
  galleryImages: [
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop", alt: "Couple de mariés" },
    { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop", alt: "Préparatifs mariage" },
    { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop", alt: "Cérémonie de mariage" },
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop", alt: "Moments de joie" },
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop", alt: "Détails de décoration" },
    { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=400&fit=crop", alt: "Portrait de mariés" }
  ],
  testimonials: [
    { quote: "Les photos sont absolument magnifiques. Chaque image nous fait revivre cette journée extraordinaire.", author: "Léa & Antoine", date: "Mariage Mai 2024" },
    { quote: "Un vrai artiste ! Il a su capturer l'essence même de notre amour.", author: "Claire & Julien", date: "Mariage Août 2024" }
  ]
};

const Photographe = () => {
  return <PrestataireTemplate data={photographeData} slug="photographe" />;
};

export default Photographe;
