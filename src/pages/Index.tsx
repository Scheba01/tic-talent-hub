import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Shield, Users, Target, Award, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { preloadCriticalImages } from "@/utils/image-optimization";
import { injectCriticalCSS, loadNonCriticalCSS } from "@/utils/critical-css";
import { getPerformanceMonitor, markCriticalResourcesLoaded } from "@/utils/performance-monitor";
import { CTALinks, RelatedLinks, ContextualLink } from "@/components/InternalLinks";
import ExploreMoreSection from "@/components/ExploreMoreSection";
const Index = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    const startTime = performance.now();
    
    // Inject critical CSS immediately
    injectCriticalCSS();
    // Preload critical images
    preloadCriticalImages();
    // Load non-critical CSS asynchronously
    loadNonCriticalCSS();
    
    // Mark critical resources as loaded
    markCriticalResourcesLoaded();
    
    // Initialize performance monitoring
    const monitor = getPerformanceMonitor();
    
    // Log performance metrics after page load
    setTimeout(() => {
      monitor.logMetrics();
      const assessment = monitor.assessPerformance();
      console.log(`Performance Score: ${assessment.score}/100`);
      if (assessment.recommendations.length > 0) {
        console.log('Recommendations:', assessment.recommendations);
      }
    }, 3000);
    
    return () => {
      monitor.destroy();
    };
  }, []);

  return <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://ticselect.com/" />
        <meta property="og:url" content="https://ticselect.com/" />
        <link rel="preload" as="image" href="/lovable-uploads/tic-select-logo.webp" />
        <link rel="preload" as="style" href="/src/index.css" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Helmet>
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section - Optimized for mobile Core Web Vitals */}
        <section className="critical-hero relative py-8 md:py-16 bg-black text-white flex items-center justify-center">
          <div className="critical-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="critical-text text-4xl md:text-6xl font-display font-bold mb-6 fade-in-fast">
              {t('hero.title')}
            </h1>
            <p className="critical-text text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed scale-in-fast">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center gpu-accelerated">
              <Button asChild className="btn-outline-hero">
                <Link to="/servicios-para-empresas">{t('hero.discover_services')}</Link>
              </Button>
              <Button asChild className="critical-btn-hero">
                <Link to="/contacto">{t('hero.contact_us')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Nuestra Promesa */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6">
                {t('promise.title')}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-elegant">
                <CardHeader>
                  <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">{t('promise.shortlist.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('promise.shortlist.desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardHeader>
                  <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">{t('promise.guarantee.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('promise.guarantee.desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardHeader>
                  <Target className="w-16 h-16 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">{t('promise.zero_risk.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('promise.zero_risk.desc')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-display font-bold mb-8">
                  {t('why.title')}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Users className="w-8 h-8 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2">{t('why.experience.title')}</h3>
                      <p className="text-muted-foreground">
                        {t('why.experience.desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Award className="w-8 h-8 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2">{t('why.talent.title')}</h3>
                      <p className="text-muted-foreground">
                        {t('why.talent.desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-8 h-8 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2">{t('why.approach.title')}</h3>
                      <p className="text-muted-foreground">
                        {t('why.approach.desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-8 shadow-elegant">
                <h3 className="text-2xl font-display font-bold mb-6">{t('why.ready.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('why.ready.desc')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button asChild variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 px-12 py-4 text-xs">
                    <Link to="/contacto">{t('why.contact_form')}</Link>
                  </Button>
              <Button
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 px-12 py-4"
                asChild
              >
                <a href="https://wa.me/message/IH46LPYOLH4CH1">
                  <Phone className="w-4 h-4 mr-2" />
                  {t('why.whatsapp')}
                </a>
              </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 px-12 py-4"
                    onClick={() => window.open('mailto:email@ticselect.com?subject=Consulta sobre servicios TIC Select', '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {t('why.direct_email')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-12">
              {t('services.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              <Card className="shadow-elegant flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('services.executive_search.title')}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6">
                    {t('services.executive_search.desc')}
                  </p>
                  <Button asChild variant="outline" className="w-full mt-auto">
                    <Link to="/servicios-para-empresas">{t('services.see_more')}</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-elegant flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('services.hr_consulting.title')}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6">
                    {t('services.hr_consulting.desc')}
                  </p>
                  <Button asChild variant="outline" className="w-full mt-auto">
                    <Link to="/servicios-para-empresas">{t('services.see_more')}</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-elegant flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('services.coaching.title')}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6">
                    {t('services.coaching.desc')}
                  </p>
                  <Button asChild variant="outline" className="w-full mt-auto">
                    <Link to="/servicios-para-empresas">{t('services.see_more')}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-16">
              <CTALinks 
                primary={{
                  text: t('hero.contact_us'),
                  href: language === 'en' ? '/contact' : language === 'pt' ? '/contato' : '/contacto'
                }}
                secondary={{
                  text: t('nav.talent_program'),
                  href: language === 'en' ? '/tic-talent-program' : language === 'pt' ? '/programa-talento-tic' : '/programa-talentotic'
                }}
              />
            </div>
          </div>
        </section>

        {/* Enhanced Explore More Section */}
        <ExploreMoreSection
          currentPage="/"
          description="Descubre cómo nuestros servicios especializados pueden ayudar a tu empresa a encontrar el talento adecuado en la industria TIC."
          primaryCTA={{
            text: t('hero.contact_us'),
            href: language === 'en' ? '/contact' : language === 'pt' ? '/contato' : '/contacto'
          }}
          secondaryCTA={{
            text: t('nav.services'),
            href: language === 'en' ? '/enterprise-services' : language === 'pt' ? '/servicos-empresas' : '/servicios-para-empresas'
          }}
          maxLinks={4}
          showGradient={true}
        />
      </main>

      <Footer />
    </div>;
};
export default Index;