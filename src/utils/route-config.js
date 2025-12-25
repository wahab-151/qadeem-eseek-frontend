/**
 * Route Segment Configuration Utilities
 * 
 * Provides reusable route segment configs for Next.js pages
 * to optimize rendering and navigation performance
 */

/**
 * Configuration for fully dynamic pages (user-specific, search, etc.)
 * Use for: search pages, user dashboards, cart, checkout
 */
export const dynamicPageConfig = {
  dynamic: 'force-dynamic',
  dynamicParams: true,
  revalidate: 0,
  fetchCache: 'force-no-store',
};

/**
 * Configuration for semi-static pages (can be cached, but update periodically)
 * Use for: home page, category pages, blog listings
 */
export const cachedPageConfig = {
  dynamic: 'auto',
  revalidate: 3600, // 1 hour
};

/**
 * Configuration for product pages (dynamic but can use static params)
 * Use for: product detail pages
 */
export const productPageConfig = {
  dynamic: 'force-dynamic',
  dynamicParams: true,
  revalidate: 0,
};

/**
 * Configuration for static pages (rarely change)
 * Use for: about, terms, privacy policy
 */
export const staticPageConfig = {
  dynamic: 'auto',
  revalidate: 86400, // 24 hours
};

/**
 * Helper to apply config to a page component
 * Usage: export const { dynamic, revalidate } = getRouteConfig('dynamic');
 */
export function getRouteConfig(type = 'dynamic') {
  const configs = {
    dynamic: dynamicPageConfig,
    cached: cachedPageConfig,
    product: productPageConfig,
    static: staticPageConfig,
  };
  
  return configs[type] || dynamicPageConfig;
}

