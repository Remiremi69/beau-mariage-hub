import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import venueImage from "@/assets/venue-exterior.jpg";
import tableImage from "@/assets/table-setup.jpg";
import ceremonyImage from "@/assets/ceremony-arch.jpg";
import heroImage from "@/assets/hero-wedding.jpg";
import { useState } from "react";

const SerieEte2027 = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const dates = [
    { date: "Vendredi 1er Juillet 2027", status: "reserved" },
    { date: "Samedi 2 Juillet 2027", status: "reserved" },
    { date: "Dimanche 3 Juillet 2027", status: "reserved" },
    { date: "Mercredi 6 Juillet 2027", status: "available" },
    { date: "Jeudi 7 Juillet 2027", status: "available" },
    { date: "Vendredi 8 Juillet 2027", status: "option" },
    { date: "Samedi 9 Juillet 2027", status: "reserved" },
    { date: "Dimanche 10 Juillet 2027", status: "reserved" },
    { date: "Mercredi 13 Juillet 2027", status: "option" },
    { date: "Jeudi 14 Juillet 2027", status: "available" },
    { date: "Vendredi 15 Juillet 2027", status: "available" },
    { date: "Samedi 16 Juillet 2027", status: "reserved" },
    { date: "Dimanche 17 Juillet 2027", status: "option" },
    { date: "Mercredi 20 Juillet 2027", status: "available" },
    { date: "Jeudi 21 Juillet 2027", status: "available" },
    { date: "Vendredi 22 Juillet 2027", status: "reserved" },
    { date: "Samedi 23 Juillet 2027", status: "reserved" },
    { date: "Dimanche 24 Juillet 2027", status: "available" },
    { date: "Mercredi 27 Juillet 2027", status: "available" },
    { date: "Jeudi 28 Juillet 2027", status: "available" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-secondary text-secondary-foreground">Disponible</Badge>
        );
      case "reserved":
        return (
          <Badge variant="destructive">Réservé</Badge>
        );
      case "option":
        return (
          <Badge className="bg-sand text-anthracite">En option</Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Série Été 2027
              <br />
              <span className="text-primary">"Bohème Chic en Beaujolais"</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Vivez un mariage bohème chic au cœur des vignes, pour 10 000 € tout compris
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <img
              src={heroImage}
              alt="Cérémonie en plein air"
              className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img
              src={venueImage}
              alt="Domaine de la Vigne d'Or"
              className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img
              src={tableImage}
              alt="Décoration de table"
              className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img
              src={ceremonyImage}
              alt="Arche de cérémonie"
              className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Le Lieu - Le Domaine de la Vigne d'Or
            </h2>
            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)]">
              <CardContent className="p-8">
                <p className="text-lg mb-6 text-muted-foreground">
                  Niché dans les Pierres Dorées, le Domaine de la Vigne d'Or offre un panorama
                  exceptionnel sur le Beaujolais. Sa grange rénovée et son parc arboré seront le
                  théâtre de votre journée de rêve.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Capacité : jusqu'à 120 invités</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Vue panoramique sur les vignes</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Grange rénovée avec climatisation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Parc arboré de 3 hectares</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Package Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">
              Le Package Tout Compris à 10 000 €
            </h2>
            <p className="text-center text-muted-foreground mb-12">Pour 80 invités</p>

            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)]">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✅</span>
                    <div>
                      <h4 className="font-semibold mb-1">Privatisation du Domaine</h4>
                      <p className="text-sm text-muted-foreground">
                        Domaine exclusif pour votre journée
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✅</span>
                    <div>
                      <h4 className="font-semibold mb-1">Cérémonie Laïque</h4>
                      <p className="text-sm text-muted-foreground">
                        Décorée dans le parc avec arche bohème
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✅</span>
                    <div>
                      <h4 className="font-semibold mb-1">Cocktail & Dîner</h4>
                      <p className="text-sm text-muted-foreground">
                        Menu "Saveurs du Terroir" avec 6 pièces cocktail
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✅</span>
                    <div>
                      <h4 className="font-semibold mb-1">Photographe Pro</h4>
                      <p className="text-sm text-muted-foreground">8 heures de présence</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✅</span>
                    <div>
                      <h4 className="font-semibold mb-1">DJ & Animation</h4>
                      <p className="text-sm text-muted-foreground">
                        Matériel son & lumière inclus
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✅</span>
                    <div>
                      <h4 className="font-semibold mb-1">Décoration "Bohème Chic"</h4>
                      <p className="text-sm text-muted-foreground">Florale et thématique complète</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✅</span>
                    <div>
                      <h4 className="font-semibold mb-1">Coordination Jour J</h4>
                      <p className="text-sm text-muted-foreground">Wedding planner dédiée</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl">✅</span>
                    <div>
                      <h4 className="font-semibold mb-1">Vin & Champagne</h4>
                      <p className="text-sm text-muted-foreground">Sélection du Beaujolais</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Le Menu "Saveurs du Terroir"
            </h2>
            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)]">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">Cocktail (6 pièces)</h4>
                    <p className="text-muted-foreground">
                      Mini-burgers, verrines fraîcheur, feuilletés chauds, blinis saumon
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">Entrée</h4>
                    <p className="text-muted-foreground">Velouté de saison aux saveurs locales</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">Plat</h4>
                    <p className="text-muted-foreground">
                      Suprême de volaille fermière et son gratin dauphinois, légumes de saison rôtis
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">Fromages</h4>
                    <p className="text-muted-foreground">Buffet de fromages régionaux</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">Dessert</h4>
                    <p className="text-muted-foreground">Pièce montée & buffet de mignardises</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Theme Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Le Thème "Bohème Chic"</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Une ambiance naturelle et chaleureuse. Pensez matières brutes (bois, lin), touches
              végétales (eucalyptus, pampas), et lumière tamisée (guirlandes, bougies).
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🌿</div>
                <p className="text-sm font-semibold">Eucalyptus</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌾</div>
                <p className="text-sm font-semibold">Pampas</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">✨</div>
                <p className="text-sm font-semibold">Guirlandes</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🕯️</div>
                <p className="text-sm font-semibold">Bougies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dates Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">
              Choisissez Votre Date
            </h2>
            <p className="text-center text-muted-foreground mb-12">Dates disponibles - Été 2027</p>

            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)]">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dates.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        selectedDate === item.date
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      } ${item.status === "available" ? "cursor-pointer" : "cursor-not-allowed opacity-75"}`}
                      onClick={() => item.status === "available" && setSelectedDate(item.date)}
                    >
                      <span className="font-medium">{item.date}</span>
                      {getStatusBadge(item.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 text-center">
              <h3 className="text-3xl font-bold mb-4">
                {selectedDate ? "Réserver cette date ?" : "Une de ces dates est la vôtre ?"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {selectedDate
                  ? `Vous avez sélectionné : ${selectedDate}`
                  : "Contactez-nous pour poser une option ou pour planifier une visite."}
              </p>
              <Link to="/contact">
                <Button size="lg" variant="elegant" className="font-semibold">
                  Je réserve ma date
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SerieEte2027;
