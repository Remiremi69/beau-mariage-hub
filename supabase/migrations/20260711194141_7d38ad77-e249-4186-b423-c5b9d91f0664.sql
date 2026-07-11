-- Remove overly-permissive anon UPDATE policy; esquisse_url is now set server-side via edge function using service role
DROP POLICY IF EXISTS "Set esquisse_url once from configurateur" ON public.configurateur_leads;

-- Lock down esquisses storage bucket: remove public read/insert policies.
-- Access is only via service role (edge functions) which bypasses RLS.
DROP POLICY IF EXISTS "Public upload esquisses" ON storage.objects;
DROP POLICY IF EXISTS "Read esquisses" ON storage.objects;