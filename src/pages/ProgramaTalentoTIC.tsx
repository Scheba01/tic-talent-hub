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
                    src="/lovable-uploads/aa173f7b-4df3-46c2-a94d-5be3c0deb921.png" 
                    alt="TIC Talento Program" 
                    className="h-12 w-auto mr-4"
                  />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                  Impulsando el futuro del <span className="text-cyan-300">sector TIC</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed mb-8">
                  El programa crea un puente real entre la academia y la industria, acercando a los jóvenes a proyectos concretos y preparando a las empresas con el talento que necesitan para crecer. Una iniciativa que no solo transforma la formación en experiencia y la experiencia en carrera profesional, sino que también promueve y fortalece el desarrollo de toda la industria TIC en la región.
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
                  src="/lovable-uploads/aa173f7b-4df3-46c2-a94d-5be3c0deb921.png" 
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
                <div className="text-4xl font-bold text-blue-600 mb-2">5%</div>
                <div className="text-cyan-600 font-semibold mb-2">Escasez de Talento TIC</div>
                <p className="text-gray-600">Tres de cada cuatro empresas en LATAM reportan dificultad para encontrar perfiles especializados.</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border border-cyan-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">2030</div>
                <div className="text-cyan-600 font-semibold mb-2">Brecha de 85 millones de profesionales</div>
                <p className="text-gray-600">El mundo enfrentará un déficit global de talento especializado, impactando directamente a la industria TIC.</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border border-cyan-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">+50%</div>
                <div className="text-cyan-600 font-semibold mb-2">Demanda en Normas y Certificaciones</div>
                <p className="text-gray-600">Más de la mitad de las compañías en la región requieren personal capacitado en estándares internacionales (ISO, HACCP, GLOBALG.A.P., entre otros).</p>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Qué es TIC Talento? */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-blue-800">
              ¿Qué es TIC Talento?
            </h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-700 mb-6">
                El programa TIC Talento nace para fomentar los talentos de la industria TIC (Testing, Inspección y Certificación), 
                anticipando su desarrollo y permitiendo que los jóvenes se adapten temprano a la cultura y exigencias de este sector.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                En América Latina, muchas veces falta talento especializado en TIC. Para garantizar el crecimiento de la industria, 
                debemos invertir hoy en la formación y vinculación de los futuros profesionales.
              </p>
              <p className="text-lg text-gray-700">
                Por eso, TIC Talento conecta universidades, estudiantes y empresas bajo un mismo compromiso: formar, capacitar e incorporar 
                a la próxima generación de expertos TIC.
              </p>
            </div>
          </div>
        </section>

        {/* Beneficios para las empresas */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-blue-800">
              Beneficios para las Empresas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Users className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Talento Pre-seleccionado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Incorporación de jóvenes previamente seleccionados para ajustarse a sus necesidades.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Lightbulb className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Proyectos con Impacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Participación en proyectos donde los alumnos aportan soluciones reales.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Users2 className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Adaptación Cultural</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Adaptación temprana de futuros profesionales a la cultura de la empresa.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Award className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Visibilidad y Posicionamiento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Visibilidad y posicionamiento como empresa comprometida con el desarrollo de la industria TIC.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Crecimiento Sostenible</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Impulso al crecimiento sostenible del sector mediante la formación de nuevo talento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Beneficios para los jóvenes */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-blue-800">
              Beneficios para los Jóvenes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <GraduationCap className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Experiencia Práctica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Experiencia práctica en empresas líderes de la industria.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Lightbulb className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Proyectos Reales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Participación en proyectos con impacto real.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Award className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Formación Internacional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Formación en normas y estándares internacionales.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Users className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Mentoría Especializada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Mentoría de profesionales expertos en TIC.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">Inserción Laboral</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Oportunidad concreta de insertarse en un mercado laboral de alta demanda.
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
                <h2 className="text-3xl font-display font-bold mb-6">
                  Certificación <span className="text-cyan-300">TIC Talento</span>
                </h2>
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

        {/* ¿Cómo funciona? */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-blue-800">
              ¿Cómo Funciona?
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-8 text-center">
                El programa está diseñado para que las empresas participen como partners y asuman un rol activo en la formación de nuevos talentos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-8 shadow-lg border border-cyan-100">
                  <h3 className="text-xl font-display font-bold mb-4 text-blue-700">Criterios Anuales para Empresas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-600">Recibir alumnos en pasantías o prácticas profesionales</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-600">Impartir charlas y talleres en universidades</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-600">Participar en programas de formación y diplomados técnicos</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-600">Dar oportunidad de primer empleo a jóvenes talentos TIC</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-8 shadow-lg border border-cyan-100">
                  <h3 className="text-xl font-display font-bold mb-4 text-blue-700">Nuestro Compromiso</h3>
                  <p className="text-gray-600 mb-4">
                    Nos encargamos de buscar a los estudiantes adecuados para cada empresa, asegurando que participen en proyectos reales que aporten valor.
                  </p>
                  <p className="text-gray-600">
                    Los estudiantes se adaptan rápidamente a la cultura organizacional, creando una transición fluida del ámbito académico al profesional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestra Visión */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6 text-blue-800">
              Nuestra Visión
            </h2>
            <p className="text-lg text-gray-700">
              TIC Talento busca ser el puente entre la academia y la industria, garantizando que cada estudiante no solo aprenda, 
              sino que también aplique sus conocimientos y construya una carrera en el sector TIC.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6 text-blue-800">
              Llamado a la Acción
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-8 shadow-lg border border-cyan-100">
                <h3 className="text-xl font-display font-bold mb-4 text-blue-700">Empresas</h3>
                <p className="text-gray-600">
                  Únete como partner de TIC Talento y forma parte del futuro de la industria, desarrollando el talento que tu organización y el sector necesitan.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-lg border border-cyan-100">
                <h3 className="text-xl font-display font-bold mb-4 text-blue-700">Estudiantes</h3>
                <p className="text-gray-600">
                  Postula al programa y da tus primeros pasos profesionales en un sector que no deja de crecer.
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              👉 Inscríbete aquí - Elige la forma que prefieras para contactarnos
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