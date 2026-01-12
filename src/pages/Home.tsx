import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Heart, Calendar, Star, Shield, Tag, Award, Globe, ExternalLink, Sparkles, CheckCircle2, Play, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-wedding.jpg";
import venueImage from "@/assets/venue-exterior.jpg";
import badgeCertifie from "@/assets/badge-certifie.png";

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

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView();

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

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
            Votre Mariage d'Exception. Sans Compromis.
          </h2>
          <p className="text-lg md:text-xl text-card mb-10 max-w-2xl mx-auto drop-shadow-lg">
            Oubliez le stress et les budgets à rallonge. Vivez une journée parfaite, orchestrée par nos soins, dans un cadre exclusif. Configurez le mariage qui vous ressemble.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/serie-ete-2027">
              <Button size="xl" variant="hero" className="font-semibold">
                Découvrir notre série Octobre 2027
              </Button>
            </Link>
            <Link to="/configurateur">
              <Button size="xl" variant="elegant" className="font-semibold">
                Créer votre mariage
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section - Revolution */}
      <PillarsSection />

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-foreground text-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="space-y-1 md:space-y-2">
              <div className="text-3xl md:text-5xl font-bold text-primary">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <p className="text-xs md:text-sm text-card/70">Mariages célébrés</p>
            </div>
            <div className="space-y-1 md:space-y-2">
              <div className="text-3xl md:text-5xl font-bold text-secondary">
                <AnimatedCounter end={98} suffix="%" />
              </div>
              <p className="text-xs md:text-sm text-card/70">Satisfaction client</p>
            </div>
            <div className="space-y-1 md:space-y-2">
              <div className="text-3xl md:text-5xl font-bold text-primary">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <p className="text-xs md:text-sm text-card/70">Prestataires certifiés</p>
            </div>
            <div className="space-y-1 md:space-y-2">
              <div className="text-3xl md:text-5xl font-bold text-secondary">
                <AnimatedCounter end={12990} suffix="€" />
              </div>
              <p className="text-xs md:text-sm text-card/70">À partir de</p>
            </div>
          </div>
        </div>
      </section>

      {/* Garantie Section - Serenity */}
      <SerenitySection />

      {/* Prestataires Certifiés Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              L'Excellence n'est pas une option, c'est notre standard.
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Chacun de nos prestataires est rigoureusement sélectionné, testé et certifié selon notre charte d'excellence. Découvrez comment nous garantissons la perfection pour votre grand jour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Colonne Gauche - Visuel */}
            <div className="flex justify-center">
              <img 
                src={badgeCertifie} 
                alt="Badge Prestataire Certifié Le Beau Mariage 2027" 
                className="w-80 h-80 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Colonne Droite - Texte */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  Notre Label d'Excellence : Votre Garantie Qualité.
                </h3>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Nous avons créé un référentiel unique en France pour garantir le professionnalisme, la fiabilité et la qualité de chaque intervenant. Du traiteur au DJ, en passant par le photographe, tous s'engagent à respecter plus de 50 points de contrôle pour vous offrir une expérience inoubliable.
              </p>
              <Link to="/certification">
                <Button size="lg" variant="hero" className="font-semibold">
                  Découvrir notre processus de certification
                </Button>
              </Link>
            </div>
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

