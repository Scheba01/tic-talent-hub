import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  nombre: string;
  email: string;
  empresa?: string;
  telefono?: string;
  tipo_consulta?: string;
  mensaje: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }

  try {
    const formData: ContactFormData = await req.json();

    // Validate required fields
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: nombre, email, mensaje' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert the contact form submission into the database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          nombre: formData.nombre,
          email: formData.email,
          empresa: formData.empresa || null,
          telefono: formData.telefono || null,
          tipo_consulta: formData.tipo_consulta || null,
          mensaje: formData.mensaje,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save contact form submission' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    console.log('Contact form submitted successfully:', data);

    // Send email notification
    try {
      const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
      
      const emailContent = `
        <h2>Nueva consulta de contacto - TIC Select</h2>
        <p><strong>Nombre:</strong> ${formData.nombre}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${formData.empresa ? `<p><strong>Empresa:</strong> ${formData.empresa}</p>` : ''}
        ${formData.telefono ? `<p><strong>Teléfono:</strong> ${formData.telefono}</p>` : ''}
        ${formData.tipo_consulta ? `<p><strong>Tipo de consulta:</strong> ${formData.tipo_consulta}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <p>${formData.mensaje.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Enviado desde el formulario de contacto de ticselect.com</small></p>
      `;

      const emailResponse = await resend.emails.send({
        from: 'TIC Select Contact <onboarding@resend.dev>',
        to: ['contacto@ticselect.com'],
        subject: `Nueva consulta: ${formData.tipo_consulta || 'Contacto general'} - ${formData.nombre}`,
        html: emailContent,
      });

      console.log('Email sent successfully:', emailResponse);
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Don't fail the request if email fails, just log it
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully',
        id: data.id 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
};

serve(handler);