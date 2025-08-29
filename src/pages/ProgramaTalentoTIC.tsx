import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Lightbulb, Award, Phone, Mail } from "lucide-react";

const ProgramaTalentoTIC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Formando a la Próxima Generación de Líderes TIC
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              El Programa TalentoTIC es nuestra iniciativa para conectar a estudiantes y jóvenes profesionales 
              con las empresas líderes del sector. A través de convenios con universidades, creamos un puente 
              directo hacia el talento emergente mediante charlas, webinars y programas de mentoría.
            </p>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              Beneficios para su Organización
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="shadow-elegant text-center">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">Acceso a Nuevos Talentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Conecte con profesionales alineados con su cultura empresarial desde el inicio de sus carreras.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant text-center">
                <CardHeader>
                  <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">Ideas Frescas e Innovación</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Inyecte nuevas perspectivas y enfoques innovadores a sus procesos y metodologías.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant text-center">
                <CardHeader>
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">Fortalecimiento de Marca</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Refuerce su marca empleadora y demuestre su compromiso ESG con el desarrollo de talento joven.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Programa Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">
                  Cómo Funciona el Programa
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-2">Convenios Universitarios</h3>
                      <p className="text-muted-foreground">
                        Establecemos alianzas estratégicas con las principales universidades de LATAM.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-2">Charlas y Webinars</h3>
                      <p className="text-muted-foreground">
                        Organizamos eventos educativos donde expertos de la industria comparten conocimientos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-2">Programas de Mentoría</h3>
                      <p className="text-muted-foreground">
                        Conectamos estudiantes destacados con profesionales experimentados para acelerar su desarrollo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-8 shadow-elegant">
                <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-display font-bold text-center mb-4">
                  Únase como Empresa Partner
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  Sea parte de la formación del futuro de la industria TIC y acceda al mejor talento emergente.
                </p>
                <div className="text-center">
                  <Button asChild className="btn-hero">
                    <Link to="/contacto">Conocer Más</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              Súmese como empresa partner y construya el futuro hoy.
            </h2>
            <Button asChild className="btn-hero mb-6">
              <Link to="/contacto">Contáctenos</Link>
            </Button>
            <h3 className="text-lg font-display font-semibold mb-4">O contáctanos directamente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                onClick={() => window.open('https://wa.me/56XXXXXXX?text=Hola, me interesa conocer más sobre los servicios de TIC Select', '_blank')}
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open('mailto:email@ticselect.com?subject=Consulta sobre servicios TIC Select', '_blank')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Directo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramaTalentoTIC;