import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Shield, Users, Building, Target } from "lucide-react";
const ServiciosEmpresas = () => {
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Soluciones de Talento que Generan Resultados
            </h1>
          </div>
        </section>

        {/* Section 1: Recruiting & Headhunting */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">
                Reclutamiento & Headhunting: Su Shortlist en 7 Días
              </h2>
              <p className="text-xl text-muted-foreground">
                Nuestro proceso está diseñado para una sola cosa: entregarle el talento correcto en tiempo récord y con total seguridad.
              </p>
            </div>

            <h3 className="text-xl font-display font-semibold mb-8 text-center">Nuestro Proceso</h3>
            
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    1
                  </div>
                  <h4 className="font-display font-semibold mb-2">Definición Estratégica</h4>
                  <p className="text-sm text-muted-foreground">
                    Entendemos a fondo sus necesidades de negocio para definir el perfil ideal.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    2
                  </div>
                  <h4 className="font-display font-semibold mb-2">Búsqueda y Validación</h4>
                  <p className="text-sm text-muted-foreground">
                    Activamos nuestra base de datos, realizamos tests técnicos y validamos referencias 360.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    3
                  </div>
                  <h4 className="font-display font-semibold mb-2">Presentación de Shortlist</h4>
                  <p className="text-sm text-muted-foreground">
                    En 7 días hábiles, le presentamos una selección curada de los mejores perfiles.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    4
                  </div>
                  <h4 className="font-display font-semibold mb-2">Coordinación y Cierre</h4>
                  <p className="text-sm text-muted-foreground">
                    Gestionamos todo el proceso de entrevistas hasta la contratación exitosa.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Guarantee Banner */}
            <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-display font-semibold mb-2">Garantía Total</h4>
                  <p className="text-muted-foreground">Si el candidato no es el adecuado, buscamos un reemplazo sin costo durante los primeros 90 días.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: HR Consultancy */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">HR Consultancy</h2>
              <p className="text-xl text-muted-foreground">
                Fortalezca las bases de su organización con nuestras soluciones de consultoría estratégica.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">Estrategias de Retención de Talento</h4>
                  <p className="text-muted-foreground">
                    Diseñamos e implementamos planes para fidelizar a sus empleados clave y reducir la rotación.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">Diagnóstico de Clima Organizacional</h4>
                  <p className="text-muted-foreground">
                    Medimos y analizamos el ambiente laboral para identificar oportunidades de mejora y aumentar la productividad.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">Benchmark de Salarios y Estructuras</h4>
                  <p className="text-muted-foreground">
                    Asegúrese de que sus compensaciones y organigramas sean competitivos en el mercado actual.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 3: Development & Coaching */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Desarrollo & Coaching</h2>
              <p className="text-xl text-muted-foreground">
                Potenciamos las habilidades de sus equipos para convertirlos en los líderes del mañana.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="text-center shadow-elegant">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">Soft Skills y Liderazgo</h4>
                  <p className="text-muted-foreground">
                    Programas de coaching ejecutivo y talleres grupales para desarrollar habilidades de comunicación, gestión y liderazgo efectivo.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-8">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">Planes de Carrera</h4>
                  <p className="text-muted-foreground">
                    Ayudamos a estructurar rutas de crecimiento claras y motivadoras que impulsen el desarrollo profesional dentro de su empresa.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Talent Showcase Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">
                Para Empresas: Nuestro Universo de Talento
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Nuestro mayor diferenciador es nuestra base de datos de talento TIC, viva y en constante actualización. 
                Este activo estratégico nos permite encontrar perfiles altamente calificados con una velocidad inigualable.
              </p>
            </div>

            <div className="space-y-16">
              {/* Functional Areas */}
              <div>
                <h3 className="text-2xl font-display font-bold text-center mb-8">
                  Áreas Funcionales y Perfiles que Cubrimos
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Leadership */}
                  <Card className="shadow-elegant">
                    <CardContent className="p-6">
                      <h4 className="font-display font-semibold text-lg mb-4 text-primary">Liderazgo Ejecutivo y Estrategia</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Dirección General (CEO, Country Manager, Gerente General)</li>
                        <li>• Direcciones de Área (COO, CFO, CCO, CTO)</li>
                        <li>• Directores Regionales y de Unidades de Negocio</li>
                        <li>• Gerencia de Planificación Estratégica</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Operations */}
                  <Card className="shadow-elegant">
                    <CardContent className="p-6">
                      <h4 className="font-display font-semibold text-lg mb-4 text-primary">Operaciones y Proyectos</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Gestión de Proyectos y Operaciones</li>
                        <li>• Inspección y Auditoría de Campo</li>
                        <li>• Laboratorio y Análisis Técnico</li>
                        <li>• Salud, Seguridad y Medio Ambiente (HSE)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Commercial */}
                  <Card className="shadow-elegant">
                    <CardContent className="p-6">
                      <h4 className="font-display font-semibold text-lg mb-4 text-primary">Comercial, Marketing y Desarrollo de Negocios</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Gerentes de Desarrollo de Negocios y KAM</li>
                        <li>• Jefes y Gerentes Comerciales</li>
                        <li>• Ejecutivos de Ventas Técnicas</li>
                        <li>• Gerentes de Marketing y Producto (B2B)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Innovation */}
                  <Card className="shadow-elegant">
                    <CardContent className="p-6">
                      <h4 className="font-display font-semibold text-lg mb-4 text-primary">Innovación, Tecnología y Calidad</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Gerentes de Calidad y Mejora Continua (QA/QC)</li>
                        <li>• Líderes de Innovación y Desarrollo (I+D)</li>
                        <li>• Jefes de Proyectos de Transformación Digital</li>
                        <li>• Gerentes de Certificaciones y Acreditaciones</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Finance */}
                  <Card className="shadow-elegant">
                    <CardContent className="p-6">
                      <h4 className="font-display font-semibold text-lg mb-4 text-primary">Finanzas y Administración</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Gerentes de Administración y Finanzas</li>
                        <li>• Controllers Financieros y Jefes de Control de Gestión</li>
                        <li>• Jefes de Contabilidad, Tesorería y Adquisiciones</li>
                        <li>• Analistas de Planificación Financiera (FP&A)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* HR */}
                  <Card className="shadow-elegant">
                    <CardContent className="p-6">
                      <h4 className="font-display font-semibold text-lg mb-4 text-primary">Recursos Humanos y Talento</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Gerentes de RRHH y HR Business Partners (HRBP)</li>
                        <li>• Jefes de Adquisición de Talento y Reclutamiento</li>
                        <li>• Especialistas en Desarrollo Organizacional (DO)</li>
                        <li>• Jefes de Compensaciones y Beneficios</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Legal Section */}
                <div className="mt-6">
                  <Card className="shadow-elegant max-w-md mx-auto">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-display font-semibold text-lg mb-4 text-primary">Legal y Compliance</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Abogados Corporativos (In-house Counsel)</li>
                        <li>• Oficiales de Cumplimiento (Compliance Officers)</li>
                        <li>• Especialistas en Asuntos Regulatorios</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Strategic Industries */}
              <div>
                <h3 className="text-2xl font-display font-bold text-center mb-8">
                  Industrias Estratégicas que Servimos
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <span className="font-medium">Energía, Petróleo y Gas</span>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <span className="font-medium">Minería y Metales</span>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <span className="font-medium">Medio Ambiente y Sostenibilidad</span>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <span className="font-medium">Construcción e Infraestructura</span>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <span className="font-medium">Agricultura y Alimentos</span>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <span className="font-medium">Manufactura Industrial y Maquinaria</span>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <span className="font-medium">Transporte y Logística</span>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <span className="font-medium">Bienes de Consumo y Retail</span>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <span className="font-medium">Ciencias de la Vida (Farmacéutica y Salud)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              ¿Listo para encontrar el talento perfecto?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contáctenos hoy para discutir sus necesidades de talento y descubrir cómo podemos acelerar su crecimiento.
            </p>
            <Button asChild className="btn-hero">
              <Link to="/contacto">Contáctenos</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default ServiciosEmpresas;