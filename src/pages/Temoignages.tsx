import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import SEO from "@/components/SEO";

const Temoignages = () => {
  const testimonials = [
    {
      name: "Laura & Tom",
      date: "15 Juillet 2027",
      text: "Incroyable ! Un mariage magnifique sans aucun stress. Le concept est génial et l'équipe a été parfaite. Et tout ça pour un budget qu'on n'aurait jamais cru possible. La décoration bohème était exactement ce qu'on voulait.",
      rating: 5,
    },
    {
      name: "Chloé & Maxime",
      date: "22 Juillet 2027",
      text: "La décoration était sublime, le lieu magique. Nos invités ont été bluffés. On recommande à 1000% ! Le photographe a capturé des moments incroyables et le repas était délicieux.",
      rating: 5,
    },
    {
      name: "Sophie & Alexandre",
      date: "14 Juillet 2027",
      text: "Nous cherchions un mariage élégant sans nous ruiner. Le Beau Mariage a dépassé toutes nos attentes. La coordination le jour J était impeccable, nous avons pu profiter pleinement de notre journée.",
      rating: 5,
    },
    {
      name: "Emma & Lucas",
      date: "7 Juillet 2027",
      text: "Un mariage de rêve au milieu des vignes. Le package tout compris nous a enlevé un poids énorme. Plus besoin de courir après les prestataires, tout était déjà organisé. Merci à toute l'équipe !",
      rating: 5,
    },
    {
      name: "Julie & Marc",
      date: "27 Juillet 2027",
      text: "Le Domaine de la Vigne d'Or est tout simplement magnifique. La vue sur les vignes au coucher du soleil était à couper le souffle. Nos photos sont sublimes et nos invités ne parlent que de ça !",
      rating: 5,
    },
    {
      name: "Amélie & Thomas",
      date: "20 Juillet 2027",
      text: "Concept révolutionnaire ! Nous avons économisé plusieurs milliers d'euros tout en ayant un mariage haut de gamme. Le menu 'Saveurs du Terroir' était exquis et le DJ a fait danser tout le monde jusqu'au bout de la nuit.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-background">
      <SEO 
        title="Témoignages | Avis de Nos Couples Mariés"
        description="Découvrez les témoignages de nos couples mariés. Ils ont choisi Le Beau Mariage pour un mariage de rêve sans stress."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
            Ce qu'ils en ont pensé
          </h1>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Les témoignages de nos couples mariés
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-none shadow-[0_4px_20px_-4px_hsl(235_17%_25%/0.1)] hover:shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 leading-relaxed italic text-foreground">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">Mariés le {testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-4">Vous aussi, rejoignez l'aventure</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Découvrez notre série Octobre 2027 et réservez votre date
                </p>
                <a
                  href="/serie-ete-2027"
                  className="inline-flex items-center justify-center h-12 rounded-md px-10 text-base font-semibold bg-gradient-to-r from-or to-primary text-primary-foreground shadow-elegant hover:shadow-glow hover:scale-105 transition-all duration-300"
                >
                  Découvrir les dates disponibles
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temoignages;
