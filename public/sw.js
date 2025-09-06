// Service Worker for TIC SELECT
// Version 1.0.0

const CACHE_NAME = 'tic-select-v1';
const STATIC_CACHE_NAME = 'tic-select-static-v1';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  '/src/assets/tic-select-logo.png',
  '/lovable-uploads/tic-select-logo.webp',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Routes to cache with network-first strategy
const DYNAMIC_ROUTES = [
  '/programa-talentotic',
  '/servicios-para-empresas',
  '/vacantes-y-perfiles',
  '/quienes-somos',
  '/contacto'
];

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('SW: Install event');
  
  event.waitUntil(
    Promise.all([
      // Cache critical resources
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('SW: Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('SW: Activate event');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName !== CACHE_NAME && 
              cacheName !== STATIC_CACHE_NAME
            )
            .map(cacheName => {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control of all pages
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Handle different types of requests
  if (isCriticalResource(request.url)) {
    // Cache-first strategy for critical resources
    event.respondWith(cacheFirst(request));
  } else if (isDynamicRoute(url.pathname)) {
    // Network-first strategy for pages
    event.respondWith(networkFirst(request));
  } else if (isImage(request.url)) {
    // Cache-first for images with long expiry
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else if (isFont(request.url)) {
    // Cache-first for fonts (they rarely change)
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else {
    // Network-first for everything else
    event.respondWith(networkFirst(request));
  }
});

// Cache-first strategy
async function cacheFirst(request, cacheName = CACHE_NAME) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Update cache in background
      updateCache(request, cache);
      return cachedResponse;
    }
    
    // Not in cache, fetch from network
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('SW: Cache-first failed:', error);
    // Return offline fallback or error response
    return new Response('Offline', { status: 503 });
  }
}

// Network-first strategy
async function networkFirst(request, cacheName = CACHE_NAME) {
  try {
    const cache = await caches.open(cacheName);
    
    try {
      // Try network first
      const networkResponse = await fetch(request);
      
      // Cache successful responses
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      
      return networkResponse;
    } catch (networkError) {
      // Network failed, try cache
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // No cache available, return error
      throw networkError;
    }
  } catch (error) {
    console.log('SW: Network-first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Update cache in background
async function updateCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response);
    }
  } catch (error) {
    // Silent fail for background updates
    console.log('SW: Background cache update failed:', error);
  }
}

// Helper functions
function isCriticalResource(url) {
  return CRITICAL_RESOURCES.some(resource => url.includes(resource));
}

function isDynamicRoute(pathname) {
  return DYNAMIC_ROUTES.some(route => pathname.includes(route)) || pathname === '/';
}

function isImage(url) {
  return /\.(png|jpg|jpeg|gif|webp|svg|ico)(\?.*)?$/i.test(url);
}

function isFont(url) {
  return /\.(woff|woff2|ttf|eot)(\?.*)?$/i.test(url) || url.includes('fonts.googleapis.com');
}

// Handle background sync for analytics
self.addEventListener('sync', event => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  // Placeholder for analytics sync when online
  console.log('SW: Syncing analytics data');
}

// Handle push notifications (placeholder)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Nueva notificación de TIC SELECT',
      icon: '/lovable-uploads/tic-select-logo.webp',
      badge: '/lovable-uploads/tic-select-small.webp',
      data: data.url || '/'
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'TIC SELECT', options)
    );
  }
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});