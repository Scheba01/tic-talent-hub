import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Target, Gift, Award, Handshake, TrendingUp, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";

const ProgramaAfiliados = () => {
  const { t } = useLanguage();
  const benefits = [
    {
      icon: DollarSign,
      title: t('affiliate.benefits.competitive_commissions'),
      description: t('affiliate.benefits.competitive_commissions_desc')
    },
    {
      icon: Target,
      title: t('affiliate.benefits.smart_segmentation'),
      description: t('affiliate.benefits.smart_segmentation_desc')
    },
    {
      icon: Award,
      title: t('affiliate.benefits.volume_bonuses'),
      description: t('affiliate.benefits.volume_bonuses_desc')
    },
    {
      icon: TrendingUp,
      title: t('affiliate.benefits.sustainable_growth'),
      description: t('affiliate.benefits.sustainable_growth_desc')
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: t('affiliate.step1.title'),
      description: t('affiliate.step1.desc')
    },
    {
      step: "2",
      title: t('affiliate.step2.title'),
      description: t('affiliate.step2.desc')
    },
    {
      step: "3",
      title: t('affiliate.step3.title'),
      description: t('affiliate.step3.desc')
    }
  ];

  const requirements = [
    t('nav.home') === 'Home' ? "Experience in the TIC sector or human resources" : t('nav.home') === 'Início' ? "Experiência no setor TIC ou recursos humanos" : "Experiencia en el sector TIC o recursos humanos",
    t('nav.home') === 'Home' ? "Active professional network on LinkedIn or other platforms" : t('nav.home') === 'Início' ? "Rede profissional ativa no LinkedIn ou outras plataformas" : "Red profesional activa en LinkedIn u otras plataformas",
    t('nav.home') === 'Home' ? "Ability to generate at least 5 monthly referrals" : t('nav.home') === 'Início' ? "Capacidade de gerar pelo menos 5 indicações mensais" : "Capacidad para generar al menos 5 referencias mensuales",
    t('nav.home') === 'Home' ? "Knowledge of the Chilean labor market" : t('nav.home') === 'Início' ? "Conhecimento do mercado de trabalho chileno" : "Conocimiento del mercado laboral chileno",
    t('nav.home') === 'Home' ? "Excellent communication skills" : t('nav.home') === 'Início' ? "Excelentes habilidades de comunicação" : "Excelentes habilidades de comunicación"
  ];

  const commissionStructure = [
    {
      type: t('nav.home') === 'Home' ? "Candidate Registration" : t('nav.home') === 'Início' ? "Registro de Candidato" : "Registro Candidato",
      commission: "5%",
      description: t('nav.home') === 'Home' ? "For each TIC professional who successfully registers" : t('nav.home') === 'Início' ? "Por cada profissional TIC que se registrar com sucesso" : "Por cada profesional TIC que se registre exitosamente"
    },
    {
      type: t('nav.home') === 'Home' ? "Successful Placement" : t('nav.home') === 'Início' ? "Colocação Bem-sucedida" : "Colocación Exitosa",
      commission: "15%",
      description: t('nav.home') === 'Home' ? "When a referred candidate is hired by a company" : t('nav.home') === 'Início' ? "Quando um candidato indicado é contratado por uma empresa" : "Cuando un candidato referido es contratado por una empresa"
    },
    {
      type: t('nav.home') === 'Home' ? "Company Client" : t('nav.home') === 'Início' ? "Cliente Empresa" : "Cliente Empresa",
      commission: "10%",
      description: t('nav.home') === 'Home' ? "For each new company that hires our services" : t('nav.home') === 'Início' ? "Por cada nova empresa que contratar nossos serviços" : "Por cada empresa nueva que contrate nuestros servicios"
    },
    {
      type: t('nav.home') === 'Home' ? "Volume Bonus" : t('nav.home') === 'Início' ? "Bônus de Volume" : "Bono Volumen",
      commission: t('nav.home') === 'Home' ? "Extra 5%" : t('nav.home') === 'Início' ? "5% Extra" : "Extra 5%",
      description: t('nav.home') === 'Home' ? "When exceeding 10 successful placements in a quarter" : t('nav.home') === 'Início' ? "Ao superar 10 colocações bem-sucedidas em um trimestre" : "Al superar 10 colocaciones exitosas en un trimestre"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://ticselect.com/programa-afiliados" />
        <meta property="og:url" content="https://ticselect.com/programa-afiliados" />
      </Helmet>
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-4">{t('nav.home') === 'Home' ? 'Affiliate Program' : t('nav.home') === 'Início' ? 'Programa de Afiliados' : 'Programa de Afiliados'}</Badge>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
                {t('affiliate.title')}
                <span className="text-primary block">{t('affiliate.title_highlight')}</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {t('affiliate.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Handshake className="mr-2 h-5 w-5" />
                  {t('affiliate.apply_now')}
                </Button>
                <Button size="lg" variant="outline">
                  <Gift className="mr-2 h-5 w-5" />
                  {t('affiliate.know_benefits')}
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
                {t('affiliate.why_title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('affiliate.why_subtitle')}
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
                {t('affiliate.how_works')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('affiliate.how_works_subtitle')}
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
                {t('affiliate.commission_structure')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('affiliate.commission_subtitle')}
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
                {t('affiliate.requirements_title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('affiliate.requirements_subtitle')}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  {t('affiliate.profile_title')}
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
                  {t('affiliate.ready_title')}
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  {t('affiliate.ready_subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Handshake className="mr-2 h-5 w-5" />
                    {t('affiliate.request_membership')}
                  </Button>
                  <Button size="lg" variant="outline">
                    {t('affiliate.talk_specialist')}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  {t('affiliate.approval_time')}
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