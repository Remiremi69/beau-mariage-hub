// Utilitaires d'affichage des prénoms (Le Cercle).
// ⚠️ Ce fichier est dupliqué à l'identique dans
//    supabase/functions/_shared/prenom.ts (contexte Deno / Edge Functions).
//    Toute modification doit être reportée dans les deux fichiers.

/**
 * Normalise un prénom en capitalisation propre.
 *   "ANTO"        → "Anto"
 *   "jean-pierre" → "Jean-Pierre"
 *   "marie claire"→ "Marie Claire"
 * Gère les prénoms composés (tirets, espaces) et le cas null/vide (→ "").
 */
export function formatPrenom(prenom?: string | null): string {
  if (!prenom) return "";
  const trimmed = prenom.trim();
  if (!trimmed) return "";
  return trimmed
    .toLowerCase()
    .replace(/[^\s-]+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

/**
 * Affichage du couple à partir des DEUX prénoms des mariés.
 *   ("ANTO", "momo") → "Anto & Momo"
 *   ("ANTO", null)   → "les mariés"   (un seul prénom ≠ un couple)
 *   (null, null)     → "les mariés"
 *
 * ⚠️ On n'affiche un couple que si DEUX vrais prénoms existent. On ne
 * fabrique jamais un faux couple à partir du prénom + nom de famille d'une
 * même personne (ce serait trompeur et exposerait un nom de famille).
 * Tant qu'il n'y a pas de vrai second prénom en base → repli neutre.
 */
export function formatPrenomsCouple(
  prenom1?: string | null,
  prenom2?: string | null,
): string {
  const a = formatPrenom(prenom1);
  const b = formatPrenom(prenom2);
  if (a && b) return `${a} & ${b}`;
  return "les mariés";
}

// Voyelles + h muet (élision par défaut devant un h de prénom).
const ELISION_RE = /[aeiouyàâäéèêëîïôöùûüh]/;

/**
 * Élision française de la préposition "de" devant une voyelle ou un h muet.
 *   "Anto"  → "d'Anto"
 *   "Élise" → "d'Élise"
 *   "Momo"  → "de Momo"
 */
export function elideDe(mot?: string | null): string {
  const m = (mot ?? "").trim();
  if (!m) return "de";
  return ELISION_RE.test(m.charAt(0).toLowerCase()) ? `d'${m}` : `de ${m}`;
}

/**
 * Fragment "de/d'/des …" à partir d'un libellé de couple déjà assemblé.
 * Gère la contraction "de + les" → "des" pour le repli neutre.
 *   "Anto & Momo" → "d'Anto & Momo"
 *   "Momo"        → "de Momo"
 *   "les mariés"  → "des mariés"   (jamais "de les mariés")
 */
export function mariageDeLabel(coupleLabel?: string | null): string {
  const m = (coupleLabel ?? "").trim();
  if (!m || m.toLowerCase() === "les mariés") return "des mariés";
  return elideDe(m);
}

/**
 * Fragment "de/d'/des …" à partir des deux prénoms bruts.
 *   ("ANTO", "momo") → "d'Anto & Momo"
 *   ("Momo", null)   → "des mariés"   (un seul prénom → repli neutre)
 *   (null, null)     → "des mariés"
 * Utile pour "Les proches {…} portent leur mariage." et
 * "pour le mariage {…}".
 */
export function formatMariageDe(
  prenom1?: string | null,
  prenom2?: string | null,
): string {
  return mariageDeLabel(formatPrenomsCouple(prenom1, prenom2));
}
