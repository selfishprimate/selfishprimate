---
title: "Gerillass: A Sass Library a Coding Agent Can Actually Use"
description: "A five year old Sass toolkit rebuilt on the module system, given a machine-readable manifest the test suite refuses to let drift, and folded into one repository with the site and documentation it had been living apart from."
company: "Gerillass"
category: "Developer Tool"
tags: ["Sass", "Open Source", "Developer Tools", "Design Systems", "AI Tooling", "Documentation"]
coverImage: "./images/cover.jpg"
images: []
order: 7
year: "2026"
featured: true
featuredOrder: 3
---

> "Documentation drifts away from code in most projects, quietly. An agent reading stale docs writes code that does not work."

### Overview

Gerillass is a Sass library I started as a personal collection of mixins and released publicly in 2021. It has 53 mixins and 23 functions, and it is installed by other people's projects, which makes every change a compatibility question rather than a preference.

This is what happened to it over one week in September 2026. The library moved onto the Sass module system, which Dart Sass 3.0 makes mandatory. It gained a machine-readable description of its own API that the test suite will not let go stale. And the marketing site and the documentation — two separate repositories, on two domains, with nothing connecting either to the library — were folded into the library's own repository as a single application.

<gallery cols="1">
<figure src="./images/home.jpg" alt="The Gerillass home page">gerillass.com, rebuilt as a statically generated Vite application and served from the library's own repository</figure>
</gallery>

### The Problem an Agent Has With a Library This Size

A library with a few thousand weekly installs has essentially no training data behind it. Ask a coding agent to use Gerillass and it will not refuse — it will guess the argument forms, and Sass will let it. An unknown function is not an error in Sass: the call is emitted as literal CSS and the build passes. You get a stylesheet with `remify(24px)` sitting in it as text.

That failure mode is worse than a crash, because nothing surfaces it. So the fix could not be a better README. It had to be something an agent reads mechanically, and something that cannot quietly stop being true.

### A Manifest That Cannot Drift

Three generated files now ship with or alongside the package:

