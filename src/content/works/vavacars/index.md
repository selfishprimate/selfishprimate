---
title: "Optimizing UX for VavaCars Vehicle Inspection App"
description: "As my first task at VavaCars, I was assigned to fix the UX issues in the VavaCars Vehicle Inspection App, improving efficiency for field inspectors."
company: "VavaCars"
category: "Mobile App"
tags: ["UX Optimization", "Mobile App", "Automotive", "B2B"]
coverImage: "./images/cover.jpg"
images: []
featured: false
year: "2023"
---

> "Good design, when it's done well, becomes invisible. It's only when it's done poorly that we notice it." — Jared Spool

## Overview

I was tasked with resolving UX issues in a tablet-based vehicle inspection web application used by car inspectors. The goal involved identifying pain points and streamlining the inspection workflow to enhance efficiency and user satisfaction.

## Objectives

- Identify and resolve usability issues
- Streamline the inspection process for efficiency
- Create user-friendly interface meeting inspector needs

## Research

To understand the pain points and usability issues, I began by meeting with the vehicle inspectors. I listened to their pain points and gathered their ideas for improvement.

Research methodology included direct inspector interviews, observational studies, competitive analysis, and gathering feedback on previous experiences with similar applications.

### Key Research Findings

1. **Search functionality gap:** Inspectors struggled locating checkpoints; solution implemented global search feature from main menu

2. **Small interactive areas:** Clicking car diagram elements (tires, mirrors, headlights) proved difficult; response included enlarged areas and text links with springboard design testing

3. **Accessibility issues:** Frequently-used options lacked prominence; integrated quick-access feature for common options

4. **Information architecture problems:** Unnecessary options cluttered interface while required options were missing; revised architecture to remove rarely-used items and add necessary ones

5. **Photo capture inefficiency:** Taking photos of undamaged parts wasted time; system updated to prompt photos only for damaged areas

6. **Technical performance:** Native photo component operated slowly; technical team streamlined capture process by eliminating unnecessary screens

7. **Unit confusion:** "Inch" measurements confused inspectors; changed to "cm" for familiarity

8. **Option discovery:** Non-alphabetical listing hindered quick access; alphabetized all options

## Ideation and Prototyping

I created mid-fidelity prototypes based on research, tested with inspectors iteratively, and refined designs through feedback cycles.

## Challenges

Two major obstacles emerged: developing genuine understanding of inspector workflows through extended observation and interaction, and managing the legacy codebase (no reusable components, disorganized design files, absence of design tokens).

## Design Approach

Used Continuous Discovery methodology, focusing on minimal viable elements delivered in shippable increments (checkpoint updates, UI refinements, feature additions) to gather early feedback.

## Native Radio Buttons

Enhanced usability and performance with Material Design radio buttons, mitigating fat finger interaction issues.

<gallery cols="1">
<figure src="./images/radio-buttons.jpg" alt="Radio button components">Material Design radio buttons for improved usability and reduced interaction errors</figure>
</gallery>

## Native Checkboxes

Streamlined interactions with Material Design checkboxes while minimizing fat finger errors.

<gallery cols="1">
<figure src="./images/checkboxes.jpg" alt="Checkbox components">Streamlined checkbox interactions for multi-option selection</figure>
</gallery>

## Dropdown Menus

Enabled color specification through dropdown interfaces for efficient data entry in limited screen space.

<gallery cols="1">
<figure src="./images/dropdown.jpg" alt="Dropdown menu">Compact dropdown for efficient color specification</figure>
</gallery>

## Color Selection

Added checkbox feature allowing inspectors to indicate two-color vehicles with corresponding dropdown menus for accurate representation. Combined color labels with color boxes to support inspectors with color blindness or visual impairments.

<gallery cols="1">
<figure src="./images/color-selection.jpg" alt="Vehicle color picker">Accessible color selection with labels supporting visual impairments</figure>
</gallery>

## Accordion Organization

Grouped options under relevant accordion menus reducing cognitive load for locating car parts.

<gallery cols="1">
<figure src="./images/accordion.jpg" alt="Accordion navigation">Collapsible sections reducing cognitive load when locating parts</figure>
</gallery>

## Global Search

Enabled effortless vehicle part location throughout the application regardless of current location.

<gallery cols="1">
<figure src="./images/global-search.jpg" alt="Global search feature">Search across all inspection sections from anywhere in the app</figure>
</gallery>

## Selective Photo Capture

Implemented photo documentation exclusively for vehicle parts requiring photographic evidence, saving significant time.

<gallery cols="1">
<figure src="./images/photo-capturing.jpg" alt="Photo capture interface">Guided photo capture only for parts requiring documentation</figure>
</gallery>

## Impact

The updates aimed to improve usability, functionality, and efficiency using native design components (checkboxes, radio buttons, inputs). Results achieved approximately 5-10 minute savings per inspection:

- 40% reduction in average inspection time
- 60% decrease in data entry errors
- Significantly improved inspector satisfaction
