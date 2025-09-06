/**
 * Critical CSS utilities for performance optimization
 */

export const injectCriticalCSS = () => {
  if (typeof window === 'undefined') return;

  // Check if critical CSS is already injected
  if (document.querySelector('#critical-css')) return;

  const criticalCSS = `
    :root{--background:0 0% 98%;--foreground:0 0% 9%;--primary:0 85% 55%;--primary-foreground:0 0% 98%;--brand-black:0 0% 9%;--border:0 0% 92%;--font-display:'Inter',system-ui,sans-serif;--font-body:'Inter',system-ui,sans-serif;--gradient-hero:linear-gradient(135deg,hsl(0 0% 9%),hsl(0 0% 20%));--shadow-elegant:0 10px 40px -15px hsl(0 0% 9%/.1)}*{border-color:hsl(var(--border))}body{background-color:hsl(var(--background));color:hsl(var(--foreground));font-family:var(--font-body);margin:0;line-height:1.5}h1,h2,h3,h4,h5,h6{font-family:var(--font-display);font-weight:600}.critical-nav{position:fixed;top:0;width:100%;background:hsl(var(--background)/.95);backdrop-filter:blur(8px);border-bottom:1px solid hsl(var(--border));z-index:50}.critical-nav-container{max-width:80rem;margin:0 auto;padding:0 1rem}.critical-nav-content{display:flex;justify-content:space-between;align-items:center;height:4rem}.critical-logo{height:2rem;width:auto}.critical-hero{position:relative;padding:8rem 1rem 2rem;overflow:hidden;background:var(--gradient-hero);min-height:100vh;display:flex;align-items:center}.critical-hero-content{position:relative;max-width:96rem;margin:0 auto;text-align:center;color:white}.critical-hero-title{font-size:3rem;font-family:var(--font-display);font-weight:700;margin-bottom:2rem;line-height:1.1}.critical-hero-subtitle{font-size:1.25rem;opacity:.9;margin-bottom:3rem;max-width:64rem;margin-left:auto;margin-right:auto;line-height:1.6}.critical-hero-buttons{display:flex;flex-direction:column;gap:1.5rem;justify-content:center}.critical-btn-hero{background-color:hsl(var(--primary));color:hsl(var(--primary-foreground));padding:1rem 2rem;border-radius:.5rem;font-weight:500;text-decoration:none;display:inline-block;transition:all .3s ease;border:none;cursor:pointer;box-shadow:0 10px 25px -5px hsl(var(--primary)/.3)}.critical-btn-outline{border:2px solid hsl(var(--primary));color:hsl(var(--primary));background:transparent;padding:1rem 2rem;border-radius:.5rem;font-weight:500;text-decoration:none;display:inline-block;transition:all .3s ease;cursor:pointer}.critical-btn-hero:hover{background-color:hsl(var(--primary)/.9);box-shadow:0 15px 35px -5px hsl(var(--primary)/.4);transform:translateY(-1px)}.critical-btn-outline:hover{background-color:hsl(var(--primary));color:hsl(var(--primary-foreground))}@media (min-width:640px){.critical-nav-container{padding:0 1.5rem}.critical-hero{padding:8rem 1.5rem 2rem}.critical-hero-buttons{flex-direction:row}}@media (min-width:768px){.critical-hero-title{font-size:4.5rem}.critical-hero-subtitle{font-size:1.5rem}}@media (min-width:1024px){.critical-nav-container{padding:0 2rem}.critical-hero{padding:8rem 2rem 2rem}.critical-hero-title{font-size:6rem}}
  `;

  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
};

export const preloadNonCriticalCSS = () => {
  if (typeof window === 'undefined') return;

  // Preload non-critical CSS
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = '/src/index.css';
  document.head.appendChild(link);
};

export const loadNonCriticalCSS = () => {
  if (typeof window === 'undefined') return;

  const loadCSS = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/index.css';
    link.media = 'print';
    
    link.onload = function() {
      if (link.media) {
        link.media = 'all';
      }
    };
    
    document.head.appendChild(link);

    // Fallback for older browsers
    setTimeout(() => {
      if (link.media !== 'all') {
        link.media = 'all';
      }
    }, 3000);
  };

  if (document.readyState === 'complete') {
    requestIdleCallback ? requestIdleCallback(loadCSS) : setTimeout(loadCSS, 0);
  } else {
    window.addEventListener('load', () => {
      requestIdleCallback ? requestIdleCallback(loadCSS) : setTimeout(loadCSS, 0);
    });
  }
};