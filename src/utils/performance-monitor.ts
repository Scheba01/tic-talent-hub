/**
 * Performance monitoring utilities for Core Web Vitals
 */

export interface WebVitalsMetrics {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: WebVitalsMetrics = {};
  private observer?: PerformanceObserver;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
      this.measureNavigationTiming();
    }
  }

  private initializeObservers() {
    // Observe paint metrics
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.FCP = entry.startTime;
            }
          } else if (entry.entryType === 'largest-contentful-paint') {
            this.metrics.LCP = entry.startTime;
          } else if (entry.entryType === 'first-input') {
            this.metrics.FID = (entry as any).processingStart - entry.startTime;
          } else if (entry.entryType === 'layout-shift') {
            if (!(entry as any).hadRecentInput) {
              this.metrics.CLS = (this.metrics.CLS || 0) + (entry as any).value;
            }
          }
        }
      });

      try {
        this.observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (e) {
        console.warn('Performance observer not supported:', e);
      }
    }
  }

  private measureNavigationTiming() {
    if ('performance' in window && 'timing' in performance) {
      window.addEventListener('load', () => {
        const timing = performance.timing;
        this.metrics.TTFB = timing.responseStart - timing.navigationStart;
      });
    }
  }

  public getMetrics(): WebVitalsMetrics {
    return { ...this.metrics };
  }

  public logMetrics() {
    console.group('🚀 Performance Metrics');
    console.log('FCP (First Contentful Paint):', this.metrics.FCP ? `${this.metrics.FCP.toFixed(2)}ms` : 'Not measured');
    console.log('LCP (Largest Contentful Paint):', this.metrics.LCP ? `${this.metrics.LCP.toFixed(2)}ms` : 'Not measured');
    console.log('FID (First Input Delay):', this.metrics.FID ? `${this.metrics.FID.toFixed(2)}ms` : 'Not measured');
    console.log('CLS (Cumulative Layout Shift):', this.metrics.CLS ? this.metrics.CLS.toFixed(4) : 'Not measured');
    console.log('TTFB (Time to First Byte):', this.metrics.TTFB ? `${this.metrics.TTFB.toFixed(2)}ms` : 'Not measured');
    console.groupEnd();
  }

  public assessPerformance(): { score: number; recommendations: string[] } {
    const recommendations: string[] = [];
    let score = 100;

    // Assess LCP (Good: <2.5s, Needs Improvement: 2.5-4s, Poor: >4s)
    if (this.metrics.LCP) {
      if (this.metrics.LCP > 4000) {
        score -= 30;
        recommendations.push('LCP is poor (>4s). Consider optimizing images and reducing server response time.');
      } else if (this.metrics.LCP > 2500) {
        score -= 15;
        recommendations.push('LCP needs improvement (>2.5s). Consider preloading critical resources.');
      }
    }

    // Assess FID (Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms)
    if (this.metrics.FID) {
      if (this.metrics.FID > 300) {
        score -= 25;
        recommendations.push('FID is poor (>300ms). Consider reducing JavaScript execution time.');
      } else if (this.metrics.FID > 100) {
        score -= 10;
        recommendations.push('FID needs improvement (>100ms). Consider code splitting and deferring non-critical JS.');
      }
    }

    // Assess CLS (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
    if (this.metrics.CLS) {
      if (this.metrics.CLS > 0.25) {
        score -= 20;
        recommendations.push('CLS is poor (>0.25). Add size attributes to images and avoid inserting content above existing content.');
      } else if (this.metrics.CLS > 0.1) {
        score -= 10;
        recommendations.push('CLS needs improvement (>0.1). Ensure images have explicit dimensions.');
      }
    }

    return { score: Math.max(0, score), recommendations };
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export const getPerformanceMonitor = (): PerformanceMonitor => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
};

export const measureResourceLoadTime = (name: string, startTime: number): void => {
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`⚡ ${name} loaded in ${duration.toFixed(2)}ms`);
};

export const markCriticalResourcesLoaded = (): void => {
  if ('performance' in window && 'mark' in performance) {
    performance.mark('critical-resources-loaded');
  }
};