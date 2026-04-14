import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { schemaFAQ } from '@/lib/schemas';

const FAQ = () => {
  const faqs = [
    {
      question: "Quel est le prix d'un mariage avec Le Beau Mariage ?",
      answer:
        "Le prix dépend entièrement de votre configuration : nombre d'invités, formule repas choisie, et options sélectionnées. La fourchette va d'environ 12 000 € pour 50 invités avec la formule Essentielle, à environ 34 000 € pour 120 invités en formule Prestige avec toutes les options. Pour 80 invités avec la formule Gastronomique, un photographe et un DJ, le total est d'environ 19 500 €. Il n'y a pas de prix unique : notre configurateur en ligne calcule votre devis exact en moins de 10 minutes, avec le détail de chaque poste. Aucune mauvaise surprise : ce que vous voyez dans le configurateur est ce que vous payez.",
    },
    {
      question: "Qu'est-ce qui est inclus dans la formule Le Beau Mariage ?",
      answer:
        "La formule de base inclut : la privatisation complète du Domaine de la Croix Rochefort à Saint-Didier-sur-Beaujeu (salle de réception 500m², cave voûtée, parc), le vin d'honneur (champagne, vins beaujolais, bouchées et mignardises), la décoration complète du domaine selon le thème choisi, et la coordination du jour J. À cela s'ajoutent selon votre configuration : la formule repas (Essentielle 65€/pers., Gastronomique 90€/pers. ou Prestige 130€/pers.), le photographe (Reportage ou Premium Duo), le DJ (Standard ou Premium), la cérémonie laïque, et des options comme le photobooth, le bar à cocktails ou le feu d'artifice.",
    },
    {
      question: "Comment fonctionne le concept mariage all-inclusive ?",
      answer:
        "Le Beau Mariage repose sur un principe simple : un lieu, tous les prestataires sélectionnés, un seul contrat et un seul devis. Plutôt que de contacter séparément un traiteur, un photographe, un DJ, un fleuriste et une salle — et de coordonner des dizaines d'échanges pendant des mois — vous configurez votre mariage en ligne en 10 minutes. Tous les prestataires travaillent ensemble sur le domaine plusieurs fois par an, ce qui garantit une coordination sans friction le jour J. Moins de gestion, plus de présence.",
    },
    {
      question: "Quelles sont les dates disponibles pour se marier ?",
      answer:
        "La première série Le Beau Mariage propose 5 dates consécutives du 4 au 8 octobre 2027 au Domaine de la Croix Rochefort en Beaujolais. Les places sont limitées à 5 mariages sur cette série inaugurale. La réservation se fait via le configurateur en ligne. Des séries ultérieures sont en cours de planification.",
    },
    {
      question: "Où se situe le domaine et comment y accéder depuis Lyon ?",
      answer:
        "Le Domaine de la Croix Rochefort est situé à Saint-Didier-sur-Beaujeu en Beaujolais (69430), à environ 40 minutes de Lyon via l'A6. Le domaine dispose d'un parking privé. C'est un domaine viticole avec une cave voûtée, une salle de réception de 500m² et un parc, pouvant accueillir jusqu'à 300 convives.",
    },
    {
      question: "Peut-on personnaliser le mariage ?",
      answer:
        "La personnalisation est réelle à l'intérieur du cadre. Vous choisissez : date, nombre d'invités, formule repas (Essentielle, Gastronomique ou Prestige), thème de décoration (Sève ou Pierre & Lumière), niveau photographe, niveau DJ, cérémonie laïque, et des options comme le feu d'artifice, le bar à cocktails ou la voiture de collection. Ce qui ne se personnalise pas : le lieu et l'équipe de prestataires partenaires, qui sont le cœur du concept.",
    },
    {
      question: "Comment se passe la réservation et le paiement ?",
      answer:
        "La réservation se fait entièrement en ligne : vous configurez votre mariage, obtenez un devis instantané, signez le contrat en ligne (signature électronique) et versez un acompte de 40% pour bloquer votre date. Le reste se règle en deux fois : 30% environ 3 mois avant le mariage, et 30% un mois avant le jour J. Paiement par carte bancaire ou virement.",
    },
    {
      question: "Qu'est-ce qui différencie Le Beau Mariage d'un wedding planner classique ?",
      answer:
        "Un wedding planner coordonne des prestataires que vous avez choisis séparément. Le Beau Mariage intègre le lieu, le traiteur, le photographe, le DJ et la décoration dans un seul package configuré en ligne — sans négociation prestataire par prestataire, sans coordination à gérer, sans surprises de facturation. C'est aussi moins cher qu'un mariage monté pièce par pièce, grâce à la mutualisation sur plusieurs mariages au même endroit. Notre signature : 'Le seuil, pas le spectacle' — vous traversez ce moment, vous ne le gérez pas.",
    },
  ];

  const faqSchema = schemaFAQ(faqs);

  return (
    <div className="min-h-screen pt-20 bg-background">
      <SEO
        title="FAQ Mariage Clé en Main Beaujolais — Toutes vos Questions"
        description="Tout savoir sur notre formule mariage tout compris en Beaujolais : prix fixe, prestataires inclus, dates disponibles, personnalisation."
        canonical="https://lebeaumariage.fr/faq"
        jsonLd={faqSchema}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
            Vos questions, nos réponses
          </h1>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Tout ce que vous devez savoir sur Le Beau Mariage
          </p>

          <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)]">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-16">
            <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-12 text-center">
                <h3 className="text-3xl font-bold mb-4">Vous avez d'autres questions ?</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Notre équipe est là pour vous répondre
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center h-12 rounded-md px-10 text-base font-semibold bg-gradient-to-r from-or to-primary text-primary-foreground shadow-elegant hover:shadow-glow hover:scale-105 transition-all duration-300"
                >
                  Contactez-nous
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
