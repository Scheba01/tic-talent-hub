import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Shield, Users, Target, Award } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 gradient-hero"></div>
          <div className="relative max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
              El Talento que Impulsa la Industria TIC
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">Conectamos a los líderes del sector de Testeo, Inspección y Certificación (TIC) con el talento que necesitan para crecer. Le entregamos una shortlist en 7 días. Garantizado.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild className="btn-outline-hero">
                <Link to="/servicios-para-empresas">Descubra Nuestros Servicios</Link>
              </Button>
              <Button asChild className="btn-hero">
                <Link to="/vacantes-y-perfiles">Vea las Vacantes</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Nuestra Promesa */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6">
                Contratación Estratégica, Sin Riesgos
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-elegant">
                <CardHeader>
                  <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Shortlist en 7 Días</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nuestra base de datos de talento pre-evaluado nos permite actuar con una agilidad que nadie más puede ofrecer.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardHeader>
                  <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Garantía de 90 Días</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Si el candidato no cumple las expectativas en sus primeros tres meses, buscamos un reemplazo sin costo alguno.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardHeader>
                  <Target className="w-16 h-16 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Riesgo Cero</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Usted solo invierte cuando ha decidido contratar a uno de nuestros candidatos. Sin anticipos ni costos ocultos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-display font-bold mb-8">
                  Nacimos de la Industria para Servir a la Industria
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Users className="w-8 h-8 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2">+30 Años de Experiencia Combinada</h3>
                      <p className="text-muted-foreground">
                        Nuestro equipo entiende las necesidades específicas del sector TIC porque proviene de él.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Award className="w-8 h-8 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2">+15,000 Talentos en LATAM</h3>
                      <p className="text-muted-foreground">
                        Una red activa y en constante expansión de profesionales especializados en la región.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-8 h-8 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2">Enfoque 360°</h3>
                      <p className="text-muted-foreground">
                        Desde auditores especializados hasta directores regionales, cubrimos todos los niveles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-8 shadow-elegant">
                <h3 className="text-2xl font-display font-bold mb-6">¿Listo para Comenzar?</h3>
                <p className="text-muted-foreground mb-6">
                  Hable con nuestros expertos y descubra cómo podemos acelerar su proceso de contratación.
                </p>
                <Button asChild className="btn-hero w-full">
                  <Link to="/contacto">Agende una Llamada Estratégica</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-12">
              Nuestros Servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">Recruiting & Headhunting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Encuentre el talento exacto que necesita con nuestra metodología probada y garantía de resultados.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/servicios-para-empresas">Ver Más</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">HR Consultancy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Fortalezca su organización con estrategias de retención y desarrollo de talento.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/servicios-para-empresas">Ver Más</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Index;