import SEO from "@/components/SEO";
import { schemaConfigurateur } from '@/lib/schemas';
import ConfigurateurShell from "@/components/configurateur/ConfigurateurShell";

const Configurateur = () => {
  return (
    <>
      <SEO
        title="Devis Mariage Beaujolais en 10 Minutes — Prix Fixe Tout Compris"
        description="Configurez votre mariage en Beaujolais et obtenez un devis instantané. Lieu, traiteur, photographe, DJ inclus. Prix transparent, sans surprise."
        canonical="https://lebeaumariage.fr/configurateur"
        jsonLd={schemaConfigurateur}
      />
      <ConfigurateurShell />
    </>
  );
};

export default Configurateur;
