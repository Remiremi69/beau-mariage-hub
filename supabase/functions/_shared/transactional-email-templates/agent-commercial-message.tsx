import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Limen — Le Beau Mariage'

interface AgentCommercialMessageProps {
  prenom?: string
  bodyText?: string
}

const AgentCommercialMessageEmail = ({
  prenom,
  bodyText,
}: AgentCommercialMessageProps) => {
  const greeting = prenom ? `Bonjour ${prenom},` : 'Bonjour,'
  const paragraphs = (bodyText ?? '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)

  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>Votre mariage au Domaine de la Croix Rochefort — Limen</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brandLabel}>LIMEN</Text>
            <Text style={brandSubtitle}>Le Beau Mariage</Text>
          </Section>

          <Section style={contentSection}>
            <Text style={greetingStyle}>{greeting}</Text>
            {paragraphs.length > 0 ? (
              paragraphs.map((para, i) => (
                <Text key={i} style={paragraph}>
                  {para.split('\n').map((line, j, arr) => (
                    <React.Fragment key={j}>
                      {line}
                      {j < arr.length - 1 ? <br /> : null}
                    </React.Fragment>
                  ))}
                </Text>
              ))
            ) : (
              <Text style={paragraph}>{bodyText}</Text>
            )}
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
  component: AgentCommercialMessageEmail,
  subject: 'Votre mariage au Domaine de la Croix Rochefort — Limen',
  displayName: 'Message agent commercial',
  previewData: {
    prenom: 'Camille',
    bodyText:
      "Merci d'avoir configuré votre mariage avec Limen.\n\nJ'ai pris le temps de regarder vos choix et je serais ravi d'échanger avec vous pour affiner ensemble les derniers détails.\n\nÀ très vite,",
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
