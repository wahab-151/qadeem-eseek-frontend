"use client";
import { useGetProductByIdQuery, useGetAllProductsQuery } from "app/store/services";
import { notFound } from "next/navigation";
import { useSnackbar } from "notistack";

// SEO Components
import { ProductJsonLd, BreadcrumbJsonLd } from "components/seo";

// PAGE VIEW COMPONENT
import { useEffect, useState, useMemo } from "react";
import {Container, Box, Typography, Divider} from "@mui/material";
import { useRouter } from "next/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// LOCAL CUSTOM COMPONENTS (lazy-load heavy below-the-fold sections)
import dynamic from "next/dynamic";
import ProductIntro from "../product-intro";
const RelatedProducts = dynamic(() => import("../related-products"), { ssr: false });
const ProductDescriptionSection = dynamic(() => import("../product-description-section"), { ssr: false });
const ProductMaterialSection = dynamic(() => import("../product-material-section"), { ssr: false });
const ProductReviewsSection = dynamic(() => import("../product-reviews-section"), { ssr: false });
const ProductTestimonialsSection = dynamic(() => import("../product-testimonials-section"), { ssr: false });
const ProductReviewFormSection = dynamic(() => import("../product-review-form-section"), { ssr: false });
import { CircularProgress } from "@mui/material";
import useProducts from "hooks/useProducts";
import { useLoading } from "contexts/LoadingContext";
import useUser from "hooks/useUser";

// CUSTOM DATA MODEL

// ==============================================================

// ==============================================================

export default function ProductDetailsPageView(slug) {
  const { enqueueSnackbar } = useSnackbar();
  const { hideProductCardLoader, hideProductDetailLoader } = useLoading();
  const { state: authState } = useUser();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [frequentlyBought, setFrequentlyBought] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedCache, setHasCheckedCache] = useState(false);
  const { state } = useProducts();

  // Check cache synchronously on mount using useMemo
  // This ensures we skip the API call if cache exists
  const cachedProduct = useMemo(() => {
    if (!slug?.slug || typeof window === 'undefined') return null;
    
    // Check for cached product - the key should match what's in the URL: product_${slug.slug}
    const cacheKey = `product_${slug.slug}`;
    const cached = sessionStorage.getItem(cacheKey);
    
    if (cached) {
      try {
        const parsedProduct = JSON.parse(cached);
        // Clean up immediately
        sessionStorage.removeItem(cacheKey);
        return parsedProduct;
      } catch (error) {
        console.error("Error parsing cached product:", error);
        sessionStorage.removeItem(cacheKey);
        return null;
      }
    }
    return null;
  }, [slug?.slug]);

  const [loadedFromCache, setLoadedFromCache] = useState(!!cachedProduct);

  // Step 1: Apply cached product immediately if found
  useEffect(() => {
    if (cachedProduct && !hasCheckedCache) {
      console.log("✓ Product found in sessionStorage, loading instantly");
      
      setProduct(cachedProduct);
      setIsLoading(false);
      setLoadedFromCache(true);
      setHasCheckedCache(true);
      hideProductCardLoader();
      hideProductDetailLoader();
    } else if (!cachedProduct && !hasCheckedCache) {
      console.log("Product not in cache, fetching from API...");
      setHasCheckedCache(true);
    }
  }, [cachedProduct, hasCheckedCache, hideProductCardLoader, hideProductDetailLoader]);

// Skip API query if we loaded from cache - only fetch if cache miss
// We'll still allow refetch after login for role-based pricing
const { data, isLoading: productLoading, error, refetch } = useGetProductByIdQuery(
  slug?.slug,
  {
    skip: !slug?.slug || loadedFromCache, // Skip if we have cache
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  }
);

// Step 2: Fetch from API when cache is checked and no cached data
useEffect(()=>{
  // Only update from API if we didn't load from cache
  if(data?.data && !loadedFromCache){
    console.log("✓ API data received, setting product");
    setProduct(data?.data);
    setIsLoading(false);
    // Hide the loader(s)
    hideProductCardLoader();
    hideProductDetailLoader();
  }
},[data, loadedFromCache, hideProductCardLoader, hideProductDetailLoader])

// Step 2b: After login, refetch product by id to get role-based pricing
// Only refetch if we have a product loaded (from cache or API) and user logs in
useEffect(() => {
  const userId = authState?.user?.id;
  if (!userId || !slug?.slug || !product) return;

  // Refetch to get role-priced product, but don't block UI
  (async () => {
    try {
      const res = await refetch();
      if (res?.data?.data) {
        setProduct(res.data.data);
      }
    } catch (e) {
      // ignore; UI will still show cached product
    }
  })();
}, [authState?.user?.id, slug?.slug, refetch, product]);

