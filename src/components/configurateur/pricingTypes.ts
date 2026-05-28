export type Repas = 'menu1' | 'menu2'

export type Photographe = 'essentielle' | 'signature'

export type DJChoice = {
  sonoVH: boolean
  effetPrestige: boolean
  barVinyles: boolean
}

export type Deco = 'seve' | 'pierre'

export type ConfigurateurState = {
  currentStep: number
  date: string | null
  guests: number
  preparation: {
    lieuGite: boolean
    maquilleuse: boolean
    coiffeuse: boolean
    photographePrep: boolean
  }
  ceremonieLaique: boolean
  violonisteOption: boolean
  vhBouchee: string | null
  vhAnimation: string | null
  vhMignardise: string | null
  repas: Repas
  repasEntree: string | null
  repasPlat: string | null
  repasDessert: string | null
  photographe: Photographe
  dj: DJChoice
  deco: Deco
  options: string[]
  ambianceMusique: string[]
  contact: { prenom: string; email: string; telephone: string }
  totalEstimate: number
  localisation: 'local' | 'distance' | null
  rdvSemaine: string | null
  rdvJour: string | null
  rdvCreneau: string | null
  adresseLivraison: {
    rue: string
    cp: string
    ville: string
    pays: string
  } | null
  coffretDemande: boolean
  siteMariage: boolean
}


export const defaultState: ConfigurateurState = {
  currentStep: 0,
  date: null,
  guests: 80,
  preparation: {
    lieuGite: false,
    maquilleuse: false,
    coiffeuse: false,
    photographePrep: false,
  },

  ceremonieLaique: false,
  violonisteOption: false,
  vhBouchee: null,
  vhAnimation: null,
  vhMignardise: null,
  repas: 'menu1',
  repasEntree: null,
  repasPlat: null,
  repasDessert: null,
  photographe: 'essentielle',
  dj: { sonoVH: false, effetPrestige: false, barVinyles: false },
  deco: 'seve',
  options: [],
  ambianceMusique: [],
  contact: { prenom: '', email: '', telephone: '' },
  totalEstimate: 0,
  localisation: null,
  rdvSemaine: null,
  rdvJour: null,
  rdvCreneau: null,
  adresseLivraison: null,
  coffretDemande: false,
  siteMariage: true,
}

export const OPTION_PRICES: Record<string, number> = {
  photobooth: 400,
  cocktail_bar: 600,
  feu_artifice: 1800,
  voiture_collection: 550,
  livre_or: 280,
  candy_bar: 350,
  caricaturiste: 480,
  lanternes: 220,
  nuit_nuptiale: 350,
  'couverts-dores': 110,
  'verres-fumes': 180,
  'bougies-tapers-noires': 225,
  'chemin-velours': 100,
  'photophores-fumes': 60,
  'service-bar-2h': 0,
  'soupe-oignon': 0,
  'preparation-lieu': 0,
  'preparation-maquilleuse': 0,
  'preparation-coiffeuse': 0,
  'preparation-photographe': 0,
}


export const OPTION_LABELS: Record<string, string> = {
  photobooth: 'Photobooth Premium',
  cocktail_bar: 'Bar à cocktails',
  feu_artifice: 'Feu d\'artifice',
  voiture_collection: 'Voiture de collection',
  livre_or: 'Livre d\'or Limen',
  candy_bar: 'Sweet Table',
  caricaturiste: 'Caricaturiste',
  lanternes: 'Lâcher de lanternes',
  nuit_nuptiale: 'Nuit nuptiale',
  'couverts-dores': 'Couverts dorés mat',
  'verres-fumes': 'Verres fumés',
  'bougies-tapers-noires': 'Bougies tapers noires ×60',
  'chemin-velours': 'Chemin de table velours',
  'photophores-fumes': 'Photophores fumés ×50',
  'service-bar-2h': 'Service bar — 2 heures',
  'soupe-oignon': 'Soupe à l\'oignon',
}
