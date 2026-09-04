# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Branch: the Jonas direction

This branch carries a full visual redesign. The architecture below is unchanged
from `main` — content system, parsers, routing, SEO and deployment all work the
same way. What changed is the design language.

The reference is `jonas-template.framer.website`, and the numbers below were
**measured off it with `getComputedStyle`**, not estimated from screenshots.
That distinction matters: a scaled screenshot is not in CSS pixels, and reading
the layout off one produced a first attempt at roughly two-thirds the container
width and half the type size — recognisably a different design.

The measured spec:

| | Value |
| --- | --- |
| Container | 1280px, centred |
| Grid | two 620px columns, 40px gap |
| Font | Inter |
| Hero / closing line | 64px, 600, `-0.025em`, line-height 1.05 |
| Section headings | 32px, 600, `-0.02em` |
| Body copy | 22px, 400, line-height 1.6 (the reference's 28/1.4, corrected — see below) |
| List items, card titles | 20px, 600, `-0.02em` |
| Dates, subtitles | 20px, grey |
| Navigation | 18px, 500 |
| Ink / faded / nav grey | `#000000` / `#757575` / `#525252` |
| Card | `#F7F7F7`, image flush, 24px caption padding |

The corner radius is **not** from the reference — it is `--radius-card`, 24px,
exposed as `rounded-card`. Everything that gets rounded uses it, so the site
has one corner and changing it is a one-line edit.

It is a **large-type design**. Treating it as a small-type one is the single
easiest way to build something that looks nothing like it.

**Body copy is the one place the reference is not followed.** It sets prose at
28px on a 1.4 leading, but it only ever runs three short paragraphs at that
size. This site has a full bio, About notes and long case studies, and 28/1.4
is tiring over that length — so `.j-body` tops out at 22px on a 1.6 leading,
and the case-study `.prose` runs 19px on 1.7 inside a 760px column, which lands
at roughly seventy characters a line. Measure matters as much as size: the
prose column is capped for that reason, not to save space.

Every page uses that same scale, and each size has one job:

- **64px** (`.j-display`) — the home hero, each page's opening line, and the
  closing sentence in the footer. Nothing else.
- **32px** (`.j-heading`) — section headings only.
- **22px** (`.j-body`) — prose blocks: the bio, the About notes, a page's
  standfirst. Never a list.
- **20px** (`.j-item`) — list-shaped things: card captions, skills, clients,
  company names.
- **18px** (`.j-meta`) — dates, and the descriptions in the Writing and
  Experience rows.
- **18px** (`.j-nav`) — navigation and the case-study table of contents.

A page's opening line takes its long description as `description`, which renders
at 28px underneath rather than as the grey half of the 64px sentence — a
paragraph does not belong at display size, however much the design likes big
type.

The staggered look does **not** come from offsetting one column. Every card
starts at the same top; the columns fall out of step because the cards carry
different image aspect ratios. `StaggeredGrid` reproduces this with a
five-long cycle of aspect classes, coprime with the two columns so the phase
keeps shifting down the page rather than repeating every other row.

Card captions run the case-study title first, the client underneath it in
grey.

**There is no theme toggle.** The header carries GitHub, Medium and LinkedIn
marks where the toggle used to be, and `ThemeToggle` is gone. The `.dark`
palette and the pre-paint script in `index.html` are still here and still work
if `localStorage.theme` is set to `dark` by hand, but nothing in the interface
sets it — so in practice this is a light-only design. Delete both if that is
the intent; leaving them is only worth it if a toggle is coming back.

## Project Overview

Personal portfolio site for a Product Designer (selfishprimate.com), built as a React SPA and deployed to Netlify. All content is authored as markdown in `src/content/` and compiled into the bundle — there is no database, CMS, or runtime data fetching.

There is **no test framework** in this repo. `npm run build` (which type-checks via `tsc -b` first) is the real verification step.

`npm run lint` is clean — keep it that way. The config enables the React Compiler rules, which reject manual `useMemo`/`useCallback` whose declared dependencies don't match what the compiler infers. In practice that means: don't wrap event handlers in `useCallback` just to attach them in an effect (define them inside the effect instead), and keep `useMemo` dependencies on primitives the compiler can verify rather than on objects it may consider mutable.

## Commands

- `npm run dev` — Vite dev server (port 5173)
- `npm run build` — Runs `prebuild` (regenerates `public/sitemap.xml`), then `tsc -b` and `vite build` → `dist/`
- `npm run lint` — ESLint over the repo
- `npm run preview` — Serve the production build locally
- `npm run fetch-articles` — Pull new Medium posts via RSS and append them to `src/content/articles/index.md`
- `npm run generate-sitemap` — Rebuild `public/sitemap.xml` from static routes + `src/content/works/*` directory names
- `npm run generate-favicons` — Regenerate favicons from `public/images/sp-favicon-base.png` via sharp

Note: any build regenerates `sitemap.xml` with today's `lastmod` on every entry, so it will show as modified after a build even when nothing meaningful changed.

## Architecture

### Content system (markdown-driven)

Each content type has a parser module in `src/lib/` that:

1. Imports markdown as a raw string via Vite's `?raw` suffix
2. Parses it with **hand-rolled regex parsers** — there is no markdown/frontmatter library in the dependency tree
3. Resolves `./images/...` references through `import.meta.glob(..., { eager: true, query: '?url' })` into hashed Vite asset URLs
4. Caches the parsed result in a module-level variable — including `getProjects()`, which components call freely on every render

| Content | Source | Parser |
| --- | --- | --- |
| Projects | `src/content/works/{slug}/index.md` (+ per-project `images/`) | `src/lib/projects.ts` |
| Works page meta | `src/content/works/index.md` (frontmatter only) | `src/lib/projects.ts` → `getWorksMeta()` |
| Articles | `src/content/articles/index.md` | `src/lib/articles.ts` |
| Experience | `src/content/experience/index.md` | `src/lib/experience.ts` |
| About | `src/content/about/index.md` | `src/lib/about.ts` |
| Illustrations | `src/content/illustrations/index.md` | `src/lib/illustrations.ts` |
| Home | `src/content/home/index.md` | `src/lib/home.ts` |

**Two different markdown conventions — don't mix them up:**

- **Works** — one folder per project. Frontmatter is metadata; the body is free-form case-study markdown.
- **Everything else** — a single file whose frontmatter holds page meta (`label`, `title`, `description`) and whose body is a list of records split on `\n# ` headings, with `key: value` lines inside each record. Some values are comma-split into arrays (`tags`, `skills`, `items`).

**Section headings are matched by exact string.** `home.ts` and `about.ts` compare `headerLine === '# Quote'` and friends, so renaming a heading silently drops that section to empty defaults rather than erroring:

- `home/index.md`: `# Quote`, `# Featured Work`, `# Experience Preview`, `# CTA Section`, `# Social`
- `about/index.md`: `# Profile`, `# Bio`, `# Quote`, `# Social`, `# What Sets Me Apart`, `# Open Source`, `# The Handle`, `# Skills`, `# Domains`, `# Beyond Design`

`articles.ts`, `experience.ts` and `illustrations.ts` instead treat every `# ` heading as one record's title, so headings there are free-form.

Also note the frontmatter parsers split on `': '` (colon **plus space**) in most modules — a value containing `: ` splits at the first occurrence, and `key:value` without a space is skipped entirely.

### Custom markdown tags in case studies

`ProjectPage` splits project body content on custom XML-ish tags before handing the remaining prose to `react-markdown` (with `remark-gfm`). These are matched by regex in `src/pages/ProjectPage.tsx`, so attribute order and spelling must match exactly:

```html
<gallery cols="1|2|3|4">
<figure src="./images/foo.jpg" alt="Alt text">Caption, supports inline markdown links</figure>
</gallery>

<figma src="https://embed.figma.com/..." height="600" title="Design" />
<youtube src="VIDEO_ID" title="Title" />
```

Every `<figure>` inside a `<gallery>` is collected into a lightbox (arrow keys, Esc, click-to-zoom on non-touch devices). Images that should open in the lightbox must go through `<gallery>` — plain markdown `![]()` images render inline and bypass it.

### Project metadata behaviour (`src/lib/projects.ts`)

- `draft: true` in frontmatter removes a project from the site entirely.
- Listing order: projects with an `order` come first, ascending; the rest follow sorted by `year` descending.
- The home page uses `featured: true` sorted by `featuredOrder` ascending.
- The `images` and `category` frontmatter fields are parsed into the `Project` type but **no component reads them** — case-study imagery comes from `<gallery>` tags in the body.

### Shared components (Jonas)

- `PageLede` — the two-tone sentence at 64px. `title` in ink, optional `fade`
  in grey.
- `BlockLabel` — the 20px bold line that opens the work grid, with an optional
  grey `meta` half (`Featured work · 2021–2026`).
- `LabelledRow` — 32px heading left, content right. Every block below the work
  grid uses it, which keeps the page on one spine.
- `WorkGrid` — the two-column card grid, used by the home page and the work
  index.
- `ProjectCard` — grey card, image flush to its edges, 24px caption, fixed
  height.
- `RowTile` — the image half of a Writing row: a square thumbnail on the card
  grey at the card radius, matching the square company marks on Experience.

**Writing and Experience are lists, not grids.** Both run down the page in one
column — a square image on the left, all the writing right at the 620px
measure, hairline rules between rows. Row titles sit at 32px so each list has a
head of its own.

The image column is sized to the image, not the other way round: 160px for a
Writing cover, 80px for a company mark. Leave the column wider than the image
and the gap to the text opens up on one page but not the other, which is what
makes the two lists stop matching.

Writing covers get the grey tile; Experience logos do not. A company mark
carries its own shape and its own background, and boxing it only fights that.

`HeroWave` sits full-bleed behind the opening section of **every** page, pulled
up past the top of that section so the surface continues behind the header —
which has no background of its own and so sits in the water. It is a lit water
surface drawn in monospace, and three things make it read as water rather than
as a pattern:

- **The waves are sharpened.** Each component is a sine raised to a power,
  because real swell has narrow crests and broad troughs.
- **The surface is lit, not shaded by height.** A normal is taken off the height
  field and run through diffuse plus a soft specular. Height alone gives you
  stripes; a normal gives you a surface.
- **It recedes, shallowly.** Coordinates divide by a depth that grows toward the
  top. Widen that range and the whole field collapses into radial streaks
  converging on the top edge — the range is small on purpose.

The page is white, so luminance is inverted on the way out: lit crests leave the
paper bare and the shadowed side of a crest fills with characters. The ramp
stops short of a solid glyph, which is what stops it becoming a block of texture
however the light is tuned.

There are six models — `swell`, `chop`, `ripples`, `interference`, `roll` and
`caustics` — and each is only a height function plus how hard it recedes. One is
chosen at random when the component mounts, never repeating the one before it,
so a refresh changes the water and so does moving between pages. Pass `model` to
pin one while comparing them.

`extent` decides how far down it runs. The default `band` is a fixed 560px from
the top of the page, which is what every page but the home page wants — there is
no reason for the water to follow a long page header all the way down. The home
hero passes `extent="section"` and fills its section instead.

It evaluates the sines once per cell into a buffer and reads neighbours from it
for the normal, repaints at about 18fps rather than 60, and holds a single still
frame under `prefers-reduced-motion`. It is hidden below `md`.

Sections that carry it need `relative isolate`: the wave sits at `-z-10`, and
without the isolation it would drop behind the page background rather than
behind the section's own content.

`SectionHeading` from `main` is gone; `PageLede` + `BlockLabel` replace it.

`home.ts` parses one extra frontmatter key, `headlineFade`, so the hero's grey
half stays authored in markdown rather than hardcoded. It is optional.

Two content sections on the home page are derived rather than authored:
**Selected clients** is the unique `company` values across all projects, and the
year range next to *Featured work* is computed from their `year` fields. Neither
can drift from the case studies.

### Adding a new project

1. Create `src/content/works/{slug}/index.md` with frontmatter (`title`, `description`, `company`, `tags`, `coverImage`, `featured`, `featuredOrder`, `order`, `year`, optional `draft`)
2. Put images in `src/content/works/{slug}/images/`
3. Add a `?raw` import **and** register the slug in the `projectFiles` map in `src/lib/projects.ts` — the `import.meta.glob` only covers images, so a project missing from that map simply won't exist

### Renaming a project slug

Slugs are public URLs. When renaming, add a 301 line to `public/_redirects` (the SPA fallback `/* /index.html 200` must stay last) and re-run `npm run generate-sitemap`.

### Table of contents

`TableOfContents` re-parses raw markdown for `##`–`####` headings and derives anchor ids with `generateSlug` from `src/lib/slug.ts`; `ProjectPage` applies that same helper to the rendered `h2`/`h3`/`h4`, so both must keep importing it from there rather than redefining it. Case-study headings must use `##`/`###`/`####` to appear in the sidebar TOC, and the sidebar itself only renders at `lg` and above.

### Routing

Routes are declared in `src/App.tsx`. Every page is `lazy()`-loaded for code splitting and re-exported from `src/pages/index.ts`. `Layout` wraps all routes with Header/Footer around an `<Outlet />`; `ScrollToTop` resets scroll on navigation. Page-level entrance animation is done per-page with Framer Motion `initial`/`animate` (and `whileInView` for below-the-fold sections) — there is no shared route transition wrapper.

Routes: `/`, `/works`, `/works/:slug`, `/about`, `/articles`, `/illustrations`, `/experience`, `*` (404).

### Styling and theming

Tailwind CSS 4 via `@tailwindcss/vite`, configured entirely in `src/index.css` — there is no `tailwind.config.js`.

**Jonas** repurposes `--color-surface`: it is the card grey, `#F7F7F7`, and
nothing else uses it.

The type scale lives in `@layer components` so Tailwind utilities can still
override it (declared outside a layer these would beat every utility — this has
bitten this repo before). Each class is one row of the measured table above:

- `.j-display` — 64px hero
- `.j-heading` — 32px section heading
- `.j-body` — 28px body copy
- `.j-item` — 20px list item, card title, company name
- `.j-meta` — 20px date and quiet metadata
- `.j-nav` — 18px navigation
- `.j-fade` — the grey half of a two-tone sentence

Theming works **only through CSS custom properties**, not Tailwind's `dark:` variant (no `dark:` utility appears anywhere in the codebase):

- `@theme` in `index.css` declares the light palette (`--color-background`, `--color-surface`, `--color-text-primary/secondary/tertiary`, `--color-border`, `--color-accent`).
- A plain `.dark { ... }` block re-declares the same variables with dark values.
- `ThemeToggle` adds/removes `.dark` on `document.documentElement` and persists the choice in `localStorage` under `theme`. **Light is the default** on this branch when nothing is stored.
- An inline script at the top of `index.html` applies the same class before first paint, so the light palette doesn't flash for dark-mode visitors. It duplicates `ThemeToggle`'s default on purpose — change one and you must change the other.
- Because utilities like `bg-background` compile to `var(--color-background)`, every themed color follows automatically. New colors must be added as `@theme` variables *and* overridden in `.dark` — a hardcoded hex will not adapt.
- Assets that can't be recolored use the `.light-only` / `.dark-only` class pair (logo in Header/Footer, hero ornament on HomePage). `.hero-ornament` gets extra opacity damping in dark mode.

Typography: `--font-sans` and `--font-serif` are **both** Geist Sans (loaded from a jsDelivr `@fontsource` CDN import), so the `font-serif` utility is effectively an alias used to mark headings, not an actual serif. The only real serif is Instrument Serif, applied globally to `i`, `em` and `.italic` — which is why accent words in headings are wrapped in `<span className="italic">`.

Layout convention (**Jonas**): every page, including `ProjectPage` and the
header and footer, uses `mx-auto w-full max-w-[1280px] px-6 md:px-10`.

Watch the `ch` unit: it resolves against the element's *own* font size. Putting
a `max-w-[24ch]` on a wrapper whose children carry the large type gives a
measure several times too narrow. Put the measure on the element that has the
font size.

`index.css` also owns the `.prose` markdown styles, `.skip-link`, `.sr-only`, focus-visible rules and a `prefers-reduced-motion` reset.

### SEO

Two sources of head metadata, and they overlap:

- `index.html` carries static title/description/OG/Twitter/canonical tags plus the Google Analytics (`G-66XZN25NK2`) snippet. These are what crawlers that don't run JS see.
- The `useSEO` hook (`src/hooks/useSEO.ts`) imperatively **overwrites** title, description, canonical, OG/Twitter meta and a single JSON-LD block on every route change. Each page calls it itself.

Site constants (`SITE_URL`, base title, default OG image, Twitter handle) and the `schemas` / `generateTitle` helpers live inside `useSEO.ts`. `src/lib/data.ts` exports a separate `siteConfig` used only by `Footer` for social links and the copyright name — the two overlap and can drift.

`public/sitemap.xml` is generated, not hand-edited; new static routes must be added to `staticRoutes` in `scripts/generate-sitemap.ts`.

### Medium article fetcher

`scripts/fetch-medium-articles.ts` reads the RSS feed for the username configured in `medium.config.ts`, downloads cover images into `src/content/articles/images/`, and appends only new entries (deduplicated by URL) to `src/content/articles/index.md`. Existing content is preserved.

### Path alias

`@/*` → `./src/*`, configured in both `tsconfig.json` and `vite.config.ts`. Components and pages import via `@/`; the `src/lib/*` parsers use relative paths for their `?raw` content imports.

### Deployment

Netlify (`netlify.toml`): build `npm run build`, publish `dist`, Node 20, with a catch-all SPA rewrite. `public/_redirects` also ships in the build and takes effect on Netlify — it holds the 301s for renamed project slugs ahead of its own SPA fallback.

## Related branches

`redesign/editorial-portfolio` holds an in-progress light-only editorial redesign with a different design language (Space Grotesk/Inter/Space Mono, no dark mode, a shared `PageTransition` route animation). It has its own `CLAUDE.md` describing that architecture — this file documents `main` only.
