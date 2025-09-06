import { useState, useEffect } from "react";
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

          {/* Mobile menu button - Optimized for touch */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="critical-button h-11 w-11 p-0"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                  <Link to={getLocalizedPath("/contacto")} onClick={() => setIsOpen(false)}>
                    {t('nav.contact')}
                  </Link>
                </Button>
              </div>
              <div className="px-3 py-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground px-3 py-1">
                      {profile?.nombre_completo || user.email}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/mi-perfil" onClick={() => setIsOpen(false)}>
                        Mi Perfil
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/registro-talento" onClick={() => setIsOpen(false)}>
                        Editar Perfil
                      </Link>
                    </Button>
                    <Button 
                      onClick={() => {
                        setIsOpen(false);
                        signOut();
                      }}
                      variant="outline" 
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </Button>
                  </div>
                ) : (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      {t('nav.login')}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;