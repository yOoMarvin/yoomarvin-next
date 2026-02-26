# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 16 portfolio/blog site. No database, no external APIs, no environment variables, no Docker.

**Standard commands** (see `package.json` scripts and `README.md` for details):
- Dev server: `npm run dev` (port 3000)
- Lint: `npm run lint`
- Format check: `npm run format:check`
- Build: `npm run build`

**Node version**: 20 (per CI config in `.github/workflows/ci.yml`). Use `nvm use 20` before running commands.

**Blog content**: MDX files live in `/data/blog/`. They are read from the filesystem at request time via `src/db/blog.js` — no CMS or database involved.

**Lint note**: There is one existing ESLint warning (`@next/next/no-img-element` in `src/app/work/page.js`). This is a pre-existing warning, not a failure.
