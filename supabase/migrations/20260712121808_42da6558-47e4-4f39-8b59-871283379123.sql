
ALTER TABLE public.contributions
  ADD COLUMN IF NOT EXISTS statut text NOT NULL DEFAULT 'en_attente',
  ADD COLUMN IF NOT EXISTS stripe_session_id text NULL;

ALTER TABLE public.contributions
  DROP CONSTRAINT IF EXISTS contributions_statut_check;
ALTER TABLE public.contributions
  ADD CONSTRAINT contributions_statut_check
  CHECK (statut IN ('en_attente','payee','echouee'));

CREATE OR REPLACE VIEW public.contributions_publiques AS
SELECT id, part_id, prenom, mot, created_at
FROM public.contributions
WHERE statut = 'payee';

-- Durcit l'INSERT public : statut initial = en_attente, montant >= 5
DROP POLICY IF EXISTS "Public peut contribuer si cercle publie et ouvert" ON public.contributions;
CREATE POLICY "Public peut contribuer si cercle publie et ouvert"
ON public.contributions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  statut = 'en_attente'
  AND montant_declare IS NOT NULL
  AND montant_declare >= 5
  AND EXISTS (
    SELECT 1 FROM public.parts p
    JOIN public.cercles c ON c.id = p.cercle_id
    WHERE p.id = contributions.part_id
      AND p.actif = true
      AND c.statut = 'publie'
      AND (c.date_cloture IS NULL OR c.date_cloture >= CURRENT_DATE)
  )
);
