# Cursor Master Guide

## Mandatory Instruction for Cursor AI

Before making ANY code changes:

1. Read **all documentation files** listed below
2. Understand existing project structure
3. Analyze current code flow
4. Follow established patterns strictly

---

## Documentation Files to Read and all files inside guide folder.

- Frontend_Folder_Structure.md
- Code_Best_Practices.md
- UI_UX_Guidelines.md
- create.md (Responsive UI Rules)
- UI_Design_Status.md (⚠️ **IMPORTANT**: Check this before updating any page UI)
- API_Calling_And_Data_Rendering.md
- Security_Guidelines.md

---

## Final Rule

Cursor must act as a **senior long-term engineer**, not a code generator.

Consistency, security, and maintainability are higher priority than speed.

**⚠️ CRITICAL: Base Component Modification Policy**
- **NEVER modify base/reusable components** (e.g., `QadeemButton`, `BaseButton`, components in `components/ui/` or `components/common/`) without explicit permission
- Base components are shared across the entire application - modifications can break other features
- Use `sx` prop or wrapper components for custom styling instead
- See `Code_Best_Practices.md` for detailed guidelines

Only after reading all guides:
➡️ Analyze the codebase  
➡️ Then implement changes

---

## End of File
