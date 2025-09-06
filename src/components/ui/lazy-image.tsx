import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  srcSet?: string;
  sizes?: string;
  aspectRatio?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc,
  width,
  height,
  priority = false,
  srcSet,
  sizes,
  aspectRatio
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Increased for mobile prefetching
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    // Mark LCP candidate if this is above the fold
    if (priority && performance.mark) {
      performance.mark('hero-image-loaded');
    }
  };

  const handleError = () => {
    setError(true);
    if (fallbackSrc) {
      setIsLoaded(true);
    }
  };

  // Calculate intrinsic dimensions to prevent CLS
  const intrinsicStyle: React.CSSProperties = {};
  if (aspectRatio) {
    intrinsicStyle.aspectRatio = aspectRatio;
  } else if (width && height) {
    intrinsicStyle.aspectRatio = `${width} / ${height}`;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        // Prevent layout shift with proper aspect ratio
        !isLoaded && 'bg-muted/10',
        className
      )}
      style={{ 
        ...intrinsicStyle,
        width: width ? `${width}px` : '100%',
        height: height && !aspectRatio ? `${height}px` : 'auto'
      }}
    >
      {/* Optimized loading placeholder */}
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-muted/5 via-muted/10 to-muted/5 animate-pulse"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.04), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
      )}
      
      {isInView && (
        <img
          ref={imgRef}
          src={error && fallbackSrc ? fallbackSrc : src}
          srcSet={srcSet}
          sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          className={cn(
            'transition-opacity duration-300 w-full h-full object-cover',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          width={width}
          height={height}
          style={{
            // Prevent layout shift
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      )}
    </div>
  );
};

// Add shimmer animation to global styles
const shimmerStyle = `
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

// Inject shimmer styles if not already present
if (typeof document !== 'undefined' && !document.getElementById('shimmer-styles')) {
  const style = document.createElement('style');
  style.id = 'shimmer-styles';
  style.textContent = shimmerStyle;
  document.head.appendChild(style);
}

export default LazyImage;