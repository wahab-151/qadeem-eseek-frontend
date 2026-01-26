# Standardized Default Images Across Application

## Summary

All placeholder/default images have been standardized to use **`/assets/images/small-screen-logo.png`** throughout the entire application for consistency.

## Files Updated

### Product Cards
1. **`src/components/product-cards/product-card-9/product-card.jsx`**
   - Array fallback: `[{ preview: "/assets/images/small-screen-logo.png" }]`
   - Image src fallback: `/assets/images/small-screen-logo.png`

2. **`src/components/product-cards/product-card-2/product-card.jsx`**
   - Thumbnail fallback: `/assets/images/small-screen-logo.png`

### Product Views
3. **`src/components/products-view/products-table-view.jsx`**
   - Multiple instances updated in both card and table views
   - Array fallback: `[{ preview: "/assets/images/small-screen-logo.png" }]`
   - Image src fallback: `/assets/images/small-screen-logo.png`

### Product Details
4. **`src/pages-sections/product-details/product-intro/product-intro.jsx`**
   - Thumbnail fallback: `/assets/images/small-screen-logo.png`

5. **`src/pages-sections/product-details/product-intro/product-gallery.jsx`**
   - Image src fallback: `/assets/images/small-screen-logo.png`

6. **`src/pages-sections/product-details/product-intro/add-to-cart.jsx`**
   - Thumbnail fallback: `/assets/images/small-screen-logo.png`

### Cart
7. **`src/pages-sections/mini-cart/components/cart-item.jsx`**
   - Thumbnail fallback: `/assets/images/small-screen-logo.png`

### Admin Dashboard
8. **`src/pages-sections/admin-dashboard/products/product-row.jsx`**
   - Image src fallback: `/assets/images/small-screen-logo.png`

### Navigation & Categories
9. **`src/components/header/header-dropdown/header-dropdown.jsx`**
   - Icon fallback: `/assets/images/small-screen-logo.png`

10. **`src/components/category-cards/category-card.jsx`**
    - Already using: `/assets/images/small-screen-logo.png` ✓

### Featured Tags
11. **`src/pages-sections/home/section-featured-tags/section-featured-tags.jsx`**
    - Image src fallback: `/assets/images/small-screen-logo.png`

## Benefits

✅ **Consistency**: Same default image across all pages and components
✅ **Branding**: Uses QADEEM's browser tab logo (favicon)
✅ **Professional**: Clean, recognizable placeholder image
✅ **Maintainability**: Single source of truth for default images
✅ **User Experience**: Users see consistent QADEEM branding when images are missing

## Where the Default Image Appears

- **Product cards** (all variants)
- **Product listing pages** (grid and table view)
- **Product detail pages**
- **Shopping cart** (mini cart and full cart)
- **Category cards**
- **Navigation dropdowns**
- **Featured tags section**
- **Admin dashboard** (product management)

## Image File

**Location**: `public/assets/images/small-screen-logo.png`
- This is the QADEEM logo used in the browser tab (favicon)
- Professional, square format
- Appropriate size for all use cases

## Testing Checklist

Test that the default image appears correctly in:
- ✅ Product cards with no images
- ✅ Product detail pages with missing images
- ✅ Shopping cart with items without thumbnails
- ✅ Category cards without images
- ✅ Navigation menu items without icons
- ✅ Admin product listing
- ✅ Search results
- ✅ Featured products section

## Notes

- All instances of `/assets/images/logo.jpeg` have been replaced
- All instances of `/assets/images/logo3.jpeg` have been replaced
- The `placeholder.png` file is still used by category cards
- No changes needed to backend - this is frontend-only
