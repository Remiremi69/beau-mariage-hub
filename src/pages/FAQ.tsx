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
      question: "Le prix est-il vraiment fixe ?",
      answer:
        "Oui ! Le prix est garanti et tout compris pour 80 invités. Il inclut la privatisation du lieu, le traiteur, le photographe, le DJ, la décoration complète et la coordination du jour J. Des frais supplémentaires s'appliquent uniquement si vous souhaitez plus de 80 invités ou des options comme le photobooth ou le bar à cocktails.",
    },
    {
      question: "Peut-on personnaliser la décoration ?",
      answer:
        "Le thème et la décoration sont définis pour chaque série (ex: 'Bohème Chic' pour Octobre 2027). Cependant, vous pouvez personnaliser certains détails comme les couleurs des nappes, les menus individuels, et ajouter des touches personnelles (photos, petits objets). Notre coordinatrice vous guidera pour que la décoration vous ressemble tout en respectant le thème général.",
    },
    {
      question: "Comment se passe le mariage à la mairie ?",
      answer:
        "Le mariage civil à la mairie n'est pas inclus dans notre package, car il dépend de votre commune de résidence. Nous organisons uniquement la cérémonie laïque et la réception. Vous devrez donc organiser votre passage en mairie séparément, généralement quelques jours avant ou le matin même de votre mariage au domaine.",
    },
    {
      question: "Que se passe-t-il s'il pleut ?",
      answer:
        "Le Domaine de la Vigne d'Or dispose d'une magnifique grange rénovée entièrement couverte pouvant accueillir jusqu'à 120 invités. En cas de pluie, la cérémonie laïque peut être déplacée à l'intérieur dans un espace tout aussi charmant. Nous avons un plan B pour chaque étape de votre journée !",
    },
    {
      question: "Combien de temps à l'avance faut-il réserver ?",
      answer:
        "Les dates se réservent rapidement, surtout les samedis d'été. Nous vous recommandons de réserver au moins 6 à 12 mois à l'avance. Cependant, certaines dates peuvent être disponibles à plus court terme. N'hésitez pas à nous contacter pour connaître les disponibilités en temps réel.",
    },
    {
      question: "Peut-on visiter le domaine avant de réserver ?",
      answer:
        "Absolument ! Nous organisons des visites du domaine tous les mercredis et samedis après-midi. C'est l'occasion de découvrir les lieux, rencontrer notre coordinatrice, et poser toutes vos questions. Les visites sont gratuites et sans engagement. Contactez-nous pour réserver votre créneau.",
    },
    {
      question: "Y a-t-il des hébergements à proximité pour nos invités ?",
      answer:
        "Le Domaine de la Vigne d'Or est situé à Theizé, au cœur du Beaujolais. Il y a plusieurs options d'hébergement à proximité : chambres d'hôtes, hôtels et gîtes. Nous pouvons vous fournir une liste de nos partenaires hébergement avec des tarifs préférentiels pour vos invités.",
    },
    {
      question: "Que comprend exactement le forfait photographe ?",
      answer:
        "Notre photographe professionnel est présent 8 heures le jour J, de la préparation jusqu'à l'ouverture de bal. Vous recevez toutes les photos retouchées (environ 400-500 photos) sous 6 semaines, ainsi qu'une galerie en ligne privée pour les partager avec vos proches. Les photos de couple au coucher du soleil dans les vignes sont incluses !",
    },
    {
      question: "Pouvons-nous apporter notre propre DJ ou photographe ?",
      answer:
        "Notre concept repose sur la mutualisation avec des prestataires partenaires sélectionnés pour leur qualité. Nous ne pouvons donc pas accepter de prestataires extérieurs pour le DJ et le photographe. Cependant, nous garantissons des professionnels expérimentés qui ont déjà travaillé sur des dizaines de mariages.",
    },
    {
      question: "Comment se passe le paiement ?",
      answer:
        "Le paiement se fait en plusieurs fois : un acompte de 30% à la réservation pour bloquer votre date, puis 40% trois mois avant le mariage, et le solde (30%) un mois avant le jour J. Nous acceptons les paiements par virement bancaire et carte bancaire. Des facilités de paiement supplémentaires peuvent être discutées au cas par cas.",
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
