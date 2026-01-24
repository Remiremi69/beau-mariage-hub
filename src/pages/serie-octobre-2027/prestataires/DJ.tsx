import PrestataireTemplate, { PrestataireData } from "./PrestataireTemplate";

const djData: PrestataireData = {
  icon: "🎵",
  category: "DJ",
  title: "Les Maîtres du Rythme",
  tagline: "Créer l'ambiance parfaite du début à la fin",
  heroImage: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=1200&h=400&fit=crop",
  description: [
    "Notre DJ est un maître du rythme. Du vin d'honneur à la piste de danse, il crée la bande-sonore parfaite pour une ambiance inoubliable. Musique, énergie, et ambiance garanties.",
    "Avec une expertise de plusieurs années dans l'animation de mariages, notre DJ sait exactement comment faire monter l'ambiance progressivement, maintenir l'énergie sur la piste, et créer des moments mémorables.",
    "Que vous aimiez les classiques intemporels, les hits du moment ou un mélange éclectique, notre DJ s'adapte à vos goûts pour créer une playlist qui vous ressemble."
  ],
  services: [
    "Animation musicale complète de la soirée",
    "Sonorisation professionnelle haute qualité",
    "Animations spéciales (jeux, surprises, moments forts)",
    "Playlist sur mesure selon vos goûts"
  ],
  galleryImages: [
    { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop", alt: "Console DJ" },
    { src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=400&fit=crop", alt: "Ambiance piste de danse" },
    { src: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=600&h=400&fit=crop", alt: "Éclairage soirée" },
    { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop", alt: "DJ en action" }
  ],
  testimonials: [
    { quote: "La piste de danse n'a jamais désempli ! Une ambiance de folie du début à la fin.", author: "Emma & Lucas", date: "Mariage Juillet 2024" },
    { quote: "Il a su parfaitement s'adapter à nos goûts tout en faisant plaisir à tout le monde.", author: "Camille & Maxime", date: "Mariage Juin 2024" }
  ]
};

const DJ = () => {
  return <PrestataireTemplate data={djData} slug="dj" />;
};

export default DJ;
