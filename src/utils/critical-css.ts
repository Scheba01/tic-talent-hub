/**
 * Critical CSS utilities for performance optimization
 * Implements above-the-fold optimization for sub-2 second mobile loads
 */

export interface CriticalCSSConfig {
  enableLazyLoad: boolean;
  fontPreload: boolean;
  imageOptimization: boolean;
}

const defaultConfig: CriticalCSSConfig = {
  enableLazyLoad: true,
  fontPreload: true,
  imageOptimization: true
};

// Extract above-the-fold critical styles for each page
const getPageSpecificCriticalCSS = (pathname: string): string => {
  const baseCritical = `
    :root{--background:0 0% 98%;--foreground:0 0% 9%;--primary:0 85% 55%;--primary-foreground:0 0% 98%;--brand-black:0 0% 9%;--border:0 0% 92%;--font-display:'Inter',system-ui,sans-serif;--font-body:'Inter',system-ui,sans-serif;--gradient-hero:linear-gradient(135deg,hsl(0 0% 9%),hsl(0 0% 20%));--shadow-elegant:0 10px 40px -15px hsl(0 0% 9%/.1);--cyan-400:187 100% 65%;--cyan-300:186 100% 69%}
    *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:hsl(var(--border))}
    html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}
    body{margin:0;line-height:inherit;background-color:hsl(var(--background));color:hsl(var(--foreground));font-family:var(--font-body)}
    h1,h2,h3,h4,h5,h6{font-family:var(--font-display);font-weight:600;color:inherit;margin:0}
    p{margin:0}
    img,svg{display:block;vertical-align:middle;max-width:100%;height:auto}
    .critical-nav{position:fixed;top:0;left:0;right:0;background:hsl(var(--background)/.95);backdrop-filter:blur(8px);border-bottom:1px solid hsl(var(--border));z-index:50;height:4rem}
    .critical-nav-container{max-width:80rem;margin:0 auto;padding:0 1rem;height:100%;display:flex;justify-content:space-between;align-items:center}
    .critical-logo{height:2rem;width:auto}
    .critical-hero{position:relative;padding:8rem 1rem 2rem;overflow:hidden;background:var(--gradient-hero);min-height:100vh;display:flex;align-items:center}
    .critical-hero-content{position:relative;max-width:96rem;margin:0 auto;text-align:center;color:white}
    .critical-hero-title{font-size:clamp(2.5rem,8vw,6rem);font-family:var(--font-display);font-weight:700;margin-bottom:2rem;line-height:1.1}
    .critical-hero-subtitle{font-size:clamp(1.125rem,4vw,1.5rem);opacity:.9;margin-bottom:3rem;max-width:64rem;margin-left:auto;margin-right:auto;line-height:1.6}
    .critical-btn{padding:1rem 2rem;border-radius:.5rem;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;transition:all .3s ease;border:none;cursor:pointer;font-size:1rem}
    .critical-btn-hero{background-color:hsl(var(--primary));color:hsl(var(--primary-foreground));box-shadow:0 10px 25px -5px hsl(var(--primary)/.3)}
    .critical-btn-outline{border:2px solid hsl(var(--primary));color:hsl(var(--primary));background:transparent}
    .critical-btn-hero:hover{background-color:hsl(var(--primary)/.9);box-shadow:0 15px 35px -5px hsl(var(--primary)/.4);transform:translateY(-1px)}
    .critical-btn-outline:hover{background-color:hsl(var(--primary));color:hsl(var(--primary-foreground))}
    .critical-container{max-width:80rem;margin:0 auto;padding:0 1rem}
    .critical-grid{display:grid;gap:2rem}
    .critical-flex{display:flex;align-items:center;justify-content:center}
    .critical-section{padding:4rem 0}
    .text-center{text-align:center}
    .text-white{color:white}
    .text-cyan-300{color:hsl(var(--cyan-300))}
    .mb-4{margin-bottom:1rem}
    .mb-6{margin-bottom:1.5rem}
    .mb-8{margin-bottom:2rem}
    .text-lg{font-size:1.125rem;line-height:1.75rem}
    .text-xl{font-size:1.25rem;line-height:1.75rem}
    .text-2xl{font-size:1.5rem;line-height:2rem}
    .text-3xl{font-size:1.875rem;line-height:2.25rem}
    .text-4xl{font-size:2.25rem;line-height:2.5rem}
    .font-bold{font-weight:700}
    .font-semibold{font-weight:600}
    @media(min-width:640px){.critical-nav-container{padding:0 1.5rem}.critical-hero{padding:8rem 1.5rem 2rem}.critical-container{padding:0 1.5rem}.critical-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(min-width:768px){.critical-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(min-width:1024px){.critical-nav-container{padding:0 2rem}.critical-hero{padding:8rem 2rem 2rem}.critical-container{padding:0 2rem}}
  `;
  
  // Add page-specific critical styles
  const pageStyles: Record<string, string> = {
    '/': '', // Homepage already covered by base
    '/programa-talentotic': `
      .tic-select-hero{background:linear-gradient(135deg,hsl(220 15% 6%),hsl(220 20% 12%));color:white;min-height:80vh;display:flex;align-items:center;padding:2rem 0}
      .tic-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;margin:2rem 0}
      .tic-stat-card{text-align:center;padding:2rem;background:hsl(var(--background));border-radius:1rem;box-shadow:var(--shadow-elegant)}
    `,
    '/servicios-para-empresas': `
      .services-hero{background:linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary)/.8));color:white;padding:8rem 0 4rem}
    `,
  };
  
  return baseCritical + (pageStyles[pathname] || '');
};

