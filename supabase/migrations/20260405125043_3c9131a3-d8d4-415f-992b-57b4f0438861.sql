
-- Add missing columns to configurateur_leads
ALTER TABLE public.configurateur_leads
  ADD COLUMN IF NOT EXISTS vh_bouchee text,
  ADD COLUMN IF NOT EXISTS vh_animation text,
  ADD COLUMN IF NOT EXISTS vh_mignardise text;

-- Enable pg_net for HTTP calls from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Trigger function: call send-lead-emails edge function on new lead
CREATE OR REPLACE FUNCTION public.notify_new_lead()
RETURNS trigger AS $$
BEGIN
  PERFORM net.http_post(
    url := current_setting('app.supabase_url', true)
           || '/functions/v1/send-lead-emails',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer '
        || current_setting('app.service_role_key', true)
    ),
    body := row_to_json(NEW)::jsonb
  );
  RETURN NEW;
EXCEPTION WHEN others THEN
  RAISE WARNING 'notify_new_lead error: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_new_configurateur_lead ON public.configurateur_leads;
CREATE TRIGGER on_new_configurateur_lead
  AFTER INSERT ON public.configurateur_leads
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();
