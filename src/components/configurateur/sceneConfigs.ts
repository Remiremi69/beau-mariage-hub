import type { SceneConfig } from "./TransitionScene";

import domaine2 from "@/assets/domaine-hero-2.png";
import domaine3 from "@/assets/domaine-hero-3.png";
import domaine4 from "@/assets/domaine-hero-4.png";
import ceremonyArch from "@/assets/ceremony-arch.jpg";
import estherHero from "@/assets/esther-coutin-hero.jpg";
import estherCeremonie from "@/assets/esther-ceremonie-scene.jpg";
import estherMaries from "@/assets/esther-maries-moment.jpg";
import jjTraiteurPortrait from "@/assets/jj-traiteur-portrait.png";
import tableSetup from "@/assets/table-setup.jpg";
import julienSommelier from "@/assets/julien-sommelier.jpg";
import vhBeaujolaisVivant from "@/assets/vh-beaujolais-vivant.jpg";
import vhSeuilSignature from "@/assets/vh-seuil-signature.jpg";
import venueExterior from "@/assets/venue-exterior.jpg";
import decoBoheme1 from "@/assets/deco-boheme-moderne-1.jpg";
import decoChampetre1 from "@/assets/deco-champetre-1.jpg";
import decoRomantique from "@/assets/deco-romantique.jpg";
import heroWedding from "@/assets/hero-wedding.jpg";
import loicHero from "/images/loic-hero-contrejour-coucher-soleil.jpg";
import loicDanse from "/images/loic-galerie-danse-lumiere.jpg";
import loicFumigenes from "/images/loic-style-instant-fumigenes.jpg";

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

  // Before Step 4 — Cérémonie (was 3)
  4: {
    title: "Votre cérémonie",
    subtitle: "Esther Coutin · Maîtresse de cérémonie & officiante laïque",
    images: [estherHero, estherCeremonie, estherMaries],
    duration: 4000,
  },

  // Before Step 5 — Violoniste (was 4)
  5: {
    title: "Votre violoniste",
    subtitle: "Alexandre Medjaher Chomat · Violon & performance",
    images: [
      "/images/alexandre-hero-portrait-montagne.jpg",
      "/images/alexandre-performance-soiree.jpg",
      "/images/alexandre-philosophie-portrait-scene.jpg",
    ],
    duration: 3800,
  },

  // Before Step 6 — Vin d'honneur & Table (was 5)
  6: {
    title: "Votre vin d'honneur et votre table",
    subtitle: "Jessica & Jérôme · J&J Traiteur",
    images: [tableSetup, jjTraiteurPortrait, vhBeaujolaisVivant, vhSeuilSignature],
    duration: 4000,
  },

  // Before Step 7 — Photographe (was 6)
  7: {
    title: "Votre photographe",
    subtitle: "Loïc · Chaque image raconte quelque chose",
    images: [loicHero, loicDanse, loicFumigenes],
    duration: 4000,
  },

  // Before Step 8 — DJ (was 7)
  8: {
    title: "Votre soirée",
    subtitle: "Rémy & Jordan · Astrévia Events",
    images: [
      "/images/astrevia/hero-danse-fumee.jpg",
      "/images/astrevia/etincelles-couple.jpg",
      "/images/astrevia/salle-reception-bleue.jpg",
    ],
    duration: 4000,
  },

  // Before Step 9 — Déco (was 8)
  9: {
    title: "Votre atmosphère",
    subtitle: "L'espace qui vous ressemble",
    images: [decoBoheme1, decoChampetre1, decoRomantique],
    duration: 3500,
  },

  // Before Step 11 — Vos moments
  11: {
    title: "Vos moments",
    subtitle: "Ce qui n'appartient qu'à vous",
    images: [estherMaries, heroWedding],
    duration: 3000,
  },

  // Before Step 12 — Site mariage
  12: {
    title: "Votre présence en ligne",
    subtitle: "Partagée avec élégance",
    images: [heroWedding, domaine2],
    duration: 3000,
  },

  // Before Step 13 — Récap
  13: {
    title: "Votre mariage",
    subtitle: "Tout est là",
    images: [domaine2, tableSetup, ceremonyArch],
    duration: 4000,
  },
};