export const injectCriticalCSS = (config: Partial<CriticalCSSConfig> = {}) => {
  if (typeof window === 'undefined') return;

  const finalConfig = { ...defaultConfig, ...config };
  
  // Check if critical CSS is already injected
  if (document.querySelector('#critical-css')) return;

  const pathname = window.location.pathname;
  const criticalCSS = getPageSpecificCriticalCSS(pathname);

  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = criticalCSS;
  
  // Insert at the very beginning of head for maximum priority
  const firstChild = document.head.firstChild;
  if (firstChild) {
    document.head.insertBefore(style, firstChild);
  } else {
    document.head.appendChild(style);
  }

  // Preload fonts if enabled
  if (finalConfig.fontPreload) {
    preloadCriticalFonts();
  }

  // Mark critical CSS as loaded
  if ('performance' in window && 'mark' in performance) {
    performance.mark('critical-css-injected');
  }
};

export const preloadCriticalFonts = () => {
  if (typeof window === 'undefined') return;

  const fonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  ];

  fonts.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    
    // Load the actual stylesheet after preload
    setTimeout(() => {
      const styleLink = document.createElement('link');
      styleLink.rel = 'stylesheet';
      styleLink.href = href;
      styleLink.media = 'print';
      styleLink.onload = function() {
        if (styleLink.media) {
          styleLink.media = 'all';
        }
      };
      document.head.appendChild(styleLink);
    }, 100);
  });
};

export const preloadNonCriticalCSS = () => {
  if (typeof window === 'undefined') return;

  // Preload non-critical CSS with high priority
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = '/src/index.css';
    link.onload = function() {
      (this as HTMLLinkElement).onload = null;
      (this as HTMLLinkElement).rel = 'stylesheet';
    };
  document.head.appendChild(link);
};

export const loadNonCriticalCSS = () => {
  if (typeof window === 'undefined') return;

  const loadCSS = () => {
    // Check if already loaded
    if (document.querySelector('link[href="/src/index.css"]')) return;
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/index.css';
    link.media = 'print';
    
    link.onload = function() {
      if (link.media) {
        link.media = 'all';
        // Mark non-critical CSS as loaded
        if ('performance' in window && 'mark' in performance) {
          performance.mark('non-critical-css-loaded');
        }
      }
    };
    
    link.onerror = function() {
      console.warn('Failed to load non-critical CSS');
    };
    
    document.head.appendChild(link);

    // Fallback for older browsers
    setTimeout(() => {
      if (link.media !== 'all') {
        link.media = 'all';
      }
    }, 3000);
  };

  // Use requestIdleCallback for better performance
  if (document.readyState === 'complete') {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadCSS, { timeout: 2000 });
    } else {
      setTimeout(loadCSS, 0);
    }
  } else {
    window.addEventListener('load', () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadCSS, { timeout: 2000 });
      } else {
        setTimeout(loadCSS, 0);
      }
    });
  }
};

// Resource hints for better performance
export const addResourceHints = () => {
  if (typeof window === 'undefined') return;

  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossorigin) {
      link.crossOrigin = hint.crossorigin;
    }
    document.head.appendChild(link);
  });
};