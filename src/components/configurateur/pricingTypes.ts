export type VinDhonneur = 'decouverte' | 'prestige' | 'grand-cru'

export type Repas = 'essentiel' | 'gastronomique' | 'prestige'

export type Photographe = 'none' | 'reportage' | 'premium'

export type DJ = 'none' | 'standard' | 'premium'

export type Deco = 'champetre' | 'boheme' | 'elegance'

export type ConfigurateurState = {
  currentStep: number
  date: string | null
  guests: number
  ceremonieLaique: boolean
  vinDhonneur: VinDhonneur
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
}

export const defaultState: ConfigurateurState = {
  currentStep: 0,
  date: null,
  guests: 80,
  ceremonieLaique: false,
  vinDhonneur: 'decouverte',
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
