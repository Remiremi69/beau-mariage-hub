import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronRight,
  ArrowRight,
  Quote,
  type LucideIcon
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

export interface PrestataireData {
  icon: LucideIcon;
  category: string;
  title: string;
  tagline: string;
  description: string[];
  services: string[];
  galleryImages?: { src: string; alt: string }[];
  testimonials?: { quote: string; author: string; date: string }[];
  heroImage?: string;
}

interface PrestataireTemplateProps {
  data: PrestataireData;
  slug: string;
}

const PrestataireTemplate = ({ data, slug }: PrestataireTemplateProps) => {
  const presentationRef = useInView(0.1);
  const servicesRef = useInView(0.1);
  const galleryRef = useInView(0.1);
  const testimonialsRef = useInView(0.1);

  const defaultHeroImage = "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=400&fit=crop";

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title={`${data.title} - Série Octobre 2027 | Le Beau Mariage`}
        description={data.description[0]}
        canonical={`https://lebeaumariage.fr/serie-octobre-2027/prestataires/${slug}`}
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
              <BreadcrumbPage>{data.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center text-center py-20"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url(${data.heroImage || defaultHeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-card px-4 py-2 rounded-full mb-6">
            <data.icon className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wider">{data.category}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-card mb-4 drop-shadow-lg">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl text-card/90 drop-shadow-lg">
            {data.tagline}
          </p>
        </div>
      </section>

      {/* Section Présentation */}
      <section className="py-16 md:py-24 bg-background" ref={presentationRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${presentationRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Qui Sommes-Nous ?
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              {data.description.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="py-16 md:py-24 bg-card" ref={servicesRef.ref}>
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${servicesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">
              Nos Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-background rounded-xl p-6 shadow-md border border-border/50"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <p className="text-lg text-foreground">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Galerie (si disponible) */}
      {data.galleryImages && data.galleryImages.length > 0 && (
        <section className="py-16 md:py-24 bg-background" ref={galleryRef.ref}>
          <div className="container mx-auto px-4">
            <div className={`text-center mb-12 transition-all duration-1000 ${galleryRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Nos Réalisations
              </h2>
              <p className="text-muted-foreground">Découvrez nos derniers projets</p>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto transition-all duration-1000 delay-200 ${galleryRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {data.galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden shadow-lg group aspect-[4/3]"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section Témoignages (si disponible) */}
      {data.testimonials && data.testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-primary/5" ref={testimonialsRef.ref}>
          <div className="container mx-auto px-4">
            <div className={`text-center mb-12 transition-all duration-1000 ${testimonialsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Ce Qu'en Disent Nos Clients
              </h2>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto transition-all duration-1000 delay-200 ${testimonialsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {data.testimonials.map((testimonial, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-primary/30 mb-4" />
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-bold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-card">
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

export default PrestataireTemplate;
