import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Shield, Users, BarChart3, TrendingUp, MessageSquare, Target, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";

const ServiciosEmpresas = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://ticselect.com/servicios-para-empresas" />
        <meta property="og:url" content="https://ticselect.com/servicios-para-empresas" />
      </Helmet>
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {t('services_page.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Servicios especializados para empresas TIC
            </p>
            <Button asChild size="lg">
              <Link to="/contacto">Contactar</Link>
            </Button>
          </div>
        </section>

        {/* Simple Services Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-elegant">
                <CardHeader>
                  <CardTitle>Búsqueda Ejecutiva</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Identificamos y atraemos a los líderes que tu empresa necesita.
                  </p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/contacto">Más información</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardHeader>
                  <CardTitle>Consultoría RRHH</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Optimizamos tus procesos de recursos humanos.
                  </p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/contacto">Más información</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardHeader>
                  <CardTitle>Coaching & Desarrollo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Desarrollamos el potencial de tus equipos.
                  </p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/contacto">Más información</Link>
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

export default ServiciosEmpresas;