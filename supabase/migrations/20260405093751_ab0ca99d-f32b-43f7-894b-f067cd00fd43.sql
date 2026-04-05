-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS on user_roles: admins can read
CREATE POLICY "Admins can read roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Lead tokens table
CREATE TABLE public.lead_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  lead_id uuid REFERENCES public.configurateur_leads(id) ON DELETE CASCADE NOT NULL,
  token uuid DEFAULT gen_random_uuid() UNIQUE NOT NULL,
  type text NOT NULL,
  used_at timestamptz,
  docusign_envelope_id text,
  stripe_session_id text,
  stripe_payment_intent text,
  amount_cents integer,
  status text DEFAULT 'pending' NOT NULL
);
ALTER TABLE public.lead_tokens ENABLE ROW LEVEL SECURITY;

-- Admins can manage tokens
CREATE POLICY "Admins can manage tokens"
  ON public.lead_tokens
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Anon can read tokens by token value (for signature/payment pages)
CREATE POLICY "Anyone can read by token"
  ON public.lead_tokens
  FOR SELECT
  TO anon
  USING (true);

-- Admins can read all leads
CREATE POLICY "Admins can read leads"
  ON public.configurateur_leads
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update leads
CREATE POLICY "Admins can update leads"
  ON public.configurateur_leads
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Enable realtime for leads
ALTER PUBLICATION supabase_realtime ADD TABLE public.configurateur_leads;