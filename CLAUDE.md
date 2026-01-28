# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for a UI/UX Designer, built as a React SPA. All content is managed through markdown files with YAML frontmatter — there is no database or CMS.

## Commands

- `npm run dev` — Start Vite dev server with hot reload
- `npm run build` — Type-check with `tsc -b` then build with Vite (output: `dist/`)
- `npm run lint` — Run ESLint
- `npm run preview` — Preview the production build locally
- `npm run fetch-articles` — Fetch new Medium articles via RSS and save to content

## Tech Stack

React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion, React Router DOM 7. Deployed to Netlify.

## Architecture

### Content System (Markdown-Driven)

All site content lives in `src/content/` as markdown files with YAML frontmatter. Each content type has a corresponding parser module in `src/lib/` that:

1. Imports markdown as raw strings via Vite (`?raw` suffix)
2. Parses frontmatter and structured key-value sections with custom regex parsers (not using `gray-matter` at runtime — the parsers are hand-rolled in each lib module)
3. Resolves image paths using `import.meta.glob` to map relative paths (`./images/foo.jpg`) to Vite-optimized URLs
4. Caches parsed results in module-level variables

Content types and their parsers:
- `src/content/works/{slug}/index.md` → `src/lib/projects.ts` (each project is a subfolder with its own `images/` dir)
- `src/content/articles/index.md` → `src/lib/articles.ts` (all articles in one file, sections split by `# ` headings)
- `src/content/experience/index.md` → `src/lib/experience.ts`
- `src/content/about/index.md` → `src/lib/about.ts`
- `src/content/illustrations/index.md` → `src/lib/illustrations.ts`
- `src/content/home/index.md` → `src/lib/home.ts`

### Adding a New Project

1. Create `src/content/works/{slug}/index.md` with frontmatter (title, description, company, category, tags, coverImage, images, featured, order, year)
2. Add project images to `src/content/works/{slug}/images/`
3. Add the raw markdown import and register the slug in `src/lib/projects.ts` (`projectFiles` map)

### Routing

All routes are defined in `src/App.tsx` using React Router. Pages are in `src/pages/`, exported via `src/pages/index.ts`. The `Layout` component wraps all routes with Header/Footer.

Routes: `/`, `/works`, `/works/:slug`, `/about`, `/articles`, `/illustrations`, `/experience`

### Path Alias

`@/*` maps to `./src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

### Theming

Dark/light mode via CSS custom properties in `src/index.css`. Toggle component at `src/components/ThemeToggle.tsx`. Use `.light-only` / `.dark-only` CSS classes for theme-conditional rendering.

### Medium Article Fetcher

`scripts/fetch-medium-articles.ts` fetches from Medium RSS, downloads cover images, and appends new articles to `src/content/articles/index.md`. Configure the Medium username in `medium.config.ts`.

### SEO

The `useSEO` hook (`src/hooks/useSEO.ts`) dynamically sets document title and meta tags per page. Site-wide config (title, description, keywords) lives in `src/lib/data.ts`.
