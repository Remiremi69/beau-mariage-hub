
CREATE POLICY "Set esquisse_url once from configurateur"
  ON public.configurateur_leads
  FOR UPDATE
  TO anon, authenticated
  USING (esquisse_url IS NULL)
  WITH CHECK (esquisse_url IS NOT NULL);
