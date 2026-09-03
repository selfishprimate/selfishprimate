---
title: "Invisible Technologies: A Design System Token Architecture on Tailwind and shadcn"
description: "A token foundation for a Tailwind and shadcn design system, built in Figma and kept in sync with code through Claude Code, so design and development speak the same language."
company: "Invisible Technologies"
category: "Design System"
tags: ["Design System", "Design Tokens", "Tailwind CSS", "shadcn/ui", "Figma", "Claude Code"]
coverImage: "./images/cover.jpg"
images: []
order: 0
year: "2026"
---

> "A design token is a decision, recorded once, in a form both people and machines can read."

### Overview

Invisible Technologies' product UI runs on Tailwind and shadcn, but its design tokens were a thin, hand maintained layer with no primitive or semantic structure. We rebuilt the token foundation in Figma and wired it to code, so the system has a real architecture that stays in sync and reads the same in design and development.

### Objectives

- A two layer model: raw primitives and property scoped semantic roles
- Tokens native to Tailwind v4 and shadcn compatible
- Figma as the single source of truth, mirrored to code automatically
- Zero drift between what designers name and what developers write

### The Problem

The tokens were an ad hoc bridge. Hand written CSS variables mapped to shadcn names, which mapped to Tailwind, with no separation of raw values from roles and dimensions hardcoded across components. Adding a color or retuning a scale meant editing many files, and design and code drifted apart.

### Approach: Figma inside Claude Code

The entire build ran inside Claude Code connected to Figma over MCP. Claude read and wrote Figma variables directly, generated the token pipeline, and checked every decision against live Tailwind and shadcn documentation. Each design choice and its code output stayed in one loop.

### Two Layers: Primitives to Semantic

Primitives are the raw, hidden palette and scales that developers never touch. Semantic tokens are property scoped roles that alias them, covering background, text, border, icon and focus ring in both light and dark. Teams use the roles, never the raw values.

<gallery cols="1">
<figure src="./images/figma-variable-collections.jpg" alt="Figma variable collections">The split as Figma sees it: one hidden primitives collection holding color, typography and the numeric scaler, and separate published collections for the roles that alias into it</figure>
</gallery>

<gallery cols="1">
<figure src="./images/semantic-color-text-roles.jpg" alt="Semantic text color roles in light and dark">Semantic text roles, each one an alias into the hidden primitive layer, resolved side by side for light and dark</figure>
</gallery>

Underneath them sits the palette itself, where neutrals and brand hues are built by the same recipe so every ramp steps in the same places.

<gallery cols="2">
<figure src="./images/primitive-color-ramp-gray.jpg" alt="Primitive gray color ramp">Gray, a neutral ladder fine enough for surfaces and borders to layer without collapsing into each other</figure>
<figure src="./images/primitive-color-ramp-electric-blue.jpg" alt="Primitive electric blue color ramp">Electric blue, a brand ramp generated from the same OKLCH maths as the neutrals</figure>
</gallery>

The type scale follows the same logic. Font families, weights and sizes live as primitives, and each role composes them into a single class.

<gallery cols="1">
<figure src="./images/typography-display.jpg" alt="Display typography showcase">Display roles, where family, size, line height, tracking and weight resolve into one utility</figure>
</gallery>

### The Core Problem, and the @utility Solution

Tailwind v4's `--color-*` namespace generates every property from one value, which breaks a property scoped system where `primary` is one color as a background, another as text, and another as a border. We pivoted to a custom `@utility` per role, emitting `bg-primary`, `text-primary` and `border-primary` from separate values. This was the key move that let a semantic system live natively in Tailwind.

### Dimension Tokens

One hidden numeric scale, the `scaler`, feeds every dimension family through aliases: spacing, sizing, radius, border width and control height. Unlike color these are not property scoped, so they emit as native Tailwind `@theme` and let Tailwind generate the utilities itself. A single spacing token produces around eighty five padding, margin, gap and sizing classes on its own.

