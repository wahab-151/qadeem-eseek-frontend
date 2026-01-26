# Admin Dashboard Heritage Theme Update

## Overview
Updated the entire admin dashboard to follow the Qadeem Heritage theme with consistent colors, typography, and styling across all components.

## Changes Made

### 1. **Main Layout Background** (`dashboard-body-wrapper.jsx`)
- Background color: `#FEFAF0` (warm cream)
- Applied to entire admin content area
- Minimum height: `100vh` for full coverage

### 2. **Table Styling** (`styles.js`)

#### Table Rows
- **Hover state**: Light bronze tint (`rgba(139, 117, 72, 0.04)`)
- **Alternating rows**: Very light beige background (`rgba(239, 230, 213, 0.3)`)
- **Selected state**: Bronze background (`rgba(139, 117, 72, 0.1)`)
- **Smooth transitions**: 0.2s ease for background color changes

#### Table Cells
- Text color: `#2C2416` (deep warm brown)
- Border color: `#EFE6D5` (light heritage beige)
- Maintains readability with proper contrast

#### Category Wrapper (Badges)
- Background: `#EFE6D5` (light heritage beige)
- Text color: `#2C2416` (deep warm brown)
- Consistent with theme palette

#### Icon Buttons
- Default color: `#6B5D4F` (medium brown)
- Hover color: `#8B7548` (heritage bronze)
- Hover background: `rgba(139, 117, 72, 0.08)` (subtle bronze tint)

#### Upload Image Box
- Background: `rgba(139, 117, 72, 0.1)` (light heritage bronze)
- Matches theme accent colors

### 3. **Table Headers** (`table-header.jsx`)

#### Header Styling
- Background: `#EFE6D5` (light heritage beige)
- Bottom border: `2px solid #8B7548` (heritage bronze)
- Font family: `"Times New Roman", Times, serif` (elegant serif font)
- Font weight: 600 (semi-bold for headers)
- Text color: `#2C2416` (deep warm brown)
- Letter spacing: `0.5px` (enhanced readability)

### 4. **Global Component Overrides** (`components.js`)

#### Card Component
- Background: `#FFFFFF` (white)
- Box shadow: `0px 2px 8px rgba(139, 117, 72, 0.08)` (subtle bronze shadow)
- Border: `1px solid #EFE6D5` (light heritage border)
- Border radius: 12px (consistent rounding)

#### Dialog Component
- Box shadow: `0px 8px 24px rgba(139, 117, 72, 0.15)` (heritage bronze shadow)
- Border: `1px solid #EFE6D5` (light heritage border)
- Border radius: 12px

#### Dialog Title
- Font family: `"Times New Roman", Times, serif` (elegant font)
- Text color: `#2C2416` (deep warm brown)
- Font weight: 600 (semi-bold)
- Bottom border: `1px solid #EFE6D5` (light heritage border)

#### Dialog Content
- Text color: `#2C2416` (deep warm brown)
- Proper padding for content spacing

#### Input Fields (OutlinedInput)
- Default border: `#EFE6D5` (light heritage border)
- Hover border: `#8B7548` (heritage bronze)
- Focus border: `#8B7548` (heritage bronze, 2px)
- Border radius: 8px

#### Input Labels
- Default color: `#6B5D4F` (medium brown)
- Focus color: `#8B7548` (heritage bronze)

### 5. **Site Settings Tabs** (`site-settings.jsx`)

#### Tab Styling
- Inactive tabs: `#6B5D4F` (medium brown)
- Active tabs: `#8B7548` (heritage bronze)
- Active font weight: 600 (semi-bold)
- Indicator: `#8B7548` (heritage bronze)
- Indicator height: 3px with rounded top corners
- Border: `#EFE6D5` (light heritage beige)

## Color Palette Used

```css
/* Primary Colors */
--cream-background: #FEFAF0;    /* Main background */
--white-cards: #FFFFFF;          /* Card backgrounds */

/* Text Colors */
--dark-brown: #2C2416;           /* Primary text */
--medium-brown: #6B5D4F;         /* Secondary text/icons */

/* Accent Colors */
--heritage-bronze: #8B7548;      /* Active states, borders */
--light-beige: #EFE6D5;          /* Borders, table headers */

/* Shadow Colors */
--bronze-shadow-light: rgba(139, 117, 72, 0.08);
--bronze-shadow-medium: rgba(139, 117, 72, 0.15);
```

## Typography

### Headings & Labels
- Font Family: `"Times New Roman", Times, serif`
- Font Size: 14-15px
- Font Weight: 600 (semi-bold)
- Letter Spacing: 0.5px

### Body Text
- Default: System fonts (maintains performance)
- Admin sidebar menu: Times New Roman (elegant consistency)

## Benefits

1. **Visual Consistency**: Entire admin panel now matches customer-facing heritage theme
2. **Professional Appearance**: Elegant serif fonts and warm color palette
3. **Better UX**: Consistent hover states and visual feedback
4. **Brand Alignment**: Reflects Qadeem's heritage crafts identity
5. **Accessibility**: Maintains proper color contrast ratios

## Files Modified

1. `src/components/layouts/vendor-dashboard/dashboard-body-wrapper.jsx`
2. `src/pages-sections/admin-dashboard/styles.js`
3. `src/components/data-table/table-header.jsx`
4. `src/theme/components.js`
5. `src/pages-sections/admin-dashboard/site-settings/page-view/site-settings.jsx`

## Testing Checklist

- [x] Table headers display with heritage colors
- [x] Table rows have proper borders and text colors
- [x] Icon buttons have correct hover states
- [x] Cards display with proper shadows and borders
- [x] Dialogs maintain theme consistency
- [x] Dialog titles use elegant font and colors
- [x] Tabs in site settings use heritage bronze
- [x] Background color applied to all admin pages
- [x] Typography is readable and elegant
- [x] Input fields have heritage bronze focus states
- [x] Input labels change color on focus
- [x] Form elements follow theme colors
- [x] No linter errors introduced

## Notes

- All changes maintain backward compatibility
- Theme applies automatically to all existing and future admin pages
- No JavaScript logic changes, only styling updates
- Performance remains optimal (no additional dependencies)
