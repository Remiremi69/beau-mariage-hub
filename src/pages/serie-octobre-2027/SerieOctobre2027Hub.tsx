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

const prestataires = [
  {
    icon: "🍽️",
    category: "TRAITEUR",
    title: "Gastronomie d'Exception",
    description: "Menu sur mesure avec produits locaux et frais",
    link: "/serie-octobre-2027/prestataires/traiteur",
    lucideIcon: Utensils
  },
  {
    icon: "📸",
    category: "PHOTOGRAPHE & VIDÉASTE",
    title: "Les Chasseurs de Souvenirs",
    description: "Capturer chaque moment, chaque émotion",
    link: "/serie-octobre-2027/prestataires/photographe",
    lucideIcon: Camera
  },
  {
    icon: "🎵",
    category: "DJ",
    title: "Les Maîtres du Rythme",
    description: "Créer l'ambiance parfaite du début à la fin",
    link: "/serie-octobre-2027/prestataires/dj",
    lucideIcon: Music
  },
  {
    icon: "✨",
    category: "DÉCORATEUR",
    title: "Les Architectes de l'Ambiance",
    description: "Transformer le lieu en décor de rêve",
    link: "/serie-octobre-2027/prestataires/decorateur",
    lucideIcon: Sparkles
  },
  {
    icon: "🌸",
    category: "FLEURISTE",
    title: "L'Art de la Fleur",
    description: "Créer des compositions florales uniques",
    link: "/serie-octobre-2027/prestataires/fleuriste",
    lucideIcon: Flower2
  },
  {
    icon: "🎼",
    category: "MUSICIEN",
    title: "La Bande-Sonore de Votre Amour",
    description: "Musique live pour vos moments clés",
    link: "/serie-octobre-2027/prestataires/musicien",
    lucideIcon: MicVocal
  }
];

const DATE_IDS = ["2027-10-04", "2027-10-05", "2027-10-06", "2027-10-07", "2027-10-08"];

const dates = [
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
    description: "Personnalisez votre forfait en 10 minutes",
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
        title="Mariage Beaujolais Octobre 2027 — 5 Dates au Domaine de la Croix Rochefort"
        description="5 mariages d'exception du 4 au 8 octobre 2027 au cœur du Beaujolais. Formule tout compris : lieu, traiteur, photographe, DJ. À 40 min de Lyon. Places limitées."
        canonical="https://lebeaumariage.fr/serie-octobre-2027"
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
              <BreadcrumbPage>Série Octobre 2027</BreadcrumbPage>
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
            OCTOBRE 2027 · BEAUJOLAIS
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E8' }}>
            Cinq seuils à franchir.
          </h1>
          <p className="text-xl md:text-2xl mb-4 drop-shadow-lg italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}>
            Une semaine. Un domaine. Cinq mariages.
          </p>
          <p className="text-sm mb-10 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
            Domaine de la Croix Rochefort · Saint-Didier-sur-Beaujeu<br />
            Du 4 au 8 octobre 2027 · 5 dates disponibles
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
              Configurer mon mariage →
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {prestataires.map((prestataire, index) => {
              const categoryName = prestataire.category.charAt(0) + prestataire.category.slice(1).toLowerCase().replace(/ & .*/, '');
              const categoryLower = prestataire.category.toLowerCase().split(' ')[0];
              return (
                <div
                  key={prestataire.category}
                  className={`transition-all duration-700 ${prestatairesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="h-full bg-white p-6 hover:shadow-lg transition-all duration-300" style={{ borderRadius: '4px' }}>
                    <div className="w-full h-0.5 mb-6" style={{ backgroundColor: '#C9A96E' }} />
                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1A1814' }}>
                      {categoryName} — Sélection en cours
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
                      Notre {categoryLower} pour la Série Octobre 2027 sera annoncé prochainement. Sélection sur critères stricts.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Les Dates */}
      <section className="py-16 md:py-24 bg-background" ref={datesRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${datesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1A1814' }}>
              Cinq dates. Pas une de plus.
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
              Chaque date est un mariage unique.<br />
              Choisissez la vôtre.
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

      {/* Section Statut de la Série */}
      <section className="py-16 md:py-24 bg-background" ref={statutRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto transition-all duration-1000 ${statutRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="p-8 md:p-12 text-center" style={{ backgroundColor: 'transparent', border: '1px solid #C9A96E' }}>
              <p className="text-lg mb-8 leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
                Les prestataires sont en cours de finalisation.<br />
                Les cinq dates sont disponibles.<br /><br />
                Si vous souhaitez être informé en priorité<br />
                à l'ouverture des réservations, laissez-nous<br />
                vos coordonnées.
              </p>
              <Link to="/contact">
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
                  Être informé en priorité →
                </button>
              </Link>
            </div>
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
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Prêt à Commencer ?
            </h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-200 ${stepsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="text-center"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.lucideIcon className="h-7 w-7 text-primary" />
                </div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className={`text-center transition-all duration-1000 delay-500 ${stepsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link to="/configurateur">
              <Button size="xl" variant="elegant" className="font-semibold text-lg px-10">
                Commencer la Configuration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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
