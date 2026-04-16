-- Mettre à jour la fonction trigger pour appeler l'edge function agent-commercial-limen
CREATE OR REPLACE FUNCTION public.trigger_agent_commercial()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  webhook_url TEXT := 'https://fwsqtjkydzetwcqidclw.supabase.co/functions/v1/agent-commercial-limen';
  payload JSONB;
  response RECORD;
BEGIN
  payload := jsonb_build_object(
    'id', NEW.id,
    'prenom', NEW.prenom,
    'nom', NEW.nom,
    'email', NEW.email,
    'telephone', NEW.telephone,
    'date_mariage', NEW.date_mariage,
    'guests_estimate', NEW.guests_estimate,
    'repas_formule', NEW.repas_formule,
    'deco', NEW.deco,
    'dj', NEW.dj,
    'photographe', NEW.photographe,
    'total_estimate', NEW.total_estimate,
    'localisation', NEW.localisation,
    'rdv_semaine', NEW.rdv_semaine,
    'rdv_jour', NEW.rdv_jour,
    'rdv_creneau', NEW.rdv_creneau,
    'coffret_demande', NEW.coffret_demande,
    'status', NEW.status,
    'created_at', NEW.created_at
  );

  BEGIN
    SELECT * INTO response FROM net.http_post(
      url := webhook_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'X-Webhook-Name', 'trigger_agent_commercial'
      ),
      body := payload
    );

    RAISE NOTICE 'Webhook agent-commercial-limen appelé pour lead %, réponse: %', NEW.id, response;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Erreur webhook agent-commercial-limen pour lead %: %', NEW.id, SQLERRM;
  END;

  RETURN NEW;
END;
$$;