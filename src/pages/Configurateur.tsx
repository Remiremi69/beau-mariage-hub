import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState, lazy, Suspense } from "react";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ChevronLeft, Shield, Star, Tag, Check, Receipt, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import photographeImage from "@/assets/photographe-alexandre.jpg";
import djImage from "@/assets/dj-clara.jpg";
import chefImage from "@/assets/chef-sebastien.jpg";
import manonImage from "@/assets/manon-maitresse-hotel.jpg";
import julienImage from "@/assets/julien-sommelier.jpg";
import sophieImage from "@/assets/sophie-serveuse.jpg";
import SEO from "@/components/SEO";

const DecoVisualizer = lazy(() => import("@/components/configurateur/DecoVisualizer"));
const VoyageCulinaire = lazy(() => import("@/components/configurateur/menu/VoyageCulinaire"));

const Configurateur = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("2027-10-04"); // Par défaut : Lundi 4 Octobre 2027
  const [guests, setGuests] = useState([80]);
  const [decoration, setDecoration] = useState("champetre");
  const [voyageSelections, setVoyageSelections] = useState<{ [key: string]: string | null }>({
    aperitif: null,
    atelier: null,
    plat: null,
    dessert: null,
  });
  const [photobooth, setPhotobooth] = useState(false);
  const [cocktailBar, setCocktailBar] = useState(false);
  const [ceremonieLaique, setCeremonieLaique] = useState(false);
  const [serviceForfait, setServiceForfait] = useState("essentiel");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  // Liste des dates disponibles pour Octobre 2027 - Série Domaine de la Croix Rochefort
  const availableDates = [
    { id: "2027-10-04", label: "Lundi 4 Octobre 2027", status: "disponible" },
    { id: "2027-10-05", label: "Mardi 5 Octobre 2027", status: "disponible" },
    { id: "2027-10-06", label: "Mercredi 6 Octobre 2027", status: "disponible" },
    { id: "2027-10-07", label: "Jeudi 7 Octobre 2027", status: "disponible" },
    { id: "2027-10-08", label: "Vendredi 8 Octobre 2027", status: "disponible" },
  ];

  const selectedDateInfo = availableDates.find(d => d.id === selectedDate) || availableDates[0];

  // Prix à définir - pour l'instant on affiche "À calculer"
  const guestPrice = (guests[0] - 80) * 50;
  const decorationPrice = decoration === "boheme-moderne" ? 300 : 0;
  const photoboothPrice = photobooth ? 400 : 0;
  const cocktailBarPrice = cocktailBar ? 600 : 0;
  const ceremonieLaiquePrice = ceremonieLaique ? 800 : 0;
  
  // Prix des forfaits service boissons (droit de bouchon)
  const serviceForfaitPrice = serviceForfait === "festif" ? 250 : serviceForfait === "premium" ? 450 : 0;

  // Prix total sera calculé une fois les tarifs définis
  const hasSelections = guestPrice !== 0 || decorationPrice > 0 || photoboothPrice > 0 || cocktailBarPrice > 0 || serviceForfaitPrice > 0 || ceremonieLaiquePrice > 0;

  const steps = [
    { id: 1, name: "Date", short: "Date" },
    { id: 2, name: "Invités", short: "Invités" },
    { id: 3, name: "Décoration", short: "Déco" },
    { id: 4, name: "Menu", short: "Menu" },
    { id: 5, name: "Options", short: "Options" },
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
              <span className="text-muted-foreground">Forfait - {selectedDateInfo.label}</span>
              <span className="font-semibold text-muted-foreground">À définir</span>
            </div>
            {guestPrice !== 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ajustement invités ({guests[0]} pers.)</span>
                <span className="font-semibold">{guestPrice > 0 ? "+" : ""}{guestPrice}€</span>
              </div>
            )}
            {decorationPrice > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Décoration Bohème Moderne</span>
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
            {serviceForfaitPrice > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Forfait Service {serviceForfait === "festif" ? "Festif" : "Premium"}
                </span>
                <span className="font-semibold">+{serviceForfaitPrice}€</span>
              </div>
            )}
            {ceremonieLaiquePrice > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cérémonie Laïque</span>
                <span className="font-semibold">+{ceremonieLaiquePrice}€</span>
              </div>
            )}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-xl font-bold text-primary">
                {hasSelections ? "Options sélectionnées" : "À calculer"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Le prix final sera affiché à l'étape Devis
            </p>
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
      <SEO 
        title="Configurateur de Mariage | Créez Votre Devis en 10 Minutes"
        description="Personnalisez votre mariage en quelques clics. Obtenez un devis instantané et transparent pour votre mariage de rêve."
      />
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

              {/* Étape 1: Date */}
              {currentStep === 1 && (
                <Card className="border-none shadow-[var(--shadow-elegant)] animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">Choisissez la date de votre mariage</CardTitle>
                    <p className="text-xs text-muted-foreground mt-2">Étape 1 sur 6</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Contexte du lieu */}
                    <div className="bg-secondary/10 rounded-xl p-4 md:p-6 border border-secondary/20">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                        <div className="space-y-2">
                          <h3 className="font-bold text-lg">Le Domaine de la Croix Rochefort — Octobre 2027</h3>
                          <p className="text-sm text-muted-foreground">
                            Notre première série se déroule du lundi 4 au vendredi 8 octobre 2027. 
                            Chaque jour, un mariage unique avec la même équipe de prestataires d'excellence.
                          </p>
                          <Link 
                            to="/serie-octobre-2027/domaine" 
                            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                          >
                            Découvrir le Domaine <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Grille de dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                      {availableDates.map((date) => {
                        const isSelected = selectedDate === date.id;
                        const statusConfig = {
                          disponible: { bg: "bg-green-100", text: "text-green-700", label: "Disponible" },
                          option: { bg: "bg-orange-100", text: "text-orange-700", label: "En option" },
                          reserve: { bg: "bg-red-100", text: "text-red-700", label: "Réservé" }
                        };
                        const config = statusConfig[date.status as keyof typeof statusConfig];

                        return (
                          <button
                            key={date.id}
                            onClick={() => setSelectedDate(date.id)}
                            className={`p-4 rounded-xl border-2 transition-all text-center ${
                              isSelected
                                ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                                : "border-border hover:border-primary/50 hover:shadow-md hover:bg-muted/30"
                            }`}
                          >
                            <div className="space-y-2">
                              <h4 className="font-bold text-sm md:text-base">
                                {date.label.split(' ').slice(0, 2).join(' ')}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {date.label.split(' ').slice(2).join(' ')}
                              </p>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                                {config.label}
                              </span>
                              {isSelected && (
                                <div className="flex justify-center">
                                  <Check className="w-5 h-5 text-primary" />
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end mt-6 md:mt-8">
                      <Button onClick={nextStep} size="lg" className="gap-2 w-full md:w-auto">
                        Étape suivante <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 2: Invités */}
              {currentStep === 2 && (
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

              {/* Étape 3: Décoration - Visualisateur de Rêves */}
              {currentStep === 3 && (
                <Card className="border-none shadow-[var(--shadow-elegant)] animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">Visualisez l'ambiance de votre mariage</CardTitle>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Explorez nos deux univers en 360° et trouvez celui qui vous ressemble.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={
                      <div className="h-96 flex items-center justify-center bg-muted rounded-xl">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm text-muted-foreground">Chargement du visualisateur...</span>
                        </div>
                      </div>
                    }>
                      <DecoVisualizer
                        selectedTheme={decoration}
                        onThemeChange={setDecoration}
                      />
                    </Suspense>

                    <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4 mt-6 md:mt-8">
                      <Button onClick={prevStep} variant="outline" size="lg" className="gap-2 w-full md:w-auto order-2 md:order-1">
                        <ChevronLeft className="w-5 h-5" /> Étape précédente
                      </Button>
                      <Button onClick={nextStep} size="lg" className="gap-2 w-full md:w-auto order-1 md:order-2">
                        Choisir ce thème <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 4: Voyage Culinaire */}
              {currentStep === 4 && (
                <div className="animate-fade-in">
                  <Suspense fallback={
                    <div className="h-96 flex items-center justify-center bg-muted rounded-xl">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-muted-foreground">Chargement du menu...</span>
                      </div>
                    </div>
                  }>
                    <VoyageCulinaire
                      selections={voyageSelections}
                      onSelect={(categoryId, stationId) => {
                        setVoyageSelections((prev) => ({
                          ...prev,
                          [categoryId]: stationId,
                        }));
                      }}
                    />
                  </Suspense>

                  <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4 mt-8 px-4">
                    <Button onClick={prevStep} variant="outline" size="lg" className="gap-2 w-full md:w-auto order-2 md:order-1">
                      <ChevronLeft className="w-5 h-5" /> Étape précédente
                    </Button>
                    <Button onClick={nextStep} size="lg" className="gap-2 w-full md:w-auto order-1 md:order-2">
                      Valider mon Voyage Culinaire <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 5: Vos Artistes & Options */}
              {currentStep === 5 && (
                <Card className="border-none shadow-[var(--shadow-elegant)] animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">Vos Artistes & Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8 md:space-y-10">
                    {/* Section 1 : Vos Artistes Inclus */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">Vos Artistes Inclus</h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                          Découvrez les professionnels talentueux qui vous accompagneront
                        </p>
                      </div>
                      
                      <div className="space-y-4 md:space-y-6">
                        {/* Carte Photographe */}
                        <div className="rounded-xl border-2 border-border overflow-hidden shadow-md">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 h-48 md:h-64">
                              <img
                                src={photographeImage}
                                alt="Alexandre Dubois - Photographe"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="md:w-2/3 p-4 md:p-6 flex flex-col justify-center">
                              <div className="flex items-center gap-2 mb-3">
                                <h4 className="text-lg md:text-xl font-bold">Alexandre Dubois - Votre Photographe</h4>
                                <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                                  Inclus
                                </span>
                              </div>
                              <p className="text-sm md:text-base text-muted-foreground mb-4">
                                Spécialiste du mariage, Alexandre capture avec poésie et discrétion les émotions de votre journée. 
                                Son style lumineux et naturel vous garantit des souvenirs inoubliables.
                              </p>
                              <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                                <Check className="w-4 h-4" />
                                <span>Certifié Le Beau Mariage - Excellence</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Carte DJ */}
                        <div className="rounded-xl border-2 border-border overflow-hidden shadow-md">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 h-48 md:h-64">
                              <img
                                src={djImage}
                                alt="Clara Martin - DJ"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="md:w-2/3 p-4 md:p-6 flex flex-col justify-center">
                              <div className="flex items-center gap-2 mb-3">
                                <h4 className="text-lg md:text-xl font-bold">Clara Martin - Votre DJ</h4>
                                <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                                  Inclus
                                </span>
                              </div>
                              <p className="text-sm md:text-base text-muted-foreground mb-4">
                                Passionnée de musique, Clara sait créer l'ambiance parfaite pour chaque moment de votre soirée. 
                                Son répertoire éclectique et son énergie communicative feront danser toutes les générations.
                              </p>
                              <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                                <Check className="w-4 h-4" />
                                <span>Certifié Le Beau Mariage - Excellence</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 2 : Personnalisez Votre Expérience */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">Personnalisez Votre Expérience</h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                          Ajoutez des options premium pour rendre votre mariage encore plus unique.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <label
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            photobooth
                              ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                              : "border-border hover:border-primary/50 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <Checkbox
                              id="photobooth"
                              checked={photobooth}
                              onCheckedChange={(checked) => setPhotobooth(checked === true)}
                              className="w-6 h-6 mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <Star className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-base md:text-lg">Photobooth Premium</h4>
                                  <p className="text-lg md:text-xl font-bold text-primary">+400€</p>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Des souvenirs instantanés et amusants pour vos invités
                              </p>
                            </div>
                          </div>
                        </label>

                        <label
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            cocktailBar
                              ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                              : "border-border hover:border-primary/50 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <Checkbox
                              id="cocktailBar"
                              checked={cocktailBar}
                              onCheckedChange={(checked) => setCocktailBar(checked === true)}
                              className="w-6 h-6 mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <Tag className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-base md:text-lg">Bar à Cocktails</h4>
                                  <p className="text-lg md:text-xl font-bold text-primary">+600€</p>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Un mixologue professionnel pour des créations uniques
                              </p>
                            </div>
                          </div>
                        </label>

                        <label
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            ceremonieLaique
                              ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                              : "border-border hover:border-primary/50 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <Checkbox
                              id="ceremonieLaique"
                              checked={ceremonieLaique}
                              onCheckedChange={(checked) => setCeremonieLaique(checked === true)}
                              className="w-6 h-6 mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <Heart className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-base md:text-lg">Cérémonie Laïque</h4>
                                  <p className="text-lg md:text-xl font-bold text-primary">+800€</p>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Une cérémonie personnalisée et émouvante, animée par un officiant professionnel
                              </p>
                            </div>
                          </div>
                        </label>

                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4">
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
                            <span className="text-muted-foreground">Date du mariage</span>
                            <span className="font-semibold">{selectedDateInfo.label}</span>
                          </div>
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
                            <span className="font-semibold">Voyage Culinaire</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Forfait Service Boissons</span>
                            <span className="font-semibold">
                              {serviceForfait === "essentiel" ? "Essentiel (Inclus)" : serviceForfait === "festif" ? "Festif (+250€)" : "Premium (+450€)"}
                            </span>
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
                          {ceremonieLaique && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cérémonie Laïque</span>
                              <span className="font-semibold">+800€</span>
                            </div>
                          )}
                        </div>
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold">Total</span>
                            <span className="text-2xl font-bold text-primary">Sur devis</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Un conseiller vous contactera avec le tarif personnalisé
                          </p>
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
