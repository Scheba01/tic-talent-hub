import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

export const EmailTest = () => {
  const [sending, setSending] = useState(false)

  const sendTestEmail = async () => {
    setSending(true)
    try {
      const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
        body: {
          name: 'Test User - TIC Select Demo',
          email: 'bills.orders@gmail.com',
          telefono: '+56912345678',
          familiasRol: ['laboratorio', 'inspección', 'certificación de sistemas']
        }
      })

      if (error) {
        console.error('Error sending email:', error)
        toast.error('Error enviando email: ' + error.message)
      } else {
        console.log('Email sent successfully:', data)
        toast.success('¡Email de prueba enviado exitosamente a bills.orders@gmail.com!')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error enviando email')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Test Email System</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This will send a test confirmation email to bills.orders@gmail.com
      </p>
      <Button 
        onClick={sendTestEmail} 
        disabled={sending}
        className="w-full"
      >
        {sending ? 'Enviando...' : 'Enviar Email de Prueba'}
      </Button>
    </div>
  )
}

export default EmailTest