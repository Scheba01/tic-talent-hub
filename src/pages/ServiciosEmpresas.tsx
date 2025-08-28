import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Shield, Users } from "lucide-react";
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

        {/* Recruiting Service */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Card className="mb-12 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-3xl font-display">Reclutamiento & Headhunting: Su Shortlist en 7 Días</CardTitle>
                <p className="text-xl text-muted-foreground mt-4">
                  Nuestro proceso está diseñado para una sola cosa: entregarle el talento correcto 
                  en tiempo récord y con total seguridad.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-4">Nuestro Proceso:</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Definición Estratégica:</strong> Entendemos a fondo sus necesidades de negocio.
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Búsqueda y Validación:</strong> Activamos nuestra base de datos, realizamos tests técnicos y validamos referencias 360.
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Presentación de Shortlist:</strong> En 7 días hábiles, le presentamos una selección curada de los mejores perfiles.
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Coordinación y Cierre:</strong> Gestionamos todo el proceso de entrevistas hasta la contratación.
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                      <h4 className="text-xl font-display font-semibold">Garantía Total</h4>
                    </div>
                    <p className="text-muted-foreground">
                      Si el candidato no es el adecuado, buscamos un reemplazo sin costo durante los primeros 30 días.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* HR Consultancy */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-3xl font-display">HR Consultoria y Desarrollo</CardTitle>
                <p className="text-xl text-muted-foreground mt-4">
                  Fortalezca su organización desde adentro con nuestra consultoría y programas de coaching.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-display font-semibold mb-2">Estrategias de Retención de Talento</h4>
                  </div>
                  <div className="text-center">
                    <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-display font-semibold mb-2">Diagnóstico de Clima Organizacional</h4>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-display font-semibold mb-2">Benchmark de Salarios y Estructuras</h4>
                  </div>
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-display font-semibold mb-2">Desarrollo de Liderazgo y Soft Skills</h4>
                  </div>
                </div>
              </CardContent>
            </Card>
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