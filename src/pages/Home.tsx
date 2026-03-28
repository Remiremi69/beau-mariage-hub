import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock, Diamond, Star, Palette, Coins, CheckCircle, PartyPopper, UtensilsCrossed, Camera, Flower2, Music, RefreshCw, ArrowRight, Users, Handshake, Check, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import LeadCaptureSection from "@/components/LeadCaptureSection";
import CinematicHero from "@/components/CinematicHero";
import venueImage from "@/assets/venue-exterior.jpg";
import chefImage from "@/assets/chef-sebastien.jpg";
import photographeImage from "@/assets/photographe-alexandre.jpg";
import decoImage from "@/assets/deco-boheme.jpg";
import djImage from "@/assets/dj-clara.jpg";

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

const Home = () => {
  const founderQuote = {
    text: "J'ai créé Le Beau Mariage avec une conviction : rendre le mariage de rêve accessible à tous, sans le stress et sans les compromis. C'est cette promesse que nous tenons à chaque cérémonie.",
    author: "Rémi",
    role: "Fondateur"
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Votre Mariage de Rêve en 10 min, Prix Transparent"
        description="Organisez votre mariage d'exception sans stress. Le Beau Mariage vous propose un mariage de rêve en 10 minutes, avec un prix fixe et transparent et des prestataires de qualité."
        canonical="https://lebeaumariage.fr/"
      />
      
      {/* Launch Banner */}
      <div className="bg-primary text-primary-foreground py-3 px-4 text-center text-sm md:text-base">
        <span className="font-medium">🚀 Le Beau Mariage est en phase de lancement !</span>
        <span className="hidden sm:inline"> — Ce site vous permet de découvrir notre concept. La série de mariage présentée est fictive et sert d'exemple.</span>
        <span className="sm:hidden"> La série présentée est un exemple.</span>
      </div>

      {/* Hero Section - ACTION 1 */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center py-20"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-card mb-6 drop-shadow-lg leading-tight">
            Votre Mariage de Rêve.<br />
            <span className="text-primary">Tout est déjà prêt pour vous.</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary mb-4 max-w-3xl mx-auto drop-shadow-lg font-semibold">
            Il ne reste qu'à choisir votre date.
          </p>
          <p className="text-lg md:text-xl text-card/90 mb-10 max-w-3xl mx-auto drop-shadow-lg">
            Domaine sélectionné. Prestataires validés. Prix transparent. C'est ça, Le Beau Mariage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/configurateur">
              <Button size="xl" variant="hero" className="font-semibold text-lg px-8">
                Voir les dates disponibles
              </Button>
            </Link>
            <Link to="/serie-octobre-2027">
              <Button size="xl" variant="elegant" className="font-semibold text-lg px-8">
                Voir la Série Actuelle
              </Button>
            </Link>
          </div>

          {/* 3 Promises - Sub-section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-card/20">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold text-card mb-2">Tout est déjà sélectionné</h3>
              <p className="text-card/80 text-sm">Domaine, traiteur, photographe, DJ — nous avons fait le travail à votre place. Vous choisissez, on orchestre.</p>
            </div>
            <div className="bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-card/20">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-card mb-2">Prix connu immédiatement</h3>
              <p className="text-card/80 text-sm">Le prix s'affiche en temps réel. Pas de devis à attendre, pas de frais cachés.</p>
            </div>
            <div className="bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-card/20">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-card mb-2">Prestataires d'exception</h3>
              <p className="text-card/80 text-sm">Nous avons déjà sélectionné et validé les meilleurs talents pour votre grand jour.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - ACTION 2 */}
      <TimelineSection />

      {/* Garantie Section - ACTION 4 */}
      <SerenitySection />

      {/* Personalized Wedding Website Section */}
      <WeddingSiteSection />

      {/* Business Model Section - ACTION 5 */}
      <BusinessModelSection />

      {/* Prestataires d'Exception Section - ACTION 3 */}
      <PartnersSection />


      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Le Mot du Fondateur
          </h2>

          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] bg-gradient-to-br from-card to-primary/5">
              <CardContent className="p-8 md:p-12">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <blockquote className="text-xl md:text-2xl text-center mb-8 italic text-foreground leading-relaxed">
                  "{founderQuote.text}"
                </blockquote>
                <div className="text-center">
                  <p className="font-bold text-lg text-primary">{founderQuote.author}</p>
                  <p className="text-muted-foreground">{founderQuote.role}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button variant="elegant" size="lg">
                Échanger avec notre équipe
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <LeadCaptureSection />
    </div>
  );
};

