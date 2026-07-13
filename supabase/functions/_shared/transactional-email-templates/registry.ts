/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as agentCommercialMessage } from './agent-commercial-message.tsx'
import { template as cercleInvitation } from './cercle-invitation.tsx'
import { template as certificatPart } from './certificat-part.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'agent-commercial-message': agentCommercialMessage,
  'cercle-invitation': cercleInvitation,
  'certificat-part': certificatPart,
}
