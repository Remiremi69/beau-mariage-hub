// generate-parts: crée un Cercle à partir d'une Esquisse (configurateur_leads),
// seede les parts depuis postes_catalogue, crée le token couple, envoie l'email.
// Appelable uniquement par un admin authentifié.

import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

const SITE_BASE_URL = 'https://lebeaumariage.fr'

const ALPHANUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function randomSlug(len = 12): string {
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  let out = ''
  for (let i = 0; i < len; i++) out += ALPHANUM[bytes[i] % ALPHANUM.length]
  return out
}

function randomToken(): string {
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: 'Server configuration error' }, 500)
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
  let body: { couple_id?: string; force?: boolean }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }
  const couple_id = body?.couple_id
  const force = body?.force === true
  if (!couple_id || typeof couple_id !== 'string') {
    return json({ error: 'couple_id (uuid) requis' }, 400)
  }

  // 1. Vérifie qu'aucun Cercle n'existe déjà
  const { data: existing, error: existingErr } = await service
    .from('cercles')
    .select('id, statut')
    .eq('couple_id', couple_id)
    .maybeSingle()
  if (existingErr) return json({ error: `Lecture cercles: ${existingErr.message}` }, 500)
  if (existing) {
    if (!force) {
      return json({
        error: `Un Cercle existe déjà pour ce couple (id=${existing.id})`,
        cercle_id: existing.id,
        statut: existing.statut,
      }, 409)
    }
    if (existing.statut !== 'brouillon') {
      return json({
        error: `Cercle ${existing.id} publié (statut=${existing.statut}) — régénération refusée`,
      }, 409)
    }
    await service.from('contributions').delete().eq('cercle_id', existing.id)
    await service.from('parts').delete().eq('cercle_id', existing.id)
    await service.from('cercle_tokens').delete().eq('cercle_id', existing.id)
    const { error: delErr } = await service.from('cercles').delete().eq('id', existing.id)
    if (delErr) return json({ error: `Purge cercle: ${delErr.message}` }, 500)
  }

  // 2. Charge le lead (email requis pour l'invitation)
  const { data: lead, error: leadErr } = await service
    .from('configurateur_leads')
    .select('id, email, prenom')
    .eq('id', couple_id)
    .maybeSingle()
  if (leadErr) return json({ error: `Lecture lead: ${leadErr.message}` }, 500)
  if (!lead) return json({ error: `Lead ${couple_id} introuvable` }, 404)
  if (!lead.email) return json({ error: 'Lead sans email — impossible d\'envoyer l\'invitation' }, 400)

  // 3. Charge le catalogue des postes par défaut
  const { data: postes, error: postesErr } = await service
    .from('postes_catalogue')
    .select('cle, titre, evocation, ordre')
    .eq('actif_par_defaut', true)
    .order('ordre', { ascending: true })
  if (postesErr) return json({ error: `Lecture catalogue: ${postesErr.message}` }, 500)
  if (!postes || postes.length === 0) {
    return json({ error: 'Catalogue de postes vide' }, 500)
  }

  // 4. Crée le Cercle avec slug unique
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
    // deno-lint-ignore no-explicit-any
    if ((insErr as any)?.code !== '23505') {
      return json({ error: `Création cercle: ${insErr?.message ?? 'inconnu'}` }, 500)
    }
  }
  if (!cercleId) return json({ error: 'Impossible de générer un slug unique après 5 tentatives' }, 500)

  // 5. Seed des parts depuis le catalogue
  const rows = postes.map((p) => ({
    cercle_id: cercleId,
    poste_cle: p.cle,
    titre: p.titre,
    evocation: p.evocation,
    ordre: p.ordre,
    montant_cible: 0,
    actif: true,
  }))
  const { data: insertedParts, error: partsErr } = await service
    .from('parts')
    .insert(rows)
    .select('*')
  if (partsErr) {
    await service.from('cercles').delete().eq('id', cercleId)
    return json({ error: `Insertion parts: ${partsErr.message}` }, 500)
  }

  // 6. Token couple
  const cercleToken = randomToken()
  const { error: tokErr } = await service.from('cercle_tokens').insert({
    cercle_id: cercleId,
    token: cercleToken,
    status: 'active',
  })
  if (tokErr) {
    return json({ error: `Création token: ${tokErr.message}`, cercle_id: cercleId }, 500)
  }

  // 7. Email d'invitation
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
          nb_parts: rows.length,
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
    parts_count: rows.length,
    token: cercleToken,
    lien_gestion: lienGestion,
    email_sent: emailSent,
    email_error: emailError,
  })
})
