
-- 1. Store service role key in vault for use by agent trigger (reuse pattern from email queue)
DO $$
DECLARE
  v_key TEXT;
BEGIN
  SELECT decrypted_secret INTO v_key FROM vault.decrypted_secrets WHERE name = 'email_queue_service_role_key';
  IF v_key IS NOT NULL AND NOT EXISTS (SELECT 1 FROM vault.secrets WHERE name = 'agent_webhook_service_role_key') THEN
    PERFORM vault.create_secret(v_key, 'agent_webhook_service_role_key');
  END IF;
END $$;

-- 2. Update trigger to send Authorization header with service role JWT
CREATE OR REPLACE FUNCTION public.trigger_agent_commercial()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  webhook_url TEXT := 'https://fwsqtjkydzetwcqidclw.supabase.co/functions/v1/agent-commercial-limen';
  payload JSONB;
  service_key TEXT;
  response RECORD;
BEGIN
  SELECT decrypted_secret INTO service_key
  FROM vault.decrypted_secrets
  WHERE name = 'agent_webhook_service_role_key';

  payload := jsonb_build_object(
    'id', NEW.id, 'prenom', NEW.prenom, 'nom', NEW.nom, 'email', NEW.email,
    'telephone', NEW.telephone, 'date_mariage', NEW.date_mariage,
    'serie_id', NEW.serie_id, 'serie_label', NEW.serie_label,
    'guests_estimate', NEW.guests_estimate, 'repas_formule', NEW.repas_formule,
    'deco', NEW.deco, 'dj', NEW.dj, 'photographe', NEW.photographe,
    'total_estimate', NEW.total_estimate, 'localisation', NEW.localisation,
    'rdv_semaine', NEW.rdv_semaine, 'rdv_jour', NEW.rdv_jour, 'rdv_creneau', NEW.rdv_creneau,
    'coffret_demande', NEW.coffret_demande, 'status', NEW.status, 'created_at', NEW.created_at
  );

  BEGIN
    SELECT * INTO response FROM net.http_post(
      url := webhook_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'X-Webhook-Name', 'trigger_agent_commercial',
        'Authorization', 'Bearer ' || COALESCE(service_key, '')
      ),
      body := payload
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Erreur webhook agent-commercial-limen pour lead %: %', NEW.id, SQLERRM;
  END;

  RETURN NEW;
END;
$function$;

-- 3. Remove public SELECT policy on contributions (email column leak).
-- Public reads happen via the contributions_publiques view which excludes email.
DROP POLICY IF EXISTS "Public peut lire contributions payees" ON public.contributions;

-- 4. Storage policies for certificats and cercle-photos buckets (admin only; writes via service role)
CREATE POLICY "certificats admin select" ON storage.objects
  FOR SELECT USING (bucket_id = 'certificats' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "certificats admin insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'certificats' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "certificats admin update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'certificats' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "certificats admin delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'certificats' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "cercle-photos admin select" ON storage.objects
  FOR SELECT USING (bucket_id = 'cercle-photos' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "cercle-photos admin insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'cercle-photos' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "cercle-photos admin update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'cercle-photos' AND has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "cercle-photos admin delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'cercle-photos' AND has_role(auth.uid(), 'admin'::app_role));
