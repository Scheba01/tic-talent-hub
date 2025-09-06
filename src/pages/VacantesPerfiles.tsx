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
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";

const VacantesPerfiles = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://ticselect.com/vacantes-y-perfiles" />
        <meta property="og:url" content="https://ticselect.com/vacantes-y-perfiles" />
      </Helmet>
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {t('jobs.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {t('jobs.subtitle')}
            </p>
            <Button asChild className="btn-hero">
              <Link to="/registro-talento">{t('jobs.register_now')}</Link>
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              {t('jobs.why_register')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <Card className="shadow-elegant">
                <CardContent className="p-8 text-center">
                  <Database className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-display font-semibold mb-4">
                    {t('jobs.benefit1.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('jobs.benefit1.desc')}
                  </p>
                </CardContent>
              </Card>

              {/* Benefit 2 */}
              <Card className="shadow-elegant">
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-display font-semibold mb-4">
                    {t('jobs.benefit2.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('jobs.benefit2.desc')}
                  </p>
                </CardContent>
              </Card>

              {/* Benefit 3 */}
              <Card className="shadow-elegant">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-display font-semibold mb-4">
                    {t('jobs.benefit3.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('jobs.benefit3.desc')}
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
              {t('jobs.how_it_works')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">
                  {t('jobs.step1.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('jobs.step1.desc')}
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">
                  {t('jobs.step2.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('jobs.step2.desc')}
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">
                  {t('jobs.step3.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('jobs.step3.desc')}
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">
                  {t('jobs.step4.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('jobs.step4.desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              {t('jobs.cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('jobs.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild className="btn-hero">
                <Link to="/registro-talento">{t('jobs.register_free')}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contacto">{t('jobs.more_info')}</Link>
              </Button>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              {t('why.ready.desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button asChild variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 px-12 py-4 text-sm">
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
                onClick={() => window.open('mailto:email@ticselect.com?subject=Consulta sobre oportunidades laborales', '_blank')}
              >
                <Mail className="w-4 h-4 mr-2" />
                {t('why.direct_email')}
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
                  {t('jobs.network_advantages')}
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {t('jobs.advantage1')}
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {t('jobs.advantage2')}
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {t('jobs.advantage3')}
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {t('jobs.advantage4')}
                    </span>
                  </li>
                </ul>
              </div>
              
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <Users className="w-16 h-16 text-primary mb-6" />
                  <h3 className="text-2xl font-display font-bold mb-4">
                    {t('jobs.join_professionals')}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t('jobs.join_community')}
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/registro-talento">{t('jobs.start_now')}</Link>
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