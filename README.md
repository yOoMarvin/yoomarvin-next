# marvinmessenzehl.com

The code that powers [marvinmessenzehl.com](https://marvinmessenzehl.com).

## Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: TypeScript (strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4
- **Content**: [Notion API](https://developers.notion.com/) for writing, static data files for work
- **Animation**: [Motion](https://motion.dev/)
- **Icons**: [Iconoir](https://iconoir.com/)
- **Deployment**: [Vercel](https://vercel.com)

## Running locally

```bash
git clone git@github.com:yOoMarvin/yoomarvin-next.git
cd yoomarvin-next
npm install
```

Copy the environment template and fill in your Notion credentials:

```bash
cp .env.example .env.local
```

Start the dev server:

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Project structure

See [docs/architecture.md](docs/architecture.md) for full details.

```
src/
├── app/          ← pages and layouts
├── components/   ← UI and feature components
├── lib/          ← data layer, utilities, Notion client
└── styles/       ← global CSS and design tokens
```

## Documentation

- [Design System](docs/design-system.md) — colors, typography, spacing
- [Architecture](docs/architecture.md) — stack, conventions, file structure
- [Motion Principles](docs/motion-principles.md) — animation guidelines
- [Craft](docs/craft.md) — micro-polish details
