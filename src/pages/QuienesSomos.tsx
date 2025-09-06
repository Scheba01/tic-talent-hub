import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";

const QuienesSomos = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('about.seo.title')}</title>
        <meta name="description" content={t('about.seo.description')} />
        <meta name="keywords" content={t('about.seo.keywords')} />
        <meta property="og:title" content={t('about.seo.title')} />
        <meta property="og:description" content={t('about.seo.description')} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('about.seo.title')} />
        <meta name="twitter:description" content={t('about.seo.description')} />
        <link rel="canonical" href="https://ticselect.com/quienes-somos" />
        <meta property="og:url" content="https://ticselect.com/quienes-somos" />
      </Helmet>
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('about.subtitle')}
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
                  {t('about.experts.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{t('about.experts.desc')}</p>
              </div>

              {/* Universo de Talento */}
              <div className="bg-card rounded-lg p-8 shadow-elegant">
                <h2 className="text-2xl font-display font-semibold mb-4">
                  {t('about.talent_universe.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.talent_universe.desc')}
                </p>
              </div>

              {/* Enfoque 360° */}
              <div className="bg-card rounded-lg p-8 shadow-elegant">
                <h2 className="text-2xl font-display font-semibold mb-4">
                  {t('about.approach.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.approach.desc')}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('about.cta.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button asChild variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 px-12 py-4 text-sm">
                <Link to="/contacto">{t('why.contact_form')}</Link>
              </Button>
              <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 px-12 py-4" asChild>
                <a href="https://wa.me/message/IH46LPYOLH4CH1">
                  <Phone className="w-4 h-4 mr-2" />
                  {t('why.whatsapp')}
                </a>
              </Button>
              <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 px-12 py-4" onClick={() => window.open('mailto:email@ticselect.com?subject=Consulta sobre servicios TIC Select', '_blank')}>
                <Mail className="w-4 h-4 mr-2" />
                {t('why.direct_email')}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default QuienesSomos;