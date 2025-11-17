import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

const SalonEphemere = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    timeSlot: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast({
        title: "Date manquante",
        description: "Veuillez sélectionner une date pour votre essayage.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons rapidement pour confirmer votre rendez-vous.",
    });
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      timeSlot: "",
    });
    setDate(undefined);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const benefits = [
    "Un lieu privé et confidentiel",
    "Accueil VIP avec champagne",
    "5 robes pré-sélectionnées selon vos goûts",
    "Une styliste dédiée pendant 2h",
    "Photos professionnelles offertes",
    "Conseils personnalisés",
  ];

  const availableSlots = [
    "10h00 - 12h00",
    "14h00 - 16h00",
    "16h30 - 18h30",
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&h=900&fit=crop)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-card mb-6 drop-shadow-lg">
            Expérience essayage
          </h1>
          <h2 className="text-2xl md:text-4xl text-card mb-8 drop-shadow-lg">
            L'Expérience d'Essayage la Plus Exclusive de France
          </h2>
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Un Moment <span className="text-primary">Rien Que Pour Vous</span>
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              L'expérience essayage, c'est notre concept révolutionnaire : un appartement haussmannien privatisé au cœur de Paris, transformé en écrin de luxe pour votre essayage. Chaque week-end, nous accueillons seulement quelques futures mariées dans une atmosphère intimiste et raffinée.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)]">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-secondary" />
                    </div>
                    <p className="text-lg">{benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop"
              alt="Salon Éphémère - Vue 1"
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop"
              alt="Salon Éphémère - Vue 2"
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
              alt="Salon Éphémère - Vue 3"
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Réservez Votre <span className="text-primary">Salon Privé</span>
            </h2>

            <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)]">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Choisissez votre date préférée</Label>
                    <div className="flex justify-center p-4 bg-muted/20 rounded-lg">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(date) => {
                          const day = date.getDay();
                          return day !== 6 && day !== 0; // Only weekends
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Le Salon Éphémère est ouvert uniquement les week-ends
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeSlot">Créneau horaire souhaité</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {availableSlots.map((slot) => (
                        <label
                          key={slot}
                          className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.timeSlot === slot
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="timeSlot"
                            value={slot}
                            checked={formData.timeSlot === slot}
                            onChange={handleInputChange}
                            className="sr-only"
                            required
                          />
                          <span className="font-medium">{slot}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (optionnel)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Parlez-nous de vos envies, de votre style..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="xl" className="w-full" variant="hero">
                    Envoyer ma demande de réservation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalonEphemere;
