import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les 24 heures.",
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">Contactez-nous</h1>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Une question ? Un projet de mariage ? Nous sommes là pour vous
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)]">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Nos coordonnées</h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <a
                          href="mailto:contact@lebeaumariage.fr"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          contact@lebeaumariage.fr
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Téléphone</h4>
                        <a
                          href="tel:+33612345678"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          06 12 34 56 78
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Du lundi au samedi, 10h-19h
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sand/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Instagram className="h-6 w-6 text-anthracite" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Instagram</h4>
                        <a
                          href="https://instagram.com/lebeaumariage"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          @lebeaumariage
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Suivez nos dernières réalisations
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Adresse</h4>
                        <p className="text-muted-foreground">
                          Domaine de la Vigne d'Or
                          <br />
                          Theizé, Beaujolais
                          <br />
                          69620 France
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Horaires d'ouverture</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span className="font-semibold">10h - 19h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span className="font-semibold">10h - 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span className="font-semibold">Fermé</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * Visites du domaine sur rendez-vous les mercredis et samedis après-midi
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)]">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" required placeholder="Jean" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" required placeholder="Dupont" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required placeholder="jean.dupont@example.com" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" required placeholder="06 12 34 56 78" />
                  </div>

                  <div>
                    <Label htmlFor="weddingDate">Date de mariage souhaitée (optionnel)</Label>
                    <Input id="weddingDate" type="date" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Parlez-nous de votre projet de mariage..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" size="lg" variant="elegant" className="w-full">
                    Envoyer le message
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Nous nous engageons à vous répondre dans les 24 heures
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
