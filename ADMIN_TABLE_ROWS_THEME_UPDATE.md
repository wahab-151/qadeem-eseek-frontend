# Admin Dashboard Table Rows Theme Update

## Overview
Updated table rows and related elements in the admin dashboard to follow the Qadeem Heritage theme with proper hover states, alternating row colors, and heritage-themed switches.

## Changes Made

### 1. **Table Rows** (`styles.js`)

#### Row Styling
- **Hover state**: Light bronze tint (`rgba(139, 117, 72, 0.04)`)
- **Alternating rows**: Very light beige for even rows (`rgba(239, 230, 213, 0.3)`)
- **Even row hover**: Slightly darker bronze (`rgba(139, 117, 72, 0.06)`)
- **Selected rows**: Bronze background (`rgba(139, 117, 72, 0.1)`)
- **Selected hover**: Darker bronze (`rgba(139, 117, 72, 0.15)`)
- **Smooth transitions**: 0.2s ease for all background changes

```css
/* Normal row */
background: transparent
hover: rgba(139, 117, 72, 0.04)

/* Even row (alternating) */
background: rgba(239, 230, 213, 0.3)
hover: rgba(139, 117, 72, 0.06)

/* Selected row */
background: rgba(139, 117, 72, 0.1)
hover: rgba(139, 117, 72, 0.15)
```

### 2. **Product Row Avatar** (`product-row.jsx`)
- Background color: `#EFE6D5` (light heritage beige)
- Changed from generic `grey.100` to themed color

### 3. **Category Row Borders** (`category-row.jsx`)
- Level borders: Heritage bronze (`#8B7548`)
- Level 4 borders: Warm orange (`#D97706`)
- Changed from theme palette references to specific heritage colors

### 4. **Toggle Switches** (`BazaarSwitch.jsx`)

#### Switch Styling
- **Track (unchecked)**: Light heritage gold (`#D4C4A0`)
- **Track (checked)**: Light bronze (`rgba(139, 117, 72, 0.3)`)
- **Thumb (unchecked)**: Medium brown (`#6B5D4F`)
- **Thumb (checked)**: Heritage bronze (`#8B7548`)

```css
/* Unchecked state */
track: #D4C4A0 (light gold)
thumb: #6B5D4F (medium brown)

/* Checked state */
track: rgba(139, 117, 72, 0.3) (light bronze)
thumb: #8B7548 (heritage bronze)
```

## Visual Improvements

### Before:
- White rows with no hover effects
- Grey switches (generic blue when checked)
- Blue category level borders
- Grey avatar backgrounds

### After:
- Alternating beige rows for better readability
- Subtle bronze hover effects throughout
- Heritage bronze/gold switches
- Heritage bronze category level borders
- Beige avatar backgrounds matching theme

## Color Palette

```css
/* Row Colors */
--row-hover: rgba(139, 117, 72, 0.04);           /* Subtle hover */
--row-even-bg: rgba(239, 230, 213, 0.3);         /* Alternating row */
--row-even-hover: rgba(139, 117, 72, 0.06);      /* Even row hover */
--row-selected: rgba(139, 117, 72, 0.1);         /* Selected row */
--row-selected-hover: rgba(139, 117, 72, 0.15);  /* Selected hover */

/* Switch Colors */
--switch-track-off: #D4C4A0;                      /* Light heritage gold */
--switch-track-on: rgba(139, 117, 72, 0.3);      /* Light bronze */
--switch-thumb-off: #6B5D4F;                      /* Medium brown */
--switch-thumb-on: #8B7548;                       /* Heritage bronze */

/* Other Elements */
--avatar-bg: #EFE6D5;                            /* Light beige */
--border-bronze: #8B7548;                        /* Heritage bronze */
--border-orange: #D97706;                        /* Warm orange */
```

## Benefits

1. **Better Visual Hierarchy**: Alternating rows make tables easier to read
2. **Consistent Interactions**: Hover states provide clear feedback
3. **Brand Alignment**: All elements use heritage color palette
4. **Improved UX**: Smooth transitions enhance user experience
5. **Professional Look**: Subtle colors maintain elegance

## Files Modified

1. `src/pages-sections/admin-dashboard/styles.js` - Table row styling
2. `src/pages-sections/admin-dashboard/products/product-row.jsx` - Avatar background
3. `src/pages-sections/admin-dashboard/categories/category-row.jsx` - Border colors
4. `src/components/BazaarSwitch.jsx` - Switch colors

## Testing Checklist

- [x] Table rows have alternating colors
- [x] Hover states show subtle bronze tint
- [x] Selected rows have darker bronze background
- [x] Switches use heritage bronze/gold colors
- [x] Avatar backgrounds match theme
- [x] Category level borders use heritage colors
- [x] Smooth transitions on all interactions
- [x] No linter errors introduced

## Notes

- Alternating row colors improve readability for large tables
- Hover effects are subtle to maintain elegance
- All changes maintain accessibility with proper contrast ratios
- Transitions are smooth (0.2s) for a polished feel
