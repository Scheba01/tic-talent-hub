import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QuienesSomos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Nacimos de la Industria para Servir a la Industria
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              No somos reclutadores tradicionales. Somos TIC Talent, una red de expertos forjados en el corazón 
              de la industria de Pruebas, Inspección y Certificación. Entendemos sus desafíos porque los hemos vivido. 
              Hablamos su idioma porque es el nuestro.
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Red de Expertos */}
              <div className="bg-card rounded-lg p-8 shadow-elegant">
                <h2 className="text-2xl font-display font-semibold mb-4">
                  Red de Expertos con Experiencia Real
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nuestro equipo suma más de 50 años de experiencia combinada. Este conocimiento profundo 
                  nos permite identificar no solo las habilidades técnicas, sino el ADN cultural que 
                  garantiza un match perfecto.
                </p>
              </div>

              {/* Universo de Talento */}
              <div className="bg-card rounded-lg p-8 shadow-elegant">
                <h2 className="text-2xl font-display font-semibold mb-4">
                  Un Universo de Talento a su Alcance
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Gestionamos una red propia y en constante expansión con más de 15,000 talentos 
                  especializados en LATAM. No empezamos de cero; activamos nuestra red para entregar 
                  resultados con una velocidad y precisión inigualables.
                </p>
              </div>

              {/* Enfoque 360° */}
              <div className="bg-card rounded-lg p-8 shadow-elegant">
                <h2 className="text-2xl font-display font-semibold mb-4">
                  Enfoque 360°
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Desde un auditor especializado hasta un Director Regional, entendemos las 
                  necesidades de cada nivel organizacional.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              ¿Listo para potenciar su equipo?
            </h2>
            <Button asChild className="btn-hero">
              <Link to="/contacto">Escríbenos por WhatsApp</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default QuienesSomos;