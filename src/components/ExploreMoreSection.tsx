import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { RelatedLinks, ContextualLink, CTALinks } from "@/components/InternalLinks";

interface ExploreMoreSectionProps {
  currentPage: string;
  title?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
    variant?: "default" | "outline";
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  maxLinks?: number;
  showGradient?: boolean;
}

const ExploreMoreSection: React.FC<ExploreMoreSectionProps> = ({
  currentPage,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  maxLinks = 3,
  showGradient = false
}) => {
  const { t, language } = useLanguage();

  const defaultTitle = t('internal_links.explore_more');
  const defaultDescription = "Explora nuestros servicios especializados y descubre cómo podemos ayudarte a alcanzar tus objetivos profesionales.";

  const backgroundClass = showGradient 
    ? "bg-gradient-to-br from-background via-muted/20 to-background"
    : "bg-muted/30";

  return (
    <section className={`py-12 px-4 sm:px-6 lg:px-8 ${backgroundClass} relative overflow-hidden`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>
      
      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl font-display font-light mb-4 text-foreground tracking-tight">
            {title || defaultTitle}
          </h2>
          {(description || defaultDescription) && (
            <div className="max-w-2xl mx-auto">
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                {description || defaultDescription}
              </p>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Related Links - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border/50 p-6 shadow-elegant hover:shadow-lg transition-all duration-500 animate-scale-in">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/60 rounded-full mr-4"></div>
                <h3 className="text-lg font-display font-medium text-foreground">
                  Páginas Relacionadas
                </h3>
              </div>
              <RelatedLinks 
                currentPage={currentPage}
                maxLinks={maxLinks}
              />
            </div>
          </div>

          {/* CTA Section - Takes up 1 column */}
          <div className="space-y-4">
            {/* Primary CTA Card */}
            <div className="bg-card rounded-xl border border-border/50 p-6 shadow-elegant hover:shadow-lg transition-all duration-500 animate-scale-in [animation-delay:200ms]">
              <div className="text-center">
                <h3 className="text-base font-display font-medium mb-3 text-foreground">
                  ¿Listo para comenzar?
                </h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed font-light">
                  Conecta con nuestro equipo de expertos y descubre las mejores oportunidades.
                </p>
                
                <div className="space-y-3">
                  {primaryCTA && (
                    <Button 
                      asChild 
                      className={`w-full group transition-all duration-300 ${
                        primaryCTA.variant === 'outline' 
                          ? 'bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground' 
                          : 'bg-primary hover:bg-primary/90 shadow-glow hover:scale-[1.02]'
                      }`}
                    >
                      <Link to={primaryCTA.href}>
                        {primaryCTA.text}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  )}
                  
                  {secondaryCTA && (
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300"
                    >
                      <Link to={secondaryCTA.href}>
                        {secondaryCTA.text}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-muted/50 rounded-lg border border-border/30 p-4 animate-fade-in [animation-delay:400ms]">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <ExternalLink className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1 text-sm">
                    Consultoría Gratuita
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Obtén una consulta estratégica sin costo para evaluar tus necesidades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-8 flex justify-center animate-fade-in [animation-delay:600ms]">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default ExploreMoreSection;