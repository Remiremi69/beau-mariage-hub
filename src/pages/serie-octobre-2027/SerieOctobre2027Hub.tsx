import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Train, 
  Plane, 
  Grape, 
  ChevronRight,
  Calendar,
  Utensils,
  Camera,
  Music,
  Sparkles,
  Flower2,
  MicVocal,
  ArrowRight,
  Construction,
  Clock,
  CheckCircle,
  Search,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import jjTraiteurPortrait from "@/assets/jj-traiteur-portrait.png";
import photographeLoic from "@/assets/photographe-loic.avif";
import djAstreviaPortrait from "@/assets/dj-astrevia-portrait.png";
import estherCoutinPortrait from "@/assets/esther-coutin-portrait.png.asset.json";
import SEO from "@/components/SEO";
import { schemaSerie } from '@/lib/schemas';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

const prestataires: Array<{
  category: string;
  title: string;
  description: string;
  href: string;
  lucideIcon: typeof Utensils;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
}> = [
  {
    category: "TRAITEURS GASTRONOMIQUES",
    title: "Jessica & Jérôme — J&J Traiteur",
    description: "Cuisine entièrement maison, produits frais du marché, ancrage beaujolais. Basés à Villefranche-sur-Saône, ils signent chaque repas Limen comme un vrai dîner — pas un service de mariage.",
    href: "/serie-octobre-2027/prestataires/traiteur",
    lucideIcon: Utensils,
    image: jjTraiteurPortrait,
    imageAlt: "Jessica et Jérôme, fondateurs de J&J Traiteur",
  },
  {
    category: "PHOTOGRAPHES & VIDÉASTES",
    title: "Loïc Cancade — Photographe",
    description: "Style naturel et documentaire, noté 5/5 sur Google et Mariages.net. Loïc ne pose jamais ses sujets — il lit votre journée comme un récit, et capte ce qui ne se rejoue pas.",
    href: "/serie-octobre-2027/prestataires/photographe",
    lucideIcon: Camera,
    image: photographeLoic,
    imageAlt: "Loïc Cancade, photographe de mariage",
  },
  {
    category: "VIOLONISTE & PERFORMER",
    title: "Alexandre Medjaher Chomat — Violoniste",
    description: "Violoniste dansant, performer de scène. Plus de 80 mariages en France et à l'international. Une intervention rare, pensée comme un instant scénique au cœur de votre journée.",
    href: "/serie-octobre-2027/prestataires/violoniste",
    lucideIcon: MicVocal,
    image: "/images/alexandre-philosophie-portrait-scene.jpg",
    imageAlt: "Alexandre Medjaher Chomat, violoniste performer",
    imagePosition: "center 20%",
  },
  {
    category: "DJ & ANIMATION",
    title: "Rémy & Jordan — Astrévia Events",
    description: "Plus qu'une prestation, une signature. Rémy et Jordan composent chaque soirée comme un récit vivant — son, lumière et effets pensés en cohérence pour faire de la nuit un instant hors du temps.",
    href: "/serie-octobre-2027/prestataires/dj",
    lucideIcon: Music,
    image: djAstreviaPortrait,
    imageAlt: "Rémy et Jordan, fondateurs d'Astrévia Events",
    imagePosition: "center 25%",
  },
  {
    category: "CÉRÉMONIE LAÏQUE",
    title: "Esther Coutin",
    description: "Speaker professionnelle, maîtresse de cérémonie et officiante laïque. Voix posée, présence rassurante, déroulé entièrement sur-mesure.",
    href: "/prestataires/esther-coutin",
    lucideIcon: MicVocal,
    image: estherCoutinPortrait.url,
    imageAlt: "Esther Coutin, maîtresse de cérémonie laïque, micro en main sur scène",
    imagePosition: "center 20%",
  },
];

const DATE_IDS = ["2027-05-04", "2027-05-05", "2027-05-06", "2027-10-04", "2027-10-05", "2027-10-06", "2027-10-07", "2027-10-08"];

const dates = [
  { day: "Mardi", date: "4", month: "Mai", year: "2027", dateId: "2027-05-04" },
  { day: "Mercredi", date: "5", month: "Mai", year: "2027", dateId: "2027-05-05" },
  { day: "Jeudi", date: "6", month: "Mai", year: "2027", dateId: "2027-05-06" },
  { day: "Lundi", date: "4", month: "Octobre", year: "2027", dateId: "2027-10-04" },
  { day: "Mardi", date: "5", month: "Octobre", year: "2027", dateId: "2027-10-05" },
  { day: "Mercredi", date: "6", month: "Octobre", year: "2027", dateId: "2027-10-06" },
  { day: "Jeudi", date: "7", month: "Octobre", year: "2027", dateId: "2027-10-07" },
  { day: "Vendredi", date: "8", month: "Octobre", year: "2027", dateId: "2027-10-08" },
];


const steps = [
  {
    number: "1",
    title: "Explorez",
    description: "Découvrez le lieu et les prestataires",
    lucideIcon: Search
  },
  {
    number: "2",
    title: "Configurez",
    description: "Choisissez votre ambiance et vos options.",
    lucideIcon: Settings
  },
  {
    number: "3",
    title: "Confirmez",
    description: "Sécurisez votre date et commencez la préparation",
    lucideIcon: CheckCircle
  }
];

