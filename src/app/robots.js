// Dynamic robots.txt for SEO crawl control
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sifrausa.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin-dashboard/',
          '/customer-dashboard/',
          '/checkout/',
          '/api/',
          '/change-password/',
          '/reset-password/',
          '/order-confirmation/',
          '/mini-cart/',
          '/_next/',
          '/store/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin-dashboard/',
          '/customer-dashboard/',
          '/checkout/',
          '/api/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
