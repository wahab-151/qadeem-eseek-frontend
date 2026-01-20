// Dynamic sitemap for SEO - auto-generates sitemap.xml
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sifrausa.com';
const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:5000';

export default async function sitemap() {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/allProducts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/aboutUs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacyPolicy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/t&c`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/shipping&returns`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  let categoryUrls = [];
  let productUrls = [];

  try {
    // Fetch all categories
    const categoriesRes = await fetch(`${API_BASE_URL}/api/categories`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (categoriesRes.ok) {
      const categoriesData = await categoriesRes.json();
      const categories = categoriesData?.data || categoriesData || [];
      
      categoryUrls = categories.map((category) => ({
        url: `${BASE_URL}/products/search?category=${category._id}`,
        lastModified: category.updatedAt ? new Date(category.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Sitemap: Failed to fetch categories:', error.message);
  }

  try {
    // Fetch all published products (limit to prevent memory issues)
    const productsRes = await fetch(
      `${API_BASE_URL}/api/products?published=true&limit=5000`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    
    if (productsRes.ok) {
      const productsData = await productsRes.json();
      const products = productsData?.data || productsData?.products || [];
      
      productUrls = products.map((product) => ({
        url: `${BASE_URL}/products/${product.slug || product._id}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      }));
    }
  } catch (error) {
    console.error('Sitemap: Failed to fetch products:', error.message);
  }

  return [...staticPages, ...categoryUrls, ...productUrls];
}
