import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const hookSecret = Deno.env.get("AUTH_WEBHOOK_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Custom auth email function started, method:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!hookSecret) {
      throw new Error("AUTH_WEBHOOK_SECRET not configured");
    }

    const payload = await req.text();
    const headers = Object.fromEntries(req.headers);
    const wh = new Webhook(hookSecret);
    
    const {
      user,
      email_data: { token_hash, redirect_to, email_action_type }
    } = wh.verify(payload, headers) as {
      user: {
        email: string;
        raw_user_meta_data?: {
          full_name?: string;
        };
      };
      email_data: {
        token_hash: string;
        redirect_to: string;
        email_action_type: string;
      };
    };

    console.log(`Processing auth email for: ${user.email}, action: ${email_action_type}`);

    // Handle signup confirmations
    if (email_action_type === 'signup') {
      const userName = user.raw_user_meta_data?.full_name || user.email.split('@')[0];
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const confirmationUrl = `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`;

      const emailResponse = await resend.emails.send({
        from: "TIC Select <noreply@ticselect.com>",
        to: [user.email],
        subject: "¡Confirma tu cuenta en TIC Select!",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirma tu cuenta - TIC Select</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
              .header { text-align: center; border-bottom: 2px solid #22c55e; padding-bottom: 20px; margin-bottom: 30px; }
              .logo { color: #22c55e; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
              .content { margin-bottom: 30px; }
              .confirm-button { 
                display: inline-block; 
                padding: 12px 30px; 
                background-color: #22c55e; 
                color: white; 
                text-decoration: none; 
                border-radius: 5px; 
                font-weight: bold;
                margin: 20px 0;
              }
              .footer { text-align: center; border-top: 1px solid #eee; padding-top: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">TIC SELECT</div>
                <h1 style="color: #22c55e; margin: 10px 0;">¡Confirma tu cuenta!</h1>
              </div>
              
              <div class="content">
                <h2>Hola ${userName},</h2>
                
                <p>¡Gracias por registrarte en <strong>TIC Select</strong>! Estás a un paso de acceder a las mejores oportunidades laborales en el sector TIC.</p>
                
                <p>Para completar tu registro y activar tu cuenta, simplemente haz clic en el botón de abajo:</p>
                
                <div style="text-align: center;">
                  <a href="${confirmationUrl}" class="confirm-button">
                    ✅ Confirmar mi cuenta
                  </a>
                </div>
                
                <p><strong>¿Qué podrás hacer una vez confirmada tu cuenta?</strong></p>
                <ul>
                  <li>🚀 Registrar tu perfil profesional completo</li>
                  <li>📄 Subir tu CV y documentos</li>
                  <li>💼 Acceder a oportunidades laborales exclusivas</li>
                  <li>🎯 Recibir ofertas personalizadas según tu perfil</li>
                </ul>
                
                <p style="color: #666; font-size: 14px;">
                  Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:<br>
                  <a href="${confirmationUrl}" style="color: #22c55e; word-break: break-all;">${confirmationUrl}</a>
                </p>
              </div>
              
              <div class="footer">
                <p><strong>TIC Select</strong></p>
                <p>Conectando talento TIC con oportunidades excepcionales</p>
                <p>📧 Contact@ticselect.com | 🌐 www.ticselect.com</p>
                <p style="font-size: 12px; color: #999;">
                  Si no solicitaste esta cuenta, puedes ignorar este email de forma segura.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      console.log("Custom confirmation email sent successfully:", emailResponse);
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Custom confirmation email sent successfully"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    // Handle password recovery
    if (email_action_type === 'recovery') {
      const userName = user.raw_user_meta_data?.full_name || user.email.split('@')[0];
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const resetUrl = `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`;

      const emailResponse = await resend.emails.send({
        from: "TIC Select <noreply@ticselect.com>",
        to: [user.email],
        subject: "Restablece tu contraseña - TIC Select",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Restablece tu contraseña - TIC Select</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
              .header { text-align: center; border-bottom: 2px solid #e11d48; padding-bottom: 20px; margin-bottom: 30px; }
              .logo { color: #e11d48; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
              .content { margin-bottom: 30px; }
              .reset-button { 
                display: inline-block; 
                padding: 12px 30px; 
                background-color: #e11d48; 
                color: white; 
                text-decoration: none; 
                border-radius: 5px; 
                font-weight: bold;
                margin: 20px 0;
              }
              .footer { text-align: center; border-top: 1px solid #eee; padding-top: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">TIC SELECT</div>
                <h1 style="color: #e11d48; margin: 10px 0;">Restablece tu contraseña</h1>
              </div>
              
              <div class="content">
                <h2>Hola ${userName},</h2>
                
                <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>TIC Select</strong>.</p>
                
                <p>Si fuiste tú quien solicitó este cambio, haz clic en el botón de abajo para crear una nueva contraseña:</p>
                
                <div style="text-align: center;">
                  <a href="${resetUrl}" class="reset-button">
                    🔑 Restablecer contraseña
                  </a>
                </div>
                
                <p><strong>Importante:</strong></p>
                <ul>
                  <li>⏰ Este enlace expirará en 1 hora por seguridad</li>
                  <li>🔒 Solo puedes usar este enlace una vez</li>
                  <li>🚨 Si no solicitaste este cambio, ignora este email</li>
                </ul>
                
                <p style="color: #666; font-size: 14px;">
                  Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:<br>
                  <a href="${resetUrl}" style="color: #e11d48; word-break: break-all;">${resetUrl}</a>
                </p>
              </div>
              
              <div class="footer">
                <p><strong>TIC Select</strong></p>
                <p>Conectando talento TIC con oportunidades excepcionales</p>
                <p>📧 Contact@ticselect.com | 🌐 www.ticselect.com</p>
                <p style="font-size: 12px; color: #999;">
                  Si no solicitaste este cambio de contraseña, puedes ignorar este email de forma segura.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      console.log("Password reset email sent successfully:", emailResponse);
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Password reset email sent successfully"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    // For any other email action types, just return success without sending
    return new Response(JSON.stringify({ message: "Email action not handled by this webhook" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });


  } catch (error: any) {
    console.error("Error in custom-auth-email function:", error);
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