const SerieOctobre2027Hub = () => {
  const lieuRef = useInView(0.1);
  const prestatairesRef = useInView(0.1);
  const datesRef = useInView(0.1);
  const statutRef = useInView(0.1);
  const localisationRef = useInView(0.1);
  const stepsRef = useInView(0.1);
  const [reservedDates, setReservedDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchStatuses = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const client = supabase as any;
      const { data } = await client
        .from("configurateur_leads")
        .select("date_mariage, status")
        .in("status", ["signed", "paid"]);
      if (data) {
        setReservedDates(new Set(data.map((r: { date_mariage: string }) => r.date_mariage)));
      }
    };
    fetchStatuses();
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Mariages Beaujolais 2027 — Séries Mai & Octobre au Domaine de la Croix Rochefort"
        description="8 mariages d'exception en 2027 au cœur du Beaujolais : 3 dates en mai (du 4 au 6) et 5 dates en octobre (du 4 au 8). Formule tout compris. À 40 min de Lyon."
        canonical="https://lebeaumariage.fr/series-2027"
        jsonLd={schemaSerie}
      />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Accueil</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Séries 2027</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center text-center py-20"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url(https://i.postimg.cc/5NHccFBF/54-domaine-de-lanbspcroixnbsprochefort.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <p className="mb-6" style={{ fontFamily: "'Jost', sans-serif", textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C9A96E', fontSize: '0.875rem' }}>
            OCTOBRE & MAI 2027 · BEAUJOLAIS
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E8' }}>
            Huit seuils à franchir.
          </h1>
          <p className="text-xl md:text-2xl mb-4 drop-shadow-lg italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}>
            Deux semaines. Un domaine. Huit mariages.
          </p>
          <p className="text-sm mb-10 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
            Domaine de la Croix Rochefort · Saint-Didier-sur-Beaujeu<br />
            Du 4 au 8 octobre 2027 · 5 dates disponibles<br />
            Du 4 au 6 mai 2027 · 3 dates disponibles
          </p>
          <Link to="/configurateur">
            <button
              style={{
                backgroundColor: '#C9A96E',
                color: '#0D0E12',
                borderRadius: 0,
                fontFamily: "'Jost', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '18px 48px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Composer mon mariage →
            </button>
          </Link>
        </div>
      </section>

      {/* Section Le Lieu - Teaser */}
      <section className="py-16 md:py-24 bg-background" ref={lieuRef.ref}>
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${lieuRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1A1814' }}>Domaine de la Croix Rochefort</h2>
          </div>

          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto transition-all duration-1000 delay-200 ${lieuRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="relative overflow-hidden shadow-2xl">
              <img
                src="https://i.postimg.cc/Y05dBj78/Domaine-de-la-Croix-Rochefort-mariage-saint-didier-sur-Beaujeu.jpg"
                alt="Le Domaine de la Croix Rochefort"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">Le Domaine de la Croix Rochefort</h3>
              <p className="text-lg leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
                Une cave voûtée du XIXe siècle au cœur du Beaujolais.<br /><br />
                Cérémonie, réception, hébergement —<br />
                tout se passe dans le même lieu.<br /><br />
                Vous n'avez nulle part où aller.<br />
                Vous êtes déjà là.
              </p>
              <Link to="/serie-octobre-2027/domaine">
                <button
                  style={{
                    backgroundColor: 'transparent',
                    color: '#C9A96E',
                    border: '1px solid #C9A96E',
                    borderRadius: 0,
                    fontFamily: "'Jost', sans-serif",
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '14px 36px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  Découvrir le domaine →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Les Prestataires */}
      <section className="py-16 md:py-24 bg-card" ref={prestatairesRef.ref}>
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${prestatairesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1A1814' }}>Les artisans de votre jour J.</h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
              Chaque prestataire est sélectionné en personne.<br />
              Aucun n'est là par défaut.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto">
            {prestataires.map((prestataire, index) => {
              const Icon = prestataire.lucideIcon;
              return (
                <div
                  key={prestataire.category}
                  className={`group transition-all duration-700 ${prestatairesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link to={prestataire.href} className="block h-full">
                    <div className="relative h-full overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                      <div className="relative h-48 flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: '#1A1814' }}>
                        {prestataire.image ? (
                          <>
                            <img
                              src={prestataire.image}
                              alt={prestataire.imageAlt || prestataire.title}
                              className="absolute inset-0 w-full h-full object-cover"
                              style={{ objectPosition: prestataire.imagePosition || 'center top' }}
                            />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,24,20,0.85) 0%, rgba(26,24,20,0.15) 50%, rgba(26,24,20,0.0) 100%)' }} />
                          </>
                        ) : (
                          <Icon className="h-10 w-10 mb-4" style={{ color: '#C8A96E' }} />
                        )}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-center gap-2" style={{ color: '#C8A96E' }}>
                            <span className="text-xs font-medium uppercase tracking-wider text-center">{prestataire.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-3">{prestataire.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{prestataire.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA intermédiaire */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 flex justify-center">
          <Link to="/configurateur">
            <button
              style={{
                backgroundColor: '#C9A96E',
                color: '#0D0E12',
                borderRadius: 0,
                fontFamily: "'Jost', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '18px 48px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Composer mon mariage →
            </button>
          </Link>
        </div>
      </section>

      {/* Section Les Dates */}
      <section className="py-16 md:py-24 bg-background" ref={datesRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${datesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1A1814' }}>
              Le domaine n'accueille qu'un mariage à la fois.
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
              Les dates restantes sont rares.<br />
              Réservez la vôtre.
            </p>
          </div>

          <div className={`flex flex-wrap justify-center gap-4 max-w-5xl mx-auto transition-all duration-1000 delay-200 ${datesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {dates.map((date, index) => (
              <div
                key={date.date}
                className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto sm:min-w-[160px] text-center"
                style={{ backgroundColor: '#0D0E12', borderRadius: 0, transitionDelay: `${index * 100}ms` }}
              >
                <p className="mb-1" style={{ fontFamily: "'Jost', sans-serif", textTransform: 'uppercase', color: '#A0998A', letterSpacing: '0.15em', fontSize: '0.75rem' }}>{date.day}</p>
                <p className="mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E8', fontSize: '3rem', fontWeight: 700, lineHeight: 1.1 }}>{date.date}</p>
                <p className="mb-3" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A', fontSize: '0.8rem' }}>{date.month} {date.year}</p>
                {reservedDates.has(date.dateId) ? (
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 600,
                    fontFamily: "'Jost', sans-serif",
                    color: 'rgba(200,80,80,0.80)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}>
                    · Réservée ·
                  </span>
                ) : (
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 500,
                    fontFamily: "'Jost', sans-serif",
                    color: '#C9A96E',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}>
                    · Disponible ·
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* Section Localisation */}
      <section className="py-16 md:py-24 bg-background" ref={localisationRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${localisationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1A1814' }}>
              Le domaine
            </h2>
          </div>

          <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-200 ${localisationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Adresse */}
              <div className="bg-card p-8 shadow-md border border-border/50" style={{ borderRadius: 0 }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Domaine de la Croix Rochefort</h3>
                    <p className="text-muted-foreground">
                      401 rue des dépôts<br />
                      69430 SAINT-DIDIER-SUR-BEAUJEU
                    </p>
                  </div>
                </div>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=401+rue+des+dépôts+69430+Saint-Didier-sur-Beaujeu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full">
                    Ouvrir dans Google Maps
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>

              {/* Carte */}
              <div className="overflow-hidden shadow-md h-[300px]" style={{ borderRadius: 0 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2767.5!2d4.5833!3d46.2333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4e8e8e8e8e8e8%3A0x0!2s401%20Rue%20des%20D%C3%A9p%C3%B4ts%2C%2069430%20Saint-Didier-sur-Beaujeu%2C%20France!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation du Domaine de la Croix Rochefort"
                />
              </div>
            </div>

            {/* Distances */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 shadow-md border border-border/50 text-center" style={{ borderRadius: 0 }}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Train className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-1">Gare TGV Mâcon-Loché</h4>
                <p className="text-2xl font-bold text-primary">34 min</p>
              </div>
              <div className="bg-card p-6 shadow-md border border-border/50 text-center" style={{ borderRadius: 0 }}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Plane className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-1">Aéroport & Ville de Lyon</h4>
                <p className="text-2xl font-bold text-primary">55 min</p>
              </div>
              <div className="bg-card p-6 shadow-md border border-border/50 text-center" style={{ borderRadius: 0 }}>
                <div className="flex items-center justify-center mx-auto mb-4" style={{ width: 32, height: 32 }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="6" y1="8" x2="6" y2="28" stroke="#C9A96E" strokeWidth="2" strokeLinecap="square" />
                    <line x1="26" y1="8" x2="26" y2="28" stroke="#C9A96E" strokeWidth="2" strokeLinecap="square" />
                    <line x1="5" y1="8" x2="27" y2="8" stroke="#C9A96E" strokeWidth="2" strokeLinecap="square" />
                  </svg>
                </div>
                <h4 className="font-bold text-foreground mb-1">Au Cœur du Beaujolais</h4>
                <p className="text-lg text-muted-foreground">Une destination en soi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Prochaines Étapes */}
      <section className="py-16 md:py-24 bg-card" ref={stepsRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${stepsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1A1814' }}>
              Une décision. Trois minutes.
            </h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-200 ${stepsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="text-center"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>
                  0{step.number}
                </p>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className={`text-center transition-all duration-1000 delay-500 ${stepsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link to="/configurateur">
              <button
                style={{
                  backgroundColor: '#C9A96E',
                  color: '#0D0E12',
                  borderRadius: 0,
                  fontFamily: "'Jost', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '18px 48px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                Commencer la Configuration →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Link to="/">
              <Button variant="ghost" size="lg">
                ← Retour à l'Accueil
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SerieOctobre2027Hub;
