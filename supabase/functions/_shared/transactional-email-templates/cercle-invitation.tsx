import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Limen — Le Beau Mariage'

interface CercleInvitationProps {
  prenom?: string
  lien_gestion?: string
  nb_parts?: number
}

const CercleInvitationEmail = ({
  prenom,
  lien_gestion,
  nb_parts,
}: CercleInvitationProps) => {
  const greeting = prenom ? `Bonjour ${prenom},` : 'Bonjour,'

  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>Votre Cercle est prêt — les parts de votre mariage vous attendent</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brandLabel}>LIMEN</Text>
            <Text style={brandSubtitle}>Le Cercle</Text>
          </Section>

          <Section style={contentSection}>
            <Text style={greetingStyle}>{greeting}</Text>

            <Text style={paragraph}>
              Votre Esquisse a été traduite en parts.{' '}
              {typeof nb_parts === 'number' ? `${nb_parts} fragments` : 'Chaque fragment'}
              {' '}du jour venu — d'une fleur du portique à la nuit au Domaine —
              sont désormais réunis dans votre Cercle.
            </Text>

            <Text style={paragraph}>
              Ce lien vous ouvre l'accès à votre Cercle : vous pouvez le lire,
              ajuster une part, écrire un mot, puis le publier quand il vous
              ressemblera.
            </Text>

            <Section style={buttonWrapper}>
              <Button href={lien_gestion} style={button}>
                Ouvrir mon Cercle
              </Button>
            </Section>

            <Text style={paragraphSmall}>
              Ce lien est personnel. Conservez-le, il est votre unique clé
              d'accès en écriture.
            </Text>
          </Section>

          <Section style={signature}>
            <Text style={signatureName}>Rémi</Text>
            <Text style={signatureRole}>{SITE_NAME}</Text>
            <Text style={signatureContact}>remi@lebeaumariage.fr</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: CercleInvitationEmail,
  subject: 'Votre Cercle est prêt',
  displayName: 'Invitation à gérer le Cercle',
  previewData: {
    prenom: 'Camille',
    lien_gestion: 'https://lebeaumariage.fr/cercle/gerer/exemple-token',
    nb_parts: 18,
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Georgia, "Times New Roman", serif',
  margin: 0,
  padding: 0,
}

const container = {
  margin: '0 auto',
  padding: '40px 24px',
  maxWidth: '560px',
}

const header = {
  borderBottom: '1px solid #1A1814',
  paddingBottom: '20px',
  marginBottom: '32px',
}

const brandLabel = {
  fontSize: '20px',
  letterSpacing: '0.3em',
  color: '#1A1814',
  margin: '0 0 4px',
  fontWeight: 'bold' as const,
}

const brandSubtitle = {
  fontSize: '12px',
  letterSpacing: '0.2em',
  color: '#C8A96E',
  margin: 0,
  textTransform: 'uppercase' as const,
}

const contentSection = {
  marginBottom: '32px',
}

const greetingStyle = {
  fontSize: '16px',
  color: '#1A1814',
  margin: '0 0 20px',
  lineHeight: '1.6',
}

const paragraph = {
  fontSize: '15px',
  color: '#1A1814',
  lineHeight: '1.7',
  margin: '0 0 18px',
}

const paragraphSmall = {
  fontSize: '13px',
  color: '#666',
  lineHeight: '1.6',
  margin: '20px 0 0',
  fontStyle: 'italic' as const,
}

const buttonWrapper = {
  textAlign: 'center' as const,
  margin: '28px 0 8px',
}

const button = {
  backgroundColor: '#1A1814',
  color: '#F5F0E8',
  padding: '14px 32px',
  fontSize: '13px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  textDecoration: 'none',
  display: 'inline-block',
  fontFamily: 'Arial, sans-serif',
}

const signature = {
  borderTop: '1px solid #E8E0D0',
  paddingTop: '24px',
  marginTop: '32px',
}

const signatureName = {
  fontSize: '15px',
  color: '#1A1814',
  margin: '0 0 4px',
  fontWeight: 'bold' as const,
}

const signatureRole = {
  fontSize: '13px',
  color: '#1A1814',
  margin: '0 0 4px',
}

const signatureContact = {
  fontSize: '13px',
  color: '#C8A96E',
  margin: 0,
}
