# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Laravel + Vue 3 SPA starter template. The backend serves as a JSON API (Laravel Sanctum + Fortify), and a single catch-all web route (`{path}`) hands everything to the Vue SPA.

## Development Commands

```bash
# Install dependencies
composer install
npm install

# Setup
cp .env.example .env
php artisan key:generate
php artisan migrate

# Development
php artisan serve              # Backend on :8000
npm run dev                    # Vite dev server with HMR

# Build
npm run build                  # Production build
npm run watch                  # Dev build with file watching

# Testing
php artisan test               # Run all tests
php artisan test --filter=ExampleTest  # Run single test

# Code formatting
./vendor/bin/pint              # PHP code style (Laravel Pint)
```

## Architecture

### SPA Pattern

All web requests hit `SpaController` via a catch-all route. The Vue app handles all client-side routing. API routes are under `/api` with Sanctum cookie-based auth.

### Backend Layers

- **Controllers** (`app/Http/Controllers/`) - Thin controllers that delegate to services
- **Services** (`app/Services/`) - Business logic (UserService, RoleService, MediaService)
- **Requests** (`app/Http/Requests/`) - Form request validation classes
- **Resources** (`app/Http/Resources/`) - API response transformation (JSON:API style)
- **Actions** (`app/Actions/`) - Fortify auth actions (create user, reset password, etc.)
- **Traits** (`app/Traits/`) - `Searchable` and `Filterable` for query building on models

### Frontend Layers

Source lives in `resources/app/` (aliased as `@` in imports). Styles in `resources/styles/`.

- **Services** (`services/`) - TypeScript classes extending `BaseService` for API calls. PUT/PATCH use POST with `_method` spoofing to support FormData uploads.
- **Stores** (`stores/`) - Pinia stores for auth state, alerts, and global UI state
- **Router** (`router/`) - Vue Router with route meta for auth (`requiresAuth`) and ability checks (`requiresAbility`)
- **Views** (`views/pages/`) - Page components organized by auth/private/shared. Private pages live under `/panel/*` routes.
- **Components** (`views/components/`) - Reusable UI components (Table, Form, Modal, Panel, inputs, etc.)
- **Helpers** (`helpers/`) - Utilities for data manipulation, routing, API calls, i18n, alerts

### Auth & Authorization

- **Authentication**: Laravel Fortify (login, register, password reset) + Sanctum (cookie-based SPA auth)
- **Authorization**: Silber Bouncer with ability-based checks. Abilities defined in `resources/app/stub/abilities.js` and checked via route meta `requiresAbility`.
- **CORS**: Sanctum requires `SANCTUM_STATEFUL_DOMAINS` and `SESSION_DOMAIN` in `.env` to match your dev domain.

### i18n

Frontend translations loaded from `lang/{locale}/frontend.php`. The `ApplyLocale` middleware sets locale from the request.

### Vite Entry Points

Defined in `vite.config.js`: `resources/styles/main.scss` and `resources/app/main.js`.

## Key Conventions

- Default DB is SQLite (see `.env.example`); sessions, cache, and queue use `database` driver
- User avatars use Spatie Media Library with thumbnail conversions (small/medium/large)
- API routes are all behind `auth:sanctum` middleware except the token endpoint
- Frontend uses Fork Awesome for icons (not Font Awesome)
- Tailwind CSS with teal as the primary theme color (configured in `tailwind.config.js`)
