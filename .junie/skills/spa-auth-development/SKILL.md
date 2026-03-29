---
name: spa-auth-development
description: "Activate when working on SPA authentication flow, Sanctum cookie-based auth, Vue Router guards, auth store, login/register/password reset pages, or CORS/session configuration. Covers the full auth lifecycle from CSRF cookie to protected API calls."
license: MIT
metadata:
  author: project
---

# SPA Authentication Development

This project uses a decoupled SPA architecture where Vue handles all routing and Laravel serves as a JSON API with Sanctum cookie-based authentication.

## Auth Flow

1. Vue app calls `GET /sanctum/csrf-cookie` to get XSRF token
2. User submits login form → `POST /login` (Fortify handles this)
3. Laravel returns session cookie + user data
4. All subsequent API calls include the session cookie automatically (`withCredentials: true`)
5. Protected routes use `auth:sanctum` middleware

## Key Files

### Backend
- `config/sanctum.php` — Stateful domains, guards, CSRF middleware
- `config/cors.php` — CORS paths (api/*, login, logout, register, etc.) with `supports_credentials: true`
- `config/fortify.php` — Auth features (registration, password reset, email verification)
- `app/Providers/FortifyServiceProvider.php` — Binds Fortify actions and custom LoginResponse
- `app/Http/Responses/LoginResponse.php` — Returns JSON with user data for SPA
- `app/Http/Middleware/ApplyLocale.php` — Sets locale from X-Locale header
- `bootstrap/app.php` — `statefulApi()` middleware, `apply_locale` alias

### Frontend
- `stores/auth.js` — Pinia store with login, register, logout, getCurrentUser
- `services/AuthService.ts` — API calls for auth endpoints (login, register, forgot/reset password, etc.)
- `router/index.js` — Navigation guards checking `requiresAuth` and `requiresAbility` route meta
- `plugins/axios.js` — Axios configured with `withCredentials`, X-Locale header, base URL from `window.AppConfig`

## CORS Configuration

For the SPA to work, these `.env` values must match:

```
APP_URL=http://localhost:8000
SANCTUM_STATEFUL_DOMAINS=localhost:8000
SESSION_DOMAIN=localhost
```

## Route Guards

Routes use meta fields for auth:
- `requiresAuth: true` — Redirects to login if not authenticated
- `requiresAbility: 'ability_name'` — Checks user abilities via Bouncer
- `isPublicAuthPage: true` — Redirects to dashboard if already authenticated
- `isOwner: true` — Owner-only routes

## Authorization

Uses Silber Bouncer with abilities:
- Abilities defined in `resources/app/stub/abilities.js` (CREATE_USER, EDIT_USER, etc.)
- Checked in Vue Router guards and sidebar menu visibility
- Backend uses `Gate::authorize()` in controllers
- Roles seeded in `database/seeders/BouncerSeeder.php`
