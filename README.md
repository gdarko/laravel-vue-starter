# Laravel Vue Starter

The project was created to save myself time for redoing the same things all over again when starting a new Laravel/Vue project.

The main goal of this project is to reduce code and make everything simpler for bootstrapping new projects. 

The project is built with the following components:

- Vue 3 / Vuex / VueRouter
- Vue 3 Composition API
- Laravel Framework
- Laravel Sanctum
- Laravel Fortify
- Tailwind

## How to install

Installation is simple. Just like your ordinary Laravel app.

1. `git clone`
2. `cd laravel-vue-starter`
3. `composer install`
4. `cp .env.example .env`
5. `php artisan key:generate`   
6. `npm install`
7. `npm run dev`

## How it works

### Authentication

The project ships with complete authentication boilerplate and includes the following pages:
- Login
- Register
- Forget Password
- Reset Password

### Structure

All the front-end code is located in `resources/js`. The code is well organized in different directories to make things more readable.

- `components` - This is the reusable components home
- `pages` - Here you will add the pages
- `plugins` - The plugins configurations
- `router` -  The router configuration including the middleware and the routes
- `services` - The API services reside here
- `store` - The store configuration
- `utils` - Misc reusable functions and utils

### Examples

The project ships with the `Messages` component that is just an example of the CRUD operations in a Laravel and Vue project. 

You will probably remove the examples once you start developing your app on top of this project.

## Contributions

Pull requests are welcome, feel free to contribute to this project.

## LICENSE

```
Copyright (C) 2021 Darko Gjorgjijoski (https://darkog.com)

This file is part of Laravel Vue Starter

Laravel Vue Starter is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

Laravel Vue Starter is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Laravel Vue Starter. If not, see <https://www.gnu.org/licenses/>.
```
