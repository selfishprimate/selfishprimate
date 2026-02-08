---
title: "Joi Gifts: Native Mobile App Experience"
description: "A ground-up redesign of the Middle East's leading gifting platform, migrating from webview to native mobile while establishing a scalable design system that powers seamless gift discovery, scheduling, and checkout."
company: "Joi Gifts"
category: "Mobile App"
tags: ["Mobile App", "E-commerce", "iOS", "Android", "Gifting"]
coverImage: "./images/cover.jpg"
images: []
order: 3
year: "2023"
featured: true
featuredOrder: 3
---

Joi Gifts had grown into the Middle East's go-to platform for sending flowers, cakes, and curated gifts across the UAE, Saudi Arabia, and beyond. But the mobile experience, built on webview technology, was showing its age. Slow load times, clunky interactions, and an inability to leverage native device features were driving users away. I was brought in to lead the complete redesign and migration to a native mobile application.

### The Challenge

The existing app suffered from fundamental limitations that no amount of optimization could fix:

- **Performance bottlenecks:** Webview rendering created noticeable lag, especially during checkout
- **Limited native integration:** Push notifications, biometric authentication, and smooth animations were impossible
- **Inconsistent experience:** The app felt like a wrapped website, not a native mobile product
- **Design debt:** Years of incremental changes had created an inconsistent, fragmented interface

Beyond fixing these issues, we needed to establish a design system that could scale across iOS, Android, and future platforms.

### Design Principles

Three principles guided every design decision:

**Progressive disclosure:** Show only what's needed, when it's needed. Complex flows like delivery scheduling unfold through intuitive bottom sheets rather than overwhelming users upfront.

**Familiar patterns:** Leverage native iOS and Android conventions so users feel instantly at home. No learning curve, no friction.

**Trust through clarity:** Gift-giving involves emotion and money. Every screen should reinforce that the user is in control and their gift will arrive perfectly.

### Shopping Cart: Confidence at Every Step

The cart experience was redesigned around a simple insight: users need confidence that their gift will arrive when expected. The new design prominently displays delivery information (city, date, and time slot) with an easy "Change" option if plans shift.

The empty state encourages exploration rather than feeling like a dead end. When items are added, quantity controls are inline, and a collapsible order summary lets users review totals without leaving the cart.

<gallery cols="1">
<figure src="./images/cart-general.jpg" alt="Shopping cart experience">Cart flow from empty state through item management to order summary review</figure>
</gallery>

A key innovation: if a delivery slot expires while the user is browsing, they're notified immediately with an option to update, no need to navigate back to product details.

<gallery cols="1">
<figure src="./images/cart-expired.jpg" alt="Expired delivery handling">Proactive notification when delivery slots expire, with inline correction</figure>
</gallery>

### Gift Reminders: Never Miss a Moment

Gift-giving is often tied to occasions like birthdays, anniversaries, and holidays. The reminder feature transforms Joi from a transactional app into a proactive gifting assistant.

Users can create reminders for any occasion, with options for one-time or annual recurrence. The form captures recipient name, occasion type, date, and an optional personal note. A custom date picker using native scroll wheels makes selection feel natural on mobile.

<gallery cols="1">
<figure src="./images/reminder-add.jpg" alt="Create reminder flow">Reminder creation from empty state through form completion with date selection</figure>
</gallery>

The reminder list surfaces upcoming occasions prominently, with visual hierarchy that highlights imminent dates. Edit and delete actions are easily accessible without cluttering the interface.

<gallery cols="1">
<figure src="./images/reminder-list.jpg" alt="Reminder management">Reminder list with upcoming occasions highlighted and easy management options</figure>
</gallery>

### Address Management: Flexibility Without Friction

Delivery addresses in gift-giving are unique, users often send to recipients, not themselves. The address flow accommodates this by separating recipient information from location details.

Two input methods serve different user preferences: manual entry for those who know the exact address, and map selection for visual confirmation. The map view includes real-time delivery validation. If an area isn't serviceable, users know immediately rather than discovering it at checkout.

<gallery cols="1">
<figure src="./images/address-list.jpg" alt="Saved addresses">Address list with clear edit and remove options for each saved location</figure>
</gallery>

<gallery cols="1">
<figure src="./images/address-add.jpg" alt="Add address flow">Dual input methods: manual form entry and interactive map selection with delivery validation</figure>
</gallery>

<gallery cols="1">
<figure src="./images/address-delete.jpg" alt="Address deletion">Confirmation dialog prevents accidental deletion of saved addresses</figure>
</gallery>

### Product Discovery: Browse with Intent

The product listing balances information density with scannability. Each card displays the essential details (image, name, price) while dynamic badges communicate promotions like "Free Delivery," "Joi Express," and percentage discounts.

Filtering and sorting are accessible from a persistent header, with active filter counts providing clear feedback. The filter panel itself uses familiar patterns: expandable categories, clear selections, and a live count of matching results.

<gallery cols="1">
<figure src="./images/listing-general.jpg" alt="Product listing">Product grid with dynamic promotional badges and accessible filtering</figure>
</gallery>

<gallery cols="1">
<figure src="./images/listing-filtered.jpg" alt="Filter experience">Filter panel with clear category organization and real-time result counts</figure>
</gallery>

### Product Details: Guided Decision Making

Product pages faced a unique challenge: users need comprehensive information (multiple images, descriptions, delivery options, add-ons) without feeling overwhelmed. The solution uses progressive disclosure through native bottom sheets.

When users tap "Add to Cart," a delivery selection sheet slides up, not a new page. Options are clearly prioritized: Joi Express (90-minute delivery) appears first for urgent gifts, followed by same-day and scheduled options. A calendar picker handles custom dates.

<gallery cols="1">
<figure src="./images/product-express.jpg" alt="Product and delivery selection">Product details with delivery scheduling through progressive bottom sheets</figure>
</gallery>

<gallery cols="1">
<figure src="./images/product-time.jpg" alt="Time slot selection">Time slot picker with clear availability and pricing information</figure>
</gallery>

<gallery cols="1">
<figure src="./images/product-custom.jpg" alt="Calendar selection">Calendar interface for scheduling future deliveries with intuitive date picking</figure>
</gallery>

### Payment: Trust and Speed

The checkout flow was designed to minimize friction while maximizing trust. A progress indicator (Cart → Address → Card Message → Payment) orients users throughout the journey.

Payment options are presented as clear radio selections: saved cards appear first for returning customers, followed by new card entry, Apple Pay, regional options like Careem Pay, and buy-now-pay-later through Tabby. A "Secure Payment" badge reinforces safety.

Before final submission, an order summary bottom sheet displays all details (products, delivery info, pricing breakdown) for one last confirmation. The success screen celebrates the completed gift with order details and a clear path back to shopping.

<gallery cols="1">
<figure src="./images/payment.jpg" alt="Payment flow">Complete checkout: payment selection, saved cards, order summary, and confirmation</figure>
</gallery>

### Reflection

This project reinforced a core belief: native mobile apps aren't just about performance, they're about meeting users where they are. By embracing platform conventions, leveraging native capabilities, and establishing a consistent design language, we transformed Joi Gifts from a functional tool into a delightful experience. The result is an app that feels inevitable, as if it couldn't have been designed any other way.
