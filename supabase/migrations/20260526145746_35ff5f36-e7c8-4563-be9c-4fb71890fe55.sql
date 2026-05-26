
-- 1. Remove dangerous anon-read policy on lead_tokens
DROP POLICY IF EXISTS "Anyone can read by token" ON public.lead_tokens;

-- 2. Remove configurateur_leads (PII) from realtime publication
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'configurateur_leads'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.configurateur_leads';
  END IF;
END $$;

-- 3. user_roles: deny writes to non-admins (only admins can manage roles)
CREATE POLICY "Only admins can insert roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Only admins can update roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Only admins can delete roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 4. Tighten public form-insert policies (basic shape validation instead of `true`)
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND length(email) BETWEEN 3 AND 255 AND email LIKE '%@%'
    AND prenom IS NOT NULL AND length(prenom) BETWEEN 1 AND 100
  );

DROP POLICY IF EXISTS "Anyone can insert partenaires leads" ON public.partenaires_leads;
CREATE POLICY "Anyone can insert partenaires leads"
  ON public.partenaires_leads FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND length(email) BETWEEN 3 AND 255 AND email LIKE '%@%'
    AND prenom IS NOT NULL AND length(prenom) BETWEEN 1 AND 100
  );

DROP POLICY IF EXISTS "Insert leads from configurateur" ON public.configurateur_leads;
CREATE POLICY "Insert leads from configurateur"
  ON public.configurateur_leads FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND length(email) BETWEEN 3 AND 255 AND email LIKE '%@%'
  );
