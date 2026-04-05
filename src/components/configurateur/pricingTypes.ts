export type Repas = 'essentiel' | 'gastronomique' | 'prestige'

export type Photographe = 'none' | 'reportage' | 'premium'

export type DJ = 'none' | 'standard' | 'premium'

export type Deco = 'champetre' | 'boheme' | 'elegance'

export type ConfigurateurState = {
  currentStep: number
  date: string | null
  guests: number
  ceremonieLaique: boolean
  vhBouchee: string | null
  vhAnimation: string | null
  vhMignardise: string | null
  repas: Repas
  repasEntree: string | null
  repasPlat: string | null
  repasDessert: string | null
  photographe: Photographe
  dj: DJ
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
  ceremonieLaique: false,
  vhBouchee: null,
  vhAnimation: null,
  vhMignardise: null,
  repas: 'essentiel',
  repasEntree: null,
  repasPlat: null,
  repasDessert: null,
  photographe: 'none',
  dj: 'none',
  deco: 'champetre',
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
}
