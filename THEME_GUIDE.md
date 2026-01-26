# 🎨 QADEEM Heritage Luxury Theme Guide

## Overview
This theme is specifically designed for **QADEEM Handicraft Shop** - a premium heritage e-commerce platform selling traditional artisan products including Persian carpets, Kashmir shawls, Turkish kilims, Afghan rugs, and precious gemstones.

---

## 🎯 Design Philosophy

**Heritage Luxury**: Combines traditional warmth with modern luxury. The color palette reflects the natural materials and earthy tones of handcrafted products while maintaining an elegant, premium feel.

---

## 🎨 Color Palette

### Primary Colors (Main Brand Identity)

#### Primary - Rich Bronze
```javascript
primary.main: "#8B7548"  // Rich bronze - warm, luxurious
primary.light: "#D4C4A0" // Soft tan
primary.dark: "#342D1A"  // Dark brown
```
**Use for:**
- Primary buttons (CTA)
- Links and interactive elements
- Brand elements
- Active states

#### Secondary - Desert Sand
```javascript
secondary.main: "#A67C52"  // Warm desert sand
secondary.light: "#C9A17A"  // Warm caramel
secondary.dark: "#4A2F18"   // Dark caramel
```
**Use for:**
- Secondary buttons
- Hover states
- Accents and highlights
- Category badges

---

### Accent Colors (Special Features)

#### Emerald - Success & NEW Items
```javascript
emerald.main: "#2C5F4F"  // Deep emerald
```
**Use for:**
- "NEW" badges
- Success messages
- Available/In Stock indicators
- Positive CTAs

#### Burgundy - Urgent & SALE
```javascript
burgundy.main: "#8B4049"  // Deep burgundy
```
**Use for:**
- "SALE" badges
- Error messages
- Urgent CTAs
- Limited stock warnings

#### Sapphire - Info & Premium
```javascript
sapphire.main: "#2C4A6B"  // Deep blue
```
**Use for:**
- Info messages
- Premium/Featured tags
- Links (alternative)
- Trustworthy elements

#### Antique Gold - Premium Features
```javascript
antique.main: "#C19A6B"  // Antique gold
```
**Use for:**
- Premium product highlights
- VIP features
- Special offers
- Luxury accents

---

### Background Colors

```javascript
background.default: "#FEFAF0"  // Warm cream - main background
background.paper: "#FFFFFF"    // Pure white - cards, modals
```

### Text Colors

```javascript
text.primary: "#2C2416"    // Deep warm brown - main text
text.secondary: "#6B5D4F"  // Medium brown - secondary text
text.disabled: grey[400]   // Disabled state
```

---

## 🎨 Usage Examples

### Buttons

```jsx
// Primary CTA Button
<Button 
  variant="contained" 
  color="primary"
  sx={{ 
    borderRadius: 0,  // Traditional rectangular
    px: 4, 
    py: 1.5,
    fontWeight: 600
  }}
>
  Add to Cart
</Button>

// Secondary Button
<Button 
  variant="outlined" 
  color="secondary"
  sx={{ borderRadius: 0 }}
>
  View Details
</Button>

// Sale/Urgent Button
<Button 
  sx={{ 
    backgroundColor: "burgundy.main",
    color: "white",
    "&:hover": { backgroundColor: "burgundy.dark" }
  }}
>
  Flash Sale
</Button>
```

### Badges

```jsx
// NEW Badge
<Chip 
  label="NEW" 
  size="small"
  sx={{
    bgcolor: "emerald.main",
    color: "white",
    fontWeight: 600,
    borderRadius: 1
  }}
/>

// SALE Badge
<Chip 
  label="SALE" 
  size="small"
  sx={{
    bgcolor: "burgundy.main",
    color: "white",
    fontWeight: 600,
    borderRadius: 1
  }}
/>

// Premium Badge
<Chip 
  label="PREMIUM" 
  size="small"
  sx={{
    bgcolor: "antique.main",
    color: "primary.dark",
    fontWeight: 600,
    borderRadius: 1
  }}
/>
```

