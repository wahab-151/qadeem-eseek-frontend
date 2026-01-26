# 🎨 Quick Color Reference Guide

## Use This When Coding!

### 🎯 Primary Actions (Buttons, Links, CTAs)

```jsx
// Add to Cart, Buy Now, Primary CTA
<Button 
  variant="contained"
  color="primary"  // Uses #8B7548 (Rich Bronze)
>
  Add to Cart
</Button>

// Or explicit:
sx={{ bgcolor: "primary.main", color: "white" }}
```

---

### 🎨 Category Badges

```jsx
// "Category" badge on product cards
<Chip 
  label="Category"
  sx={{
    bgcolor: "primary.main",  // Rich bronze
    color: "white"
  }}
/>
```

---

### ✨ NEW Product Badge

```jsx
<Chip 
  label="NEW"
  sx={{
    bgcolor: "emerald.main",  // #2C5F4F (Deep emerald)
    color: "white",
    fontWeight: 600
  }}
/>
```

---

### 🔥 SALE / Discount Badge

```jsx
<Chip 
  label="SALE"
  sx={{
    bgcolor: "burgundy.main",  // #8B4049 (Deep burgundy)
    color: "white",
    fontWeight: 600
  }}
/>

// Or for sale price
<Typography sx={{ color: "burgundy.main", fontWeight: 700 }}>
  $99.99
</Typography>
```

---

### 💎 Premium / Featured Badge

```jsx
<Chip 
  label="PREMIUM"
  sx={{
    bgcolor: "antique.main",  // #C19A6B (Antique gold)
    color: "primary.dark",
    fontWeight: 600
  }}
/>

// Or for premium products
<Box sx={{ border: "2px solid", borderColor: "antique.main" }}>
  {/* Premium content */}
</Box>
```

---

### 📦 Stock Status

```jsx
// In Stock
<Typography sx={{ color: "emerald.main", fontWeight: 600 }}>
  In Stock
</Typography>

// Out of Stock
<Typography sx={{ color: "burgundy.main", fontWeight: 600 }}>
  Out of Stock
</Typography>

// Low Stock (warning)
<Typography sx={{ color: "warning.main", fontWeight: 600 }}>
  Only 2 Left!
</Typography>
```

---

### 🏷️ Price Display

```jsx
// Regular price
<Typography sx={{ 
  color: "primary.main",  // Rich bronze
  fontWeight: 700,
  fontSize: "1.5rem"
}}>
  $149.99
</Typography>

// Sale price (show both)
<Box>
  <Typography sx={{ 
    color: "text.secondary",
    textDecoration: "line-through",
    fontSize: "1rem"
  }}>
    $199.99
  </Typography>
  <Typography sx={{ 
    color: "burgundy.main",  // Red for sale
    fontWeight: 700,
    fontSize: "1.5rem"
  }}>
    $149.99
  </Typography>
</Box>
```

---

### 🃏 Product Cards

```jsx
<Card 
  sx={{
    bgcolor: "background.paper",  // White
    borderRadius: 0,  // Rectangular (traditional)
    border: "1px solid",
    borderColor: "grey.300",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      borderColor: "primary.main"
    }
  }}
>
  {/* Card content */}
</Card>
```

---

### 🧭 Navigation

```jsx
// Active nav item
<Box sx={{
  color: "primary.main",
  fontWeight: 700,
  borderBottom: "2px solid",
  borderColor: "primary.main"
}}>
  Home
</Box>

// Regular nav item
<Box sx={{
  color: "text.primary",
  "&:hover": {
    color: "primary.main"
  }
}}>
  Categories
</Box>
```

---

### 📝 Form Inputs

```jsx
<TextField
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,  // Traditional rectangular
      "&.Mui-focused fieldset": {
        borderColor: "primary.main"
      }
    }
  }}
/>
```

---

### 🎨 Backgrounds & Sections

```jsx
// Main page background (warm cream)
<Box sx={{ bgcolor: "background.default" }}>
  {/* Page content */}
</Box>

// Card/Paper background (pure white)
<Box sx={{ bgcolor: "background.paper" }}>
  {/* Card content */}
</Box>

// Accent background for sections
<Box sx={{ bgcolor: "grey.100", py: 4 }}>
  {/* Section content */}
</Box>
```

---

### 🎯 Call-to-Action Sections

