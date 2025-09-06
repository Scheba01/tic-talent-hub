import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}

export const InternalLink: React.FC<InternalLinkProps> = ({ 
  href, 
  children, 
  className = "", 
  showArrow = false 
}) => {
  return (
    <Link 
      to={href} 
      className={`text-primary hover:text-primary/80 transition-colors duration-200 ${className}`}
    >
      {children}
      {showArrow && <ArrowRight className="inline w-4 h-4 ml-1" />}
    </Link>
  );
};

interface RelatedLinksProps {
  currentPage: string;
  maxLinks?: number;
}

export const RelatedLinks: React.FC<RelatedLinksProps> = ({ currentPage, maxLinks = 3 }) => {
  const { t, language } = useLanguage();

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

  const allPages = [
    {
      path: '/',
      title: t('nav.home'),
      description: t('index.description'),
      category: 'main'
    },
    {
      path: getLocalizedPath('/quienes-somos'),
      title: t('nav.about'),
      description: t('about.description'),
      category: 'company'
    },
    {
      path: getLocalizedPath('/servicios-para-empresas'),
      title: t('nav.services'),
      description: t('services.description'),
      category: 'services'
    },
    {
      path: getLocalizedPath('/vacantes-y-perfiles'),
      title: t('nav.jobs'),
      description: t('jobs.description'),
      category: 'jobs'
    },
    {
      path: getLocalizedPath('/programa-talentotic'),
      title: t('nav.talent_program'),
      description: t('programaTalentoTIC.description'),
      category: 'programs'
    },
    {
      path: getLocalizedPath('/contacto'),
      title: t('nav.contact'),
      description: t('contact.description'),
      category: 'contact'
    }
  ];

  // Filter out current page and get related pages
  const relatedPages = allPages
    .filter(page => page.path !== currentPage)
    .slice(0, maxLinks);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{t('internal_links.related_pages')}</h3>
      <div className="grid gap-3">
        {relatedPages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className="block p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {page.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {page.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

interface ServiceLinksProps {
  excludeService?: string;
}

export const ServiceLinks: React.FC<ServiceLinksProps> = ({ excludeService }) => {
  const { t, language } = useLanguage();

  const services = [
    {
      title: t('services.executive_search.title'),
      description: t('services.executive_search.description'),
      href: `${language === 'en' ? '/enterprise-services' : language === 'pt' ? '/servicos-empresas' : '/servicios-para-empresas'}#executive-search`,
      key: 'executive-search'
    },
    {
      title: t('services.hr_consulting.title'),
      description: t('services.hr_consulting.description'),
      href: `${language === 'en' ? '/enterprise-services' : language === 'pt' ? '/servicos-empresas' : '/servicios-para-empresas'}#hr-consulting`,
      key: 'hr-consulting'
    },
    {
      title: t('services.coaching.title'),
      description: t('services.coaching.description'),
      href: `${language === 'en' ? '/enterprise-services' : language === 'pt' ? '/servicos-empresas' : '/servicios-para-empresas'}#coaching`,
      key: 'coaching'
    },
    {
      title: t('nav.talent_program'),
      description: t('programaTalentoTIC.description'),
      href: language === 'en' ? '/tic-talent-program' : language === 'pt' ? '/programa-talento-tic' : '/programa-talentotic',
      key: 'talent-program'
    }
  ];

  const filteredServices = excludeService 
    ? services.filter(service => service.key !== excludeService)
    : services;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {filteredServices.map((service) => (
        <Card key={service.key} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              <InternalLink href={service.href} showArrow>
                {service.title}
              </InternalLink>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm">
              {service.description}
            </CardDescription>
            <Button asChild variant="outline" size="sm" className="mt-3">
              <Link to={service.href}>
                {t('internal_links.learn_more')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {item.href ? (
              <InternalLink href={item.href} className="hover:text-foreground">
                {item.label}
              </InternalLink>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

interface CTALinksProps {
  primary?: {
    text: string;
    href: string;
  };
  secondary?: {
    text: string;
    href: string;
  };
}

export const CTALinks: React.FC<CTALinksProps> = ({ primary, secondary }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      {primary && (
        <Button asChild size="lg" className="flex-1">
          <Link to={primary.href}>
            {primary.text}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      )}
      {secondary && (
        <Button asChild variant="outline" size="lg" className="flex-1">
          <Link to={secondary.href}>
            {secondary.text}
          </Link>
        </Button>
      )}
    </div>
  );
};

// Contextual links that appear within content
interface ContextualLinkProps {
  keyword: string;
  href: string;
  children: React.ReactNode;
}

export const ContextualLink: React.FC<ContextualLinkProps> = ({ keyword, href, children }) => {
  return (
    <InternalLink 
      href={href} 
      className="font-medium underline decoration-primary/30 hover:decoration-primary"
    >
      {children}
    </InternalLink>
  );
};