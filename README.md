<h1 align="center">🏴‍☠️<br /><br />piratepx</h1>

A simple, privacy-respecting, no cookie, zero JavaScript, 35 byte counter pixel
for websites, mobile apps, server-side APIs, CLIs, and just about anywhere else.

Sign up for free at https://www.piratepx.com!
![piratepx](https://app.piratepx.com/ship?p=54c04676-e9cf-4ca8-8934-78a629eb4a2c&i=app)

## Overview

This repository contains both the backend and frontend of the app to simplify
development and deployment. Other than a few lines of configuration here and
there to make this possible, however, they're pretty much separate codebases.

### Backend

The backend is a JSON REST API built in [Node.js](https://nodejs.org/) using
[Fastify](https://www.fastify.io/) and
[Objection.js](https://vincit.github.io/objection.js/). It persists data to a
[PostgreSQL](https://www.postgresql.org/) database.

The source code is located in the [`api`](api) directory, with configuration
files in the root of this repository (where this README lives).

### Frontend

The frontend is a single-page app built with [Vue.js](https://vuejs.org/) and
[Tailwind CSS](https://tailwindcss.com/).

The source code is fully isolated in the [`web`](web) directory, which is also
where its own configuration files are located.

## Development

The following includes the necessary steps to get the full app setup for
development, with a focus on backend-specific details. See
[`web/README.md`](web/README.md) for frontend-specific details.

### Prerequisites

- [Node.js](https://nodejs.org/) (see `engines.node` in
  [`package.json`](package.json))
- [PostgreSQL](https://www.postgresql.org/) >= v11

[Docker Compose](https://docs.docker.com/compose/) is used to run PostgreSQL as
configured in [`docker-compose.yml`](docker-compose.yml). Once installed, simply
run:

```bash
$ docker-compose up
```

The app itself is not run in a Docker container in development, as it's easy
enough to install the necessary version of Node.js with
[nvm](https://github.com/nvm-sh/nvm):

```bash
$ nvm install
```

### Dependencies

Install dependencies with npm:

```bash
$ npm install
$ cd web && npm install
```

### Config

[dotenv](https://github.com/motdotla/dotenv) is used to load environment
variables from a `.env` file into `process.env`. This file is ignored by version
control to prevent committing secrets.

See [`.env.dist`](.env.dist) for an example.

### Database

#### Create

Ensure PostgreSQL is running, then:

```bash
$ npm run dev:db:create
```

#### Migrations

[Knex.js](https://knexjs.org/#Migrations) is used to manage database migrations,
which are located in [`api/db/migrations`](api/db/migrations).

To run the latest migrations:

```bash
$ npm run knex migrate:latest
```

### Start

Start both the backend and frontend development servers:

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

After development is done in the `development` branch and is ready for release,
it should be merged into the `master` branch, where the latest release code
lives. [Release It!](https://github.com/release-it/release-it) is then used to
interactively orchestrate the release process:

```bash
$ npm run release
```
