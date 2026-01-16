# Frontend Folder Structure Guide

## Purpose

This document defines the **official frontend folder structure** for this project.
All frontend-related code **must follow this structure strictly** to ensure consistency, scalability, and maintainability.

This project uses **Next.js App Router**.

---

## Official Frontend Folder Structure

The following folder structure **must be used and preserved**:

app/
(auth)/
(public)/
(dashboard)/
api/
components/
common/
layout/
ui/
hooks/
lib/
store/
styles/
types/


---

## Folder Responsibilities

### `app/`
- Contains all application routes (App Router)
- Uses route groups such as `(auth)`, `(dashboard)`
- Includes `layout.tsx`, `page.tsx`, `loading.tsx`, and `error.tsx`

### `components/`
- Reusable UI components only
- No business logic
- Must be stateless where possible

### `components/common/`
- Shared components used across multiple features
- **Prefer using existing components from here before creating duplicates**

### `components/layout/`
- Layout and structural components (headers, sidebars, footers)

### `components/ui/`
- Small, reusable UI primitives (Button, Input, Checkbox, Card, etc.)
- **Always check and use these components before creating new ones**
- These components follow consistent styling and behavior patterns

### `hooks/`
- Custom React hooks
- Shared logic only

### `lib/`
- Frontend utilities and helpers
- API clients and constants

### `store/`
- Redux Toolkit store setup
- Slices, thunks, middleware

### `styles/`
- Global styles
- Tailwind configuration extensions (if any)

### `types/`
- Shared TypeScript types and interfaces

---

## Strict Rules

- Do NOT move folders without instruction
- Do NOT create new root-level folders without justification
- Do NOT duplicate components
- Follow existing naming conventions
- Keep files small and focused

## UI Design Status

**Important**: This project has mixed UI designs. The home page uses the new design, while other pages use the old design. Always check `UI_Design_Status.md` before updating page UI, and update it when converting a page to the new design.

---

## End of File
