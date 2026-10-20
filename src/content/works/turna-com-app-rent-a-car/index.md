---
title: "Turna.com: Rent a Car Mobile Experience"
description: "A car rental vertical designed end to end under a fixed deadline, built on a two layer token system so the schedule did not cost the foundations."
company: "Turna.com"
category: "Mobile App Design"
tags: ["Car Rental", "Mobile App", "Design System", "Design Tokens", "Travel"]
coverImage: "./images/cover.webp"
images: []
order: 4
year: "2023"
featured: false
---

Turna.com sells buses, hotels and ferries to people who book travel on a phone. When the company added car rental, the whole vertical had to be designed from the first search to a paid reservation, and the date it shipped was agreed before the work began.

### The Constraint

The deadline could not move and the scope could not shrink. The usual answer is to draw screens as fast as they are asked for and let a system follow afterwards, which in practice means it never arrives: every screen invents its own spacing, the fifth card does not match the first, and the developer receives a set of pictures rather than a specification.

The brief asked for something else. The screens had to be scalable, not disposable, because car rental was going to keep growing after launch. That put speed and durability in direct tension, and the way out of it was to spend the first days on the part nobody can see.

### A System Before Any Screens

Nothing in the interface points at a colour. The palette sits one layer below anything a screen can reach: a primitive holds the value, a role names the job, and the screen asks for the job. Every binding on the listing screen resolves to a role. Not one of them names a colour.

<gallery cols="1">
<figure src="./images/turna-token-layers.webp" alt="The two token layers">A primitive holds the value, a role names the job, and the screen only ever asks for the job</figure>
</gallery>

The same discipline runs through type. There is no heading style to choose from a list. A family, a size, a line height and a weight are four separate tokens, and a piece of text names the four it needs. The families are Inter for body and Sofia Sans for display, and the family token carries a direction branch, which is how the same system also sets a right to left script. Sizing is a four pixel grid held behind an alias, so the whole scale can be retuned from one place.

<gallery cols="1">
<figure src="./images/turna-type-and-sizing.webp" alt="The typography and sizing scales">Twenty four typography tokens and ten sizing tokens, shown at the values the library actually holds</figure>
</gallery>

Sixty eight colour tokens share one vocabulary of weight: weaker, weak, subtle, muted, default, strong. The ladder means the same thing whether it is the brand or a warning, and every family carries an onDefault, which is the colour that goes on top when that family is used as a fill. Reading the library to build these pages turned up one fault worth recording: `background/400` and `background/500` resolve to the same value, because the primitives beneath them both hold `#EBEDEF`. One step of that ladder does nothing.

<gallery cols="1">
<figure src="./images/turna-colour-roles.webp" alt="The colour roles">One ladder of weight, reused by the brand and by every status family</figure>
</gallery>

### The Search

Car rental had to arrive as a fifth vertical without anyone rebuilding the other four. It enters as a tab rather than a new application, so the search card had to feel native to a product nobody was redesigning. It asks for a place, two dates and two times, and keeps the second location behind a checkbox because most rentals come back to where they started.

<gallery cols="1">
<figure src="./images/turna-search.mp4" alt="The search flow, from location to dates">Place, dates, go. The location field is typed rather than scrolled, and the calendar takes the whole rental in one gesture</figure>
</gallery>

### The Listing

A rental card is not a product card. It carries the supplier, because which company you rent from decides the counter you queue at and the deposit you leave. It carries six facts in an order that never changes, so two cards can be compared by position rather than by reading. It carries the two things that undo a booking at the desk, free cancellation and the minimum driver age. And it leads with the total for the chosen dates rather than the daily rate the industry advertises, because the total is the number people actually compare.

<gallery cols="1">
<figure src="./images/turna-card-anatomy.webp" alt="The anatomy of a listing card">Six facts in a fixed order, the two warnings that undo a booking, and the total set above the daily rate</figure>
</gallery>

### The Decision

Nobody chooses a rental car from the photograph. The deposit, the mileage, the fuel policy, the minimum age and the minimum years of licence are what the choice turns on, and they are what causes an argument at the counter when they were not read. They were given the room to be read: the deciding facts sit above the fold, and the full conditions are one tap away, grouped and collapsed rather than folded into a terms link.

<gallery cols="1">
<figure src="./images/turna-conditions.webp" alt="Vehicle details and rental conditions">The facts that decide, and the full conditions kept a tap away rather than buried</figure>
</gallery>

### Paying the Way Türkiye Pays

Instalments are not a feature in this market, they are the default expectation, and a card that cannot be split is a card that does not get used. The plan on offer depends on who issued the card, so the options are read from its first six digits. The loyalty balance had to spend like money, covering part of a total or all of it with the remainder still payable by card. And the card is offered for saving only after the payment has already worked, which is the one moment the offer is not in the way.

<gallery cols="1">
<figure src="./images/turna-payment.webp" alt="Instalments and loyalty points at checkout">Instalment options read from the card, and a loyalty balance that spends against the total</figure>
</gallery>

### The States That Prove It

Under a deadline nobody draws the failures. They get described in a ticket and discovered in testing. These were drawn, and that is the only honest argument for having spent the first days on a system: the components they are made of already existed, so a no results screen cost minutes rather than a morning.

<gallery cols="1">
<figure src="./images/turna-states.webp" alt="Empty state and bank verification">No results that explains itself, and the bank's own verification page drawn into the flow</figure>
</gallery>

Loading, empty location search, an expired code, 3D Secure, the modal stack, text truncation, scroll behaviour, currency switching, a clear all confirmation, a birthday picker, country and tax office selection, one saved card and several: all of them exist in the file, built from the same components as the screens people are meant to enjoy.

### What It Cost and What It Returned

The cost was the first days, spent on something with nothing to show at the end of them. The return was five flows and more than ninety frames that agree with each other, a developer who received tokens rather than measurements, and enough room left over to draw the states that normally get written as a sentence in a ticket.

The honest part is that a system does not make the work correct, only consistent. Reading the library for this case study turned up a duplicated step in the background ladder, and a handful of screens still carrying placeholder copy in a notification banner. Both are the kind of thing a system makes easy to find and easy to fix in one place, which is a different claim from never making the mistake.