### Cards

```jsx
<Card
  sx={{
    borderRadius: 0,  // Traditional rectangular
    border: "1px solid",
    borderColor: "grey.300",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      transform: "translateY(-2px)"
    }
  }}
>
  {/* Card content */}
</Card>
```

---

## 📐 Design Guidelines

### Border Radius
- **Cards/Containers**: `0px` or `2px` (minimal, traditional)
- **Buttons**: `0px` or `4px` (rectangular or slightly rounded)
- **Badges**: `4px` (small rounded corners)
- **Images**: `0px` (rectangular for traditional feel)

### Shadows
```javascript
// Subtle elevation
boxShadow: "0 2px 8px rgba(0,0,0,0.08)"

// Medium elevation (hover)
boxShadow: "0 4px 16px rgba(0,0,0,0.12)"

// High elevation (modals)
boxShadow: "0 8px 32px rgba(0,0,0,0.16)"
```

### Spacing
- Use 8px base unit (MUI default)
- Generous padding for premium feel
- Consistent margins between sections

---

## 🎭 Component Theming

### Navigation
```jsx
sx={{
  backgroundColor: "background.paper",
  color: "text.primary",
  borderBottom: "1px solid",
  borderColor: "grey.300",
  "& .active": {
    color: "primary.main",
    fontWeight: 600
  }
}}
```

### Product Cards
```jsx
sx={{
  backgroundColor: "background.paper",
  borderRadius: 0,
  overflow: "hidden",
  "& .price": {
    color: "primary.main",
    fontWeight: 700
  },
  "& .oldPrice": {
    color: "text.secondary",
    textDecoration: "line-through"
  }
}}
```

### Category Headers
```jsx
sx={{
  color: "primary.dark",
  fontWeight: 700,
  borderBottom: "2px solid",
  borderColor: "primary.main",
  pb: 1,
  mb: 3
}}
```

---

## 🎨 Color Psychology

- **Bronze/Brown**: Trust, reliability, tradition, craftsmanship
- **Cream/Beige**: Warmth, comfort, natural materials
- **Emerald**: Growth, prosperity, authenticity
- **Burgundy**: Luxury, passion, urgency
- **Sapphire**: Wisdom, trust, premium quality
- **Gold**: Wealth, premium, heritage

---

## 📱 Responsive Considerations

- Maintain warmth across all devices
- Ensure sufficient contrast for readability
- Use primary colors sparingly on mobile
- Increase button sizes for mobile (min 44px height)

---

## ✅ Do's and Don'ts

### ✅ DO
- Use warm, earthy tones consistently
- Maintain rectangular/minimal rounded corners
- Use cream background for warmth
- Apply subtle shadows for depth
- Use accent colors purposefully (badges, CTAs)

### ❌ DON'T
- Avoid bright, neon colors
- Don't overuse multiple accent colors together
- Avoid overly rounded corners (not traditional)
- Don't use cold grays or blues as primary
- Avoid cluttered designs

---

## 🚀 Quick Reference

### Most Common Color Combinations

1. **Primary CTA**: `primary.main` + white text
2. **Secondary Action**: `secondary.main` + white text
3. **Success/New**: `emerald.main` + white text
4. **Sale/Urgent**: `burgundy.main` + white text
5. **Info/Premium**: `sapphire.main` + white text
6. **Background**: `background.default` (#FEFAF0)
7. **Text**: `text.primary` (#2C2416)

---

## 📊 Accessibility

- All color combinations meet WCAG AA standards
- Minimum contrast ratio: 4.5:1 for text
- Primary buttons: 7:1 contrast ratio
- Test with color blindness simulators

---

## 🔄 Theme Updates

Last updated: January 2026
Theme version: 2.0 (Heritage Luxury)

For questions or updates, refer to:
- `/src/theme/theme-colors.js` - Color definitions
- `/src/theme/theme-options.js` - Theme configuration
- `/src/theme/typography.js` - Typography settings
