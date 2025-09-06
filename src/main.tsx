import { createRoot } from 'react-dom/client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './App.tsx';
import './index.css';
import './styles/critical-mobile.css';
import { injectCriticalCSS, preloadNonCriticalCSS, addResourceHints } from './utils/critical-css';
import { getPerformanceMonitor } from './utils/performance-monitor';
import { MobileOptimizations, mobilePerformanceMonitor } from './utils/mobile-performance';

const RECAPTCHA_SITE_KEY = "6LfMsbgrAAAAAJubJ3wE6z3AF5FwkxC3r0lTeQqm";

// Mark critical timing for Core Web Vitals
if (performance.mark) {
  performance.mark('main-tsx-start');
}

// Initialize mobile optimizations immediately for better Core Web Vitals
MobileOptimizations.init();

// Initialize performance monitoring with mobile focus
const performanceMonitor = getPerformanceMonitor();

// Inject critical CSS immediately for above-the-fold content
injectCriticalCSS({
  enableLazyLoad: true,
  fontPreload: true,
  imageOptimization: true
});

// Add resource hints for better performance
addResourceHints();

// Preload non-critical CSS
preloadNonCriticalCSS();

// Mark critical resources as loaded for LCP measurement
if ('performance' in window && 'mark' in performance) {
  performance.mark('critical-resources-loaded');
}

// Optimize React rendering for mobile
const container = document.getElementById("root");
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container, {
  identifierPrefix: 'tic-' // Prevent hydration mismatches
});

// Mark React render start for performance tracking
if (performance.mark) {
  performance.mark('react-render-start');
}

root.render(
  <GoogleReCaptchaProvider 
    reCaptchaKey={RECAPTCHA_SITE_KEY}
    scriptProps={{
      async: true, // Non-blocking load
      defer: true,
      appendTo: "body"
    }}
  >
    <App />
  </GoogleReCaptchaProvider>
);

// Mark React render complete
if (performance.mark) {
  performance.mark('react-render-complete');
}

// Log performance metrics with mobile focus
setTimeout(() => {
  const vitals = mobilePerformanceMonitor.getVitals();
  console.log('📱 Mobile Core Web Vitals:', {
    LCP: vitals.lcp ? `${Math.round(vitals.lcp)}ms` : 'pending',
    FID: vitals.fid ? `${Math.round(vitals.fid)}ms` : 'pending', 
    CLS: vitals.cls ? Math.round(vitals.cls * 1000) / 1000 : 'pending',
    FCP: vitals.fcp ? `${Math.round(vitals.fcp)}ms` : 'pending',
    TTFB: vitals.ttfb ? `${Math.round(vitals.ttfb)}ms` : 'pending'
  });

  const assessment = performanceMonitor.assessPerformance();
  console.log('🎯 Performance Score:', assessment.score);
  if (assessment.recommendations.length > 0) {
    console.log('💡 Mobile Optimization Recommendations:', assessment.recommendations);
  }
}, 3000);
