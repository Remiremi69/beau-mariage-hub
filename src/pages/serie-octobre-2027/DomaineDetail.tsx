import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Train, 
  Plane, 
  Grape, 
  ChevronRight,
  ArrowRight,
  Check,
  Car,
  Home,
  Navigation
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

const pointsForts = [
  { icon: Check, text: "Cave voûtée 600m² — cérémonie laïque sous les pierres, bar dans un pressoir de chêne" },
  { icon: Check, text: "Salle de réception 500m² — jusqu'à 300 convives assis, piste de danse, estrade" },
  { icon: Check, text: "Domaine familial depuis 1921 au cœur du Beaujolais Vert, Rhône (69)" },
  { icon: Check, text: "Parking couvert 71 places + parking extérieur — gratuits sur place" },
  { icon: Check, text: "Gîte 20 personnes sur place + gîte 15 personnes en face du domaine" },
  { icon: Check, text: "À 40 min de Lyon (A6), 20 min de Villefranche-sur-Saône, 40 min gare TGV Mâcon-Loché" }
];

const galleryImages = [
  {
    src: "https://i.postimg.cc/x1YWXFrv/9-accueil-le-caveau.jpg",
    alt: "Caveau voûté du Domaine de la Croix Rochefort",
    title: "Le Caveau Voûté"
  },
  {
    src: "https://i.postimg.cc/4xJSf7VZ/420-katleenetcharly-01juin2024-3-127973-172232023480734.jpg",
    alt: "Salle de réception du Domaine de la Croix Rochefort",
    title: "Salle de Réception"
  },
  {
    src: "https://i.postimg.cc/5yVmsTSP/876-domaine-de-lanbspcroixnbsprochefort.jpg",
    alt: "Vue extérieure du Domaine de la Croix Rochefort",
    title: "Vue Extérieure"
  },
  {
    src: "https://i.postimg.cc/W3MGqSc5/1627386795-60fff3ab3f816.jpg",
    alt: "Ambiance & décor au Domaine de la Croix Rochefort",
    title: "Ambiance & Décor"
  }
];

const infoPratiques = [
  { icon: Car, title: "Parking", description: "Parking gratuit sur place" },
  { icon: Home, title: "Hébergement", description: "Gîtes et hôtels à proximité" },
  { icon: Navigation, title: "Accès", description: "Accès en voiture recommandé" }
];

const DomaineDetail = () => {
  const presentationRef = useInView(0.1);
  const pointsRef = useInView(0.1);
  const galleryRef = useInView(0.1);
  const localisationRef = useInView(0.1);

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Le Domaine de la Croix Rochefort - Série Octobre 2027"
        description="Découvrez le Domaine de la Croix Rochefort, votre cadre de rêve pour un mariage authentique en Beaujolais. Caveau voûté historique et salle de caractère."
        canonical="https://lebeaumariage.fr/serie-octobre-2027/domaine"
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
              <BreadcrumbLink asChild>
                <Link to="/serie-octobre-2027">Série Octobre 2027</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Domaine</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center text-center py-20"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url(https://i.postimg.cc/Y05dBj78/Domaine-de-la-Croix-Rochefort-mariage-saint-didier-sur-Beaujeu.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-card mb-4 drop-shadow-lg">
            Le Domaine de la<br />
            <span className="text-primary">Croix Rochefort</span>
          </h1>
          <p className="text-xl md:text-2xl text-card/90 drop-shadow-lg">
            Votre Cadre de Rêve
          </p>
        </div>
      </section>

      {/* Section Présentation */}
      <section className="py-16 md:py-24 bg-background" ref={presentationRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${presentationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Découvrez le Lieu
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                Nous avons cherché longtemps le lieu parfait pour notre première série. 
                Pas un simple bâtiment, mais un partenaire qui partage notre philosophie : 
                l'authenticité, la qualité, et l'humain avant tout.
              </p>
              <p className="text-lg leading-relaxed">
                Le Domaine de la Croix Rochefort, à Saint-Didier-sur-Beaujeu, c'est ce lieu. 
                Avec son caveau voûté chargé d'histoire, sa salle de réception intemporelle 
                et son équipe familiale, il offre le cadre idéal pour que Le Beau Mariage 
                crée votre mariage sur mesure.
              </p>
              <p className="text-lg leading-relaxed">
                Ici, nous ne louons pas juste une salle. Nous nous associons avec une équipe 
                qui comprend notre vision. Ensemble, nous transformons ce domaine en le 
                théâtre de votre histoire d'amour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Points Forts */}
      <section className="py-16 md:py-24 bg-card" ref={pointsRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${pointsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">
              Ce Que Vous Retrouverez
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pointsForts.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-background rounded-xl p-6 shadow-md border border-border/50"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-secondary" />
                    </div>
                    <p className="text-lg text-foreground font-medium">{point.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section Galerie */}
      <section className="py-16 md:py-24 bg-background" ref={galleryRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${galleryRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Galerie
            </h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto transition-all duration-1000 delay-200 ${galleryRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-lg group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-card">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 italic">
            Laissez-vous séduire par l'atmosphère unique du Domaine de la Croix Rochefort
          </p>
        </div>
      </section>

      {/* Section Localisation */}
      <section className="py-16 md:py-24 bg-card" ref={localisationRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${localisationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Localisation & Accès
            </h2>
          </div>

          <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-200 ${localisationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Adresse et Carte */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-background rounded-2xl p-8 shadow-md border border-border/50">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Les Caves de la Croix Rochefort</h3>
                    <p className="text-muted-foreground text-lg">
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
                    Calculer l'itinéraire
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md h-[350px]">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-background rounded-xl p-6 shadow-md border border-border/50 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Train className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-1">Gare TGV Mâcon-Loché</h4>
                <p className="text-2xl font-bold text-primary mb-1">34 min</p>
                <p className="text-sm text-muted-foreground">en voiture</p>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-md border border-border/50 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Plane className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-1">Aéroport & Ville de Lyon</h4>
                <p className="text-2xl font-bold text-primary mb-1">55 min</p>
                <p className="text-sm text-muted-foreground">en voiture</p>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-md border border-border/50 text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Grape className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-bold text-foreground mb-1">Au Cœur du Beaujolais</h4>
                <p className="text-lg text-muted-foreground">Une destination en soi</p>
              </div>
            </div>

            {/* Informations Pratiques */}
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Informations Pratiques
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {infoPratiques.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{info.title}</h4>
                        <p className="text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/configurateur">
              <Button size="xl" variant="elegant" className="font-semibold text-lg px-10">
                Configurer Mon Mariage
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/serie-octobre-2027">
              <Button size="xl" variant="outline" className="font-semibold text-lg px-10">
                Retour à la Série
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DomaineDetail;
