

## Clarification importante

L'écran « Manage DNS records » dans **Lovable** (capture d'écran) sert à gérer les DNS d'un domaine **acheté via Lovable**. Mais `lebeaumariage.fr` est acheté chez **Hostinger** — donc cet écran Lovable n'est PAS le bon endroit.

### Où ajouter les NS records ?

Les NS records doivent être ajoutés **chez Hostinger** (registrar du domaine), PAS dans Lovable.

## Plan d'action corrigé

### Étape 1 — Quitter l'écran Lovable « Manage DNS records »
Cet écran ne sert pas pour ce cas. Ferme-le.

### Étape 2 — Aller dans Cloud → Emails
Dans Lovable, va dans **Cloud → Emails → Manage Domains**. Là, tu verras le domaine `notify.lebeaumariage.fr` avec ses **2 NS records à copier** (du type `ns3.lovable.cloud`, `ns4.lovable.cloud`).

**📋 Copie ces 2 valeurs.**

### Étape 3 — Aller chez Hostinger
1. Connecte-toi à [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. **Domains** → clique sur `lebeaumariage.fr`
3. **DNS / Nameservers** → **DNS Records**
4. Clique **Add Record**

### Étape 4 — Vérifier que Hostinger propose bien le type NS
Dans le menu déroulant **Type** chez Hostinger, tu devrais voir : A, AAAA, CNAME, MX, TXT, **NS**, SRV, CAA…

Si **NS n'apparaît pas** chez Hostinger non plus, c'est une limitation de leur interface DNS de base. Dans ce cas → voir Plan B ci-dessous.

### Étape 5 — Si NS est disponible chez Hostinger
Crée 2 enregistrements :
- **Type** : NS
- **Name** : `notify`
- **Points to / Nameserver** : la valeur copiée depuis Lovable
- **TTL** : 14400

Répéter pour la 2ème valeur NS.

---

## Plan B — Si Hostinger ne permet PAS les NS records sur sous-domaine

Certains plans Hostinger limitent les types DNS. Solutions possibles :
1. **Changer les nameservers du domaine entier** vers Lovable (mais ça casserait le site web actuel)
2. **Utiliser Cloudflare comme DNS intermédiaire** (gratuit) : transférer les nameservers de `lebeaumariage.fr` vers Cloudflare, puis ajouter les NS records depuis Cloudflare qui supporte tous les types
3. **Contacter le support Hostinger** pour qu'ils ajoutent les NS records manuellement

## Questions à clarifier

1. **Es-tu actuellement dans Lovable (Manage DNS records) ou chez Hostinger ?** La capture montre Lovable — il faut basculer vers Hostinger.
2. **Une fois chez Hostinger dans la zone DNS, peux-tu me dire quels types sont proposés dans le menu Type ?** (capture d'écran utile)

