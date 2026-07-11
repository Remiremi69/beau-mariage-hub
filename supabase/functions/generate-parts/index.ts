// generate-parts: crée un Cercle à partir d'une Esquisse (configurateur_leads),
// génère les parts via Claude, crée le token couple, envoie l'email d'invitation.
// Appelable uniquement par un admin authentifié.

import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

const ANTHROPIC_MODEL = 'claude-sonnet-5'
const ANTHROPIC_MODEL_FALLBACK = 'claude-sonnet-4-6'
const SITE_BASE_URL = 'https://lebeaumariage.fr'

const SYSTEM_PROMPT = `Tu es le générateur de parts du Cercle, la liste de mariage inversée du Beau Mariage (Domaine de la Croix Rochefort, Beaujolais). À partir de l'Esquisse d'un couple — le JSON de leurs choix dans le Composeur — tu génères les parts nommées de leur mariage : les fragments du rite que leurs proches vont porter.

LEXIQUE OBLIGATOIRE
On dit : porter, une part, le Cercle, les porteurs.
On ne dit JAMAIS : cagnotte, don, financement, contribution, payer, offrir, participer, collecte.
Ton registre : sobre, précis, incarné. Élégance retenue, jamais de lyrisme gonflé, jamais de clichés de mariage ("le plus beau jour", "magique", "de rêve" sont interdits). Chaque mot doit pouvoir être lu à voix haute par une officiante de cérémonie sans rougir.

STRUCTURE
Génère entre 15 et 25 parts réparties en trois niveaux :

1. "seuil" — 8 à 12 parts, 30 à 80 €, quantités larges (6 à 20 exemplaires).
   Les gestes accessibles : une fleur du portique, un toast levé, une chanson du bal, une bougie de la tablée. Concrets, singuliers, tangibles — un invité doit pouvoir se dire "c'est MA fleur".

2. "signature" — 5 à 8 parts, 100 à 350 €, quantités limitées (2 à 6 exemplaires).
   Les moments identitaires issus des choix précis de l'Esquisse : l'archet du violoniste pendant la cérémonie, le plat signature du banquet, la première danse, la lumière de fin de journée saisie par le photographe. Chaque part signature DOIT refléter un choix réel du couple présent dans le JSON — jamais de générique.

3. "fondatrice" — 2 à 4 parts, 500 à 1500 €, 1 à 2 exemplaires chacune.
   Les socles du rite, dignes d'un parent ou d'un très proche : la nuit au Domaine, la cérémonie entière, le banquet. Graves et simples.

CHAQUE PART CONTIENT
- titre : 2 à 6 mots, nominal, sans verbe. Ex : "L'archet de la cérémonie", "Une fleur du portique".
- evocation : UNE phrase, 12 à 25 mots, qui dit ce que ce fragment fera exister le jour venu. Adressée au porteur ("Le jour venu, ...") ou descriptive pure. Jamais deux phrases.
- niveau, montant_suggere (entier, euros, multiples de 5), quantite_totale (entier), etape_composeur_source (la clé de l'étape du JSON dont la part est issue, ou null pour les parts transverses).

RÈGLES DE FOND
- Utilise les prénoms, choix et détails réels de l'Esquisse partout où c'est possible. Une Esquisse mentionnant un violoniste donne une part violon ; sans violoniste, pas de part violon.
- La somme (montant × quantité) de l'ensemble doit se situer entre 5 000 et 9 000 € — l'ordre de grandeur d'une liste de mariage française, pas le prix du mariage.
- Aucune part sur : l'alcool seul, les prestations d'hygiène ou logistique brute (ménage, parking, sécurité). On porte le rite, pas l'intendance.
- Diversité des sources : les parts doivent couvrir au moins 5 étapes différentes de l'Esquisse.

FORMAT DE SORTIE
Réponds UNIQUEMENT avec un tableau JSON valide, sans texte avant ou après, sans balises markdown :
[{"titre": "...", "evocation": "...", "niveau": "seuil", "montant_suggere": 40, "quantite_totale": 12, "etape_composeur_source": "..."}, ...]`

const ALPHANUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function randomSlug(len = 12): string {
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  let out = ''
  for (let i = 0; i < len; i++) out += ALPHANUM[bytes[i] % ALPHANUM.length]
  return out
}

