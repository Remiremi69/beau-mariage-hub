import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { schemaConcept } from '@/lib/schemas';

const pillars = [
  { number: "5", title: "Mariages par an", text: "Pas un de plus. La rareté n'est pas un argument — c'est ce qui garantit une attention totale à chaque couple." },
  { number: "1", title: "Domaine. Une équipe.", text: "Chaque prestataire connaît le lieu par cœur. Chaque répétition affine l'exécution — sans jamais répéter votre mariage." },
  { number: "0", title: "Décision à prendre le jour J.", text: "Tout est réglé avant que vous arriviez. Vous n'avez qu'une chose à faire : être là." },
];

const inclusions = [
  { title: "Le domaine", text: "Domaine de la Croix Rochefort, Beaujolais. Cadre, hébergement, espaces cérémonie et réception." },
  { title: "La gastronomie", text: "Traiteur sélectionné, menus conçus pour le domaine. Aucune coordination de votre part." },
  { title: "La photographie", text: "Photographe et vidéaste partenaires. Présents du début à la fin." },
  { title: "La musique", text: "DJ ou groupe selon votre ambiance. Briefé bien avant votre jour J." },
  { title: "La décoration", text: "Ambiance choisie lors de la configuration. Installée, retirée — sans vous." },
  { title: "La coordination", text: "Un Gardien Limen dédié, présent de la première heure au dernier instant." },
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
                <span className="block mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '80px', lineHeight: 1, color: '#C9A96E' }}>
                  {p.number}
                </span>
                <h3 className="text-lg md:text-xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E8' }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed max-w-xs" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
                  {p.text}
                </p>

                {/* Séparateur mobile */}
                {i < pillars.length - 1 && (
                  <div className="md:hidden mx-auto mt-8 mb-8 w-px h-10" style={{ backgroundColor: '#C9A96E' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section inclusions */}
      <section className="bg-background" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1A1814' }}>
            Tout est déjà prêt.
          </h2>
          <p className="text-lg md:text-xl mb-16 max-w-2xl mx-auto" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
            Chaque forfait Le Beau Mariage inclut, sans exception et sans supplément&nbsp;:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 text-left">
            {inclusions.map((item, i) => (
              <div key={i}>
                <div className="w-full h-0.5 mb-6" style={{ backgroundColor: '#C9A96E' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1A1814' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: '#A0998A' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link to="/configurateur">
              <button
                className="uppercase tracking-widest font-medium"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  backgroundColor: '#C9A96E',
                  color: '#0D0E12',
                  borderRadius: 0,
                  padding: '18px 48px',
                  letterSpacing: '0.1em',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Configurer mon mariage →
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Concept;
