import React, { createContext, useContext, useState } from 'react';

export type Language = 'es' | 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateDropdownOptions: (options: Array<{value: string, label: string}>) => Array<{value: string, label: string}>;
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

  const t = (key: string): string => {
    // Simple translations for testing
    const translations = {
      'nav.home': 'Inicio',
      'nav.about': 'Quiénes Somos',
      'nav.services': 'Servicios',
      'nav.contact': 'Contacto',
      'footer.description': 'Conectamos talento tecnológico con empresas innovadoras',
      'footer.links': 'Enlaces',
      'footer.contact': 'Contacto',
      'footer.rights': 'Todos los derechos reservados',
      'contact.title': 'Contacto',
      'contact.subtitle': 'Ponte en contacto con nosotros',
      'contact.meta.title': 'Contacto - TIC Select',
      'contact.meta.description': 'Contacta con TIC Select para consultas sobre nuestros servicios de reclutamiento tecnológico.'
    };
    
    return translations[key] || key;
  };

  const translateDropdownOptions = (options: Array<{value: string, label: string}>) => {
    return options.map(option => ({
      ...option,
      label: option.label
    }));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateDropdownOptions }}>
      {children}
    </LanguageContext.Provider>
  );
};