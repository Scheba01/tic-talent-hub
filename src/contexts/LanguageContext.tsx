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

// Normalize current route for both HashRouter (#/...) and BrowserRouter (/...)
const getCurrentRoute = (): string => {
  if (typeof window === 'undefined') return '';
  const hash = window.location.hash || '';
  if (hash.startsWith('#/')) return hash.slice(1).toLowerCase();
  return window.location.pathname.toLowerCase();
};

// Detect language from route
const getLanguageFromPath = (route?: string): Language | null => {
  const path = (route ?? getCurrentRoute());
  if (path.startsWith('/en/')) return 'en';
  if (path.startsWith('/pt/')) return 'pt';
  if (path.startsWith('/es/')) return 'es';
  if (
    path.includes('quienes-somos') ||
    path.includes('servicios-para-empresas') ||
    path.includes('vacantes-y-perfiles') ||
    path.includes('programa-talentotic') ||
    path.includes('programa-afiliados')
  ) return 'es';
  if (path.includes('about-us') || path.includes('enterprise-services')) return 'en';
  if (path.includes('sobre-nos') || path.includes('servicos-empresas')) return 'pt';
  return null;
};

// Helper function to get browser language
const getBrowserLanguage = (): Language => {
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('en')) return 'en';
    if (browserLang.startsWith('pt')) return 'pt';
  }
  return 'es';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'es';
    const fromUrl = getLanguageFromPath(getCurrentRoute());
    if (fromUrl) return fromUrl;
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && ['es','en','pt'].includes(saved)) return saved;
    return getBrowserLanguage();
  });

  // Listen for SPA navigation events (back/forward, hash changes, push/replaceState)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const notify = () => {
      const urlLanguage = getLanguageFromPath(getCurrentRoute());
      if (urlLanguage && urlLanguage !== language) setLanguage(urlLanguage);
    };
    window.addEventListener('popstate', notify);
    window.addEventListener('hashchange', notify);
    const wrap = (method: 'pushState' | 'replaceState') => {
      const orig = history[method];
      return function(this: History, ...args: any[]) {
        const ret = orig.apply(this, args as any);
        window.dispatchEvent(new Event('locationchange'));
        return ret;
      };
    };
    history.pushState = wrap('pushState');
    history.replaceState = wrap('replaceState');
    window.addEventListener('locationchange', notify);
    notify();
    return () => {
      window.removeEventListener('popstate', notify);
      window.removeEventListener('hashchange', notify);
      window.removeEventListener('locationchange', notify);
    };
  }, [language]);

  // Apply <html lang> and SEO/meta whenever language changes
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const seo = seoTranslations[language];
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
    document.title = seo.title;
    const ensureMeta = (attrKey: 'name' | 'property', attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrKey}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrKey, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    ensureMeta('name','description', seo.description);
    ensureMeta('name','keywords', seo.keywords);
    ensureMeta('name','author', seo.author);
    ensureMeta('property','og:title', seo.ogTitle);
    ensureMeta('property','og:description', seo.ogDescription);
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    const current = translations[language] as Record<string,string> | undefined;
    const val = current?.[key];
    if (!val && typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.warn(`[i18n] Missing translation: ${language}.${key}`);
    }
    return val || translations['es'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string,string>> = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Quiénes Somos',
    'nav.services': 'Servicios para Empresas',
    'nav.jobs': 'Empleos',
    'nav.talent_program': 'Programa TIC Talento',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar Sesión',
    'nav.logout': 'Cerrar Sesión',
    'nav.talent_registration': 'Registro de Talento',
    'services.title': 'Nuestros Servicios',
    'services.executive_search.title': 'Búsqueda Ejecutiva',
    'services.executive_search.desc': 'Identificamos y atraemos a los líderes que tu empresa necesita para crecer.',
    'services.hr_consulting.title': 'Consultoría en RRHH',
    'services.hr_consulting.desc': 'Optimizamos tus procesos de recursos humanos con estrategias personalizadas.',
    'services.coaching.title': 'Coaching & Desarrollo',
    'services.coaching.desc': 'Desarrollamos el potencial de tus equipos y líderes para maximizar el rendimiento.',
    'services.see_more': 'Ver Más',
    'footer.quick_links': 'Enlaces Rápidos',
    'footer.community': 'Comunidad',
    'footer.contact': 'Contacto',
    'footer.privacy_policy': 'Política de Privacidad',
    'footer.cookies_policy': 'Política de Cookies',
    'footer.all_rights': '© 2024 TIC Select. Todos los derechos reservados.',
    'hero.title': 'El Talento que Impulsa la Industria TIC',
    'hero.subtitle': 'Conectamos líderes del sector de Pruebas, Inspección y Certificación (TIC) con el talento que necesitan para crecer. Entregamos una shortlist en 7 días. Garantizado.',
    'hero.discover_services': 'Descubre Nuestros Servicios',
    'hero.contact_us': 'Contáctanos',
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
    'promise.title': 'Contratación Estratégica, Sin Riesgos',
    'promise.shortlist.title': 'Shortlist en 7 Días',
    'promise.shortlist.desc': 'Nuestra base de datos de talentos pre-evaluados nos permite actuar con una agilidad que nadie más puede ofrecer.',
    'promise.guarantee.title': 'Garantía de 90 Días',
    'promise.guarantee.desc': 'Si el candidato no cumple las expectativas en los primeros tres meses, buscamos un reemplazo sin costo alguno.',
    'promise.zero_risk.title': 'Riesgo Cero',
    'promise.zero_risk.desc': 'Solo inviertes cuando decidiste contratar a uno de nuestros candidatos. Sin pagos por adelantado ni costos ocultos.',
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
    'about.cta.subtitle': 'Trabajemos juntos para impulsar el crecimiento de tu empresa'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Enterprise Services',
    'nav.jobs': 'Jobs',
    'nav.talent_program': 'TIC Talent Program',
    'nav.contact': 'Contact',
    'nav.login': 'Sign In',
    'nav.logout': 'Sign Out',
    'nav.talent_registration': 'Talent Registration',
    'hero.title': 'The Talent that Drives the TIC Industry',
    'hero.subtitle': 'We connect leaders in the Testing, Inspection and Certification (TIC) sector with the talent they need to grow. We deliver a shortlist in 7 days. Guaranteed.',
    'hero.discover_services': 'Discover Our Services',
    'hero.contact_us': 'Contact Us',
    'promise.title': 'Strategic Hiring, Risk-Free',
    'promise.shortlist.title': 'Shortlist in 7 Days',
    'promise.shortlist.desc': 'Our pre-evaluated talent database allows us to act with agility that no one else can offer.',
    'promise.guarantee.title': '90-Day Guarantee',
    'promise.guarantee.desc': 'If the candidate doesn’t meet expectations in the first three months, we find a replacement at no cost.',
    'promise.zero_risk.title': 'Zero Risk',
    'promise.zero_risk.desc': 'You only invest when you decide to hire one of our candidates. No upfront payments or hidden costs.',
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
    'why.direct_email': 'Direct Email'
  },
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Quem Somos',
    'nav.services': 'Serviços Empresariais',
    'nav.jobs': 'Empregos',
    'nav.talent_program': 'Programa TIC Talento',
    'nav.contact': 'Contato',
    'nav.login': 'Entrar',
    'nav.logout': 'Sair',
    'nav.talent_registration': 'Registro de Talento',
    'hero.title': 'O Talento que Impulsiona a Indústria TIC',
    'hero.subtitle': 'Conectamos líderes do setor de Testes, Inspeção e Certificação (TIC) com o talento necessário para crescer. Entregamos uma lista de candidatos em 7 dias. Garantido.',
    'hero.discover_services': 'Descubra Nossos Serviços',
    'hero.contact_us': 'Entre em Contato',
    'promise.title': 'Contratação Estratégica, Sem Riscos',
    'promise.shortlist.title': 'Lista de Candidatos em 7 Dias',
    'promise.shortlist.desc': 'Nossa base de dados de talentos pré-avaliados nos permite agir com agilidade que ninguém mais pode oferecer.',
    'promise.guarantee.title': 'Garantia de 90 Dias',
    'promise.guarantee.desc': 'Se o candidato não atender às expectativas nos primeiros três meses, buscamos um substituto sem custo algum.',
    'promise.zero_risk.title': 'Risco Zero',
    'promise.zero_risk.desc': 'Você só investe quando decidiu contratar um de nossos candidatos. Sem pagamentos antecipados ou custos ocultos.',
    'why.title': 'Nascemos da Indústria para Servir à Indústria',
    'why.experience.title': '+30 Anos de Experiência Combinada',
    'why.experience.desc': 'Nossa equipe entende as necessidades específicas do setor TIC porque vem dele.',
    'why.talent.title': '+15.000 Talentos na LATAM',
    'why.talent.desc': 'Uma rede ativa e em constante expansão de profissionais especializados na região.',
    'why.approach.title': 'Abordagem 360°',
    'why.approach.desc': 'De auditores especializados a diretores regionais, cobrimos todos os níveis.',
    'why.ready.title': 'Pronto para Começar?',
    'why.ready.desc': 'Escolha sua forma preferida de contato',
    'why.contact_form': 'Formulário de Contato',
    'why.whatsapp': 'WhatsApp',
    'why.direct_email': 'E-mail Direto'
  }
};
