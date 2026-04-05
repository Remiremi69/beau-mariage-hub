

## Création du compte admin

**Objectif** : Créer le compte `remi@lebeaumariage.fr` avec le mot de passe fourni et lui attribuer le rôle admin.

### Étapes

1. **Créer l'utilisateur** via l'API Auth Supabase (service role) avec email `remi@lebeaumariage.fr` et le mot de passe fourni, en confirmant l'email automatiquement.

2. **Insérer le rôle admin** dans la table `user_roles` avec l'UUID du nouvel utilisateur et le rôle `admin`.

3. **Vérifier** que la connexion fonctionne sur `/admin/login`.

### Détails techniques

- Appel `POST /auth/v1/admin/users` avec `email_confirm: true` pour bypasser la vérification email
- Insertion dans `user_roles(user_id, role)` avec le rôle `'admin'`
- Aucune modification de code nécessaire

