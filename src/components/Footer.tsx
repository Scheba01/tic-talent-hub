import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { t } = useLanguage();
  return <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Enlaces Rápidos */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/quienes-somos" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/servicios-para-empresas" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/vacantes-y-perfiles" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.jobs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">{t('footer.community')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programa-talentotic" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.talent_program')}
                </Link>
              </li>
              <li>
                <Link to="/programa-afiliados" className="text-muted-foreground hover:text-primary transition-colors">
                   {t('footer.affiliate_program')}
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidad" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy_policy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contacto@ticselect.com" className="text-muted-foreground hover:text-primary transition-colors">
                  contacto@ticselect.com
                </a>
              </li>
              <li>
                <a href="tel:+56979575372" className="text-muted-foreground hover:text-primary transition-colors">
                  +56 9 7957 5372
                </a>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                  <a 
                    href="https://www.linkedin.com/company/ticselect/about/?viewAsMember=true" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Programa de Afiliados */}
        <div className="mt-12 pt-8 border-t border-border">
          
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link to="/" className="mb-4 md:mb-0 inline-block">
              <img 
                src="/lovable-uploads/d7b9699f-31e6-4a94-a4ae-696ec5740e15.png" 
                alt="TIC SELECT" 
                className="h-8 w-auto"
              />
            </Link>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex space-x-4 text-sm">
                <Link to="/politica-de-privacidad" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy_policy')}
                </Link>
                <span className="text-muted-foreground">|</span>
                <a href="#politica-cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.cookies_policy')}
                </a>
              </div>
              <p className="text-muted-foreground text-sm">
                {t('footer.all_rights')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;