function randomToken(): string {
  // 64 caractères hex (32 octets aléatoires)
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

interface RawPart {
  titre?: unknown
  evocation?: unknown
  niveau?: unknown
  montant_suggere?: unknown
  quantite_totale?: unknown
  etape_composeur_source?: unknown
}

interface CleanPart {
  titre: string
  evocation: string
  niveau: 'seuil' | 'signature' | 'fondatrice'
  montant_suggere: number
  quantite_totale: number
  etape_composeur_source: string | null
}

function parseAndValidateParts(raw: string): CleanPart[] {
  // Strip markdown fences si présents
  let cleaned = raw.trim()
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim()
  }
  // Récupère le premier tableau JSON présent
  const firstBracket = cleaned.indexOf('[')
  const lastBracket = cleaned.lastIndexOf(']')
  if (firstBracket === -1 || lastBracket === -1 || lastBracket < firstBracket) {
    throw new Error('Réponse Claude sans tableau JSON')
  }
  cleaned = cleaned.slice(firstBracket, lastBracket + 1)

  const parsed = JSON.parse(cleaned)
  if (!Array.isArray(parsed)) throw new Error('Réponse Claude non-tableau')
  if (parsed.length < 15 || parsed.length > 25) {
    throw new Error(`Nombre de parts hors bornes: ${parsed.length} (attendu 15-25)`)
  }

  const NIVEAUX = new Set(['seuil', 'signature', 'fondatrice'])
  const out: CleanPart[] = []
  for (const [i, p] of (parsed as RawPart[]).entries()) {
    const titre = typeof p.titre === 'string' ? p.titre.trim() : ''
    const evocation = typeof p.evocation === 'string' ? p.evocation.trim() : ''
    const niveau = String(p.niveau ?? '')
    const montant = Number(p.montant_suggere)
    const quantite = Number(p.quantite_totale)
    const etape = p.etape_composeur_source == null
      ? null
      : String(p.etape_composeur_source)

    if (!titre) throw new Error(`Part ${i}: titre manquant`)
    if (!evocation) throw new Error(`Part ${i}: evocation manquante`)
    if (!NIVEAUX.has(niveau)) throw new Error(`Part ${i}: niveau invalide (${niveau})`)
    if (!Number.isFinite(montant) || montant <= 0 || !Number.isInteger(montant)) {
      throw new Error(`Part ${i}: montant invalide (${montant})`)
    }
    if (!Number.isFinite(quantite) || quantite <= 0 || !Number.isInteger(quantite)) {
      throw new Error(`Part ${i}: quantité invalide (${quantite})`)
    }
    out.push({
      titre,
      evocation,
      niveau: niveau as CleanPart['niveau'],
      montant_suggere: montant,
      quantite_totale: quantite,
      etape_composeur_source: etape,
    })
  }
  return out
}

