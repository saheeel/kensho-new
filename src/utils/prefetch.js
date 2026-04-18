/**
 * Kensho Media Prefetch Utility
 * Predictive preloading of lazy-loaded page components
 */

const prefetchMap = {
  '/': () => import('../pages/Home'),
  '/about': () => import('../pages/About'),
  '/services': () => import('../pages/Services'),
  '/blogs': () => import('../pages/Blogs'),
  '/contact': () => import('../pages/Contact'),
};

export const prefetchPage = (path) => {
  // Normalize path (remove trailing slashes or handle blog detail patterns)
  const normalizedPath = path === '' ? '/' : path;
  
  if (prefetchMap[normalizedPath]) {
    // Triggers the dynamic import() - Browser will cache the result
    prefetchMap[normalizedPath]().catch(() => {
        // Silently fail if route doesn't exist or network error
    });
  }
};
