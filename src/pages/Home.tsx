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
      badge: "2 MIN",
      title: "Configurez",
      description: "Choisissez votre ambiance, vos options, votre date. Le domaine est déjà là.",
      isPortique: false,
    },
    {
      badge: "INSTANTANÉ",
      title: "Découvrez",
      description: "Votre prix final, clair et net, s'affiche à l'écran. Maîtrisez votre budget à 100%.",
      isPortique: false,
    },
    {
      badge: "1 MIN",
      title: "Réservez",
      description: "Validez votre configuration en un clic et bloquez votre date en toute sécurité.",
      isPortique: false,
    },
    {
      badge: "LE JOUR J",
      title: "Célébrez",
      description: "Notre équipe s'occupe de tout. Vous traversez.",
      isPortique: true,
    },
  ];

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#0D0E12', paddingTop: 120, paddingBottom: 120 }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <ScrollReveal>
          <h2
            className="text-center mb-8 sm:mb-10 md:mb-14"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              color: '#F5F0E8',
              fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
              lineHeight: 1.2,
            }}
          >
            De la première décision au dernier instant.
          </h2>
        </ScrollReveal>

        {/* Desktop Timeline */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute top-[20px] left-[12.5%] right-[12.5%] h-px" style={{ backgroundColor: '#C9A96E' }} />

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* Marker */}
                    <div className="relative z-10 mb-8 flex items-center justify-center" style={{ height: 40 }}>
                      {step.isPortique ? (
                        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line x1="2" y1="6" x2="2" y2="40" stroke="#C9A96E" strokeWidth="2" strokeLinecap="square" />
                          <line x1="30" y1="6" x2="30" y2="40" stroke="#C9A96E" strokeWidth="2" strokeLinecap="square" />
                          <line x1="2" y1="6" x2="30" y2="6" stroke="#C9A96E" strokeWidth="2" strokeLinecap="square" />
                        </svg>
                      ) : (
                        <div style={{ width: 20, height: 2, backgroundColor: '#C9A96E' }} />
                      )}
                    </div>

                    {/* Content */}
                    <span
                      className="block mb-3"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#C9A96E',
                        fontSize: '0.65rem',
                      }}
                    >
                      {step.badge}
                    </span>
                    <h3
                      className="mb-2"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: '#F5F0E8',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        color: '#A0998A',
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        maxWidth: 220,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-[9px] top-0 bottom-0 w-px" style={{ backgroundColor: '#C9A96E' }} />

          <div className="space-y-10">
            {steps.map((step, index) => (
              <ScrollReveal key={index} direction="left" delay={index * 0.1}>
                <div className="relative">
                  {/* Marker */}
                  <div className="absolute -left-8 top-0 flex items-center justify-center" style={{ width: 20 }}>
                    {step.isPortique ? (
                      <svg width="20" height="28" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="2" y1="6" x2="2" y2="40" stroke="#C9A96E" strokeWidth="2" strokeLinecap="square" />
                        <line x1="30" y1="6" x2="30" y2="40" stroke="#C9A96E" strokeWidth="2" strokeLinecap="square" />
                        <line x1="2" y1="6" x2="30" y2="6" stroke="#C9A96E" strokeWidth="2" strokeLinecap="square" />
                      </svg>
                    ) : (
                      <div style={{ width: 20, height: 2, backgroundColor: '#C9A96E' }} />
                    )}
                  </div>

                  {/* Content */}
                  <span
                    className="block mb-1"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: '#C9A96E',
                      fontSize: '0.6rem',
                    }}
                  >
                    {step.badge}
                  </span>
                  <h3
                    className="mb-1"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: '#F5F0E8',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      color: '#A0998A',
                      fontSize: '0.8rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.5}>
          <div className="text-center mt-16 sm:mt-20">
            <Link to="/configurateur">
              <button
                style={{
                  backgroundColor: '#C9A96E',
                  color: '#0D0E12',
                  borderRadius: 0,
                  fontFamily: "'Jost', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.85rem',
                  padding: '18px 48px',
                  border: 'none',
                  cursor: 'pointer',
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Commencer la configuration →
              </button>
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
      description: "Si l'un de nos partenaires ne peut assurer sa prestation, nous le remplaçons par un talent de niveau égal ou supérieur. Vous ne gérez rien. Nous gérons tout.",
      color: "secondary"
    },
    {
      icon: RefreshCw,
      title: "Garantie Flexibilité Absolue",
      description: "Un imprévu majeur vous oblige à changer vos plans : vous reportez votre mariage sans frais jusqu'à 6 mois avant la date. Le seuil attend.",
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
              Trois engagements.
              <span className="block text-secondary">Aucune réserve.</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-3xl mx-auto px-2">
              Inclus dans chaque mariage. Sans exception.
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
      title: 'Le principe de la série',
      description: 'Cinq mariages consécutifs. Un lieu. Une équipe. Chaque répétition affine l\'exécution — sans jamais répéter votre mariage.'
    },
    {
      icon: Coins,
      title: "Un modèle qui profite au couple",
      description: "Moins de prospection pour nos partenaires, moins de logistique dispersée. Ces économies structurelles se répercutent directement sur votre forfait."
    },
    {
      icon: Handshake,
      title: "Des partenaires choisis, pas référencés",
      description: "Nous ne travaillons pas avec des annuaires. Chaque artisan a été rencontré, testé, choisi. Leur engagement est le nôtre."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-foreground text-card">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Cinq mariages par an. Pas un de plus.
              <span className="block text-primary">Ce n'est pas une contrainte. C'est le modèle.</span>
            </h2>
            <p className="text-card/70 text-sm sm:text-lg max-w-3xl mx-auto px-2">
              La rareté n'est pas un argument marketing. C'est ce qui garantit que chaque mariage reçoit une attention totale — de la première réunion au dernier instant.
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
      title: "Traiteur — Sélection en cours",
      category: "TRAITEURS GASTRONOMIQUES",
      description: "Notre traiteur pour la Série Octobre 2027 sera annoncé prochainement. Sélection en cours sur critères stricts.",
      icon: UtensilsCrossed,
    },
    {
      title: "Photographe — Sélection en cours",
      category: "PHOTOGRAPHES & VIDÉASTES",
      description: "Notre photographe pour la Série Octobre 2027 sera annoncé prochainement. Sélection en cours sur critères stricts.",
      icon: Camera,
    },
    {
      title: "Décorateur & Fleuriste — Sélection en cours",
      category: "DÉCORATEURS & FLEURISTES",
      description: "Notre décorateur et fleuriste pour la Série Octobre 2027 seront annoncés prochainement. Sélection en cours sur critères stricts.",
      icon: Flower2,
    },
    {
      title: "DJ & Musicien — Sélection en cours",
      category: "DJ & MUSICIENS",
      description: "Notre DJ et musicien pour la Série Octobre 2027 seront annoncés prochainement. Sélection en cours sur critères stricts.",
      icon: Music,
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
              Nous ne recrutons pas de prestataires. Nous choisissons des artisans qui partagent une exigence : que le couple soit entièrement présent.
            </p>
            <p className="text-foreground text-sm sm:text-base max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-2">
              Chaque partenaire a été rencontré en personne. Chaque prestation a été évaluée sur le terrain. Aucun n'est là par défaut.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-16" staggerDelay={0.12}>
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div key={index} className="group">
                <div className="relative h-full overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                  <div className="relative h-48 flex flex-col items-center justify-center" style={{ backgroundColor: '#1A1814' }}>
                    <Icon className="h-10 w-10 mb-4" style={{ color: '#C8A96E' }} />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-center gap-2" style={{ color: '#C8A96E' }}>
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