```jsx
// Primary CTA Section
<Box sx={{
  bgcolor: "primary.main",
  color: "white",
  py: 6,
  px: 3,
  textAlign: "center"
}}>
  <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
    Explore Our Collection
  </Typography>
  <Button 
    variant="contained"
    sx={{ 
      bgcolor: "white",
      color: "primary.main",
      "&:hover": { bgcolor: "grey.100" }
    }}
  >
    Shop Now
  </Button>
</Box>

// Urgent/Sale CTA Section
<Box sx={{
  bgcolor: "burgundy.main",
  color: "white",
  py: 6,
  px: 3
}}>
  <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
    🔥 Flash Sale Ends Soon!
  </Typography>
  <Button 
    variant="contained"
    sx={{ 
      bgcolor: "white",
      color: "burgundy.main",
      "&:hover": { bgcolor: "grey.100" }
    }}
  >
    Shop Sale
  </Button>
</Box>
```

---

### 🎭 Category-Specific Colors

```jsx
// Carpets Section
<Box sx={{ 
  borderLeft: "4px solid",
  borderColor: "primary.main",
  pl: 2
}}>
  <Typography variant="h6">Carpets</Typography>
</Box>

// Kilims Section
<Box sx={{ 
  borderLeft: "4px solid",
  borderColor: "secondary.main",
  pl: 2
}}>
  <Typography variant="h6">Kilims</Typography>
</Box>

// Gemstones Section
<Box sx={{ 
  borderLeft: "4px solid",
  borderColor: "emerald.main",
  pl: 2
}}>
  <Typography variant="h6">Gem Stones</Typography>
</Box>

// Shawls Section
<Box sx={{ 
  borderLeft: "4px solid",
  borderColor: "antique.main",
  pl: 2
}}>
  <Typography variant="h6">Shawls</Typography>
</Box>
```

---

### ⚠️ Alerts & Messages

```jsx
// Success message
<Alert severity="success" sx={{ bgcolor: "emerald.light" }}>
  Product added to cart successfully!
</Alert>

// Error message
<Alert severity="error" sx={{ bgcolor: "burgundy.light" }}>
  Out of stock
</Alert>

// Info message
<Alert severity="info" sx={{ bgcolor: "sapphire.light" }}>
  Free shipping on orders over $100
</Alert>

// Warning message
<Alert severity="warning">
  Only 3 items left in stock!
</Alert>
```

---

## 🎨 Complete Color Palette Quick Reference

```javascript
// PRIMARY (Rich Bronze)
primary.main: "#8B7548"
primary.light: "#D4C4A0"
primary.dark: "#342D1A"

// SECONDARY (Desert Sand)
secondary.main: "#A67C52"
secondary.light: "#C9A17A"
secondary.dark: "#4A2F18"

// EMERALD (Success, NEW)
emerald.main: "#2C5F4F"

// BURGUNDY (Sale, Urgent)
burgundy.main: "#8B4049"

// SAPPHIRE (Info, Premium)
sapphire.main: "#2C4A6B"

// ANTIQUE (Luxury, Gold)
antique.main: "#C19A6B"

// BACKGROUNDS
background.default: "#FEFAF0"  // Warm cream
background.paper: "#FFFFFF"    // Pure white

// TEXT
text.primary: "#2C2416"    // Deep brown
text.secondary: "#6B5D4F"  // Medium brown

// STANDARD
error.main: "#E94560"      // Error red
success.main: "#33D067"    // Success green
warning.main: "#FEC544"    // Warning yellow
info.main: "#4E97FD"       // Info blue
```

---

## 💡 Pro Tips

1. **Always use semantic names**: Use `primary.main` instead of hex codes
2. **Test contrast**: Ensure text is readable on all backgrounds
3. **Be consistent**: Same element = same color across the app
4. **Use accent colors sparingly**: They should stand out
5. **Hover states**: Typically use `.dark` variant of the color
6. **Active states**: Use the main color with higher opacity

---

## 🚫 Common Mistakes to Avoid

❌ Mixing too many colors on one page  
❌ Using accent colors as primary  
❌ Inconsistent button colors  
❌ Poor text contrast  
❌ Overusing bright colors  

✅ Stick to primary/secondary for most UI  
✅ Use accent colors for specific purposes  
✅ Maintain color consistency  
✅ Ensure good readability  
✅ Use colors purposefully  
