# Code Best Practices

## General Rules

- Use TypeScript strictly
- No `any`
- Use meaningful names
- Keep functions small
- Avoid duplicated logic
- **Prefer reusable components** - Always check `components/ui/` and `components/common/` before creating new UI elements
- **Prefer base components** - When base components are available (e.g., `BaseButton`, `BaseInput`, `BaseDropdown`), use them instead of creating custom implementations or using raw HTML elements. Base components provide consistent behavior and styling across the application
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
