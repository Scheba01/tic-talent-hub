import { useEffect, useCallback } from 'react';
import { loadNonCriticalCSS } from '@/utils/critical-css';
import { getPerformanceMonitor } from '@/utils/performance-monitor';

interface PerformanceOptimizationOptions {
  preloadImages?: string[];
  enableServiceWorker?: boolean;
  measureMetrics?: boolean;
  optimizeImages?: boolean;
}

export const usePerformanceOptimization = (options: PerformanceOptimizationOptions = {}) => {
  const {
    preloadImages = [],
    enableServiceWorker = false,
    measureMetrics = true,
    optimizeImages = true
  } = options;

  const preloadCriticalImages = useCallback(() => {
    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, [preloadImages]);

  const optimizeImageLoading = useCallback(() => {
    if (!optimizeImages) return;

    // Add loading="lazy" to all images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach((img, index) => {
      // First few images should load eagerly (above the fold)
      if (index < 3) {
        img.setAttribute('loading', 'eager');
        img.setAttribute('fetchpriority', 'high');
      } else {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decoding="async" for better performance
      img.setAttribute('decoding', 'async');
    });
  }, [optimizeImages]);

  const registerServiceWorker = useCallback(async () => {
    if (!enableServiceWorker || !('serviceWorker' in navigator)) return;

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }, [enableServiceWorker]);

  const measureCoreWebVitals = useCallback(() => {
    if (!measureMetrics) return;

    const monitor = getPerformanceMonitor();
    
    // Report metrics after 5 seconds
    setTimeout(() => {
      const metrics = monitor.getMetrics();
      const assessment = monitor.assessPerformance();
      
      console.group('🚀 Core Web Vitals Report');
      console.log('Metrics:', metrics);
      console.log('Performance Score:', assessment.score);
      console.log('Recommendations:', assessment.recommendations);
      console.groupEnd();

      // Send to analytics (placeholder)
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          lcp: metrics.LCP,
          fid: metrics.FID,
          cls: metrics.CLS,
          fcp: metrics.FCP,
          ttfb: metrics.TTFB,
          performance_score: assessment.score
        });
      }
    }, 5000);
  }, [measureMetrics]);

  const prefetchNextPageResources = useCallback(() => {
    // Prefetch resources for likely next pages
    const criticalRoutes = [
      '/servicios-para-empresas',
      '/programa-talentotic',
      '/vacantes-y-perfiles'
    ];

    criticalRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }, []);

  const optimizeResourceLoading = useCallback(() => {
    // Preload critical resources
    const criticalResources = [
      { href: '/src/assets/tic-select-logo.png', as: 'image' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = resource.as;
      link.href = resource.href;
      if (resource.as === 'style') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    // Initialize performance optimizations
    const initOptimizations = async () => {
      // Preload critical images immediately
      preloadCriticalImages();
      
      // Optimize resource loading
      optimizeResourceLoading();
      
      // Load non-critical CSS
      loadNonCriticalCSS();
      
      // Register service worker
      await registerServiceWorker();
      
      // Optimize images after DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', optimizeImageLoading);
      } else {
        optimizeImageLoading();
      }
      
      // Measure performance metrics
      measureCoreWebVitals();
      
      // Prefetch next page resources after initial load
      setTimeout(prefetchNextPageResources, 2000);
    };

    initOptimizations();

    return () => {
      document.removeEventListener('DOMContentLoaded', optimizeImageLoading);
    };
  }, [
    preloadCriticalImages,
    optimizeResourceLoading,
    registerServiceWorker,
    optimizeImageLoading,
    measureCoreWebVitals,
    prefetchNextPageResources
  ]);

  return {
    preloadCriticalImages,
    optimizeImageLoading,
    measureCoreWebVitals,
    prefetchNextPageResources
  };
};

// Global performance optimization utilities
export const addCriticalResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];

  hints.forEach(hint => {
    if (!document.querySelector(`link[href="${hint.href}"]`)) {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossOrigin) {
        link.crossOrigin = hint.crossOrigin;
      }
      document.head.appendChild(link);
    }
  });
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}