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
