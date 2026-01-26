'use client';

/**
 * OrganizationJsonLd - Structured data for organization/business info
 * Add this to your homepage for business identity in search results
 */
export default function OrganizationJsonLd({ baseUrl = 'https://www.sifrausa.com' }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'QADEEM',
    url: baseUrl,
    logo: `${baseUrl}/assets/images/logo.jpeg`,
    description: 'QADEEM - Wholesale & Retail Store with Personalized Pricing. Tools, parts and supplies with fast delivery.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    sameAs: [
      // Add your social media URLs here
      // 'https://www.facebook.com/sifrausa',
      // 'https://www.instagram.com/sifrausa',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
