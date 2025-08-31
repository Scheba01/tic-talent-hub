import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Target, Gift, Award, Handshake, TrendingUp, CheckCircle } from "lucide-react";

const ProgramaAfiliados = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Comisiones Competitivas",
      description: "Gana hasta un 15% de comisión por cada referencia exitosa que generes."
    },
    {
      icon: Target,
      title: "Segmentación Inteligente",
      description: "Accede a herramientas que te ayudan a identificar las mejores oportunidades."
    },
    {
      icon: Award,
      title: "Bonos por Volumen",
      description: "Recibe bonos adicionales al alcanzar metas mensuales y trimestrales."
    },
    {
      icon: TrendingUp,
      title: "Crecimiento Sostenible",
      description: "Construye una fuente de ingresos recurrente con nuestro programa."
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Regístrate",
      description: "Completa el formulario de solicitud y espera la aprobación."
    },
    {
      step: "2",
      title: "Promociona",
      description: "Comparte nuestros servicios con tu red profesional utilizando tus enlaces únicos."
    },
    {
      step: "3",
      title: "Gana",
      description: "Recibe comisiones por cada cliente que se registre a través de tu referencia."
    }
  ];

  const requirements = [
    "Experiencia en el sector TIC o recursos humanos",
    "Red profesional activa en LinkedIn u otras plataformas",
    "Capacidad para generar al menos 5 referencias mensuales",
    "Conocimiento del mercado laboral chileno",
    "Excelentes habilidades de comunicación"
  ];

  const commissionStructure = [
    {
      type: "Registro Candidato",
      commission: "5%",
      description: "Por cada profesional TIC que se registre exitosamente"
    },
    {
      type: "Colocación Exitosa",
      commission: "15%",
      description: "Cuando un candidato referido es contratado por una empresa"
    },
    {
      type: "Cliente Empresa",
      commission: "10%",
      description: "Por cada empresa nueva que contrate nuestros servicios"
    },
    {
      type: "Bono Volumen",
      commission: "Extra 5%",
      description: "Al superar 10 colocaciones exitosas en un trimestre"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-4">Programa de Afiliados</Badge>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
                Únete a Nuestro
                <span className="text-primary block">Programa de Afiliados</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Monetiza tu red profesional y ayuda a conectar talento TIC con las mejores oportunidades. 
                Gana comisiones competitivas por cada referencia exitosa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Handshake className="mr-2 h-5 w-5" />
                  Aplicar Ahora
                </Button>
                <Button size="lg" variant="outline">
                  <Gift className="mr-2 h-5 w-5" />
                  Conoce los Beneficios
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                ¿Por qué ser Afiliado de TIC Select?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Descubre los beneficios exclusivos que ofrecemos a nuestros partners
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                ¿Cómo Funciona?
              </h2>
              <p className="text-xl text-muted-foreground">
                Comenzar es simple y directo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative">
                    <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                      {step.step}
                    </div>
                    {index < howItWorks.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border transform translate-x-8"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commission Structure */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Estructura de Comisiones
              </h2>
              <p className="text-xl text-muted-foreground">
                Transparencia total en nuestras comisiones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {commissionStructure.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{item.type}</CardTitle>
                    <div className="text-3xl font-bold text-primary">{item.commission}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Requisitos para Afiliados
              </h2>
              <p className="text-xl text-muted-foreground">
                Lo que buscamos en nuestros partners
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Perfil Ideal de Afiliado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-display font-bold mb-4">
                  ¿Listo para Comenzar?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Únete a nuestro programa de afiliados y comienza a generar ingresos conectando talento con oportunidades.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Handshake className="mr-2 h-5 w-5" />
                    Solicitar Membresía
                  </Button>
                  <Button size="lg" variant="outline">
                    Hablar con un Especialista
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Proceso de aprobación en 24-48 horas laborales
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramaAfiliados;