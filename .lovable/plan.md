
## Diagnostic

Le domaine `notify.lebeaumariage.fr` est bloqué en statut **Pending** depuis 2 semaines. Le délai normal est de quelques minutes à 72h maximum. Cela indique un problème de configuration DNS qui ne se résoudra pas tout seul.

### Cause probable
Les enregistrements NS qui doivent être ajoutés chez le registrar du domaine `lebeaumariage.fr` (pour déléguer le sous-domaine `notify` aux serveurs de noms de Lovable Cloud) :
- soit n'ont jamais été ajoutés
- soit ont été ajoutés incorrectement
- soit pointent vers d'anciens serveurs de noms

## Plan d'action

### Étape 1 — Supprimer le domaine actuel
Aller dans **Nuage → Courriels → Gérer les domaines** et supprimer `notify.lebeaumariage.fr` pour repartir d'une base propre.

### Étape 2 — Re-créer le domaine
Relancer la configuration via le dialogue de setup email. Cela va régénérer de nouveaux enregistrements NS frais à ajouter chez le registrar.

### Étape 3 — Ajouter les NS records chez le registrar
Une fois les nouveaux NS affichés, il faudra les ajouter chez le registrar du domaine `lebeaumariage.fr` (OVH, Gandi, IONOS, Cloudflare, etc. — selon ton hébergeur de domaine).

Les enregistrements ressembleront à :
```text
notify.lebeaumariage.fr   NS   ns3.lovable.cloud
notify.lebeaumariage.fr   NS   ns4.lovable.cloud
```

### Étape 4 — Vérifier la propagation
Une fois les NS ajoutés, la vérification se fait normalement en quelques minutes (max 72h, mais 99% du temps < 1h).

### Étape 5 — Suite automatique
Une fois le domaine vérifié, l'infrastructure email continuera automatiquement, et l'envoi des emails de l'agent commercial Limen reprendra.

---

## Questions importantes à clarifier avant de procéder

1. **Chez quel registrar est hébergé `lebeaumariage.fr` ?** (OVH, Gandi, Cloudflare, IONOS, autre ?) — ça m'aidera à te donner les instructions précises pour ajouter les NS records.

2. **As-tu bien ajouté les NS records lors de la première configuration il y a 2 semaines ?** Si oui, peux-tu vérifier qu'ils sont toujours présents et corrects dans l'interface DNS de ton registrar ? Si non, c'est très probablement la cause du blocage.

3. **Veux-tu que je supprime le domaine actuel et relance la procédure dès maintenant ?** (Action irréversible — il faudra reconfigurer les NS records ensuite.)

