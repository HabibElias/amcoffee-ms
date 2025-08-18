# AMCoffee Nuxt App

This is the AMCoffee management system, built with Nuxt 4, Drizzle ORM, Turso (SQLite), Tailwind CSS, and Shadcn UI. It provides a modern, full-stack solution for managing coffee shop operations.

## Features

- Nuxt 4 (Vue 3) with SSR
- Drizzle ORM for database access
- Turso (local SQLite) for development
- Tailwind CSS for styling
- Shadcn UI components
- Color mode (dark/light)
- Eslint & Husky for code quality

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Development

Start the dev server (and local DB):

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Linting

```bash
pnpm lint
```

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

- `app/` - Main app source (components, pages, layouts, plugins)
- `lib/` - Auth, env, and utility helpers
- `db/` - Drizzle ORM config, schema, and migrations
- `public/` - Static assets

## Database

Uses Turso (local SQLite) for development. Migrations are managed with Drizzle Kit.

## Useful Commands

- `pnpm dev` - Start dev server and DB
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run linter
