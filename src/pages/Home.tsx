import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock, Diamond, Star, Palette, Coins, CheckCircle, PartyPopper, UtensilsCrossed, Camera, Flower2, Music, RefreshCw, ArrowRight, Users, Handshake, Check, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "@/components/SEO";
import { schemaHome } from '@/lib/schemas';
import LeadCaptureSection from "@/components/LeadCaptureSection";
import CinematicHero from "@/components/CinematicHero";
import { ScrollReveal, StaggerContainer, ImageReveal } from "@/components/ScrollReveal";
import venueImage from "@/assets/venue-exterior.jpg";
import chefImage from "@/assets/chef-sebastien.jpg";
import photographeImage from "@/assets/photographe-alexandre.jpg";
import decoImage from "@/assets/deco-boheme.jpg";
import djImage from "@/assets/dj-clara.jpg";


const Home = () => {
  const founderQuote = {
    text: "Le Beau Mariage repose sur une idée simple : un rite de passage ne se gère pas. Il se traverse. Tout est déjà prêt.",
    author: "Rémi",
    role: "Fondateur"
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Mariage Clé en Main Beaujolais — Prix Fixe Tout Compris"
        description="Votre mariage de rêve au cœur du Beaujolais à 40 min de Lyon. Lieu privatisé, traiteur, photographe, DJ — tout inclus. Devis en 10 min."
        canonical="https://lebeaumariage.fr/"
        jsonLd={schemaHome}
      />
      
      {/* Launch Banner */}
      <div className="bg-primary text-primary-foreground py-2.5 sm:py-3 px-3 sm:px-4 text-center text-xs sm:text-sm md:text-base">
        <span className="font-medium">🚀 Le Beau Mariage est en phase de lancement !</span>
        <span className="hidden sm:inline"> — Ce site vous permet de découvrir notre concept. La série de mariage présentée est fictive et sert d'exemple.</span>
        <span className="sm:hidden"> La série présentée est un exemple.</span>
      </div>

      {/* Hero Section - Cinematic */}
      <CinematicHero />

      {/* How It Works Section - ACTION 2 */}
      <TimelineSection />

      {/* Garantie Section - ACTION 4 */}
      <SerenitySection />

      {/* Business Model Section - ACTION 5 */}
      <BusinessModelSection />

      {/* Prestataires d'Exception Section - ACTION 3 */}
      <PartnersSection />

      {/* Personalized Wedding Website Section */}
      <WeddingSiteSection />


      {/* Testimonials Section */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-16">
              Le Mot du Fondateur
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2} scale>
            <div className="max-w-3xl mx-auto">
              <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] bg-gradient-to-br from-card to-primary/5">
                <CardContent className="p-5 sm:p-8 md:p-12">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        viewBox="0 0 40 64"
                        fill="none"
                        className="h-8 w-5 sm:h-10 sm:w-[25px]"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line x1="4" y1="64" x2="4" y2="8" stroke="#C9A96E" strokeWidth="3" strokeLinecap="square" />
                        <line x1="36" y1="64" x2="36" y2="8" stroke="#C9A96E" strokeWidth="3" strokeLinecap="square" />
                        <line x1="4" y1="8" x2="36" y2="8" stroke="#C9A96E" strokeWidth="3" strokeLinecap="square" />
                      </svg>
                    </div>
                  </div>
                  <blockquote className="text-base sm:text-xl md:text-2xl text-center mb-6 sm:mb-8 italic text-foreground leading-relaxed">
                    "{founderQuote.text}"
                  </blockquote>
                  <div className="text-center">
                    <p className="font-bold text-lg text-primary">{founderQuote.author}</p>
                    <p className="text-muted-foreground">{founderQuote.role}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <Link to="/contact">
                <Button variant="elegant" size="lg">
                  Échanger avec notre équipe
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lead Capture Section */}
      <LeadCaptureSection />
    </div>
  );
};

// Timeline Section Component - ACTION 2
const TimelineSection = () => {
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
    <section className="py-12 sm:py-20 md:py-32 bg-background overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(14_71%_67%/0.08)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-16 md:mb-24">

            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-2 tracking-tight leading-[1.1]">
              Un rite de passage
              <br className="hidden md:block" />
              <span className="relative inline-block">
                ne se gère pas.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    d="M2 8C50 2 100 2 150 6C200 10 250 4 298 7"
                    stroke="hsl(14 71% 67%)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </svg>
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary via-[hsl(30_80%_65%)] to-secondary bg-clip-text text-transparent mt-2 mb-6 sm:mb-8 tracking-tight"
            >
              Il se traverse.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2"
            >
              Tout est déjà prêt avant que vous arriviez.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Timeline - Desktop */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          <StaggerContainer className="grid grid-cols-4 gap-8" staggerDelay={0.15}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center">
                  <div className="relative z-10 mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-card border-4 border-primary shadow-lg flex items-center justify-center">
                      <Icon className="h-9 w-9 text-primary" />
                    </div>
                  </div>
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
          </StaggerContainer>
        </div>

        {/* Timeline - Mobile */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={index} direction="left" delay={index * 0.1}>
                <div className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-card border-4 border-primary shadow-lg flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-1 flex-1 bg-gradient-to-b from-primary to-secondary my-2" />
                    )}
                  </div>
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
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.5}>
          <div className="text-center mt-8 sm:mt-12 md:mt-16 px-4 sm:px-0">
            <Link to="/configurateur" className="block sm:inline-block">
              <Button size="xl" variant="hero" className="group w-full sm:w-auto">
                <span>Commencer la configuration</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// Serenity Section Component - ACTION 4
