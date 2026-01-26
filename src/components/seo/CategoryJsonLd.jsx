'use client';

/**
 * CategoryJsonLd - Structured data for category/collection pages
 * Helps search engines understand product listings
 */
export default function CategoryJsonLd({ 
  category, 
  products = [], 
  baseUrl = 'https://www.sifrausa.com' 
}) {
  if (!category) return null;

  const categoryUrl = `${baseUrl}/products/search?category=${category._id}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name || category.title,
    description: category.description || `Browse ${category.name} products at QADEEM`,
    url: categoryUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.slice(0, 20).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          url: `${baseUrl}/products/${product.slug || product._id}`,
          image: product.images?.[0]?.preview || product.images?.[0]?.url,
          offers: {
            '@type': 'Offer',
            price: product.price?.toFixed(2) || '0.00',
            priceCurrency: 'USD',
            availability: product.stock > 0 
              ? 'https://schema.org/InStock' 
              : 'https://schema.org/OutOfStock',
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
