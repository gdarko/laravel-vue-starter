---
name: vue-component-development
description: "Activate when creating or modifying Vue 3 components, pages, layouts, stores, or services in the frontend. Covers component patterns, DaisyUI usage, icon system, toast notifications, drawer patterns, form handling, and the SPA routing/auth flow. Use when working in resources/app/."
license: MIT
metadata:
  author: project
---

# Vue Component Development

Patterns and conventions for building Vue 3 frontend components in this project.

## Component Architecture

### Directory Structure

- `views/layouts/` — Layout wrappers (Page, Menu, Auth)
- `views/components/` — Reusable UI components (Button, TextInput, Table, Modal, etc.)
- `views/components/icons/` — Icon system (Icon, Avatar, Spinner)
- `views/components/input/` — Form input components
- `views/components/filters/` — Filter components for list pages
- `views/pages/` — Page-level components organized by auth/private/shared
- `stores/` — Pinia stores (auth, toast, alert, global)
- `services/` — TypeScript API service classes extending BaseService
- `helpers/` — Pure utility functions

### Component Conventions

- Use Options API with `defineComponent()` and `setup()` function (project convention)
- Use `reactive()` for form state, `ref()` for simple values, `computed()` for derived state
- Import components explicitly — no global registration
- Props use camelCase in JS, kebab-case in templates

## UI Framework: DaisyUI 5

This project uses DaisyUI 5 on top of Tailwind CSS 4. Prefer DaisyUI component classes over hand-rolled Tailwind.

### Key classes

- Buttons: `btn btn-primary`, `btn-success`, `btn-error`, `btn-outline`, `btn-ghost`, `btn-sm`
- Inputs: `input input-bordered`, `textarea textarea-bordered`, `select`
- Cards: `card bg-base-100 shadow`, `card-body`, `card-title`
- Tables: `table` with `hover` on `<tr>`
- Badges: `badge badge-success`, `badge-error`, `badge-warning`, `badge-info`
- Alerts: `alert alert-success`, `alert-error`
- Modal: `modal`, `modal-open`, `modal-box`, `modal-backdrop`
- Navigation: `navbar`, `menu`, `breadcrumbs`, `dropdown`
- Loading: `loading loading-spinner`, `skeleton`
- Layout: `drawer`, `drawer-side`, `drawer-content`

### Theme Colors

Use semantic DaisyUI colors, not raw Tailwind colors:
- `primary` (teal), `secondary`, `accent`, `neutral`
- `success`, `warning`, `error`, `info`
- `base-100` (surface), `base-200` (background), `base-300` (border), `base-content` (text)
- Opacity variants: `text-base-content/50`, `border-base-300/50`

### Dark Mode

The project supports light/dark themes via `data-theme` attribute on `<html>`. Both themes use the same teal primary. Custom sidebar colors use `--color-sidebar` / `--color-sidebar-content` CSS variables that adapt per theme. Never hardcode white/black — use semantic DaisyUI colors.

## Icon System

Icons use a thin wrapper around [Heroicons](https://heroicons.com):

```vue
<Icon name="users" class="h-5 w-5" />
```

To add a new icon: import it in `views/components/icons/Icon.vue` from `@heroicons/vue/24/outline` and add a name→component entry to the `iconMap`.

## Toast Notifications

Use the toast store for user feedback instead of inline alerts:

```js
import {useToastStore} from "@/stores/toast";
const toastStore = useToastStore();
toastStore.success('Done!');
toastStore.error('Failed.');
toastStore.info('FYI...');
toastStore.warning('Careful!');
```

Toasts auto-dismiss after 5 seconds. They accept strings, arrays, or validation error objects.

## Drawer Pattern for CRUD

List pages use a slide-in drawer instead of separate create/edit pages:

- Drawer state: `reactive({ open, mode, loading, form })`
- Open with `drawer.open = true` and set `drawer.mode` to `'create'` or `'edit'`
- Close with `drawer.open = false`, refresh list on success
- Use `<Transition name="slide-right">` for animation and `<Teleport>` if needed

## API Services

- Services extend `BaseService` or `ModelService` (for CRUD)
- `ModelService` provides: `index()`, `store()`, `update()`, `delete()`, `edit()`, `find()`
- `handleCreate()` and `handleUpdate()` manage loading states and toast notifications
- PUT/PATCH use POST with `_method` field to support FormData file uploads

## Form Handling

- Use `reactive()` for form state
- Use `reduceProperties(form, ['roles'], 'id')` to flatten nested objects before submission
- Use `fillObject(form, data)` to populate form from API response
- Use `clearObject(form)` to reset form
