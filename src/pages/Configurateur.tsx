import SEO from "@/components/SEO";
import { schemaConfigurateur } from '@/lib/schemas';
import ConfigurateurShell from "@/components/configurateur/ConfigurateurShell";

const Configurateur = () => {
  return (
    <>
      <SEO
        title="Configurateur Mariage Beaujolais — Devis Instantané et Personnalisé"
        description="Configurez votre mariage en Beaujolais et obtenez un devis instantané. Nombre d'invités, formule repas, photographe, DJ — prix calculé en temps réel, sans surprise."
        canonical="https://lebeaumariage.fr/configurateur"
        jsonLd={schemaConfigurateur}
      />
      <ConfigurateurShell />
    </>
  );
};

export default Configurateur;
