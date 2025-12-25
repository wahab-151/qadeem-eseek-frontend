/**
 * Route Prefetching Utilities
 * 
 * Provides utilities for prefetching routes to improve navigation performance
 */

/**
 * Prefetch a route on hover or when it becomes visible
 * @param {string} href - The route to prefetch
 */
export function prefetchRoute(href) {
  if (typeof window === 'undefined' || !href) return;
  
  try {
    // Use Next.js router prefetch if available
    if (window.next?.router?.prefetch) {
      window.next.router.prefetch(href);
      return;
    }
    
    // Fallback: Prefetch the route data manually
    const url = new URL(href, window.location.origin);
    const prefetchUrl = `${url.pathname}${url.search}`;
    
    // Prefetch the RSC payload
    fetch(prefetchUrl, {
      method: 'HEAD',
      headers: {
        'RSC': '1',
      },
    }).catch(() => {
      // Silently fail - prefetching is optional
    });
  } catch (error) {
    // Silently fail - prefetching is optional
  }
}

/**
 * Prefetch routes for common navigation paths
 */
export function prefetchCommonRoutes() {
  if (typeof window === 'undefined') return;
  
  const commonRoutes = [
    '/home',
    '/allProducts',
    '/cart',
    '/blog',
  ];
  
  // Prefetch common routes after a delay to not block initial load
  setTimeout(() => {
    commonRoutes.forEach(route => {
      prefetchRoute(route);
    });
  }, 2000); // Wait 2 seconds after page load
}

/**
 * Setup prefetching for links in viewport
 * @param {HTMLElement} container - Container element to watch
 */
export function setupViewportPrefetching(container) {
  if (typeof window === 'undefined' || !container) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = entry.target.closest('a[href]');
          if (link && link.href) {
            const url = new URL(link.href);
            if (url.origin === window.location.origin) {
              prefetchRoute(url.pathname + url.search);
            }
          }
        }
      });
    },
    {
      rootMargin: '50px', // Start prefetching 50px before link enters viewport
    }
  );
  
  // Observe all links in container
  const links = container.querySelectorAll('a[href]');
  links.forEach(link => {
    observer.observe(link);
  });
  
  return () => observer.disconnect();
}

/**
 * Setup hover prefetching for navigation links
 * @param {HTMLElement} container - Container element
 */
export function setupHoverPrefetching(container) {
  if (typeof window === 'undefined' || !container) return;
  
  const handleMouseEnter = (e) => {
    const link = e.target.closest('a[href]');
    if (link && link.href) {
      const url = new URL(link.href);
      if (url.origin === window.location.origin) {
        prefetchRoute(url.pathname + url.search);
      }
    }
  };
  
  container.addEventListener('mouseenter', handleMouseEnter, true);
  
  return () => {
    container.removeEventListener('mouseenter', handleMouseEnter, true);
  };
}

