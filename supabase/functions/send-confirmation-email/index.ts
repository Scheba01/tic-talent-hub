import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  name: string;
  email: string;
  telefono?: string;
  familiasRol: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, telefono, familiasRol }: ConfirmationEmailRequest = await req.json();

    console.log(`Sending confirmation email to: ${email} for ${name}`);

    const emailResponse = await resend.emails.send({
      from: "Contact@ticselect.com",
      to: [email],
      subject: "¡Registro exitoso en TIC Select!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación de Registro - TIC Select</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .header { text-align: center; border-bottom: 2px solid #22c55e; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { color: #22c55e; font-size: 24px; font-weight: bold; }
            .content { margin-bottom: 30px; }
            .highlight { background-color: #f0fdf4; padding: 15px; border-left: 4px solid #22c55e; margin: 20px 0; }
            .footer { text-align: center; border-top: 1px solid #eee; padding-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">TIC SELECT</div>
              <h1 style="color: #22c55e; margin: 10px 0;">¡Bienvenido/a a TIC Select!</h1>
            </div>
            
            <div class="content">
              <h2>Hola ${name},</h2>
              
              <p>¡Gracias por registrarte en nuestro <strong>Programa de Talento TIC</strong>!</p>
              
              <div class="highlight">
                <h3>📋 Resumen de tu registro:</h3>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ''}
                <p><strong>Familias de rol seleccionadas:</strong> ${familiasRol.join(', ')}</p>
              </div>
              
              <h3>¿Qué sigue ahora?</h3>
              <ul>
                <li>✅ Hemos recibido tu información y documentos</li>
                <li>🔍 Nuestro equipo revisará tu perfil profesional</li>
                <li>📞 Te contactaremos en los próximos días laborales</li>
                <li>🚀 Te mantendremos informado sobre oportunidades que coincidan con tu perfil</li>
              </ul>
              
              <p>Mientras tanto, te invitamos a:</p>
              <ul>
                <li>📱 Seguirnos en nuestras redes sociales</li>
                <li>🌐 Visitar nuestro sitio web para conocer más sobre nosotros</li>
                <li>💼 Explorar las oportunidades laborales disponibles</li>
              </ul>
            </div>
            
            <div class="footer">
              <p><strong>TIC Select</strong></p>
              <p>Conectando talento TIC con oportunidades excepcionales</p>
              <p>📧 Contact@ticselect.com | 🌐 www.ticselect.com</p>
              <p style="font-size: 12px; color: #999;">Este es un mensaje automático, por favor no respondas a este email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Confirmation email sent successfully",
      id: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        details: error.stack 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);