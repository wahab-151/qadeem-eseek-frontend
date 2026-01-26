# 🏪 QADEEM Physical Store-Matched Theme

## Based on Actual Store Photos

This theme is designed to match the physical QADEEM store aesthetic:
- Natural wood elements
- Dark slate stone walls
- Warm ambient lighting
- Rich burgundy carpets
- Rustic-luxury mountain lodge feel

---

## 🎨 Complete Color Palette

### Primary - Warm Wood Brown
Matches the golden wood ceiling, walls, and display cabinets

```javascript
export const primaryWood = {
  50: "#FAF7F3",
  100: "#F2EAE0",
  200: "#E5D5C1",
  300: "#D4BF9F",
  400: "#B8956A",   // Light wood
  500: "#8B6F47",   // MAIN - Natural wood
  600: "#6B5835",   // Medium wood
  700: "#5C4A32",   // Dark wood
  800: "#4A3F26",   
  900: "#342D1A",   
  main: "#8B6F47",
  light: "#B8956A",
  dark: "#5C4A32",
  contrastText: "#FFFFFF"
};
```

### Secondary - Slate Stone Gray
Matches the dark stone walls and modern accents

```javascript
export const secondarySlate = {
  50: "#F5F5F5",
  100: "#E0E0E0",
  200: "#BDBDBD",
  300: "#9E9E9E",
  400: "#757575",
  500: "#616161",
  600: "#4A4A4A",   // MAIN - Stone gray
  700: "#3A3A3A",   // Dark stone
  800: "#2D2D2D",   // Darker stone
  900: "#1F1F1F",   // Darkest
  main: "#4A4A4A",
  light: "#757575",
  dark: "#2D2D2D",
  contrastText: "#FFFFFF"
};
```

### Accent - Carpet Burgundy
Matches the rich red Persian carpets throughout the store

```javascript
export const burgundyCarpet = {
  50: "#FCEAEC",
  100: "#F7CBD0",
  200: "#EFA8B1",
  300: "#E78491",
  400: "#D35468",
  500: "#BF2F41",
  600: "#A62839",
  700: "#8B2635",   // MAIN - Carpet burgundy
  800: "#6B1A27",   
  900: "#4A1119",   
  main: "#8B2635",
  light: "#D35468",
  dark: "#6B1A27",
  contrastText: "#FFFFFF"
};
```

### Accent - Warm Amber Light
Matches the warm lighting ambiance in the store

```javascript
export const amberLight = {
  50: "#FEF9F3",
  100: "#FDF1E5",
  200: "#FAE6CC",
  300: "#F5D9B2",
  400: "#E5C19A",   // Light amber
  500: "#D4A574",   // MAIN - Warm amber
  600: "#C18E5D",   
  700: "#B88B5D",   
  800: "#A67546",   
  900: "#8B6239",   
  main: "#D4A574",
  light: "#F5D9B2",
  dark: "#A67546",
  contrastText: "#4A3F26"
};
```

### Cork/Earth Floor
Matches the natural cork flooring

```javascript
export const corkFloor = {
  main: "#B8976D",
  light: "#C9A97E",
  dark: "#A0826D",
};
```

---

## 🎯 Usage Guide

### Navigation (Dark Stone Theme)
```jsx
<AppBar sx={{
  bgcolor: "secondarySlate.dark",  // #2D2D2D
  color: "white"
}}>
  <Toolbar>
    {/* Nav items */}
  </Toolbar>
</AppBar>
```

### Product Cards (Light with Wood Accents)
```jsx
<Card sx={{
  bgcolor: "background.paper",
  border: "2px solid",
  borderColor: "primaryWood.main",  // Wood border
  borderRadius: 0,
  "&:hover": {
    boxShadow: "0 8px 24px rgba(139, 111, 71, 0.2)",  // Wood-tinted shadow
  }
}}>
```

### Category Sections (Dark Stone Background)
```jsx
<Box sx={{
  bgcolor: "secondarySlate.700",  // Dark stone
  color: "white",
  py: 6,
  px: 3
}}>
  <Typography variant="h2" sx={{ 
    color: "amberLight.main",  // Warm amber text
    mb: 3 
  }}>
    Featured Collections
  </Typography>
</Box>
```

### Sale/Featured Badges (Burgundy Carpet)
```jsx
<Chip 
  label="FEATURED"
  sx={{
    bgcolor: "burgundyCarpet.main",
    color: "white",
    fontWeight: 700
  }}
/>
```

### Warm Sections (Amber Light)
```jsx
<Box sx={{
  bgcolor: "amberLight.50",  // Very light amber
  py: 4
}}>
  {/* Content with warm feel */}
</Box>
```

---

## 🎨 Complete Theme Object

