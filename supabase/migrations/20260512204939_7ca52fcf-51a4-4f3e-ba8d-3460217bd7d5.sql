ALTER TABLE public.configurateur_leads
  ADD COLUMN IF NOT EXISTS dj_sono_vh boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS dj_effet_prestige boolean DEFAULT false;