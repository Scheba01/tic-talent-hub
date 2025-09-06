import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Shield, Users, BarChart3, TrendingUp, MessageSquare, Target, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";

const ServiciosEmpresas = () => {
  const { t, language } = useLanguage();
  return <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://ticselect.com/servicios-para-empresas" />
        <meta property="og:url" content="https://ticselect.com/servicios-para-empresas" />
      </Helmet>
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {t('services_page.title')}
            </h1>
          </div>
        </section>

        {/* Section 1: Recruiting & Headhunting */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">
                {t('services_page.executive_search.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('services_page.executive_search.subtitle')}
              </p>
            </div>

            <h3 className="text-xl font-display font-semibold mb-8 text-center">{t('services_page.process')}</h3>
            
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    1
                  </div>
                  <h4 className="font-display font-semibold mb-2">{t('services_page.step1.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('services_page.step1.desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    2
                  </div>
                  <h4 className="font-display font-semibold mb-2">{t('services_page.step2.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('services_page.step2.desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    3
                  </div>
                  <h4 className="font-display font-semibold mb-2">{t('services_page.step3.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('services_page.step3.desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    4
                  </div>
                  <h4 className="font-display font-semibold mb-2">{t('services_page.step4.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('services_page.step4.desc')}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Value Proposition - Redesigned Clean Version */}
            <div className="bg-white rounded-2xl p-8 border border-primary/20 shadow-elegant mb-12">
              {/* Main Promise */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  {t('services_page.promise')}
                </h3>
              </div>

              {/* Benefits - Clean List with Larger Size */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-6 p-6 rounded-lg hover:bg-primary/5 transition-colors">
                  <CheckCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg text-foreground font-medium leading-relaxed">
                      {t('services_page.benefit1')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 rounded-lg hover:bg-primary/5 transition-colors">
                  <CheckCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg text-foreground font-medium leading-relaxed">
                      {t('services_page.benefit2')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 rounded-lg hover:bg-primary/5 transition-colors">
                  <CheckCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg text-foreground font-medium leading-relaxed">
                      {t('services_page.benefit3')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 rounded-lg hover:bg-primary/5 transition-colors">
                  <CheckCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg text-foreground font-medium leading-relaxed">
                      {t('services_page.benefit4')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantee - Prominent Banner */}
              <div className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <Shield className="w-12 h-12 text-white" />
                  <div className="text-center">
                    <h4 className="text-2xl font-bold mb-2">{t('services_page.guarantee.title')}</h4>
                    <p className="text-lg text-white/90">{t('services_page.guarantee.desc')}</p>
                  </div>
                </div>
              </div>

              {/* Strong CTA */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-xl p-6">
                  <p className="text-xl font-bold text-primary mb-6">
                    💡 {t('services_page.cta.title')}<br/>
                    <span className="text-2xl">{t('services_page.cta.subtitle')}</span>
                  </p>
                  <Button asChild size="lg" className="btn-hero text-xl px-12 py-4 h-auto">
                    <Link to="/contacto">
                      🚀 {t('services_page.cta.button')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: HR Consultancy */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">{t('services_page.hr_consulting.title')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('services_page.hr_consulting.desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">{t('services_page.hr_retention.title')}</h4>
                  <p className="text-muted-foreground">
                    {t('services_page.hr_retention.desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">{t('services_page.hr_climate.title')}</h4>
                  <p className="text-muted-foreground">
                    {t('services_page.hr_climate.desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">{t('services_page.hr_salary.title')}</h4>
                  <p className="text-muted-foreground">
                    {t('services_page.hr_salary.desc')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 3: Development & Coaching */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">{t('services_page.coaching.title')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('services_page.coaching.desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="text-center shadow-elegant">
                <CardContent className="p-8">
                  <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">{t('services_page.coaching_skills.title')}</h4>
                  <p className="text-muted-foreground">
                    {t('services_page.coaching_skills.desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-elegant">
                <CardContent className="p-8">
                  <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold mb-4">{t('services_page.coaching_career.title')}</h4>
                  <p className="text-muted-foreground">
                    {t('services_page.coaching_career.desc')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 4: Para Empresas - Nuestro Universo de Talento */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">
                {t('services_page.talent_universe.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                {t('services_page.talent_universe.desc')}
              </p>
            </div>

            {/* Perfiles que Cubrimos */}
            <div className="mb-16">
              <h3 className="text-2xl font-display font-bold mb-8 text-center">
                {t('profiles_covered.title')}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Perfiles Especializados del Sector TIC */}
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl font-display font-bold text-primary">
                      {t('profiles_covered.ict_specialized')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{t('profiles_covered.auditors')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• {t('nav.home') === 'Home' ? 'Lead and Technical Auditors (ISO 9001, 14001, 45001, 27001, 50001, etc.)' : t('nav.home') === 'Início' ? 'Auditores Líderes e Técnicos (ISO 9001, 14001, 45001, 27001, 50001, etc.)' : 'Auditores Líderes y Técnicos (ISO 9001, 14001, 45001, 27001, 50001, etc.)'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Product and System Certification Specialists' : t('nav.home') === 'Início' ? 'Especialistas em Certificação de Produtos e Sistemas' : 'Especialistas en Certificación de Productos y Sistemas'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Food Safety Auditors (FSSC 22000, BRC, HACCP)' : t('nav.home') === 'Início' ? 'Auditores de Segurança Alimentar (FSSC 22000, BRC, HACCP)' : 'Auditores de Seguridad Alimentaria (FSSC 22000, BRC, HACCP)'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Compliance and Regulatory Affairs Experts' : t('nav.home') === 'Início' ? 'Especialistas em Compliance e Assuntos Regulatórios' : 'Expertos en Compliance y Asuntos Regulatorios'}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{t('profiles_covered.inspectors')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• {t('nav.home') === 'Home' ? 'Specialized Inspectors (Welding Level I-II, Non-Destructive Testing - NDT, API, Lifting)' : t('nav.home') === 'Início' ? 'Inspetores Especializados (Soldagem Nível I-II, Ensaios Não Destrutivos - NDT, API, Içamento)' : 'Inspectores Especializados (Soldadura Nivel I-II, Ensayos No Destructivos - NDT, API, Izaje)'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Technical Inspectors (Electrical, Mechanical, Civil, Coatings)' : t('nav.home') === 'Início' ? 'Inspetores Técnicos (Elétricos, Mecânicos, Civis, Revestimentos)' : 'Inspectores Técnicos (Eléctricos, Mecánicos, Civiles, Recubrimientos)'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Cargo, Maritime and Commodity Inspectors' : t('nav.home') === 'Início' ? 'Inspetores de Carga, Marítimos e de Commodities' : 'Inspectores de Carga, Marítimos y de Commodities'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Field Supervisors' : t('nav.home') === 'Início' ? 'Supervisores de Campo' : 'Supervisores de Terreno'}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{t('profiles_covered.lab')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• {t('nav.home') === 'Home' ? 'Laboratory Analysts (Chemical, Microbiological, Physical-Chemical)' : t('nav.home') === 'Início' ? 'Analistas de Laboratório (Químicos, Microbiológicos, Físico-Químicos)' : 'Analistas de Laboratorio (Químicos, Microbiológicos, Físico-Químicos)'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Laboratory Managers and Supervisors (Under ISO/IEC 17025 standard)' : t('nav.home') === 'Início' ? 'Chefes e Supervisores de Laboratório (Sob norma ISO/IEC 17025)' : 'Jefes y Supervisores de Laboratorio (Bajo norma ISO/IEC 17025)'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Metrology and Calibration Technicians' : t('nav.home') === 'Início' ? 'Técnicos de Metrologia e Calibração' : 'Técnicos de Metrología y Calibración'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Geochemists and Sample Analysts' : t('nav.home') === 'Início' ? 'Geoquímicos e Analistas de Amostras' : 'Geoquímicos y Analistas de Muestras'}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{t('profiles_covered.engineering')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• {t('nav.home') === 'Home' ? 'Quality Engineers (QA/QC)' : t('nav.home') === 'Início' ? 'Engenheiros de Qualidade (QA/QC)' : 'Ingenieros de Calidad (QA/QC)'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Project and Reliability Engineers' : t('nav.home') === 'Início' ? 'Engenheiros de Projetos e de Confiabilidade' : 'Ingenieros de Proyectos y de Confiabilidad'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Risk Prevention Managers, Supervisors and Experts (HSE / HSEQ)' : t('nav.home') === 'Início' ? 'Chefes, Supervisores e Especialistas em Prevenção de Riscos (HSE / HSEQ)' : 'Jefes, Supervisores y Expertos en Prevención de Riesgos (HSE / HSEQ)'}</li>
                        <li>• {t('nav.home') === 'Home' ? 'Environmental Engineers and Sustainability Consultants' : t('nav.home') === 'Início' ? 'Engenheiros Ambientais e Consultores de Sustentabilidade' : 'Ingenieros Ambientales y Consultores de Sostenibilidad'}</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Áreas Funcionales y Corporativas */}
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl font-display font-bold text-primary">
                      {t('profiles_covered.functional_corporate')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{t('profiles_covered.executive')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• {t('nav.home') === 'Home' ? 'CEO, Country Manager, General Managers, Regional Directors and Business Unit Directors' : t('nav.home') === 'Início' ? 'CEO, Country Manager, Gerentes Gerais, Diretores Regionais e de Unidades de Negócio' : 'CEO, Country Manager, Gerentes Generales, Directores Regionales y de Unidades de Negocio'}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{t('profiles_covered.commercial')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• {t('nav.home') === 'Home' ? 'Commercial Managers, Key Account Managers (KAM), Technical Sales Executives' : t('nav.home') === 'Início' ? 'Gerentes Comerciais, Key Account Managers (KAM), Executivos de Vendas Técnicas' : 'Gerentes Comerciales, Key Account Managers (KAM), Ejecutivos de Ventas Técnicas'}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{t('profiles_covered.operations')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• {t('nav.home') === 'Home' ? 'Operations Managers, Project Managers (PMP), Planners' : t('nav.home') === 'Início' ? 'Gerentes de Operações, Chefes de Projeto (PMP), Planejadores' : 'Gerentes de Operaciones, Jefes de Proyecto (PMP), Planificadores'}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{t('profiles_covered.finance')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• {t('nav.home') === 'Home' ? 'Finance Managers, Controllers, Accounting and Procurement Managers' : t('nav.home') === 'Início' ? 'Gerentes de Finanças, Controllers, Chefes de Contabilidade e Aquisições' : 'Gerentes de Finanzas, Controllers, Jefes de Contabilidad y Adquisiciones'}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{t('profiles_covered.hr')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• {t('nav.home') === 'Home' ? 'HR Managers, HR Business Partners (HRBP), Talent Acquisition Managers' : t('nav.home') === 'Início' ? 'Gerentes de RH, HR Business Partners (HRBP), Chefes de Aquisição de Talentos' : 'Gerentes de RRHH, HR Business Partners (HRBP), Jefes de Adquisición de Talento'}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{t('profiles_covered.tech')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• {t('nav.home') === 'Home' ? 'IT Managers, Digital Transformation Leaders, B2B Marketing Managers' : t('nav.home') === 'Início' ? 'Gerentes de TI, Líderes de Transformação Digital, Gerentes de Marketing B2B' : 'Gerentes de TI, Líderes de Transformación Digital, Gerentes de Marketing B2B'}</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Industrias Estratégicas */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-8 text-center">
                {t('profiles_covered.strategic_industries')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(t('nav.home') === 'Home' ? [
                  "Energy, Oil and Gas",
                  "Mining and Metals", 
                  "Environment and Sustainability",
                  "Construction and Infrastructure",
                  "Agriculture and Food",
                  "Industrial Manufacturing and Machinery",
                  "Transportation and Logistics (Automotive, Naval, Aerospace)",
                  "Consumer Goods and Retail",
                  "Life Sciences (Pharmaceutical and Health)"
                ] : t('nav.home') === 'Início' ? [
                  "Energia, Petróleo e Gás",
                  "Mineração e Metais", 
                  "Meio Ambiente e Sustentabilidade",
                  "Construção e Infraestrutura",
                  "Agricultura e Alimentos",
                  "Manufatura Industrial e Maquinário",
                  "Transporte e Logística (Automotivo, Naval, Aeroespacial)",
                  "Bens de Consumo e Varejo",
                  "Ciências da Vida (Farmacêutica e Saúde)"
                ] : [
                  "Energía, Petróleo y Gas",
                  "Minería y Metales", 
                  "Medio Ambiente y Sostenibilidad",
                  "Construcción e Infraestructura",
                  "Agricultura y Alimentos",
                  "Manufactura Industrial y Maquinaria",
                  "Transporte y Logística (Automotriz, Naval, Aeroespacial)",
                  "Bienes de Consumo y Retail",
                  "Ciencias de la Vida (Farmacéutica y Salud)"
                ]).map((industry, index) => (
                  <Card key={index} className="shadow-elegant bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:from-primary/10 hover:to-primary/15 transition-all duration-300">
                    <CardContent className="p-6 h-24 flex items-center justify-center">
                      <p className="font-semibold text-primary text-center leading-tight text-base">{industry}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Desarrollo & Coaching */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">{t('development.title')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('development.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{t('development.executive_coaching')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>{t('nav.home') === 'Home' ? 'Technical leadership skills development' : t('nav.home') === 'Início' ? 'Desenvolvimento de habilidades de liderança técnica' : 'Desarrollo de habilidades de liderazgo técnico'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>{t('nav.home') === 'Home' ? 'Multidisciplinary team management' : t('nav.home') === 'Início' ? 'Gestão de equipes multidisciplinares' : 'Gestión de equipos multidisciplinarios'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>{t('nav.home') === 'Home' ? 'Effective communication with technical stakeholders' : t('nav.home') === 'Início' ? 'Comunicação efetiva com stakeholders técnicos' : 'Comunicación efectiva con stakeholders técnicos'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>{t('nav.home') === 'Home' ? 'Transition to roles with greater responsibility' : t('nav.home') === 'Início' ? 'Transição para funções de maior responsabilidade' : 'Transición a roles de mayor responsabilidad'}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{t('development.programs')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>{t('nav.home') === 'Home' ? 'Personalized career plans' : t('nav.home') === 'Início' ? 'Planos de carreira personalizados' : 'Planes de carrera personalizados'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>{t('nav.home') === 'Home' ? 'Specialized technical mentoring' : t('nav.home') === 'Início' ? 'Mentoria técnica especializada' : 'Mentoría técnica especializada'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>{t('nav.home') === 'Home' ? 'ICT professional certifications' : t('nav.home') === 'Início' ? 'Certificações profissionais em TIC' : 'Certificaciones profesionales en TIC'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>{t('nav.home') === 'Home' ? 'Soft skills development' : t('nav.home') === 'Início' ? 'Desenvolvimento de competências comportamentais' : 'Desarrollo de competencias blandas'}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                <h3 className="text-2xl font-display font-bold mb-6 text-primary">
                  {t('development.why_different')}
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p><strong>{t('nav.home') === 'Home' ? 'Field experience:' : t('nav.home') === 'Início' ? 'Experiência de campo:' : 'Experiencia de campo:'}</strong> {t('development.field_experience').split(': ')[1]}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p><strong>{t('nav.home') === 'Home' ? 'Proven methodology:' : t('nav.home') === 'Início' ? 'Metodologia comprovada:' : 'Metodología probada:'}</strong> {t('development.proven_methodology').split(': ')[1]}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p><strong>{t('nav.home') === 'Home' ? 'Continuous monitoring:' : t('nav.home') === 'Início' ? 'Acompanhamento contínuo:' : 'Seguimiento continuo:'}</strong> {t('development.continuous_monitoring').split(': ')[1]}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p><strong>{t('nav.home') === 'Home' ? 'Measurable ROI:' : t('nav.home') === 'Início' ? 'ROI mensurável:' : 'ROI medible:'}</strong> {t('development.measurable_roi').split(': ')[1]}</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button asChild className="btn-hero w-full">
                    <Link to="/contacto">
                      {t('development.free_consultation')}
                    </Link>
                  </Button>
                </div>
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
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiciosEmpresas;