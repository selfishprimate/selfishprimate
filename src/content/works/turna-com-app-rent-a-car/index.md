---
title: "Turna.com: Rent a Car Mobile Experience"
description: "A mobile car rental feature designed under tight deadlines, leveraging a scalable design system to deliver a complete booking flow from search to payment."
company: "Turna.com"
category: "Mobile App Design"
tags: ["Car Rental", "Mobile App", "React Native", "Design System", "Travel"]
coverImage: "./images/cover.jpg"
images: []
order: 3
year: "2023"
featured: true
featuredOrder: 5
---

Turna.com is Turkey's comprehensive travel platform, offering flights, hotels, and transportation services. When the team decided to expand into car rentals, I was tasked with designing the complete mobile experience—from initial search to final payment—within a demanding timeline.

### The Challenge

The project came with a significant constraint: we had a tight deadline that couldn't be extended. However, the business requirement was clear—we needed designs that weren't just quick fixes but scalable solutions that could evolve with the product. This tension between speed and sustainability shaped our entire approach.

### Design System First

Rather than diving straight into screens, I made a strategic decision to invest time upfront in building a small but robust design system with well-defined tokens. This choice initially felt counterintuitive given our timeline, but it paid dividends:

- **Consistency** — Every component followed the same visual language from day one
- **Speed** — Once tokens were established, designing new screens became significantly faster
- **Handoff** — The React Native developer could implement components with precise specifications
- **Scalability** — Future iterations would build on a solid foundation rather than accumulated debt

### Home & Location Search

The home screen presents car rental as a clear entry point within the Turna ecosystem. The search interface captures essential booking details: pickup/return locations and dates. The location search leverages familiar patterns—recent searches, popular destinations, and real-time suggestions—to minimize typing and accelerate the booking flow.

<gallery cols="1">
<figure src="./images/home-screen-and-location-search.png" alt="Home and location search">Home screen with rental search form and intelligent location suggestions with recent searches</figure>
</gallery>

### Search Results & Filtering

The results screen balances information density with scannability. Each vehicle card displays critical decision factors: car model, transmission type, fuel policy, passenger capacity, and daily rate. The filtering system allows users to narrow results by transmission, fuel type, vehicle segment, and specific brands—essential for users who have strong preferences or company car policies.

<gallery cols="1">
<figure src="./images/search-results-and-filtering.png" alt="Search results and filters">Vehicle listings with comprehensive filtering options and brand selection</figure>
</gallery>

### Vehicle Details

The detail screen provides everything users need to make an informed decision. Vehicle specifications are organized in scannable sections: basic info, rental conditions, and included features. Key details like mileage limits, fuel policy, minimum driver age, and deposit requirements are prominently displayed—these are often the deciding factors that users compare across options.

<gallery cols="1">
<figure src="./images/car-details-page.png" alt="Car details">Comprehensive vehicle information with specifications, rental conditions, and pricing breakdown</figure>
</gallery>

### Payment Experience

The payment flow was designed to accommodate multiple user preferences and reduce checkout friction:

**Saved Cards** — Returning users can complete payment with a single tap using previously saved cards, dramatically reducing checkout time.

<gallery cols="1">
<figure src="./images/payment-with-saved-card.png" alt="Payment with saved card">Quick checkout using saved payment methods</figure>
</gallery>

**New Card Entry** — For new cards, the interface provides clear input fields with installment options—a critical feature for the Turkish market where installment payments are widely expected.

<gallery cols="1">
<figure src="./images/payment-with-new-card.png" alt="Payment with new card">New card entry with installment plan selection</figure>
</gallery>

**Turna Points** — Integration with the platform's loyalty program allows users to apply earned points toward their rental, creating a cohesive ecosystem experience.

<gallery cols="1">
<figure src="./images/payment-with-turna-points.png" alt="Payment with Turna points">Loyalty points redemption during checkout</figure>
</gallery>

### Post-Payment Card Save

After successful payment, users who entered a new card are offered a seamless opportunity to save it for future bookings. This opt-in approach respects user choice while encouraging the behavior that leads to faster future checkouts.

<gallery cols="1">
<figure src="./images/saving-credit-card-info-after-payment.png" alt="Save card after payment">Success confirmation with card saving option for future convenience</figure>
</gallery>

### Reflection

The Turna car rental project reinforced an important lesson about design under pressure: investing in foundations—even when time is scarce—pays off exponentially. The design system approach transformed what could have been a stressful sprint into a methodical build where each screen informed the next. Working closely with the React Native developer, we delivered on schedule without compromising on quality or future scalability.
