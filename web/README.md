# 🏴‍☠️px Web

This README pertains to the frontend of the piratepx app, which is a single-page
app built with [Vue.js](https://vuejs.org/) and
[Tailwind CSS](https://tailwindcss.com/).

See the [README](../README.md) in the root of the repository for details on the
backend and setting up the full app for development.

## Development

[Vite](https://github.com/vitejs/vite) is used to develop and build the app. See
their [docs](https://github.com/vitejs/vite#readme) for specifics not covered
here.

### Prerequisites

The only prerequisite is a compatible version of [Node.js](https://nodejs.org/)
(see `engines.node` in [`package.json`](package.json)).
[nvm](https://github.com/nvm-sh/nvm) is the recommended installation method:

```bash
$ nvm install
```

### Dependencies

Install dependencies with npm:

```bash
$ npm install
```

### Start

Start the development server:

```bash
$ npm run dev
```

### Code Style & Linting

[Prettier](https://prettier.com/) is setup to enforce a consistent code style.
It's highly recommended to
[add an integration to your editor](https://prettier.io/docs/en/editors.html)
that automatically formats on save.

[ESLint](https://eslint.org/) is setup with the
["recommended" rules](https://eslint.org/docs/rules/) to enforce a level of code
quality. It's also highly recommended to
[add an integration to your editor](https://eslint.org/docs/user-guide/integrations#editors)
that automatically formats on save.

To run via the command line:

```bash
$ npm run lint
```

## Releasing

The frontend is built and released with the backend for convenience. See the
[README](../README.md) in the root of the repository for further details.

### Production Build

The production-optimized single-page app can be built by running:

```bash
$ npm run build
```

This creates a `dist` directory with the files.
