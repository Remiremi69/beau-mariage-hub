import type { DrawerContent } from './PresentationDrawer';

import chefSebastien from '@/assets/chef-sebastien.jpg';
import julienSommelier from '@/assets/julien-sommelier.jpg';
import photographeAlexandre from '@/assets/photographe-alexandre.jpg';

import domaineHero2 from '@/assets/domaine-hero-2.png';
import domaineHero3 from '@/assets/domaine-hero-3.png';
import domaineHero4 from '@/assets/domaine-hero-4.png';

export const drawerDomaine: DrawerContent = {
  label: 'LE LIEU',
  title: 'Domaine de la Croix Rochefort',
  subtitle: 'Beaujolais · France',
  sections: [
    {
      type: 'gallery',
      content: {
        images: [domaineHero2, domaineHero3, domaineHero4],
        caption: 'Le domaine au fil des saisons',
      },
    },
    {
      type: 'highlight',
      content: {
        text: '« Un domaine familial au cœur du Beaujolais, entouré de vignes et de pierres centenaires. »',
      },
    },
    {
      type: 'text',
      content: {
        body: 'Niché dans les collines du Beaujolais, le Domaine de la Croix Rochefort offre un cadre exceptionnel pour votre mariage. Ses murs en pierre dorée, sa grande salle de réception et ses espaces extérieurs en font un lieu unique, intimiste et profondément ancré dans le terroir.',
      },
    },
    {
      type: 'list',
      content: {
        title: 'CE QUI EST INCLUS',
        items: [
          'Grande salle de réception (jusqu\'à 200 personnes)',
          'Cuisine professionnelle équipée',
          'Espaces extérieurs & jardins privatisés',
          'Parking sécurisé sur site',
          'Hébergement de l\'équipe Limen',
          'Coordination le jour J incluse',
          'Ménage complet avant et après',
          'Accès dès la veille pour la décoration',
        ],
      },
    },
    {
      type: 'list',
      content: {
        title: 'INFOS PRATIQUES',
        items: [
          'Beaujolais — à 45 min de Lyon',
          'Accès A6 sortie Belleville-sur-Saône',
          'Gare TGV Mâcon à 30 min',
          'Hôtels partenaires à 10 min du domaine',
        ],
      },
    },
  ],
};

export const drawerCeremonie: DrawerContent = {
  label: 'LA CÉRÉMONIE',
  title: 'L\'officiant',
  subtitle: 'Cérémonie sur-mesure',
  sections: [
    {
      type: 'highlight',
      content: {
        text: '« Une cérémonie laïque n\'est pas un discours. C\'est une conversation entre vous deux, portée par un tiers. »',
      },
    },
    {
      type: 'text',
      content: {
        body: 'Notre officiant partenaire intervient exclusivement sur les mariages Limen. Il rencontre les mariés trois mois avant le jour J pour construire ensemble une cérémonie qui leur ressemble — leurs mots, leur histoire, leurs rituels choisis.',
      },
    },
    {
      type: 'list',
      content: {
        title: 'DÉROULÉ TYPE',
        items: [
          'Entretien préparatoire (2h) — 3 mois avant',
          'Rédaction collaborative du discours',
          'Répétition sur site — la veille si souhaité',
          'Cérémonie 30 à 45 minutes',
          'Rituels au choix : sable, bougie, arbre...',
          'Remise du texte enluminé après la cérémonie',
        ],
      },
    },
    {
      type: 'list',
      content: {
        title: 'OPTIONS DE RITUELS',
        items: [
          'Rituel du sable — mélange symbolique',
          'Rituel de la bougie — transmission de lumière',
          'Plantation d\'un arbre — ancrage dans le vivant',
          'Lecture de vœux personnels',
          'Participation des enfants ou proches',
        ],
      },
    },
  ],
};

