'use client';

/**
 * ProductJsonLd - Structured data for product pages
 * Helps search engines understand product information for rich snippets
 */
export default function ProductJsonLd({ product, baseUrl = 'https://www.sifrausa.com' }) {
  if (!product) return null;

  const productUrl = `${baseUrl}/products/${product.slug || product._id}`;
  const imageUrls = product.images?.map(img => img?.preview || img?.url || img) || [];
  
  // Determine availability based on stock
  const availability = product.stock > 0 
    ? 'https://schema.org/InStock' 
    : 'https://schema.org/OutOfStock';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.metaDescription || `${product.name} - Quality product from QADEEM`,
    image: imageUrls.length > 0 ? imageUrls : [`${baseUrl}/assets/images/logo.jpeg`],
    sku: product.sku || product.productId,
    mpn: product.productId,
    brand: product.brand?.name ? {
      '@type': 'Brand',
      name: product.brand.name,
    } : undefined,
    category: product.category?.name || undefined,
    url: productUrl,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'USD',
      price: product.price?.toFixed(2) || '0.00',
      availability: availability,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'QADEEM',
      },
    },
  };

  // Add aggregate rating if reviews exist (placeholder for future)
  // if (product.reviews && product.reviews.length > 0) {
  //   jsonLd.aggregateRating = {
  //     '@type': 'AggregateRating',
  //     ratingValue: product.averageRating,
  //     reviewCount: product.reviews.length,
  //   };
  // }

  // Clean undefined values
  const cleanJsonLd = JSON.parse(JSON.stringify(jsonLd));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanJsonLd) }}
    />
  );
}
