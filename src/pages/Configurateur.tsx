import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ChevronLeft, Shield, Star, Tag, Check, Receipt } from "lucide-react";
import decoBohemeImage from "@/assets/deco-boheme.jpg";
import decoRomantiqueImage from "@/assets/deco-romantique.jpg";

const Configurateur = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [guests, setGuests] = useState([80]);
  const [decoration, setDecoration] = useState("boheme");
  const [entree, setEntree] = useState("veloute");
  const [platPrincipal, setPlatPrincipal] = useState("volaille");
  const [fromages, setFromages] = useState("plateau");
  const [dessert, setDessert] = useState("piece-montee");
  const [photobooth, setPhotobooth] = useState(false);
  const [cocktailBar, setCocktailBar] = useState(false);
  const [brunch, setBrunch] = useState(false);
  const [tenue, setTenue] = useState("partenaire");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const basePrice = 10000;
  const guestPrice = (guests[0] - 80) * 50;
  const decorationPrice = decoration === "romantique" ? 300 : 0;
  const photoboothPrice = photobooth ? 400 : 0;
  const cocktailBarPrice = cocktailBar ? 600 : 0;
  const brunchPrice = brunch ? 1200 : 0;

  const totalPrice =
    basePrice + guestPrice + decorationPrice + photoboothPrice + cocktailBarPrice + brunchPrice;

  const steps = [
    { id: 1, name: "Invités", short: "Invités" },
    { id: 2, name: "Décoration", short: "Déco" },
    { id: 3, name: "Menu", short: "Menu" },
    { id: 4, name: "Options", short: "Options" },
    { id: 5, name: "Tenue", short: "Tenue" },
    { id: 6, name: "Devis", short: "Devis" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Devis envoyé !",
      description: "Nous vous contacterons dans les 24 heures.",
    });
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const SummaryContent = () => (
    <>
      {/* Devis en temps réel */}
      <Card className="border-none shadow-[var(--shadow-elegant)]">
        <CardHeader>
          <CardTitle className="text-xl">Votre Devis en Temps Réel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Forfait de base (80 pers.)</span>
              <span className="font-semibold">{basePrice.toLocaleString()}€</span>
            </div>
            {guestPrice !== 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ajustement invités</span>
                <span className="font-semibold">{guestPrice > 0 ? "+" : ""}{guestPrice}€</span>
              </div>
            )}
            {decorationPrice > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Décoration Romantique</span>
                <span className="font-semibold">+{decorationPrice}€</span>
              </div>
            )}
            {photoboothPrice > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Photobooth</span>
                <span className="font-semibold">+{photoboothPrice}€</span>
              </div>
            )}
            {cocktailBarPrice > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bar à Cocktails</span>
                <span className="font-semibold">+{cocktailBarPrice}€</span>
              </div>
            )}
            {brunchPrice > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Brunch</span>
                <span className="font-semibold">+{brunchPrice}€</span>
              </div>
            )}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()}€</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bloc de réassurance */}
      <Card className="border-none shadow-[var(--shadow-elegant)] bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Inclus dans votre forfait :</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Garantie Anti-Imprévu</h4>
              <p className="text-xs text-muted-foreground">Annulation ou report flexible</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Star className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Garantie Qualité Certifiée</h4>
              <p className="text-xs text-muted-foreground">Prestataires d'excellence</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Tag className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Garantie Zéro Coût Caché</h4>
              <p className="text-xs text-muted-foreground">Prix transparent et définitif</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Témoignage */}
      <Card className="border-none shadow-[var(--shadow-elegant)] bg-secondary/5">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm italic">
              "Une organisation parfaite, un prix imbattable. Le Beau Mariage a réalisé notre rêve."
            </p>
            <p className="text-xs font-semibold text-muted-foreground">— Laura & Tom</p>
          </div>
        </CardContent>
      </Card>

      {/* CTA Final */}
      <Button
        onClick={() => setCurrentStep(6)}
        size="lg"
        className="w-full"
        disabled={currentStep === 6}
      >
        Finaliser et obtenir mon devis
      </Button>
    </>
  );

  return (
    <div className="min-h-screen pt-20 bg-background pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-3 md:mb-4">
            Estimez le budget de votre Beau Mariage
          </h1>
          <p className="text-center text-muted-foreground mb-6 md:mb-8 text-base md:text-lg">
            Personnalisez votre mariage en quelques clics
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Colonne de gauche - Configurateur */}
            <div className="lg:w-[70%]">
              {/* Barre de progression */}
              <div className="mb-6 md:mb-8 bg-card rounded-lg p-4 md:p-6 shadow-[var(--shadow-elegant)]">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <button
                        onClick={() => setCurrentStep(step.id)}
                        className={`flex flex-col items-center gap-1 md:gap-2 transition-all ${
                          currentStep === step.id
                            ? "text-primary"
                            : currentStep > step.id
                            ? "text-secondary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                            currentStep === step.id
                              ? "bg-primary text-primary-foreground scale-110"
                              : currentStep > step.id
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {currentStep > step.id ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : step.id}
                        </div>
                        <span className="text-[10px] md:text-sm font-medium">{step.short}</span>
                      </button>
                      {index < steps.length - 1 && (
                        <div
                          className={`h-0.5 md:h-1 flex-1 mx-1 md:mx-2 rounded transition-all ${
                            currentStep > step.id ? "bg-secondary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Étape 1: Invités */}
              {currentStep === 1 && (
                <Card className="border-none shadow-[var(--shadow-elegant)] animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">Commencez par le nombre de vos invités</CardTitle>
                    <p className="text-sm md:text-base text-muted-foreground">De 50 à 120 personnes, notre formule s'adapte à vous.</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 md:space-y-8">
                      <div className="text-center">
                        <span className="text-5xl md:text-6xl font-bold text-primary">{guests[0]}</span>
                        <span className="text-2xl md:text-3xl text-muted-foreground ml-2 md:ml-3">invités</span>
                      </div>
                      <Slider
                        value={guests}
                        onValueChange={setGuests}
                        min={50}
                        max={120}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
                        <span>50 invités</span>
                        <span>120 invités</span>
                      </div>
                      {guests[0] !== 80 && (
                        <p className="text-center text-sm md:text-base text-muted-foreground">
                          {guests[0] > 80
                            ? `+${guestPrice}€ pour ${guests[0] - 80} invités supplémentaires (50€/pers.)`
                            : `${guestPrice}€ pour ${80 - guests[0]} invités en moins (50€/pers.)`}
                        </p>
                      )}
                      <div className="flex justify-end">
                        <Button onClick={nextStep} size="lg" className="gap-2 w-full md:w-auto">
                          Étape suivante <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 2: Décoration */}
              {currentStep === 2 && (
                <Card className="border-none shadow-[var(--shadow-elegant)] animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">Choisissez l'ambiance de votre mariage</CardTitle>
                    <p className="text-sm md:text-base text-muted-foreground">Deux styles uniques pour une atmosphère sur mesure.</p>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={decoration} onValueChange={setDecoration}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <label
                          htmlFor="boheme"
                          className={`group cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
                            decoration === "boheme"
                              ? "border-primary shadow-[0_0_30px_rgba(14,71,67,0.3)] scale-[1.02]"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="relative h-48 md:h-64">
                            <img
                              src={decoBohemeImage}
                              alt="Bohème Chic"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                              <div className="flex items-center gap-2 mb-2">
                                <RadioGroupItem value="boheme" id="boheme" className="border-white" />
                                <h3 className="text-xl md:text-2xl font-bold">Bohème Chic</h3>
                              </div>
                              <p className="text-xs md:text-sm text-white/90 mb-2">
                                Matières naturelles, pampas, tons neutres et touches terracotta
                              </p>
                              <span className="inline-block bg-secondary text-secondary-foreground px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold">
                                Inclus
                              </span>
                            </div>
                          </div>
                        </label>

                        <label
                          htmlFor="romantique"
                          className={`group cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
                            decoration === "romantique"
                              ? "border-primary shadow-[0_0_30px_rgba(14,71,67,0.3)] scale-[1.02]"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="relative h-48 md:h-64">
                            <img
                              src={decoRomantiqueImage}
                              alt="Romantique Élégant"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                              <div className="flex items-center gap-2 mb-2">
                                <RadioGroupItem value="romantique" id="romantique" className="border-white" />
                                <h3 className="text-xl md:text-2xl font-bold">Romantique Élégant</h3>
                              </div>
                              <p className="text-xs md:text-sm text-white/90 mb-2">
                                Roses blanches, chandelles, drapés de voilages et tons pastel
                              </p>
                              <span className="inline-block bg-primary text-primary-foreground px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold">
                                +300€
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                    <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4 mt-6 md:mt-8">
                      <Button onClick={prevStep} variant="outline" size="lg" className="gap-2 w-full md:w-auto order-2 md:order-1">
                        <ChevronLeft className="w-5 h-5" /> Étape précédente
                      </Button>
                      <Button onClick={nextStep} size="lg" className="gap-2 w-full md:w-auto order-1 md:order-2">
                        Étape suivante <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 3: Menu */}
              {currentStep === 3 && (
                <Card className="border-none shadow-[var(--shadow-elegant)] animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">Composez votre menu de fête</CardTitle>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Tous nos plats sont élaborés avec des produits frais et locaux.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Entrée */}
                    <div>
                      <h3 className="text-xl font-bold mb-4">L'Entrée : La première impression</h3>
                      <RadioGroup value={entree} onValueChange={setEntree}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <label
                            htmlFor="veloute"
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              entree === "veloute"
                                ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                                : "border-border hover:border-primary/50 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="veloute" id="veloute" className="mt-1" />
                              <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2">Velouté de saison aux champignons des bois</h4>
                                <p className="text-sm text-muted-foreground">
                                  Crème truffée et croûtons dorés. Un classique réconfortant et élégant.
                                </p>
                              </div>
                            </div>
                          </label>

                          <label
                            htmlFor="saumon"
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              entree === "saumon"
                                ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                                : "border-border hover:border-primary/50 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="saumon" id="saumon" className="mt-1" />
                              <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2">Verrine de saumon fumé et crème citronnée</h4>
                                <p className="text-sm text-muted-foreground">
                                  Aneth frais et perles de citron. Une entrée légère et raffinée.
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Plat Principal */}
                    <div>
                      <h3 className="text-xl font-bold mb-4">Le Plat Principal : Le cœur du repas</h3>
                      <RadioGroup value={platPrincipal} onValueChange={setPlatPrincipal}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <label
                            htmlFor="volaille"
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              platPrincipal === "volaille"
                                ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                                : "border-border hover:border-primary/50 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="volaille" id="volaille" className="mt-1" />
                              <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2">Suprême de volaille fermière rôtie au jus de thym</h4>
                                <p className="text-sm text-muted-foreground">
                                  Accompagné de son gratin dauphinois et légumes de saison glacés.
                                </p>
                              </div>
                            </div>
                          </label>

                          <label
                            htmlFor="boeuf"
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              platPrincipal === "boeuf"
                                ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                                : "border-border hover:border-primary/50 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="boeuf" id="boeuf" className="mt-1" />
                              <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2">Pavé de bœuf Angus, sauce au poivre vert</h4>
                                <p className="text-sm text-muted-foreground">
                                  Écrasé de pommes de terre à l'huile de truffe et poêlée de légumes verts.
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Fromages */}
                    <div>
                      <h3 className="text-xl font-bold mb-4">Les Fromages : La tradition gourmande</h3>
                      <RadioGroup value={fromages} onValueChange={setFromages}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <label
                            htmlFor="plateau"
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              fromages === "plateau"
                                ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                                : "border-border hover:border-primary/50 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="plateau" id="plateau" className="mt-1" />
                              <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2">Plateau de fromages régionaux affinés</h4>
                                <p className="text-sm text-muted-foreground">
                                  Une sélection de 4 fromages emblématiques de notre terroir.
                                </p>
                              </div>
                            </div>
                          </label>

                          <label
                            htmlFor="chevre"
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              fromages === "chevre"
                                ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                                : "border-border hover:border-primary/50 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="chevre" id="chevre" className="mt-1" />
                              <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2">Cœur de chèvre frais sur toast de pain d'épices</h4>
                                <p className="text-sm text-muted-foreground">
                                  Accompagné d'une salade de jeunes pousses et noix.
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Dessert */}
                    <div>
                      <h3 className="text-xl font-bold mb-4">Le Dessert : La touche sucrée</h3>
                      <RadioGroup value={dessert} onValueChange={setDessert}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <label
                            htmlFor="piece-montee"
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              dessert === "piece-montee"
                                ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                                : "border-border hover:border-primary/50 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="piece-montee" id="piece-montee" className="mt-1" />
                              <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2">Pièce montée traditionnelle (choux ou macarons)</h4>
                                <p className="text-sm text-muted-foreground">
                                  Le classique indémodable pour un final spectaculaire.
                                </p>
                              </div>
                            </div>
                          </label>

                          <label
                            htmlFor="mignardises"
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              dessert === "mignardises"
                                ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                                : "border-border hover:border-primary/50 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="mignardises" id="mignardises" className="mt-1" />
                              <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2">Buffet de 5 mignardises par personne</h4>
                                <p className="text-sm text-muted-foreground">
                                  Mini-éclairs, tartelettes aux fruits, macarons, verrines...
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4 mt-6 md:mt-8">
                      <Button onClick={prevStep} variant="outline" size="lg" className="gap-2 w-full md:w-auto order-2 md:order-1">
                        <ChevronLeft className="w-5 h-5" /> Étape précédente
                      </Button>
                      <Button onClick={nextStep} size="lg" className="gap-2 w-full md:w-auto order-1 md:order-2">
                        Étape suivante <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 4: Options */}
              {currentStep === 4 && (
                <Card className="border-none shadow-[var(--shadow-elegant)] animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">Personnalisez votre expérience</CardTitle>
                    <p className="text-sm md:text-base text-muted-foreground">Ajoutez des options premium pour rendre votre mariage encore plus unique.</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <label
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          photobooth
                            ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                            : "border-border hover:border-primary/50 hover:shadow-md"
                        }`}
                      >
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Star className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-2">Photobooth Premium</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Des souvenirs instantanés et amusants pour vos invités
                            </p>
                            <p className="text-xl font-bold text-primary">+400€</p>
                          </div>
                          <Checkbox
                            id="photobooth"
                            checked={photobooth}
                            onCheckedChange={(checked) => setPhotobooth(checked === true)}
                            className="w-6 h-6"
                          />
                        </div>
                      </label>

                      <label
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          cocktailBar
                            ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                            : "border-border hover:border-primary/50 hover:shadow-md"
                        }`}
                      >
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Tag className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-2">Bar à Cocktails</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Un mixologue professionnel pour des créations uniques
                            </p>
                            <p className="text-xl font-bold text-primary">+600€</p>
                          </div>
                          <Checkbox
                            id="cocktailBar"
                            checked={cocktailBar}
                            onCheckedChange={(checked) => setCocktailBar(checked === true)}
                            className="w-6 h-6"
                          />
                        </div>
                      </label>

                      <label
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          brunch
                            ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                            : "border-border hover:border-primary/50 hover:shadow-md"
                        }`}
                      >
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-2">Brunch du Lendemain</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Prolongez la fête avec un brunch convivial
                            </p>
                            <p className="text-xl font-bold text-primary">+1200€</p>
                          </div>
                          <Checkbox id="brunch" checked={brunch} onCheckedChange={(checked) => setBrunch(checked === true)} className="w-6 h-6" />
                        </div>
                      </label>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4 mt-6 md:mt-8">
                      <Button onClick={prevStep} variant="outline" size="lg" className="gap-2 w-full md:w-auto order-2 md:order-1">
                        <ChevronLeft className="w-5 h-5" /> Étape précédente
                      </Button>
                      <Button onClick={nextStep} size="lg" className="gap-2 w-full md:w-auto order-1 md:order-2">
                        Étape suivante <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 5: La Tenue des Mariés */}
              {currentStep === 5 && (
                <Card className="border-none shadow-[var(--shadow-elegant)] animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">La Tenue des Mariés</CardTitle>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Profitez de notre réseau de partenaires exclusifs pour trouver la tenue de vos rêves, sans stress et avec des avantages uniques.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={tenue} onValueChange={setTenue}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <label
                          htmlFor="partenaire"
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            tenue === "partenaire"
                              ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                              : "border-border hover:border-primary/50 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <RadioGroupItem value="partenaire" id="partenaire" className="mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-bold text-lg">Oui, je veux l'expérience Le Beau Mariage</h3>
                                <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold">
                                  Inclus
                                </span>
                              </div>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>Accès à notre boutique partenaire exclusive</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>10% de remise sur toute la collection</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>Accueil VIP et essayages privés</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>Conseils d'une styliste dédiée</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </label>

                        <label
                          htmlFor="autonome"
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            tenue === "autonome"
                              ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                              : "border-border hover:border-primary/50 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <RadioGroupItem value="autonome" id="autonome" className="mt-1" />
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-2">Non, je gère ma tenue moi-même</h3>
                              <p className="text-sm text-muted-foreground">
                                Vous préférez chercher votre robe et votre costume de manière indépendante.
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                    <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4 mt-6 md:mt-8">
                      <Button onClick={prevStep} variant="outline" size="lg" className="gap-2 w-full md:w-auto order-2 md:order-1">
                        <ChevronLeft className="w-5 h-5" /> Étape précédente
                      </Button>
                      <Button onClick={nextStep} size="lg" className="gap-2 w-full md:w-auto order-1 md:order-2">
                        Voir mon devis <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 6: Devis */}
              {currentStep === 6 && (
                <Card className="border-none shadow-[var(--shadow-elegant)] animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">Votre mariage de rêve est prêt !</CardTitle>
                    <p className="text-sm md:text-base text-muted-foreground">Recevez votre devis personnalisé par email.</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                        <h3 className="text-xl font-bold mb-4">Récapitulatif de votre mariage</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Nombre d'invités</span>
                            <span className="font-semibold">{guests[0]} personnes</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Décoration</span>
                            <span className="font-semibold">
                              {decoration === "boheme" ? "Bohème Chic" : "Romantique Élégant"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Menu</span>
                            <span className="font-semibold">Menu gastronomique complet</span>
                          </div>
                          {photobooth && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Photobooth Premium</span>
                              <span className="font-semibold">+400€</span>
                            </div>
                          )}
                          {cocktailBar && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Bar à Cocktails</span>
                              <span className="font-semibold">+600€</span>
                            </div>
                          )}
                          {brunch && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Brunch du Lendemain</span>
                              <span className="font-semibold">+1200€</span>
                            </div>
                          )}
                        </div>
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold">Total</span>
                            <span className="text-3xl font-bold text-primary">{totalPrice.toLocaleString()}€</span>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="prenom">Prénom</Label>
                          <Input
                            id="prenom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            placeholder="Votre prénom"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            required
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                          <Button onClick={prevStep} type="button" variant="outline" size="lg" className="flex-1 gap-2 order-2 md:order-1">
                            <ChevronLeft className="w-5 h-5" /> Modifier
                          </Button>
                          <Button type="submit" size="lg" className="flex-1 order-1 md:order-2">
                            Recevoir mon devis
                          </Button>
                        </div>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Colonne de droite - Récapitulatif flottant (desktop uniquement) */}
            <div className="hidden lg:block lg:w-[30%]">
              <div className="lg:sticky lg:top-24 space-y-6">
                <SummaryContent />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton flottant mobile pour voir le récapitulatif */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border z-50">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="flex-1 gap-2">
                <Receipt className="w-5 h-5" />
                Voir le devis
                <span className="ml-auto font-bold text-primary">{totalPrice.toLocaleString()}€</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle>Votre Devis en Temps Réel</SheetTitle>
              </SheetHeader>
              <div className="space-y-6">
                <SummaryContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Configurateur;
