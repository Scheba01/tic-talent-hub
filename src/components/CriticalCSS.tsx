import { useEffect } from 'react';

interface CriticalCSSProps {
  children: React.ReactNode;
}

const CriticalCSS: React.FC<CriticalCSSProps> = ({ children }) => {
  useEffect(() => {
    // Load non-critical CSS asynchronously after initial render
    const loadNonCriticalCSS = () => {
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

      // Fallback for browsers that don't support onload on link elements
      setTimeout(() => {
        if (link.media !== 'all') {
          link.media = 'all';
        }
      }, 3000);
    };

    // Load non-critical CSS after the page is loaded
    if (document.readyState === 'complete') {
      loadNonCriticalCSS();
    } else {
      window.addEventListener('load', loadNonCriticalCSS);
      return () => window.removeEventListener('load', loadNonCriticalCSS);
    }
  }, []);

  return <>{children}</>;
};

export default CriticalCSS;