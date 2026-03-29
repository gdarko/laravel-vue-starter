# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An opinionated Laravel 13 + Vue 3 SPA starter template. The backend serves as a JSON API (Laravel Sanctum + Fortify), and a single catch-all web route hands everything to the Vue SPA. The frontend uses DaisyUI 5 on Tailwind CSS 4 with Heroicons.

## Development Commands

```bash
# Install
composer install && npm install

# Setup
cp .env.example .env
php artisan key:generate
php artisan migrate --seed

# Development (run both)
php artisan serve        # Backend on :8000
npm run dev              # Vite HMR

# Production build
npm run build

# Testing
php artisan test
php artisan test --filter=ExampleTest

# Code formatting
./vendor/bin/pint
```

## Architecture

### SPA Pattern

All web requests hit `SpaController` via a catch-all route. Vue Router handles client-side routing. API routes are under `/api` with Sanctum cookie-based auth.

### Backend Layers

- **Controllers** (`app/Http/Controllers/`) — Thin, delegate to services
- **Services** (`app/Services/`) — Business logic (UserService, RoleService, MediaService)
- **Requests** (`app/Http/Requests/`) — Form request validation
- **Resources** (`app/Http/Resources/`) — API response transformation
- **Actions** (`app/Actions/Fortify/`) — Auth actions (create user, reset password)
- **Traits** (`app/Traits/`) — `Searchable` and `Filterable` for query building

### Frontend Layers (`resources/app/`)

- **Services** (`services/`) — TypeScript API classes. PUT/PATCH use POST with `_method` for FormData.
- **Stores** (`stores/`) — Pinia: auth, toast (notifications), alert (inline), global (loading state)
- **Router** (`router/`) — Vue Router with auth guards and ability checks via route meta
- **Views** (`views/pages/`) — Pages organized by auth/private/shared. Admin pages under `/panel/*`
- **Components** (`views/components/`) — DaisyUI-based: Table, Modal, Panel, Button, TextInput, etc.
- **Icons** (`views/components/icons/Icon.vue`) — Heroicons wrapper. See https://heroicons.com

### Key Conventions

- SQLite default; sessions, cache, queue use `database` driver
- User avatars via Spatie Media Library (small/medium/large conversions)
- Toast notifications (`stores/toast.js`) for user feedback, not inline alerts
- User CRUD uses sidebar drawer pattern (no separate pages)
- Dark mode via `data-theme` attribute, toggle in navbar
- Collapsible sidebar with tooltips, persisted in localStorage
- DaisyUI semantic colors (`primary`, `base-content`, etc.) — never hardcode white/black
- Vite entry: `resources/styles/main.css` + `resources/app/main.js`

### Auth & CORS

Sanctum requires `.env` values to match:
```
APP_URL=http://localhost:8000
SANCTUM_STATEFUL_DOMAINS=localhost:8000
SESSION_DOMAIN=localhost
```

## Agent Skills

This project includes Claude Code skills in `.claude/skills/`:

| Skill | When to activate |
|-------|-----------------|
| `vue-component-development` | Creating/modifying Vue components, pages, stores, services, DaisyUI styling |
| `spa-auth-development` | Working on auth flow, Sanctum config, router guards, login/register pages |
| `laravel-best-practices` | Writing Laravel PHP code (controllers, models, migrations, etc.) |
| `fortify-development` | Authentication features (login, register, 2FA, password reset) |
| `medialibrary-development` | File uploads, media collections, image conversions |
