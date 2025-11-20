import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ClipboardCheck, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";
import badgeCertifie from "@/assets/badge-certifie.png";
import badgeExcellence from "@/assets/badge-excellence.png";

const Certification = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Notre Label d'Excellence
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Les Coulisses de la Perfection
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            Découvrez comment nous sélectionnons et certifions les artisans de votre mariage.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground text-center">
              Pourquoi avons-nous créé notre propre label ?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
              Parce que votre tranquillité d'esprit est notre priorité absolue. Dans une industrie où tout le monde peut se déclarer "professionnel", nous avons décidé de créer un standard objectif et exigeant. Le label "Le Beau Mariage" n'est pas un simple logo, c'est la garantie d'une qualité irréprochable, vérifiée et approuvée.
            </p>
          </div>
        </div>
      </section>

      {/* Les 3 Piliers */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            Les 3 Piliers de notre Certification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Un Référentiel Exigeant</h3>
                <p className="text-muted-foreground">
                  Chaque prestataire est évalué sur des critères stricts : fiabilité légale, qualité de la relation client, transparence contractuelle et éthique irréprochable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(149_29%_60%/0.2)] transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Des Évaluations Métier</h3>
                <p className="text-muted-foreground">
                  Nous utilisons des grilles de notation détaillées et spécifiques à chaque corps de métier (traiteur, photographe, DJ...) pour mesurer objectivement la compétence technique et la qualité de service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  <Star className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Une Qualité Suivie en Continu</h3>
                <p className="text-muted-foreground">
                  La certification n'est pas acquise à vie. Après chaque mariage, nous collectons vos retours qui sont directement intégrés dans la note de nos prestataires. Seuls les meilleurs restent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Les Deux Niveaux */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            Les Deux Niveaux de Distinction
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Label Certifié */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={badgeCertifie} 
                  alt="Badge Certifié Le Beau Mariage" 
                  className="w-48 h-48 object-contain"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Le Label Certifié
              </h3>
              <p className="text-lg font-semibold text-primary mb-3">
                La Garantie du Professionnalisme
              </p>
              <p className="text-muted-foreground">
                Assure que le prestataire respecte tous nos standards fondamentaux de fiabilité, de qualité et de service. C'est votre garantie d'un service sans accroc.
              </p>
            </div>

            {/* Label Excellence */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src={badgeExcellence} 
                  alt="Badge Excellence Le Beau Mariage" 
                  className="w-48 h-48 object-contain"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Le Label Excellence
              </h3>
              <p className="text-lg font-semibold text-secondary mb-3">
                La Crème de la Crème
              </p>
              <p className="text-muted-foreground">
                Réservé à l'élite de la profession. Ces prestataires ne se contentent pas d'être parfaits, ils créent de la magie. Ils sont reconnus pour leur créativité, leur proactivité et leur capacité à dépasser toutes vos attentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA pour Prestataires */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Award className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Vous êtes un prestataire et vous visez l'excellence ?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Rejoignez notre réseau de partenaires certifiés et accédez à un volume d'affaires garanti. Nous sommes toujours à la recherche des meilleurs talents.
            </p>
            <Link to="/contact">
              <Button size="xl" variant="hero" className="font-semibold">
                Devenir partenaire
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certification;
