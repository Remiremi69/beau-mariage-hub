import type { DrawerContent } from './PresentationDrawer';

import chefSebastien from '@/assets/chef-sebastien.jpg';

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
  title: 'Ce qui est servi',
  subtitle: 'Beaujolais · Tout inclus',
  sections: [
    {
      type: 'highlight',
      content: {
        text: '« Pas de liste de vins à choisir. Le cocktail est là, les bières aussi. »',
      },
    },
    {
      type: 'list',
      content: {
        title: 'INCLUS — SELON VOTRE FORMULE',
        items: [
          'Crémant de Bourgogne à l\'arrivée (formule Terroir Vivant)',
          'Bélini crème de pêche blanche, prosecco (formule Le Seuil Signature)',
          'Eau plate et gazeuse (Evian, Perrier)',
          'Citronnade maison et jus de fruits artisanaux',
        ],
      },
    },
    {
      type: 'list',
      content: {
        title: 'OPTION — BIÈRE ARTISANALE KACHMAR',
        items: [
          'Brassée à Villefranche-sur-Saône — Beaujolais',
          'Trois styles : Blonde · Dorée · Blanche',
          'Service en fût, tireuse livrée, gobelets inclus',
          'En complément du cocktail — add-on disponible',
        ],
      },
    },
    {
      type: 'text',
      content: {
        body: 'Service assuré par J&J Traiteur. Aucun prestataire boissons à gérer de votre côté.',
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
  title: 'Les formules décoration',
  subtitle: 'Sève · Pierre & Lumière',
  sections: [
    {
      type: 'highlight',
      content: {
        text: '« Même formule = 30 min de retouches. Changement de formule = 2h max. Tout est prévu pour les 5 mariages. »',
      },
    },
    {
      type: 'list',
      content: {
        title: 'KIT FIXE LIMEN — INSTALLÉ UNE FOIS',
        items: [
          'Compositions florales séchées ×13 sur pieds dorés fins H.80-90cm',
          'Pampa blanc naturel + eucalyptus + gypsophile',
          'Compositions bar pressoir caveau — grands vases verre',
          'Arche cérémonie métal doré habillée de floraux séchés',
          'Tapis allée cérémonie lin brut',
          'Guirlandes salle — déjà installées sur poutres (inclus domaine)',
        ],
      },
    },
    {
      type: 'list',
      content: {
        title: 'FORMULE SÈVE — VÉGÉTAL, TERRACOTTA, LIN BRUT',
        items: [
          'Nappage lin brut beige — table impériale + tables rondes',
          'Serviettes lin beige — pliage simple',
          'Vaisselle grès beige/ivoire — assiette plate + creuse',
          'Couverts inox brossé 5 pièces',
          'Verres transparents — vin + eau',
          'Chemin de table jute sur table impériale',
          'Bougies pilier ivoire H.20cm — 2/table ronde, 6/table impériale',
          'Photophores verre naturel — 2/table ronde',
        ],
      },
    },
    {
      type: 'list',
      content: {
        title: 'FORMULE PIERRE & LUMIÈRE — BLANC PUR, MINIMALISME',
        items: [
          'Nappage blanc damassé épais — 10 tables rondes',
          'Serviettes blanc coton épais — pliage sobre',
          'Vaisselle porcelaine blanche premium',
          'Couverts inox brossé 5 pièces',
          'Verres cristallin — vin + eau',
          'Aucun chemin de table — épure totale',
          'Bougies pilier blanc H.25cm — 2/table',
        ],
      },
    },
    {
      type: 'text',
      content: {
        body: 'La décoration est installée la veille du mariage par notre équipe. Vous pouvez apporter vos propres éléments personnels — photos, objets de famille, signalétique — qui s\'intègreront à l\'univers choisi.',
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
