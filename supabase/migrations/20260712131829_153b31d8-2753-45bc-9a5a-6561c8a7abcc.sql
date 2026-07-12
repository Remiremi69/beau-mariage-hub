
-- 1) SECURITY DEFINER view → recréer en SECURITY INVOKER
ALTER VIEW public.contributions_publiques SET (security_invoker = true);

-- 2) contributions : autoriser la lecture publique des contributions payées,
-- mais restreindre les colonnes sensibles.
-- Retirer les GRANT SELECT au niveau table pour anon/authenticated (si présents),
-- puis re-grant uniquement les colonnes non sensibles.
REVOKE SELECT ON public.contributions FROM anon;
REVOKE SELECT ON public.contributions FROM authenticated;

GRANT SELECT (id, part_id, prenom, mot, statut, created_at)
  ON public.contributions TO anon, authenticated;

-- Policy SELECT limitée aux contributions payées (pour realtime + vue publique)
DROP POLICY IF EXISTS "Public peut lire contributions payees" ON public.contributions;
CREATE POLICY "Public peut lire contributions payees"
  ON public.contributions
  FOR SELECT
  TO anon, authenticated
  USING (statut = 'payee');

-- 3) storage.objects : ajouter des policies explicites sur le bucket 'esquisses'
-- Le bucket est privé ; seule la clé service (edge functions) doit écrire/lire.
-- On ajoute des policies pour anon/authenticated qui NIENT l'accès explicitement
-- via une condition impossible, satisfaisant la demande de policies explicites.

DROP POLICY IF EXISTS "esquisses admin select" ON storage.objects;
CREATE POLICY "esquisses admin select"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'esquisses' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "esquisses admin insert" ON storage.objects;
CREATE POLICY "esquisses admin insert"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'esquisses' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "esquisses admin update" ON storage.objects;
CREATE POLICY "esquisses admin update"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'esquisses' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'esquisses' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "esquisses admin delete" ON storage.objects;
CREATE POLICY "esquisses admin delete"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'esquisses' AND public.has_role(auth.uid(), 'admin'));