// Timeline Section Component - ACTION 2
const TimelineSection = () => {
  const { ref, isInView } = useInView(0.1);

  const steps = [
    {
      icon: Palette,
      title: "1. Configurez",
      time: "2 min",
      description: "Personnalisez votre journée en choisissant votre ambiance, votre lieu et vos options.",
    },
    {
      icon: Coins,
      title: "2. Découvrez",
      time: "Instantané",
      description: "Votre prix final, clair et net, s'affiche à l'écran. Maîtrisez votre budget à 100%.",
    },
    {
      icon: CheckCircle,
      title: "3. Réservez",
      time: "1 min",
      description: "Validez votre configuration en un clic et bloquez votre date en toute sécurité.",
    },
    {
      icon: PartyPopper,
      title: "4. Célébrez",
      time: "Le Jour J",
      description: "Profitez de chaque instant. Notre équipe s'occupe de tout orchestrer pour vous.",
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Enfin, un mariage sans l'organisation.
            <span className="block text-primary">Révolutionnairement simple.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Oubliez les tableurs et les centaines d'e-mails. Voici comment votre mariage prend forme en 4 étapes.
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          {/* Progress line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-muted">
            <div 
              className={`h-full bg-gradient-to-r from-primary to-secondary transition-all duration-2000 ease-out ${isInView ? 'w-full' : 'w-0'}`}
            />
          </div>

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`relative text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Circle with icon */}
                  <div className="relative z-10 mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-card border-4 border-primary shadow-lg flex items-center justify-center">
                      <Icon className="h-9 w-9 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-card rounded-2xl p-6 shadow-md border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                      {step.time}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`relative flex gap-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-card border-4 border-primary shadow-lg flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-1 flex-1 bg-gradient-to-b from-primary to-secondary my-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="bg-card rounded-xl p-4 shadow-md border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {step.time}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 md:mt-16 transition-all duration-1000 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/configurateur">
            <Button size="xl" variant="hero" className="group">
              <span>Commencer la configuration</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Serenity Section Component - ACTION 4
const SerenitySection = () => {
  const { ref, isInView } = useInView(0.1);

  const guarantees = [
    {
      icon: Diamond,
      title: "Garantie Zéro Coût Caché",
      description: "Le prix affiché est le prix payé. Point final. Fini les mauvaises surprises et les lignes en petits caractères. Votre devis est 100% transparent et tout est inclus.",
      color: "primary"
    },
    {
      icon: Star,
      title: "Garantie Qualité Inébranlable",
      description: "La perfection, ou rien. Si un de nos partenaires ne pouvait assurer sa prestation, nous le remplaçons par un talent de qualité égale ou supérieure, sans aucun impact pour vous.",
      color: "secondary"
    },
    {
      icon: RefreshCw,
      title: "Garantie Flexibilité Absolue",
      description: "La vie est pleine d'imprévus. Si un événement majeur vous oblige à changer vos plans, vous pouvez reporter votre mariage sans frais jusqu'à 6 mois avant la date.",
      color: "primary"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Se marier sans stress,
            <span className="block text-secondary">c'est maintenant possible.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Nous avons créé trois garanties uniques, incluses dans chaque forfait, pour que vous puissiez vous concentrer sur l'essentiel : votre bonheur.
          </p>
        </div>

        {/* Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            
            return (
              <div
                key={index}
                className={`group transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-full overflow-hidden rounded-3xl bg-card border border-border/50 p-8 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_hsl(14_71%_67%/0.25)] hover:-translate-y-3 hover:border-primary/20">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className={`h-7 w-7 ${guarantee.color === 'secondary' ? 'text-secondary' : 'text-primary'}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">{guarantee.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{guarantee.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Wedding Site Section - Personalized Wedding Website
const WeddingSiteSection = () => {
  const { ref, isInView } = useInView(0.1);

  const benefits = [
    {
      title: "Partagez votre histoire",
      description: "Racontez votre rencontre, vos moments forts, et présentez vos témoins."
    },
    {
      title: "Toutes les infos au même endroit",
      description: "Horaires, adresses, plans d'accès, suggestions d'hôtels... Simplifiez la vie de vos invités."
    },
    {
      title: "Gérez les confirmations de présence (RSVP)",
      description: "Vos invités confirment leur venue en un clic, directement sur le site."
    },
    {
      title: "Votre liste de mariage intégrée",
      description: "Connectez facilement votre liste de mariage pour un accès simplifié."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Image */}
          <div 
            className={`relative transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            <a 
              href="https://beau-mariage-template.lovable.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_hsl(14_71%_67%/0.3)] transition-all duration-500 hover:shadow-[0_30px_80px_-15px_hsl(14_71%_67%/0.4)] hover:-translate-y-2"
            >
              <img
                src="https://i.postimg.cc/Bn6MwGJf/exemple-site-mariage-capture.webp"
                alt="Exemple de site de mariage personnalisé - Le Beau Mariage"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay with CTA */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                <span className="inline-flex items-center gap-2 bg-card text-foreground px-6 py-3 rounded-full font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <ExternalLink className="h-4 w-4" />
                  Voir un exemple
                </span>
              </div>
              {/* Always visible badge */}
              <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-300">
                <ExternalLink className="h-4 w-4" />
                Voir un exemple
              </div>
            </a>
          </div>

          {/* Right Column - Text */}
          <div 
            className={`transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Inclus : Votre Site de Mariage
              <span className="block text-primary">Personnalisé</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Parce que votre histoire est unique, nous vous offrons un site web élégant et personnalisé pour partager tous les détails de votre grand jour avec vos invités. C'est votre espace, inclus dans votre forfait.
            </p>

            {/* Benefits List */}
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li 
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{benefit.title} :</span>
                    <span className="text-muted-foreground"> {benefit.description}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Conclusion */}
            <p className="text-lg font-semibold text-primary border-l-4 border-primary pl-4 bg-primary/5 py-3 pr-4 rounded-r-lg">
              Le petit plus qui fait toute la différence, offert par Le Beau Mariage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Business Model Section - ACTION 5
const BusinessModelSection = () => {
  const { ref, isInView } = useInView(0.1);

  const points = [
    {
      icon: Users,
      title: 'Le Principe des "Séries"',
      description: 'Nous n\'organisons pas des mariages à l\'unité, mais des "séries" de mariages consécutifs dans un même lieu, avec la même équipe de partenaires. Cette optimisation profite à tout le monde.'
    },
    {
      icon: Coins,
      title: "Des Coûts Optimisés pour Tous",
      description: "Pour nos prestataires, cela signifie moins de frais de prospection et de logistique. Ces économies, nous vous les répercutons directement sur le prix final."
    },
    {
      icon: Handshake,
      title: "Un Partenariat Gagnant-Gagnant",
      description: "En garantissant un volume d'affaires important à nos partenaires, nous négocions des tarifs préférentiels sans jamais sacrifier la qualité. C'est ainsi que nous rendons le mariage de luxe enfin accessible."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-foreground text-card" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            La qualité d'un grand mariage. Le prix de la raison.
            <span className="block text-primary">Voici notre secret.</span>
          </h2>
          <p className="text-card/70 text-lg max-w-3xl mx-auto">
            Notre innovation ne réside pas seulement dans la technologie, mais dans notre modèle économique unique en France.
          </p>
        </div>

        {/* Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {points.map((point, index) => {
            const Icon = point.icon;
            
            return (
              <div
                key={index}
                className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-full bg-card/5 backdrop-blur-sm rounded-2xl p-8 border border-card/10 hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card mb-4">{point.title}</h3>
                  <p className="text-card/70 leading-relaxed">{point.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Partners Section - ACTION 3
const PartnersSection = () => {
  const { ref, isInView } = useInView(0.1);

  const categories = [
    {
      image: chefImage,
      title: "L'Émotion dans l'Assiette",
      category: "Traiteurs Gastronomiques",
      description: "Nos chefs racontent une histoire avec des produits frais et locaux. Une expérience culinaire qui marque les esprits.",
      icon: UtensilsCrossed,
      alt: "Chef traiteur partenaire Le Beau Mariage préparant un plat gastronomique"
    },
    {
      image: photographeImage,
      title: "Les Chasseurs de Souvenirs",
      category: "Photographes & Vidéastes",
      description: "Plus que des techniciens, ce sont des artistes qui savent capturer l'étincelle, le rire volé et la larme de joie.",
      icon: Camera,
      alt: "Photographe professionnel capturant les moments précieux d'un mariage"
    },
    {
      image: decoImage,
      title: "Les Architectes de l'Ambiance",
      category: "Décorateurs & Fleuristes",
      description: "Ils ont le talent de transformer un lieu en un décor de rêve, créant une atmosphère unique qui vous ressemble.",
      icon: Flower2,
      alt: "Décoration florale bohème pour mariage par nos fleuristes partenaires"
    },
    {
      image: djImage,
      title: "Les Maîtres du Rythme",
      category: "DJ & Musiciens",
      description: "Du vin d'honneur à la piste de danse, nos artistes créent la bande-son parfaite pour une ambiance inoubliable.",
      icon: Music,
      alt: "DJ professionnelle animant la soirée de mariage"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-6 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            La Qualité n'est pas un Label,
            <span className="block text-primary">c'est un Partenariat.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            Nous ne recrutons pas de simples fournisseurs. Nous nous associons avec des artisans passionnés qui partagent notre obsession pour l'excellence.
          </p>
          <p className="text-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            Oubliez les processus de certification froids. Chez Le Beau Mariage, la confiance se bâtit sur le terrain. Chaque traiteur, photographe ou décorateur est un partenaire que nous avons personnellement rencontré, dont nous avons testé le travail et avec qui nous avons tissé une relation durable. Ils sont le cœur de notre promesse : un mariage parfait, sans compromis.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            
            return (
              <div
                key={index}
                className={`group transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={cat.image} 
                      alt={cat.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-card">
                        <Icon className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">{cat.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{cat.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{cat.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8 md:p-10">
              <blockquote className="text-lg md:text-xl text-center italic text-foreground leading-relaxed mb-6">
                "Collaborer avec Le Beau Mariage, c'est plus qu'un contrat. C'est la garantie de pouvoir se concentrer sur notre art pour des couples qui nous font confiance."
              </blockquote>
              <div className="text-center">
                <p className="font-bold text-primary">Alexandre</p>
                <p className="text-muted-foreground text-sm">Chef Traiteur Partenaire</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Home;
