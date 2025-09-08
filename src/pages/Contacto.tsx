import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";

const Contacto = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{t('contact.meta.title') || 'Contacto - TIC Select'}</title>
        <meta name="description" content={t('contact.meta.description') || 'Contacta con TIC Select para consultas sobre nuestros servicios de reclutamiento tecnológico.'} />
      </Helmet>

      <Navigation />

      <main className="flex-1">
        <section className="py-16 bg-gradient-to-r from-primary/5 to-primary-glow/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-elegant bg-clip-text text-transparent">
                {t('contact.title') || 'Contacto'}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('contact.subtitle') || 'Ponte en contacto con nosotros'}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <p className="text-center text-lg">
                Formulario de contacto próximamente disponible.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;