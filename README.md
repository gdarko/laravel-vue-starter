<p align="center">
<a href="https://laravel.com" target="_blank"><img src="https://user-images.githubusercontent.com/5760249/132945127-a7d3a4bb-1ffc-4658-8096-c9cfc2f5c3dd.png" width="400"></a>
</p>

# Laravel Vue Starter

The project was created to save myself time for redoing the same things all over again when starting a new Laravel/Vue project.

The main goal of this project is to reduce code and make everything simpler for bootstrapping new projects. 

The project is built with the following components:

- Vue 3 / Vuex / VueRouter
- Vue 3 Composition API
- Vite 3
- Laravel Framework
- Laravel Sanctum
- Laravel Fortify
- Tailwind
- ForkAwesome

## ⚡️ How to install

Installation is simple. Just like your ordinary Laravel app.

1. `git clone`
2. `cd laravel-vue-starter`
3. `composer install`
4. `cp .env.example .env`
5. `php artisan key:generate`   
6. `npm install`
7. `npm run watch` (or if production `npm run build`)

## ⚡️ How it works

### ➡️ Authentication

The project ships with complete authentication boilerplate and includes the following pages:
- Login
- Register
- Forget Password
- Reset Password

Also, the project comes with complete `users` crud that can be taken as an example for building other modals.

### ➡️ Structure

The front-end code is located in `resources/js`. The code is organized in different directories to make things more readable.

| Directory | Description                             |
|-----------|-----------------------------------------|
| views     | The home of the views                   |
| + pages   | The home of the pages                   |
| + icons   | The home of the icons                   |
| + layouts | The home of the global layouts          |
| + utils   | The home of the other utilities         | 
| modules   | The home of the reusable modules        |
| plugins   | The home of the plugins configuration   |
| router    | The home of the router configuration    |
| services  | The home of the API services            |
| store     | The home of the Vuex store              |
| functions | The home of the various other functions |

### ➡️ Examples

The project ships with two examples as follows:

- views/pages/private/dashboard - Shows paginated list of messages with a form for sending a message.
- views/pages/private/users - Shows paginated list of system users along with crud screens.

You will probably remove the examples once you start developing your app on top of this project.

<p><img width="100%" src="https://user-images.githubusercontent.com/5760249/132946970-2e74e2d5-bb13-4190-953d-14e8a7d9b7d7.gif"/></p>

## ⚡️ Contributions

Pull requests are welcome, feel free to contribute to this project.

## ⚡️ License

```
Copyright (C) 2022 Darko Gjorgjijoski (https://darkog.com)

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
