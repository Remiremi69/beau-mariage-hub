ALTER TABLE public.configurateur_leads
  ADD COLUMN IF NOT EXISTS localisation text,
  ADD COLUMN IF NOT EXISTS rdv_semaine text,
  ADD COLUMN IF NOT EXISTS rdv_jour text,
  ADD COLUMN IF NOT EXISTS rdv_creneau text,
  ADD COLUMN IF NOT EXISTS adresse_livraison jsonb,
  ADD COLUMN IF NOT EXISTS coffret_demande boolean DEFAULT false;