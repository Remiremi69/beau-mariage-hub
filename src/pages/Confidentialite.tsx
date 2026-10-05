import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { schemaPrivacy } from "@/lib/schemas";

const sections = [
  {
    title: "1. Responsable du traitement",
    body: (
      <>
        <p>
          Le traitement de vos données personnelles est assuré par Le Beau Mariage,
          joignable à l'adresse <a href="mailto:remi@lebeaumariage.fr" style={{ color: "#C9A96E" }}>remi@lebeaumariage.fr</a>.
        </p>
      </>
    ),
  },
  {
    title: "2. Données collectées",
    body: (
      <>
        <p>Selon votre utilisation du site, nous pouvons collecter :</p>
        <ul>
          <li><strong>Coordonnées</strong> : prénom, nom, adresse e-mail, téléphone (formulaire de contact, Composeur, Le Cercle).</li>
          <li><strong>Informations de votre projet</strong> : date de mariage envisagée, nombre d'invités, choix de configuration (Composeur).</li>
          <li><strong>Données de paiement</strong> : traitées exclusivement par notre prestataire de paiement Stripe. Nous ne stockons jamais vos données bancaires sur nos serveurs.</li>
          <li><strong>Données techniques</strong> : adresse IP, type de navigateur, pages visitées, à des fins de sécurité et de mesure d'audience.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Finalités et bases légales",
    body: (
      <>
        <ul>
          <li><strong>Répondre à vos demandes</strong> (contact, devis, esquisse PDF) — exécution de mesures précontractuelles ou intérêt légitime.</li>
          <li><strong>Gérer votre dossier de mariage</strong> (contrat, acompte, coordination, signature électronique) — exécution du contrat.</li>
          <li><strong>Fonctionnement du Cercle</strong> : transmettre les participations de vos proches — exécution du contrat avec le couple, les invités restant anonymes vis-à-vis des autres participants.</li>
          <li><strong>Mesure d'audience et sécurité du site</strong> — intérêt légitime.</li>
        </ul>
        <p>Nous ne vous enverrons pas de prospection commerciale sans votre consentement explicite, et chaque e-mail contient un lien de désinscription.</p>
      </>
    ),
  },
  {
    title: "4. Destinataires et sous-traitants",
    body: (
      <>
        <p>Vos données ne sont ni vendues, ni louées. Elles peuvent être traitées par des prestataires strictement nécessaires :</p>
        <ul>
          <li><strong>Hébergement et bases de données</strong> : Lovable Cloud (infrastructure hébergée en Europe).</li>
          <li><strong>Paiements</strong> : Stripe (traitement sécurisé des acomptes et contributions).</li>
          <li><strong>Envoi d'e-mails transactionnels</strong> : service d'e-mail intégré à notre plateforme.</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Durée de conservation",
    body: (
      <>
        <ul>
          <li>Demandes de contact et esquisse : 24 mois après le dernier échange.</li>
          <li>Dossier client : durée du contrat, puis 5 ans (obligations comptables et légales).</li>
          <li>Certificats et contributions du Cercle : 12 mois après la publication de la liste, sauf demande de suppression.</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Vos droits",
    body: (
      <>
        <p>
          Conformément au RGPD, vous disposez des droits d'accès, de rectification, d'effacement,
          de limitation, de portabilité et d'opposition. Pour les exercer, écrivez à{" "}
          <a href="mailto:remi@lebeaumariage.fr" style={{ color: "#C9A96E" }}>remi@lebeaumariage.fr</a>.
          Nous répondons sous 30 jours maximum.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL
          (www.cnil.fr) si vous estimez que vos droits ne sont pas respectés.
        </p>
      </>
    ),
  },
  {
    title: "7. Cookies",
    body: (
      <>
        <p>
          Le site utilise uniquement les cookies strictement nécessaires à son
          fonctionnement (session, sécurité, préférences). Aucun cookie publicitaire
          ou de suivi tiers n'est déposé sans votre consentement.
        </p>
      </>
    ),
  },
  {
    title: "8. Sécurité",
    body: (
      <>
        <p>
          Les données sont chiffrées en transit (HTTPS) et hébergées sur une
          infrastructure sécurisée. Les accès sont limités aux personnes habilitées.
        </p>
      </>
    ),
  },
  {
    title: "9. Mise à jour",
    body: (
      <>
        <p>
          Cette politique peut évoluer. La date de dernière mise à jour figure en bas de page.
        </p>
      </>
    ),
  },
];

const Confidentialite = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Politique de confidentialité"
        description="Politique de confidentialité du site Le Beau Mariage : données collectées, finalités, durée de conservation, vos droits RGPD et contacts."
        canonical="https://lebeaumariage.fr/confidentialite"
        jsonLd={schemaPrivacy}
      />
      <Navigation />

      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <p
            className="uppercase mb-4"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: "#C9A96E",
            }}
          >
            Informations légales
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl mb-10 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1814" }}
          >
            Politique de confidentialité
          </h1>
          <p className="mb-12" style={{ fontFamily: "'Jost', sans-serif", color: "#A0998A", fontSize: "15px" }}>
            Le Beau Mariage accorde la plus grande attention à la protection de vos
            données personnelles. Cette page explique quelles informations nous
            collectons, pourquoi, et ce que vous pouvez en faire.
          </p>

          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.title}>
                <div className="w-full h-0.5 mb-6" style={{ backgroundColor: "#C9A96E" }} />
                <h2
                  className="text-xl sm:text-2xl font-semibold mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1814" }}
                >
                  {section.title}
                </h2>
                <div
                  className="space-y-4 leading-relaxed"
                  style={{ fontFamily: "'Jost', sans-serif", color: "#A0998A", fontSize: "15px" }}
                >
                  {section.body}
                </div>
              </div>
            ))}
          </div>

          <p
            className="mt-16 text-sm italic"
            style={{ fontFamily: "'Jost', sans-serif", color: "#A0998A" }}
          >
            Dernière mise à jour : octobre 2026
          </p>

          <div className="mt-16 text-center">
            <p className="text-sm italic font-['Cormorant_Garamond',serif]" style={{ color: "#C9A96E", letterSpacing: "0.05em" }}>
              Le seuil, pas le spectacle.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Confidentialite;