// Pillars Section Component
const PillarsSection = () => {
  const { ref, isInView } = useInView(0.1);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const pillars = [
    {
      icon: MapPin,
      title: "Un Lieu d'Exception",
      description: "Nous sélectionnons pour vous un domaine de charme, privatisé pour votre journée.",
      color: "primary",
      gradient: "from-primary/20 to-primary/5",
      number: "01"
    },
    {
      icon: Heart,
      title: "Un Prix Jamais Vu",
      description: "Votre Mariage d'Exception à partir de 12 990 €. Qualité premium, prix imbattable.",
      color: "secondary",
      gradient: "from-secondary/20 to-secondary/5",
      number: "02"
    },
    {
      icon: Globe,
      title: "Votre Wedding Site",
      description: "Un site web personnalisé pour votre mariage, inclus dans l'offre.",
      color: "primary",
      gradient: "from-primary/20 to-primary/5",
      number: "03",
      link: "https://beau-mariage-template.lovable.app/"
    },
    {
      icon: Sparkles,
      title: "Mariage sur Mesure",
      description: "Personnalisez votre journée avec notre marketplace d'options premium.",
      color: "secondary",
      gradient: "from-secondary/20 to-secondary/5",
      number: "04"
    },
    {
      icon: Leaf,
      title: "Un Mariage Responsable",
      description: "Décoration réutilisable et partenaires locaux : réduisez votre empreinte carbone sans sacrifier l'élégance.",
      color: "primary",
      gradient: "from-primary/20 to-primary/5",
      number: "05",
      badge: "Éco"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header with animated badge */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>La Méthode Le Beau Mariage</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            La Révolution du Mariage
            <span className="block text-primary">en 5 Piliers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une approche unique qui réinvente l'organisation de votre jour J
          </p>
        </div>

        {/* Mobile: Stacked cards with swipe effect */}
        <div className="md:hidden space-y-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className={`relative transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${pillar.gradient} border border-border/50 backdrop-blur-sm`}>
                  {/* Number badge */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-foreground/5">
                    {pillar.number}
                  </div>
                  
                  <div className="p-6 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-${pillar.color}/20 flex items-center justify-center shrink-0 shadow-lg`}>
                        <Icon className={`h-7 w-7 text-${pillar.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-foreground">{pillar.title}</h3>
                          {pillar.badge && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                              🌿 {pillar.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                        {pillar.link && (
                          <a 
                            href={pillar.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-3 hover:gap-3 transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Voir un exemple <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-card/10 to-transparent -translate-x-full ${activeIndex === index ? 'animate-[shimmer_2s_infinite]' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: Interactive grid with hover effects */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className={`relative h-full overflow-hidden rounded-3xl bg-card border border-border/50 p-8 transition-all duration-500 group-hover:shadow-[0_20px_60px_-15px_hsl(14_71%_67%/0.3)] group-hover:-translate-y-2 group-hover:border-primary/30`}>
                  {/* Floating number */}
                  <div className="absolute -top-4 -right-4 text-[120px] font-bold text-foreground/[0.03] group-hover:text-primary/10 transition-colors duration-500 leading-none">
                    {pillar.number}
                  </div>
                  
                  {/* Icon with glow */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className={`h-8 w-8 text-${pillar.color}`} />
                    </div>
                    <div className={`absolute inset-0 rounded-2xl bg-${pillar.color}/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    {pillar.badge && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        🌿 {pillar.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {pillar.description}
                  </p>
                  
                  {pillar.link && (
                    <a 
                      href={pillar.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-medium mt-4 transition-all duration-300 hover:gap-3 hover:text-primary/80"
                    >
                      Voir un exemple <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  
                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${pillar.color} to-${pillar.color}/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Serenity Section Component
const SerenitySection = () => {
  const { ref, isInView } = useInView(0.1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const guarantees = [
    {
      icon: Calendar,
      title: "Garantie Anti-Imprévu",
      description: "Un imprévu vous oblige à annuler ou reporter ? Nous vous remboursons ou reportons sans frais.",
      features: ["Report gratuit", "Remboursement flexible", "Conditions les plus souples"],
      color: "primary"
    },
    {
      icon: Shield,
      title: "Garantie Qualité Certifiée",
      description: "Un prestataire majeur est défaillant ? Nous vous dédommageons à la hauteur du préjudice.",
      features: ["Prestataires audités", "Dédommagement garanti", "Satisfaction obligatoire"],
      color: "secondary"
    },
    {
      icon: Tag,
      title: "Garantie Zéro Coût Caché",
      description: "Le prix que vous signez est le prix que vous payez. Pas de surprise, pas d'astérisque.",
      features: ["Prix tout compris", "Transparence totale", "Engagement écrit"],
      color: "primary"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            <span>Triple Garantie Sérénité</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Se marier n'a jamais été
            <span className="block text-secondary">aussi serein.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Notre engagement unique en France, inclus dans tous nos forfaits
          </p>
        </div>

        {/* Mobile: Expandable cards */}
        <div className="md:hidden space-y-4">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            const isExpanded = hoveredCard === index;
            
            return (
              <div
                key={index}
                className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => setHoveredCard(isExpanded ? null : index)}
              >
                <div className={`relative overflow-hidden rounded-2xl bg-card border transition-all duration-500 ${isExpanded ? `border-${guarantee.color}/50 shadow-lg` : 'border-border/50'}`}>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-${guarantee.color}/10 flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 text-${guarantee.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground flex-1">{guarantee.title}</h3>
                      <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-muted-foreground text-sm mb-4">{guarantee.description}</p>
                      <ul className="space-y-2 mb-4">
                        {guarantee.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className={`h-4 w-4 text-${guarantee.color}`} />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/garantie">
                        <Button variant="outline" size="sm" className="w-full">
                          En savoir plus
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: 3D hover cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            
            return (
              <div
                key={index}
                className={`group perspective-1000 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-full overflow-hidden rounded-3xl bg-card border border-border/50 p-8 transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_hsl(14_71%_67%/0.25)] group-hover:-translate-y-3 group-hover:border-primary/20">
                  {/* Glowing orb background */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-${guarantee.color}/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  {/* Icon */}
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${guarantee.color}/20 to-${guarantee.color}/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110`}>
                      <Icon className={`h-10 w-10 text-${guarantee.color}`} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">{guarantee.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{guarantee.description}</p>
                  
                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {guarantee.features.map((feature, i) => (
                      <li 
                        key={i} 
                        className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        <div className={`w-5 h-5 rounded-full bg-${guarantee.color}/10 flex items-center justify-center`}>
                          <CheckCircle2 className={`h-3 w-3 text-${guarantee.color}`} />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/garantie" className="block">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA */}
        <div className={`text-center mt-12 md:mt-16 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/configurateur">
            <Button size="xl" variant="hero" className="group">
              <span>Commencer votre projet</span>
              <Play className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
