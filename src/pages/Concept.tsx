import SEO from "@/components/SEO";
import { schemaConcept } from '@/lib/schemas';

const pillars = [
  { number: "5", title: "Mariages par an", text: "Pas un de plus. La rareté n'est pas un argument — c'est ce qui garantit une attention totale à chaque couple." },
  { number: "1", title: "Domaine. Une équipe.", text: "Chaque prestataire connaît le lieu par cœur. Chaque répétition affine l'exécution — sans jamais répéter votre mariage." },
  { number: "0", title: "Décision à prendre le jour J.", text: "Tout est réglé avant que vous arriviez. Vous n'avez qu'une chose à faire : être là." },
];

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

      {/* Section piliers */}
      <section className="text-center" style={{ backgroundColor: '#0D0E12', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E8' }}>
            Cinq mariages. Un lieu. Une équipe.
          </h2>
          <p className="text-xl md:text-2xl italic mb-16" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}>
            Ce n'est pas une contrainte. C'est ce qui rend tout possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {pillars.map((p, i) => (
              <div key={i} className="flex flex-col items-center px-8">
                {/* Séparateur vertical entre blocs (visible uniquement entre les blocs) */}
                {i > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10" style={{ backgroundColor: '#C9A96E' }} />
                )}
                <div className="relative flex flex-col items-center">
                  <span className="block mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '80px', lineHeight: 1, color: '#C9A96E' }}>
                    {p.number}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E8' }}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-xs" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
                    {p.text}
                  </p>
                </div>

                {/* Ligne séparatrice mobile entre blocs */}
                {i < pillars.length - 1 && (
                  <div className="md:hidden mx-auto mt-8 mb-8 w-px h-10" style={{ backgroundColor: '#C9A96E' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Concept;
