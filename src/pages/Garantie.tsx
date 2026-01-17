import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Shield, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Garantie = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Nos Garanties | Le Beau Mariage, la Sérénité Assurée"
        description="Avec nos garanties zéro coût caché, qualité et flexibilité, organisez votre mariage en toute tranquillité d'esprit."
      />
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Notre Triple Garantie Sérénité
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Avec Le Beau Mariage, le seul risque que vous prenez, c'est d'être heureux.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Nous savons que s'engager dans l'organisation d'un mariage est une source de stress. 
              C'est pourquoi nous avons créé une garantie unique en France, conçue pour détruire vos peurs 
              et vous offrir une tranquillité d'esprit absolue. Voici nos 3 engagements fermes.
            </p>
          </div>
        </div>
      </section>

      {/* Garantie Anti-Imprévu */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  1. La Garantie Anti-Imprévu
                </h2>
                <p className="text-xl text-muted-foreground">La vie est pleine de surprises.</p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Contrairement à l'industrie du mariage où les acomptes sont 100% non-remboursables, 
              nous vous offrons une flexibilité totale.
            </p>

            <div className="bg-background rounded-lg overflow-hidden shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="px-6 py-4 text-left text-foreground font-semibold">
                      Délai avant le mariage
                    </th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">
                      Votre Garantie
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-6 py-4 text-foreground">Plus de 12 mois</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      Remboursement 100% de l'acompte
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-6 py-4 text-foreground">Entre 6 et 12 mois</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      Report sans frais sur une autre date disponible, ou remboursement de 50%
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-6 py-4 text-foreground">Moins de 6 mois</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      Report possible avec seulement 10% de frais de dossier
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Garantie Qualité Certifiée */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  2. La Garantie Qualité Certifiée
                </h2>
                <p className="text-xl text-muted-foreground">L'excellence ou rien.</p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Nous avons une confiance absolue dans nos prestataires, tous testés et certifiés. 
              En cas de défaillance objective et grave, nous vous dédommageons.
            </p>

            <div className="bg-card rounded-lg overflow-hidden shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/10">
                    <th className="px-6 py-4 text-left text-foreground font-semibold">
                      Problème Grave
                    </th>
                    <th className="px-6 py-4 text-left text-foreground font-semibold">
                      Votre Dédommagement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-6 py-4 text-foreground">
                      Traiteur : Intoxication alimentaire prouvée
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      Remboursement 100% du coût du traiteur
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-6 py-4 text-foreground">
                      Photographe : Fichiers corrompus / non livrés
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      Remboursement 100% du coût du photographe
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-6 py-4 text-foreground">
                      DJ : Absence ou panne majeure non résolue
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      Remboursement 100% du coût du DJ
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-6 py-4 text-foreground">
                      Lieu : Indisponibilité de dernière minute
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      Relogement dans un lieu équivalent ou supérieur + dédommagement 10%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Garantie Zéro Coût Caché */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <Tag className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  3. La Garantie Zéro Coût Caché
                </h2>
                <p className="text-xl text-muted-foreground">La transparence comme ADN.</p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground">
              Fini les devis à rallonge et les mauvaises surprises. Notre contrat est simple, clair et définitif. 
              Le prix que vous signez est le prix que vous payez. Point final.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">
            Prêt(e) à vous marier l'esprit léger ?
          </h2>
          <Link to="/serie-ete-2027">
            <Button size="xl" variant="hero" className="font-semibold">
              Découvrir nos séries de mariages
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Garantie;
