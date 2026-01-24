import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { MapPin, Users, Heart, Home, Calendar, Star, ArrowRight, Settings, Construction, Image } from "lucide-react";
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
  const datesRef = useInView(0.1);
  const whyRef = useInView(0.1);
  const stepsRef = useInView(0.1);

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
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Niché à Saint-Didier-sur-Beaujeu, le Domaine de la Croix Rochefort est bien plus qu'un simple lieu : c'est une promesse d'authenticité et de caractère. Avec sa salle de réception pouvant accueillir jusqu'à 300 convives et son magnifique caveau voûté, ce domaine familial offre un cadre inoubliable pour célébrer votre union. L'équipe du domaine, passionnée et à votre écoute, saura vous accompagner pour faire de ce jour un moment qui vous ressemble.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5">✓</span>
                  <span className="text-foreground">Cérémonie dans un caveau voûté historique</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5">✓</span>
                  <span className="text-foreground">Une salle de réception de caractère</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5">✓</span>
                  <span className="text-foreground">Un cadre authentique au cœur du Beaujolais</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5">✓</span>
                  <span className="text-foreground">Une équipe familiale dédiée à votre mariage</span>
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
            {[
              { title: "Caveau voûté", desc: "600x400px" },
              { title: "Salle de réception", desc: "600x400px" },
              { title: "Vue extérieure / parc", desc: "600x400px" },
              { title: "Détail décoration / ambiance", desc: "600x400px" }
            ].map((item, index) => (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden bg-muted border-2 border-dashed border-border aspect-[3/2] flex items-center justify-center transition-all duration-700 ${galleryRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-center p-6">
                  <Image className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
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
