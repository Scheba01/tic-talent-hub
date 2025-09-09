import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

export const EmailTest = () => {
  const [sending, setSending] = useState(false)

  const sendTestEmail = async () => {
    setSending(true)
    try {
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: {
          nombre: 'Test User - Email Validation',
          email: 'bills.orders@gmail.com',
          empresa: 'TIC Select Test',
          telefono: '+56912345678',
          tipo_consulta: 'test-email',
          mensaje: 'This is a test email to validate the contact form email system is working properly.'
        }
      })

      if (error) {
        console.error('Error sending email:', error)
        toast.error('Error enviando email: ' + error.message)
      } else {
        console.log('Email sent successfully:', data)
        toast.success('¡Formulario de contacto enviado! Revisa contacto@ticselect.com para el email.')
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
      <h3 className="text-lg font-semibold mb-4">Test Contact Form Email</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This will submit a test contact form to validate email delivery to contacto@ticselect.com
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