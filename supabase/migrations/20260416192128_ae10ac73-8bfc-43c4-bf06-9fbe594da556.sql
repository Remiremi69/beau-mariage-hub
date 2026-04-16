-- Créer la fonction qui sera appelée par le trigger
CREATE OR REPLACE FUNCTION public.trigger_agent_commercial()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  webhook_url TEXT := 'https://placeholder.webhook.url';
  payload JSONB;
  response RECORD;
BEGIN
  -- Construire le payload avec tous les champs demandés
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

  -- Envoyer la requête HTTP POST via pg_net (non-bloquant)
  BEGIN
    SELECT * INTO response FROM net.http_post(
      url := webhook_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'X-Webhook-Name', 'trigger_agent_commercial'
      ),
      body := payload
    );
    
    RAISE NOTICE 'Webhook trigger_agent_commercial appelé pour lead %, réponse: %', NEW.id, response;
  EXCEPTION WHEN OTHERS THEN
    -- Log l'erreur mais ne bloque pas l'insertion
    RAISE WARNING 'Erreur webhook trigger_agent_commercial pour lead %: %', NEW.id, SQLERRM;
  END;

  RETURN NEW;
END;
$$;

-- Créer le trigger sur la table configurateur_leads
DROP TRIGGER IF EXISTS trigger_agent_commercial ON public.configurateur_leads;

CREATE TRIGGER trigger_agent_commercial
  AFTER INSERT ON public.configurateur_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_agent_commercial();