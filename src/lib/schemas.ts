const BASE_URL = 'https://lebeaumariage.fr';
const ORG_NAME = 'Le Beau Mariage';

const organization = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: ORG_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  email: 'remi@lebeaumariage.fr',
  areaServed: ['Lyon', 'Beaujolais', 'Rhône-Alpes', 'France'],
  description: 'Mariages clé en main au Domaine de la Croix Rochefort en Beaujolais. Lieu, traiteur, photographe, DJ — prix fixe tout compris.',
};

const venue = {
  '@type': 'Place',
  '@id': `${BASE_URL}/serie-octobre-2027/domaine#venue`,
  name: 'Domaine de la Croix Rochefort',
  description: "Domaine viticole privatisable en Beaujolais pour mariages. Cave voûtée 600m², salle de réception 500m², jusqu'à 300 convives.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Domaine de la Croix Rochefort',
    addressLocality: 'Saint-Didier-sur-Beaujeu',
    postalCode: '69430',
    addressRegion: 'Auvergne-Rhône-Alpes',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.1522,
    longitude: 4.5791,
  },
  maximumAttendeeCapacity: 300,
};

export const schemaHome = [
  { '@context': 'https://schema.org', ...organization },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: BASE_URL,
    name: ORG_NAME,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mariage clé en main Beaujolais',
    serviceType: 'Organisation de mariage',
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: { '@type': 'Place', name: 'Beaujolais, Lyon, Rhône-Alpes' },
    description: 'Formule mariage tout compris au cœur du Beaujolais : lieu privatisé, traiteur gastronomique, photographe, DJ, décoration. Prix fixe transparent.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '12000',
      highPrice: '34000',
      description: "Prix selon configuration : nombre d'invités (50–300), formule repas (Essentiel 65€/pers., Gastronomique 90€/pers., Prestige 130€/pers.), photographe, DJ et options. Devis personnalisé en 10 minutes.",
      availability: 'https://schema.org/LimitedAvailability',
    },
  },
];

export const schemaDomaine = [
  { '@context': 'https://schema.org', ...venue },
  {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: 'Domaine de la Croix Rochefort — Salle de mariage Beaujolais',
    ...venue,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Cave voûtée privatisable', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Salle de réception 500m²', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Domaine viticole', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking privé', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'À 40 minutes de Lyon', value: true },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Série Octobre 2027', item: `${BASE_URL}/serie-octobre-2027` },
      { '@type': 'ListItem', position: 3, name: 'Domaine de la Croix Rochefort', item: `${BASE_URL}/serie-octobre-2027/domaine` },
    ],
  },
];

