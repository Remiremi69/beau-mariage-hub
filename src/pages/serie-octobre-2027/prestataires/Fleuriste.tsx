import PrestataireTemplate, { PrestataireData } from "./PrestataireTemplate";

const fleuristeData: PrestataireData = {
  icon: "🌸",
  category: "FLEURISTE",
  title: "L'Art de la Fleur",
  tagline: "Créer des compositions florales uniques",
  heroImage: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=400&fit=crop",
  description: [
    "Notre fleuriste crée des compositions uniques et élégantes. Fleurs fraîches, arrangements sur mesure, et une passion pour chaque détail. La fleur est son langage.",
    "Avec une connaissance approfondie des fleurs de saison et des techniques florales, notre fleuriste compose des arrangements qui subliment chaque espace de votre mariage.",
    "Du bouquet de la mariée aux compositions de table, en passant par l'arche de cérémonie, chaque création florale est pensée pour s'harmoniser parfaitement avec votre thème et votre personnalité."
  ],
  services: [
    "Bouquet de mariée personnalisé",
    "Arrangements floraux pour la cérémonie",
    "Décoration florale de la salle de réception",
    "Compositions élégantes pour les tables"
  ],
  galleryImages: [
    { src: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=600&h=400&fit=crop", alt: "Bouquet de mariée" },
    { src: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=400&fit=crop", alt: "Composition florale" },
    { src: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=600&h=400&fit=crop", alt: "Décoration de table" },
    { src: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=600&h=400&fit=crop", alt: "Arche fleurie" },
    { src: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=400&fit=crop", alt: "Détails floraux" },
    { src: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&h=400&fit=crop", alt: "Arrangement de mariage" }
  ],
  testimonials: [
    { quote: "Mon bouquet était exactement ce que j'avais imaginé, et même plus beau encore !", author: "Aurélie & Florian", date: "Mariage Juin 2024" },
    { quote: "Les fleurs ont apporté une touche de magie incroyable à notre mariage.", author: "Margot & Baptiste", date: "Mariage Août 2024" }
  ]
};

const Fleuriste = () => {
  return <PrestataireTemplate data={fleuristeData} slug="fleuriste" />;
};

export default Fleuriste;
