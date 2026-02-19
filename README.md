# call-dashboard

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

## Backend (Auth API)

The backend lives in `backend/` and provides:

- `POST /auth/login` (JWT)
- `GET /auth/me`
- `POST /admin/users` (admin-only create user)
- `GET /admin/users` (admin-only list users)
- `GET /users/me` and `GET /users/me/ratings`

### Seed initial admins

This seeds the first admin user:

- email: `jax@gmail.com`
- password: `password123`

Add the rest of your admins in `backend/scripts/seed-admins.js` (array at the top), then run:

```sh
npm run backend:seed:admins
```

### Run the backend

```sh
npm run backend:dev
```

### Compile and Minify for Production

```sh
npm run build
```
