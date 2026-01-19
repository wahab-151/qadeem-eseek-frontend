# Code Best Practices

## General Rules

- Use TypeScript strictly
- No `any`
- Use meaningful names
- Keep functions small
- Avoid duplicated logic
- **Prefer reusable components** - Always check `components/ui/` and `components/common/` before creating new UI elements
- **Prefer base components** - When base components are available (e.g., `BaseButton`, `BaseInput`, `BaseDropdown`), use them instead of creating custom implementations or using raw HTML elements. Base components provide consistent behavior and styling across the application
- **⚠️ DO NOT modify base components without permission** - Base components (e.g., `QadeemButton`, `BaseButton`, `BaseInput`) are shared across the entire application. Modifying them can break other parts of the codebase. Instead:
  - Use the `sx` prop or className for custom styling in parent components
  - If you need to extend functionality, create a wrapper component or use composition
  - If a base component truly needs modification, **ask for permission first** and document the change
  - Keep common styles (fontWeight, transitions, hover states) in base components
  - Only override truly unique styles (colors, sizes) in parent components via `sx` prop
- **UI Design Status Tracking** - When updating a page to the new UI design, **MUST** update `UI_Design_Status.md` to mark that page as having the new design. Check this file before making UI changes to understand which pages use new vs old design.

---

## TypeScript Rules

- Prefer interfaces for objects
- Prefer union types for states
- Create shared types in `/types`
- Infer types when possible

---

## Clean Code Guidelines

- One responsibility per function
- Avoid deeply nested logic
- Use early returns
- Add comments only where logic is complex

---

## End of File
