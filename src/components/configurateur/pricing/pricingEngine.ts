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

const DOMAINE_PRIX = 2750

function getRepasPrixUnit(menu: string, guests: number): number {
  if (menu === 'menu2') {
    return guests <= 90 ? 88 : 87
  }
  return guests <= 90 ? 85 : 82
}

const DECO_PRIX: Record<string, number> = {
  seve: 0,
  pierre: 0,
}

const CEREMONIE_PRIX = 1040

const PHOTO_PRIX: Record<string, number> = {
  essentielle: 0,
  signature: 450,
}

const DJ_BASE_PRICE = 1020 // forfait animation absorbé dans la base
const DJ_SONO_VH_PRICE = 200
const DJ_PRESTIGE_PRICE = 320

const repasLabelMap: Record<string, string> = {
  menu1: 'Menu 1 — Tradition Beaujolais',
  menu2: 'Menu 2 — Signature Limen',
}
const decoLabelMap: Record<string, string> = {
  seve: 'Sève',
  pierre: 'Pierre & Lumière',
}
const photoLabelMap: Record<string, string> = {
  essentielle: 'Essentielle',
  signature: 'Signature',
}

export function calculateBreakdown(state: ConfigurateurState): PriceBreakdown {
  const lines: PriceLine[] = []
  const g = state.guests

  if (state.date) {
    lines.push({
      label: 'Location du Domaine',
      sublabel: 'Domaine de la Croix Rochefort · Saint-Didier-sur-Beaujeu',
      amount: DOMAINE_PRIX,
      isIncluded: false,
    })
  }

  if (state.preparation) {
    lines.push({
      label: 'Préparation des mariés',
      sublabel: 'Mise à disposition des suites · Accueil & coordination',
      amount: 400,
      isIncluded: false,
    })
  }

  if (state.ceremonieLaique) {
    lines.push({
      label: 'Cérémonie laïque',
      sublabel: 'Officiant + sonorisation',
      amount: CEREMONIE_PRIX,
      isIncluded: false,
    })
  }

  // Violoniste — show de base obligatoire pour le vin d'honneur
  lines.push({
    label: 'Violoniste — Show vin d\'honneur',
    sublabel: 'Alexandre Medjaher Chomat · 3 morceaux',
    amount: 750,
    isIncluded: false,
  })

  if (state.violonisteOption) {
    lines.push({
      label: 'Violoniste — Interventions complémentaires',
      sublabel: '1 morceau pendant le repas + 2 sur la piste',
      amount: 450,
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

  const repasPrixUnit = getRepasPrixUnit(state.repas, g)
  lines.push({
    label: 'Repas — ' + (repasLabelMap[state.repas] ?? ''),
    sublabel: 'Entrée · Plat · Dessert inclus · Ajusté à J−1 mois selon présents confirmés',
    amount: repasPrixUnit * g,
    isIncluded: true,
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
  lines.push({
    label: 'Photographie — ' + (photoLabelMap[state.photographe] ?? ''),
    sublabel: 'Loïc Cancade',
    amount: photoPrix,
    isIncluded: photoPrix === 0,
  })

  // DJ — animation incluse + add-ons
  lines.push({
    label: 'Animation musicale (DJ)',
    sublabel: 'Astrévia Events · 19h30 → 4h · Lumière d\'ambiance',
    amount: 0,
    isIncluded: true,
  })
  if (state.dj.sonoVH) {
    lines.push({
      label: state.ceremonieLaique
        ? 'Ambiance cérémonie & cocktail'
        : 'Ambiance cocktail',
      sublabel: state.ceremonieLaique
        ? 'Sonorisation incluse avec votre cérémonie laïque'
        : 'Micro HF · Set list définie en amont',
      amount: DJ_SONO_VH_PRICE,
      isIncluded: state.ceremonieLaique,
    })
  }
  if (state.dj.effetPrestige) {
    lines.push({
      label: 'Effet Prestige',
      sublabel: 'Effets lumineux — Entrée · Ouverture du bal · Dessert',
      amount: DJ_PRESTIGE_PRICE,
      isIncluded: false,
    })
  }
  // DJ_BASE_PRICE absorbé dans le forfait domaine — ne pas réincrémenter
  void DJ_BASE_PRICE

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
