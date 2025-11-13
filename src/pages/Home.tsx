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
            Votre mariage de rêve, à partir de 499€/mois.
          </h2>
          <p className="text-lg md:text-xl text-card mb-10 max-w-2xl mx-auto drop-shadow-lg">
            Découvrez notre concept révolutionnaire : un mariage de luxe accessible, financé en douceur, avec une expérience d'essayage VIP unique en France.
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
            La Révolution du Mariage en 4 Piliers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Un Lieu d'Exception</h3>
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
                <h3 className="text-2xl font-bold mb-4">Un Prix Jamais Vu</h3>
                <p className="text-muted-foreground">
                  Un mariage tout compris à partir de 7 500 €, ou 499€/mois. Qualité premium, prix imbattable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Votre Robe, Votre Moment</h3>
                <p className="text-muted-foreground">
                  Vivez une expérience d'essayage VIP dans notre Salon Éphémère et accédez à notre collection exclusive.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Votre Mariage sur Mesure</h3>
                <p className="text-muted-foreground">
                  Personnalisez votre journée avec notre marketplace d'options : vidéaste, photobooth, brunch...
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
