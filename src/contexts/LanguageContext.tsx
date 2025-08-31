diff --git a/src/context/LanguageContext.tsx b/src/context/LanguageContext.tsx
--- a/src/context/LanguageContext.tsx
+++ b/src/context/LanguageContext.tsx
@@
-// Helper function to detect language from URL
-const getLanguageFromPath = (pathname: string): Language | null => {
-  // Spanish paths
-  if (pathname.includes('quienes-somos') || 
-      pathname.includes('servicios-para-empresas') || 
-      pathname.includes('vacantes-y-perfiles') || 
-      pathname.includes('programa-talentotic') || 
-      pathname.includes('programa-afiliados')) {
-    return 'es';
-  }
-  
-  // English paths (you can add these as needed)
-  if (pathname.includes('/en/') || 
-      pathname.includes('about-us') || 
-      pathname.includes('enterprise-services')) {
-    return 'en';
-  }
-  
-  // Portuguese paths (you can add these as needed)  
-  if (pathname.includes('/pt/') || 
-      pathname.includes('sobre-nos') || 
-      pathname.includes('servicos-empresas')) {
-    return 'pt';
-  }
-  
-  return null;
-};
+// Normalize current route for both HashRouter (#/...) and BrowserRouter (/...)
+const getCurrentRoute = (): string => {
+  if (typeof window === 'undefined') return '';
+  const hash = window.location.hash || '';
+  if (hash.startsWith('#/')) return hash.slice(1).toLowerCase(); // remove "#"
+  return window.location.pathname.toLowerCase();
+};
+
+// Detect language from route
+const getLanguageFromPath = (route?: string): Language | null => {
+  const path = (route ?? getCurrentRoute());
+  // Prefer explicit prefixes
+  if (path.startsWith('/en/')) return 'en';
+  if (path.startsWith('/pt/')) return 'pt';
+  if (path.startsWith('/es/')) return 'es';
+  // Fallback: slug heuristics
+  if (
+    path.includes('quienes-somos') ||
+    path.includes('servicios-para-empresas') ||
+    path.includes('vacantes-y-perfiles') ||
+    path.includes('programa-talentotic') ||
+    path.includes('programa-afiliados')
+  ) return 'es';
+  if (path.includes('about-us') || path.includes('enterprise-services')) return 'en';
+  if (path.includes('sobre-nos') || path.includes('servicos-empresas')) return 'pt';
+  return null;
+};
@@
 export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
-  const [language, setLanguage] = useState<Language>(() => {
-    // Check if we're in browser environment
-    if (typeof window === 'undefined') return 'es';
-    
-    // First priority: URL-based language detection
-    const urlLanguage = getLanguageFromPath(window.location.pathname);
-    if (urlLanguage) return urlLanguage;
-    
-    // Second priority: localStorage
-    const savedLanguage = localStorage.getItem('language') as Language;
-    if (savedLanguage && ['es', 'en', 'pt'].includes(savedLanguage)) {
-      return savedLanguage;
-    }
-    
-    // Third priority: browser language
-    return getBrowserLanguage();
-  });
+  const [language, setLanguage] = useState<Language>(() => {
+    if (typeof window === 'undefined') return 'es';
+    const fromUrl = getLanguageFromPath(getCurrentRoute());
+    if (fromUrl) return fromUrl;
+    const saved = localStorage.getItem('language') as Language | null;
+    if (saved && ['es','en','pt'].includes(saved)) return saved;
+    return getBrowserLanguage();
+  });
 
-  // Listen for URL changes
+  // Listen for SPA navigation events (back/forward, hash changes, push/replaceState)
   useEffect(() => {
     if (typeof window === 'undefined') return;
-    
-    const handleLocationChange = () => {
-      const urlLanguage = getLanguageFromPath(window.location.pathname);
-      if (urlLanguage && urlLanguage !== language) {
-        setLanguage(urlLanguage);
-      }
-    };
-
-    // Listen for popstate events (back/forward buttons)
-    window.addEventListener('popstate', handleLocationChange);
-    
-    // Check on mount
-    handleLocationChange();
-
-    return () => {
-      window.removeEventListener('popstate', handleLocationChange);
-    };
+
+    const notify = () => {
+      const urlLanguage = getLanguageFromPath(getCurrentRoute());
+      if (urlLanguage && urlLanguage !== language) setLanguage(urlLanguage);
+    };
+
+    window.addEventListener('popstate', notify);
+    window.addEventListener('hashchange', notify);
+    const wrap = (method: 'pushState' | 'replaceState') => {
+      const orig = history[method];
+      return function(this: History, ...args: any[]) {
+        const ret = orig.apply(this, args as any);
+        window.dispatchEvent(new Event('locationchange'));
+        return ret;
+      };
+    };
+    history.pushState = wrap('pushState');
+    history.replaceState = wrap('replaceState');
+    window.addEventListener('locationchange', notify);
+    notify(); // initial check
+
+    return () => {
+      window.removeEventListener('popstate', notify);
+      window.removeEventListener('hashchange', notify);
+      window.removeEventListener('locationchange', notify);
+    };
   }, [language]);
 
-  const handleSetLanguage = (lang: Language) => {
-    setLanguage(lang);
-    
-    // Save to localStorage
-    if (typeof localStorage !== 'undefined') {
-      localStorage.setItem('language', lang);
-    }
-    
-    // Update HTML lang attribute
-    if (typeof document !== 'undefined') {
-      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
-      
-      // Update SEO metadata
-      const seo = seoTranslations[lang];
-      document.title = seo.title;
-      
-      // Update meta tags safely
-      const metaDescription = document.querySelector('meta[name="description"]');
-      if (metaDescription) metaDescription.setAttribute('content', seo.description);
-      
-      const metaKeywords = document.querySelector('meta[name="keywords"]');
-      if (metaKeywords) metaKeywords.setAttribute('content', seo.keywords);
-      
-      const ogTitle = document.querySelector('meta[property="og:title"]');
-      if (ogTitle) ogTitle.setAttribute('content', seo.ogTitle);
-      
-      const ogDescription = document.querySelector('meta[property="og:description"]');
-      if (ogDescription) ogDescription.setAttribute('content', seo.ogDescription);
-    }
-  };
+  const handleSetLanguage = (lang: Language) => {
+    setLanguage(lang);
+    if (typeof localStorage !== 'undefined') {
+      localStorage.setItem('language', lang);
+    }
+  };
+
+  // Apply <html lang> and SEO/meta whenever language changes (incl. first render)
+  useEffect(() => {
+    if (typeof document === 'undefined') return;
+    const seo = seoTranslations[language];
+    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
+    document.title = seo.title;
+
+    const ensure = (query: string, attrKey: 'name' | 'property', attrVal: string, content: string) => {
+      let el = document.querySelector(`meta[${attrKey}="${attrVal}"]`) as HTMLMetaElement | null;
+      if (!el) {
+        el = document.createElement('meta');
+        el.setAttribute(attrKey, attrVal);
+        document.head.appendChild(el);
+      }
+      el.setAttribute('content', content);
+    };
+    ensure('', 'name', 'description', seo.description);
+    ensure('', 'name', 'keywords', seo.keywords);
+    ensure('', 'name', 'author', seo.author);
+    ensure('', 'property', 'og:title', seo.ogTitle);
+    ensure('', 'property', 'og:description', seo.ogDescription);
+  }, [language]);
