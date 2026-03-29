# Laravel Vue Starter

An opinionated Laravel 13 + Vue 3 starter template for building modern admin panels and SPA applications. Ships with authentication, authorization, user management, and a polished UI — so you can skip the boilerplate and start building.

## Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Laravel 13, PHP 8.3+ |
| **Frontend** | Vue 3 (Composition API), Pinia 3, Vue Router 5 |
| **UI** | DaisyUI 5, Tailwind CSS 4, Heroicons |
| **Auth** | Laravel Sanctum (cookie-based SPA), Laravel Fortify |
| **Authorization** | Bouncer (roles & abilities) |
| **Media** | Spatie Media Library (avatar uploads with conversions) |
| **Build** | Vite 8 |

## Features

- **Authentication** — Login, register, forgot/reset password, email verification
- **Authorization** — Role-based access control with Bouncer (admin/regular roles)
- **User Management** — Full CRUD with sidebar drawer, filters, sorting, pagination
- **Dark Mode** — Light/dark theme toggle, persisted in localStorage
- **Collapsible Sidebar** — With tooltips when collapsed, persisted state
- **Toast Notifications** — System-wide success/error/info/warning toasts
- **Localization** — i18n support (English + Macedonian included)
- **Profile Page** — Tabbed settings (general, password, avatar) with cover header
- **Component Library** — Buttons, inputs, tables, modals, badges, spinners, file upload, dropdowns
- **Components Showcase** — Built-in page at `/panel/components` demonstrating all UI components

## Quick Start

```bash
git clone https://github.com/gdarko/laravel-vue-starter.git
cd laravel-vue-starter
composer install
cp .env.example .env
php artisan key:generate
npm install
php artisan migrate --seed
```

Start the development servers:

```bash
# Terminal 1
php artisan serve

# Terminal 2
npm run dev
```

Open `http://localhost:8000` and login with:
- **Email:** luke@jedi.com
- **Password:** 123123

## CORS / Domain Setup

For Sanctum SPA auth to work, update `.env`:

```env
# Local development
APP_URL=http://localhost:8000
SANCTUM_STATEFUL_DOMAINS=localhost:8000
SESSION_DOMAIN=localhost

# Production
APP_URL=https://myapp.com
SANCTUM_STATEFUL_DOMAINS=myapp.com
SESSION_DOMAIN=myapp.com
```

## Project Structure

```
resources/app/
├── views/
│   ├── layouts/         # Page, Menu, Auth layouts
│   ├── components/      # Reusable UI (Button, Table, Modal, Panel, etc.)
│   │   ├── icons/       # Icon, Avatar, Spinner
│   │   ├── input/       # Button, TextInput, FileInput, Dropdown
│   │   └── filters/     # Filters, FiltersRow, FiltersCol
│   └── pages/
│       ├── auth/        # Login, Register, Forgot/Reset Password
│       ├── private/     # Dashboard, Profile, Users, Components
│       └── shared/      # 404
├── stores/              # Pinia (auth, toast, alert, global)
├── services/            # API services (AuthService, UserService, etc.)
├── router/              # Vue Router with auth guards
├── helpers/             # Utilities (api, i18n, data, routing, alert)
├── plugins/             # Axios, i18n config
└── stub/                # Static constants (abilities)
```

## Components

All components are in `resources/app/views/components/`. Visit `/panel/components` in the app for a live showcase.

| Component | Description | Key Props |
|-----------|-------------|-----------|
| **Button** | Button / router-link | `label`, `icon`, `theme`, `to`, `disabled` |
| **TextInput** | Text, email, password, textarea | `name`, `label`, `type`, `v-model`, `required` |
| **FileInput** | Drag & drop file upload | `name`, `v-model`, `accept`, `multiple` |
| **Dropdown** | Select with server-side search | `name`, `v-model`, `server`, `multiple` |
| **Table** | Sortable table with skeleton loading | `headers`, `records`, `actions`, `sorting`, `pagination` |
| **Modal** | Dialog with backdrop | `title`, `is-showing`, `is-loading` |
| **Panel** | Card container | `title`, `is-loading`, `body-padding` |
| **Badge** | Status label | `theme` (success, info, warning, error) |
| **Alert** | Inline alert (from alert store) | — |
| **Toast** | System-wide notifications (auto) | — |
| **Icon** | [Heroicons](https://heroicons.com) wrapper | `name`, `class` |
| **Spinner** | Loading indicator | `text`, `text-new-line` |
| **Avatar** | Default user avatar SVG | — |

### Adding Icons

The `Icon` component wraps [Heroicons](https://heroicons.com). To add a new icon:

1. Browse icons at [heroicons.com](https://heroicons.com)
2. Import it in `resources/app/views/components/icons/Icon.vue`
3. Add a short name to the `iconMap`

```vue
<Icon name="users" class="h-5 w-5" />
```

### Theming

Theme colors are defined in `resources/styles/main.css` using DaisyUI's CSS variable system with oklch colors. Both light and dark themes use a teal primary palette.

To customize, edit the `[data-theme="light"]` and `[data-theme="dark"]` blocks in `main.css`.

## AI Agent Skills

This project includes [Claude Code](https://claude.ai/code) skills in `.claude/skills/` for AI-assisted development:

| Skill | Purpose |
|-------|---------|
| `vue-component-development` | Vue 3 component patterns, DaisyUI usage, icon system, drawer CRUD, toast notifications |
| `spa-auth-development` | Sanctum SPA auth flow, router guards, CORS config, auth store lifecycle |
| `laravel-best-practices` | Laravel PHP patterns (from Laravel Boost) |
| `fortify-development` | Authentication features — login, register, 2FA, password reset |
| `medialibrary-development` | Spatie Media Library — file uploads, collections, conversions |

Skills are activated automatically by AI agents when working in relevant areas. They provide domain-specific conventions and patterns to ensure consistent, high-quality code.

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run watch` | Dev build with file watching |

## Contributing

Pull requests are welcome. Please follow existing code conventions and run `./vendor/bin/pint` before submitting PHP changes.

## License

```
Copyright (C) 2022-2026 Darko Gjorgjijoski (https://darkog.com)

This file is part of Laravel Vue Starter

Laravel Vue Starter is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

Laravel Vue Starter is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Laravel Vue Starter. If not, see <https://www.gnu.org/licenses/>.
```
