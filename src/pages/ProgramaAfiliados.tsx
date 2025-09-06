import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ProgramaAfiliados = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Programa de Afiliados TIC Select</title>
        <meta name="description" content="Refiere candidatos y empresas, gana recompensas. Programa de afiliados simple y transparente de TIC Select." />
        <link rel="canonical" href="https://ticselect.com/programa-afiliados" />
        <meta property="og:url" content="https://ticselect.com/programa-afiliados" />
      </Helmet>
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground">
            Programa de Afiliados TIC Select
          </h1>
          
          <div className="text-lg text-muted-foreground space-y-6 max-w-3xl mx-auto">
            <p>
              En TIC Select sabemos que las mejores oportunidades nacen de las conexiones. 
              Por eso creamos nuestro Programa de Afiliados, una forma sencilla y transparente 
              de reconocer el valor de tu red.
            </p>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto text-left">
            <h2 className="text-3xl font-display font-bold text-center">¿Cómo funciona?</h2>
            
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Refiere un candidato:</strong> si es contratado a través de TIC Select, recibes $200 USD.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Refiere una empresa que busque talento con nosotros:</strong> si inicia un proceso de reclutamiento, recibes $500 USD.</span>
              </li>
            </ul>

            <p className="text-lg text-muted-foreground text-center">
              Tú refieres, nosotros nos encargamos de todo el proceso, y al concretarse, recibes tu recompensa.
            </p>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-display font-bold mb-4">
                En TIC Select lo hacemos simple:
              </h3>
              <p className="text-xl text-primary font-semibold">
                Refiere, conecta y gana.
              </p>
            </div>

            <div className="text-center pt-8">
              <Link to="/contacto">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Únete al Programa
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramaAfiliados;