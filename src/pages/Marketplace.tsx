import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Marketplace = () => {
  const categories = [
    {
      name: "Image",
      items: [
        {
          title: "Vidéaste",
          description: "Immortalisez votre journée en vidéo avec un film d'exception",
          price: "À partir de 1 200 €",
          image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
        },
        {
          title: "Photobooth",
          description: "Des souvenirs fun et décalés pour vos invités",
          price: "À partir de 400 €",
          image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
        },
        {
          title: "Photographe Supplémentaire",
          description: "Un second photographe pour ne rien manquer",
          price: "À partir de 600 €",
          image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop",
        },
      ],
    },
    {
      name: "Ambiance",
      items: [
        {
          title: "Groupe de Jazz",
          description: "Une touche d'élégance pour votre cocktail",
          price: "À partir de 800 €",
          image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop",
        },
        {
          title: "Magicien",
          description: "Surprenez vos invités avec des tours de magie",
          price: "À partir de 600 €",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        },
        {
          title: "DJ Premium",
          description: "Upgrade vers un DJ expérimenté avec matériel haut de gamme",
          price: "À partir de 500 €",
          image: "https://images.unsplash.com/photo-1571266028243-d220c6ce8353?w=800&h=600&fit=crop",
        },
        {
          title: "Animation Danseurs",
          description: "Des danseurs professionnels pour enflammer la piste",
          price: "À partir de 700 €",
          image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=600&fit=crop",
        },
      ],
    },
    {
      name: "Gourmandise",
      items: [
        {
          title: "Brunch du Lendemain",
          description: "Prolongez la fête avec un brunch gourmand pour 80 personnes",
          price: "À partir de 1 200 €",
          image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&h=600&fit=crop",
        },
        {
          title: "Bar à Cocktails",
          description: "Des créations sur-mesure par un mixologue professionnel",
          price: "À partir de 600 €",
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop",
        },
        {
          title: "Pièce Montée Premium",
          description: "Upgrade vers une création d'exception du meilleur pâtissier",
          price: "À partir de 400 €",
          image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop",
        },
        {
          title: "Bar à Fromages",
          description: "Une sélection de fromages d'exception avec accompagnements",
          price: "À partir de 350 €",
          image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&h=600&fit=crop",
        },
      ],
    },
    {
      name: "Décoration",
      items: [
        {
          title: "Décoration Florale Premium",
          description: "Upgrade vers des compositions florales exceptionnelles",
          price: "À partir de 800 €",
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
        },
        {
          title: "Éclairage d'Ambiance",
          description: "Illuminations et jeux de lumière pour sublimer le lieu",
          price: "À partir de 500 €",
          image: "https://images.unsplash.com/photo-1519167758481-83f29da8c3a0?w=800&h=600&fit=crop",
        },
      ],
    },
    {
      name: "Services",
      items: [
        {
          title: "Voiture de Collection",
          description: "Une voiture vintage pour un arrivée inoubliable",
          price: "À partir de 400 €",
          image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
        },
        {
          title: "Coiffure & Maquillage Invitées",
          description: "Service beauté pour vos témoins et famille proche",
          price: "À partir de 300 €",
          image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&h=600&fit=crop",
        },
        {
          title: "Baby-Sitting",
          description: "Garderie professionnelle pour que vos invités profitent pleinement",
          price: "À partir de 250 €",
          image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              La <span className="text-primary">Marketplace</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Le forfait Essentiel est parfait, mais vous voulez plus ? Piochez dans notre marketplace de prestataires certifiés pour créer le mariage qui vous ressemble.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Sections */}
      {categories.map((category, categoryIndex) => (
        <section
          key={categoryIndex}
          className={`py-16 ${categoryIndex % 2 === 0 ? "bg-background" : "bg-card"}`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 mb-12">
              <Badge className="text-lg px-6 py-2">{category.name}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.items.map((item, itemIndex) => (
                <Card
                  key={itemIndex}
                  className="overflow-hidden border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                        {item.price}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{item.description}</p>
                    <Button variant="outline" className="w-full">
                      Demander un devis
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Besoin d'aide pour personnaliser ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Notre équipe est là pour vous conseiller et créer le mariage parfait selon vos envies et votre budget.
          </p>
          <Button size="xl" variant="hero" className="font-semibold">
            Contactez-nous
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
