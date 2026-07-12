
-- 1. Nettoyage
TRUNCATE public.contributions, public.parts, public.cercle_tokens, public.cercles RESTART IDENTITY CASCADE;

-- 2. postes_catalogue
CREATE TABLE public.postes_catalogue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cle text UNIQUE NOT NULL,
  titre text NOT NULL,
  evocation text NOT NULL,
  ordre integer NOT NULL DEFAULT 0,
  actif_par_defaut boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.postes_catalogue TO anon, authenticated;
GRANT ALL ON public.postes_catalogue TO service_role;

ALTER TABLE public.postes_catalogue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique du catalogue"
  ON public.postes_catalogue FOR SELECT
  USING (true);

CREATE POLICY "Admin gère le catalogue"
  ON public.postes_catalogue FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.postes_catalogue (cle, titre, evocation, ordre, actif_par_defaut) VALUES
('preparation', 'La matinée de préparation', 'Le jour venu, cette part portera les premières heures des mariés — les gestes lents du matin, avant que tout commence.', 0, true),
('domaine', 'Le domaine', 'Cette part tient les murs et les jardins de la Croix Rochefort pour la durée du mariage — le lieu qui accueillera chaque moment.', 1, true),
('ceremonie_laique', 'La cérémonie laïque', 'Le jour venu, cette part portera le cercle de la cérémonie, les mots choisis et le silence avant les oui.', 2, true),
('vin_dhonneur', 'Le vin d''honneur', 'Cette part portera le moment suspendu du vin d''honneur — les coupes levées et les premières retrouvailles avant la fête.', 3, true),
('repas', 'Le repas', 'Le jour venu, cette part portera le banquet : la table dressée, les plats servis, les heures partagées autour d''un même repas.', 4, true),
('photographe', 'Le photographe', 'Cette part confie au photographe la mémoire du jour — les regards, les gestes, la lumière qu''il ira saisir tout au long du mariage.', 5, true),
('dj', 'La musique de la nuit', 'Le jour venu, cette part portera les morceaux qui feront lever la salle et tiendront le bal jusqu''au bout.', 6, true),
('deco', 'La décoration', 'Cette part portera la mise en scène du lieu — les fleurs, les lumières, les détails qui donneront au domaine son visage ce jour-là.', 7, true),
('violoniste', 'Le violoniste', 'Le jour venu, cette part portera l''archet du violoniste, les notes qui accompagneront la cérémonie et les instants suspendus.', 8, true),
('photobooth', 'Le photobooth', 'Cette part portera le photobooth — le coin de la fête où les invités laisseront, image après image, la trace de leur passage.', 9, false),
('site_mariage', 'Le site de mariage', 'Cette part tient le site créé pour le mariage — l''endroit où les invités trouveront les mots, les horaires et le chemin.', 10, true);

-- 3. Refonte parts
ALTER TABLE public.parts
  DROP COLUMN IF EXISTS niveau,
  DROP COLUMN IF EXISTS montant_suggere,
  DROP COLUMN IF EXISTS quantite_totale,
  DROP COLUMN IF EXISTS etape_composeur_source;

ALTER TABLE public.parts
  ADD COLUMN poste_cle text NOT NULL,
  ADD COLUMN montant_cible integer NOT NULL DEFAULT 0,
  ADD COLUMN actif boolean NOT NULL DEFAULT true;

-- 4. Sécurité parts
DROP POLICY IF EXISTS "Public peut lire parts de cercles non-brouillon" ON public.parts;
DROP POLICY IF EXISTS "Admin accès complet parts" ON public.parts;

REVOKE ALL ON public.parts FROM anon, authenticated;
GRANT SELECT (id, cercle_id, poste_cle, titre, evocation, actif, ordre, created_at)
  ON public.parts TO anon, authenticated;
GRANT ALL ON public.parts TO service_role;

CREATE POLICY "Lecture parts actives des cercles publiés"
  ON public.parts FOR SELECT
  TO anon, authenticated
  USING (
    actif = true
    AND EXISTS (
      SELECT 1 FROM public.cercles c
      WHERE c.id = parts.cercle_id AND c.statut <> 'brouillon'
    )
  );

CREATE POLICY "Admin accès complet parts"
  ON public.parts FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. contributions
ALTER TABLE public.contributions
  ADD COLUMN IF NOT EXISTS certificat_url text;
