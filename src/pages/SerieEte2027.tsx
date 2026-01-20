import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Construction, Heart, ArrowLeft } from "lucide-react";

const SerieEte2027 = () => {
  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Série en cours de création | Le Beau Mariage"
        description="Notre prochaine série de mariages est en cours de préparation. Inscrivez-vous pour être informé dès son lancement !"
      />
      
      {/* Main Content */}
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Construction className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Heart className="w-4 h-4 text-secondary-foreground" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Notre Série est en cours de création
              <span className="block text-primary mt-2">✨</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Nous travaillons dur pour vous préparer une série de mariages exceptionnelle ! 
              Le concept <strong>Le Beau Mariage</strong> est actuellement en développement, 
              et cette page vous permettra bientôt de découvrir tous les détails de notre première série.
            </p>

            {/* Info Card */}
            <div className="bg-card rounded-2xl p-8 shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] mb-8">
              <h2 className="text-2xl font-semibold mb-4">Ce qui arrive bientôt :</h2>
              <ul className="text-left space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">🏛️</span>
                  <span>Un lieu d'exception soigneusement sélectionné</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">🎨</span>
                  <span>Un thème décoratif unique et élégant</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">👨‍🍳</span>
                  <span>Des prestataires d'exception triés sur le volet</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">📅</span>
                  <span>Des dates exclusives avec des prix transparents</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Retour à l'accueil
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="default" className="gap-2">
                  <Heart className="w-4 h-4" />
                  Être informé du lancement
                </Button>
              </Link>
            </div>

            {/* Footer note */}
            <p className="mt-12 text-sm text-muted-foreground">
              💡 En attendant, explorez notre concept sur la page d'accueil pour comprendre comment 
              <strong> Le Beau Mariage</strong> révolutionne l'organisation de mariage.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SerieEte2027;
