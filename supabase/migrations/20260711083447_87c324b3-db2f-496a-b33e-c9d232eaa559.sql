
-- =========================
-- Table: cercles
-- =========================
CREATE TABLE public.cercles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID NOT NULL REFERENCES public.configurateur_leads(id) ON DELETE CASCADE,
  esquisse_id UUID REFERENCES public.configurateur_leads(id) ON DELETE SET NULL,
  slug TEXT NOT NULL UNIQUE,
  mot_couple TEXT,
  photo_url TEXT,
  lien_cagnotte TEXT,
  montants_visibles BOOLEAN NOT NULL DEFAULT FALSE,
  date_cloture DATE,
  statut TEXT NOT NULL DEFAULT 'brouillon' CHECK (statut IN ('brouillon','publie','cloture')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.cercles TO anon, authenticated;
GRANT ALL ON public.cercles TO service_role;

ALTER TABLE public.cercles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public peut lire cercles non-brouillon"
  ON public.cercles FOR SELECT
  TO anon, authenticated
  USING (statut <> 'brouillon');

CREATE POLICY "Admin accès complet cercles"
  ON public.cercles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================
-- Table: cercle_tokens
-- =========================
CREATE TABLE public.cercle_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cercle_id UUID NOT NULL REFERENCES public.cercles(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','revoked')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ
);

GRANT ALL ON public.cercle_tokens TO service_role;

ALTER TABLE public.cercle_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin accès complet cercle_tokens"
  ON public.cercle_tokens FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================
-- Table: parts
-- =========================
CREATE TABLE public.parts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cercle_id UUID NOT NULL REFERENCES public.cercles(id) ON DELETE CASCADE,
  niveau TEXT NOT NULL CHECK (niveau IN ('seuil','signature','fondatrice')),
  titre TEXT NOT NULL,
  evocation TEXT NOT NULL,
  montant_suggere INTEGER NOT NULL,
  quantite_totale INTEGER NOT NULL,
  etape_composeur_source TEXT,
  ordre INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_parts_cercle_id ON public.parts(cercle_id);

GRANT SELECT ON public.parts TO anon, authenticated;
GRANT ALL ON public.parts TO service_role;

ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public peut lire parts de cercles non-brouillon"
  ON public.parts FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.cercles c
      WHERE c.id = parts.cercle_id AND c.statut <> 'brouillon'
    )
  );

CREATE POLICY "Admin accès complet parts"
  ON public.parts FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================
-- Table: contributions
-- =========================
CREATE TABLE public.contributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  part_id UUID NOT NULL REFERENCES public.parts(id) ON DELETE CASCADE,
  prenom TEXT NOT NULL,
  mot TEXT,
  email TEXT,
  montant_declare INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_contributions_part_id ON public.contributions(part_id);

-- Privilèges colonne : anon/authenticated ne voient JAMAIS email ni montant_declare
GRANT SELECT (id, part_id, prenom, mot, created_at) ON public.contributions TO anon, authenticated;
GRANT INSERT ON public.contributions TO anon, authenticated;
GRANT ALL ON public.contributions TO service_role;

ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

-- SELECT public : uniquement contributions de parts appartenant à un cercle non-brouillon
CREATE POLICY "Public peut lire contributions de cercles non-brouillon"
  ON public.contributions FOR SELECT
  TO anon, authenticated
  USING (
    part_id IN (
      SELECT p.id FROM public.parts p
      JOIN public.cercles c ON c.id = p.cercle_id
      WHERE c.statut <> 'brouillon'
    )
  );

-- INSERT public : uniquement si cercle publié et non clôturé
CREATE POLICY "Public peut contribuer si cercle publie et ouvert"
  ON public.contributions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.parts p
      JOIN public.cercles c ON c.id = p.cercle_id
      WHERE p.id = contributions.part_id
        AND c.statut = 'publie'
        AND (c.date_cloture IS NULL OR c.date_cloture >= CURRENT_DATE)
    )
  );

CREATE POLICY "Admin accès complet contributions"
  ON public.contributions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================
-- Vue: contributions_publiques (security_invoker)
-- =========================
CREATE VIEW public.contributions_publiques
  WITH (security_invoker = true) AS
  SELECT id, part_id, prenom, mot, created_at
  FROM public.contributions;

GRANT SELECT ON public.contributions_publiques TO anon, authenticated;

-- =========================
-- Realtime sur contributions
-- =========================
ALTER TABLE public.contributions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contributions;
