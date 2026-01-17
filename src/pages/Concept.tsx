import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
import SEO from "@/components/SEO";

const Concept = () => {
  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Le Concept Le Beau Mariage | Des Mariages d'Exception Simplifiés"
        description="Découvrez notre concept innovant de mariages en séries qui rend le luxe accessible. Qualité, simplicité et transparence."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
            Plus qu'un mariage, une révolution.
          </h1>

          <Card className="mb-12 border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)]">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-primary">Le Problème</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Organiser un mariage est devenu un parcours du combattant : budget qui explose,
                stress des préparatifs, complexité logistique... Le coût moyen d'un mariage en
                France dépasse souvent les 15 000 €, sans garantie de qualité.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-secondary">Notre Solution</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chez Le Beau Mariage, nous avons réinventé le modèle. En mutualisant les coûts sur
                une série de mariages dans un même lieu, nous vous donnons accès à des prestataires
                et une décoration haut de gamme pour un prix fixe et transparent de 12 990 €.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-4xl font-bold text-center mb-8">
            Le Beau Mariage vs Mariage Traditionnel
          </h2>

          <Card className="border-none shadow-[0_10px_40px_-10px_hsl(14_71%_67%/0.2)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/10 hover:bg-primary/10">
                  <TableHead className="font-bold text-foreground">Critère</TableHead>
                  <TableHead className="font-bold text-foreground">Mariage Traditionnel</TableHead>
                  <TableHead className="font-bold text-foreground">Le Beau Mariage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">Prix moyen</TableCell>
                  <TableCell className="text-destructive">15 000 € - 20 000 €</TableCell>
                  <TableCell className="text-secondary font-bold">12 990 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Niveau de stress</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <X className="h-5 w-5 text-destructive" />
                      <span className="text-destructive">Élevé</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-secondary" />
                      <span className="text-secondary font-semibold">Zéro</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Qualité</TableCell>
                  <TableCell>Variable</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-secondary" />
                      <span className="text-secondary font-semibold">Garantie</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Organisation</TableCell>
                  <TableCell className="text-destructive">12-18 mois</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-secondary" />
                      <span className="text-secondary font-semibold">Clé-en-main</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Coordination</TableCell>
                  <TableCell>À votre charge</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-secondary" />
                      <span className="text-secondary font-semibold">Incluse</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Prestataires</TableCell>
                  <TableCell>À rechercher vous-même</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-secondary" />
                      <span className="text-secondary font-semibold">Déjà sélectionnés</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>

          {/* CTA après tableau comparatif */}
          <div className="mt-12 text-center">
            <Link to="/serie-ete-2027">
              <Button size="lg" variant="hero" className="font-semibold">
                Voir nos séries disponibles
              </Button>
            </Link>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold mb-6">Le secret de notre modèle</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">1</div>
                  <h4 className="font-semibold mb-2">Mutualisation</h4>
                  <p className="text-sm text-muted-foreground">
                    Plusieurs mariages au même endroit = coûts partagés
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-secondary mb-2">2</div>
                  <h4 className="font-semibold mb-2">Négociation</h4>
                  <p className="text-sm text-muted-foreground">
                    Partenariats exclusifs avec les meilleurs prestataires
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    🌿 Éco
                  </span>
                </div>
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-sand mb-2">3</div>
                  <h4 className="font-semibold mb-2">Optimisation Écologique</h4>
                  <p className="text-sm text-muted-foreground">
                    Notre système de "Décoration Responsable Premium" nous permet de créer des ambiances magnifiques tout en minimisant les déchets. Chaque élément est réutilisé pour plusieurs mariages, réduisant ainsi l'impact environnemental de 80%.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concept;
