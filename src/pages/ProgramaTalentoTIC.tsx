import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Lightbulb, Award, Phone, Mail, CheckCircle, TrendingUp, Users2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";

const ProgramaTalentoTIC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('programaTalentoTIC.title')}</title>
        <meta name="description" content={t('programaTalentoTIC.description')} />
        <meta name="keywords" content={t('programaTalentoTIC.keywords')} />
        <meta property="og:title" content={t('programaTalentoTIC.title')} />
        <meta property="og:description" content={t('programaTalentoTIC.description')} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('programaTalentoTIC.title')} />
        <meta name="twitter:description" content={t('programaTalentoTIC.description')} />
      </Helmet>
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section with TIC Talento Branding */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight" dangerouslySetInnerHTML={{__html: t('programaTalentoTIC.hero.heading')}} />
                <p className="text-xl text-blue-100 leading-relaxed mb-8">
                  {t('programaTalentoTIC.hero.subheading')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-cyan-400 hover:bg-cyan-300 text-blue-900 font-semibold px-8 py-3">
                    <Link to="/contacto">{t('programaTalentoTIC.hero.cta')}</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent rounded-full blur-3xl"></div>
                <img 
                  src="/lovable-uploads/aa173f7b-4df3-46c2-a94d-5be3c0deb921.png" 
                  alt="TIC Talento Hero" 
                  className="relative z-10 w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-cyan-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">{t('programaTalentoTIC.statistics.shortage.value')}</div>
                <div className="text-cyan-600 font-semibold mb-2">{t('programaTalentoTIC.statistics.shortage.title')}</div>
                <p className="text-gray-600">{t('programaTalentoTIC.statistics.shortage.description')}</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border border-cyan-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">{t('programaTalentoTIC.statistics.gap.value')}</div>
                <div className="text-cyan-600 font-semibold mb-2">{t('programaTalentoTIC.statistics.gap.title')}</div>
                <p className="text-gray-600">{t('programaTalentoTIC.statistics.gap.description')}</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border border-cyan-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">{t('programaTalentoTIC.statistics.demand.value')}</div>
                <div className="text-cyan-600 font-semibold mb-2">{t('programaTalentoTIC.statistics.demand.title')}</div>
                <p className="text-gray-600">{t('programaTalentoTIC.statistics.demand.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Qué es TIC Talento? */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-blue-800">
              {t('programaTalentoTIC.whatIs.title')}
            </h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-700 mb-6">
                {t('programaTalentoTIC.whatIs.description1')}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {t('programaTalentoTIC.whatIs.description2')}
              </p>
              <p className="text-lg text-gray-700">
                {t('programaTalentoTIC.whatIs.description3')}
              </p>
            </div>
          </div>
        </section>

        {/* Beneficios para las empresas */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-blue-800">
              {t('programaTalentoTIC.benefitsCompanies.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Users className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">{t('programaTalentoTIC.benefitsCompanies.preselectedTalent.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {t('programaTalentoTIC.benefitsCompanies.preselectedTalent.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Lightbulb className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">{t('programaTalentoTIC.benefitsCompanies.impactProjects.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {t('programaTalentoTIC.benefitsCompanies.impactProjects.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Users2 className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">{t('programaTalentoTIC.benefitsCompanies.culturalAdaptation.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {t('programaTalentoTIC.benefitsCompanies.culturalAdaptation.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Award className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">{t('programaTalentoTIC.benefitsCompanies.visibility.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {t('programaTalentoTIC.benefitsCompanies.visibility.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">{t('programaTalentoTIC.benefitsCompanies.sustainableGrowth.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {t('programaTalentoTIC.benefitsCompanies.sustainableGrowth.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Beneficios para los jóvenes */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-blue-800">
              {t('programaTalentoTIC.benefitsYoung.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <GraduationCap className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">{t('programaTalentoTIC.benefitsYoung.practicalExperience.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {t('programaTalentoTIC.benefitsYoung.practicalExperience.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Lightbulb className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">{t('programaTalentoTIC.benefitsYoung.realProjects.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {t('programaTalentoTIC.benefitsYoung.realProjects.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Award className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">{t('programaTalentoTIC.benefitsYoung.internationalTraining.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {t('programaTalentoTIC.benefitsYoung.internationalTraining.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <Users className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">{t('programaTalentoTIC.benefitsYoung.specializedMentoring.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {t('programaTalentoTIC.benefitsYoung.specializedMentoring.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-cyan-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-700">{t('programaTalentoTIC.benefitsYoung.jobInsertion.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {t('programaTalentoTIC.benefitsYoung.jobInsertion.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certificate Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6" dangerouslySetInnerHTML={{__html: t('programaTalentoTIC.certification.title')}} />
                <p className="text-blue-100 text-lg mb-6">
                  {t('programaTalentoTIC.certification.description')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-cyan-300 flex-shrink-0" />
                    <span>{t('programaTalentoTIC.certification.requirements.talks')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-cyan-300 flex-shrink-0" />
                    <span>{t('programaTalentoTIC.certification.requirements.mentoring')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-cyan-300 flex-shrink-0" />
                    <span>{t('programaTalentoTIC.certification.requirements.hiring')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-cyan-300 flex-shrink-0" />
                    <span>{t('programaTalentoTIC.certification.requirements.networking')}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/384b0134-c54d-4f2d-9d89-8174e50ed97b.png" 
                  alt="Certificado TIC Talento" 
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ¿Cómo funciona? */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-blue-800">
              {t('programaTalentoTIC.howItWorks.title')}
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-8 text-center">
                {t('programaTalentoTIC.howItWorks.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-8 shadow-lg border border-cyan-100">
                  <h3 className="text-xl font-display font-bold mb-4 text-blue-700">{t('programaTalentoTIC.howItWorks.companyCriteria.title')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-600">{t('programaTalentoTIC.howItWorks.companyCriteria.internships')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-600">{t('programaTalentoTIC.howItWorks.companyCriteria.talks')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-600">{t('programaTalentoTIC.howItWorks.companyCriteria.training')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-600">{t('programaTalentoTIC.howItWorks.companyCriteria.employment')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-8 shadow-lg border border-cyan-100">
                  <h3 className="text-xl font-display font-bold mb-4 text-blue-700">{t('programaTalentoTIC.howItWorks.ourCommitment.title')}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('programaTalentoTIC.howItWorks.ourCommitment.description1')}
                  </p>
                  <p className="text-gray-600">
                    {t('programaTalentoTIC.howItWorks.ourCommitment.description2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestra Visión */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6 text-blue-800">
              {t('programaTalentoTIC.vision.title')}
            </h2>
            <p className="text-lg text-gray-700">
              {t('programaTalentoTIC.vision.description')}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6 text-blue-800">
              {t('programaTalentoTIC.cta.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('programaTalentoTIC.cta.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-8 shadow-lg border border-cyan-100">
                <h3 className="text-xl font-display font-bold mb-4 text-blue-700">{t('programaTalentoTIC.cta.companies.title')}</h3>
                <p className="text-gray-600">
                  {t('programaTalentoTIC.cta.companies.description')}
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-lg border border-cyan-100">
                <h3 className="text-xl font-display font-bold mb-4 text-blue-700">{t('programaTalentoTIC.cta.students.title')}</h3>
                <p className="text-gray-600">
                  {t('programaTalentoTIC.cta.students.description')}
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              {t('programaTalentoTIC.cta.contact.signupHere')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-12 py-4 text-sm">
                <Link to="/contacto">{t('programaTalentoTIC.cta.contact.form')}</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 px-12 py-4"
                asChild
              >
                <a href="https://wa.me/message/IH46LPYOLH4CH1">
                  <Phone className="w-4 h-4 mr-2" />
                  {t('programaTalentoTIC.cta.contact.whatsapp')}
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-12 py-4"
                onClick={() => window.open('mailto:email@ticselect.com?subject=Consulta sobre Programa TIC Talento', '_blank')}
              >
                <Mail className="w-4 h-4 mr-2" />
                {t('programaTalentoTIC.cta.contact.email')}
              </Button>
            </div>
            
            {/* Subtle TIC Select attribution */}
            <div className="mt-12 flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span>{t('programaTalentoTIC.cta.contact.developedBy')}</span>
              <img 
                src="/lovable-uploads/42d7e844-a2f7-47e6-9cbc-b08fab2c11e2.png" 
                alt="TIC Select" 
                className="h-4 w-auto opacity-70"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramaTalentoTIC;