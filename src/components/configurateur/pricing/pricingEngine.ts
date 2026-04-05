import {
  ConfigurateurState,
  OPTION_PRICES,
  OPTION_LABELS,
} from '../pricingTypes'

export type PriceLine = {
  label: string
  sublabel?: string
  amount: number
  isIncluded: boolean
  isEstimate?: boolean
}

export type PriceBreakdown = {
  lines: PriceLine[]
  subtotalFixe: number
  subtotalRepas: number
  subtotalOptions: number
  totalEstimate: number
  totalPerPerson: number
  hasRepasEstimate: boolean
}

const BASE_FORFAIT = 8500

const REPAS_PRIX: Record<string, number> = {
  essentiel: 65,
  gastronomique: 90,
  prestige: 130,
}

const DECO_PRIX: Record<string, number> = {
  champetre: 0,
  boheme: 600,
  elegance: 1200,
}

const CEREMONIE_PRIX = 800

const PHOTO_PRIX: Record<string, number> = {
  none: 0,
  reportage: 1800,
  premium: 3200,
}

const DJ_PRIX: Record<string, number> = {
  none: 0,
  standard: 1200,
  premium: 2100,
}

const repasLabelMap: Record<string, string> = {
  essentiel: 'Essentiel',
  gastronomique: 'Gastronomique',
  prestige: 'Prestige',
}
const decoLabelMap: Record<string, string> = {
  champetre: 'Champêtre',
  boheme: 'Bohème Moderne',
  elegance: 'Élégance Intemporelle',
}
const photoLabelMap: Record<string, string> = {
  none: '',
  reportage: 'Reportage',
  premium: 'Premium Duo',
}
const djLabelMap: Record<string, string> = {
  none: '',
  standard: 'Standard',
  premium: 'Premium',
}

export function calculateBreakdown(state: ConfigurateurState): PriceBreakdown {
  const lines: PriceLine[] = []
  const g = state.guests

  lines.push({
    label: 'Forfait Domaine',
    sublabel: 'Salle, cuisine, coordination, ménage',
    amount: BASE_FORFAIT,
    isIncluded: false,
  })

  if (state.ceremonieLaique) {
    lines.push({
      label: 'Cérémonie laïque',
      sublabel: 'Officiant + sonorisation',
      amount: CEREMONIE_PRIX,
      isIncluded: false,
    })
  }

  // Vin d'honneur — entièrement inclus dans le forfait
  lines.push({
    label: 'Vin d\'honneur',
    sublabel: 'Champagne, vins beaujolais, bouchées & mignardises',
    amount: 0,
    isIncluded: true,
  })

  const repasPrixUnit = REPAS_PRIX[state.repas] ?? 65
  lines.push({
    label: 'Repas — ' + (repasLabelMap[state.repas] ?? ''),
    sublabel: `${repasPrixUnit} € × ${g} invités · Prix définitif après confirmation`,
    amount: repasPrixUnit * g,
    isIncluded: false,
    isEstimate: true,
  })

  const decoPrix = DECO_PRIX[state.deco] ?? 0
  if (decoPrix > 0) {
    lines.push({
      label: 'Décoration — ' + (decoLabelMap[state.deco] ?? ''),
      amount: decoPrix,
      isIncluded: false,
    })
  } else {
    lines.push({
      label: 'Décoration — Champêtre Authentique',
      sublabel: 'Fleurs locales, bougies, lin brut',
      amount: 0,
      isIncluded: true,
    })
  }

  const photoPrix = PHOTO_PRIX[state.photographe] ?? 0
  if (photoPrix > 0) {
    lines.push({
      label: 'Photographe — ' + (photoLabelMap[state.photographe] ?? ''),
      amount: photoPrix,
      isIncluded: false,
    })
  }

  const djPrix = DJ_PRIX[state.dj] ?? 0
  if (djPrix > 0) {
    lines.push({
      label: 'DJ — ' + (djLabelMap[state.dj] ?? ''),
      amount: djPrix,
      isIncluded: false,
    })
  }

  const safeOptions = state.options ?? []
  for (const optionId of safeOptions) {
    const prix = OPTION_PRICES[optionId]
    if (prix) {
      lines.push({
        label: OPTION_LABELS[optionId] ?? optionId,
        amount: prix,
        isIncluded: false,
      })
    }
  }

  const repasAmount = repasPrixUnit * g
  const subtotalFixe = lines
    .filter((l) => !l.isEstimate && !l.isIncluded)
    .reduce((sum, l) => sum + l.amount, 0)
  const subtotalRepas = repasAmount
  const subtotalOptions = safeOptions.reduce(
    (sum, id) => sum + (OPTION_PRICES[id] || 0),
    0
  )
  const totalEstimate = subtotalFixe + subtotalRepas + subtotalOptions
  const totalPerPerson = g > 0 ? Math.round(totalEstimate / g) : 0

  return {
    lines,
    subtotalFixe,
    subtotalRepas,
    subtotalOptions,
    totalEstimate,
    totalPerPerson,
    hasRepasEstimate: true,
  }
}
