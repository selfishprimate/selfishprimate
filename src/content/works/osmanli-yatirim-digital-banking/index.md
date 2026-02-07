---
title: "Osmanlı Yatırım: Digital Banking Platform"
description: "A comprehensive digital banking platform (e-branch) for Osmanli Yatirim, enabling customers to manage their investment portfolios, trade securities, mutual funds, futures, and warrants through a unified online experience."
company: "Osmanli Yatirim"
category: "FinTech"
tags: ["FinTech", "Banking", "Web App", "Digital Banking", "Investment", "Trading"]
coverImage: "./images/cover.jpg"
images: []
order: 11
year: "2021"
featured: false
draft: true
---

> "The best investment platforms are the ones that make complex financial decisions feel simple." — Anonymous

### Overview

Osmanli Yatirim's Digital Banking Platform (E-Branch) is a comprehensive online investment management system designed for retail investors. The platform consolidates multiple investment instruments—stocks, mutual funds, futures, and warrants—into a single, cohesive experience, enabling customers to monitor their portfolios, execute trades, and manage their financial assets with ease.

### Challenges

- Integrating multiple complex financial instruments (stocks, funds, futures, warrants) into one unified platform
- Simplifying intricate trading workflows for retail investors with varying levels of expertise
- Designing intuitive data visualizations for portfolio performance and asset allocation
- Creating a secure authentication flow that balances security with user convenience
- Building a flexible alert system to keep investors informed of market movements

### Objectives

- Develop a modern, intuitive interface that reduces cognitive load for complex financial operations
- Create consistent design patterns across different trading modules
- Implement clear visual hierarchy to highlight critical information like profit/loss indicators
- Enable quick trade execution with minimal friction
- Provide comprehensive portfolio insights through effective data visualization

### Authentication

The login experience features a clean, focused design with security guidance prominently displayed. The password recovery flow implements SMS verification with a clear step-by-step progress indicator, ensuring users always know where they are in the process.

<gallery cols="1">
<figure src="./images/login.png" alt="Login page">Login screen with security tips panel and quick access options</figure>
<figure src="./images/sms-verification.png" alt="SMS verification">Multi-step password recovery with SMS verification and countdown timer</figure>
</gallery>

### Main Dashboard

The dashboard provides a comprehensive overview of the user's financial position. Key components include an asset allocation donut chart, account summary with T+2 settlement details, and a portfolio performance graph with multiple timeframe options. The portfolio table allows quick filtering by instrument type and immediate access to buy/sell actions.

<gallery cols="1">
<figure src="./images/dashboard.png" alt="Main dashboard">Central dashboard displaying asset distribution, account summary, portfolio growth chart, and holdings table with quick trade actions</figure>
</gallery>

### Fund Management

The mutual fund module offers a complete fund investment experience. Users can browse funds with detailed metrics including risk ratings, management fees, and historical returns. The fund purchase flow presents clear cost breakdowns and execution date information.

<gallery cols="1">
<figure src="./images/fund-homepage.png" alt="Fund homepage">Fund overview with portfolio distribution and fund listings showing ratings and performance metrics</figure>
<figure src="./images/fund-purchase.png" alt="Fund purchase">Fund purchase form with risk rating display and detailed cost breakdown</figure>
</gallery>

The portfolio detail view includes risk assessment results and personalized fund recommendations. The basket order feature allows users to invest in multiple funds simultaneously based on their investor profile (Conservative, Moderate, or Aggressive).

<gallery cols="1">
<figure src="./images/fund-portfolio-detail.png" alt="Fund portfolio detail">Detailed fund portfolio with risk survey results, recommended allocation, and expanded fund information</figure>
<figure src="./images/fund-basket-order.png" alt="Fund basket order">Basket order interface with investor profile selection and proportional fund allocation</figure>
</gallery>

<gallery cols="1">
<figure src="./images/fund-basket-calculation.png" alt="Fund basket calculation">Advanced basket calculation showing current portfolio rebalancing requirements for buy and sell operations</figure>
</gallery>

### Stock Trading

The stock trading interface provides real-time portfolio data with clear profit/loss indicators. Users can execute buy and sell orders with a streamlined form, while the park order feature enables batch order entry with multiple price points and execution options.

<gallery cols="1">
<figure src="./images/stock-trading.png" alt="Stock trading">Stock trading screen with portfolio holdings, P&L tracking, and quick buy/sell action buttons</figure>
<figure src="./images/stock-park-order.png" alt="Park order">Park order interface for scheduling multiple orders with limit prices and execution parameters</figure>
</gallery>

### Price Alerts

The alert system allows investors to stay informed about price movements without constant monitoring. Users can set alerts by type and period, choose notification channels (email, in-app notification center, push notifications), and receive confirmation via toast messages upon successful creation.

<gallery cols="1">
<figure src="./images/alarm-type-select.png" alt="Alarm type selection">Alert creation modal with alarm type dropdown selection</figure>
</gallery>

<gallery cols="1">
<figure src="./images/alarm-form-filled.png" alt="Alarm form completed">Completed alert form with period selection and multi-channel notification preferences</figure>
<figure src="./images/alarm-created-toast.png" alt="Alarm created notification">Success confirmation toast message after alert creation</figure>
</gallery>

### Futures Trading

The futures trading module mirrors the main dashboard structure while focusing on derivative instruments. Users can track their futures positions with detailed contract information, view executed transactions with comprehensive filtering options, and access account statements for historical analysis.

<gallery cols="1">
<figure src="./images/futures-homepage.png" alt="Futures homepage">Futures trading dashboard with contract listings, position details, and market data</figure>
</gallery>

<gallery cols="1">
<figure src="./images/futures-transactions.png" alt="Futures transactions">Transaction history with date range filtering, order type selection, and execution details</figure>
<figure src="./images/futures-statement.png" alt="Futures statement">Account statement showing profit/loss entries, fees, and running balance</figure>
</gallery>

### Warrants Trading

The warrants module provides access to structured products with the same familiar interface pattern. Users can view warrant contracts with key metrics like settlement prices and position sizes, maintaining consistency with other trading modules.

<gallery cols="1">
<figure src="./images/warrants-homepage.png" alt="Warrants homepage">Warrants trading interface with contract details, pricing information, and quick trade actions</figure>
</gallery>

### Design Approach

The platform employs a consistent design language across all modules, featuring:

- **Color-coded actions**: Green for buy, red for sell, providing instant visual recognition
- **Progressive disclosure**: Complex information revealed through tooltips and expandable sections
- **Unified navigation**: Consistent header with quick access to all trading instruments
- **Responsive data tables**: Sortable, filterable tables with inline actions
- **Real-time feedback**: Toast notifications and status indicators for all user actions

### Conclusion

The Digital Banking Platform successfully consolidates Osmanli Yatirim's investment services into a cohesive digital experience. By maintaining consistent design patterns while accommodating the unique requirements of each financial instrument, the platform enables investors to manage their entire portfolio from a single, intuitive interface.
