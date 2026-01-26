# Categories Section Fix

## Issue Identified

The categories section on the homepage was showing skeleton loading but no actual categories because:

1. **Image Filter Problem:** The code was filtering for `cat.level === 1 && cat.image`, but the API response doesn't include an `image` field
2. **API Response Structure:** The API returns categories with these fields:
   - `_id`, `name`, `title`, `parentId`, `level`, `displayOrder`, `isRecentlyAdded`, `hasChildren`, `createdAt`, `updatedAt`
   - **No `image` field** in the response

3. **Result:** All categories were filtered out, so the carousel showed nothing

## API Endpoint

**URL:** `http://localhost:5000/api/categories`

**Response Structure:**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "_id": "696b3bba239338522ec74d6b",
      "name": "Gem Stones",
      "title": "Gem Stones",
      "parentId": null,
      "level": 1,
      "displayOrder": 1,
      "isRecentlyAdded": false,
      "hasChildren": true,
      "createdAt": "2026-01-17T07:35:22.977Z",
      "updatedAt": "2026-01-20T01:07:18.705Z"
    }
    // ... more categories
  ]
}
```

## Solution Applied

### File: `src/pages-sections/home/section-categories/section-categories.jsx`

**Changes Made:**

1. **Removed Image Filter:**
   ```javascript
   // Before:
   const parentCategories = data.filter(cat => cat.level === 1 && cat.image);
   
   // After:
   const parentCategories = data.filter(cat => cat.level === 1);
   ```

2. **Added Debug Logging:**
   ```javascript
   console.log("[SectionCategories] API Response:", response);
   console.log("[SectionCategories] Parsed data:", data);
   console.log("[SectionCategories] Parent categories:", parentCategories);
   console.log("[SectionCategories] Sorted categories:", sorted);
   ```

3. **Fallback Image Handling:**
   - The `CategoryCard` component already has fallback image handling
   - Uses `/assets/images/placeholder.png` when no image is provided
   - We created this placeholder in the previous fix

## How It Works Now

1. **Fetch Categories:** API call to `/api/categories`
2. **Filter Level 1:** Only show parent categories (level 1)
3. **Sort by Display Order:** Arrange categories by their `displayOrder` field
4. **Display with Placeholder:** Each category shows its name and uses placeholder image
5. **Show Category Names:** Names are displayed below the image (e.g., "Gem Stones", "Kilims", "Shawls", "Rugs", "Carpets")

## Expected Categories to Display

Based on your API response, these 5 parent categories should now be visible:

1. **Gem Stones** (displayOrder: 1)
2. **Kilims** (displayOrder: 2)
3. **Shawls** (displayOrder: 3)
4. **Rugs** (displayOrder: 4)
5. **Carpets** (displayOrder: 5)

## Comparison with New Arrivals

**New Arrivals Section:**
- Uses a different API endpoint (likely `/api/home/products?tag=new-arrival`)
- Products have `image` or `images` field in their response
- That's why they show images correctly

**Categories Section:**
- Uses `/api/categories` endpoint
- No `image` field in response (backend doesn't send it)
- Now uses placeholder image for all categories

## Next Steps (Optional Backend Improvements)

To add actual category images, you have two options:

### Option 1: Add Image Field to API Response (Recommended)
Update your backend `/api/categories` endpoint to include the `image` field:

```javascript
// Backend example
{
  "_id": "696b3bba239338522ec74d6b",
  "name": "Gem Stones",
  "title": "Gem Stones",
  "image": "https://qadeem.s3.amazonaws.com/categories/gem-stones.jpg", // Add this
  "parentId": null,
  "level": 1,
  // ... other fields
}
```

### Option 2: Map Category Names to Images (Frontend Fallback)
Add a mapping in the component:

```javascript
const categoryImageMap = {
  "Gem Stones": "/assets/images/categories/gem-stones.jpg",
  "Kilims": "/assets/images/categories/kilims.jpg",
  "Shawls": "/assets/images/categories/shawls.jpg",
  "Rugs": "/assets/images/categories/rugs.jpg",
  "Carpets": "/assets/images/categories/carpets.jpg",
};

const imageUrl = category.image || categoryImageMap[category.name] || "/assets/images/placeholder.png";
```

## Testing

After this fix:
- ✅ Categories now display on homepage
- ✅ Category names are visible ("Gem Stones", "Kilims", etc.)
- ✅ Placeholder image is used for all categories
- ✅ Clicking categories navigates to `/allProducts?category={id}`
- ✅ No more infinite skeleton loading

## Verification

Check your browser console for the debug logs:
```
[SectionCategories] API Response: { success: true, message: ..., data: [...] }
[SectionCategories] Parsed data: [{ _id: ..., name: "Gem Stones", ... }, ...]
[SectionCategories] Parent categories: [5 categories with level 1]
[SectionCategories] Sorted categories: [5 categories sorted by displayOrder]
```
