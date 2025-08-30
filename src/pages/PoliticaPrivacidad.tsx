import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

const PoliticaPrivacidad = () => {
  useEffect(() => {
    // SEO metadata
    document.title = "Política de Privacidad | Tic Select";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Política de Privacidad de Tic Select: tratamiento de datos para procesos de selección y contacto profesional.');
    }
    
    // Add canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.origin + '/politica-de-privacidad';
    document.head.appendChild(canonical);
    
    // OpenGraph metadata
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Política de Privacidad | Tic Select');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Política de Privacidad de Tic Select: tratamiento de datos para procesos de selección y contacto profesional.');
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.origin + '/politica-de-privacidad');
    }
    
    return () => {
      // Cleanup - restore original title
      document.title = "TIC SELECT - Talento Especializado para la Industria TIC";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Política de Privacidad – Tic Select
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Vigencia: 30 de agosto de 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant">
              <CardContent className="space-y-8 p-8">
                
                {/* Section 1 */}
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">1) Responsable del tratamiento</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Titular:</strong> Tic Select</p>
                    <p><strong>Domicilio:</strong> [Agregar dirección, ciudad y país]</p>
                    <p><strong>Correo de contacto (privacidad):</strong> <a href="mailto:contacto@ticselect.com" className="text-primary hover:underline">contacto@ticselect.com</a></p>
                    <p><strong>Teléfono:</strong></p>
                  </div>
                </div>

                <Separator />

                {/* Section 2 */}
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">2) Datos que tratamos</h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Identificación y contacto (nombre, correo, teléfono, país/ciudad, LinkedIn).</li>
                    <li>Datos profesionales (CV, formación, experiencia, roles, áreas/industrias, Conocimiento y Competencia en Normas & Certificaciones, disponibilidad, rango de ingresos indicado por el candidato, referencias y certificaciones aportadas o autorizadas).</li>
                    <li>Uso del sitio (cookies/tecnologías similares; ver Política de Cookies).</li>
                    <li>Datos sensibles: no se solicitan; si fueran necesarios, se pedirá consentimiento explícito.</li>
                  </ul>
                </div>

                <Separator />

                {/* Section 3 */}
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">3) Finalidades</h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Gestión de postulaciones, procesos de selección y contacto profesional.</li>
                    <li>Mantenimiento de una base de talento para proponer candidatos a empresas clientes/partners.</li>
                    <li>Verificación de antecedentes y certificaciones (con autorización).</li>
                    <li>Estadísticas internas y mejora del servicio.</li>
                  </ul>
                </div>

                <Separator />

                {/* Section 4 */}
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">4) Base jurídica</h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Consentimiento del titular.</li>
                    <li>Medidas precontractuales (procesos de selección).</li>
                    <li>Interés legítimo (seguridad, prevención de fraude, mejora).</li>
                    <li>(Aplicable a la normativa vigente: p. ej., Ley 19.628 – Chile; LGPD – Brasil; GDPR – UE, si correspondiera).</li>
                  </ul>
                </div>

                <Separator />

                {/* Section 5 */}
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">5) Destinatarios y transferencias</h2>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Empresas clientes/partners (solo posiciones acordes al perfil).</li>
                    <li>Proveedores (hosting, correo, CRM) bajo contrato de confidencialidad/encargo de tratamiento.</li>
                    <li>Transferencias internacionales: aplicar salvaguardas adecuadas (cláusulas contractuales u otros mecanismos).</li>
                  </ul>
                </div>

                <Separator />

                {/* Section 6 */}
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">6) Plazos de conservación</h2>
                  <p className="text-muted-foreground">
                    Hasta 24 meses desde el último contacto o hasta que el titular retire su consentimiento. Luego eliminación o anonimización segura.
                  </p>
                </div>

                <Separator />

                {/* Section 7 */}
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">7) Derechos</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>Acceso, rectificación, actualización, cancelación/supresión, oposición, limitación, portabilidad y revocación del consentimiento.</p>
                    <p><strong>Cómo ejercer:</strong> escribir a <a href="mailto:contacto@ticselect.com" className="text-primary hover:underline">contacto@ticselect.com</a> con asunto "Derechos de datos" y verificación de identidad.</p>
                  </div>
                </div>

                <Separator />

                {/* Section 8 */}
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">8) Seguridad</h2>
                  <p className="text-muted-foreground">
                    Medidas técnicas y organizativas razonables (control de accesos, cifrado en tránsito, logs, backups).
                  </p>
                </div>

                <Separator />

                {/* Section 9 */}
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">9) Menores de edad</h2>
                  <p className="text-muted-foreground">
                    No dirigido a menores de 16 años. Si se detectan datos sin autorización verificable, se eliminarán.
                  </p>
                </div>

                <Separator />

                {/* Section 10 */}
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">10) Cookies</h2>
                  <p className="text-muted-foreground">
                    Remitir a la Política de Cookies (enlace en footer).
                  </p>
                </div>

                <Separator />

                {/* Section 11 */}
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-4">11) Actualizaciones</h2>
                  <p className="text-muted-foreground">
                    Se publicarán actualizaciones con su fecha de vigencia.
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default PoliticaPrivacidad;