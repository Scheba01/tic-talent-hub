import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TIC Select</h3>
            <p className="text-gray-400">
              {t('footer.description') || 'Conectamos talento tecnológico con empresas innovadoras'}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.links') || 'Enlaces'}</h4>
            <div className="space-y-2">
              <Link to="/quienes-somos" className="block text-gray-400 hover:text-white">
                {t('nav.about') || 'Quiénes Somos'}
              </Link>
              <Link to="/servicios-para-empresas" className="block text-gray-400 hover:text-white">
                {t('nav.services') || 'Servicios'}
              </Link>
              <Link to="/contacto" className="block text-gray-400 hover:text-white">
                {t('nav.contact') || 'Contacto'}
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact') || 'Contacto'}</h4>
            <div className="text-gray-400 space-y-1">
              <p>contacto@ticselect.com</p>
              <p>+56 965 722 197</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TIC Select. {t('footer.rights') || 'Todos los derechos reservados'}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;