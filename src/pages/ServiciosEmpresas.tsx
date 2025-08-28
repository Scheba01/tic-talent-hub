import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Shield, Users, BarChart3, TrendingUp, MessageSquare, Target } from "lucide-react";
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
                Selección y Búsqueda de Ejecutivos: Su Terna de Candidatos en 7 Días
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
                  <h4 className="font-display font-semibold mb-2">Presentación de Finalistas</h4>
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

            {/* Value Proposition - Redesigned */}
            <div className="bg-gradient-to-br from-primary/5 via-primary/3 to-primary/5 border border-primary/20 rounded-2xl p-8 mb-12 shadow-elegant">
              {/* Main Promise */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-3 bg-white/80 px-6 py-3 rounded-full border border-primary/20 mb-6">
                  <Clock className="w-6 h-6 text-primary" />
                  <p className="text-xl font-semibold text-primary">
                    En 7 días hábiles te presentamos candidatos validados técnica y culturalmente
                  </p>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/60 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-primary mb-2">Especialistas TIC</h5>
                      <p className="text-sm text-muted-foreground">Auditores, Inspectores, Comerciales, KAMs y Ejecutivos especializados en Testing, Inspección y Certificación.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-primary mb-2">Validación Completa</h5>
                      <p className="text-sm text-muted-foreground">Validación técnica y referencias 360° de todos los candidatos.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-primary mb-2">Apoyo Integral</h5>
                      <p className="text-sm text-muted-foreground">Apoyo en entrevistas, negociación y cierre del proceso.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-primary mb-2">Pago Seguro</h5>
                      <p className="text-sm text-muted-foreground">Pago contra contratación efectiva.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee Banner */}
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-6 mb-8">
                <div className="flex items-center space-x-4">
                  <Shield className="w-10 h-10 text-white flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Garantía 90 Días</h4>
                    <p className="text-white/90">Si el candidato no resulta, lo reemplazamos sin costo adicional.</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <div className="bg-white/80 rounded-xl p-6 border border-primary/20">
                  <p className="text-lg font-semibold text-primary mb-4">
                    👉 Deja de perder meses buscando. En TIC Select hacemos que tu contratación sea rápida, segura y garantizada.
                  </p>
                  <Button asChild className="btn-hero text-lg px-8 py-3">
                    <Link to="/contacto">Quiero mi primer shortlist en 7 días</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: HR Consultancy */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Consultoría en Recursos Humanos</h2>
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
                  <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">Diagnóstico de Clima Organizacional</h4>
                  <p className="text-muted-foreground">
                    Medimos y analizamos el ambiente laboral para identificar oportunidades de mejora y aumentar la productividad.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">Análisis Salarial y de Estructuras</h4>
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
                  <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">Habilidades Blandas y Liderazgo</h4>
                  <p className="text-muted-foreground">
                    Programas de coaching ejecutivo y talleres grupales para desarrollar habilidades de comunicación, gestión y liderazgo efectivo.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-8">
                  <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">Planes de Carrera</h4>
                  <p className="text-muted-foreground">
                    Ayudamos a estructurar rutas de crecimiento claras y motivadoras que impulsen el desarrollo profesional dentro de su empresa.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 4: Para Empresas - Nuestro Universo de Talento */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">
                Para Empresas: Nuestro Universo de Talento
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Nuestro mayor diferenciador es nuestra base de datos de talento TIC, viva y en constante actualización. Este activo estratégico nos permite encontrar perfiles altamente calificados con una velocidad inigualable.
              </p>
            </div>

            {/* Perfiles que Cubrimos */}
            <div className="mb-16">
              <h3 className="text-2xl font-display font-bold mb-8 text-center">
                Perfiles que Cubrimos: Nuestra Doble Expertise
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Perfiles Especializados del Sector TIC */}
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl font-display font-bold text-primary">
                      Perfiles Especializados del Sector TIC
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Auditores y Especialistas en Normas:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Auditores Líderes y Técnicos (ISO 9001, 14001, 45001, 27001, 50001, etc.)</li>
                        <li>• Especialistas en Certificación de Productos y Sistemas</li>
                        <li>• Auditores de Seguridad Alimentaria (FSSC 22000, BRC, HACCP)</li>
                        <li>• Expertos en Compliance y Asuntos Regulatorios</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Inspectores de Campo:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Inspectores Especializados (Soldadura Nivel I-II, Ensayos No Destructivos - NDT, API, Izaje)</li>
                        <li>• Inspectores Técnicos (Eléctricos, Mecánicos, Civiles, Recubrimientos)</li>
                        <li>• Inspectores de Carga, Marítimos y de Commodities</li>
                        <li>• Supervisores de Terreno</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Personal de Laboratorio:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Analistas de Laboratorio (Químicos, Microbiológicos, Físico-Químicos)</li>
                        <li>• Jefes y Supervisores de Laboratorio (Bajo norma ISO/IEC 17025)</li>
                        <li>• Técnicos de Metrología y Calibración</li>
                        <li>• Geoquímicos y Analistas de Muestras</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Ingeniería, Calidad y HSE:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Ingenieros de Calidad (QA/QC)</li>
                        <li>• Ingenieros de Proyectos y de Confiabilidad</li>
                        <li>• Jefes, Supervisores y Expertos en Prevención de Riesgos (HSE / HSEQ)</li>
                        <li>• Ingenieros Ambientales y Consultores de Sostenibilidad</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Áreas Funcionales y Corporativas */}
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl font-display font-bold text-primary">
                      Áreas Funcionales y Corporativas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Liderazgo Ejecutivo y Estrategia:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• CEO, Country Manager, Gerentes Generales, Directores Regionales y de Unidades de Negocio</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Comercial y Desarrollo de Negocios:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Gerentes Comerciales, Key Account Managers (KAM), Ejecutivos de Ventas Técnicas</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Operaciones y Proyectos:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Gerentes de Operaciones, Jefes de Proyecto (PMP), Planificadores</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Finanzas y Administración:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Gerentes de Finanzas, Controllers, Jefes de Contabilidad y Adquisiciones</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Recursos Humanos y Talento:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Gerentes de RRHH, HR Business Partners (HRBP), Jefes de Adquisición de Talento</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Tecnología, Innovación y Marketing:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Gerentes de TI, Líderes de Transformación Digital, Gerentes de Marketing B2B</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Industrias Estratégicas */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-8 text-center">
                Industrias Estratégicas que Servimos
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Energía, Petróleo y Gas",
                  "Minería y Metales", 
                  "Medio Ambiente y Sostenibilidad",
                  "Construcción e Infraestructura",
                  "Agricultura y Alimentos",
                  "Manufactura Industrial y Maquinaria",
                  "Transporte y Logística (Automotriz, Naval, Aeroespacial)",
                  "Bienes de Consumo y Retail",
                  "Ciencias de la Vida (Farmacéutica y Salud)"
                ].map((industry, index) => (
                  <Card key={index} className="text-center shadow-elegant bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:from-primary/10 hover:to-primary/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <p className="font-semibold text-primary text-sm">{industry}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              Optimice su proceso de contratación hoy.
            </h2>
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