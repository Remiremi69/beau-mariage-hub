import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  prenom?: string
  poste?: string
  couple?: string
  certificat_url?: string
  cercle_url?: string
}

const CertificatPartEmail = ({
  prenom,
  poste,
  couple,
  certificat_url,
  cercle_url,
}: Props) => {
  const p = prenom || 'Vous'
  const posteLabel = poste || 'une part'
  const coupleLabel = couple || 'des mariés'

  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>Votre part du mariage de {coupleLabel}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brandLabel}>LE CERCLE</Text>
          </Section>

          <Section>
            <Text style={paragraph}>
              {p}, vous portez{' '}
              <span style={posteHighlight}>{posteLabel.toLowerCase()}</span>.
            </Text>
            <Text style={paragraphItalic}>
              Le jour venu, il existera grâce à vous.
            </Text>
          </Section>

          {certificat_url && (
            <Section style={certificateWrap}>
              <Img
                src={certificat_url}
                alt={`Certificat de part — ${posteLabel}`}
                width="480"
                style={certificateImg}
              />
              <Section style={buttonWrapper}>
                <Button href={certificat_url} style={button}>
                  Télécharger votre certificat
                </Button>
              </Section>
            </Section>
          )}

          <Hr style={divider} />

          <Text style={paragraphSmall}>
            Si le cœur vous en dit, partagez le Cercle à un proche.
          </Text>
          {cercle_url && (
            <Text style={paragraphSmall}>
              <Link href={cercle_url} style={linkStyle}>
                {cercle_url}
              </Link>
            </Text>
          )}

          <Section style={signature}>
            <Text style={signatureName}>Le Beau Mariage</Text>
            <Text style={signatureContact}>remi@lebeaumariage.fr</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: CertificatPartEmail,
  subject: (data: Record<string, unknown>) =>
    `Votre part du mariage de ${(data?.couple as string) || 'nos mariés'}`,
  displayName: 'Certificat de part — Le Cercle',
  previewData: {
    prenom: 'Anto',
    poste: 'La matinée de préparation',
    couple: 'Camille & Julien',
    certificat_url: 'https://placehold.co/1080x1440/1A1814/C8A96E?text=Certificat',
    cercle_url: 'https://lebeaumariage.fr/cercle/exemple',
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
  textAlign: 'center' as const,
}

const brandLabel = {
  fontSize: '14px',
  letterSpacing: '0.4em',
  color: '#C8A96E',
  margin: 0,
  fontFamily: 'Arial, sans-serif',
}

const paragraph = {
  fontSize: '18px',
  color: '#1A1814',
  lineHeight: '1.6',
  margin: '0 0 14px',
}

const posteHighlight = {
  color: '#C8A96E',
  fontStyle: 'italic' as const,
}

const paragraphItalic = {
  fontSize: '16px',
  color: '#1A1814',
  lineHeight: '1.6',
  margin: '0 0 10px',
  fontStyle: 'italic' as const,
  opacity: 0.8,
}

const certificateWrap = {
  textAlign: 'center' as const,
  margin: '28px 0 8px',
}

const certificateImg = {
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
  margin: '0 auto',
  border: '1px solid #E8E0D0',
}

const buttonWrapper = {
  textAlign: 'center' as const,
  margin: '20px 0 8px',
}

const button = {
  backgroundColor: '#1A1814',
  color: '#F5F0E8',
  padding: '14px 32px',
  fontSize: '12px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  textDecoration: 'none',
  display: 'inline-block',
  fontFamily: 'Arial, sans-serif',
}

const divider = {
  borderTop: '1px solid #E8E0D0',
  margin: '32px 0 20px',
}

const paragraphSmall = {
  fontSize: '13px',
  color: '#666',
  lineHeight: '1.6',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}

const linkStyle = {
  color: '#C8A96E',
  textDecoration: 'none',
}

const signature = {
  paddingTop: '24px',
  marginTop: '24px',
  textAlign: 'center' as const,
}

const signatureName = {
  fontSize: '14px',
  color: '#1A1814',
  margin: '0 0 4px',
}

const signatureContact = {
  fontSize: '12px',
  color: '#C8A96E',
  margin: 0,
}