export const schemaSerie = [
  {
    '@context': 'https://schema.org',
    '@type': 'EventSeries',
    name: 'Série Octobre 2027 — Mariages clé en main Beaujolais',
    url: `${BASE_URL}/serie-octobre-2027`,
    startDate: '2027-10-04',
    endDate: '2027-10-08',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    description: "Cinq mariages d'exception au Domaine de la Croix Rochefort en Beaujolais. Formule tout compris : lieu privatisé, traiteur gastronomique, photographe, DJ, décoration et coordination. À partir de 15 000€.",
    location: {
      '@type': 'Place',
      name: 'Domaine de la Croix Rochefort',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Domaine de la Croix Rochefort',
        addressLocality: 'Saint-Didier-sur-Beaujeu',
        postalCode: '69430',
        addressRegion: 'Auvergne-Rhône-Alpes',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 46.1522,
        longitude: 4.5791,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Le Beau Mariage',
      url: BASE_URL,
    },
    performer: {
      '@type': 'Organization',
      name: 'Le Beau Mariage',
      url: BASE_URL,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '12000',
      highPrice: '34000',
      availability: 'https://schema.org/LimitedAvailability',
      validFrom: '2026-01-01',
      url: `${BASE_URL}/configurateur`,
    },
    subEvent: [
      {
        '@type': 'Event',
        name: 'Mariage du 4 octobre 2027 — Domaine de la Croix Rochefort',
        startDate: '2027-10-04T14:00:00+02:00',
        endDate: '2027-10-05T02:00:00+02:00',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        description: "Mariage clé en main au Domaine de la Croix Rochefort en Beaujolais. Formule all-inclusive de 12 000€ à 34 000€ selon configuration.",
        location: {
          '@type': 'Place',
          name: 'Domaine de la Croix Rochefort',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Saint-Didier-sur-Beaujeu',
            postalCode: '69430',
            addressCountry: 'FR',
          },
        },
        organizer: { '@type': 'Organization', name: 'Le Beau Mariage', url: BASE_URL },
        performer: { '@type': 'Organization', name: 'Le Beau Mariage', url: BASE_URL },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: '12000',
          highPrice: '34000',
          availability: 'https://schema.org/LimitedAvailability',
          url: `${BASE_URL}/configurateur`,
        },
      },
      {
        '@type': 'Event',
        name: 'Mariage du 5 octobre 2027 — Domaine de la Croix Rochefort',
        startDate: '2027-10-05T14:00:00+02:00',
        endDate: '2027-10-06T02:00:00+02:00',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        description: "Mariage clé en main au Domaine de la Croix Rochefort en Beaujolais. Formule all-inclusive de 12 000€ à 34 000€ selon configuration.",
        location: {
          '@type': 'Place',
          name: 'Domaine de la Croix Rochefort',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Saint-Didier-sur-Beaujeu',
            postalCode: '69430',
            addressCountry: 'FR',
          },
        },
        organizer: { '@type': 'Organization', name: 'Le Beau Mariage', url: BASE_URL },
        performer: { '@type': 'Organization', name: 'Le Beau Mariage', url: BASE_URL },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: '12000',
          highPrice: '34000',
          availability: 'https://schema.org/LimitedAvailability',
          url: `${BASE_URL}/configurateur`,
        },
      },
      {
        '@type': 'Event',
        name: 'Mariage du 6 octobre 2027 — Domaine de la Croix Rochefort',
        startDate: '2027-10-06T14:00:00+02:00',
        endDate: '2027-10-07T02:00:00+02:00',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        description: "Mariage clé en main au Domaine de la Croix Rochefort en Beaujolais. Formule all-inclusive de 12 000€ à 34 000€ selon configuration.",
        location: {
          '@type': 'Place',
          name: 'Domaine de la Croix Rochefort',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Saint-Didier-sur-Beaujeu',
            postalCode: '69430',
            addressCountry: 'FR',
          },
        },
        organizer: { '@type': 'Organization', name: 'Le Beau Mariage', url: BASE_URL },
        performer: { '@type': 'Organization', name: 'Le Beau Mariage', url: BASE_URL },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: '12000',
          highPrice: '34000',
          availability: 'https://schema.org/LimitedAvailability',
          url: `${BASE_URL}/configurateur`,
        },
      },
      {
        '@type': 'Event',
        name: 'Mariage du 7 octobre 2027 — Domaine de la Croix Rochefort',
        startDate: '2027-10-07T14:00:00+02:00',
        endDate: '2027-10-08T02:00:00+02:00',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        description: "Mariage clé en main au Domaine de la Croix Rochefort en Beaujolais. Formule all-inclusive de 12 000€ à 34 000€ selon configuration.",
        location: {
          '@type': 'Place',
          name: 'Domaine de la Croix Rochefort',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Saint-Didier-sur-Beaujeu',
            postalCode: '69430',
            addressCountry: 'FR',
          },
        },
        organizer: { '@type': 'Organization', name: 'Le Beau Mariage', url: BASE_URL },
        performer: { '@type': 'Organization', name: 'Le Beau Mariage', url: BASE_URL },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: '12000',
          highPrice: '34000',
          availability: 'https://schema.org/LimitedAvailability',
          url: `${BASE_URL}/configurateur`,
        },
      },
      {
        '@type': 'Event',
        name: 'Mariage du 8 octobre 2027 — Domaine de la Croix Rochefort',
        startDate: '2027-10-08T14:00:00+02:00',
        endDate: '2027-10-09T02:00:00+02:00',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        description: "Mariage clé en main au Domaine de la Croix Rochefort en Beaujolais. Formule all-inclusive de 12 000€ à 34 000€ selon configuration.",
        location: {
          '@type': 'Place',
          name: 'Domaine de la Croix Rochefort',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Saint-Didier-sur-Beaujeu',
            postalCode: '69430',
            addressCountry: 'FR',
          },
        },
        organizer: { '@type': 'Organization', name: 'Le Beau Mariage', url: BASE_URL },
        performer: { '@type': 'Organization', name: 'Le Beau Mariage', url: BASE_URL },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: '12000',
          highPrice: '34000',
          availability: 'https://schema.org/LimitedAvailability',
          url: `${BASE_URL}/configurateur`,
        },
      },
    ],
  },
];

export const schemaFAQ = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

export const schemaConcept = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Le concept Le Beau Mariage — Mariage clé en main Beaujolais',
  description: "Comment fonctionne notre formule mariage tout compris en Beaujolais. Un lieu d'exception, des prestataires certifiés, un prix fixe transparent.",
  author: { '@id': `${BASE_URL}/#organization` },
  publisher: { '@id': `${BASE_URL}/#organization` },
  mainEntityOfPage: `${BASE_URL}/concept`,
};

export const schemaConfigurateur = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Configurateur de mariage Le Beau Mariage',
  description: 'Créez votre devis de mariage en 10 minutes. Prix transparent, formule tout compris Beaujolais.',
  applicationCategory: 'Wedding Planning',
  url: `${BASE_URL}/configurateur`,
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    lowPrice: '12000',
    highPrice: '34000',
  },
};
