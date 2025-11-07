import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Configurateur = () => {
  const [guests, setGuests] = useState([80]);
  const [decoration, setDecoration] = useState("boheme");
  const [mealType, setMealType] = useState("assis");
  const [photobooth, setPhotobooth] = useState(false);
  const [cocktailBar, setCocktailBar] = useState(false);
  const [brunch, setBrunch] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const basePrice = 10000;
  const guestPrice = guests[0] > 80 ? (guests[0] - 80) * 50 : 0;
  const decorationPrice = decoration === "romantique" ? 300 : 0;
  const mealPrice = mealType === "buffet" ? 200 : 0;
  const photoboothPrice = photobooth ? 400 : 0;
  const cocktailBarPrice = cocktailBar ? 600 : 0;
  const brunchPrice = brunch ? 1200 : 0;

  const totalPrice =
    basePrice + guestPrice + decorationPrice + mealPrice + photoboothPrice + cocktailBarPrice + brunchPrice;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Devis envoyé !",
      description: "Nous vous contacterons dans les 24 heures.",
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
            Estimez le budget de votre Beau Mariage
          </h1>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Personnalisez votre mariage en quelques clics
          </p>

          <div className="space-y-8">
            {/* Étape 1: Invités */}
            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)]">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Étape 1 : Nombre d'invités
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-5xl font-bold text-primary">{guests[0]}</span>
                    <span className="text-2xl text-muted-foreground ml-2">invités</span>
                  </div>
                  <Slider
                    value={guests}
                    onValueChange={setGuests}
                    min={50}
                    max={120}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>50 invités</span>
                    <span>120 invités</span>
                  </div>
                  {guests[0] > 80 && (
                    <p className="text-sm text-muted-foreground text-center">
                      +{guestPrice}€ pour {guests[0] - 80} invités supplémentaires (50€/pers.)
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Étape 2: Décoration */}
            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)]">
              <CardHeader>
                <CardTitle className="text-2xl">Étape 2 : La Décoration</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={decoration} onValueChange={setDecoration}>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors">
                    <RadioGroupItem value="boheme" id="boheme" />
                    <Label htmlFor="boheme" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Bohème Chic</div>
                      <div className="text-sm text-muted-foreground">
                        Matières naturelles, pampas, tons neutres et touches terracotta
                      </div>
                    </Label>
                    <span className="font-semibold text-secondary">Inclus</span>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors">
                    <RadioGroupItem value="romantique" id="romantique" />
                    <Label htmlFor="romantique" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Romantique Élégant</div>
                      <div className="text-sm text-muted-foreground">
                        Roses blanches, chandelles, drapés de voilages et tons pastel
                      </div>
                    </Label>
                    <span className="font-semibold text-primary">+300€</span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Étape 3: Repas */}
            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)]">
              <CardHeader>
                <CardTitle className="text-2xl">Étape 3 : Le Repas</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={mealType} onValueChange={setMealType}>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors">
                    <RadioGroupItem value="assis" id="assis" />
                    <Label htmlFor="assis" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Menu Assis</div>
                      <div className="text-sm text-muted-foreground">Inclus dans le package</div>
                    </Label>
                    <span className="font-semibold text-secondary">Inclus</span>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors">
                    <RadioGroupItem value="buffet" id="buffet" />
                    <Label htmlFor="buffet" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Buffet Dînatoire</div>
                      <div className="text-sm text-muted-foreground">
                        Plus de variété et de convivialité
                      </div>
                    </Label>
                    <span className="font-semibold text-primary">+200€</span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Étape 4: Options */}
            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)]">
              <CardHeader>
                <CardTitle className="text-2xl">Étape 4 : Les Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors">
                  <Checkbox
                    id="photobooth"
                    checked={photobooth}
                    onCheckedChange={(checked) => setPhotobooth(checked as boolean)}
                  />
                  <Label htmlFor="photobooth" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Photobooth</div>
                    <div className="text-sm text-muted-foreground">
                      Avec accessoires et impressions illimitées
                    </div>
                  </Label>
                  <span className="font-semibold text-primary">+400€</span>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors">
                  <Checkbox
                    id="cocktailBar"
                    checked={cocktailBar}
                    onCheckedChange={(checked) => setCocktailBar(checked as boolean)}
                  />
                  <Label htmlFor="cocktailBar" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Bar à cocktails</div>
                    <div className="text-sm text-muted-foreground">
                      3 cocktails signature + barman professionnel
                    </div>
                  </Label>
                  <span className="font-semibold text-primary">+600€</span>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors">
                  <Checkbox
                    id="brunch"
                    checked={brunch}
                    onCheckedChange={(checked) => setBrunch(checked as boolean)}
                  />
                  <Label htmlFor="brunch" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Brunch du lendemain</div>
                    <div className="text-sm text-muted-foreground">
                      Pour prolonger la fête avec vos proches
                    </div>
                  </Label>
                  <span className="font-semibold text-primary">+1 200€</span>
                </div>
              </CardContent>
            </Card>

            {/* Étape 5: Devis */}
            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-2xl">Étape 5 : Votre Devis Estimatif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span>Package de base (80 invités)</span>
                    <span className="font-semibold">10 000 €</span>
                  </div>

                  {guestPrice > 0 && (
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Invités supplémentaires ({guests[0] - 80})</span>
                      <span>+{guestPrice} €</span>
                    </div>
                  )}

                  {decorationPrice > 0 && (
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Décoration Romantique Élégant</span>
                      <span>+{decorationPrice} €</span>
                    </div>
                  )}

                  {mealPrice > 0 && (
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Buffet Dînatoire</span>
                      <span>+{mealPrice} €</span>
                    </div>
                  )}

                  {photoboothPrice > 0 && (
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Photobooth</span>
                      <span>+{photoboothPrice} €</span>
                    </div>
                  )}

                  {cocktailBarPrice > 0 && (
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Bar à cocktails</span>
                      <span>+{cocktailBarPrice} €</span>
                    </div>
                  )}

                  {brunchPrice > 0 && (
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Brunch du lendemain</span>
                      <span>+{brunchPrice} €</span>
                    </div>
                  )}

                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold">Prix Total</span>
                    <span className="text-4xl font-bold text-primary">{totalPrice.toLocaleString()} €</span>
                  </div>
                </div>

                {!showForm ? (
                  <Button
                    size="lg"
                    variant="elegant"
                    className="w-full"
                    onClick={() => setShowForm(true)}
                  >
                    Obtenir mon devis détaillé
                  </Button>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" required placeholder="Jean Dupont" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required placeholder="jean@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" type="tel" required placeholder="06 12 34 56 78" />
                    </div>
                    <div>
                      <Label htmlFor="date">Date souhaitée</Label>
                      <Input id="date" type="date" required />
                    </div>
                    <Button type="submit" size="lg" variant="elegant" className="w-full">
                      Recevoir mon devis personnalisé
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurateur;
