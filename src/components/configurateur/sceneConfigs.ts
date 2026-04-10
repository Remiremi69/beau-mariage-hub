import type { SceneConfig } from "./TransitionScene";

import domaine2 from "@/assets/domaine-hero-2.png";
import domaine3 from "@/assets/domaine-hero-3.png";
import domaine4 from "@/assets/domaine-hero-4.png";
import ceremonyArch from "@/assets/ceremony-arch.jpg";
import chefSebastien from "@/assets/chef-sebastien.jpg";
import tableSetup from "@/assets/table-setup.jpg";
import julienSommelier from "@/assets/julien-sommelier.jpg";
import venueExterior from "@/assets/venue-exterior.jpg";
import decoBoheme1 from "@/assets/deco-boheme-moderne-1.jpg";
import decoChampetre1 from "@/assets/deco-champetre-1.jpg";
import decoRomantique from "@/assets/deco-romantique.jpg";
import heroWedding from "@/assets/hero-wedding.jpg";

// Scene triggered BEFORE each destination step (forward only)
export const SCENE_CONFIGS: Record<number, SceneConfig> = {
  // Before Step 1 — Date
  1: {
    title: "Votre domaine",
    subtitle: "Domaine de la Croix Rochefort · Beaujolais",
    images: [
      "https://i.postimg.cc/x1YWXFrv/9-accueil-le-caveau.jpg",
      "https://i.postimg.cc/5yVmsTSP/876-domaine-de-lanbspcroixnbsprochefort.jpg",
      "https://i.postimg.cc/4xJSf7VZ/420-katleenetcharly-01juin2024-3-127973-172232023480734.jpg",
    ],
    duration: 3500,
  },

  // Before Step 3 — Cérémonie
  3: {
    title: "Votre cérémonie",
    subtitle: "Un moment rien qu'à vous",
    images: [ceremonyArch, venueExterior],
    duration: 3200,
  },

  // Before Step 4 — Vin d'honneur
  4: {
    title: "Votre vin d'honneur",
    subtitle: "Dans les jardins du domaine",
    images: [venueExterior, domaine4, julienSommelier],
    duration: 3000,
  },

  // Before Step 5 — Repas
  5: {
    title: "Votre table",
    subtitle: "Chef Sébastien · Cuisine de terroir",
    images: [tableSetup, chefSebastien],
    duration: 4000,
  },

  // Before Step 8 — Déco
  8: {
    title: "Votre atmosphère",
    subtitle: "L'espace qui vous ressemble",
    images: [decoBoheme1, decoChampetre1, decoRomantique],
    duration: 3500,
  },

  // Before Step 10 — Site mariage
  10: {
    title: "Votre présence en ligne",
    subtitle: "Partagée avec élégance",
    images: [heroWedding, domaine2],
    duration: 3000,
  },

  // Before Step 11 — Récap
  11: {
    title: "Votre mariage",
    subtitle: "Tout est là",
    images: [domaine2, tableSetup, ceremonyArch],
    duration: 4000,
  },
};
