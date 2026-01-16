# UI & UX Guidelines

## ⚠️ IMPORTANT: UI Design Status

**This project has mixed UI designs:**
- **New Design**: Home page (`/home`) and root page (`/`) use the new UI design
- **Old Design**: All other pages currently use the old UI design

**Before updating any page UI:**
1. Check `UI_Design_Status.md` to see if the page has been updated to new design
2. If updating a page to new design, **MUST** update `UI_Design_Status.md` to mark it as new design
3. Follow the patterns established in the home page when implementing new design

---

## Core Principles

- UI consistency is mandatory
- Mobile-first approach
- Accessibility is not optional
- **Reuse existing UI components** - Always prefer using components from `components/ui/` (Button, Input, Checkbox, Card, etc.) and `components/common/` before creating new ones
- Check existing components first to maintain consistency and reduce code duplication
- **Prefer base components** - When base components are available (e.g., `BaseButton`, `BaseInput`, `BaseDropdown`), always use them instead of raw HTML elements like `<button>`, `<input>`, etc. Base components ensure consistent styling, behavior, and accessibility across the application

---

## Tailwind Rules

- Use Tailwind utilities only
- No inline styles
- Match existing spacing, colors, typography
- Avoid custom CSS unless already used

---

## Mobile-First Strategy

- Design for mobile first
- Scale up for tablet and desktop
- Test responsiveness continuously

---

## UX Quality

- Clear loading states
- Clear error messages
- Clear empty states
- Avoid UI clutter

---

## Interactive Elements

- **Always use BaseButton or Button components** - Never use raw `<button>` HTML elements. Use `BaseButton` for custom-styled buttons or `Button` for pre-styled variants (primary, secondary, outline, ghost)
- **All buttons must have `cursor-pointer` class** (handled automatically by BaseButton)
  - This includes navigation buttons, action buttons, form buttons, and any clickable button elements
  - Ensures consistent user experience and clear visual feedback
  - Applies to all button types: primary, secondary, icon buttons, toggle buttons, etc.

---

## End of File