// Also refetch whenever the auth token changes (login/logout) to update role-based pricing
// Only if we have a product already loaded
useEffect(() => {
  if (!slug?.slug || !product) return;
  (async () => {
    try {
      const res = await refetch();
      if (res?.data?.data) {
        setProduct(res.data.data);
      }
    } catch (_) {}
  })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [authState?.token, slug?.slug, product]);

// Step 3: Get user role
useEffect(() => {
  const userType = localStorage.getItem("auth-user-role");
  setUserRole(userType);
}, []);

// Step 4: Compute related products when product is available
  useEffect(() => {
    if (state?.products?.length > 0 && slug?.slug && product) {
      const updatedRelevantProducts = state.products.filter((item) => item._id !== slug.slug);
      setRelatedProducts(updatedRelevantProducts);
      setIsLoading(false);
    }
  }, [state?.products, slug?.slug, product]);

  // Handle loading state when API call completes (success or error)
  useEffect(() => {
    if (productLoading === false) {
      // If API call is done but no product found, stop loading
      if (!data?.data && !product) {
        console.log("No product found, stopping loader");
        setIsLoading(false);
      }
    }
  }, [productLoading, data, product]);

  // Fetch related products by category as a fallback when context list is empty
  const relatedCategoryId = product?.category?._id || product?.category; // handles populated or id-only
  const shouldFetchRelatedByCategory = !state?.products?.length && !!relatedCategoryId;
  const {
    data: relatedByCategoryResponse,
    isLoading: relatedByCategoryLoading,
  } = useGetAllProductsQuery(
    { category: relatedCategoryId, page: 1, sort: "createdAt", order: "desc" },
    { skip: !shouldFetchRelatedByCategory, refetchOnMountOrArgChange: false, refetchOnFocus: false, refetchOnReconnect: false }
  );

  // When related-by-category arrives, set relatedProducts excluding current product
  useEffect(() => {
    if (relatedByCategoryResponse?.data?.products?.length) {
      const items = relatedByCategoryResponse.data.products.filter(
        (p) => p?._id !== product?._id
      );
      setRelatedProducts(items);
    } else if (shouldFetchRelatedByCategory && relatedByCategoryLoading === false) {
      // explicit empty result when loaded but none found
      setRelatedProducts([]);
    }
  }, [relatedByCategoryResponse, relatedByCategoryLoading, product, shouldFetchRelatedByCategory]);

  // Prepare breadcrumb items for SEO
  const breadcrumbItems = [
    { name: 'Home', url: '/home' },
    { name: 'Shop', url: '/allProducts' },
    ...(product?.category?.name ? [{ 
      name: product.category.name, 
      url: `/products/search?category=${product.category._id}` 
    }] : []),
    ...(product?.name ? [{ 
      name: product.name, 
      url: `/products/${product.slug || product._id}` 
    }] : []),
  ];

  return (
    <>
      {/* SEO: Structured Data */}
      {product && <ProductJsonLd product={product} />}
      {product && <BreadcrumbJsonLd items={breadcrumbItems} />}

      {/* BREADCRUMB NAVIGATION */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#424242",
            fontSize: "0.875rem",
          }}
        >
          <Typography
            component="span"
            onClick={() => router.push("/home")}
            sx={{
              color: "#424242",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "bold",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Home
          </Typography>
          <ChevronRightIcon sx={{ color: "#424242", fontSize: "1rem" }} />
          <Typography
            component="span"
            onClick={() => router.push("/allProducts")}
            sx={{
              color: "#424242",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "bold",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Shop
          </Typography>
          <ChevronRightIcon sx={{ color: "#424242", fontSize: "1rem" }} />
          <Typography component="span" sx={{ color: "#424242", mx: 1 }}>
            |
          </Typography>
          <Typography
            component="span"
            sx={{
              color: "#424242",
              fontSize: "0.875rem",
            }}
          >
            {product?.name || "Product"}
          </Typography>
        </Box>
      </Container>

      <Container className="mt-2 mb-2">
        {/* While loading, render ProductIntro in skeleton mode instead of a spinner */}
        {isLoading || product === null ? (
          <ProductIntro isLoading={true} product={null} />
        ) : (
          <>
            {/* PRODUCT DETAILS INFO AREA */}
            <ProductIntro
              isLoading={false}
              product={product}
            />
          </>
        )}
      </Container>

      {/* DIVIDER BEFORE DESCRIPTION */}
      {!isLoading && product && (
        <Container maxWidth="lg">
          <Divider sx={{ my: 0, borderColor: 'primary.main' }} />
        </Container>
      )}

      {/* DESCRIPTION SECTION */}
      {!isLoading && product && (
        <ProductDescriptionSection product={product} />
      )}

      {/* DIVIDER BETWEEN DESCRIPTION AND MATERIAL */}
      {!isLoading && product && (
        <Container maxWidth="lg">
          <Divider sx={{ my: 0, borderColor: 'primary.main' }} />
        </Container>
      )}

      {/* MATERIAL SECTION */}
      {!isLoading && product && (
        <ProductMaterialSection product={product} />
      )}

      {/* DIVIDER BEFORE REVIEWS */}
      {!isLoading && product && (
        <Container maxWidth="lg">
          <Divider sx={{ my: 0, borderColor: 'primary.main' }} />
        </Container>
      )}

      {/* CUSTOMER REVIEWS SECTION */}
      {!isLoading && product && (
        <ProductReviewsSection product={product} />
      )}

      {/* TESTIMONIALS SECTION */}
      {!isLoading && product && (
        <ProductTestimonialsSection />
      )}

      {/* REVIEW FORM SECTION */}
      {!isLoading && product && (
        <ProductReviewFormSection productName={product?.name} />
      )}

      {/* RELATED PRODUCTS AREA */}
      {!isLoading && product && (
        <RelatedProducts products={relatedByCategoryLoading ? null : relatedProducts} />
      )}
    </>
  );
}
