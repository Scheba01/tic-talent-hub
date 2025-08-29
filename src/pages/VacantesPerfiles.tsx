import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  CheckCircle,
  Bell,
  Database,
  Phone,
  Mail
} from "lucide-react";

const VacantesPerfiles = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Busco Empleo en TIC
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Si vienes de la Industria TIC, te favorece registrarte con nosotros para estar en nuestra 
              base de datos de talentos. Te mandaremos noticias sobre la industria y ofertas exclusivas.
            </p>
            <Button asChild className="btn-hero">
              <Link to="/registro-talento">Registrarme Ahora</Link>
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              ¿Por qué registrarse con TIC Select?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <Card className="shadow-elegant">
                <CardContent className="p-8 text-center">
                  <Database className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-display font-semibold mb-4">
                    Base de Datos Especializada
                  </h3>
                  <p className="text-muted-foreground">
                    Forma parte de nuestra exclusiva base de datos de talento TIC, 
                    donde empresas líderes buscan perfiles como el tuyo.
                  </p>
                </CardContent>
              </Card>

              {/* Benefit 2 */}
              <Card className="shadow-elegant">
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-display font-semibold mb-4">
                    Ofertas Exclusivas
                  </h3>
                  <p className="text-muted-foreground">
                    Recibe ofertas laborales antes que nadie, directamente 
                    relacionadas con tu perfil y experiencia.
                  </p>
                </CardContent>
              </Card>

              {/* Benefit 3 */}
              <Card className="shadow-elegant">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-display font-semibold mb-4">
                    Noticias de la Industria
                  </h3>
                  <p className="text-muted-foreground">
                    Mantente actualizado con las últimas tendencias, 
                    tecnologías y oportunidades del sector TIC.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              Cómo Funciona
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">
                  Regístrate
                </h3>
                <p className="text-muted-foreground">
                  Completa tu perfil profesional con tu experiencia y habilidades TIC.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">
                  Validación
                </h3>
                <p className="text-muted-foreground">
                  Nuestro equipo valida tu perfil y lo incluye en nuestra base de datos.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">
                  Matching
                </h3>
                <p className="text-muted-foreground">
                  Te conectamos con oportunidades que se ajusten a tu perfil y objetivos.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">
                  Oportunidades
                </h3>
                <p className="text-muted-foreground">
                  Recibe ofertas laborales y noticias relevantes de la industria TIC.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              Tu Próxima Oportunidad TIC Te Está Esperando
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              No dejes que las mejores oportunidades pasen de largo. Únete a nuestra 
              red de profesionales TIC y acelera tu carrera profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild className="btn-hero">
                <Link to="/registro-talento">Registrarme Gratis</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contacto">Más Información</Link>
              </Button>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Elige la forma que prefieras para contactarnos
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button asChild variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 px-8 py-4">
                <Link to="/contacto">Formulario de Contacto</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                onClick={() => window.open('https://wa.me/56979575372?text=Hola, me interesa conocer más sobre las oportunidades laborales de TIC Select', '_blank')}
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                className="w-full border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => window.open('mailto:email@ticselect.com?subject=Consulta sobre oportunidades laborales', '_blank')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Directo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">
                  Ventajas de Nuestra Red
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Confidencialidad:</strong> Tu información permanece privada hasta que decidas postular.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Relevancia:</strong> Solo recibes ofertas que coinciden con tu perfil.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Actualización:</strong> Mantente al día con tendencias y salarios del mercado TIC.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Sin compromiso:</strong> Puedes desactivar las notificaciones cuando quieras.
                    </span>
                  </li>
                </ul>
              </div>
              
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <Users className="w-16 h-16 text-primary mb-6" />
                  <h3 className="text-2xl font-display font-bold mb-4">
                    Únete a Cientos de Profesionales TIC
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Forma parte de una comunidad exclusiva de talentos TIC que ya 
                    están aprovechando las mejores oportunidades del mercado.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/registro-talento">Comenzar Ahora</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VacantesPerfiles;