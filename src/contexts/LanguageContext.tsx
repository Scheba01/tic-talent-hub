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

// Helper function to detect language from URL
const getLanguageFromPath = (pathname: string): Language | null => {
  // Spanish paths
  if (pathname.includes('quienes-somos') || 
      pathname.includes('servicios-para-empresas') || 
      pathname.includes('vacantes-y-perfiles') || 
      pathname.includes('programa-talentotic') || 
      pathname.includes('programa-afiliados')) {
    return 'es';
  }
  
  // English paths (you can add these as needed)
  if (pathname.includes('/en/') || 
      pathname.includes('about-us') || 
      pathname.includes('enterprise-services')) {
    return 'en';
  }
  
  // Portuguese paths (you can add these as needed)  
  if (pathname.includes('/pt/') || 
      pathname.includes('sobre-nos') || 
      pathname.includes('servicos-empresas')) {
    return 'pt';
  }
  
  return null;
};

// Helper function to get browser language
const getBrowserLanguage = (): Language => {
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('en')) return 'en';
    if (browserLang.startsWith('pt')) return 'pt';
  }
  return 'es'; // Default to Spanish
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return 'es';
    
    // First priority: URL-based language detection
    const urlLanguage = getLanguageFromPath(window.location.pathname);
    if (urlLanguage) return urlLanguage;
    
    // Second priority: localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['es', 'en', 'pt'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Third priority: browser language
    return getBrowserLanguage();
  });

  // Listen for URL changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleLocationChange = () => {
      const urlLanguage = getLanguageFromPath(window.location.pathname);
      if (urlLanguage && urlLanguage !== language) {
        setLanguage(urlLanguage);
      }
    };

    // Listen for popstate events (back/forward buttons)
    window.addEventListener('popstate', handleLocationChange);
    
    // Check on mount
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    
    // Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
      
      // Update SEO metadata
      const seo = seoTranslations[lang];
      document.title = seo.title;
      
      // Update meta tags safely
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) metaDescription.setAttribute('content', seo.description);
      
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) metaKeywords.setAttribute('content', seo.keywords);
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', seo.ogTitle);
      
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute('content', seo.ogDescription);
    }
  };

  const t = (key: string): string => {
    // Use the current language state
    const currentTranslations = translations[language];
    
    // Return the translation if it exists, fallback to Spanish, then to the key itself
    return currentTranslations?.[key] || translations['es'][key] || key;
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

    // Services Section (Homepage)
    'services.title': 'Nuestros Servicios',
    'services.executive_search.title': 'Búsqueda Ejecutiva',
    'services.executive_search.desc': 'Identificamos y atraemos a los líderes que tu empresa necesita para crecer.',
    'services.hr_consulting.title': 'Consultoría en RRHH',
    'services.hr_consulting.desc': 'Optimizamos tus procesos de recursos humanos con estrategias personalizadas.',
    'services.coaching.title': 'Coaching & Desarrollo',
    'services.coaching.desc': 'Desarrollamos el potencial de tus equipos y líderes para maximizar el rendimiento.',
    'services.see_more': 'Ver Más',

    // Footer
    'footer.quick_links': 'Enlaces Rápidos',
    'footer.community': 'Comunidad',
    'footer.contact': 'Contacto',
    'footer.privacy_policy': 'Política de Privacidad',
    'footer.cookies_policy': 'Política de Cookies',
    'footer.all_rights': '© 2024 TIC Select. Todos los derechos reservados.',

    // Hero Section
    'hero.title': 'El Talento que Impulsa la Industria TIC',
    'hero.subtitle': 'Conectamos líderes del sector de Pruebas, Inspección y Certificación (TIC) con el talento que necesitan para crecer. Entregamos una shortlist en 7 días. Garantizado.',
    'hero.discover_services': 'Descubre Nuestros Servicios',
    'hero.contact_us': 'Contáctanos',

    // Jobs Page
    'jobs.title': 'Vacantes y Perfiles',
    'jobs.subtitle': 'Únete a nuestra red de profesionales TIC y accede a oportunidades exclusivas en toda LATAM.',
    'jobs.register_now': 'Registrarse Ahora',
    'jobs.why_register': '¿Por qué registrarse?',
    'jobs.benefit1.title': 'Base de Datos Exclusiva',
    'jobs.benefit1.desc': 'Formarás parte de nuestra base de datos de talentos especializados, accediendo a posiciones que no se publican en otros sitios.',
    'jobs.benefit2.title': 'Alertas Personalizadas',
    'jobs.benefit2.desc': 'Recibe notificaciones de ofertas que coincidan exactamente con tu perfil y experiencia profesional.',
    'jobs.benefit3.title': 'Crecimiento Profesional',
    'jobs.benefit3.desc': 'Conecta con empresas líderes del sector TIC y acelera tu desarrollo profesional en la industria.',
    'jobs.process.title': 'Nuestro Proceso',
    'jobs.process.step1.title': 'Regístrate',
    'jobs.process.step1.desc': 'Completa tu perfil profesional con tus habilidades y experiencia.',
    'jobs.process.step2.title': 'Evaluación',
    'jobs.process.step2.desc': 'Nuestro equipo revisa tu perfil y identifica las mejores oportunidades.',
    'jobs.process.step3.title': 'Conexión',
    'jobs.process.step3.desc': 'Te conectamos directamente con empresas que buscan tu perfil específico.',
    'jobs.specializations.title': 'Especializaciones Demandadas',
    'jobs.companies.title': 'Empresas que Confían en Nosotros',
    'jobs.companies.subtitle': 'Trabajamos con las principales organizaciones del sector TIC en LATAM',
    'jobs.cta.title': '¿Listo para dar el siguiente paso?',
    'jobs.cta.subtitle': 'Únete a nuestra red de profesionales y descubre oportunidades exclusivas',
    'jobs.cta.register': 'Registrarse en la Red',
    'jobs.cta.contact': 'Contactar Consultor',
    'jobs.how_it_works': '¿Cómo Funciona?',
    'jobs.step1.title': 'Regístrate',
    'jobs.step1.desc': 'Completa tu perfil profesional con tu experiencia y habilidades TIC.',
    'jobs.step2.title': 'Validación',
    'jobs.step2.desc': 'Nuestro equipo valida tu perfil y lo incluye en nuestra base de datos.',
    'jobs.step3.title': 'Matching',
    'jobs.step3.desc': 'Te conectamos con oportunidades que se ajusten a tu perfil y objetivos.',
    'jobs.step4.title': 'Oportunidades',
    'jobs.step4.desc': 'Recibe ofertas laborales y noticias relevantes de la industria TIC.',
    'jobs.network_advantages': 'Ventajas de Nuestra Red',
    'jobs.advantage1': 'Acceso prioritario a oportunidades exclusivas del sector TIC',
    'jobs.advantage2': 'Networking con profesionales y líderes de la industria',
    'jobs.advantage3': 'Información privilegiada sobre tendencias y salarios del mercado',
    'jobs.advantage4': 'Sin compromiso: Puedes desactivar las notificaciones cuando quieras',
    'jobs.join_professionals': 'Únete a +15,000 Profesionales',
    'jobs.join_community': 'Forma parte de la comunidad TIC más grande de LATAM y accede a oportunidades exclusivas.',
    'jobs.start_now': 'Comenzar Ahora',
    'jobs.register_free': 'Registro Gratuito',
    'jobs.more_info': 'Más Información',

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
    'about.experts.title': 'Red de Expertos',
    'about.experts.desc': 'Nuestro equipo entiende las necesidades específicas del sector TIC porque viene de él.',
    'about.talent_universe.title': 'Universo de Talento',
    'about.talent_universe.desc': 'Una red activa y en constante expansión de profesionales especializados en la región.',
    'about.approach.title': 'Enfoque 360°',
    'about.approach.desc': 'Desde auditores especializados hasta directores regionales, cubrimos todos los niveles.',
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

    // ... (continue with all other Spanish translations)
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

    // ... (continue with all other English translations)
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

    // ... (continue with all other Portuguese translations)
  }
};