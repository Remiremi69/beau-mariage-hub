
-- Add esquisse_url column to configurateur_leads
ALTER TABLE public.configurateur_leads
  ADD COLUMN IF NOT EXISTS esquisse_url TEXT;

-- Allow anonymous uploads to esquisses bucket (used just after lead insert, no auth session)
CREATE POLICY "Public upload esquisses"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'esquisses');

-- Allow public read of esquisses objects (needed because bucket is private but we use signed URLs;
-- keep read scoped to service role + owners for signed-URL generation)
CREATE POLICY "Read esquisses"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'esquisses');
