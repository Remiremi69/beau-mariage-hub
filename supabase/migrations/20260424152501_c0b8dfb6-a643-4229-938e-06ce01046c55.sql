CREATE TABLE public.partenaires_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  prenom TEXT NOT NULL,
  nom TEXT,
  email TEXT NOT NULL,
  metier TEXT,
  ca_annuel TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'partenaires',
  status TEXT NOT NULL DEFAULT 'new'
);

ALTER TABLE public.partenaires_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert partenaires leads"
  ON public.partenaires_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read partenaires leads"
  ON public.partenaires_leads
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update partenaires leads"
  ON public.partenaires_leads
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));