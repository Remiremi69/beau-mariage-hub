import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const SENDER_DOMAIN = 'notify.lebeaumariage.fr'
const FROM_EMAIL = 'Limen Mariage <contact@lebeaumariage.fr>'
const FROM_ADMIN = 'Limen Configurateur <configurateur@lebeaumariage.fr>'

function parseJwtClaims(token: string): Record<string, unknown> | null {
  const parts = token.split('.')
  if (parts.length < 2) return null
  try {
    const payload = parts[1]
      .replaceAll('-', '+')
      .replaceAll('_', '/')
      .padEnd(Math.ceil(parts[1].length / 4) * 4, '=')
    return JSON.parse(atob(payload)) as Record<string, unknown>
  } catch {
    return null
  }
}

function generateProspectHtml(lead: any): string {
  const nextStep = lead.localisation === 'local'
    ? `<p style="margin:0 0 8px">🍽️ <strong>Dégustation sur site demandée</strong> le ${lead.rdv_jour ?? ''} (${lead.rdv_creneau ?? ''}).</p>
       <p style="margin:0;color:#6b7280">Nous vous confirmons le créneau dans les 2 heures.</p>`
    : lead.localisation === 'distance'
    ? `<p style="margin:0 0 8px">📦 <strong>Votre coffret Limen</strong> sera expédié à ${lead.adresse_livraison?.ville ?? ''} dans les 48 heures.</p>
       <p style="margin:0;color:#6b7280">Votre RDV Zoom sera confirmé par email.</p>`
    : `<p style="margin:0">Rémi vous contacte dans les 24 heures pour organiser votre dégustation.</p>`

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f7f4;font-family:Georgia,'Times New Roman',serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f4;padding:40px 20px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden">

<!-- Header -->
<tr><td style="background:#1e1e1e;padding:32px 40px;text-align:center">
  <h1 style="margin:0;color:#c9a96e;font-size:28px;letter-spacing:3px;font-weight:400">LIMEN</h1>
  <p style="margin:8px 0 0;color:#a0a0a0;font-size:11px;letter-spacing:2px">DOMAINE DE LA CROIX ROCHEFORT · BEAUJOLAIS</p>
</td></tr>

<!-- Intro -->
<tr><td style="padding:40px">
  <h2 style="margin:0 0 16px;color:#1e1e1e;font-size:22px;font-weight:400">Votre mariage prend forme.</h2>
  <p style="margin:0 0 8px;color:#555;font-size:15px;line-height:1.6">Bonjour ${lead.prenom ?? ''},</p>
  <p style="margin:0;color:#555;font-size:15px;line-height:1.6">Voici le récapitulatif de ce que vous avez composé et votre estimation budgétaire personnalisée.</p>
</td></tr>

<!-- Details -->
<tr><td style="padding:0 40px 24px">
  <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;color:#333;border-collapse:collapse">
    <tr style="border-bottom:1px solid #eee"><td style="color:#888;width:40%">Date</td><td><strong>${lead.date_mariage ?? '—'}</strong></td></tr>
    <tr style="border-bottom:1px solid #eee"><td style="color:#888">Invités</td><td><strong>${lead.guests_estimate ?? '—'} personnes</strong></td></tr>
    <tr style="border-bottom:1px solid #eee"><td style="color:#888">Cérémonie laïque</td><td>${lead.ceremonie_laique ? 'Oui (+800 €)' : 'Non'}</td></tr>
    <tr style="border-bottom:1px solid #eee"><td style="color:#888">Vin d'honneur</td><td>Inclus dans le forfait</td></tr>
    <tr style="border-bottom:1px solid #eee"><td style="color:#888">Repas</td><td><strong>${lead.repas_formule ?? '—'}</strong></td></tr>
    <tr style="border-bottom:1px solid #eee"><td style="color:#888">Décoration</td><td>${lead.deco ?? '—'}</td></tr>
    <tr style="border-bottom:1px solid #eee"><td style="color:#888">Photographe</td><td>${lead.photographe !== 'none' ? lead.photographe : 'Non sélectionné'}</td></tr>
    <tr><td style="color:#888">DJ</td><td>${lead.dj !== 'none' ? lead.dj : 'Non sélectionné'}</td></tr>
  </table>
</td></tr>

<!-- Total -->
<tr><td style="padding:0 40px 24px">
  <div style="background:#1e1e1e;border-radius:8px;padding:24px;text-align:center">
    <p style="margin:0 0 8px;color:#c9a96e;font-size:12px;letter-spacing:2px;text-transform:uppercase">ESTIMATION TOTALE</p>
    <p style="margin:0;color:#ffffff;font-size:32px;font-weight:700">${lead.total_estimate?.toLocaleString('fr-FR') ?? '—'} €</p>
    <p style="margin:12px 0 0;color:#a0a0a0;font-size:12px">dont le repas sera confirmé après validation du nombre définitif d'invités</p>
  </div>
</td></tr>

<!-- Next step -->
<tr><td style="padding:0 40px 32px">
  <div style="background:#f9f7f4;border-radius:8px;padding:24px;border-left:4px solid #c9a96e">
    <h3 style="margin:0 0 12px;color:#1e1e1e;font-size:16px;font-weight:600">Votre prochaine étape</h3>
    ${nextStep}
  </div>
</td></tr>

<!-- Footer -->
<tr><td style="padding:24px 40px;text-align:center;border-top:1px solid #eee">
  <p style="margin:0 0 8px;color:#888;font-size:13px">Des questions ? Répondez directement à cet email</p>
  <p style="margin:0;color:#888;font-size:13px">ou appelez Rémi au <a href="tel:${Deno.env.get('REMI_PHONE') ?? ''}" style="color:#c9a96e">${Deno.env.get('REMI_PHONE') ?? ''}</a></p>
</td></tr>

<tr><td style="background:#1e1e1e;padding:20px;text-align:center">
  <p style="margin:0;color:#666;font-size:11px">Limen · Domaine de la Croix Rochefort · Beaujolais</p>
  <p style="margin:4px 0 0"><a href="https://lebeaumariage.fr" style="color:#c9a96e;font-size:11px;text-decoration:none">lebeaumariage.fr</a></p>
</td></tr>

</table></td></tr></table></body></html>`
}

function generateRemiHtml(lead: any): string {
  const isLocal = lead.localisation === 'local'
  const isDistance = lead.localisation === 'distance'
  const urgencyColor = isDistance ? '#F59E0B' : isLocal ? '#10B981' : '#3B82F6'
  const urgencyLabel = isDistance
    ? '📦 ACTION : Préparer le coffret'
    : isLocal
    ? '🍽️ ACTION : Confirmer le créneau'
    : '📋 Nouveau lead à qualifier'

  const mailtoConfirm = `mailto:${lead.email}?subject=${encodeURIComponent(`Confirmation dégustation Limen — ${lead.rdv_jour}`)}&body=${encodeURIComponent(`Bonjour ${lead.prenom},\n\nJe confirme votre dégustation le ${lead.rdv_jour} à ${lead.rdv_creneau}.\n\nÀ très bientôt,\nRémi`)}`

  let actionBlock = ''
  if (isLocal) {
    actionBlock = `
    <div style="background:#ecfdf5;border:2px solid #10B981;border-radius:8px;padding:20px;margin:24px 0">
      <h3 style="margin:0 0 12px;color:#065f46">🍽️ RDV DÉGUSTATION DEMANDÉ</h3>
      <p style="margin:0 0 4px;font-size:14px">Semaine : <strong>${lead.rdv_semaine ?? '—'}</strong></p>
      <p style="margin:0 0 4px;font-size:14px">Jour : <strong>${lead.rdv_jour ?? '—'}</strong></p>
      <p style="margin:0 0 16px;font-size:14px">Créneau : <strong>${lead.rdv_creneau ?? '—'}</strong></p>
      <a href="${mailtoConfirm}" style="display:inline-block;background:#10B981;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">✅ Confirmer ce créneau par email</a>
    </div>`
  }
  if (isDistance) {
    actionBlock = `
    <div style="background:#fffbeb;border:2px solid #F59E0B;border-radius:8px;padding:20px;margin:24px 0">
      <h3 style="margin:0 0 12px;color:#92400e">📦 COFFRET À EXPÉDIER</h3>
      <p style="margin:0 0 4px;font-size:14px"><strong>Adresse :</strong></p>
      <p style="margin:0 0 2px;font-size:14px">${lead.adresse_livraison?.rue ?? ''}</p>
      <p style="margin:0 0 2px;font-size:14px">${lead.adresse_livraison?.cp ?? ''} ${lead.adresse_livraison?.ville ?? ''}</p>
      <p style="margin:0 0 16px;font-size:14px">${lead.adresse_livraison?.pays ?? ''}</p>
      <p style="margin:0;font-size:13px;color:#666"><strong>Checklist :</strong><br>
        ☐ 1 bouteille Beaujolais Villages (Julien)<br>
        ☐ Échantillons huile/miel/confiture<br>
        ☐ Menu imprimé papier coton 300g<br>
        ☐ Note manuscrite du chef<br>
        ☐ Emballage Limen</p>
    </div>`
  }

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:640px;margin:0 auto">

<div style="background:${urgencyColor};color:#fff;padding:16px 24px;border-radius:8px 8px 0 0;font-size:18px;font-weight:700">${urgencyLabel}</div>

<div style="background:#fff;padding:24px;border-radius:0 0 8px 8px">

<!-- Contact -->
<div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #e5e7eb">
  <h2 style="margin:0 0 4px;font-size:20px">${lead.prenom ?? ''} ${lead.nom ?? ''}</h2>
  <p style="margin:0 0 2px;color:#6b7280;font-size:14px">${lead.email}</p>
  <p style="margin:0 0 12px;color:#6b7280;font-size:14px">${lead.telephone ?? '—'}</p>
  <a href="tel:${lead.telephone}" style="display:inline-block;background:#3B82F6;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;font-size:13px;margin-right:8px">📞 Appeler</a>
  <a href="mailto:${lead.email}" style="display:inline-block;background:#6B7280;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;font-size:13px">✉️ Email</a>
</div>

<!-- Config -->
<table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;margin-bottom:24px;border-collapse:collapse">
  <tr style="border-bottom:1px solid #f3f4f6"><td style="color:#9ca3af;width:40%">Date mariage</td><td><strong>${lead.date_mariage ?? '—'}</strong></td></tr>
  <tr style="border-bottom:1px solid #f3f4f6"><td style="color:#9ca3af">Invités</td><td>${lead.guests_estimate ?? '—'} personnes</td></tr>
  <tr style="border-bottom:1px solid #f3f4f6"><td style="color:#9ca3af">Cérémonie laïque</td><td>${lead.ceremonie_laique ? 'Oui' : 'Non'}</td></tr>
  <tr style="border-bottom:1px solid #f3f4f6"><td style="color:#9ca3af">Repas</td><td>${lead.repas_formule ?? '—'}</td></tr>
  <tr style="border-bottom:1px solid #f3f4f6"><td style="color:#9ca3af">Déco</td><td>${lead.deco ?? '—'}</td></tr>
  <tr style="border-bottom:1px solid #f3f4f6"><td style="color:#9ca3af">Photographe</td><td>${lead.photographe ?? '—'}</td></tr>
  <tr><td style="color:#9ca3af">DJ</td><td>${lead.dj ?? '—'}</td></tr>
</table>

<!-- Total -->
<div style="background:#1e1e1e;border-radius:8px;padding:20px;text-align:center;margin-bottom:24px">
  <span style="color:#fff;font-size:28px;font-weight:700">${lead.total_estimate?.toLocaleString('fr-FR') ?? '—'} €</span>
</div>

${actionBlock}

<!-- Raw JSON -->
<details style="margin-top:24px">
  <summary style="cursor:pointer;color:#9ca3af;font-size:12px">Données brutes JSON</summary>
  <pre style="background:#f9fafb;padding:12px;border-radius:4px;font-size:11px;overflow-x:auto;margin-top:8px">${JSON.stringify(lead, null, 2).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</details>

</div></div></body></html>`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Verify service_role caller
  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const token = authHeader.slice('Bearer '.length).trim()
  const claims = parseJwtClaims(token)
  if (claims?.role !== 'service_role') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const lead = await req.json()
    const messageIdProspect = crypto.randomUUID()
    const messageIdRemi = crypto.randomUUID()
    const remiEmail = Deno.env.get('REMI_EMAIL') ?? ''

    const prospectPayload = {
      to: lead.email,
      from: FROM_EMAIL,
      sender_domain: SENDER_DOMAIN,
      subject: `Votre devis Limen — ${lead.date_mariage ?? 'date à confirmer'}`,
      html: generateProspectHtml(lead),
      purpose: 'transactional',
      label: 'lead_prospect_confirmation',
      message_id: messageIdProspect,
      queued_at: new Date().toISOString(),
    }

    const remiPayload = {
      to: remiEmail,
      from: FROM_ADMIN,
      sender_domain: SENDER_DOMAIN,
      subject: `🔔 ${lead.prenom ?? ''} ${lead.nom ?? ''} — ${lead.date_mariage ?? '?'} — ${lead.total_estimate?.toLocaleString('fr-FR') ?? '?'}€ — ${lead.localisation?.toUpperCase() ?? 'NON RENSEIGNÉ'}`,
      html: generateRemiHtml(lead),
      purpose: 'transactional',
      label: 'lead_remi_brief',
      message_id: messageIdRemi,
      queued_at: new Date().toISOString(),
    }

    // Log pending + enqueue in parallel
    await Promise.all([
      supabase.from('email_send_log').insert({
        message_id: messageIdProspect,
        template_name: 'lead_prospect_confirmation',
        recipient_email: lead.email,
        status: 'pending',
        metadata: { lead_id: lead.id },
      }),
      supabase.from('email_send_log').insert({
        message_id: messageIdRemi,
        template_name: 'lead_remi_brief',
        recipient_email: remiEmail,
        status: 'pending',
        metadata: { lead_id: lead.id },
      }),
      supabase.rpc('enqueue_email', {
        queue_name: 'transactional_emails',
        payload: prospectPayload,
      }),
      supabase.rpc('enqueue_email', {
        queue_name: 'transactional_emails',
        payload: remiPayload,
      }),
    ])

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('send-lead-emails error:', err)
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
