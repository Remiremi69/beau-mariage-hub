import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { MapPin, Users, Heart, Calendar, Star, ArrowRight, Settings, Construction, Train, Plane, Grape, Car, Building, Navigation } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Hook for intersection observer animations
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
};

const SerieEte2027 = () => {
  const galleryRef = useInView(0.1);
  const locationRef = useInView(0.1);
  const datesRef = useInView(0.1);
  const whyRef = useInView(0.1);
  const stepsRef = useInView(0.1);

  const distanceCards = [
    {
      icon: Train,
      title: "Gare TGV de Mâcon-Loché",
      time: "34 minutes en voiture",
      description: "Idéal pour les invités venant de Paris ou du nord"
    },
    {
      icon: Plane,
      title: "Aéroport & Ville de Lyon",
      time: "55 minutes en voiture",
      description: "Parfait pour les invités internationaux"
    },
    {
      icon: Grape,
      title: "Au Cœur du Beaujolais",
      time: "Région viticole emblématique",
      description: "Une destination en soi pour vos invités"
    }
  ];

  const practicalInfo = [
    {
      icon: Car,
      title: "Parking",
      description: "Parking gratuit sur place pour tous vos invités"
    },
    {
      icon: Building,
      title: "Hébergement à Proximité",
      description: "Plusieurs options d'hôtels et gîtes dans les environs"
    },
    {
      icon: Navigation,
      title: "Accès",
      description: "Accessible en voiture. Possibilité de navettes depuis les gares pour les invités sans véhicule"
    }
  ];

  const dates = [
    { day: "Lundi", date: "4 oct.", status: "available" },
    { day: "Mardi", date: "5 oct.", status: "available" },
    { day: "Mercredi", date: "6 oct.", status: "available" },
    { day: "Jeudi", date: "7 oct.", status: "available" },
    { day: "Vendredi", date: "8 oct.", status: "available" },
  ];

  const whyReasons = [
    {
      icon: Heart,
      title: "Authenticité",
      description: "Un lieu chargé de caractère et d'histoire, qui crée une ambiance naturellement élégante."
    },
    {
      icon: Users,
      title: "Capacité & Flexibilité",
      description: "Jusqu'à 300 convives, avec des espaces polyvalents pour adapter la cérémonie et la réception à votre vision."
    },
    {
      icon: Star,
      title: "Équipe Partenaire",
      description: "Une équipe familiale passionnée, alignée avec nos valeurs de qualité et d'excellence."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Contactez-nous",
      description: "Échange avec notre équipe pour connaître les détails et les tarifs de la première série."
    },
    {
      number: "2",
      title: "Configurez votre mariage",
      description: "Utilisez notre configurateur pour personnaliser votre forfait."
    },
    {
      number: "3",
      title: "Confirmez votre réservation",
      description: "Sécurisez votre date avec un acompte et commencez à préparer votre grand jour."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Série Octobre 2027 | Le Beau Mariage"
        description="Découvrez notre première série de mariages au Domaine de la Croix Rochefort à Saint-Didier-sur-Beaujeu. Du 4 au 8 octobre 2027, vivez un moment inoubliable en Beaujolais."
        canonical="https://lebeaumariage.fr/serie-ete-2027"
      />

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Première Série
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Notre Première Série :
              <span className="block text-primary">Octobre 2027</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-medium mb-6">
              Élégance & Caractère en Beaujolais
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Découvrez le lieu unique qui accueillera notre première série de mariages. Du lundi 4 au vendredi 8 octobre 2027, le Domaine de la Croix Rochefort sera le théâtre de moments inoubliables.
            </p>
          </div>

          {/* Banner Image */}
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://i.postimg.cc/5NHccFBF/54-domaine-de-lanbspcroixnbsprochefort.jpg" 
                alt="Domaine de la Croix Rochefort - Vue panoramique du lieu de réception pour mariage en Beaujolais"
                className="w-full h-auto object-cover aspect-[3/1]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Le Domaine Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-primary font-medium">Saint-Didier-sur-Beaujeu</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Le Domaine de la Croix Rochefort
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Imaginez votre cérémonie dans un caveau voûté chargé d'histoire, la lumière tamisée qui crée une intimité magique. Puis, la réception dans une salle de caractère où l'authenticité prime sur l'artificiel. C'est ici, à Saint-Didier-sur-Beaujeu, au cœur du Beaujolais, que nous organisons votre mariage.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Un lieu qui respire l'authenticité. Une équipe locale qui vous accueille comme des amis. Des espaces qui se prêtent à tous les rêves.
              </p>
              
              <p className="font-semibold text-foreground mb-4">Ce que vous allez aimer :</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5">✓</span>
                  <span className="text-foreground">Un caveau voûté pour une cérémonie intime et mémorable</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5">✓</span>
                  <span className="text-foreground">Une salle de réception pleine de caractère</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5">✓</span>
                  <span className="text-foreground">Un cadre authentique, loin du standardisé</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5">✓</span>
                  <span className="text-foreground">L'atmosphère chaleureuse du Beaujolais</span>
                </li>
              </ul>
            </div>

            {/* Image principale du domaine */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://i.postimg.cc/Y05dBj78/Domaine-de-la-Croix-Rochefort-mariage-saint-didier-sur-Beaujeu.jpg" 
                alt="Domaine de la Croix Rochefort - Salle de réception pour mariage à Saint-Didier-sur-Beaujeu"
                className="w-full h-auto object-cover aspect-[4/3] rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-background" ref={galleryRef.ref}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Galerie du Domaine
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Laissez-vous séduire par l'atmosphère unique du Domaine de la Croix Rochefort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Caveau voûté - avec image */}
            <div
              className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-700 ${galleryRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <img 
                src="https://i.postimg.cc/x1YWXFrv/9-accueil-le-caveau.jpg" 
                alt="Caveau voûté du Domaine de la Croix Rochefort"
                className="w-full h-auto object-cover aspect-[3/2]"
              />
            </div>

            {/* Salle de réception - avec image */}
            <div
              className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-700 ${galleryRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <img 
                src="https://i.postimg.cc/4xJSf7VZ/420-katleenetcharly-01juin2024-3-127973-172232023480734.jpg" 
                alt="Salle de réception du Domaine de la Croix Rochefort"
                className="w-full h-auto object-cover aspect-[3/2]"
              />
            </div>

            {/* Vue extérieure / parc - avec image */}
            <div
              className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-700 ${galleryRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <img 
                src="https://i.postimg.cc/5yVmsTSP/876-domaine-de-lanbspcroixnbsprochefort.jpg" 
                alt="Vue extérieure et parc du Domaine de la Croix Rochefort"
                className="w-full h-auto object-cover aspect-[3/2]"
              />
            </div>

            {/* Détail décoration / ambiance - avec image */}
            <div
              className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-700 ${galleryRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <img 
                src="https://i.postimg.cc/W3MGqSc5/1627386795-60fff3ab3f816.jpg" 
                alt="Détail décoration et ambiance au Domaine de la Croix Rochefort"
                className="w-full h-auto object-cover aspect-[3/2]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Localisation & Accès Section */}
      <section className="py-16 md:py-24 bg-card" ref={locationRef.ref}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Localisation & Accès Facile
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Le Domaine de la Croix Rochefort est idéalement situé, accessible depuis les principales villes de la région.
            </p>
          </div>

          {/* Adresse et Carte */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {/* Adresse */}
            <div className={`transition-all duration-700 ${locationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Adresse du Lieu</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground mb-6">
                    <p className="font-semibold text-foreground">Les Caves de la Croix Rochefort</p>
                    <p>401 rue des dépôts</p>
                    <p>69430 SAINT-DIDIER-SUR-BEAUJEU</p>
                  </div>
                  <a 
                    href="https://www.google.com/maps/dir//Les+Caves+de+la+Croix+Rochefort,+401+Rue+des+D%C3%A9p%C3%B4ts,+69430+Saint-Didier-sur-Beaujeu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full group">
                      <Navigation className="mr-2 h-4 w-4" />
                      Voir l'itinéraire
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Carte Google Maps */}
            <div 
              className={`transition-all duration-700 ${locationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="rounded-xl overflow-hidden shadow-lg h-full min-h-[350px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2767.5!2d4.5833!3d46.2333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4e8e8e8e8e8e8%3A0x0!2s401%20Rue%20des%20D%C3%A9p%C3%B4ts%2C%2069430%20Saint-Didier-sur-Beaujeu%2C%20France!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '350px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation du Domaine de la Croix Rochefort - 401 rue des dépôts, Saint-Didier-sur-Beaujeu"
                />
              </div>
            </div>
          </div>

          {/* Accessibilité & Distances */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
              Facilement Accessible
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {distanceCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Card
                    key={index}
                    className={`border-none shadow-lg hover:shadow-xl transition-all duration-500 ${locationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h4 className="font-bold text-foreground mb-2">{card.title}</h4>
                      <p className="text-primary font-semibold mb-2">{card.time}</p>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Informations Pratiques */}
          <div>
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
              Tout Ce Qu'il Faut Savoir
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {practicalInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className={`bg-background rounded-xl p-6 border border-border transition-all duration-500 ${locationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${(index + 5) * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">{info.title}</h4>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Dates Section */}
      <section className="py-16 md:py-24 bg-card" ref={datesRef.ref}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Dates de la Première Série
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Notre première série se déroulera du lundi 4 au vendredi 8 octobre 2027. Chaque jour, un mariage unique sera célébré dans ce cadre exceptionnel, avec la même équipe de prestataires d'excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {dates.map((date, index) => (
              <div
                key={index}
                className={`bg-background rounded-xl p-6 text-center border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ${datesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-bold text-foreground">{date.day}</p>
                <p className="text-2xl font-bold text-primary">{date.date}</p>
                <p className="text-xs text-muted-foreground mt-2">2027</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status Section - Under Construction */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
                  <Construction className="h-10 w-10 text-amber-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  🔨 Cette série est actuellement en construction
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Nous finalisons les derniers détails pour vous offrir une expérience parfaite. Les places sont limitées et les premières confirmations arrivent bientôt. Si vous êtes intéressé par cette première série, n'hésitez pas à nous contacter pour être parmi les premiers à rejoindre cette aventure.
                </p>
                <Link to="/contact">
                  <Button size="lg" variant="hero" className="font-semibold">
                    <Heart className="mr-2 h-5 w-5" />
                    Exprimer mon Intérêt
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why This Venue Section */}
      <section className="py-16 md:py-24 bg-background" ref={whyRef.ref}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi Nous Avons Choisi le Domaine de la Croix Rochefort
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyReasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Card
                  key={index}
                  className={`border-none shadow-lg hover:shadow-xl transition-all duration-500 ${whyRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
                    <p className="text-muted-foreground">{reason.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 md:py-24 bg-card" ref={stepsRef.ref}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Intéressé ? Voici Comment Procéder
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ${stepsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                {/* Arrow between steps - desktop only */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 -right-4 transform translate-x-1/2">
                    <ArrowRight className="h-6 w-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/configurateur">
              <Button size="xl" variant="hero" className="font-semibold group">
                <Settings className="mr-2 h-5 w-5" />
                Commencer la Configuration
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SerieEte2027;
