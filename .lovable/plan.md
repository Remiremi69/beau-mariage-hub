## Plan de migration — Le Cercle v2 (enveloppes par poste)

### 1. Nettoyage des données de test
Une migration unique qui exécute, dans l'ordre :
```sql
TRUNCATE public.contributions, public.parts, public.cercle_tokens, public.cercles RESTART IDENTITY CASCADE;
```

### 2. Nouvelle table `postes_catalogue`
```
- id uuid pk
- cle text unique
- titre text
- evocation text
- ordre int (0..10)
- actif_par_defaut bool
- created_at timestamptz
```
GRANT SELECT à `anon` + `authenticated`, GRANT ALL à `service_role`.
RLS activée. Policies :
- `SELECT` : `true` (lecture publique, catalogue générique).
- `INSERT/UPDATE/DELETE` : `has_role(auth.uid(), 'admin')` uniquement.

Seed des 11 postes fournis (ordre 0..10, `photobooth` inactif par défaut).

### 3. Refonte de `parts`
- DROP colonnes : `niveau`, `montant_suggere`, `quantite_totale`, `etape_composeur_source`.
- (Type enum `niveau_part` s'il existe : DROP TYPE si plus référencé.)
- ADD colonnes :
  - `poste_cle text not null`
  - `montant_cible integer not null default 0`
  - `actif boolean not null default true`
- Conservées : `id`, `cercle_id`, `titre`, `evocation`, `ordre`, `created_at`.

### 4. Sécurité `parts` — verrouillage du `montant_cible`
- `REVOKE ALL ON public.parts FROM anon, authenticated;`
- `GRANT SELECT (id, cercle_id, poste_cle, titre, evocation, actif, ordre, created_at) ON public.parts TO anon, authenticated;`
- `GRANT ALL ON public.parts TO service_role;`
- Drop des anciennes policies SELECT anon, puis :
  - Policy `SELECT` (anon, authenticated) : `actif = true AND EXISTS (SELECT 1 FROM cercles c WHERE c.id = parts.cercle_id AND c.statut <> 'brouillon')`.
  - Policy admin `ALL` via `has_role`.
- `montant_cible` reste totalement inaccessible côté client (privilège colonne + jamais dans une vue publique).

### 5. `contributions`
- ADD `certificat_url text null`.
- `email` reste nullable (aucune contrainte ajoutée).
- Aucun changement sur `montant_declare` ni sur la vue `contributions_publiques`.

### 6. Edge Function `generate-parts`
Nom conservé (`generate-parts`). Réécriture :
- Retirer : import Anthropic, `SYSTEM_PROMPT`, `callClaude`, `parseParts`, validations "15–25 parts", retry parsing JSON.
- Conserver : validation lead, création du `cercle` (slug, statut brouillon), création `cercle_tokens`, envoi email d'invitation, gestion `force` (409 si existe).
- Nouvelle logique parts :
  ```ts
  const { data: postes } = await supabase
    .from('postes_catalogue')
    .select('cle, titre, evocation, ordre')
    .eq('actif_par_defaut', true)
    .order('ordre');
  const rows = postes.map(p => ({
    cercle_id, poste_cle: p.cle, titre: p.titre,
    evocation: p.evocation, ordre: p.ordre,
    montant_cible: 0, actif: true,
  }));
  await supabase.from('parts').insert(rows);
  ```

### 7. Impact frontend
`src/components/admin/CercleGeneratorPanel.tsx` référence `niveau`, `montant_suggere`, `quantite_totale`. Après migration (types regénérés), je le simplifierai pour afficher `poste_cle`, `titre`, `evocation`, `ordre` (montant_cible non affiché ici — il sera édité dans un futur écran admin dédié).

### 8. Hors périmètre (non touché)
`cercles`, `cercle_tokens`, vue `contributions_publiques`, système de token, pipeline email.

---

**Ordre d'exécution** : (a) migration SQL unique regroupant sections 1→5, (b) redeploy edge function (section 6), (c) patch du panel admin (section 7).

Confirme et j'applique la migration.