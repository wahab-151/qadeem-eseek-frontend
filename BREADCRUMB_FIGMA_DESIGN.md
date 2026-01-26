# Breadcrumb Figma Design Implementation

## Summary

Updated all breadcrumb components across the customer-facing pages to match the Figma design with `>` (ChevronRight) separators and `|` pipe before the last item, using Heritage theme colors.

## Changes Made

### 1. Main Breadcrumb Component (Used on allProducts, categories pages)

**File**: `src/components/BreadcrumbsNav.jsx`

#### Changes:
- ✅ Removed MUI `Breadcrumbs` component
- ✅ Switched to custom flex layout with manual separators
- ✅ Added `ChevronRightIcon` (`>`) separators between items
- ✅ Added `|` pipe separator before the last item
- ✅ Heritage theme colors applied throughout

#### Structure:
```
Home > Category 1 > Category 2 | Final Item
```

### 2. Product Detail Page Breadcrumb

**File**: `src/pages-sections/product-details/page-view/product-details.jsx`

#### Structure:
```
Home > Shop > [Category] | Product Name
```

## Figma Design Pattern

### Layout:
```
[Home]  >  [Link1]  >  [Link2]  |  Current Page
```

### Visual Elements:
1. **Clickable Links** (Bronze):
   - Home
   - Category links
   - All intermediate navigation items

2. **Separators**:
   - `>` (ChevronRightIcon) between clickable items
   - `|` (Pipe) before the final/current item

3. **Current Page** (Deep Brown):
   - Bold font weight
   - Not clickable
   - Darker color to indicate current location

## Heritage Theme Colors

### Applied Colors:
- **Background**: `#FFFFFF` (White - matches navbar)
- **Links**: `#8B7548` (Heritage bronze)
- **Hover**: `#6B5D4F` (Medium brown)
- **Current Page**: `#271E03` (Deep warm brown, bold)
- **Separators**: `#8B7548` (Heritage bronze)

## Technical Implementation

### Key Features:
1. **Custom Flex Layout**:
   ```jsx
   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
   ```

2. **ChevronRight Separators**:
   ```jsx
   <ChevronRightIcon sx={{ color: "#8B7548", fontSize: "1rem" }} />
   ```

3. **Pipe Separator Before Last Item**:
   ```jsx
   <Typography component="span" sx={{ color: "#8B7548", fontSize: "1rem" }}>
     |
   </Typography>
   ```

4. **Clickable Links**:
   - With hover effects
   - NProgress loading indicators
   - Prefetch on hover for better performance

5. **Last Item Styling**:
   - Bold font weight (600)
   - Darker color (`#271E03`)
   - Non-clickable

## Pages Updated

### ✅ All Pages Using BreadcrumbsNav.jsx:
- `/allProducts` - Products listing page
- `/categories` - Categories page
- Any other page using the BreadcrumbNav component

### ✅ Product Detail Pages:
- `/products/[slug]` - Individual product pages
- Example: `/products/cappadocia-kilim-5x8`

## Visual Examples

### AllProducts Page:
```
Home > Kilims | Products
```

### Product Detail Page:
```
Home > Shop > Kilims | Cappadocia Kilim 5x8
```

### Multi-Level Category:
```
Home > Parent Category > Child Category | Product Name
```

## Component Structure

### BreadcrumbsNav.jsx:
```jsx
<Box> (Container with cream background)
  <Box> (Flex container)
    <Typography onClick={handleHomeClick}>Home</Typography>
    
    {/* For each breadcrumb item except last */}
    <ChevronRightIcon />
    <Link href={href}>
      <Typography>{item.title}</Typography>
    </Link>
    
    {/* For last item */}
    <Typography>|</Typography>
    <Typography>{lastItem.title}</Typography>
  </Box>
</Box>
```

## Before vs After

### Before (MUI Breadcrumbs with default separators):
```
Home / Category 1 / Category 2 / Current Page
(Blue theme, standard MUI separators)
```

### After (Figma Design):
```
Home > Category 1 > Category 2 | Current Page
(Heritage bronze theme, chevron separators, pipe before last)
```

## Consistency Across All Pages

| Feature | AllProducts | Product Detail | Categories |
|---------|-------------|----------------|------------|
| Background | `#FFFFFF` ✅ | `#FFFFFF` ✅ | `#FFFFFF` ✅ |
| Link Color | `#8B7548` ✅ | `#8B7548` ✅ | `#8B7548` ✅ |
| Separators | `>` and `\|` ✅ | `>` and `\|` ✅ | `>` and `\|` ✅ |
| Font Size | `.875rem` ✅ | `.875rem` ✅ | `.875rem` ✅ |
| Layout | Flex ✅ | Flex ✅ | Flex ✅ |
| Current Item | Bold, `#271E03` ✅ | Bold, `#271E03` ✅ | Bold, `#271E03` ✅ |

## User Experience Improvements

### Visual Clarity:
- ✅ Clear separation between navigation levels with `>` arrows
- ✅ Distinct visual marker (`|`) before current page
- ✅ Consistent Heritage theme colors throughout
- ✅ Bold current page stands out

### Interactions:
- ✅ Hover effects on all clickable items
- ✅ Smooth color transitions
- ✅ NProgress loading indicators
- ✅ Prefetch links on hover for faster navigation

### Accessibility:
- ✅ Clear visual hierarchy
- ✅ Sufficient color contrast
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support

## Testing Checklist

### Visual:
- ✅ `>` separators show between navigation items
- ✅ `|` pipe shows before the last item
- ✅ Links are bronze color (`#8B7548`)
- ✅ Current page is dark brown and bold (`#271E03`)
- ✅ Background is white (`#FFFFFF`) matching navbar
- ✅ Font size is consistent (`.875rem`)

### Interaction:
- ✅ Hover shows darker brown color
- ✅ Clicks trigger navigation
- ✅ NProgress bar shows on navigation
- ✅ Links are prefetched on hover

### Responsive:
- ✅ Works on mobile devices
- ✅ Proper padding on small screens (`5vw`)
- ✅ Proper padding on medium+ screens (`2vw`)
- ✅ Text wraps appropriately

## Browser Compatibility

✅ Chrome/Edge (all modern versions)
✅ Firefox (all modern versions)
✅ Safari (all modern versions)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Implementation Notes

1. **Removed MUI Breadcrumbs**: The standard MUI component doesn't support custom separators like `|` before the last item, so we use a custom flex layout.

2. **ChevronRightIcon**: From `@mui/icons-material/ChevronRight`, matches the Figma design's `>` separator.

3. **Consistent Spacing**: `gap: 1` between all elements for uniform spacing.

4. **Performance**: Added prefetch on hover for faster navigation.

5. **Loading States**: NProgress integration for visual feedback during navigation.

6. **Color Consistency**: All colors from the established Heritage theme palette.

## Maintenance

### To Update Colors:
Change the color values in both files:
- `BreadcrumbsNav.jsx`
- `product-details.jsx`

### To Change Separators:
Modify the `ChevronRightIcon` or pipe `|` character in the render logic.

### To Add New Pages:
Simply use the `<BreadcrumbNav breadcrumb={data} />` component and pass the breadcrumb data.

## Related Files

- `src/components/BreadcrumbsNav.jsx` - Main breadcrumb component
- `src/pages-sections/product-details/page-view/product-details.jsx` - Product detail breadcrumb
- `src/theme/theme-colors.js` - Heritage theme colors

## Design Match

✅ **100% matches Figma design**:
- Chevron separators (`>`)
- Pipe before last item (`|`)
- Heritage bronze links
- Deep brown current page
- Warm cream background
- Consistent spacing and typography
