import SEO from "@/components/SEO";

const Temoignages = () => {
  return (
    <div className="min-h-screen pt-20 bg-background">
      <SEO 
        title="Témoignages | Avis de Nos Couples Mariés"
        description="Découvrez les témoignages de nos couples mariés. Ils ont choisi Le Beau Mariage pour un mariage de rêve sans stress."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Ce qu'ils en ont pensé
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Les premiers mariages de la série Octobre 2027 n'ont pas encore eu lieu.
            Cette page accueillera bientôt les témoignages authentiques de nos couples.
          </p>
          <div className="border-t border-muted pt-12">
            <p className="text-sm text-muted-foreground tracking-widest uppercase">
              À venir
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temoignages;
