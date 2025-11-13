import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Collection = () => {
  const robes = [
    { name: "Modèle Adèle", price: "1 500 €", style: "Bohème", image: "https://images.unsplash.com/photo-1594552072238-6d5c2d7e1b1e?w=800&h=1200&fit=crop" },
    { name: "Modèle Camille", price: "1 800 €", style: "Princesse", image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=1200&fit=crop" },
    { name: "Modèle Léonie", price: "1 650 €", style: "Sirène", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=1200&fit=crop" },
    { name: "Modèle Juliette", price: "1 900 €", style: "Romantique", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=1200&fit=crop" },
    { name: "Modèle Victoire", price: "2 100 €", style: "Moderne", image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&h=1200&fit=crop" },
    { name: "Modèle Margot", price: "1 750 €", style: "Vintage", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1200&fit=crop" },
  ];

  const costumes = [
    { name: "Costume Élégance", price: "800 €", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=1200&fit=crop" },
    { name: "Costume Prestige", price: "950 €", image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=800&h=1200&fit=crop" },
    { name: "Costume Tradition", price: "850 €", image: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=800&h=1200&fit=crop" },
    { name: "Costume Excellence", price: "1 100 €", image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&h=1200&fit=crop" },
  ];

  const alliances = [
    { name: "Alliance Éternité", price: "600 €", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop" },
    { name: "Alliance Raffinée", price: "750 €", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop" },
    { name: "Alliance Classique", price: "550 €", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop" },
    { name: "Alliance Romantique", price: "850 €", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop" },
    { name: "Alliance Moderne", price: "900 €", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=800&fit=crop" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              La Collection <span className="text-primary">Le Beau Mariage</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              En partenariat avec les meilleurs créateurs et fabricants, nous avons sélectionné pour vous une collection exclusive de robes, costumes et alliances. Accédez à des pièces d'exception à des prix négociés, et vivez une expérience d'essayage unique dans notre Salon Éphémère.
            </p>
          </div>
        </div>
      </section>

      {/* Robes Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Nos Robes de Mariée
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {robes.map((robe, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300">
                <img
                  src={robe.image}
                  alt={robe.name}
                  className="w-full h-96 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{robe.name}</h3>
                  <p className="text-muted-foreground mb-2">Style {robe.style}</p>
                  <p className="text-2xl font-bold text-primary">{robe.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Costumes Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Nos Costumes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {costumes.map((costume, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300">
                <img
                  src={costume.image}
                  alt={costume.name}
                  className="w-full h-80 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{costume.name}</h3>
                  <p className="text-xl font-bold text-primary">{costume.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alliances Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Nos Alliances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {alliances.map((alliance, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300">
                <img
                  src={alliance.image}
                  alt={alliance.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{alliance.name}</h3>
                  <p className="text-lg font-bold text-primary">{alliance.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Prêt à découvrir votre tenue de rêve ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Réservez dès maintenant votre créneau exclusif dans notre Salon Éphémère et vivez une expérience d'essayage inoubliable.
          </p>
          <Link to="/salon-ephemere">
            <Button size="xl" variant="hero" className="font-semibold">
              Réservez votre essayage au Salon Éphémère
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Collection;
