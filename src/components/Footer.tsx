import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import linkedinLogo from "@/assets/linkedin-logo.svg";
import LazyImage from "@/components/ui/lazy-image";

const Footer = () => {
  const { t } = useLanguage();
  return <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Company */}
          <div className="lg:col-span-1">
            <h3 className="font-display font-semibold text-lg mb-4 text-foreground">{t('footer.company')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/quienes-somos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h3 className="font-display font-semibold text-lg mb-4 text-foreground">{t('nav.services')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/servicios-para-empresas" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('services.enterprise')}
                </Link>
              </li>
              <li>
                <Link to="/vacantes-y-perfiles" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('nav.jobs')}
                </Link>
              </li>
              <li>
                <Link to="/registro-talento" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('footer.talent_registration')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Talent */}
          <div className="lg:col-span-1">
            <h3 className="font-display font-semibold text-lg mb-4 text-foreground">{t('footer.talent')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/programa-talentotic" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('nav.talent_program')}
                </Link>
              </li>
              <li>
                <Link to="/mi-perfil" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('footer.my_profile')}
                </Link>
              </li>
              <li>
                <Link to="/programa-afiliados" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('footer.affiliate_program')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-1">
            <h3 className="font-display font-semibold text-lg mb-4 text-foreground">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/politica-de-privacidad" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('footer.privacy_policy')}
                </Link>
              </li>
              <li>
                <a href="#politica-cookies" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('footer.cookies_policy')}
                </a>
              </li>
              <li>
                <a href="#terminos-condiciones" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('footer.terms_conditions')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-1">
            <h3 className="font-display font-semibold text-lg mb-4 text-foreground">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contacto@ticselect.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  contacto@ticselect.com
                </a>
              </li>
              <li>
                <a href="tel:+56979575372" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +56 9 7957 5372
                </a>
              </li>
              <li className="pt-2">
                <div className="flex space-x-3">
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-primary hover:text-primary-foreground" asChild>
                    <a 
                      href="https://www.linkedin.com/company/ticselect/about/?viewAsMember=true" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <img src={linkedinLogo} alt="LinkedIn" className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-md">
            <h4 className="font-display font-semibold text-base mb-2 text-foreground">{t('footer.newsletter_title')}</h4>
            <p className="text-muted-foreground text-sm mb-4">{t('footer.newsletter_description')}</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder={t('footer.email_placeholder')}
                className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button size="sm" className="px-4">
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <Link to="/" className="inline-block">
              <LazyImage 
                src="/lovable-uploads/d7b9699f-31e6-4a94-a4ae-696ec5740e15.png" 
                alt="TIC SELECT" 
                className="h-6 w-auto object-contain"
                width={90}
                height={24}
              />
            </Link>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-4 text-sm">
                <Link to="/politica-de-privacidad" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy_policy')}
                </Link>
                <span className="text-muted-foreground">•</span>
                <a href="#politica-cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.cookies_policy')}
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="#terminos-condiciones" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.terms_conditions')}
                </a>
              </div>
              <p className="text-muted-foreground text-sm">
                © 2024 TIC SELECT. {t('footer.all_rights')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;