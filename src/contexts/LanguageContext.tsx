import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['es', 'en', 'pt'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['es'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Quiénes Somos',
    'nav.services': 'Servicios para Empresas',
    'nav.jobs': 'Empleo',
    'nav.talent_program': 'Programa TIC Talento',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar Sesión',
    'nav.logout': 'Cerrar Sesión',
    'nav.talent_registration': 'Registro Talento',

    // Hero Section
    'hero.title': 'El Talento que Impulsa la Industria TIC',
    'hero.subtitle': 'Conectamos a los líderes del sector de Testeo, Inspección y Certificación (TIC) con el talento que necesitan para crecer. Le entregamos una shortlist en 7 días. Garantizado.',
    'hero.discover_services': 'Descubra Nuestros Servicios',
    'hero.contact_us': 'Contáctanos',

    // Promise Section
    'promise.title': 'Contratación Estratégica, Sin Riesgos',
    'promise.shortlist.title': 'Shortlist en 7 Días',
    'promise.shortlist.desc': 'Nuestra base de datos de talento pre-evaluado nos permite actuar con una agilidad que nadie más puede ofrecer.',
    'promise.guarantee.title': 'Garantía de 90 Días',
    'promise.guarantee.desc': 'Si el candidato no cumple las expectativas en sus primeros tres meses, buscamos un reemplazo sin costo alguno.',
    'promise.zero_risk.title': 'Riesgo Cero',
    'promise.zero_risk.desc': 'Usted solo invierte cuando ha decidido contratar a uno de nuestros candidatos. Sin anticipos ni costos ocultos.',

    // Why Choose Us
    'why.title': 'Nacimos de la Industria para Servir a la Industria',
    'why.experience.title': '+30 Años de Experiencia Combinada',
    'why.experience.desc': 'Nuestro equipo entiende las necesidades específicas del sector TIC porque proviene de él.',
    'why.talent.title': '+15,000 Talentos en LATAM',
    'why.talent.desc': 'Una red activa y en constante expansión de profesionales especializados en la región.',
    'why.approach.title': 'Enfoque 360°',
    'why.approach.desc': 'Desde auditores especializados hasta directores regionales, cubrimos todos los niveles.',
    'why.ready.title': '¿Listo para Comenzar?',
    'why.ready.desc': 'Elige la forma que prefieras para contactarnos',
    'why.contact_form': 'Formulario de Contacto',
    'why.whatsapp': 'WhatsApp',
    'why.direct_email': 'Email Directo',

    // Services
    'services.title': 'Nuestros Servicios',
    'services.executive_search.title': 'Selección y Búsqueda de Ejecutivos',
    'services.executive_search.desc': 'Su terna de candidatos en 7 días. Talento especializado en TIC con metodología probada y garantía de resultados.',
    'services.hr_consulting.title': 'Consultoría en Recursos Humanos',
    'services.hr_consulting.desc': 'Fortalezca las bases de su organización con estrategias de retención y desarrollo de talento.',
    'services.coaching.title': 'Desarrollo & Coaching',
    'services.coaching.desc': 'Potenciamos las habilidades de sus equipos con programas de desarrollo personalizados y coaching ejecutivo.',
    'services.see_more': 'Ver Más',

    // Contact Page
    'contact.title': 'Contacto',
    'contact.subtitle': '¿Listo para encontrar el talento que su empresa necesita? Hablemos sobre cómo podemos ayudarle a alcanzar sus objetivos de contratación.',
    'contact.form.title': 'Envíanos un Mensaje',
    'contact.form.full_name': 'Nombre Completo',
    'contact.form.email': 'Correo Electrónico',
    'contact.form.company': 'Empresa',
    'contact.form.phone': 'Teléfono',
    'contact.form.query_type': 'Tipo de Consulta',
    'contact.form.message': 'Mensaje',
    'contact.form.message_placeholder': 'Cuéntanos sobre tus necesidades de talento...',
    'contact.form.privacy_accept': 'Acepto el tratamiento de mis datos personales de acuerdo con la',
    'contact.form.privacy_policy': 'Política de Privacidad',
    'contact.form.send': 'Enviar Mensaje',
    'contact.form.sending': 'Enviando...',
    'contact.direct_title': 'O contáctanos directamente',
    'contact.info.title': 'Información de Contacto',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Teléfono',
    'contact.info.hours': 'Horario de Atención',
    'contact.info.hours_desc': 'Lunes a Viernes, 9:00 - 18:00 (UTC-3)',
    'contact.why.title': '¿Por qué Contactarnos?',
    'contact.why.consultation': 'Consultoría gratuita sobre sus necesidades de talento',
    'contact.why.proposal': 'Propuesta personalizada en 24 horas',
    'contact.why.no_commitment': 'Sin compromisos ni costos ocultos',
    'contact.why.immediate_access': 'Acceso inmediato a nuestra red de talento',

    // Footer
    'footer.quick_links': 'Enlaces Rápidos',
    'footer.community': 'Comunidad',
    'footer.contact': 'Contacto',
    'footer.privacy_policy': 'Política de Privacidad',
    'footer.cookies_policy': 'Política de Cookies',
    'footer.all_rights': '© 2024 TIC SELECT. Todos los derechos reservados.',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Enterprise Services',
    'nav.jobs': 'Jobs',
    'nav.talent_program': 'TIC Talent Program',
    'nav.contact': 'Contact',
    'nav.login': 'Sign In',
    'nav.logout': 'Sign Out',
    'nav.talent_registration': 'Talent Registration',

    // Hero Section
    'hero.title': 'The Talent that Drives the TIC Industry',
    'hero.subtitle': 'We connect leaders in the Testing, Inspection and Certification (TIC) sector with the talent they need to grow. We deliver a shortlist in 7 days. Guaranteed.',
    'hero.discover_services': 'Discover Our Services',
    'hero.contact_us': 'Contact Us',

    // Promise Section
    'promise.title': 'Strategic Hiring, Risk-Free',
    'promise.shortlist.title': 'Shortlist in 7 Days',
    'promise.shortlist.desc': 'Our pre-evaluated talent database allows us to act with agility that no one else can offer.',
    'promise.guarantee.title': '90-Day Guarantee',
    'promise.guarantee.desc': 'If the candidate does not meet expectations in their first three months, we find a replacement at no cost.',
    'promise.zero_risk.title': 'Zero Risk',
    'promise.zero_risk.desc': 'You only invest when you have decided to hire one of our candidates. No advance payments or hidden costs.',

    // Why Choose Us
    'why.title': 'Born from the Industry to Serve the Industry',
    'why.experience.title': '+30 Years of Combined Experience',
    'why.experience.desc': 'Our team understands the specific needs of the TIC sector because it comes from it.',
    'why.talent.title': '+15,000 Talents in LATAM',
    'why.talent.desc': 'An active and constantly expanding network of specialized professionals in the region.',
    'why.approach.title': '360° Approach',
    'why.approach.desc': 'From specialized auditors to regional directors, we cover all levels.',
    'why.ready.title': 'Ready to Get Started?',
    'why.ready.desc': 'Choose your preferred way to contact us',
    'why.contact_form': 'Contact Form',
    'why.whatsapp': 'WhatsApp',
    'why.direct_email': 'Direct Email',

    // Services
    'services.title': 'Our Services',
    'services.executive_search.title': 'Executive Search & Selection',
    'services.executive_search.desc': 'Your candidate shortlist in 7 days. TIC specialized talent with proven methodology and guaranteed results.',
    'services.hr_consulting.title': 'Human Resources Consulting',
    'services.hr_consulting.desc': 'Strengthen your organization\'s foundations with talent retention and development strategies.',
    'services.coaching.title': 'Development & Coaching',
    'services.coaching.desc': 'We enhance your teams\' skills with personalized development programs and executive coaching.',
    'services.see_more': 'Learn More',

    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'Ready to find the talent your company needs? Let\'s talk about how we can help you achieve your hiring goals.',
    'contact.form.title': 'Send Us a Message',
    'contact.form.full_name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.company': 'Company',
    'contact.form.phone': 'Phone',
    'contact.form.query_type': 'Query Type',
    'contact.form.message': 'Message',
    'contact.form.message_placeholder': 'Tell us about your talent needs...',
    'contact.form.privacy_accept': 'I accept the processing of my personal data in accordance with the',
    'contact.form.privacy_policy': 'Privacy Policy',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.direct_title': 'Or contact us directly',
    'contact.info.title': 'Contact Information',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.hours': 'Business Hours',
    'contact.info.hours_desc': 'Monday to Friday, 9:00 AM - 6:00 PM (UTC-3)',
    'contact.why.title': 'Why Contact Us?',
    'contact.why.consultation': 'Free consultation about your talent needs',
    'contact.why.proposal': 'Personalized proposal within 24 hours',
    'contact.why.no_commitment': 'No commitments or hidden costs',
    'contact.why.immediate_access': 'Immediate access to our talent network',

    // Footer
    'footer.quick_links': 'Quick Links',
    'footer.community': 'Community',
    'footer.contact': 'Contact',
    'footer.privacy_policy': 'Privacy Policy',
    'footer.cookies_policy': 'Cookie Policy',
    'footer.all_rights': '© 2024 TIC SELECT. All rights reserved.',
  },

  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Quem Somos',
    'nav.services': 'Serviços Empresariais',
    'nav.jobs': 'Empregos',
    'nav.talent_program': 'Programa TIC Talento',
    'nav.contact': 'Contato',
    'nav.login': 'Entrar',
    'nav.logout': 'Sair',
    'nav.talent_registration': 'Registro de Talento',

    // Hero Section
    'hero.title': 'O Talento que Impulsiona a Indústria TIC',
    'hero.subtitle': 'Conectamos líderes do setor de Testes, Inspeção e Certificação (TIC) com o talento necessário para crescer. Entregamos uma lista de candidatos em 7 dias. Garantido.',
    'hero.discover_services': 'Descubra Nossos Serviços',
    'hero.contact_us': 'Entre em Contato',

    // Promise Section
    'promise.title': 'Contratação Estratégica, Sem Riscos',
    'promise.shortlist.title': 'Lista de Candidatos em 7 Dias',
    'promise.shortlist.desc': 'Nossa base de dados de talentos pré-avaliados nos permite agir com agilidade que ninguém mais pode oferecer.',
    'promise.guarantee.title': 'Garantia de 90 Dias',
    'promise.guarantee.desc': 'Se o candidato não atender às expectativas nos primeiros três meses, buscamos um substituto sem custo algum.',
    'promise.zero_risk.title': 'Risco Zero',
    'promise.zero_risk.desc': 'Você só investe quando decidiu contratar um de nossos candidatos. Sem pagamentos antecipados ou custos ocultos.',

    // Why Choose Us
    'why.title': 'Nascemos da Indústria para Servir a Indústria',
    'why.experience.title': '+30 Anos de Experiência Combinada',
    'why.experience.desc': 'Nossa equipe entende as necessidades específicas do setor TIC porque vem dele.',
    'why.talent.title': '+15.000 Talentos na LATAM',
    'why.talent.desc': 'Uma rede ativa e em constante expansão de profissionais especializados na região.',
    'why.approach.title': 'Abordagem 360°',
    'why.approach.desc': 'De auditores especializados a diretores regionais, cobrimos todos os níveis.',
    'why.ready.title': 'Pronto para Começar?',
    'why.ready.desc': 'Escolha sua forma preferida de nos contatar',
    'why.contact_form': 'Formulário de Contato',
    'why.whatsapp': 'WhatsApp',
    'why.direct_email': 'Email Direto',

    // Services
    'services.title': 'Nossos Serviços',
    'services.executive_search.title': 'Seleção e Busca Executiva',
    'services.executive_search.desc': 'Sua lista de candidatos em 7 dias. Talento especializado em TIC com metodologia comprovada e resultados garantidos.',
    'services.hr_consulting.title': 'Consultoria em Recursos Humanos',
    'services.hr_consulting.desc': 'Fortaleça as bases de sua organização com estratégias de retenção e desenvolvimento de talentos.',
    'services.coaching.title': 'Desenvolvimento & Coaching',
    'services.coaching.desc': 'Potencializamos as habilidades de suas equipes com programas de desenvolvimento personalizados e coaching executivo.',
    'services.see_more': 'Saiba Mais',

    // Contact Page
    'contact.title': 'Contato',
    'contact.subtitle': 'Pronto para encontrar o talento que sua empresa precisa? Vamos conversar sobre como podemos ajudá-lo a alcançar seus objetivos de contratação.',
    'contact.form.title': 'Envie-nos uma Mensagem',
    'contact.form.full_name': 'Nome Completo',
    'contact.form.email': 'Endereço de Email',
    'contact.form.company': 'Empresa',
    'contact.form.phone': 'Telefone',
    'contact.form.query_type': 'Tipo de Consulta',
    'contact.form.message': 'Mensagem',
    'contact.form.message_placeholder': 'Conte-nos sobre suas necessidades de talento...',
    'contact.form.privacy_accept': 'Aceito o processamento de meus dados pessoais de acordo com a',
    'contact.form.privacy_policy': 'Política de Privacidade',
    'contact.form.send': 'Enviar Mensagem',
    'contact.form.sending': 'Enviando...',
    'contact.direct_title': 'Ou entre em contato diretamente',
    'contact.info.title': 'Informações de Contato',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Telefone',
    'contact.info.hours': 'Horário de Atendimento',
    'contact.info.hours_desc': 'Segunda a Sexta, 9:00 - 18:00 (UTC-3)',
    'contact.why.title': 'Por que nos Contatar?',
    'contact.why.consultation': 'Consultoria gratuita sobre suas necessidades de talento',
    'contact.why.proposal': 'Proposta personalizada em 24 horas',
    'contact.why.no_commitment': 'Sem compromissos ou custos ocultos',
    'contact.why.immediate_access': 'Acesso imediato à nossa rede de talentos',

    // Footer
    'footer.quick_links': 'Links Rápidos',
    'footer.community': 'Comunidade',
    'footer.contact': 'Contato',
    'footer.privacy_policy': 'Política de Privacidade',
    'footer.cookies_policy': 'Política de Cookies',
    'footer.all_rights': '© 2024 TIC SELECT. Todos os direitos reservados.',
  },
};