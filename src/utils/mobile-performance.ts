// Enhanced performance monitoring for mobile Core Web Vitals
export interface CoreWebVitals {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
}

class MobilePerformanceMonitor {
  private vitals: CoreWebVitals = {
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null
  };

  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.vitals.lcp = lastEntry.startTime;
          this.reportVital('LCP', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.vitals.fid = entry.processingStart - entry.startTime;
            this.reportVital('FID', this.vitals.fid);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.vitals.cls = clsValue;
          this.reportVital('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // First Contentful Paint (FCP)
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.name === 'first-contentful-paint') {
              this.vitals.fcp = entry.startTime;
              this.reportVital('FCP', entry.startTime);
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);
      } catch (e) {
        console.warn('FCP observer not supported');
      }
    }

    // Time to First Byte (TTFB)
    this.measureTTFB();
  }

  private measureTTFB() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const entry = navigationEntries[0];
        this.vitals.ttfb = entry.responseStart - entry.requestStart;
        this.reportVital('TTFB', this.vitals.ttfb);
      }
    }
  }

  private reportVital(name: string, value: number) {
    // Only report in development for debugging
    if (process.env.NODE_ENV === 'development') {
      const status = this.getVitalStatus(name, value);
      console.log(`📊 ${name}: ${Math.round(value)}ms (${status})`);
    }

    // Mark critical performance milestones
    if (performance.mark) {
      performance.mark(`vital-${name}-${Math.round(value)}`);
    }
  }

  private getVitalStatus(name: string, value: number): string {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return '✅ Good';
    if (value <= threshold.poor) return '⚠️ Needs Improvement';
    return '❌ Poor';
  }

  public getVitals(): CoreWebVitals {
    return { ...this.vitals };
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Mobile-specific optimizations
export class MobileOptimizations {
  private static touchStartTime = 0;

  static init() {
    // Optimize touch interactions for better FID
    document.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    document.addEventListener('touchend', this.handleTouchEnd, { passive: true });

    // Preload critical resources on mobile
    this.preloadCriticalResources();

    // Optimize viewport for mobile
    this.optimizeViewport();

    // Reduce main thread blocking
    this.optimizeMainThread();
  }

  private static handleTouchStart(e: TouchEvent) {
    this.touchStartTime = performance.now();
    // Add visual feedback for better perceived performance
    const target = e.target as HTMLElement;
    if (target.classList.contains('critical-button')) {
      target.style.transform = 'scale(0.98)';
    }
  }

  private static handleTouchEnd(e: TouchEvent) {
    const touchDuration = performance.now() - this.touchStartTime;
    
    // Remove visual feedback
    const target = e.target as HTMLElement;
    if (target.classList.contains('critical-button')) {
      target.style.transform = '';
    }

    // Report touch responsiveness
    if (touchDuration > 100) {
      console.warn(`Slow touch response: ${Math.round(touchDuration)}ms`);
    }
  }

  private static preloadCriticalResources() {
    const criticalImages = [
      '/lovable-uploads/tic-select-logo.webp',
      '/lovable-uploads/tic-select-small.webp'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  private static optimizeViewport() {
    // Ensure proper viewport settings for mobile
    let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
  }

  private static optimizeMainThread() {
    // Use scheduler API if available for better task prioritization
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      // Schedule non-critical tasks
      const scheduler = (window as any).scheduler;
      scheduler.postTask(() => {
        // Defer non-critical analytics
        this.deferAnalytics();
      }, { priority: 'background' });
    } else {
      // Fallback for browsers without scheduler API
      setTimeout(() => {
        this.deferAnalytics();
      }, 3000);
    }
  }

  private static deferAnalytics() {
    // Initialize analytics after critical path is complete
    console.log('📈 Deferred analytics initialized');
  }
}

// Export singleton instance
export const mobilePerformanceMonitor = new MobilePerformanceMonitor();

// Critical resource loading utilities
export const markCriticalResourcesLoaded = () => {
  if (performance.mark) {
    performance.mark('critical-resources-loaded');
  }
};

export const getPerformanceMonitor = () => mobilePerformanceMonitor;