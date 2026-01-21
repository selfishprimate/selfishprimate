---
title: "Joi Gifts Mobile App Design"
description: "This project entailed defining requirements, establishing robust design tokenomics, and creating a comprehensive mobile application for the leading gifting platform."
company: "Joi Gifts"
category: "Mobile App"
tags: ["Mobile App", "E-commerce", "iOS", "Android", "Gifting"]
coverImage: "./images/cover.jpg"
images: []
featured: true
year: "2023"
---

> "A user interface is like a joke. If you have to explain it, it's not that good." — Martin LeBlanc

## Overview

This initiative involved establishing requirements, creating design tokens, and building a comprehensive design system. The project aimed to transform Joi Gifts by migrating from outdated webview technology to a native mobile application, addressing existing experience challenges while leveraging native functionality for improved usability.

## Objectives

- Transition to native mobile platform to resolve performance and UX issues
- Improve usability through native features (notifications, bottom sheets, dialogs)
- Establish design tokenomics and system for consistency
- Generate JSON design tokens for development team via GitHub
- Design essential components aligned with system principles

## Research

The team conducted heuristic evaluation against usability principles, analyzed user behavior through analytics, and gathered direct feedback from customer care departments to identify pain points and guide design improvements.

## Ideation and Prototyping

Process included competitor analysis, low-fidelity wireframes for stakeholder discussions, and interactive prototypes for complex flows like delivery scheduling and AI-generated gift messaging.

## Challenges

Primary obstacle involved demonstrating the design system's value to the team through examples and collaborative feedback.

## Design Process Tools

Primary tools: Figma for high-fidelity designs and Token Studio plugin for design token management.

## Shopping Cart

The cart experience includes quantity adjustment functionality, product management capabilities, prominently displayed delivery information, and a quick summary bottom sheet for checkout review.

<gallery cols="1">
<figure src="./images/cart-general.jpg" alt="Shopping cart overview">Users may take a moment to explore and fine-tune their selections before proceeding to checkout</figure>
<figure src="./images/cart-expired.jpg" alt="Expired delivery notification">No need to backtrack to the product detail page if the delivery slot has expired</figure>
</gallery>

## Gift Reminder

Users can create reminders for birthdays, Valentine's Day, Mother's Day, Father's Day, and custom occasions. The system supports one-time or annual recurring options, with reminders stored in a dedicated section on the Account page. Upcoming reminders are highlighted in green, with easy edit and removal options.

<gallery cols="1">
<figure src="./images/reminder-add.jpg" alt="Add reminder form">Users may effortlessly create reminders for birthdays, Valentine's Day, Mother's Day, Father's Day, and more</figure>
<figure src="./images/reminder-list.jpg" alt="Reminder list view">Users may edit or remove reminders with ease using the intuitive interface</figure>
</gallery>

## Address Management

The address management feature is accessible from the Account page, allowing users to view, edit, and remove saved addresses. The "Add New Address" button provides two input methods: manual address entry and interactive map view. This dual approach caters to both novice users who prefer straightforward input and advanced users who benefit from a more visual method.

<gallery cols="1">
<figure src="./images/address-list.jpg" alt="Saved addresses list">Users can navigate to the Addresses section from their Account page</figure>
<figure src="./images/address-add.jpg" alt="Add new address form">This screen offers two options: manually entering the address details or using the map view for a more interactive experience</figure>
<figure src="./images/address-delete.jpg" alt="Delete address confirmation">Users can see all their saved addresses clearly listed, with straightforward options to edit or remove each address</figure>
</gallery>

## Product Listing & Filtering

The product listing features a clean interface displaying search result counts, visible filtering options, and impressive product cards with key information. Dynamic cards accommodate promotional details like "Free Delivery," "Joi Express," and discounts, balancing user needs with marketing objectives.

<gallery cols="1">
<figure src="./images/listing-general.jpg" alt="Gift product listing">The dynamic cards are flexible, allowing the marketing team to effectively communicate campaign and promotion information directly within the product listings</figure>
<figure src="./images/listing-filtered.jpg" alt="Filtered product results">Color selections include color labels and a tick icon to indicate when an option is selected, ensuring clear and accessible feedback</figure>
</gallery>

## Product Details

The product details design addresses two key challenges: preventing interface clutter with comprehensive information and avoiding overwhelming users with immediate delivery date/time selection. Solutions include a carousel slider for multi-angle product viewing, auto-opening bottom sheets for delivery selection, and streamlined support for intuitive micro-tasks.

<gallery cols="1">
<figure src="./images/product-express.jpg" alt="Express delivery option">Express delivery can be selected conveniently from the top of the list</figure>
<figure src="./images/product-time.jpg" alt="Time slot selection">Users can easily update expired delivery times</figure>
<figure src="./images/product-custom.jpg" alt="Custom delivery date">Even complex user flows where users can select different dates using a calendar have been simplified with designs that are simple and intuitive</figure>
</gallery>

## Payment

The payment design features clear radio button selections for payment methods including saved credit cards, new cards, Apple Pay, Careem Pay, and Tabby. A "Secure Payment" label builds trust and safety. The Order Summary bottom sheet appears before final checkout, followed by an Order Received success screen confirmation.

<gallery cols="1">
<figure src="./images/payment.jpg" alt="Payment screen">Secure checkout showing saved cards, order summary, and order confirmation flow</figure>
</gallery>

## Closing

The design process for this project has been a journey of innovation and user-centricity. From crafting intuitive interfaces to implementing dynamic features, every decision has been carefully made to enhance the user experience. By prioritizing clarity, simplicity, and accessibility, as a team, we've created a platform that not only meets but exceeds user expectations.