export const drawerVin: DrawerContent = {
  label: 'LE VIN D\'HONNEUR',
  title: 'Le sommelier',
  subtitle: 'Sélection Beaujolais',
  sections: [
    {
      type: 'profile',
      content: {
        imageSlot: 'julien-sommelier',
        imageUrl: julienSommelier,
        name: 'Julien M.',
        role: 'Sommelier · 14 ans d\'expérience',
        bio: 'Julien sélectionne chaque année les domaines viticoles du Beaujolais qui composent notre cave. Natif de la région, il connaît chaque vigneron personnellement et choisit des cuvées introuvables en grande distribution.',
        details: [
          'Sélection 100% Beaujolais & Bourgogne',
          'Domaines à moins de 15 km du lieu',
          'Vins bio et biodynamiques privilégiés',
          'Accords mets-vins personnalisés',
        ],
      },
    },
    {
      type: 'highlight',
      content: {
        text: '« Chaque bouteille a une histoire. Nous vous la racontons. »',
      },
    },
    {
      type: 'list',
      content: {
        title: 'NOS DOMAINES PARTENAIRES',
        items: [
          'Domaine de la Madone — Fleurie',
          'Château Thivin — Côte de Brouilly',
          'Domaine Vissoux — Moulin-à-Vent',
          'Jean-Paul Brun — Terres Dorées',
          'Marcel Lapierre — Morgon nature',
        ],
      },
    },
  ],
};

export const drawerRepas: DrawerContent = {
  label: 'LA CUISINE',
  title: 'Le chef',
  subtitle: 'Cuisine de terroir & création',
  sections: [
    {
      type: 'profile',
      content: {
        imageSlot: 'chef-sebastien',
        imageUrl: chefSebastien,
        name: 'Sébastien R.',
        role: 'Chef · Ancien second étoilé',
        bio: 'Sébastien a quitté la gastronomie parisienne pour revenir à ses racines beaujolaises. Sa cuisine puise dans le terroir local — producteurs du village, herbes du jardin, gibier de saison — pour créer des assiettes qui racontent un territoire.',
        details: [
          'Menu composé selon la saison & le marché',
          'Producteurs locaux référencés & visités',
          'Option végétarienne sur chaque service',
          'Allergènes gérés individuellement',
          'Rencontre possible avec les mariés sur demande',
        ],
      },
    },
    {
      type: 'highlight',
      content: {
        text: '« Un repas de mariage doit être le meilleur repas que vos invités aient jamais eu. »',
      },
    },
    {
      type: 'list',
      content: {
        title: 'LA BRIGADE LE JOUR J',
        items: [
          '1 chef de cuisine + 2 commis',
          '1 chef pâtissier dédié',
          'Service assuré par Manon & son équipe',
          'Ratio 1 serveur pour 12 invités',
        ],
      },
    },
  ],
};

export const drawerPhotographe: DrawerContent = {
  label: 'LA MÉMOIRE',
  title: 'Alexandre M.',
  subtitle: 'Photographe de mariage · 8 ans',
  sections: [
    {
      type: 'profile',
      content: {
        imageSlot: 'photographe-alexandre',
        imageUrl: photographeAlexandre,
        name: 'Alexandre M.',
        role: 'Photographe · Reportage & Portrait',
        bio: 'Alexandre travaille exclusivement en lumière naturelle et en discrétion totale. Il ne pose jamais ses sujets — il attend le moment, puis il le prend. Ses mariages ressemblent à des films muets dont chaque image raconte quelque chose.',
        details: [
          '8 ans de reportages de mariage',
          'Plus de 200 mariages photographiés',
          'Lumière naturelle exclusivement',
          'Galerie privée livrée sous 4 semaines',
          'Droits de reproduction complets inclus',
        ],
      },
    },
    {
      type: 'highlight',
      content: {
        text: '« Je ne photographie pas des mariages. Je photographie des gens qui s\'aiment ce jour-là. »',
      },
    },
    {
      type: 'list',
      content: {
        title: 'FORMULE PREMIUM — CLARA V.',
        items: [
          'Vidéaste dédiée toute la journée',
          'Film cinématique 5-7 minutes',
          'Teaser 60 secondes sous 2 semaines',
          'Son ambiant + musique sur-mesure',
          'Format optimisé réseaux & projection',
        ],
      },
    },
  ],
};