<gallery cols="2">
<figure src="./images/spacing-showcase.jpg" alt="Spacing scale showcase">A sixteen step spacing scale, named by intent rather than by pixel value</figure>
<figure src="./images/sizing-showcase.jpg" alt="Sizing scale showcase">Sizing shares the same scaler, so a step means the same thing wherever it appears</figure>
<figure src="./images/radius-showcase.jpg" alt="Border radius showcase">Radius mirrors Tailwind's own t-shirt vocabulary</figure>
<figure src="./images/border-width-showcase.jpg" alt="Border width showcase">Border width maps to Tailwind's numeric scale, so nothing needs to be emitted for it</figure>
</gallery>

### No Drift Between Design and Code

Every Figma token name matches its Tailwind class. `radius/md` is `rounded-md`, `width/2` is `border-2`, and the `sm` control height carries the code syntax `h-9`. Designer and developer share one vocabulary, and Dev Mode shows the exact class next to each token.

### The Pipeline

Figma variables are mirrored into a versioned DTCG `tokens.json` by build scripts, then a generator emits Tailwind CSS, DTCG, flat JSON and plain CSS, with a validator enforcing the locked rules on every change. Change a token in Figma, re sync, and the code regenerates.

Each family takes a different route out of the generator, and that routing is the architecture in one view:

| Figma token | How it is emitted | Tailwind class |
| --- | --- | --- |
| `gray/500` | `:root` variable, held out of `@theme` | internal, never written by hand |
| `background/primary/default` | one `@utility` per role | `bg-primary` |
| `text/on-primary` | one `@utility` per role | `text-on-primary` |
| `body/lg/emphasis` | one complete `@utility` per role | `text-body-lg-emphasis` |
| `spacing/md` | native `@theme` as `--spacing-*` | `p-md`, `gap-md` |
| `radius/md` | native `@theme` as `--radius-*` | `rounded-md` |
| `sizing/md` | nothing, it reads `--spacing-*` | `w-md`, `h-md` |
| `width/2` | nothing, the value is already native | `border-2` |
| `height/sm` | nothing, carried as code syntax | `h-9` |

Only color and typography need a custom utility, because only they are property scoped. Everything else lives in a real Tailwind namespace, or needs no output at all because our name is already Tailwind's name.

### Living Documentation

Every token family has a showcase sheet in Figma that renders the tokens in use, from color ramps and radius swatches to spacing bars and control heights, with the exact class beside each one. The documentation and the specification are the same artifact.

<gallery cols="1">
<figure src="./images/typography-playground.jpg" alt="Typography playground sheet">The type playground sets each role in real copy rather than specimen rows, so a decision can be judged where it will actually be read</figure>
</gallery>

### Challenges

The hard part was never picking colors. It was making the names survive contact with Tailwind. A semantic layer wants to read like intent, `primary`, `subtle`, `on-primary`, but every one of those names also has to become a class that Tailwind will generate and does not already own.

Three collisions set the rules. `background/primary/default` drops its trailing `default` and becomes `bg-primary`, yet `text/default` and `border/default` have to keep theirs, because a bare `text` clashes with Tailwind's own text utilities and a bare `border` is already its border width utility. Foregrounds went through two rejected schemes before landing: a `-foreground` suffix that only repeated what the `text/` group already said, and a mid-string `primary-on-subtle` that left "on" ambiguous. We settled on `on-` as a prefix, so it always reads one way. In typography a size step is always `Default` and never `Medium`, so a size can never be mistaken for a weight inside a composite class.

`@utility` is what made the semantic layer expressible at all, and we took its cost openly. A custom utility does not get Tailwind's `/opacity` modifier unless it is authored with the `--value()` syntax, so transparency lives in explicit alpha tokens instead. Every one of these was settled against what the framework actually does, checked with live builds rather than preference.

### Conclusion

The system now has a real spine: a hidden primitive scale, property scoped semantic roles, and an honest two way mapping to Tailwind and shadcn. Designers pick meaningful tokens, developers write native classes, and the two never disagree. The foundation is documented, versioned, and ready for the component library.