- **`gerillass.json`** — every mixin and function: its signature, what each argument accepts, examples that compile, and inputs that are refused. It resolves through the package's `exports` map, so an agent working in someone's project reads it straight out of `node_modules/gerillass/`.
- **`SKILL.md`** — a written guide generated from that manifest, in the [Agent Skills](https://code.claude.com/docs/en/skills) format, so it can be dropped into a project's skills folder.
- **`llms.txt`** — the same manifest shaped for the documentation site, following the [llmstxt.org](https://llmstxt.org/) convention.

None of the three is written by hand. Signatures are parsed from the Sass sources; the semantics come from a separate set of notes, so nobody can describe a mixin that does not exist.

The part that actually matters is what the test suite does with them. It compiles every example the manifest contains. It takes every input the manifest claims is refused and checks that the library really refuses it, with its own error message rather than an internal Sass one. It runs every example a second time under the `gls-` prefixed name and requires byte-identical CSS. And it fails the build if either generated file is out of date.

So the manifest cannot claim behaviour the library does not have. That is the whole point of it — not that the docs are thorough, but that they are load-bearing. The suite is at 436 tests and 143 snapshots.

### Moving to the Sass Module System

Version 2.0.0 took the library off `@import` and onto `@use`/`@forward`, and off the global built-ins onto namespaced ones. Dart Sass 3.0.0 removes both, so this was a deadline rather than a preference.

Two things broke, and one of them was not a style decision. All 22 utility functions carried a `__` prefix — and under `@use`, a member whose name starts with `_` is private to its own file. The prefixed names could not survive the migration at all. Worse, with `@use "gerillass" as *` they did not fail loudly: they compiled to literal CSS, the same silent failure an agent hits. Nineteen were a find and replace. Three needed new names, because `__darken` and `__lighten` shadow Sass built-ins silently and `__null` collides with a keyword.

The other break was a consolidation. `ratio-box` and `responsive-video` both held an aspect ratio with a padding-top hack, a pseudo-element and an absolutely positioned child. CSS `aspect-ratio` is Baseline Widely Available, which had left the two of them byte-identical to each other and wrapping barely more than one declaration. They became a single `aspect-ratio` mixin that closes the three gaps the bare CSS property leaves open — each measured in a browser rather than assumed: an `<img>` with a ratio and no `object-fit` is stretched rather than cropped; an `<iframe>` carries a 2px default border, so `width: 100%` overflows its container by 4px; and the ratio has to sit on the element, not on a wrapper.

Every `gls-` prefixed call site still works, because the prefixed half of the API is now one line: `@forward "library" as gls-*`. Apart from the two removals, no valid call changed its output, verified by snapshotting the CSS of every documented invocation before and after each step.

### What 2.1.0 Added

Four members, chosen where the API had a hole rather than where a list looked short:

- **`container` and `container-query`** — the responsive API was `breakpoint`, which is media queries, and component-level responsiveness had nothing at all. `container-query` takes the same argument shapes as `breakpoint`, so the two read alike.
- **`line-clamp`** — truncating after several lines, where `ellipsis` does one. It emits five declarations because `-webkit-line-clamp` does nothing on its own, and each of the four ways it silently fails was measured.
- **`fluid`** — a function returning a `clamp()` value that grows with the viewport. A function rather than a mixin because the value belongs to any property, not only `font-size`. It keeps a `rem` term instead of being pure `vw`, which is not cosmetic: under browser text zoom the rem-bearing value moved from 20.83px to 34.17px while a `vw`-only equivalent did not respond at all. A `vw`-only fluid value fails WCAG 1.4.4.

Plus one accessibility fix: `loadify` ignored `prefers-reduced-motion`. Switching the animation off would have been worse than the bug — the element starts invisible and the animation is what reveals it, so the content would have stayed hidden for good. Under reduced motion the end state is now applied directly.

### One Repository

The library, `gerillass.com` and `docs.gerillass.com` were three repositories on two domains, and nothing connected a mixin to the page describing it. Two things went wrong while shipping 2.1.0 because of it: `llms.txt` shipped pointing at a documentation page that did not exist, and eighteen function pages were reported missing twice when they had existed the whole time.

Neither was a discipline problem. Both are what happens when the only way to answer *"does this member have a page?"* is to fetch a website. In one repository that question is a test.

So the sites moved in. One Vite application now serves the marketing site with the documentation mounted under `/docs` — 80 documentation pages, one router, one build, one deploy. Every route is generated as a real HTML file at build time; the build writes 86 of them. The site is styled entirely with Gerillass, resolved through a load path to the library beside it rather than a published copy, so it is always built against the code it advertises.

<gallery cols="1">
<figure src="./images/docs.jpg" alt="A Gerillass documentation page">Documentation now lives at gerillass.com/docs, generated from the same repository as the mixin it describes</figure>
</gallery>

### Search and the Playground

The site gained a command palette over every mixin, function and page — the thing a library of 76 members needs and did not have.

<gallery cols="1">
<figure src="./images/search.jpg" alt="The site's search command palette">Search across mixins, functions and pages, with each member's own one-line description</figure>
</gallery>

The playground compiles Sass to CSS as you type, with the whole library already loaded, a version selector and a shareable URL. It is the same problem a documentation example solves, so both are built on one renderer.

<gallery cols="1">
<figure src="./images/playground.jpg" alt="The Gerillass playground">The playground: Sass on the left, the CSS Gerillass generates on the right, compiled in the browser</figure>
</gallery>

### The Repository as a Workspace

The work was done with Claude Code, and the repository was set up so that the next session does not have to rediscover how the project works. Four skills cover the tasks that recur — adding a member, writing a sass-true test, auditing the library, cutting a release — each one written because a step in it fails silently if you skip it.

Four hooks run on the repository rather than on trust: they regenerate the manifest when the sources change, check the counts the documentation claims against the counts the repository has, check that a release being prepared has its notes, and refuse a dependency change that was not asked for.

And `tools/audit.js` does the thing a test suite cannot. `npm test` only checks inputs somebody already thought of; the audit throws arguments nobody wrote a test for at all 53 mixins and all 23 functions, at every argument position, and reports what the library does with them. That is how thirteen mixins that silently emitted nothing were found.

### Where It Stands

Version 2.1.0. 53 mixins, 23 functions, 436 tests, 143 snapshots. One repository holding the library, its site, its documentation and the description of itself that all three are generated from.

### Installation

```bash
npm install gerillass --save-dev
```

```scss
@use 'gerillass' as *;

.avatar { @include circle(50px); }
```

### Links

- [Gerillass Website](https://gerillass.com/)
- [Documentation](https://gerillass.com/docs)
- [GitHub Repository](https://github.com/selfishprimate/gerillass)
- [npm Package](https://www.npmjs.com/package/gerillass)
