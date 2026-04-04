import SEO from "@/components/SEO";
import ConfigurateurShell from "@/components/configurateur/ConfigurateurShell";

const Configurateur = () => {
  return (
    <>
      <SEO
        title="Configurateur de Mariage | Créez Votre Devis en 10 Minutes"
        description="Personnalisez votre mariage en quelques clics. Obtenez un devis instantané et transparent pour votre mariage de rêve."
      />
      <ConfigurateurShell />
    </>
  );
};

export default Configurateur;
