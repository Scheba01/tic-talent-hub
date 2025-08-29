import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Lightbulb, Award, Phone, Mail, CheckCircle, TrendingUp, Users2 } from "lucide-react";

const ProgramaTalentoTIC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section with TIC Talento Branding */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <img 
                    src="/lovable-uploads/ba80b9bd-3338-4001-8cef-262bfeeb87db.png" 
                    alt="TIC Talento Program" 
                    className="h-16 w-auto mr-4"
                  />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                  Formando la Próxima Generación de <span className="text-cyan-300">Líderes</span>
                  <img 
                    src="/lovable-uploads/cde2ecac-14de-4f21-b255-6c178be36999.png" 
                    alt="TIC Talento" 
                    className="inline-block h-12 w-auto ml-4 align-middle"
                  />
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed mb-8">
                  Conectamos a estudiantes y jóvenes profesionales con las empresas líderes del sector. 
                  A través de convenios con universidades, creamos un puente directo hacia el talento emergente.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-cyan-400 hover:bg-cyan-300 text-blue-900 font-semibold px-8 py-3">
                    <Link to="/contacto">Únete al Programa</Link>
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/20 hover:border-cyan-300 hover:text-cyan-300 px-8 py-3 font-semibold">
                    Conoce Más
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent rounded-full blur-3xl"></div>
                <img 
                  src="/lovable-uploads/ba80b9bd-3338-4001-8cef-262bfeeb87db.png" 
                  alt="TIC Talento Hero" 
                  className="relative z-10 w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-cyan-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">+150</div>
                <div className="text-cyan-600 font-semibold mb-2">Estudiantes</div>
                <p className="text-gray-600">Participantes activos en el programa</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border border-cyan-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-cyan-600 font-semibold mb-2">Empresas Partners</div>
                <p className="text-gray-600">Organizaciones comprometidas con el talento</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border border-cyan-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">80%</div>
                <div className="text-cyan-600 font-semibold mb-2">Tasa de Inserción</div>
                <p className="text-gray-600">Graduados empleados en empresas TIC</p>
              </div>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-blue-800">
              Beneficios para su Organización
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Users className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Acceso a Nuevos Talentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Conecte con profesionales alineados con su cultura empresarial desde el inicio de sus carreras.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Lightbulb className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Ideas Frescas e Innovación</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Inyecte nuevas perspectivas y enfoques innovadores a sus procesos y metodologías.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Award className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Fortalecimiento de Marca</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Refuerce su marca empleadora y demuestre su compromiso ESG con el desarrollo de talento joven.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certificate Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <h2 className="text-3xl font-display font-bold mr-4">Certificación</h2>
                  <img 
                    src="/lovable-uploads/cde2ecac-14de-4f21-b255-6c178be36999.png" 
                    alt="TIC Talento" 
                    className="h-8 w-auto"
                  />
                </div>
                <p className="text-blue-100 text-lg mb-6">
                  Las empresas que demuestren un compromiso anual sostenido con el desarrollo de talento 
                  TIC recibirán nuestra prestigiosa Certificación TIC Talento.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-cyan-300 flex-shrink-0" />
                    <span>Participación en al menos 6 charlas/webinars anuales</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-cyan-300 flex-shrink-0" />
                    <span>Mentorías a mínimo 10 estudiantes por año</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-cyan-300 flex-shrink-0" />
                    <span>Contratación de al menos 3 graduados del programa</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-cyan-300 flex-shrink-0" />
                    <span>Participación en eventos de networking estudiantil</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/384b0134-c54d-4f2d-9d89-8174e50ed97b.png" 
                  alt="Certificado TIC Talento" 
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Programa Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6 text-blue-800">
                  Cómo Funciona el Programa
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-2 text-blue-700">Convenios Universitarios</h3>
                      <p className="text-gray-600">
                        Establecemos alianzas estratégicas con las principales universidades de LATAM.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-2 text-blue-700">Charlas y Webinars</h3>
                      <p className="text-gray-600">
                        Organizamos eventos educativos donde expertos de la industria comparten conocimientos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-2 text-blue-700">Programas de Mentoría</h3>
                      <p className="text-gray-600">
                        Conectamos estudiantes destacados con profesionales experimentados para acelerar su desarrollo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-xl border border-cyan-100">
                <GraduationCap className="w-16 h-16 text-cyan-500 mx-auto mb-6" />
                <h3 className="text-2xl font-display font-bold text-center mb-4 text-blue-800">
                  Únase como Empresa Partner
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Sea parte de la formación del futuro de la industria TIC y acceda al mejor talento emergente.
                </p>
                <div className="text-center">
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-3">
                    <Link to="/contacto">Conocer Más</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6 text-blue-800">
              Súmese como empresa partner y construya el futuro hoy.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Elige la forma que prefieras para contactarnos
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-12 py-4 text-sm">
                <Link to="/contacto">Formulario de Contacto</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 px-12 py-4"
                asChild
              >
                <a href="https://wa.me/message/IH46LPYOLH4CH1">
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-12 py-4"
                onClick={() => window.open('mailto:email@ticselect.com?subject=Consulta sobre Programa TIC Talento', '_blank')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Directo
              </Button>
            </div>
            
            {/* Subtle TIC Select attribution */}
            <div className="mt-12 flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span>Programa desarrollado por</span>
              <img 
                src="/lovable-uploads/42d7e844-a2f7-47e6-9cbc-b08fab2c11e2.png" 
                alt="TIC Select" 
                className="h-4 w-auto opacity-70"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramaTalentoTIC;