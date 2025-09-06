import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const PoliticasCookies = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Set document title and meta description for SEO
    const originalTitle = document.title;
    document.title = "Política de Cookies | TIC SELECT - Gestión de Cookies";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content');
    metaDescription?.setAttribute('content', 'Política de cookies de TIC SELECT. Información sobre el uso de cookies en nuestro sitio web y cómo gestionarlas.');

    // OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const originalOgTitle = ogTitle?.getAttribute('content');
    const originalOgDescription = ogDescription?.getAttribute('content');
    
    ogTitle?.setAttribute('content', 'Política de Cookies | TIC SELECT');
    ogDescription?.setAttribute('content', 'Política de cookies de TIC SELECT. Información sobre el uso de cookies en nuestro sitio web y cómo gestionarlas.');

    return () => {
      // Cleanup: restore original values
      document.title = originalTitle;
      if (originalDescription) metaDescription?.setAttribute('content', originalDescription);
      if (originalOgTitle) ogTitle?.setAttribute('content', originalOgTitle);
      if (originalOgDescription) ogDescription?.setAttribute('content', originalOgDescription);
    };
  }, []);

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`${window.location.origin}/politica-de-cookies`} />
        <meta property="og:url" content={`${window.location.origin}/politica-de-cookies`} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Política de Cookies
              </h1>
              <p className="text-xl text-muted-foreground">
                Información sobre el uso de cookies en TIC SELECT
              </p>
            </header>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>¿Qué son las cookies?</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                  <p>
                    Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. 
                    Nos permiten recordar sus preferencias y mejorar su experiencia de navegación en TIC SELECT.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tipos de cookies que utilizamos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                  <h3>Cookies esenciales</h3>
                  <p>
                    Estas cookies son necesarias para el funcionamiento básico del sitio web y no pueden desactivarse. 
                    Incluyen cookies de autenticación, preferencias de idioma y configuraciones de seguridad.
                  </p>
                  
                  <h3>Cookies de rendimiento</h3>
                  <p>
                    Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, recopilando información 
                    de forma anónima sobre páginas visitadas y errores encontrados.
                  </p>
                  
                  <h3>Cookies de funcionalidad</h3>
                  <p>
                    Permiten que el sitio web recuerde las elecciones que hace (como su idioma preferido) 
                    y proporcionen características mejoradas y más personales.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cookies de terceros</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                  <p>
                    Utilizamos algunos servicios de terceros que pueden establecer sus propias cookies:
                  </p>
                  <ul>
                    <li><strong>Google Analytics:</strong> Para analizar el tráfico y uso del sitio web</li>
                    <li><strong>LinkedIn:</strong> Para funcionalidades de redes sociales</li>
                    <li><strong>reCAPTCHA:</strong> Para protección contra spam y bots</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gestión de cookies</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                  <p>
                    Puede controlar y gestionar las cookies de varias maneras:
                  </p>
                  <ul>
                    <li>Configurar su navegador para rechazar todas las cookies</li>
                    <li>Configurar su navegador para que le notifique cuando se envíe una cookie</li>
                    <li>Eliminar las cookies que ya están en su dispositivo</li>
                  </ul>
                  <p>
                    <strong>Nota:</strong> Si desactiva las cookies, algunas funcionalidades del sitio web pueden no funcionar correctamente.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Instrucciones por navegador</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                  <h3>Google Chrome</h3>
                  <p>Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</p>
                  
                  <h3>Mozilla Firefox</h3>
                  <p>Opciones → Privacidad y seguridad → Cookies y datos del sitio</p>
                  
                  <h3>Safari</h3>
                  <p>Preferencias → Privacidad → Gestionar datos del sitio web</p>
                  
                  <h3>Microsoft Edge</h3>
                  <p>Configuración → Privacidad, búsqueda y servicios → Cookies y permisos del sitio</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Duración de las cookies</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                  <ul>
                    <li><strong>Cookies de sesión:</strong> Se eliminan automáticamente cuando cierra el navegador</li>
                    <li><strong>Cookies persistentes:</strong> Permanecen en su dispositivo hasta que caducan o las elimina manualmente</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actualizaciones de esta política</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                  <p>
                    Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en nuestras prácticas 
                    o por motivos operativos, legales o reglamentarios. Le recomendamos que revise esta página regularmente 
                    para mantenerse informado sobre nuestro uso de cookies.
                  </p>
                  <p>
                    <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contacto</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                  <p>
                    Si tiene preguntas sobre esta Política de Cookies, puede contactarnos en:
                  </p>
                  <ul>
                    <li><strong>Email:</strong> contacto@ticselect.com</li>
                    <li><strong>Teléfono:</strong> +56 9 7957 5372</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PoliticasCookies;