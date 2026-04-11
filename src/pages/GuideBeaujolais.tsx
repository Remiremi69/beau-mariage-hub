import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const schemaGuide = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Se marier en Beaujolais en 2027 : guide complet pour un mariage d'exception",
  description: "Tout ce qu'il faut savoir pour organiser un mariage en Beaujolais : lieux, prestataires, budget, saisons, et la formule clé en main du Beau Mariage.",
  author: { "@type": "Organization", name: "Le Beau Mariage", url: "https://lebeaumariage.fr" },
  publisher: { "@type": "Organization", name: "Le Beau Mariage", url: "https://lebeaumariage.fr", logo: "https://lebeaumariage.fr/logo.png" },
  mainEntityOfPage: "https://lebeaumariage.fr/guide-mariage-beaujolais",
};

const GuideBeaujolais = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO
        title="Se marier en Beaujolais en 2027 — Guide Complet Mariage"
        description="Tout ce qu'il faut savoir pour organiser un mariage en Beaujolais : lieux, prestataires, budget, saisons, et la formule clé en main du Beau Mariage."
        canonical="https://lebeaumariage.fr/guide-mariage-beaujolais"
        jsonLd={schemaGuide}
      />

      <article className="max-w-3xl mx-auto px-6 py-24 space-y-16">

        <header className="space-y-6">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Guide</p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Se marier en Beaujolais en 2027 :
            <br />
            ce que personne ne vous dit sur l'organisation
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            À 40 minutes de Lyon, le Beaujolais est devenu l'une des destinations mariage les plus recherchées de la région Rhône-Alpes. Voici pourquoi — et comment s'y marier sans se perdre dans l'organisation.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Pourquoi choisir le Beaujolais pour son mariage ?</h2>
          <p className="text-muted-foreground leading-relaxed">Le Beaujolais offre ce que peu de régions françaises réunissent : des paysages de vignes, des domaines viticoles privatisables, une gastronomie d'exception et une accessibilité depuis Lyon en moins d'une heure.</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>→ Accessibilité : 40 min de Lyon, 20 min de Villefranche-sur-Saône</li>
            <li>→ Cadre : domaines viticoles, caves voûtées, terrasses dans les vignes</li>
            <li>→ Saison idéale : septembre–novembre, lumière dorée des vendanges</li>
            <li>→ Disponibilité : moins saturé que la Provence ou la Loire</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quelle est la meilleure saison pour se marier en Beaujolais ?</h2>
          <p className="text-muted-foreground leading-relaxed">L'automne est la saison reine du Beaujolais. Octobre offre une lumière photographique exceptionnelle, les vignes en couleurs, et des températures idéales pour une cérémonie en extérieur.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Combien coûte un mariage en Beaujolais ?</h2>
          <p className="text-muted-foreground leading-relaxed">Un mariage classique avec un domaine privatisé revient généralement entre 20 000 et 45 000 € pour 80 à 120 personnes — selon les prestataires choisis séparément, coordonnés seul, avec 300 heures de préparation en moyenne.</p>
          <p className="text-muted-foreground leading-relaxed">Notre réponse : une formule tout compris à prix fixe de 10 000 €. Lieu, traiteur, photographe, DJ, coordination — déjà sélectionnés, déjà coordonnés.</p>
          <Link to="/configurateur" className="inline-block text-primary hover:underline font-medium">Créer votre devis en 10 minutes →</Link>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Le Domaine de la Croix Rochefort</h2>
          <p className="text-muted-foreground leading-relaxed">Situé à Saint-Didier-sur-Beaujeu, le Domaine de la Croix Rochefort est un domaine viticole entièrement privatisable : cave voûtée 600m², salle 500m², jusqu'à 300 convives, terrasse dans les vignes.</p>
          <Link to="/serie-octobre-2027/domaine" className="inline-block text-primary hover:underline font-medium">Découvrir le domaine →</Link>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Comment organiser un mariage sans stress en Beaujolais ?</h2>
          <p className="text-muted-foreground leading-relaxed">Trouver un traiteur, un photographe, un DJ, un fleuriste, un décorateur — chacun avec ses disponibilités, ses contrats, ses riders. En moyenne 300 heures de préparation pour un mariage classique.</p>
          <p className="text-muted-foreground leading-relaxed">Notre approche : tout est déjà prêt. Vous choisissez votre date, vous personnalisez en 10 minutes, vous vivez votre mariage.</p>
        </section>

        <section className="text-center space-y-4 py-12">
          <h2 className="text-2xl font-semibold">Votre mariage en Beaujolais</h2>
          <p className="text-muted-foreground">Prêt à commencer ?</p>
          <p className="text-muted-foreground">5 dates disponibles en octobre 2027. Places limitées.</p>
          <Link to="/configurateur" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
            Configurer mon mariage →
          </Link>
        </section>

      </article>
    </main>
  );
};

export default GuideBeaujolais;
