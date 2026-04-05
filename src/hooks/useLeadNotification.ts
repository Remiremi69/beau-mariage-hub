import { useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export const useLeadNotification = () => {
  useEffect(() => {
    const channel = supabase
      .channel('new_leads')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'configurateur_leads',
        },
        (payload) => {
          try {
            if (Notification.permission === 'granted') {
              const data = payload.new as Record<string, unknown>
              const prenom = (data.prenom as string) || ''
              const nom = (data.nom as string) || ''
              const dateMariage = (data.date_mariage as string) || ''
              const total = (data.total_estimate as number) || 0
              const localisation = (data.localisation as string) || ''

              const locLine = localisation === 'distance'
                ? '📦 Coffret à expédier'
                : localisation === 'local'
                  ? '🍽️ Dégustation sur site'
                  : ''

              new Notification('🔔 Nouveau lead Limen !', {
                body: `${prenom} ${nom}\n${dateMariage}\n${total.toLocaleString('fr-FR')} €${locLine ? '\n' + locLine : ''}`,
                icon: '/favicon.ico',
              })
            }
          } catch {
            // Notification API not available
          }
          console.log('🔔 Nouveau lead:', payload.new)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])
}
