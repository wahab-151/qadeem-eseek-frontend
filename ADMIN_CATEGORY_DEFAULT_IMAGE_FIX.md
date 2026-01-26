# Admin Category Default Image Fix

## Issue
Categories without images in the admin panel category list were not showing the default QADEEM logo.

## Fix Applied

**File**: `src/pages-sections/admin-dashboard/categories/category-row.jsx`

### Before:
```jsx
<Image
  fill
  alt={name}
  src={image}
  sizes="(100% 100%)"
  style={{ objectFit: "contain" }}
/>
```

### After:
```jsx
<Image
  fill
  alt={name}
  src={image || "/assets/images/small-screen-logo.png"}
  sizes="(100% 100%)"
  style={{ objectFit: "contain" }}
/>
```

## Result
✅ Categories without images now show the QADEEM logo in the admin panel
✅ Consistent with the customer-facing category display
✅ No broken images in the category list

## Testing
- ✅ Categories without images show default logo
- ✅ Categories with images still display correctly
- ✅ No console errors

## Related
This completes the default image standardization across the entire application (both customer-facing and admin dashboard).
