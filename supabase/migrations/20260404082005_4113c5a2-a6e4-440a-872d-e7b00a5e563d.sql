create table if not exists public.configurateur_leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz not null default now(),
  prenom text,
  nom text,
  email text not null,
  telephone text,
  message text,
  date_mariage text,
  guests_estimate integer,
  ceremonie_laique boolean default false,
  vin_dhonneur text,
  repas_formule text,
  repas_entree text,
  repas_plat text,
  repas_dessert text,
  photographe text,
  dj text,
  deco text,
  options text[],
  ambiance_musique text[],
  total_estimate integer,
  status text default 'new'
);

alter table public.configurateur_leads enable row level security;

create policy "Insert leads from configurateur"
  on public.configurateur_leads for insert
  to anon
  with check (true);