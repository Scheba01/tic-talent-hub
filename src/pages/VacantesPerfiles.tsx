import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Building, Target } from "lucide-react";

const VacantesPerfiles = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Talento Especializado para Industrias Clave
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Esta página tiene un doble propósito: mostrar a las empresas el calibre del talento que manejamos 
              y presentar a los profesionales las oportunidades laborales disponibles.
            </p>
          </div>
        </section>

        {/* Para Empresas */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Card className="mb-12 shadow-elegant">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <Building className="w-8 h-8 text-primary" />
                  <CardTitle className="text-3xl font-display">
                    Para Empresas: Nuestro Universo de Talento
                  </CardTitle>
                </div>
                <p className="text-xl text-muted-foreground">
                  Nuestro mayor diferenciador es nuestra base de datos de talento TIC, viva y en constante 
                  actualización. Este activo estratégico nos permite encontrar perfiles altamente calificados 
                  con una velocidad inigualable.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Especialidades */}
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-6">Especialidades que Cubrimos</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Técnicos y Operativos</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary">Auditores ISO 9001, 27001</Badge>
                          <Badge variant="secondary">Inspectores Minería</Badge>
                          <Badge variant="secondary">Inspectores Energía</Badge>
                          <Badge variant="secondary">Inspectores Alimentos</Badge>
                          <Badge variant="secondary">Analistas de Laboratorio</Badge>
                          <Badge variant="secondary">Ingenieros</Badge>
                          <Badge variant="secondary">Prevencionistas de Riesgo</Badge>
                          <Badge variant="secondary">Calidad y Compliance</Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-3">Comerciales</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary">Vendedores Técnicos</Badge>
                          <Badge variant="secondary">KAMs</Badge>
                          <Badge variant="secondary">Business Development</Badge>
                          <Badge variant="secondary">Gerentes Comerciales</Badge>
                          <Badge variant="secondary">Marketing B2B TIC</Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-3">Ejecutivos</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Gerentes de Área</Badge>
                          <Badge variant="secondary">Country Managers</Badge>
                          <Badge variant="secondary">Directores Regionales LATAM</Badge>
                          <Badge variant="secondary">Roles C-Level</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Industrias */}
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-6">Industrias que Servimos</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                        <span className="font-medium">Industrial</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                        <span className="font-medium">Certificación</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                        <span className="font-medium">Inspección</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                        <span className="font-medium">Alimentos</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                        <span className="font-medium">Medio Ambiente</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                        <span className="font-medium">Minería</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                        <span className="font-medium">Energía</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Para Profesionales */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-display font-bold">
                Para Profesionales: Oportunidades Abiertas
              </h2>
            </div>
            
            <p className="text-xl text-muted-foreground mb-8">
              Aquí publicaremos activamente las vacantes que gestionamos para nuestros clientes. 
              Si tu perfil encaja con alguna de ellas, no dudes en postular.
            </p>

            {/* Placeholder for job listings */}
            <div className="bg-card rounded-lg p-8 text-center mb-8">
              <h3 className="text-xl font-display font-semibold mb-4">
                Próximamente: Vacantes Disponibles
              </h3>
              <p className="text-muted-foreground">
                Estamos construyendo nuestro módulo de vacantes para mostrar las oportunidades más recientes.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-display font-semibold mb-4">
                ¿No ves tu oportunidad ideal?
              </h3>
              <p className="text-muted-foreground mb-6">
                El puesto perfecto para ti podría abrirse mañana. Te invitamos a formar parte de nuestra 
                red de talento para ser considerado en futuras búsquedas.
              </p>
              <Button asChild className="btn-hero">
                <Link to="/registro-talento">Registre su Perfil en Nuestra Base de Datos</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VacantesPerfiles;