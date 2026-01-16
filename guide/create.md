# Responsive UI Rules (All Screen Sizes)

This guide defines **mandatory rules** to keep UI fully responsive across **mobile, tablet, desktop, and large screens**.

This project uses **MUI (`@mui/material`)** heavily (e.g., `Grid2`, `Container`, `sx`) and may use `className` utilities in some places. The rules below apply to both approaches.

---

## Global Responsive Rules (Apply Everywhere)

- **Mobile-first**: start with the smallest layout, then add breakpoints for larger screens.
- **Use breakpoints consistently**
  - MUI: `xs`, `sm`, `md`, `lg`, `xl`
  - Utility classes: `sm:`, `md:`, `lg:`, `xl:`
- **Use fluid sizing**: prefer `%`, `auto`, `minmax()`, `clamp()`, and responsive values over fixed pixel widths/heights.
- **Avoid fixed heights**: use `min-height`, content-driven height, or aspect-ratio for media.
- **Prevent overflow**
  - Add `minWidth: 0` (or equivalent) to flex/grid children with long text.
  - Avoid hard-coded widths that exceed the viewport.
  - Prefer wrapping over truncation unless the design requires truncation.
- **Touch targets**: interactive items must be at least **44x44px** on mobile.
- **Readable typography**
  - Don’t let body text drop below ~14px on mobile.
  - Avoid ultra-wide paragraphs on desktop (keep comfortable line length).
- **Consistent spacing**: use a spacing scale; avoid random paddings/margins.
- **Images/media**
  - Make media responsive (`width: 100%` behavior).
  - Use `object-fit: cover` for cropped thumbnails, `contain` for product images when needed.
- **Motion**: respect `prefers-reduced-motion` (disable/reduce autoplay + animation).
- **Test breakpoints**: at minimum verify **360px**, **390px**, **768px**, **1024px**, **1280px**, **1440px**, **1920px**.

---

## Cards (Product / Blog / Category / Service)

- **Card width**
  - Let the parent layout control width (Grid/flex). Avoid fixed card widths unless it’s a horizontal scroller.
  - Ensure cards collapse to **1 column** on small screens.
- **Card height**
  - Prefer natural height.
  - If equal-height rows are required: make card `display: flex` + `flexDirection: column`, and push footer actions down.
- **Media inside cards**
  - Use a consistent aspect ratio to prevent layout jumps.
  - Avoid fixed pixel heights that break on very small screens.
- **Text**
  - Handle long titles: wrap on mobile; optionally clamp lines on desktop.
  - Prevent text from forcing horizontal scroll (use `minWidth: 0` where needed).
- **Actions**
  - Actions must wrap/stack on mobile (don’t overflow).
  - Icon-only actions need accessible labels/aria.

---

## Grids (Sections, Listing Pages, Dashboards)

- **Column count by breakpoint**
  - Mobile: 1
  - Tablet: 2
  - Desktop: 3–4 (depending on density)
- **Gutters**
  - Use smaller gaps on mobile and larger gaps on desktop (responsive spacing).
- **Minimum column width**
  - Don’t allow “too skinny” columns on large screens; enforce a minimum card width.
- **Loading/empty states**
  - Skeletons/placeholders must follow the same grid so the layout doesn’t jump.

---

## Carousels (Banner, Product Slider, Categories, Testimonials)

- **Slides per view**
  - Define visible items per breakpoint (1 on mobile, 2 on small tablets, 3–5 on desktop).
- **Spacing**
  - Keep consistent slide gap; prevent clipping on mobile.
- **Height stability**
  - Avoid variable slide heights; constrain text and use consistent media ratio.
- **Controls**
  - Arrows: hide or reduce on mobile; ensure they don’t overlap content.
  - Dots: keep tappable and away from screen edges.
- **Touch + accessibility**
  - Swipe enabled on mobile.
  - Keyboard navigation where applicable.
  - Respect `prefers-reduced-motion` (disable autoplay or reduce animation).
- **Fallback**
  - For small item counts, switch to a grid instead of forcing a carousel.

### Common Carousel Types (And What To Do)

#### Hero / Banner (1 slide at a time)

- Keep text readable at 360px; avoid absolute-positioned overlays that clip.
- Use a stable image ratio to prevent layout shift.
- Autoplay is optional; if enabled, respect reduced-motion and provide pause.

#### Multi-item Card Carousel (products/blogs)

- Define slides per breakpoint; ensure cards never become too narrow.
- Hide arrows on mobile if they block taps; keep controls reachable.

#### Category/Logo Carousel (small tiles)

- Use 2–4 items per view on mobile depending on tile width.
- Avoid long labels; allow wrap or clamp.

#### Testimonial Carousel (variable text)

- Constrain text / set max height to reduce height jumps between slides.
- Prefer no autoplay (reading time differs per user).

### React Slick (Recommended Responsive Pattern)

This project includes `react-slick`. Always define breakpoints:

```js
const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 900, settings: { slidesToShow: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } },
  ],
};
```

---

## Forms (Inputs, Filters, Checkout)

- **Field layout**
  - Stack vertically on mobile; use multiple columns only when space allows.
- **Labels + helper text**
  - Allow wrapping/vertical growth; never cause horizontal overflow.
- **Buttons**
  - Primary actions can be full-width on mobile.
  - Keep spacing between adjacent actions to avoid mis-taps.
- **Validation**
  - Error messages wrap; they should not break layout.

---

## Navigation (Header, Menus, Sidebars)

- **Header**
  - Collapse complex nav into hamburger/drawer on mobile.
  - Keep logo/search/primary CTA usable at 360px widths.
- **Menus**
  - Never rely on hover-only interactions; ensure tap-friendly behavior.
- **Sticky UI**
  - Sticky headers must not hide content; add offset/padding when needed.

---

## Modals / Drawers / Dialogs

- **Mobile behavior**
  - Prefer bottom sheets or full-screen dialogs on small screens.
- **Sizing**
  - Constrain width on desktop; avoid ultra-wide dialogs.
  - Use scrollable dialog body instead of exceeding viewport height.
- **Close actions**
  - Close button must be reachable and not overlap content.

---

## Tables / Data Views

- **Preferred**
  - Convert to stacked label-value layout on mobile.
- **If horizontal scroll is required**
  - Make it intentional with visual cue and safe spacing.
  - Be careful with sticky columns.

---

## Images, Video, and Banners

- **Aspect ratio**
  - Keep consistent ratios to avoid layout shift (especially above the fold).
- **Cropping**
  - Products: usually `contain`.
  - Lifestyle banners: usually `cover`.
- **Text overlays**
  - Ensure readability at all sizes (overlay/gradient if needed).

---

## Quick Checklist (Before You Commit UI)

- No horizontal scroll at 360–390px.
- No clipped text in cards/buttons/chips/badges.
- Carousels: correct slides per view; controls usable.
- Grids: correct columns at xs/sm/md/lg; gaps scale smoothly.
- Images: no distortion; stable aspect ratio.
- Touch targets: minimum size met.

---

## End of File


