

# Rendre ton site lisible par les moteurs de recherche et les IA

## Le problème

Ton site est une **SPA (Single Page Application)** en React. Quand Google, GPTBot ou ClaudeBot visitent ton site, ils ne voient que le `<div id="root"></div>` vide dans `index.html` — le contenu est chargé par JavaScript. Beaucoup de crawlers ne l'exécutent pas.

De plus, ton `sitemap.xml` ne liste qu'une seule page (la page d'accueil) alors que tu en as 16+.

## Ce qu'on va faire (3 actions)

### 1. Mettre à jour le sitemap.xml avec toutes les pages

Ajouter toutes les routes du site dans `public/sitemap.xml` :
- `/concept`, `/serie-ete-2027`, `/serie-octobre-2027`, `/serie-octobre-2027/domaine`
- Les 6 pages prestataires (`/serie-octobre-2027/prestataires/traiteur`, etc.)
- `/configurateur`, `/temoignages`, `/faq`, `/contact`, `/garantie`, `/certification`

### 2. Ajouter un contenu statique `<noscript>` dans `index.html`

Dans le `<body>`, ajouter un bloc `<noscript>` contenant le texte clé du site en HTML statique (titres, descriptions, liens vers les pages). C'est ce que les crawlers sans JavaScript verront. Cela inclura :
- Le nom du site, la proposition de valeur principale
- Les liens vers toutes les pages importantes
- Les infos de contact

### 3. Enrichir `robots.txt` pour les bots IA

Ajouter explicitement les user-agents des crawlers IA (GPTBot, ClaudeBot, Google-Extended, etc.) avec `Allow: /` pour s'assurer qu'ils sont autorisés.

---

## Ce que ça ne couvre PAS (et pourquoi)

Le **pre-rendering côté serveur (SSR/SSG)** serait la solution idéale pour un SEO parfait, mais l'hébergement Lovable ne le supporte pas nativement. Les 3 actions ci-dessus sont les meilleures optimisations possibles dans cet environnement et couvrent la grande majorité des besoins SEO.