const SerenitySection = () => {
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
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Se marier sans stress,
              <span className="block text-secondary">c'est maintenant possible.</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-3xl mx-auto px-2">
              Nous avons créé trois garanties uniques, incluses dans chaque forfait, pour que vous puissiez vous concentrer sur l'essentiel : votre bonheur.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto" staggerDelay={0.15}>
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <div key={index} className="group">
                <div className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl bg-card border border-border/50 p-5 sm:p-8 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_hsl(14_71%_67%/0.25)] hover:-translate-y-3 hover:border-primary/20">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                    <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${guarantee.color === 'secondary' ? 'text-secondary' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-4">{guarantee.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{guarantee.description}</p>
                </div>
              </div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

// Wedding Site Section
const WeddingSiteSection = () => {
  const benefits = [
    { title: "Partagez votre histoire", description: "Racontez votre rencontre, vos moments forts, et présentez vos témoins." },
    { title: "Toutes les infos au même endroit", description: "Horaires, adresses, plans d'accès, suggestions d'hôtels... Simplifiez la vie de vos invités." },
    { title: "Gérez les confirmations de présence (RSVP)", description: "Vos invités confirment leur venue en un clic, directement sur le site." },
    { title: "Votre liste de mariage intégrée", description: "Connectez facilement votre liste de mariage pour un accès simplifié." }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Image with reveal */}
          <ScrollReveal direction="left">
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
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                <span className="inline-flex items-center gap-2 bg-card text-foreground px-6 py-3 rounded-full font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <ExternalLink className="h-4 w-4" />
                  Voir un exemple
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-300">
                <ExternalLink className="h-4 w-4" />
                Voir un exemple
              </div>
            </a>
          </ScrollReveal>

          {/* Right Column - Text */}
          <ScrollReveal direction="right" delay={0.2}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Inclus : Votre Site de Mariage
              <span className="block text-primary">Personnalisé</span>
            </h2>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Parce que votre histoire est unique, nous vous offrons un site web élégant et personnalisé pour partager tous les détails de votre grand jour avec vos invités. C'est votre espace, inclus dans votre forfait.
            </p>

            <StaggerContainer className="space-y-4 mb-8" staggerDelay={0.1} direction="right">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 list-none">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{benefit.title} :</span>
                    <span className="text-muted-foreground"> {benefit.description}</span>
                  </div>
                </li>
              ))}
            </StaggerContainer>

            <p className="text-lg font-semibold text-primary border-l-4 border-primary pl-4 bg-primary/5 py-3 pr-4 rounded-r-lg">
              Compris dans votre forfait. Sans démarche supplémentaire.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

// Business Model Section - ACTION 5
const BusinessModelSection = () => {
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
    <section className="py-12 sm:py-16 md:py-24 bg-foreground text-card">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              La qualité d'un grand mariage. Le prix de la raison.
              <span className="block text-primary">Voici notre secret.</span>
            </h2>
            <p className="text-card/70 text-sm sm:text-lg max-w-3xl mx-auto px-2">
              Notre innovation ne réside pas seulement dans la technologie, mais dans notre modèle économique unique en France.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto" staggerDelay={0.15}>
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index}>
                <div className="relative h-full bg-card/5 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-card/10 hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 sm:mb-6">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-card mb-2 sm:mb-4">{point.title}</h3>
                  <p className="text-card/70 text-sm sm:text-base leading-relaxed">{point.description}</p>
                </div>
              </div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

// Partners Section - ACTION 3
const PartnersSection = () => {
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
    <section className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              La Qualité n'est pas un Label,
              <span className="block text-primary">c'est un Partenariat.</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
              Nous ne recrutons pas de simples fournisseurs. Nous nous associons avec des artisans passionnés qui partagent notre obsession pour l'excellence.
            </p>
            <p className="text-foreground text-sm sm:text-base max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-2">
              Oubliez les processus de certification froids. Chez Le Beau Mariage, la confiance se bâtit sur le terrain. Chaque traiteur, photographe ou décorateur est un partenaire que nous avons personnellement rencontré, dont nous avons testé le travail et avec qui nous avons tissé une relation durable. Ils sont le cœur de notre promesse : un mariage parfait, sans compromis.
            </p>
          </div>
        </ScrollReveal>

        {/* Categories Grid with image reveal */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-16" staggerDelay={0.12}>
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div key={index} className="group">
                <div className="relative h-full overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
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
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{cat.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{cat.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};

export default Home;
