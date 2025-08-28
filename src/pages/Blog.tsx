import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TrendingUp, Users, Lightbulb } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Próximamente: Nuestro Blog de Insights TIC
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Estamos construyendo este espacio para convertirnos en una fuente de valor para la comunidad TIC de LATAM. 
              Aquí encontrará análisis y contenido relevante sobre la industria.
            </p>
          </div>
        </section>

        {/* Content Preview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              Contenido que Estamos Preparando
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-elegant">
                <CardHeader>
                  <TrendingUp className="w-8 h-8 text-primary mb-4" />
                  <CardTitle className="text-xl">Tendencias en el Mercado de Talento STEM</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Análisis profundos sobre las tendencias emergentes en contratación y desarrollo de talento 
                    especializado en ciencias, tecnología, ingeniería y matemáticas.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <CardTitle className="text-xl">Consejos Prácticos para Optimizar Contratación</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Guías detalladas y estrategias probadas para mejorar sus procesos de reclutamiento y 
                    selección de personal especializado.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <BookOpen className="w-8 h-8 text-primary mb-4" />
                  <CardTitle className="text-xl">Guías de Desarrollo Profesional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Recursos y consejos para profesionales del sector TIC que buscan acelerar su crecimiento 
                    profesional y expandir sus oportunidades laborales.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <Lightbulb className="w-8 h-8 text-primary mb-4" />
                  <CardTitle className="text-xl">Casos de Éxito e Innovaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Historias inspiradoras de éxito en la industria, innovaciones tecnológicas y mejores 
                    prácticas que están transformando el sector TIC.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Signup Placeholder */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              Mantente Informado
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Sé el primero en recibir nuestros insights y análisis cuando lancemos oficialmente nuestro blog.
            </p>
            <div className="bg-card rounded-lg p-8 shadow-elegant">
              <p className="text-muted-foreground">
                Próximamente: Suscripción a nuestro newsletter para recibir los mejores contenidos de la industria TIC.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;