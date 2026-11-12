# Next Job Tracker

A job application tracker built with [Next.js](https://nextjs.org), bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It tracks applications (company, role, status, notes) and their interviews, stored in PostgreSQL.

## Features

- **Dashboard** (`/`): summary stats across your applications.
- **Job list** (`/jobs`): every application, newest first, with its status and interview count.
  - **Search**: filter by company or role (case-insensitive). The search box is debounced (300 ms) and syncs to the `?q=` URL param, so searches can be shared or bookmarked. `%` and `_` match literally, not as wildcards.
  - **Collapsible "Applications" section**, expanded by default.
  - **Delete** an application from its card.
- **New job** (`/jobs/new`): a form with server-side validation. Once the job is saved you land back on `/jobs` and see a one-off "Job Created" toast.
- **Job details** (`/jobs/[id]`): placeholder page (work in progress).

## Tech stack

- Next.js 16 (App Router) with `cacheComponents` and `partialPrefetching` turned on, React 19, TypeScript (strict)
- Tailwind CSS v4 and [shadcn/ui](https://ui.shadcn.com) (`base-nova` style, built on [Base UI](https://base-ui.com)), with [Lucide](https://lucide.dev) icons
- PostgreSQL 17 (Docker Compose), accessed via [`pg`](https://node-postgres.com)

## Getting Started

### 1. Start the database

You need Docker. Start Postgres, then create the tables and, if you want sample data, seed them:

```bash
npm install
npm run db:up       # start Postgres in Docker (port 5432)
npm run db:schema   # create the jobs and interviews tables
npm run db:seed     # optional: insert sample data
```

Create a `.env.local` file that points at the database (these credentials match `compose.yaml`):

```bash
DATABASE_URL=postgres://tracker:tracker@localhost:5432/job_tracker
```

### 2. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Scripts

| Script                                    | Description                                         |
| ----------------------------------------- | --------------------------------------------------- |
| `npm run dev`                             | Dev server (Turbopack)                              |
| `npm run build` / `npm start`             | Production build and server                         |
| `npm run lint`                            | ESLint                                              |
| `npm run lint:css`                        | Stylelint                                           |
| `npm run format` / `npm run format:check` | Prettier                                            |
| `npm run db:up` / `npm run db:down`       | Start or stop the Postgres container                |
| `npm run db:schema`                       | Apply `db/schema.sql`                               |
| `npm run db:seed`                         | Load `db/seed.sql`                                  |
| `npm run db:drop`                         | Drop tables via `db/drop.sql`                       |
| `npm run commit`                          | Commitizen prompt for a Conventional Commit message |

## Project structure

```
app/                  Routes: / (dashboard), /jobs, /jobs/new, /jobs/[id]
components/           Shared components (CollapsibleSection, EmptyState, ToastMessage, ...)
components/ui/        shadcn/ui components
features/dashboard/   Dashboard stats components
features/jobs/        Job feature: data.ts (queries), actions.ts (server actions),
                      types.ts, components/, hooks/ (useDebounceValue)
lib/                  DB pool (db.ts) and utilities
db/                   SQL schema, seed and drop scripts
```

## Contributing

Git hooks (Husky) run lint-staged (ESLint, Stylelint, Prettier) on commit. Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org) (`feat: …`, `fix: …`, `chore: …`) because commitlint checks them. Use `npm run commit` for a guided prompt.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Production deployments also need a reachable PostgreSQL database, with `DATABASE_URL` set in the environment.
