import PrestataireTemplate, { PrestataireData } from "./PrestataireTemplate";
import { MicVocal } from "lucide-react";

const musicienData: PrestataireData = {
  icon: MicVocal,
  category: "MUSICIEN",
  title: "La Bande-Sonore de Votre Amour",
  tagline: "Musique live pour vos moments clés",
  heroImage: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=400&fit=crop",
  description: [
    "Notre musicien apporte une touche d'élégance et d'émotion. Que ce soit pour la cérémonie ou l'apéritif, la musique live crée une ambiance intemporelle et mémorable.",
    "La musique live a ce pouvoir unique de créer une atmosphère intimiste et émouvante. Notre musicien accompagne vos moments les plus précieux avec talent et sensibilité.",
    "Qu'il s'agisse d'une entrée majestueuse, d'un échange de vœux émouvant ou d'un cocktail élégant, la musique live ajoute une dimension magique à chaque instant."
  ],
  services: [
    "Musique live pour la cérémonie",
    "Animation musicale pendant l'apéritif",
    "Répertoire classique et contemporain varié",
    "Programme musical adaptable à vos envies"
  ],
  galleryImages: [
    { src: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=400&fit=crop", alt: "Musicien en concert" },
    { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop", alt: "Performance musicale" },
    { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop", alt: "Ambiance musicale" },
    { src: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&h=400&fit=crop", alt: "Guitare acoustique" }
  ],
  testimonials: [
    { quote: "La musique de notre cérémonie nous a fait pleurer de joie. Un moment inoubliable.", author: "Chloé & Mathieu", date: "Mariage Juillet 2024" },
    { quote: "L'apéritif en musique live était d'une élégance rare. Nos invités ont adoré.", author: "Sarah & Vincent", date: "Mariage Septembre 2024" }
  ]
};

const Musicien = () => {
  return <PrestataireTemplate data={musicienData} slug="musicien" />;
};

export default Musicien;