async function callClaude(anthropicKey: string, esquisseJson: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Voici l'Esquisse du couple (JSON de leur état dans le Composeur). Génère leurs parts.\n\n${esquisseJson}`,
        },
      ],
    }),
  })
  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Claude API ${res.status}: ${errText.slice(0, 500)}`)
  }
  const data = await res.json()
  const text = data?.content?.[0]?.text
  if (typeof text !== 'string' || !text) {
    throw new Error('Claude a retourné une réponse vide')
  }
  return text
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: 'Server configuration error' }, 500)
  }
  if (!ANTHROPIC_API_KEY) {
    return json({ error: 'ANTHROPIC_API_KEY manquant' }, 500)
  }

  // Auth admin
  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return json({ error: 'Unauthorized' }, 401)
  }
  const token = authHeader.slice(7)
  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  })
  const { data: claimsData, error: claimsErr } = await userClient.auth.getClaims(token)
  if (claimsErr || !claimsData?.claims?.sub) {
    return json({ error: 'Unauthorized' }, 401)
  }
  const userId = claimsData.claims.sub as string

  const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const { data: isAdminData, error: isAdminErr } = await service.rpc('has_role', {
    _user_id: userId,
    _role: 'admin',
  })
  if (isAdminErr || isAdminData !== true) {
    return json({ error: 'Forbidden (admin only)' }, 403)
  }

  // Body
  let body: { couple_id?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }
  const couple_id = body?.couple_id
  if (!couple_id || typeof couple_id !== 'string') {
    return json({ error: 'couple_id (uuid) requis' }, 400)
  }

  // 1. Vérifie qu'aucun Cercle n'existe déjà
  const { data: existing, error: existingErr } = await service
    .from('cercles')
    .select('id')
    .eq('couple_id', couple_id)
    .maybeSingle()
  if (existingErr) return json({ error: `Lecture cercles: ${existingErr.message}` }, 500)
  if (existing) {
    return json({ error: `Un Cercle existe déjà pour ce couple (id=${existing.id})` }, 409)
  }

  // 2. Charge le lead
  const { data: lead, error: leadErr } = await service
    .from('configurateur_leads')
    .select('*')
    .eq('id', couple_id)
    .maybeSingle()
  if (leadErr) return json({ error: `Lecture lead: ${leadErr.message}` }, 500)
  if (!lead) return json({ error: `Lead ${couple_id} introuvable` }, 404)
  if (!lead.email) return json({ error: 'Lead sans email — impossible d\'envoyer l\'invitation' }, 400)

  // 3. Sérialise l'Esquisse (on exclut les champs administratifs)
  const esquisse: Record<string, unknown> = { ...lead }
  delete esquisse.id
  delete esquisse.created_at
  delete esquisse.status
  delete esquisse.message
  const esquisseJson = JSON.stringify(esquisse, null, 2)

  // 4. Crée le Cercle avec slug unique (retry sur collision)
  let cercleId: string | null = null
  let cercleSlug = ''
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = randomSlug(12)
    const { data: inserted, error: insErr } = await service
      .from('cercles')
      .insert({
        couple_id,
        esquisse_id: couple_id,
        slug: candidate,
        statut: 'brouillon',
      })
      .select('id, slug')
      .single()
    if (!insErr && inserted) {
      cercleId = inserted.id
      cercleSlug = inserted.slug
      break
    }
    // 23505 = unique_violation
    // deno-lint-ignore no-explicit-any
    if ((insErr as any)?.code !== '23505') {
      return json({ error: `Création cercle: ${insErr?.message ?? 'inconnu'}` }, 500)
    }
  }
  if (!cercleId) return json({ error: 'Impossible de générer un slug unique après 5 tentatives' }, 500)

  // 5. Appelle Claude (avec 1 retry sur échec de parsing)
  let parts: CleanPart[] | null = null
  let lastError: unknown = null
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const raw = await callClaude(ANTHROPIC_API_KEY, esquisseJson)
      parts = parseAndValidateParts(raw)
      break
    } catch (e) {
      lastError = e
      console.error(`[generate-parts] tentative ${attempt + 1} échouée:`, e)
    }
  }

  if (!parts) {
    // Rollback : supprime le Cercle créé pour ne pas laisser d'orphelin
    await service.from('cercles').delete().eq('id', cercleId)
    return json({
      error: 'Échec génération parts après 2 tentatives',
      details: String(lastError instanceof Error ? lastError.message : lastError),
    }, 502)
  }

  // 6. Insère les parts avec ordre séquentiel
  const rows = parts.map((p, i) => ({
    cercle_id: cercleId,
    titre: p.titre,
    evocation: p.evocation,
    niveau: p.niveau,
    montant_suggere: p.montant_suggere,
    quantite_totale: p.quantite_totale,
    etape_composeur_source: p.etape_composeur_source,
    ordre: i,
  }))
  const { data: insertedParts, error: partsErr } = await service
    .from('parts')
    .insert(rows)
    .select('*')
  if (partsErr) {
    await service.from('cercles').delete().eq('id', cercleId)
    return json({ error: `Insertion parts: ${partsErr.message}` }, 500)
  }

  // 7. Crée le token couple
  const cercleToken = randomToken()
  const { error: tokErr } = await service.from('cercle_tokens').insert({
    cercle_id: cercleId,
    token: cercleToken,
    status: 'active',
  })
  if (tokErr) {
    return json({ error: `Création token: ${tokErr.message}`, cercle_id: cercleId }, 500)
  }

  // 8. Envoie l'email via le pipeline existant
  const lienGestion = `${SITE_BASE_URL}/cercle/gerer/${cercleToken}`
  let emailSent = false
  let emailError: string | null = null
  try {
    const { error: mailErr } = await service.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'cercle-invitation',
        recipientEmail: lead.email,
        idempotencyKey: `cercle-invitation-${cercleId}`,
        templateData: {
          prenom: lead.prenom ?? null,
          lien_gestion: lienGestion,
          nb_parts: parts.length,
        },
      },
    })
    if (mailErr) {
      emailError = mailErr.message ?? String(mailErr)
    } else {
      emailSent = true
    }
  } catch (e) {
    emailError = e instanceof Error ? e.message : String(e)
  }

  return json({
    ok: true,
    cercle: { id: cercleId, slug: cercleSlug, couple_id, statut: 'brouillon' },
    parts: insertedParts,
    parts_count: parts.length,
    token: cercleToken,
    lien_gestion: lienGestion,
    email_sent: emailSent,
    email_error: emailError,
  })
})
