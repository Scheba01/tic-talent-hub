import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import ticSelectLogo from "@/assets/tic-select-logo.png";
import linkedinLogo from "@/assets/linkedin-logo.svg";

import LazyImage from "@/components/ui/lazy-image";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getLocalizedPath = (basePath: string) => {
    switch (language) {
      case 'en':
        return {
          '/quienes-somos': '/about-us',
          '/servicios-para-empresas': '/enterprise-services', 
          '/vacantes-y-perfiles': '/jobs-profiles',
          '/programa-talentotic': '/tic-talent-program',
          '/contacto': '/contact'
        }[basePath] || basePath;
      case 'pt':
        return {
          '/quienes-somos': '/sobre-nos',
          '/servicios-para-empresas': '/servicos-empresas',
          '/vacantes-y-perfiles': '/vagas-perfis',
          '/programa-talentotic': '/programa-talento-tic',
          '/contacto': '/contato'
        }[basePath] || basePath;
      default:
        return basePath;
    }
  };

  const navItems = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.about'), path: getLocalizedPath("/quienes-somos") },
    { name: t('nav.services'), path: getLocalizedPath("/servicios-para-empresas") },
    { name: t('nav.jobs'), path: getLocalizedPath("/vacantes-y-perfiles") },
    { name: t('nav.talent_program'), path: getLocalizedPath("/programa-talentotic") },
  ];

  return (
    <>
      <nav className="critical-nav fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Optimized for LCP */}
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/d7b9699f-31e6-4a94-a4ae-696ec5740e15.png" 
                alt="TIC SELECT" 
                className="h-8 w-auto"
                width="120"
                height="32"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to={getLocalizedPath("/contacto")}>{t('nav.contact')}</Link>
              </Button>
              
              {/* Auth Section */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background border border-border">
                    <DropdownMenuItem disabled className="font-medium">
                      {profile?.nombre_completo || user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/mi-perfil" className="w-full cursor-pointer">
                        Mi Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/registro-talento" className="w-full cursor-pointer">
                        Editar Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={signOut}
                      className="hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="outline">
                  <Link to="/auth">{t('nav.login')}</Link>
                </Button>
              )}
              
              {/* LinkedIn Link */}
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                <a 
                  href="https://www.linkedin.com/company/ticselect/about/?viewAsMember=true" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="h-4 w-4" />
                </a>
              </Button>
              
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border border-border">
                  <DropdownMenuItem 
                    className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={() => setLanguage('en')}
                  >
                    🇺🇸 English
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={() => setLanguage('es')}
                  >
                    🇪🇸 Español
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={() => setLanguage('pt')}
                  >
                    🇧🇷 Português
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => {
                  console.log('Button clicked! Current state:', isOpen);
                  setIsOpen(!isOpen);
                }}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu - separate from nav for better visibility */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)}>
          <div className="fixed top-16 left-0 right-0 bg-background border-b shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="text-lg font-bold text-primary mb-4">Navegación</div>
              
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block p-3 text-lg font-medium hover:bg-accent rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t pt-4">
                <Link
                  to={getLocalizedPath("/contacto")}
                  className="block w-full p-3 bg-primary text-primary-foreground text-center rounded-md font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {t('nav.contact')}
                </Link>
              </div>
              
              {user ? (
                <div className="border-t pt-4 space-y-2">
                  <div className="text-sm text-muted-foreground p-2">
                    {profile?.nombre_completo || user.email}
                  </div>
                  <Link
                    to="/mi-perfil"
                    className="block p-3 hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    to="/registro-talento"
                    className="block p-3 hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Editar Perfil
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="block w-full p-3 hover:bg-destructive/10 hover:text-destructive rounded-md text-left"
                  >
                    <LogOut className="h-4 w-4 inline mr-2" />
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <div className="border-t pt-4">
                  <Link
                    to="/auth"
                    className="block p-3 border border-border rounded-md text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                </div>
              )}
              
              <div className="border-t pt-4">
                <div className="text-sm text-muted-foreground mb-2">Idioma</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setLanguage('es');
                      setIsOpen(false);
                    }}
                    className="p-2 border rounded text-center text-sm"
                  >
                    🇪🇸 ES
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsOpen(false);
                    }}
                    className="p-2 border rounded text-center text-sm"
                  >
                    🇺🇸 EN
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('pt');
                      setIsOpen(false);
                    }}
                    className="p-2 border rounded text-center text-sm"
                  >
                    🇧🇷 PT
                  </button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <a
                  href="https://www.linkedin.com/company/ticselect/about/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 border rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;