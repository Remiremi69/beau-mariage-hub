import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LeadCaptureSection = () => {
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [dateEnvisagee, setDateEnvisagee] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prenom.trim() || !email.trim()) return;

    setIsSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      prenom: prenom.trim(),
      email: email.trim(),
      date_envisagee: dateEnvisagee.trim() || null,
    });

    setIsSubmitting(false);
    if (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      return;
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-xl mx-auto">
            <p className="text-2xl md:text-3xl font-semibold text-primary">
              Merci ! Nous vous recontactons très vite. 💛
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            La prochaine série : 4 – 8 octobre en Beaujolais
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Places limitées — laissez-nous vos coordonnées et nous vous recontactons sous 24h.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <Input
                placeholder="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
                maxLength={100}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
              />
            </div>
            <div>
              <Input
                placeholder="Date envisagée"
                value={dateEnvisagee}
                onChange={(e) => setDateEnvisagee(e.target.value)}
                maxLength={200}
              />
            </div>
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full font-semibold text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Je veux être contacté"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;
