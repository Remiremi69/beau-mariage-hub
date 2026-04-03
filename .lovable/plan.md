

# Mise à jour SEO — 3 correctifs

Trois modifications ciblées pour améliorer le référencement du site.

## Fichiers modifiés

### 1. `src/pages/Home.tsx`
Remplacer les props du composant `<SEO>` existant par le nouveau title, description et canonical explicite vers `https://lebeaumariage.fr/`.

### 2. `src/components/SEO.tsx`
Corriger la ligne du `canonicalUrl` pour éviter l'erreur SSR avec `window` — utiliser `canonical ??` avec un check `typeof window !== 'undefined'`.

### 3. `index.html`
- Mettre à jour la description dans le bloc JSON-LD Organization existant.
- Ajouter un second bloc `<script type="application/ld+json">` avec le schema `EventSeries` pour la Série Octobre 2027.

## Détails techniques

Aucune nouvelle dépendance. Aucun changement de structure. Modifications purement déclaratives (meta tags et structured data).

