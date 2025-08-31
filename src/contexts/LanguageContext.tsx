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

// SEO metadata translations
export const seoTranslations = {
  es: {
    title: "TIC SELECT - Talento Especializado para la Industria TIC",
    description: "Conectamos líderes del sector de Pruebas, Inspección y Certificación con el talento que necesitan. Shortlist en 7 días garantizado.",
    keywords: "talento TIC, recruiting, headhunting, pruebas, inspección, certificación, LATAM",
    author: "TIC SELECT",
    ogTitle: "TIC SELECT - Talento Especializado para la Industria TIC",
    ogDescription: "Conectamos líderes del sector de Pruebas, Inspección y Certificación con el talento que necesitan. Shortlist en 7 días garantizado."
  },
  en: {
    title: "TIC SELECT - Specialized Talent for the TIC Industry",
    description: "We connect leaders in the Testing, Inspection and Certification sector with the talent they need. Shortlist in 7 days guaranteed.",
    keywords: "TIC talent, recruiting, headhunting, testing, inspection, certification, LATAM",
    author: "TIC SELECT",
    ogTitle: "TIC SELECT - Specialized Talent for the TIC Industry",
    ogDescription: "We connect leaders in the Testing, Inspection and Certification sector with the talent they need. Shortlist in 7 days guaranteed."
  },
  pt: {
    title: "TIC SELECT - Talento Especializado para a Indústria TIC",
    description: "Conectamos líderes do setor de Testes, Inspeção e Certificação com o talento que precisam. Lista de candidatos em 7 dias garantido.",
    keywords: "talento TIC, recrutamento, headhunting, testes, inspeção, certificação, LATAM",
    author: "TIC SELECT",
    ogTitle: "TIC SELECT - Talento Especializado para a Indústria TIC",
    ogDescription: "Conectamos líderes do setor de Testes, Inspeção e Certificação com o talento que precisam. Lista de candidatos em 7 dias garantido."
  }
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
    
    // Update SEO metadata
    const seo = seoTranslations[lang];
    document.title = seo.title;
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', seo.description);
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', seo.keywords);
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.ogTitle);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', seo.ogDescription);
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

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Quiénes Somos',
    'nav.services': 'Servicios para Empresas',
    'nav.jobs': 'Empleos',
    'nav.talent_program': 'Programa TIC Talento',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar Sesión',
    'nav.logout': 'Cerrar Sesión',
    'nav.talent_registration': 'Registro de Talento',

    // Hero Section
    'hero.title': 'El Talento que Impulsa la Industria TIC',
    'hero.subtitle': 'Conectamos líderes del sector de Pruebas, Inspección y Certificación (TIC) con el talento que necesitan para crecer. Entregamos una shortlist en 7 días. Garantizado.',
    'hero.discover_services': 'Descubre Nuestros Servicios',
    'hero.contact_us': 'Contáctanos',

    // Promise Section
    'promise.title': 'Contratación Estratégica, Sin Riesgos',
    'promise.shortlist.title': 'Shortlist en 7 Días',
    'promise.shortlist.desc': 'Nuestra base de datos de talentos pre-evaluados nos permite actuar con una agilidad que nadie más puede ofrecer.',
    'promise.guarantee.title': 'Garantía de 90 Días',
    'promise.guarantee.desc': 'Si el candidato no cumple las expectativas en los primeros tres meses, buscamos un reemplazo sin costo alguno.',
    'promise.zero_risk.title': 'Riesgo Cero',
    'promise.zero_risk.desc': 'Solo inviertes cuando decidiste contratar a uno de nuestros candidatos. Sin pagos por adelantado ni costos ocultos.',

    // Why Choose Us
    'why.title': 'Nacimos de la Industria para Servir a la Industria',
    'why.experience.title': '+30 Años de Experiencia Combinada',
    'why.experience.desc': 'Nuestro equipo entiende las necesidades específicas del sector TIC porque viene de él.',
    'why.talent.title': '+15.000 Talentos en LATAM',
    'why.talent.desc': 'Una red activa y en constante expansión de profesionales especializados en la región.',
    'why.approach.title': 'Enfoque 360°',
    'why.approach.desc': 'Desde auditores especializados hasta directores regionales, cubrimos todos los niveles.',
    'why.ready.title': '¿Listo para Comenzar?',
    'why.ready.desc': 'Elige tu forma preferida de contactarnos',
    'why.contact_form': 'Formulario de Contacto',
    'why.whatsapp': 'WhatsApp',
    'why.direct_email': 'Email Directo',

    // About Page
    'about.title': 'TIC Select nació de la industria para servir a la industria',
    'about.subtitle': 'Entendemos profundamente las necesidades específicas del sector Testing, Inspection & Certification porque venimos de él.',
    'about.industry_experience.title': 'Experiencia de la Industria',
    'about.industry_experience.desc': 'Más de 30 años de experiencia combinada en el sector TIC nos permite identificar exactamente el talento que necesitas.',
    'about.specialized_network.title': 'Red Especializada',
    'about.specialized_network.desc': 'Nuestra base de datos cuenta con más de 15.000 profesionales TIC activos en toda LATAM.',
    'about.proven_results.title': 'Resultados Comprobados',
    'about.proven_results.desc': 'Más del 90% de nuestros procesos se completan exitosamente en menos de 30 días.',
    'about.full_coverage.title': 'Cobertura Completa',
    'about.full_coverage.desc': 'Desde auditores especializados hasta directores regionales, cubrimos todos los niveles y áreas funcionales.',
    'about.cta.title': '¿Listo para encontrar tu próximo talento clave?',
    'about.cta.subtitle': 'Trabajemos juntos para impulsar el crecimiento de tu empresa',

    // Services Page
    'services_page.title': 'Servicios para Empresas',
    'services_page.executive_search.title': 'Búsqueda Ejecutiva & Headhunting',
    'services_page.executive_search.subtitle': 'Identificamos y atraemos a los líderes que tu empresa necesita para crecer',
    'services_page.process': 'Nuestro Proceso:',
    'services_page.step1.title': 'Análisis de Necesidades',
    'services_page.step1.desc': 'Entendemos profundamente el perfil que buscas y el contexto de tu empresa',
    'services_page.step2.title': 'Búsqueda Activa',
    'services_page.step2.desc': 'Identificamos candidatos en nuestra red y en el mercado usando metodología directa',
    'services_page.step3.title': 'Evaluación Rigurosa',
    'services_page.step3.desc': 'Validamos competencias técnicas, experiencia y fit cultural con tu organización',
    'services_page.step4.title': 'Presentación y Cierre',
    'services_page.step4.desc': 'Te presentamos una shortlist de candidatos pre-calificados y te acompañamos hasta el cierre',
    'services_page.promise': 'Te entregamos una shortlist en 7 días. Garantizado.',
    'services_page.benefit1': 'Acceso inmediato a nuestra base de datos con +15.000 talentos TIC pre-evaluados en LATAM',
    'services_page.benefit2': 'Metodología probada con +90% de éxito en procesos completados en menos de 30 días',
    'services_page.benefit3': 'Equipo especializado con +30 años de experiencia combinada en la industria TIC',
    'services_page.benefit4': 'Enfoque 360°: cubrimos desde técnicos especializados hasta ejecutivos C-level',
    'services_page.guarantee.title': 'Garantía de 90 Días',
    'services_page.guarantee.desc': 'Si el candidato no cumple expectativas, buscamos reemplazo sin costo',
    'services_page.cta.title': 'Tu próximo líder TIC está a solo una conversación de distancia',
    'services_page.cta.subtitle': '¿Comenzamos?',
    'services_page.cta.button': 'Iniciar Búsqueda Ahora',
    'services_page.hr_consulting.title': 'Consultoría en RRHH',
    'services_page.hr_consulting.desc': 'Optimizamos tus procesos de gestión del talento con soluciones específicas para la industria TIC',
    'services_page.hr_retention.title': 'Estrategias de Retención',
    'services_page.hr_retention.desc': 'Desarrollamos planes personalizados para retener tu talento clave y reducir la rotación',
    'services_page.hr_climate.title': 'Estudios de Clima Laboral',
    'services_page.hr_climate.desc': 'Evaluamos y mejoramos el ambiente de trabajo para potenciar el rendimiento de tus equipos',
    'services_page.hr_salary.title': 'Benchmarking Salarial',
    'services_page.hr_salary.desc': 'Te ayudamos a definir estructuras salariales competitivas basadas en datos del mercado TIC',
    'services_page.coaching.title': 'Desarrollo & Coaching',
    'services_page.coaching.desc': 'Potenciamos las habilidades de tus equipos con programas de desarrollo personalizados',
    'services_page.coaching_skills.title': 'Desarrollo de Habilidades',
    'services_page.coaching_skills.desc': 'Programas especializados para fortalecer competencias técnicas y blandas en el sector TIC',
    'services_page.coaching_career.title': 'Planes de Carrera',
    'services_page.coaching_career.desc': 'Diseñamos rutas de crecimiento profesional alineadas con los objetivos de tu empresa',
    'services_page.talent_universe.title': 'Para Empresas - Nuestro Universo de Talento',
    'services_page.talent_universe.desc': 'Nuestro mayor diferenciador es nuestra base de datos de talento TIC, viva y constantemente actualizada. Este activo estratégico nos permite encontrar perfiles altamente calificados con una velocidad inigualable.',

    // Profiles Section
    'profiles_covered.title': 'Perfiles que Cubrimos: Nuestra Doble Expertise',
    'profiles_covered.ict_specialized': 'Perfiles Especializados del Sector TIC',
    'profiles_covered.functional_corporate': 'Áreas Funcionales y Corporativas',
    'profiles_covered.strategic_industries': 'Industrias Estratégicas que Servimos',
    'profiles_covered.auditors': 'Auditores y Especialistas en Normas:',
    'profiles_covered.inspectors': 'Inspectores de Campo:',
    'profiles_covered.lab': 'Personal de Laboratorio:',
    'profiles_covered.engineering': 'Ingeniería, Calidad y HSE:',
    'profiles_covered.executive': 'Liderazgo Ejecutivo y Estrategia:',
    'profiles_covered.commercial': 'Comercial y Desarrollo de Negocios:',
    'profiles_covered.operations': 'Operaciones y Proyectos:',
    'profiles_covered.finance': 'Finanzas y Administración:',
    'profiles_covered.hr': 'Recursos Humanos y Talento:',
    'profiles_covered.tech': 'Tecnología, Innovación y Marketing:',

    // Development & Coaching
    'development.title': 'Desarrollo & Coaching',
    'development.subtitle': 'Potenciamos las habilidades de sus equipos con programas de desarrollo personalizados y coaching ejecutivo especializado en la industria TIC.',
    'development.executive_coaching': 'Coaching Ejecutivo',
    'development.programs': 'Programas de Desarrollo',
    'development.why_different': '¿Por qué nuestro enfoque es diferente?',
    'development.field_experience': 'Experiencia de campo: Nuestros coaches provienen de la industria TIC',
    'development.proven_methodology': 'Metodología probada: Casos de éxito en organizaciones similares',
    'development.continuous_monitoring': 'Seguimiento continuo: Acompañamiento durante todo el proceso',
    'development.measurable_roi': 'ROI medible: Métricas claras de progreso y resultados',
    'development.free_consultation': '🚀 Consulta gratuita sobre desarrollo',

    // Jobs
    'jobs.title': 'Empleos',
    'jobs.subtitle': 'Únete a nuestra red de talentos TIC y descubre oportunidades que impulsen tu carrera profesional',
    'jobs.how_it_works': 'Cómo Funciona',
    'jobs.step1.title': 'Regístrate',
    'jobs.step1.desc': 'Completa tu perfil profesional con tu experiencia y habilidades TIC.',
    'jobs.step2.title': 'Validación',
    'jobs.step2.desc': 'Nuestro equipo valida tu perfil y lo incluye en nuestra base de datos.',
    'jobs.step3.title': 'Matching',
    'jobs.step3.desc': 'Te conectamos con oportunidades que se ajusten a tu perfil y objetivos.',
    'jobs.step4.title': 'Oportunidades',
    'jobs.step4.desc': 'Recibe ofertas laborales y noticias relevantes de la industria TIC.',
    'jobs.cta.title': 'Tu Próxima Oportunidad TIC Te Está Esperando',
    'jobs.cta.subtitle': 'No dejes que las mejores oportunidades pasen de largo. Únete a nuestra red de profesionales TIC y acelera tu carrera profesional.',
    'jobs.register_free': 'Registrarme Gratis',
    'jobs.more_info': 'Más Información',
    'jobs.network_advantages': 'Ventajas de Nuestra Red',
    'jobs.advantage1': 'Confidencialidad: Tu información permanece privada hasta que decidas postular.',
    'jobs.advantage2': 'Relevancia: Solo recibes ofertas que coinciden con tu perfil.',
    'jobs.advantage3': 'Actualización: Mantente al día con tendencias y salarios del mercado TIC.',
    'jobs.advantage4': 'Sin compromiso: Puedes desactivar las notificaciones cuando quieras.',
    'jobs.join_professionals': 'Únete a Cientos de Profesionales TIC',
    'jobs.join_community': 'Forma parte de una comunidad exclusiva de talentos TIC que ya están aprovechando las mejores oportunidades del mercado.',
    'jobs.start_now': 'Comenzar Ahora',

    // TIC Talent Program
    'program.title': 'Impulsando el futuro del sector TIC',
    'program.subtitle': 'El programa crea un puente real entre la academia y la industria, acercando a los jóvenes a proyectos concretos y preparando a las empresas con el talento que necesitan para crecer.',
    'program.join': 'Únete al Programa',
    'program.what_is.title': '¿Qué es TIC Talento?',
    'program.benefits_companies': 'Beneficios para las Empresas',
    'program.benefits_youth': 'Beneficios para los Jóvenes',

    // Authentication
    'auth.title': 'Accede a TIC Select',
    'auth.subtitle': 'Conecta con las mejores oportunidades TIC',
    'auth.card_title': 'Autenticación',
    'auth.card_description': 'Inicia sesión o crea una cuenta para continuar',
    'auth.login_tab': 'Iniciar Sesión',
    'auth.signup_tab': 'Registrarse',
    'auth.email': 'Email',
    'auth.password': 'Contraseña',
    'auth.confirm_password': 'Confirmar Contraseña',
    'auth.full_name': 'Nombre Completo',
    'auth.email_placeholder': 'tu@email.com',
    'auth.password_placeholder': '••••••••',
    'auth.name_placeholder': 'Tu nombre completo',
    'auth.login_button': 'Iniciar Sesión',
    'auth.signup_button': 'Crear Cuenta',
    'auth.login_loading': 'Iniciando sesión...',
    'auth.signup_loading': 'Creando cuenta...',
    'auth.back_home': '← Volver al inicio',
    'auth.password_mismatch': 'Las contraseñas no coinciden',
    'auth.email_exists': 'Este email ya está registrado. Intenta iniciar sesión.',
    'auth.signup_success': '¡Cuenta creada exitosamente! Revisa tu email para confirmar tu cuenta.',
    'auth.create_account_error': 'Error al crear la cuenta',
    'auth.invalid_credentials': 'Email o contraseña incorrectos',
    'auth.email_not_confirmed': 'Por favor confirma tu email antes de iniciar sesión',
    'auth.login_error': 'Error al iniciar sesión',
    'auth.welcome_back': '¡Bienvenido de vuelta!',

    // 404 Page
    'notfound.title': '404',
    'notfound.message': '¡Ups! Página no encontrada',
    'notfound.back_home': 'Volver al inicio',
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
    'promise.guarantee.desc': 'If the candidate doesn\'t meet expectations in the first three months, we find a replacement at no cost.',
    'promise.zero_risk.title': 'Zero Risk',
    'promise.zero_risk.desc': 'You only invest when you decide to hire one of our candidates. No upfront payments or hidden costs.',

    // Why Choose Us
    'why.title': 'Born from the Industry to Serve the Industry',
    'why.experience.title': '+30 Years of Combined Experience',
    'why.experience.desc': 'Our team understands the specific needs of the TIC sector because we come from it.',
    'why.talent.title': '+15,000 Talents in LATAM',
    'why.talent.desc': 'An active and constantly expanding network of specialized professionals in the region.',
    'why.approach.title': '360° Approach',
    'why.approach.desc': 'From specialized auditors to regional directors, we cover all levels.',
    'why.ready.title': 'Ready to Get Started?',
    'why.ready.desc': 'Choose your preferred way to contact us',
    'why.contact_form': 'Contact Form',
    'why.whatsapp': 'WhatsApp',
    'why.direct_email': 'Direct Email',

    // About Page
    'about.title': 'TIC Select was born from the industry to serve the industry',
    'about.subtitle': 'We deeply understand the specific needs of the Testing, Inspection & Certification sector because we come from it.',
    'about.industry_experience.title': 'Industry Experience',
    'about.industry_experience.desc': 'More than 30 years of combined experience in the TIC sector allows us to identify exactly the talent you need.',
    'about.specialized_network.title': 'Specialized Network',
    'about.specialized_network.desc': 'Our database has more than 15,000 active TIC professionals throughout LATAM.',
    'about.proven_results.title': 'Proven Results',
    'about.proven_results.desc': 'More than 90% of our processes are completed successfully in less than 30 days.',
    'about.full_coverage.title': 'Full Coverage',
    'about.full_coverage.desc': 'From specialized auditors to regional directors, we cover all levels and functional areas.',
    'about.cta.title': 'Ready to find your next key talent?',
    'about.cta.subtitle': 'Let\'s work together to drive your company\'s growth',

    // Services Page
    'services_page.title': 'Enterprise Services',
    'services_page.executive_search.title': 'Executive Search & Headhunting',
    'services_page.executive_search.subtitle': 'We identify and attract the leaders your company needs to grow',
    'services_page.process': 'Our Process:',
    'services_page.step1.title': 'Needs Analysis',
    'services_page.step1.desc': 'We deeply understand the profile you\'re looking for and your company\'s context',
    'services_page.step2.title': 'Active Search',
    'services_page.step2.desc': 'We identify candidates in our network and in the market using direct methodology',
    'services_page.step3.title': 'Rigorous Evaluation',
    'services_page.step3.desc': 'We validate technical competencies, experience and cultural fit with your organization',
    'services_page.step4.title': 'Presentation and Closure',
    'services_page.step4.desc': 'We present you with a shortlist of pre-qualified candidates and accompany you until closure',
    'services_page.promise': 'We deliver a shortlist in 7 days. Guaranteed.',
    'services_page.benefit1': 'Immediate access to our database with +15,000 pre-evaluated TIC talents in LATAM',
    'services_page.benefit2': 'Proven methodology with +90% success in processes completed in less than 30 days',
    'services_page.benefit3': 'Specialized team with +30 years of combined experience in the TIC industry',
    'services_page.benefit4': '360° approach: we cover from specialized technicians to C-level executives',
    'services_page.guarantee.title': '90-Day Guarantee',
    'services_page.guarantee.desc': 'If the candidate doesn\'t meet expectations, we find a replacement at no cost',
    'services_page.cta.title': 'Your next TIC leader is just one conversation away',
    'services_page.cta.subtitle': 'Shall we begin?',
    'services_page.cta.button': 'Start Search Now',
    'services_page.hr_consulting.title': 'HR Consulting',
    'services_page.hr_consulting.desc': 'We optimize your talent management processes with specific solutions for the TIC industry',
    'services_page.hr_retention.title': 'Retention Strategies',
    'services_page.hr_retention.desc': 'We develop personalized plans to retain your key talent and reduce turnover',
    'services_page.hr_climate.title': 'Work Climate Studies',
    'services_page.hr_climate.desc': 'We evaluate and improve the work environment to enhance your teams\' performance',
    'services_page.hr_salary.title': 'Salary Benchmarking',
    'services_page.hr_salary.desc': 'We help you define competitive salary structures based on TIC market data',
    'services_page.coaching.title': 'Development & Coaching',
    'services_page.coaching.desc': 'We enhance your teams\' skills with personalized development programs',
    'services_page.coaching_skills.title': 'Skills Development',
    'services_page.coaching_skills.desc': 'Specialized programs to strengthen technical and soft competencies in the TIC sector',
    'services_page.coaching_career.title': 'Career Plans',
    'services_page.coaching_career.desc': 'We design professional growth paths aligned with your company\'s objectives',
    'services_page.talent_universe.title': 'For Companies - Our Talent Universe',
    'services_page.talent_universe.desc': 'Our biggest differentiator is our TIC talent database, alive and constantly updated. This strategic asset allows us to find highly qualified profiles with unmatched speed.',

    // Profiles Section
    'profiles_covered.title': 'Profiles We Cover: Our Double Expertise',
    'profiles_covered.ict_specialized': 'Specialized ICT Sector Profiles',
    'profiles_covered.functional_corporate': 'Functional and Corporate Areas',
    'profiles_covered.strategic_industries': 'Strategic Industries We Serve',
    'profiles_covered.auditors': 'Auditors and Standards Specialists:',
    'profiles_covered.inspectors': 'Field Inspectors:',
    'profiles_covered.lab': 'Laboratory Personnel:',
    'profiles_covered.engineering': 'Engineering, Quality and HSE:',
    'profiles_covered.executive': 'Executive Leadership and Strategy:',
    'profiles_covered.commercial': 'Commercial and Business Development:',
    'profiles_covered.operations': 'Operations and Projects:',
    'profiles_covered.finance': 'Finance and Administration:',
    'profiles_covered.hr': 'Human Resources and Talent:',
    'profiles_covered.tech': 'Technology, Innovation and Marketing:',

    // Development & Coaching
    'development.title': 'Development & Coaching',
    'development.subtitle': 'We enhance your teams\' skills with personalized development programs and executive coaching specialized in the ICT industry.',
    'development.executive_coaching': 'Executive Coaching',
    'development.programs': 'Development Programs',
    'development.why_different': 'Why is our approach different?',
    'development.field_experience': 'Field experience: Our coaches come from the ICT industry',
    'development.proven_methodology': 'Proven methodology: Success stories in similar organizations',
    'development.continuous_monitoring': 'Continuous monitoring: Support throughout the entire process',
    'development.measurable_roi': 'Measurable ROI: Clear metrics of progress and results',
    'development.free_consultation': '🚀 Free development consultation',

    // Jobs
    'jobs.title': 'Jobs',
    'jobs.subtitle': 'Join our network of TIC talents and discover opportunities that will boost your professional career',
    'jobs.how_it_works': 'How It Works',
    'jobs.step1.title': 'Register',
    'jobs.step1.desc': 'Complete your professional profile with your TIC experience and skills.',
    'jobs.step2.title': 'Validation',
    'jobs.step2.desc': 'Our team validates your profile and includes it in our database.',
    'jobs.step3.title': 'Matching',
    'jobs.step3.desc': 'We connect you with opportunities that fit your profile and goals.',
    'jobs.step4.title': 'Opportunities',
    'jobs.step4.desc': 'Receive job offers and relevant news from the TIC industry.',
    'jobs.cta.title': 'Your Next TIC Opportunity is Waiting',
    'jobs.cta.subtitle': 'Don\'t let the best opportunities pass you by. Join our network of TIC professionals and accelerate your career.',
    'jobs.register_free': 'Register Free',
    'jobs.more_info': 'More Information',
    'jobs.network_advantages': 'Advantages of Our Network',
    'jobs.advantage1': 'Confidentiality: Your information remains private until you decide to apply.',
    'jobs.advantage2': 'Relevance: You only receive offers that match your profile.',
    'jobs.advantage3': 'Updates: Stay up to date with TIC market trends and salaries.',
    'jobs.advantage4': 'No commitment: You can disable notifications whenever you want.',
    'jobs.join_professionals': 'Join Hundreds of TIC Professionals',
    'jobs.join_community': 'Be part of an exclusive community of TIC talents who are already taking advantage of the best market opportunities.',
    'jobs.start_now': 'Start Now',

    // TIC Talent Program
    'program.title': 'Driving the future of the TIC sector',
    'program.subtitle': 'The program creates a real bridge between academia and industry, bringing young people closer to concrete projects and preparing companies with the talent they need to grow.',
    'program.join': 'Join the Program',
    'program.what_is.title': 'What is TIC Talent?',
    'program.benefits_companies': 'Benefits for Companies',
    'program.benefits_youth': 'Benefits for Youth',

    // Authentication
    'auth.title': 'Access TIC Select',
    'auth.subtitle': 'Connect with the best TIC opportunities',
    'auth.card_title': 'Authentication',
    'auth.card_description': 'Sign in or create an account to continue',
    'auth.login_tab': 'Sign In',
    'auth.signup_tab': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.full_name': 'Full Name',
    'auth.email_placeholder': 'your@email.com',
    'auth.password_placeholder': '••••••••',
    'auth.name_placeholder': 'Your full name',
    'auth.login_button': 'Sign In',
    'auth.signup_button': 'Create Account',
    'auth.login_loading': 'Signing in...',
    'auth.signup_loading': 'Creating account...',
    'auth.back_home': '← Back to home',
    'auth.password_mismatch': 'Passwords do not match',
    'auth.email_exists': 'This email is already registered. Try signing in.',
    'auth.signup_success': 'Account created successfully! Check your email to confirm your account.',
    'auth.create_account_error': 'Error creating account',
    'auth.invalid_credentials': 'Incorrect email or password',
    'auth.email_not_confirmed': 'Please confirm your email before signing in',
    'auth.login_error': 'Error signing in',
    'auth.welcome_back': 'Welcome back!',

    // 404 Page
    'notfound.title': '404',
    'notfound.message': 'Oops! Page not found',
    'notfound.back_home': 'Return to Home',
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

    // About Page
    'about.title': 'TIC Select nasceu da indústria para servir a indústria',
    'about.subtitle': 'Entendemos profundamente as necessidades específicas do setor de Testes, Inspeção e Certificação porque viemos dele.',
    'about.industry_experience.title': 'Experiência da Indústria',
    'about.industry_experience.desc': 'Mais de 30 anos de experiência combinada no setor TIC nos permite identificar exatamente o talento que você precisa.',
    'about.specialized_network.title': 'Rede Especializada',
    'about.specialized_network.desc': 'Nossa base de dados conta com mais de 15.000 profissionais TIC ativos em toda LATAM.',
    'about.proven_results.title': 'Resultados Comprovados',
    'about.proven_results.desc': 'Mais de 90% de nossos processos são concluídos com sucesso em menos de 30 dias.',
    'about.full_coverage.title': 'Cobertura Completa',
    'about.full_coverage.desc': 'De auditores especializados a diretores regionais, cobrimos todos os níveis e áreas funcionais.',
    'about.cta.title': 'Pronto para encontrar seu próximo talento-chave?',
    'about.cta.subtitle': 'Vamos trabalhar juntos para impulsionar o crescimento de sua empresa',

    // Services Page
    'services_page.title': 'Serviços Empresariais',
    'services_page.executive_search.title': 'Busca Executiva & Headhunting',
    'services_page.executive_search.subtitle': 'Identificamos e atraímos os líderes que sua empresa precisa para crescer',
    'services_page.process': 'Nosso Processo:',
    'services_page.step1.title': 'Análise de Necessidades',
    'services_page.step1.desc': 'Entendemos profundamente o perfil que você busca e o contexto de sua empresa',
    'services_page.step2.title': 'Busca Ativa',
    'services_page.step2.desc': 'Identificamos candidatos em nossa rede e no mercado usando metodologia direta',
    'services_page.step3.title': 'Avaliação Rigorosa',
    'services_page.step3.desc': 'Validamos competências técnicas, experiência e fit cultural com sua organização',
    'services_page.step4.title': 'Apresentação e Fechamento',
    'services_page.step4.desc': 'Apresentamos uma lista de candidatos pré-qualificados e os acompanhamos até o fechamento',
    'services_page.promise': 'Entregamos uma lista de candidatos em 7 dias. Garantido.',
    'services_page.benefit1': 'Acesso imediato à nossa base de dados com +15.000 talentos TIC pré-avaliados na LATAM',
    'services_page.benefit2': 'Metodologia comprovada com +90% de sucesso em processos concluídos em menos de 30 dias',
    'services_page.benefit3': 'Equipe especializada com +30 anos de experiência combinada na indústria TIC',
    'services_page.benefit4': 'Abordagem 360°: cobrimos desde técnicos especializados até executivos C-level',
    'services_page.guarantee.title': 'Garantia de 90 Dias',
    'services_page.guarantee.desc': 'Se o candidato não atender às expectativas, buscamos substituto sem custo',
    'services_page.cta.title': 'Seu próximo líder TIC está a apenas uma conversa de distância',
    'services_page.cta.subtitle': 'Vamos começar?',
    'services_page.cta.button': 'Iniciar Busca Agora',
    'services_page.hr_consulting.title': 'Consultoria em RH',
    'services_page.hr_consulting.desc': 'Otimizamos seus processos de gestão de talentos com soluções específicas para a indústria TIC',
    'services_page.hr_retention.title': 'Estratégias de Retenção',
    'services_page.hr_retention.desc': 'Desenvolvemos planos personalizados para reter seu talento-chave e reduzir a rotatividade',
    'services_page.hr_climate.title': 'Estudos de Clima Organizacional',
    'services_page.hr_climate.desc': 'Avaliamos e melhoramos o ambiente de trabalho para potencializar o desempenho de suas equipes',
    'services_page.hr_salary.title': 'Benchmarking Salarial',
    'services_page.hr_salary.desc': 'Ajudamos você a definir estruturas salariais competitivas baseadas em dados do mercado TIC',
    'services_page.coaching.title': 'Desenvolvimento & Coaching',
    'services_page.coaching.desc': 'Potencializamos as habilidades de suas equipes com programas de desenvolvimento personalizados',
    'services_page.coaching_skills.title': 'Desenvolvimento de Habilidades',
    'services_page.coaching_skills.desc': 'Programas especializados para fortalecer competências técnicas e comportamentais no setor TIC',
    'services_page.coaching_career.title': 'Planos de Carreira',
    'services_page.coaching_career.desc': 'Projetamos rotas de crescimento profissional alinhadas com os objetivos de sua empresa',
    'services_page.talent_universe.title': 'Para Empresas - Nosso Universo de Talentos',
    'services_page.talent_universe.desc': 'Nosso maior diferencial é nossa base de dados de talentos TIC, viva e constantemente atualizada. Este ativo estratégico nos permite encontrar perfis altamente qualificados com velocidade incomparável.',

    // Profiles Section
    'profiles_covered.title': 'Perfis que Cobrimos: Nossa Dupla Expertise',
    'profiles_covered.ict_specialized': 'Perfis Especializados do Setor TIC',
    'profiles_covered.functional_corporate': 'Áreas Funcionais e Corporativas',
    'profiles_covered.strategic_industries': 'Indústrias Estratégicas que Atendemos',
    'profiles_covered.auditors': 'Auditores e Especialistas em Normas:',
    'profiles_covered.inspectors': 'Inspetores de Campo:',
    'profiles_covered.lab': 'Pessoal de Laboratório:',
    'profiles_covered.engineering': 'Engenharia, Qualidade e HSE:',
    'profiles_covered.executive': 'Liderança Executiva e Estratégia:',
    'profiles_covered.commercial': 'Comercial e Desenvolvimento de Negócios:',
    'profiles_covered.operations': 'Operações e Projetos:',
    'profiles_covered.finance': 'Finanças e Administração:',
    'profiles_covered.hr': 'Recursos Humanos e Talentos:',
    'profiles_covered.tech': 'Tecnologia, Inovação e Marketing:',

    // Development & Coaching
    'development.title': 'Desenvolvimento & Coaching',
    'development.subtitle': 'Potencializamos as habilidades de suas equipes com programas de desenvolvimento personalizados e coaching executivo especializado na indústria TIC.',
    'development.executive_coaching': 'Coaching Executivo',
    'development.programs': 'Programas de Desenvolvimento',
    'development.why_different': 'Por que nossa abordagem é diferente?',
    'development.field_experience': 'Experiência de campo: Nossos coaches vêm da indústria TIC',
    'development.proven_methodology': 'Metodologia comprovada: Casos de sucesso em organizações similares',
    'development.continuous_monitoring': 'Acompanhamento contínuo: Suporte durante todo o processo',
    'development.measurable_roi': 'ROI mensurável: Métricas claras de progresso e resultados',
    'development.free_consultation': '🚀 Consulta gratuita sobre desenvolvimento',

    // Jobs
    'jobs.title': 'Empregos',
    'jobs.subtitle': 'Junte-se à nossa rede de talentos TIC e descubra oportunidades que impulsionem sua carreira profissional',
    'jobs.how_it_works': 'Como Funciona',
    'jobs.step1.title': 'Registre-se',
    'jobs.step1.desc': 'Complete seu perfil profissional com sua experiência e habilidades TIC.',
    'jobs.step2.title': 'Validação',
    'jobs.step2.desc': 'Nossa equipe valida seu perfil e o inclui em nossa base de dados.',
    'jobs.step3.title': 'Matching',
    'jobs.step3.desc': 'Conectamos você com oportunidades que se ajustam ao seu perfil e objetivos.',
    'jobs.step4.title': 'Oportunidades',
    'jobs.step4.desc': 'Receba ofertas de trabalho e notícias relevantes da indústria TIC.',
    'jobs.cta.title': 'Sua Próxima Oportunidade TIC Está Esperando',
    'jobs.cta.subtitle': 'Não deixe que as melhores oportunidades passem despercebidas. Junte-se à nossa rede de profissionais TIC e acelere sua carreira.',
    'jobs.register_free': 'Registrar-se Grátis',
    'jobs.more_info': 'Mais Informações',
    'jobs.network_advantages': 'Vantagens de Nossa Rede',
    'jobs.advantage1': 'Confidencialidade: Suas informações permanecem privadas até você decidir se candidatar.',
    'jobs.advantage2': 'Relevância: Você só recebe ofertas que coincidem com seu perfil.',
    'jobs.advantage3': 'Atualização: Mantenha-se atualizado com tendências e salários do mercado TIC.',
    'jobs.advantage4': 'Sem compromisso: Você pode desativar as notificações quando quiser.',
    'jobs.join_professionals': 'Junte-se a Centenas de Profissionais TIC',
    'jobs.join_community': 'Faça parte de uma comunidade exclusiva de talentos TIC que já estão aproveitando as melhores oportunidades do mercado.',
    'jobs.start_now': 'Começar Agora',

    // TIC Talent Program
    'program.title': 'Impulsionando o futuro do setor TIC',
    'program.subtitle': 'O programa cria uma ponte real entre a academia e a indústria, aproximando os jovens de projetos concretos e preparando as empresas com o talento que precisam para crescer.',
    'program.join': 'Junte-se ao Programa',
    'program.what_is.title': 'O que é TIC Talento?',
    'program.benefits_companies': 'Benefícios para as Empresas',
    'program.benefits_youth': 'Benefícios para os Jovens',

    // Authentication
    'auth.title': 'Acesse TIC Select',
    'auth.subtitle': 'Conecte-se com as melhores oportunidades TIC',
    'auth.card_title': 'Autenticação',
    'auth.card_description': 'Faça login ou crie uma conta para continuar',
    'auth.login_tab': 'Fazer Login',
    'auth.signup_tab': 'Registrar-se',
    'auth.email': 'Email',
    'auth.password': 'Senha',
    'auth.confirm_password': 'Confirmar Senha',
    'auth.full_name': 'Nome Completo',
    'auth.email_placeholder': 'seu@email.com',
    'auth.password_placeholder': '••••••••',
    'auth.name_placeholder': 'Seu nome completo',
    'auth.login_button': 'Fazer Login',
    'auth.signup_button': 'Criar Conta',
    'auth.login_loading': 'Fazendo login...',
    'auth.signup_loading': 'Criando conta...',
    'auth.back_home': '← Voltar ao início',
    'auth.password_mismatch': 'As senhas não coincidem',
    'auth.email_exists': 'Este email já está registrado. Tente fazer login.',
    'auth.signup_success': 'Conta criada com sucesso! Verifique seu email para confirmar sua conta.',
    'auth.create_account_error': 'Erro ao criar conta',
    'auth.invalid_credentials': 'Email ou senha incorretos',
    'auth.email_not_confirmed': 'Por favor, confirme seu email antes de fazer login',
    'auth.login_error': 'Erro ao fazer login',
    'auth.welcome_back': 'Bem-vindo de volta!',

    // 404 Page
    'notfound.title': '404',
    'notfound.message': 'Ops! Página não encontrada',
    'notfound.back_home': 'Voltar ao Início',
  },
};