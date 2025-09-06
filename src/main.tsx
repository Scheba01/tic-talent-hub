import { createRoot } from 'react-dom/client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './App.tsx';
import './index.css';
import { injectCriticalCSS, preloadNonCriticalCSS, addResourceHints } from './utils/critical-css';
import { getPerformanceMonitor } from './utils/performance-monitor';

const RECAPTCHA_SITE_KEY = "6LfMsbgrAAAAAJubJ3wE6z3AF5FwkxC3r0lTeQqm";

// Initialize performance monitoring
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

// Mark critical resources as loaded
if ('performance' in window && 'mark' in performance) {
  performance.mark('critical-resources-loaded');
}

createRoot(document.getElementById("root")!).render(
  <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
    <App />
  </GoogleReCaptchaProvider>
);

// Log performance metrics after initial render
setTimeout(() => {
  performanceMonitor.logMetrics();
  const assessment = performanceMonitor.assessPerformance();
  console.log('🎯 Performance Score:', assessment.score);
  if (assessment.recommendations.length > 0) {
    console.log('💡 Recommendations:', assessment.recommendations);
  }
}, 3000);
