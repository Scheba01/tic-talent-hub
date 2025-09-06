/**
 * Image optimization utilities for better Core Web Vitals
 */

export const preloadCriticalImages = () => {
  if (typeof window === 'undefined') return;

  const criticalImages = [
    '/lovable-uploads/tic-select-logo.webp',
    '/lovable-uploads/tic-talento-hero.webp'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

export const getOptimizedImageSrc = (originalSrc: string): string => {
  // Convert PNG/JPG to WebP equivalents
  const webpMap: Record<string, string> = {
    '/lovable-uploads/d7b9699f-31e6-4a94-a4ae-696ec5740e15.png': '/lovable-uploads/tic-select-logo.webp',
    '/lovable-uploads/aa173f7b-4df3-46c2-a94d-5be3c0deb921.png': '/lovable-uploads/tic-talento-hero.webp',
    '/lovable-uploads/384b0134-c54d-4f2d-9d89-8174e50ed97b.png': '/lovable-uploads/tic-certificate.webp',
    '/lovable-uploads/42d7e844-a2f7-47e6-9cbc-b08fab2c11e2.png': '/lovable-uploads/tic-select-small.webp'
  };

  return webpMap[originalSrc] || originalSrc;
};

export const generateImageSrcSet = (baseSrc: string, sizes: number[]): string => {
  return sizes
    .map(size => `${baseSrc}?w=${size} ${size}w`)
    .join(', ');
};

export const getImageSizes = (breakpoints: string[]): string => {
  return breakpoints.join(', ');
};