import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-primary">
            TIC Select
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/quienes-somos" className="text-gray-600 hover:text-primary">
              {t('nav.about') || 'Quiénes Somos'}
            </Link>
            <Link to="/servicios-para-empresas" className="text-gray-600 hover:text-primary">
              {t('nav.services') || 'Servicios'}
            </Link>
            <Link to="/contacto" className="text-gray-600 hover:text-primary">
              {t('nav.contact') || 'Contacto'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;