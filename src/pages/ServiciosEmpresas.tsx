import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Shield, Users, BarChart3, TrendingUp, MessageSquare, Target, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ServiciosEmpresas = () => {
  const { t } = useLanguage();
  return <div className="min-h-screen bg-background">
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
                Perfiles que Cubrimos: Nuestra Doble Expertise
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Perfiles Especializados del Sector TIC */}
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl font-display font-bold text-primary">
                      Perfiles Especializados del Sector TIC
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Auditores y Especialistas en Normas:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Auditores Líderes y Técnicos (ISO 9001, 14001, 45001, 27001, 50001, etc.)</li>
                        <li>• Especialistas en Certificación de Productos y Sistemas</li>
                        <li>• Auditores de Seguridad Alimentaria (FSSC 22000, BRC, HACCP)</li>
                        <li>• Expertos en Compliance y Asuntos Regulatorios</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Inspectores de Campo:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Inspectores Especializados (Soldadura Nivel I-II, Ensayos No Destructivos - NDT, API, Izaje)</li>
                        <li>• Inspectores Técnicos (Eléctricos, Mecánicos, Civiles, Recubrimientos)</li>
                        <li>• Inspectores de Carga, Marítimos y de Commodities</li>
                        <li>• Supervisores de Terreno</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Personal de Laboratorio:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Analistas de Laboratorio (Químicos, Microbiológicos, Físico-Químicos)</li>
                        <li>• Jefes y Supervisores de Laboratorio (Bajo norma ISO/IEC 17025)</li>
                        <li>• Técnicos de Metrología y Calibración</li>
                        <li>• Geoquímicos y Analistas de Muestras</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Ingeniería, Calidad y HSE:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Ingenieros de Calidad (QA/QC)</li>
                        <li>• Ingenieros de Proyectos y de Confiabilidad</li>
                        <li>• Jefes, Supervisores y Expertos en Prevención de Riesgos (HSE / HSEQ)</li>
                        <li>• Ingenieros Ambientales y Consultores de Sostenibilidad</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Áreas Funcionales y Corporativas */}
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl font-display font-bold text-primary">
                      Áreas Funcionales y Corporativas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Liderazgo Ejecutivo y Estrategia:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• CEO, Country Manager, Gerentes Generales, Directores Regionales y de Unidades de Negocio</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Comercial y Desarrollo de Negocios:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Gerentes Comerciales, Key Account Managers (KAM), Ejecutivos de Ventas Técnicas</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Operaciones y Proyectos:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Gerentes de Operaciones, Jefes de Proyecto (PMP), Planificadores</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Finanzas y Administración:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Gerentes de Finanzas, Controllers, Jefes de Contabilidad y Adquisiciones</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Recursos Humanos y Talento:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Gerentes de RRHH, HR Business Partners (HRBP), Jefes de Adquisición de Talento</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Tecnología, Innovación y Marketing:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Gerentes de TI, Líderes de Transformación Digital, Gerentes de Marketing B2B</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Industrias Estratégicas */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-8 text-center">
                Industrias Estratégicas que Servimos
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Energía, Petróleo y Gas",
                  "Minería y Metales", 
                  "Medio Ambiente y Sostenibilidad",
                  "Construcción e Infraestructura",
                  "Agricultura y Alimentos",
                  "Manufactura Industrial y Maquinaria",
                  "Transporte y Logística (Automotriz, Naval, Aeroespacial)",
                  "Bienes de Consumo y Retail",
                  "Ciencias de la Vida (Farmacéutica y Salud)"
                ].map((industry, index) => (
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
              <h2 className="text-3xl font-display font-bold mb-4">Desarrollo & Coaching</h2>
              <p className="text-xl text-muted-foreground">
                Potenciamos las habilidades de sus equipos con programas de desarrollo personalizados y coaching ejecutivo especializado en la industria TIC.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Coaching Ejecutivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Desarrollo de habilidades de liderazgo técnico</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Gestión de equipos multidisciplinarios</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Comunicación efectiva con stakeholders técnicos</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Transición a roles de mayor responsabilidad</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Programas de Desarrollo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Planes de carrera personalizados</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Mentoría técnica especializada</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Certificaciones profesionales en TIC</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span>Desarrollo de competencias blandas</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                <h3 className="text-2xl font-display font-bold mb-6 text-primary">
                  ¿Por qué nuestro enfoque es diferente?
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p><strong>Experiencia de campo:</strong> Nuestros coaches provienen de la industria TIC</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p><strong>Metodología probada:</strong> Casos de éxito en organizaciones similares</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p><strong>Seguimiento continuo:</strong> Acompañamiento durante todo el proceso</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p><strong>ROI medible:</strong> Métricas claras de progreso y resultados</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button asChild className="btn-hero w-full">
                    <Link to="/contacto">
                      🚀 Consulta gratuita sobre desarrollo
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
    </div>;
};
export default ServiciosEmpresas;