```javascript
export const storeMatchedTheme = {
  palette: {
    mode: "light",
    primary: primaryWood,
    secondary: secondarySlate,
    burgundy: burgundyCarpet,
    amber: amberLight,
    cork: corkFloor,
    
    background: {
      default: "#F5F0E8",  // Warm cream
      paper: "#FFFFFF",    // White
      dark: "#3A3A3A",     // Dark stone sections
    },
    
    text: {
      primary: "#2D2D2D",    // Dark gray (readable)
      secondary: "#4A4A4A",  // Medium gray
      disabled: "#9E9E9E",
    },
    
    divider: "#E0E0E0",
  },
  
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    h1: { fontWeight: 700, color: "#2D2D2D" },
    h2: { fontWeight: 700, color: "#2D2D2D" },
    h3: { fontWeight: 600, color: "#2D2D2D" },
    body1: { color: "#4A4A4A" },
  },
  
  shape: {
    borderRadius: 0,  // Rectangular like your displays
  },
  
  shadows: [
    "none",
    "0 2px 8px rgba(139, 111, 71, 0.08)",   // Subtle wood-tinted
    "0 4px 16px rgba(139, 111, 71, 0.12)",  // Medium
    "0 8px 24px rgba(139, 111, 71, 0.16)",  // Strong
    // ... more shadows
  ],
};
```

---

## 🏔️ Design Patterns from Your Store

### 1. Wood + Stone Contrast
```jsx
<Box sx={{ display: "flex" }}>
  {/* Wood section */}
  <Box sx={{ 
    bgcolor: "primaryWood.main",
    flex: 1,
    p: 3
  }}>
    <Typography color="white">Carpets & Rugs</Typography>
  </Box>
  
  {/* Stone section */}
  <Box sx={{ 
    bgcolor: "secondarySlate.800",
    flex: 1,
    p: 3
  }}>
    <Typography color="white">Gemstones</Typography>
  </Box>
</Box>
```

### 2. Warm Lighting Effect
```jsx
// Add warm overlay to sections
<Box sx={{
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle, rgba(212,165,116,0.1) 0%, transparent 70%)",
    pointerEvents: "none"
  }
}}>
```

### 3. Display Cabinet Style Cards
```jsx
<Card sx={{
  bgcolor: "primaryWood.dark",  // Wood background
  p: 2,
  "& .product-content": {
    bgcolor: "white",
    p: 2,
    // Creates the glass display case effect
  }
}}>
```

---

## 📊 Comparison with Physical Store

| Store Element | Color | Theme Variable |
|--------------|-------|----------------|
| Wooden ceiling | Golden brown | `primaryWood.main` `#8B6F47` |
| Stone walls | Dark gray | `secondarySlate.dark` `#2D2D2D` |
| Burgundy carpets | Deep red | `burgundyCarpet.main` `#8B2635` |
| Ambient lighting | Warm amber | `amberLight.main` `#D4A574` |
| Cork flooring | Tan brown | `cork.main` `#B8976D` |
| Dark exterior | Charcoal | `secondarySlate.900` `#1F1F1F` |

---

## 🎭 UI Component Recommendations

### Hero Section (Store Exterior Feel)
```jsx
<Box sx={{
  bgcolor: "secondarySlate.900",  // Dark like exterior
  color: "white",
  py: 8,
  backgroundImage: "url('/store-exterior.jpg')",
  backgroundSize: "cover",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    bgcolor: "rgba(0,0,0,0.5)"  // Dark overlay
  }
}}>
  <Typography variant="h1" sx={{ 
    color: "amberLight.light",
    position: "relative",
    zIndex: 1
  }}>
    Authentic Handcrafted Heritage
  </Typography>
</Box>
```

### Product Grid (Store Interior Feel)
```jsx
<Box sx={{
  bgcolor: "background.default",  // Warm cream
  p: 4,
  // Mimics the cozy store interior
}}>
  <Grid container spacing={3}>
    {/* Product cards */}
  </Grid>
</Box>
```

### Category Headers (Wood Frame Style)
```jsx
<Box sx={{
  borderTop: "4px solid",
  borderBottom: "4px solid",
  borderColor: "primaryWood.main",
  py: 2,
  my: 4
}}>
  <Typography variant="h3" sx={{ 
    color: "primaryWood.dark",
    fontWeight: 700
  }}>
    Kilims Collection
  </Typography>
</Box>
```

---

## 🚀 Implementation Priority

### Phase 1: Core Colors
1. Update primary to wood brown
2. Update secondary to slate gray
3. Set warm cream background

### Phase 2: Accent Colors
1. Add burgundy for sale/featured items
2. Add amber for warm highlights
3. Update badges and CTAs

### Phase 3: Advanced Styling
1. Add wood-textured borders
2. Implement stone backgrounds for sections
3. Add warm lighting effects
4. Create display cabinet card styles

---

## ✅ Why This Theme Works Better

1. **Authenticity**: Matches your actual physical space
2. **Cohesive Brand**: Online experience mirrors in-store
3. **Trust**: Customers see consistency
4. **Warmth**: Maintains that cozy, inviting feel
5. **Heritage**: Wood + stone = traditional craftsmanship
6. **Luxury**: Dark stone adds sophistication

---

Would you like me to implement this store-matched theme instead?