export const drawerDJ: DrawerContent = {
  label: 'LA NUIT',
  title: 'Marcus D.',
  subtitle: 'DJ mariage & événements · 12 ans',
  sections: [
    {
      type: 'profile',
      content: {
        imageSlot: 'dj-marcus',
        imageUrl: '',
        name: 'Marcus D.',
        role: 'DJ · Lecteur de salle',
        bio: 'Marcus ne joue pas une setlist préparée. Il lit la salle, sent l\'énergie, et construit sa soirée en temps réel. Il a fait danser des salles entières jusqu\'au lever du soleil à Croix Rochefort — et il connaît chaque recoin acoustique du domaine.',
        details: [
          '12 ans de mariages & événements privés',
          'Sono professionnelle Funktion-One (formule Premium)',
          'Consultation musicale 1 mois avant',
          'Coordination avec le photographe incluse',
          'Playlist de secours gérée si besoin',
        ],
      },
    },
    {
      type: 'highlight',
      content: {
        text: '« La meilleure soirée est celle où personne ne veut rentrer. »',
      },
    },
    {
      type: 'list',
      content: {
        title: 'MATÉRIEL INCLUS',
        items: [
          'Sono JBL professionnelle (formule Standard)',
          'Sono Funktion-One haute fidélité (Premium)',
          'Jeu de lumières scénique complet',
          'Système d\'éclairage architectural (Premium)',
          'Micro HF pour discours & animations',
        ],
      },
    },
  ],
};

export const drawerDeco: DrawerContent = {
  label: 'L\'ATMOSPHÈRE',
  title: 'L\'équipe décoration',
  subtitle: 'Installation & scénographie',
  sections: [
    {
      type: 'highlight',
      content: {
        text: '« La décoration est installée la veille. Le jour J, vous n\'avez rien à gérer. »',
      },
    },
    {
      type: 'text',
      content: {
        body: 'Notre équipe déco travaille en étroite collaboration avec les fleuristes locaux du Beaujolais. Toutes les fleurs sont coupées au maximum 48h avant le mariage pour garantir leur fraîcheur le jour J. L\'installation commence la veille à 14h et se termine le matin même si besoin.',
      },
    },
    {
      type: 'list',
      content: {
        title: 'CE QUI EST TOUJOURS INCLUS',
        items: [
          'Centres de table (fleurs de saison locales)',
          'Bougies & photophores sur toutes les tables',
          'Signalétique & plan de table',
          'Éclairage d\'ambiance tamisé',
          'Installation & démontage complets',
        ],
      },
    },
    {
      type: 'list',
      content: {
        title: 'VOS ÉLÉMENTS PERSONNELS',
        items: [
          'Photos de famille intégrées sur demande',
          'Objets personnels incorporés au décor',
          'Couleurs personnalisables sur devis',
          'Fleurs spécifiques sur commande anticipée',
        ],
      },
    },
  ],
};

export const drawerOptions: DrawerContent = {
  label: 'LES EXTRAS',
  title: 'Pourquoi ces options ?',
  subtitle: 'Des détails qui restent',
  sections: [
    {
      type: 'highlight',
      content: {
        text: '« Ce sont vos invités qui se souviendront du feu d\'artifice. Vous, vous vous souviendrez de leurs visages. »',
      },
    },
    {
      type: 'text',
      content: {
        body: 'Chaque option a été sélectionnée parce qu\'elle crée un souvenir distinct. Pas du remplissage — des moments. Le calligraphe qui dessine les visages pendant le dîner. Le feu d\'artifice à minuit. Le livre d\'or que vous relirez dans vingt ans.',
      },
    },
    {
      type: 'list',
      content: {
        title: 'NOS PRESTATAIRES OPTIONS',
        items: [
          'Photobooth : borne Instax vintage, impressions instantanées',
          'Feu d\'artifice : artificier agréé, synchronisé musique',
          'Caricaturiste : artiste présent 3h, croquis remis en souvenir',
          'Calligraphe : livre d\'or enluminé pendant le vin d\'honneur',
          'Voiture : collection privée, chauffeur en livrée',
        ],
      },
    },
  ],
};
