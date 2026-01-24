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
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
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

const dates = [
  { day: "Lundi", date: "4", month: "Octobre", year: "2027", status: "Places disponibles" },
  { day: "Mardi", date: "5", month: "Octobre", year: "2027", status: "Places disponibles" },
  { day: "Mercredi", date: "6", month: "Octobre", year: "2027", status: "Places disponibles" },
  { day: "Jeudi", date: "7", month: "Octobre", year: "2027", status: "Places disponibles" },
  { day: "Vendredi", date: "8", month: "Octobre", year: "2027", status: "Places disponibles" }
];

const steps = [
  {
    number: "1",
    title: "Explorez",
    description: "Découvrez le lieu et les prestataires",
    icon: "🔍"
  },
  {
    number: "2",
    title: "Configurez",
    description: "Personnalisez votre forfait en 10 minutes",
    icon: "⚙️"
  },
  {
    number: "3",
    title: "Confirmez",
    description: "Sécurisez votre date et commencez la préparation",
    icon: "✅"
  }
];

const SerieOctobre2027Hub = () => {
  const lieuRef = useInView(0.1);
  const prestatairesRef = useInView(0.1);
  const datesRef = useInView(0.1);
  const statutRef = useInView(0.1);
  const localisationRef = useInView(0.1);
  const stepsRef = useInView(0.1);

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Série Octobre 2027 - Mariage d'Exception en Beaujolais"
        description="Découvrez notre première série de mariages au Domaine de la Croix Rochefort. 5 dates exceptionnelles du 4 au 8 octobre 2027 en Beaujolais."
        canonical="https://lebeaumariage.fr/serie-octobre-2027"
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
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-card px-4 py-2 rounded-full mb-6">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Lundi 4 au Vendredi 8 Octobre 2027</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-card mb-4 drop-shadow-lg">
            Notre Première Série :<br />
            <span className="text-primary">Octobre 2027</span>
          </h1>
          <p className="text-xl md:text-2xl text-card/90 mb-4 drop-shadow-lg">
            Élégance & Caractère en Beaujolais
          </p>
          <p className="text-lg text-card/80 mb-10 max-w-2xl mx-auto">
            Découvrez le lieu et les prestataires d'exception qui rendront votre mariage inoubliable.
          </p>
          <Link to="/configurateur">
            <Button size="xl" variant="hero" className="font-semibold text-lg px-8">
              Commencer la Configuration
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Section Le Lieu - Teaser */}
      <section className="py-16 md:py-24 bg-background" ref={lieuRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${lieuRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Votre Cadre
            </h2>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto transition-all duration-1000 delay-200 ${lieuRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://i.postimg.cc/Y05dBj78/Domaine-de-la-Croix-Rochefort-mariage-saint-didier-sur-Beaujeu.jpg"
                alt="Le Domaine de la Croix Rochefort"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Le Domaine de la Croix Rochefort
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Un caveau voûté pour votre cérémonie. Une salle de caractère pour votre fête. L'atmosphère du Beaujolais pour votre histoire.
              </p>
              <Link to="/serie-octobre-2027/domaine">
                <Button variant="elegant" size="lg" className="group">
                  Découvrir le Domaine
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Les Prestataires */}
      <section className="py-16 md:py-24 bg-card" ref={prestatairesRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${prestatairesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Vos Partenaires d'Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chaque détail de votre mariage est confié à des artisans passionnés, sélectionnés avec soin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {prestataires.map((prestataire, index) => (
              <div
                key={prestataire.category}
                className={`transition-all duration-700 ${prestatairesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-border/50">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{prestataire.icon}</div>
                    <p className="text-xs font-semibold text-primary tracking-wider mb-2">
                      {prestataire.category}
                    </p>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {prestataire.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {prestataire.description}
                    </p>
                    <Link to={prestataire.link}>
                      <Button variant="outline" size="sm" className="w-full group">
                        En savoir plus
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Les Dates */}
      <section className="py-16 md:py-24 bg-background" ref={datesRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${datesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Quand Se Marier ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chaque jour, un mariage unique. Chaque couple choisit sa date et personnalise son forfait.
            </p>
          </div>

          <div className={`flex flex-wrap justify-center gap-4 max-w-5xl mx-auto transition-all duration-1000 delay-200 ${datesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {dates.map((date, index) => (
              <div
                key={date.date}
                className="bg-card rounded-xl p-6 shadow-md border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto sm:min-w-[160px] text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <p className="text-sm text-muted-foreground mb-1">{date.day}</p>
                <p className="text-4xl font-bold text-primary mb-1">{date.date}</p>
                <p className="text-sm text-foreground mb-3">{date.month} {date.year}</p>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                  <Clock className="h-3 w-3" />
                  {date.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Statut de la Série */}
      <section className="py-16 md:py-24 bg-primary/5" ref={statutRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto transition-all duration-1000 ${statutRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="border-2 border-primary/20 bg-card">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                  <Construction className="h-5 w-5" />
                  <span className="font-semibold">Cette Série est en Construction</span>
                </div>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Nous finalisons les derniers détails pour vous offrir une expérience parfaite. 
                  Les places sont limitées et les premières confirmations arrivent bientôt. 
                  Si vous êtes intéressé par cette première série, n'hésitez pas à nous contacter 
                  pour être parmi les premiers à rejoindre cette aventure.
                </p>
                <Link to="/contact">
                  <Button variant="elegant" size="lg">
                    Exprimer mon Intérêt
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Localisation */}
      <section className="py-16 md:py-24 bg-background" ref={localisationRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${localisationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Où Nous Trouver ?
            </h2>
          </div>

          <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-200 ${localisationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Adresse */}
              <div className="bg-card rounded-2xl p-8 shadow-md border border-border/50">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Les Caves de la Croix Rochefort</h3>
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
              <div className="rounded-2xl overflow-hidden shadow-md h-[300px]">
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
              <div className="bg-card rounded-xl p-6 shadow-md border border-border/50 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Train className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-1">Gare TGV Mâcon-Loché</h4>
                <p className="text-2xl font-bold text-primary">34 min</p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-md border border-border/50 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Plane className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-1">Aéroport & Ville de Lyon</h4>
                <p className="text-2xl font-bold text-primary">55 min</p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-md border border-border/50 text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Grape className="h-6 w-6 text-secondary" />
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
                <div className="text-5xl mb-4">{step.icon}</div>
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
