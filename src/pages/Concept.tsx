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
import { schemaConcept } from '@/lib/schemas';

const Concept = () => {
  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Comment ça marche — Mariage Tout Compris Beaujolais sans Stress"
        description="Le concept Le Beau Mariage : un lieu d'exception en Beaujolais, des prestataires certifiés, un prix fixe transparent. Zéro organisation, 100% présence."
        canonical="https://lebeaumariage.fr/concept"
        jsonLd={schemaConcept}
      />
      {/* Section d'ouverture */}
      <section className="flex flex-col items-center justify-center text-center" style={{ backgroundColor: '#0D0E12', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E8' }}>
            Un rite de passage ne se gère pas.
          </h1>
          <p className="text-3xl md:text-5xl italic mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}>
            Il se traverse.
          </p>
          <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
            Le Beau Mariage existe pour une raison précise : que vous soyez entièrement présents à votre propre mariage. Pas en train de surveiller, vérifier, coordonner.<br /><br />Traverser — c'est tout.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">


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
                  <div className="text-4xl font-bold text-or mb-2">3</div>
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
