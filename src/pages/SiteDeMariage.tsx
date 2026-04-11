import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const features = [
  {
    title: "Votre histoire",
    description: "Votre rencontre, vos moments forts, vos témoins. Racontés à votre façon.",
  },
  {
    title: "Toutes les infos au même endroit",
    description: "Horaires, adresses, accès, hébergements. Vos invités trouvent tout sans vous solliciter.",
  },
  {
    title: "RSVP intégré",
    description: "Vos invités confirment leur présence en un clic. Vous recevez la liste, sans gérer les échanges.",
  },
  {
    title: "Liste de mariage connectée",
    description: "Un lien direct vers votre liste. Simple d'accès pour ceux qui cherchent.",
  },
];

const SiteDeMariage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Site de Mariage Personnalisé | Le Beau Mariage"
        description="Un site de mariage élégant et personnalisé, compris dans chaque forfait Le Beau Mariage. RSVP, histoire, infos pratiques — tout est prêt pour vos invités."
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 md:pb-20 bg-background">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            Votre site de mariage,
            <span className="block text-primary">compris dans votre forfait.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-secondary font-semibold mb-6">
            Un espace pour vos invités. Aucune démarche supplémentaire.
          </p>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Chaque forfait Le Beau Mariage inclut un site de mariage personnalisé — prêt avant votre jour J, sans que vous ayez à vous en occuper.
          </p>
        </div>
      </section>

      {/* 4 Features */}
      <section className="py-12 sm:py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl bg-background border border-border/50 p-5 sm:p-8 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_hsl(14_71%_67%/0.25)] hover:-translate-y-2 hover:border-primary/20"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final block */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-foreground text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
            Ce site est configuré par notre équipe à partir des informations que vous nous transmettez. Vous le recevez prêt à partager.
          </p>
          <Link to="/configurateur">
            <Button size="xl" variant="hero" className="group">
              <span>Configurer mon mariage</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Tagline */}
      <div className="py-8 text-center">
        <p
          className="text-sm italic font-['Cormorant_Garamond',serif]"
          style={{ color: "#C9A96E", letterSpacing: "0.05em" }}
        >
          Le seuil, pas le spectacle.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default SiteDeMariage;
