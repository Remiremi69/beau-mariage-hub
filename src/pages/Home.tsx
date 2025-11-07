import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Heart, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-wedding.jpg";
import venueImage from "@/assets/venue-exterior.jpg";

const Home = () => {
  const testimonials = [
    {
      name: "Laura & Tom",
      date: "15 Juillet 2027",
      text: "Incroyable ! Un mariage magnifique sans aucun stress. Le concept est génial et l'équipe a été parfaite.",
      rating: 5,
    },
    {
      name: "Chloé & Maxime",
      date: "22 Juillet 2027",
      text: "La décoration était sublime, le lieu magique. Nos invités ont été bluffés. On recommande à 1000% !",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-card mb-6 drop-shadow-lg">
            Le Beau Mariage
          </h1>
          <h2 className="text-2xl md:text-4xl text-card mb-8 drop-shadow-lg">
            Votre mariage de rêve, le stress en moins, le budget en plus.
          </h2>
          <p className="text-lg md:text-xl text-card mb-10 max-w-2xl mx-auto drop-shadow-lg">
            Découvrez notre concept unique de mariages clé-en-main à 10 000 €, organisés dans des
            lieux d'exception.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/serie-ete-2027">
              <Button size="xl" variant="hero" className="font-semibold">
                Découvrir notre série Été 2027
              </Button>
            </Link>
            <Link to="/configurateur">
              <Button size="xl" variant="elegant" className="font-semibold">
                Créer un mariage
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            L'élégance et la sérénité, en 3 étapes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Un lieu de rêve</h3>
                <p className="text-muted-foreground">
                  Nous sélectionnons pour vous un domaine de charme, privatisé pour votre journée.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Une offre tout compris</h3>
                <p className="text-muted-foreground">
                  Traiteur, photographe, DJ, décoration... Tout est inclus pour 10 000 €, à personnaliser.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-sand/50 rounded-full flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-anthracite" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Vous choisissez votre date</h3>
                <p className="text-muted-foreground">
                  Il ne vous reste qu'à dire 'Oui' et profiter de votre journée.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Series Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            En ce moment : La Série "Bohème Chic en Beaujolais"
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Plongez dans une ambiance bohème et romantique au cœur des vignes du Beaujolais
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={venueImage}
                alt="Domaine de la Vigne d'Or"
                className="rounded-lg shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] w-full"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold mb-6">Le Domaine de la Vigne d'Or</h3>
              <p className="text-lg mb-8 text-muted-foreground">
                Niché dans les Pierres Dorées, ce domaine offre un panorama exceptionnel sur le
                Beaujolais. Sa grange rénovée et son parc arboré seront le théâtre de votre journée
                de rêve.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Cérémonie laïque en extérieur avec vue sur les vignes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Décoration "Bohème Chic" complète</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Menu gastronomique avec produits du terroir</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <span>Prestations haut de gamme incluses</span>
                </li>
              </ul>
              <Link to="/serie-ete-2027">
                <Button size="lg" variant="elegant" className="font-semibold">
                  Voir les dates disponibles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Ils nous ont fait confiance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">Mariés le {testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/temoignages">
              <Button variant="outline" size="lg">
                Voir tous les témoignages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
